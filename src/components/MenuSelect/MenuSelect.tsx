import { useEffect } from 'react';
import styles from './MenuSelect.module.css';

type MenuSelectProps = {
    options: string[],
    inputId: string,
    datalistId: string,
    initialValue: string,
    onChange: (value: string) => void,
}

function MenuSelect(props: MenuSelectProps) {
    useEffect(() => {
        const input = document.getElementById(props.inputId) as HTMLInputElement;
        if (input) {
            input.value = props.initialValue;
        }
    });
    return (
        <>
            <datalist id={props.datalistId}>
                {props.options.map(option => (
                    <option key={option} value={option} />
                ))}
            </datalist>
            <input id={props.inputId} list={props.datalistId} className={styles.select} onChange={event => { props.onChange(event.target.value) }}></input>
        </>
    );
}

export default MenuSelect;
