import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import config from "../config";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState(null);
  const [filter, setFilter] = useState("monthly");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/dashboard?filter=${filter}`);
        setDashboardData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [filter]);

  if (loading) {
    return <div>טוען...</div>;
  }

  // Chart Data Preparation
  const appointmentsData = {
    labels: dashboardData.appointments.map((item) => item.period),
    datasets: [
      {
        label: "Appointments",
        data: dashboardData.appointments.map((item) => item.total_appointments),
        backgroundColor: "#8884d8",
      },
    ],
  };

  const customerSourcesData = {
    labels: dashboardData.customer_sources.map((item) => item.source_name),
    datasets: [
      {
        label: "Customer Sources",
        data: dashboardData.customer_sources.map((item) => item.count),
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"],
      },
    ],
  };

  return (
    <div className="dashboard">
      {/* Top Section */}
      <div className="top-section">
        <button className="toggle-btn" onClick={() => setFilter(filter === "monthly" ? "yearly" : "monthly")}>
          Toggle to {filter === "monthly" ? "Yearly" : "Monthly"} View
        </button>
        <div className="kpi-card">
          <h3>Total Income</h3>
          <p>{dashboardData.income[0].total_income}</p>
        </div>
        <div className="kpi-card">
          <h3>Expected Income</h3>
          <p>{dashboardData.expected_income[0].expected_income}</p>
        </div>
        <div className="kpi-card">
          <h3>Net Profit</h3>
          <p>{dashboardData.net_profit[0].net_profit}</p>
        </div>
      </div>

      {/* Middle Section */}
      <div className="middle-section">
        <div className="chart-container">
          <h3>Appointments</h3>
          <Bar data={appointmentsData} />
        </div>
        <div className="chart-container">
          <h3>Customer Sources</h3>
          <Pie data={customerSourcesData} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        {/* Other charts can go here */}
      </div>
    </div>
  );
};

export default Dashboard;