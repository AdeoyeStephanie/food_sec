'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

// Source artwork is 256x242 (public/pantree-logo.png); preserve that ratio.
const LOGO_RATIO = 242 / 256;

/**
 * Pantree brand mark — a hand-drawn seedling breaking through soil.
 */
export default function BrandLogo({ size = 32, showText = true, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/pantree-logo.png"
        alt="Pantree"
        width={size}
        height={Math.round(size * LOGO_RATIO)}
        className="object-contain shrink-0"
        priority
      />
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center font-black tracking-tight text-base md:text-lg text-[#2E7D32]">
            Pantree
          </div>
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-600 mt-0.5">
            Baltimore
          </span>
        </div>
      )}
    </div>
  );
}
