
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { RESOURCES, SOCIAL_LINKS, QUIZZES, SUBJECT_CHAPTERS } from './constants';
import { ResourceCategory, ResourceSubCategory, Quiz, Resource } from './types';
import ResourceCard from './components/ResourceCard';
import StudyTimer from './components/StudyTimer';
import GeminiBuddy from './components/GeminiBuddy';
import QuizCard from './components/QuizCard';
import QuizPlayer from './components/QuizPlayer';
import FormulaModal from './components/FormulaModal';

const LabLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--neon-cyan)" />
        <stop offset="100%" stopColor="var(--neon-magenta)" />
      </linearGradient>
    </defs>
    <path d="M40 30h20M45 30v15L25 80h50L55 45v-15" stroke="url(#logoGrad)" strokeWidth="3" strokeLinecap="round" />
    <ellipse cx="50" cy="40" rx="20" ry="5" stroke="url(#logoGrad)" strokeWidth="1" opacity="0.6" className="animate-pulse" />
    <path d="M45 15h15l-10 10h10L45 40l5-10H40l10-15z" fill="url(#logoGrad)" className="animate-bounce" style={{ animationDuration: '3s' }} />
    <circle cx="50" cy="65" r="2" fill="url(#logoGrad)" opacity="0.8" />
  </svg>
);

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<ResourceCategory | 'All'>('All');
  const [selectedPaper, setSelectedPaper] = useState<'1st' | '2nd' | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string>('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState<ResourceSubCategory>('Formula');
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [activeFormula, setActiveFormula] = useState<Resource | null>(null);
  const [isStealth, setIsStealth] = useState(() => localStorage.getItem('theme') === 'stealth');
  const chapterScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isStealth) {
      document.documentElement.classList.add('stealth-mode');
      localStorage.setItem('theme', 'stealth');
    } else {
      document.documentElement.classList.remove('stealth-mode');
      localStorage.setItem('theme', 'standard');
    }
  }, [isStealth]);

  const subjects: (ResourceCategory | 'All')[] = [
    'All', 'Physics', 'Chemistry', 'Biology', 'Math', 'Bangla', 'English', 'ICT'
  ];

  const subCategories: ResourceSubCategory[] = ['Formula', 'Quiz', 'Lit hack', 'Blog'];

  const filteredResources = useMemo(() => {
    return RESOURCES.filter(res => {
      const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            res.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSubject = selectedSubject === 'All' || res.category === selectedSubject;
      const matchesPaper = selectedSubject === 'All' || selectedSubject === 'ICT' || !selectedPaper || res.paper === selectedPaper;
      const matchesChapter = selectedSubject === 'All' || selectedChapter === 'All' || res.chapter === selectedChapter;
      const matchesSubCategory = res.subCategory === selectedSubCategory;
      return matchesSearch && matchesSubject && matchesPaper && matchesChapter && matchesSubCategory;
    });
  }, [searchTerm, selectedSubject, selectedPaper, selectedChapter, selectedSubCategory]);

  const filteredQuizzes = useMemo(() => {
    if (selectedSubCategory !== 'Quiz') return [];
    
    return QUIZZES.filter(quiz => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            quiz.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSubject = selectedSubject === 'All' || quiz.subject === selectedSubject;
      const matchesPaper = selectedSubject === 'All' || selectedSubject === 'ICT' || !selectedPaper || quiz.paper === selectedPaper;
      const matchesChapter = selectedSubject === 'All' || selectedChapter === 'All' || quiz.chapter === selectedChapter;
      return matchesSearch && matchesSubject && matchesPaper && matchesChapter;
    });
  }, [searchTerm, selectedSubject, selectedPaper, selectedChapter, selectedSubCategory]);

  const handleSubjectClick = (subject: ResourceCategory | 'All') => {
    setSelectedSubject(subject);
    setSelectedChapter('All');
    setSelectedPaper(subject === 'ICT' || subject === 'All' ? null : '1st');
    setSelectedSubCategory('Formula');
  };

  const currentChapters = useMemo(() => {
    if (selectedSubject === 'All') return [];
    const config = SUBJECT_CHAPTERS[selectedSubject];
    if (!config) return [];
    
    if (Array.isArray(config)) {
      return ['All', ...config];
    } else {
      const paper = selectedPaper || '1st';
      return ['All', ...(config[paper] || [])];
    }
  }, [selectedSubject, selectedPaper]);

  const startMasterPractice = () => {
    if (selectedSubject === 'All' || selectedChapter === 'All') return;
    const masterQuiz: Quiz = {
      id: `master-${selectedSubject}-${selectedChapter}-${selectedPaper || 'na'}`,
      title: `${selectedChapter} - 200+ MCQ Master Bank`,
      description: `অধ্যায়: ${selectedChapter}। এখানে বোর্ড স্ট্যান্ডার্ড ২০০+ এমসিকিউ প্র্যাকটিস করতে পারবে AI এর সাহায্যে।`,
      difficulty: 'Hard',
      subject: selectedSubject as ResourceCategory,
      chapter: selectedChapter,
      paper: selectedPaper || undefined,
      isMasterBank: true,
      questions: [], 
      tags: [selectedSubject, selectedChapter, 'MasterBank']
    };
    setActiveQuiz(masterQuiz);
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-[#00f3ff] selection:text-black theme-transition">
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ opacity: 'var(--glow-opacity)' }}>
        <div 
            className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] rounded-full theme-transition" 
            style={{ backgroundColor: 'var(--neon-cyan)', filter: 'blur(var(--blur-intensity))' }}
        ></div>
        <div 
            className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] rounded-full theme-transition" 
            style={{ backgroundColor: 'var(--neon-magenta)', filter: 'blur(var(--blur-intensity))' }}
        ></div>
      </div>

      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-2xl border-b border-white/10 theme-transition" style={{ borderBottomColor: 'rgba(0, 243, 255, 0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center cursor-pointer group" onClick={() => {handleSubjectClick('All'); setSearchTerm('');}}>
            <LabLogo className="w-10 h-10 md:w-12 md:h-12 drop-shadow-[0_0_10px_rgba(0,243,255,0.5)] group-hover:scale-110 transition-transform shrink-0" />
            <div className="ml-3 md:ml-4">
               <h1 className="font-orbitron font-bold text-base md:text-2xl leading-none tracking-tighter transition-colors">
                 <span style={{ color: 'var(--neon-cyan)' }}>ZOOMER'S</span> <span className="text-white">LIT LAB</span>
               </h1>
               <div className="flex items-center space-x-2 mt-1">
                 <span className={`w-1.5 h-1.5 rounded-full animate-pulse transition-colors ${isStealth ? 'bg-purple-500' : 'bg-green-500'}`}></span>
                 <p className="text-[7px] md:text-[9px] text-gray-500 uppercase tracking-[0.2em] font-bold">Lab Environment: {isStealth ? 'STEALTH' : 'ACTIVE'}</p>
               </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Stealth Mode Toggle */}
            <button 
                onClick={() => setIsStealth(!isStealth)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border font-orbitron text-[8px] md:text-[10px] font-bold transition-all ${
                    isStealth 
                    ? 'border-[#bc13fe]/30 bg-[#bc13fe]/10 text-[#bc13fe]' 
                    : 'border-[#00f3ff]/30 bg-[#00f3ff]/10 text-[#00f3ff]'
                }`}
            >
                <div className="relative w-6 h-3 bg-black/40 rounded-full border border-current">
                    <div className={`absolute top-0.5 w-1.5 h-1.5 rounded-full transition-all bg-current ${isStealth ? 'right-0.5' : 'left-0.5'}`}></div>
                </div>
                <span className="hidden sm:inline tracking-[0.2em]">{isStealth ? 'STEALTH ON' : 'STEALTH OFF'}</span>
            </button>

            <div className="hidden lg:block relative group">
              <input 
                type="text" 
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-900/40 border border-[#00f3ff]/20 rounded-xl px-4 py-2 pl-10 text-xs text-[#00f3ff] focus:outline-none focus:border-[#bc13fe] w-48 xl:w-64 transition-all backdrop-blur-sm"
                style={{ borderColor: 'rgba(0, 243, 255, 0.15)', color: 'var(--neon-cyan)' }}
              />
              <svg className="absolute left-3 top-2.5 w-3.5 h-3.5 opacity-40 group-focus-within:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--neon-cyan)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              {SOCIAL_LINKS.map(social => (
                <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#bc13fe] transition-all transform hover:scale-125">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        <div className="mb-8 text-center">
            <p className="text-[10px] text-gray-500 font-orbitron uppercase tracking-[0.4em] mb-4">Select Research Subject</p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {subjects.map(subject => (
                <button
                key={subject}
                onClick={() => handleSubjectClick(subject)}
                className={`px-4 md:px-6 py-2.5 rounded-2xl font-orbitron text-[10px] md:text-xs font-bold tracking-[0.1em] transition-all border ${
                    selectedSubject === subject 
                    ? 'text-black shadow-[0_0_20px_rgba(0,243,255,0.3)] border-transparent scale-105' 
                    : 'bg-black/60 text-[#00f3ff]/70 hover:text-white border-[#00f3ff]/20 hover:border-[#bc13fe]/50 hover:bg-[#bc13fe]/5'
                }`}
                style={{ 
                    backgroundColor: selectedSubject === subject ? 'var(--neon-cyan)' : undefined,
                    color: selectedSubject === subject ? '#000' : undefined 
                }}
                >
                {subject.toUpperCase()}
                </button>
            ))}
            </div>
        </div>

        {selectedSubject !== 'All' && selectedSubject !== 'ICT' && (
          <div className="mb-8 text-center animate-fadeIn">
            <p className="text-[10px] text-gray-500 font-orbitron uppercase tracking-[0.4em] mb-4">Select Paper</p>
            <div className="inline-flex p-1 bg-black/40 border border-white/5 rounded-2xl gap-2">
              <button
                onClick={() => { setSelectedPaper('1st'); setSelectedChapter('All'); }}
                className={`px-8 py-2 rounded-xl font-orbitron text-[10px] font-bold tracking-widest transition-all ${
                  selectedPaper === '1st'
                  ? 'text-black shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                  : 'text-gray-500 hover:text-[#00f3ff] hover:bg-white/5'
                }`}
                style={{ backgroundColor: selectedPaper === '1st' ? 'var(--neon-cyan)' : undefined }}
              >
                1ST PAPER
              </button>
              <button
                onClick={() => { setSelectedPaper('2nd'); setSelectedChapter('All'); }}
                className={`px-8 py-2 rounded-xl font-orbitron text-[10px] font-bold tracking-widest transition-all ${
                  selectedPaper === '2nd'
                  ? 'text-black shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                  : 'text-gray-500 hover:text-[#00f3ff] hover:bg-white/5'
                }`}
                style={{ backgroundColor: selectedPaper === '2nd' ? 'var(--neon-cyan)' : undefined }}
              >
                2ND PAPER
              </button>
            </div>
          </div>
        )}

        {selectedSubject !== 'All' && (
          <div className="mb-8 animate-fadeIn">
            <p className="text-[10px] text-center text-gray-500 font-orbitron uppercase tracking-[0.4em] mb-4">Select Chapter</p>
            <div 
              ref={chapterScrollRef}
              className="flex overflow-x-auto scrollbar-hide space-x-3 pb-4 px-4 justify-start md:justify-center"
            >
              {currentChapters.map(chapter => (
                <button
                  key={chapter}
                  onClick={() => setSelectedChapter(chapter)}
                  className={`flex-shrink-0 px-5 py-2 rounded-xl text-[10px] font-bold font-orbitron tracking-widest border transition-all ${
                    selectedChapter === chapter
                    ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.15)]'
                    : 'border-white/5 bg-black/40 text-gray-500 hover:border-[#00f3ff]/30 hover:text-[#00f3ff]'
                  }`}
                  style={{ 
                    borderColor: selectedChapter === chapter ? 'var(--neon-cyan)' : undefined,
                    color: selectedChapter === chapter ? 'var(--neon-cyan)' : undefined
                  }}
                >
                  {chapter.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-10 text-center animate-fadeIn">
            <p className="text-[10px] text-gray-500 font-orbitron uppercase tracking-[0.4em] mb-4">Select Resource Type</p>
            <div className="inline-flex flex-wrap justify-center p-1.5 bg-black/40 border border-white/5 rounded-2xl gap-2">
                {subCategories.map(subCat => (
                    <button
                        key={subCat}
                        onClick={() => setSelectedSubCategory(subCat)}
                        className={`px-6 py-2 rounded-xl font-orbitron text-[10px] font-bold tracking-widest transition-all ${
                            selectedSubCategory === subCat
                            ? 'text-black font-extrabold shadow-lg shadow-cyan-500/20'
                            : 'text-gray-500 hover:text-[#00f3ff] hover:bg-white/5'
                        }`}
                        style={{ 
                            background: selectedSubCategory === subCat ? 'linear-gradient(to right, var(--neon-cyan), var(--neon-magenta))' : undefined,
                            color: selectedSubCategory === subCat ? '#000' : undefined
                        }}
                    >
                        {subCat.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>

        <div className="mb-8 flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/5 pb-6">
            <div>
                <h3 className="text-xl md:text-2xl font-orbitron font-bold text-white uppercase tracking-tighter">
                    {selectedSubject === 'All' ? "LIT RESOURCE HUB" : `${selectedSubject} ${selectedPaper ? `/ ${selectedPaper} Paper` : ''} / ${selectedChapter}`}
                    <span className="ml-4 text-[10px] md:text-xs font-normal border px-3 py-1 rounded-full uppercase" style={{ color: 'var(--neon-cyan)', borderColor: 'rgba(0, 243, 255, 0.3)' }}>{selectedSubCategory}</span>
                </h3>
                <p className="text-[10px] md:text-xs text-gray-500 font-medium mt-1">
                    Found {filteredResources.length + filteredQuizzes.length} {selectedSubCategory.toLowerCase()} entries in this sector.
                </p>
            </div>
            {selectedSubject !== 'All' && (
                <button onClick={() => handleSubjectClick('All')} className="mt-4 md:mt-0 text-[10px] font-orbitron hover:text-white uppercase tracking-widest font-bold bg-white/5 px-4 py-2 rounded-lg transition-colors border border-white/5" style={{ color: 'var(--neon-cyan)' }}>
                    [ EXIT TO HUB ]
                </button>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedSubject !== 'All' && selectedChapter !== 'All' && selectedSubCategory === 'Quiz' && (
            <div className="cyber-card rounded-[32px] overflow-hidden flex flex-col h-full group border-white/10 relative shadow-[0_0_30px_rgba(0,243,255,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none"></div>
              <div className="h-40 bg-black/80 p-6 flex flex-col justify-between border-b border-white/10">
                <div className="flex justify-between items-start">
                  <div className="bg-cyan-500 text-black px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                    Master Bank
                  </div>
                  <LabLogo className="w-8 h-8 opacity-40" />
                </div>
                <div>
                   <p className="text-[10px] text-cyan-400 font-bold tracking-[0.3em] uppercase">200+ DYNAMIC MCQS</p>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-orbitron font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                   {selectedChapter} - ২০০+ এমসিকিউ প্র্যাকটিস
                </h3>
                <p className="text-gray-500 text-sm mb-8 flex-1 leading-relaxed">
                  এই অধ্যায়ের সকল বোর্ড এবং এডমিশন স্ট্যান্ডার্ড এমসিকিউ এখানে প্র্যাকটিস করো। Zoomer's Lit Lab AI ইঞ্জিন অনবরত নতুন প্রশ্ন যুক্ত করছে।
                </p>
                <button 
                  onClick={startMasterPractice}
                  className="w-full text-center py-4 rounded-2xl text-black text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 shadow-xl shadow-cyan-500/20"
                  style={{ background: 'linear-gradient(to right, #0891b2, var(--neon-cyan))' }}
                >
                  INITIALIZE MASTER SESSION
                </button>
              </div>
            </div>
          )}

          {filteredQuizzes.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} onStart={() => setActiveQuiz(quiz)} />
          ))}
          {filteredResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} onClick={() => setActiveFormula(resource)} />
          ))}

          {filteredResources.length === 0 && filteredQuizzes.length === 0 && (
            <div className="col-span-full py-32 text-center border-2 border-dashed border-white/5 rounded-[40px] bg-white/[0.02]">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <p className="text-gray-400 font-orbitron text-sm uppercase tracking-[0.2em]">No {selectedSubCategory} Data Found in this Sector</p>
                <p className="text-gray-600 text-xs mt-2 italic">Try switching filters or searching for another chapter.</p>
                <button 
                  onClick={() => setSelectedSubCategory('Formula')}
                  className="mt-8 text-xs font-bold hover:underline"
                  style={{ color: 'var(--neon-cyan)' }}
                >
                  VIEW ALL FORMULAS
                </button>
            </div>
          )}
        </div>
      </main>

      <StudyTimer />
      <GeminiBuddy />
      {activeQuiz && <QuizPlayer quiz={activeQuiz} onClose={() => setActiveQuiz(null)} />}
      {activeFormula && <FormulaModal resource={activeFormula} onClose={() => setActiveFormula(null)} />}
    </div>
  );
};

export default App;
