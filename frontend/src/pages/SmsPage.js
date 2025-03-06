import React, { useState } from "react";
import SideMenu from "../components/SideMenu";
import SettingViewer from "../components/SettingViewer";
import "../styles/SmsPage.css";

import SendSms from "../components/SendSms";
const AutoSmsScreen = () => <div>מסרונים אוטומטיים - ניהול מסרונים אוטומטיים</div>;
const SmsHistoryScreen = () => <div>היסטוריית מסרונים - צפייה בהיסטוריית המסרונים</div>;
const FutureSmsScreen = () => <div>מסרונים עתידיים - צפייה במסרונים המתוכננים</div>;

const SmsPage = () => {
    const menuItems = ["שלח מסרון", "מסרונים אוטומטיים", "היסטוריית מסרונים", "מסרונים עתידיים"];
    const screens = [<SendSms />, <AutoSmsScreen />, <SmsHistoryScreen />, <FutureSmsScreen />];

    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className="sms-page">
            <SideMenu items={menuItems} onSelect={setSelectedIndex} />
            <SettingViewer selectedIndex={selectedIndex} screens={screens} />
        </div>
    );
};

export default SmsPage;
