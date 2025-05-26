const db = require("../db/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { PasswordValidation, LoginValidate } = require("../validators/Auth");
const { forgotPasswordTemplate } = require("./Template/forgotPasswordTemplate");
const { mailer } = require("../helpers/nodemailer");
const moment = require("moment/moment");
const crypto = require("crypto");
const { error } = require("console");
require("dotenv").config();

exports.login = [
  LoginValidate,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      const user = await db("login").where({ email, status: 1 }).first();
      if (!user) {
        return res.status(400).json({ message: "Email not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY || "fallback_secret_key",
        { expiresIn: "2m" }
      );

      console.log("Token", token);
      res.status(200).json({
        success: true,
        token: token,
        data: user,
        message: "Login successful",
      });
    } catch (error) {
      console.error("Login error", error);
      return res.status(400).json({
        success: false,
        error: {
          message: "Login is Failed!!!",
        },
      });
    }
  },
];

exports.forgotPassword = [
  async (req, res) => {
    const { email } = req.body;

    try {
      const user = await db("login").where({ email }).first();
      if (!user) {
        return res.status(404).json({ message: "User Not Found." });
      }

      const appointment = await db("appointments")
        .where({ id: user.id })
        .first();
      const name = appointment ? appointment.name : user.email;

      const token = crypto.randomBytes(48).toString("hex");
      await db("password_resets").insert({
        user_id: user.id,
        token,
        expires_date: moment().add(5, "minutes").toDate(),
      });
      const resetPasswordLink = `${process.env.PUBLIC_URL}/reset-password/${token}`;

      await mailer({
        to: email,
        subject: "Upnailz: Reset Password",
        html: forgotPasswordTemplate({ name, link: resetPasswordLink }),
      });

      return res.status(200).json({
        success: true,
        message:
          "Reset password link generated successfully! Check Your Email.",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({
        success: false,
        error: {
          message: "Failed to send email",
        },
      });
    }
  },
];

exports.verifyTokenApi = [
  async (req, res) => {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token is required." });
    }
    try {
      const tokenRecord = await db("password_resets").where({ token }).first();

      if (!tokenRecord || moment().isAfter(tokenRecord.expires_date)) {
        return res.status(401).json({ message: "Invalid or expired token." });
      }
      // console.log("tokenRecord", tokenRecord);
      return res.status(200).json({
        message:
          "Token verification successful. Redirecting to reset password page.",
      }); // redirect("/reset-password");
    } catch (err) {
      console.error("Error verifying token:", err);
      return res.status(500).json({ message: "Internal server error." });
    }
  },
];

exports.resetPassword = [
  PasswordValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { newPassword, token } = req.body;

    try {
      const validToken = await db("password_resets").where({ token }).first();

      if (!validToken || moment().isAfter(validToken.expires_date)) {
        return res.status(400).json({
          success: false,
          error: { message: "Invalid or expired token" },
        });
      }
      console.log(validToken);
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await db("login")
        .where({ id: validToken.user_id })
        .update({ password: hashedPassword, email_verified: true });

      // Optionally delete the used token
      await db("password_resets").where({ token }).del();

      return res.status(200).json({
        success: true,
        message: "Password reset successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        success: false,
        error: {
          message: "Failed to Reset Password!!",
        },
      });
    }
  },
];