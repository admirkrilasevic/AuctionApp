import styles from "./Settings.module.css";
import AuthService from "../loginAndRegistration/AuthService";
import { useContext } from "react";
import { AuthContext } from "../loginAndRegistration/AuthContext";
import { useHistory } from "react-router";

const Settings = () => {

    const { setToken } = useContext(AuthContext);
    const history = useHistory();

    const deactivateAccount = () => {
        const user = AuthService.getCurrentUser();
        AuthService.deactivate(user.token);
        setToken(false);
        AuthService.logout();
        history.push("/home");
    }

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.settingsSection}>
                <div className={styles.sectionHeader}>
                    Account
                </div>
                <div className={styles.sectionContent}>
                    Do you want to deactivate your account?
                    <button className={styles.deactivateButton} onClick={deactivateAccount}>DEACTIVATE</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;