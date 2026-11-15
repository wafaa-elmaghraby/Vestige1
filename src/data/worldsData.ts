import { WorldInfo } from '../types/mission';

export const worldsData: Record<'Moon' | 'Mars', WorldInfo> = {
  Moon: {
    id: 'Moon',
    name: { en: 'The Moon', ar: 'القمر' },
    englishName: 'LUNA',
    tagline: { en: 'Earth’s natural satellite. Humanity’s first step beyond the home cradle.', ar: 'التابع الطبيعي للأرض. أول خطوة للبشرية خارج مهدها.' },
    description: { en: 'Permanently resting on the Moon are 6 Apollo lunar module descent stages, 3 LRV buggies, Surveyor probes, and ALSEP scientific stations. In airless vacuum, they remain pristine for decades.', ar: 'على سطح القمر تستقر إلى الأبد ست مراحل هبوط لمركبات أبولو القمرية، وثلاث عربات LRV، ومسابر سيرفيور، ومحطات ALSEP العلمية. وفي الفراغ الخالي من الهواء تبقى سليمة لعقود.' },
    stats: {
      objectsCount: 3,
      missionsCount: { en: '24+ NASA missions', ar: 'أكثر من ٢٤ بعثة NASA' },
      timeSpan: '1966 – 2024+',
      distanceFromEarth: { en: '384,400 km', ar: '٣٨٤٬٤٠٠ كم' },
      environment: { en: 'Absolute vacuum, micrometeorites', ar: 'فراغ مطلق، ونيازك دقيقة' },
      surfaceTemp: { en: 'from -173°C to +120°C', ar: 'من -١٧٣°م إلى +١٢٠°م' },
    },
  },
  Mars: {
    id: 'Mars',
    name: { en: 'Mars', ar: 'المريخ' },
    englishName: 'MARS',
    tagline: { en: 'The Red Planet. The resting place and archive of humanity’s greatest robotic pioneers.', ar: 'الكوكب الأحمر. مثوى وأرشيف أعظم روّاد البشرية الآليين.' },
    description: { en: 'Martian winds and global dust storms slowly mantle with iron oxide the legendary rovers Opportunity, Spirit, Sojourner, landers Viking, Phoenix, and InSight, as well as the pioneering aerial helicopter Ingenuity.', ar: 'تغطّي الرياح المريخية والعواصف الغبارية العالمية ببطء طبقة من أكسيد الحديد المتجوّلات الأسطورية أوبورتيونيتي وسبيريت وسوجورنر، ومركبات الهبوط فايكنغ وفينيكس وإنسايت، إضافة إلى المروحية الرائدة إنجينويتي.' },
    stats: {
      objectsCount: 11,
      missionsCount: { en: '16+ successful craft', ar: 'أكثر من ١٦ مركبة ناجحة' },
      timeSpan: '1976 – 2026+',
      distanceFromEarth: { en: '225,000,000 km (average)', ar: '٢٢٥٬٠٠٠٬٠٠٠ كم (متوسط)' },
      environment: { en: 'Rarefied CO₂ atmosphere (0.6% of Earth)', ar: 'غلاف جوي رقيق من ثاني أكسيد الكربون (٠٫٦٪ من غلاف الأرض)' },
      surfaceTemp: { en: 'from -125°C to +20°C', ar: 'من -١٢٥°م إلى +٢٠°م' },
    },
  },
};
