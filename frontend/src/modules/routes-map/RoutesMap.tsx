import styles from "./styles.module.scss";
import AvailableRoutes from "../../widgets/available-routes/AvailableRoutes";
import InteractiveMap from "../../widgets/interactive-map/InteractiveMap";
import IconButton from "../../components/icon-button/IconButton";
import Icon from "../../components/icon/Icon";

export default function RoutesMap() {
	return (
		<div className={styles["routes-map"]}>
			<div className={styles["trips-container"]}>
				<div className={styles["trips-header-container"]}>
					<div className={styles["trips-header-text"]}>Available trips</div>
					<div className={styles["trips-header-refresh"]}>
						<IconButton ariaLabel="refresh">
							<Icon svgIconName="refresh" />
						</IconButton>
					</div>
				</div>
				<AvailableRoutes />
			</div>
			<div className={styles["map-container"]}>
				<InteractiveMap />
			</div>
		</div>
	);
}
