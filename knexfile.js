require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 6,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
    },
    connection: {
      database: process.env.DB_DEV_DATABASE,
      user: process.env.DB_DEV_USER,
      password: process.env.DB_DEV_PASSWORD,
    },
    migrations: {
      directory: "./db/migrations",
    },
  },

  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    useNullAsDefault: true,
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations",
    },
  },
};
