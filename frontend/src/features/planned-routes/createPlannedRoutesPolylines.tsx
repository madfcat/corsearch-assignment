import { Marker, Polyline, Popup } from "react-leaflet";
import polyline from "polyline";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { JSX } from "react";
import { Edges, PickedMode } from "../../types/types";
import { Mode } from "../../gql/graphql";

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
			const encodedPolyline = leg?.legGeometry?.points;
			if (!encodedPolyline) return null;

			const decodedCoordinates = polyline.decode(
				encodedPolyline
			) as LatLngTuple[];

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

			LegPolylines.push(
				<Polyline
					key={leg?.legGeometry?.points || index}
					positions={decodedCoordinates}
					color={color}
					weight={5}
				/>
			);
			const fromLat = leg?.from.stop?.lat;
			const fromLon = leg?.from.stop?.lon;
			if (fromLat && fromLon) {
				const fromPosition: LatLngExpression = [fromLat, fromLon];
				LegPolylines.push(
					<Marker
						position={fromPosition}
						key={`${leg?.legGeometry?.points}-${leg?.from.stop?.code}`}
					>
						<Popup>
							{leg?.from.stop?.code} - {leg?.from.stop?.name}
						</Popup>
					</Marker>
				);
			}
			const toLat = leg?.to.stop?.lat;
			const toLon = leg?.to.stop?.lon;
			if (toLat && toLon) {
				const toPosition: LatLngExpression = [toLat, toLon];
				LegPolylines.push(
					<Marker
						position={toPosition}
						key={`${leg?.legGeometry?.points}-${leg?.to.stop?.code}`}
					>
						<Popup>
							{leg?.to.stop?.code} - {leg?.to.stop?.name}
						</Popup>
					</Marker>
				);
			}
		});

		routesPolylines.push(LegPolylines);
	});
	return routesPolylines;
}
