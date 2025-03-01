import express, { Request, Response } from "express";
import cors from "cors";

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
const GRAPHQL_API_TOKEN = process.env.GRAPHQL_API_TOKEN;
if (!GRAPHQL_ENDPOINT || !GRAPHQL_API_TOKEN) {
	throw new Error(
		"GRAPHQL_ENDPOINT or GRAPHQL_API_TOKEN is not defined in environment variables."
	);
}

const app = express();
const allowedOrigins =
	process.env.NODE_ENV === "production"
		? [
				"https://your-production-domain.com",
				"http://your-production-ip-address",
				"http://localhost:5173",
				"http://localhost:4000",
		  ]
		: [
				"http://localhost:5173", // Frontend during development
				"http://localhost:4000",
		  ];

const corsOptions = {
	origin: (origin: string | undefined, callback: (err: Error | null, allowed?: boolean) => void) => {
		if (allowedOrigins.includes(origin as string) || !origin) {
			// Allow requests with no origin (like mobile or Postman)
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	methods: "GET,POST", // Allow specific HTTP methods
	credentials: true, // Allow cookies if needed
};

// Use CORS middleware globally for all routes
app.use(cors(corsOptions));

// This middleware will add the token to the request headers
app.use(express.json()); // Make sure you can parse JSON bodies

// This middleware will add the token to the request headers
app.use("/graphql", async (req: Request, res: Response) => {
	try {
		const response = await fetch(GRAPHQL_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"digitransit-subscription-key": GRAPHQL_API_TOKEN,
			},
			body: JSON.stringify(req.body),
		});

		const data = await response.json();

		res.json(data);
	} catch (error) {
		res.status(500).json({ error: "Error fetching data from GraphQL API" });
	}
});

// Start the Express server
const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
