const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { validateTask, validate } = require('../middleware/validation');
const auth = require('../middleware/auth');

// All task routes require authentication
router.use(auth);

// CRUD operations
router.post('/', validateTask, validate, taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/stats', taskController.getStats);
router.get('/:id', taskController.getTaskById);
router.put('/:id', validateTask, validate, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;