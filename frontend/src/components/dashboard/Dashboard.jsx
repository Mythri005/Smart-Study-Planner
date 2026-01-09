import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiClock, FiAlertTriangle, FiTrendingUp } from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, tasksResponse] = await Promise.all([
        api.get('/tasks/stats'),
        api.get('/tasks?status=Pending&limit=5'),
      ]);
      
      setStats(statsResponse.stats);
      setRecentTasks(tasksResponse.tasks);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats?.total || 0,
      icon: <FiCheckCircle className="w-6 h-6" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Completed',
      value: stats?.completed || 0,
      icon: <FiCheckCircle className="w-6 h-6" />,
      color: 'bg-green-500',
    },
    {
      title: 'Overdue',
      value: stats?.overdue || 0,
      icon: <FiAlertTriangle className="w-6 h-6" />,
      color: 'bg-red-500',
    },
    {
      title: 'High Priority',
      value: stats?.highPriorityPending || 0,
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: 'bg-yellow-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Pending Tasks</h2>
          <span className="text-gray-500">{recentTasks.length} tasks</span>
        </div>

        {recentTasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No pending tasks</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-gray-600">Title</th>
                  <th className="text-left py-3 px-4 text-gray-600">Subject</th>
                  <th className="text-left py-3 px-4 text-gray-600">Priority</th>
                  <th className="text-left py-3 px-4 text-gray-600">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map((task) => (
                  <tr key={task.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{task.title}</td>
                    <td className="py-3 px-4">{task.subject}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        task.priority === 'High' ? 'bg-red-100 text-red-800' :
                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">{new Date(task.deadline).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;