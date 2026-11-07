import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { BionicText } from '../utils/bionicReading';

interface Props {
  text?: string;
  bulletPoints?: string[];
  maxChars?: number;
  maxBullets?: number;
  bionic?: boolean;
  className?: string;
}

export const ExpandableText: React.FC<Props> = ({
  text,
  bulletPoints,
  maxChars = 380,
  maxBullets = 3,
  bionic = false,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if expansion is needed based on character count or bullet count
  const needsExpansion =
    (text && text.length > maxChars) ||
    (bulletPoints && bulletPoints.length > maxBullets);

  if (!needsExpansion) {
    return (
      <div className={className}>
        {text && <p className="leading-relaxed"><BionicText text={text} enabled={bionic} /></p>}
        {bulletPoints && bulletPoints.length > 0 && (
          <ul className="space-y-1.5 list-disc list-inside">
            {bulletPoints.map((bp, idx) => (
              <li key={idx} className="leading-relaxed">
                <BionicText text={bp} enabled={bionic} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // Render truncated text or bullet points
  const truncatedText = text ? text.slice(0, maxChars) + '...' : '';
  const visibleBullets = bulletPoints ? (isExpanded ? bulletPoints : bulletPoints.slice(0, maxBullets)) : [];

  return (
    <div className={`relative ${className}`}>
      {/* Content Container */}
      <div className={`transition-all duration-300 relative overflow-hidden ${!isExpanded ? 'max-h-[140px]' : ''}`}>
        {text && (
          <p className="leading-relaxed">
            <BionicText text={isExpanded ? text : truncatedText} enabled={bionic} />
          </p>
        )}

        {bulletPoints && bulletPoints.length > 0 && (
          <ul className="space-y-1.5 list-disc list-inside">
            {visibleBullets.map((bp, idx) => (
              <li key={idx} className="leading-relaxed">
                <BionicText text={bp} enabled={bionic} />
              </li>
            ))}
          </ul>
        )}

        {/* Gradient Overlay in Collapsed Mode */}
        {!isExpanded && (
          <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-white dark:from-slate-900 via-white/80 dark:via-slate-900/80 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Toggle Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
        className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors cursor-pointer py-1"
      >
        <span>{isExpanded ? 'Weniger anzeigen' : 'Weiterlesen...'}</span>
        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
