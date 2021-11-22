import styles from "./Item.module.css";
import { Link } from "react-router-dom";

function Item(props) {
    return (
      <div className = {styles.itemContainer}>
        <Link to={`/items/${props.id}`}><img className = {styles.photo} src={props.photo} alt="" /></Link>
        <Link to={`/items/${props.id}`} className={styles.itemLink}><h3 className={styles.title}>{props.name}</h3></Link> 
        <p className= {styles.startPrice} >
          Start From <span className= {styles.amount}>${props.startingPrice}</span>
        </p>
      </div>
    );
}

export default Item;
