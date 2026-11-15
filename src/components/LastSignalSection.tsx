import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, ExternalLink, Volume2, VolumeX, CheckCircle2 } from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { SignalAudioScenario } from '../types/mission';
import { LocalizedText } from '../i18n/types';
import { useT } from '../i18n/LanguageContext';
import { SectionHeading } from './SectionHeading';

interface SignalQuoteItem {
  type: 'telemetry' | 'interpretation' | 'team_message';
  typeLabel: LocalizedText;
  text: LocalizedText;
  attribution: LocalizedText;
  context: LocalizedText;
  sourceUrl: string;
  sourceName: string;
  clarificationNote?: LocalizedText;
}

interface SignalCase {
  id: string;
  vehicle: string;
  designation: string;
  world: LocalizedText;
  date: LocalizedText;
  coordinates: string;
  sol: LocalizedText;
  natureOfEnd: LocalizedText;
  telemetryFact: {
    raw: string;
    explanation: LocalizedText;
    sourceUrl: string;
    sourceName: string;
  };
  quotes: SignalQuoteItem[];
  audioScenario: SignalAudioScenario;
  visualizer: {
    themeColor: string;
    accentBg: string;
    glowHex: string;
    activeTitle: LocalizedText;
    endStateTitle: LocalizedText;
    behavior: 'erratic_dropout' | 'drooping_curve' | 'calm_relay' | 'sharp_square_cutoff' | 'steady_plateau';
  };
  sources: Array<{ title: string; url: string }>;
}

const signalCases: SignalCase[] = [
  {
    id: 'opportunity',
    vehicle: 'Opportunity',
    designation: 'MER-B (Mars Exploration Rover)',
    world: { en: 'MARS // Endeavour Crater, Perseverance Valley', ar: 'المريخ // فوهة إنديفور، وادي المثابرة' },
    date: { en: 'June 10, 2018', ar: '١٠ يونيو ٢٠١٨' },
    coordinates: '2.28° S, 354.6° E',
    sol: { en: 'Sol 5111', ar: 'اليوم المريخي ٥١١١' },
    natureOfEnd: { en: 'Loss of solar generation in a planetary-scale dust storm', ar: 'فقدان التوليد الشمسي في عاصفة غبارية كوكبية' },
    telemetryFact: {
      raw: 'TAUP > 10.8 // SOLAR ARRAY: ~22 Wh/sol // PBIT: NOMINAL // X-BAND CARRIER DROPPED',
      explanation: { en: 'At local Martian noon, atmospheric optical depth tau exceeded 10.8 (>99% opacity). Daily solar generation plunged from 600 to 22 Wh. According to NASA JPL engineers, this caused irrecoverable freezing and battery discharge.', ar: 'عند الظهيرة المريخية المحلية تجاوز العمق البصري للغلاف الجوي tau قيمة ١٠٫٨ (عتامة أكبر من ٩٩٪). وانهار التوليد الشمسي اليومي من ٦٠٠ إلى ٢٢ واط/ساعة، ما أدى بحسب مهندسي NASA JPL إلى تجمّد وتفريغ بطارية لا رجعة فيهما.' },
      sourceUrl: 'https://science.nasa.gov/mission/mer-opportunity/',
      sourceName: 'NASA Science: MER Opportunity Mission'
    },
    quotes: [
      {
        type: 'interpretation',
        typeLabel: { en: 'Interpretation', ar: 'تفسير' },
        text: { en: '“My battery is low and it’s getting dark.”', ar: '«بطاريتي منخفضة والظلام يقترب.»' },
        attribution: { en: 'Jacob Margolis, KPCC / NPR science reporter', ar: 'جيكوب مارغوليس، مراسل علمي في KPCC / NPR' },
        context: { en: 'February 2019 media report', ar: 'تقرير إعلامي، فبراير ٢٠١٩' },
        sourceUrl: 'https://www.npr.org/2019/02/13/694354249/opportunity-rover-falls-silent-on-mars',
        sourceName: 'NPR / KPCC News',
        clarificationNote: { en: 'NOTE: The rover NEVER transmitted these words. It was an evocative interpretation by a journalist summarizing raw JPL telemetry on dying batteries and sky opacity tau > 10.8.', ar: 'ملاحظة: لم تبثّ المركبة هذه الكلمات أبدًا. كان تفسيرًا مجازيًا من صحفي يلخّص قياسات JPL الأصلية عن البطاريات المحتضرة وعتامة السماء tau > ١٠٫٨.' }
      },
      {
        type: 'team_message',
        typeLabel: { en: 'Team Message', ar: 'رسالة الفريق' },
        text: { en: '“We have made every reasonable engineering effort to try to restore contact with Opportunity... The likelihood of receiving a signal is far too low. We declare mission completion with deep gratitude.”', ar: '«بذلنا كل جهد هندسي معقول لمحاولة استعادة الاتصال بأوبورتيونيتي... احتمال استقبال إشارة منخفض جدًا. نعلن اكتمال المهمة بامتنان عميق.»' },
        attribution: { en: 'John Callas, Opportunity Project Manager at NASA JPL', ar: 'جون كالاس، مدير مشروع أوبورتيونيتي في NASA JPL' },
        context: { en: 'February 13, 2019 Pasadena press briefing', ar: 'إحاطة صحفية في باسادينا، ١٣ فبراير ٢٠١٩' },
        sourceUrl: 'https://www.jpl.nasa.gov/news/nasas-record-setting-opportunity-rover-mission-on-mars-comes-to-end',
        sourceName: 'NASA JPL Release 2019-02-13'
      }
    ],
    audioScenario: {
      id: 'oppy_audio',
      carrierFreq: 840,
      duration: 6.8,
      fadeType: 'jerky_noise_burst',
      noiseBaseLevel: 0.003,
      noiseGrowth: 0.045,
      packetInterval: 0.8
    },
    visualizer: {
      themeColor: 'text-[color:var(--cyan)]',
      accentBg: 'bg-[color:var(--indigo)]',
      glowHex: '#f97316',
      activeTitle: { en: 'INTERMITTENT FADE // RISING STORM NOISE', ar: 'تلاشٍ متقطع // ارتفاع ضجيج العاصفة' },
      endStateTitle: { en: 'CARRIER LOST // DEAD SILENCE', ar: 'فقدان الموجة الحاملة // صمت تام' },
      behavior: 'erratic_dropout'
    },
    sources: [
      { title: 'NASA Science: MER Opportunity Overview', url: 'https://science.nasa.gov/mission/mer-opportunity/' },
      { title: 'NASA JPL: Opportunity Mission End Release', url: 'https://www.jpl.nasa.gov/news/nasas-record-setting-opportunity-rover-mission-on-mars-comes-to-end' }
    ]
  },
  {
    id: 'spirit',
    vehicle: 'Spirit',
    designation: 'MER-A (Mars Exploration Rover)',
    world: { en: 'MARS // Gusev Crater, "Troy" Sulfate Sand Trap', ar: 'المريخ // فوهة غوسيف، مصيدة رمال كبريتية «تروي»' },
    date: { en: 'March 22, 2010', ar: '٢٢ مارس ٢٠١٠' },
    coordinates: '14.57° S, 175.47° E',
    sol: { en: 'Sol 2210', ar: 'اليوم المريخي ٢٢١٠' },
    natureOfEnd: { en: 'Loss of survival heating and freezing of transmitter in sulfate sand trap', ar: 'فقدان تدفئة البقاء وتجمّد المرسل في مصيدة الرمال الكبريتية' },
    telemetryFact: {
      raw: 'SOLAR POWER: ~134 Wh/sol // LOW-POWER SLEEP MODE // CARRIER UNLOCKED (SOL 2210)',
      explanation: { en: 'Immobilized rover was unable to tilt northward to catch the low Martian winter sun. JPL engineers determined that insufficient power shut down survival heaters, freezing internal electronics.', ar: 'لم يستطع المتجوّل المتجمّد الميل شمالًا لالتقاط شمس الشتاء المريخي المنخفضة. وخلص مهندسو JPL إلى أن نقص الطاقة أوقف سخانات البقاء فتجمدت الإلكترونيات الداخلية.' },
      sourceUrl: 'https://science.nasa.gov/mission/mer-spirit/',
      sourceName: 'NASA Science: MER Spirit Mission'
    },
    quotes: [
      {
        type: 'telemetry',
        typeLabel: { en: 'Flight Telemetry', ar: 'قياسات الطيران' },
        text: { en: '“Sol 2210: power bus status — transitioning to deep sleep for thermal conservation; direct X-band link with Earth severed (JPL reconstruction).”', ar: '«اليوم ٢٢١٠: حالة ناقل الطاقة — الانتقال إلى سبات عميق للحفاظ على الحرارة؛ انقطاع رابط X-band المباشر مع الأرض (إعادة بناء JPL).»' },
        attribution: { en: 'NASA JPL Spirit Flight Telemetry Report', ar: 'تقرير قياسات الطيران لبعثة سبيريت، NASA JPL' },
        context: { en: 'March 22, 2010 final transmission', ar: 'آخر إرسال، ٢٢ مارس ٢٠١٠' },
        sourceUrl: 'https://science.nasa.gov/mission/mer-spirit/',
        sourceName: 'NASA Planetary Data / Science Mission'
      },
      {
        type: 'interpretation',
        typeLabel: { en: 'Interpretation', ar: 'تفسير' },
        text: { en: '“The rover froze in the glacial night on the slopes of Columbia Hills.”', ar: '«تجمّد المتجوّل في الليل الجليدي على منحدرات تلال كولومبيا.»' },
        attribution: { en: 'Popular science press retellings', ar: 'روايات صحافة العلوم الشعبية' },
        context: { en: '2010–2011 media', ar: 'إعلام ٢٠١٠–٢٠١١' },
        sourceUrl: 'https://www.jpl.nasa.gov/news/nasa-ends-efforts-to-contact-spirit',
        sourceName: 'NASA JPL News Release',
        clarificationNote: { en: 'Per mission calculations, chassis temperature fell below -55°C, causing battery failure and clock oscillator drift.', ar: 'بحسب حسابات البعثة، انخفضت حرارة الهيكل دون -٥٥°م، فتسبّب ذلك في فشل البطارية وانحراف مذبذب الساعة.' }
      },
      {
        type: 'team_message',
        typeLabel: { en: 'Team Message', ar: 'رسالة الفريق' },
        text: { en: '“Spirit worked for over six years instead of the planned 90 days. Even trapped in Troy sands, it continued making discoveries down to its last watt.”', ar: '«عمل سبيريت أكثر من ست سنوات بدلًا من ٩٠ يومًا مخططًا لها. وحتى وهو عالق في رمال تروي، واصل الاكتشافات حتى آخر واط لديه.»' },
        attribution: { en: 'John Callas, MER Project Manager at JPL', ar: 'جون كالاس، مدير مشروع MER في JPL' },
        context: { en: 'May 2011 formal conclusion of recovery attempts', ar: 'مايو ٢٠١١، الإعلان الرسمي لانتهاء محاولات الاستعادة' },
        sourceUrl: 'https://www.jpl.nasa.gov/news/nasa-ends-efforts-to-contact-spirit',
        sourceName: 'NASA JPL Release 2011-156'
      }
    ],
    audioScenario: {
      id: 'spirit_audio',
      carrierFreq: 760,
      duration: 7.0,
      fadeType: 'smooth_drift_freeze',
      noiseBaseLevel: 0.004,
      noiseGrowth: 0.005,
      packetInterval: 1.8
    },
    visualizer: {
      themeColor: 'text-cyan-400',
      accentBg: 'bg-cyan-500',
      glowHex: '#06b6d4',
      activeTitle: { en: 'FREQUENCY DOWNWARD DRIFT // GENERATOR FREEZE', ar: 'انحراف التردد نحو الأسفل // تجمّد المولّد' },
      endStateTitle: { en: 'CLOCK OSCILLATOR HALT // HIBERNATION', ar: 'توقف مذبذب الساعة // سبات' },
      behavior: 'drooping_curve'
    },
    sources: [
      { title: 'NASA Science: MER Spirit Overview', url: 'https://science.nasa.gov/mission/mer-spirit/' },
      { title: 'NASA JPL: Concluding Efforts to Contact Spirit', url: 'https://www.jpl.nasa.gov/news/nasa-ends-efforts-to-contact-spirit' }
    ]
  },
  {
    id: 'insight',
    vehicle: 'InSight',
    designation: 'Interior Exploration using Seismic Investigations',
    world: { en: 'MARS // Elysium Planitia', ar: 'المريخ // سهل إليسيوم' },
    date: { en: 'December 15, 2022', ar: '١٥ ديسمبر ٢٠٢٢' },
    coordinates: '4.50° N, 135.62° E',
    sol: { en: 'Sol 1440', ar: 'اليوم المريخي ١٤٤٠' },
    natureOfEnd: { en: 'Irreversible dust accumulation on UltraFlex solar arrays', ar: 'تراكم غبار لا رجعة فيه على مصفوفات UltraFlex الشمسية' },
    telemetryFact: {
      raw: 'SOLAR BUS: ~285 Wh/sol // IDC CAMERA: SEIS IN DUST // DSN CARRIER SILENT',
      explanation: { en: 'Dust devils failed to clean the arrays. Daily solar generation plummeted from 5,000 to ~285 Wh. Following transmission of its final seismometer image on Dec 15, 2022, contact ceased due to battery depletion.', ar: 'لم تنجح الشياطين الغبارية في تنظيف المصفوفات، فانهار التوليد الشمسي اليومي من ٥٠٠٠ إلى نحو ٢٨٥ واط/ساعة. وبعد بثّ آخر صورة للزلزالي في ١٥ ديسمبر ٢٠٢٢ انقطع الاتصال بسبب نفاد البطارية.' },
      sourceUrl: 'https://mars.nasa.gov/insight/mission/status/',
      sourceName: 'NASA InSight Mission Updates'
    },
    quotes: [
      {
        type: 'team_message',
        typeLabel: { en: 'Team Message', ar: 'رسالة الفريق' },
        text: { en: '“My power’s really low, so this may be the last image I can send. Don’t worry about me: my time here has been productive and serene. If I can keep talking to my team, I will — but I’ll be signing off here soon. Thanks for staying with me.”', ar: '«طاقتي منخفضة جدًا، وربما تكون هذه آخر صورة أستطيع إرسالها. لا تقلقوا عليّ: كان وقتي هنا مثمرًا وهادئًا. وإن استطعت مواصلة الحديث مع فريقي فسأفعل، لكني سأودّعكم قريبًا. شكرًا لبقائكم معي.»' },
        attribution: { en: 'Official @NASAInSight Mission Account on Twitter/X', ar: 'الحساب الرسمي لبعثة @NASAInSight على تويتر/X' },
        context: { en: 'Dec 19, 2022 NASA outreach release', ar: 'بيان تواصل NASA، ١٩ ديسمبر ٢٠٢٢' },
        sourceUrl: 'https://twitter.com/NASAInSight/status/1604955577651044352',
        sourceName: 'Official NASA InSight Twitter/X Feed'
      },
      {
        type: 'telemetry',
        typeLabel: { en: 'Flight Telemetry', ar: 'قياسات الطيران' },
        text: { en: '“Per Sol 1440 telemetry, daily energy output dropped to ~285 Wh, following which the lander did not respond to DSN link passes (likely triggering battery deep-discharge protection).”', ar: '«بحسب قياسات اليوم ١٤٤٠، انخفض إنتاج الطاقة اليومي إلى نحو ٢٨٥ واط/ساعة، وبعدها لم تستجب المركبة لمرور روابط DSN (يُرجّح تفعيل حماية التفريغ العميق للبطارية).»' },
        attribution: { en: 'NASA Headquarters Release 22-132 on InSight Conclusion', ar: 'بيان مقر NASA رقم 22-132 بشأن ختام إنسايت' },
        context: { en: 'Dec 21, 2022 official report', ar: 'تقرير رسمي، ٢١ ديسمبر ٢٠٢٢' },
        sourceUrl: 'https://www.nasa.gov/news-release/nasas-insight-mission-ends-after-four-years-of-groundbreaking-science/',
        sourceName: 'NASA Headquarters Release 22-132'
      }
    ],
    audioScenario: {
      id: 'insight_audio',
      carrierFreq: 920,
      duration: 6.2,
      fadeType: 'stable_then_click',
      noiseBaseLevel: 0.002,
      noiseGrowth: 0.002,
      packetInterval: 0.85
    },
    visualizer: {
      themeColor: 'text-[color:var(--ink-2)]',
      accentBg: 'bg-[color:var(--cyan)]',
      glowHex: '#eab308',
      activeTitle: { en: 'STABLE CARRIER // POWER DRAIN // RELAY CLICK', ar: 'موجة حاملة مستقرة // استنزاف طاقة // نقرة مرحّل' },
      endStateTitle: { en: 'POWER BUS CUTOFF // RELAY OPEN', ar: 'قطع ناقل الطاقة // فتح المرحّل' },
      behavior: 'calm_relay'
    },
    sources: [
      { title: 'NASA: InSight Mission Status', url: 'https://mars.nasa.gov/insight/mission/status/' },
      { title: 'NASA HQ: InSight Mission Ends After 4 Years of Science', url: 'https://www.nasa.gov/news-release/nasas-insight-mission-ends-after-four-years-of-groundbreaking-science/' }
    ]
  },
  {
    id: 'apollo17-alsep',
    vehicle: 'Apollo 17 ALSEP',
    designation: 'Apollo Lunar Surface Experiments Package',
    world: { en: 'MOON // Taurus-Littrow Valley', ar: 'القمر // وادي توروس-ليترو' },
    date: { en: 'September 30, 1977', ar: '٣٠ سبتمبر ١٩٧٧' },
    coordinates: '20.19° N, 30.77° E',
    sol: { en: '30.09.1977', ar: '٣٠٫٠٩٫١٩٧٧' },
    natureOfEnd: { en: 'Deliberate command shutdown by Earth ground control due to budget constraints', ar: 'إيقاف متعمّد بأمر من مركز التحكم الأرضي بسبب قيود الميزانية' },
    telemetryFact: {
      raw: 'SNAP-27 RTG: ~68 W // S-BAND 2278.0 MHz: ACTIVE // GROUND COMMAND: SCIENCE OPERATIONS TERMINATED',
      explanation: { en: 'The station suffered NO technical faults. The SNAP-27 plutonium RTG supplied steady power, and seismometers recorded lunar quakes. NASA terminated funding for the ALSEP ground tracking network under congressional budget constraints ($5M/yr).', ar: 'لم تصب المحطة أي أعطال فنية. كان مولّد SNAP-27 البلوتوني يوفّر طاقة ثابتة، والزلزاليات تسجّل هزات قمرية. لكن NASA أنهت تمويل شبكة التتبع الأرضية ALSEP ضمن قيود ميزانية الكونغرس (٥ ملايين دولار سنويًا).' },
      sourceUrl: 'https://curator.jsc.nasa.gov/lunar/alsep.cfm',
      sourceName: 'NASA Johnson Space Center ALSEP Termination Report'
    },
    quotes: [
      {
        type: 'team_message',
        typeLabel: { en: 'Team Message', ar: 'رسالة الفريق' },
        text: { en: '“The shutdown of ALSEP scientific stations was dictated solely by NASA budgetary limits, not equipment failures. They could have transmitted geophysical data for many more years.”', ar: '«إيقاف محطات ALSEP العلمية كان مقتصرًا على حدود ميزانية NASA، لا على أعطال المعدات. كان بمقدورها بثّ بيانات جيوفيزيائية سنوات أخرى كثيرة.»' },
        attribution: { en: 'James Bates, ALSEP Program Manager at NASA JSC', ar: 'جيمس بيتس، مدير برنامج ALSEP في مركز جونزون للفضاء التابع لـ NASA' },
        context: { en: 'September 1977 official NASA communiqué', ar: 'بيان رسمي من NASA، سبتمبر ١٩٧٧' },
        sourceUrl: 'https://history.nasa.gov/SP-407/sp407.htm',
        sourceName: 'NASA History Office: Apollo Expeditions to the Moon (SP-407)'
      },
      {
        type: 'telemetry',
        typeLabel: { en: 'Flight Telemetry', ar: 'قياسات الطيران' },
        text: { en: '“September 30, 1977: Pursuant to commands from MSFN tracking stations, ALSEP scientific experiments were placed into passive mode after 8 years of operations.”', ar: '«٣٠ سبتمبر ١٩٧٧: بناءً على أوامر محطات التتبع MSFN، وُضعت تجارب ALSEP العلمية في الوضع السلبي بعد ٨ سنوات من التشغيل.»' },
        attribution: { en: 'NASA Johnson Space Center ALSEP Termination Report (1979)', ar: 'تقرير إنهاء ALSEP، مركز جونزون للفضاء (١٩٧٩)' },
        context: { en: 'Sept 30, 1977 conclusion of Apollo 12, 14, 15, 16, 17 network support', ar: '٣٠ سبتمبر ١٩٧٧، ختام دعم شبكة أبولو ١٢ و١٤ و١٥ و١٦ و١٧' },
        sourceUrl: 'https://curator.jsc.nasa.gov/lunar/alsep.cfm',
        sourceName: 'NASA JSC Lunar Science Information'
      }
    ],
    audioScenario: {
      id: 'apollo_audio',
      carrierFreq: 1040,
      duration: 6.0,
      fadeType: 'instant_cutoff',
      noiseBaseLevel: 0.004,
      noiseGrowth: 0,
      packetInterval: 0.5,
      cutoffTimeRatio: 0.70
    },
    visualizer: {
      themeColor: 'text-[color:var(--signal)]',
      accentBg: 'bg-[color:var(--signal)]',
      glowHex: '#22c55e',
      activeTitle: { en: 'NOMINAL 1970s CARRIER // INSTANT COMMAND CUTOFF', ar: 'موجة حاملة قياسية من السبعينيات // قطع فوري بأمر' },
      endStateTitle: { en: 'CARRIER CUTOFF // SHUTDOWN COMMAND DISPATCHED', ar: 'قطع الموجة الحاملة // إرسال أمر الإيقاف' },
      behavior: 'sharp_square_cutoff'
    },
    sources: [
      { title: 'NASA JSC: ALSEP Program Final Report', url: 'https://curator.jsc.nasa.gov/lunar/alsep.cfm' },
      { title: 'NASA SP-407: Apollo Expeditions to the Moon', url: 'https://history.nasa.gov/SP-407/sp407.htm' }
    ]
  },
  {
    id: 'ingenuity',
    vehicle: 'Ingenuity',
    designation: 'Mars Helicopter Scout (Ginny)',
    world: { en: 'MARS // Jezero Crater, Valinor Hills', ar: 'المريخ // فوهة جيزيرو، تلال فالينور' },
    date: { en: 'January 18, 2024', ar: '١٨ يناير ٢٠٢٤' },
    coordinates: '18.4446° N, 77.4509° E',
    sol: { en: 'Sol 1038', ar: 'اليوم المريخي ١٠٣٨' },
    natureOfEnd: { en: 'Rotor blade tip damage during hard touchdown. Aircraft intact and transitioned to stationary weather outpost', ar: 'تلف طرف شفرة الدوّار أثناء هبوط قاسٍ. المركبة سليمة وتحوّلت إلى محطة أرصاد ثابتة' },
    telemetryFact: {
      raw: 'ROTOR ROTATION: HALTED // BLADE TIP SEPARATION DETECTED // AVIONICS & POWER: 100% HEALTHY // ZIGBEE 914 MHz: ACTIVE',
      explanation: { en: 'The helicopter flew 72 times instead of the planned 5. Although blade damage prevents flight, avionics, solar panel, and radio remain functional, serving as a permanent stationary station.', ar: 'حلّقت المروحية ٧٢ مرة بدلًا من ٥ مخطط لها. ورغم أن تلف الشفرة يمنع الطيران، تبقى الإلكترونيات واللوح الشمسي والراديو عاملة، فتعمل كمحطة ثابتة دائمة.' },
      sourceUrl: 'https://www.jpl.nasa.gov/news/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends',
      sourceName: 'NASA JPL News Release 2024'
    },
    quotes: [
      {
        type: 'team_message',
        typeLabel: { en: 'Team Message', ar: 'رسالة الفريق' },
        text: { en: '“The historic journey of Ingenuity has come to an end. That remarkable helicopter flew higher and farther than we ever imagined, proving powered flight on Mars is possible. It can no longer fly, but its instruments continue serving science.”', ar: '«انتهت رحلة إنجينويتي التاريخية. لقد حلّقت تلك المروحية الاستثنائية أعلى وأبعد مما تخيّلنا، وأثبتت أن الطيران بمحرك على المريخ ممكن. لم تعد قادرة على الطيران، لكن أدواتها تواصل خدمة العلم.»' },
        attribution: { en: 'Bill Nelson, NASA Administrator', ar: 'بيل نيلسون، مدير NASA' },
        context: { en: 'Jan 25, 2024 NASA HQ briefing', ar: 'إحاطة مقر NASA، ٢٥ يناير ٢٠٢٤' },
        sourceUrl: 'https://www.nasa.gov/news-release/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/',
        sourceName: 'NASA Headquarters Release 24-009'
      },
      {
        type: 'interpretation',
        typeLabel: { en: 'Interpretation', ar: 'تفسير' },
        text: { en: '“Folded its wings yet remains alive: the helicopter transformed into an enduring Martian weather station.”', ar: '«طوت جناحيها لكنها ما زالت حية: تحوّلت المروحية إلى محطة أرصاد مريخية دائمة.»' },
        attribution: { en: 'Aerospace observers & NASA JPL press team', ar: 'مراقبو الطيران الجوي وفريق صحافة NASA JPL' },
        context: { en: 'January 2024', ar: 'يناير ٢٠٢٤' },
        sourceUrl: 'https://www.jpl.nasa.gov/news/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends',
        sourceName: 'NASA JPL Technical Briefing',
        clarificationNote: { en: 'JPL engineers updated flight software: Ingenuity wakes up every Martian morning, logs sensor data and temperatures into flash memory for future missions.', ar: 'حدّث مهندسو JPL برمجيات الطيران: تستيقظ إنجينويتي كل صباح مريخي وتسجّل بيانات المجسّات ودرجات الحرارة في ذاكرة وميضية من أجل بعثات المستقبل.' }
      }
    ],
    audioScenario: {
      id: 'ingenuity_audio',
      carrierFreq: 1160,
      duration: 6.5,
      fadeType: 'active_pause_note',
      noiseBaseLevel: 0.001,
      noiseGrowth: 0,
      packetInterval: 0.28,
      pauseNoteFreq: 880
    },
    visualizer: {
      themeColor: 'text-teal-400',
      accentBg: 'bg-teal-400',
      glowHex: '#14b8a6',
      activeTitle: { en: 'HEALTHY AERIAL CARRIER // ZERO FADE', ar: 'موجة حاملة جوية سليمة // تلاشٍ صفري' },
      endStateTitle: { en: 'CONTROL PAUSE // CRAFT ALIVE (STATIONARY POST)', ar: 'توقف التحكم // المركبة حية (محطة ثابتة)' },
      behavior: 'steady_plateau'
    },
    sources: [
      { title: 'NASA HQ Release: After Three Years on Mars, Ingenuity Mission Ends', url: 'https://www.nasa.gov/news-release/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/' },
      { title: 'NASA JPL Ingenuity Mars Helicopter Overview', url: 'https://www.jpl.nasa.gov/missions/ingenuity-mars-helicopter' }
    ]
  }
];

export const LastSignalSection: React.FC = () => {
  const { t, localize } = useT();
  const [selectedCase, setSelectedCase] = useState<SignalCase>(signalCases[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(spaceAudio.getMuted());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const stopRef = useRef<(() => void) | null>(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      spaceAudio.stopCurrentSignal();
    };
  }, []);

  const handleSelectCase = (c: SignalCase) => {
    if (isPlaying) {
      stopPlayback();
    }
    setSelectedCase(c);
    setProgress(0);
    spaceAudio.playTelemetryBeep(1100, 0.03);
  };

  const startPlayback = () => {
    if (isPlaying) {
      stopPlayback();
      return;
    }
    setIsPlaying(true);
    setProgress(0);

    const stopFn = spaceAudio.playSignalScenario(selectedCase.audioScenario, (p) => {
      setProgress(p);
      if (p >= 1) {
        setIsPlaying(false);
        stopRef.current = null;
      }
    });

    stopRef.current = stopFn;
  };

  const stopPlayback = () => {
    if (stopRef.current) {
      stopRef.current();
      stopRef.current = null;
    }
    spaceAudio.stopCurrentSignal();
    setIsPlaying(false);
    setProgress(0);
  };

  const toggleMute = () => {
    const muted = spaceAudio.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      spaceAudio.playTelemetryBeep(1300, 0.04);
    }
  };

  // Spectrum bar calculation function based on scenario behavior
  const computeBarHeight = (barIndex: number, totalBars: number): number => {
    if (prefersReducedMotion) {
      if (!isPlaying) return 14;
      if (selectedCase.audioScenario.fadeType === 'instant_cutoff') {
        const cutoff = selectedCase.audioScenario.cutoffTimeRatio ?? 0.7;
        return progress >= cutoff ? 2 : 24;
      }
      if (selectedCase.audioScenario.fadeType === 'active_pause_note') {
        return 22;
      }
      return Math.max(2, Math.round(26 * (1 - progress)));
    }

    if (!isPlaying) {
      return Math.max(4, Math.sin(barIndex * 0.35) * 14 + 14);
    }

    switch (selectedCase.visualizer.behavior) {
      case 'erratic_dropout': {
        if (progress > 0.85) return 2;
        const dropoutDip = (progress > 0.22 && progress < 0.3) || (progress > 0.42 && progress < 0.5) || (progress > 0.65 && progress < 0.74);
        const amplitudeMod = dropoutDip ? 0.15 : (1 - progress * 0.75);
        const noiseScatter = (Math.sin(barIndex * 9.3 + progress * 24) * 0.5 + 0.5) * (progress * 18);
        const wave = Math.sin(barIndex * 0.45 + progress * 16) * 22;
        return Math.max(2, Math.min(38, Math.round(wave * amplitudeMod + noiseScatter)));
      }
      case 'drooping_curve': {
        if (progress > 0.9) return 2;
        const fadeMod = Math.max(0.05, Math.pow(1 - progress, 1.8));
        const slowDriftWave = Math.sin(barIndex * 0.3 + progress * 6) * 20;
        return Math.max(2, Math.min(38, Math.round(slowDriftWave * fadeMod + 4)));
      }
      case 'calm_relay': {
        if (progress > 0.88) return 2;
        const smoothDecay = 1 - progress * 0.65;
        const stableToneWave = Math.sin(barIndex * 0.55 + progress * 10) * 18;
        return Math.max(2, Math.min(38, Math.round(stableToneWave * smoothDecay + 8)));
      }
      case 'sharp_square_cutoff': {
        const cutoff = selectedCase.audioScenario.cutoffTimeRatio ?? 0.7;
        if (progress >= cutoff) return 2;
        const squareLikeWave = Math.sin(barIndex * 0.6 + progress * 12) > 0 ? 30 : 16;
        return squareLikeWave;
      }
      case 'steady_plateau':
      default: {
        const plateauWave = Math.sin(barIndex * 0.4 + progress * 14) * 18 + 16;
        return Math.max(8, Math.min(38, Math.round(plateauWave)));
      }
    }
  };

  const totalBars = 36;
  const bars = Array.from({ length: totalBars }, (_, i) => computeBarHeight(i, totalBars));

  return (
    <section id="last-signal" className="relative border-t border-[color:var(--line)] bg-[color:var(--abyss)] py-16 sm:py-20 xl:py-[88px]">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 xl:ps-14 xl:pe-10">
        <SectionHeading
          index="05"
          tag={t.lastSignal.sectionTag.replace(/^\d+\s*\/\/\s*/, '')}
          title={t.lastSignal.title}
          description={t.lastSignal.subtitle}
          action={
            <span className="mono-label flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--cyan)] animate-pulse-soft" />
              {t.lastSignal.audioNotice}
            </span>
          }
        />

        {/* Global Sound and Accessibility Ribbon */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-xs font-mono border-b border-[color:var(--line)] pb-4">
          <div className="text-[color:var(--ink-2)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[color:var(--cyan)]" />
            <span>{t.lastSignal.vesselSelector}</span>
          </div>

          <div className="flex items-center gap-3">
            {prefersReducedMotion && (
              <span className="text-[11px] text-[color:var(--ink-2)] bg-[color:var(--surface-2)] border border-[color:var(--line-strong)] px-2 py-0.5 rounded">
                {t.lastSignal.reducedMotionActive}
              </span>
            )}

            <button
              onClick={toggleMute}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[color:var(--surface-2)] hover:bg-[color:var(--surface-2)] border border-[color:var(--line)] rounded text-[color:var(--ink-2)] transition-colors"
              title={isMuted ? t.nav.soundOn : t.nav.soundOff}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[color:var(--ink-3)]" /> : <Volume2 className="w-3.5 h-3.5 text-[color:var(--signal)]" />}
              <span>{isMuted ? t.nav.soundOff : t.nav.soundOn}</span>
            </button>
          </div>
        </div>

        {/* Interactive Apparatus Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
          {signalCases.map((item) => {
            const isSelected = selectedCase.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectCase(item)}
                className={`p-3 rounded-lg border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-[color:var(--surface-2)]/90 border-[color:var(--line-strong)] shadow-xl'
                    : 'bg-[color:var(--surface)]/70 border-[color:var(--line)] hover:border-[color:var(--line-strong)] hover:bg-[color:var(--surface-2)]/40'
                }`}
              >
                {isSelected && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: item.visualizer.glowHex }}
                  />
                )}
                <div className="text-[10px] font-mono uppercase text-[color:var(--ink-2)] truncate">
                  {localize(item.world).split('//')[0]}
                </div>
                <div className="text-sm font-display font-bold text-[color:var(--ink)] uppercase truncate mt-0.5">
                  {item.vehicle}
                </div>
                <div className="text-[10px] font-mono text-[color:var(--ink-2)] mt-1 truncate">
                  {localize(item.date)}
                </div>
              </button>
            );
          })}
        </div>

        {/* The Audio Visualizer Stage */}
        <div className="rounded-2xl border border-[color:var(--line)] bg-[#04060a] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Top Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[color:var(--line)] pb-4 mb-6">
            <div className="flex items-center gap-3 text-xs font-mono">
              <div
                className={`w-3 h-3 rounded-full transition-colors ${
                  isPlaying
                    ? 'animate-ping'
                    : 'animate-pulse'
                }`}
                style={{ backgroundColor: selectedCase.visualizer.glowHex }}
              />
              <span className="font-bold text-[color:var(--ink)] tracking-wider uppercase">
                {selectedCase.vehicle} // {selectedCase.designation}
              </span>
            </div>

            <div className="text-[11px] font-mono text-[color:var(--ink-2)]">
              {localize(selectedCase.world)} · {selectedCase.coordinates} · {localize(selectedCase.sol)}
            </div>
          </div>

          {/* Visualizer Frequency Bars Display */}
          <div className="py-8 sm:py-12 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl h-36 flex items-end justify-between gap-1 sm:gap-2 px-4 bg-[color:var(--surface)]/60 rounded-xl border border-[color:var(--line)]/90 p-4">
              {bars.map((h, i) => (
                <div
                  key={i}
                  style={{
                    height: `${h * 2.5}px`,
                    backgroundColor: isPlaying ? selectedCase.visualizer.glowHex : '#334155',
                    boxShadow: isPlaying ? `0 0 10px ${selectedCase.visualizer.glowHex}66` : 'none',
                    transition: prefersReducedMotion ? 'none' : 'height 0.08s ease, background-color 0.2s',
                  }}
                  className="flex-1 rounded-t-sm"
                />
              ))}
            </div>

            {/* Dynamic Status Text */}
            <div className="mt-4 text-center font-mono text-xs text-[color:var(--ink-2)] tracking-wider uppercase">
              {isPlaying ? (
                <span className="text-[color:var(--ink)]">
                  {localize(selectedCase.visualizer.activeTitle)} ({(progress * 100).toFixed(0)}%)
                </span>
              ) : (
                <span>{localize(selectedCase.visualizer.endStateTitle)}</span>
              )}
            </div>
          </div>

          {/* Play / Stop Control Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2 border-y border-[color:var(--line)] my-6">
            <button
              onClick={startPlayback}
              className={`px-7 py-3 rounded-md font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2.5 shadow-lg ${
                isPlaying
                  ? 'bg-[color:var(--blue)] hover:bg-[color:var(--blue-deep)] text-[color:var(--ink)] shadow-[color:var(--indigo)]/25'
                  : 'bg-[color:var(--blue)] hover:bg-[color:var(--blue-deep)] text-[color:var(--ink)] shadow-[color:var(--blue)]/25'
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-4 h-4 fill-white" />
                  <span>{t.lastSignal.stopSimulation}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>{t.lastSignal.playSignalWithDuration} ({selectedCase.audioScenario.duration}s)</span>
                </>
              )}
            </button>

            <div className="text-xs font-mono text-[color:var(--ink-2)] text-center sm:text-left">
              {t.lastSignal.fadeProfile} <span className="text-[color:var(--ink-2)]">{localize(selectedCase.natureOfEnd)}</span>
            </div>
          </div>

          {/* Fact vs Interpretation Cards */}
          <div className="mt-8 space-y-6">
            {/* Raw Telemetry Fact */}
            <div className="p-4 rounded-xl bg-[color:var(--surface)] border border-[color:var(--line)]">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[color:var(--signal)] bg-[color:var(--signal)]/10 border border-[rgba(55,224,200,0.3)] px-2 py-0.5 rounded flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t.lastSignal.telemetryBadge}
                </span>
                <a
                  href={selectedCase.telemetryFact.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-[color:var(--ink-2)] hover:text-[color:var(--ink)] inline-flex items-center gap-1 transition-colors"
                >
                  <span>{selectedCase.telemetryFact.sourceName}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="font-mono text-xs sm:text-sm text-[color:var(--ink)] bg-black/50 p-2.5 rounded border border-[color:var(--line)] mb-2">
                {selectedCase.telemetryFact.raw}
              </div>
              <p className="text-xs text-[color:var(--ink-2)] leading-relaxed font-light">
                {localize(selectedCase.telemetryFact.explanation)}
              </p>
            </div>

            {/* Categorized Quotes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCase.quotes.map((q, qIdx) => {
                const isInterpretation = q.type === 'interpretation';
                return (
                  <div
                    key={qIdx}
                    className={`p-4 rounded-xl border flex flex-col justify-between ${
                      isInterpretation
                        ? 'bg-[color:var(--surface-2)] border-[color:var(--line)]'
                        : 'bg-[color:var(--surface)] border-[color:var(--line)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
                            isInterpretation
                              ? 'text-[color:var(--ink-2)] bg-[color:var(--surface-2)] border-[color:var(--line-strong)]'
                              : 'text-blue-400 bg-blue-950/60 border-blue-700/50'
                          }`}
                        >
                          {localize(q.typeLabel)}
                        </span>

                        <span className="text-[10px] font-mono text-[color:var(--ink-2)]">
                          {localize(q.context)}
                        </span>
                      </div>

                      <blockquote className="text-sm font-serif italic text-[color:var(--ink)] leading-snug my-2">
                        {localize(q.text)}
                      </blockquote>

                      <div className="text-xs font-mono text-[color:var(--ink-2)] mt-2">
                        — {localize(q.attribution)}
                      </div>

                      {q.clarificationNote && (
                        <div className="mt-3 p-2 bg-[color:var(--surface-2)] border border-[color:var(--line-strong)] rounded text-[11px] font-mono text-[color:var(--ink-2)] leading-relaxed">
                          {localize(q.clarificationNote)}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[color:var(--line)] flex items-center justify-between text-[11px] font-mono text-[color:var(--ink-2)]">
                      <span>{t.lastSignal.sourceLabel}</span>
                      <a
                        href={q.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[color:var(--ink-2)] hover:text-[color:var(--ink)] inline-flex items-center gap-1 transition-colors"
                      >
                        <span className="truncate max-w-[200px]">{q.sourceName}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Official Source Reference Links */}
            <div className="p-4 bg-[color:var(--surface)]/60 border border-[color:var(--line)] rounded-xl text-xs font-mono text-[color:var(--ink-2)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                {t.lastSignal.officialSourcesTitle}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {selectedCase.sources.map((src, sIdx) => (
                  <a
                    key={sIdx}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[color:var(--ink-2)] hover:text-[color:var(--ink)] underline decoration-slate-600 hover:decoration-white inline-flex items-center gap-1"
                  >
                    <span>{src.title}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
