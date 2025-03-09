export function secondsToTime(seconds: number | null | undefined): string {
	if (seconds === undefined || seconds === null) return "";

	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secondsLeft = Math.floor(seconds % 60);

	const hoursString = hours ? `${hours}h` : "";
	const minutesString = minutes ? `${minutes}m` : "";
	const secondsString = secondsLeft ? `${secondsLeft}s` : "";
	return `${hoursString} ${minutesString} ${secondsString}`
		.trim()
		.replace("  ", " ");
}

export function metersToDistance(meters: number | null | undefined) {
	if (meters === undefined || meters === null) return "";

	const kilometers = Math.floor(meters / 1000);
	const metersLeft = Math.floor(meters % 1000);

	const kilometersString = kilometers ? `${kilometers}km` : "";
	const metersString = metersLeft ? `${metersLeft}m` : "";
	return `${kilometersString} ${metersString}`.trim().replace("  ", " ");
}

export function msToHoursMinutes(ms: number): string {
	const date = new Date(ms);
	const hours = date.getUTCHours().toString().padStart(2, "0");
	const minutes = date.getUTCMinutes().toString().padStart(2, "0");
	return `${hours}:${minutes}`;
}

// "2025-03-05T01:50:00+02:00" -> "01:50"
// export function formatToHHMM(dateString: string): string {
// 	const date = new Date(dateString);
// 	const hours = date.getHours().toString().padStart(2, "0");
// 	const minutes = date.getMinutes().toString().padStart(2, "0");
// 	return `${hours}:${minutes}`;
// }

export function formatToHHMM(dateString: string): string {
	let hours = "";
	let minutes = "";
	try {
		const date = new Date(dateString);

		// Format the date to Helsinki time (Europe/Helsinki)
		const options = {
			timeZone: "Europe/Helsinki",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		} as const;

		const formatter = new Intl.DateTimeFormat("en-GB", options);
		const time = formatter.format(date).split(":");
		hours = time[0];
		minutes = time[1];
	} catch (error) {
		console.error("Error formatting date:", error);
		return "";
	}

	return `${hours}:${minutes}`;
}
