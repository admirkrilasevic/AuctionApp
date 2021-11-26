import "./Tab.css";

function Tab({activeTab, label, onClick}) {
  return (
    <li 
      className={`tab-list-item ${activeTab === label && "tab-list-active"} tab-list-item-page`} 
      onClick={onClick}
    >
      {label}
    </li>
  );
}

export default Tab;
