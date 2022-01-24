import { useEffect, useState } from "react";
import styles from "./Seller.module.css";
import tableStyles from "./Table.module.css";
import { SELLER_TABS, TIME_LEFT } from "../../constants";
import { fetchItemsByUserId } from "../../utils/ItemService";
import AuthService from "../../utils/AuthService";
import { FiShoppingCart } from "react-icons/fi";
import { IconContext } from "react-icons";
import { Container, Row, Col } from "react-bootstrap";
import { calculateTimeLeft } from "../../utils/Utils";
import { Link } from "react-router-dom";

const Seller = () => {

    const [activeTab, setActiveTab] = useState(SELLER_TABS.ACTIVE);
    const [items, setItems] = useState();

    const user = AuthService.getCurrentUser();

    useEffect(async () => {
        const userItems = await fetchItemsByUserId(user.id);
        setItems(userItems);
    }, []);

    const calculateHighestBid = (itemBids) => {
        if (itemBids.length > 0) {
            const sortedbids = itemBids.sort();
            return sortedbids[sortedbids.length-1].amount;
        } else {
            return 0;
        }
    }

    const activeItems = items && items.filter((item) => calculateTimeLeft(item.endDate) != TIME_LEFT.ENDED);
    const soldItems = items && items.filter((item) =>  calculateTimeLeft(item.endDate) == TIME_LEFT.ENDED);

    return (
        <div className={styles.sellerContainer}>
            {(items && items.length > 0) ? 
            <div>
                <div className={styles.buttonsContainer}>
                    <button className={(activeTab === SELLER_TABS.ACTIVE) ? styles.activeTab : styles.tab} onClick={() => setActiveTab(SELLER_TABS.ACTIVE)}>{SELLER_TABS.ACTIVE}</button>
                    <button className={(activeTab === SELLER_TABS.SOLD) ? styles.activeTab : styles.tab} onClick={() => setActiveTab(SELLER_TABS.SOLD)}>{SELLER_TABS.SOLD}</button>
                </div>
                <Container className={tableStyles.table}>
                    <Row className={tableStyles.headerRow}>
                        <Col>Item</Col>
                        <Col>Name</Col>
                        <Col>Time Left</Col>
                        <Col>Starting Price</Col>
                        <Col>No. Bids</Col>
                        <Col>Highest Bid</Col>
                        <Col></Col>
                    </Row>
                    {((activeTab === SELLER_TABS.ACTIVE) ? activeItems : soldItems).map((item) => 
                    <Row className={tableStyles.contentRow}>
                        <Col className={tableStyles.verticalCenter}><img src={item.photo} className={tableStyles.tableImages}/></Col>
                        <Col className={tableStyles.verticalCenter}><Link to={`/items/${item.id}`} className={tableStyles.nameLink}>{item.name}</Link></Col>
                        <Col className={tableStyles.verticalCenter}>{calculateTimeLeft(item.endDate)}</Col>
                        <Col className={tableStyles.verticalCenter}>$ {item.startingPrice}</Col>
                        <Col className={tableStyles.verticalCenter}>{item.bids.length}</Col>
                        <Col className={tableStyles.highestBidCol}>$ {calculateHighestBid(item.bids)}</Col>
                        <Col className={tableStyles.verticalCenter}><Link to={`/items/${item.id}`} className={tableStyles.viewItemLink}>VIEW</Link></Col>
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
                <Link to="/sell" className={styles.startSellingButton}>START SELLING</Link>
            </div>}
        </div>
    );
}

export default Seller;