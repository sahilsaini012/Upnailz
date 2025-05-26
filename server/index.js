const express = require("express");
const cors = require("cors");
const Routes = require("./routes/Route");
const db = require("./db/index");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
require("dotenv").config();
const cron = require("node-cron");
const { remindermail } = require("./controller/ReminderController");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/upnailz", Routes);
app.use(express.urlencoded({ extended: true }));

cron.schedule("0 * * * *", async () => {
  await remindermail();
});

app.listen(5002, () => {
  console.log("Server is running on port http://localhost:5002");
});
