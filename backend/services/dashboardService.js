const pool = require('../config/poolConfig');

exports.getDashboardData = async (filter) => {
    const period = (filter === "yearly") ? "YEAR" : "MONTH";

  const queries = {
    income: `SELECT SUM(amount) AS total_income FROM transactions WHERE DATE_TRUNC('${period}', created_at) = DATE_TRUNC('${period}', NOW())`,
    expected_income: `SELECT SUM(expected_amount) AS expected_income FROM transactions WHERE DATE_TRUNC('${period}', created_at) = DATE_TRUNC('${period}', NOW())`,
    net_profit: `SELECT SUM(profit) AS net_profit FROM transactions WHERE DATE_TRUNC('${period}', created_at) = DATE_TRUNC('${period}', NOW())`,
    appointments: `SELECT COUNT(*) AS total_appointments, DATE_TRUNC('${period}', appointment_date) AS period FROM appointments GROUP BY period ORDER BY period`,
    customer_sources: `SELECT source, COUNT(*) AS count FROM customers WHERE DATE_TRUNC('${period}', created_at) = DATE_TRUNC('${period}', NOW()) GROUP BY source`,
    canceled_appointments: `SELECT COUNT(*) AS canceled_count, DATE_TRUNC('${period}', appointment_date) AS period FROM appointments WHERE status = 'canceled' GROUP BY period ORDER BY period`,
    treatment_types: `SELECT treatment_type, COUNT(*) AS count FROM appointments WHERE DATE_TRUNC('${period}', appointment_date) = DATE_TRUNC('${period}', NOW()) GROUP BY treatment_type`,
    average_age: `SELECT ROUND(AVG(age)) AS avg_age, DATE_TRUNC('${period}', created_at) AS period FROM customers GROUP BY period ORDER BY period`,
    customer_cities: `SELECT city, COUNT(*) AS count FROM customers WHERE DATE_TRUNC('${period}', created_at) = DATE_TRUNC('${period}', NOW()) GROUP BY city`,
  };

//   IN ALL QUERIES - NEED TO REMOVE CANCELLED APPOINTMENTS
//  ALL GROUP BY PERIOD - ONLY 'YYYY' OR 'MM/YY'
// NO APPOINTMENT_DATE - APPOINTMENT_TIME
// NO APPOINTMENT_TYPE - APPOINTMENT_TYPE_ID
// AVERAGE AGE DOESNT WORK
// treatment_types QUERY - BRING THE TREATMENT TYPE NAME FROM THE TABLE
// CUSTOMER CITIES - IT TAKE THE DATE FROM APPOINTMENTS TABLE - NOT DOB

  try {
    const results = await Promise.all(Object.entries(queries).map(async ([key, query]) => {
      const { rows } = await pool.query(query);
      return { [key]: rows };
    }));

    return results.reduce((acc, data) => ({ ...acc, ...data }), {});
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};