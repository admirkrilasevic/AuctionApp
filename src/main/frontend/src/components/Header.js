import styles from './Header.module.css'
import { Link } from 'react-router-dom';
import SocialNetworks from './SocialNetworks';
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import AuthService from "../utils/AuthService";
import { AuthContext } from '../utils/AuthContext';

const Header = () => {

  const history = useHistory();
  const { setToken, loggedIn } = useContext(AuthContext);

  const logOut = () => {
    setToken(false);
    AuthService.logout();
    history.push("/home");
  };

    return(
      <div className={styles.header}>
        <nav className={styles.headerContent}>
          <div className={styles.socialsContainer}>
            <SocialNetworks />
          </div>
          {loggedIn ? (
            <p className={styles.loginContainer}>
              <Link to="/home" className = {styles.logout} onClick={logOut}>Log Out</Link>
            </p>
          ) : (
            <p className={styles.loginContainer}>
              <Link to="/login" className = {styles.login}>Login</Link> 
              or 
              <Link to="/register" className = {styles.register}>Create an account</Link>
            </p>
          )}
        </nav>
      </div>

    );
}

export default Header;
