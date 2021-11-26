import { useState } from "react";
import Tab from "./Tab";
import "./Tab.css";

function Tabs(props) {
  
    const [activeTab, setActiveTab] = useState("Details");

    return (
      <div className="tabs">
        <ol className="tab-list">
            <Tab
                activeTab={activeTab}
                label={"Details"}
                onClick={() => setActiveTab("Details")}
            />
        </ol>
        <div className="tab-content tab-content-item-page">
          {props.description}
        </div>
      </div>
    );
}

export default Tabs;
