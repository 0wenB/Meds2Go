'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: 'UserId' })
      Profile.hasMany(models.Invoice, { foreignKey: 'ProfileId' })
    }
  }
  Profile.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    profileImage: DataTypes.STRING,
    gender: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};