import styles from "./styles.module.scss";
import RouteName from "./RouteName";
import { Edges } from "../../types/types";
import { secondsToTime } from "../../shared/converters";

type Props = {
	index: number;
	edge: NonNullable<Edges[number]>;
	setIndexDetailsOpen: (index: number) => void;
	initialLoad: boolean;
	setInitialLoad: (initialLoad: boolean) => void;
	setChoice: (index: number) => void;
};

export default function RouteTab({
	index,
	edge,
	setIndexDetailsOpen,
	initialLoad,
	setInitialLoad,
	setChoice,
}: Props) {
	function handleClick(index: number, event: React.MouseEvent) {
		event.preventDefault();
		setIndexDetailsOpen(index);
		setChoice(index);
		if (initialLoad) {
			setInitialLoad(false);
		}
	}

	return (
		<summary onClick={(event) => handleClick(index, event)}>
			<div className={styles["route-name-container"]}>
				<RouteName legs={edge.node.legs} />
				<div>
					{edge.node.duration ? (
						<span>{secondsToTime(edge.node.duration)}</span>
					) : (
						<span>Unknown duration</span>
					)}
				</div>
			</div>
		</summary>
	);
}
