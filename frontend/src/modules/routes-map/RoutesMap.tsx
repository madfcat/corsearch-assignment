import styles from "./styles.module.scss";
import AvailableRoutes from "../../widgets/available-routes/AvailableRoutes";
import AvailableRoutesHeader from "../../widgets/available-routes/available-routes-header/AvialableRoutesHeader";
import InteractiveMap from "../../widgets/interactive-map/InteractiveMap";

export default function RoutesMap() {
	return (
		<div className={styles["routes-map"]}>
			<div className={styles["trips-container"]}>
				<AvailableRoutesHeader />
				<AvailableRoutes />
			</div>
			<div className={styles["map-container"]}>
				<InteractiveMap />
			</div>
		</div>
	);
}
