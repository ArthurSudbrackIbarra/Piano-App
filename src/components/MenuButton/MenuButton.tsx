import styles from "./MenuButton.module.css";

type MenuButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
}

function MenuButton(props: MenuButtonProps) {
    return (
        <div className={styles.button} onClick={props.onClick}>
            {props.children}
        </div>
    );
}

export default MenuButton;
