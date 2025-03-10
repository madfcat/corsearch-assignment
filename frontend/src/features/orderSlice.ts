import { createSlice } from "@reduxjs/toolkit";

export type OrderState = {
	order: "asc" | "desc";
};

const initialState: OrderState = {
	order: "asc",
};

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		toggleOrder(state) {
			if (state.order === "asc") {
				state.order = "desc";
			} else {
				state.order = "asc";
			}
		},
	},
});

export const { toggleOrder } = orderSlice.actions;
export default orderSlice.reducer;
