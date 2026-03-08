
import React from 'react';
import { Quiz } from '../types';

interface Props {
  quiz: Quiz;
  onStart: () => void;
}

const QuizCard: React.FC<Props> = ({ quiz, onStart }) => {
  return (
    <div className="cyber-card rounded-[32px] overflow-hidden flex flex-col h-full group border-[#bc13fe]/10">
      <div className="h-40 bg-gradient-to-br from-[#bc13fe]/20 to-black p-6 flex flex-col justify-between border-b border-[#bc13fe]/10 relative overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute -right-8 -top-8 opacity-5 group-hover:opacity-15 transition-opacity duration-700">
           <svg className="w-40 h-40 text-white" fill="currentColor" viewBox="0 0 24 24">
             <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
           </svg>
        </div>

        <div className="flex justify-between items-start z-10">
          <div className="bg-[#bc13fe]/20 px-4 py-1.5 rounded-full text-[10px] uppercase font-bold text-[#bc13fe] tracking-widest border border-[#bc13fe]/30">
            Research Mode
          </div>
          <div className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border ${
            quiz.difficulty === 'Easy' ? 'border-green-500/20 text-green-400' : 
            quiz.difficulty === 'Medium' ? 'border-yellow-500/20 text-yellow-400' : 'border-red-500/20 text-red-400'
          }`}>
            Level: {quiz.difficulty}
          </div>
        </div>
        <div className="z-10">
          <p className="text-[10px] text-[#bc13fe]/80 font-bold tracking-[0.3em] uppercase">{quiz.questions.length} DATA BLOCKS</p>
        </div>
      </div>
      
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-xl font-orbitron font-bold text-white mb-3 group-hover:text-[#bc13fe] transition-colors">
          {quiz.title}
        </h3>
        <p className="text-gray-500 text-sm mb-8 flex-1 line-clamp-2 leading-relaxed">
          {quiz.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-10">
          {quiz.tags.map(tag => (
            <span key={tag} className="text-[9px] bg-black/40 text-gray-600 px-3 py-1 rounded-full border border-white/5 uppercase font-bold tracking-widest">
              #{tag}
            </span>
          ))}
        </div>

        <button 
          onClick={onStart}
          className="w-full text-center py-4 bg-gradient-to-r from-[#bc13fe]/80 to-[#ff00ff]/80 hover:from-[#bc13fe] hover:to-[#ff00ff] rounded-2xl text-white text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 shadow-xl shadow-magenta-500/20"
        >
          INITIALIZE SEQUENCE
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
