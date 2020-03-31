module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        locid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Comment;
}