'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Ticket.init({
    userId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    movieShowTime: DataTypes.DATE,
    movieName: DataTypes.STRING,
    linkPoster: {
      type: DataTypes.STRING,
      defaultValue: ""
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};