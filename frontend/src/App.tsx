import "./App.css";
import "leaflet/dist/leaflet.css";
import Map from "./components/map/Map";
import usePlannedRoutesPolylines from "./features/planned-routes/usePlannedRoutesPolylines";
import { useState } from "react";
import { usePlanConnectionQuery } from "./gql/graphql";

const coords = {
	originLat: 60.169718,
	originLon: 24.937737,
	destinationLat: 60.19956365,
	destinationLon: 24.95928,
};

function App() {
	const [choice, setChoice] = useState<number>(0);
	const { loading, error, data } = usePlanConnectionQuery({
		variables: coords,
	});
	const routesPolylines = usePlannedRoutesPolylines(data);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error occured...</p>;
	console.log(routesPolylines);
	if (routesPolylines.length === 0) return <p>No data...</p>;

	const edge = data?.planConnection?.edges?.[choice];
	if (!edge) return <p>No edge data available</p>;

	const legs = edge?.node?.legs;

	return (
		<>
			{legs?.map((leg, index) => {
				console.log("leg", leg);
				return (
					<p key={index}>
						{leg?.mode || "Unknown Mode"} - {leg?.route?.shortName}<br/>
						From: {leg?.from.stop?.code} - {leg?.from.stop?.name}<br/>
						To: {leg?.to.stop?.code} - {leg?.to.stop?.name}<br/>
					</p>
				);
			})}
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
