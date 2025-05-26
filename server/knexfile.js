// knexfile.js

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "upnailz",
    },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
  production: {
    client: "mysql2",
    connection: {
      database: "reminderupnailz_upnailz",
      user: "reminderupnailz_upnailzadmin",
      password: "$tCVFc%9##)~",
    },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
