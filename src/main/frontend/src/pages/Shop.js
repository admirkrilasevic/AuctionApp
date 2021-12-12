import CategoriesMenu from "../components/shopPage/CategoriesMenu";
import styles from "./Shop.module.css";
import ShopPageItems from "../components/shopPage/ShopPageItems";
import { useParams } from "react-router";
import { useState } from "react";

function Shop(){

    const { categoryId } = useParams();
    const [selectedCategories, setSelectedCategories] = useState([categoryId]);

    const isSelectedCategory = (selectedCategory) => {
		return selectedCategories.some((category) => category == selectedCategory) ? true : false;
	}

    const onCategoryClick = (clickedCategory) => {
        setSelectedCategories([...selectedCategories, clickedCategory]);
	}

    return (
        <div className={styles.shopPageElementsContainer}>
            <CategoriesMenu isSelectedCategory={isSelectedCategory} onCategoryClick={onCategoryClick}/>
            <ShopPageItems selectedCategories={selectedCategories}/>
        </div>
    );
}

export default Shop;
