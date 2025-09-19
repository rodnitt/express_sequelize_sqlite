'use strict';
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
      User.hasMany(models.Task, { foreignKey: 'responsibleId' });
      User.belongsToMany(models.Project, { 
        through: 'ProjectUsers',
        foreignKey: 'userId'
      });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: [3, 30], msg: 'Name must be between 3 and 30 characters long' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Invalid email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: ['id', 'name', 'email', 'password']
    }
  });
  return User;
};