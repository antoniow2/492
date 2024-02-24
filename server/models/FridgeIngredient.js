module.exports = (sequelize, DataTypes) => {
    const FridgeIngredient = sequelize.define("FridgeIngredient", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ingredient_id: {
            type: DataTypes.INTEGER,  // adjust the data type based on your Recipe_Ingredient model
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

    FridgeIngredient.associate = (models) => {
        FridgeIngredient.belongsTo(models.Users, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        })
        FridgeIngredient.belongsTo(models.Ingredient, {
            foreignKey: 'ingredient_id',
            onDelete: 'CASCADE'
        })
    }

    return FridgeIngredient
}