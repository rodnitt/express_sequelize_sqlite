const { Router } = require('express');
const ProjectController = require('../controllers/ProjectController.js');
const TaskController = require('../controllers/TaskController.js');

const router = new Router();
const projectController = new ProjectController();
const taskController = new TaskController();

router.get('/project/list', (req, res) => projectController.getAll(req, res));
router.get('/project/:projectId/users', (req, res) => projectController.getUsers(req, res));
router.get('/project/:projectId/tasks', (req, res) => taskController.getAll(req, res));
router.get('/project/:id', (req, res) => projectController.getById(req, res));
router.post('/project', (req, res) => projectController.create(req, res));
router.put('/project/:projectId/assign', (req, res) => projectController.assignUser(req, res));
router.put('/project/:projectId/unassign', (req, res) => projectController.unassignUser(req, res));
router.put('/project/:id', (req, res) => projectController.update(req, res));
router.delete('/project/:id', (req, res) => projectController.delete(req, res));

module.exports = router;