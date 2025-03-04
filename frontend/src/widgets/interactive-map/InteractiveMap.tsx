import styles from "./styles.module.scss";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import createPlannedRoutesPolylines from "../../features/planned-routes/createPlannedRoutesPolylines";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export default function InteractiveMap() {
	const indexDetailsOpen = useSelector(
		(state: RootState) => state.routes.indexDetailsOpen
	);
	const edges = useSelector((state: RootState) => state.edges.edges);

	const routesPolylines = createPlannedRoutesPolylines(edges);
	// console.log(routesPolylines);
	if (routesPolylines.length === 0) return <p>No data...</p>;

	const leafletNodes = routesPolylines[indexDetailsOpen];
	return (
		<MapContainer
			className={styles["map-container"]}
			center={[60.1699, 24.9384]}
			zoom={13}
			scrollWheelZoom={false}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{leafletNodes}
		</MapContainer>
	);
}
