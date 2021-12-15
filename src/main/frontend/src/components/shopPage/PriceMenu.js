import { useEffect, useState } from "react";
import styles from "./PriceMenu.module.css";
import { Slider } from '@material-ui/core';

function PriceMenu({items, selectedCategories, selectedSubcategories, priceRange, setPriceRange}) {

	const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
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
	}, [selectedCategories, selectedSubcategories, minPrice, maxPrice])

    useEffect(() => {
        setAvgPrice((maxPrice+minPrice)/2);
    }, [priceRange])

    const onSliderChange = (e, newValues) => {
        setPriceRange(newValues);
    }

    const onMinInputChange = (e) => {
        setMinPrice(e.target.value);
    }

    const onMaxInputChange = (e) => {
        setMaxPrice(e.target.value);
    }

	return (
		<div className={styles.priceMenuContainer}>
			<h6 className={styles.menuTitle}>FILTER BY PRICE</h6>
            <div className={styles.priceInputs}>
                <input 
                    className={styles.minPriceInput}
                    value={priceRange[0]}
                    onChange={onMinInputChange} 
                />
                <input 
                    className={styles.maxPriceInput}
                    value={priceRange[1]} 
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
