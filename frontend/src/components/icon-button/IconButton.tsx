import styles from "./styles.module.scss";

type Props = {
	ariaLabel: string;
	children: React.ReactNode;
	handleClick: () => void;
	disabled?: boolean;
};

export default function IconButton({
	ariaLabel,
	children,
	handleClick,
	disabled = false,
}: Props) {
	return (
		<button
			className={styles["icon-button"]}
			aria-label={ariaLabel}
			onClick={handleClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
