import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ExamProvider } from './contexts/ExamContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ExamLobbyPage from './pages/ExamLobbyPage';
import ExamRoomPage from './pages/ExamRoomPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <ExamProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/exam-lobby/:examId" element={<ExamLobbyPage />} />
            <Route path="/exam-room/:examId" element={<ExamRoomPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ExamProvider>
    </Router>
  );
}

export default App;