const appointmentService = require("../services/appointmentsService");

exports.getAppointmentsByCustomerId = async (req, res) => {
  try {
    const appointments = await appointmentService.getAppointmentsByCustomerId(req.params.id);
    
    if (!appointments) {
      console.warn(`Customer with ID ${req.params.id} not found.`);
      return res.status(404).json({ message: "Customer not found" });
    }
    
    res.status(200).json({ appointments: appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error.message || error);
    res.status(500).json({ message: "Error fetching appointments", error: error.message || error });
  }
};


exports.createAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.createAppointment(req.body);
    res.status(201).json({ appointment: appointment });
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment", error });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.updateAppointment(
      req.params.id,
      req.body
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ appointment: appointment });
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.deleteAppointment(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error });
  }
};


