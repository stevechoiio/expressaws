const Router = require("express-promise-router");
const db = require("../db");
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query(
    `
  SELECT *
FROM Customers
INNER JOIN Customer_Addresses
ON Customers.id = Customer_Addresses.CUSTOMER_ID
WHERE Customers.id=$1;
`,
    [id]
  );
  res.send(rows[0]);
});

router.post("/:id", async (req, res) => {
  const { name, address } = req.body;
  const { street_address, postal_code, country } = address;
  const { id } = req.params;
  await db.query("INSERT INTO Customers (id, name) VALUES ($1,$2);", [
    id,
    name
  ]);
  if (address) {
    await db.query(
      "INSERT INTO Customer_Addresses (customer_id, street_address, postal_code, country) VALUES ($1,$2,$3,$4);",
      [id, street_address, postal_code, country]
    );
  }
  res.send("POST request to the homepage");
});
