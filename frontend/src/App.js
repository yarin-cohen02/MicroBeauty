import React, { useState } from "react";
import "./styles/index.css"
import Header from "./components/Header";
import CustomersPage from "./pages/CustomersPage";
import Footer from "./components/Footer";

const App = () => {

  const [currentPage, setCurrentPage] = useState("לקוחות");
  
  const menuTabs = [
    { name: "בית", icon: "fa-house" },
    { name: "לקוחות", icon: "fa-user" },
    { name: "מסרונים", icon: "envelope" },
    { name: "הגדרות", icon: "cog" },
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

              <div className="app">
                <Header menuTabs={menuTabs} onTabClick={setCurrentPage} activeTab={currentPage}/>
                <main>{renderPage()}</main>
                <Footer/>
              </div>
  );
};

export default App;
