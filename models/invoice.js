'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invoice.belongsTo(models.Profile, { foreignKey: 'ProfileId' })
      Invoice.hasMany(models.Medicine, { foreignKey: 'MedicineId' })
    }
  }
  Invoice.init({
    ProfileId: DataTypes.INTEGER,
    MedicineId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};