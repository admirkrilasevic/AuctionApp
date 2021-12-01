import styles from "./BiddersSection.module.css";
import { Container, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from "react";

function BiddersSection({bids}) {
    
    const [bidRows, setBidRows] = useState();

    useEffect(async () => {
        if (bids){
            setBidRows (bids.map((bid) =>
            <Row className={styles.contentRow} key={bid.id}>
                <Col xs={8}>{bid.id}</Col>
                <Col>{formatDate(bid.date)}</Col>
                <Col className={styles.amountCol}>$ {bid.amount}</Col>
            </Row>));
        }
    });

    const formatDate = (bidDate) => {
        var date = new Date(bidDate);
        var formattedDate = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }).format(date);
        return formattedDate;
    }

    return (
        <Row className={styles.biddersSection}>
            <Container className={styles.biddersTable}>
                <Row className={styles.headerRow}>
                    <Col xs={8}>Bidder</Col>
                    <Col>Date</Col>
                    <Col>Bid</Col>
                </Row>
                {bidRows}
            </Container>
        </Row>
    );
}

export default BiddersSection;
