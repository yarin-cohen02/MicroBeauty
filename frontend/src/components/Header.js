import React from "react";
import '../styles/Header.css';

const Header = ({ title, navigationLinks }) => {
  return (
    <header className="header">
      <h1 className="title">{title}</h1>
        <nav>
          <ul className="nav-list">

            {navigationLinks.map((link, index) => (
              <li key={index} className="nav-item">
                <a href={link.href} className="nav-link">
                  {link.name}
                </a>
              </li>
            ))}

          </ul>
        </nav>
    </header>
  );
};

export default Header;
