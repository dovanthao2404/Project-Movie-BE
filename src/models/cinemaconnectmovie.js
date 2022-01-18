'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CinemaConnectMovie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Movie, {
        foreignKey: "movieId"
      });
      this.belongsTo(models.Cinema, {
        foreignKey: "cinemaId"
      });
    }
  }
  CinemaConnectMovie.init({
    cinemaId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    selfGranted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'CinemaConnectMovie',
  });
  return CinemaConnectMovie;
};