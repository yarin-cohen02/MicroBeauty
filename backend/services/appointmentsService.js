const { Op, Sequelize } = require("sequelize"); 
const { appointments } = require("../models/sequelize");

exports.getAppointmentsByCustomerId = async (id) => {
  return await appointments.findAll({ where: { customer_id: Number(id) } });
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
