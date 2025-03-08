import styles from "./styles.module.scss";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import createPlannedRoutesPolylines from "../../features/planned-routes/createPlannedRoutesPolylines";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setEdges, sortEdges } from "../../features/edgesSlice";
// import { setEdges } from "../../features/edgesSlice";
import L from "leaflet";
import { usePlanConnectionQuery } from "../../gql/graphql";
import StartEndMenu from "./start-end-menu/StartEndMenu";
import Flag from "@material-design-icons/svg/round/flag.svg?react";
import LocationOn from "@material-design-icons/svg/round/location_on.svg?react";
import { renderToStaticMarkup } from "react-dom/server";
import {
	setEndName,
	setEndPoint,
	setMapUpdating,
	setStartName,
	setStartPoint,
} from "../../features/mapSlice";
import { debounce } from "../../shared/debounce";
import { BACKEND_URL } from "../../config";
import { PeliasReverseResponse } from "../../types/types";
import Spinner from "../../components/spinner/Spinner";
import { getChosenGeneralButton } from "../../features/filterSlice";

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

const debouncedSelect = debounce(
	async (
		point: {
			lat: number;
			lon: number;
		},
		callbackFunc: () => void
	): Promise<PeliasReverseResponse> => {
		console.log("handle change from debounce");
		callbackFunc();
		const res = await fetch(`${BACKEND_URL}/geo/reverse`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ point }),
		});
		if (!res) {
			throw new Error(`Response failed: ${res}`);
		}
		const data = await res.json();
		console.log(data);
		return data;
	},
	500
);

export default function InteractiveMap() {
	const [contextMenu, setContextMenu] = useState<{
		lat: number;
		lon: number;
		x: number;
		y: number;
	} | null>(null);

	const mapUpdating = useSelector((state: RootState) => state.map.mapUpdating);
	const startPoint = useSelector((state: RootState) => state.map.startPoint);
	const endPoint = useSelector((state: RootState) => state.map.endPoint);

	const indexDetailsOpen = useSelector(
		(state: RootState) => state.routes.indexDetailsOpen
	);
	const edges = useSelector((state: RootState) => state.edges.edges);
	const dispatch = useDispatch();
	const chosenGeneralButton = useSelector(getChosenGeneralButton);

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
			// dispatch(setMapUpdating(true));
			refetch();
			try {
				dispatch(setMapUpdating(true));
				const { data } = await refetch(); // Triggers a new fetch
				console.log("Data fetched:", data);
				const edges = data?.planConnection?.edges || [];
				dispatch(setEdges(edges));
				console.log("Refreshed data:", edges);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				// setStartPoint(null);
				// setEndPoint(null);
				dispatch(setMapUpdating(false));
			}
		}

		if (startPoint && endPoint) {
			console.log("startPoint && endPoint", startPoint, endPoint);
			updateEdges();
		}
	}, [startPoint, endPoint, refetch, dispatch]);

	useEffect(() => {
		dispatch(sortEdges(chosenGeneralButton?.callbackKey));
	}, [chosenGeneralButton?.callbackKey, startPoint, endPoint, dispatch]);

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
			},
		});

		return null;
	}

	async function handleSelect(option: "start" | "end") {
		if (contextMenu) {
			const point = {
				lat: contextMenu.lat,
				lon: contextMenu.lon,
			};
			setContextMenu(null); // Close menu after selection
			const data = await debouncedSelect(point, () =>
				dispatch(setMapUpdating(true))
			);

			const locationName = data.features[0].properties.label;
			if (option === "start") {
				dispatch(setStartName(locationName));
				dispatch(setStartPoint({ lat: point.lat, lng: point.lon }));
			} else {
				dispatch(setEndName(locationName));
				dispatch(setEndPoint({ lat: point.lat, lng: point.lon }));
			}
			dispatch(setMapUpdating(false));
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
			{contextMenu && !mapUpdating && (
				<StartEndMenu contextMenu={contextMenu} handleSelect={handleSelect} />
			)}
			<MapContainer
				className={styles["map-container"]}
				center={[60.1699, 24.9384]}
				zoom={13}
				scrollWheelZoom={false}
			>
				{mapUpdating && (
					<div className={styles["loading-spinner-container"]}>
						<div className={styles["loading-background"]}></div>
						<Spinner className={styles["loading-spinner"]} />
					</div>
				)}
				<MapEventHandler />
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
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
				{!mapUpdating ? <>{leafletNodes}</> : <div>Loading...</div>}
			</MapContainer>
		</>
	);
}
