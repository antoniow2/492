module.exports = (sequelize, DataTypes) => {
    const FavRecipes = sequelize.define("FavRecipes", {
    })
  
    FavRecipes.associate = (models) => {
        FavRecipes.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        })
  
        FavRecipes.belongsTo(models.Recipe, {
            foreignKey: 'recipeId',
            onDelete: 'CASCADE',
        })
    }
  
    return FavRecipes;
}
  