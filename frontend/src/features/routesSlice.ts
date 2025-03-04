import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RoutesState = {
	indexDetailsOpen: number;
	initialLoad: boolean;
}

const initialState: RoutesState = {
	indexDetailsOpen: 0,
	initialLoad: true
};

const routesSlice = createSlice({
	name: "routes",
	initialState,
	reducers: {
		setIndexDetailsOpen(state, action: PayloadAction<number>) {
			state.indexDetailsOpen = action.payload;
		},
		setInitialLoad(state, action: PayloadAction<boolean>) {
			state.initialLoad = action.payload;
		}
	}
});

export const { setIndexDetailsOpen, setInitialLoad } = routesSlice.actions;
export default routesSlice.reducer;