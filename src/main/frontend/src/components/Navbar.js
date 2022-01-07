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
                    <NavLink to="/home" activeStyle={{ color: '#8367D8' }}>Home</NavLink>
                    <NavLink to="/shop/0" activeStyle={{ color: '#8367D8' }}>Shop</NavLink>
                    <Dropdown onMouseOver={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)} className={styles.dropdown}>
                        <Dropdown.Toggle variant="none" className={styles.dropdownToggle} onClick={() => setShowDropdown(false)}>
                            <NavLink to="/account/profile" activeStyle={{ color: '#8367D8' }}>MY ACCOUNT</NavLink>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={styles.dropdownMenu} show={showDropdown}>
                            <Dropdown.Item><NavLink to="/account/profile" activeStyle={{ color: '#8367D8' }}>Profile</NavLink></Dropdown.Item>
                            <Dropdown.Item><NavLink to="/account/seller" activeStyle={{ color: '#8367D8' }}>Become Seller</NavLink></Dropdown.Item>
                            <Dropdown.Item><NavLink to="/account/bids" activeStyle={{ color: '#8367D8' }}>Your bids</NavLink></Dropdown.Item>
                            <Dropdown.Item><NavLink to="/account/settings" activeStyle={{ color: '#8367D8' }}>Settings</NavLink></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
        </Container>
    );
}

export default HeaderNavbar;
