import { Leg } from "../../../types/types";
import {
	formatToHHMM,
	metersToDistance,
	secondsToTime,
} from "../../../shared/converters";
import TransportIcon from "../../../components/transport-icon/TransportIcon";
import styles from "./styles.module.scss";
import pickTransportColor from "../../../shared/pickTransportColor";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Icon from "../../../components/icon/Icon";

type Props = {
	legs: Leg[];
};

type StopNameProps = {
	stop: NonNullable<Leg>["from"]["stop"] | NonNullable<Leg>["to"]["stop"];
	type: "start" | "middle" | "end";
};

function StopName({ stop, type }: StopNameProps) {
	const inlineStyles = {
		backgroundColor: pickTransportColor(stop?.vehicleMode),
	};
	const startName = useSelector((state: RootState) => state.map.startName);
	const endName = useSelector((state: RootState) => state.map.endName);

	let stopName = stop?.name;
	if (!stopName) {
		switch (type) {
			case "start":
				stopName = startName;
				break;
			case "end":
				stopName = endName;
				break;
			default:
				stopName = "";
		}
	}
	return (
		<div className={styles["stop-name"]}>
			{stop?.code && (
				<span
					style={inlineStyles}
					className={classNames(
						styles["stop-name-code"],
						styles[`stop-name-code-${stop?.vehicleMode}`]
					)}
				>
					{stop.code}
				</span>
			)}
			<span>{stopName}</span>
		</div>
	);
}

function calculateStopType(
	legsTotal: number,
	index: number,
	fromOrTo: "from" | "to" | "middle"
) {
	if (index === 0 && fromOrTo === "from") return "start";
	if (index === legsTotal - 1 && fromOrTo === "to") return "end";
	return "middle";
}

export default function RouteInformation({ legs }: Props) {
	if (!legs || !legs.length) return <div>No routes data available</div>;

	const legsTotal = legs.length;
	return (
		<div className={styles["route-information"]}>
			{legs?.map((leg, index) => {
				// console.log("leg", leg);
				// console.log(leg?.from.departure?.scheduledTime);
				return (
					<div
						className={styles["leg"]}
						key={`${leg?.distance}-${leg?.duration}-${leg?.id}-${index}`}
					>
						<div className={styles["leg-header"]}>
							<div className={styles["leg-header-transport"]}>
								<TransportIcon mode={leg?.mode} />
								<div className={styles["leg-header-transport-short-name"]}>
									{leg?.route?.shortName}
								</div>
							</div>
							<div className={styles["leg-header-stats"]}>
								<div className={styles["leg-header-stats-duration"]}>
									<Icon className={styles["stat-icon"]} svgIconName="timer" />
									<span>{secondsToTime(leg?.duration)}</span>
								</div>
								<div className={styles["leg-header-stats-distance"]}>
									{metersToDistance(leg?.distance)}
								</div>
							</div>
						</div>
						<div className={styles["leg-stop-and-time"]}>
							<StopName
								stop={leg?.from.stop}
								type={calculateStopType(legsTotal, index, "from")}
							/>
							<div className={styles["stop-departure-time"]}>
								{formatToHHMM(leg?.from.departure?.scheduledTime)}
							</div>
						</div>
						{leg?.intermediateStops?.map((stop, index) => {
							return (
								<div
									className={classNames(
										styles["leg-stop-and-time"],
										styles["leg-stop-and-time-inter"]
									)}
									key={`${stop?.code}-${stop?.vehicleMode}-${index}`}
								>
									<StopName stop={stop} type="middle" />
								</div>
							);
						})}
						<div className={styles["leg-stop-and-time"]}>
							<StopName
								stop={leg?.to.stop}
								type={calculateStopType(legsTotal, index, "to")}
							/>
							<div className={styles["stop-departure-time"]}>
								{formatToHHMM(leg?.to.departure?.scheduledTime)}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
