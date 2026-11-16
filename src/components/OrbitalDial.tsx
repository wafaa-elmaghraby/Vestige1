import React, { useId } from 'react';

interface OrbitalDialProps {
  size?: number;
  tilt?: number;
  className?: string;
  tone?: 'mars' | 'luna';
  animated?: boolean;
}

export const OrbitalDial: React.FC<OrbitalDialProps> = ({
  size = 480,
  tilt = -18,
  className = '',
  tone = 'mars',
  animated = true,
}) => {
  const uid = useId().replace(/:/g, '');
  const palette =
    tone === 'mars'
      ? {
          core: '#d15a34',
          mid: '#8e321b',
          edge: '#260b08',
          rim: '#ff9670',
          spot: 'rgba(255, 174, 138, 0.24)',
          darkSpot: 'rgba(48, 12, 8, 0.42)',
          tickMajor: 'rgba(255, 150, 112, 0.6)',
          track: 'rgba(255, 150, 112, 0.34)',
          satellite: '#ff9670',
        }
      : {
          core: '#8fa0bd',
          mid: '#4b5973',
          edge: '#0e1626',
          rim: '#cbd5e1',
          spot: 'rgba(226, 232, 240, 0.22)',
          darkSpot: 'rgba(12, 20, 36, 0.44)',
          tickMajor: 'rgba(79, 216, 255, 0.55)',
          track: 'rgba(79, 216, 255, 0.28)',
          satellite: '#4fd8ff',
        };

  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 480 480" className="h-full w-full">
        <defs>
          <radialGradient id={`globe-${uid}`} cx="36%" cy="30%" r="74%">
            <stop offset="0%" stopColor={palette.core} />
            <stop offset="56%" stopColor={palette.mid} stopOpacity="0.95" />
            <stop offset="100%" stopColor={palette.edge} />
          </radialGradient>
          <radialGradient id={`halo-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor={palette.rim} stopOpacity="0" />
            <stop offset="82%" stopColor={palette.rim} stopOpacity="0.18" />
            <stop offset="100%" stopColor={palette.rim} stopOpacity="0" />
          </radialGradient>
          <clipPath id={`clip-${uid}`}>
            <circle cx="240" cy="240" r="132" />
          </clipPath>
        </defs>

        <circle cx="240" cy="240" r="232" fill={`url(#halo-${uid})`} />

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
                stroke={major ? palette.tickMajor : 'rgba(124,161,255,0.28)'}
                strokeWidth={major ? 1 : 0.6}
              />
            );
          })}
        </g>

        <g fill="none">
          <circle cx="240" cy="240" r="178" stroke="rgba(124,161,255,0.22)" strokeWidth="1" />
          <circle
            cx="240"
            cy="240"
            r="204"
            stroke={palette.track}
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

        <circle cx="240" cy="240" r="132" fill={`url(#globe-${uid})`} stroke={palette.rim} strokeOpacity="0.45" />
        <g clipPath={`url(#clip-${uid})`} opacity="0.9">
          <g stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" fill="none">
            <ellipse cx="240" cy="240" rx="132" ry="46" />
            <ellipse cx="240" cy="240" rx="132" ry="94" />
            <ellipse cx="240" cy="240" rx="46" ry="132" />
            <ellipse cx="240" cy="240" rx="94" ry="132" />
            <line x1="108" y1="240" x2="372" y2="240" />
            <line x1="240" y1="108" x2="240" y2="372" />
          </g>
          <ellipse cx="196" cy="212" rx="58" ry="34" fill={palette.spot} transform="rotate(-14 196 212)" />
          <ellipse cx="288" cy="274" rx="46" ry="26" fill={palette.darkSpot} transform="rotate(12 288 274)" />
          {tone === 'mars' && (
            <ellipse cx="240" cy="122" rx="34" ry="11" fill="rgba(255, 236, 224, 0.45)" />
          )}
        </g>

        <path
          d="M240 108 a132 132 0 0 1 0 264 a96 132 0 0 0 0 -264 Z"
          fill="rgba(4,9,20,0.52)"
        />

        <g>
          <circle cx="240" cy="36" r="10" fill={palette.spot} />
          <circle cx="240" cy="36" r="3.5" fill={palette.satellite} />
          <line x1="240" y1="36" x2="240" y2="66" stroke={palette.track} strokeWidth="0.8" strokeDasharray="2 3" />
        </g>

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
