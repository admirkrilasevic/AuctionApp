import styles from "./CategoriesMenu.module.css";
import { useEffect, useState } from "react";
import { fetchAllCategories } from "../landingPage/ItemService";

function CategoriesMenu() {

    const [categoriesList, setCategoriesList] = useState([]);
    const [expanded, setExpanded] = useState(false);

    useEffect(async () => {
        setCategoriesList(await fetchAllCategories());
    }, []);

    const toggleExpandCollapse = () => {
        setExpanded(!expanded);
    };

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
                        <div>
                            <button className={styles.collapsibleCategory} key={category.id}>
                                {category.name}
                                <span className={styles.collapseIcon} onClick={toggleExpandCollapse}>{expanded ? "-" : "+"}</span>
                            </button>
                            {expanded && (
                                <div className={styles.subcategoriesContainer}>
                                    {category.subcategories.map((subcategory) => (
                                        <div className={styles.subcategoryItem}>
                                            <input
                                                className={styles.subcategoryCheckbox}
                                                type="checkbox"
                                                value={subcategory.id}
                                            />
                                            {subcategory.name + " (" + (subcategory.subcategoryItems.length ? subcategory.subcategoryItems.length : 0) + ")"}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CategoriesMenu;
