import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Radio, Compass, Globe2 } from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { useT } from '../i18n/LanguageContext';
import { Starfield } from './Starfield';
import { OrbitalDial } from './OrbitalDial';
import { worldsData } from '../data/worldsData';

interface HeroProps {
  activeWorld: 'Moon' | 'Mars';
  onExploreClick: () => void;
  onWorldChange?: (world: 'Moon' | 'Mars') => void;
}

/**
 * Observation deck: an asymmetric 7/5 composition. The left column carries
 * the archive statement and key metrics; the right column is a live-looking
 * instrument panel with the planetary dial and tracking readout.
 */
export const Hero: React.FC<HeroProps> = ({ activeWorld, onExploreClick, onWorldChange }) => {
  const { t, localize } = useT();
  const world = worldsData[activeWorld];

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-24 sm:pt-28 xl:pb-24 xl:pt-20">
      {/* Atmosphere */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-nebula" />
        <Starfield density={0.00013} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[color:var(--void)] to-transparent" />
      </div>

      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 xl:ps-14 xl:pe-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---------------- Statement column ---------------- */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-x-3 gap-y-2"
            >
              <span className="chapter-tag">{t.hero.badge}</span>
              <span className="hidden h-px w-10 bg-[color:var(--line-strong)] sm:block" aria-hidden="true" />
              <span className="mono-label normal-case tracking-[0.1em]">{t.footer.dataCredit}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="font-display mt-6 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-[color:var(--ink)]"
              style={{ textWrap: 'balance' }}
            >
              {t.hero.titlePart1}
              <br />
              <span className="bg-gradient-to-r from-[#4fd8ff] via-[#7b8bff] to-[#2e7dff] bg-clip-text text-transparent">
                {t.hero.titlePart2}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-6 max-w-[46rem] text-[0.95rem] leading-[1.7] text-[color:var(--ink-2)] sm:text-base"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={() => {
                  spaceAudio.playTelemetryBeep(1200, 0.05);
                  onExploreClick();
                }}
                className="btn-primary group"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </button>

              <a href="#map-section" onClick={() => spaceAudio.playTelemetryBeep(900, 0.04)} className="btn-ghost">
                <Globe2 className="h-3.5 w-3.5 text-[color:var(--cyan)]" />
                <span>{t.hero.viewMapBtn}</span>
              </a>
            </motion.div>

            {/* Key metrics — hairline ledger, not a card row */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="mt-11 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[color:var(--line)] pt-6 sm:grid-cols-4"
            >
              {[
                { value: '14', label: t.hero.statsMissions, tone: false },
                { value: '55+', label: t.hero.statsTimeSpan, tone: false },
                { value: '120+', label: t.hero.statsDistance, tone: true },
                { value: '100%', label: t.hero.statsHeritage, tone: false },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt
                    className={`font-mono-tabular text-2xl font-medium ${
                      stat.tone ? 'text-[color:var(--cyan)]' : 'text-[color:var(--ink)]'
                    }`}
                  >
                    {stat.value}
                  </dt>
                  <dd className="mono-label mt-1.5 normal-case leading-snug tracking-[0.06em]">{stat.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ---------------- Instrument panel ---------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="panel-raised relative overflow-hidden">
              {/* Panel header */}
              <div className="flex items-center justify-between gap-3 border-b border-[color:var(--line)] px-4 py-3">
                <span className="mono-label">ORBITAL TRIANGULATION</span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--signal)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--signal)] animate-pulse-soft" />
                  TRACKING
                </span>
              </div>

              {/* Dial */}
              <div className="relative flex items-center justify-center px-4 py-6">
                <div className="absolute inset-0 bg-dot-pattern opacity-[0.35]" aria-hidden="true" />
                <OrbitalDial
                  size={330}
                  tone={activeWorld === 'Mars' ? 'mars' : 'luna'}
                  tilt={activeWorld === 'Mars' ? -18 : 12}
                  className="relative max-w-full [&>svg]:h-auto"
                />
                <div className="pointer-events-none absolute left-5 top-5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-[color:var(--ink-3)]">
                  <div>REC // 28.5721°N 80.6480°W</div>
                  <div className="text-[color:var(--ink-3)]/70">DSN GOLDSTONE · MADRID · CANBERRA</div>
                </div>
              </div>

              {/* World switch + readouts */}
              <div className="border-t border-[color:var(--line)] px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="mono-label">{t.worldSelector.sectorPrefix}</p>
                    <p className="font-display mt-1 text-lg font-medium text-[color:var(--ink)]">
                      {localize(world.name)}
                    </p>
                  </div>

                  <div className="flex overflow-hidden rounded-md border border-[color:var(--line)]">
                    {(['Mars', 'Moon'] as const).map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          onWorldChange?.(option);
                          spaceAudio.playTelemetryBeep(option === 'Mars' ? 1300 : 1100, 0.04);
                        }}
                        aria-pressed={activeWorld === option}
                        className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                          activeWorld === option
                            ? 'bg-[color:var(--blue)] text-[color:var(--ink)]'
                            : 'text-[color:var(--ink-3)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--ink)]'
                        }`}
                      >
                        {option === 'Mars' ? 'MRS' : 'LNA'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-md border border-[color:var(--line)] bg-[color:var(--surface-2)]/60 px-3 py-2">
                    <p className="mono-label">{t.worldSelector.distanceLabel}</p>
                    <p className="font-mono-tabular mt-1 truncate text-[12px] text-[color:var(--ink)]">
                      {localize(world.stats.distanceFromEarth)}
                    </p>
                  </div>
                  <div className="rounded-md border border-[color:var(--line)] bg-[color:var(--surface-2)]/60 px-3 py-2">
                    <p className="mono-label">{t.worldSelector.machinesLeft}</p>
                    <p className="font-mono-tabular mt-1 text-[12px] text-[color:var(--cyan)]">
                      {world.stats.objectsCount} {t.worldSelector.inArchiveCatalog.toLowerCase()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between px-1">
              <span className="mono-label flex items-center gap-2">
                <Radio className="h-3 w-3 text-[color:var(--cyan)]" />
                {t.hero.scrollHint}
              </span>
              <span className="mono-label flex items-center gap-1.5">
                <Compass className="h-3 w-3" />
                2026
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};