import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FiPlus, FiFilter } from 'react-icons/fi';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({});
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchTasks();
    extractSubjects();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/tasks${queryParams ? `?${queryParams}` : ''}`);
      setTasks(response.tasks);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const extractSubjects = () => {
    const uniqueSubjects = [...new Set(tasks.map(task => task.subject))];
    setSubjects(uniqueSubjects);
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      setTasks([response.task, ...tasks]);
      setShowForm(false);
      toast.success('Task created successfully!');
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const response = await api.put(`/tasks/${id}`, updates);
      setTasks(tasks.map(task => task.id === id ? response.task : task));
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Study Tasks</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
        >
          <FiPlus size={20} />
          <span>Add New Task</span>
        </button>
      </div>

      <div className="mb-6">
        <TaskFilter onFilterChange={handleFilterChange} subjects={subjects} />
      </div>

      {showForm && (
        <div className="mb-8">
          <TaskForm onSubmit={handleCreateTask} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">No tasks found. Create your first task!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;