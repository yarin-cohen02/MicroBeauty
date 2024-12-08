import React from "react";
import "../styles/AppointmentTable.css";

const AppointmentTable = () => {

  const appointments = [
    {
      date: "21.08.24",
      time: "19:45",
      appointmentType: "תור ראשון",
      treatmentType: "מיקרובליידינג",
      arrived: "הגיעה",
      paid: "1,200 ש״ח",
      payMethod: "מזומן",
    },
    {
      date: "21.08.24",
      time: "15:30",
      appointmentType: "תור שני",
      treatmentType: "מיקרובליידינג",
      arrived: "לא הגיעה",
      paid: "",
      payMethod: "",
    },
    {
      date: "21.08.24",
      time: "10:15",
      appointmentType: "ייעוץ בלבד",
      treatmentType: "מיקרובליידינג",
      arrived: "הגיעה",
      paid: "",
      payMethod: "",
    },
    {
      date: "21.08.24",
      time: "20:00",
      appointmentType: "תור ראשון",
      treatmentType: "מיקרובליידינג",
      arrived: "הגיעה",
      paid: "1,200 ש״ח",
      payMethod: "אשראי",
      payments: "2 תשלומים",
    },
  ];  
  

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
        
        {appointments.map((appointment, index) => (
          <tr key={index}>
            <td>{appointment.date}</td>
            <td>{appointment.time}</td>
            <td>{appointment.appointmentType}</td>
            <td>{appointment.treatmentType}</td>
            <td>{appointment.arrived}</td>
            <td>{appointment.paid}</td>
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