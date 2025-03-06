import { Leg } from "../../../types/types";
import {
	metersToDistance,
	msToHoursMinutes,
	secondsToTime,
} from "../../../shared/converters";
import TransportIcon from "../../../components/transport-icon/TransportIcon";
import styles from "./styles.module.scss";
import pickTransportColor from "../../../shared/pickTransportColor";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

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

	// console.log(
	// 	"`stop-name-code-${stop?.vehicleMode}`",
	// 	`stop-name-code-${stop?.vehicleMode}`
	// );
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
	fromOrTo: "from" | "to"
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
			{/* <p>Distance: {secondsToTime(edge?.node.)}</p> */}
			{legs?.map((leg, index) => {
				// console.log("leg", leg);
				return (
					<div className={styles["leg"]} key={index}>
						<div className={styles["leg-header"]}>
							<div className={styles["leg-header-transport"]}>
								<TransportIcon mode={leg?.mode} />
								<div className={styles["leg-header-transport-short-name"]}>
									{leg?.route?.shortName}
								</div>
							</div>
							<div className={styles["leg-header-stats"]}>
								<div className={styles["leg-header-stats-duration"]}>
									{secondsToTime(leg?.duration)}
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
								{msToHoursMinutes(leg?.from.departure?.scheduledTime)}
							</div>
						</div>
						<div className={styles["leg-stop-and-time"]}>
							<StopName
								stop={leg?.to.stop}
								type={calculateStopType(legsTotal, index, "to")}
							/>
							<div className={styles["stop-departure-time"]}>
								{msToHoursMinutes(leg?.to.departure?.scheduledTime)}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
