import { SELL_PAGE_SECTIONS } from "../../constants";
import styles from "./ItemInfo.module.css";
import formStyles from "./SectionForms.module.css";
import FileBase64 from 'react-file-base64';
import axios from "axios";
import { useState } from "react";

const ItemInfo = ({setCurrentSection}) => {

    return (
        <div className={formStyles.formContainer}>
            <div className={formStyles.formTitle}>
                <p>ADD ITEM</p>
            </div>
            <div className={formStyles.formSection}>
                <p>What do you sell?</p>
                <input className={formStyles.formInput}></input>
            </div>
            <div className={formStyles.twoInSameRow}>
                <select className={formStyles.formSelect}>
                    <option>Select Category</option>
                </select>
                <select className={formStyles.formSelect}>
                    <option>Select Subcategory</option>
                </select>
            </div>
            <div className={formStyles.formSection}>
                <p>Description</p>
                <input className={formStyles.descriptionInput}></input>
                <div className={formStyles.wordLimit}>100 words (700 characters)</div>
            </div>
            <div className={formStyles.photoUpload}>
                <label>
                    <FileBase64 multiple={true}/>
                    <p>Upload Photos</p>
                    <p>or just drag and drop</p>
                    <p>+Add at least 3 photos</p>
                </label>
            </div>
            <div className={formStyles.buttonsContainer}>
                <button className={formStyles.nextButton} onClick={() => setCurrentSection(SELL_PAGE_SECTIONS.PRICE)}>NEXT</button>
            </div>
      </div>
    );
}

export default ItemInfo;
