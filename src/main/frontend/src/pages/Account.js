import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
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
import AuthService from "../utils/AuthService.js";

function Account(){

    const { section } = useParams();
    const [selectedSection, setSelectedSection] = useState();
    const [message, setMessage] = useState();
    const [messageStyle, setMessageStyle] = useState();
    const history = useHistory();
    
    const displaySelection = (selection) => {
        switch (selection) {
            case ACCOUNT_SECTIONS.PROFILE :
                return <Profile setMessage={setMessage} setMessageStyle={setMessageStyle}/>
            case ACCOUNT_SECTIONS.SELLER :
                return <Seller/>
            case ACCOUNT_SECTIONS.BIDS :
                return <Bids/>
            case ACCOUNT_SECTIONS.SETTINGS :
                return <Settings/>
        }
    }

    const convertToTitleCase = (string) => {
        return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase()
    }

    useEffect(() => {
        setSelectedSection(convertToTitleCase(section));
    }, [section])

    const arrowIcon = <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowRight}/>;
    const previousPage = <Link to="/account/profile" className={styles.breadcrumbsLink}><li>My Account&ensp;</li></Link>;
    const currentPage = <li className="purpleText">&ensp;{selectedSection}</li>;

    const userLoggedIn = !!AuthService.getCurrentUser();

    return (
        userLoggedIn ? (
            <PageLayout title={selectedSection} breadcrumbs={[previousPage, arrowIcon, currentPage]} message={message} messageStyle={messageStyle}>
                <div className={styles.accountContainer}>
                    <div className={styles.sectionButtons}>
                        <Link to={"/account/profile"} className={(selectedSection == ACCOUNT_SECTIONS.PROFILE) ? styles.sectionButtonActive : styles.sectionButton}><ProfileIcon className={styles.reactIcons}/>&ensp;{ACCOUNT_SECTIONS.PROFILE}</Link>
                        <Link to={"/account/seller"} className={(selectedSection == ACCOUNT_SECTIONS.SELLER) ? styles.sectionButtonActive : styles.sectionButton}><SellerIcon className={styles.reactIcons}/>&ensp;{ACCOUNT_SECTIONS.SELLER}</Link>
                        <Link to={"/account/bids"} className={(selectedSection == ACCOUNT_SECTIONS.BIDS) ? styles.sectionButtonActive : styles.sectionButton}><BidsIcon className={styles.reactIcons}/>&ensp;{ACCOUNT_SECTIONS.BIDS}</Link>
                        <Link to={"/account/settings"} className={(selectedSection == ACCOUNT_SECTIONS.SETTINGS) ? styles.sectionButtonActive : styles.sectionButton}><SettingsIcon className={styles.reactIcons}/>&ensp;{ACCOUNT_SECTIONS.SETTINGS}</Link>
                        {(selectedSection == ACCOUNT_SECTIONS.SELLER) && <Link to="/sell" className={styles.addItemButton}>+ &ensp; ADD ITEM</Link>}
                    </div>
                    {displaySelection(selectedSection)}
                </div>
            </PageLayout>
        ) : <div>{history.push("/register")}</div>
    );
}

export default Account;
