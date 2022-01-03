import { SELL_PAGE_SECTIONS } from "../../constants";
import styles from "./ItemInfo.module.css";
import formStyles from "./SectionForms.module.css";

const ItemInfo = ({setCurrentSection}) => {
    return (
        <div className={formStyles.formContainer}>
            <div className={formStyles.formTitle}>
                <p>ADD ITEM</p>
            </div>
            <div className={formStyles.buttonsContainer}>
                <button className={formStyles.nextButton} onClick={() => setCurrentSection(SELL_PAGE_SECTIONS.PRICE)}>NEXT</button>
            </div>
      </div>
    );
}

export default ItemInfo;
