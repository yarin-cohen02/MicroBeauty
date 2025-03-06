import React from "react";

const SettingViewer = ({ selectedIndex, screens }) => {
    return <div className="setting-viewer">{screens[selectedIndex]}</div>;
};

export default SettingViewer;
