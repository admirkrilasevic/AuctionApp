import { useEffect, useState } from "react";
import styles from "./PriceMenu.module.css";
import { Slider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

function PriceMenu({ priceRange, setPriceRange }) {

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(200);
    const [avgPrice, setAvgPrice] = useState(0);

	useEffect(() => {
        setPriceRange([minPrice, maxPrice]);
        setAvgPrice((priceRange[0]+priceRange[1])/2);
	}, [])

    useEffect(() => {
        setAvgPrice((priceRange[0]+priceRange[1])/2);
    }, [priceRange])

    const onSliderChange = (e, newValues) => {
        setPriceRange(newValues);
    }

    const onMinInputChange = (e) => {
        setPriceRange([e.target.value, priceRange[1]]);
    }

    const onMaxInputChange = (e) => {
        setPriceRange([priceRange[0], e.target.value]);
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
                    value={priceRange[0]}
                    onChange={onMinInputChange} 
                />
                <input 
                    className={styles.maxPriceInput}
                    value={priceRange[1]} 
                    onChange={onMaxInputChange} 
                />
            </div>
            <ThemeProvider theme={muiTheme}>
                <Slider
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange}
                    step={0.1}
                    onChange={onSliderChange}
                />
            </ThemeProvider>
            <p className={styles.priceRange}>${priceRange[0]}-${priceRange[1]}</p>
            <p className={styles.priceAverage}>The average price is ${avgPrice.toFixed(2)}</p>
        </div>
    )
}

export default PriceMenu;
