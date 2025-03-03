import { useEffect, useState } from "react";
import { Edges } from "../../types/types";
import RouteDetails from "./RouteDetails";
import styles from "./styles.module.scss";
import RouteTab from "./RouteTab";

type Props = { edges: Edges; setChoice: (index: number) => void };

export default function AvailableRoutes({ edges, setChoice }: Props) {
	const [indexDetailsOpen, setIndexDetailsOpen] = useState<number>(0);
	const [initialLoad, setInitialLoad] = useState<boolean>(true);

	useEffect(() => {
		if (!initialLoad) {
			document
				?.getElementById(`available-route-${indexDetailsOpen}`)
				?.scrollIntoView({
					behavior: "smooth",
				});
		}
	}, [indexDetailsOpen]);

	return (
		<div>
			{edges.map((edge, index) => {
				if (!edge) return null;
				return (
					<details
						className={styles["available-route"]}
						id={`available-route-${index}`}
						key={index}
						open={index === indexDetailsOpen}
					>
						<RouteTab
							index={index}
							edge={edge}
							setIndexDetailsOpen={setIndexDetailsOpen}
							initialLoad={initialLoad}
							setInitialLoad={setInitialLoad}
							setChoice={setChoice}
						/>
						<RouteDetails edge={edge} />
					</details>
				);
			})}
		</div>
	);
}
