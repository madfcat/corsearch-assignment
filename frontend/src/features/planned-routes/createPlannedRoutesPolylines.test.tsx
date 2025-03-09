import { describe, it, expect, vi } from "vitest";
import createPlannedRoutesPolylines from "./createPlannedRoutesPolylines";
import { edgesData } from "./createPlannedRoutesPolylines.mock.ts";
import RoundMarker from "../../components/round-marker/RoundMarker.tsx";
// import { Polyline, Popup } from "react-leaflet";
// import { Mode } from "../../gql/graphql";
// import { LatLngTuple } from "leaflet";

vi.mock("polyline", async () => {
	const actual = await vi.importActual<typeof import("polyline")>("polyline"); // Preserve actual module
	return {
		...actual, // Spread the actual module
		decode: vi.fn(() => [
			[0, 0],
			[1, 1],
		]), // Mock decode function
	};
});

vi.mock("../../shared/pickTransportColor", () => ({
	default: vi.fn(() => "blue"),
}));

vi.mock("../../components/round-marker/RoundMarker", () => ({
	default: vi.fn(({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	)),
}));

describe("createPlannedRoutesPolylines", () => {
	it("should return the correct number of polylines and markers", () => {
		const result = createPlannedRoutesPolylines(edgesData);
		expect(result).toHaveLength(3);

		const legPolylines = result[0];
		expect(legPolylines).toHaveLength(14);

		expect(legPolylines[0].props.positions).toSatisfy((positions: [number, number][]) =>
			positions.every(
				(point) =>
					Array.isArray(point) &&
					point.length === 2 &&
					point.every((num) => typeof num === "number")
			)
		);

		// Check if the RoundMarker for the 'from' stop is rendered
		expect(legPolylines).toContainEqual(
			expect.objectContaining({
				type: RoundMarker,
				props: expect.objectContaining({
					position: [60.17712, 24.929799],
					color: "blue",
				}),
			})
		);

		// Check if the RoundMarker for the 'to' stop is rendered
		expect(legPolylines).toContainEqual(
			expect.objectContaining({
				type: RoundMarker,
				props: expect.objectContaining({
					position: [60.17712, 24.929799],
					color: "blue",
				}),
			})
		);
	});
});
