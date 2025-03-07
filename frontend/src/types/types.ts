import { Mode, PlanConnectionQuery } from "../gql/graphql";

export type PickedMode =
	| Mode.Walk
	| Mode.Bus
	| Mode.Tram
	| Mode.Subway
	| Mode.Rail
	| Mode.Ferry;
// | "DEFAULT";

export type Edges = NonNullable<
	NonNullable<PlanConnectionQuery["planConnection"]>["edges"]
>;

export type Edge = Edges[number];

export type Leg = NonNullable<
	NonNullable<
		NonNullable<PlanConnectionQuery["planConnection"]>["edges"]
	>[number]
>["node"]["legs"][number];

export type SortFilterCallback = (a: Edge, b: Edge) => number;

export type MuiIcon = React.FunctionComponent<
	React.SVGProps<SVGSVGElement> & {
		title?: string;
		titleId?: string;
		desc?: string;
		descId?: string;
	}
>;

/**
 * Pelias Geocoding API types
 */
export type PeliasGeocoding = {
	version: string;
	attribution: string;
	query: {
		text: string;
		tokens: string[];
		size: number;
		private: boolean;
		"boundary.country"?: string[];
		lang?: string;
	};
	engine: {
		name: string;
		author: string;
		version: string;
	};
	timestamp: number;
};

export type PeliasFeature = {
	type: "Feature";
	geometry: {
		type: "Point";
		coordinates: [number, number]; // [longitude, latitude]
	};
	properties: {
		id: string;
		gid: string;
		layer: string;
		source: string;
		source_id: string;
		name: string;
		housenumber?: string;
		street?: string;
		postalcode?: string;
		postalcode_gid?: string;
		confidence: number;
		accuracy?: "point" | "centroid";
		region?: string;
		region_gid?: string;
		localadmin?: string;
		localadmin_gid?: string;
		locality?: string;
		locality_gid?: string;
		neighbourhood?: string;
		neighbourhood_gid?: string;
		label: string;
	};
};

export type PeliasResponse = {
	geocoding: PeliasGeocoding;
	type: "FeatureCollection";
	features: PeliasFeature[];
	bbox?: [number, number, number, number]; // Bounding box: [minLon, minLat, maxLon, maxLat]
};

/**
 * Pelias Reverse Geocoding API types
 */

export type PeliasReverseGeocoding = {
	version: string;
	attribution: string;
	query: {
		size: number;
		lang: string;
		private: boolean;
		"point.lat": number;
		"point.lon": number;
		"boundary.circle.lat": number;
		"boundary.circle.lon": number;
		"boundary.country"?: string[];
		querySize: number;
	};
	engine: {
		name: string;
		author: string;
		version: string;
	};
	timestamp: number;
};

export type PeliasReverseFeature = {
	type: "Feature";
	geometry: {
		type: "Point";
		coordinates: [number, number]; // [longitude, latitude]
	};
	properties: {
		id: string;
		gid: string;
		layer: string;
		source: string;
		source_id: string;
		name: string;
		postalcode?: string;
		postalcode_gid?: string;
		confidence: number;
		distance: number;
		accuracy?: "point" | "centroid";
		region?: string;
		region_gid?: string;
		localadmin?: string;
		localadmin_gid?: string;
		locality?: string;
		locality_gid?: string;
		neighbourhood?: string;
		neighbourhood_gid?: string;
		label: string;
	};
};

export type PeliasReverseResponse = {
	geocoding: PeliasReverseGeocoding;
	type: "FeatureCollection";
	features: PeliasReverseFeature[];
	bbox?: [number, number, number, number]; // Bounding box: [minLon, minLat, maxLon, maxLat]
};
