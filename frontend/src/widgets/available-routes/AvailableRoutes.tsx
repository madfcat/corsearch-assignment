import { useState } from "react";
import { Edges, Leg } from "../../types/types";
import AvailableRouteDetails from "./AvailableRouteDetails";

type Props = { edges: Edges; setChoice: (index: number) => void };

function createRouteName(legs: Leg[]) {
	return legs
		.map((leg) => {
			const mode = leg?.mode || "Unknown Mode";
			const route = leg?.route?.shortName || "Unknown Route";
			return `${mode} - ${route}`;
		})
		.join(" -> ");
}

export default function AvailableRoutes({ edges, setChoice }: Props) {
	const [indexDetailsOpen, setIndexDetailsOpen] = useState<number>(0);

	function handleClick(index: number, event: React.MouseEvent) {
		event.preventDefault();
		setIndexDetailsOpen(index === indexDetailsOpen ? -1 : index);
		setChoice(index);
	}

	return (
		<div>
			{edges.map((edge, index) => {
				if (!edge) return null;
				return (
					<details key={index} open={index === indexDetailsOpen}>
						<summary onClick={(event) => handleClick(index, event)}>
							{createRouteName(edge.node.legs)}
						</summary>
						{!edge ? (
							<p>No edge data available</p>
						) : (
							<AvailableRouteDetails edge={edge} />
						)}
					</details>
				);
			})}
		</div>
	);
}
