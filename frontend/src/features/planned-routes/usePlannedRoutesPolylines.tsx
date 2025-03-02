import { Polyline } from "react-leaflet";
import { Mode, usePlanConnectionQuery } from "../../gql/graphql";
import polyline from "polyline";
import { LatLngTuple } from "leaflet";
import { JSX } from "react";

type Variables = {
	originLat: number;
	originLon: number;
	destinationLat: number;
	destinationLon: number;
};

type PickedMode = Mode.Bus | Mode.Tram | Mode.Subway | Mode.Walk | "DEFAULT";

const colors: Record<PickedMode, string> = {
	[Mode.Bus]: "#ff8800",
	[Mode.Tram]: "#00ff00",
	[Mode.Subway]: "#0000FF",
	[Mode.Walk]: "#FF0000",
	DEFAULT: "#ff00e1",
};

export default function usePlannedRoutesPolylines(variables: Variables) {
	const { loading, error, data } = usePlanConnectionQuery({ variables });
	const routesPolylines: JSX.Element[][] = [];
	if (loading || error) return routesPolylines;

	console.log("data:", data);

	data?.planConnection?.edges?.forEach((edge) => {
		const legs = edge?.node?.legs;
		if (legs?.length === 0) return null;

		const LegPolylines: JSX.Element[] = [];
		legs?.forEach((leg, index) => {
			console.log(leg?.mode);
			const encodedPolyline = leg?.legGeometry?.points;
			if (!encodedPolyline) return null;

			const decodedCoordinates = polyline.decode(
				encodedPolyline
			) as LatLngTuple[];

			// const path = decodedPath.map(([lat, lng]) => [lat, lng]);
			const mode: PickedMode =
				leg?.mode === Mode.Bus ||
				leg?.mode === Mode.Tram ||
				leg?.mode === Mode.Subway ||
				leg?.mode === Mode.Walk
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
		});

		routesPolylines.push(LegPolylines);
	});
	return routesPolylines;
}
