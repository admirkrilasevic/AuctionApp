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

export const validateCardInfo = (name, number, expDate, cvc, setMessage, setMessageStyle) => {
    const validName = new RegExp("^[\\w\\s]+$");
    const validMaestro = new RegExp("^(5018|5081|5044|5020|5038|603845|6304|6759|676[1-3]|6799|6220|504834|504817|504645)[0-9]{8,15}$");
    const validMasterCard = new RegExp("^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$");
    const validVisa = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
    const validAmerican = new RegExp("^3[47][0-9]{13}$");
    const validExpDate = new RegExp("^\\d{2}\/\\d{2}$");
    const validCvc = new RegExp("^\\d{3,4}$");
    const cardInfoComplete = name && number && expDate && cvc;
    const validCardType = validMaestro.test(number) || validVisa.test(number) || validMasterCard.test(number) || validAmerican.test(number);

    if (!cardInfoComplete) {
        setMessage("Please fill in all the fields");
        setMessageStyle(styles.headerMessageError);
        window.scrollTo(0, 0);
    } else if (!validName.test(name)){
        setMessage("Name should not contain any special characters");
        setMessageStyle(styles.headerMessageError);
        window.scrollTo(0, 0);
    } else if (!validCardType){
        setMessage("Only MasterCard, Maestro, Visa or American Express are accepted");
        setMessageStyle(styles.headerMessageError);
        window.scrollTo(0, 0);
    } else if (!validExpDate.test(expDate)){
        setMessage("Expiration date should follow MM/YY format");
        setMessageStyle(styles.headerMessageError);
        window.scrollTo(0, 0);
    } else if (!validCvc.test(cvc)){
        setMessage("CVC/CVV is invalid");
        setMessageStyle(styles.headerMessageError);
        window.scrollTo(0, 0);
    } else {
        setMessage();
        setMessageStyle();
        return true;
    }
}
