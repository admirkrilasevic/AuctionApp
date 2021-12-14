import { useEffect, useState } from "react";
import { getAvgPrice, getMaxPrice, getMinPrice } from "../landingPage/ItemService";
import styles from "./PriceMenu.module.css";
import { Slider } from '@material-ui/core';

function PriceMenu({items, setItems, priceRange, setPriceRange}) {

	const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [localMinPrice, setLocalMinPrice] = useState(0);
    const [localMaxPrice, setLocalMaxPrice] = useState(100);
    const [avgPrice, setAvgPrice] = useState(0);

	useEffect(() => {
        loadPrices();
        setPriceRange([minPrice, maxPrice]);
        setAvgPrice((maxPrice+minPrice)/2);
	}, [items])

    useEffect(() => {
        setPriceRange([minPrice, maxPrice]);
        setAvgPrice((maxPrice+minPrice)/2);
        setLocalMinPrice(minPrice);
        setLocalMaxPrice(maxPrice);
    }, [maxPrice, minPrice])

    const loadPrices = () => {
        getMinPrice(items.map((item) => item.id)).then(response => setMinPrice(response));
        getMaxPrice(items.map((item) => item.id)).then(response => setMaxPrice(response));
    }

    const onSliderChange = (e, newValues) => {
        setPriceRange(newValues);
        setLocalMinPrice(newValues[0]);
        setLocalMaxPrice(newValues[1]);
    }

    const onMinInputChange = (e) => {
  
    }

    const onMaxInputChange = (e) => {

    }

	return (
		<div className={styles.priceMenuContainer}>
			<h6 className={styles.menuTitle}>FILTER BY PRICE</h6>
            <div className={styles.priceInputs}>
                <input 
                    className={styles.minPriceInput}
                    value={localMinPrice}
                    onChange={onMinInputChange} 
                />
                <input 
                    className={styles.maxPriceInput}
                    value={localMaxPrice} 
                    onChange={onMaxInputChange} 
                />
            </div>
            <Slider
                min={minPrice}
                max={maxPrice}
                value={priceRange}
                step={0.1}
                onChange={onSliderChange}
            />
            <p className={styles.priceRange}>${priceRange[0]}-${priceRange[1]}</p>
			<p className={styles.priceAverage}>The average price is ${avgPrice.toFixed(2)}</p>
		</div>
	)
}

export default PriceMenu;
