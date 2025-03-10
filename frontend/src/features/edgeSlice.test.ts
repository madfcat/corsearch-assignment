import { describe, it, expect } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import edgesReducer, {
	setEdges,
	setShouldRefetch,
	EdgesState,
	// sortEdges,
} from "./edgesSlice";
import { edgesData } from "../__test__/edges.mock";
import { Edges } from "../types/types";

describe("edgesSlice", () => {
	// Create a store to test the reducer with the edges slice
	const store = configureStore({
		reducer: {
			edges: edgesReducer,
		},
	});

	it("should return the initial state", () => {
		const initialState: EdgesState = {
			edges: [],
			shouldRefetch: true,
		};

		const state = store.getState().edges;
		expect(state).toEqual(initialState); // Ensure the initial state matches
	});

	it("should update the edges when setEdges is dispatched", () => {
		const newEdges: Edges = edgesData;

		// Dispatch setEdges action
		store.dispatch(setEdges(newEdges));

		// Get the updated state
		const updatedState = store.getState().edges;
		expect(updatedState.edges).toEqual(newEdges); // Ensure the edges were updated correctly
	});

	// it("should sort the edges when sortEdges is dispatched", () => {
	// 	const unsortedEdges: Edges = edgesData;

	// 	// Dispatch setEdges to set initial edges
	// 	store.dispatch(setEdges(unsortedEdges));

	// 	store.dispatch(sortEdges("fasterRouteCallback"));

	// 	// Get the updated state
	// 	const updatedState = store.getState().edges;
	// 	expect(updatedState.edges).toEqual([
	// 		/* Add sorted data here */
	// 	]);
	// });

	it("should update shouldRefetch when setShouldRefetch is dispatched", () => {
		// Dispatch setShouldRefetch action with false
		store.dispatch(setShouldRefetch(false));

		// Get the updated state
		const updatedState = store.getState().edges;
		expect(updatedState.shouldRefetch).toBe(false); // Ensure shouldRefetch is updated to false
	});
});
