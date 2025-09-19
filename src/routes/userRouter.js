const { Router } = require('express');
const UserController = require('../controllers/UserController.js');

const router = new Router();
const userController = new UserController();

router.get('/user/list', (req, res) => userController.getAll(req, res));
router.get('/user/:id', (req, res) => userController.getById(req, res));
router.post('/user', (req, res) => userController.create(req, res));
router.put('/user/:id', (req, res) => userController.update(req, res));
router.delete('/user/:id', (req, res) => userController.delete(req, res));

module.exports = router;