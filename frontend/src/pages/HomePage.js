import React from "react";
import "../styles/HomePage.css";
import Dashboard from "../components/Dashboard.js";

const HomePage = () => {

  return (
    <div className="home-page">
        <p className="greeting"><b>עידית, </b>שלום!</p>
        <Dashboard />
    </div>
  );
};

export default HomePage;
