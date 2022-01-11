import styles from "./ActiveFilters.module.css";
import { PRICE_RANGE } from "../../constants";

function ActiveFilters({selectedCategories, selectedSubcategories, priceRange, categoriesList, onRemoveCategoryClick, onRemoveSubcategoryClick, onRemovePriceFilterClick, onClearAllClick}) {

    const findCategoryNameById = (categoryId) => {
        const category = categoriesList.find((category) => category.id == categoryId);
        if (category)
            return category.name;
    }

    const categoryFilters = selectedCategories.filter((category) => category != 0);

    const renderCategoryActiveFilter = (categories, onRemove) => {
        const categoryType = typeof(categories[0]);
        return (
            <div className={styles.filterContainer}>
                <p className={styles.filterTitle}>Categories</p>
                {categories.map((category) => 
                    (<button className={styles.filter} onClick={() => onRemove(category)}>
                        {categoryType == "number" ? findCategoryNameById(category) : (findCategoryNameById(category.parentCategoryId) + "/" + category.name)} <span className={styles.removeIcon}>x</span> 
                    </button>)
                )}
            </div>
        )
    }

    return (
        <div>
            {(categoryFilters.length > 0 || selectedSubcategories.length > 0 || priceRange.min > PRICE_RANGE.MIN || priceRange.max < PRICE_RANGE.MAX) &&
                (<div className={styles.allFiltersContainer}>
                    {categoryFilters.length > 0 && renderCategoryActiveFilter(categoryFilters, onRemoveCategoryClick)}
                    {selectedSubcategories.length > 0 && renderCategoryActiveFilter(selectedSubcategories, onRemoveSubcategoryClick)}
                    {(priceRange.min > PRICE_RANGE.MIN || priceRange.max < PRICE_RANGE.MAX) && 
                        <div className={styles.filterContainer}>
                            <p className={styles.filterTitle}>Price range</p>
                            <button className={styles.filter} onClick={() => onRemovePriceFilterClick()}>
                                ${priceRange.min}-${priceRange.max} <span className={styles.removeIcon}>x</span> 
                            </button>
                        </div>
                    }
                    <button className={styles.clearAllButton} onClick={() => onClearAllClick()}>Clear all &ensp; x</button>
                </div>)
            }
        </div>
    );
}

export default ActiveFilters;
