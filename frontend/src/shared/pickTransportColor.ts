import { Mode } from "../gql/graphql";
import { PickedMode } from "../types/types";

export const colors: Record<PickedMode, string> = {
	[Mode.Walk]: "#FF0000",
	[Mode.Bus]: "#ff8800",
	[Mode.Tram]: "#00ff00",
	[Mode.Subway]: "#0000FF",
	[Mode.Rail]: "#800080",
	[Mode.Ferry]: "#00eeff",
};

const defaultColor = "#7b7b7b";

function isPickedMode(mode: Mode): mode is PickedMode {
	return mode in colors;
}

export default function pickTransportColor(mode: Mode | null | undefined) {
	if (!mode || !isPickedMode(mode)) {
		return defaultColor;
	}
	return colors[mode];
}
