module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define('location', {
        googleid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        votecount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Location;
}