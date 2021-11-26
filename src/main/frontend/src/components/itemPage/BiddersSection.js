import styles from "./BiddersSection.module.css";
import { Container, Col, Row } from 'react-bootstrap';

function BiddersSection() {

    return (
        <Row className={styles.biddersSection}>
        <Container className={styles.biddersTable}>
            <Row className={styles.headerRow}>
                <Col xs={8}>Bidder</Col>
                <Col>Date</Col>
                <Col>Bid</Col>
            </Row>
            <Row className={styles.contentRow}>
                <Col xs={8}>Admir Krilašević</Col>
                <Col>17 November 2021</Col>
                <Col className={styles.amountCol}>$ 12.00</Col>
            </Row>
        </Container>
        </Row>
    );
}

export default BiddersSection;
