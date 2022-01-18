'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Ticket, {
        foreignKey: "userId",
      });
      this.hasMany(models.Comment, {
        foreignKey: "userId",
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    alias: DataTypes.STRING,
    avatar: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    roles: {
      type: DataTypes.STRING,
      defaultValue: "CLIENT"
    },
    dateOfBirth: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};