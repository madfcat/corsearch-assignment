import type { CodegenConfig } from "@graphql-codegen/cli";

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
const GRAPHQL_API_TOKEN = process.env.GRAPHQL_API_TOKEN;
if (!GRAPHQL_ENDPOINT || !GRAPHQL_API_TOKEN) {
	throw new Error(
		"Codegen: GRAPHQL_ENDPOINT or GRAPHQL_API_TOKEN is not defined in environment variables."
	);
}

console.log("Codegen: Generating GraphQL code from", GRAPHQL_ENDPOINT);
console.log("Codegen: Using API token", GRAPHQL_API_TOKEN);

const config: CodegenConfig = {
	schema: [
		{
			// "https://api.digitransit.fi/routing/v2/hsl/gtfs/v1": {
			[GRAPHQL_ENDPOINT]: {
				headers: {
					"Content-Type": "application/json",
					"digitransit-subscription-key": GRAPHQL_API_TOKEN,
				},
			},
		},
	],
	// documents: ["src/gql/**/*.gql"],
	documents: ["src/gql/**/*.tsx"],
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		"./src/gql/graphql.tsx": {
			plugins: [
				"typescript",
				"typescript-operations",
				"typescript-react-apollo",
			],
			config: {
				withComponent: true,
			},
		},
		// "./src/global.d.ts": {
		// 	plugins: ["typescript-graphql-files-modules"],
		// 	config: {
		// 		withComponent: true,
		// 	},
		// },
	},
	verbose: true,
};

export default config;
