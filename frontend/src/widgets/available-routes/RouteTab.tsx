import styles from "./styles.module.scss";
import RouteName from "./RouteName";
import { Edges } from "../../types/types";
import { metersToDistance, secondsToTime } from "../../shared/converters";
import { useDispatch, useSelector } from "react-redux";
import {
	setIndexDetailsOpen,
	setInitialLoad,
} from "../../features/routesSlice";
import { RootState } from "../../store/store";
import {
	calculateLegsDistance,
	calculateLegsIntermediateStopsCount,
} from "../../features/calculateStats";

type Props = {
	index: number;
	edge: NonNullable<Edges[number]>;
};

export default function RouteTab({ index, edge }: Props) {
	const dispatch = useDispatch();
	const initialLoad = useSelector(
		(state: RootState) => state.routes.initialLoad
	);

	function handleClick(index: number, event: React.MouseEvent) {
		console.log("handleClick");
		console.log("index", index);
		event.preventDefault();
		dispatch(setIndexDetailsOpen(index));
		if (initialLoad) {
			dispatch(setInitialLoad(false));
		}
	}

	const stopsCount = calculateLegsIntermediateStopsCount(edge.node.legs);
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
			<div className={styles["route-details"]}>
				<div>{stopsCount ? `${stopsCount} intermediate stops` : ""}</div>
				<div>{metersToDistance(calculateLegsDistance(edge.node.legs))}</div>
			</div>
		</summary>
	);
}
