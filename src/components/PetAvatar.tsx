import React from 'react';
import { PetSpecies, PetState } from '../types/quiz';

interface Props {
  pet: PetState;
  isEating?: boolean;
  isPetted?: boolean;
  size?: 'sm' | 'md' | 'lg';
  previewOverride?: {
    equipped?: Partial<PetState['equipped']>;
  };
}

export const PetAvatar: React.FC<Props> = ({
  pet,
  isEating,
  isPetted,
  size = 'lg',
  previewOverride,
}) => {
  const { species, happiness, hunger } = pet;
  const equipped = {
    ...pet.equipped,
    ...(previewOverride?.equipped || {}),
  };

  const isEcstatic = happiness >= 70;
  const isHungry = hunger <= 30;

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  }[size];

  const isSleeping = Boolean(pet.isSleeping);

  return (
    <div className={`relative ${sizeClasses} mx-auto flex items-center justify-center select-none transition-transform duration-300 ${
      isEating ? 'animate-bounce scale-105' : isPetted ? 'scale-110' : isSleeping ? 'scale-95 opacity-90' : 'animate-pet-breathe hover:scale-105'
    }`}>
      {/* Equipped Animated Pet Frame */}
      {equipped?.frame === 'frame-bronze' && (
        <div className="absolute -inset-2 rounded-full border-2 border-amber-500/80 shadow-[0_0_15px_rgba(217,119,6,0.35)] pointer-events-none animate-pulse" />
      )}
      {equipped?.frame === 'frame-neon' && (
        <div className="absolute -inset-2.5 rounded-full border-2 border-cyan-400 ring-2 ring-fuchsia-500 shadow-[0_0_20px_rgba(6,182,212,0.8)] animate-pulse pointer-events-none" />
      )}
      {equipped?.frame === 'frame-stardust' && (
        <div className="absolute -inset-2.5 rounded-full border-2 border-purple-400 ring-2 ring-indigo-400/80 shadow-[0_0_25px_rgba(168,85,247,0.6)] animate-pulse pointer-events-none">
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs animate-spin-slow">✨</span>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs animate-bounce">⭐</span>
          <span className="absolute top-1/2 -left-2 -translate-y-1/2 text-xs animate-pulse">✦</span>
          <span className="absolute top-1/2 -right-2 -translate-y-1/2 text-xs animate-pulse">✧</span>
        </div>
      )}
      {equipped?.frame === 'frame-rainbow' && (
        <div className="absolute -inset-3 rounded-full border-[3.5px] border-amber-400 ring-2 ring-emerald-400 ring-offset-2 ring-offset-rose-500 shadow-[0_0_25px_rgba(236,72,153,0.7)] animate-spin-rainbow pointer-events-none" />
      )}
      {equipped?.frame === 'frame-divine' && (
        <div className="absolute -inset-3.5 rounded-full border-4 border-amber-300 ring-4 ring-yellow-400 shadow-[0_0_35px_rgba(250,204,21,0.9)] animate-pulse pointer-events-none">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-base select-none animate-bounce">👑</div>
        </div>
      )}

      {/* Reactive heart animation when petted */}
      {isPetted && (
        <div className="absolute -top-4 text-2xl animate-ping pointer-events-none z-20">
          💖
        </div>
      )}

      {/* Reactive food crumbs when eating */}
      {isEating && (
        <div className="absolute -bottom-2 text-xl animate-pulse pointer-events-none z-20">
          ✨😋✨
        </div>
      )}

      {/* Peaceful Sleep Floating Zzz Bubble */}
      {isSleeping && (
        <div className="absolute -top-4 right-1 flex flex-col items-center pointer-events-none select-none z-20 animate-bounce">
          <span className="text-sm font-black text-indigo-500 dark:text-indigo-400 drop-shadow">Z</span>
          <span className="text-xs font-bold text-indigo-400 dark:text-indigo-300 -mt-1 ml-2">z</span>
          <span className="text-[10px] font-semibold text-indigo-300 dark:text-indigo-200 -mt-1 ml-3">z</span>
        </div>
      )}

      {/* Pet SVG Illustrations */}
      <svg viewBox="0 0 200 200" className="w-full h-full select-none overflow-visible">
        <defs>
          <linearGradient id="rainbow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="75%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
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
      </svg>
    </div>
  );
};
