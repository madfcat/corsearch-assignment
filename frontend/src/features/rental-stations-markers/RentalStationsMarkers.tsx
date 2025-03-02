// import { FormFactor, useRentalStationsQuery } from "../../gql/graphql";
import { useRentalStationsQuery } from "../../gql/graphql";
import { Marker, Popup } from "react-leaflet";

export function RentalStationsMarkers() {
	const { loading, error, data } = useRentalStationsQuery();

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	console.log("total rentals: ", data?.vehicleRentalStations?.length)

	const Markers = data?.vehicleRentalStations?.map((station) => {
		if (!station?.lat || !station?.lon) return null;
		// if (!station?.operative) return null;
		// const total = station?.availableVehicles?.byType.filter((vehicles) => {
		// 	return vehicles?.vehicleType?.formFactor === FormFactor.Bicycle;
		// }).length;
		// if (total === 0) return null;

		return (
			<Marker key={station?.id} position={[station?.lat, station?.lon]}>
				<Popup>
					{station?.name} <br />
					{/* {station?.operative ? "Operative" : "Not operative"} <br /> */}
					{station?.availableVehicles?.total} vehicles available <br />
					{station?.availableSpaces?.total} spaces available <br />
					{station.availableSpaces?.byType?.map((space) => (
						<p key={space.vehicleType?.formFactor}>
							{space.vehicleType?.formFactor} : {space.count} spaces
						</p>
					))}
				</Popup>
			</Marker>
		);
	});

	console.log("total after filter: ", Markers?.length);
	return Markers;
}
