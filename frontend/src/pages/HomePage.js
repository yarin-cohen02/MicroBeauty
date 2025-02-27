import React, { useState } from "react";
import "../styles/HomePage.css";
import Dashboard from "../components/Dashboard.js";
import axios from "axios";
import config from "../config";

const HomePage = () => {

  return (
    <div className="home-page">
        <p className="greeting"><b>עידית, </b>שלום!</p>
        <Dashboard />
    </div>
  );
};

export default HomePage;
