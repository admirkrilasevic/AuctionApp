import { Container, Col, Row, Button } from 'react-bootstrap';
import styles from "./ItemOverview.module.css";
import "../../App.css";
import Tabs from './Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import PageLayout from '../PageLayout';
import { BID_MESSAGE, ITEM_MESSAGE } from "../../constants";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import BiddersSection from './BiddersSection';
import { Link } from "react-router-dom";
import { getRecommendedProducts, placeBid } from '../../utils/ItemService';
import { calculateTimeLeft } from "../../utils/Utils";
import AuthService from '../../utils/AuthService';
import Item from '../landingPage/Item';

function ItemOverview({...item}) {
    const { id, name, photo, startingPrice, description, endDate, bids, userId, categoryId, sold } = item;
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

    const [recommendedProducts, setRecommendedProducts] = useState([]);

    const user = AuthService.getCurrentUser();

    useEffect(async () => {
        if (categoryId) {
            const recommended = await getRecommendedProducts(categoryId, name);
            setRecommendedProducts(recommended);
        }
    }, [categoryId]);

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

    const getIdOfHighestBidder = () => {
        if (itemBids.length > 0) {
            const sortedbids = itemBids.sort();
            return sortedbids[sortedbids.length-1].userId;
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
                        {loggedIn && !(new Date(endDate) < new Date()) ?
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
                        </Row>) :
                        <Row>
                            {
                            sold ? 
                            <div className={styles.congratsMessage}>{user.id === getIdOfHighestBidder() ? ITEM_MESSAGE.BOUGHT : ITEM_MESSAGE.SOLD}</div> :
                            <div className={styles.congratsMessage}>{user.id === getIdOfHighestBidder() ? ITEM_MESSAGE.CONGRATS : ITEM_MESSAGE.ENDED}</div>
                            }    
                        </Row>}
                        <Row className={styles.tabSection}>
                            <Tabs description={description}/>
                        </Row>
                    </Col>
                </Row>
                {loggedIn && (userId === user.id) && <BiddersSection bids={bids}/>}
                {(userId !== user.id) && recommendedProducts &&
                    <div>
                        <div className={styles.recommendedProductsTitle}>Recommended Products</div>
                        <div className={styles.recommendedProductsContainer}>
                            {console.log(recommendedProducts)}
                            {recommendedProducts.map((item) => {
                                return (
                                        <Item 
                                            key={item.id}
                                            id={item.id}
                                            photo={item.photo}
                                            name={item.name}
                                            startingPrice={item.startingPrice}
                                        />
                                );
                            })}
                        </div>
                    </div>}
            </Container>
        </PageLayout>
    );
  }
  
  export default ItemOverview;
