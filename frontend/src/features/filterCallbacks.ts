import { Edge, SortFilterCallback } from "../types/types";
import { calculateLegsIntermediateStopsCount } from "./calculateStats";

export const earlierCallback: SortFilterCallback = (a, b) => {
	// Convert ISO-8601 string into Date objects
	const dateA = new Date(a?.node?.start ?? Infinity);
	const dateB = new Date(b?.node?.start ?? Infinity);
  
	// Subtracting timestamps

	console.log(dateA, dateB);
	return dateA.getTime() - dateB.getTime();
  };

export const fasterRouteCallback: SortFilterCallback = (a, b) => {
	const durationA = a?.node?.duration ?? Infinity;
	const durationB = b?.node?.duration ?? Infinity;
	return durationA - durationB;
};

export const lessStopsCallback: SortFilterCallback = (a, b) => {
	function calculateStops(edge: Edge) {
		const legs = edge?.node?.legs || [];
		const legsCount = legs.length || 2;
		return legsCount * 2 + calculateLegsIntermediateStopsCount(legs);
	}

	const durationA = calculateStops(a) || Infinity;
	const durationB = calculateStops(b) || Infinity;
	return durationA - durationB;
};

// export const shorterWalksCallback: SortFilterCallback = (a, b) => {
// 	return a - b;
// };
// export const lessHillsWalkingCallback: SortFilterCallback = (a, b) => {
// 	return a - b;
// };
// export const greenerCallback: SortFilterCallback = (a, b) => {
// 	return a - b;
// };
// export const shorterRouteCallback: SortFilterCallback = (a, b) => {
// 	return a - b;
// };

const filterCallbacks: { [key: string]: SortFilterCallback } = {
	earlierCallback: earlierCallback,
	fasterRouteCallback: fasterRouteCallback,
	lessStopsCallback: lessStopsCallback,
	// shorterWalksCallback: shorterWalksCallback,
	// lessHillsWalkingCallback: lessHillsWalkingCallback,
	// greenerCallback: greenerCallback,
	// shorterRouteCallback: shorterRouteCallback,
};

export function getFilterCallback(key: string) {
	if (!(key in filterCallbacks)) {
		return filterCallbacks["earlierCallback"];
	}
	return filterCallbacks[key];
}

export default filterCallbacks;
