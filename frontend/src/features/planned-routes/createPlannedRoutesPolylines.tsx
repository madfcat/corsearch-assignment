import { Polyline, Popup } from "react-leaflet";
import polyline from "polyline";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { JSX } from "react";
import { Edges } from "../../types/types";
import RoundMarker from "../../components/round-marker/RoundMarker";
import pickTransportColor from "../../shared/pickTransportColor";

export default function createPlannedRoutesPolylines(edges: Edges) {
	const routesPolylines: JSX.Element[][] = [];

	// console.log("edges:", edges);

	edges?.forEach((edge) => {
		const legs = edge?.node?.legs;
		if (legs?.length === 0) return null;

		const LegPolylines: JSX.Element[] = [];
		legs?.forEach((leg, index) => {
			const color = pickTransportColor(leg?.mode);

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
						iconSize={{ width: 24, height: 24 }}
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
						iconSize={{ width: 24, height: 24 }}
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
							iconSize={{ width: 17, height: 17 }}
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
