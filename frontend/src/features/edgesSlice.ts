import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Edges } from "../types/types";

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
	},
});

export const { setEdges } = edgesSlice.actions;
export default edgesSlice.reducer;
