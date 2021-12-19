import styles from "./ListItem.module.css";
import { Link } from "react-router-dom";
import { MdGavel } from "react-icons/md";

function ListItem(props) {
    return (
      <div className={styles.itemContainer}>
        <Link to={`/items/${props.id}`}><img className={styles.photo} src={props.photo} alt="" /></Link>
        <div className={styles.itemInfoContainer}>
            <Link to={`/items/${props.id}`} className={styles.itemLink}><h3 className={styles.title}>{props.name}</h3></Link> 
            <p className={styles.description}>{props.description}</p>
            <p className={styles.startPrice}>Start From ${props.startingPrice}</p>
            <Link to={`/items/${props.id}`} className={styles.bidButton}>Bid&ensp;<MdGavel/></Link>
        </div>
      </div>
    );
}

export default ListItem;
