const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('tricks', {
        name: DataTypes.STRING
    });
};