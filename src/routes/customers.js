const Router = require("express-promise-router");
const db = require("../db");
const {
  fetchCustomer,
  insertCustomerAddresses,
  insertCustomers
} = require("../query");

const router = new Router();

module.exports = router;

// list all customers
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query(fetchCustomer, [id]);
    res.send(rows[0]);
  } catch (e) {
    res.status(500).send("Something broke!");
  }
});

// create new customers
router.post("/:id", async (req, res) => {
  try {
    const { name, address } = req.body;
    const { street_address, postal_code, country } = address;
    const { id } = req.params;
    await db.query(insertCustomers, [id, name]);
    if (address) {
      await db.query(insertCustomerAddresses, [
        id,
        street_address,
        postal_code,
        country
      ]);
    }
    res.send("POST request to the homepage");
  } catch (e) {
    res.status(500).send("Something broke!");
  }
});
