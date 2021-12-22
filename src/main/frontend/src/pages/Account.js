import { useContext, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../components/loginAndRegistration/AuthContext.js";
import Bids from "../components/profilePage/Bids.js";
import Profile from "../components/profilePage/Profile.js"
import Seller from "../components/profilePage/Seller.js";
import Settings from "../components/profilePage/Settings.js";
import styles from "./Account.module.css";
import { ACCOUNT_SECTIONS } from "../constants";
import PageLayout from "../components/PageLayout.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { BsFillPersonFill as ProfileIcon, BsListUl as SellerIcon } from "react-icons/bs";
import { BiDollarCircle as BidsIcon } from "react-icons/bi";
import { IoSettingsOutline as SettingsIcon } from "react-icons/io5";

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

    const arrowIcon = <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowRight}/>;
    const previousPage = <Link to="/account/profile" className={styles.breadcrumbsLink}><li>My Account&ensp;</li></Link>;
    const currentPage = <li className="purpleText">&ensp;{selectedSection}</li>;

    return (
        loggedIn ? (
            <PageLayout title={selectedSection} breadcrumbs={[previousPage, arrowIcon, currentPage]}>
                <div className={styles.accountContainer}>
                    <div className={styles.sectionButtons}>
                        <button className={(selectedSection == ACCOUNT_SECTIONS.PROFILE) ? styles.sectionButtonActive : styles.sectionButton} onClick={() => setSelectedSection(ACCOUNT_SECTIONS.PROFILE)}><ProfileIcon className={styles.reactIcons}/>&ensp;{ACCOUNT_SECTIONS.PROFILE}</button>
                        <button className={(selectedSection == ACCOUNT_SECTIONS.SELLER) ? styles.sectionButtonActive : styles.sectionButton} onClick={() => setSelectedSection(ACCOUNT_SECTIONS.SELLER)}><SellerIcon className={styles.reactIcons}/>&ensp;{ACCOUNT_SECTIONS.SELLER}</button>
                        <button className={(selectedSection == ACCOUNT_SECTIONS.BIDS) ? styles.sectionButtonActive : styles.sectionButton} onClick={() => setSelectedSection(ACCOUNT_SECTIONS.BIDS)}><BidsIcon className={styles.reactIcons}/>&ensp;{ACCOUNT_SECTIONS.BIDS}</button>
                        <button className={(selectedSection == ACCOUNT_SECTIONS.SETTINGS) ? styles.sectionButtonActive : styles.sectionButton} onClick={() => setSelectedSection(ACCOUNT_SECTIONS.SETTINGS)}><SettingsIcon className={styles.reactIcons}/>&ensp;{ACCOUNT_SECTIONS.SETTINGS}</button>
                        <button className={styles.addItemButton}>+ &ensp; ADD ITEM</button>
                    </div>
                    {displaySelection(selectedSection)}
                </div>
            </PageLayout>
        ) : <h3>You are not logged in!</h3>
    );
}

export default Account;
