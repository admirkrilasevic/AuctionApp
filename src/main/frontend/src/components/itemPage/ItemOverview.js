import { Container, Col,  Row, Button } from 'react-bootstrap';
import styles from "./ItemOverview.module.css"
import Tabs from './Tabs';

function ItemOverview() {
  
    return (
        <Container>
            <Row>
                <Col>
                    <img className={styles.coverImage} src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1015&q=80"></img>
                </Col>
                <Col className={styles.itemInfoContainer}>
                    <h3>Title</h3>
                    <p className={styles.startingPrice}>
                        {'Starts from: '}
                        <span className={styles.purpleText}>$10</span>
                    </p>
                    <div className={styles.bidsInfoContainer}>
                        <p>
                            {'Highest bid: '}
                            <span className={styles.purpleText}>$12</span>
                        </p>
                        <p>
                            {'Number of bids: '}
                            <span className={styles.purpleText}>1</span>
                        </p>
                        <p>
                            {'Time left: '}
                            <span className={styles.purpleText}>10 days</span>
                        </p>
                    </div>
                    <Row className={styles.placeBidContainer}>
                        <Col><input className={styles.bidInput} placeholder="Enter $12.01 or higher"></input></Col>
                        <Col><Button className={styles.bidButton} variant="outline-*">PLACE BID</Button></Col>
                    </Row>
                    <Row className={styles.tabSection}>
                        <Tabs/>
                    </Row>
                </Col>
            </Row>
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
        </Container>
    );
  }
  
  export default ItemOverview;