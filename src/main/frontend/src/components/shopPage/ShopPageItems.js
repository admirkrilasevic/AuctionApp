import { useEffect, useState } from "react";
import Item from "../landingPage/Item";
import { Row, Col } from "react-bootstrap";
import { fetchFilteredItems } from '../landingPage/ItemService';
import { ITEM_SORT, DIRECTION, SHOP_PAGE_ITEMS, PAGE_VALUES } from "../../constants";
import styles from "./ShopPageItems.module.css";
import ActiveFilters from "./ActiveFilters";

function ShopPageItems(
  {items, 
  setItems, 
  selectedCategories, 
  selectedSubcategories, 
  priceRange, 
  categoriesList, 
  onRemoveCategoryClick, 
  onRemoveSubcategoryClick, 
  onRemovePriceFilterClick, 
  onClearAllClick}) {

  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [page, setPage] = useState(PAGE_VALUES.INITIAL);

  const fetchItems = async (newPage) => {
    let itemsFromServer = await fetchFilteredItems(newPage, SHOP_PAGE_ITEMS.PAGE_SIZE, ITEM_SORT.ALPHABETICAL, DIRECTION.ASCENDING, selectedCategories, selectedSubcategories.map(c => c.id), priceRange.min, priceRange.max);
    const oldItems = (newPage == PAGE_VALUES.INITIAL) ? [] : items;
    setItems([...oldItems, ...itemsFromServer.content]);
    setHasMoreItems(!itemsFromServer.last);
  }

  useEffect(async () => {
    fetchItems(page)
  }, [page]);

  useEffect(() => {
    setItems([]);
    setHasMoreItems(true);
    setPage(PAGE_VALUES.INITIAL);
    fetchItems(PAGE_VALUES.INITIAL);
  }, [selectedCategories, selectedSubcategories, priceRange]);

  const fetchData = async () => {
    setPage(page+1);
  };

  return (
    <div className="container-fluid">
      <ActiveFilters 
        selectedCategories={selectedCategories} 
        selectedSubcategories={selectedSubcategories}
        priceRange={priceRange}
        categoriesList={categoriesList} 
        onRemoveCategoryClick={onRemoveCategoryClick}
        onRemoveSubcategoryClick={onRemoveSubcategoryClick}
        onRemovePriceFilterClick={onRemovePriceFilterClick}
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
