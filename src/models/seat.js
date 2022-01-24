'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Showtime, {
        foreignKey: "showtimeId"
      });
    }
  }
  Seat.init({
    name: DataTypes.STRING,
    isVip: DataTypes.BOOLEAN,
    price: {
      defaultValue: 50000,
      type: DataTypes.FLOAT
    },
    ticketId: DataTypes.INTEGER,
    showtimeId: DataTypes.INTEGER,
    isPlaced: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};