import { Container, Col, Row, Button } from 'react-bootstrap';
import styles from "./ItemOverview.module.css";
import "../../App.css";
import Tabs from './Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import PageLayout from '../PageLayout';
import { BID_MESSAGE } from "../../constants";
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../loginAndRegistration/AuthContext';
import BiddersSection from './BiddersSection';
import { Link } from "react-router-dom";
import { getHighestBidForItem, getNumberOfBidsForItem, getTimeLeftForItem, placeBid } from '../landingPage/ItemService';

function ItemOverview({...item}) {

    const { id, name, photo, startingPrice, description, endDate, bids } = item;
    const { token, loggedIn } = useContext(AuthContext);

    const imagesArray =  photo ? photo.split(";") : [];
    const [currentImage, setCurrentImage] = useState(imagesArray[0]);

    const [highestBid, setHighestBid] = useState();
    const [noOfBids, setNoOfBids] = useState();
    const [timeLeft, setTimeLeft] = useState();
    const [bidAmount, setBidAmount] = useState();
    const [bidMessage, setBidMessage] = useState();
    const [bidMessageStyle, setBidMessageStyle] = useState();
    
    const arrowIcon = <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowRight}/>;
    const previousPage = <Link to="/home" className={styles.breadcrumbsLink}><li>Home&ensp;</li></Link>;
    const currentPage = <li className="purpleText">&ensp;Single Item</li>;

    const onChangeBidAmount = (e) => {
        const bidAmount = e.target.value;
        setBidAmount(bidAmount);
    };

    const handlePlacingBid = () => {
        if (bidAmount < highestBid) {
            setBidMessage(BID_MESSAGE.TRY_AGAIN);
            setBidMessageStyle(styles.bidMessageHeaderTryAgain);
        }
        else {
            placeBid(token, id, bidAmount).then(
                (response) => {
                  setBidMessage(BID_MESSAGE.SUCCESS);
                  setBidMessageStyle(styles.bidMessageHeaderSuccess);
                }
            );
        }
    };

    useEffect(async () => {
        setCurrentImage(imagesArray[0]);
    }, [photo]);

    useEffect(async () => {
        setHighestBid(await getHighestBidForItem(id));
        setNoOfBids(await getNumberOfBidsForItem(id));
        setTimeLeft(await getTimeLeftForItem(id));
    }, [bids]);
  
    return (
        <PageLayout title={name} message={bidMessage} messageStyle={bidMessageStyle} breadcrumbs={[previousPage, arrowIcon, currentPage]}>
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
                        {loggedIn && 
                        (<Row className={styles.placeBidContainer}>
                            <Col>
                                <input 
                                    className={styles.bidInput} 
                                    placeholder={`Enter $${highestBid+0.1} or higher`}           
                                    value={bidAmount}
                                    onChange={onChangeBidAmount}
                                />
                            </Col>
                            <Col>
                                <Button 
                                    className={styles.bidButton} 
                                    variant="outline-*" 
                                    onClick = {handlePlacingBid}
                                >
                                    PLACE BID &emsp; 
                                    <FontAwesomeIcon icon={faAngleRight}/>
                                </Button>
                            </Col>
                        </Row>)}
                        <Row className={styles.tabSection}>
                            <Tabs description={description}/>
                        </Row>
                    </Col>
                </Row>
                {loggedIn && <BiddersSection bids={bids}/>}
            </Container>
        </PageLayout>
    );
  }
  
  export default ItemOverview;
