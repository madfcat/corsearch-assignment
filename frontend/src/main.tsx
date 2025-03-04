import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.scss";
import App from "./App.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const GRAPHQL_URI =
	import.meta.env.VITE_REACT_APP_GRAPHQL_URI || "http://localhost:4000/graphql";

const client = new ApolloClient({
	// uri: '/api/graphql',
	uri: GRAPHQL_URI,
	cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</Provider>
	</StrictMode>
);
