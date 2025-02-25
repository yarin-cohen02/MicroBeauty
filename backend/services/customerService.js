const { Op, Sequelize } = require("sequelize"); 
const { customers } = require("../models/sequelize");
const pool = require('../config/poolConfig');

exports.getCustomersByQuery = async (searchTerm) => {
  const query = `
    SELECT
      customer_id,
      first_name,
      last_name,
      LPAD(israeli_id::TEXT, 9, '0') AS israeli_id,
	    mobile_number,
	    TO_CHAR(date_of_birth, 'DD.MM.YYYY') AS date_of_birth,
	    EXTRACT(YEAR FROM AGE(NOW(), date_of_birth)) || '.' || EXTRACT(MONTH FROM AGE(NOW(), date_of_birth)) AS age,
	    cities.city_name,
	    needle_and_color,
	    sources.source_name,
	    agreed_ads,
	    notes
    FROM
	    customers
    JOIN
	    cities ON customers.city_id = cities.city_id
    JOIN
	    sources ON customers.source_id = sources.source_id
    WHERE
      first_name || ' ' || last_name LIKE '%' || $1 || '%'
      OR LPAD(israeli_id::TEXT, 9, '0') LIKE '%' || $1 || '%'
      OR mobile_number LIKE '%' || $1 || '%'
      OR notes LIKE '%' || $1 || '%';
  `;
  const values = [searchTerm];
  const result = await pool.query(query, values);
  return result.rows;
};

exports.getCustomerById = async (id) => {
  const query = `
    SELECT
      customer_id,
      first_name,
      last_name,
      LPAD(israeli_id::TEXT, 9, '0') AS israeli_id,
	    mobile_number,
	    TO_CHAR(date_of_birth, 'DD.MM.YYYY') AS date_of_birth,
	    EXTRACT(YEAR FROM AGE(NOW(), date_of_birth)) || '.' || EXTRACT(MONTH FROM AGE(NOW(), date_of_birth)) AS age,
	    cities.city_name,
	    needle_and_color,
	    sources.source_name,
	    agreed_ads,
	    notes
    FROM
	    customers
    LEFT JOIN
	    cities ON customers.city_id = cities.city_id
    LEFT JOIN
	    sources ON customers.source_id = sources.source_id
    WHERE
	    customer_id = $1;
  `;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows;
};

exports.createCustomer = (customer) => {
  return customers.create(customer);
};

exports.updateCustomer = (id, customer) => {
  return customers.update(customer, { where: { customer_id: id } });
};

exports.deleteCustomer = (id) => {
  return customers.destroy({ where: { customer_id: id } });
};
