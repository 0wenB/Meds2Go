'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Medicine.hasMany(models.Invoice, { foreignKey: 'MedicineId' })
    }
  }
  Medicine.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty:{msg: 'Name cannot be empty'},
        notNull: {msg: 'Name cannot be null'}
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull:false,
      validate: {
        notEmpty:{msg: 'Description cannot be empty'},
        notNull: {msg: 'Description cannot be null'}
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        notEmpty:{msg: 'Price cannot be empty'},
        notNull: {msg: 'Price cannot be null'}
      }
    },
    imageUrl:{
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty:{msg: 'Image Url/Link cannot be empty'},
        notNull: {msg: 'Image Url/Link cannot be null'}
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty:{msg: 'Category cannot be empty'},
        notNull: {msg: 'Category cannot be null'}
      }
    }
  }, {
    sequelize,
    modelName: 'Medicine',
  });
  return Medicine;
};