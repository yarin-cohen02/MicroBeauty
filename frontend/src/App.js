import React, { useState } from "react";
import Header from "./components/Header";
import CustomersPage from "./pages/CustomersPage";

const App = () => {

  const [currentPage, setCurrentPage] = useState("בית");

  const menuTabs = [
    { name: "בית", icon: "🏠" },
    { name: "לקוחות", icon: "👥" },
    { name: "מסרונים", icon: "📅" },
    { name: "הגדרות", icon: "⚙️" },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "בית":
        return <div>Welcome to Home!</div>;
      case "לקוחות":
        return <CustomersPage/>;
      case "מסרונים":
        return <div>Appointments Page</div>;
      case "הגדרות":
        return <div>Settings Page</div>;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div>
      <Header menuTabs={menuTabs} onTabClick={setCurrentPage} activeTab={currentPage}/>
      <main>{renderPage()}</main>
    </div>
  );
};

export default App;
