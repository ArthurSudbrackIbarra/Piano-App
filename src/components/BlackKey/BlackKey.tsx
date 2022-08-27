import styles from "./BlackKey.module.css"

type BlackKeyProps = {
    noteName: string
}

function BlackKey(props: BlackKeyProps) {
    return (
        <div className={styles.key}>
            {props.noteName}
        </div>
    );
}

export default BlackKey;
