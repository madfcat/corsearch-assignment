import { Edges } from "../../types/types";
import { secondsToTime } from "../../shared/time";

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
