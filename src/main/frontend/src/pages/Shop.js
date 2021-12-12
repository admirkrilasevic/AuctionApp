import CategoriesMenu from "../components/shopPage/CategoriesMenu";
import styles from "./Shop.module.css";
import ShopPageItems from "../components/shopPage/ShopPageItems";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { fetchAllCategories } from "../components/landingPage/ItemService";

function Shop(){

    const { categoryId } = useParams();
    const [selectedCategories, setSelectedCategories] = useState([categoryId]);
    const [categoriesList, setCategoriesList] = useState([]);

    useEffect(async () => {
        setCategoriesList(await fetchAllCategories());
    }, []);

    const isSelectedCategory = (selectedCategory) => {
		return selectedCategories.some((category) => category == selectedCategory) ? true : false;
	}

    const onCategoryClick = (clickedCategory) => {
        if (!selectedCategories.find((category) => category == clickedCategory))
            setSelectedCategories([...selectedCategories, clickedCategory]);
	}

    const onRemoveClick = (clickedFilter) => {
        setSelectedCategories(selectedCategories.filter((category) => category != clickedFilter));
        if (selectedCategories.length == 0)
            onClearAllClick();
    }

    const onClearAllClick = () => {
        setSelectedCategories([0]);
    }

    return (
        <div className={styles.shopPageElementsContainer}>
            <CategoriesMenu 
                isSelectedCategory={isSelectedCategory} 
                onCategoryClick={onCategoryClick} 
                categoriesList={categoriesList}
            />
            <ShopPageItems 
                selectedCategories={selectedCategories} 
                categoriesList={categoriesList} 
                onRemoveClick={onRemoveClick}
                onClearAllClick={onClearAllClick}
            />
        </div>
    );
}

export default Shop;
