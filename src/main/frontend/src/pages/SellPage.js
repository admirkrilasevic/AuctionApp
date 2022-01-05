import styles from "./SellPage.module.css";
import { useState } from "react";
import ItemInfo from "../components/sellPage/ItemInfo";
import { SELL_PAGE_SECTIONS } from "../constants";
import { FaCircle } from "react-icons/fa";
import PriceAndDate from "../components/sellPage/PriceAndDate";
import LocationAndShipping from "../components/sellPage/LocationAndShipping";

function SellPage(){

    const [currentSection, setCurrentSection] = useState(SELL_PAGE_SECTIONS.ITEM);

    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [subcategory, setSubcategory] = useState();
    const [description, setDescription] = useState();
    const [photos, setPhotos] = useState([]);
    const [price, setPrice] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [street, setStreet] = useState();
    const [city, setCity] = useState();
    const [zipCode, setZipCode] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();


    const displaySection = (selection) => {
        switch (selection) {
            case SELL_PAGE_SECTIONS.ITEM :
                return <ItemInfo 
                    setCurrentSection={setCurrentSection}
                    name={name}
                    setName={setName}
                    category={category}
                    setCategory={setCategory}
                    subcategory={subcategory}
                    setSubcategory={setSubcategory}
                    description={description}
                    setDescription={setDescription}
                    photos={photos}
                    setPhotos={setPhotos}
                />
            case SELL_PAGE_SECTIONS.PRICE :
                return <PriceAndDate 
                    setCurrentSection={setCurrentSection}
                    price={price}
                    setPrice={setPrice}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />
            case SELL_PAGE_SECTIONS.LOCATION :
                return <LocationAndShipping 
                    setCurrentSection={setCurrentSection}
                    street={street}
                    setStreet={setStreet}
                    city={city}
                    setCity={setCity}
                    zipCode={zipCode}
                    setZipCode={setZipCode}
                    state={state}
                    setState={setState}
                    country={country}
                    setCountry={setCountry}
                />
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
