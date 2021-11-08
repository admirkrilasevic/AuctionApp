import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import Item from "./Item";
import { Row, Col } from "react-bootstrap";
import { fetchLastChance, fetchNewArrivals } from './ItemService';

function InfiniteScrollComponent(props) {
  const [items, setItems] = useState([]);

  const [hasMoreItems, setHasMoreItems] = useState(false);

  const [page, setPage] = useState(0);

  useEffect(async () => {
    let data = "";

    if(props.load === "newarrivals"){
      data = await fetchNewArrivals(page, 4);
    }else if(props.load === "lastchance"){
      data = await fetchLastChance(page, 4);
    }

    setItems(data.content);
  }, []);

  const fetchData = async () => {
    let itemsFromServer = "";

    if(props.load === "newarrivals"){
      itemsFromServer = await fetchNewArrivals(page+1, 4);
    }else if(props.load === "lastchance"){
      itemsFromServer = await fetchLastChance(page+1, 4);
    }

    setItems([...items, ...itemsFromServer.content]);

    setHasMoreItems(itemsFromServer.last);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={!hasMoreItems}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>You have reached the end</b>
        </p>
      }
    >
      <div className="container-fluid">
        <Row>
          {items.map( (item) => {
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