import { Leg } from "../types/types";

export function calculateLegsDistance(legs: Leg[]) {
	return legs.reduce((acc, leg) => {
		return acc + (leg?.distance || 0);
	}, 0);
}

export function calculateLegsIntermediateStopsCount(legs: Leg[]) {
	return legs.reduce((acc, leg) => {
		return acc + (leg?.intermediateStops?.length || 0);
	}, 0);
}
