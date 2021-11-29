import { Container, Col, Row, Button } from 'react-bootstrap';
import styles from "./ItemOverview.module.css";
import "../../App.css";
import Tabs from './Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import PageLayout from '../PageLayout';
import { BID_MESSAGE } from "../../constants";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../loginAndRegistration/AuthContext';
import BiddersSection from './BiddersSection';
import { Link } from "react-router-dom";
import { getHighestBidForItem, getNumberOfBidsForItem, getTimeLeftForItem } from '../landingPage/ItemService';

function ItemOverview({...item}) {

    const { id, name, photo, startingPrice, description, endDate, bids } = item;
    const { loggedIn } = useContext(AuthContext);

    const imagesArray =  photo ? photo.split(";") : [];
    const [currentImage, setCurrentImage] = useState(imagesArray[0]);

    const [highestBid, setHighestBid] = useState();
    const [noOfBids, setNoOfBids] = useState();
    const [timeLeft, setTimeLeft] = useState();
    
    const arrowIcon = <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowRight}/>;
    const previousPage = <Link to="/home" className={styles.breadcrumbsLink}><li>Home&ensp;</li></Link>;
    const currentPage = <li className="purpleText">&ensp;Single Item</li>;

    useEffect(async () => {
        setCurrentImage(imagesArray[0]);
        setHighestBid(await getHighestBidForItem(id));
        setNoOfBids(await getNumberOfBidsForItem(id));
        setTimeLeft(await getTimeLeftForItem(id));
    }, [photo]);
  
    return (
        <PageLayout title={name} message={BID_MESSAGE.SUCCESS} messageStyle={styles.bidMessageHeaderSuccess} breadcrumbs={[previousPage, arrowIcon, currentPage]}>
            <Container>
                <Row>
                    <Col>
                        <img className={styles.coverImage} src={currentImage}></img>
                        <div className={styles.imagesContainer}>
                            {imagesArray.map((image) => (
                                <img className={styles.optionalImage} src={image} onClick={() => setCurrentImage(image)}/>
                            ))}
                        </div>
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
                                <span className="purpleText">${highestBid}</span>
                            </p>
                            <p>
                                {'Number of bids: '}
                                <span className="purpleText">{noOfBids}</span>
                            </p>
                            <p>
                                {'Time left: '}
                                <span className="purpleText">{timeLeft}</span>
                            </p>
                        </div>
                        {loggedIn && (<Row className={styles.placeBidContainer}>
                            <Col><input className={styles.bidInput} placeholder={`Enter $${highestBid+0.1} or higher`}></input></Col>
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
