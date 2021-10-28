import styles from './Header.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faGooglePlus,
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import {Link} from 'react-router-dom';

const Header = () => {
    return(
      <div className={styles.header}>
        <nav>
          <div className={styles.socialsContainer}>
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
          <p className={styles.loginContainer}>
            <Link to="/login" className = {styles.login}>Login</Link> 
            or 
            <Link to="/register" className = {styles.register}>Create an account</Link>
          </p>
        </nav>
      </div>

    );
}

export default Header;