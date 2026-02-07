import React from 'react';

interface BrandHeaderBannerProps {
  showSubtext?: boolean;
}

export default function BrandHeaderBanner({ showSubtext = true }: BrandHeaderBannerProps) {
  return (
    <div className="relative w-full bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] border-b border-[#2a2a2a] overflow-hidden">
      {/* Subtle CSS texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.05) 2px,
            rgba(255, 255, 255, 0.05) 4px
          )`,
        }}
      />

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center py-6 px-4">
        {/* Dagger emblem */}
        <div className="mb-3">
          <img
            src="/assets/generated/dagger-icon-mark.dim_256x256.png"
            alt="Dagger Brigade emblem"
            className="h-12 w-auto opacity-90"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white tracking-wide mb-1">
          Dagger Brigade H2F
        </h1>

        {/* Subtext */}
        {showSubtext && (
          <p className="text-sm text-gray-400 tracking-wider">
            1ID <span className="text-[#8b0000] mx-1">•</span> 2ABCT <span className="text-[#8b0000] mx-1">•</span> Fort Riley
          </p>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8b0000] to-transparent pointer-events-none" />
    </div>
  );
}
