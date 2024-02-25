const mysql = require("mysql2");
const session = require("express-session");
const express = require("express");

const pool = mysql.createPool({
  host: "l9dwvv6j64hlhpul.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "v9r7nrw0ekmrzzs5",
  password: "zchumesagj044iy6",
  database: "t1rbsj1olgf9kvzk",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
