const express = require("express");
const appointmentController = require("../controllers/appointmentsController");

const router = express.Router();

router.get("/:id", appointmentController.getAppointmentsByCustomerId); 
router.post("/", appointmentController.createAppointment);
router.put("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);

module.exports = router;
