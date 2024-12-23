import React from "react";
import "../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faUser,
  faEnvelope,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

library.add(faHome, faUser, faEnvelope, faCog);

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
            <FontAwesomeIcon icon={tab.icon} className="menu-icon" />
            <span className="menu-name">{tab.name}</span>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
