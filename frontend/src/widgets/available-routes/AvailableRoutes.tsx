import { useEffect, useState } from "react";
import { Edges } from "../../types/types";
import RouteDetails from "./RouteDetails";
import styles from "./styles.module.scss";
import RouteTab from "./RouteTab";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

type Props = { edges: Edges; setChoice: (index: number) => void };

export default function AvailableRoutes({ edges, setChoice }: Props) {
	const indexDetailsOpen = useSelector((state: RootState) => state.routes.indexDetailsOpen);
	const [initialLoad, setInitialLoad] = useState<boolean>(true);

	useEffect(() => {
		if (!initialLoad) {
			document
				?.getElementById(`available-route-${indexDetailsOpen}`)
				?.scrollIntoView({
					behavior: "smooth",
				});
		}
	}, [indexDetailsOpen, initialLoad]);

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
