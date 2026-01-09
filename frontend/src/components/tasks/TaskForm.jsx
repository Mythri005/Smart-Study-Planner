import React, { useState, useEffect } from 'react';
import { FiX, FiCalendar } from 'react-icons/fi';

const TaskForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    deadline: '',
    priority: 'Medium',
    status: 'Pending',
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        subject: initialData.subject || '',
        deadline: initialData.deadline ? initialData.deadline.split('T')[0] : '',
        priority: initialData.priority || 'Medium',
        status: initialData.status || 'Pending',
      });
      setIsEditing(true);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    } else {
      const selectedDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.deadline = 'Deadline cannot be in the past';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Format the data for submission
    const submissionData = {
      ...formData,
      deadline: formData.deadline,
    };
    
    onSubmit(submissionData);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const subjectSuggestions = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'Computer Science', 'English', 'History', 'Geography',
    'Economics', 'Business', 'Psychology', 'Art',
    'Music', 'Physical Education', 'Other'
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditing ? 'Edit Task' : 'Create New Task'}
        </h2>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <FiX size={24} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Complete Calculus Assignment"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <div className="relative">
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              list="subject-suggestions"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.subject ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Mathematics"
            />
            <datalist id="subject-suggestions">
              {subjectSuggestions.map((subject) => (
                <option key={subject} value={subject} />
              ))}
            </datalist>
          </div>
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Start typing to see suggestions or enter a custom subject
          </p>
        </div>

        {/* Deadline Field */}
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
            Deadline *
          </label>
          <div className="relative">
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              min={getTodayDate()}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.deadline ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {errors.deadline && (
            <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>
          )}
          {formData.deadline && !errors.deadline && (
            <p className="mt-1 text-sm text-gray-500">
              Selected: {new Date(formData.deadline).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          )}
        </div>

        {/* Priority and Status Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <div className="space-y-2">
              {['High', 'Medium', 'Low'].map((priority) => (
                <label
                  key={priority}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.priority === priority
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={formData.priority === priority}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-3 text-gray-700">{priority}</span>
                  <div className={`ml-auto w-3 h-3 rounded-full ${
                    priority === 'High' ? 'bg-red-500' :
                    priority === 'Medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}></div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="space-y-2">
              {['Pending', 'Completed'].map((status) => (
                <label
                  key={status}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.status === status
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={formData.status === status}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-3 text-gray-700">{status}</span>
                  <div className={`ml-auto w-3 h-3 rounded-full ${
                    status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            {isEditing ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;