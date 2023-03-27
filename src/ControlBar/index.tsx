import styles from '../styles/ControlBar.module.scss';

interface Props {
    filterHandler: () => void;
    filterLabel: string;
    pauseHandler: () => void;
    pauseLabel: string;
    nextHandler: () => void;
}

const ControlBar = (props: Props) => {
    const {
        filterHandler,
        pauseHandler,
        nextHandler,
        filterLabel,
        pauseLabel
    } = props;
    return (
        <div className={styles.controlbar}>
            <button type="button" onClick={pauseHandler}>{pauseLabel}</button>
            <button type="button" onClick={nextHandler}>Next</button>
            <button type="button" onClick={filterHandler}>{filterLabel}</button>
        </div>
    );
}

export default ControlBar;
