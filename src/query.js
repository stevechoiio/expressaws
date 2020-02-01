const createAddressTable = `
    CREATE TABLE IF NOT EXISTS Customer_Addresses (
    ID SERIAL,
    CUSTOMER_ID int NOT NULL,
    STREET_ADDRESS VARCHAR (20),
    POSTAL_CODE VARCHAR (20),
    COUNTRY VARCHAR (2) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (CUSTOMER_ID) REFERENCES CUSTOMERS(ID)
);`;

const createCustomerTable = `
    CREATE TABLE IF NOT EXISTS Customers (
    ID int NOT NULL,
    Name VARCHAR (20) NOT NULL,
    PRIMARY KEY (ID)
);`;

const fetchCustomer = `
    SELECT *
    FROM Customers
    INNER JOIN Customer_Addresses
    ON Customers.id = Customer_Addresses.CUSTOMER_ID
    WHERE Customers.id=$1;
`;
const insertCustomers = "INSERT INTO Customers (id, name) VALUES ($1,$2);";
const insertCustomerAddresses =
  "INSERT INTO Customer_Addresses (customer_id, street_address, postal_code, country) VALUES ($1,$2,$3,$4);";

module.exports = {
  createCustomerTable,
  createAddressTable,
  fetchCustomer,
  insertCustomerAddresses,
  insertCustomers
};
