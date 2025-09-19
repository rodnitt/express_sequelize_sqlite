const Controller = require('./Controller.js');
const userServices = new (require('../services/UserServices.js'))();

class UserController extends Controller {
  constructor() {
    super(userServices);
  }
}

module.exports = UserController;