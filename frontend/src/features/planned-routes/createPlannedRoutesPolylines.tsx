import { Polyline, Popup } from "react-leaflet";
import polyline from "polyline";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { JSX } from "react";
import { Edges, PickedMode } from "../../types/types";
import { Mode } from "../../gql/graphql";
import RoundMarker from "../../components/round-marker/RoundMarker";

export const colors: Record<PickedMode, string> = {
	[Mode.Walk]: "#FF0000",
	[Mode.Bus]: "#ff8800",
	[Mode.Tram]: "#00ff00",
	[Mode.Subway]: "#0000FF",
	[Mode.Rail]: "#800080",
	[Mode.Ferry]: "#00eeff",
	DEFAULT: "#7b7b7b",
};

export default function createPlannedRoutesPolylines(edges: Edges) {
	const routesPolylines: JSX.Element[][] = [];

	console.log("edges:", edges);

	edges?.forEach((edge) => {
		const legs = edge?.node?.legs;
		if (legs?.length === 0) return null;

		const LegPolylines: JSX.Element[] = [];
		legs?.forEach((leg, index) => {
			// console.log(leg?.mode);
			const mode: PickedMode =
				leg?.mode === Mode.Bus ||
				leg?.mode === Mode.Tram ||
				leg?.mode === Mode.Subway ||
				leg?.mode === Mode.Walk ||
				leg?.mode === Mode.Rail ||
				leg?.mode === Mode.Ferry
					? leg?.mode
					: "DEFAULT";
			const color = colors[mode];

			// Route
			const encodedPolyline = leg?.legGeometry?.points;
			if (!encodedPolyline) return null;

			const decodedCoordinates = polyline.decode(
				encodedPolyline
			) as LatLngTuple[];

			LegPolylines.push(
				<Polyline
					key={leg?.legGeometry?.points || index}
					positions={decodedCoordinates}
					color={color}
					weight={5}
				/>
			);

			// From Stop
			const fromLat = leg?.from.stop?.lat;
			const fromLon = leg?.from.stop?.lon;
			if (fromLat && fromLon) {
				const fromPosition: LatLngExpression = [fromLat, fromLon];
				LegPolylines.push(
					<RoundMarker
						position={fromPosition}
						key={`${leg?.legGeometry?.points}-${leg?.from.stop?.code}`}
						color={color}
						iconSize={{ width: 22, height: 22 }}
					>
						<Popup>
							{leg?.from.stop?.code} - {leg?.from.stop?.name}
						</Popup>
					</RoundMarker>
				);
			}

			// To Stop
			const toLat = leg?.to.stop?.lat;
			const toLon = leg?.to.stop?.lon;
			if (toLat && toLon) {
				const toPosition: LatLngExpression = [toLat, toLon];
				LegPolylines.push(
					<RoundMarker
						position={toPosition}
						key={`${leg?.legGeometry?.points}-${leg?.to.stop?.code}`}
						color={color}
						iconSize={{ width: 22, height: 22 }}
					>
						<Popup>
							{leg?.to.stop?.code} - {leg?.to.stop?.name}
						</Popup>
					</RoundMarker>
				);
			}

			// Intermediate Stops
			leg?.intermediateStops?.forEach((stop) => {
				const interLat = stop?.lat;
				const interLon = stop?.lon;
				if (interLat && interLon) {
					const toPosition: LatLngExpression = [interLat, interLon];
					LegPolylines.push(
						<RoundMarker
							position={toPosition}
							key={`${leg?.legGeometry?.points}-${stop.code}`}
							color={color}
							iconSize={{ width: 18, height: 18 }}
						>
							<Popup>
								{stop.code} - {stop.name}
							</Popup>
						</RoundMarker>
					);
				}
			});
		});

		routesPolylines.push(LegPolylines);
	});
	return routesPolylines;
}
