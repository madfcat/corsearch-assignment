import { createSlice } from "@reduxjs/toolkit";

type MapState = {
	startPoint: L.LatLng | null;
	startName: string;
	endPoint: L.LatLng | null;
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
		setStartPoint(state, action) {
			state.startPoint = action.payload;
		},
		setStartName(state, action) {
			state.startName = action.payload;
		},
		setEndPoint(state, action) {
			state.endPoint = action.payload;
		},
		setEndName(state, action) {
			state.endName = action.payload;
		},
	},
});

export const { setStartPoint,setStartName, setEndPoint, setEndName } = mapSlice.actions;
export default mapSlice.reducer;
