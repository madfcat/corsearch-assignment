import { configureStore } from "@reduxjs/toolkit";
import routesReducer from "../features/routesSlice";

export const store = configureStore({
	reducer: {
		routes: routesReducer,
	},
});

// Define TypeScript types for better auto-completion
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
