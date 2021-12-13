import styles from "./ActiveFilters.module.css";

function ActiveFilters({selectedCategories, selectedSubcategories, categoriesList, onRemoveCategoryClick, onRemoveSubcategoryClick, onClearAllClick}) {

    const findCategoryNameById = (categoryId) => {
        const category = categoriesList.find((category) => category.id == categoryId);
        if (category)
            return category.name;
    }

    const categoryFilters = selectedCategories.filter((category) => category != 0);

    return (
        <div>
            {(categoryFilters.length > 0 || selectedSubcategories.length > 0) &&
                (<div className={styles.allFiltersContainer}>
                    {categoryFilters.length > 0 && 
                        <div className={styles.filterContainer}>
                            <p className={styles.filterTitle}>Categories</p>
                            {categoryFilters.map((category) => 
                                (<button className={styles.filter} onClick={() => onRemoveCategoryClick(category)}>
                                    {findCategoryNameById(category)} <span className={styles.removeIcon}>x</span> 
                                </button>)
                            )}
                        </div>
                    }
                    {selectedSubcategories.length > 0 && 
                        <div className={styles.filterContainer}>
                            <p className={styles.filterTitle}>Categories</p>
                            {selectedSubcategories.map((subcategory) => 
                                (<button className={styles.filter} onClick={() => onRemoveSubcategoryClick(subcategory)}>
                                    {findCategoryNameById(subcategory.parentCategoryId) + "/" + subcategory.name} <span className={styles.removeIcon}>x</span> 
                                </button>)
                            )}
                        </div>
                    }
                    <button className={styles.clearAllButton} onClick={() => onClearAllClick()}>Clear all &ensp; x</button>
                </div>)
            }
        </div>
    );
}

export default ActiveFilters;
