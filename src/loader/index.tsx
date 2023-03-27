import styles from '../styles/Loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.background}></div>
            <div className={styles.ldsRoller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default Loader;
