const VITE_HOST = import.meta.env.VITE_HOST;

export const BACKEND_URL = VITE_HOST
	? `${VITE_HOST}:4000`
	: "http://localhost:4000";

console.log("VITE_HOST", VITE_HOST);
console.log(BACKEND_URL);
