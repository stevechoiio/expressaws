require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mountRoutes = require("./routes");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mountRoutes(app);
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Welcome to my playground");
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});

module.exports = app;
