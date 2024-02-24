module.exports = (sequelize, DataTypes) => {
    const HealthLabel = sequelize.define("HealthLabel", {
        label: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    HealthLabel.associate = (models) => {
        HealthLabel.belongsToMany(models.Recipe, {
            through: 'RecipeHealthLabels', 
            foreignKey: 'healthLabel_id',
        })
    }

    return HealthLabel;
}
