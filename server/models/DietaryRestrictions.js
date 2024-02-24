module.exports = (sequelize, DataTypes) => {
    const DietaryRestrictions = sequelize.define("DietaryRestrictions", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        healthLabel_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    })

    DietaryRestrictions.associate = (models) => {
        DietaryRestrictions.belongsTo(models.Users, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        })
        DietaryRestrictions.belongsTo(models.HealthLabel, {
            foreignKey: 'healthLabel_id',
            onDelete: 'CASCADE'
        })
    }

    return DietaryRestrictions
}