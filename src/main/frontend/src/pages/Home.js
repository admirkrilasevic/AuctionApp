import InfiniteScrollComponent from "../components/landingPage/InfiniteScrollComponent";
import Tabs from "../components/landingPage/Tabs";

function Home(){
    return (
        <div>
            <Tabs>
                <div label="New Arrivals">
                    <InfiniteScrollComponent load={LANDING_PAGE_TAB_VALUES.NEW_ARRIVALS} />
                </div>
                <div label="Last Chance">
                    <InfiniteScrollComponent load={LANDING_PAGE_TAB_VALUES.LAST_CHANCE} />
                </div>
            </Tabs>
      </div>
    );
}

export default Home;
