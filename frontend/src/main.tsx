import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.scss";
import App from "./App.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { getBackendUrl } from "./config";

const client = new ApolloClient({
	// uri: '/api/graphql',
	uri: `${getBackendUrl()}/graphql`,
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
