import { useEffect, useState } from "react";
import { getAvgPrice, getMaxPrice, getMinPrice } from "../landingPage/ItemService";
import styles from "./PriceMenu.module.css";
import { Slider } from '@material-ui/core';

function PriceMenu({items, setItems, priceRange, setPriceRange}) {

	const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [avgPrice, setAvgPrice] = useState(0);

	useEffect(() => {
        loadPrices();
        setPriceRange([minPrice, maxPrice]);
	}, [items])

    const loadPrices = () => {
        getMinPrice(items.map((item) => item.id)).then(response => setMinPrice(response));
        getMaxPrice(items.map((item) => item.id)).then(response => setMaxPrice(response));
        getAvgPrice(items.map((item) => item.id)).then(response => setAvgPrice(response));
    }

    const onSliderChange = (newValues) => {
        setPriceRange(newValues);
    }

	return (
		<div className={styles.priceMenuContainer}>
			<h6 className={styles.menuTitle}>FILTER BY PRICE</h6>
            <div>
                <input 
                    className={styles.slider}
                    type="range"
                    value={priceRange}
                    min={minPrice}
                    max={maxPrice}
                    onChange={onSliderChange} 
                />
            </div>
            <p className={styles.priceRange}>${minPrice}-${maxPrice}</p>
			<p className={styles.priceAverage}>The average price is ${avgPrice.toFixed(2)}</p>
		</div>
	)
}

export default PriceMenu;
