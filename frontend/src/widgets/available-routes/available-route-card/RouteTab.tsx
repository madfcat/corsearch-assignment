import styles from "./styles.module.scss";
import RouteName from "./RouteName";
import { Leg } from "../../../types/types";
import {
	formatToHHMM,
	metersToDistance,
	secondsToTime,
} from "../../../shared/converters";
import { useDispatch, useSelector } from "react-redux";
import {
	setIndexDetailsOpen,
	setInitialLoad,
} from "../../../features/routesSlice";
import { RootState } from "../../../store/store";
import {
	calculateLegsDistance,
	calculateLegsIntermediateStopsCount,
} from "../../../features/calculateStats";
import Icon from "../../../components/icon/Icon";

type Props = {
	index: number;
	duration: number;
	legs: Leg[];
	arrivalTime: string;
	departureTime: string;
	co2: number;
};

export default function RouteTab({
	index,
	duration,
	legs,
	arrivalTime,
	departureTime,
	co2,
}: Props) {
	const dispatch = useDispatch();
	const initialLoad = useSelector(
		(state: RootState) => state.routes.initialLoad
	);

	function handleClick(index: number, event: React.MouseEvent) {
		event.preventDefault();
		dispatch(setIndexDetailsOpen(index));
		if (initialLoad) {
			dispatch(setInitialLoad(false));
		}
	}
	// console.log(departureTime, arrivalTime);

	const stopsCount = calculateLegsIntermediateStopsCount(legs);
	return (
		<summary onClick={(event) => handleClick(index, event)}>
			<div className={styles["route-name-container"]}>
				<RouteName legs={legs} />
				<div className={styles["route-duration-eco"]}>
					<div className={styles["route-duration-eco-element"]}>
						<Icon
							className={styles["stat-icon"]}
							svgIconName="energy_savings_leaf"
						/>
						<span className={styles["route-duration-eco-element-value"]}>{co2}g</span>
					</div>
					<div className={styles["route-duration-eco-element"]}>
						<Icon
							className={styles["stat-icon"]}
							svgIconName="timer"
						/>
						<span className={styles["route-duration-eco-element-value"]}>{secondsToTime(duration)}</span>
					</div>
					<div className={styles["route-duration-eco-element"]}>
						<Icon
							className={styles["stat-icon"]}
							svgIconName="schedule"
						/>
						<span className={styles["route-duration-eco-element-value"]}>
							{`${formatToHHMM(departureTime)}-${formatToHHMM(arrivalTime)}`}
						</span>
					</div>
				</div>
			</div>
			<div className={styles["route-stats"]}>
				<div>{stopsCount ? `${stopsCount} intermediate stops` : ""}</div>
				<div>{metersToDistance(calculateLegsDistance(legs))}</div>
			</div>
		</summary>
	);
}
