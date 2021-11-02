import styles from "./PageHeader.module.css";

const PageHeader = ({title, children}) => {
    return (
        <div className={styles.pageHeader}>
            <div className={styles.pageHeaderTitle}>
                <p>{title}</p>
            </div>
            <div className={styles.pageContent}>
                {children}
            </div>
        </div>
    );
}

export default PageHeader;