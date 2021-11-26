import { Container, Col, Row, Button } from 'react-bootstrap';
import styles from "./ItemOverview.module.css";
import "../../App.css";
import Tabs from './Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import PageLayout from '../PageLayout';
import { BID_MESSAGE } from "../../constants";
import { useContext } from 'react';
import { AuthContext } from '../loginAndRegistration/AuthContext';
import BiddersSection from './BiddersSection';

function ItemOverview({...item}) {

    const { name, photo, startingPrice, description } = item;
    const { loggedIn } = useContext(AuthContext);
    const arrowIcon = <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowRight}/>;
  
    return (
        <PageLayout title={name} message={BID_MESSAGE.SUCCESS} messageStyle={styles.bidMessageHeaderSuccess} breadcrumbs={[<li>Home&ensp;</li>, arrowIcon, <li>&ensp;Single Item</li>]} >
            <Container>
                <Row>
                    <Col>
                        <img className={styles.coverImage} src={photo}></img>
                    </Col>
                    <Col className={styles.itemInfoContainer}>
                        <h3>{name}</h3>
                        <p className={styles.startingPrice}>
                            {'Starts from: '}
                            <span className="purpleText">${startingPrice}</span>
                        </p>
                        <div className={styles.bidsInfoContainer}>
                            <p>
                                {'Highest bid: '}
                                <span className="purpleText">$12</span>
                            </p>
                            <p>
                                {'Number of bids: '}
                                <span className="purpleText">1</span>
                            </p>
                            <p>
                                {'Time left: '}
                                <span className="purpleText">10 days</span>
                            </p>
                        </div>
                        {loggedIn && (<Row className={styles.placeBidContainer}>
                            <Col><input className={styles.bidInput} placeholder="Enter $12.01 or higher"></input></Col>
                            <Col><Button className={styles.bidButton} variant="outline-*">PLACE BID &emsp; <FontAwesomeIcon icon={faAngleRight}/></Button></Col>
                        </Row>)}
                        <Row className={styles.tabSection}>
                            <Tabs description={description}/>
                        </Row>
                    </Col>
                </Row>
                {loggedIn && <BiddersSection/>}
            </Container>
        </PageLayout>
    );
  }
  
  export default ItemOverview;
