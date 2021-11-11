import styles from "./Forms.module.css"

function LoginForm() {
    return (
        <div className={styles.formContainer}>
            <div className={styles.formTitle}>
                <p>LOGIN</p>
            </div>
            <div className={styles.formSection}>
                <p>Enter Email</p>
                <input className={styles.formInput}></input>
            </div>
            <div className={styles.formSection}>
                <p>Password</p>
                <input className={styles.formInput}></input>
            </div>
            <button className={styles.formSubmitButton}>LOGIN</button>
        </div>
    );
}

export default LoginForm;