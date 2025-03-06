import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MapState = {
	startPoint: { lat: number; lng: number } | null;
	startName: string;
	endPoint: { lat: number; lng: number } | null;
	endName: string;
};

const initialState: MapState = {
	startPoint: null,
	startName: "",
	endPoint: null,
	endName: "",
};

const mapSlice = createSlice({
	name: "map",
	initialState,
	reducers: {
		setStartPoint(state, action: PayloadAction<MapState["startPoint"]>) {
			state.startPoint = action.payload;
		},
		setStartName(state, action: PayloadAction<MapState["startName"]>) {
			state.startName = action.payload;
		},
		setEndPoint(state, action: PayloadAction<MapState["endPoint"]>) {
			state.endPoint = action.payload;
		},
		setEndName(state, action: PayloadAction<MapState["endName"]>) {
			state.endName = action.payload;
		},
		swapStartWithEnd(state) {
			[state.startPoint, state.endPoint] = [state.endPoint, state.startPoint];
			[state.startName, state.endName] = [state.endName, state.startName];
		},
	},
});

export const {
	setStartPoint,
	setStartName,
	setEndPoint,
	setEndName,
	swapStartWithEnd,
} = mapSlice.actions;
export default mapSlice.reducer;
