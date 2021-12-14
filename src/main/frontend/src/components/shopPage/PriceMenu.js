import { useEffect, useState } from "react";
import styles from "./PriceMenu.module.css";
import { Slider } from '@material-ui/core';

function PriceMenu({items, setItems, priceRange, setPriceRange}) {

	const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [filterMinPrice, setFilterMinPrice] = useState(0);
    const [filterMaxPrice, setFilterMaxPrice] = useState(100);
    const [avgPrice, setAvgPrice] = useState(0);

	useEffect(() => {
        if (items.length > 0){
            const sortedItems = [...items];
            sortedItems.sort((a, b) => (a.startingPrice > b.startingPrice) ? 1 : -1);
            setMinPrice(sortedItems[0].startingPrice);
            setMaxPrice(sortedItems[sortedItems.length-1].startingPrice);
        }
        setPriceRange([minPrice, maxPrice]);
        setAvgPrice((maxPrice+minPrice)/2);
	}, [items])

    useEffect(() => {
        setFilterMinPrice(minPrice);
        setFilterMaxPrice(maxPrice);
    }, [maxPrice, minPrice])

    useEffect(() => {
        setAvgPrice((filterMaxPrice+filterMinPrice)/2);
    }, [filterMaxPrice, filterMinPrice])

    const onSliderChange = (e, newValues) => {
        setPriceRange(newValues);
        setFilterMinPrice(newValues[0]);
        setFilterMaxPrice(newValues[1]);
    }

    const onMinInputChange = (e) => {
        setFilterMinPrice(e.target.value);
    }

    const onMaxInputChange = (e) => {
        setFilterMaxPrice(e.target.value);
    }

	return (
		<div className={styles.priceMenuContainer}>
			<h6 className={styles.menuTitle}>FILTER BY PRICE</h6>
            <div className={styles.priceInputs}>
                <input 
                    className={styles.minPriceInput}
                    value={filterMinPrice}
                    onChange={onMinInputChange} 
                />
                <input 
                    className={styles.maxPriceInput}
                    value={filterMaxPrice} 
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
