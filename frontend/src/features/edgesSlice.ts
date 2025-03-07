import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Edges } from "../types/types";
import { getFilterCallback } from "./filterCallbacks";

type EdgesState = {
	edges: Edges;
};

const initialState: EdgesState = {
	edges: [],
};

const edgesSlice = createSlice({
	name: "edges",
	initialState,
	reducers: {
		setEdges(state, action: PayloadAction<Edges>) {
			state.edges = action.payload;
		},
		sortEdges(state, action: PayloadAction<string | undefined>) {
			if (!action.payload || state.edges.length === 0) return;
			state.edges = [...state.edges].sort(getFilterCallback(action.payload));
		},
	},
});

export const { setEdges, sortEdges } = edgesSlice.actions;
export default edgesSlice.reducer;
