const customers = require("./customers");
module.exports = app => {
  app.use("/customers", customers);
};
