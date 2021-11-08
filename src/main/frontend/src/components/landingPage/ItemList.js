import Item from "./Item";
import { Row, Col } from 'react-bootstrap';
import styles from './ItemList.module.css';

function ItemList(props) {
    return (
        <Row className={styles.container}>
            {props.items.map( (item) => (
                <Col>
                    <Item 
                        key={item.id}
                        id={item.id}
                        photo={item.photo}
                        name={item.name}
                        startingPrice={item.startingPrice}
                    />
                </Col>
            ))}
        </Row>
    );
}

export default ItemList;
