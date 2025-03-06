import React, { useState } from "react";
import "./styles/index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import config from "./config";
import ModalConnection from "./components/ModalConnection";

import CustomersPage from "./pages/CustomersPage";
import HomePage from "./pages/HomePage";
import SmsPage from "./pages/SmsPage";

const App = () => {
  const root = document.documentElement;
  root.style.setProperty("--color-1", config.COLOR_1);
  root.style.setProperty("--color-2", config.COLOR_2);
  root.style.setProperty("--color-3", config.COLOR_3);
  root.style.setProperty("--color-4", config.COLOR_4); 

  const [currentPage, setCurrentPage] = useState("בית");

  const menuTabs = [
    { name: "בית", icon: "fa-house" },
    { name: "לקוחות", icon: "fa-user" },
    { name: "מסרונים", icon: "envelope" },
    { name: "הגדרות", icon: "cog" },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "בית":
        return <HomePage />;
      case "לקוחות":
        return <CustomersPage />;
      case "מסרונים":
        return <SmsPage />;
      case "הגדרות":
        return <div>Settings Page</div>;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="app">
      <ModalConnection />
      <Header
        menuTabs={menuTabs}
        onTabClick={setCurrentPage}
        activeTab={currentPage}
      />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
};

export default App;
