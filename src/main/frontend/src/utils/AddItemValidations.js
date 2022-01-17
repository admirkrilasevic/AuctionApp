import styles from "./Message.module.css";

export const validateLocation = (street, city, zipCode, state, country, setMessage, setMessageStyle) => {
    const locationComplete = street && city && zipCode && state && country;

    if (!locationComplete) {
        setMessage("Please fill in all the fields");
        setMessageStyle(styles.headerMessageError);
        window.scrollTo(0, 0);
    } else {
        return true;
    }
}

export const validatePrice = (price, setMessage, setMessageStyle) => {
    const validPrice = new RegExp("^\\d+\.?\\d*$");

    if (!price) {
        setMessage("Please fill in all the fields");
        setMessageStyle(styles.headerMessageError);
        window.scrollTo(0, 0);
    } else if (!validPrice.test(price)){
        setMessage("Price has an invalid format, make sure to follow the given example");
        setMessageStyle(styles.headerMessageError);
        window.scrollTo(0, 0);
    } else {
        setMessage();
        setMessageStyle();
        return true;
    }
}

export const validateDate = (startDate, endDate, setMessage, setMessageStyle) => {
    const validDateFormat = new RegExp("\\d{2}\/\\d{2}\/\\d{4}");

    if (!(startDate && endDate)) {
        setMessage("Please fill in all the fields");
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

export const validateItemInfo = (name, category, subcategory, description, photos, setMessage, setMessageStyle) => {
    const validName = new RegExp("^[\\w\\s]+$");
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
