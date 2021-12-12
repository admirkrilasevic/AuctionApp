import styles from "./CategoriesMenu.module.css";
import Category from "./Category";

function CategoriesMenu({isSelectedCategory, onCategoryClick, categoriesList}) {

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
                        <Category key={category.id} category={category} isSelected={isSelectedCategory} onCategoryClick={onCategoryClick}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CategoriesMenu;
