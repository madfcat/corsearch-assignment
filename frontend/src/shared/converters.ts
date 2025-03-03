export function secondsToTime(seconds: number | null | undefined): string {
	if (seconds === undefined || seconds === null) return "";

	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secondsLeft = seconds % 60;

	const hoursString = hours ? `${hours}h` : "";
	const minutesString = minutes ? `${minutes}m` : "";
	const secondsString = secondsLeft ? `${secondsLeft}s` : "";
	return `${hoursString} ${minutesString} ${secondsString}`.trim().replace("  ", " ");
}

export function metersToDistance(meters: number | null | undefined) {
	if (meters === undefined || meters === null) return "";

	const kilometers = Math.floor(meters / 1000);
	const metersLeft = meters % 1000;

	const kilometersString = kilometers ? `${kilometers}km` : "";
	const metersString = metersLeft ? `${metersLeft}m` : "";
	return `${kilometersString} ${metersString}`.trim().replace("  ", " ");
}