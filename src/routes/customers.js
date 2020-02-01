const Router = require("express-promise-router");
const db = require("../db");
const {
  fetchCustomer,
  insertCustomerAddresses,
  insertCustomers
} = require("../query");

const router = new Router();

// list all customers
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query(fetchCustomer, [id]);
    res.send(rows[0]).then(() => {
      console.log("customer added");
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// create new customers
router.post("/:id", async (req, res) => {
  try {
    const { name, address } = req.body;

    const { id } = req.params;
    await db.query(insertCustomers, [id, name]);
    if (address) {
      const { street_address, postal_code, country } = address;
      await db.query(insertCustomerAddresses, [
        id,
        street_address,
        postal_code,
        country
      ]);
    }
    res.send("POST request to the homepage");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
