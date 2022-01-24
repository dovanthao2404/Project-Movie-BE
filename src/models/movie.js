'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Comment, {
        foreignKey: "movieId",
      });
      this.hasMany(models.CinemaConnectMovie, {
        foreignKey: "movieId",
      });

    }
  }
  Movie.init({
    name: DataTypes.STRING,
    poster: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    alias: DataTypes.STRING,
    trailer: DataTypes.STRING,
    description: DataTypes.TEXT,
    isHot: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isNowShowing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};