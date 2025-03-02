import { Edges } from "../../types/types";

function secondsToTime(seconds: number | null | undefined): string {
	if (!seconds) return "";
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secondsLeft = seconds % 60;

	const hoursString = hours ? `${hours}h` : "";
	const minutesString = minutes ? `${minutes}m` : "";
	const secondsString = secondsLeft ? `${secondsLeft}s` : "";
	return `${hoursString} ${minutesString} ${secondsString}`;
}

type Props = {
	edge: Edges[number];
}

export default function AvailableRouteDetails({edge}: Props) {
	const legs = edge?.node?.legs;
	return (
		<div>
			<p>Duration: {secondsToTime(edge?.node.duration)}</p>
			{legs?.map((leg, index) => {
				console.log("leg", leg);
				return (
					<p key={index}>
						Duration: {secondsToTime(leg?.duration)}
						<br />
						{leg?.mode || "Unknown Mode"} - {leg?.route?.shortName}
						<br />
						From: {leg?.from.stop?.code} - {leg?.from.stop?.name}
						<br />
						To: {leg?.to.stop?.code} - {leg?.to.stop?.name}
						<br />
					</p>
				);
			})}
		</div>
	);
}
