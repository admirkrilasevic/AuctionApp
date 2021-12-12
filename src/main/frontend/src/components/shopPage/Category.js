import styles from "./Category.module.css";
import { useState } from "react";
import Subcategory from "./Subcategory";

function Category({category, isSelected, onCategoryClick}) {

    const [expanded, setExpanded] = useState(false);

    const toggleExpandCollapse = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <button className={isSelected(category.id) ? styles.collapsibleCategoryActive : styles.collapsibleCategory} key={category.id} onClick={() => onCategoryClick(category.id)}>
                {category.name}
                <span className={styles.collapseIcon} onClick={toggleExpandCollapse}>{expanded ? "-" : "+"}</span>
            </button>
            {expanded && (
                <div className={styles.subcategoriesContainer}>
                    {category.subcategories.map((subcategory) => (
                        <Subcategory key={subcategory.id} subcategory={subcategory}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Category;
