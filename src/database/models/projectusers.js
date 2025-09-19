'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProjectUsers.belongsTo(models.Project, {
        foreignKey: 'projectId'
      });
      ProjectUsers.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  ProjectUsers.init({
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'viewer'
    }
  }, {
    sequelize,
    modelName: 'ProjectUsers',
  });
  return ProjectUsers;
};