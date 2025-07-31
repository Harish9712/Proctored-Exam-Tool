import React from 'react';
import { Link } from 'react-router-dom';
import { useExam } from '../contexts/ExamContext';
import { Shield } from 'lucide-react';

const NotFoundPage = () => {
  const { state } = useExam();

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Shield className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Page Not Found
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 text-center">
          <Link
            to={state.isAuthenticated ? "/dashboard" : "/"}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {state.isAuthenticated ? "Go to Dashboard" : "Return to Login"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;