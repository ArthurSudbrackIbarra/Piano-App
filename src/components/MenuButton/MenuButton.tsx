import styles from "./MenuButton.module.css";

type MenuButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  marginBottom?: string;
  disabled?: boolean;
};

function MenuButton(props: MenuButtonProps) {
  return (
    <div
      className={`${styles.button} ${props.disabled ? styles.disabled : ""}`}
      onClick={props.onClick}
      style={
        props.marginBottom
          ? {
              marginBottom: props.marginBottom,
            }
          : {}
      }
    >
      {props.children}
    </div>
  );
}

export default MenuButton;
