function Tab({activeTab, label, onClick}) {
  return (
    <li 
      className={`tab-list-item ${activeTab === label && "tab-list-active"}`} 
      onClick={onClick}
    >
      {label}
    </li>
  );
}

export default Tab;
