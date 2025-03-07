import classNames from "classnames";
import styles from "./styles.module.scss";

type Props = {
	children: React.ReactNode;
	color?: string;
	className?: string;
	handleClick: () => void;
};

export default function FilterButton({ children, color = "black", className = "", handleClick}: Props) {
	return (
		<div className={classNames(styles["filter-button"], className)}>
			<button style={{ borderColor: color, color }} onClick={handleClick}>{children}</button>
		</div>
	);
}
