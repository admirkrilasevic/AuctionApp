import styles from "./SellPage.module.css";
import { useState } from "react";
import ItemInfo from "../components/sellPage/ItemInfo";
import { SELL_PAGE_SECTIONS } from "../constants";
import { FaCircle } from "react-icons/fa";
import PriceAndDate from "../components/sellPage/PriceAndDate";
import LocationAndShipping from "../components/sellPage/LocationAndShipping";
import { addItemRequest } from "../utils/ItemService";
import AuthService from "../utils/AuthService";
import PageLayout from "../components/PageLayout";

function SellPage(){

    const [currentSection, setCurrentSection] = useState(SELL_PAGE_SECTIONS.ITEM);

    const user = AuthService.getCurrentUser();
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [subcategory, setSubcategory] = useState();
    const [description, setDescription] = useState();
    const [photos, setPhotos] = useState([]);
    const [price, setPrice] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [street, setStreet] = useState(user.street ? user.street : null);
    const [city, setCity] = useState(user.city ? user.city : null);
    const [zipCode, setZipCode] = useState(user.zipCode ? user.zipCode : null);
    const [state, setState] = useState(user.state ? user.state : null);
    const [country, setCountry] = useState(user.country ? user.country : null);

    const [message, setMessage] = useState();
    const [messageStyle, setMessageStyle] = useState();

    const formatDate = (date) => {
        const day = date.substr(0,2);
        const month = date.substr(3,2);
        const year = date.substr(6,4);
        return year+"-"+month+"-"+day;
    }

    const addItem = async () => {
        console.log(name);
        console.log(Number(category));
        console.log(Number(subcategory));
        console.log(description);
        console.log(String(photos.join(";")));
        console.log(Number(price));
        console.log(formatDate(startDate));
        console.log(formatDate(endDate));
        console.log(street);
        console.log(city);
        console.log(zipCode);
        console.log(state);
        console.log(country);
        const response = await addItemRequest(user.token, name, parseInt(category), parseInt(subcategory), description, String(photos.join(";")), parseFloat(price), formatDate(startDate), 
            formatDate(endDate), user.addressId ? user.addressId : null, street, city, zipCode, state, country);
        console.log(response);
        setMessage("Item added");
        setMessageStyle(styles.headerMessageSuccess);
    }

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
                    addItem={addItem}
                />
        }
    };

    return (
        <PageLayout message={message} messageStyle={messageStyle}>
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
        </PageLayout>
    );
}

export default SellPage;
