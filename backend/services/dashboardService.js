const pool = require('../config/poolConfig');

exports.getDashboardData = async (filter) => {
  
    const period = (filter === "yearly") ? "YEAR" : "MONTH";

    const queries = {
      income: `
        SELECT COALESCE(SUM(price_for_appointment), 0) AS total_income 
        FROM appointments 
        WHERE DATE_TRUNC('${period}', appointment_time) = DATE_TRUNC('${period}', NOW()) 
          AND appointment_time <= NOW()
          AND cancelled = FALSE
      `,
    
      expected_income: `
        SELECT COALESCE(SUM(price_for_appointment), 0) AS expected_income 
        FROM appointments 
        WHERE DATE_TRUNC('${period}', appointment_time) = DATE_TRUNC('${period}', NOW()) 
          AND cancelled = FALSE
      `,
    
      net_profit: `
        SELECT 
          (COALESCE((SELECT SUM(price_for_appointment) FROM appointments 
                    WHERE DATE_TRUNC('${period}', appointment_time) = DATE_TRUNC('${period}', NOW()) 
                      AND appointment_time <= NOW()
                      AND cancelled = FALSE), 0) 
          - 
          COALESCE((SELECT SUM(amount) FROM expenses), 0)) 
          AS net_profit
      `,
    
      appointments: `
        WITH date_series AS (
          SELECT GENERATE_SERIES(
            DATE_TRUNC('${period}', NOW()) - INTERVAL '5 ${period}', 
            DATE_TRUNC('${period}', NOW()), 
            INTERVAL '1 ${period}'
          ) AS period
        )
        SELECT 
          TO_CHAR(ds.period, CASE WHEN '${period}' = 'year' THEN 'YYYY' ELSE 'MM/YY' END) AS period,
          COALESCE(COUNT(a.appointment_id), 0) AS total_appointments
        FROM date_series ds
        LEFT JOIN appointments a 
          ON DATE_TRUNC('${period}', a.appointment_time) = ds.period 
          AND a.appointment_type_id = 1 
          AND a.cancelled = FALSE
        GROUP BY ds.period
        ORDER BY ds.period ASC
      `,
    
      customer_sources: `
        SELECT s.source_name, COUNT(*) AS count 
        FROM customers c 
        JOIN sources s ON c.source_id = s.source_id 
        JOIN appointments a ON c.customer_id = a.customer_id
        WHERE DATE_TRUNC('${period}', a.appointment_time) = DATE_TRUNC('${period}', NOW()) 
          AND a.cancelled = FALSE
        GROUP BY s.source_name
      `,
    
      canceled_appointments: `
        WITH date_series AS (
          SELECT GENERATE_SERIES(
            DATE_TRUNC('${period}', NOW()) - INTERVAL '5 ${period}', 
            DATE_TRUNC('${period}', NOW()), 
            INTERVAL '1 ${period}'
          ) AS period
        )
        SELECT 
          TO_CHAR(ds.period, CASE WHEN '${period}' = 'year' THEN 'YYYY' ELSE 'MM/YY' END) AS period,
          COALESCE(COUNT(a.appointment_id), 0) AS canceled_count
        FROM date_series ds
        LEFT JOIN appointments a 
          ON DATE_TRUNC('${period}', a.appointment_time) = ds.period 
          AND a.cancelled = TRUE
        GROUP BY ds.period
        ORDER BY ds.period ASC
      `,
    
      treatment_types: `
        SELECT t.treatment_name, COUNT(*) AS count 
        FROM appointments a
        JOIN treatments t ON a.treatment_type_id = t.treatment_type_id
        WHERE DATE_TRUNC('${period}', a.appointment_time) = DATE_TRUNC('${period}', NOW()) 
          AND a.cancelled = FALSE
        GROUP BY t.treatment_name
      `,
    
      average_age: `
        WITH date_series AS (
          SELECT GENERATE_SERIES(
            DATE_TRUNC('${period}', NOW()) - INTERVAL '5 ${period}', 
            DATE_TRUNC('${period}', NOW()), 
            INTERVAL '1 ${period}'
          ) AS period
        )
        SELECT 
          TO_CHAR(ds.period, CASE WHEN '${period}' = 'year' THEN 'YYYY' ELSE 'MM/YY' END) AS period,
          COALESCE(FLOOR(AVG(EXTRACT(YEAR FROM AGE(c.date_of_birth)))) || '.' || 
                   FLOOR(AVG(EXTRACT(MONTH FROM AGE(c.date_of_birth)))), '0.0') AS avg_age
        FROM date_series ds
        LEFT JOIN appointments a 
          ON DATE_TRUNC('${period}', a.appointment_time) = ds.period 
          AND a.cancelled = FALSE
        LEFT JOIN customers c ON a.customer_id = c.customer_id
        GROUP BY ds.period
        ORDER BY ds.period ASC
      `,
    
      customer_cities: `
        SELECT ci.city_name, COUNT(*) AS count 
        FROM appointments a
        JOIN customers c ON a.customer_id = c.customer_id
        JOIN cities ci ON c.city_id = ci.city_id
        WHERE DATE_TRUNC('${period}', a.appointment_time) = DATE_TRUNC('${period}', NOW()) 
          AND a.cancelled = FALSE
        GROUP BY ci.city_name
      `,
    };
    

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