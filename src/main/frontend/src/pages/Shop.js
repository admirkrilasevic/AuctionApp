import CategoriesMenu from "../components/shopPage/CategoriesMenu";
import styles from "./Shop.module.css";
import ShopPageItems from "../components/shopPage/ShopPageItems";
import { useHistory, useParams } from "react-router";
import { useState, useEffect } from "react";
import { fetchAllCategories } from "../components/landingPage/ItemService";
import PriceMenu from "../components/shopPage/PriceMenu";
import { PRICE_RANGE } from "../constants";

function Shop(){

    const { categoryId } = useParams();
    const [items, setItems] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([categoryId]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 200]);
    const history = useHistory();

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
        const updatedCategories = selectedCategories.filter((category) => category != clickedCategory);
        setSelectedCategories(updatedCategories);
        if (updatedCategories.length == 0)
            history.push("/shop/0");
    }

    const onRemoveSubcategoryClick = (clickedSubcategory) => {
        setSelectedSubcategories(selectedSubcategories.filter((subcategory) => subcategory != clickedSubcategory));
    }

    const onRemovePriceFilterClick = () => {
        setPriceRange([PRICE_RANGE.MIN, PRICE_RANGE.MAX]);
    }

    const onClearAllClick = () => {
        setSelectedCategories([]);
        setSelectedSubcategories([]);
        setPriceRange([PRICE_RANGE.MIN, PRICE_RANGE.MAX]);
        history.push("/shop/0");
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
                onRemovePriceFilterClick={onRemovePriceFilterClick}
                onClearAllClick={onClearAllClick}
            />
        </div>
    );
}

export default Shop;
