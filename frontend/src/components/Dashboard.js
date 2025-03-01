import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import config from "../config";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement} from 'chart.js';
import ReportsGenerator from "./ReportsGenerator.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
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

  // COLUMNS
  const appointmentsData = {
    labels: dashboardData.appointments.map((item) => item.period),
    datasets: [
      {
        label: "לקוחות",
        data: dashboardData.appointments.map((item) => item.total_appointments),
        backgroundColor: "#8884d8",
      },
    ],
  };

  // PIE
  const customerSourcesData = {
    labels: dashboardData.customer_sources.map((item) => item.source_name),
    datasets: [
      {
        label: "לקוחות",
        data: dashboardData.customer_sources.map((item) => item.count),
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"],
      },
    ],
  };

  // COLUMNS
  const canceledAppointmentsData = {
    labels: dashboardData.canceled_appointments.map((item) => item.period),
    datasets: [
      {
        label: "ביטולים",
        data: dashboardData.canceled_appointments.map((item) => item.canceled_count),
        backgroundColor: "#8884d8",
      },
    ],
  };

  // PIE
  const treatmentTypesData = {
    labels: dashboardData.treatment_types.map((item) => item.treatment_name),
    datasets: [
      {
        label: "לקוחות",
        data: dashboardData.treatment_types.map((item) => item.count),
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"],
      },
    ],
  };

  // COLUMNS
  const averageAgeData = {
    labels: dashboardData.average_age.map((item) => item.period),
    datasets: [
      {
        label: "גיל ממוצע",
        data: dashboardData.average_age.map((item) => item.avg_age),
        backgroundColor: "#8884d8",
      },
    ],
  };

  // PIE
  const customerCitiesData = {
    labels: dashboardData.customer_cities.map((item) => item.city_name),
    datasets: [
      {
        label: "לקוחות",
        data: dashboardData.customer_cities.map((item) => item.count),
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"],
      },
    ],
  };

  // COLUMNS
  const prevIncomesData = {
    labels: dashboardData.prev_incomes.map((item) => item.period),
    datasets: [
      {
        label: "הכנסות",
        data: dashboardData.prev_incomes.map((item) => item.total_income),
        backgroundColor: "#8884d8",
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true, 
    aspectRatio: 2,
    plugins: { 
      legend: { display: true }
    } 
  };
  
  const chartOptions = { 
    responsive: true,
    maintainAspectRatio: true, 
    aspectRatio: 2,
    plugins: { 
      legend: { display: false }
    } 
  };  

  return (
    <div className="dashboard">
      {/* Top Section */}
      <div className="top-section">
        <button className="toggle-btn" onClick={() => setFilter(filter === "monthly" ? "yearly" : "monthly")}>
          החלף לתצוגה {filter === "monthly" ? "שנתית" : "חודשית"}
        </button>
        <div className="kpi-card">
          <h3>הכנסות עד כה</h3>
          <p>₪{new Intl.NumberFormat().format(dashboardData.income[0].total_income)}</p>
        </div>
        <div className="kpi-card">
          <h3>צפי הכנסות חזוי</h3>
          <p>₪{new Intl.NumberFormat().format(dashboardData.expected_income[0].expected_income)}</p>
        </div>
        <div className="kpi-card">
          <h3>רווח נטו</h3>
          <p>₪{new Intl.NumberFormat().format(dashboardData.net_profit[0].net_profit)}</p>
        </div>
        <div className="kpi-card">
        <h3>מעודכן לתאריך</h3>
        <p>00:49 01/03/2025</p>
        </div>
      </div>

      {/* Middle Section */}
      <div className="middle-section">
        <div className="chart-container">
          <h3>{filter === "monthly" ? "כמות לקוחות לפי חודשים" : "כמות לקוחות לפי שנים"}</h3>
          <Line data={appointmentsData} options={chartOptions}/>
        </div>
        <div className="chart-container">
          <h3>מאיפה הגיעו הלקוחות?</h3>
          <Pie data={customerSourcesData} options={pieOptions}/>
        </div>
        <div className="chart-container">
          <h3>{filter === "monthly" ? "ביטולים לפי חודשים" : "ביטולים לפי שנים"}</h3>
          <Bar data={canceledAppointmentsData} options={chartOptions}/>
        </div>
        <ReportsGenerator/>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
      <div className="chart-container">
          <h3>סוגי טיפול</h3>
          <Pie data={treatmentTypesData} options={pieOptions}/>
        </div>
        <div className="chart-container">
          <h3>{filter === "monthly" ? "גיל ממוצע לפי חודשים" : "גיל ממוצע לפי שנים"}</h3>
          <Bar data={averageAgeData} options={chartOptions} />
        </div>
        <div className="chart-container">
          <h3>עיר מגורים</h3>
          <Pie data={customerCitiesData} options={pieOptions}/>
        </div>
        <div className="chart-container">
          <h3>{filter === "monthly" ? "הכנסות לפי חודשים" : "הכנסות לפי שנים"}</h3>
          <Line data={prevIncomesData} options={chartOptions}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;