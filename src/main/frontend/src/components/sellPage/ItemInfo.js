import { SELL_PAGE_SECTIONS } from "../../constants";
import formStyles from "./SectionForms.module.css";
import FileBase64 from 'react-file-base64';
import axios from "axios";
import { useEffect, useState } from "react";
import { fetchAllCategories } from "../../utils/ItemService";

const ItemInfo = ({setCurrentSection, name, setName, category, setCategory, subcategory, setSubcategory, description, setDescription, photos, setPhotos}) => {

    const uploadPhotos = async (e) => {
        for (let i = 0; i < e.length; i++) {
            axios.post(
            'https://api.cloudinary.com/v1_1/dtm8an029/image/upload',
            {
                upload_preset: "o1u6dtrg",
                file: e[i].base64
            }
            ).then((response) => {
                setPhotos([...photos, response.data.secure_url]);
            });
        }
    }

    const [allCategories, setAllCategories] = useState();

    useEffect(async () => {
        const cat = await fetchAllCategories();
        console.log(cat);
        setAllCategories(cat);
    }, [])

    const categories = allCategories && allCategories.filter((category) => category.parentCategoryId == null);
    const subcategories = allCategories && allCategories.filter((category) => category.parentCategoryId != null);

    return (
        <div className={formStyles.formContainer}>
            <div className={formStyles.formTitle}>
                <p>ADD ITEM</p>
            </div>
            <div className={formStyles.formSection}>
                <p>What do you sell?</p>
                <input className={formStyles.formInput} value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div className={formStyles.twoInSameRow}>
                <select className={formStyles.formSelect} value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option disabled selected hidden>Select Category</option>
                    {categories && categories.map((category) => <option>{category.name}</option>)}
                </select>
                <select className={formStyles.formSelect} value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                    <option disabled selected hidden>Select Subcategory</option>
                    {subcategories && subcategories.map((category) => <option>{category.name}</option>)}
                </select>
            </div>
            <div className={formStyles.formSection}>
                <p>Description</p>
                <input className={formStyles.descriptionInput} value={description} onChange={(e) => setDescription(e.target.value)}></input>
                <div className={formStyles.wordLimit}>100 words (700 characters)</div>
            </div>
            <div className={formStyles.photoUpload}>
                <label>
                    <FileBase64 multiple={true} onDone={uploadPhotos}/>
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
