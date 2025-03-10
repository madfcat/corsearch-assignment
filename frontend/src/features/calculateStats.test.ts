import { describe, it, expect } from "vitest";
import { calculateLegsDistance, calculateLegsIntermediateStopsCount } from "./calculateStats";
import { legsData } from "./calculateStats.mock.ts";

describe("calculateLegsDistance()", () => {
	it("should distance of all legs", () => {
		expect(calculateLegsDistance(legsData)).toBe(5726.45);
	});
});

describe("calculateLegsIntermediateStopsCount()", () => {
	it("should retun number of intermediate stops among all legs", () => {
		expect(calculateLegsIntermediateStopsCount(legsData)).toBe(7);
	});
});
