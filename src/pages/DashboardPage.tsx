import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, FileText, AlertTriangle } from 'lucide-react';
import { useExam } from '../contexts/ExamContext';

interface Exam {
  id: string;
  title: string;
  course: string;
  date: string;
  duration: number;
  status: 'upcoming' | 'available' | 'completed';
}

const DashboardPage = () => {
  const { state, startExam } = useExam();
  const navigate = useNavigate();
  
  // Mock exams data
  const mockExams: Exam[] = [
    {
      id: '1',
      title: 'Introduction to Computer Science',
      course: 'CS101',
      date: '2025-05-15T10:00:00',
      duration: 120,
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Data Structures and Algorithms',
      course: 'CS201',
      date: '2025-05-10T14:00:00',
      duration: 180,
      status: 'available',
    },
    {
      id: '3',
      title: 'Database Systems',
      course: 'CS301',
      date: '2025-05-05T09:00:00',
      duration: 90,
      status: 'completed',
    },
  ];

  const handleStartExam = async (examId: string) => {
    try {
      navigate(`/exam-lobby/${examId}`);
    } catch (error) {
      console.error('Failed to start exam:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {state.user?.name}</h1>
        <p className="text-gray-600 mt-1">Here are your upcoming and available exams</p>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Your Exams</h2>
          <div className="space-y-6">
            {mockExams.map((exam) => (
              <div 
                key={exam.id} 
                className={`bg-gray-50 rounded-lg p-4 border-l-4 ${
                  exam.status === 'available' 
                    ? 'border-green-500' 
                    : exam.status === 'upcoming' 
                    ? 'border-blue-500' 
                    : 'border-gray-300'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{exam.title}</h3>
                    <p className="text-gray-600 text-sm">{exam.course}</p>
                    
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(exam.date)}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{exam.duration} minutes</span>
                    </div>

                    {exam.status === 'available' && (
                      <div className="flex items-center mt-2 text-sm text-green-600">
                        <FileText className="h-4 w-4 mr-1" />
                        <span>Available now</span>
                      </div>
                    )}

                    {exam.status === 'upcoming' && (
                      <div className="flex items-center mt-2 text-sm text-blue-600">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        <span>Upcoming</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    {exam.status === 'available' && (
                      <button
                        onClick={() => handleStartExam(exam.id)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Start Exam
                      </button>
                    )}

                    {exam.status === 'upcoming' && (
                      <span className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white">
                        Not Available Yet
                      </span>
                    )}

                    {exam.status === 'completed' && (
                      <span className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white">
                        View Results
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
        <h2 className="text-lg font-medium text-blue-800 mb-2">Preparing for your exam</h2>
        <ul className="space-y-2 text-sm text-blue-700">
          <li className="flex items-start">
            <span className="h-5 w-5 mr-2 flex-shrink-0">•</span>
            <span>Ensure your webcam and microphone are working properly</span>
          </li>
          <li className="flex items-start">
            <span className="h-5 w-5 mr-2 flex-shrink-0">•</span>
            <span>Find a quiet, well-lit environment without distractions</span>
          </li>
          <li className="flex items-start">
            <span className="h-5 w-5 mr-2 flex-shrink-0">•</span>
            <span>Have your ID ready for verification</span>
          </li>
          <li className="flex items-start">
            <span className="h-5 w-5 mr-2 flex-shrink-0">•</span>
            <span>Close all unnecessary applications and browser tabs</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;