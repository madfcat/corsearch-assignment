import { Leg } from "../types/types";

export function calculateLegsDistance(legs: Leg[]) {
	return (
		legs.reduce((acc, leg) => {
			return acc + (leg?.distance || 0);
		}, 0)
	);
}

export function calculateLegsIntermediateStopsCount(legs: Leg[]) {
	console.log("calculateLegsIntermediateStopsCount...");
	return (
		legs.reduce((acc, leg) => {
			console.log("leg", leg);
			console.log("acc", acc);
			return acc + (leg?.intermediateStops?.length || 0);
		}, 0)
	);
}
