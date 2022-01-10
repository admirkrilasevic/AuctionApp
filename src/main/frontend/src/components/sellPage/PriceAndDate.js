import { SELL_PAGE_SECTIONS } from "../../constants";
import formStyles from "./SectionForms.module.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

const PriceAndDate = ({setCurrentSection, price, setPrice, startDate, setStartDate, endDate, setEndDate}) => {
    return (
        <div className={formStyles.formContainer}>
            <div className={formStyles.formTitle}>
                <p>SET PRICE</p>
            </div>
            <div className={formStyles.formSection}>
                <p>Your starting price</p>
                <div className={formStyles.inputWithIcon}>
                    <span>$</span>
                    <input value={price} onChange={(e) => setPrice(e.target.value)}></input>
                </div>
            </div>
            <div className={formStyles.twoInSameRow}>
                <IconContext.Provider value={{size: "25px"}}>
                    <div className={formStyles.dateInput}> 
                        <input placeholder="dd/mm/yyyy" value={startDate} onChange={(e) => setStartDate(e.target.value)}></input>
                        <span><AiOutlineCalendar/></span>
                    </div>
                    <div className={formStyles.dateInput}>
                        <input placeholder="dd/mm/yyyy" value={endDate} onChange={(e) => setEndDate(e.target.value)}></input>
                        <span><AiOutlineCalendar/></span>
                    </div>
                </IconContext.Provider>
            </div>
            <div className={formStyles.formSection}>
                <p className={formStyles.noteText}>The auction will be automatically closed when the end time comes. The highest bid will win the auction.</p>
            </div>
            <div className={formStyles.buttonsContainer}>
                <button className={formStyles.backButton} onClick={() => setCurrentSection(SELL_PAGE_SECTIONS.ITEM)}>BACK</button>
                <button className={formStyles.nextButton} onClick={() => setCurrentSection(SELL_PAGE_SECTIONS.LOCATION)}>NEXT</button>
            </div>
      </div>
    );
}

export default PriceAndDate;