import { configureStore } from "@reduxjs/toolkit";
import routesReducer from "../features/routesSlice";
import edgesReducer from "../features/edgesSlice";
import orderReducer from "../features/orderSlice";
import mapReducer from "../features/mapSlice";

export const store = configureStore({
	reducer: {
		routes: routesReducer,
		edges: edgesReducer,
		order: orderReducer,
		map: mapReducer,
	},
});

// Define TypeScript types for better auto-completion
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
