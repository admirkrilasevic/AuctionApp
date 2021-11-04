import styles from './Header.module.css'
import { Link } from 'react-router-dom';
import SocialNetworks from './SocialNetworks';

const Header = () => {
    return(
      <div className={styles.header}>
        <nav className={styles.headerContent}>
          <div className={styles.socialsContainer}>
            <SocialNetworks />
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
