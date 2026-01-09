import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiLogOut, FiUser, FiHome, FiList } from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg"></div>
            <span className="text-2xl font-bold text-gray-800">Smart Study Planner</span>
          </Link>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <div className="flex items-center space-x-4">
                  <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-primary-500">
                    <FiHome size={20} />
                    <span>Dashboard</span>
                  </Link>
                  <Link to="/tasks" className="flex items-center space-x-1 text-gray-700 hover:text-primary-500">
                    <FiList size={20} />
                    <span>Tasks</span>
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <FiUser className="text-primary-600" />
                    </div>
                    <span className="text-gray-700">{user.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-800"
                  >
                    <FiLogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="px-4 py-2 text-primary-600 hover:text-primary-800">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;