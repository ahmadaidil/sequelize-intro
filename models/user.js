'use strict';

const hashPassword = require('../helpers/hashPassword');
const saltGenerate = require('../helpers/saltGenerator');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Username not null"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password not null"
        }
      }
    },
    role: DataTypes.STRING,
    private_key: {
      type: DataTypes.STRING,
      unique: {
        msg: "privateKey already used"
      },
      validate: {
        notEmpty: {
          msg: "privateKey not null"
        }
      }
    }
  });

  user.beforeCreate((user) => {
    let salt = saltGenerate();
    let hashPw = hashPassword(salt, user.password);
    user.private_key = salt;
    user.password = hashPw;
  });

  return user;
};
