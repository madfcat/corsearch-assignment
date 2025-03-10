import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterButton from "./FilterButton";

describe("FilterButton", () => {
	it("should render children correctly", () => {
		const handleClick = vi.fn();
		render(<FilterButton handleClick={handleClick}>Test Button</FilterButton>);

		const button = screen.getByText("Test Button");
		expect(button).toBeTruthy();
	});

	it("should apply the passed color", () => {
		const handleClick = vi.fn();
		const { container } = render(
			<FilterButton color="red" handleClick={handleClick}>
				Test Button
			</FilterButton>
		);

		// Check if the button has the correct border and text color from inline styles
		const button = container.querySelector("button");
		if (button) {
			expect(button.style.borderColor).toBe("red");
			expect(button.style.color).toBe("red");
		} else {
			throw new Error("Button element not found");
		}
	});

	it("should call handleClick when clicked", () => {
		const handleClick = vi.fn();
		render(<FilterButton handleClick={handleClick}>Test Button</FilterButton>);

		const button = screen.getByText("Test Button");

		fireEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
