import styles from "./styles.module.scss";
import IconButton from "../../../components/icon-button/IconButton";
import Icon from "../../../components/icon/Icon";
import { useDispatch, useSelector } from "react-redux";
import { usePlanConnectionQuery } from "../../../gql/graphql";
import { setEdges } from "../../../features/edgesSlice";
import { useState } from "react";
import { RootState } from "../../../store/store";
import { toggleOrder } from "../../../features/orderSlice";
import { setMapUpdating } from "../../../features/mapSlice";

export default function AvailableRoutesHeader() {
	const [disabled, setDisabled] = useState(false);
	const dispatch = useDispatch();
	const availableRoutesCount = useSelector((state: RootState) => state.edges).edges.length;
	const order = useSelector((state: RootState) => state.order.order);

	const map = useSelector((state: RootState) => state.map);
	const coords = {
		originLat: map.startPoint?.lat,
		originLon: map.startPoint?.lng,
		destinationLat: map.endPoint?.lat,
		destinationLon: map.endPoint?.lng,
	};
	const { refetch } = usePlanConnectionQuery({
		variables: coords,
	});

	async function handleUpdate() {
		console.log("Update");
		try {
			setDisabled(true);
			dispatch(setMapUpdating(true));
			const { data } = await refetch();
			const edges = data?.planConnection?.edges || [];
			dispatch(setEdges(edges));
			console.log("Updated data:", edges);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setDisabled(false);
			dispatch(setMapUpdating(false));
		}
	}

	function handleOrder() {
		console.log("handleOrder");
		dispatch(toggleOrder());
	}

	const availableRoutesCountString = availableRoutesCount
		? ` (${availableRoutesCount})`
		: "";
	return (
		<div className={styles["trips-header-container"]}>
			<div
				className={styles["trips-header-text"]}
			>{`Available trips${availableRoutesCountString}`}</div>
			<div className={styles["trips-header-refresh"]}>
				<IconButton
					ariaLabel="order"
					handleClick={handleOrder}
					disabled={disabled}
				>
					<Icon
						svgIconName={order === "asc" ? "arrow_drop_down" : "arrow_drop_up"}
					/>
				</IconButton>
				<IconButton
					ariaLabel="update"
					handleClick={handleUpdate}
					disabled={disabled}
				>
					<Icon svgIconName="update" />
				</IconButton>
			</div>
		</div>
	);
}
