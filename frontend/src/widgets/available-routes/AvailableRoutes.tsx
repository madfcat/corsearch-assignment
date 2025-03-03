import { useEffect, useState } from "react";
import { Edges } from "../../types/types";
import AvailableRouteDetails from "./AvailableRouteDetails";
import styles from "./styles.module.scss";
import { secondsToTime } from "../../shared/converters";
import RouteName from "./RouteName";

type Props = { edges: Edges; setChoice: (index: number) => void };

export default function AvailableRoutes({ edges, setChoice }: Props) {
	const [indexDetailsOpen, setIndexDetailsOpen] = useState<number>(0);
	const [initialLoad, setInitialLoad] = useState<boolean>(true);

	useEffect(() => {
		if (!initialLoad) {
			document
				?.getElementById(`available-route-${indexDetailsOpen}`)
				?.scrollIntoView({
					behavior: "smooth",
				});
		}
	}, [indexDetailsOpen]);

	function handleClick(index: number, event: React.MouseEvent) {
		event.preventDefault();
		// setIndexDetailsOpen(index === indexDetailsOpen ? -1 : index);
		setIndexDetailsOpen(index);
		setChoice(index);
		if (initialLoad) {
			setInitialLoad(false);
		}
	}

	return (
		<div>
			{edges.map((edge, index) => {
				if (!edge) return null;
				return (
					<details
						className={styles["available-route"]}
						id={`available-route-${index}`}
						key={index}
						open={index === indexDetailsOpen}
					>
						<summary onClick={(event) => handleClick(index, event)}>
							<div className={styles["route-name-container"]}>
								<RouteName legs={edge.node.legs} />
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
