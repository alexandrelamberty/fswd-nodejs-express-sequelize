require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");

const appMiddleware = require("./src/middlewares/logger.middleware");

// const port = process.env.PORT;
const port = process.env.PORT;

// Express application
const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

// Enable cors
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(appMiddleware);

// Db

const db = require("./src/models");

db.sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.log("Unable to connect to the database:", err));

if (process.env.NODE_ENV === "development") {
  // db.sequelize.sync({ force: true });
  db.sequelize.sync({ alter: { drop: false } });
}

// Routing
const router = require("./src/routes");

app.use("/", router);

app.get("*", (req, res) => {
  // catch all
  res.send("Not found");
});

// Start the server on the specified port and hostname.
// See the .env file and the package.json scripts.
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
