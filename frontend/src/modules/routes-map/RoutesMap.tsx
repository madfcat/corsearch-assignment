import styles from "./styles.module.scss";
import AvailableRoutes from "../../widgets/available-routes/AvailableRoutes";
import AvilableRoutesHeader from "../../widgets/available-routes/AvilableRoutesHeader";
import InteractiveMap from "../../widgets/interactive-map/InteractiveMap";

export default function RoutesMap() {
	return (
		<div className={styles["routes-map"]}>
			<div className={styles["trips-container"]}>
				<AvilableRoutesHeader />
				<AvailableRoutes />
			</div>
			<div className={styles["map-container"]}>
				<InteractiveMap />
			</div>
		</div>
	);
}
