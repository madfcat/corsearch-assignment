import { configureStore } from "@reduxjs/toolkit";
import routesReducer from "../features/routesSlice";
import edgesReducer from "../features/edgesSlice";

export const store = configureStore({
	reducer: {
		routes: routesReducer,
		edges: edgesReducer
	},
});

// Define TypeScript types for better auto-completion
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
