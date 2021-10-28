import styles from "./Footer.module.css";
import {Container, Col,  Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGooglePlus,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Container className={"no-gutters"}>
        <Row className={styles.footerContent}>
          <Col>
            <div className={styles.links}>
              <div className={styles.title}>AUCTION</div>
              <Link to="/about">About Us</Link>
              <Link to="/terms">Terms and Conditions</Link>
              <Link to="/privacy">Privacy and Policy</Link>
            </div>
          </Col>
          <Col>
          <div className={styles.links}>
              <div className={styles.title}>GET IN TOUCH</div>
              <p>Call Us at +123 797-567-2535</p>
              <p>support@auction.com</p>
              <ul className={styles.socials}>
                <li>
                  <a href="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebook} size="2x"/></a>
                </li>
                <li>
                  <a href="https://www.instagram.com/"><FontAwesomeIcon icon={faInstagram} size="2x"/></a>
                </li>
                <li>
                  <a href="https://www.twitter.com/"><FontAwesomeIcon icon={faTwitter} size="2x"/></a>
                </li>
                <li>
                  <a href="https://workspace.google.com/"><FontAwesomeIcon icon={faGooglePlus} size="2x"/></a>
                </li>
              </ul>
            </div>
          </Col>
          <Col className={styles.buttonsContainer}>
          <div className={styles.links}>
              <div className={styles.title}>NEWSLETTER</div>
              <p>Enter your email address and get notified about new products. We hate spam!</p>
              <Row>
                <Col><input className={styles.newsletterInput} type="email" placeholder="Your Email address"></input></Col>
                <Col><Button className={styles.newsletterButton} variant="outline-*">GO</Button></Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>    
    </div>
  );
}

export default Footer;