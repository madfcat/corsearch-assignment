/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
	func: T,
	timeout: number = 300
) {
	let timer: ReturnType<typeof setTimeout>;

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
		if (timer) clearTimeout(timer);

		return new Promise((resolve) => {
			timer = setTimeout(() => {
				const result = func.apply(this, args);
				resolve(result);
			}, timeout);
		});
	};
}
