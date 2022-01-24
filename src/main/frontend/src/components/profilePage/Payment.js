import { useParams } from "react-router";
import styles from "./Payment.module.css";
import formStyles from "../sellPage/SectionForms.module.css"
import AuthService from "../../utils/AuthService";
import { useState } from "react";
import { countryCodes } from "../../constants";
import { validateLocation } from "../../utils/AddItemValidations";
import PageLayout from "../PageLayout";
import { processPayment } from "../../utils/PaymentService";
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import messageStyles from "../../utils/Message.module.css";

const Payment = () => {
    
    const elements = useElements();
    const stripe = useStripe();

    const { itemId } = useParams();
    const { price } = useParams();

    const user = AuthService.getCurrentUser();

    const [street, setStreet] = useState(user ? user.address.street : null);
    const [city, setCity] = useState(user ? user.address.city : null);
    const [zipCode, setZipCode] = useState(user ? user.address.zipCode : null);
    const [state, setState] = useState(user ? user.address.state : null);
    const [country, setCountry] = useState(user ? user.address.country : null);
    const [name, setName] = useState(user ? user.name + " " + user.surname : null);

    const [message, setMessage] = useState();
    const [messageStyle, setMessageStyle] = useState();

    const onDoneClick = async () => {
        if(validateLocation(street, city, zipCode, state, country, setMessage, setMessageStyle) && name) {

            const cardElement = elements.getElement(CardNumberElement)

            const paymentMethodResponse = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    email: user.email,
                    name: user.name,
                    address: {
                        city: city,
                        country: country,
                        line1: street,
                        postal_code: zipCode,
                        state: state
                    }
                }
            })

            if (paymentMethodResponse) {
                const paymentResponse = await processPayment(user.token, itemId, price, paymentMethodResponse.paymentMethod.id)
                if (paymentResponse === "succeeded") {
                    setMessage("Payment successful!");
                    setMessageStyle(messageStyles.headerMessageSuccess);
                    window.scrollTo(0, 0);
                } else {
                    setMessage(paymentResponse);
                    setMessageStyle(messageStyles.headerMessageError);
                    window.scrollTo(0, 0);
                }
            }
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
                        {countryCodes.map((country) => <option value={country.code}>{country.name}</option>)}
                    </select>
                </div>
                <div className={formStyles.formSection}>
                    <span className={styles.acceptedCards}>We accept the following credit cards</span>
                    <div className={styles.cardImagesContainer}>
                        <img src="https://usa.visa.com/dam/VCOM/regional/lac/ENG/Default/Partner%20With%20Us/Payment%20Technology/visapos/full-color-800x450.jpg"></img>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"></img>
                        <img src="https://seekvectorlogo.com/wp-content/uploads/2019/09/maestro-vector-logo.png"></img>
                        <img src="https://brandessenceresearch.com/assets/images/blog/content_img/American%20Express-.jpg"></img>
                    </div>
                </div>
                <div className={formStyles.twoInSameRowDiv}>
                    <span className={formStyles.twoInSameRowNoMargin}>
                        <p>Name on card</p>
                        <p>Card number</p>
                    </span>
                    <span className={formStyles.twoInSameRowNoMargin}>
                        <input className={formStyles.mediumInputField} placeholder="Name on card" value={name} onChange={(e) => setName(e.target.value)}/>
                        <CardNumberElement className={styles.cardComponent}/>
                    </span>
                </div>
                <div className={formStyles.twoInSameRowDiv}>
                    <span className={formStyles.twoInSameRowNoMargin}>
                        <p>Expiration date</p>
                        <p>CVC/CV</p>
                    </span>
                    <span className={formStyles.twoInSameRowNoMargin}>
                        <CardExpiryElement className={styles.cardComponent}/>
                        <CardCvcElement className={styles.cardComponent}/>
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