import { useEffect, useState } from "react";
import Item from "../landingPage/Item";
import { Row, Col } from "react-bootstrap";
import { fetchFilteredItems, fetchItems } from '../landingPage/ItemService';
import { ITEM_SORT, DIRECTION } from "../../constants";
import styles from "./ShopPageItems.module.css";
import { SHOP_PAGE_ITEMS } from "../../constants";
import ActiveFilters from "./ActiveFilters";

function ShopPageItems({items, setItems, selectedCategories, selectedSubcategories, priceRange, categoriesList, onRemoveCategoryClick, onRemoveSubcategoryClick, onClearAllClick}) {

  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(async () => {
    let itemsFromServer = "";
    if (selectedCategories[0] == 0) {
      itemsFromServer = await fetchItems(page, SHOP_PAGE_ITEMS.PAGE_SIZE, ITEM_SORT.ALPHABETICAL, DIRECTION.ASCENDING);
    } else {
      itemsFromServer = await fetchFilteredItems(page, SHOP_PAGE_ITEMS.PAGE_SIZE, ITEM_SORT.ALPHABETICAL, DIRECTION.ASCENDING, selectedCategories, selectedSubcategories.map(c => c.id), priceRange[0], priceRange[1]);
    }
    setItems([...items, ...itemsFromServer.content]);
    setHasMoreItems(!itemsFromServer.last);
  }, [page]);

  useEffect(async () => {
    setItems([]);
    let itemsFromServer = await fetchFilteredItems(page, SHOP_PAGE_ITEMS.PAGE_SIZE, ITEM_SORT.ALPHABETICAL, DIRECTION.ASCENDING, selectedCategories, selectedSubcategories.map(c => c.id), priceRange[0], priceRange[1]);
    setItems([...itemsFromServer.content]);
    setHasMoreItems(!itemsFromServer.last);
  }, [selectedCategories, selectedSubcategories]);

  const fetchData = async () => {
    setPage(page+1);
  };

  return (
    <div className="container-fluid">
      <ActiveFilters 
        selectedCategories={selectedCategories} 
        selectedSubcategories={selectedSubcategories}
        categoriesList={categoriesList} 
        onRemoveCategoryClick={onRemoveCategoryClick}
        onRemoveSubcategoryClick={onRemoveSubcategoryClick}
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
