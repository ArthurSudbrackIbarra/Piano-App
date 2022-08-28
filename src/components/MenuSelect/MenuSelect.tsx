import styles from './MenuSelect.module.css';

type MenuSelectProps = {
    options: string[],
    datalistId: string,
    onChange?: (value: string) => void,
}

function MenuSelect(props: MenuSelectProps) {
    return (
        <>
            <datalist id={props.datalistId}>
                {props.options.map(option => (
                    <option key={option} value={option} />
                ))}
            </datalist>
            <input list={props.datalistId} className={styles.select} value={props.options[0] ? props.options[0] : ""}></input>
        </>
    );
}

export default MenuSelect;
