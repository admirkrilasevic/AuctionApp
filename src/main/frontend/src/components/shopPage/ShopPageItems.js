import { useEffect, useState } from "react";
import Item from "../landingPage/Item";
import { Row, Col } from "react-bootstrap";
import { fetchItems, fetchItemsByCategories } from '../landingPage/ItemService';
import { ITEM_SORT, DIRECTION } from "../../constants";
import styles from "./ShopPageItems.module.css";
import { SHOP_PAGE_ITEMS } from "../../constants";
import ActiveFilters from "./ActiveFilters";

function ShopPageItems({selectedCategories, categoriesList, onRemoveClick, onClearAllClick}) {
  const [items, setItems] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(async () => {
    let itemsFromServer = "";
    if (selectedCategories[0] == 0) {
      itemsFromServer = await fetchItems(page, SHOP_PAGE_ITEMS.PAGE_SIZE, ITEM_SORT.ALPHABETICAL, DIRECTION.ASCENDING);
    } else {
      itemsFromServer = await fetchItemsByCategories(page, SHOP_PAGE_ITEMS.PAGE_SIZE, ITEM_SORT.ALPHABETICAL, DIRECTION.ASCENDING, selectedCategories);
    }
    setItems([...items, ...itemsFromServer.content]);
    setHasMoreItems(!itemsFromServer.last);
  }, [page]);

  useEffect(async () => {
    setItems([]);
    let itemsFromServer = await fetchItemsByCategories(page, SHOP_PAGE_ITEMS.PAGE_SIZE, ITEM_SORT.ALPHABETICAL, DIRECTION.ASCENDING, selectedCategories);
    setItems([...itemsFromServer.content]);
    setHasMoreItems(!itemsFromServer.last);
  }, [selectedCategories]);

  const fetchData = async () => {
    setPage(page+1);
  };

  return (
    <div className="container-fluid">
      <ActiveFilters 
        selectedCategories={selectedCategories} 
        categoriesList={categoriesList} 
        onRemoveClick={onRemoveClick}
        onClearAllClick={onClearAllClick}
      />
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
      {hasMoreItems && <button onClick={fetchData} className={styles.exploreMoreButton}>EXPLORE MORE</button>}
    </div>
  );
}

export default ShopPageItems;
