import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import Item from "./Item";
import { Row, Col } from "react-bootstrap";
import { fetchItems } from './ItemService';
import { LANDING_PAGE_TAB_VALUES, ITEM_SORT, DIRECTION } from "../../constants";

function InfiniteScrollComponent(props) {
  const [items, setItems] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(async () => {
    let itemsFromServer = "";

    if (props.load === LANDING_PAGE_TAB_VALUES.NEW_ARRIVALS) {
      itemsFromServer = await fetchItems(page, 4, ITEM_SORT.NEW_ARRIVALS, DIRECTION.DESCENDING);
    } else if (props.load === LANDING_PAGE_TAB_VALUES.LAST_CHANCE) {
      itemsFromServer = await fetchItems(page, 4, ITEM_SORT.LAST_CHANCE, DIRECTION.ASCENDING);
    }

    setItems([...items, ...itemsFromServer.content]);
    setHasMoreItems(!itemsFromServer.last);
  }, [page]);

  const fetchData = async () => {
    setPage(page+1);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMoreItems}
    >
      <div className="container-fluid">
        <Row>
          {items.map((item) => {
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
      </div>
    </InfiniteScroll>
  );
}

export default InfiniteScrollComponent;
