module.exports = (sequelize, DataTypes) => 
    sequelize.define('Recipe', {
        title: {
            type: DataTypes.STRING,
            unique: true
        },
        ingredients: DataTypes.STRING
    })