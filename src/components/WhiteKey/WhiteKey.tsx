import styles from "./WhiteKey.module.css"

type WhiteKeyProps = {
    children?: React.ReactNode // Black Key Children.
    note: string
}

function WhiteKey(props: WhiteKeyProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.key}>
                <span className={styles.noteName}>
                    {props.note}
                </span>
            </div>
            {props.children}
        </div>
    );
}

export default WhiteKey;
