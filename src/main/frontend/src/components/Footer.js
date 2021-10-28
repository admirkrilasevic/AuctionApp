import styles from "./Footer.module.css";
import {Container, Col,  Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGooglePlus,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Container className={"no-gutters"}>
        <Row className={styles.footerContent}>
          <Col>
            <div className={styles.links}>
              <div className={styles.title}>AUCTION</div>
              <a href="">About Us</a>
              <a href="">Terms and Conditions</a>
              <a href="">Privacy and Policy</a>
            </div>
          </Col>
          <Col>
          <div className={styles.links}>
              <div className={styles.title}>GET IN TOUCH</div>
              <a href="">Call Us at +123 797-567-2535</a>
              <a href="">support@auction.com</a>
              <ul className={styles.socials}>
                <li>
                  <a href=""><FontAwesomeIcon icon={faFacebook} size="2x"/></a>
                </li>
                <li>
                  <a href=""><FontAwesomeIcon icon={faInstagram} size="2x"/></a>
                </li>
                <li>
                  <a href=""><FontAwesomeIcon icon={faTwitter} size="2x"/></a>
                </li>
                <li>
                  <a href=""><FontAwesomeIcon icon={faGooglePlus} size="2x"/></a>
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