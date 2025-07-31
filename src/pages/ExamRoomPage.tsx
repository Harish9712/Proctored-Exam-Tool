import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, AlertTriangle, Camera, Eye, EyeOff, Maximize, Minimize, Shield } from 'lucide-react';
import { useExam } from '../contexts/ExamContext';

const ExamRoomPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const { state, endExam } = useExam();
  const navigate = useNavigate();
  
  const [remainingTime, setRemainingTime] = useState(120 * 60); // 2 hours in seconds
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showWebcam, setShowWebcam] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [showWarnings, setShowWarnings] = useState(true);
  
  
  // Mock questions data
  const questions = [
    {
      id: 1,
      text: "What is the primary purpose of a proctored examination?",
      options: [
        "To increase test difficulty",
        "To ensure academic integrity",
        "To record student behavior",
        "To automate grading"
      ],
    },
    {
      id: 2,
      text: "Which of the following is NOT typically a feature of automated proctoring systems?",
      options: [
        "Facial recognition",
        "Eye movement tracking",
        "Automatic grading of essays",
        "Background noise detection"
      ],
    },
    {
      id: 3,
      text: "Which type of authentication is most secure for online proctoring?",
      options: [
        "Username and password",
        "Email verification",
        "Biometric verification",
        "Knowledge-based questions"
      ],
    },
    {
      id: 4,
      text: "What does AI behavior analysis primarily monitor during a proctored exam?",
      options: [
        "Test scores",
        "Typing speed",
        "Suspicious movements",
        "Internet connection"
      ],
    },
    {
      id: 5,
      text: "What ethical concern is most commonly associated with automated proctoring?",
      options: [
        "Environmental impact",
        "Privacy intrusion",
        "Technological dependency",
        "Cost of implementation"
      ],
    },
  ];
  
  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleEndExam();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Simulate random proctoring warnings
  useEffect(() => {
    const warningMessages = [
      "Multiple faces detected. Please ensure only you are visible.",
      "Face not clearly visible. Adjust your position.",
      "Please avoid looking away from the screen frequently.",
      "Background noise detected. Ensure you're in a quiet environment.",
      "Suspicious movement detected. Remain still during the exam."
    ];
    
    const simulateWarning = () => {
      // 10% chance of generating a warning every 20-40 seconds
      if (Math.random() < 0.1) {
        const randomWarning = warningMessages[Math.floor(Math.random() * warningMessages.length)];
        setWarnings(prev => [...prev, randomWarning]);
        
        // Auto-dismiss the warning after 10 seconds
        setTimeout(() => {
          setWarnings(prev => prev.filter(w => w !== randomWarning));
        }, 10000);
      }
    };
    
    const warningInterval = setInterval(simulateWarning, Math.random() * 20000 + 20000);
    
    return () => clearInterval(warningInterval);
  }, []);
  
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  
  const handleEndExam = () => {
    endExam();
    navigate('/dashboard');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Top bar with timer and controls */}
      <div className="bg-white shadow-sm px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-600 mr-1" />
            <span className={`font-mono font-medium ${remainingTime < 300 ? 'text-red-600' : 'text-gray-700'}`}>
              {formatTime(remainingTime)}
            </span>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowWebcam(!showWebcam)}
            className="p-1 rounded-full hover:bg-gray-100"
            title={showWebcam ? "Hide webcam preview" : "Show webcam preview"}
          >
            {showWebcam ? (
              <EyeOff className="h-5 w-5 text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-600" />
            )}
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="p-1 rounded-full hover:bg-gray-100"
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize className="h-5 w-5 text-gray-600" />
            ) : (
              <Maximize className="h-5 w-5 text-gray-600" />
            )}
          </button>
          
          <button
            onClick={() => setShowWarnings(!showWarnings)}
            className="p-1 rounded-full hover:bg-gray-100"
            title={showWarnings ? "Hide warnings" : "Show warnings"}
          >
            <AlertTriangle className={`h-5 w-5 ${warnings.length > 0 ? 'text-amber-500' : 'text-gray-600'}`} />
            {warnings.length > 0 && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
            )}
          </button>
        </div>
      </div>
      
      {/* Warnings panel */}
      {showWarnings && warnings.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4 mt-2 mx-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">Proctoring Alerts</h3>
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
      
      <div className="flex-grow flex flex-col md:flex-row p-4 gap-4">
        {/* Main exam content */}
        <div className="flex-grow bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Question {currentQuestion + 1}
          </h2>
          
          <div className="prose prose-sm max-w-none mb-6">
            <p>{questions[currentQuestion].text}</p>
          </div>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <label key={index} className="flex items-start p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${questions[currentQuestion].id}`}
                  className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}
          </div>
          
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous   
            </button>
            
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestion === questions.length - 1}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
        
        Webcam and proctoring status
        {showWebcam && (
          <div className="md:w-64 bg-white shadow-sm rounded-lg overflow-hidden flex flex-col">
            <div className="p-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Webcam Preview</span>
              <Shield className="h-5 w-5 text-green-500" />
            </div>
            
            <div className="flex-grow bg-gray-900 relative">
              {/* Mock webcam feed */}
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <Camera className="h-10 w-10 opacity-20" />
              </div>
              
              {/* Real apps would use getUserMedia here */}
              <div className="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded-md">
                Live
              </div>
            </div>
            
            <div className="p-3">
              <h3 className="text-xs font-medium text-gray-700 mb-2">Proctoring Status</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Facial Recognition</span>
                  <span className="text-green-600">Active</span>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Environment Scan</span>
                  <span className="text-green-600">Clear</span>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Browser Lock</span>
                  <span className="text-green-600">Enabled</span>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">AI Monitoring</span>
                  <span className="text-green-600">Active</span>
                </div>
              </div>
            </div>
            
            <div className="p-3 border-t border-gray-200">
              <button
                onClick={handleEndExam}
                className="w-full px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                End Exam
              </button>
            </div>
          </div>
        )}
      </div>
      
      
      {/* Bottom navigation */}
      <div className="bg-white shadow-sm px-4 py-3 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <span>{Math.floor((currentQuestion + 1) / questions.length * 100)}% completed</span>
          </div>
          
          <div>
            <button
              onClick={handleEndExam}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamRoomPage;