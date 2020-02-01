const { Pool } = require("pg");
const connectionString = process.env.POSTGRES;
const { createAddressTable, createCustomerTable } = require("../query");

const pool = new Pool({
  connectionString: connectionString
});
pool.query(createAddressTable, (err, res) => {});
pool.query(createCustomerTable, (err, res) => {});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
