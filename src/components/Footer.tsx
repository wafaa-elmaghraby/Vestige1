import React from 'react';
import { useT } from '../i18n/LanguageContext';

const navLinks = [
  { href: '#worlds', key: 'navWorlds' },
  { href: '#map-section', key: 'navMap' },
  { href: '#explorer', key: 'navCatalog' },
  { href: '#last-signal', key: 'navSignals' },
  { href: '#moon-artifacts', key: 'navHeritage' },
] as const;

/**
 * Manifest-style footer: brand column, navigation rail, primary-source note
 * and a closing hairline with the publication line.
 */
export const Footer: React.FC = () => {
  const { t } = useT();

  return (
    <footer className="relative border-t border-[color:var(--line)] bg-[color:var(--abyss)]">
      <div className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 xl:ps-14 xl:pe-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-7 w-7 items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-[color:var(--line-strong)]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--cyan)]" />
              </span>
              <span className="font-display text-[12px] font-semibold uppercase tracking-[0.34em] text-[color:var(--ink)]">
                {t.footer.brandTitle}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[color:var(--ink-2)]">
              {t.footer.brandDesc}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="mono-label">{t.footer.projectTag}</span>
            </div>
          </div>

          <nav className="md:col-span-3" aria-label={t.footer.navTitle}>
            <p className="mono-label mb-4">{t.footer.navTitle}</p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-[color:var(--ink-2)] transition-colors hover:text-[color:var(--cyan)]"
                  >
                    {t.footer[link.key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="mono-label mb-4">{t.footer.sourcesTitle}</p>
            <p className="text-sm leading-relaxed text-[color:var(--ink-2)]">{t.footer.disclaimer}</p>
            <p className="mt-3 text-xs leading-relaxed text-[color:var(--ink-3)]">{t.footer.rights}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[color:var(--line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="mono-label">{t.footer.dataCredit}</span>
          <span className="mono-label">VESTIGE · EN / AR · MMXXVI</span>
        </div>
      </div>
    </footer>
  );
};