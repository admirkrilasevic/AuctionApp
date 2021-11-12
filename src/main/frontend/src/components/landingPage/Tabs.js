import { useState } from "react";
import InfiniteScrollComponent from "./InfiniteScrollComponent";
import Tab from "./Tab";
import * as Constants from "../../constants";

function Tabs() {
  
    const [activeTab, setActiveTab] = useState(Constants.LANDING_PAGE_TAB_VALUES.NEW_ARRIVALS);

    return (
      <div className="tabs">
        <ol className="tab-list">
            <Tab
                activeTab={activeTab}
                label={Constants.LANDING_PAGE_TAB_VALUES.NEW_ARRIVALS}
                onClick={() => setActiveTab(Constants.LANDING_PAGE_TAB_VALUES.NEW_ARRIVALS)}
            />
            <Tab
                activeTab={activeTab}
                label={Constants.LANDING_PAGE_TAB_VALUES.LAST_CHANCE}
                onClick={() => setActiveTab(Constants.LANDING_PAGE_TAB_VALUES.LAST_CHANCE)}
            />
        </ol>
        <div className="tab-content">
            {activeTab === Constants.LANDING_PAGE_TAB_VALUES.NEW_ARRIVALS ? 
                <InfiniteScrollComponent key={Constants.LANDING_PAGE_TAB_VALUES.NEW_ARRIVALS} load={Constants.LANDING_PAGE_TAB_VALUES.NEW_ARRIVALS} /> 
                : <InfiniteScrollComponent key={Constants.LANDING_PAGE_TAB_VALUES.LAST_CHANCE} load={Constants.LANDING_PAGE_TAB_VALUES.LAST_CHANCE} />}
        </div>
      </div>
    );
}

export default Tabs;
