import { useEffect, useState } from "react";
import styles from "./Seller.module.css";
import { SELLER_TABS } from "../../constants";
import { fetchItemsByUserId } from "../landingPage/ItemService";
import AuthService from "../loginAndRegistration/AuthService";
import { FiShoppingCart } from "react-icons/fi";
import { IconContext } from "react-icons";
import { Container, Row, Col } from "react-bootstrap";
import { TimeInterval } from 'time-interval-js';
import { Link } from "react-router-dom";

const Seller = () => {

    const [activeTab, setActiveTab] = useState(SELLER_TABS.ACTIVE);
    const [items, setItems] = useState();

    const user = AuthService.getCurrentUser();

    useEffect(async () => {
        const userItems = await fetchItemsByUserId(user.id);
        setItems(userItems);
    }, []);

    const calculateTimeLeft = (endDate) => {
        const date1 = new Date(endDate);
        const date2 = new Date();
        const interval = TimeInterval.fromTimeBetweenTwoDates(date1, date2);
        const hours = interval.inHours();
        if (hours < 24) {
            return Math.round(hours) + " hours";
        } else if (hours >= 24 && hours < 168) {
            return Math.round(hours/24) + " days " + Math.round(hours%24) + " hours" ;
        } else {
            return Math.round(hours/186) + " weeks " + Math.round((hours%168)/24) + " days";
        }
    };

    const calculateHighestBid = (itemBids) => {
        if (itemBids.length > 0) {
            const sortedbids = itemBids.sort();
            return sortedbids[sortedbids.length-1].amount;
        } else {
            return 0;
        }
    }

    const activeItems = items.filter((item) => item.state==="active");
    const soldItems = items.filter((item) => item.state==="sold");

    return (
        <div className={styles.sellerContainer}>
            {(items && items.length > 0) ? 
            <div>
                <div className={styles.buttonsContainer}>
                    <button className={(activeTab === SELLER_TABS.ACTIVE) ? styles.activeTab : styles.tab} onClick={() => setActiveTab(SELLER_TABS.ACTIVE)}>{SELLER_TABS.ACTIVE}</button>
                    <button className={(activeTab === SELLER_TABS.SOLD) ? styles.activeTab : styles.tab} onClick={() => setActiveTab(SELLER_TABS.SOLD)}>{SELLER_TABS.SOLD}</button>
                </div>
                <Container className={styles.itemsTable}>
                    <Row className={styles.headerRow}>
                        <Col>Item</Col>
                        <Col>Name</Col>
                        <Col>Time Left</Col>
                        <Col>Your Price</Col>
                        <Col>No. Bids</Col>
                        <Col>Highest Bid</Col>
                        <Col></Col>
                    </Row>
                    {((activeTab === SELLER_TABS.ACTIVE) ? activeItems : soldItems).map((item) => 
                    <Row className={styles.contentRow}>
                        <Col className={styles.verticalCenter}><img src={item.photo} className={styles.tableImages}/></Col>
                        <Col className={styles.verticalCenter}>{item.name}</Col>
                        <Col className={styles.verticalCenter}>{calculateTimeLeft(item.endDate)}</Col>
                        <Col className={styles.verticalCenter}>$ {item.startingPrice}</Col>
                        <Col className={styles.verticalCenter}>{item.bids.length}</Col>
                        <Col className={styles.highestBidCol}>$ {calculateHighestBid(item.bids)}</Col>
                        <Col className={styles.verticalCenter}><Link to={`/items/${item.id}`} className={styles.viewItemLink}>VIEW</Link></Col>
                    </Row>
                    )}
                </Container>
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