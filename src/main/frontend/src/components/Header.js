import styles from './Header.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faGooglePlus,
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

const Header = () => {
    return(
      <div className={styles.header}>
        <nav>
          <div className={styles.socialsContainer}>
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
          <p className={styles.loginContainer}>
            <a className = {styles.login} href="">Login</a> 
            or 
            <a className = {styles.register} href="">Create an account</a>
          </p>
        </nav>
      </div>

    );
}

export default Header;