import { describe, expect, it } from "vitest";
import { Mode } from "../gql/graphql";
import pickTransportColor, { colors } from "./pickTransportColor";

describe("pickTransportColor", () => {
	it("should return the correct color for a valid Mode", () => {
		expect(pickTransportColor(Mode.Walk)).toBe(colors[Mode.Walk]);
		expect(pickTransportColor(Mode.Bus)).toBe(colors[Mode.Bus]);
		expect(pickTransportColor(Mode.Tram)).toBe(colors[Mode.Tram]);
		expect(pickTransportColor(Mode.Subway)).toBe(colors[Mode.Subway]);
		expect(pickTransportColor(Mode.Rail)).toBe(colors[Mode.Rail]);
		expect(pickTransportColor(Mode.Ferry)).toBe(colors[Mode.Ferry]);
	});

	it("should return the default color for invalid Mode", () => {
		const invalidMode = "InvalidMode" as Mode;
		expect(pickTransportColor(invalidMode)).toBe("#7b7b7b");
	});

	it("should return the default color for null mode", () => {
		expect(pickTransportColor(null)).toBe("#7b7b7b");
	});

	it("should return the default color for undefined mode", () => {
		expect(pickTransportColor(undefined)).toBe("#7b7b7b");
	});

	it("should return the default color for a mode not in the colors object", () => {
		const unknownMode = "UnknownMode" as Mode;
		expect(pickTransportColor(unknownMode)).toBe("#7b7b7b");
	});
});
