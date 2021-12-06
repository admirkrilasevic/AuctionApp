import styles from "./CategoriesMenuItem.module.css";
import { useEffect, useState } from "react";

function CategoriesMenuItem({category}) {

    const [expanded, setExpanded] = useState(false);

    const toggleExpandCollapse = () => {
        setExpanded(!expanded);
    };

    return (
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
    );
}

export default CategoriesMenuItem;
