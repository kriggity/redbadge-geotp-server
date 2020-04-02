module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        fullname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return User;
}