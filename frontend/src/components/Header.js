import React from "react";
import PropTypes from "prop-types";
import "../styles/Header.css";

const Header = ({ menuTabs, onTabClick, activeTab }) => {
  return (
    <header className="header">
      <ul className="nav-list">
        {menuTabs.map((tab, index) => (
          <li
            key={index}
            className={`nav-item ${activeTab === tab.name ? "active" : ""}`} // Adding the active class conditionally
            onClick={() => onTabClick(tab.name)}
          >
            <span className="menu-icon">{tab.icon}</span>
            <span className="menu-name">{tab.name}</span>
          </li>
        ))}
      </ul>
    </header>
  );
};

Header.propTypes = {
  menuTabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      pageName: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
  onTabClick: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired, // The activeTab prop to control which tab is active
};

export default Header;
