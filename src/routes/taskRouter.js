const { Router } = require('express');
const TaskController = require('../controllers/TaskController.js');

const router = new Router();
const taskController = new TaskController();

router.get('/task/:projectId/all', (req, res) => taskController.getAll(req, res));
router.get('/task/:id', (req, res) => taskController.getById(req, res));
router.post('/task/:projectId', (req, res) => taskController.createInProject(req, res));
router.put('/task/:id/assign', (req, res) => taskController.assignResponsible(req, res));
router.put('/task/:id/restore', (req, res) => taskController.restore(req, res));
router.put('/task/:id', (req, res) => taskController.update(req, res));
router.delete('/task/:id', (req, res) => taskController.delete(req, res));

module.exports = router;