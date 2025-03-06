import React, { useState } from "react";
import "../styles/SideMenu.css";

const SideMenu = ({ items, onSelect }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleItemClick = (index) => {
        setActiveIndex(index);
        onSelect(index);    // FOR THE PARENT COMPONENT
    };

    return (
        <div className="side-menu">
            <ul>
                {items.map((item, index) => (
                    <li 
                        key={index} 
                        className={index === activeIndex ? "active" : ""}
                        onClick={() => handleItemClick(index)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideMenu;
