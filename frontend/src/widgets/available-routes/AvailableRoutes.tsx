import styles from "./styles.module.scss";
import { useEffect } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import AvailableRouteCard from "./available-route-card/AvailableRouteCard";

export default function AvailableRoutes() {
	const mapUpdating = useSelector((state: RootState) => state.map.mapUpdating);
	const indexDetailsOpen = useSelector(
		(state: RootState) => state.routes.indexDetailsOpen
	);
	const initialLoad = useSelector(
		(state: RootState) => state.routes.initialLoad
	);
	const edges = useSelector((state: RootState) => state.edges.edges);
	const order = useSelector((state: RootState) => state.order.order);

	useEffect(() => {
		if (!initialLoad) {
			document
				?.getElementById(`available-route-${indexDetailsOpen}`)
				?.scrollIntoView({
					behavior: "smooth",
				});
		}
	}, [indexDetailsOpen, initialLoad]);

	const flexDirection = order === "asc" ? "column" : "column-reverse";

	return (
		<div className={styles["available-routes"]} style={{ flexDirection }}>
			{!mapUpdating ? (
				<>
					{edges.length > 0 ? (
						edges.map((edge, index) => {
							if (!edge) return null;
							return (
								<AvailableRouteCard
									key={index}
									index={index}
									edge={edge}
									indexDetailsOpen={indexDetailsOpen}
								/>
							);
						})
					) : (
						<div className={styles["available-routes-instructions"]}>
							{(initialLoad) ? (<>
							<p>Available routes will be shown here.</p>
							<p>
								Please, fill your location and destination into the above fields
								or use right click mouse button on the map directly.
							</p>
							</>) : (
								<p>No routes found. Try other locations.</p>
							)}
						</div>
					)}
				</>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
}
