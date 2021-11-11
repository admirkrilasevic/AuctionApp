import styles from "./Forms.module.css"
import { Link } from "react-router-dom";

function RegisterForm() {
    return (
        <div className={styles.formContainer}>
            <div className={styles.formTitle}>
                <p>REGISTER</p>
            </div>
            <div className={styles.formSection}>
                <p>First Name</p>
                <input className={styles.formInput}></input>
            </div>
            <div className={styles.formSection}>
                <p>Last Name</p>
                <input className={styles.formInput}></input>
            </div>
            <div className={styles.formSection}>
                <p>Enter Email</p>
                <input className={styles.formInput}></input>
            </div>
            <div className={styles.formSection}>
                <p>Password</p>
                <input className={styles.formInput}></input>
            </div>
            <button className={styles.formSubmitButton}>REGISTER</button>
            <p className={styles.alreadyHaveAnAccount}>Already have an account? <Link className={styles.linkToLogin} to="/login">Login</Link></p>
        </div>
    );
}

export default RegisterForm;