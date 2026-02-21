
import React, { useState, useEffect } from 'react';
import { Resource } from '../types';
import { GoogleGenAI } from '@google/genai';

interface Props {
  resource: Resource;
  onClose: () => void;
}

const FormulaModal: React.FC<Props> = ({ resource, onClose }) => {
  const [content, setContent] = useState(resource.content || '');
  const [loading, setLoading] = useState(false);

  const generateWithAI = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Generate a comprehensive formula sheet for HSC Bangladesh level.
      Subject: ${resource.category}
      Chapter: ${resource.chapter}
      Paper: ${resource.paper || 'N/A'}
      Include: Core formulas, units, and short conceptual notes. 
      Format: Use clear headings and bullet points. Use Bengali (Bangla) for explanations but keep variables in English.
      Return as plain text with simple formatting.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      setContent(response.text || "No data generated.");
    } catch (err) {
      console.error(err);
      alert("AI Engine Error: Failed to generate formulas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!content) {
      generateWithAI();
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[80] flex items-center justify-center p-4">
      <div className="cyber-card w-full max-w-4xl max-h-[90vh] rounded-[40px] border-[#00f3ff]/30 overflow-hidden flex flex-col animate-scaleIn">
        <div className="p-8 border-b border-white/10 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-orbitron font-bold text-[#00f3ff] uppercase tracking-tighter">{resource.title}</h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Research Data Source: Zoomer's Lit Lab AI</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-colors">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 md:p-12 overflow-y-auto flex-1 scrollbar-hide">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
               <div className="w-16 h-16 border-4 border-[#00f3ff]/20 border-t-[#00f3ff] rounded-full animate-spin mb-6"></div>
               <p className="text-cyan-500 font-orbitron text-xs animate-pulse tracking-[0.3em] uppercase">Decoding Formula Matrices...</p>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-gray-300 leading-relaxed text-lg bg-black/40 p-8 rounded-3xl border border-white/5 shadow-inner">
                {content}
              </pre>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center space-x-3 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Real-time Laboratory Sync: Active</span>
          </div>
          <div className="flex space-x-4 w-full md:w-auto">
            <button 
              onClick={generateWithAI}
              className="flex-1 md:flex-none px-8 py-3 bg-white/5 border border-[#00f3ff]/30 text-[#00f3ff] rounded-2xl font-orbitron text-[10px] font-bold uppercase tracking-widest hover:bg-[#00f3ff]/10 transition-all"
            >
              [ RE-GENERATE DATA ]
            </button>
            <button 
              onClick={() => window.print()}
              className="flex-1 md:flex-none px-8 py-3 bg-[#00f3ff] text-black rounded-2xl font-orbitron text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
            >
              SAVE / PRINT PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaModal;
