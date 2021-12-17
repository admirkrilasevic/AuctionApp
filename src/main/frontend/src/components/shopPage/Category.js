import styles from "./Category.module.css";
import { useEffect, useState } from "react";
import Subcategory from "./Subcategory";

function Category({category, isSelected, isChecked, onCategoryClick, onSubcategoryClick}) {

    const [expanded, setExpanded] = useState(false);

    const toggleExpandCollapse = () => {
        setExpanded(!expanded);
    };

    const onCategoryClickResponse = (id) => {
        onCategoryClick(id);
        toggleExpandCollapse();
    };

    useEffect(() => {
        if (isSelected(category.id))
            toggleExpandCollapse()
    }, []);

    return (
        <div>
            <button className={styles.collapsibleCategory} key={category.id} onClick={() => onCategoryClickResponse(category.id)}>
                {category.name}
                <span className={styles.collapseIcon}>{expanded ? "-" : "+"}</span>
            </button>
            {expanded && (
                <div className={styles.subcategoriesContainer}>
                    {category.subcategories.map((subcategory) => (
                        <Subcategory key={subcategory.id} subcategory={subcategory} isChecked={isChecked} onSubcategoryClick={onSubcategoryClick}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Category;
