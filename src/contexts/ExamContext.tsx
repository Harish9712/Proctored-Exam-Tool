import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'proctor' | 'admin';
}

interface ExamState {
  isAuthenticated: boolean;
  user: User | null;
  currentExam: any | null;
  proctorSettings: {
    facialRecognition: boolean;
    environmentScan: boolean;
    browserLock: boolean;
    aiMonitoring: boolean;
    recording: boolean;
  };
}

interface ExamContextType {
  state: ExamState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  startExam: (examId: string) => Promise<void>;
  endExam: () => void;
  toggleProctorSetting: (setting: keyof ExamState['proctorSettings']) => void;
}

const defaultState: ExamState = {
  isAuthenticated: false,
  user: null,
  currentExam: null,
  proctorSettings: {
    facialRecognition: true,
    environmentScan: true,
    browserLock: true,
    aiMonitoring: true,
    recording: true,
  },
};

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export function ExamProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ExamState>(defaultState);

  const login = async (email: string, password: string) => {
    // Mock login - in a real app this would call an API
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: '123',
        name: email.split('@')[0],
        email,
        role: email.includes('admin') ? 'admin' : email.includes('proctor') ? 'proctor' : 'student',
      };
      
      setState({
        ...state,
        isAuthenticated: true,
        user: mockUser,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Authentication failed');
    }
  };

  const logout = () => {
    setState(defaultState);
  };

  const startExam = async (examId: string) => {
    // Mock API call to start exam
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setState({
        ...state,
        currentExam: {
          id: examId,
          title: 'Sample Exam',
          duration: 120, // in minutes
          startTime: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Failed to start exam:', error);
      throw new Error('Failed to start exam');
    }
  };

  const endExam = () => {
    setState({
      ...state,
      currentExam: null,
    });
  };

  const toggleProctorSetting = (setting: keyof ExamState['proctorSettings']) => {
    setState({
      ...state,
      proctorSettings: {
        ...state.proctorSettings,
        [setting]: !state.proctorSettings[setting],
      },
    });
  };

  const value = {
    state,
    login,
    logout,
    startExam,
    endExam,
    toggleProctorSetting,
  };

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
}

export function useExam() {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
}