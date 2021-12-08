import styles from "./CategoriesMenu.module.css";
import { useEffect, useState } from "react";
import { fetchAllCategories } from "../landingPage/ItemService";
import Category from "./Category";

function CategoriesMenu() {

    const [categoriesList, setCategoriesList] = useState([]);

    useEffect(async () => {
        setCategoriesList(await fetchAllCategories());
    }, []);

    return (
        <div className={styles.menusContainer}>
            <div className={styles.categoriesMenuContainer}>
                <h3 className={styles.menuTitle}>PRODUCT CATEGORIES</h3>
                <div className={styles.collapsibleCategoriesContainer}>
                    {categoriesList
                    .filter(function (category) {
                        return category.parentCategoryId == null;
                    })
                    .map((category) => (
                        <Category key={category.id} category={category}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CategoriesMenu;
