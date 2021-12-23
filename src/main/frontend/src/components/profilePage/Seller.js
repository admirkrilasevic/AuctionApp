import { useEffect, useState } from "react";
import styles from "./Seller.module.css";
import { SELLER_TABS } from "../../constants";
import { fetchItemsByUserId } from "../landingPage/ItemService";
import AuthService from "../loginAndRegistration/AuthService";
import { FiShoppingCart } from "react-icons/fi";
import { IconContext } from "react-icons";

const Seller = () => {

    const [activeTab, setActiveTab] = useState(SELLER_TABS.ACTIVE);
    const [items, setItems] = useState();

    const user = AuthService.getCurrentUser();

    useEffect(async () => {
        const userItems = await fetchItemsByUserId(user.id);
        setItems(userItems);
    }, [])

    return (
        <div className={styles.sellerContainer}>
            {(items.length > 0) ? 
            <div className={styles.buttonsContainer}>
                <button className={(activeTab === SELLER_TABS.ACTIVE) ? styles.activeTab : styles.tab} onClick={() => setActiveTab(SELLER_TABS.ACTIVE)}>{SELLER_TABS.ACTIVE}</button>
                <button className={(activeTab === SELLER_TABS.SOLD) ? styles.activeTab : styles.tab} onClick={() => setActiveTab(SELLER_TABS.SOLD)}>{SELLER_TABS.SOLD}</button>
            </div> :
            <div className={styles.noItemsContainer}>
                <div className={styles.title}>
                    SELL
                </div>
                <IconContext.Provider value={{className: "cart-icon", size: "100px"}}>
                    <FiShoppingCart/>
                </IconContext.Provider>
                You do not have any scheduled items for sale.
                <button className={styles.startSellingButton}>START SELLING</button>
            </div>}
        </div>
    );
}

export default Seller;