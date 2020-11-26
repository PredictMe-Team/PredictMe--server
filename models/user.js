'use strict';
const {hashing}  = require('../helpers/bcrypt');
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
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `With email you can do anything :)`
        },
        isEmail: {
          msg: `Is this the correct email?`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Ohh, your password is empty`
        },
        len: {
          args: [5],
          msg: `Try to create password more than 5 character`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, opt) => {
        console.log(hashing(user.password));
        user.password = hashing(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};