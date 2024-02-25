const express = require("express");
const router = express.Router();
const path = require("path");
const {
  Users,
  Recipe,
  Recipe_Ingredient,
  Ingredient,
  FridgeIngredient,
  DietaryRestrictions,
  HealthLabel,
  FavRecipes,
  Sequelize,
} = require("../models");
const jwt = require("jsonwebtoken");
const authenticate = require("../middlewares/authenticate");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const fs = require("fs");
const pool = require("../pool");

const multer = require("multer");
const { error } = require("console");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Register a new user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await Users.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ user: newUser });
  } catch (error) {
    // Handle unique constraint violation (username or email already exists)
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        error:
          "Username or email is already in use. Please choose a different one.",
      });
    }
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login and pool.js
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Error occurred while connecting to the database:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const query = "SELECT * FROM Users WHERE username = ?";

    conn.query(query, [username], async (error, results, fields) => {
      conn.release(); // Release the connection back to the pool

      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      try {
        if (results.length > 0) {
          const foundUser = results[0];
          const passwordMatch = await bcrypt.compare(
            password,
            foundUser.password
          );

          if (passwordMatch) {
            const token = jwt.sign({ userId: foundUser.id }, "skey", {
              expiresIn: "5h",
            });
            res.json({ message: "Login successful", token });
          } else {
            res.status(401).json({ error: "Invalid credentials" });
          }
        } else {
          res.status(401).json({ error: "Invalid credentials" });
        }
      } catch (catchError) {
        console.error("Error in processing login:", catchError);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  });
});

// Logout
router.post("/logout", authenticate, async (req, res) => {
  try {
    await req.session.destroy();
    res.clearCookie("connect.sid");
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Gets User's data for profile page and pool.js
router.get("/profile", authenticate, async (req, res) => {
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const userId = req.userId;

      // Check if the user exists
      connection.query(
        "SELECT username, email, profilePicture FROM Users WHERE id = ?",
        [userId],
        (err, results) => {
          connection.release(); // Release the connection back to the pool

          if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
          }

          const user = results[0];
          const responseData = {
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
          };

          res.json(responseData);
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Gets the User's Ingredient Options and pool.js
router.get("/ingredient_options", async (req, res) => {
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const { query } = req.query;

      // Query the database for ingredients that match the provided query
      connection.query(
        "SELECT name FROM Ingredients WHERE name LIKE ?",
        [`%${query}%`],
        (err, results) => {
          connection.release(); // Release the connection back to the pool

          if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          if (results.length === 0) {
            return res
              .status(404)
              .json({ error: "Ingredient not found in our recipes." });
          }

          // Extract the names of matching ingredients from the query result
          const ingredientOptions = results.map(
            (ingredient) => ingredient.name
          );

          res.status(200).json({ ingredientOptions });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//pool.js
router.post("/profile_ingredient_list", authenticate, async (req, res) => {
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection from pool:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const { name, quantity } = req.body;

      console.log("req.body" + name + quantity);

      // check if user's ingredient name is in the Ingredient table
      connection.query(
        "SELECT * FROM Ingredient WHERE name LIKE ?",
        [`%${name}%`],
        async (err, results) => {
          if (err) {
            connection.release(); // Release the connection back to the pool
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          if (results.length > 0) {
            const ingredient = results[0];
            console.log("Ingredient:", ingredient.name);

            // Check if the ingredient already exists in the user's profile
            const [userProfile, created] = await FridgeIngredient.findOrCreate({
              where: {
                user_id: req.userId,
                ingredient_id: ingredient.id,
              },
              defaults: {
                quantity: quantity,
              },
            });

            // handle case if the user profile already has the ingredient
            if (!created) {
              await userProfile.update({ quantity: quantity });
            }

            connection.release(); // Release the connection back to the pool
            res.json({ message: "Fridge updated successfully" });
          } else {
            connection.release(); // Release the connection back to the pool
            console.error("Ingredient not found for: ", name);
            res.status(404).json({ error: "Ingredient not found." });
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/saved_ingredients", authenticate, async (req, res) => {
  try {
    const userProfile = await FridgeIngredient.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: Ingredient,
          as: "Ingredient",
          attributes: ["name"],
        },
      ],
    });

    if (userProfile && userProfile.length > 0) {
      const savedIngredients = userProfile.map((entry) => ({
        name: entry.Ingredient.name,
        quantity: entry.quantity,
      }));
      res.json({ savedIngredients });
    } else {
      // no FridgeIngredient entry exists
      console.error("User profile not found.");
      res.status(404).json({ error: "User profile not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete_ingredient", authenticate, async (req, res) => {
  try {
    const { name } = req.body;

    console.log("Deleting ingredient with name:", name);

    const ingredient = await Ingredient.findOne({
      where: {
        name: {
          [Sequelize.Op.like]: `%${name}%`,
        },
      },
    });

    if (!ingredient) {
      console.error("Ingredient not found for:", name);
      return res.status(404).json({ error: "Ingredient not found." });
    }

    const deletedRows = await FridgeIngredient.destroy({
      where: {
        user_id: req.userId,
        ingredient_id: ingredient.id,
      },
    });

    if (deletedRows > 0) {
      console.log("Ingredient deleted successfully from Fridge.");
      const updatedUserProfile = await FridgeIngredient.findAll({
        where: { user_id: req.userId },
        include: [
          {
            model: Ingredient,
            as: "Ingredient",
            attributes: ["name"],
          },
        ],
      });

      const updatedSavedIngredients = updatedUserProfile.map((entry) => ({
        name: entry.Ingredient.name,
        quantity: entry.quantity,
      }));

      return res.json({ savedIngredients: updatedSavedIngredients });
    } else {
      console.error("Ingredient not found in user profile");
      return res
        .status(404)
        .json({ error: "Ingredient not found in user profile." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/dietary_restrictions", authenticate, async (req, res) => {
  try {
    const userId = req.userId;

    const { selectedRestrictions } = req.body;

    const healthLabelIds = Array.isArray(selectedRestrictions)
      ? selectedRestrictions
      : [selectedRestrictions];

    console.log(healthLabelIds);

    await DietaryRestrictions.destroy({
      where: { user_id: userId },
    });

    for (const healthLabelId of healthLabelIds) {
      await DietaryRestrictions.create({
        user_id: userId,
        healthLabel_id: healthLabelId,
      });
      console.log(
        `Dietary restriction created for healthLabelId ${healthLabelId}.`
      );
    }

    res
      .status(200)
      .json({ message: "Dietary restrictions saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user_healthlabels", authenticate, async (req, res) => {
  try {
    const userId = req.userId;

    const dietaryRestrictions = await DietaryRestrictions.findAll({
      where: { user_id: userId },
      attributes: ["healthLabel_id"],
    });

    const healthLabelIds = dietaryRestrictions.map(
      (restriction) => restriction.healthLabel_id
    );

    const healthLabels = await HealthLabel.findAll({
      where: { id: healthLabelIds },
      attributes: ["label"],
    });

    const labelValues = healthLabels.map((healthLabel) => healthLabel.label);

    res.status(200).json({ userHealthLabels: labelValues });

    // console.log(labelValues)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/healthlabels_ids", async (req, res) => {
  try {
    // console.log('het get health ids')
    const { selectedRestrictions } = req.query;

    const healthLabels = await HealthLabel.findAll({
      where: { label: selectedRestrictions.split(",") },
      attributes: ["id"],
    });

    const healthLabelIds = healthLabels.map((label) => label.id);

    res.status(200).json({ healthLabelIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/healthlabels", async (req, res) => {
  console.log("hit get dietaryRestrictions route");
  try {
    // get all the labels send to frontend for checklist
    const healthLabels = await HealthLabel.findAll({
      attributes: ["label"],
    });

    const labelValues = healthLabels.map((healthLabel) => healthLabel.label);

    res.status(200).json({ labels: labelValues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.post("/upload_profile_picture", upload.single("profilePicture"), authenticate,
//   async (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ error: "No profile picture uploaded" });
//       }

//       // Save the uploaded file
//       const fileName = `${req.userId}_profile_picture`;
//       const filePath = path.join(__dirname, "../uploads", fileName);
//       fs.writeFileSync(filePath, req.file.buffer);

//       // Update user's profile with the file path
//       await Users.update({ profilePicture: fileName }, { where: { id: req.userId } });

//       res.json({ message: "Profile Picture uploaded successfully", filePath: fileName });
//     }
//     catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// );

// profile router with pool
router.post(
  "/upload_profile_picture",
  upload.single("profilePicture"),
  authenticate,
  (req, res) => {
    pool.getConnection((err, conn) => {
      if (err) {
        console.error("Error occurred while connecting to the database:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      try {
        if (!req.file) {
          conn.release();
          return res.status(400).json({ error: "No profile picture uploaded" });
        }

        // Save the uploaded file
        const fileName = `${req.userId}_profile_picture`;
        const filePath = path.join(__dirname, "../uploads", fileName);
        fs.writeFileSync(filePath, req.file.buffer);

        // Update user's profile with the file path
        const updateQuery = {
          profilePicture: fileName,
        };

        const whereClause = {
          id: req.userId,
        };

        conn.query(
          "UPDATE Users SET ? WHERE ?",
          [updateQuery, whereClause],
          async (error) => {
            conn.release(); // Release the connection back to the pool

            if (error) {
              console.error("Error updating user's profile picture:", error);
              return res.status(500).json({ error: "Internal Server Error" });
            }

            res.json({
              message: "Profile Picture uploaded successfully",
              filePath: fileName,
            });
          }
        );
      } catch (error) {
        console.error(error);
        conn.release(); // Release the connection back to the pool
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  }
);

router.post("/bookmark_recipe", authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    const recipeId = req.body.data.recipeID;

    // Create a new entry in the FavRecipes table
    await FavRecipes.create({
      userId: userId,
      recipeId: recipeId,
    });
    res.status(201).json({ message: "Recipe favorited successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/unbookmark_recipe", authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    const recipeId = req.body.data.recipeID;

    // Find and delete the corresponding entry in the FavRecipes table
    await FavRecipes.destroy({
      where: {
        userId: userId,
        recipeId: recipeId,
      },
    });

    res
      .status(200)
      .json({ message: "Recipe removed from favorites successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/unbookmark", authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    const recipeId = req.body.recipeID;

    // Find and delete the corresponding entry in the FavRecipes table
    await FavRecipes.destroy({
      where: {
        userId: userId,
        recipeId: recipeId,
      },
    });

    res
      .status(200)
      .json({ message: "Recipe removed from favorites successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/favorite_recipe", authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    const favRecipes = await FavRecipes.findAll({
      where: { userId },
      include: [{ model: Recipe, attributes: ["id", "title", "image"] }],
    });

    const favoriteRecipes = favRecipes.map((favRecipe) => {
      const { id, title, image } = favRecipe.Recipe;
      return {
        id,
        title,
        image: image
          ? `https://whattocookapp-ed9fe9a2a3d4.herokuapp.com/recipe_images/${image}`
          : null,
      };
    });

    res.status(200).json({ favoriteRecipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/isBookmarked", authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    const recipeId = req.body.data.recipeID;

    const [bookmark, exists] = await FavRecipes.findAll({
      where: { userId: userId, recipeId: recipeId },
    });
    // if the bookmark doesn't exist, we return an empty Json
    if (bookmark === undefined) {
      const nullJson = { full: 0 };
      res.status(200).json(nullJson);
    } else {
      // Else, we return a json
      const somethingjson = { full: 1 };
      res.status(200).json(somethingjson);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
