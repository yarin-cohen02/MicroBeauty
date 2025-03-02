const pool = require('../config/poolConfig'); 

// Fetching customers report data from the database
exports.getCustomersReportData = async () => {
  const query = `
    SELECT
        customer_id,
        first_name AS "שם פרטי",
        last_name AS "שם משפחה",
        LPAD(CAST(israeli_id AS TEXT), 9, '0') AS "תעודת זהות",
        TO_CHAR(date_of_birth,'DD/MM/YYYY') AS "תאריך לידה",
        EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_of_birth)) || '.' ||
        LPAD(EXTRACT(MONTH FROM AGE(CURRENT_DATE, date_of_birth))::TEXT, 2, '0') AS "גיל",
        CONCAT(SUBSTRING(mobile_number FROM 1 FOR 3), '-', SUBSTRING(mobile_number FROM 4)) AS "טלפון נייד",
        cities.city_name AS "עיר מגורים",
        needle_and_color AS "מחט וצבע",
        sources.source_name AS "מקור הגעה",
        CASE WHEN is_black_list THEN 'V' ELSE 'X' END AS "רשימה שחורה",
        CASE WHEN agreed_ads THEN 'V' ELSE 'X' END AS "הסכמה לדיוור",
        notes AS "הערות חופשיות"
    FROM customers
    LEFT JOIN cities ON customers.city_id = cities.city_id
    LEFT JOIN sources ON customers.source_id = sources.source_id
  `; 
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error('Error fetching customers report data');
  }
};

// Fetching appointments report data from the database
exports.getAppointmentsReportData = async () => {
  const query = `...`;  // Your SQL query for appointments report
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error('Error fetching appointments report data');
  }
};

// Fetching incomes report data from the database
exports.getIncomesReportData = async () => {
  const query = `...`;  // Your SQL query for incomes report
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error('Error fetching incomes report data');
  }
};
