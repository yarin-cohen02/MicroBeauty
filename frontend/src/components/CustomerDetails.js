import React from "react";
import "../styles/CustomerDetails.css";

const CustomerDetails = (customerId) => {
  const customer = {
    name: "ישראלה לוי",
    id: "032056874",
    phone: "054-2444987",
    birthDate: "02.02.1970 (33.10)",
    city: "חולון",
    address: "B2 כחול",
    source: "רשתות חברתיות",
    treatmentPlan: "V",
    documentStatus: "",
  };

  return (
    <div className="customer-details">
    <div className="details-column">
      <div className="details-row">
        <div className="details-label">שם מלא</div>
        <div className="details-value">{customer.name}</div>
      </div>
      <div className="details-row">
        <div className="details-label">ת.ז.</div>
        <div className="details-value">{customer.id}</div>
      </div>
      <div className="details-row">
        <div className="details-label">טלפון נייד</div>
        <div className="details-value">{customer.phone}</div>
      </div>
    </div>

    <div className="details-column">
      <div className="details-row">
        <div className="details-label">תאריך לידה</div>
        <div className="details-value">{customer.birthDate}</div>
      </div>
      <div className="details-row">
        <div className="details-label">עיר מגורים</div>
        <div className="details-value">{customer.city}</div>
      </div>
      <div className="details-row">
        <div className="details-label">מחט וצבע</div>
        <div className="details-value">{customer.address}</div>
      </div>
    </div>

    <div className="details-column">
      <div className="details-row">
        <div className="details-label">מקור הגעה</div>
        <div className="details-value">{customer.source}</div>
      </div>
      <div className="details-row">
        <div className="details-label">הסכמה לדיוור</div>
        <div className="details-value">{customer.treatmentPlan}</div>
      </div>
      <div className="details-row">
        <div className="details-label">הערה חופשית</div>
        <div className="details-value">{customer.documentStatus}</div>
      </div>
    </div>

  </div>
  
  );
};

export default CustomerDetails;