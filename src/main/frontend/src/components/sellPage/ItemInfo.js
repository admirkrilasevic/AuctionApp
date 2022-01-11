import { SELL_PAGE_SECTIONS } from "../../constants";
import formStyles from "./SectionForms.module.css";
import FileBase64 from 'react-file-base64';
import { useEffect, useState } from "react";
import { fetchAllCategories } from "../../utils/ItemService";
import { uploadImages } from "../../utils/ImageService";

const ItemInfo = ({setCurrentSection, name, setName, category, setCategory, subcategory, setSubcategory, description, setDescription, photos, setPhotos, validateItemInfo}) => {

    const [allCategories, setAllCategories] = useState();

    useEffect(async () => {
        const fetchedCategories = await fetchAllCategories();
        setAllCategories(fetchedCategories);
    }, [])

    const categories = allCategories && allCategories.filter((category) => category.parentCategoryId == null);
    const subcategories = allCategories && allCategories.filter((subcategory) => subcategory.parentCategoryId == category);

    const onNextClick = () => {
        if (validateItemInfo())
            setCurrentSection(SELL_PAGE_SECTIONS.PRICE);
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
                <input className={formStyles.descriptionInput} value={description} onChange={(e) => setDescription(e.target.value)}></input>
                <div className={formStyles.wordLimit}>100 words (700 characters)</div>
            </div>
            <div className={formStyles.photoUpload}>
                {(photos.length > 0) ? 
                <div>
                    <div className={formStyles.imagesContainer}>
                        {photos.map((photo) => <img src={photo}></img>)}
                    </div>
                    <label>
                        <p className={formStyles.uploadButton}>Upload More Photos</p>
                        <FileBase64 multiple={true} onDone={e => uploadImages(e, photos, setPhotos)}/>
                    </label>
                    <p onClick={() => setPhotos([])} className={formStyles.clearButton}>Clear</p>
                </div> :
                <label className={formStyles.photoInput}>
                    <FileBase64 multiple={true} onDone={e => uploadImages(e, photos, setPhotos)}/>
                    <p className={formStyles.uploadButton}>Upload Photos</p>
                    <p className={formStyles.photosDisclaimer}>+Add at least 3 photos</p>
                </label>}
            </div>
            <div className={formStyles.buttonsContainer}>
                <button className={formStyles.nextButton} onClick={() => onNextClick()}>NEXT</button>
            </div>
      </div>
    );
}

export default ItemInfo;
