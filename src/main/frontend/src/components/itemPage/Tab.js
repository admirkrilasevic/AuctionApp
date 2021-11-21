function Tab({activeTab, label, onClick}) {
  return (
    <li 
      className={`tab-list-item ${activeTab === label && "tab-list-active"}`} 
      style={{color: "#8367D8"}}
      onClick={onClick}
    >
      {label}
    </li>
  );
}

export default Tab;
