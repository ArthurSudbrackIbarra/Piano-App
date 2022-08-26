import styles from "./WhiteKey.module.css"

type WhiteKeyProps = {
    children?: React.ReactNode // Black Key Children.
}

function WhiteKey(props: WhiteKeyProps) {
    return (
        <>
            <div className={styles.key}>
                {props.children}
            </div>
        </>
    );
}

export default WhiteKey;
