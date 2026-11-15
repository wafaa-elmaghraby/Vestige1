import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { worldsData } from '../data/worldsData';
import { Destination } from '../types/mission';
import { spaceAudio } from '../utils/audio';
import { useT } from '../i18n/LanguageContext';
import { Compass, Thermometer, Orbit, Rocket, Radio, Globe, ArrowRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { OrbitalDial } from './OrbitalDial';

interface WorldSelectorProps {
  selectedWorld: Destination;
  onSelectWorld: (world: Destination) => void;
}

const worlds: Destination[] = ['Mars', 'Moon'];

/**
 * Comparison stage: both bodies stay visible at once as instrument plates with
 * a per-body telemetry ledger. Selecting one promotes its detail rail.
 */
export const WorldSelector: React.FC<WorldSelectorProps> = ({ selectedWorld, onSelectWorld }) => {
  const { t, localize } = useT();
  const current = worldsData[selectedWorld];

  const specs = [
    { label: t.worldSelector.allMissions, value: localize(current.stats.missionsCount), Icon: Radio },
    { label: t.worldSelector.machinesLeft, value: String(current.stats.objectsCount), Icon: Rocket },
    { label: t.worldSelector.distanceLabel, value: localize(current.stats.distanceFromEarth), Icon: Orbit },
    { label: t.worldSelector.temperatureLabel, value: localize(current.stats.surfaceTemp), Icon: Thermometer },
  ];

  return (
    <section id="worlds" className="relative border-t border-[color:var(--line)] py-16 sm:py-20 xl:py-[88px]">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 xl:ps-14 xl:pe-10">
        <SectionHeading
          index="01"
          tag={t.worldSelector.sectionTag.replace(/^\d+\s*\/\/\s*/, '')}
          title={t.worldSelector.title}
          description={t.worldSelector.subtitle}
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {/* ---------- Body plates ---------- */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {worlds.map((worldId) => {
              const world = worldsData[worldId];
              const isActive = selectedWorld === worldId;
              return (
                <button
                  key={worldId}
                  onClick={() => {
                    onSelectWorld(worldId);
                    spaceAudio.playTelemetryBeep(worldId === 'Mars' ? 1400 : 1100, 0.04);
                  }}
                  aria-pressed={isActive}
                  className={`group relative overflow-hidden rounded-[14px] border p-5 text-left transition-all duration-200 ${
                    isActive
                      ? 'border-[color:var(--line-strong)] bg-[color:var(--surface-2)]'
                      : 'border-[color:var(--line)] bg-[color:var(--surface)] hover:border-[color:var(--line-strong)]'
                  }`}
                >
                  <div className="absolute inset-0 bg-grid-pattern opacity-40" aria-hidden="true" />

                  <div className="relative flex items-start justify-between gap-3">
                    <div>
                      <p className="mono-label">{t.worldSelector.sectorPrefix}</p>
                      <h3 className="font-display mt-1.5 text-xl font-semibold text-[color:var(--ink)]">
                        {localize(world.name)}
                      </h3>
                      <p className="mono-label mt-1">{world.englishName}</p>
                    </div>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                        isActive
                          ? 'border-[color:var(--cyan)] bg-[color:var(--cyan)]/15'
                          : 'border-[color:var(--line-strong)]'
                      }`}
                      aria-hidden="true"
                    >
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--cyan)]" />}
                    </span>
                  </div>

                  <div className="relative mx-auto mt-2 flex max-w-[220px] justify-center">
                    <OrbitalDial
                      size={200}
                      tone={worldId === 'Mars' ? 'mars' : 'luna'}
                      tilt={worldId === 'Mars' ? -18 : 12}
                      animated={isActive}
                      className="opacity-90 transition-opacity group-hover:opacity-100"
                    />
                  </div>

                  <p className="relative mt-1 text-xs leading-relaxed text-[color:var(--ink-2)]">
                    {localize(world.tagline)}
                  </p>

                  <div className="relative mt-4 flex items-center justify-between border-t border-[color:var(--line)] pt-3">
                    <span className="font-mono-tabular text-[11px] text-[color:var(--ink-3)]">
                      {world.stats.timeSpan}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--cyan)]">
                      {isActive ? 'ACTIVE BODY' : t.worldSelector.viewObjectsBtn}
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ---------- Detail rail ---------- */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                className="panel h-full p-5 sm:p-6"
              >
                <div className="flex items-center justify-between gap-3 border-b border-[color:var(--line)] pb-4">
                  <div className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-[color:var(--cyan)]" />
                    <span className="mono-label">{t.worldSelector.envConditions}</span>
                  </div>
                  <span className="font-display text-xs uppercase tracking-[0.2em] text-[color:var(--ink-3)]">
                    {current.englishName}
                  </span>
                </div>

                <dl className="mt-4 divide-y divide-[color:var(--line)]">
                  {specs.map(({ label, value, Icon }) => (
                    <div key={label} className="flex items-center justify-between gap-4 py-2.5">
                      <dt className="flex min-w-0 items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-[color:var(--ink-3)]">
                        <Icon className="h-3.5 w-3.5 shrink-0 text-[color:var(--ink-3)]" />
                        <span className="truncate">{label}</span>
                      </dt>
                      <dd className="font-mono-tabular shrink-0 text-right text-[12px] text-[color:var(--ink)]">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-4 border-t border-[color:var(--line)] pt-4 text-xs leading-relaxed text-[color:var(--ink-2)]">
                  {localize(current.description)}
                </p>

                <div className="mt-4 rounded-md border border-[color:var(--line)] bg-[color:var(--surface-2)]/60 px-3 py-2.5">
                  <p className="mono-label">{t.worldSelector.statEnvironment}</p>
                  <p className="mt-1 font-mono text-[11px] leading-relaxed text-[color:var(--ink-2)]">
                    {localize(current.stats.environment)}
                  </p>
                </div>

                <a
                  href="#explorer"
                  onClick={() => spaceAudio.playTelemetryBeep(1200, 0.04)}
                  className="btn-ghost mt-4 w-full"
                >
                  <Compass className="h-3.5 w-3.5 text-[color:var(--cyan)]" />
                  <span>
                    {t.worldSelector.viewObjectsBtn} ({current.stats.objectsCount})
                  </span>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};