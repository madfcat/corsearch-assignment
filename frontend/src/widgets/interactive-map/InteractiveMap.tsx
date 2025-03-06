import styles from "./styles.module.scss";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import createPlannedRoutesPolylines from "../../features/planned-routes/createPlannedRoutesPolylines";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setEdges } from "../../features/edgesSlice";
import L from "leaflet";
import { usePlanConnectionQuery } from "../../gql/graphql";
import StartEndMenu from "./start-end-menu/StartEndMenu";
import Flag from "@material-design-icons/svg/round/flag.svg?react";
import LocationOn from "@material-design-icons/svg/round/location_on.svg?react";
import { renderToStaticMarkup } from "react-dom/server";
// import { MuiIcon } from "../../types/types";

function renderMarkerIcon(
	iconSize: { width: number; height: number },
	muiIcon: React.ReactNode
) {
	return L.divIcon({
		className: "custom-marker",
		html: renderToStaticMarkup(muiIcon),
		iconSize: [iconSize.width, iconSize.height],
		iconAnchor: [iconSize.width / 2, iconSize.height],
	});
}

export default function InteractiveMap() {
	const [contextMenu, setContextMenu] = useState<{
		lat: number;
		lon: number;
		x: number;
		y: number;
	} | null>(null);
	const [startPoint, setStartPoint] = useState<L.LatLng | null>(null);
	const [endPoint, setEndPoint] = useState<L.LatLng | null>(null);

	const indexDetailsOpen = useSelector(
		(state: RootState) => state.routes.indexDetailsOpen
	);
	const edges = useSelector((state: RootState) => state.edges.edges);
	const dispatch = useDispatch();

	const { refetch } = usePlanConnectionQuery({
		variables: {
			originLat: startPoint?.lat || 0,
			originLon: startPoint?.lng || 0,
			destinationLat: endPoint?.lat || 0,
			destinationLon: endPoint?.lng || 0,
		},
	});

	useEffect(() => {
		async function updateEdges() {
			console.log("Refetching data from map...");
			refetch();
			try {
				const { data } = await refetch(); // Triggers a new fetch
				console.log("Data fetched:", data);
				const edges = data?.planConnection?.edges || [];
				dispatch(setEdges(edges));
				console.log("Refreshed data:", edges);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
			// finally {
			// 	setStartPoint(null);
			// 	setEndPoint(null);
			// }
		}

		if (startPoint && endPoint) {
			updateEdges();
		}
	}, [startPoint, endPoint, refetch, dispatch]);

	function MapEventHandler() {
		useMapEvents({
			contextmenu(event) {
				event.originalEvent.preventDefault(); // Prevent default browser right-click menu

				setContextMenu({
					lat: event.latlng.lat,
					lon: event.latlng.lng,
					x: event.originalEvent.clientX,
					y: event.originalEvent.clientY,
				});
			},
			click() {
				setContextMenu(null);
			},
			dragstart() {
				setContextMenu(null);
			},
			resize() {
				setContextMenu(null);
			}
		});

		return null;
	}

	async function handleSelect(option: "start" | "end") {
		if (contextMenu) {
			if (option === "start")
				setStartPoint(L.latLng(contextMenu.lat, contextMenu.lon));
			else setEndPoint(L.latLng(contextMenu.lat, contextMenu.lon));
			setContextMenu(null); // Close menu after selection
		}
	}

	console.log("Edges on the map:", edges);
	console.log("startPoint:", startPoint);
	console.log("endPoint:", endPoint);
	const routesPolylines = createPlannedRoutesPolylines(edges);
	// console.log(routesPolylines);
	let leafletNodes: React.JSX.Element[] | null = null;
	if (routesPolylines.length !== 0)
		leafletNodes = routesPolylines[indexDetailsOpen];

	return (
		<>
			{contextMenu && (
				<StartEndMenu contextMenu={contextMenu} handleSelect={handleSelect} />
			)}
			<MapContainer
				className={styles["map-container"]}
				center={[60.1699, 24.9384]}
				zoom={13}
				scrollWheelZoom={false}
			>
				<MapEventHandler />
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{leafletNodes}
				{startPoint && (
					<Marker
						position={startPoint}
						icon={renderMarkerIcon({ width: 20, height: 20 }, <LocationOn />)}
					/>
				)}
				{endPoint && (
					<Marker
						position={endPoint}
						icon={renderMarkerIcon({ width: 20, height: 20 }, <Flag />)}
					/>
				)}
			</MapContainer>
		</>
	);
}
