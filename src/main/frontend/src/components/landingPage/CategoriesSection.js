import styles from "./CategoriesSection.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllCategories } from "./ItemService";

function CategoriesSection() {

    const [categoriesList, setCategoriesList] = useState([]);

    useEffect(async () => {
        setCategoriesList(await fetchAllCategories());
    }, []);

    return (
        <div className={styles.categoriesSectionContainer}>
            <div className={styles.categoriesListContainer}>
                <h3 className={styles.categoriesTitle}>CATEGORIES</h3>
                {categoriesList
                .filter(function (category) {
                    return category.parentCategoryId === null;
                })
                .map((category) => (
                    <Link to={`/shop/${category.id}`} className={styles.categoryButton} key={category.id}>{category.name}</Link>
                ))}
                <Link to={`/shop/0`} className={styles.categoryButton}>All Categories</Link>
            </div>
        </div>
    );
}

export default CategoriesSection;
