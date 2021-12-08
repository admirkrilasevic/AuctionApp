import styles from "./BiddersSection.module.css";
import { Container, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from "react";

function BiddersSection({bids}) {
    
    const [bidDetails, setBidDetails] = useState([]);

    useEffect(async () => {
        if (bids)
            setBidDetails(bids);
    }, [bids]);

    const formatDate = (bidDate) => {
        var date = new Date(bidDate);
        var formattedDate = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }).format(date);
        return formattedDate;
    }

    console.log(bids);

    return (
        <div>
        {(bids) && (bids.length != 0) && 
            (<Row className={styles.biddersSection}>
            <Container className={styles.biddersTable}>
                <Row className={styles.headerRow}>
                    <Col xs={8}>Bidder</Col>
                    <Col>Date</Col>
                    <Col>Bid</Col>
                </Row>
                {bidDetails.map((bid) =>
                <Row className={styles.contentRow} key={bid.id}>
                    <Col xs={8}>{bid.user.name} {bid.user.surname}</Col>
                    <Col>{formatDate(bid.date)}</Col>
                    <Col className={styles.amountCol}>$ {bid.amount}</Col>
                </Row>)}
            </Container>
            </Row>)
        }
        </div>
    );
}

export default BiddersSection;
