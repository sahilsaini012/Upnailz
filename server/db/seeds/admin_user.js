const bcrypt = require("bcrypt");
const db = require("../index");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await db("login").where({ email: "hello@upnailz.nl" }).del();

  let user = await db("login").insert({
    role: 1,
    email: "hello@upnailz.nl",
    password: await bcrypt.hash("Upnailz@123", 10),
    email_verified: 1,
  });
  // console.log("Admin user inserted successfully.");
};
