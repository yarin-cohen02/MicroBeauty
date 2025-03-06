import React, { useState } from "react";
import SideMenu from "../components/SideMenu";
import SettingViewer from "../components/SettingViewer";

// Import or define the screen components
const SendSmsScreen = () => <div>שלח מסרון - כאן תוכל לשלוח מסרון</div>;
const AutoSmsScreen = () => <div>מסרונים אוטומטיים - ניהול מסרונים אוטומטיים</div>;
const SmsHistoryScreen = () => <div>היסטוריית מסרונים - צפייה בהיסטוריית המסרונים</div>;
const FutureSmsScreen = () => <div>מסרונים עתידיים - צפייה במסרונים המתוכננים</div>;

const SmsPage = () => {
    const menuItems = ["שלח מסרון", "מסרונים אוטומטיים", "היסטוריית מסרונים", "מסרונים עתידיים"];
    const screens = [<SendSmsScreen />, <AutoSmsScreen />, <SmsHistoryScreen />, <FutureSmsScreen />];

    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className="sms-page">
            <SideMenu items={menuItems} onSelect={setSelectedIndex} />
            <SettingViewer selectedIndex={selectedIndex} screens={screens} />
        </div>
    );
};

export default SmsPage;
