import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 5174, // Change from 5173 to 5174 (or another free port)
	},
});
