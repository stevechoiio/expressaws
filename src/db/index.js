const { Pool } = require("pg");
const connectionString = process.env.POSTGRES;
const { createAddressTable, createCustomerTable } = require("../query");

const pool = new Pool({
  connectionString: connectionString
});
//initialize tables if they don't exist in the database
console.log("connecting to database:", connectionString);
pool.query(createAddressTable);
pool.query(createCustomerTable);

module.exports = {
  query: (text, params) => pool.query(text, params)
};
