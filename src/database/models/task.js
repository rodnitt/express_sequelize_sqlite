'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User, {
        as: 'responsible',
        foreignKey: 'responsibleId'
      });
      Task.belongsTo(models.Project, {
        foreignKey: 'projectId'
      });
    }
  }
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'backlog',
      validate: {
        isIn: [['backlog', 'in progress', 'completed']]
      }
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: { min: 0, max: 4 }
    },
    dueDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: { msg: 'Due date needs to be a date' }
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
    paranoid: true,
    defaultScope: {
      order: [['dueDate', 'ASC'], ['priority', 'DESC']]
    },
    scopes: {
      prioritized: {
        order: [['priority', 'DESC']]
      },
      chronologic: {
        order: [['dueDate', 'ASC']]
      },
      includeDeleted: {
        paranoid: false
      }
    }
  });
  return Task;
};