import { Edges } from "../../../types/types";
import RouteInformation from "./RouteInformation";
import RouteTab from "./RouteTab";
import styles from "./styles.module.scss";

type Props = {
	index: number;
	edge: Edges[number];
	indexDetailsOpen: number;
};

export default function AvailableRouteCard({
	index,
	edge,
	indexDetailsOpen,
}: Props) {
	const duration = edge?.node.duration;
	const departureTime = edge?.node.start;
	const arrivalTime = edge?.node.end;
	const legs = edge?.node.legs;

	if (!legs || !legs.length) return <div>No data available for this route</div>;

	return (
		<details
			className={styles["available-route"]}
			id={`available-route-${index}`}
			key={index}
			open={index === indexDetailsOpen}
		>
			<RouteTab
				index={index}
				duration={duration}
				legs={legs}
				departureTime={departureTime}
				arrivalTime={arrivalTime}
			/>
			<RouteInformation legs={legs} />
		</details>
	);
}
