import styles from "./styles.module.scss";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import createPlannedRoutesPolylines from "../../features/planned-routes/createPlannedRoutesPolylines";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import {
	getShouldRefetch,
	setEdges,
	setShouldRefetch,
	sortEdges,
} from "../../features/edgesSlice";
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
import { debounceAsync } from "../../shared/debounce";
import { BACKEND_URL } from "../../config";
import { PeliasReverseResponse } from "../../types/types";
import Spinner from "../../components/spinner/Spinner";
import {
	getChosenGeneralButton,
	getChosenTransportButtons,
} from "../../features/filterSlice";
import { setInitialLoad } from "../../features/routesSlice";

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
	const [edgesLoading, setEdgesLoading] = useState(false);

	const mapUpdating = useSelector((state: RootState) => state.map.mapUpdating);
	const startPoint = useSelector((state: RootState) => state.map.startPoint);
	const endPoint = useSelector((state: RootState) => state.map.endPoint);
	const startName = useSelector((state: RootState) => state.map.startName);
	const endName = useSelector((state: RootState) => state.map.endName);

	const indexDetailsOpen = useSelector(
		(state: RootState) => state.routes.indexDetailsOpen
	);
	const edges = useSelector((state: RootState) => state.edges.edges);
	const dispatch = useDispatch();
	const chosenGeneralButton = useSelector(getChosenGeneralButton);

	const planTransitModePreferenceInput = useSelector(getChosenTransportButtons);
	// console.log(JSON.stringify(planTransitModePreferenceInput, null, 2));

	const shouldRefetch = useSelector(getShouldRefetch);

	const variables = {
		originLat: startPoint?.lat || 0,
		originLon: startPoint?.lng || 0,
		destinationLat: endPoint?.lat || 0,
		destinationLon: endPoint?.lng || 0,
		planTransitModePreferenceInput,
	};

	const { refetch } = usePlanConnectionQuery({
		variables,
	});

	useEffect(() => {
		async function updateEdges() {
			console.log("Refetching data from map...");
			try {
				setEdgesLoading(true);
				dispatch(setMapUpdating(true));
				const { data } = await refetch(); // Triggers a new fetch
				console.log("Data fetched:", data);
				const edges = data?.planConnection?.edges || [];
				dispatch(setEdges(edges));
				console.log("Refreshed data:", edges);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				dispatch(setMapUpdating(false));
				setEdgesLoading(false);
				dispatch(setShouldRefetch(false));
			}
		}

		if (shouldRefetch && startPoint && endPoint) {
			updateEdges();
		}
	}, [refetch, dispatch, shouldRefetch, startPoint, endPoint]);
	// }, [refetch, dispatch, shouldRefetch]);

	useEffect(() => {
		if (edgesLoading) return;
		dispatch(sortEdges(chosenGeneralButton?.callbackKey));
	}, [chosenGeneralButton?.callbackKey, dispatch, edgesLoading]);

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

	const fetchReverseGeo = async (point: {
		lat: number;
		lon: number;
	}): Promise<PeliasReverseResponse> => {
		console.log("handle change from debounce");
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
	};

	const fetchReverseGeoLogic = async (
		point: {
			lat: number;
			lon: number;
		},
		option: "start" | "end"
	) => {
		try {
			const data = await fetchReverseGeo(point);

			const locationName = data.features[0].properties.label;
			if (option === "start") {
				dispatch(setStartName(locationName));
			} else {
				dispatch(setEndName(locationName));
			}
			dispatch(setShouldRefetch(true));
		} catch (error) {
			console.error("Error selecting location:", error);
		}
	};

	const debounceSelectFetching = useRef({
		start: debounceAsync(fetchReverseGeoLogic, 1000),
		end: debounceAsync(fetchReverseGeoLogic, 1000),
	}).current;

	async function handleSelect(option: "start" | "end") {
		if (contextMenu) {
			const point = {
				lat: contextMenu.lat,
				lon: contextMenu.lon,
			};
			if (option === "start") {
				dispatch(setStartPoint({ lat: point.lat, lng: point.lon }));
			} else {
				dispatch(setEndPoint({ lat: point.lat, lng: point.lon }));
			}
			dispatch(setInitialLoad(true));
			dispatch(setEdges([]));
			setContextMenu(null); // Close menu after selection
			await debounceSelectFetching[option](point, option);
		}
	}

	// console.log("Edges on the map:", edges);
	// console.log("startPoint:", startPoint);
	// console.log("endPoint:", endPoint);
	const routesPolylines = useMemo(
		() => createPlannedRoutesPolylines(edges),
		[edges]
	);
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
					>
						{startName && <Popup>{startName}</Popup>}
					</Marker>
				)}
				{endPoint && (
					<Marker
						position={endPoint}
						icon={renderMarkerIcon({ width: 20, height: 20 }, <Flag />)}
					>
						{endName && <Popup>{endName}</Popup>}
					</Marker>
				)}
				{!mapUpdating ? <>{leafletNodes}</> : <div>Loading...</div>}
			</MapContainer>
		</>
	);
}
