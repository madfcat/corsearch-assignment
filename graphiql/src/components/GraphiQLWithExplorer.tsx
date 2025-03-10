import { GraphiQL } from "graphiql";
import { explorerPlugin } from "@graphiql/plugin-explorer";
import "graphiql/graphiql.min.css";
import "@graphiql/plugin-explorer/dist/style.css";

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

export default function GraphiQLWithExplorer() {
	const explorer = explorerPlugin();

	return <GraphiQL fetcher={fetcher} plugins={[explorer]} />;
}
