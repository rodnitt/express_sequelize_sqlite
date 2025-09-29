const conversor = require('../utils/IdStoNHelper.js');

class Controller {
  constructor(service) {
    this.service = service;
  }

  // async getAll(req, res) {
  //   try {
  //     const entries = await this.service.getAll();
  //     return res.status(200).json(entries);
  //   }
  //   catch (err) {
  //     return res.status(500).json({ error: err.message });
  //   }
  // }

  async getAll(req, res) {
    const { ...params } = req.params;
    const where = conversor(params);
    try {
      const entries = await this.service.getAll({ where });
      return res.status(200).json(entries);
    }
    catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const entry = await this.service.getByPk(Number(id));
      return res.status(200).json(entry);
    }
    catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getOne(req, res) {
    const { ...params } = req.params;
    const where = conversor(params);
    try {
      const entry = await this.service.getOne({ where });
      return res.status(200).json(entry);
    }
    catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    const { ...data } = req.body;
    try {
      const newEntry = await this.service.create(data);
      return res.status(200).json(newEntry);
    }
    catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async createInProject(req, res) {
    const { ...data } = req.body;
    data.projectId = req.params.projectId;
    try {
      const newEntry = await this.service.create(data);
      return res.status(200).json(newEntry);
    }
    catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    const { ...params } = req.params;
    const newData = req.body;
    const where = conversor(params);
    try {
      const isUpdated = await this.service.update(newData, { where });

      if (isUpdated) {
        return res.status(200).json({ message: 'Successfully updated' });
      }
      else {
        return res.status(400).json({ message: 'Failed to update' });
      }
    }
    catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await this.service.delete(Number(id));
      return res.status(200).json({ message: `Entry ${id} deleted` });
    }
    catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = Controller;