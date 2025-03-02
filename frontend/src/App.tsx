import "./App.scss";
import "leaflet/dist/leaflet.css";
import Map from "./components/map/Map";
import createPlannedRoutesPolylines from "./features/planned-routes/createPlannedRoutesPolylines";
import { useState } from "react";
import {
	// PlanConnection,
	// PlanConnectionQuery,
	usePlanConnectionQuery,
} from "./gql/graphql";
import AvailableRoutes from "./widgets/available-routes/AvailableRoutes";

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
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error occured...</p>;

	const edges = data?.planConnection?.edges || [];
	const routesPolylines = createPlannedRoutesPolylines(edges);
	console.log(routesPolylines);
	if (routesPolylines.length === 0) return <p>No data...</p>;

	return (
		<div>
			<div>
				<AvailableRoutes edges={edges} setChoice={setChoice} />
			</div>
			<div>
				<Map leafletNodes={routesPolylines[choice]} />
			</div>
		</div>
	);
}

export default App;
