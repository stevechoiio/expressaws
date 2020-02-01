const { Pool, Client } = require("pg");
const connectionString =
  "postgres://qfdfxbvg:rrRexReE534PYff_Ufq6OK5P8QS_7G0X@manny.db.elephantsql.com:5432/qfdfxbvg";

const createAddressTable = `CREATE TABLE IF NOT EXISTS Customer_Addresses (
    ID SERIAL,
    CUSTOMER_ID int NOT NULL,
    STREET_ADDRESS VARCHAR (20),
    POSTAL_CODE VARCHAR (10),
    COUNTRY VARCHAR (2) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (CUSTOMER_ID) REFERENCES CUSTOMERS(ID)
);`;

const createCustomerTable = `CREATE TABLE IF NOT EXISTS Customers (
    ID int NOT NULL,
    Name VARCHAR (10) NOT NULL,
    PRIMARY KEY (ID)
);`;

const pool = new Pool({
  connectionString: connectionString
});
pool.query(createAddressTable, (err, res) => {
  console.log("here");
  console.log(err);
});
pool.query(createCustomerTable, (err, res) => {
  console.log("here");
  console.log(err);
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
