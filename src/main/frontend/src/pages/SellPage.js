import styles from "./SellPage.module.css";
import { useState } from "react";
import ItemInfo from "../components/sellPage/ItemInfo";
import { SELL_PAGE_SECTIONS } from "../constants";
import { FaCircle } from "react-icons/fa";
import PriceAndDate from "../components/sellPage/PriceAndDate";
import LocationAndShipping from "../components/sellPage/LocationAndShipping";

function SellPage(){

    const [currentSection, setCurrentSection] = useState(SELL_PAGE_SECTIONS.ITEM);

    const displaySection = (selection) => {
        switch (selection) {
            case SELL_PAGE_SECTIONS.ITEM :
                return <ItemInfo/>
            case SELL_PAGE_SECTIONS.PRICE :
                return <PriceAndDate/>
            case SELL_PAGE_SECTIONS.LOCATION :
                return <LocationAndShipping/>
        }
    };

    return (
        <div className={styles.sellPageContainer}>
            <div className={styles.switchContainer}>
                <ul>
                    <li onClick={() => setCurrentSection(SELL_PAGE_SECTIONS.ITEM)} className={currentSection === SELL_PAGE_SECTIONS.ITEM ? styles.activeSection : ""}><FaCircle/></li>
                    <li onClick={() => setCurrentSection(SELL_PAGE_SECTIONS.PRICE)} className={currentSection === SELL_PAGE_SECTIONS.PRICE ? styles.activeSection : ""}><FaCircle/></li>
                    <li onClick={() => setCurrentSection(SELL_PAGE_SECTIONS.LOCATION)} className={currentSection === SELL_PAGE_SECTIONS.LOCATION ? styles.activeSection : ""}><FaCircle/></li>
                </ul>
            </div>
            {displaySection(currentSection)}
        </div>
    );
}

export default SellPage;
