module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define("Recipe", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    total_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    recipe_of_the_week: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    recipe_of_the_week_timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  })

  Recipe.associate = (models) => {
    Recipe.hasMany(models.Recipe_Ingredient, {
        foreignKey: 'recipe_id',
        onDelete: 'CASCADE',
        as: 'Ingredients', 
    })
    Recipe.belongsToMany(models.HealthLabel, {
      through: 'RecipeHealthLabels',
      foreignKey: 'recipe_id',
    })
  }

  return Recipe
}
