import ItemListLoader from "../components/landingPage/ItemListLoader";
import Tabs from "../components/landingPage/Tabs";

function Home(){
    return (
        <div>
            <Tabs>
                <div label="New Arrivals">
                    <ItemListLoader load="newarrivals" />
                </div>
                <div label="Last Chance">
                    <ItemListLoader load="lastchance" />
                </div>
            </Tabs>
      </div>
    );
}

export default Home;
