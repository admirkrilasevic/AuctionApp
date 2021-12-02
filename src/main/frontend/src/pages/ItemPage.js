import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ItemOverview from "../components/itemPage/ItemOverview";
import { fetchItemById } from "../components/landingPage/ItemService";


function ItemPage(){
    const { itemId } = useParams();
    const [item, setItem] = useState({});
  
    useEffect(async () => {
      const returnedItem = await fetchItemById(itemId);
  
      setItem(returnedItem);
    }, [itemId]);

    return (
        <ItemOverview {...item}/>
    );
}

export default ItemPage;
