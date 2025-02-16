import React from "react";
import "../styles/CustomerDetails.css";

const CustomerDetails = (customer) => {
  // const customer = {
  //   first_name: "ישראלה",
  //   last_name: "לוי",
  //   israeli_id: "032056874",
  //   mobile_number: "054-2444987",
  //   birthDate: "02.02.1970 (33.10)",  //COMPLETE IN DB + CALCULATE AGE
  //   city_id: "חולון",                 //MAKE JOIN WITH CITIES TABLE
  //   needle_and_color: "B2 כחול", 
  //   source_id: "רשתות חברתיות",       //MAKE JOIN WITH SOURCES TABLE
  //   agreed_ads: "V",
  //   notes: "חברה של אוסי",
  // };

  // console.log("customer selected", customer);

  const data = customer.customer;
  

  return (
    <div className="customer-details">
      <div className="details-column">
        <div className="details-row">
          <div className="details-label">שם מלא</div>
          <div className="details-value">{data.first_name} {data.last_name}</div>
        </div>
        <div className="details-row">
          <div className="details-label">ת.ז.</div>
          <div className="details-value">{data.israeli_id}</div>
        </div>
        <div className="details-row">
          <div className="details-label">טלפון נייד</div>
          <div className="details-value">{data.mobile_number}</div>
        </div>
      </div>

      <div className="details-column">
        <div className="details-row">
          <div className="details-label">תאריך לידה</div>
          <div className="details-value">{data.date_of_birth}</div>
        </div>
        <div className="details-row">
          <div className="details-label">עיר מגורים</div>
          <div className="details-value">{data.city_id}</div>
        </div>
        <div className="details-row">
          <div className="details-label">מחט וצבע</div>
          <div className="details-value">{data.needle_and_color}</div>
        </div>
      </div>

      <div className="details-column">
        <div className="details-row">
          <div className="details-label">מקור הגעה</div>
          <div className="details-value">{data.source_id}</div>
        </div>
        <div className="details-row">
          <div className="details-label">הסכמה לדיוור</div>
          <div className="details-value">{data.agreed_ads ? "V" : "X"}</div>
        </div>
        <div className="details-row">
          <div className="details-label">הערה חופשית</div>
          <div className="details-value">{data.notes}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
