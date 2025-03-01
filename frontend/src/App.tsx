import "./App.css";
import { useRentalStationsQuery } from "./gql/graphql";

function App() {
	const { loading, error, data } = useRentalStationsQuery();

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	console.log(data);
	return (
		<>
			<p>hello world</p>
			{/* {data?.vehicleRentalStations?.map} */}
		</>
	);
}

export default App;
