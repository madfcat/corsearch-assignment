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

export type Leg = NonNullable<
	NonNullable<
		NonNullable<PlanConnectionQuery["planConnection"]>["edges"]
	>[number]
>["node"]["legs"][number];

// type Edges = PlanConnection["edges"];

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
  }
  
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
  }
  
  export type PeliasResponse = {
	geocoding: PeliasGeocoding;
	type: "FeatureCollection";
	features: PeliasFeature[];
	bbox?: [number, number, number, number]; // Bounding box: [minLon, minLat, maxLon, maxLat]
  }
  