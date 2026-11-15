import React from 'react';
import { motion } from 'motion/react';
import { Mission } from '../types/mission';
import { SchematicView } from './SchematicView';
import { ArrowUpRight, Activity } from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { useT } from '../i18n/LanguageContext';

interface MissionCardProps {
  mission: Mission;
  onOpenDetail: (mission: Mission) => void;
  index?: number;
}

const statusTone = (statusType: string) => {
  switch (statusType) {
    case 'active':
      return 'text-[color:var(--signal)] border-[rgba(55,224,200,0.35)]';
    case 'silent':
      return 'text-[color:var(--ink-2)] border-[color:var(--line-strong)]';
    case 'complete':
    default:
      return 'text-[color:var(--indigo)] border-[rgba(123,139,255,0.35)]';
  }
};

/**
 * Dense dossier card: mono index, schematic plate, two metric rows.
 * Accent usage is limited to a single destination tick and the status chip.
 */
export const MissionCard = React.forwardRef<HTMLElement, MissionCardProps>(
  ({ mission, onOpenDetail, index = 0 }, ref) => {
  const { t, localize } = useT();
  const isMars = mission.destination === 'Mars';

  return (
    <motion.article
      ref={ref}
      layout
      className="relic-card group flex min-w-0 cursor-pointer flex-col overflow-hidden p-4"
      onClick={() => {
        spaceAudio.playTelemetryBeep(1300, 0.04);
        onOpenDetail(mission);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpenDetail(mission);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${localize(mission.name)} — ${t.explorer.cardDetailsBtn}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${isMars ? 'bg-[color:var(--cyan)]' : 'bg-[color:var(--indigo)]'}`}
            aria-hidden="true"
          />
          <span className="mono-label truncate">
            {isMars ? t.worldSelector.marsTitle : t.worldSelector.moonTitle} · {localize(mission.type)}
          </span>
        </div>
        <span className="font-mono-tabular text-[10px] tracking-[0.12em] text-[color:var(--ink-3)]">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="font-display mt-2.5 flex items-start justify-between gap-2 text-[17px] leading-snug text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--cyan)]">
        <span className="min-w-0">{localize(mission.name)}</span>
        <ArrowUpRight
          className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--ink-3)] opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--cyan)] group-hover:opacity-100"
          aria-hidden="true"
        />
      </h3>
      <p className="mono-label mt-1 truncate">{mission.englishName}</p>

      <div className="my-3">
        <SchematicView
          type={mission.schematicType}
          accentColor={isMars ? '#4fd8ff' : '#7b8bff'}
          className="h-36"
        />
      </div>

      <p className="line-clamp-2 text-xs leading-relaxed text-[color:var(--ink-2)]">
        {localize(mission.shortDescription)}
      </p>

      <div className="mt-3 space-y-1.5 border-t border-[color:var(--line)] pt-3">
        <div className="flex items-center justify-between gap-3">
          <span className="mono-label shrink-0">{t.explorer.cardCoords}</span>
          <span className="font-mono-tabular min-w-0 truncate text-[11px] text-[color:var(--ink-2)]">
            {mission.coordinates.lat}, {mission.coordinates.lon}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="mono-label flex shrink-0 items-center gap-1.5">
            <Activity className="h-3 w-3 text-[color:var(--ink-3)]" />
            {t.explorer.cardStatus}
          </span>
          <span
            title={localize(mission.status)}
            className={`min-w-0 truncate rounded border px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.08em] ${statusTone(
              mission.statusType
            )}`}
          >
            {localize(mission.status)}
          </span>
        </div>
      </div>
    </motion.article>
  );
});

MissionCard.displayName = 'MissionCard';