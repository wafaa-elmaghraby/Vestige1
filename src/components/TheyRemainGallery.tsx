import React from 'react';
import { motion } from 'motion/react';
import { SchematicView } from './SchematicView';
import { ShieldCheck } from 'lucide-react';
import { LocalizedText } from '../i18n/types';
import { useT } from '../i18n/LanguageContext';
import { SectionHeading } from './SectionHeading';

interface RelicItem {
  id: string;
  name: LocalizedText;
  world: LocalizedText;
  place: LocalizedText;
  statusText: LocalizedText;
  significance: LocalizedText;
  schematic: 'lander' | 'rover-buggy' | 'rover' | 'helicopter';
}

const relicItems: RelicItem[] = [
  {
    id: 'apollo11',
    name: { en: 'Apollo 11 LM-5 “Eagle” Descent Stage', ar: 'مرحلة هبوط LM-5 «إيغل» من أبولو ١١' },
    world: { en: 'The Moon', ar: 'القمر' },
    place: { en: 'Tranquility Base', ar: 'قاعدة الهدوء' },
    statusText: { en: 'Resting in vacuum since July 21, 1969', ar: 'مستقرة في الفراغ منذ ٢١ يوليو ١٩٦٩' },
    significance: { en: 'Humanity’s first landing site off Earth. Gold mylar foil, aluminum struts, and the plaque "We Came In Peace" remain pristine.', ar: 'أول موقع هبوط للبشرية خارج الأرض. رقائق المايلار الذهبية والدعامات الألومنيوم ولوحة «جئنا بسلام» ما زالت سليمة.' },
    schematic: 'lander',
  },
  {
    id: 'lrv1',
    name: { en: 'Lunar Roving Vehicle LRV-001 (Apollo 15)', ar: 'العربة القمرية LRV-001 (أبولو ١٥)' },
    world: { en: 'The Moon', ar: 'القمر' },
    place: { en: 'Hadley Rille', ar: 'أخدود هادلي' },
    statusText: { en: 'Parked at final VIP overlook since August 2, 1971', ar: 'متوقفة في آخر مطلّ لها منذ ٢ أغسطس ١٩٧١' },
    significance: { en: 'The first wheeled automobile driven across an extraterrestrial world. Color TV camera remains aimed at the Falcon ascent liftoff spot.', ar: 'أول سيارة ذات عجلات تُقاد على عالم خارج الأرض. ما زالت كاميرا التلفزيون الملوّن موجّهة نحو موقع إقلاع مركبة الصعود فالكون.' },
    schematic: 'rover-buggy',
  },
  {
    id: 'oppy',
    name: { en: 'Opportunity Rover (MER-B)', ar: 'المتجوّل أوبورتيونيتي (MER-B)' },
    world: { en: 'Mars', ar: 'المريخ' },
    place: { en: 'Endeavour Crater, Perseverance Valley', ar: 'فوهة إنديفور، وادي المثابرة' },
    statusText: { en: 'Resting under fine Martian dust since June 10, 2018', ar: 'مستقر تحت غبار مريخي ناعم منذ ١٠ يونيو ٢٠١٨' },
    significance: { en: 'Drove 45 kilometers across Martian sands. Proved the past existence of liquid freshwater lakes on the Red Planet.', ar: 'قطع ٤٥ كيلومترًا عبر رمال المريخ. وأثبت وجود بحيرات مياه عذبة سائلة في الماضي على الكوكب الأحمر.' },
    schematic: 'rover',
  },
  {
    id: 'ginny',
    name: { en: 'Ingenuity Mars Helicopter', ar: 'مروحية المريخ إنجينويتي' },
    world: { en: 'Mars', ar: 'المريخ' },
    place: { en: 'Jezero Crater, Valinor Hills', ar: 'فوهة جيزيرو، تلال فالينور' },
    statusText: { en: 'Stationary weather station since January 18, 2024', ar: 'محطة أرصاد ثابتة منذ ١٨ يناير ٢٠٢٤' },
    significance: { en: 'First powered aerodynamic flight in another world’s atmosphere. Completed 72 flights and blazed the trail for aerial exploration.', ar: 'أول تحليق جوي بمحرك في غلاف عالم آخر. أكملت ٧٢ رحلة ومهّدت طريق الاستكشاف الجوي.' },
    schematic: 'helicopter',
  }
];

/**
 * Memorial register: full-width horizontal relic rows. Each row pairs the
 * schematic plate with its record, so the section reads as a manifest rather
 * than a card grid.
 */
export const TheyRemainGallery: React.FC = () => {
  const { t, localize } = useT();

  return (
    <section id="memorial" className="relative border-t border-[color:var(--line)] py-16 sm:py-20 xl:py-[88px]">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 xl:ps-14 xl:pe-10">
        <SectionHeading
          index="08"
          tag={t.memorial.sectionTag.replace(/^\d+\s*\/\/\s*/, '')}
          title={t.memorial.title}
          description={t.memorial.subtitle}
          action={
            <span className="mono-label flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--signal)]" />
              {t.memorial.badge}
            </span>
          }
        />

        <div className="divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
          {relicItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group grid grid-cols-1 gap-5 py-6 md:grid-cols-12 md:items-center md:gap-8"
            >
              <div className="md:col-span-3">
                <SchematicView
                  type={item.schematic}
                  accentColor={item.id === 'oppy' || item.id === 'ginny' ? '#4fd8ff' : '#7b8bff'}
                  className="h-36 md:h-32"
                />
              </div>

              <div className="md:col-span-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono-tabular text-[10px] tracking-[0.14em] text-[color:var(--ink-3)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="mono-label">{localize(item.world)}</span>
                  <span aria-hidden="true" className="text-[color:var(--ink-3)]">·</span>
                  <span className="mono-label">{localize(item.place)}</span>
                </div>
                <h3 className="font-display mt-2 text-lg leading-snug text-[color:var(--ink)] sm:text-xl">
                  {localize(item.name)}
                </h3>
                <p className="mono-label mt-2 normal-case tracking-[0.06em]">{localize(item.statusText)}</p>
              </div>

              <div className="md:col-span-4">
                <p className="text-xs leading-relaxed text-[color:var(--ink-2)] sm:text-[13px]">
                  {localize(item.significance)}
                </p>
                <p className="mono-label mt-3 flex items-center gap-1.5 text-[color:var(--signal)]">
                  <span className="h-1 w-1 rounded-full bg-[color:var(--signal)]" />
                  {t.memorial.monumentBadge}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mono-label mt-5 normal-case tracking-[0.06em]">{t.memorial.disclaimer}</p>
      </div>
    </section>
  );
};