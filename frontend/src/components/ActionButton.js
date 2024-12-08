import React from "react";
import "../styles/ActionButton.css";

const ActionButton = ({text}) => {
    return (
        <button className="action-btn">{text}</button>
    );
};

export default ActionButton;