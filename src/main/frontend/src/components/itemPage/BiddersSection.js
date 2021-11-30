import styles from "./BiddersSection.module.css";
import { Container, Col, Row } from 'react-bootstrap';

function BiddersSection({bids}) {

    const bidRows = bids.map((bid) =>
        <Row className={styles.contentRow} key={bid.id}>
            <Col xs={8}>{bid.id}</Col>
            <Col>{bid.date}</Col>
            <Col className={styles.amountCol}>{bid.amount}</Col>
        </Row>
    );

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
