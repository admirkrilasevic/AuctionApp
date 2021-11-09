/* BACKUP FOR INFINITE SCROLL */

import { useState, useEffect } from 'react';
import ItemList from "./ItemList";

function ItemListLoader(props){

    const [isLoading, setIsLoading] = useState(true);
    const [loadedItems, setLoadedItems] = useState([]);

    let content = "";

    if (props.load === LANDING_PAGE_TAB_VALUES.NEW_ARRIVALS) {
        content = "/items/getnewarrivals";
    } else {    
        content = "/items/getlastchance";
    }

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:8080/api/v1${content}`
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const items = [];

            for (const key in data) {
                const item = {
                    id: key,
                    ...data[key]
                }
                items.push(item);
            }

            setIsLoading(false);
            setLoadedItems(items);
        });
    }, [])

    if (isLoading) {
        return (
            <p>Loading...</p>
        );
    }
    return (
        <div>
            <ItemList items={loadedItems} />
        </div>
    );
}

export default ItemListLoader;
