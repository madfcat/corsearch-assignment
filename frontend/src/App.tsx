import "./App.css";
import "leaflet/dist/leaflet.css";
import Map from "./components/map/Map";
import usePlannedRoutesPolylines from "./features/planned-routes/usePlannedRoutesPolylines";
import { useState } from "react";

const coords = {
	originLat: 60.169718,
	originLon: 24.937737,
	destinationLat: 60.19956365,
	destinationLon: 24.95928,
};

function App() {
	const [choice, setChoice] = useState<number>(0);
	const routesPolylines = usePlannedRoutesPolylines(coords);
	console.log(routesPolylines);
	if (routesPolylines.length === 0) return <p>No data...</p>;

	return (
		<>
			<select
				onChange={(e) => setChoice(parseInt(e.target.value))}
				value={choice}
			>
				{routesPolylines.map((_, index) => (
					<option key={index} value={index}>
						Route {index + 1}
					</option>
				))}
			</select>
			<Map leafletNodes={routesPolylines[choice]} />
		</>
	);
}

export default App;
