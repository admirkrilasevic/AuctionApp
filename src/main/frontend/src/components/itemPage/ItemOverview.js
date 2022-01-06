import { Container, Col, Row, Button } from 'react-bootstrap';
import styles from "./ItemOverview.module.css";
import "../../App.css";
import Tabs from './Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import PageLayout from '../PageLayout';
import { BID_MESSAGE } from "../../constants";
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import BiddersSection from './BiddersSection';
import { Link } from "react-router-dom";
import { placeBid } from '../../utils/ItemService';
import { calculateTimeLeft } from "../../utils/Utils";

function ItemOverview({...item}) {

    const { id, name, photo, startingPrice, description, endDate, bids } = item;
    const { token, loggedIn } = useContext(AuthContext);

    const [itemBids, setItemBids] = useState([]);

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

    useEffect(() => {
        setCurrentImage(imagesArray[0]);
    }, [photo]);

    useEffect(() => {
        setHighestBid(calculateHighestBid());
        setNoOfBids(calculateNumberOfBids());
        setTimeLeft(calculateTimeLeft(endDate));
    }, [itemBids]);

    useEffect(() => {
        setItemBids(bids ? bids : []);
    }, [bids]);

    const onChangeBidAmount = (e) => {
        const bidAmount = e.target.value;
        setBidAmount(bidAmount);
    };

    const handlePlacingBid = () => {
        if ((bidAmount <= highestBid) || (bidAmount <= startingPrice) || (bidAmount == undefined)) {
            setBidMessage(BID_MESSAGE.TRY_AGAIN);
            setBidMessageStyle(styles.bidMessageHeaderTryAgain);
        }
        else {
            placeBid(token, id, bidAmount).then(
                (response) => {
                    setBidMessage(BID_MESSAGE.SUCCESS);
                    setBidMessageStyle(styles.bidMessageHeaderSuccess);
                    const newBids = [...itemBids, response.body];
                    setItemBids(newBids);
                }
            );
        }
    };

    const calculateNumberOfBids = () => {
        return itemBids.length;
    }

    const calculateHighestBid = () => {
        if (itemBids.length > 0) {
            const sortedbids = itemBids.sort();
            return sortedbids[sortedbids.length-1].amount;
        } else {
            return 0;
        }
    }
  
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
                                    placeholder={`Enter $${(highestBid == 0) ? (startingPrice+0.1) : (highestBid+0.1)} or higher`}           
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
