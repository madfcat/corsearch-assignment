import styles from "./styles.module.scss"

type Props = {
	ariaLabel: string;
	children: React.ReactNode;
};

export default function IconButton({ ariaLabel, children }: Props) {
	return <button className={styles["icon-button"]}aria-label={ariaLabel}>{children}</button>;
}
