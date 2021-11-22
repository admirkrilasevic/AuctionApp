import { useState } from "react";
import Tab from "./Tab";

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
        <div className="tab-content">
          {props.description}
        </div>
      </div>
    );
}

export default Tabs;
