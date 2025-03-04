import { Leg } from "../../../types/types";
import { metersToDistance, secondsToTime } from "../../../shared/converters";
import TransportIcon from "../../../components/transport-icon/TransportIcon";
import styles from "./styles.module.scss";
import pickTransportColor from "../../../shared/pickTransportColor";

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

	return (
		<div className={styles["stop-name"]}>
			{/* <span>From: </span> */}
			<span style={inlineStyles} className={styles["stop-name-code"]}>
				{stop?.code}
			</span>
			<span>{stop?.name}</span>
		</div>
	);
}

export default function RouteInformation({ legs }: Props) {
	if (!legs || !legs.length) return <div>No routes data available</div>;
	return (
		<div className="route-information">
			{/* <p>Distance: {secondsToTime(edge?.node.)}</p> */}
			{legs?.map((leg, index) => {
				// console.log("leg", leg);

				return (
					<div key={index}>
						<div>Duration: {secondsToTime(leg?.duration)}</div>
						<div>Distance: {metersToDistance(leg?.distance)}</div>
						<div>
							<TransportIcon mode={leg?.mode} />
							{leg?.route?.shortName}
						</div>
						<StopName stop={leg?.from.stop} />
						<StopName stop={leg?.to.stop} />
					</div>
				);
			})}
		</div>
	);
}
