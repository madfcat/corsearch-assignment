import { useState } from "react";
import { Edges, Leg } from "../../types/types";
import AvailableRouteDetails from "./AvailableRouteDetails";
import styles from "./styles.module.scss";
import { secondsToTime } from "../../shared/time";

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
		// setIndexDetailsOpen(index === indexDetailsOpen ? -1 : index);
		setIndexDetailsOpen(index);
		setChoice(index);
	}

	return (
		<div>
			{edges.map((edge, index) => {
				if (!edge) return null;
				return (
					<details
						className={styles["available-route"]}
						key={index}
						open={index === indexDetailsOpen}
					>
						<summary onClick={(event) => handleClick(index, event)}>
							<div className={styles["route-name"]}>
								{createRouteName(edge.node.legs)}
							</div>
							<div>
								{edge.node.duration ? (
									<span>{secondsToTime(edge.node.duration)}</span>
								) : (
									<span>Unknown duration</span>
								)}
							</div>
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
