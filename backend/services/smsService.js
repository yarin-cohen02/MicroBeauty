const pool = require("../config/poolConfig"); 

const getCustomersByGroups = async (groups) => {
  try {
    const allQuery = `
      SELECT DISTINCT ON (c.customer_id) 
          c.mobile_number, 
          c.first_name, 
          c.last_name, 
          t.treatment_name AS treatment_type
      FROM customers c
      LEFT JOIN appointments a ON a.customer_id = c.customer_id
      LEFT JOIN treatments t ON a.treatment_type_id = t.treatment_type_id
      WHERE c.agreed_ads = TRUE
      ORDER BY c.customer_id, a.appointment_time DESC;
    `;

    const appointmentsQuery = `
      SELECT DISTINCT ON (c.customer_id)
        c.mobile_number,
        c.first_name,
        c.last_name,
        t.treatment_name AS treatment_name
      FROM appointments a
      LEFT JOIN customers c ON a.customer_id = c.customer_id
      LEFT JOIN treatments t ON a.treatment_type_id = t.treatment_type_id
      WHERE a.appointment_time BETWEEN '_____' AND '_____'
      AND c.agreed_ads = TRUE
      ORDER BY c.customer_id, a.appointment_time DESC;
    `;

    const treatmentTypeQuery = `
      SELECT DISTINCT ON (c.customer_id) 
          c.mobile_number, 
          c.first_name, 
          c.last_name, 
          t.treatment_name AS treatment_type
      FROM customers c
      LEFT JOIN appointments a ON a.customer_id = c.customer_id
      LEFT JOIN treatments t ON a.treatment_type_id = t.treatment_type_id
      WHERE c.agreed_ads = TRUE AND t.treatment_type_id = ______
      ORDER BY c.customer_id, a.appointment_time DESC;
    `;

    const certainCustomerQuery = `
      SELECT DISTINCT ON (c.customer_id)
        c.mobile_number, 
        c.first_name, 
        c.last_name, 
        t.treatment_name AS treatment_type
      FROM customers c
      LEFT JOIN appointments a ON a.customer_id = c.customer_id
      LEFT JOIN treatments t ON a.treatment_type_id = t.treatment_type_id
      WHERE c.customer_id = _____
      ORDER BY c.customer_id, a.appointment_time DESC;
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
