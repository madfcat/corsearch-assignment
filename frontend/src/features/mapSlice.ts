import { createSlice } from "@reduxjs/toolkit";

type MapState = {
	startPoint: L.LatLng | null;
	endPoint: L.LatLng | null;
}

const initialState: MapState = {
	startPoint: null,
	endPoint: null,
}

const mapSlice = createSlice({
	name: "map",
	initialState,
	reducers: {
		setStartPoint(state, action) {
			state.startPoint = action.payload;
		},
		setEndPoint(state, action) {
			state.endPoint = action.payload;
		},
	},
});

export const { setStartPoint, setEndPoint } = mapSlice.actions;
export default mapSlice.reducer;