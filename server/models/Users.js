module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        profilePicture: {
            type: DataTypes.STRING,
            allowNull: true, // allowNull: false if every user must have a profile picture
        },
    });
    
    return Users;
};
