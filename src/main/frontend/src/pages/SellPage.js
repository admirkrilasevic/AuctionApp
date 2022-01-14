import styles from "./SellPage.module.css";
import { useState } from "react";
import ItemInfo from "../components/sellPage/ItemInfo";
import { SELL_PAGE_SECTIONS } from "../constants";
import { FaCircle } from "react-icons/fa";
import PriceAndDate from "../components/sellPage/PriceAndDate";
import LocationAndShipping from "../components/sellPage/LocationAndShipping";
import { addItem } from "../utils/ItemService";
import AuthService from "../utils/AuthService";
import PageLayout from "../components/PageLayout";

function SellPage(){

    const [currentSection, setCurrentSection] = useState(SELL_PAGE_SECTIONS.ITEM);

    const formatCurrentDate = (date) => {
        const day = (date.getDate() < 10) ? ("0" + date.getDate()) : date.getDate();
        const month = ((date.getMonth() + 1) < 10) ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
        const year = date.getFullYear();
        return day + "/" + month + "/" + year;
        
    }

    const user = AuthService.getCurrentUser();
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [subcategory, setSubcategory] = useState();
    const [description, setDescription] = useState();
    const [photos, setPhotos] = useState([]);
    const [price, setPrice] = useState();
    const currentDate = formatCurrentDate(new Date());
    const [startDate, setStartDate] = useState(currentDate);
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

    const saveItem = () => {
        addItem(user.token, name, category, subcategory, description, photos.join(";"), price, formatDate(startDate), 
            formatDate(endDate), user.addressId ? user.addressId : null, street, city, zipCode, state, country)
            .then((response) => {
                setMessage(response + " successfully added");
                setMessageStyle(styles.headerMessageSuccess);
                window.scrollTo(0, 0);
            });
    }

    const validateLocation = () => {
        const locationComplete = street && city && zipCode && state && country;

        if (!locationComplete) {
            setMessage("Please fill in all the fields");
            setMessageStyle(styles.headerMessageError);
            window.scrollTo(0, 0);
        } else {
            saveItem();
        }
    }

    const validatePriceAndDate = () => {
        const validPrice = new RegExp("\\d+\.?\\d*");
        const validDateFormat = new RegExp("\\d{2}\/\\d{2}\/\\d{4}");
        const priceAndDateComplete = price && startDate && endDate;

        if (!priceAndDateComplete) {
            setMessage("Please fill in all the fields");
            setMessageStyle(styles.headerMessageError);
            window.scrollTo(0, 0);
        } else if (!validPrice.test(price)){
            setMessage("Price has an invalid format, make sure to follow the given example");
            setMessageStyle(styles.headerMessageError);
            window.scrollTo(0, 0);
        } else if (!validDateFormat.test(startDate) || !validDateFormat.test(endDate)){
            setMessage("Date has an invalid format, make sure to follow the given example");
            setMessageStyle(styles.headerMessageError);
            window.scrollTo(0, 0);
        } else if (!validateDateValues(startDate) || !validateDateValues(endDate)){
            setMessage("Date is out of normal range");
            setMessageStyle(styles.headerMessageError);
            window.scrollTo(0, 0);
        } else {
            setMessage();
            setMessageStyle();
            return true;
        }
    }

    const validateDateValues = (date) => {
        const day = date.substr(0,2);
        const month = date.substr(3,2);
        const year = date.substr(6,4);
        if (day > 0 && day < 32 && month > 0 && month < 13 && year >= 2022) {
            return true;
        } else {
            return false;
        }
    }

    const validateItemInfo = () => {
        const validName = new RegExp('\\w+');
        const validDescription = description && description.length <= 700 && description.split(" ").length <= 100;
        const validPhotos = photos && photos.length >= 3;
        const itemInfoComplete = name && category && subcategory && description && photos;

        if (!itemInfoComplete) {
            setMessage("Please fill in all the fields");
            setMessageStyle(styles.headerMessageError);
            window.scrollTo(0, 0);
        } else if (!validName.test(name)){
            setMessage("Item name should not contain any special characters");
            setMessageStyle(styles.headerMessageError);
            window.scrollTo(0, 0);
        } else if (!validDescription){
            setMessage("Item description should not be longer than 100 words or 700 characters");
            setMessageStyle(styles.headerMessageError);
            window.scrollTo(0, 0);
        } else if (!validPhotos){
            setMessage("Please add at least 3 photos");
            setMessageStyle(styles.headerMessageError);
            window.scrollTo(0, 0);
        } else {
            setMessage();
            setMessageStyle();
            return true;
        }
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
                    validateItemInfo={validateItemInfo}
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
                    validatePriceAndDate={validatePriceAndDate}
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
                    validateLocation={validateLocation}
                />
        }
    };

    return (
        <PageLayout message={message} messageStyle={messageStyle}>
            <div className={styles.sellPageContainer}>
                <div className={styles.switchContainer}>
                    <ul>
                        <li className={currentSection === SELL_PAGE_SECTIONS.ITEM ? styles.activeSection : ""}><FaCircle/></li>
                        <li className={currentSection === SELL_PAGE_SECTIONS.PRICE ? styles.activeSection : ""}><FaCircle/></li>
                        <li className={currentSection === SELL_PAGE_SECTIONS.LOCATION ? styles.activeSection : ""}><FaCircle/></li>
                    </ul>
                </div>
                {displaySection(currentSection)}
            </div>
        </PageLayout>
    );
}

export default SellPage;
