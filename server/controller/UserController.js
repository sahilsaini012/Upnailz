const db = require("../db/index");
const bcrypt = require("bcrypt");
const { LoginValidate } = require("../validators/Auth");
const { validationResult } = require("express-validator");
require("dotenv").config();

exports.saveUsers = [
  LoginValidate,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db("login").insert({
        email,
        password: hashedPassword,
      });
      return res.json({
        success: true,
        message: "User added successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false,
        error: { message: "Failed to Save User!!" },
      });
    }
  },
];

exports.getUsers = [
  async (req, res) => {
    try {
      const users = await db("login")
        .select("id", "email", "created_at")
        .where({ status: 1 });
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
      return res.json({
        success: true,
        data: users,
        message: "Users fetched Successfullyy!!!",
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false,
        error: { message: "Failed to get User" },
      });
    }
  },
];

exports.updateUsers = [
  LoginValidate,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const { email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db("login")
        .where({ id })
        .update({ email, password: hashedPassword });
      return res.json({
        success: true,
        message: "User updated successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false,
        error: { message: "Failed to Update User!!!" },
      });
    }
  },
];

exports.deleteUsers = [
  async (req, res) => {
    const { id } = req.params;
    try {
      const user = await db("login").where({ id }).first();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await db("login").where({ id }).del();
      return res.json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false,
        error: { message: "Failed to delete User!!" },
      });
    }
  },
];