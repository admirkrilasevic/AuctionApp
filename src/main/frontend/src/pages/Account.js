import { useContext, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../components/loginAndRegistration/AuthContext.js";
import Bids from "../components/profilePage/Bids.js";
import Profile from "../components/profilePage/Profile.js"
import Seller from "../components/profilePage/Seller.js";
import Settings from "../components/profilePage/Settings.js";
import styles from "./Account.module.css";
import { ACCOUNT_SECTIONS } from "../constants";

function Account(){

    const { loggedIn } = useContext(AuthContext);
    const { section } = useParams();
    const [selectedSection, setSelectedSection] = useState(section);
    
    const displaySelection = (selection) => {
        switch (selection) {
            case ACCOUNT_SECTIONS.PROFILE :
                return <Profile/>
            case ACCOUNT_SECTIONS.SELLER :
                return <Seller/>
            case ACCOUNT_SECTIONS.BIDS :
                return <Bids/>
            case ACCOUNT_SECTIONS.SETTINGS :
                return <Settings/>
        }
    }

    return (
        loggedIn ? (
            <div className={styles.accountContainer}>
                <div className={styles.sectionButtons}>
                    <button className={(selectedSection == ACCOUNT_SECTIONS.PROFILE) ? styles.sectionButtonActive : styles.sectionButton} onClick={() => setSelectedSection(ACCOUNT_SECTIONS.PROFILE)}>Profile</button>
                    <button className={(selectedSection == ACCOUNT_SECTIONS.SELLER) ? styles.sectionButtonActive : styles.sectionButton} onClick={() => setSelectedSection(ACCOUNT_SECTIONS.SELLER)}>Seller</button>
                    <button className={(selectedSection == ACCOUNT_SECTIONS.BIDS) ? styles.sectionButtonActive : styles.sectionButton} onClick={() => setSelectedSection(ACCOUNT_SECTIONS.BIDS)}>Bids</button>
                    <button className={(selectedSection == ACCOUNT_SECTIONS.SETTINGS) ? styles.sectionButtonActive : styles.sectionButton} onClick={() => setSelectedSection(ACCOUNT_SECTIONS.SETTINGS)}>Settings</button>
                    <button className={styles.addItemButton}>+ &ensp; ADD ITEM</button>
                </div>
                {displaySelection(selectedSection)}
            </div>
        ) : <h3>You are not logged in!</h3>
    );
}

export default Account;
