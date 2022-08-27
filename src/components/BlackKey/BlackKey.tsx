import styles from "./BlackKey.module.css"

type BlackKeyProps = {
    note: string
}

function BlackKey(props: BlackKeyProps) {
    return (
        <div className={styles.key}>
            <span className={styles.noteName}>
                {props.note}
            </span>
        </div>
    );
}

export default BlackKey;
