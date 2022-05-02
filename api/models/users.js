const { DataTypes, Sequelize } = require('sequelize');
const db = require('../db');

const Users = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
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

Users.belongsToMany(Stances, {through: 'UserStances'});
Stances.belongsToMany(Users, {through: 'UserStances'});

db.sync({ force:false });

module.exports = {Users, Stances};