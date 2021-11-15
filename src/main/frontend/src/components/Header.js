import styles from './Header.module.css'
import { Link } from 'react-router-dom';
import SocialNetworks from './SocialNetworks';
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import AuthService from "./loginAndRegistration/AuthService";

const Header = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  const history = useHistory();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(undefined);
    }
  }, [history, currentUser]);

  const logOut = () => {
    AuthService.logout();
    history.push("/home");
  };

    return(
      <div className={styles.header}>
        <nav className={styles.headerContent}>
          <div className={styles.socialsContainer}>
            <SocialNetworks />
          </div>
          {currentUser ? (
            <p className={styles.loginContainer}>
              <Link to="/account" className = {styles.user}>{currentUser.name}</Link>
              <button className = {styles.logout} onClick={logOut}>Log Out</button>
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
