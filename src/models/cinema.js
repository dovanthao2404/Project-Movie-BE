'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cinema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Cineplex, {
        foreignKey: "cineplexId"
      });


      this.hasMany(models.CinemaConnectMovie, {
        foreignKey: "cinemaId",
      });

      this.hasMany(models.Room, {
        foreignKey: "cinemaId"
      });
    }
  }
  Cinema.init({
    name: DataTypes.STRING,
    logo: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    alias: DataTypes.STRING,
    address: DataTypes.STRING,
    cineplexId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cinema',
  });
  return Cinema;
};