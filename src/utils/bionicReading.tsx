import React from 'react';

/**
 * Transforms text into ADHD-friendly Bionic Reading format
 * by making the first 40-50% of each word bold.
 */
export function formatBionic(text: string): React.ReactNode {
  if (!text) return text;

  const words = text.split(/(\s+)/);

  return words.map((chunk, index) => {
    // If it's whitespace
    if (/^\s+$/.test(chunk)) {
      return chunk;
    }

    const len = chunk.length;
    if (len <= 3) {
      // 1-3 letters: highlight first letter
      return (
        <React.Fragment key={index}>
          <span className="font-black text-slate-950 dark:text-white">{chunk.slice(0, 1)}</span>
          <span className="font-normal">{chunk.slice(1)}</span>
        </React.Fragment>
      );
    }

    // 4+ letters: highlight first ceil(len * 0.45) letters
    const splitIndex = Math.ceil(len * 0.45);
    const boldPart = chunk.slice(0, splitIndex);
    const restPart = chunk.slice(splitIndex);

    return (
      <React.Fragment key={index}>
        <span className="font-black text-slate-950 dark:text-white">{boldPart}</span>
        <span className="font-normal">{restPart}</span>
      </React.Fragment>
    );
  });
}

export const BionicText: React.FC<{
  text: string;
  enabled: boolean;
  className?: string;
}> = ({ text, enabled, className = '' }) => {
  if (!enabled) {
    return <span className={className}>{text}</span>;
  }
  return <span className={className}>{formatBionic(text)}</span>;
};
