import { Container, Col,  Row, Button } from 'react-bootstrap';
import styles from "./ItemOverview.module.css"
import Tabs from './Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import PageLayout from '../PageLayout';
import * as Constants from "../../constants";
import { useContext } from 'react';
import { AuthContext } from '../loginAndRegistration/AuthContext';

function ItemOverview(props) {

    const { loggedIn } = useContext(AuthContext);
  
    return (
        <PageLayout title={props.name} message={Constants.BID_MESSAGE.SUCCESS} messageStyle={styles.bidMessageHeaderSuccess}>
            <Container>
                <Row>
                    <Col>
                        <img className={styles.coverImage} src={props.photo}></img>
                    </Col>
                    <Col className={styles.itemInfoContainer}>
                        <h3>{props.name}</h3>
                        <p className={styles.startingPrice}>
                            {'Starts from: '}
                            <span className={styles.purpleText}>${props.startingPrice}</span>
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
                        {loggedIn && (<Row className={styles.placeBidContainer}>
                            <Col><input className={styles.bidInput} placeholder="Enter $12.01 or higher"></input></Col>
                            <Col><Button className={styles.bidButton} variant="outline-*">PLACE BID &emsp; <FontAwesomeIcon icon={faAngleRight}/></Button></Col>
                        </Row>)}
                        <Row className={styles.tabSection}>
                            <Tabs description={props.description}/>
                        </Row>
                    </Col>
                </Row>
                {loggedIn && (<Row className={styles.biddersSection}>
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
                </Row>)}
            </Container>
        </PageLayout>
    );
  }
  
  export default ItemOverview;