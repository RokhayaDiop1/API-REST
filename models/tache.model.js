
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tache = sequelize.define('Tache', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  titre: {
    type: DataTypes.STRING,
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  terminee: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Tache;
