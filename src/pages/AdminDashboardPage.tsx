import React, { useState } from 'react';
import { useExam } from '../contexts/ExamContext';
import { Users, User, Clock, AlertTriangle, CheckCircle, Settings, Eye, Trash2 } from 'lucide-react';

const AdminDashboardPage = () => {
  const { state } = useExam();
  const [activeTab, setActiveTab] = useState('live');
  
  // Mock data for live exams
  const liveExams = [
    {
      id: '101',
      title: 'Introduction to Computer Science',
      course: 'CS101',
      startTime: new Date(Date.now() - 35 * 60000).toISOString(), // 35 minutes ago
      duration: 120,
      studentsTotal: 45,
      studentsActive: 42,
      flaggedIncidents: 3,
    },
    {
      id: '102',
      title: 'Data Structures and Algorithms',
      course: 'CS201',
      startTime: new Date(Date.now() - 65 * 60000).toISOString(), // 65 minutes ago
      duration: 180,
      studentsTotal: 38,
      studentsActive: 36,
      flaggedIncidents: 5,
    },
  ];
  
  // Mock data for upcoming exams
  const upcomingExams = [
    {
      id: '201',
      title: 'Database Systems',
      course: 'CS301',
      scheduledTime: new Date(Date.now() + 3 * 3600000).toISOString(), // 3 hours from now
      duration: 150,
      studentsEnrolled: 40,
    },
    {
      id: '202',
      title: 'Software Engineering',
      course: 'CS401',
      scheduledTime: new Date(Date.now() + 24 * 3600000).toISOString(), // Tomorrow
      duration: 120,
      studentsEnrolled: 35,
    },
    {
      id: '203',
      title: 'Computer Networks',
      course: 'CS302',
      scheduledTime: new Date(Date.now() + 48 * 3600000).toISOString(), // Day after tomorrow
      duration: 90,
      studentsEnrolled: 42,
    },
  ];
  
  // Mock data for flagged incidents
  const flaggedIncidents = [
    {
      id: '301',
      examTitle: 'Introduction to Computer Science',
      student: 'Alex Johnson',
      time: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
      type: 'Multiple faces detected',
      severity: 'high',
      status: 'pending',
    },
    {
      id: '302',
      examTitle: 'Introduction to Computer Science',
      student: 'Sam Miller',
      time: new Date(Date.now() - 22 * 60000).toISOString(), // 22 minutes ago
      type: 'Suspicious movement',
      severity: 'medium',
      status: 'reviewed',
    },
    {
      id: '303',
      examTitle: 'Data Structures and Algorithms',
      student: 'Jamie Smith',
      time: new Date(Date.now() - 40 * 60000).toISOString(), // 40 minutes ago
      type: 'Browser tab switched',
      severity: 'high',
      status: 'pending',
    },
    {
      id: '304',
      examTitle: 'Data Structures and Algorithms',
      student: 'Taylor Wilson',
      time: new Date(Date.now() - 45 * 60000).toISOString(), // 45 minutes ago
      type: 'Face not detected',
      severity: 'medium',
      status: 'pending',
    },
    {
      id: '305',
      examTitle: 'Data Structures and Algorithms',
      student: 'Jordan Lee',
      time: new Date(Date.now() - 50 * 60000).toISOString(), // 50 minutes ago
      type: 'Audio detected',
      severity: 'low',
      status: 'dismissed',
    },
  ];
  
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Calculate time remaining
  const getTimeRemaining = (startTime: string, durationMinutes: number) => {
    const start = new Date(startTime).getTime();
    const end = start + durationMinutes * 60 * 1000;
    const now = Date.now();
    const remaining = end - now;
    
    const minutes = Math.floor((remaining / 1000 / 60) % 60);
    const hours = Math.floor((remaining / 1000 / 60 / 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {state.user?.role === 'admin' ? 'Admin' : 'Proctor'} Dashboard
        </h1>
        <p className="text-gray-600 mt-1">Monitor and manage exams in real-time</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-start">
            <div className="bg-blue-100 rounded-full p-3 mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Students</p>
              <h3 className="text-2xl font-bold text-gray-900">78</h3>
              <p className="text-xs text-green-600 mt-1">+5% from last hour</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-start">
            <div className="bg-green-100 rounded-full p-3 mr-4">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Live Exams</p>
              <h3 className="text-2xl font-bold text-gray-900">{liveExams.length}</h3>
              <p className="text-xs text-blue-600 mt-1">{upcomingExams.length} upcoming today</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-start">
            <div className="bg-amber-100 rounded-full p-3 mr-4">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Flagged Incidents</p>
              <h3 className="text-2xl font-bold text-gray-900">{flaggedIncidents.filter(i => i.status === 'pending').length}</h3>
              <p className="text-xs text-amber-600 mt-1">Pending review</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('live')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'live'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Live Exams
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'upcoming'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Upcoming Exams
          </button>
          <button
            onClick={() => setActiveTab('flagged')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'flagged'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Flagged Incidents
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Live Exams */}
        {activeTab === 'live' && (
          <div>
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Live Exams</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exam Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time Remaining
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Flagged Incidents
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {liveExams.map((exam) => (
                    <tr key={exam.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{exam.title}</div>
                        <div className="text-sm text-gray-500">{exam.course}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatTime(exam.startTime)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{getTimeRemaining(exam.startTime, exam.duration)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{exam.studentsActive} / {exam.studentsTotal}</div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{ width: `${(exam.studentsActive / exam.studentsTotal) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {exam.flaggedIncidents > 0 ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            {exam.flaggedIncidents} incidents
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            No incidents
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Settings className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Upcoming Exams */}
        {activeTab === 'upcoming' && (
          <div>
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Upcoming Exams</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exam Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Scheduled Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {upcomingExams.map((exam) => (
                    <tr key={exam.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{exam.title}</div>
                        <div className="text-sm text-gray-500">{exam.course}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(exam.scheduledTime)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{exam.duration} min</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{exam.studentsEnrolled} enrolled</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 mr-4">
                          <Settings className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Flagged Incidents */}
        {activeTab === 'flagged' && (
          <div>
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Flagged Incidents</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exam
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Severity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {flaggedIncidents.map((incident) => (
                    <tr key={incident.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{incident.student}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{incident.examTitle}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatTime(incident.time)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{incident.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          incident.severity === 'high' 
                            ? 'bg-red-100 text-red-800' 
                            : incident.severity === 'medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {incident.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          incident.status === 'pending' 
                            ? 'bg-blue-100 text-blue-800' 
                            : incident.status === 'reviewed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {incident.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <Eye className="h-4 w-4" />
                        </button>
                        {incident.status === 'pending' && (
                          <>
                            <button className="text-green-600 hover:text-green-900 mr-3">
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;