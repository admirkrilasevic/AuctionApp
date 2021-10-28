import styles from './Navbar.module.css'
import {Container, Col,  Row } from 'react-bootstrap';
import SearchBar from "material-ui-search-bar";
import logo from '../assets/auction-app-logo.png';

const HeaderNavbar = () => {
    return(
        <Container className={styles.navbarContainer}>
            <Row className={styles.navbar}>
                <Col>
                    <img className={styles.logo} src={logo} alt="Logo"></img>
                </Col>
                <Col xs={6}>
                    <SearchBar className={styles.searchbar} placeholder="Try enter: Shoes" />
                </Col>
                <Col className={styles.buttonsContainer}>
                    <a href="">Home</a> 
                    <a href="">Shop</a> 
                    <a href="">My account</a>
                </Col>
            </Row>
        </Container>
    );
}

export default HeaderNavbar;