import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Edges } from "../types/types";
import { getFilterCallback } from "./filterCallbacks";
import { RootState } from "../store/store";

export type EdgesState = {
	edges: Edges;
	shouldRefetch: boolean;
};

const initialState: EdgesState = {
	edges: [],
	shouldRefetch: true,
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
		setShouldRefetch(state, action: PayloadAction<boolean>) {
			state.shouldRefetch = action.payload;
		}
	},
});

export function getShouldRefetch(state: RootState) {
	return state.edges.shouldRefetch;
}

export const { setEdges, sortEdges, setShouldRefetch } = edgesSlice.actions;
export default edgesSlice.reducer;
