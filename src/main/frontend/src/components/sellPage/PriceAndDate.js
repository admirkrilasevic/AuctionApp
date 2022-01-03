import { SELL_PAGE_SECTIONS } from "../../constants";
import styles from "./PriceAndDate.module.css";
import formStyles from "./SectionForms.module.css";

const PriceAndDate = ({setCurrentSection}) => {
    return (
        <div className={formStyles.formContainer}>
            <div className={formStyles.formTitle}>
                <p>SET PRICE</p>
            </div>
            <div className={formStyles.buttonsContainer}>
                <button className={formStyles.backButton} onClick={() => setCurrentSection(SELL_PAGE_SECTIONS.ITEM)}>BACK</button>
                <button className={formStyles.nextButton} onClick={() => setCurrentSection(SELL_PAGE_SECTIONS.LOCATION)}>NEXT</button>
            </div>
      </div>
    );
}

export default PriceAndDate;
