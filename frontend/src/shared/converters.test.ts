import { describe, expect, it } from "vitest";
import { secondsToTime, metersToDistance} from "./converters";

describe("secondsToTime()", () => {
	it("convert number of seconds to human readable format (h m s)", () => {
		expect(secondsToTime(50.15)).toBe("50s");
		expect(secondsToTime(50)).toBe("50s");
		expect(secondsToTime(70)).toBe("1m 10s");
		expect(secondsToTime(7260)).toBe("2h 1m");
		expect(secondsToTime(3721)).toBe("1h 2m 1s");
		expect(secondsToTime(3601)).toBe("1h 1s");
		expect(secondsToTime(3600)).toBe("1h");
	});
});

describe("metersToDistance()", () => {
	it("convert number of float meters to human readable format (km m)", () => {
		expect(metersToDistance(50.14)).toBe("50m");
		expect(metersToDistance(50)).toBe("50m");
		expect(metersToDistance(1000)).toBe("1km");
		expect(metersToDistance(3721)).toBe("3km 721m");
		expect(metersToDistance(140025)).toBe("140km 25m");
	});
});
