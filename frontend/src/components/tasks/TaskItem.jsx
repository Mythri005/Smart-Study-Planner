import React, { useState } from 'react';
import { format } from 'date-fns';
import { FiEdit2, FiTrash2, FiCalendar, FiBook } from 'react-icons/fi';
import TaskForm from './TaskForm';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500';
  };

  const handleUpdate = (updatedTask) => {
    onUpdate(task.id, updatedTask);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <TaskForm
          initialData={task}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
          <div className="flex items-center space-x-2 mt-2">
            <FiBook className="text-gray-500" />
            <span className="text-gray-600">{task.subject}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <FiEdit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-red-600 hover:text-red-800"
            title="Delete"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <FiCalendar />
          <span>Deadline: {format(new Date(task.deadline), 'MMM dd, yyyy')}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
          {task.priority} Priority
        </span>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`}></div>
          <span className="text-gray-600">{task.status}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;