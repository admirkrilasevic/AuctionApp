import CategoriesMenu from "../components/shopPage/CategoriesMenu";
import styles from "./Shop.module.css";
import ShopPageItems from "../components/shopPage/ShopPageItems";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { fetchAllCategories } from "../components/landingPage/ItemService";
import PriceMenu from "../components/shopPage/PriceMenu";

function Shop(){

    const { categoryId } = useParams();
    const [items, setItems] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([categoryId]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100]);

    useEffect(async () => {
        setCategoriesList(await fetchAllCategories());
    }, []);

    const isSelected = (selectedCategory) => {
		return selectedCategories.some((category) => category == selectedCategory) ? true : false;
	}

    const isChecked = (subcategoryId) => {
		return selectedSubcategories.some((subcategory) => subcategory.id === subcategoryId) ? true : false
	}

    const onCategoryClick = (clickedCategory) => {
        if (!selectedCategories.find((category) => category == clickedCategory))
            setSelectedCategories([...selectedCategories, clickedCategory]);
	}

    const onSubcategoryClick = (clickedSubcategory) => {
        if (!selectedSubcategories.find((subcategory) => subcategory == clickedSubcategory)) {
            onRemoveCategoryClick(clickedSubcategory.parentCategoryId);
            setSelectedSubcategories([...selectedSubcategories, clickedSubcategory]);
        } else {
            if (selectedSubcategories.length == 0) {
                setSelectedCategories([...selectedCategories, clickedSubcategory.parentCategoryId]);
            }
            onRemoveSubcategoryClick(clickedSubcategory);
        }
	}

    const onRemoveCategoryClick = (clickedCategory) => {
        setSelectedCategories(selectedCategories.filter((category) => category != clickedCategory));
        if (selectedCategories.length == 0)
            onClearAllClick();
    }

    const onRemoveSubcategoryClick = (clickedSubcategory) => {
        setSelectedSubcategories(selectedSubcategories.filter((subcategory) => subcategory != clickedSubcategory));
        if (selectedSubcategories.length == 0)
            onClearAllClick();
    }

    const onClearAllClick = () => {
        setSelectedCategories([0]);
        setSelectedSubcategories([]);
    }

    return (
        <div className={styles.shopPageElementsContainer}>
            <CategoriesMenu 
                isSelected={isSelected} 
                isChecked={isChecked}
                onCategoryClick={onCategoryClick} 
                onSubcategoryClick={onSubcategoryClick}
                categoriesList={categoriesList}
            >
            <PriceMenu
                items={items}
                setItems={setItems}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
            />
            </CategoriesMenu>
            <ShopPageItems 
                items={items}
                setItems={setItems}
                selectedCategories={selectedCategories} 
                selectedSubcategories={selectedSubcategories}
                priceRange={priceRange}
                categoriesList={categoriesList} 
                onRemoveCategoryClick={onRemoveCategoryClick}
                onRemoveSubcategoryClick={onRemoveSubcategoryClick}
                onClearAllClick={onClearAllClick}
            />
        </div>
    );
}

export default Shop;
