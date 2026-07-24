import React from 'react';

export const PageLoader: React.FC = () => (
  <div className="fixed inset-0 z-50 bg-[#055038] flex flex-col items-center justify-center select-none overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[35%] left-[38%] w-3 h-3 rounded-full bg-emerald-400/20 animate-ping" />
      <div className="absolute top-[28%] right-[42%] w-5 h-5 rounded-full border border-emerald-300/30 animate-pulse" />
      <div className="absolute bottom-[28%] left-[41%] w-4 h-4 rounded-lg border border-emerald-300/20 rotate-12" />
    </div>
    <div className="relative z-10 flex flex-col items-center">
      <div className="w-20 h-20 rounded-2xl bg-[#086346] border border-emerald-500/30 shadow-2xl flex items-center justify-center mb-6">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FAF8F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3h8c1 0 2 1 2 2v2c0 2-2 3.5-3 5 1.5 2 3 4 3 7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2c0-3 1.5-5 3-7-1-1.5-3-3-3-5V5a2 2 0 0 1 2-2Z" />
          <path d="M12 12c-1.5 2-2 4-2 6M12 12c1.5 2 2 4 2 6" />
        </svg>
      </div>
      <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-[0.25em] text-[#D4A359] uppercase mb-4 pl-[0.25em]">Crafto</h1>
      <div className="w-12 h-[1px] bg-[#D4A359]/40 mb-6" />
      <div className="flex items-center space-x-2.5">
        {[0, 0.2, 0.4].map((delay, i) => (
          <span key={i} className="w-2.5 h-2.5 rounded-full bg-[#D4A359] animate-pulse [animation-duration:1.2s]" style={{ animationDelay: `${delay}s` }} />
        ))}
      </div>
    </div>
  </div>
);