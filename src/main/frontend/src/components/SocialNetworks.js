import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGooglePlus,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./SocialNetworks.module.css";

const SocialNetworks = () => {
    return (
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
    );
}

export default SocialNetworks;
