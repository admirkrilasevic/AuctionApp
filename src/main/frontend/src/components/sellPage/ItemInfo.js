import { SELL_PAGE_SECTIONS } from "../../constants";
import formStyles from "./SectionForms.module.css";
import { useEffect, useState } from "react";
import { fetchAllCategories } from "../../utils/ItemService";
import PhotoUpload from "./PhotoUpload";
import { validateItemInfo } from "../../utils/AddItemValidations";

const ItemInfo = ({setCurrentSection, 
    name, setName, 
    category, setCategory, 
    subcategory, setSubcategory, 
    description, setDescription, 
    photos, setPhotos,
    setMessage, setMessageStyle}) => {

    const [allCategories, setAllCategories] = useState();

    useEffect(async () => {
        const fetchedCategories = await fetchAllCategories();
        setAllCategories(fetchedCategories);
    }, [])

    const categories = allCategories && allCategories.filter((category) => category.parentCategoryId == null);
    const subcategories = allCategories && allCategories.filter((subcategory) => subcategory.parentCategoryId == category);

    const onNextClick = () => {
        if (validateItemInfo(name, category, subcategory, description, photos, setMessage, setMessageStyle)) {
            setCurrentSection(SELL_PAGE_SECTIONS.PRICE);
        }
    }

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
                <select className={formStyles.formSelect} onChange={(e) => setCategory(e.target.value)}>
                    <option disabled selected hidden>Select Category</option>
                    {categories && categories.map((category) => <option value={category.id}>{category.name}</option>)}
                </select>
                <select className={formStyles.formSelect} onChange={(e) => setSubcategory(e.target.value)}>
                    <option disabled selected hidden>Select Subcategory</option>
                    {subcategories && subcategories.map((category) => <option value={category.id}>{category.name}</option>)}
                </select>
            </div>
            <div className={formStyles.formSection}>
                <p>Description</p>
                <textarea className={formStyles.descriptionInput} value={description} maxlength="700" onChange={(e) => setDescription(e.target.value)}></textarea>
                <div className={formStyles.wordLimit}>100 words (700 characters)</div>
            </div>
            <PhotoUpload photos={photos} setPhotos={setPhotos}/>
            <div className={formStyles.buttonsContainer}>
                <button className={formStyles.nextButton} onClick={() => onNextClick()}>NEXT</button>
            </div>
      </div>
    );
}

export default ItemInfo;
