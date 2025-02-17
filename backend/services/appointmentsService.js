const { Op, Sequelize } = require("sequelize"); 
const { appointments } = require("../models/sequelize");
const pool = require('../config/poolConfig');


exports.getAppointmentsByCustomerId = async (id) => {
  const query = `
    SELECT 
      TO_CHAR(a.appointment_time, 'DD.MM.YY') AS appointment_date,
      TO_CHAR(a.appointment_time, 'HH24:MI') AS appointment_time,
      at.type_name,
      t.treatment_name,
      a.arrived,
      TO_CHAR(a.price_for_appointment, '9999999999') AS price_for_appointment,
      pm.name AS pay_method,
      TO_CHAR(a.payments_amount, '9999999999') AS payments_amount
    FROM 
      appointments a
    JOIN 
      appointment_types at ON a.appointment_type_id = at.appointment_type_id
    JOIN 
      treatments t ON a.treatment_type_id = t.treatment_type_id
    JOIN 
      pay_methods pm ON a.pay_method_id = pm.id
    WHERE 
      a.customer_id = $1
    ORDER BY 
      a.appointment_time DESC;
  `;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows;
};

exports.createAppointment = (appointment) => {
  return appointments.create(appointment);
};

exports.updateAppointment = (id, appointment) => {
  return appointments.update(appointment, { where: { appointment_id: id } });
};

exports.deleteAppointment = (id) => {
  return appointments.destroy({ where: { appointment_id: id } });
};
