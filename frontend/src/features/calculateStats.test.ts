import { describe, it, expect } from "vitest";
import { calculateLegsIntermediateStopsCount } from "./calculateStats";
import { legsData } from "./calculateStats.mock.ts";

describe("calculateLegsIntermediateStopsCount()", () => {
	it("should retun number of intermediate stops among all legs", () => {
		expect(calculateLegsIntermediateStopsCount(legsData)).toBe(7);
	});
});