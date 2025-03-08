import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mode } from "../gql/graphql";
import { RootState } from "../store/store";

type FilterState = {
	transportFilterButtonsData: { mode: Mode; text: string; chosen: boolean }[];
	generalFilterButtonsData: {
		text: string;
		chosen: boolean;
		callbackKey: string;
	}[];
};

const initialState: FilterState = {
	transportFilterButtonsData: [
		{ mode: Mode.Bus, text: "Bus", chosen: true },
		{ mode: Mode.Rail, text: "Rail", chosen: true },
		{ mode: Mode.Ferry, text: "Ferry", chosen: true },
		{ mode: Mode.Tram, text: "Tram", chosen: true },
		{ mode: Mode.Subway, text: "Subway", chosen: true },
	],
	generalFilterButtonsData: [
		{ text: "Earlier", chosen: true, callbackKey: "earlierDepartureCallback" },
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

export const getChosenGeneralButton = (state: RootState) =>
	state.filter.generalFilterButtonsData.find((button) => button.chosen);

export const { setChosenGeneralButton, toggleChosenTransportButton } =
	filterSlice.actions;
export default filterSlice.reducer;
