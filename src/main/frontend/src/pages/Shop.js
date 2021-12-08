import CategoriesMenu from "../components/shopPage/CategoriesMenu";
import styles from "./Shop.module.css";
import ShopPageItems from "../components/shopPage/ShopPageItems";
import { useParams } from "react-router";

function Shop(){

    const { categoryId } = useParams();

    return (
        <div className={styles.shopPageElementsContainer}>
            <CategoriesMenu/>
            <ShopPageItems categoryId={categoryId}/>
        </div>
    );
}

export default Shop;
