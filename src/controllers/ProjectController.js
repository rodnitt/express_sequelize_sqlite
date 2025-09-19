const Controller = require('./Controller.js');
const ProjectServices = require('../services/ProjectServices.js');
const UsersServices = require('../services/UserServices.js');

const projectServices = new ProjectServices();
const userServices = new UsersServices();

class ProjectController extends Controller {
  constructor() {
    super(projectServices);
  }

  async getUsers(req, res) {
    try {
      const countedUsers = await projectServices.getCountedUsers(req.params);
      return res.status(200).json(countedUsers);
    }
    catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async assignUser(req, res) {
    const { projectId } = req.params;
    const { userId, userEmail, role } = req.query;
    try {
      const user = await userServices.getUserByIdOrEmail({ userId, userEmail });
      if (!user)
        return res.status(404).json({ message: 'User not found or missing data' });

      await projectServices.assignUser(projectId, user, role);
      if (role)
        return res.status(200).json({ message: `The user ${user.name} has been assigned to project as ${role}` });
      else return res.status(200).json({ message: `The user ${user.name} has been assigned to project` });
    }
    catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async unassignUser(req, res) {
    const { projectId } = req.params;
    const { userId, userEmail } = req.query;
    try {
      const user = await userServices.getUserByIdOrEmail({ userId, userEmail });
      if (!user)
        return res.status(404).json({ message: 'User not found or missing data' });

      await projectServices.unassignUser(projectId, user);
      return res.status(200).json({ message: `The user ${user.name} has been removed from project` });
    }
    catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = ProjectController;