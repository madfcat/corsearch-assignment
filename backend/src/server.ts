import express, { Request, Response } from "express";
import cors from "cors";

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
const GRAPHQL_API_TOKEN = process.env.GRAPHQL_API_TOKEN;
const GEOCODING_ENDPOINT = process.env.GEOCODING_ENDPOINT;
// console.log(GRAPHQL_ENDPOINT, GRAPHQL_API_TOKEN, GEOCODING_ENDPOINT);
// console.log(`${process.env.VITE_HOST}`, `${process.env.VITE_HOST}:4000`);
if (!GRAPHQL_ENDPOINT || !GRAPHQL_API_TOKEN || !GEOCODING_ENDPOINT) {
	throw new Error(
		"GRAPHQL_ENDPOINT or GRAPHQL_API_TOKEN or GEOCODING_ENDPOINT is not defined in environment variables."
	);
}

const app = express();
const allowedOrigins =
	process.env.NODE_ENV === "production"
		? [
				`${process.env.VITE_HOST}`,
				`${process.env.VITE_HOST}:4000`,
				"http://localhost",
				"http://localhost:5173",
				"http://localhost:4000",
		  ]
		: [
				"http://localhost:5173", // Frontend during development
				"http://localhost:4000",
		  ];

const corsOptions = {
	origin: (
		origin: string | undefined,
		callback: (err: Error | null, allowed?: boolean) => void
	) => {
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

const headers = {
	"Content-Type": "application/json",
	"digitransit-subscription-key": GRAPHQL_API_TOKEN,
};

// This middleware will add the token to the request headers
app.use("/graphql", async (req: Request, res: Response) => {
	try {
		const response = await fetch(GRAPHQL_ENDPOINT, {
			method: "POST",
			headers,
			body: JSON.stringify(req.body),
		});

		const data = await response.json();

		res.json(data);
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			res.status(500).json({ error: "Error fetching data from GraphQL API" });
		}
	}
});

app.use("/geo/autocomplete", async (req: Request, res: Response) => {
	try {
		console.log(req.body);
		const response = await fetch(
			`${GEOCODING_ENDPOINT}/autocomplete?text=${req.body.text}&lang=en`,
			{
				method: "POST",
				headers,
				// body: JSON.stringify(req.body),
			}
		);

		const data = await response.json();

		res.json(data);
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			res.status(500).json({ error: "Error fetching data from Geo search" });
		}
	}
});

app.use("/geo/reverse", async (req: Request, res: Response) => {
	try {
		console.log(req.body);
		const response = await fetch(
			`${GEOCODING_ENDPOINT}/reverse?point.lat=${req.body.point.lat}&point.lon=${req.body.point.lon}&size=1s&lang=en`,
			{
				method: "POST",
				headers,
				body: JSON.stringify(req.body),
			}
		);
		const data = await response.json();
		// console.log(JSON.stringify(data, null, 2));

		res.json(data);
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			res.status(500).json({ error: "Error fetching data from Geo reverse" });
		}
	}
});

// Start the Express server
const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
