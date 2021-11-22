import styles from "./PageLayout.module.css";

const PageLayout = ({title, message, messageStyle, children}) => {
    return (
        <div>
            { title &&
            <div className={styles.pageHeader}>
                <p>{title}</p>
            </div>
            }
            { message &&
            <div className={messageStyle}>
                <p>{message}</p>
            </div>
            }
            <div className={styles.pageContent}>
                {children}
            </div>
        </div>
    );
}

export default PageLayout;