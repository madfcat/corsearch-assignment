import styles from "./styles.module.scss";
import RouteName from "./RouteName";
import { Edges } from "../../types/types";
import { secondsToTime } from "../../shared/converters";
// import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { setIndexDetailsOpen } from "../../features/routesSlice";

type Props = {
	index: number,
	edge: NonNullable<Edges[number]>;
	initialLoad: boolean;
	setInitialLoad: (initialLoad: boolean) => void;
	setChoice: (index: number) => void;
};

export default function RouteTab({
	index,
	edge,
	initialLoad,
	setInitialLoad,
	setChoice,
}: Props) {
	// const indexDetailsOpen = useSelector((state: RootState) => state.routes.indexDetailsOpen);
	const dispatch = useDispatch();
	const setIndexDetailsOpenAction = (index: number) => {dispatch(setIndexDetailsOpen(index))};

	function handleClick(index: number, event: React.MouseEvent) {
		console.log("handleClick");
		console.log("index", index);
		event.preventDefault();
		setIndexDetailsOpenAction(index);
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
