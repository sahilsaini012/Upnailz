/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("appointments", function (table) {
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table.string("phone_number", 20).notNullable();
    table.string("email", 100).notNullable();
    table.date("appointment_on").notNullable();
    table.time("time").notNullable();
    table.datetime("appointment_schedule_on").notNullable();
    table.string("treatment").notNullable();
    table.tinyint("status").defaultTo(1).comment("0=inactive,1=active");
    table.tinyint("is_reminder_sent").defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.hasTable("appointments").then(function (exists) {
    if (exists) {
      return knex.schema.dropTable("appointments");
    }
  });
};
