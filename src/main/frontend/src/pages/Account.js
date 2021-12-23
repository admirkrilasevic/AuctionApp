import { useContext, useEffect, useState } from "react";
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

    useEffect(() => {
        setSelectedSection(section);
    }, [section])

    const arrowIcon = <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowRight}/>;
    const previousPage = <Link to="/account/Profile" className={styles.breadcrumbsLink}><li>My Account&ensp;</li></Link>;
    const currentPage = <li className="purpleText">&ensp;{selectedSection}</li>;

    return (
        loggedIn ? (
            <PageLayout title={selectedSection} breadcrumbs={[previousPage, arrowIcon, currentPage]}>
                <div className={styles.accountContainer}>
                    <div className={styles.sectionButtons}>
                        <Link to={"/account/Profile"} className={(selectedSection == ACCOUNT_SECTIONS.PROFILE) ? styles.sectionButtonActive : styles.sectionButton}><ProfileIcon className={styles.reactIcons}/>&ensp;{ACCOUNT_SECTIONS.PROFILE}</Link>
                        <Link to={"/account/Seller"} className={(selectedSection == ACCOUNT_SECTIONS.SELLER) ? styles.sectionButtonActive : styles.sectionButton}><SellerIcon className={styles.reactIcons}/>&ensp;{ACCOUNT_SECTIONS.SELLER}</Link>
                        <Link to={"/account/Bids"} className={(selectedSection == ACCOUNT_SECTIONS.BIDS) ? styles.sectionButtonActive : styles.sectionButton}><BidsIcon className={styles.reactIcons}/>&ensp;{ACCOUNT_SECTIONS.BIDS}</Link>
                        <Link to={"/account/Settings"} className={(selectedSection == ACCOUNT_SECTIONS.SETTINGS) ? styles.sectionButtonActive : styles.sectionButton}><SettingsIcon className={styles.reactIcons}/>&ensp;{ACCOUNT_SECTIONS.SETTINGS}</Link>
                        {(selectedSection == ACCOUNT_SECTIONS.SELLER) && <button className={styles.addItemButton}>+ &ensp; ADD ITEM</button>}
                    </div>
                    {displaySelection(selectedSection)}
                </div>
            </PageLayout>
        ) : <h3>You are not logged in!</h3>
    );
}

export default Account;
