module.exports = (sequelize, DataTypes) => {
  const Recipe_Ingredient = sequelize.define("Recipe_Ingredient", {
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ingredient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT, 
      allowNull: false,
    },
    measure: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
  })

  Recipe_Ingredient.associate = (models) => {
      Recipe_Ingredient.belongsTo(models.Recipe, {
      foreignKey: 'recipe_id',
      onDelete: 'CASCADE',
    })
    Recipe_Ingredient.belongsTo(models.Ingredient, {
      foreignKey: 'ingredient_id',
      onDelete: 'CASCADE',
    })
  }

  return Recipe_Ingredient
}
