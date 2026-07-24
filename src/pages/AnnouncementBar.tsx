import React, { useState } from 'react';
import { CloseIcon, SparklesIcon, TruckIcon } from '../utils/socialicons';

interface AnnouncementBarProps {
  offers?: { text: string; icon: React.ReactNode }[];
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  offers = [
    { text: "Exclusive Offer: Get Up to 20% OFF on All Crafts!", icon: <SparklesIcon /> },
    { text: "Free Delivery Across Pakistan on Orders Above Rs. 3,000!", icon: <TruckIcon /> },
  ],
}) => {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;

  const renderLoop = (prefix = '') => (
    <div className="flex items-center space-x-16 shrink-0 pr-16" aria-hidden={!!prefix}>
      {offers.map((item, index) => (
        <div key={`${prefix}${index}`} className="flex items-center gap-2 font-medium tracking-wide">
          {item.icon}
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-primary text-bg-light text-xs md:text-sm py-2.5 overflow-hidden relative z-40 border-b border-primary-hover select-none flex items-center">
      <div className="flex-1 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {renderLoop()}
          {renderLoop('dup-')}
        </div>
      </div>
      <button onClick={() => setIsVisible(false)} aria-label="Close announcement" className="px-3 py-1 bg-primary text-accent hover:text-white transition-colors z-10 shrink-0 cursor-pointer">
        <CloseIcon />
      </button>
    </div>
  );
};