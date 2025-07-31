import React, { useState } from 'react';
import { CheckCircle, XCircle, User } from 'lucide-react';

interface FacialRecognitionProps {
  onVerified: (verified: boolean) => void;
}

const FacialRecognition: React.FC<FacialRecognitionProps> = ({ onVerified }) => {
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  
  const startVerification = () => {
    setVerificationStatus('scanning');
    setProgress(0);
    
    // Simulate the verification process
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setVerificationStatus('success');
          onVerified(true);
          return 100;
        }
        
        return newProgress;
      });
    }, 60);
    
    return () => clearInterval(interval);
  };
  
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">Facial Recognition</h3>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col items-center">
          {verificationStatus === 'idle' && (
            <div className="text-center mb-6">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-4">
                We need to verify your identity before you can start the exam
              </p>
              <button
                onClick={startVerification}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Start Verification
              </button>
            </div>
          )}
          
          {verificationStatus === 'scanning' && (
            <div className="text-center mb-6 w-full">
              <div className="relative h-24 w-24 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
                <div 
                  className="absolute bottom-0 bg-blue-500 w-full transition-all duration-300 ease-out"
                  style={{ height: `${progress}%` }}
                ></div>
              </div>
              
              <p className="text-blue-600 font-medium mb-4">
                Scanning your face...
              </p>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">{progress}% complete</p>
            </div>
          )}
          
          {verificationStatus === 'success' && (
            <div className="text-center mb-6">
              <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-lg font-medium text-green-700 mb-1">Verification Successful</h3>
              <p className="text-gray-600">Your identity has been confirmed</p>
            </div>
          )}
          
          {verificationStatus === 'error' && (
            <div className="text-center mb-6">
              <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <XCircle className="h-12 w-12 text-red-500" />
              </div>
              <h3 className="text-lg font-medium text-red-700 mb-1">Verification Failed</h3>
              <p className="text-gray-600 mb-4">We couldn't verify your identity. Please try again.</p>
              <button
                onClick={startVerification}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacialRecognition;