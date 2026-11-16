import React, { useEffect, useState } from 'react';
import {
  Volume2,
  VolumeX,
  Compass,
  Menu,
  X,
  Globe2,
  Map,
  LayoutGrid,
  Milestone,
  Radio,
  Waves,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { useT, LANGUAGES } from '../i18n/LanguageContext';
import { Language } from '../i18n/types';

interface NavbarProps {
  onWorldChange?: (world: 'Moon' | 'Mars') => void;
  activeWorld?: 'Moon' | 'Mars';
}

const AudioGlyph: React.FC<{ muted: boolean }> = ({ muted }) =>
  muted ? (
    <VolumeX className="h-4 w-4 text-[color:var(--ink-3)]" />
  ) : (
    <Volume2 className="h-4 w-4 text-[color:var(--cyan)]" />
  );

const BrandMark: React.FC<{ compact?: boolean }> = ({ compact = false }) => (
  <span className="flex items-center gap-2.5">
    <span className="relative flex h-8 w-8 items-center justify-center">
      <span className="absolute inset-0 rounded-full border border-[color:var(--line-strong)]" />
      <span className="absolute inset-1.5 rounded-full border border-[color:var(--cyan)] opacity-50" />
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--cyan)]" />
    </span>
    {!compact && (
      <span className="font-display text-[13px] font-semibold uppercase tracking-[0.34em] text-[color:var(--ink)]">
        Vestige
      </span>
    )}
  </span>
);

export const Navbar: React.FC<NavbarProps> = ({ onWorldChange, activeWorld = 'Mars' }) => {
  const { t, language, setLanguage } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('worlds');

  const navItems = [
    { id: 'worlds', label: t.nav.worlds, Icon: Globe2 },
    { id: 'timeline', label: t.nav.timeline, Icon: Milestone },
    { id: 'explorer', label: t.nav.catalog, Icon: LayoutGrid },
    { id: 'map-section', label: t.nav.map, Icon: Map },
    { id: 'last-signal', label: t.nav.lastSignal, Icon: Radio },
    { id: 'signal-delay', label: t.nav.signalDelay, Icon: Waves },
    { id: 'moon-artifacts', label: t.nav.heritage, Icon: ShieldCheck },
    { id: 'quiz', label: t.nav.quiz, Icon: GraduationCap },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.4, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleSound = () => {
    const muted = spaceAudio.toggleMute();
    setIsMuted(muted);
    if (!muted) spaceAudio.playTelemetryBeep(1400, 0.08);
  };

  const handleLanguageChange = (lang: Language) => {
    spaceAudio.playTelemetryBeep(1200, 0.03);
    setLanguage(lang);
  };

  const handleWorld = (world: 'Moon' | 'Mars') => {
    onWorldChange?.(world);
    spaceAudio.playTelemetryBeep(world === 'Mars' ? 1300 : 1100, 0.04);
  };

  return (
    <>
      <div
        className="fixed top-5 end-6 z-[100] hidden items-center overflow-hidden rounded-full border border-[color:var(--line-strong)] bg-[rgba(6,12,24,0.88)] p-0.5 backdrop-blur-xl shadow-[0_12px_30px_-14px_rgba(0,0,0,0.8)] xl:flex"
        role="group"
        aria-label={t.nav.language}
      >
        {LANGUAGES.map((option) => (
          <button
            key={option.code}
            onClick={() => handleLanguageChange(option.code)}
            aria-pressed={language === option.code}
            lang={option.code}
            className={`rounded-full px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.06em] transition-colors ${
              language === option.code
                ? 'bg-[color:var(--blue)] text-[color:var(--ink)]'
                : 'text-[color:var(--ink-2)] hover:text-[color:var(--ink)]'
            }`}
            title={option.label}
          >
            {option.code === 'ar' ? 'عربي' : 'EN'}
          </button>
        ))}
      </div>

      <aside className="fixed inset-y-0 start-0 z-[100] hidden w-[76px] flex-col justify-between overflow-y-auto border-e border-[color:var(--line)] bg-[rgba(6,12,24,0.92)] backdrop-blur-xl xl:flex">
        <div className="flex flex-col items-center gap-5 pt-4">
          <a href="#top" className="group flex flex-col items-center gap-3" aria-label="VESTIGE home">
            <BrandMark compact />
            <span
              className="font-display text-[9px] font-semibold uppercase tracking-[0.34em] text-[color:var(--ink-3)] transition-colors group-hover:text-[color:var(--cyan)]"
              style={{ writingMode: 'vertical-rl' }}
            >
              Vestige
            </span>
          </a>

          <nav aria-label={t.nav.menu} className="flex w-full flex-col items-center gap-1">
            {navItems.map(({ id, label, Icon }) => {
              const active = activeSection === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => spaceAudio.playTelemetryBeep(1100, 0.03)}
                  aria-current={active ? 'true' : undefined}
                  className={`dock-link group relative flex w-full flex-col items-center gap-1 py-2 transition-colors ${
                    active
                      ? 'text-[color:var(--cyan)]'
                      : 'text-[color:var(--ink-3)] hover:text-[color:var(--ink)]'
                  }`}
                  title={label}
                >
                  <span
                    className={`absolute inset-y-2 start-0 w-[2px] rounded-full transition-all ${
                      active ? 'bg-[color:var(--cyan)] opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden="true"
                  />
                  <Icon className="h-4 w-4" />
                  <span className="max-w-[62px] truncate text-center font-mono text-[8.5px] uppercase tracking-[0.06em]">
                    {label}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col items-center gap-3 pb-6">
          <div className="flex flex-col overflow-hidden rounded-lg border border-[color:var(--line)]">
            {(['Mars', 'Moon'] as const).map((world) => (
              <button
                key={world}
                onClick={() => handleWorld(world)}
                aria-pressed={activeWorld === world}
                className={`px-2 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] transition-colors ${
                  activeWorld === world
                    ? 'bg-[color:var(--blue)] text-[color:var(--ink)]'
                    : 'text-[color:var(--ink-3)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--ink)]'
                }`}
                title={world === 'Mars' ? t.worldSelector.marsTitle : t.worldSelector.moonTitle}
              >
                {world === 'Mars' ? 'MRS' : 'LNA'}
              </button>
            ))}
          </div>

          <button
            onClick={toggleSound}
            aria-label={isMuted ? t.nav.soundOn : t.nav.soundOff}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--line)] transition-colors hover:border-[color:var(--line-strong)]"
          >
            <AudioGlyph muted={isMuted} />
          </button>

          <div
            className="flex flex-col overflow-hidden rounded-lg border border-[color:var(--line)]"
            role="group"
            aria-label={t.nav.language}
          >
            {LANGUAGES.map((option) => (
              <button
                key={option.code}
                onClick={() => handleLanguageChange(option.code)}
                aria-pressed={language === option.code}
                lang={option.code}
                className={`px-2 py-1 font-mono text-[9px] uppercase transition-colors ${
                  language === option.code
                    ? 'bg-[color:var(--surface-2)] text-[color:var(--cyan)]'
                    : 'text-[color:var(--ink-3)] hover:text-[color:var(--ink)]'
                }`}
                title={option.label}
              >
                {option.code}
              </button>
            ))}
          </div>

          <a
            href="#explorer"
            aria-label={t.hero.exploreBtn}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--blue)] text-[color:var(--ink)] shadow-[0_10px_24px_-12px_rgba(46,125,255,0.9)] transition-colors hover:bg-[color:var(--blue-deep)]"
          >
            <Compass className="h-4 w-4" />
          </a>
        </div>
      </aside>

      <header
        className={`fixed inset-x-0 top-0 z-[100] border-b transition-all duration-300 xl:hidden ${
          scrolled || isMenuOpen
            ? 'border-[color:var(--line)] bg-[rgba(6,12,24,0.92)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2" aria-label="VESTIGE home">
            <BrandMark />
          </a>

          <div className="flex items-center gap-2">
            <div
              className="flex overflow-hidden rounded-full border border-[color:var(--line)] bg-[rgba(6,12,24,0.7)]"
              role="group"
              aria-label={t.nav.language}
            >
              {LANGUAGES.map((option) => (
                <button
                  key={option.code}
                  onClick={() => handleLanguageChange(option.code)}
                  aria-pressed={language === option.code}
                  lang={option.code}
                  className={`px-2.5 py-1.5 font-mono text-[10px] uppercase transition-colors ${
                    language === option.code
                      ? 'bg-[color:var(--surface-2)] text-[color:var(--cyan)]'
                      : 'text-[color:var(--ink-3)] hover:text-[color:var(--ink)]'
                  }`}
                  title={option.label}
                >
                  {option.code === 'ar' ? 'عربي' : 'EN'}
                </button>
              ))}
            </div>
            <button
              onClick={toggleSound}
              aria-label={isMuted ? t.nav.soundOn : t.nav.soundOff}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)]"
            >
              <AudioGlyph muted={isMuted} />
            </button>
            <button
              onClick={() => {
                spaceAudio.playTelemetryBeep(1100, 0.03);
                setIsMenuOpen((prev) => !prev);
              }}
              aria-expanded={isMenuOpen}
              aria-label={t.nav.menu}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--ink)]"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[99] xl:hidden">
          <div
            className="absolute inset-0 bg-[rgba(3,7,15,0.82)] backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-nav-panel"
            className="absolute inset-x-0 top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto border-b border-[color:var(--line)] bg-[rgba(7,14,30,0.98)] px-4 pb-10 pt-6 sm:px-6"
          >
            <p className="mono-label mb-4">{t.nav.menu}</p>
            <nav className="flex flex-col">
              {navItems.map(({ id, label, Icon }, index) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => {
                    spaceAudio.playTelemetryBeep(1100, 0.03);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-4 border-b border-[color:var(--line)] py-4 text-[color:var(--ink-2)] transition-colors hover:text-[color:var(--ink)]"
                >
                  <span className="font-mono-tabular text-[10px] text-[color:var(--ink-3)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Icon className="h-4 w-4 text-[color:var(--cyan)]" />
                  <span className="font-display text-base">{label}</span>
                </a>
              ))}
            </nav>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <p className="mono-label mb-2">{t.worldSelector.switchWorld}</p>
                <div className="flex overflow-hidden rounded-lg border border-[color:var(--line)]">
                  {(['Mars', 'Moon'] as const).map((world) => (
                    <button
                      key={world}
                      onClick={() => handleWorld(world)}
                      aria-pressed={activeWorld === world}
                      className={`flex-1 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${
                        activeWorld === world
                          ? 'bg-[color:var(--blue)] text-[color:var(--ink)]'
                          : 'text-[color:var(--ink-3)]'
                      }`}
                    >
                      {world === 'Mars' ? t.worldSelector.marsTitle : t.worldSelector.moonTitle}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mono-label mb-2">{t.nav.language}</p>
                <div className="flex overflow-hidden rounded-lg border border-[color:var(--line)]">
                  {LANGUAGES.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => handleLanguageChange(option.code)}
                      aria-pressed={language === option.code}
                      lang={option.code}
                      className={`flex-1 px-3 py-2 font-mono text-[10px] uppercase transition-colors ${
                        language === option.code
                          ? 'bg-[color:var(--surface-2)] text-[color:var(--cyan)]'
                          : 'text-[color:var(--ink-3)]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
