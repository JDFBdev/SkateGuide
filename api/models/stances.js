const { DataTypes } = require('sequelize');
const db = require('../db');

const Stances = db.define('stances', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stance: {
    type: DataTypes.STRING,
    allowNull : false
  },
  trick_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

Stances.sync({ force: false });

module.exports = Stances;