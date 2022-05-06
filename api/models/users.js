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
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

const Stance = db.define('stance', {
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
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  trick_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

Users.belongsToMany(Stance, {through: 'UserStances'});
Stance.belongsToMany(Users, {through: 'UserStances'});

db.sync({ force:false });

module.exports = {Users, Stance};