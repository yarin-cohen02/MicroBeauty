const pool = require('../config/poolConfig'); 

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

exports.getAppointmentsReportData = async () => {
  const query = `
    SELECT
      a.appointment_id,
      TO_CHAR(a.appointment_time, 'DD/MM/YYYY') AS "appointment_date",
      TO_CHAR(a.appointment_time, 'HH24:MI') AS "start_time",  
      c.customer_id AS "customer_id",
      c.first_name || ' ' || c.last_name AS "customer_name",
      at.type_name AS "appointment_type",
      t.treatment_name AS "treatment_type",
      a.arrived,
      a.price_for_appointment
    FROM appointments a
    LEFT JOIN customers c ON a.customer_id = c.customer_id
    LEFT JOIN appointment_types at ON a.appointment_type_id = at.appointment_type_id
    LEFT JOIN treatments t ON a.treatment_type_id = t.treatment_type_id
    ORDER BY a.appointment_time;
  `;  
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error('Error fetching appointments report data');
  }
};

exports.getIncomesReportData = async () => {
  const query = `
    SELECT
      p.payment_id,
      TO_CHAR(p.payment_date,'DD/MM/YYYY') AS "payment_date",
      customers.first_name || ' ' || customers.last_name AS "paying_customer",
      appointments.customer_id AS "customer_id",
      p.amount,
      pay_methods.name AS "pay_method"
    FROM payments p
    LEFT JOIN pay_methods ON p.pay_method_id = pay_methods.id
    LEFT JOIN appointments ON p.appointment_id = appointments.appointment_id
    LEFT JOIN customers ON appointments.customer_id = customers.customer_id
    ORDER BY payment_date;
  `; 
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error('Error fetching incomes report data');
  }
};