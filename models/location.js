module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define('location', {
        googleid: {
            type: DataTypes.STRING,
            allowNull: false
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