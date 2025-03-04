import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RoutesState = {
	indexDetailsOpen: number;
}

const initialState: RoutesState = {
	indexDetailsOpen: 0,
};

const routesSlice = createSlice({
	name: "routes",
	initialState,
	reducers: {
		setIndexDetailsOpen(state, action: PayloadAction<number>) {
			state.indexDetailsOpen = action.payload;
		}
	}
});

export const { setIndexDetailsOpen } = routesSlice.actions;
export default routesSlice.reducer;