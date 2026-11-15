import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Quote } from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { useT } from '../i18n/LanguageContext';
import { Starfield } from './Starfield';

/**
 * Epilogue: a left-aligned closing manifest rather than a centred gradient
 * banner. Quote, statement and return control share one baseline grid.
 */
export const FinalSection: React.FC = () => {
  const { t } = useT();

  const scrollToTop = () => {
    spaceAudio.playTelemetryBeep(1500, 0.05);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden border-t border-[color:var(--line)] py-20 sm:py-24 xl:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-nebula opacity-70" />
        <Starfield density={0.00008} />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" aria-hidden="true" />
      </div>

      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 xl:ps-14 xl:pe-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono-tabular text-[11px] tracking-[0.18em] text-[color:var(--ink-3)]">
                10
              </span>
              <span className="h-px w-6 bg-[color:var(--line-strong)]" aria-hidden="true" />
              <span className="chapter-tag">{t.final.badge.replace(/^.*\/\/\s*/, '')}</span>
            </div>

            <h2
              className="font-display mt-5 text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[color:var(--ink)]"
              style={{ textWrap: 'balance' }}
            >
              {t.final.heroTitle1}
              <br />
              <span className="bg-gradient-to-r from-[#4fd8ff] to-[#7b8bff] bg-clip-text text-transparent">
                {t.final.heroTitle2}
              </span>
            </h2>

            <p className="mt-5 max-w-[46rem] text-sm leading-[1.75] text-[color:var(--ink-2)] sm:text-base">
              {t.final.heroParagraph}
            </p>

            <button onClick={scrollToTop} className="btn-ghost group mt-8">
              <ArrowUp className="h-3.5 w-3.5 text-[color:var(--cyan)] transition-transform group-hover:-translate-y-0.5" />
              <span>{t.final.exploreAgainBtn}</span>
            </button>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="panel relative h-full p-6 sm:p-8">
              <Quote className="h-5 w-5 text-[color:var(--cyan)] opacity-70" aria-hidden="true" />
              <blockquote className="font-display mt-4 text-base leading-[1.6] text-[color:var(--ink)] sm:text-lg">
                {t.final.quoteText}
              </blockquote>
              <figcaption className="mt-6 border-t border-[color:var(--line)] pt-4">
                <p className="mono-label text-[color:var(--cyan)]">{t.final.quoteAuthor}</p>
                <p className="mt-1 text-xs text-[color:var(--ink-2)]">{t.final.quoteRole}</p>
              </figcaption>
            </div>
          </motion.figure>
        </div>
      </div>
    </section>
  );
};