import React, { useState } from 'react';
import { PetSpecies, PetState, EquippedCosmetics, PetGadget } from '../types/quiz';
import { findGadgetById } from '../data/petData';
import { soundEffects } from '../services/audioService';

interface Props {
  pet: PetState;
  isEating?: boolean;
  isPetted?: boolean;
  size?: 'sm' | 'md' | 'lg';
  equippedCosmetics?: EquippedCosmetics;
  previewOverride?: {
    equipped?: Partial<PetState['equipped']>;
  };
  onInteractGadget?: (gadget: PetGadget) => void;
  isGadgetInteracting?: boolean;
  isGadgetActive?: boolean;
  onClick?: () => void;
}

export const PetAvatar: React.FC<Props> = ({
  pet,
  isEating,
  isPetted,
  size = 'lg',
  equippedCosmetics,
  previewOverride,
  onInteractGadget,
  isGadgetInteracting,
  isGadgetActive: externalGadgetActive,
  onClick,
}) => {
  const { species, happiness, hunger } = pet;
  const equipped = {
    ...(equippedCosmetics?.frame ? { frame: equippedCosmetics.frame } : {}),
    ...pet.equipped,
    ...(previewOverride?.equipped || {}),
  };

  const [internalGadgetActive, setInternalGadgetActive] = useState(false);
  const isGadgetActive = Boolean(isGadgetInteracting || externalGadgetActive || internalGadgetActive);

  const activeGadgetId = equipped?.gadget;
  const gadget = activeGadgetId ? findGadgetById(activeGadgetId) : undefined;

  const handleGadgetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!gadget) return;
    setInternalGadgetActive(true);
    soundEffects.playGadgetSound(gadget.soundName);
    if (onInteractGadget) {
      onInteractGadget(gadget);
    }
    setTimeout(() => setInternalGadgetActive(false), 1250);
  };

  const isEcstatic = happiness >= 70;
  const isHungry = hunger <= 30;

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-28 h-28',
    lg: 'w-48 h-48',
  }[size];

  const frameInsets = {
    sm: {
      bronze: '-inset-0.5 border',
      neon: '-inset-0.5 border ring-1',
      stardust: '-inset-0.5 border ring-1',
      rainbow: '-inset-0.5 border-2 ring-1 ring-offset-1',
      divine: '-inset-1 border-2 ring-1',
    },
    md: {
      bronze: '-inset-1 border-1.5',
      neon: '-inset-1.5 border-2 ring-1',
      stardust: '-inset-1.5 border-2 ring-1',
      rainbow: '-inset-1.5 border-[2.5px] ring-1.5 ring-offset-1.5',
      divine: '-inset-2 border-3 ring-2',
    },
    lg: {
      bronze: '-inset-2 border-2',
      neon: '-inset-2.5 border-2 ring-2',
      stardust: '-inset-2.5 border-2 ring-2',
      rainbow: '-inset-3 border-[3.5px] ring-2 ring-offset-2',
      divine: '-inset-3.5 border-4 ring-4',
    },
  }[size];

  const isSleeping = Boolean(pet.isSleeping);

  return (
    <div 
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      title={onClick ? (isSleeping ? 'Sanft wecken & streicheln' : 'Klick auf mich zum Streicheln! ❤️') : undefined}
      className={`relative ${sizeClasses} mx-auto flex items-center justify-center select-none transition-transform duration-300 ${
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
      } ${
        isEating ? 'animate-bounce scale-105' : isPetted ? 'scale-110' : isGadgetActive ? 'scale-105 animate-pet-gadget-shake' : isSleeping ? 'scale-95 opacity-90' : 'animate-pet-breathe'
      }`}
    >
      {/* Equipped Animated Pet Frame */}
      {equipped?.frame === 'frame-bronze' && (
        <div className={`absolute ${frameInsets.bronze} rounded-full border-amber-500/80 shadow-[0_0_12px_rgba(217,119,6,0.35)] pointer-events-none animate-pulse`} />
      )}
      {equipped?.frame === 'frame-neon' && (
        <div className={`absolute ${frameInsets.neon} rounded-full border-cyan-400 ring-fuchsia-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] animate-pulse pointer-events-none`} />
      )}
      {equipped?.frame === 'frame-stardust' && (
        <div className={`absolute ${frameInsets.stardust} rounded-full border-purple-400 ring-indigo-400/80 shadow-[0_0_20px_rgba(168,85,247,0.6)] animate-pulse pointer-events-none`}>
          {size !== 'sm' && (
            <>
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs animate-spin-slow">✨</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs animate-bounce">⭐</span>
              <span className="absolute top-1/2 -left-2 -translate-y-1/2 text-xs animate-pulse">✦</span>
              <span className="absolute top-1/2 -right-2 -translate-y-1/2 text-xs animate-pulse">✧</span>
            </>
          )}
        </div>
      )}
      {equipped?.frame === 'frame-rainbow' && (
        <div className={`absolute ${frameInsets.rainbow} rounded-full border-amber-400 ring-emerald-400 ring-offset-rose-500 shadow-[0_0_20px_rgba(236,72,153,0.7)] animate-spin-rainbow pointer-events-none`} />
      )}
      {equipped?.frame === 'frame-divine' && (
        <div className={`absolute ${frameInsets.divine} rounded-full border-amber-300 ring-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.9)] animate-pulse pointer-events-none`}>
          <div className={`absolute ${size === 'sm' ? '-top-2 text-[10px]' : size === 'md' ? '-top-3 text-xs' : '-top-4 text-base'} left-1/2 -translate-x-1/2 select-none animate-bounce`}>👑</div>
        </div>
      )}

      {/* Reactive heart animation when petted */}
      {isPetted && (
        <div className="absolute -top-4 text-2xl animate-ping pointer-events-none z-20">
          💖
        </div>
      )}

      {/* Reactive gadget play reaction with celebratory mood badge */}
      {isGadgetActive && gadget && (
        <div className="absolute -top-6 flex items-center gap-1.5 bg-white/95 dark:bg-slate-900/95 px-3 py-1 rounded-full shadow-lg border border-purple-300 dark:border-purple-700 animate-bounce pointer-events-none z-30">
          <span className="text-sm">{gadget.icon}</span>
          <span className="text-xs font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            +{gadget.happinessBonus} Laune!
          </span>
        </div>
      )}

      {/* Reactive food crumbs when eating */}
      {isEating && (
        <div className="absolute -bottom-2 text-xl animate-pulse pointer-events-none z-20">
          ✨😋✨
        </div>
      )}


      {/* Rising 💤 when sleeping */}
      {isSleeping && (
        <div className={`absolute pointer-events-none select-none z-20 ${size === 'sm' ? 'top-2 left-1/2 -translate-x-1/2' : size === 'md' ? 'top-8 right-12' : 'top-16 right-24'}`}>
          <div className="relative">
            <span 
              className={`absolute font-black text-indigo-600 dark:text-indigo-400 animate-rise-fade drop-shadow-[0_0_2px_rgba(255,255,255,0.9)] dark:drop-shadow-[0_0_2px_rgba(0,0,0,0.5)] ${size === 'sm' ? 'text-[10px]' : size === 'md' ? 'text-2xl' : 'text-4xl'}`}
              style={{ animationDelay: '0s', left: '0', top: '0' }}
            >
              💤
            </span>
            <span 
              className={`absolute font-black text-indigo-500/80 dark:text-indigo-500 animate-rise-fade drop-shadow-[0_0_2px_rgba(255,255,255,0.9)] dark:drop-shadow-[0_0_2px_rgba(0,0,0,0.5)] ${size === 'sm' ? 'text-[8px]' : size === 'md' ? 'text-xl' : 'text-3xl'}`}
              style={{ animationDelay: '0.8s', left: size === 'sm' ? '5px' : '24px', top: size === 'sm' ? '-6px' : '-40px' }}
            >
              💤
            </span>
            <span 
              className={`absolute font-black text-indigo-400/60 dark:text-indigo-600 animate-rise-fade drop-shadow-[0_0_2px_rgba(255,255,255,0.9)] dark:drop-shadow-[0_0_2px_rgba(0,0,0,0.5)] ${size === 'sm' ? 'text-[7px]' : size === 'md' ? 'text-lg' : 'text-2xl'}`}
              style={{ animationDelay: '1.6s', left: size === 'sm' ? '-5px' : '-20px', top: size === 'sm' ? '-12px' : '-70px' }}
            >
              💤
            </span>
          </div>
        </div>
      )}
      <svg viewBox="0 0 200 200" className="w-full h-full select-none overflow-visible">
        <defs>
          <linearGradient id="rainbow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="75%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="unicorn-horn-grad" x1="0%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="35%" stopColor="#FBBF24" />
            <stop offset="70%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#FEF08A" />
          </linearGradient>
          <linearGradient id="unicorn-body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F3E8FF" />
          </linearGradient>
          <linearGradient id="unicorn-mane-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="30%" stopColor="#C084FC" />
            <stop offset="70%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#FDE047" />
          </linearGradient>
        </defs>

        {/* Soft shadow below pet */}
        <ellipse cx="100" cy="180" rx="60" ry="12" fill="currentColor" className="text-slate-200/70 dark:text-slate-800" />

        {/* 1. DOG (Bello) */}
        {species === 'dog' && (
          <g>
            {/* Floppy Dog Ears */}
            <path d="M50 70 Q30 90 40 130 Q55 140 65 110 Z" fill="#9A3412" />
            <path d="M150 70 Q170 90 160 130 Q145 140 135 110 Z" fill="#9A3412" />

            {/* Dog Body */}
            <ellipse cx="100" cy="140" rx="46" ry="40" fill="#EA580C" />
            <ellipse cx="100" cy="145" rx="28" ry="26" fill="#FED7AA" />

            {/* Dog Head */}
            <circle cx="100" cy="95" r="46" fill="#F97316" />

            {/* Dog Snout */}
            <ellipse cx="100" cy="108" rx="24" ry="18" fill="#FFEDD5" />
            <path d="M94 102 Q100 98 106 102 Q100 110 94 102 Z" fill="#1E293B" />

            {/* Dog Mouth / Tongue */}
            {isSleeping ? (
              <path d="M95 114 Q100 117 105 114" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />
            ) : isHungry ? (
              <path d="M95 118 Q100 114 105 118" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            ) : isEcstatic ? (
              <g>
                <path d="M93 114 Q100 120 107 114" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M97 118 Q100 128 103 118 Z" fill="#FB7185" />
              </g>
            ) : (
              <path d="M94 114 Q100 118 106 114" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            )}

            {/* Dog Eyes */}
            {isSleeping ? (
              <g stroke="#1E293B" strokeWidth="3" fill="none" strokeLinecap="round">
                <path d="M78 88 Q86 94 94 88" />
                <path d="M106 88 Q114 94 122 88" />
              </g>
            ) : (
              <g className="animate-pet-blink" style={{ transformOrigin: '100px 85px' }}>
                <ellipse cx="85" cy="85" rx="6.5" ry="7.5" fill="#0F172A" />
                <ellipse cx="115" cy="85" rx="6.5" ry="7.5" fill="#0F172A" />
                <circle cx="83" cy="82.5" r="2.8" fill="#FFFFFF" />
                <circle cx="113" cy="82.5" r="2.8" fill="#FFFFFF" />
                <circle cx="87.5" cy="87.5" r="1.3" fill="#FFFFFF" />
                <circle cx="117.5" cy="87.5" r="1.3" fill="#FFFFFF" />
              </g>
            )}

            {/* Rosy Cheeks */}
            <circle cx="75" cy="98" r="6" fill="#FDA4AF" opacity="0.6" />
            <circle cx="125" cy="98" r="6" fill="#FDA4AF" opacity="0.6" />

            {/* Dog Paws */}
            <ellipse cx="80" cy="168" rx="12" ry="8" fill="#EA580C" />
            <ellipse cx="120" cy="168" rx="12" ry="8" fill="#EA580C" />
          </g>
        )}

        {/* 2. CAT (Mimi) */}
        {species === 'cat' && (
          <g>
            {/* Pointy Cat Ears */}
            <polygon points="60,80 50,40 85,65" fill="#F43F5E" />
            <polygon points="62,75 56,48 80,66" fill="#FFE4E6" />
            <polygon points="140,80 150,40 115,65" fill="#F43F5E" />
            <polygon points="138,75 144,48 120,66" fill="#FFE4E6" />

            {/* Cat Body */}
            <ellipse cx="100" cy="142" rx="44" ry="38" fill="#FB7185" />
            <ellipse cx="100" cy="146" rx="26" ry="24" fill="#FFF1F2" />

            {/* Cat Head */}
            <circle cx="100" cy="95" r="45" fill="#FDA4AF" />

            {/* Cat Nose & Mouth */}
            <polygon points="97,105 103,105 100,109" fill="#E11D48" />
            <path d="M96 112 Q100 116 104 112" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Whiskers */}
            <line x1="60" y1="102" x2="80" y2="105" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="60" y1="110" x2="80" y2="109" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="140" y1="102" x2="120" y2="105" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="140" y1="110" x2="120" y2="109" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />

            {/* Cat Eyes */}
            {isSleeping ? (
              <g stroke="#1E293B" strokeWidth="3" fill="none" strokeLinecap="round">
                <path d="M78 88 Q86 94 92 88" />
                <path d="M108 88 Q114 94 122 88" />
              </g>
            ) : (
              <g className="animate-pet-blink" style={{ transformOrigin: '100px 86px' }}>
                <ellipse cx="85" cy="86" rx="7" ry="8" fill="#10B981" />
                <ellipse cx="115" cy="86" rx="7" ry="8" fill="#10B981" />
                <ellipse cx="85" cy="86" rx="4.5" ry="5.5" fill="#0F172A" />
                <ellipse cx="115" cy="86" rx="4.5" ry="5.5" fill="#0F172A" />
                <circle cx="83" cy="83" r="2.8" fill="#FFFFFF" />
                <circle cx="113" cy="83" r="2.8" fill="#FFFFFF" />
                <circle cx="87" cy="88" r="1.2" fill="#FFFFFF" />
                <circle cx="117" cy="88" r="1.2" fill="#FFFFFF" />
              </g>
            )}

            {/* Blush */}
            <circle cx="75" cy="98" r="7" fill="#F43F5E" opacity="0.4" />
            <circle cx="125" cy="98" r="7" fill="#F43F5E" opacity="0.4" />

            {/* Paws */}
            <ellipse cx="82" cy="168" rx="10" ry="7" fill="#FFF1F2" />
            <ellipse cx="118" cy="168" rx="10" ry="7" fill="#FFF1F2" />
          </g>
        )}

        {/* 3. PENGUIN (Pippo) */}
        {species === 'penguin' && (
          <g>
            {/* Penguin Flippers */}
            <ellipse cx="50" cy="135" rx="10" ry="24" transform="rotate(25 50 135)" fill="#0F172A" />
            <ellipse cx="150" cy="135" rx="10" ry="24" transform="rotate(-25 150 135)" fill="#0F172A" />

            {/* Penguin Body (Tuxedo) */}
            <ellipse cx="100" cy="125" rx="50" ry="52" fill="#1E293B" />
            <ellipse cx="100" cy="132" rx="34" ry="38" fill="#F8FAFC" />

            {/* Penguin Feet */}
            <ellipse cx="80" cy="174" rx="14" ry="8" fill="#F59E0B" />
            <ellipse cx="120" cy="174" rx="14" ry="8" fill="#F59E0B" />

            {/* Penguin Head */}
            <circle cx="100" cy="85" r="42" fill="#0F172A" />
            <ellipse cx="100" cy="92" rx="32" ry="26" fill="#F8FAFC" />

            {/* Beak */}
            <polygon points="94,94 106,94 100,105" fill="#F59E0B" />

            {/* Penguin Eyes */}
            {isSleeping ? (
              <g stroke="#0F172A" strokeWidth="3" fill="none" strokeLinecap="round">
                <path d="M78 82 Q84 88 90 82" />
                <path d="M110 82 Q116 88 122 82" />
              </g>
            ) : (
              <g className="animate-pet-blink" style={{ transformOrigin: '100px 80px' }}>
                <circle cx="84" cy="80" r="6.5" fill="#0F172A" />
                <circle cx="116" cy="80" r="6.5" fill="#0F172A" />
                <circle cx="82" cy="77.5" r="2.8" fill="#FFFFFF" />
                <circle cx="114" cy="77.5" r="2.8" fill="#FFFFFF" />
                <circle cx="86" cy="82.5" r="1.2" fill="#FFFFFF" />
                <circle cx="118" cy="82.5" r="1.2" fill="#FFFFFF" />
              </g>
            )}

            {/* Rosy Cheeks */}
            <circle cx="76" cy="92" r="5" fill="#FB7185" opacity="0.6" />
            <circle cx="124" cy="92" r="5" fill="#FB7185" opacity="0.6" />
          </g>
        )}

        {/* 4. AXOLOTL (Lotti) */}
        {species === 'axolotl' && (
          <g>
            {/* Frilly External Gills (Left & Right) */}
            <g fill="#FB7185">
              {/* Left Gills */}
              <path d="M58 75 Q32 60 40 80 Q48 85 58 85 Z" />
              <path d="M54 90 Q25 90 38 100 Q48 102 56 98 Z" />
              <path d="M56 108 Q35 120 48 122 Q56 118 60 112 Z" />
              {/* Right Gills */}
              <path d="M142 75 Q168 60 160 80 Q152 85 142 85 Z" />
              <path d="M146 90 Q175 90 162 100 Q152 102 144 98 Z" />
              <path d="M144 108 Q165 120 152 122 Q144 118 140 112 Z" />
            </g>

            {/* Inner Gill Accents */}
            <g fill="#F43F5E">
              <circle cx="44" cy="76" r="3" />
              <circle cx="38" cy="95" r="3" />
              <circle cx="48" cy="116" r="3" />
              <circle cx="156" cy="76" r="3" />
              <circle cx="162" cy="95" r="3" />
              <circle cx="152" cy="116" r="3" />
            </g>

            {/* Axolotl Body */}
            <ellipse cx="100" cy="144" rx="42" ry="36" fill="#FBCFE8" />
            <ellipse cx="100" cy="148" rx="26" ry="24" fill="#FDF2F8" />

            {/* Axolotl Wide Head */}
            <ellipse cx="100" cy="96" rx="48" ry="40" fill="#FCE7F3" />

            {/* Axolotl Wide Smile */}
            <path d="M88 108 Q100 118 112 108" stroke="#BE185D" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Axolotl Cute Wide-set Eyes */}
            {isSleeping ? (
              <g stroke="#831843" strokeWidth="3" fill="none" strokeLinecap="round">
                <path d="M74 88 Q82 94 88 88" />
                <path d="M112 88 Q118 94 126 88" />
              </g>
            ) : (
              <g className="animate-pet-blink" style={{ transformOrigin: '100px 86px' }}>
                <ellipse cx="78" cy="86" rx="6.5" ry="7" fill="#831843" />
                <ellipse cx="122" cy="86" rx="6.5" ry="7" fill="#831843" />
                <circle cx="76" cy="83.5" r="2.8" fill="#FFFFFF" />
                <circle cx="120" cy="83.5" r="2.8" fill="#FFFFFF" />
                <circle cx="80" cy="88" r="1.3" fill="#FFFFFF" />
                <circle cx="124" cy="88" r="1.3" fill="#FFFFFF" />
              </g>
            )}

            {/* Deep Pink Cheeks */}
            <circle cx="70" cy="98" r="7" fill="#F43F5E" opacity="0.5" />
            <circle cx="130" cy="98" r="7" fill="#F43F5E" opacity="0.5" />

            {/* Stubby Paws */}
            <ellipse cx="80" cy="168" rx="8" ry="6" fill="#FBCFE8" />
            <ellipse cx="120" cy="168" rx="8" ry="6" fill="#FBCFE8" />
          </g>
        )}

        {/* 5. UNICORN (Sternchen) */}
        {species === 'unicorn' && (
          <g>
            {/* Flowing Pastel Rainbow Mane (Back/Side Locks) */}
            <g>
              {/* Pink lock */}
              <path d="M58 80 C36 82 28 118 42 142 C50 134 54 116 62 100 Z" fill="#F472B6" />
              {/* Purple/Lilac lock */}
              <path d="M54 96 C30 108 26 142 46 160 C52 148 56 130 64 118 Z" fill="#C084FC" />
              {/* Sky Blue lock */}
              <path d="M142 80 C164 82 172 118 158 142 C150 134 146 116 138 100 Z" fill="#38BDF8" />
              {/* Pastel Yellow lock */}
              <path d="M146 96 C170 108 174 142 154 160 C148 148 144 130 136 118 Z" fill="#FDE047" />
            </g>

            {/* Unicorn Ears */}
            <g>
              {/* Left Ear */}
              <polygon points="64,74 50,38 78,58" fill="#FFFFFF" stroke="#E9D5FF" strokeWidth="1.5" />
              <polygon points="63,70 54,45 74,60" fill="#FCE7F3" />
              {/* Right Ear */}
              <polygon points="136,74 150,38 122,58" fill="#FFFFFF" stroke="#E9D5FF" strokeWidth="1.5" />
              <polygon points="137,70 146,45 126,60" fill="#FCE7F3" />
            </g>

            {/* Unicorn Body */}
            <ellipse cx="100" cy="142" rx="45" ry="38" fill="url(#unicorn-body-grad)" />
            <ellipse cx="100" cy="146" rx="28" ry="24" fill="#FAF5FF" />

            {/* Rose-Gold / Shimmer Hooves */}
            <ellipse cx="78" cy="168" rx="11" ry="7.5" fill="#F472B6" />
            <ellipse cx="78" cy="166" rx="7" ry="2.5" fill="#FBCFE8" />
            <ellipse cx="122" cy="168" rx="11" ry="7.5" fill="#F472B6" />
            <ellipse cx="122" cy="166" rx="7" ry="2.5" fill="#FBCFE8" />

            {/* Unicorn Head */}
            <circle cx="100" cy="95" r="45" fill="url(#unicorn-body-grad)" />

            {/* Pastel Mane Fringe / Bangs on Forehead */}
            <path d="M82 64 Q94 76 90 84 Q82 78 82 64 Z" fill="#F472B6" />
            <path d="M118 64 Q106 76 110 84 Q118 78 118 64 Z" fill="#38BDF8" />
            <path d="M96 62 Q100 78 94 86 Q90 74 96 62 Z" fill="#FDE047" />
            <path d="M104 62 Q100 78 106 86 Q110 74 104 62 Z" fill="#C084FC" />

            {/* Unicorn Muzzle */}
            <ellipse cx="100" cy="108" rx="22" ry="16" fill="#FDF2F8" />
            <circle cx="95" cy="106" r="1.8" fill="#EC4899" />
            <circle cx="105" cy="106" r="1.8" fill="#EC4899" />

            {/* Unicorn Mouth Reaction */}
            {isSleeping ? (
              <path d="M96 114 Q100 117 104 114" stroke="#7E22CE" strokeWidth="2" fill="none" strokeLinecap="round" />
            ) : isHungry ? (
              <path d="M96 118 Q100 113 104 118" stroke="#7E22CE" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            ) : isEcstatic ? (
              <g>
                <path d="M94 113 Q100 120 106 113" stroke="#7E22CE" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M97 116 Q100 123 103 116 Z" fill="#F472B6" />
              </g>
            ) : (
              <path d="M95 113 Q100 118 105 113" stroke="#7E22CE" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            )}

            {/* Sparkly Eyes */}
            {isSleeping ? (
              <g stroke="#6B21A8" strokeWidth="2.8" fill="none" strokeLinecap="round">
                <path d="M78 88 Q85 94 92 88" />
                <path d="M108 88 Q115 94 122 88" />
                {/* Gentle eyelashes */}
                <path d="M76 89 L73 86" />
                <path d="M124 89 L127 86" />
              </g>
            ) : (
              <g className="animate-pet-blink" style={{ transformOrigin: '100px 85px' }}>
                <ellipse cx="85" cy="85" rx="7.5" ry="8.5" fill="#581C87" />
                <ellipse cx="115" cy="85" rx="7.5" ry="8.5" fill="#581C87" />
                {/* Violet Iris */}
                <circle cx="85" cy="86" r="5" fill="#7C3AED" />
                <circle cx="115" cy="86" r="5" fill="#7C3AED" />
                {/* Starlight twin highlights */}
                <circle cx="82.5" cy="82" r="3" fill="#FFFFFF" />
                <circle cx="112.5" cy="82" r="3" fill="#FFFFFF" />
                <circle cx="87.5" cy="87.5" r="1.4" fill="#FFFFFF" />
                <circle cx="117.5" cy="87.5" r="1.4" fill="#FFFFFF" />
                {/* Eyelash flick */}
                <path d="M78 82 Q80 78 83 78" stroke="#581C87" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M122 82 Q120 78 117 78" stroke="#581C87" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              </g>
            )}

            {/* Rosy Sparkle Cheeks */}
            <circle cx="74" cy="98" r="7" fill="#F472B6" opacity="0.45" />
            <circle cx="126" cy="98" r="7" fill="#F472B6" opacity="0.45" />
            <text x="74" y="99" fontSize="6" textAnchor="middle" fill="#FFFFFF" opacity="0.8">✦</text>
            <text x="126" y="99" fontSize="6" textAnchor="middle" fill="#FFFFFF" opacity="0.8">✦</text>
          </g>
        )}

        {/* ======================================================== */}
        {/* ACCESSORIES (Rendered dynamically on top of pet)         */}
        {/* ======================================================== */}

        {/* 1. NECK ACCESSORIES */}
        {equipped.neck === 'bowtie' && (
          <g transform="translate(100, 138)">
            <polygon points="-16,-8 0,0 -16,8" fill="#E11D48" />
            <polygon points="16,-8 0,0 16,8" fill="#E11D48" />
            <circle cx="0" cy="0" r="4" fill="#9F1239" />
          </g>
        )}

        {equipped.neck === 'scarf' && (
          <g transform="translate(100, 136)">
            <path d="M-30,-2 Q0,8 30,-2 Q20,16 -30,12 Z" fill="#0284C7" />
            <rect x="8" y="6" width="12" height="24" rx="3" fill="#0369A1" />
          </g>
        )}

        {equipped.neck === 'star_collar' && (
          <g transform="translate(100, 138)">
            <path d="M-26,-4 Q0,14 26,-4" stroke="#6366F1" strokeWidth="3" fill="none" />
            <polygon points="0,6 3,14 11,14 5,18 7,26 0,21 -7,26 -5,18 -11,14 -3,14" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1" />
          </g>
        )}

        {equipped.neck === 'gold_chain' && (
          <g transform="translate(100, 138)">
            <path d="M-26,-4 Q0,14 26,-4" stroke="#F59E0B" strokeWidth="3" fill="none" strokeDasharray="3 2" />
            <circle cx="0" cy="12" r="7" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            <text x="0" y="15" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#78350F">★</text>
          </g>
        )}

        {/* Kapitel 2 Überraschung: Goldener Architekten-Stift */}
        {equipped.neck === 'special_golden_pencil' && (
          <g transform="translate(100, 136) rotate(-25)">
            <rect x="-4" y="-18" width="8" height="28" rx="1.5" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            <polygon points="-4,10 0,20 4,10" fill="#FDE68A" stroke="#B45309" strokeWidth="0.8" />
            <polygon points="-1.5,16 0,20 1.5,16" fill="#1E293B" />
            <rect x="-4" y="-18" width="8" height="5" fill="#FB7185" />
            <rect x="-4" y="-13" width="8" height="2" fill="#94A3B8" />
          </g>
        )}

        {/* Kapitel 3 Überraschung: Neon-Klickdummy-Pad */}
        {equipped.neck === 'special_proto_tablet' && (
          <g transform="translate(100, 142)">
            <rect x="-16" y="-10" width="32" height="22" rx="3" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
            <rect x="-13" y="-7" width="26" height="14" rx="1.5" fill="#1E1B4B" />
            <rect x="-10" y="-4" width="8" height="4" rx="1" fill="#818CF8" />
            <rect x="2" y="-4" width="8" height="4" rx="1" fill="#34D399" />
            <rect x="-10" y="2" width="20" height="2.5" rx="0.5" fill="#E2E8F0" opacity="0.8" />
            <circle cx="0" cy="9" r="1.2" fill="#38BDF8" />
          </g>
        )}

        {/* Kapitel 4 Überraschung: Smaragd-Sicherheits-Schild */}
        {equipped.neck === 'special_cyber_shield' && (
          <g transform="translate(100, 142)">
            <path d="M-15,-8 Q0,-12 15,-8 Q16,8 0,18 Q-16,8 -15,-8 Z" fill="#059669" stroke="#34D399" strokeWidth="1.8" />
            <path d="M-11,-5 Q0,-8 11,-5 Q12,6 0,14 Q-12,6 -11,-5 Z" fill="#065F46" />
            {/* Lock emblem */}
            <rect x="-5" y="0" width="10" height="8" rx="1.5" fill="#FBBF24" />
            <path d="M-3,0 V-3 Q0,-6 3,-3 V0" stroke="#FBBF24" strokeWidth="1.5" fill="none" />
            <circle cx="0" cy="3.5" r="1" fill="#78350F" />
          </g>
        )}

        {/* Kapitel 5 Überraschung: Regenbogen-A11y-Cape */}
        {equipped.neck === 'special_rainbow_cape' && (
          <g transform="translate(100, 138)">
            <path d="M-32,0 Q0,10 32,0 Q38,36 18,38 Q0,32 -18,38 Q-38,36 -32,0 Z" fill="url(#rainbow-grad)" opacity="0.9" />
            <path d="M-28,0 Q0,8 28,0" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
            <circle cx="0" cy="6" r="4" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
          </g>
        )}

        {/* Kapitel 7 Überraschung: Holo-SQL-Datenwürfel */}
        {equipped.neck === 'special_sql_cube' && (
          <g transform="translate(142, 132)">
            {/* Hologram Aura */}
            <circle cx="0" cy="0" r="16" fill="#06B6D4" opacity="0.25" className="animate-pulse" />
            {/* Isometric 3D Cube */}
            <polygon points="0,-12 12,-6 0,0 -12,-6" fill="#22D3EE" stroke="#0891B2" strokeWidth="1" />
            <polygon points="-12,-6 0,0 0,12 -12,6" fill="#0891B2" stroke="#0E7490" strokeWidth="1" />
            <polygon points="0,0 12,-6 12,6 0,12" fill="#06B6D4" stroke="#0891B2" strokeWidth="1" />
            {/* Glowing SQL glyph */}
            <text x="0" y="3" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#FFFFFF" fontFamily="monospace">SQL</text>
            {/* Connection beam to pet */}
            <line x1="-14" y1="2" x2="-26" y2="6" stroke="#22D3EE" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
          </g>
        )}

        {/* JSON API Cyber-Badge */}
        {equipped.neck === 'json_cyber_badge' && (
          <g transform="translate(100, 138)">
            <circle cx="0" cy="0" r="12" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="10" fill="#1E293B" />
            <text x="0" y="3" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#FBBF24" fontFamily="monospace">{'{ }'}</text>
          </g>
        )}

        {/* Kapitel 8 Überraschung: Holo-Crossmedia-Spektralprisma */}
        {equipped.neck === 'special_crossmedia_prism' && (
          <g transform="translate(100, 140)">
            {/* Spectral Aura */}
            <circle cx="0" cy="0" r="16" fill="#14B8A6" opacity="0.2" className="animate-pulse" />
            {/* Rainbow output rays */}
            <path d="M0,0 L20,-12" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
            <path d="M0,0 L24,-4" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
            <path d="M0,0 L24,6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
            <path d="M0,0 L20,14" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
            {/* White input beam */}
            <line x1="-22" y1="0" x2="-6" y2="0" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            {/* Glass Prism Triangle */}
            <polygon points="0,-12 11,8 -11,8" fill="#CCFBF1" stroke="#0D9488" strokeWidth="1.5" opacity="0.95" />
            <polygon points="0,-8 7,6 -7,6" fill="#5EEAD4" opacity="0.5" />
          </g>
        )}

        {/* 2. FACE ACCESSORIES */}
        {equipped.face === 'sunglasses' && (
          <g transform="translate(100, 84)">
            <rect x="-36" y="-8" width="30" height="18" rx="4" fill="#0F172A" />
            <rect x="6" y="-8" width="30" height="18" rx="4" fill="#0F172A" />
            <line x1="-6" y1="-2" x2="6" y2="-2" stroke="#0F172A" strokeWidth="3" />
            {/* Reflection gleam */}
            <line x1="-30" y1="4" x2="-14" y2="-4" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
            <line x1="12" y1="4" x2="28" y2="-4" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
          </g>
        )}

        {equipped.face === 'nerd_glasses' && (
          <g transform="translate(100, 84)">
            <circle cx="-20" cy="0" r="13" stroke="#451A03" strokeWidth="3.5" fill="rgba(255,255,255,0.2)" />
            <circle cx="20" cy="0" r="13" stroke="#451A03" strokeWidth="3.5" fill="rgba(255,255,255,0.2)" />
            <line x1="-7" y1="0" x2="7" y2="0" stroke="#451A03" strokeWidth="3.5" />
          </g>
        )}

        {equipped.face === 'pixel_shades' && (
          <g transform="translate(100, 84)">
            <path d="M-36,-6 H-6 V-2 H-16 V6 H-36 Z" fill="#000000" />
            <path d="M6,-6 H36 V-2 H26 V6 H6 Z" fill="#000000" />
            <rect x="-6" y="-6" width="12" height="4" fill="#000000" />
            <rect x="-32" y="-2" width="6" height="4" fill="#FFFFFF" />
            <rect x="10" y="-2" width="6" height="4" fill="#FFFFFF" />
          </g>
        )}

        {/* 3. HEAD ACCESSORIES */}
        {/* Kapitel 1 Überraschung: Holo-Cyber-Headset */}
        {equipped.head === 'special_ixd_headset' && (
          <g transform="translate(100, 75)">
            {/* Headband */}
            <path d="M-44,15 C-46,-30 46,-30 44,15" stroke="#06B6D4" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <path d="M-40,10 C-42,-25 42,-25 40,10" stroke="#67E8F9" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
            {/* Ear Cups */}
            <rect x="-52" y="5" width="12" height="24" rx="6" fill="#0891B2" stroke="#22D3EE" strokeWidth="2" />
            <rect x="40" y="5" width="12" height="24" rx="6" fill="#0891B2" stroke="#22D3EE" strokeWidth="2" />
            <circle cx="-46" cy="17" r="3" fill="#A5F3FC" />
            <circle cx="46" cy="17" r="3" fill="#A5F3FC" />
            {/* Microphone */}
            <path d="M-44,22 Q-42,38 -20,38" stroke="#0891B2" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="-18" cy="38" r="4" fill="#06B6D4" stroke="#A5F3FC" strokeWidth="1" />
          </g>
        )}

        {/* Kapitel 6 Überraschung: Scrum-Meister-Krone & Pokal */}
        {equipped.head === 'special_scrum_champion_crown' && (
          <g transform="translate(100, 46)">
            {/* Crown Base */}
            <polygon points="-28,8 -24,-20 -12,-6 0,-26 12,-6 24,-20 28,8" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            <rect x="-28" y="8" width="56" height="8" rx="2" fill="#D97706" />
            {/* Crown Jewels */}
            <circle cx="-24" cy="-20" r="3.5" fill="#EF4444" stroke="#FFF" strokeWidth="0.8" />
            <circle cx="0" cy="-26" r="4.5" fill="#3B82F6" stroke="#FFF" strokeWidth="0.8" />
            <circle cx="24" cy="-20" r="3.5" fill="#10B981" stroke="#FFF" strokeWidth="0.8" />
            <circle cx="-14" cy="12" r="2.5" fill="#EC4899" />
            <circle cx="0" cy="12" r="3" fill="#FDE047" />
            <circle cx="14" cy="12" r="2.5" fill="#06B6D4" />
          </g>
        )}

        {equipped.head === 'party_hat' && (
          <g transform="translate(100, 48)">
            <polygon points="0,-36 -18,6 18,6" fill="#8B5CF6" />
            <polygon points="-6,-6 10,-24 4,-30 -12,-12" fill="#EC4899" />
            <circle cx="0" cy="-38" r="5" fill="#FBBF24" />
          </g>
        )}

        {equipped.head === 'beanie' && (
          <g transform="translate(100, 52)">
            <ellipse cx="0" cy="2" rx="34" ry="16" fill="#0284C7" />
            <path d="M-32,2 Q0,-26 32,2 Z" fill="#0369A1" />
            <circle cx="0" cy="-24" r="6" fill="#F8FAFC" />
          </g>
        )}

        {equipped.head === 'grad_cap' && (
          <g transform="translate(100, 48)">
            <polygon points="-36,0 0,-14 36,0 0,14" fill="#1E293B" />
            <polygon points="-34,0 0,-12 34,0 0,12" fill="#0F172A" />
            <circle cx="0" cy="0" r="3" fill="#F59E0B" />
            <path d="M0,0 Q18,6 24,18" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
            <circle cx="24" cy="20" r="3.5" fill="#D97706" />
          </g>
        )}

        {equipped.head === 'wizard_hat' && (
          <g transform="translate(100, 48)">
            <ellipse cx="0" cy="8" rx="38" ry="10" fill="#4338CA" />
            <path d="M-22,6 Q-6,-46 22,-44 Q14,-32 18,6 Z" fill="#3730A3" />
            <polygon points="-4,-20 0,-28 4,-20" fill="#FBBF24" />
          </g>
        )}

        {equipped.head === 'crown' && (
          <g transform="translate(100, 48)">
            <polygon points="-24,6 -20,-16 -10,-4 0,-20 10,-4 20,-16 24,6" fill="#F59E0B" />
            <rect x="-24" y="6" width="48" height="6" rx="2" fill="#D97706" />
            <circle cx="-20" cy="-16" r="3" fill="#EF4444" />
            <circle cx="0" cy="-20" r="3.5" fill="#3B82F6" />
            <circle cx="20" cy="-16" r="3" fill="#10B981" />
          </g>
        )}

        {/* ======================================================== */}
        {/* UNICORN MAJESTIC HORN (Layered so it projects through     */}
        {/* hats, crowns, beanies and headsets majestically!)        */}
        {/* ======================================================== */}
        {species === 'unicorn' && (
          <g id="unicorn-horn-protruding">
            {/* Horn Aura / Magic glow */}
            <ellipse cx="100" cy="36" rx="15" ry="28" fill="#FDE047" opacity="0.22" className="animate-pulse" />

            {/* Hat penetration rim when headgear is equipped */}
            {equipped.head && (
              <g>
                <ellipse cx="100" cy="49" rx="10" ry="4" fill="#F59E0B" opacity="0.4" />
                <ellipse cx="100" cy="48" rx="8" ry="3" fill="#FEF08A" opacity="0.85" stroke="#D97706" strokeWidth="1" />
              </g>
            )}

            {/* Golden Spiral Horn Base to Tip */}
            <polygon points="100,10 93,65 107,65" fill="url(#unicorn-horn-grad)" stroke="#D97706" strokeWidth="1.2" />

            {/* Spiraling golden ridges */}
            <path d="M94 57 Q100 61 106 57" stroke="#FEF08A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M95 47 Q100 51 105 47" stroke="#FEF08A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M96 37 Q100 41 104 37" stroke="#FEF08A" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M97 27 Q100 31 103 27" stroke="#FEF08A" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M98.5 18 Q100 21 101.5 18" stroke="#FEF08A" strokeWidth="1.8" fill="none" strokeLinecap="round" />

            {/* Shimmering Tip Star & Glint */}
            <polygon points="100,2 102.5,7.5 108,10 102.5,12.5 100,18 97.5,12.5 92,10 97.5,7.5" fill="#FEF08A" />
            <circle cx="100" cy="10" r="2.2" fill="#FFFFFF" />
            <circle cx="100" cy="10" r="3.5" fill="#FDE047" opacity="0.6" className="animate-pulse" />
          </g>
        )}

        {/* ======================================================== */}
        {/* PET INTERACTIVE GADGET (Permanently anchored beside pet)  */}
        {/* ======================================================== */}
        {size !== 'sm' && gadget && (
          <g
            id="pet-active-gadget"
            transform="translate(156, 168)"
            onClick={handleGadgetClick}
            className="cursor-pointer group select-none"
            tabIndex={0}
            role="button"
            aria-label={`${gadget.name} anstupsen`}
          >
            {/* Floor Contact Shadow */}
            <ellipse
              cx="0"
              cy="9"
              rx={gadget.id === 'laser_pointer' ? "15" : "13"}
              ry="4"
              fill="currentColor"
              className={`text-slate-300/80 dark:text-slate-800 ${
                isGadgetActive && gadget.id === 'bouncing_ball' ? 'animate-gadget-ball-shadow' : ''
              }`}
            />

            {/* 1. BOUNCING BALL */}
            {gadget.id === 'bouncing_ball' && (
              <g className={isGadgetActive ? 'animate-gadget-ball-active' : 'animate-gadget-idle group-hover:scale-110 transition-transform'}>
                <circle cx="0" cy="0" r="13" fill="#06B6D4" stroke="#0891B2" strokeWidth="1.2" />
                <path d="M-13,0 A13,13 0 0,1 13,0 Z" fill="#F59E0B" />
                <path d="M0,-13 A13,13 0 0,1 0,13 Z" fill="#EC4899" opacity="0.85" />
                <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
                <polygon points="0,-3 1,-1 3.5,-1 1.5,0.5 2.5,3 0,1.5 -2.5,3 -1.5,0.5 -3.5,-1 -1,-1" fill="#6366F1" />
              </g>
            )}

            {/* 2. NEON LASERPOINTER */}
            {gadget.id === 'laser_pointer' && (
              <g>
                <g className={isGadgetActive ? 'animate-gadget-laser-device' : 'animate-gadget-idle group-hover:scale-105 transition-transform'}>
                  <rect x="-14" y="-4" width="26" height="8" rx="3" fill="#0F172A" stroke="#06B6D4" strokeWidth="1.2" />
                  <rect x="-10" y="-2" width="6" height="4" rx="1" fill="#06B6D4" opacity="0.7" className={isGadgetActive ? 'animate-pulse' : ''} />
                  <circle cx="8" cy="0" r="2.2" fill="#EF4444" />
                  <rect x="-14" y="-3" width="3" height="6" rx="1" fill="#94A3B8" />
                </g>

                {/* Laser Dot sweeping ground in front of pet */}
                {isGadgetActive && (
                  <g pointerEvents="none" className="animate-gadget-laser-dot">
                    <line x1="8" y1="0" x2="-20" y2="0" stroke="#EF4444" strokeWidth="1.5" strokeOpacity="0.7" strokeDasharray="3 2" />
                    <circle cx="0" cy="0" r="4" fill="#EF4444" />
                    <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />
                  </g>
                )}
              </g>
            )}

            {/* 3. MAGIC WAND */}
            {gadget.id === 'magic_wand' && (
              <g>
                <g className={isGadgetActive ? 'animate-gadget-wand-active' : 'animate-gadget-idle group-hover:scale-105 transition-transform'}>
                  <rect x="-16" y="-2" width="30" height="4" rx="1.5" fill="#78350F" stroke="#B45309" strokeWidth="0.8" />
                  <rect x="-16" y="-2.5" width="8" height="5" rx="1" fill="#F59E0B" />
                  <polygon
                    points="14,-9 16,-3 22,-3 17,1 19,7 14,3 9,7 11,1 6,-3 12,-3"
                    fill="#FDE047"
                    stroke="#D97706"
                    strokeWidth="0.8"
                  />
                  <circle cx="14" cy="-1" r="2.5" fill="#FFFFFF" />
                </g>

                {/* Wand Tip gentle shimmer during cast */}
                {isGadgetActive && (
                  <g pointerEvents="none" transform="translate(14, -1)">
                    <circle cx="0" cy="0" r="8" fill="none" stroke="#FDE047" strokeWidth="1.2" className="animate-pulse" />
                    <text x="-4" y="3" fontSize="8" fill="#FDE047">✨</text>
                  </g>
                )}
              </g>
            )}

            {/* 4. FIDGET CUBE */}
            {gadget.id === 'fidget_cube' && (
              <g className={isGadgetActive ? 'animate-gadget-fidget-active' : 'animate-gadget-idle group-hover:scale-110 transition-transform'}>
                <polygon points="0,-12 11,-6 0,0 -11,-6" fill="#818CF8" stroke="#4F46E5" strokeWidth="1" />
                <polygon points="-11,-6 0,0 0,11 -11,5" fill="#4F46E5" stroke="#3730A3" strokeWidth="1" />
                <polygon points="0,0 11,-6 11,5 0,11" fill="#6366F1" stroke="#4338CA" strokeWidth="1" />
                <circle cx="-1" cy="-6" r="2.5" fill="#22D3EE" />
                <circle cx="-5" cy="3" r="1.5" fill="#F43F5E" />
                <circle cx="5" cy="3" r="1.5" fill="#FBBF24" />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};
