require("dotenv").config();

module.exports = {
  development: {
    connectionLimit: 100,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
};
