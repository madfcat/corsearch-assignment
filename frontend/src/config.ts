const VITE_IP_ADDRSS = import.meta.env.VITE_IP_ADDRSS;

export const BACKEND_URL =
	VITE_IP_ADDRSS ? `${VITE_IP_ADDRSS}:4000` : "http://localhost:4000";
