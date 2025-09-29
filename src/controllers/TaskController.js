const { Op } = require('sequelize');

const Controller = require('./Controller.js');
const conversor = require('../utils/IdStoNHelper.js');

const taskServices = new (require('../services/TaskServices.js'))();
const userServices = new (require('../services/UserServices.js'))();
const projServices = new (require('../services/ProjectServices.js'))();

class TaskController extends Controller {
  constructor() {
    super(taskServices);
  }

  async getAll(req, res) {
    const { ...params } = req.params;
    const where = conversor(params);
    const { initial, final, includeDeleted } = req.query;

    if (initial || final) where.dueDate = {};
    if (initial) where.dueDate[Op.gte] = initial;
    if (final) where.dueDate[Op.lte] = final;

    const paranoid = includeDeleted === undefined;

    try {
      const entries = await this.service.getAll({ where, paranoid });
      return res.status(200).json(entries);
    }
    catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async assignResponsible(req, res) {
    try {
      const { id } = req.params;
      const result = await taskServices.assignResponsible(id, req.query);
      return res.status(200).json(result);
    }
    catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getProgressInProject(req, res) {
    try {
      const { projectId } = req.params;
      const result = [];
      const statuses = ['backlog', 'in progress', 'completed'];
      for (let i of [0, 1, 2]) {
        result[i] = await taskServices.count({
          where: {
            projectId,
            status: statuses[i]
          }
        });
      }
      return res.status(200).json(result);
    }
    catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async restore(req, res) {
    try {
      const { id } = req.params;
      await taskServices.restore(id);
      return res.status(200).json({ message: 'Task restored' });
    }
    catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = TaskController;