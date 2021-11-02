import styles from "./PageLayout.module.css";

const PageLayout = ({title, children}) => {
    return (
        <div>
            { title &&
            <div className={styles.pageHeader}>
                <p>{title}</p>
            </div>
            }
            <div className={styles.pageContent}>
                {children}
            </div>
        </div>
    );
}

export default PageLayout;