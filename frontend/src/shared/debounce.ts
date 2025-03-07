/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce<T extends (...args: any[]) => Promise<any>>(
	func: T,
	timeout: number = 300
) {
	console.log("debounce");
	let timer: ReturnType<typeof setTimeout>;
	let resolveRef: ((value: Awaited<ReturnType<T>>) => void) | null = null;

	return (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
		return new Promise((resolve) => {
			if (timer) clearTimeout(timer);
			resolveRef = resolve;

			timer = setTimeout(async () => {
				const result = await func(...args);
				if (resolveRef) resolveRef(result);
			}, timeout);
		});
	};
}