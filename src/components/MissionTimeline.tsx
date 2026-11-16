import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { missionsData } from '../data/missionsData';
import { Mission, Destination } from '../types/mission';
import { spaceAudio } from '../utils/audio';
import { useT } from '../i18n/LanguageContext';
import { yearOf } from '../utils/nasa';
import { ChevronRight, Compass, Rocket } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

interface MissionTimelineProps {
  onSelectMission: (mission: Mission) => void;
  selectedWorld?: Destination;
}

/**
 * Vertical year spine with a sticky dossier pane. The spine can be filtered by
 * body; every node is still a button onto the same dossier.
 */
export const MissionTimeline: React.FC<MissionTimelineProps> = ({ onSelectMission, selectedWorld }) => {
  const { t, localize } = useT();
  const [filter, setFilter] = useState<'all' | Destination>(selectedWorld ?? 'all');

  useEffect(() => {
    if (selectedWorld) {
      setFilter(selectedWorld);
    }
  }, [selectedWorld]);

  const missions = useMemo(
    () =>
      [...missionsData].sort(
        (a, b) => parseInt(yearOf(a.landingDate, '1970'), 10) - parseInt(yearOf(b.landingDate, '1970'), 10)
      ),
    []
  );

  const visible = useMemo(
    () => missions.filter((m) => filter === 'all' || m.destination === filter),
    [missions, filter]
  );

  const [activeId, setActiveId] = useState<string>(visible[0]?.id ?? missions[0]?.id ?? '');

  useEffect(() => {
    if (visible.length > 0 && !visible.some((m) => m.id === activeId)) {
      setActiveId(visible[0].id);
    }
  }, [visible, activeId]);

  const activeMission = visible.find((m) => m.id === activeId) ?? visible[0] ?? missions[0];
  const filterOptions: Array<{ id: 'all' | Destination; label: string }> = [
    { id: 'all', label: t.timeline.filterAll },
    { id: 'Moon', label: t.timeline.filterMoon },
    { id: 'Mars', label: t.timeline.filterMars },
  ];

  return (
    <section id="timeline" className="relative border-t border-[color:var(--line)] py-16 sm:py-20 xl:py-[88px]">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 xl:ps-14 xl:pe-10">
        <SectionHeading
          index="02"
          tag={t.timeline.sectionTag.replace(/^\d+\s*\/\/\s*/, '')}
          title={t.timeline.title}
          description={t.timeline.subtitle}
          action={
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setFilter(option.id);
                    spaceAudio.playTelemetryBeep(1150, 0.03);
                  }}
                  aria-pressed={filter === option.id}
                  className={`chip ${filter === option.id ? 'is-active' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          }
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* ------------------ Spine ------------------ */}
          <div className="lg:col-span-7">
            <ol className="relative">
              <span
                className="absolute inset-y-2 start-[7px] w-px bg-gradient-to-b from-transparent via-[color:var(--line-strong)] to-transparent"
                aria-hidden="true"
              />
              {visible.map((mission, index) => {
                const isActive = mission.id === activeMission?.id;
                const matchesWorld = !selectedWorld || mission.destination === selectedWorld;
                return (
                  <li key={mission.id} className="relative ps-8">
                    <button
                      onClick={() => {
                        setActiveId(mission.id);
                        spaceAudio.playTelemetryBeep(1200 + index * 40, 0.04);
                      }}
                      className={`group w-full border-b border-[color:var(--line)] py-4 text-start transition-opacity ${
                        matchesWorld ? 'opacity-100' : 'opacity-55 hover:opacity-90'
                      }`}
                    >
                      <span
                        className={`absolute start-0 top-[22px] flex h-3.5 w-3.5 items-center justify-center rounded-full border transition-all ${
                          isActive
                            ? 'border-[color:var(--cyan)] bg-[color:var(--cyan)]/20'
                            : 'border-[color:var(--line-strong)] bg-[color:var(--void)]'
                        }`}
                        aria-hidden="true"
                      >
                        <span
                          className={`h-1 w-1 rounded-full ${
                            isActive ? 'bg-[color:var(--cyan)]' : 'bg-[color:var(--ink-3)]'
                          }`}
                        />
                      </span>

                      <div className="flex items-baseline justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`font-mono-tabular text-[11px] tracking-[0.1em] ${
                                isActive ? 'text-[color:var(--cyan)]' : 'text-[color:var(--ink-3)]'
                              }`}
                            >
                              {yearOf(mission.landingDate)}
                            </span>
                            <span className="h-px w-3 bg-[color:var(--line-strong)]" aria-hidden="true" />
                            <span className="mono-label">{localize(mission.type)}</span>
                          </div>
                          <p
                            className={`font-display mt-1 truncate text-[15px] transition-colors ${
                              isActive
                                ? 'text-[color:var(--ink)]'
                                : 'text-[color:var(--ink-2)] group-hover:text-[color:var(--ink)]'
                            }`}
                          >
                            {localize(mission.name)}
                          </p>
                        </div>
                        <ChevronRight
                          className={`h-4 w-4 shrink-0 transition-all ${
                            isActive
                              ? 'text-[color:var(--cyan)]'
                              : 'text-[color:var(--ink-3)] group-hover:translate-x-0.5 group-hover:text-[color:var(--ink-2)]'
                          }`}
                          aria-hidden="true"
                        />
                      </div>
                      <p className="mono-label mt-1 truncate">
                        {localize(mission.locationName)} · {localize(mission.activeSpan)}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* ------------------ Sticky dossier ------------------ */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <AnimatePresence mode="wait">
                {activeMission && (
                  <motion.div
                    key={activeMission.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.24 }}
                    className="panel-raised overflow-hidden"
                  >
                    <div className="flex items-center justify-between gap-3 border-b border-[color:var(--line)] px-4 py-3">
                      <span className="mono-label">{t.timeline.craftStatusLabel}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--cyan)]">
                        {localize(activeMission.activeSpan)}
                      </span>
                    </div>

                    <div className="px-4 py-5">
                      <p className="mono-label">{localize(activeMission.destination === 'Moon' ? t.timeline.moonSurface : t.timeline.marsSurface)}</p>
                      <h3 className="font-display mt-2 text-2xl leading-tight text-[color:var(--ink)]">
                        {localize(activeMission.name)}
                      </h3>
                      <p className="mono-label mt-1">
                        {activeMission.englishName} // {activeMission.designation}
                      </p>

                      <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-2)]">
                        {localize(activeMission.shortDescription)}
                      </p>

                      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[color:var(--line)] pt-4">
                        <div>
                          <dt className="mono-label">{t.timeline.durationLabel}</dt>
                          <dd className="font-mono-tabular mt-1 text-[12px] text-[color:var(--ink)]">
                            {localize(activeMission.missionDuration).split('(')[0].trim()}
                          </dd>
                        </div>
                        <div>
                          <dt className="mono-label">{t.timeline.traveledLabel}</dt>
                          <dd className="font-mono-tabular mt-1 text-[12px] text-[color:var(--ink)]">
                            {activeMission.distanceTraveled
                              ? localize(activeMission.distanceTraveled)
                              : t.modal.stationaryValue}
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-4 flex items-center gap-2 rounded-md border border-[color:var(--line)] bg-[color:var(--surface-2)]/60 px-3 py-2">
                        <Compass className="h-3.5 w-3.5 shrink-0 text-[color:var(--ink-3)]" />
                        <span className="font-mono-tabular truncate text-[11px] text-[color:var(--ink-2)]">
                          {localize(activeMission.locationName)} · {activeMission.coordinates.lat},{' '}
                          {activeMission.coordinates.lon}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          spaceAudio.playTelemetryBeep(1400, 0.05);
                          onSelectMission(activeMission);
                        }}
                        className="btn-primary mt-4 w-full"
                      >
                        <span>{t.timeline.inspectDossierBtn}</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>

                      {activeMission.distanceTraveled && (
                        <p className="mono-label mt-3 flex items-center gap-1.5">
                          <Rocket className="h-3 w-3" />
                          {t.timeline.traveledLabel} {localize(activeMission.distanceTraveled)}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
