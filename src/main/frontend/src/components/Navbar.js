import styles from './Navbar.module.css'
import { Container, Col,  Row } from 'react-bootstrap';
import logo from '../assets/auction-app-logo.png';
import { NavLink, Link } from 'react-router-dom';
import { AiOutlineSearch as SearchIcon } from 'react-icons/ai';

const HeaderNavbar = () => {
    return(
        <Container className={styles.navbarContainer}>
            <Row className={styles.navbar}>
                <Col>
                    <Link to="/"><img className={styles.logo} src={logo} alt="Logo"></img></Link> 
                </Col>
                <Col xs={6}>
                    <div className={styles.searchContainer}>
                        <input className={styles.searchBar} type="search" placeholder="Try enter: Shoes"></input>
                        <SearchIcon className={styles.searchIcon}/>
                    </div>
                </Col>
                <Col className={styles.buttonsContainer}>
                    <NavLink to="/home" activeStyle={{ color: '#8367D8' }}>Home</NavLink>
                    <NavLink to="/shop" activeStyle={{ color: '#8367D8' }}>Shop</NavLink>
                    <NavLink to="/account" activeStyle={{ color: '#8367D8' }}>My Account</NavLink>
                </Col>
            </Row>
        </Container>
    );
}

export default HeaderNavbar;
