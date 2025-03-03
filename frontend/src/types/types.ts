import { Mode, PlanConnectionQuery } from "../gql/graphql";

export type PickedMode =
	| Mode.Walk
	| Mode.Bus
	| Mode.Tram
	| Mode.Subway
	| Mode.Rail
	| Mode.Ferry
	| "DEFAULT";

export type Edges = NonNullable<
	NonNullable<PlanConnectionQuery["planConnection"]>["edges"]
>;

export type Leg = NonNullable<
	NonNullable<
		NonNullable<PlanConnectionQuery["planConnection"]>["edges"]
	>[number]
>["node"]["legs"][number];

// type Edges = PlanConnection["edges"];
