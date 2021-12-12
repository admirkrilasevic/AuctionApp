import { fetchCategoryById } from "../landingPage/ItemService";
import styles from "./ActiveFilters.module.css";

function ActiveFilters({selectedCategories, categoriesList, onRemoveClick}) {

    const findCategoryNameById = (categoryId) => {
        const category = categoriesList.find((category) => category.id == categoryId);
        if (category)
            return category.name;
    }

    const categoryFilters = selectedCategories.filter((category) => category != 0);

    return (
        <div>
            {categoryFilters.length > 0 && 
                (<div className={styles.allFiltersContainer}>
                    {categoryFilters.length > 0 && 
                        <div className={styles.filterContainer}>
                            <p className={styles.filterTitle}>Categories</p>
                            {categoryFilters.map((category) => 
                                (<button className={styles.filter} onClick={onRemoveClick(category)}>
                                    {findCategoryNameById(category)} <span className={styles.removeIcon}>x</span> 
                                </button>)
                            )}
                        </div>
                    }
                    <button className={styles.clearAllButton}>Clear all &ensp; x</button>
                </div>)
            }
        </div>
    );
}

export default ActiveFilters;
