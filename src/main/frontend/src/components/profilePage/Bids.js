import { useEffect, useState } from "react";
import styles from "./Bids.module.css";
import tableStyles from "./Table.module.css";
import { fetchItemsByBidUserId, fetchAllItems } from "../landingPage/ItemService";
import AuthService from "../loginAndRegistration/AuthService";
import { Container, Row, Col } from "react-bootstrap";
import { TimeInterval } from 'time-interval-js';
import { Link } from "react-router-dom";
import { calculateTimeLeft } from "../Utils";

const Bids = () => {

    const [items, setItems] = useState();
    const [bids, setBids] = useState();

    const user = AuthService.getCurrentUser();

    useEffect(async () => {
        const userItems = await fetchItemsByBidUserId(user.id);
        const allItems = await fetchAllItems();
        const userBids = getBids(allItems);
        userBids.sort((a, b) => a.itemId - b.itemId);
        setBids(userBids);
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

    const getBids = (itemArray) => {
        var bids = [];
        for (var i = 0; i < itemArray.length ; i++) {
            for (var j = 0; j < itemArray[i].bids.length; j++) {
                var itemBid = itemArray[i].bids[j];
                if (itemBid.userId == user.id) {
                    bids.push(itemBid);
                }
            }
        }
        return bids;
    }

    return (
        <div className={styles.bidsContainer}>
        {(items && items.length > 0) &&
            <Container className={tableStyles.table}>
                <Row className={tableStyles.headerRow}>
                    <Col>Item</Col>
                    <Col>Name</Col>
                    <Col>Time Left</Col>
                    <Col>Your Bid</Col>
                    <Col>No. Bids</Col>
                    <Col>Highest Bid</Col>
                    <Col></Col>
                </Row>
                {items.map((item, index) => 
                <Row className={tableStyles.contentRow}>
                    <Col className={tableStyles.verticalCenter}><img src={item.photo} className={tableStyles.tableImages}/></Col>
                    <Col className={tableStyles.verticalCenter}>{item.name}</Col>
                    <Col className={tableStyles.verticalCenter}>{calculateTimeLeft(item.endDate)}</Col>
                    <Col className={tableStyles.verticalCenter}>$ {bids[index].amount}</Col>
                    <Col className={tableStyles.verticalCenter}>{item.bids.length}</Col>
                    <Col className={(bids[index].amount >= calculateHighestBid(item.bids)) ? tableStyles.highestBidCol : tableStyles.notHighestBidCol}>$ {calculateHighestBid(item.bids)}</Col>
                    <Col className={tableStyles.verticalCenter}><Link to={`/items/${item.id}`} className={tableStyles.viewItemLink}>VIEW</Link></Col>
                </Row>
                )}
            </Container>}
        </div>
    );
}

export default Bids;