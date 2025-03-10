import { describe, expect, it, vi } from "vitest";
import { debounce, debounceAsync } from "./debounce";

describe("debounceAsync", () => {
	vi.useFakeTimers();

	it("should debounce an async function", async () => {
		const mockFn = vi.fn(async () => "result");
		const debouncedFn = debounceAsync(mockFn, 300);

		debouncedFn();
		debouncedFn();
		debouncedFn();

		vi.advanceTimersByTime(900);

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it("should return the promise from the debounced async function", async () => {
		const mockFn = vi.fn(async () => "result");
		const debouncedFn = debounceAsync(mockFn, 300);

		const result = debouncedFn();

		vi.advanceTimersByTime(300);
		await expect(result).resolves.toBe("result");
	});

	it("should respect custom debounce time", async () => {
		const mockFn = vi.fn(async () => "result");
		const debouncedFn = debounceAsync(mockFn, 500);

		debouncedFn();
		vi.advanceTimersByTime(300);
		expect(mockFn).toHaveBeenCalledTimes(0);

		vi.advanceTimersByTime(200);
		expect(mockFn).toHaveBeenCalledTimes(1);
	});

});

describe("debounce", () => {
	vi.useFakeTimers();

	it("should debounce a normal function", () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 300);
		debouncedFn();
		debouncedFn();
		debouncedFn();

		vi.advanceTimersByTime(900);

		expect(mockFn).toHaveBeenCalledTimes(1); // It should only be called once
	});

	it("should return the result of the debounced function", async () => {
		const mockFn = vi.fn(() => "result");
		const debouncedFn = debounce(mockFn, 300);

		const result = debouncedFn();
		vi.advanceTimersByTime(350);

		expect(await result).toBe("result"); // Ensure the debounced function returns the result
	});

	it("should respect custom debounce time", () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 500);

		debouncedFn();
		vi.advanceTimersByTime(300); // Fast-forward less than the custom debounce time
		expect(mockFn).toHaveBeenCalledTimes(0); // Function should not have been called yet

		vi.advanceTimersByTime(200); // Fast-forward remaining time
		expect(mockFn).toHaveBeenCalledTimes(1); // Function should be called after 500ms
	});
});
