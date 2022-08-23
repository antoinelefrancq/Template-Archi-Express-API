const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Tag extends Model { };

Tag.init({
    name: DataTypes.TEXT,
    colour: DataTypes.TEXT
}, {
    sequelize,
    tableName: "tag"
});

module.exports = Tag;