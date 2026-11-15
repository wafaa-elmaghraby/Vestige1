import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Mission } from '../types/mission';
import { SchematicView } from './SchematicView';
import { fetchNasaImageForMission, fetchOrbitalImagesForMission, NasaImageResult } from '../utils/nasaImages';
import {
  X,
  MapPin,
  Calendar,
  Radio,
  Rocket,
  Compass,
  FileText,
  Activity,
  Award,
  Clock,
  Sparkles,
  ExternalLink,
  Image as ImageIcon,
  Cpu,
  Loader2,
  AlertCircle,
  Layers
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { useT } from '../i18n/LanguageContext';
import { Language } from '../i18n/types';

interface MissionModalProps {
  mission: Mission | null;
  onClose: () => void;
}

/**
 * Condense a long mission duration into its two most significant units.
 * e.g. "14 years 4 months 16 days (5,111 sols)" -> "14 yrs 4 mos."
 *      "١٤ عامًا و٤ أشهر و١٦ يومًا (...)" -> "١٤ عامًا و٤ أشهر"
 */
function formatShortDuration(raw: string, lang: Language): string {
  if (!raw) return '';
  const mainPart = raw.split('(')[0].trim();

  if (lang === 'en') {
    const matchYM = mainPart.match(/(\d+\+?\s+years?)\s+(\d+\s+months?)/i);
    if (matchYM) {
      return `${matchYM[1].replace(/years?/i, 'yrs')} ${matchYM[2].replace(/months?/i, 'mos.')}`;
    }
    const matchYD = mainPart.match(/(\d+\+?\s+years?)\s+(\d+\s+days?)/i);
    if (matchYD) {
      return `${matchYD[1].replace(/years?/i, 'yrs')} ${matchYD[2]}`;
    }
    const matchHM = mainPart.match(/(\d+)\s+hours?\s+(\d+)\s+minutes?/i);
    if (matchHM) {
      return `${matchHM[1]}h ${matchHM[2]}m`;
    }
    const matchD = mainPart.match(/^(\d+\s+days?)/i);
    if (matchD) {
      return matchD[1];
    }
    const matchY = mainPart.match(/^(\d+\+?\s+years?)/i);
    if (matchY) {
      return matchY[1];
    }
    return mainPart;
  }

  // Arabic: units are joined with the conjunction "و", so keep the first two.
  const segments = mainPart.split(/\s+و/);
  if (segments.length > 2) {
    return `${segments[0]} و${segments[1]}`;
  }
  return mainPart;
}

export const MissionModal: React.FC<MissionModalProps> = ({ mission, onClose }) => {
  const { t, localize, language } = useT();
  const [activeTab, setActiveTab] = useState<'overview' | 'edl' | 'science' | 'contact' | 'location' | 'specs'>('overview');
  const [nasaImage, setNasaImage] = useState<NasaImageResult | null>(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'photo' | 'schematic'>('photo');
  const [orbitalImages, setOrbitalImages] = useState<NasaImageResult[]>([]);
  const [loadingOrbital, setLoadingOrbital] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const tabsNavRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // Store previously focused element when modal is triggered
  useEffect(() => {
    if (mission) {
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    }
  }, [mission]);

  // Lock body scroll while modal is open, restore on close
  useEffect(() => {
    if (!mission) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mission]);

  // Escape key handling & focus trap inside modal dialog
  useEffect(() => {
    if (!mission) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Initial focus on close button for accessibility
    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        const closeBtn = modalRef.current.querySelector<HTMLElement>('[data-modal-close]');
        closeBtn?.focus();
      }
    }, 60);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);
      // Return focus to previously active element (card button)
      if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
        previousActiveElementRef.current.focus();
      }
    };
  }, [mission, onClose]);

  // Scroll active tab into view when changed or rendered
  useEffect(() => {
    if (!tabsNavRef.current) return;
    const activeBtn = tabsNavRef.current.querySelector<HTMLElement>('[data-active="true"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

  useEffect(() => {
    // Reset tab and image state when mission changes
    setActiveTab('overview');
    setViewMode('photo');
    setNasaImage(null);
    setImageError(false);
    setOrbitalImages([]);

    if (mission) {
      setLoadingImage(true);
      const query = mission.nasaSearchQuery || `${mission.englishName} ${mission.destination}`;
      fetchNasaImageForMission(query)
        .then((result) => {
          setNasaImage(result);
          setImageError(!result);
          if (!result) {
            setViewMode('schematic');
          }
        })
        .catch(() => {
          setImageError(true);
          setViewMode('schematic');
        })
        .finally(() => {
          setLoadingImage(false);
        });

      // Fetch orbital imagery (LROC / HiRISE)
      setLoadingOrbital(true);
      const orbitalQuery = mission.orbitalSearchQuery || (
        mission.destination === 'Moon'
          ? `LROC ${mission.englishName} landing site`
          : `HiRISE ${mission.englishName}`
      );
      // Keywords for relevance filtering
      const baseKeywords = (mission.orbitalSearchQuery || mission.englishName)
        .toLowerCase()
        .replace(/[(),]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 2 && !['landing', 'site', 'mars', 'moon', 'crater'].includes(w));

      fetchOrbitalImagesForMission(orbitalQuery, baseKeywords)
        .then((results) => {
          setOrbitalImages(results);
        })
        .catch(() => {
          setOrbitalImages([]);
        })
        .finally(() => {
          setLoadingOrbital(false);
        });
    }
  }, [mission]);

  if (!mission) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      spaceAudio.playTelemetryBeep(900, 0.04);
      onClose();
    }
  };

  const modalNode = (
    <AnimatePresence>
      <div
        onClick={handleBackdropClick}
        className="fixed inset-0 z-[200] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8"
      >
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-mission-title"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-5xl bg-[#090d16] border border-[color:var(--line-strong)] rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto"
          style={{ maxHeight: 'calc(100dvh - 2rem)' }}
        >
          {/* Top Bar Header with Fixed Sticky Position and Opaque Background */}
          <div className="sticky top-0 z-30 bg-[#090d16] border-b border-[color:var(--line)] px-4 sm:px-6 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <span
                className={`w-3 h-3 rounded-full shrink-0 ${
                  mission.destination === 'Mars' ? 'bg-[color:var(--cyan)]' : 'bg-slate-200'
                }`}
              />
              <div className="min-w-0">
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[color:var(--ink-2)] truncate">
                  {t.modal.dossierPrefix} {mission.designation}
                </div>
                <h2
                  id="modal-mission-title"
                  className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[color:var(--ink)] uppercase tracking-tight truncate"
                >
                  {localize(mission.name)} ({mission.englishName})
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden sm:block text-end">
                <div className="text-[10px] font-mono text-[color:var(--ink-2)] uppercase tracking-wider">{t.modal.missionStatusLabel}</div>
                <div className="text-xs font-mono font-semibold text-[color:var(--ink-2)] max-w-[200px] truncate">
                  {localize(mission.status)}
                </div>
              </div>

              <button
                data-modal-close="true"
                onClick={() => {
                  spaceAudio.playTelemetryBeep(900, 0.04);
                  onClose();
                }}
                className="p-2 text-[color:var(--ink-2)] hover:text-[color:var(--ink)] bg-[color:var(--surface-2)] hover:bg-[color:var(--surface-2)] border border-[color:var(--line)] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
                title={t.modal.closeEsc}
                aria-label={t.modal.closeEsc}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs: Single line with smooth scroll-snap on narrow screens */}
          <div
            ref={tabsNavRef}
            className="flex flex-nowrap items-center gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 sm:px-6 py-2.5 bg-[#070b12] border-b border-[color:var(--line)] shrink-0 select-none scrollbar-none"
          >
            <button
              data-active={activeTab === 'overview'}
              onClick={() => {
                setActiveTab('overview');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`snap-start whitespace-nowrap shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[color:var(--blue)] text-[color:var(--ink)] font-semibold shadow-sm'
                  : 'text-[color:var(--ink-2)] hover:text-[color:var(--ink)] hover:bg-[color:var(--surface-2)]/60'
              }`}
            >
              {t.modal.tabOverview}
            </button>
            <button
              data-active={activeTab === 'edl'}
              onClick={() => {
                setActiveTab('edl');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`snap-start whitespace-nowrap shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === 'edl'
                  ? 'bg-[color:var(--blue)] text-[color:var(--ink)] font-semibold shadow-sm'
                  : 'text-[color:var(--ink-2)] hover:text-[color:var(--ink)] hover:bg-[color:var(--surface-2)]/60'
              }`}
            >
              {t.modal.tabEdl}
            </button>
            <button
              data-active={activeTab === 'science'}
              onClick={() => {
                setActiveTab('science');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`snap-start whitespace-nowrap shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === 'science'
                  ? 'bg-[color:var(--blue)] text-[color:var(--ink)] font-semibold shadow-sm'
                  : 'text-[color:var(--ink-2)] hover:text-[color:var(--ink)] hover:bg-[color:var(--surface-2)]/60'
              }`}
            >
              {t.modal.tabScience}
            </button>
            <button
              data-active={activeTab === 'contact'}
              onClick={() => {
                setActiveTab('contact');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`snap-start whitespace-nowrap shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === 'contact'
                  ? 'bg-[color:var(--blue)] text-[color:var(--ink)] font-semibold shadow-sm'
                  : 'text-[color:var(--ink-2)] hover:text-[color:var(--ink)] hover:bg-[color:var(--surface-2)]/60'
              }`}
            >
              {t.modal.tabContact}
            </button>
            <button
              data-active={activeTab === 'location'}
              onClick={() => {
                setActiveTab('location');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`snap-start whitespace-nowrap shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === 'location'
                  ? 'bg-[color:var(--blue)] text-[color:var(--ink)] font-semibold shadow-sm'
                  : 'text-[color:var(--ink-2)] hover:text-[color:var(--ink)] hover:bg-[color:var(--surface-2)]/60'
              }`}
            >
              {t.modal.tabLocation}
            </button>
            <button
              data-active={activeTab === 'specs'}
              onClick={() => {
                setActiveTab('specs');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`snap-start whitespace-nowrap shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === 'specs'
                  ? 'bg-[color:var(--blue)] text-[color:var(--ink)] font-semibold shadow-sm'
                  : 'text-[color:var(--ink-2)] hover:text-[color:var(--ink)] hover:bg-[color:var(--surface-2)]/60'
              }`}
            >
              {t.modal.tabSpecs}
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 min-h-0">
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Large Schematic Stage */}
                <div className="relative">
                  <SchematicView
                    type={mission.schematicType}
                    accentColor={mission.destination === 'Mars' ? '#2e7dff' : '#4fd8ff'}
                    className="h-60 sm:h-72 w-full"
                  />
                  <div className="absolute bottom-3 right-3 text-right bg-[color:var(--surface)]/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-[color:var(--line)]">
                    <div className="text-[10px] font-mono text-[color:var(--ink-2)] uppercase tracking-wider">{t.modal.locationRef}</div>
                    <div className="text-xs font-mono text-[color:var(--ink)]">{localize(mission.locationName)}</div>
                  </div>
                </div>

                {/* Lead Summary */}
                <div className="bg-[color:var(--surface-2)]/60 border border-[color:var(--line)] rounded-xl p-5">
                  <h4 className="text-xs font-mono text-[color:var(--ink-2)] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[color:var(--cyan)]" />
                    {t.modal.shortDescTitle}
                  </h4>
                  <p className="text-sm sm:text-base text-[color:var(--ink)] leading-relaxed">
                    {localize(mission.shortDescription)}
                  </p>
                </div>

                {/* Quote if present */}
                {mission.quote && (
                  <div className="border-s-2 border-[color:var(--cyan)] bg-[color:var(--blue)]/20 ps-4 py-3 pe-4 rounded-e-lg">
                    <div className="text-sm sm:text-base italic text-[color:var(--ink)] font-serif">
                      «{localize(mission.quote.text)}»
                    </div>
                    <div className="text-xs font-mono text-[color:var(--cyan)] mt-1">
                      — {localize(mission.quote.speaker)} ({localize(mission.quote.context)})
                    </div>
                  </div>
                )}

                {/* Fast Facts Grid with auto-fit minmax(180px, 1fr) & no truncation */}
                <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
                  <div className="p-3.5 bg-[color:var(--surface-2)]/80 border border-[color:var(--line)] rounded-xl flex flex-col justify-between">
                    <div className="text-[10px] font-mono text-[color:var(--ink-2)] uppercase tracking-wider">{t.modal.launchDateLabel}</div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-[color:var(--ink)] mt-1 break-words leading-snug">
                      {localize(mission.launchDate)}
                    </div>
                  </div>
                  <div className="p-3.5 bg-[color:var(--surface-2)]/80 border border-[color:var(--line)] rounded-xl flex flex-col justify-between">
                    <div className="text-[10px] font-mono text-[color:var(--ink-2)] uppercase tracking-wider">{t.modal.landingDateLabel}</div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-[color:var(--ink)] mt-1 break-words leading-snug">
                      {localize(mission.landingDate)}
                    </div>
                  </div>
                  <div className="p-3.5 bg-[color:var(--surface-2)]/80 border border-[color:var(--line)] rounded-xl flex flex-col justify-between">
                    <div className="text-[10px] font-mono text-[color:var(--ink-2)] uppercase tracking-wider">{t.modal.lifespanLabel}</div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-[color:var(--ink)] mt-1 break-words leading-snug">
                      {formatShortDuration(localize(mission.missionDuration), language)}
                    </div>
                  </div>
                  <div className="p-3.5 bg-[color:var(--surface-2)]/80 border border-[color:var(--line)] rounded-xl flex flex-col justify-between">
                    <div className="text-[10px] font-mono text-[color:var(--ink-2)] uppercase tracking-wider">{t.modal.distance}</div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-[color:var(--cyan)] mt-1 break-words leading-snug">
                      {mission.distanceTraveled ? localize(mission.distanceTraveled) : t.modal.stationaryValue}
                    </div>
                  </div>
                </div>

                {/* Milestones list */}
                <div>
                  <h4 className="text-xs font-mono text-[color:var(--ink-2)] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-[color:var(--ink-2)]" />
                    {t.modal.milestonesTitle}
                  </h4>
                  <div className="space-y-3">
                    {mission.milestones.map((m, idx) => (
                      <div key={idx} className="flex gap-4 p-3.5 bg-[color:var(--surface-2)]/40 border border-[color:var(--line)] rounded-lg">
                        <div className="text-xs font-mono font-bold text-[color:var(--cyan)] whitespace-nowrap min-w-[80px]">
                          {m.date}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-[color:var(--ink)]">{localize(m.title)}</div>
                          <div className="text-xs text-[color:var(--ink-2)] mt-0.5 leading-relaxed">{localize(m.description)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: HOW DID IT GET THERE */}
            {activeTab === 'edl' && (
              <div className="space-y-6">
                <div className="bg-[color:var(--surface-2)]/60 border border-[color:var(--line)] rounded-xl p-6">
                  <div className="text-xs font-mono text-[color:var(--cyan)] uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Rocket className="w-3.5 h-3.5" />
                    {t.modal.tabEdl}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[color:var(--ink)] uppercase tracking-tight mb-4">
                    {t.modal.howGotThereHeading}
                  </h3>
                  <p className="text-sm sm:text-base text-[color:var(--ink)] leading-relaxed">
                    {localize(mission.howGotThere)}
                  </p>
                </div>

                {/* EDL technical notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[color:var(--surface)] border border-[color:var(--line)] rounded-lg">
                    <div className="text-xs font-mono text-[color:var(--ink-2)] uppercase mb-1">{t.modal.landingPointLabel}</div>
                    <div className="text-sm font-semibold text-[color:var(--ink)]">{localize(mission.locationName)}</div>
                    <div className="text-xs font-mono text-[color:var(--ink-2)] mt-1">{localize(mission.coordinates.formatted)}</div>
                  </div>
                  <div className="p-4 bg-[color:var(--surface)] border border-[color:var(--line)] rounded-lg">
                    <div className="text-xs font-mono text-[color:var(--ink-2)] uppercase mb-1">{t.modal.landingDateTimeLabel}</div>
                    <div className="text-sm font-semibold text-[color:var(--ink)]">{localize(mission.landingDate)}</div>
                    <div className="text-xs font-mono text-[color:var(--ink-2)] mt-1">{t.modal.officialTelemetryLabel}</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: WHAT DID IT DO */}
            {activeTab === 'science' && (
              <div className="space-y-6">
                <div className="bg-[color:var(--surface-2)]/60 border border-[color:var(--line)] rounded-xl p-6">
                  <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    {t.modal.tabScience}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[color:var(--ink)] uppercase tracking-tight mb-4">
                    {t.modal.whatDidItDoHeading}
                  </h3>
                  <p className="text-sm sm:text-base text-[color:var(--ink)] leading-relaxed">
                    {localize(mission.whatDidItDo)}
                  </p>
                </div>
              </div>
            )}

            {/* TAB: LAST CONTACT */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div className="bg-[color:var(--surface-2)]/60 border border-[color:var(--line)] rounded-xl p-6">
                  <div className="text-xs font-mono text-[color:var(--cyan)] uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5" />
                    {t.modal.tabContact}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[color:var(--ink)] uppercase tracking-tight mb-4">
                    {t.modal.lastContactStoryHeading}
                  </h3>
                  <p className="text-sm sm:text-base text-[color:var(--ink)] leading-relaxed">
                    {localize(mission.lastContactStory)}
                  </p>

                  {mission.signalData && (
                    <div className="mt-6 p-4 bg-[color:var(--surface)] border border-[color:var(--line)] rounded-lg font-mono text-xs text-[color:var(--ink-2)] space-y-2">
                      <div className="text-[11px] text-[color:var(--cyan)] font-bold uppercase tracking-wider">
                        {t.modal.finalPacketHeading}
                      </div>
                      <div className="text-[color:var(--ink-2)] break-words leading-relaxed">
                        {localize(mission.signalData.lastTelemetry)}
                      </div>
                      <div className="text-[color:var(--ink-2)] pt-2 border-t border-[color:var(--line)] leading-relaxed">
                        {t.modal.fadeReasonPrefix} <span className="text-[color:var(--ink)]">{localize(mission.signalData.fadeReason)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: WHERE IS IT NOW */}
            {activeTab === 'location' && (
              <div className="space-y-6">
                <div className="bg-[color:var(--surface-2)]/60 border border-[color:var(--line)] rounded-xl p-6">
                  <div className="text-xs font-mono text-[color:var(--signal)] uppercase tracking-widest mb-1 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    {t.modal.tabLocation}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[color:var(--ink)] uppercase tracking-tight mb-4">
                    {t.modal.whereIsItNowHeading}
                  </h3>
                  <p className="text-sm sm:text-base text-[color:var(--ink)] leading-relaxed">
                    {localize(mission.whereIsItNow)}
                  </p>
                </div>

                {/* Real NASA Photo / Schematic Toggle Container */}
                <div className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-[color:var(--line)] pb-3">
                    <div className="text-xs font-mono text-[color:var(--ink-2)] uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[color:var(--cyan)]" />
                      <span>{t.modal.nasaPhotoTitle}</span>
                    </div>

                    {/* View Switcher: Real Photo vs Schematic */}
                    <div className="inline-flex p-1 bg-[color:var(--surface-2)] border border-[color:var(--line)] rounded-lg text-xs font-mono">
                      <button
                        onClick={() => {
                          setViewMode('photo');
                          spaceAudio.playTelemetryBeep(1200, 0.03);
                        }}
                        disabled={loadingImage || (!nasaImage && imageError)}
                        className={`px-3 py-1 rounded flex items-center gap-1.5 transition-colors ${
                          viewMode === 'photo'
                            ? 'bg-[color:var(--blue)] text-[color:var(--ink)] font-medium shadow-sm'
                            : 'text-[color:var(--ink-2)] hover:text-[color:var(--ink)] disabled:opacity-40 disabled:cursor-not-allowed'
                        }`}
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>{t.modal.viewPhotoBtn}</span>
                      </button>

                      <button
                        onClick={() => {
                          setViewMode('schematic');
                          spaceAudio.playTelemetryBeep(1100, 0.03);
                        }}
                        className={`px-3 py-1 rounded flex items-center gap-1.5 transition-colors ${
                          viewMode === 'schematic'
                            ? 'bg-[color:var(--surface-2)] text-[color:var(--ink)] font-medium shadow-sm'
                            : 'text-[color:var(--ink-2)] hover:text-[color:var(--ink)]'
                        }`}
                      >
                        <Cpu className="w-3.5 h-3.5" />
                        <span>{t.modal.viewSchematicBtn}</span>
                      </button>
                    </div>
                  </div>

                  {/* Photo Display View */}
                  {viewMode === 'photo' && (
                    <div>
                      {loadingImage ? (
                        <div className="h-64 sm:h-80 flex flex-col items-center justify-center gap-3 text-[color:var(--ink-2)] text-xs font-mono bg-[color:var(--surface)]/70 border border-dashed border-[color:var(--line)] rounded-lg">
                          <Loader2 className="w-6 h-6 animate-spin text-[color:var(--cyan)]" />
                          <span>{t.modal.photoLoading}</span>
                        </div>
                      ) : nasaImage ? (
                        <div className="space-y-3">
                          <div className="relative group overflow-hidden rounded-lg border border-[color:var(--line)] bg-black">
                            <img
                              src={nasaImage.imageUrl}
                              alt={nasaImage.title}
                              referrerPolicy="no-referrer"
                              className="w-full max-h-96 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                              onError={() => {
                                setImageError(true);
                                setViewMode('schematic');
                              }}
                            />
                            <div className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-[color:var(--ink-2)] border border-[color:var(--line-strong)] backdrop-blur-sm">
                              NASA ARCHIVE ID: {nasaImage.nasaId}
                            </div>
                            <div className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-[color:var(--ink-2)] border border-[color:var(--line-strong)] backdrop-blur-sm">
                              {nasaImage.dateCreated} · {nasaImage.center}
                            </div>
                          </div>

                          {/* Caption and NASA Link */}
                          <div className="p-3 bg-[color:var(--surface-2)]/60 border border-[color:var(--line)] rounded-lg text-xs space-y-1.5">
                            <div className="font-semibold text-[color:var(--ink)]">
                              {nasaImage.title}
                            </div>
                            <p className="text-[color:var(--ink-2)] line-clamp-2 leading-relaxed">
                              {nasaImage.description}
                            </p>
                            <div className="pt-2 border-t border-[color:var(--line)] flex items-center justify-between text-[11px] font-mono">
                              <span className="text-[color:var(--ink-3)]">{t.modal.photoCredit}</span>
                              <a
                                href={nasaImage.detailUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[color:var(--cyan)] hover:text-[color:var(--cyan)] inline-flex items-center gap-1 font-medium transition-colors"
                              >
                                <span>{t.modal.openNasaJplLink}</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Fallback when image is not found */
                        <div className="space-y-3">
                          <div className="p-3 bg-[color:var(--surface-2)] border border-[color:var(--line-strong)] rounded-lg text-xs font-mono text-[color:var(--ink-2)] flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-[color:var(--ink-2)] shrink-0" />
                            <span>{t.modal.photoNotFound}</span>
                          </div>
                          <SchematicView
                            type={mission.schematicType}
                            accentColor={mission.destination === 'Mars' ? '#2e7dff' : '#4fd8ff'}
                            className="h-64 sm:h-72 w-full"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Schematic Display View */}
                  {viewMode === 'schematic' && (
                    <div className="space-y-3">
                      <SchematicView
                        type={mission.schematicType}
                        accentColor={mission.destination === 'Mars' ? '#2e7dff' : '#4fd8ff'}
                        className="h-64 sm:h-72 w-full"
                      />
                    </div>
                  )}
                </div>

                {/* Coordinates Info Box */}
                <div className="p-4 bg-[color:var(--surface)] border border-[color:var(--line)] rounded-lg font-mono text-xs space-y-2">
                  <div className="text-[color:var(--ink-2)] uppercase tracking-wider">{t.modal.locationRef}:</div>
                  <div className="text-base text-[color:var(--ink)] font-bold">{localize(mission.coordinates.formatted)}</div>
                  <div className="text-[color:var(--ink-2)]">{mission.coordinates.lat}, {mission.coordinates.lon}</div>
                </div>

                {/* Orbital Imagery Gallery ("View from orbit") */}
                <div className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[color:var(--line)] pb-3">
                    <div>
                      <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5" />
                        <span>{t.modal.orbitalGalleryTitle}</span>
                      </div>
                      <p className="text-xs text-[color:var(--ink-2)] mt-0.5">
                        {t.modal.orbitalGallerySubtitle}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-500/80 bg-cyan-950/30 px-2 py-1 rounded border border-cyan-900/40 self-start sm:self-auto">
                      NASA IMAGE API // ORBITAL
                    </span>
                  </div>

                  {loadingOrbital ? (
                    <div className="h-44 flex flex-col items-center justify-center gap-3 text-[color:var(--ink-2)] text-xs font-mono bg-[color:var(--surface)]/70 border border-dashed border-[color:var(--line)] rounded-lg">
                      <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                      <span>{t.modal.photoLoading}</span>
                    </div>
                  ) : orbitalImages.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {orbitalImages.map((img) => (
                        <div
                          key={img.nasaId}
                          className="group rounded-lg border border-[color:var(--line)] bg-[color:var(--surface-2)]/60 overflow-hidden flex flex-col hover:border-[color:var(--line-strong)] transition-colors"
                        >
                          <div className="relative aspect-video bg-black overflow-hidden shrink-0">
                            <img
                              src={img.imageUrl}
                              alt={img.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-cyan-300 border border-[color:var(--line)] backdrop-blur-sm truncate max-w-[200px]">
                              {t.modal.orbitalNasaId} {img.nasaId}
                            </div>
                            <div className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-[color:var(--ink-2)] border border-[color:var(--line)] backdrop-blur-sm">
                              {img.dateCreated}
                            </div>
                          </div>
                          <div className="p-3.5 flex-1 flex flex-col justify-between gap-2.5">
                            <div>
                              <h4 className="text-xs font-bold text-[color:var(--ink)] line-clamp-1 group-hover:text-cyan-300 transition-colors">
                                {img.title}
                              </h4>
                              <p className="text-[11px] text-[color:var(--ink-2)] line-clamp-2 mt-1 leading-relaxed">
                                {img.description}
                              </p>
                            </div>
                            <div className="pt-2 border-t border-[color:var(--line)] flex items-center justify-between text-[11px] font-mono">
                              <span className="text-[color:var(--ink-3)] truncate">{img.center || 'NASA'}</span>
                              <a
                                href={img.detailUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-medium transition-colors shrink-0"
                              >
                                <span>{t.modal.orbitalOriginalLink}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Fallback when no orbital imagery found */
                    <div className="p-4 bg-[color:var(--surface-2)]/40 border border-dashed border-[color:var(--line)] rounded-lg text-xs font-mono space-y-3">
                      <div className="flex items-start gap-2.5 text-[color:var(--ink-2)]">
                        <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                          {t.modal.orbitalEmptyFallback}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-[color:var(--line)] flex items-center justify-end">
                        <a
                          href="https://pds.nasa.gov/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 transition-colors font-medium text-[11px]"
                        >
                          <span>{t.modal.orbitalPdsLink}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Official Mission Source Link */}
                {mission.source && (
                  <div className="p-3 bg-[color:var(--surface)]/70 border border-[color:var(--line)] rounded-lg text-xs font-mono text-[color:var(--ink-2)] flex items-center justify-between">
                    <span>{t.modal.officialSource}:</span>
                    <a
                      href={mission.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--ink-2)] hover:text-[color:var(--ink)] underline decoration-slate-600 hover:decoration-white inline-flex items-center gap-1.5"
                    >
                      <span>{t.modal.openNasaJplLink}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* TAB: SPECS */}
            {activeTab === 'specs' && (
              <div className="space-y-6">
                <h3 className="font-display text-2xl font-bold text-[color:var(--ink)] uppercase tracking-tight mb-4">
                  {t.modal.specsTitle}
                </h3>
                <div className="border border-[color:var(--line)] rounded-lg overflow-hidden divide-y divide-[color:var(--line)]">
                  {mission.specs.map((s, idx) => (
                    <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[color:var(--surface)]/60">
                      <span className="text-xs font-mono uppercase tracking-wider text-[color:var(--ink-2)]">{localize(s.label)}</span>
                      <span className="text-xs sm:text-sm font-mono text-[color:var(--ink)] font-semibold sm:text-right break-words">{localize(s.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="bg-[#090d16] border-t border-[color:var(--line)] px-4 sm:px-6 py-3.5 flex items-center justify-between text-xs font-mono text-[color:var(--ink-3)] shrink-0">
            <div className="truncate pr-2">
              {t.modal.missionPrefix} {mission.designation}
            </div>
            <button
              onClick={() => {
                spaceAudio.playTelemetryBeep(900, 0.04);
                onClose();
              }}
              className="px-4 py-2 bg-[color:var(--surface-2)] hover:bg-slate-700 text-[color:var(--ink)] rounded-lg transition-colors shrink-0 font-medium"
            >
              {t.modal.closeDossierBtn}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalNode, document.body);
};
