/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("login", (table) => {
    table.increments("id").primary();
    table.tinyint("role").defaultTo(2).comment("1=admin,2=user");
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.boolean("email_verified").defaultTo(false);
    table.tinyint("status").defaultTo(1).comment("0=inactive,1=active");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("login");
};
