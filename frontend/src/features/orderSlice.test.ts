import { describe, it, expect } from "vitest";
import { Action, configureStore, Store } from "@reduxjs/toolkit";
import orderReducer, { OrderState, toggleOrder } from "./orderSlice";

describe("orderSlice", () => {
	let store: Store<{ order: OrderState }, Action, unknown>;

	function createOrderStore() {
		store = configureStore({
			reducer: {
				order: orderReducer,
			},
		});
	}

	// Reset the store before each test
	beforeEach(createOrderStore);

	it("should return the initial state", () => {
		const initialState = { order: "asc" };
		const state = store.getState().order;
		expect(state).toEqual(initialState);
	});

	it("should toggle the order state from asc to desc", () => {
		store.dispatch(toggleOrder());

		const updatedState = store.getState().order;
		expect(updatedState.order).toBe("desc");
	});

	it("should toggle the order state from desc to asc", () => {
		console.log(store.getState());
		store.dispatch(toggleOrder());
		console.log(store.getState());
		store.dispatch(toggleOrder());
		console.log(store.getState());

		const updatedState = store.getState().order;
		expect(updatedState.order).toBe("asc");
	});
});
