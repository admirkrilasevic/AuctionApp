import InfiniteScrollComponent from "../components/landingPage/InfiniteScrollComponent";
import Tabs from "../components/landingPage/Tabs";

function Home(){
    return (
        <div>
            <Tabs>
                <div label="New Arrivals">
                    <InfiniteScrollComponent load="newarrivals" />
                </div>
                <div label="Last Chance">
                    <InfiniteScrollComponent load="lastchance" />
                </div>
            </Tabs>
      </div>
    );
}

export default Home;
