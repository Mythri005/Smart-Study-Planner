import React, { useState, useEffect } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

const TaskFilter = ({ onFilterChange, subjects }) => {
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    subject: '',
    sortBy: 'deadline',
    sortOrder: 'asc',
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      status: '',
      priority: '',
      subject: '',
      sortBy: 'deadline',
      sortOrder: 'asc',
    };
    setFilters(clearedFilters);
    setShowAdvanced(false);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.status || filters.priority || filters.subject || filters.sortBy !== 'deadline';

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FiFilter className="text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Filter Tasks</h3>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="px-3 py-1 text-sm text-primary-600 hover:text-primary-800"
          >
            {showAdvanced ? 'Hide Advanced' : 'Advanced Filters'}
          </button>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="flex items-center space-x-1 px-3 py-1 text-sm text-red-600 hover:text-red-800"
            >
              <FiX size={16} />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <select
            value={filters.subject}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-md font-semibold text-gray-700 mb-4">Sorting Options</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="deadline">Deadline</option>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
                <option value="subject">Subject</option>
                <option value="created_at">Created Date</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort Order
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleFilterChange('sortOrder', 'asc')}
                  className={`flex-1 px-4 py-2 rounded-lg border ${
                    filters.sortOrder === 'asc'
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Ascending
                </button>
                <button
                  type="button"
                  onClick={() => handleFilterChange('sortOrder', 'desc')}
                  className={`flex-1 px-4 py-2 rounded-lg border ${
                    filters.sortOrder === 'desc'
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Descending
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {filters.status && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                Status: {filters.status}
                <button
                  onClick={() => handleFilterChange('status', '')}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
            {filters.priority && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                Priority: {filters.priority}
                <button
                  onClick={() => handleFilterChange('priority', '')}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
            {filters.subject && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                Subject: {filters.subject}
                <button
                  onClick={() => handleFilterChange('subject', '')}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFilter;