import { useState } from "react";
import InfiniteScrollComponent from "./InfiniteScrollComponent";
import Tab from "./Tab";
import * as Constants from "../../constants";

function Tabs() {
  
    const [activeTab, setActiveTab] = useState("New Arrivals");

    return (
      <div className="tabs">
        <ol className="tab-list">
            <Tab
                activeTab={activeTab}
                label={"New Arrivals"}
                onClick={() => setActiveTab("New Arrivals")}
            />
            <Tab
                activeTab={activeTab}
                label={"Last Chance"}
                onClick={() => setActiveTab("Last Chance")}
            />
        </ol>
        <div className="tab-content">
            {activeTab === "New Arrivals" ? 
                <InfiniteScrollComponent load={Constants.LANDING_PAGE_TAB_VALUES.NEW_ARRIVALS} /> 
                : <InfiniteScrollComponent load={Constants.LANDING_PAGE_TAB_VALUES.LAST_CHANCE} />}
        </div>
      </div>
    );
}

export default Tabs;
