import React, { useState } from 'react';
import { Camera, CheckCircle, AlertTriangle } from 'lucide-react';

interface EnvironmentScanProps {
  onScanComplete: (success: boolean) => void;
}

const EnvironmentScan: React.FC<EnvironmentScanProps> = ({ onScanComplete }) => {
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'warning'>('idle');
  const [progress, setProgress] = useState(0);
  const [warnings, setWarnings] = useState<string[]>([]);

  const startScan = () => {
    setScanStatus('scanning');
    setProgress(0);
    setWarnings([]);
    
    // Simulate the scanning process
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;
        
        // Simulated warnings at certain points
        if (newProgress === 35) {
          setWarnings(prev => [...prev, "Low lighting detected"]);
        }
        
        if (newProgress === 75) {
          setWarnings(prev => [...prev, "Other objects detected in frame"]);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          if (warnings.length === 0) {
            setScanStatus('success');
            onScanComplete(true);
          } else {
            setScanStatus('warning');
            onScanComplete(true);
          }
          return 100;
        }
        
        return newProgress;
      });
    }, 100);
    
    return () => clearInterval(interval);
  };
  
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">Environment Scan</h3>
      </div>
      
      <div className="p-6">
        {scanStatus === 'idle' && (
          <div className="text-center mb-6">
            <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Camera className="h-12 w-12 text-blue-400" />
            </div>
            <p className="text-gray-600 mb-4">
              We need to scan your environment to ensure exam integrity
            </p>
            <button
              onClick={startScan}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start Scan
            </button>
          </div>
        )}
        
        {scanStatus === 'scanning' && (
          <div className="text-center mb-6 w-full">
            <div className="w-full max-w-md mx-auto h-40 bg-gray-900 relative mb-4 rounded">
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <Camera className="h-10 w-10 opacity-20" />
              </div>
              
              <div 
                className="absolute left-0 top-0 bottom-0 bg-blue-500 bg-opacity-20 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <p className="text-blue-600 font-medium mb-4">
              Scanning your environment...
            </p>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">{progress}% complete</p>
            
            {warnings.length > 0 && (
              <div className="mt-4 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-md text-left">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">Warnings</h3>
                    <div className="mt-2 text-sm text-amber-700">
                      <ul className="list-disc pl-5 space-y-1">
                        {warnings.map((warning, index) => (
                          <li key={index}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {scanStatus === 'success' && (
          <div className="text-center mb-6">
            <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h3 className="text-lg font-medium text-green-700 mb-1">Environment Scan Complete</h3>
            <p className="text-gray-600">Your environment meets examination requirements</p>
          </div>
        )}
        
        {scanStatus === 'warning' && (
          <div className="text-center mb-6">
            <div className="h-24 w-24 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-12 w-12 text-amber-500" />
            </div>
            <h3 className="text-lg font-medium text-amber-700 mb-1">Environment Scan Complete</h3>
            <p className="text-gray-600 mb-2">Some issues were detected:</p>
            
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-md text-left my-4">
              <ul className="list-disc pl-5 space-y-1 text-sm text-amber-700">
                {warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
            
            <p className="text-gray-600 mb-4">Please address these issues and try again, or continue with warnings.</p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={startScan}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Rescan
              </button>
              <button
                onClick={() => onScanComplete(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue Anyway
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnvironmentScan;