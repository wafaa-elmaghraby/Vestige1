import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { missionsData } from '../data/missionsData';
import { Mission, Destination } from '../types/mission';
import { MissionCard } from './MissionCard';
import { Search, RefreshCw, X } from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { useT } from '../i18n/LanguageContext';
import { SectionHeading } from './SectionHeading';

interface ObjectExplorerProps {
  onOpenDetail: (mission: Mission) => void;
  activeWorld: Destination;
  onSelectWorld: (world: Destination) => void;
}

type TypeFilter = 'all' | 'rover' | 'lander' | 'helicopter';

/**
 * Catalogue chapter: a persistent filter rail (world, class, search) on the
 * left and a dense dossier grid on the right. The rail becomes a horizontal
 * chip row on narrow screens.
 */
export const ObjectExplorer: React.FC<ObjectExplorerProps> = ({
  onOpenDetail,
  activeWorld,
  onSelectWorld,
}) => {
  const { t, localize } = useT();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<TypeFilter>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'silent' | 'active'>('all');

  const filteredMissions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return missionsData.filter((mission) => {
      const matchesWorld = activeWorld ? mission.destination === activeWorld : true;

      const matchesType =
        selectedType === 'all'
          ? true
          : selectedType === 'rover'
          ? mission.schematicType === 'rover' || mission.schematicType === 'rover-buggy'
          : selectedType === 'lander'
          ? mission.schematicType === 'lander' || mission.schematicType === 'station'
          : mission.schematicType === 'helicopter';

      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'silent'
          ? mission.statusType === 'silent' || mission.statusType === 'complete'
          : mission.statusType === statusFilter;

      const name = localize(mission.name).toLowerCase();
      const engName = mission.englishName.toLowerCase();
      const loc = localize(mission.locationName).toLowerCase();
      const desc = localize(mission.shortDescription).toLowerCase();
      const matchesQuery =
        !q || name.includes(q) || engName.includes(q) || loc.includes(q) || desc.includes(q);

      return matchesWorld && matchesType && matchesStatus && matchesQuery;
    });
  }, [activeWorld, selectedType, statusFilter, searchQuery, localize]);

  const typeFilters: Array<{ id: TypeFilter; label: string }> = [
    { id: 'all', label: t.explorer.filterAll },
    { id: 'rover', label: t.explorer.filterRover },
    { id: 'lander', label: t.explorer.filterLander },
    { id: 'helicopter', label: t.explorer.filterHeli },
  ];

  const statusFilters: Array<{ id: 'all' | 'silent' | 'active'; label: string }> = [
    { id: 'all', label: t.explorer.filterAll },
    { id: 'silent', label: t.explorer.filterSilent },
    { id: 'active', label: t.explorer.filterActive },
  ];

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setStatusFilter('all');
  };

  const isFiltered = Boolean(searchQuery) || selectedType !== 'all' || statusFilter !== 'all';

  return (
    <section id="explorer" className="relative border-t border-[color:var(--line)] bg-[color:var(--abyss)] py-16 sm:py-20 xl:py-[88px]">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 xl:ps-14 xl:pe-10">
        <SectionHeading
          index="03"
          tag={t.explorer.sectionTag.replace(/^\d+\s*\/\/\s*/, '')}
          title={t.explorer.title}
          description={t.explorer.subtitle}
          action={
            <div className="flex items-center gap-2">
              {(['Mars', 'Moon'] as Destination[]).map((world) => (
                <button
                  key={world}
                  onClick={() => {
                    onSelectWorld(world);
                    spaceAudio.playTelemetryBeep(world === 'Mars' ? 1200 : 1000, 0.03);
                  }}
                  aria-pressed={activeWorld === world}
                  className={`chip ${activeWorld === world ? 'is-active' : ''}`}
                >
                  {world === 'Mars' ? t.worldSelector.marsTitle : t.worldSelector.moonTitle}
                </button>
              ))}
            </div>
          }
        />

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-8">
          {/* ------------------- Filter rail ------------------- */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <div className="panel p-4">
                <label htmlFor="catalog-search" className="mono-label">
                  {t.explorer.searchPlaceholder}
                </label>
                <div className="relative mt-2">
                  <Search className="pointer-events-none absolute start-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[color:var(--ink-3)]" />
                  <input
                    id="catalog-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.explorer.searchPlaceholder}
                    className="input-field py-2 ps-8 pe-8"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      aria-label={t.explorer.resetFilters}
                      className="absolute end-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded text-[color:var(--ink-3)] hover:text-[color:var(--ink)]"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>

                <div className="mt-5 border-t border-[color:var(--line)] pt-4">
                  <p className="mono-label mb-2">{t.explorer.filterAll}</p>
                  <div className="flex flex-col gap-1">
                    {typeFilters.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          setSelectedType(option.id);
                          spaceAudio.playTelemetryBeep(1100, 0.03);
                        }}
                        aria-pressed={selectedType === option.id}
                        className={`flex items-center justify-between rounded-md px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                          selectedType === option.id
                            ? 'bg-[color:var(--surface-2)] text-[color:var(--ink)]'
                            : 'text-[color:var(--ink-3)] hover:bg-[color:var(--surface-2)]/60 hover:text-[color:var(--ink-2)]'
                        }`}
                      >
                        <span className="truncate">{option.label}</span>
                        {selectedType === option.id && (
                          <span className="h-1 w-1 rounded-full bg-[color:var(--cyan)]" aria-hidden="true" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 border-t border-[color:var(--line)] pt-4">
                  <p className="mono-label mb-2">{t.explorer.cardStatus}</p>
                  <div className="flex flex-col gap-1">
                    {statusFilters.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setStatusFilter(option.id)}
                        aria-pressed={statusFilter === option.id}
                        className={`flex items-center justify-between rounded-md px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                          statusFilter === option.id
                            ? 'bg-[color:var(--surface-2)] text-[color:var(--ink)]'
                            : 'text-[color:var(--ink-3)] hover:bg-[color:var(--surface-2)]/60 hover:text-[color:var(--ink-2)]'
                        }`}
                      >
                        <span className="truncate">{option.label}</span>
                        {statusFilter === option.id && (
                          <span className="h-1 w-1 rounded-full bg-[color:var(--cyan)]" aria-hidden="true" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[color:var(--line)] pt-4">
                  <div>
                    <p className="mono-label">{t.explorer.showingCount}</p>
                    <p className="font-mono-tabular mt-1 text-lg text-[color:var(--ink)]">
                      {filteredMissions.length}
                      <span className="text-xs text-[color:var(--ink-3)]">
                        {' '}
                        / {missionsData.filter((m) => m.destination === activeWorld).length}
                      </span>
                    </p>
                  </div>
                  {isFiltered && (
                    <button
                      onClick={resetFilters}
                      className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[color:var(--cyan)] hover:text-[color:var(--ink)]"
                    >
                      <RefreshCw className="h-3 w-3" />
                      {t.explorer.resetFilters}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* ------------------- Grid ------------------- */}
          <div className="lg:col-span-9">
            {filteredMissions.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-[14px] border border-dashed border-[color:var(--line-strong)] bg-[color:var(--surface)]/50 px-6 py-16 text-center">
                <Search className="mb-3 h-6 w-6 text-[color:var(--ink-3)]" />
                <p className="font-display text-base text-[color:var(--ink)]">{t.explorer.noResultsTitle}</p>
                <p className="mt-1 max-w-sm text-xs leading-relaxed text-[color:var(--ink-2)]">
                  {t.explorer.noResultsDesc}
                </p>
                <button onClick={resetFilters} className="btn-ghost mt-5">
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>{t.explorer.resetFilters}</span>
                </button>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {filteredMissions.map((mission, index) => (
                    <MissionCard
                      key={mission.id}
                      mission={mission}
                      index={index}
                      onOpenDetail={onOpenDetail}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};