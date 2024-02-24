const express = require("express");
const cors = require("cors");
const session = require("express-session");
const db = require("./models");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const fs = require("fs/promises");

const port = 3000;

dotenv.config();
const path = require("path");

const app = express();

// Servers dynamic images
app.use("/uploads/:filename", (req, res) => {
  const { filename } = req.params;
  res.sendFile(path.join(__dirname, "uploads", filename));
});

// Serves static images
app.use(
  "/recipe_images",
  express.static(path.join(__dirname, "recipe_images"))
);
app.use(
  "/ingredient_images",
  express.static(path.join(__dirname, "ingredient_images"))
);

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(
  session({
    key: "userId",
    secret: process.env.SESSION_SECRET || "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60, // 1 day
      httpOnly: true, //reducing the risk of cross-site scripting (XSS) attacks.
    },
  })
);

// Routers
const userRouter = require("./routes/Users.js");
app.use("/users", userRouter);

const recipeRouter = require("./routes/Recipe.js");
app.use("/recipe", recipeRouter);

var PORT = process.env.PORT || 3000;

// // Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// // Handle requests to the root path by sending the React app's index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Forms
const messagesFilePath = path.join(__dirname, "messages.txt");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/contactus", async (req, res) => {
  const { name, email, subject, text } = req.body;

  const timestamp = new Date().toISOString();
  const message = `${timestamp}: Name: ${name}, Email: ${email}, Subject: ${subject}, Text: ${text}\n`;

  try {
    // Check if the file exists, and create it if not
    if (!(await fs.access(messagesFilePath).catch(() => false))) {
      await fs.writeFile(messagesFilePath, "");
    }

    await fs.appendFile(messagesFilePath, message);
    res.status(200).send("Sent successfully!");
  } catch (error) {
    console.error("Error sending:", error);
    res.status(500).send(error.toString());
  }
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running " + PORT);
  });
});
