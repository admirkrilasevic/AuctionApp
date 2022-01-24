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
    const [street, setStreet] = useState(user && user.address ? user.address.street : null);
    const [city, setCity] = useState(user && user.address ? user.address.city : null);
    const [zipCode, setZipCode] = useState(user && user.address ? user.address.zipCode : null);
    const [state, setState] = useState(user && user.address ? user.address.state : null);
    const [country, setCountry] = useState(user && user.address ? user.address.country : null);

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
                    setMessage={setMessage}
                    setMessageStyle={setMessageStyle}
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
                    setMessage={setMessage}
                    setMessageStyle={setMessageStyle}
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
                    setMessage={setMessage}
                    setMessageStyle={setMessageStyle}
                    saveItem={saveItem}
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
