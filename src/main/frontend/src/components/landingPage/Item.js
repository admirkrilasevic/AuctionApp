import styles from "./Item.module.css";

function Item(props) {
    return (
      <div className = {styles.itemContainer}>
        <img className = {styles.photo} src={`data:image/jpeg;base64,${props.photo}`} alt="" />
        <h3 className={styles.title}>{props.name}</h3>
        <p className= {styles.startPrice} >
          Start From <span className= {styles.amount}>${props.startingPrice}</span>
        </p>
      </div>
    );
}

export default Item;
