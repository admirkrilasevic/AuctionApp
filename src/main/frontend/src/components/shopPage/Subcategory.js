import styles from "./Subcategory.module.css";

function Subcategory({subcategory}) {

    return (
        <div className={styles.subcategoryItem}>
            <input
                className={styles.subcategoryCheckbox}
                type="checkbox"
                value={subcategory.id}
            />
            {subcategory.name + " (" + subcategory.noOfItems + ")"}
        </div>
    );
}

export default Subcategory;
