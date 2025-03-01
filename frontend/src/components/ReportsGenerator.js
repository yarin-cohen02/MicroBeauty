import React from 'react';
import '../styles/ReportsGenerator.css';

const ReportsGenerator = () => {
  const reports = [
    { title: "מאגר לקוחות", description: "כל הלקוחות הקיימים במערכת מאז ומתמיד עם פרטים כלליים על הלקוחות" },
    { title: "היסטוריית תורים", description: "פירוט כל התורים - שורה אחת לכל תור" },
    { title: "הכנסות", description: "פירוט כל ההכנסות לפי עסקאות, תאריכים ולקוחות" },
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
        <button className="generate-button">הפק</button>
    </div>
      ))}
    </div>
  );
}

export default ReportsGenerator;