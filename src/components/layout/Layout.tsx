import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useExam } from '../../contexts/ExamContext';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const { state } = useExam();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!state.isAuthenticated) {
      navigate('/');
    }
  }, [state.isAuthenticated, navigate]);

  if (!state.isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;