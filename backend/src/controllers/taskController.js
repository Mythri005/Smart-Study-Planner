const StudyTask = require('../models/StudyTask');

exports.createTask = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      user_id: req.user.id
    };
    
    const taskId = await StudyTask.create(taskData);
    const task = await StudyTask.findById(taskId, req.user.id);
    
    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const filters = {};
    
    if (req.query.status) filters.status = req.query.status;
    if (req.query.priority) filters.priority = req.query.priority;
    if (req.query.subject) filters.subject = req.query.subject;
    
    const tasks = await StudyTask.findAllByUser(req.user.id, filters);
    res.json({ tasks });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await StudyTask.findById(req.params.id, req.user.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ task });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updated = await StudyTask.update(
      req.params.id,
      req.user.id,
      req.body
    );
    
    if (!updated) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const task = await StudyTask.findById(req.params.id, req.user.id);
    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deleted = await StudyTask.delete(req.params.id, req.user.id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await StudyTask.getStats(req.user.id);
    res.json({ stats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};