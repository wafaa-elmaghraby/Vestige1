import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, Sparkles, Scale, BookOpen } from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { LocalizedText } from '../i18n/types';
import { useT } from '../i18n/LanguageContext';
import { SectionHeading } from './SectionHeading';

interface MoonArtifact {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  mission: LocalizedText;
  year: string;
  category: LocalizedText;
  description: LocalizedText;
  scientificOrCulturalValue: LocalizedText;
  sourceName: string;
  sourceUrl: string;
  iconTag: string;
}

const moonArtifacts: MoonArtifact[] = [
  {
    id: 'jettison-bags',
    title: { en: 'Jettison Bags (Life Support Waste)', ar: 'أكياس الطرح (نفايات دعم الحياة)' },
    subtitle: { en: '~96 Hermetic Jettison Bags', ar: 'نحو ٩٦ كيسًا محكم الإغلاق' },
    mission: { en: 'Apollo 11–17 Missions', ar: 'بعثات أبولو ١١–١٧' },
    year: '1969 — 1972',
    category: { en: 'Biological Trace', ar: 'أثر بيولوجي' },
    description: { en: 'To reduce lunar module ascent stage liftoff mass, astronauts jettisoned surplus gear onto the lunar regolith: PLSS backpacks, cameras, and white hermetic bags containing physiological waste and trash.', ar: 'لتقليل كتلة مرحلة الصعود في المركبة القمرية، ألقى روّاد الفضاء معدات فائضة على التربة القمرية: حقائب أنظمة دعم الحياة PLSS، وكاميرات، وأكياسًا بيضاء محكمة الإغلاق تحتوي فضلات بشرية ونفايات.' },
    scientificOrCulturalValue: { en: 'Today NASA astrobiologists view this as an unprecedented natural experiment: did dormant terrestrial bacterial spores survive 50+ years exposed to hard vacuum, solar UV radiation, and thermal swings from -173°C to +120°C?', ar: 'يرى علماء الأحياء الفلكية في NASA اليوم أن هذه تجربة طبيعية غير مسبوقة: هل نجحت أبواغ بكتيرية أرضية خامدة في البقاء أكثر من ٥٠ عامًا تحت فراغ قاسٍ وإشعاع شمسي فوق بنفسجي وتقلبات حرارية من -١٧٣°م إلى +١٢٠°م؟' },
    sourceName: 'NASA Apollo Lunar Surface Journal / Apollo 11 Jettison Log',
    sourceUrl: 'https://history.nasa.gov/alsj/a11/a11.jettison.html',
    iconTag: 'BIO-BAG'
  },
  {
    id: 'golf-balls',
    title: { en: 'Alan Shepard’s Lunar Golf Balls', ar: 'كرات الغولف القمرية لألان شيبارد' },
    subtitle: { en: 'Two Wilson Golf Balls + Custom 6-Iron Club', ar: 'كرتا غولف من Wilson مع مضرب حديدي ٦ مخصص' },
    mission: { en: 'Apollo 14 (Fra Mauro)', ar: 'أبولو ١٤ (فرا ماورو)' },
    year: '1971',
    category: { en: 'Sport & Science Experiment', ar: 'تجربة رياضية وعلمية' },
    description: { en: 'Commander Alan Shepard smuggled a Wilson Staff 6-iron club head to the Moon, mounted it onto a lunar sample scoop handle, and struck two golf balls one-handed in his stiff spacesuit.', ar: 'أدخل القائد ألان شيبارد رأس مضرب Wilson Staff حديدي رقم ٦ خلسة إلى القمر، وثبّته على مقبض مغرفة عيّنات قمرية، وضرب كرتي غولف بيد واحدة داخل بدلته الفضائية المتصلبة.' },
    scientificOrCulturalValue: { en: 'Shepard exclaimed: "Miles and miles and miles!" Later, digital analysis by independent researcher Andy Saunders using NASA LRO imagery revealed realistic distances: the first ball traveled ~22 meters (24 yards), the second ~37 meters (40 yards).', ar: 'هتف شيبارد: «أميال وأميال وأميال!» لكن التحليل الرقمي اللاحق الذي أجراه الباحث المستقل آندي ساندرز باستخدام صور LRO من NASA كشف مسافات واقعية: بلغت الكرة الأولى نحو ٢٢ مترًا، والثانية نحو ٣٧ مترًا.' },
    sourceName: 'NASA Apollo Lunar Surface Journal (Apollo 14 EVA-2)',
    sourceUrl: 'https://history.nasa.gov/alsj/a14/a14.eva2.html',
    iconTag: 'GOLF'
  },
  {
    id: 'fallen-astronaut',
    title: { en: '“Fallen Astronaut” Memorial Figurine', ar: 'تمثال «رائد الفضاء الساقط» التذكاري' },
    subtitle: { en: '8.5 cm Aluminum Figurine & Commemorative Plaque', ar: 'تمثال ألومنيوم بطول ٨٫٥ سم مع لوحة تذكارية' },
    mission: { en: 'Apollo 15 (Hadley Rille)', ar: 'أبولو ١٥ (أخدود هادلي)' },
    year: '1971',
    category: { en: 'Art & Memorial', ar: 'فن ونصب تذكاري' },
    description: { en: 'The only formal work of art installed on the Moon. Belgian artist Paul Van Hoeydonck sculpted an anonymous humanoid figure without gender or ethnic markers. Commander David Scott placed it gently on the regolith beside a memorial plaque.', ar: 'العمل الفني الرسمي الوحيد المثبَّت على القمر. نحت الفنان البلجيكي بول فان هويدونك شخصية بشرية بلا ملامح جنسانية أو عرقية، ووضعها القائد ديفيد سكوت برفق على التربة القمرية بجوار لوحة تذكارية.' },
    scientificOrCulturalValue: { en: 'The accompanying plaque honors 14 fallen Soviet and American space explorers, including Yuri Gagarin, Vladimir Komarov, Pavel Belyayev, Georgi Dobrovolski, Viktor Patsayev, Vladislav Volkov, Virgil Grissom, Edward White, Roger Chaffee, and others.', ar: 'تكرّم اللوحة المرافقة ١٤ مستكشفًا فضائيًا سوفييتيًا وأمريكيًا سقطوا، بينهم يوري غاغارين وفلاديمير كوماروف وبافل بيلياييف وجورجي دوبروفولسكي وفيكتور باتساييف وفلاديسلاف فولكوف وفيرجيل غريسوم وإدوارد وايت وروجر شافي وآخرون.' },
    sourceName: 'NASA Apollo 15 Journal (ALSJ) & Smithsonian NASM',
    sourceUrl: 'https://history.nasa.gov/alsj/a15/a15.eva3.html',
    iconTag: 'ART'
  },
  {
    id: 'duke-photo',
    title: { en: 'Charles Duke’s Family Photograph', ar: 'صورة عائلة تشارلز ديوك' },
    subtitle: { en: 'Color Print Encased in Protective Plastic', ar: 'صورة ملوّنة مغلّفة ببلاستيك واقٍ' },
    mission: { en: 'Apollo 16 (Descartes Highlands)', ar: 'أبولو ١٦ (مرتفعات ديكارت)' },
    year: '1972',
    category: { en: 'Personal Keepsake', ar: 'تذكار شخصي' },
    description: { en: 'Lunar Module Pilot Charlie Duke placed a family photograph onto the regolith showing himself, his wife Dorothy, and sons Charles and Thomas. Handwritten on the reverse: "This is the family of Astronaut Charlie Duke from Planet Earth who landed on the Moon, April 20, 1972".', ar: 'وضع طيّار المركبة القمرية تشارلي ديوك صورة عائلية على التربة تُظهره مع زوجته دوروثي وابنيه تشارلز وتوماس، وكُتب على ظهرها بخط اليد: «هذه عائلة رائد الفضاء تشارلي ديوك من كوكب الأرض الذي هبط على القمر في ٢٠ أبريل ١٩٧٢».' },
    scientificOrCulturalValue: { en: 'Duke documented the photograph with his Hasselblad camera (frame AS16-117-18841). Experts estimate the photo emulsions have bleached under unfiltered solar UV rays, though the substrate physically endures intact.', ar: 'وثّق ديوك الصورة بكاميرا هاسيلبلاد (الإطار AS16-117-18841). ويقدّر الخبراء أن مستحلبات الصورة بهتت تحت أشعة الشمس فوق البنفسجية غير المرشّحة، مع بقاء الحامل المادي سليمًا.' },
    sourceName: 'NASA Apollo Lunar Surface Journal (Apollo 16 Plum Crater)',
    sourceUrl: 'https://history.nasa.gov/alsj/a16/a16.step.html',
    iconTag: 'PHOTO'
  }
];

export const MoonArtifactsSection: React.FC = () => {
  const { t, localize } = useT();
  const [activeArtifact, setActiveArtifact] = useState<MoonArtifact>(moonArtifacts[0]);

  return (
    <section id="moon-artifacts" className="relative border-t border-[color:var(--line)] bg-[color:var(--abyss)] py-16 sm:py-20 xl:py-[88px]">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 xl:ps-14 xl:pe-10">
        <SectionHeading
          index="07"
          tag={t.moonArtifacts.sectionTag.replace(/^\d+\s*\/\/\s*/, '')}
          title={t.moonArtifacts.title}
          description={t.moonArtifacts.subtitle}
          action={
            <span className="mono-label flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5 text-[color:var(--cyan)]" />
              {t.moonArtifacts.verifiedSource}
            </span>
          }
        />

        {/* 4 Interactive Artifact Cards Grid */}
        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {moonArtifacts.map((item) => {
            const isSelected = activeArtifact.id === item.id;
            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => {
                  spaceAudio.playTelemetryBeep(1200, 0.03);
                  setActiveArtifact(item);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    spaceAudio.playTelemetryBeep(1200, 0.03);
                    setActiveArtifact(item);
                  }
                }}
                className={`relic-card flex cursor-pointer flex-col justify-between p-4 text-start transition-all ${
                  isSelected
                    ? 'border-[color:var(--line-strong)] bg-[color:var(--surface-2)]'
                    : 'bg-[color:var(--surface)]'
                }`}
              >
                <div>
                  <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-[color:var(--ink-3)]">
                    <span className="font-semibold text-[color:var(--cyan)]">{item.iconTag}</span>
                    <span>{item.year}</span>
                  </div>

                  <h3 className="font-display mb-1 text-[15px] leading-snug text-[color:var(--ink)]">
                    {localize(item.title)}
                  </h3>

                  <div className="mb-3 font-mono text-[11px] text-[color:var(--ink-2)]">
                    {localize(item.mission)}
                  </div>

                  <p className="line-clamp-3 text-xs leading-relaxed text-[color:var(--ink-2)]">
                    {localize(item.description)}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[color:var(--line)] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[color:var(--ink-3)]">{localize(item.category)}</span>
                  <span className={`font-semibold ${isSelected ? 'text-blue-400' : 'text-[color:var(--ink-2)]'}`}>
                    {isSelected ? t.moonArtifacts.selectedBadge : t.moonArtifacts.detailsLink}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Artifact Deep Dive Box */}
        <div className="rounded-2xl border border-[color:var(--line)] bg-[#070b12] p-6 sm:p-8 lg:p-10 mb-16 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[color:var(--ink-2)]">
                <span className="text-blue-400 font-bold uppercase">{localize(activeArtifact.category)}</span>
                <span aria-hidden="true">·</span>
                <span>{localize(activeArtifact.mission)}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[color:var(--ink-2)]">{activeArtifact.year}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[color:var(--ink)] uppercase tracking-tight">
                {localize(activeArtifact.title)}
              </h3>

              <div className="text-sm font-mono text-[color:var(--ink-2)]">
                {localize(activeArtifact.subtitle)}
              </div>

              <p className="text-sm sm:text-base text-[color:var(--ink)] leading-relaxed pt-2">
                {localize(activeArtifact.description)}
              </p>

              <div className="p-4 bg-[color:var(--surface)]/80 border border-[color:var(--line)] rounded-xl">
                <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t.moonArtifacts.artifactSignificanceTitle}
                </div>
                <p className="text-xs sm:text-sm text-[color:var(--ink-2)] leading-relaxed font-light">
                  {localize(activeArtifact.scientificOrCulturalValue)}
                </p>
              </div>
            </div>

            {/* Source Reference Block */}
            <div className="lg:w-72 bg-[color:var(--surface)] border border-[color:var(--line)] p-5 rounded-xl flex flex-col justify-between space-y-4">
              <div>
                <div className="text-[10px] font-mono uppercase text-[color:var(--ink-3)] mb-1">
                  {t.moonArtifacts.verifiedSource}
                </div>
                <div className="text-xs font-semibold text-[color:var(--ink)]">
                  {activeArtifact.sourceName}
                </div>
                <p className="text-[11px] text-[color:var(--ink-2)] mt-2 leading-relaxed">
                  {t.moonArtifacts.sourceNote}
                </p>
              </div>

              <a
                href={activeArtifact.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2.5 bg-[color:var(--surface-2)] hover:bg-[color:var(--surface-2)] border border-[color:var(--line-strong)] text-[color:var(--ink)] rounded text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span>{t.moonArtifacts.readSourceBtn}</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Philosophical / Legal Debate Block: "JUNK OR HERITAGE?" */}
        <div className="rounded-2xl border border-[color:var(--line)] bg-gradient-to-br from-slate-950 via-slate-900/60 to-slate-950 p-6 sm:p-10">
          <div className="flex items-center gap-2 text-xs font-mono text-[color:var(--cyan)] uppercase tracking-widest mb-3">
            <Scale className="w-4 h-4" />
            <span>{t.moonArtifacts.debateTag}</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-[color:var(--ink)] uppercase tracking-tight mb-4">
            {t.moonArtifacts.debateTitle}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-[color:var(--ink-2)] leading-relaxed">
            <div className="space-y-3">
              <p>
                {t.moonArtifacts.debateP1}
              </p>
              <p className="text-[color:var(--ink-2)]">
                {t.moonArtifacts.debateP2}
              </p>
            </div>

            <div className="space-y-3 bg-[color:var(--surface)]/70 p-5 rounded-xl border border-[color:var(--line)]">
              <div className="text-xs font-mono text-[color:var(--signal)] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.moonArtifacts.lawTitle}</span>
              </div>
              <p className="text-xs text-[color:var(--ink-2)]">
                {t.moonArtifacts.lawDesc}
              </p>
              <div className="pt-2 text-[11px] font-mono text-[color:var(--ink-3)]">
                {t.moonArtifacts.lawSourceText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
