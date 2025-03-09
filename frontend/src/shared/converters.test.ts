import { describe, expect, it } from "vitest";
import {
	secondsToTime,
	metersToDistance,
	msToHoursMinutes,
	formatToHHMM,
} from "./converters";

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

describe("msToHoursMinutes function", () => {
	it("should convert milliseconds to HH:mm format", () => {
		const ms = 7500000; // 2 hours and 5 minutes
		const result = msToHoursMinutes(ms);
		expect(result).toBe("02:05");
	});

	it("should handle 0 milliseconds correctly", () => {
		const ms = 0;
		const result = msToHoursMinutes(ms);
		expect(result).toBe("00:00");
	});

	it("should handle large values of milliseconds", () => {
		const ms = 1000000000; // Approx 11 days, 13 hours, 46 minutes
		const result = msToHoursMinutes(ms);
		expect(result).toBe("13:46");
	});

	it("should handle values over 24 hours", () => {
		const ms = 900000000; // Approx 10 days, 10 hours
		const result = msToHoursMinutes(ms);
		expect(result).toBe("10:00");
	});
});

describe("formatToHHMM function", () => {
	it("should format date string to HH:mm", () => {
		const dateString = "2025-03-05T01:50:00+02:00";
		const result = formatToHHMM(dateString);
		expect(result).toBe("01:50");
	});

	it("should handle single-digit hours correctly", () => {
		const dateString = "2025-03-05T09:05:00+02:00";
		const result = formatToHHMM(dateString);
		expect(result).toBe("09:05");
	});

	it("should handle midnight (00:00) correctly", () => {
		const dateString = "2025-03-05T00:00:00+02:00";
		const result = formatToHHMM(dateString);
		expect(result).toBe("00:00");
	});

	it("should handle invalid date strings gracefully", () => {
		const invalidDateString = "invalid-date";
		const result = formatToHHMM(invalidDateString);
		expect(result).toBe("NaN:NaN"); // Date parsing failure
	});
});
