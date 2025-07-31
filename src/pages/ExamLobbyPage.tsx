import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, Monitor, ShieldCheck, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useExam } from '../contexts/ExamContext';

const ExamLobbyPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const { state, startExam } = useExam();
  const navigate = useNavigate();
  
  const [systemChecks, setSystemChecks] = useState({
    camera: 'pending',
    microphone: 'pending',
    browser: 'pending',
    environment: 'pending',
  });
  
  const [hasAgreed, setHasAgreed] = useState(false);
  const [isCheckingSystem, setIsCheckingSystem] = useState(false);
  const [allChecksPassed, setAllChecksPassed] = useState(false);

  useEffect(() => {
    // Simulating system checks
    const runSystemChecks = async () => {
      setIsCheckingSystem(true);
      
      // Camera check
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSystemChecks(prev => ({ ...prev, camera: 'success' }));
      
      // Microphone check
      await new Promise(resolve => setTimeout(resolve, 1200));
      setSystemChecks(prev => ({ ...prev, microphone: 'success' }));
      
      // Browser check
      await new Promise(resolve => setTimeout(resolve, 800));
      setSystemChecks(prev => ({ ...prev, browser: 'success' }));
      
      // Environment check
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSystemChecks(prev => ({ ...prev, environment: 'success' }));
      
      setIsCheckingSystem(false);
    };
    
    runSystemChecks();
  }, []);
  
  useEffect(() => {
    // Check if all system checks passed
    const allPassed = Object.values(systemChecks).every(status => status === 'success');
    setAllChecksPassed(allPassed);
  }, [systemChecks]);

  const handleStartExam = async () => {
    try {
      await startExam(examId || '');
      navigate(`/exam-room/${examId}`);
    } catch (error) {
      console.error('Failed to start exam:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'success') return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (status === 'error') return <XCircle className="h-5 w-5 text-red-500" />;
    return <AlertCircle className="h-5 w-5 text-yellow-500" />;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Exam Preparation</h1>
        <p className="text-gray-600">Complete the required checks before starting your exam</p>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">System Requirements Check</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Camera className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-700">Camera Access</span>
              </div>
              {getStatusIcon(systemChecks.camera)}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span className="text-gray-700">Microphone Access</span>
              </div>
              {getStatusIcon(systemChecks.microphone)}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Monitor className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-700">Browser Compatibility</span>
              </div>
              {getStatusIcon(systemChecks.browser)}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 text-gray-600 mr-3" />
                <span className="text-gray-700">Environment Scan</span>
              </div>
              {getStatusIcon(systemChecks.environment)}
            </div>
          </div>

          {isCheckingSystem && (
            <div className="mt-6">
              <div className="animate-pulse flex space-x-4 items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <div className="flex-1 text-sm text-blue-600">
                  Running system checks...
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">Exam Guidelines</h2>
        </div>
        
        <div className="p-6">
          <div className="prose prose-sm text-gray-700">
            <p>Before starting the exam, please review and agree to the following guidelines:</p>
            
            <ul className="space-y-2 mt-4">
              <li>You must remain visible on camera throughout the entire exam.</li>
              <li>No unauthorized materials, notes, or devices are allowed.</li>
              <li>Looking away from the screen for extended periods may be flagged.</li>
              <li>Speaking or communicating with others is prohibited.</li>
              <li>Leaving the exam area will result in a violation.</li>
              <li>Browser navigation away from the exam is not permitted.</li>
              <li>Your exam session will be recorded and may be reviewed.</li>
            </ul>
            
            <div className="mt-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  checked={hasAgreed}
                  onChange={() => setHasAgreed(!hasAgreed)}
                />
                <span className="ml-2 text-gray-700">
                  I have read and agree to the exam guidelines and policies
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleStartExam}
          disabled={!allChecksPassed || !hasAgreed}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Start Exam
        </button>
      </div>
    </div>
  );
};

export default ExamLobbyPage;