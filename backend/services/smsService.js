const pool = require("../config/poolConfig"); 

const getCustomersByGroups = async (groups) => {
  try {
    const query = `
      SELECT phone_number AS "phoneNumber", first_name AS "firstName", 
             last_name AS "lastName", treatment_type AS "treatmentType" 
      FROM customers
      WHERE group_id = ANY($1)
    `;
    const result = await pool.query(query, [groups]);
    return result.rows;
  } catch (error) {
    throw new Error("Error retrieving customers: " + error.message);
  }
};

const formatPhoneNumber = (number) => {
  let cleaned = number.replace(/\D/g, ""); // Remove everything is not a digit

  if (cleaned.startsWith("0")) {
    cleaned = cleaned.slice(1);
  }

  if (cleaned.startsWith("9720")) {
    cleaned = "972" + cleaned.slice(4);
  }

  return cleaned.startsWith("972") ? `+${cleaned}` : `+972${cleaned}`;
};

const replacePlaceholders = (message, customer) => {
  return message
    .replace(/{שם פרטי}/g, customer.first_name)
    .replace(/{שם משפחה}/g, customer.last_name)
    .replace(/{טכניקה}/g, customer.treatment_type);
};

const scheduleMessages = async (messages, scheduleTime) => {
  try {
    const query = `
      INSERT INTO scheduled_sms (phone_number, message, send_at) 
      VALUES ($1, $2, $3)
    `;
    for (const msg of messages) {
      await pool.query(query, [msg.to, msg.message, scheduleTime]);
    }
  } catch (error) {
    throw new Error("Error scheduling messages: " + error.message);
  }
};

module.exports = { getCustomersByGroups, formatPhoneNumber, replacePlaceholders, scheduleMessages };
