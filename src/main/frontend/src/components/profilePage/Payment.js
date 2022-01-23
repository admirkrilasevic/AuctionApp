import { useParams } from "react-router";
import styles from "./Payment.module.css";
import formStyles from "../sellPage/SectionForms.module.css"
import AuthService from "../../utils/AuthService";
import { useState } from "react";
import { countries } from "../../constants";
import { validateCardInfo, validateLocation } from "../../utils/AddItemValidations";
import PageLayout from "../PageLayout";
import { processPayment } from "../../utils/PaymentService";

const Payment = () => {

    const { itemId } = useParams();
    const { price } = useParams();

    const user = AuthService.getCurrentUser();

    const [street, setStreet] = useState(user.street ? user.street : null);
    const [city, setCity] = useState(user.city ? user.city : null);
    const [zipCode, setZipCode] = useState(user.zipCode ? user.zipCode : null);
    const [state, setState] = useState(user.state ? user.state : null);
    const [country, setCountry] = useState(user.country ? user.country : null);

    const [name, setName] = useState();
    const [number, setNumber] = useState();
    const [expDate, setExpDate] = useState();
    const [cvc, setCvc] = useState();

    const [message, setMessage] = useState();
    const [messageStyle, setMessageStyle] = useState();

    const onDoneClick = () => {
        if(validateLocation(street, city, zipCode, state, country, setMessage, setMessageStyle) && validateCardInfo(name, number, expDate, cvc, setMessage, setMessageStyle)) {
            //start payment process
            console.log(street)
            console.log(city)
            console.log(zipCode)
            console.log(state)
            console.log(country)
            console.log(name)
            console.log(number)
            console.log(expDate)
            console.log(cvc)
        }
    }

    return (
        <PageLayout message={message} messageStyle={messageStyle}>
            <div className={formStyles.formContainer}>
                <div className={formStyles.formTitle}>
                    <p>PAYMENT</p>
                </div>
                <div className={formStyles.formSection}>
                    <p>Street</p>
                    <input className={formStyles.formInput} placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)}/>
                </div>
                <div className={formStyles.twoInSameRowDiv}>
                    <span className={formStyles.twoInSameRowNoMargin}>
                        <p>City</p>
                        <p>Zip Code</p>
                    </span>
                    <span className={formStyles.twoInSameRowNoMargin}>
                        <input className={formStyles.mediumInputField} placeholder="City" value={city} onChange={(e) => setCity(e.target.value)}/>
                        <input className={formStyles.mediumInputField} placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
                    </span>
                </div>
                <div className={formStyles.formSection}>
                    <p>State</p>
                    <input className={formStyles.formInput} placeholder="State" value={state} onChange={(e) => setState(e.target.value)}/>
                </div>
                <div className={formStyles.formSection}>
                    <p>Country</p>
                    <select className={formStyles.countrySelect} value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option disabled selected hidden>Country</option>
                        {countries.map((country) => <option>{country}</option>)}
                    </select>
                </div>
                <div className={formStyles.twoInSameRowDiv}>
                    <span className={formStyles.twoInSameRowNoMargin}>
                        <p>Name on card</p>
                        <p>Card number</p>
                    </span>
                    <span className={formStyles.twoInSameRowNoMargin}>
                        <input className={formStyles.mediumInputField} placeholder="Name on card" onChange={(e) => setName(e.target.value)}/>
                        <input className={formStyles.mediumInputField} placeholder="Card number" onChange={(e) => setNumber(e.target.value)}/>
                    </span>
                </div>
                <div className={formStyles.twoInSameRowDiv}>
                    <span className={formStyles.twoInSameRowNoMargin}>
                        <p>Expiration date</p>
                        <p>CVC/CV</p>
                    </span>
                    <span className={formStyles.twoInSameRowNoMargin}>
                        <input className={formStyles.mediumInputField} placeholder="DD/YY" onChange={(e) => setExpDate(e.target.value)}/>
                        <input className={formStyles.mediumInputField} placeholder="CVC/CV" onChange={(e) => setCvc(e.target.value)}/>
                    </span>
                </div>
                <div className={formStyles.buttonsContainer}>
                    <button className={formStyles.doneButton} onClick={() => onDoneClick()}>DONE</button>
                </div>
        </div>
      </PageLayout>
    );
}

export default Payment;