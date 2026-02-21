
import React, { useState, useEffect } from 'react';
import { Quiz, Question } from '../types';
import { GoogleGenAI, Type } from '@google/genai';

interface Props {
  quiz: Quiz;
  onClose: () => void;
}

const QuizPlayer: React.FC<Props> = ({ quiz, onClose }) => {
  const [questions, setQuestions] = useState<Question[]>(quiz.questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(quiz.isMasterBank && quiz.questions.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (quiz.isMasterBank && questions.length === 0) {
      generateMoreQuestions();
    }
  }, []);

  const generateMoreQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Generate 10 high-quality, board-standard multiple choice questions for HSC level in Bangladesh. 
      Subject: ${quiz.subject}
      Paper: ${quiz.paper || 'N/A'}
      Chapter: ${quiz.chapter || 'N/A'}
      
      Requirements:
      1. Questions must be in Bengali (Bangla).
      2. Difficulty: Board Standard.
      3. Focus on conceptually important areas.
      4. Provide detailed explanations for each answer.
      
      Return ONLY a JSON array of objects with this structure:
      [{ "text": "...", "options": ["A", "B", "C", "D"], "correctAnswer": 0, "explanation": "..." }]
      Note: correctAnswer must be a number index from 0 to 3.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswer: { type: Type.INTEGER },
                explanation: { type: Type.STRING }
              },
              required: ["text", "options", "correctAnswer", "explanation"]
            }
          }
        }
      });

      const jsonStr = response.text.trim();
      const newBatch: Question[] = JSON.parse(jsonStr);
      
      if (newBatch.length > 0) {
        const formattedBatch = newBatch.map((q, idx) => ({
          ...q,
          id: `ai-${Date.now()}-${idx}`
        }));
        setQuestions(prev => [...prev, ...formattedBatch]);
      } else {
        throw new Error("No questions received from AI.");
      }
    } catch (err) {
      console.error("AI Generation Error:", err);
      setError("AI মডিউল প্রশ্ন লোড করতে ব্যর্থ হয়েছে। ইন্টারনেট সংযোগ চেক করো।");
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (loading && questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[70] flex flex-col items-center justify-center p-4">
        <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-cyan-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-cyan-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
        </div>
        <h2 className="text-xl font-orbitron font-bold text-cyan-400 uppercase tracking-widest animate-pulse">Initializing Master Bank</h2>
        <p className="text-gray-500 mt-2 text-center text-sm font-medium">
          {quiz.subject} - {quiz.chapter} অধ্যায়ের প্রশ্নগুলো AI ইঞ্জিন দিয়ে জেনারেট করা হচ্ছে...
        </p>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[70] flex flex-col items-center justify-center p-4">
        <div className="cyber-card p-10 rounded-[40px] text-center max-w-md border-red-500/40">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-white font-bold text-lg mb-2">{error}</h2>
          <p className="text-gray-500 text-sm mb-8">সার্ভারে সাময়িক সমস্যা হতে পারে। কিছুক্ষণ পর আবার চেষ্টা করো।</p>
          <button onClick={onClose} className="w-full py-4 bg-red-500/10 text-red-500 rounded-2xl font-bold uppercase tracking-widest border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
            EXIT TERMINAL
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[70] flex items-center justify-center p-4">
        <div className="cyber-card w-full max-w-lg rounded-[40px] overflow-hidden border-[#bc13fe]/30 p-10 text-center animate-scaleIn">
          <div className="mb-8">
            <div className="text-[10px] font-orbitron text-[#bc13fe] uppercase tracking-[0.4em] mb-2 font-bold">Research Analysis Complete</div>
            <h2 className="text-3xl font-orbitron font-bold text-white uppercase tracking-tighter">Mission Success</h2>
          </div>
          
          <div className="relative inline-block mb-10">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
              <circle 
                cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="8" fill="transparent" 
                className="text-[#bc13fe]" 
                strokeDasharray={2 * Math.PI * 80}
                strokeDashoffset={2 * Math.PI * 80 * (1 - score / questions.length)}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-orbitron font-bold text-white">{score}</span>
              <span className="text-xs text-gray-500 font-bold">OUT OF {questions.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Accuracy</div>
              <div className="text-xl font-orbitron font-bold text-[#00f3ff]">{Math.round((score/questions.length)*100)}%</div>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Status</div>
              <div className={`text-xl font-orbitron font-bold ${score/questions.length >= 0.8 ? 'text-green-400' : 'text-yellow-400'}`}>
                {score/questions.length >= 0.8 ? 'EXCELLENT' : 'ELITE'}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => {
                setCurrentQuestionIndex(0);
                setScore(0);
                setShowResult(false);
                setIsAnswered(false);
                setSelectedOption(null);
              }}
              className="w-full py-4 bg-white text-black rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#00f3ff] transition-all"
            >
              RESTART SEQUENCE
            </button>
            <button 
              onClick={onClose}
              className="w-full py-4 bg-transparent text-gray-500 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:text-white transition-all"
            >
              EXIT RESEARCH MODULE
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[70] flex items-center justify-center p-4">
      <div className="cyber-card w-full max-w-3xl rounded-[40px] overflow-hidden border-[#00f3ff]/20 flex flex-col max-h-[90vh]">
        <div className="bg-black p-8 border-b border-[#00f3ff]/10 flex justify-between items-center shrink-0">
          <div>
            <h2 className="font-orbitron font-bold text-white text-xl tracking-tight uppercase">{quiz.title}</h2>
            <div className="flex items-center mt-2 space-x-3">
              <span className="text-[10px] text-[#00f3ff] font-bold tracking-[0.2em] uppercase">Sector: {quiz.subject}</span>
              <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
              <span className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">Status: Researching</span>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 text-gray-400 hover:text-white transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-1.5 bg-[#00f3ff]/10 w-full shrink-0">
          <div 
            className="h-1 bg-[#00f3ff] transition-all duration-500 shadow-[0_0_10px_#00f3ff]" 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="p-8 md:p-12 overflow-y-auto flex-1 scrollbar-hide">
          <div className="mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">
              Question {currentQuestionIndex + 1} / {questions.length}
            </span>
            <h3 className="text-2xl font-bold text-white leading-relaxed">
              {currentQuestion.text}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8">
            {currentQuestion.options.map((option, index) => {
              const isCorrect = index === currentQuestion.correctAnswer;
              const isSelected = index === selectedOption;
              
              let variantClasses = "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10";
              
              if (isAnswered) {
                if (isCorrect) variantClasses = "bg-green-500/10 border-green-500/50 text-green-400";
                else if (isSelected && !isCorrect) variantClasses = "bg-red-500/10 border-red-500/50 text-red-400";
                else variantClasses = "bg-white/5 border-white/5 text-gray-600 opacity-50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswered}
                  className={`flex items-center p-6 rounded-3xl border text-left transition-all group ${variantClasses}`}
                >
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center mr-4 shrink-0 transition-colors ${
                    isSelected ? 'bg-current text-black' : 'border-current'
                  }`}>
                    <span className="text-xs font-bold">{String.fromCharCode(65 + index)}</span>
                  </div>
                  <span className="font-semibold text-lg">{option}</span>
                  {isAnswered && isCorrect && (
                    <svg className="w-6 h-6 ml-auto text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="bg-white/5 p-8 rounded-[32px] border border-white/5 animate-fadeIn">
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 bg-[#00f3ff]/20 rounded-lg flex items-center justify-center mr-3">
                   <svg className="w-3.5 h-3.5 text-[#00f3ff]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                   </svg>
                </div>
                <h4 className="text-[10px] font-orbitron font-bold text-[#00f3ff] uppercase tracking-widest">Research Data: Explanation</h4>
              </div>
              <p className="text-gray-400 leading-relaxed italic">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        <div className="p-8 bg-black border-t border-white/5 shrink-0 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Accuracy Rank:</span>
                <span className="text-[10px] text-white font-orbitron font-bold">{Math.round((score / (currentQuestionIndex + 1)) * 100)}%</span>
            </div>
            <button 
                onClick={handleNext}
                disabled={!isAnswered}
                className={`px-10 py-4 rounded-2xl font-orbitron text-xs font-bold uppercase tracking-[0.2em] transition-all ${
                    isAnswered 
                    ? 'bg-[#00f3ff] text-black shadow-[0_0_20px_rgba(0,243,255,0.4)]' 
                    : 'bg-white/5 text-gray-600 cursor-not-allowed'
                }`}
            >
                {currentQuestionIndex < questions.length - 1 ? 'NEXT PHASE' : 'FINALIZE SEQUENCE'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPlayer;
