import "./App.scss";
import RoutesMap from "./pages/routes-map/RoutesMap";
// import { usePlanConnectionQuery } from "./gql/graphql";
// import { useDispatch } from "react-redux";
// import { setEdges } from "./features/edgesSlice";

// const coords = {
// 	originLat: 60.169718,
// 	originLon: 24.937737,
// 	destinationLat: 60.19956365,
// 	destinationLon: 24.95928,
// };

function App() {
	// const { loading, error, data } = usePlanConnectionQuery({
	// 	variables: coords,
	// });
	// const dispatch = useDispatch();
	// if (loading) return <p>Loading...</p>;
	// if (error) return <p>Error occured: {error.cause?.message}</p>;

	// const edges = data?.planConnection?.edges || [];
	// dispatch(setEdges(edges));

	return (
		<>
			<RoutesMap />
		</>
	);
}

export default App;
