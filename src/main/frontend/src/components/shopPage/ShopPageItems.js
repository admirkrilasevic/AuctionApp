import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import Item from "../landingPage/Item";
import { Row, Col } from "react-bootstrap";
import { fetchItems } from '../landingPage/ItemService';
import { ITEM_SORT, DIRECTION } from "../../constants";
import styles from "./ShopPageItems.module.css";

function ShopPageItems({categoryId}) {
  const [items, setItems] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(async () => {
    let itemsFromServer = await fetchItems(page, 9, ITEM_SORT.ALPHABETICAL, DIRECTION.ASCENDING);
    setItems([...items, ...itemsFromServer.content]);
    setHasMoreItems(!itemsFromServer.last);
  }, [page]);

  const fetchData = async () => {
    setPage(page+1);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      hasMore={hasMoreItems}
    >
      <div className="container-fluid">
        <Row>
          {items
          .filter(function (item) {
            if (categoryId != 0) {
              return item.categoryId==categoryId;
            } else {
              return item;
            }
          })
          .map((item) => {
            return (
              <Col>
                <Item 
                  key={item.id}
                  id={item.id}
                  photo={item.photo}
                  name={item.name}
                  startingPrice={item.startingPrice}
                />
              </Col>
            );
          })}
        </Row>
        <button onClick={fetchData} className={styles.exploreMoreButton}>EXPLORE MORE</button>
      </div>
    </InfiniteScroll>
  );
}

export default ShopPageItems;