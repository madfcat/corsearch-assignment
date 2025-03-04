import { useEffect } from "react";
import RouteDetails from "./RouteDetails";
import styles from "./styles.module.scss";
import RouteTab from "./RouteTab";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export default function AvailableRoutes() {
	const indexDetailsOpen = useSelector(
		(state: RootState) => state.routes.indexDetailsOpen
	);
	const initialLoad = useSelector(
		(state: RootState) => state.routes.initialLoad
	);
	const edges = useSelector(
		(state: RootState) => state.edges.edges
	);

	useEffect(() => {
		console.log("indexDetailsOpen, initialLoad:", indexDetailsOpen, initialLoad);
		if (!initialLoad) {
			document
				?.getElementById(`available-route-${indexDetailsOpen}`)
				?.scrollIntoView({
					behavior: "smooth",
				});
		}
	}, [indexDetailsOpen, initialLoad]);



	return (
		<div className={styles["available-routes"]}>
			{edges.map((edge, index) => {
				if (!edge) return null;
				return (
					<details
						className={styles["available-route"]}
						id={`available-route-${index}`}
						key={index}
						open={index === indexDetailsOpen}
					>
						<RouteTab
							index={index}
							edge={edge}
						/>
						<RouteDetails edge={edge} />
					</details>
				);
			})}
		</div>
	);
}
