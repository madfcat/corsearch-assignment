import styles from "./styles.module.scss";
import IconButton from "../../../components/icon-button/IconButton";
import Icon from "../../../components/icon/Icon";
import { useDispatch, useSelector } from "react-redux";
import { getShouldRefetch, setShouldRefetch } from "../../../features/edgesSlice";
import { useEffect, useState } from "react";
import { RootState } from "../../../store/store";
import { toggleOrder } from "../../../features/orderSlice";

export default function AvailableRoutesHeader() {
	const [disabled, setDisabled] = useState(false);
	const dispatch = useDispatch();
	const availableRoutesCount = useSelector((state: RootState) => state.edges)
		.edges.length;
	const order = useSelector((state: RootState) => state.order.order);
	const shouldRefetch = useSelector(getShouldRefetch);

	async function handleUpdate() {
		setDisabled(true);
		dispatch(setShouldRefetch(true));
	}

	useEffect(() => {
		if(!shouldRefetch) {
			setDisabled(false);
		}
	}, [shouldRefetch, dispatch]);

	function handleOrder() {
		console.log("handleOrder");
		dispatch(toggleOrder());
	}

	const availableRoutesCountString = availableRoutesCount
		? ` (${availableRoutesCount})`
		: "";
	return availableRoutesCount > 0 ? (
		<div className={styles["trips-header-container"]}>
			<div
				className={styles["trips-header-text"]}
			>{`Available trips${availableRoutesCountString}`}</div>
			<div className={styles["trips-header-buttons"]}>
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
	) : null;
}
