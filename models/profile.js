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
    get titledName(){
      if (this.gender === "Male") {
        return `Mr. ${this.name}`
      } else if (this.gender === "Female") {
        return `Mrs. ${this.name}`
      }
    }

    static async deductBalance(ProfileId,total){
      let currentBalance = await sequelize.models.Profile.findByPk(ProfileId)
      if (currentBalance.balance > total) {
        let newBalance = await sequelize.models.Profile.decrement('balance', {
          by: total,
          where: {
            id:ProfileId
          }
        })
      }
      
    }
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: 'UserId' })
      Profile.hasMany(models.Invoice, { foreignKey: 'ProfileId' })
    }
  }
  Profile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Name Cannot be Empty'},
        notNull: {msg: 'name Cannot be Null'}
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Age Cannot be Empty'},
        notNull: {msg: 'Age Cannot be Null'}
      }
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Profile Image Cannot be Empty'},
        notNull: {msg: 'Profile Image Cannot be Null'}
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Gender Cannot be Empty'},
        notNull: {msg: 'Gender Cannot be Null'}
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'UserId Cannot be Empty'},
        notNull: {msg: 'UserId Cannot be Null'}
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Balance Cannot be Empty'},
        notNull: {msg: 'Balance Cannot be Null'}
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Address Cannot be Empty'},
        notNull: {msg: 'Address Cannot be Null'}
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};