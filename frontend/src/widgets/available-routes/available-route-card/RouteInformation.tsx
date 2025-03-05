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

type Props = {
	legs: Leg[];
};

type StopNameProps = {
	stop: NonNullable<Leg>["from"]["stop"] | NonNullable<Leg>["to"]["stop"];
};

function StopName({ stop }: StopNameProps) {
	const inlineStyles = {
		backgroundColor: pickTransportColor(stop?.vehicleMode),
	};

	// console.log(
	// 	"`stop-name-code-${stop?.vehicleMode}`",
	// 	`stop-name-code-${stop?.vehicleMode}`
	// );
	return (
		<div className={styles["stop-name"]}>
			<span
				style={inlineStyles}
				className={classNames(
					styles["stop-name-code"],
					styles[`stop-name-code-${stop?.vehicleMode}`]
				)}
			>
				{stop?.code}
			</span>
			<span>{stop?.name}</span>
		</div>
	);
}

export default function RouteInformation({ legs }: Props) {
	if (!legs || !legs.length) return <div>No routes data available</div>;
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
								<div className={styles["leg-header-transport-short-name"]}>{leg?.route?.shortName}</div>
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
							<StopName stop={leg?.from.stop} />
							<div className={styles["stop-departure-time"]}>
								{msToHoursMinutes(leg?.from.departureTime)}
							</div>
						</div>
						<div className={styles["leg-stop-and-time"]}>
							<StopName stop={leg?.to.stop} />
							<div className={styles["stop-departure-time"]}>
								{msToHoursMinutes(leg?.to.departureTime)}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
