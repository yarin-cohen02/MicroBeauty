const express = require("express");
const { sendSmsHandler, checkSmsHandler } = require("../controllers/smsController");

const router = express.Router();

router.post("/send", sendSmsHandler);
router.post("/check", checkSmsHandler);

module.exports = router;
