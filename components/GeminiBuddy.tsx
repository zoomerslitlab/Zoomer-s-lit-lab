
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';

const GeminiBuddy: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ data: string, mimeType: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = (reader.result as string).split(',')[1];
      setSelectedImage({
        data: base64Data,
        mimeType: file.type
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAsk = async () => {
    if (!query.trim() && !selectedImage) return;
    setLoading(true);
    setResponse(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const textPart = {
        text: `You are the Zoomer's HSC Lab AI Buddy. Always respond in Bengali (Bangla) unless specifically asked for English. You are an expert specifically on the HSC (Higher Secondary Certificate) syllabus of Bangladesh (NCTB). Provide short, punchy, board-exam focused answers. If an image is provided, analyze it (likely a board question or textbook page) and explain the concept or solve the problem. User Question: ${query || 'Please analyze this image.'}`
      };

      const contents = selectedImage 
        ? { parts: [{ inlineData: selectedImage }, textPart] }
        : { parts: [textPart] };

      const res = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: "Strictly an HSC (Higher Secondary Certificate) specialist tutor for Bangladesh. Focus on MCQ tips, board questions, and core concepts. Language: Bangla default. If analyzing images, be precise with mathematical formulas and scientific diagrams."
        }
      });
      
      setResponse(res.text || "দুঃখিত, উত্তর পাওয়া যায়নি।");
      setSelectedImage(null); // Clear image after successful query
    } catch (err) {
      setResponse("AI সার্কিটে সমস্যা হয়েছে! আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-400 text-black p-4 rounded-full shadow-lg shadow-green-500/20 transition-all transform hover:scale-110 flex items-center justify-center border-2 border-black"
        aria-label="Ask HSC Buddy"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="cyber-card w-full max-w-lg rounded-2xl overflow-hidden border-green-500/50">
            <div className="bg-green-900/20 p-4 border-b border-green-500/30 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="font-orbitron font-bold text-green-400">
                  <span>HSC স্টাডি বাডি</span>
                </h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4 h-64 overflow-y-auto scrollbar-hide bg-black/40 rounded-xl p-4 border border-green-500/10">
                {response ? (
                  <p className="text-green-50 text-sm leading-relaxed whitespace-pre-wrap">{response}</p>
                ) : loading ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-green-500/60 font-orbitron text-[10px] animate-pulse uppercase tracking-widest">
                      {selectedImage ? "Analyzing Visual Data..." : "HSC মডিউল স্ক্যান করছি..."}
                    </p>
                  </div>
                ) : (
                  <div className="text-center mt-12 space-y-3">
                    <p className="text-gray-500 italic text-sm">HSC-র যেকোনো বিষয় নিয়ে প্রশ্ন করো!</p>
                    <p className="text-green-500/40 text-[10px] uppercase font-bold tracking-widest">You can also scan questions or textbook pages</p>
                  </div>
                )}
              </div>

              {selectedImage && (
                <div className="mb-3 relative inline-block group animate-fadeIn">
                  <img 
                    src={`data:${selectedImage.mimeType};base64,${selectedImage.data}`} 
                    alt="Scan preview" 
                    className="w-20 h-20 object-cover rounded-xl border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                  />
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              <div className="flex items-center space-x-2 bg-black/60 border border-green-500/30 rounded-2xl p-1 focus-within:border-green-500 transition-all">
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment"
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 text-green-500 hover:bg-green-500/10 rounded-xl transition-all group"
                  title="Scan Question/Image"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
                  placeholder="তোমার প্রশ্ন..."
                  className="flex-1 bg-transparent border-none py-2 px-2 text-green-50 focus:outline-none text-sm placeholder:text-green-900/50"
                />
                <button 
                  onClick={handleAsk}
                  disabled={loading || (!query.trim() && !selectedImage)}
                  className="bg-green-500 hover:bg-green-400 text-black px-6 py-2.5 rounded-xl font-bold font-orbitron text-xs disabled:opacity-30 disabled:grayscale transition-all shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                >
                  {loading ? '...' : 'SEND'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GeminiBuddy;
