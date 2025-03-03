import styles from "./styles.module.scss";
import AvailableRoutes from "../../widgets/available-routes/AvailableRoutes";
import InteractiveMap from "../../widgets/map/InteractiveMap";
import IconButton from "../../components/icon-button/IconButton";
import Refresh from '@material-design-icons/svg/round/refresh.svg?react';

type Props = {
	edges: any;
	routesPolylines: any;
	choice: any;
	setChoice: any;
};

export default function RoutesMap({
	edges,
	routesPolylines,
	choice,
	setChoice,
}: Props) {
	return (
		<div className={styles["routes-map"]}>
			<div className={styles["map-container"]}>
				<div className={styles["trips-header-container"]}>
					<div className={styles["trips-header-text"]}>Available trips</div>
					<div className={styles["trips-header-refresh"]}>
						<IconButton ariaLabel="refresh">
							<Refresh />
						</IconButton>
					</div>
				</div>
				<AvailableRoutes edges={edges} setChoice={setChoice} />
			</div>
			<div className={styles["map-container"]}>
				<InteractiveMap leafletNodes={routesPolylines[choice]} />
			</div>
		</div>
	);
}
