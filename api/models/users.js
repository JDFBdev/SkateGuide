const { DataTypes } = require('sequelize');
const db = require('../db');

const Users = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Users;