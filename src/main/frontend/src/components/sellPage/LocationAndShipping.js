import { SELL_PAGE_SECTIONS } from "../../constants";
import styles from "./LocationAndShipping.module.css";
import formStyles from "./SectionForms.module.css";

const LocationAndShipping = ({setCurrentSection}) => {

    const addItem = () => {
        
    }

    return (
        <div className={formStyles.formContainer}>
            <div className={formStyles.formTitle}>
                <p>LOCATION AND SHIPPING</p>
            </div>
            <div className={formStyles.buttonsContainer}>
                <button className={formStyles.backButton} onClick={() => setCurrentSection(SELL_PAGE_SECTIONS.PRICE)}>BACK</button>
                <button className={formStyles.doneButton} onClick={() => addItem()}>DONE</button>
            </div>
      </div>
    );
}

export default LocationAndShipping;
