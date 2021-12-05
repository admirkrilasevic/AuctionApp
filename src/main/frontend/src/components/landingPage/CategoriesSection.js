import styles from "./CategoriesSection.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllCategories } from "./ItemService";

function CategoriesSection() {

    const [categoriesList, setCategoriesList] = useState([]);

    console.log(fetchAllCategories());

    useEffect(async () => {
        setCategoriesList(await fetchAllCategories());
    }, []);

    const categoryButtons = [];
    for (var i = 0; i < categoriesList.length; i++) {
        if (categoriesList[i].parentCategoryId == null){
            categoryButtons.push(<Link to={`/shop`} key={categoriesList[i].id}><button className={styles.categoryButton}>{categoriesList[i].name}</button></Link>);
        }
    }

    return (
        <div className={styles.categoriesSectionContainer}>
            <div className = {styles.categoriesListContainer}>
                <h3 className={styles.categoriesTitle}>CATEGORIES</h3>
                {categoryButtons}
                <Link to={`/shop`}><button className={styles.categoryButton}>All Categories</button></Link>
            </div>
        </div>
    );
}

export default CategoriesSection;