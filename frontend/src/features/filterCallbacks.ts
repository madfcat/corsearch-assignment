import { Edge, SortFilterCallback } from "../types/types";
import {
	calculateLegsDistance,
	calculateLegsIntermediateStopsCount,
} from "./calculateStats";

export const earlierDepartureCallback: SortFilterCallback = (a, b) => {
	// Convert ISO-8601 string into Date objects
	const dateA = new Date(a?.node?.start ?? Infinity);
	const dateB = new Date(b?.node?.start ?? Infinity);

	// Subtracting timestamps
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

export const shorterWalksCallback: SortFilterCallback = (a, b) => {
	function calculateWalkDistance(edge: Edge) {
		return edge?.node?.walkDistance || 0;
	}

	return calculateWalkDistance(a) - calculateWalkDistance(b);
};

export const greenerCallback: SortFilterCallback = (a, b) => {
	function calculateCo2(edge: Edge) {
		return edge?.node?.emissionsPerPerson?.co2 || 0;
	}

	return calculateCo2(a) - calculateCo2(b);
};

export const shorterRouteCallback: SortFilterCallback = (a, b) => {
	const legsA = a?.node?.legs || [];
	const legsB = b?.node?.legs || [];
	return calculateLegsDistance(legsA) - calculateLegsDistance(legsB);
};

const filterCallbacks: { [key: string]: SortFilterCallback } = {
	earlierDepartureCallback: earlierDepartureCallback,
	fasterRouteCallback: fasterRouteCallback,
	lessStopsCallback: lessStopsCallback,
	shorterWalksCallback: shorterWalksCallback,
	greenerCallback: greenerCallback,
	shorterRouteCallback: shorterRouteCallback,
};

export function getFilterCallback(key: string) {
	if (!(key in filterCallbacks)) {
		return filterCallbacks["earlierDepartureCallback"];
	}
	return filterCallbacks[key];
}

export default filterCallbacks;
