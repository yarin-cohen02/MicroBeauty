import React from 'react';
import axios from 'axios';
import '../styles/ReportsGenerator.css';
import config from '../config';

const downloadReport = async (reportType) => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/api/reports/${reportType}`, {
      responseType: 'blob', // For handling binary data
    });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(response.data);
    link.download = `${reportType}_report.xlsx`; // Dynamic file name
    link.click();
  } catch (error) {
    console.error(`Error downloading ${reportType} report:`, error);
  }
};

const ReportsGenerator = () => {
  const reports = [
    { backend: "customers", title: "מאגר לקוחות", description: "כל הלקוחות הקיימים במערכת מאז ומתמיד עם פרטים כלליים על הלקוחות" },
    { backend: "appointments", title: "היסטוריית תורים", description: "פירוט כל התורים - שורה אחת לכל תור" },
    { backend: "incomes", title: "הכנסות", description: "פירוט כל ההכנסות לפי עסקאות, תאריכים ולקוחות" },
  ];

  return (
    <div className="reports-container">
        <h3>הפקת דוחות</h3>
      {reports.map((report, index) => (
        <div key={index} className="report-item">
        <div>
          <span className="report-title">{report.title}</span>
          <span className="tooltip" data-tooltip={report.description}>i</span>
        </div>
        <button className="generate-button" onClick={() => downloadReport(report.backend)}>הפק</button>
    </div>
      ))}
    </div>
  );
}

export default ReportsGenerator;