import { Edges } from "../../types/types";
import { metersToDistance, secondsToTime } from "../../shared/converters";
import TransportIcon from "../../components/transport-icon/TransportIcon";

type Props = {
	edge: Edges[number];
};

export default function RouteDetails({ edge }: Props) {
	if (!edge || !edge.node) return <div>No edge data available</div>;

	const legs = edge.node.legs;
	return (
		<div>
			{/* <p>Distance: {secondsToTime(edge?.node.)}</p> */}
			{legs?.map((leg, index) => {
				// console.log("leg", leg);
				return (
					<p key={index}>
						Duration: {secondsToTime(leg?.duration)}
						<br />
						Distance: {metersToDistance(leg?.distance)}
						<br />
						<TransportIcon mode={leg?.mode}/>{leg?.route?.shortName}
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
