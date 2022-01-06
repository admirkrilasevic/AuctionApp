import styles from './Navbar.module.css'
import { Container, Col,  Row, Dropdown } from 'react-bootstrap';
import logo from '../assets/auction-app-logo.png';
import { NavLink, Link } from 'react-router-dom';
import { AiOutlineSearch as SearchIcon } from 'react-icons/ai';
import { useState } from 'react';

const HeaderNavbar = () => {

    const [showDropdown, setShowDropdown] = useState(false);

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
                    <NavLink to="/home" activeClassName={styles.activeLink}>Home</NavLink>
                    <NavLink to="/shop/0" activeClassName={styles.activeLink}>Shop</NavLink>
                    <Dropdown onMouseOver={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)} className={styles.dropdown}>
                        <Dropdown.Toggle variant="none" className={styles.dropdownToggle} onClick={() => setShowDropdown(false)}>
                            <NavLink to="/account/profile" activeClassName={styles.activeLink}>MY ACCOUNT</NavLink>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={styles.dropdownMenu} show={showDropdown}>
                            <Dropdown.Item><NavLink to="/account/profile" activeClassName={styles.activeLink}>Profile</NavLink></Dropdown.Item>
                            <Dropdown.Item><NavLink to="/account/seller" activeClassName={styles.activeLink}>Become Seller</NavLink></Dropdown.Item>
                            <Dropdown.Item><NavLink to="/account/bids" activeClassName={styles.activeLink}>Your bids</NavLink></Dropdown.Item>
                            <Dropdown.Item><NavLink to="/account/settings" activeClassName={styles.activeLink}>Settings</NavLink></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
        </Container>
    );
}

export default HeaderNavbar;
