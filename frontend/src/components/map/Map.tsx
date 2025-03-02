import { MapContainer, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

type Props = {
	leafletNodes: React.ReactNode;
};

export default function Map({ leafletNodes }: Props) {
	const styles = {
		width: "1000px",
		height: "1000px",
	};

	// console.log(markers);
	return (
		<div>
			<MapContainer
				className="map"
				style={styles}
				center={[60.1699, 24.9384]}
				zoom={13}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{leafletNodes}
				{/* <Marker position={[51.505, -0.09]}>
		<Popup>
			A pretty CSS3 popup. <br /> Easily customizable.
		</Popup>
	</Marker> */}
			</MapContainer>
		</div>
	);
}

// import { MapContainer, TileLayer, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import polyline from "polyline";

// // Example route data (replace with your real legGeometry.points)
// const encodedPolyline = "wwfnJyjdwCXlAHLNfAFHDZz@nEh@hBXfA\\hAR^VLnChAD@H..."; // Truncated

// const decodedPath = polyline.decode(encodedPolyline);

// // Convert decoded path to Leaflet format
// const path = decodedPath.map(([lat, lng]) => [lat, lng]);

// const center = path.length > 0 ? path[0] : [60.1699, 24.9384]; // Default to Helsinki if no data

// // const Map = () => {
// // 	return (
// // 		<MapContainer
// // 			center={center}
// // 			zoom={13}
// // 			style={{ height: "500px", width: "100%" }}
// // 		>
// // 			{/* OpenStreetMap Tiles */}
// // 			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

// // 			{/* Draw Route */}
// // 			<Polyline pathOptions={{ color: "blue" }} positions={path} />
// // 		</MapContainer>
// // 	);
// // };

// <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
//   <TileLayer
//     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//   />
//   <Marker position={[51.505, -0.09]}>
//     <Popup>
//       A pretty CSS3 popup. <br /> Easily customizable.
//     </Popup>
//   </Marker>
// </MapContainer>

// export default Map;
