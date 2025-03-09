/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
	func: T,
	timeout: number = 300
) {
	let timer: ReturnType<typeof setTimeout>;
	// let lastPromise: Promise<Awaited<ReturnType<T>>> | null = null;

	return function (
		this: ThisParameterType<T>,
		...args: Parameters<T>
	): Promise<ReturnType<T>> {
		if (timer) clearTimeout(timer);

		return new Promise((resolve) => {
			timer = setTimeout(async () => {
				const result = await func.apply(this, args);
				resolve(result);
			}, timeout);
		});
		
		// return lastPromise;
	};
}


export function debounce<T extends (...args: any[]) => any>(
	func: T,
	timeout: number = 300
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
	let timer: ReturnType<typeof setTimeout>;

	return function (
		this: ThisParameterType<T>,
		...args: Parameters<T>
	): Promise<ReturnType<T>> {
		// Clear the previous timeout to debounce the function call
		if (timer) clearTimeout(timer);

		// Return a promise that resolves after the function is debounced
		return new Promise((resolve) => {
			timer = setTimeout(() => {
				const result = func.apply(this, args);
				resolve(result);
			}, timeout);
		});
	};
}

// export function debounce<T extends (...args: any[]) => any>(
// 	func: T,
// 	timeout: number = 300
// ) {
// 	let timer: ReturnType<typeof setTimeout>;
// 	let lastResult: ReturnType<T>;

// 	return function (
// 		this: ThisParameterType<T>,
// 		...args: Parameters<T>
// 	): ReturnType<T> {
// 		if (timer) clearTimeout(timer);

// 		timer = setTimeout(() => {
// 			lastResult = func.apply(this, args);
// 		}, timeout);
// 		return lastResult;
// 	};
// }
