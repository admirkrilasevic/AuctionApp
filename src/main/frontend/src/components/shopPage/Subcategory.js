import styles from "./Subcategory.module.css";
import { useEffect, useState } from "react";
import { getNoItemsInSubcategory } from "../landingPage/ItemService";

function Subcategory({subcategory}) {

    const [subcategoryItemNo, setSubcategoryItemNo] = useState(0);

    useEffect(async () => {
        setSubcategoryItemNo(await getNoItemsInSubcategory(subcategory.id));
    }, [subcategory.id]);

    return (
        <div className={styles.subcategoryItem}>
            <input
                className={styles.subcategoryCheckbox}
                type="checkbox"
                value={subcategory.id}
            />
            {subcategory.name + " (" + subcategoryItemNo + ")"}
        </div>
    );
}

export default Subcategory;
