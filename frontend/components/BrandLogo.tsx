'use client';

import React from 'react';

interface LogoProps {
  variant?: 'community-bowl' | 'pulse-pin' | 'shelf-seed' | 'vital-heartbeat';
  size?: number;
  showText?: boolean;
  className?: string;
}

/**
 * Concept 3: The "Community Nourishing Bowl" (Selected)
 * A sturdy food bowl with rising aroma steam that forms an active pulse rhythm.
 */
export function CommunityBowlIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Forest Squircle Tile */}
      <rect width="32" height="32" rx="9" fill="#064E3B" />
      {/* Rising Steam Pulse Rhythm */}
      <path
        d="M4 11h6l2.2-4.5 3 8 2.2-5.5 1.6 2h7"
        stroke="#10B981"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* White Community Food Bowl */}
      <path
        d="M5 16h22c0 6.5-4.8 12-11 12S5 22.5 5 16Z"
        fill="#FFFFFF"
      />
      {/* Bowl Base */}
      <rect x="12" y="27" width="8" height="2" rx="1" fill="#FFFFFF" />
      {/* Golden Nourishment Grain Accent */}
      <circle cx="16" cy="21" r="2.2" fill="#F59E0B" />
    </svg>
  );
}

/**
 * Option 1: The "Pulse-Pin"
 * An iconic geometric location pin with a clean negative-space 3-bar shelf equalizer
 */
export function PulsePinIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16 2C9.373 2 4 7.373 4 14c0 8.837 10.4 15.2 11.3 15.74a1.2 1.2 0 0 0 1.4 0c.9-.54 11.3-6.903 11.3-15.74 0-6.627-5.373-12-12-12Z"
        fill="#064E3B"
      />
      <rect x="9.5" y="10" width="13" height="2.2" rx="1.1" fill="#FFFFFF" />
      <rect x="11.5" y="14" width="9" height="2.2" rx="1.1" fill="#10B981" />
      <rect x="13.5" y="18" width="5" height="2.2" rx="1.1" fill="#F59E0B" />
    </svg>
  );
}

/**
 * Option 2: The "Shelf & Seed"
 * Minimalist circular seal with horizontal pantry shelves and an organic leaf/check
 */
export function ShelfSeedIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="9" fill="#064E3B" />
      <line x1="7" y1="22" x2="25" y2="22" stroke="#A7F3D0" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M10 16c2-4 6-6 11-6 0 5-2 9-6 11l-5-5Z"
        fill="#10B981"
      />
      <path
        d="M15 22v-6"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Option 3: The "Vital Heartbeat"
 * Clean municipal pulse wave
 */
export function VitalHeartbeatIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="9" fill="#064E3B" />
      <path
        d="M4 16h6l2-4 3 8 2-6 2 2h7"
        stroke="#10B981"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BrandLogo({
  variant = 'community-bowl',
  size = 32,
  showText = true,
  className = ''
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {variant === 'community-bowl' && <CommunityBowlIcon size={size} />}
      {variant === 'pulse-pin' && <PulsePinIcon size={size} />}
      {variant === 'shelf-seed' && <ShelfSeedIcon size={size} />}
      {variant === 'vital-heartbeat' && <VitalHeartbeatIcon size={size} />}

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center font-black tracking-tight text-slate-900 text-base md:text-lg">
            <span className="text-[#064E3B]">Pan</span>
            <span className="text-[#10B981] font-black">tree</span>
          </div>
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-500 mt-0.5">
            Baltimore
          </span>
        </div>
      )}
    </div>
  );
}
