'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.hasMany(models.Task, { foreignKey: 'projectId' });
      Project.belongsToMany(models.User, {
        through: 'ProjectUsers',
        foreignKey: 'projectId'
      });
    }
  }
  Project.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [3, 30] }
    },
    summary: DataTypes.TEXT,
    startDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: { msg: 'Start date needs to be a date' }
      }
    },
    dueDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: { msg: 'Due date needs to be a date' }
      }
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};