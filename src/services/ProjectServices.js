const ProjectUsersServices = require('./ProjectUsersServices.js');
const Services = require('./Services.js');
const conversor = require('../utils/IdStoNHelper.js');
const dataSource = require('../database/models');

const projectUsersServices = new ProjectUsersServices();

class ProjectServices extends Services {
  constructor() {
    super('Project');
  }

  async getCountedUsers(data) {
    const where = conversor(data);
    return await projectUsersServices.getAndCountAll({
      include: {
        association: 'User',
        attributes: ['name', 'email']
      },
      where,
      attributes: ['role', 'userId', ['createdAt', 'inProjectSince']]
    });
  }

  async assignUser(projectId, user, role) {
    dataSource.sequelize.transaction(async (transaction) => {
      const options = {
        where: { projectId, userId: user.id },
        transaction
      };
      if (role) options.defaults = { role };
      const [entry, _] = await projectUsersServices.getOrCreate(options);
      if (role && entry.role != role) await entry.update({ role }, { transaction });
    });
  }

  async unassignUser(projectId, user) {
    const proj = await this.getByPk(projectId, { attributes: ['id', 'name'] });
    const hasUser = await proj.hasUser(user);

    if (!hasUser)
      throw new Error(`There is no user ${user.name} in project ${proj.name}`);
    await proj.removeUser(user);
  }
}

module.exports = ProjectServices;