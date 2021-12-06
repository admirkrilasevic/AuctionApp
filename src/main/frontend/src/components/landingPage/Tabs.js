import { useState } from "react";
import InfiniteScrollComponent from "./InfiniteScrollComponent";
import Tab from "./Tab";
import { LANDING_PAGE_TAB_VALUES } from "../../constants";
import styles from "./Tabs.module.css";

function Tabs() {
  
    const [activeTab, setActiveTab] = useState(LANDING_PAGE_TAB_VALUES.NEW_ARRIVALS);

    return (
        <div className={styles.tabsContainer}>
            <div className="tabs">
                <ol className="tab-list">
                    <Tab
                        activeTab={activeTab}
                        label={LANDING_PAGE_TAB_VALUES.NEW_ARRIVALS}
                        onClick={() => setActiveTab(LANDING_PAGE_TAB_VALUES.NEW_ARRIVALS)}
                    />
                    <Tab
                        activeTab={activeTab}
                        label={LANDING_PAGE_TAB_VALUES.LAST_CHANCE}
                        onClick={() => setActiveTab(LANDING_PAGE_TAB_VALUES.LAST_CHANCE)}
                    />
                </ol>
                <div className="tab-content">
                    {activeTab === LANDING_PAGE_TAB_VALUES.NEW_ARRIVALS ? 
                        <InfiniteScrollComponent key={LANDING_PAGE_TAB_VALUES.NEW_ARRIVALS} load={LANDING_PAGE_TAB_VALUES.NEW_ARRIVALS} /> 
                        : <InfiniteScrollComponent key={LANDING_PAGE_TAB_VALUES.LAST_CHANCE} load={LANDING_PAGE_TAB_VALUES.LAST_CHANCE} />}
                </div>
            </div>
        </div>
    );
}

export default Tabs;
