import { describe, it, expect, vi } from "vitest";
import { getBackendUrl } from "./config"; // import the function

describe("getBackendUrl", () => {
	it("should return http://localhost:4000 in development if VITE_HOST is empty", () => {
		// Mock the environment for development mode
		vi.stubEnv("NODE_ENV", "development");
		vi.stubEnv("VITE_HOST", "");

		expect(getBackendUrl()).toBe("http://localhost:4000");
	});

	it("should return VITE_HOST:4000 in production if VITE_HOST is set", () => {
		// Mock the environment for production mode
		vi.stubEnv("NODE_ENV", "production");
		vi.stubEnv("VITE_HOST", "https://api.myapp.com");

		expect(getBackendUrl()).toBe("https://api.myapp.com:4000");
	});

	it("should return http://localhost:4000 in production if VITE_HOST is empty", () => {
		// Mock the environment for production mode
		vi.stubEnv("NODE_ENV", "production");
		vi.stubEnv("VITE_HOST", "");

		expect(getBackendUrl()).toBe("http://localhost:4000");
	});
});
