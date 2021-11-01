import styles from "./PageHeader.module.css";

const PageHeader = ({title, children}) => {
    return (
        <div>
            <div className={styles.pageHeader}>
                <p>{title}</p>
            </div>
            <div className={styles.pageContent}>
                <p></p>
                {children}
            </div>
        </div>
    );
}

export default PageHeader;