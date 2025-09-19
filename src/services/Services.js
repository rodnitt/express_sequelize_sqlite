const dataSource = require('../database/models');

class Services {
  constructor(modelName) {
    this.model = modelName;
  }

  async getAll(options = {}) {
    return dataSource[this.model].findAll(options);
  }

  async getAndCountAll(options = {}) {
    return dataSource[this.model].findAndCountAll(options);
  }

  async getAllWhere(where) {
    return dataSource[this.model].findAll({ where: { ...where } });
  }

  async getByPk(pk, options = {}) {
    return dataSource[this.model].findByPk(pk, options);
  }

  async getOne(options) {
    return dataSource[this.model].findOne(options);
  }

  async getOrCreate(options = {}) {
    return dataSource[this.model].findOrCreate(options);
  }

  async create(data) {
    return dataSource[this.model].create(data);
  }

  async update(newData, options) {
    const updatedList = await dataSource[this.model]
      .update(newData, { ...options });
    if (updatedList[0] === 0) {
      return false;
    }
    return true;
  }

  async delete(id) {
    return dataSource[this.model].destroy({ where: { id: id } });
  }
}

module.exports = Services;