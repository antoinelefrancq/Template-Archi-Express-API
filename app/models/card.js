const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Card extends Model { };

Card.init({
    content: DataTypes.TEXT,
    colour: DataTypes.TEXT,
    list_id: DataTypes.INTEGER,
    position: DataTypes.INTEGER
}, {
    sequelize,
    tableName: "card"
});

module.exports = Card;