import styles from "./Footer.module.css";
import { Container, Col,  Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SocialNetworks from "./SocialNetworks";


const Footer = () => {
  return (
    <div className={styles.footer}>
      <Container className={"no-gutters"}>
        <Row className={styles.footerContent}>
          <Col>
            <div className={styles.footerColumn}>
              <p className={styles.footerColumnTitle}>AUCTION</p>
              <Link to="/about">About Us</Link>
              <Link to="/terms">Terms and Conditions</Link>
              <Link to="/privacy">Privacy and Policy</Link>
            </div>
          </Col>
          <Col>
            <div className={styles.footerColumn}>
              <p className={styles.footerColumnTitle}>GET IN TOUCH</p>
              <p>Call Us at +123 797-567-2535</p>
              <p>support@auction.com</p>
              <SocialNetworks />
            </div>
          </Col>
          <Col>
            <div className={styles.footerColumn}>
              <p className={styles.footerColumnTitle}>NEWSLETTER</p>
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
