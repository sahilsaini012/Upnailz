const db = require("../db/index");
const express = require("express");
const {
  saveUsers,
  updateUsers,
  deleteUsers,
  getUsers,
} = require("../controller/UserController");

const { verifyToken } = require("../middleawares/Token");

const {
  getUsersApp,
  saveUsersApp,
  updateUsersApp,
  deleteUsersApp,
  getcustomer,
  getPromoties,
  getUserEmails,
} = require("../controller/AppointmentController");
const {
  login,
  verifyTokenApi,
  resetPassword,
  forgotPassword,
} = require("../controller/AuthController");
const { sendMessage } = require("../controller/SendMessage");

const router = express.Router();

router.post("/add-user", saveUsers);
router.get("/users", getUsers);
router.put("/users", updateUsers);
router.delete("/users/:id", deleteUsers);

// Appointment User

router.get("/appointments", getUsersApp);
router.post("/add-appointments", saveUsersApp);
router.put("/appointments", updateUsersApp);
router.delete("/appointments/:id", deleteUsersApp);
router.get("/getUserEmails", getUserEmails);


// customer
router.post("/customer", getcustomer)

// promotions
router.post("/promoties",getPromoties)  
// Email

// router.post("/login", verifyToken, login);
router.post("/login", login);
router.post("/verify-token", verifyTokenApi);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);

module.exports = router;
