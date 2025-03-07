const smsService = require("../services/smsService.js");
const twilioService = require("../services/twilioService");

const sendSmsHandler = async (req, res) => {
  try {
    const { timing, recipientGroups, messageTemplate, scheduleTime } = req.body;

    const customers = await smsService.getCustomersByGroups(recipientGroups);

    const formattedCustomers = customers.map(customer => ({
      ...customer,
      phoneNumber: smsService.formatPhoneNumber(customer.phoneNumber),
    }));

    const messages = formattedCustomers.map(customer => ({
      to: customer.phoneNumber,
      message: smsService.replacePlaceholders(messageTemplate, customer),
    }));

    if (timing === "immediate") {
      for (const msg of messages) {
        await twilioService.sendSms(msg.to, msg.message);
      }
      return res.json({ success: true, message: "SMS messages sent successfully." });
    } else {
      await smsService.scheduleMessages(messages, scheduleTime);
      return res.json({ success: true, message: "SMS messages scheduled successfully." });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const checkSmsHandler = async (req, res) => {
  try {
    const { phoneNumber, messageTemplate } = req.body;

    const formattedNumber = smsService.formatPhoneNumber(phoneNumber);

    const testMessage = smsService.replacePlaceholders(messageTemplate, {
      first_name: "עידית",
      last_name: "כהן",
      treatment_type: "מיקרובליידינג",
    });

    await twilioService.sendSms(formattedNumber, testMessage);

    res.json({ success: true, message: "Test SMS sent successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { sendSmsHandler, checkSmsHandler };
