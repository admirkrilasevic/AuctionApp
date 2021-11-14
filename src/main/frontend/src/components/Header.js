import styles from './Header.module.css'
import { Link } from 'react-router-dom';
import SocialNetworks from './SocialNetworks';
import { useState, useEffect } from "react";
import AuthService from "./loginAndRegistration/AuthService";

const Header = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

    return(
      <div className={styles.header}>
        <nav className={styles.headerContent}>
          <div className={styles.socialsContainer}>
            <SocialNetworks />
          </div>
          {currentUser ? (
            <p className={styles.loginContainer}>
              <Link to="/account">{currentUser.name}</Link>
              <Link to="/home" onClick={logOut}>Log out</Link>
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
