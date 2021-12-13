import styles from "./CategoriesMenu.module.css";
import Category from "./Category";

function CategoriesMenu({isSelected, isChecked, onCategoryClick, onSubcategoryClick, categoriesList, children}) {

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
                        <Category 
                            key={category.id} 
                            category={category} 
                            isSelected={isSelected} 
                            isChecked={isChecked}
                            onCategoryClick={onCategoryClick}
                            onSubcategoryClick={onSubcategoryClick}
                        />
                    ))}
                </div>
            </div>
            {children}
        </div>
    );
}

export default CategoriesMenu;
