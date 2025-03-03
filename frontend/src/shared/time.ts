export function secondsToTime(seconds: number | null | undefined): string {
	if (!seconds) return "";
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secondsLeft = seconds % 60;

	const hoursString = hours ? `${hours}h` : "";
	const minutesString = minutes ? `${minutes}m` : "";
	const secondsString = secondsLeft ? `${secondsLeft}s` : "";
	return `${hoursString} ${minutesString} ${secondsString}`;
}