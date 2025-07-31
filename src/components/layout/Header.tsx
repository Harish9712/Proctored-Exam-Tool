import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ChevronDown, LogOut, User } from 'lucide-react';
import { useExam } from '../../contexts/ExamContext';

const Header = () => {
  const { state, logout } = useExam();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">PET</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
            {state.user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Admin Panel
              </Link>
            )}
            {state.user?.role === 'proctor' && (
              <Link to="/admin" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Proctor Console
              </Link>
            )}
          </nav>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <span>{state.user?.name}</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;