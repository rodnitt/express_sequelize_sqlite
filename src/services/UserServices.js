const Services = require('./Services.js');

class UserServices extends Services {
  constructor() {
    super('User');
  }

  async getUserByIdOrEmail({ userId, userEmail }) {
    let user = null;
    if (userId)
      user = await this.getByPk(userId);
    if (!user && userEmail)
      user = await this.getOne({ where: { email: userEmail } });
    return user;
  }
}

module.exports = UserServices;