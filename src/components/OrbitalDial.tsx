import React from 'react';

interface OrbitalDialProps {
  size?: number;
  tilt?: number;
  className?: string;
  tone?: 'mars' | 'luna';
  animated?: boolean;
}

/**
 * Instrument-style planetary dial: the planet disc plus concentric orbital
 * tracks, coordinate ticks and a satellite marker. Pure SVG so it scales
 * cleanly and follows the current theme tokens.
 */
export const OrbitalDial: React.FC<OrbitalDialProps> = ({
  size = 480,
  tilt = -18,
  className = '',
  tone = 'mars',
  animated = true,
}) => {
  const palette =
    tone === 'mars'
      ? { core: '#1d3f8f', edge: '#0a1836', rim: '#4fd8ff', spot: 'rgba(79,216,255,0.22)' }
      : { core: '#16294f', edge: '#071022', rim: '#a9bad8', spot: 'rgba(169,186,216,0.16)' };

  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 480 480" className="h-full w-full">
        <defs>
          <radialGradient id={`globe-${tone}`} cx="38%" cy="32%" r="72%">
            <stop offset="0%" stopColor={palette.core} />
            <stop offset="62%" stopColor={palette.core} stopOpacity="0.85" />
            <stop offset="100%" stopColor={palette.edge} />
          </radialGradient>
          <radialGradient id={`halo-${tone}`} cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor={palette.rim} stopOpacity="0" />
            <stop offset="82%" stopColor={palette.rim} stopOpacity="0.16" />
            <stop offset="100%" stopColor={palette.rim} stopOpacity="0" />
          </radialGradient>
          <clipPath id={`clip-${tone}`}>
            <circle cx="240" cy="240" r="132" />
          </clipPath>
        </defs>

        {/* Halo */}
        <circle cx="240" cy="240" r="232" fill={`url(#halo-${tone})`} />

        {/* Coordinate ticks */}
        <g opacity="0.55">
          {ticks.map((deg) => {
            const major = deg % 30 === 0;
            const rad = (deg * Math.PI) / 180;
            const outer = 222;
            const inner = major ? 206 : 214;
            return (
              <line
                key={deg}
                x1={240 + Math.cos(rad) * outer}
                y1={240 + Math.sin(rad) * outer}
                x2={240 + Math.cos(rad) * inner}
                y2={240 + Math.sin(rad) * inner}
                stroke={major ? 'rgba(79,216,255,0.55)' : 'rgba(124,161,255,0.28)'}
                strokeWidth={major ? 1 : 0.6}
              />
            );
          })}
        </g>

        {/* Orbital tracks */}
        <g fill="none">
          <circle cx="240" cy="240" r="178" stroke="rgba(124,161,255,0.22)" strokeWidth="1" />
          <circle
            cx="240"
            cy="240"
            r="204"
            stroke="rgba(79,216,255,0.28)"
            strokeWidth="1"
            strokeDasharray="2 9"
            className={animated ? 'animate-spin-slow' : undefined}
            style={{ transformOrigin: '240px 240px' }}
          />
          <ellipse
            cx="240"
            cy="240"
            rx="196"
            ry="76"
            stroke="rgba(123,139,255,0.32)"
            strokeWidth="1"
            transform={`rotate(${tilt} 240 240)`}
          />
        </g>

        {/* Planet body */}
        <circle cx="240" cy="240" r="132" fill={`url(#globe-${tone})`} stroke={palette.rim} strokeOpacity="0.4" />
        <g clipPath={`url(#clip-${tone})`} opacity="0.9">
          {/* Latitude/longitude construction lines */}
          <g stroke="rgba(180,214,255,0.16)" strokeWidth="0.8" fill="none">
            <ellipse cx="240" cy="240" rx="132" ry="46" />
            <ellipse cx="240" cy="240" rx="132" ry="94" />
            <ellipse cx="240" cy="240" rx="46" ry="132" />
            <ellipse cx="240" cy="240" rx="94" ry="132" />
            <line x1="108" y1="240" x2="372" y2="240" />
            <line x1="240" y1="108" x2="240" y2="372" />
          </g>
          {/* Terrain-like surface patches */}
          <ellipse cx="196" cy="212" rx="58" ry="34" fill={palette.spot} transform="rotate(-14 196 212)" />
          <ellipse cx="292" cy="278" rx="44" ry="26" fill={palette.spot} transform="rotate(12 292 278)" />
        </g>

        {/* Terminator shadow */}
        <path
          d="M240 108 a132 132 0 0 1 0 264 a96 132 0 0 0 0 -264 Z"
          fill="rgba(4,9,20,0.55)"
        />

        {/* Satellite marker on outer track */}
        <g>
          <circle cx="240" cy="36" r="10" fill="rgba(79,216,255,0.12)" />
          <circle cx="240" cy="36" r="3.5" fill="#4fd8ff" />
          <line x1="240" y1="36" x2="240" y2="66" stroke="rgba(79,216,255,0.5)" strokeWidth="0.8" strokeDasharray="2 3" />
        </g>

        {/* Crosshair frame */}
        <g stroke="rgba(124,161,255,0.3)" strokeWidth="0.8">
          <line x1="6" y1="240" x2="40" y2="240" />
          <line x1="440" y1="240" x2="474" y2="240" />
          <line x1="240" y1="6" x2="240" y2="40" />
          <line x1="240" y1="440" x2="240" y2="474" />
        </g>
      </svg>
    </div>
  );
};