const { validationResult } = require("express-validator");
const db = require("../db/index");
const { AppointmentValidate } = require("../validators/Auth");

const { mailer } = require("../helpers/nodemailer");
const moment = require("moment");
const { sendMessage } = require("./SendMessage");
const { promotiesTemplate } = require("./Template/PromotiesTemplate");
require("dotenv").config();

exports.getUsersApp = [
  async (req, res) => {
    try {
      const { userid } = req.query;

      let query = db("appointments")
        .select(
          "id",
          "name",
          "phone_number",
          "email",
          "appointment_on",
          "time",
          "treatment"
        )
        .where({ status: 1 });
        const totalUsers = await db("appointments").count("id as count");

      if (userid) {
        query = query.where("id", userid);
      }
      const users = await query;
      // console.log("users", users);
      // const totalUsers = await db("appointments").count("id as count").first();

      if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
      const formattedUsers = users.map((user) => ({
        ...user,
        appointment_on: moment(user.appointment_on).format("DD MMMM YYYY"),
        time: moment(user.time, "HH:mm").format("hh:mm A"),
      }));
      // return res.json(formattedUsers);
      // console.log("Sending response with users:", formattedUsers);
      return res.status(200).json({
        success: true,
        data: formattedUsers,
        totalUsers: totalUsers[0].count,
        message: "Users fetched successfully!",
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false,
        error: {
          message: "Failed to get appointment!",
        },
      });
    }
  },
];

exports.saveUsersApp = [
  AppointmentValidate,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, phone_number, email, appointment_on, time, treatment } =
      req.body;
    try {
      const appointment_schedule_on = `${appointment_on} ${time}`;
      await db("appointments").insert({
        name,
        phone_number,
        email,
        appointment_on,
        time,
        appointment_schedule_on,
        treatment,
      });
      // const messageResult = await sendMessage(req);
      // if (!messageResult.success) {
      //   return res.status(500).json({
      //     success: false,
      //     message: "Appointment saved,but message sending failed.",
      //   });
      // }
      return res.status(200).json({
        success: true,
        message: "Appointment added successfully!",
      });
    } catch (error) {
      console.error("Error saving appointment :", error);
      return res.status(400).json({
        success: false,
        message: "Failed to save appointment!!!",
      });
    }
  },
];

exports.updateUsersApp = [
  AppointmentValidate,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, name, phone_number, email } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ error: "Appointment ID is required to update!" });
    }

    try {
      const updatedRows = await db("appointments")
        .where({ id })
        .update({ name, phone_number, email });

      if (updatedRows === 0) {
        return res.status(404).json({ message: "Appointment not found!" });
      }

      return res.json({
        success: true,
        message: "Appointment updated successfully!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        error: {
          message: "Failed to update appointment!",
        },
      });
    }
  },
];

exports.deleteUsersApp = [
  async (req, res) => {
    const id = req.params.id;
    try {
      const user = await db("appointments").where({ id }).first();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await db("appointments").where({ id }).update({ status: 0 });
      return res.json({
        success: true,
        message: "Appointment deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false,
        error: {
          message: "Failed to delete appointment!!!",
        },
      });
    }
  },
];

exports.getcustomer = [
  async (req, res) => {
    try {
      const { userid } = req.query;
      let query = db("appointments")
        .select("id", "name", "phone_number", "email")
        .where({ status: 1 })
        .groupBy("email");
      if (userid) {
        query = query.where("id", userid);
      }
      const users = await query;
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
      return res.json({
        success: true,
        data: users,
        message: "Customers fetched successfulyy!!",
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false,
        error: {
          message: "Failed to get appointment!!!",
        },
      });
    }
  },
];

exports.getPromoties = [
  async (req, res) => {
    try {
      const { email, subject, message } = req.body;

      if (!email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          message: "Email, subject, and message are required" 
        });
      }

      // Convert email to an array if it's a single email
      const recipients = Array.isArray(email) ? email : [email];

      // Fetch user names based on emails
      const users = await db("appointments")
        .select("name", "email")
        .whereIn("email", recipients);

      if (users.length == 0) {
        return res.status(404).json({
          success: false,
          message: "No users found for the given email(s)",
        });
      }

      // Prepare the emails with names
      const results = await Promise.all(
        users.map(async (user) => {
          const template = promotiesTemplate({ name: user.name,subject, message });

          return await mailer({
            to: user.email,
            subject: subject,
            html: template,
          });
        })
      );

      console.log("Promotions Sent:", results);

      return res.status(200).json({
        success: true,
        message: `Emails sent successfully to ${users.length} recipient(s)`,
        data: results,
      });
    } catch (error) {
      console.error("Error sending promotions:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send promotions",
        error: error.message,
      });
    }
  },
];




exports.getUserEmails = [
  async (req, res) => {
    try {
      let { user_id } = req.query;

      if (!user_id) {
        return res.status(400).json({
          success: false,
          message: "User ID(s) required"
        });
      }

      // Split the user_id string into an array of numbers
      const userIds = user_id.split(",").map(id => id.trim());

      // Query to fetch emails using whereIn (for multiple IDs)
      const users = await db("appointments")
        .select("email")
        .whereIn("id", userIds) // Using whereIn to handle multiple IDs
        .andWhere({ status: 1 });

      if (users.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No users found for the given IDs"
        });
      }

      // Extract only email addresses
      const userEmails = users.map(user => user.email);

      return res.status(200).json({
        success: true,
        emails: userEmails,
        totalUsers: userEmails.length,
        message: "Emails fetched successfully!"
      });

    } catch (error) {
      console.error("Error fetching emails:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch emails",
        error: error.message
      });
    }
  }
];


