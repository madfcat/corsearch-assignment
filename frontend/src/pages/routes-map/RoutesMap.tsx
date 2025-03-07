import styles from "./styles.module.scss";
import AvailableRoutes from "../../widgets/available-routes/AvailableRoutes";
import AvailableRoutesHeader from "../../widgets/available-routes/available-routes-header/AvailableRoutesHeader";
import InteractiveMap from "../../widgets/interactive-map/InteractiveMap";
import SearchFilter from "../../widgets/search-filter/SearchFilter";

export default function RoutesMap() {
	return (
		<div className={styles["routes-map-filter"]}>
			<SearchFilter />
			<div className={styles["routes-map"]}>
				<div className={styles["trips-container"]}>
					<AvailableRoutesHeader />
					<AvailableRoutes />
				</div>
				<div className={styles["map-container"]}>
					<InteractiveMap />
				</div>
			</div>
		</div>
	);
}
