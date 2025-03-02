const pool = require('../config/poolConfig'); 

// Fetching customers report data from the database
exports.getCustomersReportData = async () => {
  const query = `
    SELECT
        customer_id,
        first_name,
        last_name,
        LPAD(CAST(israeli_id AS TEXT), 9, '0') AS "israeli_id",
        TO_CHAR(date_of_birth,'DD/MM/YYYY') AS "date_of_birth",
        EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_of_birth)) || '.' ||
        LPAD(EXTRACT(MONTH FROM AGE(CURRENT_DATE, date_of_birth))::TEXT, 2, '0') AS "age",
        CONCAT(SUBSTRING(mobile_number FROM 1 FOR 3), '-', SUBSTRING(mobile_number FROM 4)) AS "mobile_number",
        cities.city_name AS "city_name",
        needle_and_color,
        sources.source_name AS "source_name",
        is_black_list,
        agreed_ads,
        notes
    FROM customers
    LEFT JOIN cities ON customers.city_id = cities.city_id
    LEFT JOIN sources ON customers.source_id = sources.source_id
    ORDER BY last_name, first_name;
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
