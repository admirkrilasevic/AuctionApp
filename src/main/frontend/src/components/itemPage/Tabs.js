import { useState } from "react";
import Tab from "./Tab";
import "./Tab.css";
import { ITEM_PAGE_TAB_VALUES } from "../../constants";

function Tabs({...content}) {
  const { description } = content;
  const [activeTab, setActiveTab] = useState(ITEM_PAGE_TAB_VALUES.DETAILS);

  return (
    <div className="tabs">
      <ol className="tab-list">
          <Tab
              activeTab={activeTab}
              label={ITEM_PAGE_TAB_VALUES.DETAILS}
              onClick={() => setActiveTab(ITEM_PAGE_TAB_VALUES.DETAILS)}
          />
      </ol>
      <div className="tab-content tab-content-item-page">
        {description}
      </div>
    </div>
  );
}

export default Tabs;
