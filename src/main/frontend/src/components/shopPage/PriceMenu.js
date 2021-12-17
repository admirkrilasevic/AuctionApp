import { useEffect, useState } from "react";
import styles from "./PriceMenu.module.css";
import { Slider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { PRICE_RANGE } from "../../constants";

function PriceMenu({ priceRange, setPriceRange }) {

    const [minPrice, setMinPrice] = useState(PRICE_RANGE.MIN);
    const [maxPrice, setMaxPrice] = useState(PRICE_RANGE.MAX);
    const [avgPrice, setAvgPrice] = useState(0);

	useEffect(() => {
        setPriceRange({
            min: PRICE_RANGE.MIN,
            max: PRICE_RANGE.MAX
        });
        setAvgPrice((priceRange.min+priceRange.max)/2);
	}, [])

    useEffect(() => {
        setAvgPrice((priceRange.min+priceRange.max)/2);
    }, [priceRange])

    const onSliderChange = (e, newValues) => {
        setPriceRange({
            min: newValues[0],
            max: newValues[1]
        });
    }

    const onMinInputChange = (e) => {
        setPriceRange({
            min: e.target.value,
            max: priceRange.max
        });
    }

    const onMaxInputChange = (e) => {
        setPriceRange({
            min: priceRange.min,
            max: e.target.value
        });
    }

    const muiTheme = createTheme({
        overrides:{
            MuiSlider: {
                thumb:{
                    color: "#8367D8"
                },
                track: {
                    color: "#8367D8"
                },
                rail: {
                    color: "#D8D8D8"
                }
            }
        }
    });

    return (
        <div className={styles.priceMenuContainer}>
            <h6 className={styles.menuTitle}>FILTER BY PRICE</h6>
            <div className={styles.priceInputs}>
                <input 
                    className={styles.minPriceInput}
                    value={priceRange.min}
                    onChange={onMinInputChange} 
                />
                <input 
                    className={styles.maxPriceInput}
                    value={priceRange.max} 
                    onChange={onMaxInputChange} 
                />
            </div>
            <ThemeProvider theme={muiTheme}>
                <Slider
                    min={minPrice}
                    max={maxPrice}
                    value={[priceRange.min, priceRange.max]}
                    step={0.1}
                    onChange={onSliderChange}
                />
            </ThemeProvider>
            <p className={styles.priceRange}>${priceRange.min}-${priceRange.max}</p>
            <p className={styles.priceAverage}>The average price is ${avgPrice.toFixed(2)}</p>
        </div>
    )
}

export default PriceMenu;
