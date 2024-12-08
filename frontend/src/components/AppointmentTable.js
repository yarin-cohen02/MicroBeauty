import React from "react";

const AppointmentTable = ({appointments}) => {
    return (
        <table className="appointment-table">
      <thead>
        <tr>
          <th>Appointment ID</th>
          <th>Customer Name</th>
          <th>Appointment Type</th>
          <th>Appointment Time</th>
          <th>Price</th>
          <th>Arrived</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        
        {appointments.map((appointment, index) => (
          <tr key={index}>
            <td>{appointment.appointmentId}</td>
            <td>{appointment.customerName}</td>
            <td>{appointment.appointmentType}</td>
            <td>{appointment.appointmentTime}</td>
            <td>{appointment.price}</td>
            <td>{appointment.arrived ? 'Yes' : 'No'}</td>
            <td>{appointment.notes}</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    );
};

export default AppointmentTable;