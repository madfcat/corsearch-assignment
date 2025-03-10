export function getBackendUrl() {
	const VITE_HOST = import.meta.env.VITE_HOST;
	return VITE_HOST ? `${VITE_HOST}:4000` : "http://localhost:4000";
}