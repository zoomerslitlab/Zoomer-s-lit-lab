
import React from 'react';
import { Resource, VideoResource } from '../types';

interface Props {
  resource: Resource | VideoResource;
  onClick?: () => void;
}

const ResourceCard: React.FC<Props> = ({ resource, onClick }) => {
  const isVideo = 'youtubeId' in resource && !!resource.youtubeId;
  const isFormula = resource.subCategory === 'Formula';

  return (
    <div 
      onClick={isFormula ? onClick : undefined}
      className={`cyber-card rounded-[32px] overflow-hidden flex flex-col h-full group ${
      isFormula ? 'border-[#00f3ff]/20 shadow-[0_0_20px_rgba(0,243,255,0.05)] cursor-pointer' : ''
    }`}>
      {isVideo ? (
        <div className="relative aspect-video w-full border-b border-[#00f3ff]/10">
          <iframe
            className="w-full h-full grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
            src={`https://www.youtube.com/embed/${(resource as VideoResource).youtubeId}`}
            title={resource.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className={`h-32 p-6 flex items-center justify-between border-b border-[#00f3ff]/10 ${
          isFormula ? 'bg-gradient-to-br from-[#00f3ff]/10 to-black/80' : 'bg-gradient-to-br from-white/5 to-black/80'
        }`}>
          <div className={`${
            isFormula ? 'bg-[#00f3ff] text-black' : 'bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] text-black'
          } px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest shadow-lg shadow-cyan-500/20`}>
            {resource.subCategory || resource.category}
          </div>
          <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center group-hover:border-[#00f3ff]/50 transition-colors">
            <svg className={`w-5 h-5 transition-colors ${isFormula ? 'text-[#00f3ff]' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isFormula ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              )}
            </svg>
          </div>
        </div>
      )}
      
      <div className="p-8 flex-1 flex flex-col">
        <h3 className={`text-xl font-orbitron font-bold text-white mb-3 transition-colors leading-snug ${
          isFormula ? 'group-hover:text-[#00f3ff]' : 'group-hover:text-[#bc13fe]'
        }`}>
          {resource.title}
        </h3>
        <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
          {resource.description}
        </p>
        
        <div className="flex flex-wrap gap-3 mb-4">
          {resource.tags.map(tag => (
            <span key={tag} className="text-[9px] font-bold uppercase tracking-wider text-gray-500 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
              {tag}
            </span>
          ))}
        </div>

        {isFormula && (
          <button className="mt-auto w-full py-3 bg-white/5 border border-[#00f3ff]/30 text-[#00f3ff] text-[10px] font-orbitron font-bold uppercase tracking-widest rounded-xl group-hover:bg-[#00f3ff] group-hover:text-black transition-all">
            Open Formula Sheet
          </button>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
