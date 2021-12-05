import CategoriesMenu from "../components/shopPage/CategoriesMenu";
import styles from "./Shop.module.css";
import ShopPageItems from "../components/shopPage/ShopPageItems";

function Shop(){
    return (
        <div className={styles.shopPageElementsContainer}>
            <CategoriesMenu/>
            <ShopPageItems/>
        </div>
    );
}

export default Shop;
