const dataSource = require('../database/models');

const Services = require('./Services.js');
const UserServices = require('./UserServices.js');
const ProjectServices = require('./ProjectServices.js');
const ProjectUserServices = require('./ProjectUsersServices.js');

const userServices = new UserServices();
const projectServices = new ProjectServices();
const projectUserServices = new ProjectUserServices();

class TaskServices extends Services {
  constructor() {
    super('Task');
  }

  async assignResponsible(taskId, userData) {
    const { userId, userEmail } = userData;
    const task = await dataSource[this.model]
      .scope('includeDeleted')
      .findByPk(taskId, { rejectOnEmpty: true });
    const { projectId } = task;

    const user = await userServices.getUserByIdOrEmail(userData);
    if (!user && (userId || userEmail))
      throw new Error('User not found');
    else if (!user) {
      await task.setResponsible(null);
      return { message: `Task ${task.title} is no longer assigned by anyone` };
    }

    const entry = await projectUserServices.getOne({ where: { userId: user.id, projectId } });
    if (entry == null)
      throw new Error(`Assignment denied. User ${user.name} is not collaborator of the project`);
    await task.setResponsible(user);
    return { message: `User ${user.name} has been assigned to task ${task.title}` };
  }

  async restore(id) {
    return await dataSource[this.model].restore({
      where: { id }
    })
  }
}

module.exports = TaskServices;