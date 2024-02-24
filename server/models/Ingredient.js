module.exports = (sequelize, DataTypes) => {
    const Ingredient = sequelize.define("Ingredient", {
      name: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING, 
        allowNull: true,
      },
    })

    Ingredient.associate = (models) => {
      Ingredient.hasMany(models.Recipe_Ingredient, {
          foreignKey: 'ingredient_id',
          onDelete: 'CASCADE',
          as: 'Ingredients', 
      })
    }
 
    return Ingredient
}