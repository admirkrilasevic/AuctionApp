import { SELL_PAGE_SECTIONS } from "../../constants";
import styles from "./LocationAndShipping.module.css";
import formStyles from "./SectionForms.module.css";
import { countries } from "../../constants";

const LocationAndShipping = ({setCurrentSection}) => {

    const addItem = () => {
        
    }

    return (
        <div className={formStyles.formContainer}>
            <div className={formStyles.formTitle}>
                <p>LOCATION AND SHIPPING</p>
            </div>
            <div className={formStyles.formSection}>
                <p>Street</p>
                <input className={formStyles.formInput} placeholder="Street"/>
            </div>
            <div className={formStyles.cityContainer}>
                <span className={formStyles.twoInSameRowNoMargin}>
                    <p>City</p>
                    <p>Zip Code</p>
                </span>
                <span className={formStyles.twoInSameRowNoMargin}>
                    <input className={formStyles.mediumInputField} placeholder="City"/>
                    <input className={formStyles.mediumInputField} placeholder="Zip Code"/>
                </span>
            </div>
            <div className={formStyles.formSection}>
                <p>State</p>
                <input className={formStyles.formInput} placeholder="State"/>
            </div>
            <div className={formStyles.formSection}>
                <p>Country</p>
                <select className={formStyles.countrySelect}>
                    <option disabled selected hidden>Country</option>
                    {countries.map((country) => <option>{country}</option>)}
                </select>
            </div>
            <div className={formStyles.buttonsContainer}>
                <button className={formStyles.backButton} onClick={() => setCurrentSection(SELL_PAGE_SECTIONS.PRICE)}>BACK</button>
                <button className={formStyles.doneButton} onClick={() => addItem()}>DONE</button>
            </div>
      </div>
    );
}

export default LocationAndShipping;
