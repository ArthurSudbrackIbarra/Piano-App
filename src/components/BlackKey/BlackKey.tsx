import { playNote } from "../../utils/audioHandler";
import styles from "./BlackKey.module.css"

type BlackKeyProps = {
    note: string
}

function BlackKey(props: BlackKeyProps) {
    return (
        <div className={styles.key} onClick={() => { playNote(props.note) }}>
            <span className={styles.noteName}>
                {props.note}
            </span>
        </div>
    );
}

export default BlackKey;
