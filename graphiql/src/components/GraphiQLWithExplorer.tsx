import { GraphiQL } from "graphiql";
// import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { explorerPlugin } from "@graphiql/plugin-explorer";
import "graphiql/graphiql.min.css";
import "@graphiql/plugin-explorer/dist/style.css";

// const fetcher = createGraphiQLFetcher({
// 	url: "https://api.digitransit.fi/routing/v2/hsl/gtfs/v1",
// 	headers: {
// 		Method: "POST",
// 		"Content-Type": "application/json",
// 		"digitransit-subscription-key": apiToken,
// 	},
// });

const apiToken = import.meta.env.GRAPHQL_API_TOKEN;

const fetcher = async (graphQLParams: any) => {
	const response = await fetch(
		"https://api.digitransit.fi/routing/v2/hsl/gtfs/v1",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"digitransit-subscription-key": apiToken,
			},
			body: JSON.stringify(graphQLParams),
		}
	);
	return response.json().catch(() => response.text());
};

// Pass the explorer props here if you want

export default function GraphiQLWithExplorer() {
	const explorer = explorerPlugin();

	return <GraphiQL fetcher={fetcher} plugins={[explorer]} />;
}

// import { useState } from "react";
// import GraphiQL from "graphiql";
// import { explorerPlugin } from "@graphiql/plugin-explorer";
// import "graphiql/graphiql.min.css";

// const GraphiQLComponent = () => {
// 	const [query, setQuery] = useState("");

// 	// Define the GraphQL fetcher (replace with your API URL)
// 	const graphQLFetcher = async (graphQLParams: any) => {
// 		const response = await fetch("https://api.digitransit.fi/routing/v2/hsl/gtfs/v1", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 				"digitransit-subscription-key": "ccf1755a30fc4d5d99d0e89da6c098c0",
// 			},
// 			body: JSON.stringify(graphQLParams),
// 		});
// 		return response.json().catch(() => response.text());
// 	};

// 	// Add the Explorer plugin
// 	const explorerPlug = explorerPlugin({
// 		query,
// 		onEdit: setQuery,
// 	});

// 	return (
// 		<GraphiQL
// 			fetcher={graphQLFetcher}
// 			query={query}
// 			onEditQuery={setQuery}
// 			plugins={[explorerPlug]}
// 		/>
// 	);
// };

// export default GraphiQLComponent;
