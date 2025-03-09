/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
	func: T,
	timeout: number = 300
) {
	let timer: ReturnType<typeof setTimeout>;
	let lastPromise: Promise<Awaited<ReturnType<T>>> | null = null;

	return function (
		this: ThisParameterType<T>,
		...args: Parameters<T>
	): Promise<Awaited<ReturnType<T>>> {
		if (timer) clearTimeout(timer);

		lastPromise = new Promise<Awaited<ReturnType<T>>>((resolve) => {
			timer = setTimeout(async () => {
				const result = await func.apply(this, args);
				resolve(result);
			}, timeout);
		});

		return lastPromise;
	};
}

export function debounce<T extends (...args: any[]) => any>(
	func: T,
	timeout: number = 300
) {
	let timer: ReturnType<typeof setTimeout>;
	let lastResult: ReturnType<T>;

	return function (
		this: ThisParameterType<T>,
		...args: Parameters<T>
	): ReturnType<T> {
		if (timer) clearTimeout(timer);

		timer = setTimeout(() => {
			lastResult = func.apply(this, args);
		}, timeout);
		return lastResult;
	};
}
