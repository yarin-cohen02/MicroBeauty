import React from "react";
import "../styles/AppointmentTable.css";

const AppointmentTable = (appointments) => {

  const data = appointments.appointments;
  
  // const appointments = [
  //   {
  //     appointment_time: "21.08.24",
  //     time: "19:45",
  //     appointment_type_id: "תור ראשון",
  //     treatmentType: "מיקרובליידינג",     // ADD IN DB
  //     arrived: "הגיעה",
  //     price_for_appointment: "1,200 ש״ח", // ADD IN DB
  //     payMethod: "מזומן",                 // ADD IN DB
  //   },
  //   {
  //     appointment_time: "21.08.24",
  //     time: "15:30",
  //     appointment_type_id: "תור שני",
  //     treatmentType: "מיקרובליידינג",
  //     arrived: "לא הגיעה",
  //     price_for_appointment: "",
  //     payMethod: "",
  //   },
  //   {
  //     appointment_time: "21.08.24",
  //     time: "10:15",
  //     appointment_type_id: "ייעוץ בלבד",
  //     treatmentType: "מיקרובליידינג",
  //     arrived: "הגיעה",
  //     price_for_appointment: "",
  //     payMethod: "",
  //   },
  //   {
  //     appointment_time: "21.08.24",
  //     time: "20:00",
  //     appointment_type_id: "תור ראשון",
  //     treatmentType: "מיקרובליידינג",
  //     arrived: "הגיעה",
  //     price_for_appointment: "1,200 ש״ח",
  //     payMethod: "אשראי",
  //     payments: "2 תשלומים",
  //   },
  // ];

  console.log("data", data);  // CHECK

  return (
    <table className="appointment-table">
      <thead>
        <tr>
          <th>תאריך</th>
          <th>שעה</th>
          <th>סוג תור</th>
          <th>טכניקה</th>
          <th>הגיעה</th>
          <th>שולם</th>
          <th>אופן תשלום</th>
          <th>תשלומים</th>
          <th>פעולות</th>
        </tr>
      </thead>
      <tbody>
        {data.map((appointment, index) => (
          <tr key={index}>
            <td>{appointment.appointment_time}</td>
            <td>{appointment.time}</td>
            <td>{appointment.appointment_type_id}</td>
            <td>{appointment.treatmentType}</td>
            <td>{appointment.arrived}</td>
            <td>{appointment.price_for_appointment}</td>
            <td>{appointment.payMethod}</td>
            <td>{appointment.payments}</td>
            <td>
              <button className="apt-button">ערוך</button>
              <button className="apt-button">מחק</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentTable;
