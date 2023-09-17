const dotenv = require("dotenv")
// dotenv.config({ path: "../.env" })
dotenv.config()

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
    database: 'skripsi',
    host: process.env.DB_HOST,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
    database: 'skripsi',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    // username: process.env.DB_USERNAME || 'postgres',
    // password: process.env.DB_PASSWORD || 'postgres',
    // database: 'musikin',
    // host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}