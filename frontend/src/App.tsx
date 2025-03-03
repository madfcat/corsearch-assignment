import "./App.scss";
import "leaflet/dist/leaflet.css";
import createPlannedRoutesPolylines from "./features/planned-routes/createPlannedRoutesPolylines";
import { useState } from "react";
import {
	// PlanConnection,
	// PlanConnectionQuery,
	usePlanConnectionQuery,
} from "./gql/graphql";
import RoutesMap from "./modules/routes-map/RoutesMap";

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
		<>
			<RoutesMap
				edges={edges}
				routesPolylines={routesPolylines}
				choice={choice}
				setChoice={setChoice}
			/>
		</>
	);
}

export default App;
