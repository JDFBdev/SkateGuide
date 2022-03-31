const { DataTypes } = require('sequelize');
const db = require('../db');

const Tricks = db.define('skate-tricks', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  video: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
})

module.exports = Tricks;
