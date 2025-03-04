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
