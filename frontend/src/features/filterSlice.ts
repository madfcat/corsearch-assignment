import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mode, TransitMode } from "../gql/graphql";
import { RootState } from "../store/store";

type FilterState = {
	transportFilterButtonsData: {
		mode: Mode;
		transitMode: TransitMode;
		text: string;
		chosen: boolean;
	}[];
	generalFilterButtonsData: {
		text: string;
		chosen: boolean;
		callbackKey: string;
	}[];
};

const initialState: FilterState = {
	transportFilterButtonsData: [
		{ mode: Mode.Bus, transitMode: TransitMode.Bus, text: "Bus", chosen: true },
		{
			mode: Mode.Rail,
			transitMode: TransitMode.Rail,
			text: "Rail",
			chosen: true,
		},
		{
			mode: Mode.Ferry,
			transitMode: TransitMode.Ferry,
			text: "Ferry",
			chosen: true,
		},
		{
			mode: Mode.Tram,
			transitMode: TransitMode.Tram,
			text: "Tram",
			chosen: true,
		},
		{
			mode: Mode.Subway,
			transitMode: TransitMode.Subway,
			text: "Subway",
			chosen: true,
		},
	],
	generalFilterButtonsData: [
		{ text: "Earlier Departure", chosen: true, callbackKey: "earlierDepartureCallback" },
		{ text: "Faster Route", chosen: false, callbackKey: "fasterRouteCallback" },
		{ text: "Less stops", chosen: false, callbackKey: "lessStopsCallback" },
		{
			text: "Shorter walks",
			chosen: false,
			callbackKey: "shorterWalksCallback",
		},
		{ text: "Greener", chosen: false, callbackKey: "greenerCallback" },
		{
			text: "Shorter route",
			chosen: false,
			callbackKey: "shorterRouteCallback",
		},
	],
};

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		toggleChosenTransportButton(state, action: PayloadAction<number>) {
			state.transportFilterButtonsData[action.payload].chosen =
				!state.transportFilterButtonsData[action.payload].chosen;
		},
		setChosenGeneralButton(state, action: PayloadAction<number>) {
			state.generalFilterButtonsData.forEach((_, index, arr) => {
				if (index === action.payload) {
					arr[index].chosen = true;
				} else {
					arr[index].chosen = false;
				}
			});
		},
	},
});

export const getChosenGeneralButton = createSelector(
	(state: RootState) => state.filter.generalFilterButtonsData,
	(buttons) => buttons.find((button) => button.chosen) // Returns the same reference unless `buttons` changes
);
export const getChosenTransportButtons = createSelector(
	(state: RootState) => state.filter.transportFilterButtonsData,
	(buttons) =>
		buttons
			.filter((button) => button.chosen)
			.reduce((acc: { mode: TransitMode }[], button) => {
				acc.push({ mode: button.transitMode });
				return acc;
			}, [])
);

export const getFilterTransportButtonsChosenCount = createSelector(
	(state: RootState) => state.filter.transportFilterButtonsData,
	(data) => {
		let trasnportlastIndex: number | undefined;
		const transportChosenCount = data.filter((button, index) => {
			if (button.chosen)
				trasnportlastIndex = index;
			return button.chosen;
		}).length;
		return { trasnportlastIndex, transportChosenCount };
	}
);

export const { setChosenGeneralButton, toggleChosenTransportButton } =
	filterSlice.actions;
export default filterSlice.reducer;
