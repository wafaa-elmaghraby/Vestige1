import { Mission } from '../types/mission';

export const missionsData: Mission[] = [
  {
    id: 'opportunity',
    name: { en: 'Opportunity', ar: 'أوبورتيونيتي' },
    englishName: 'Opportunity (MER-B)',
    designation: 'MER-B (Mars Exploration Rover — B)',
    destination: 'Mars',
    type: { en: 'Rover', ar: 'متجوّل' },
    launchDate: { en: 'July 7, 2003', ar: '٧ يوليو ٢٠٠٣' },
    landingDate: { en: 'January 25, 2004', ar: '٢٥ يناير ٢٠٠٤' },
    lastContactDate: { en: 'June 10, 2018 (officially declared February 13, 2019)', ar: '١٠ يونيو ٢٠١٨ (الإعلان الرسمي في ١٣ فبراير ٢٠١٩)' },
    activeSpan: { en: '2004 — 2018', ar: '٢٠٠٤ — ٢٠١٨' },
    status: { en: 'Mission complete (global dust storm)', ar: 'المهمة منتهية (عاصفة غبارية عالمية)' },
    statusType: 'silent',
    coordinates: {
      lat: '2.28° S',
      lon: '354.6° E',
      latNum: -2.28,
      lonNum: -5.4,
      formatted: { en: '2°16′48″ S, 5°24′00″ W', ar: '٢°١٦′٤٨″ جنوبًا، ٥°٢٤′٠٠″ غربًا' },
    },
    nasaSearchQuery: 'Opportunity rover Mars Endeavour crater',
    locationName: { en: 'Endeavour Crater, Perseverance Valley', ar: 'فوهة إنديفور، وادي المثابرة' },
    missionDuration: { en: '14 years 4 months 16 days (5,111 sols; planned: 90 sols)', ar: '١٤ عامًا و٤ أشهر و١٦ يومًا (٥٬١١١ يومًا مريخيًا؛ المخطط: ٩٠ يومًا)' },
    distanceTraveled: { en: '45.16 km (off-Earth roving distance record)', ar: '٤٥٫١٦ كم (رقم قياسي في المسافة المقطوعة خارج الأرض)' },
    image: '',
    schematicType: 'rover',
    shortDescription: { en: 'Legendary Mars rover designed for 90 days that operated for nearly 15 years, covering an extraterrestrial marathon distance.', ar: 'متجوّل مريخي أسطوري صُمم للعمل ٩٠ يومًا فعمل قرابة ١٥ عامًا، قاطعًا مسافة ماراثون كاملة خارج الأرض.' },
    howGotThere: { en: 'Launched aboard a Delta II 7925H rocket from Cape Canaveral. After a 6-month cruise, it entered the Martian atmosphere using a heat shield, parachute, and retrorockets, landing inside an airbag cocoon that bounced dozens of times before rolling right into Eagle Crater.', ar: 'أُطلق على صاروخ Delta II 7925H من كيب كانافيرال. وبعد رحلة استمرت ستة أشهر دخل الغلاف الجوي المريخي بدرع حراري ومظلة وصواريخ كبح، وهبط داخل شرنقة من الوسائد الهوائية ارتدّت عشرات المرات قبل أن تستقر داخل فوهة إيغل.' },
    whatDidItDo: { en: 'Discovery of the century: uncovered hematite spherules ("blueberries") and layered sedimentary rocks proving ancient Mars sustained liquid, neutral-to-acidic water bodies. Investigated Victoria and Endeavour craters, performing in-situ spectroscopy on hundreds of geological targets.', ar: 'اكتشاف القرن: كشف كريات الهيماتيت («العنبيات») وطبقات صخرية رسوبية تثبت أن المريخ القديم احتضن مياهًا سائلة متعادلة إلى حمضية. استكشف فوهتي فيكتوريا وإنديفور وأجرى تحليلًا طيفيًا ميدانيًا لمئات الأهداف الجيولوجية.' },
    lastContactStory: { en: 'In late May 2018, an unprecedented planetary dust storm engulfed Perseverance Valley, blotting out 99% of sunlight. On June 10, 2018 (Sol 5111), the rover transmitted its final telemetry: solar generation plummeted to a critical 22 Wh. JPL engineers estimated the rover froze in Martian night following battery depletion. Over 1,000 recovery commands went unanswered.', ar: 'في أواخر مايو ٢٠١٨ اجتاحت عاصفة غبارية كوكبية غير مسبوقة وادي المثابرة وحجبت ٩٩٪ من ضوء الشمس. وفي ١٠ يونيو ٢٠١٨ (اليوم المريخي ٥٬١١١) بثّ المتجوّل آخر قياساته: انهار توليد الطاقة الشمسية إلى ٢٢ واط/ساعة. وقدّر مهندسو JPL أن المتجوّل تجمّد في الليل المريخي بعد نفاد البطارية، بينما لم يُجب عن أكثر من ألف أمر استعادة.' },
    whereIsItNow: { en: 'Opportunity rests motionless on the western rim of Endeavour Crater in Perseverance Valley under gentle Martian breezes, coated in fine ochre dust — preserved as a monument to human engineering.', ar: 'يستقر أوبورتيونيتي بلا حراك على الحافة الغربية لفوهة إنديفور في وادي المثابرة تحت نسائم مريخية لطيفة، مغطى بغبار مغرة ناعم، محفوظًا كنصب لهندسة الإنسان.' },
    source: 'https://science.nasa.gov/mission/mer-opportunity/',
    quote: {
      text: { en: 'My battery is low and it\'s getting dark', ar: '«بطاريتي منخفضة والظلام يقترب»' },
      speaker: { en: 'Jacob Margolis (KPCC / NPR science journalist, poetic interpretation of JPL telemetry)', ar: 'جيكوب مارغوليس (صحفي علمي في KPCC / NPR، تفسير شاعري لقياسات JPL)' },
      context: { en: 'June 10, 2018 (Sol 5111)', ar: '١٠ يونيو ٢٠١٨ (اليوم المريخي ٥٬١١١)' },
      type: 'interpretation',
      typeLabel: { en: 'Interpretation', ar: 'تفسير' },
      sourceUrl: 'https://www.npr.org/2019/02/13/694354249/opportunity-rover-falls-silent-on-mars'
    },
    specs: [
      {
        label: { en: 'Launch Mass', ar: 'كتلة الإطلاق' },
        value: { en: '185 kg', ar: '١٨٥ كغ' }
      },
      {
        label: { en: 'Power Source', ar: 'مصدر الطاقة' },
        value: { en: 'Solar array (up to 140 W) + Li-ion batteries', ar: 'مصفوفة شمسية (حتى ١٤٠ واط) + بطاريات ليثيوم أيون' }
      },
      {
        label: { en: 'Scientific Instruments', ar: 'الأدوات العلمية' },
        value: { en: 'Pancam, Navcam, Hazcam, Mössbauer spectrometer, APXS, RAT rock abrasion tool', ar: 'كاميرات Pancam وNavcam وHazcam، ومطياف موسباور، ومطياف APXS، وأداة حتّ الصخور RAT' }
      },
      {
        label: { en: 'Max Speed', ar: 'السرعة القصوى' },
        value: { en: '5 cm/sec (avg 1 cm/sec)', ar: '٥ سم/ثانية (بمتوسط ١ سم/ثانية)' }
      },
      {
        label: { en: 'Lead Organization', ar: 'الجهة المسؤولة' },
        value: { en: 'NASA / Jet Propulsion Laboratory (JPL)', ar: 'NASA / مختبر الدفع النفاث (JPL)' }
      },
    ],
    milestones: [
      {
        date: '25.01.2004',
        title: { en: 'Touchdown in Eagle Crater', ar: 'الهبوط في فوهة إيغل' },
        description: { en: 'Hole-in-one landing inside a 22-meter impact crater.', ar: 'هبوط مباشر من أول محاولة داخل فوهة اصطدامية بعرض ٢٢ مترًا.' }
      },
      {
        date: '2004',
        title: { en: 'Discovery of "Blueberries"', ar: 'اكتشاف «العنبيات»' },
        description: { en: 'Hematite spherules confirming ancient liquid water.', ar: 'كريات هيماتيت تؤكد وجود مياه سائلة قديمًا.' }
      },
      {
        date: '2011',
        title: { en: 'Arrival at Endeavour Crater', ar: 'الوصول إلى فوهة إنديفور' },
        description: { en: 'Exploration of ancient rim rocks across a 22-km basin.', ar: 'استكشاف صخور الحافة القديمة في حوض بعرض ٢٢ كم.' }
      },
      {
        date: '24.03.2015',
        title: { en: 'Marathon Distance', ar: 'مسافة الماراثون' },
        description: { en: 'Crossed 42.195 km — first marathon completed on another world.', ar: 'تجاوز ٤٢٫١٩٥ كم، أول ماراثون يُكمل على عالم آخر.' }
      },
      {
        date: '10.06.2018',
        title: { en: 'Final Signal', ar: 'الإشارة الأخيرة' },
        description: { en: 'Global dust storm permanently cut solar power.', ar: 'عاصفة غبارية عالمية قطعت الطاقة الشمسية نهائيًا.' }
      },
    ],
    signalData: {
      sol: 5111,
      frequency: 'X-band 8.4 GHz',
      lastTelemetry: { en: 'TAUP = 10.8 (atmospheric opacity) // Solar Array Output: 22 Wh // PBIT: NOMINAL // Carrier signal dropped', ar: 'TAUP = ١٠٫٨ (عتامة الغلاف الجوي) // إنتاج المصفوفة الشمسية: ٢٢ واط/ساعة // PBIT: سليم // انقطاع الإشارة الحاملة' },
      fadeReason: { en: 'Per JPL mission assessment, catastrophic loss of insolation in planetary dust storm caused battery drain and system freeze.', ar: 'بحسب تقييم البعثة في JPL، أدى الفقدان الكارثي للإشعاع الشمسي في عاصفة غبارية كوكبية إلى استنزاف البطارية وتجمّد النظام.' },
    }
  },
  {
    id: 'apollo-11-lm',
    name: { en: 'Apollo 11 (LM-5 "Eagle" Descent Stage)', ar: 'أبولو ١١ (مرحلة هبوط LM-5 «إيغل»)' },
    englishName: 'Apollo 11 LM Descent Stage',
    designation: 'Apollo 11 Lunar Module (LM-5 Descent Stage)',
    destination: 'Moon',
    type: { en: 'Lander', ar: 'مركبة هبوط' },
    launchDate: { en: 'July 16, 1969', ar: '١٦ يوليو ١٩٦٩' },
    landingDate: { en: 'July 20, 1969', ar: '٢٠ يوليو ١٩٦٩' },
    lastContactDate: { en: 'July 21, 1969 (ascent stage liftoff)', ar: '٢١ يوليو ١٩٦٩ (انطلاق مرحلة الصعود)' },
    activeSpan: { en: 'July 1969', ar: 'يوليو ١٩٦٩' },
    status: { en: 'Mission complete (first human lunar landing)', ar: 'المهمة منتهية (أول هبوط بشري على القمر)' },
    statusType: 'complete',
    coordinates: {
      lat: '0.67408° N',
      lon: '23.47297° E',
      latNum: 0.67408,
      lonNum: 23.47297,
      formatted: { en: '0°40′27″ N, 23°28′23″ E', ar: '٠°٤٠′٢٧″ شمالًا، ٢٣°٢٨′٢٣″ شرقًا' },
    },
    nasaSearchQuery: 'Apollo 11 Eagle descent stage Tranquility Base',
    locationName: { en: 'Sea of Tranquility, Tranquility Base', ar: 'بحر الهدوء، قاعدة الهدوء' },
    missionDuration: { en: '21 hours 36 minutes on lunar surface (EVA: 2h 31m)', ar: '٢١ ساعة و٣٦ دقيقة على سطح القمر (النشاط خارج المركبة: ٢ س ٣١ د)' },
    distanceTraveled: { en: '0 km (descent base; astronauts traversed ~1 km)', ar: '٠ كم (قاعدة الهبوط؛ قطع الروّاد نحو كيلومتر واحد)' },
    image: '',
    schematicType: 'lander',
    shortDescription: { en: 'The descent stage from which Neil Armstrong and Buzz Aldrin stepped onto the Moon. Humanity’s first habitat on an alien world.', ar: 'مرحلة الهبوط التي نزل منها نيل أرمسترونغ وباز ألدرين إلى سطح القمر. أول موطن للبشرية على عالم آخر.' },
    howGotThere: { en: 'Propelled to translunar injection by Saturn V. Separated from CSM Columbia, descended under LGC guidance and Neil Armstrong’s manual stick control using the throttleable DPS engine.', ar: 'دُفعت إلى مسار الحقن القمري بصاروخ ساتورن ٥، ثم انفصلت عن كبسولة القيادة كولومبيا ونزلت تحت توجيه حاسوب LGC وبتحكّم أرمسترونغ اليدوي بمحرك DPS القابل للخنق.' },
    whatDidItDo: { en: 'Provided descent thrust and served as launch pad for Eagle’s ascent. Delivered flag, EASEP science package (LRRR retroreflector and passive seismometer), and the historic steel plaque.', ar: 'وفّرت دفع الهبوط وعملت منصة إقلاع لمرحلة صعود إيغل، وأوصلت العلم وحزمة EASEP العلمية (عاكس LRRR والزلزالي السلبي) واللوحة الفولاذية التاريخية.' },
    lastContactStory: { en: 'On July 21, 1969 at 17:54 UTC, the ascent stage ignited its APS engine, leaving the descent stage on the Moon as a launch pad with the commemorative plaque attached.', ar: 'في ٢١ يوليو ١٩٦٩ الساعة ١٧:٥٤ بتوقيت UTC أشعلت مرحلة الصعود محركها APS، تاركةً مرحلة الهبوط على القمر كمنصة إقلاع تحمل اللوحة التذكارية.' },
    whereIsItNow: { en: 'The descent stage rests pristine at Tranquility Base. Its gold Kapton foil, ladder rungs, and strut plaque remain untouched in lunar vacuum.', ar: 'تستقر مرحلة الهبوط سليمة في قاعدة الهدوء؛ فرقائق الكابتون الذهبية ودرجات السلّم واللوحة على الدعامة ما زالت كما هي في فراغ القمر.' },
    source: 'https://history.nasa.gov/alsj/a11/a11.html',
    quote: {
      text: { en: 'Here men from the planet Earth first set foot upon the Moon. July 1969, A.D. We came in peace for all mankind.', ar: '«هنا وطئت أقدام رجال من كوكب الأرض القمر لأول مرة. يوليو ١٩٦٩م. جئنا بسلام من أجل البشرية جمعاء.»' },
      speaker: { en: 'Inscription on LM-5 Eagle descent strut plaque', ar: 'نقش على لوحة دعامة مرحلة هبوط LM-5 إيغل' },
      context: { en: 'Tranquility Base, The Moon', ar: 'قاعدة الهدوء، القمر' },
      type: 'team_message',
      typeLabel: { en: 'Mission Plaque', ar: 'لوحة المهمة' },
      sourceUrl: 'https://history.nasa.gov/alsj/a11/a11.html'
    },
    specs: [
      {
        label: { en: 'Landing Mass', ar: 'كتلة الهبوط' },
        value: { en: '2,034 kg (dry descent stage)', ar: '٢٬٠٣٤ كغ (مرحلة الهبوط الجافة)' }
      },
      {
        label: { en: 'Footprint Diameter', ar: 'قطر قاعدة الارتكاز' },
        value: { en: '9.4 meters across footpads', ar: '٩٫٤ متر بين الوسائد' }
      },
      {
        label: { en: 'Construction', ar: 'مواد البناء' },
        value: { en: 'Al-2014 alloy, titanium, Mylar and Kapton foils', ar: 'سبيكة ألومنيوم 2014 وتيتانيوم ورقائق مايلار وكابتون' }
      },
      {
        label: { en: 'Science Deployed', ar: 'العلوم المنزَّلة' },
        value: { en: 'LRRR laser reflector (still operating!), PSEP seismometer', ar: 'عاكس الليزر LRRR (لا يزال يعمل!) والزلزالي PSEP' }
      },
    ],
    milestones: [
      {
        date: '20.07.1969',
        title: { en: 'Tranquility Base Here', ar: 'هنا قاعدة الهدوء' },
        description: { en: 'Eagle touched down with under 30 seconds of fuel reserve.', ar: 'هبطت إيغل باحتياطي وقود أقل من ٣٠ ثانية.' }
      },
      {
        date: '21.07.1969',
        title: { en: 'One Small Step', ar: 'خطوة صغيرة' },
        description: { en: 'First human EVA onto an extraterrestrial body.', ar: 'أول نشاط بشري خارج المركبة على جسم خارج الأرض.' }
      },
      {
        date: '21.07.1969',
        title: { en: 'Ascent Stage Liftoff', ar: 'إقلاع مرحلة الصعود' },
        description: { en: 'Descent stage left behind permanently as a monument.', ar: 'تُركت مرحلة الهبوط نهائيًا كنصب تذكاري.' }
      },
    ],
    signalData: {
      sol: 1,
      frequency: 'VHF & S-Band 2282.5 MHz',
      lastTelemetry: 'DESCENT STAGE SAFING COMPLETE // APS SEPARATION NOMINAL // DESCENT TELEMETRY TERMINATED',
      fadeReason: { en: 'Nominal mission profile. Ascent stage departed to CSM Columbia, leaving descent platform behind.', ar: 'مسار المهمة كما هو مخطط: غادرت مرحلة الصعود نحو كولومبيا تاركةً منصة الهبوط خلفها.' },
    }
  },
  {
    id: 'lrv-apollo15',
    name: { en: 'Lunar Roving Vehicle LRV-001 (Apollo 15)', ar: 'العربة القمرية LRV-001 (أبولو ١٥)' },
    englishName: 'Apollo 15 Lunar Roving Vehicle (LRV-001)',
    designation: 'Boeing / Delco Lunar Roving Vehicle 001',
    destination: 'Moon',
    type: { en: 'Lunar Buggy', ar: 'عربة قمرية' },
    launchDate: { en: 'July 26, 1971', ar: '٢٦ يوليو ١٩٧١' },
    landingDate: { en: 'July 30, 1971', ar: '٣٠ يوليو ١٩٧١' },
    lastContactDate: { en: 'August 2, 1971', ar: '٢ أغسطس ١٩٧١' },
    activeSpan: { en: 'July — August 1971', ar: 'يوليو — أغسطس ١٩٧١' },
    status: { en: 'Mission complete (parked at VIP observation site)', ar: 'المهمة منتهية (متوقفة في موقع مراقبة مميز)' },
    statusType: 'complete',
    coordinates: {
      lat: '26.1322° N',
      lon: '3.63386° E',
      latNum: 26.1322,
      lonNum: 3.63386,
      formatted: { en: '26°07′56″ N, 3°38′02″ E', ar: '٢٦°٠٧′٥٦″ شمالًا، ٣°٣٨′٠٢″ شرقًا' },
    },
    nasaSearchQuery: 'Apollo 15 Lunar Roving Vehicle Hadley Rille',
    locationName: { en: 'Hadley Rille / Apennine Mountains', ar: 'أخدود هادلي / جبال الأبنين' },
    missionDuration: { en: '3 days of expedition (active drive time: 3h 02m)', ar: '٣ أيام من البعثة (زمن القيادة الفعلي: ٣ س ٠٢ د)' },
    distanceTraveled: { en: '27.76 km', ar: '٢٧٫٧٦ كم' },
    image: '',
    schematicType: 'rover-buggy',
    shortDescription: { en: 'First four-wheeled electric vehicle on another celestial body. Allowed astronauts to venture kilometers away and retrieve the Genesis Rock.', ar: 'أول مركبة كهربائية بأربع عجلات على جسم سماوي آخر. أتاحت للروّاد الابتعاد كيلومترات واستخراج صخرة التكوين.' },
    howGotThere: { en: 'Folded into the quadrant of the LM Falcon descent stage. Deployed in minutes by David Scott and James Irwin using a cable-and-pulley latch mechanism.', ar: 'طُويت داخل ربع مرحلة هبوط المركبة فالكون، ونُشرت في دقائق على يد ديفيد سكوت وجيمس إيروين بآلية كابل وبكرة.' },
    whatDidItDo: { en: 'Revolutionized surface exploration: traveled up to 13 km/h along Hadley Rille canyon walls, ascended Hadley Delta, and retrieved the 4-billion-year-old Genesis Rock.', ar: 'أحدثت ثورة في استكشاف السطح: سارت بسرعة ١٣ كم/س على جدران أخدود هادلي، وصعدت دلتا هادلي، واستخرجت صخرة التكوين التي يبلغ عمرها ٤ مليارات سنة.' },
    lastContactStory: { en: 'At expedition end, David Scott parked the rover ~90 meters away at the VIP site, aiming the color TV camera at the ascent stage. Flight controller Ed Fendell tracked liftoff remotely from Houston until battery depletion.', ar: 'في نهاية البعثة أوقف ديفيد سكوت العربة على بعد نحو ٩٠ مترًا في موقع المراقبة، موجّهًا كاميرا التلفزيون الملوّن نحو مرحلة الصعود. وتابع مراقب الطيران إد فيندل الإقلاع عن بُعد من هيوستن حتى نفاد البطارية.' },
    whereIsItNow: { en: 'The rover rests at the base of the lunar Apennines. Its woven steel wire wheels with titanium chevrons, seats, and T-handle joystick remain intact in lunar vacuum.', ar: 'تستقر العربة عند سفح جبال الأبنين القمرية؛ عجلاتها الشبكية الفولاذية بزعانف التيتانيوم ومقاعدها وعصا التحكم ما زالت سليمة في فراغ القمر.' },
    source: 'https://history.nasa.gov/alsj/a15/a15.html',
    quote: {
      text: { en: 'Man must explore. And this is exploration at its greatest.', ar: '«على الإنسان أن يستكشف. وهذا هو الاستكشاف في أعظم صوره.»' },
      speaker: { en: 'David Scott', ar: 'ديفيد سكوت' },
      context: { en: 'Hadley Rille, The Moon', ar: 'أخدود هادلي، القمر' },
      type: 'team_message',
      typeLabel: { en: 'Crew Statement', ar: 'تصريح الطاقم' },
      sourceUrl: 'https://history.nasa.gov/alsj/a15/a15.html'
    },
    specs: [
      {
        label: { en: 'Dry Mass', ar: 'الكتلة الجافة' },
        value: { en: '210 kg (weighs 35 kg on Moon)', ar: '٢١٠ كغ (وزنها ٣٥ كغ على القمر)' }
      },
      {
        label: { en: 'Payload Capacity', ar: 'سعة الحمولة' },
        value: { en: '490 kg (two crew + 120 kg samples)', ar: '٤٩٠ كغ (رائدان + ١٢٠ كغ عيّنات)' }
      },
      {
        label: { en: 'Powertrain', ar: 'نظام الدفع' },
        value: { en: '4 x 0.25 hp Delco DC wheel drive motors', ar: '٤ محركات دفع كهربائية Delco بقدرة ٠٫٢٥ حصان لكل عجلة' }
      },
      {
        label: { en: 'Batteries', ar: 'البطاريات' },
        value: { en: 'Two 36-volt silver-zinc non-rechargeable batteries', ar: 'بطاريتان من الفضة والزنك بجهد ٣٦ فولت غير قابلتين لإعادة الشحن' }
      },
      {
        label: { en: 'Top Speed', ar: 'السرعة القصوى' },
        value: { en: '13 km/h', ar: '١٣ كم/س' }
      },
    ],
    milestones: [
      {
        date: '31.07.1971',
        title: { en: 'First Drive in History', ar: 'أول قيادة في التاريخ' },
        description: { en: 'David Scott drove the first off-world wheeled vehicle.', ar: 'قاد ديفيد سكوت أول مركبة بعجلات خارج الأرض.' }
      },
      {
        date: '01.08.1971',
        title: { en: 'Genesis Rock Found', ar: 'العثور على صخرة التكوين' },
        description: { en: 'Anorthosite sample 15415 retrieved, dating to Moon formation.', ar: 'استُخرجت عيّنة الأنورثوزيت 15415 التي يعود تاريخها إلى تشكّل القمر.' }
      },
      {
        date: '02.08.1971',
        title: { en: 'VIP Site Parking', ar: 'التوقف في موقع المراقبة' },
        description: { en: 'Rover camera broadcast live liftoff of Falcon ascent stage.', ar: 'بثّت كاميرا العربة إقلاع مرحلة صعود فالكون مباشرة.' }
      },
    ],
    signalData: {
      sol: 3,
      frequency: 'VHF RCA Color TV Downlink',
      lastTelemetry: 'LRV HIGH GAIN ANTENNA: LOCKED // BATTERY VOLTAGE 32.1V // CAMERA TRACKING LIFTOFF',
      fadeReason: { en: 'Depletion of primary non-rechargeable silver-zinc batteries days after crew departure.', ar: 'نفاد البطاريات الأولية غير القابلة لإعادة الشحن بعد أيام من مغادرة الطاقم.' },
    }
  },
  {
    id: 'spirit',
    name: { en: 'Spirit', ar: 'سبيريت' },
    englishName: 'Spirit (MER-A)',
    designation: 'MER-A (Mars Exploration Rover — A)',
    destination: 'Mars',
    type: { en: 'Rover', ar: 'متجوّل' },
    launchDate: { en: 'June 10, 2003', ar: '١٠ يونيو ٢٠٠٣' },
    landingDate: { en: 'January 4, 2004', ar: '٤ يناير ٢٠٠٤' },
    lastContactDate: { en: 'March 22, 2010 (officially declared May 25, 2011)', ar: '٢٢ مارس ٢٠١٠ (الإعلان الرسمي في ٢٥ مايو ٢٠١١)' },
    activeSpan: { en: '2004 — 2010', ar: '٢٠٠٤ — ٢٠١٠' },
    status: { en: 'Mission complete (presumed by mission team to have frozen in soil trap)', ar: 'المهمة منتهية (يفترض فريق البعثة تجمّده في مصيدة رملية)' },
    statusType: 'silent',
    coordinates: {
      lat: '14.5684° S',
      lon: '175.47263° E',
      latNum: -14.5684,
      lonNum: 175.47263,
      formatted: { en: '14°34′06″ S, 175°28′21″ E', ar: '١٤°٣٤′٠٦″ جنوبًا، ١٧٥°٢٨′٢١″ شرقًا' },
    },
    nasaSearchQuery: 'Spirit rover Mars Gusev crater',
    locationName: { en: 'Gusev Crater, Home Plate (Troy)', ar: 'فوهة غوسيف، هوم بليت (تروي)' },
    missionDuration: { en: '6 years 2 months 19 days (2,210 sols; planned: 90 sols)', ar: '٦ أعوام وشهران و١٩ يومًا (٢٬٢١٠ أيام مريخية؛ المخطط: ٩٠ يومًا)' },
    distanceTraveled: { en: '7.73 km', ar: '٧٫٧٣ كم' },
    image: '',
    schematicType: 'rover',
    shortDescription: { en: 'Twin of Opportunity that displayed incredible grit. Overcame a locked front wheel and stumbled upon pure proof of ancient Martian hydrothermal vents.', ar: 'توأم أوبورتيونيتي الذي أظهر عزيمة استثنائية؛ تغلّب على عجلة أمامية مقفلة وعثر على دليل قاطع على فتحات مائية حرارية قديمة على المريخ.' },
    howGotThere: { en: 'Launched on Delta II 7925. Landed inside an airbag cluster in Gusev Crater, rolled to a stop, deployed petal panels, and drove onto the soil.', ar: 'أُطلق على صاروخ Delta II 7925، وهبط داخل مجموعة وسائد هوائية في فوهة غوسيف، ثم نشر ألواحه وانطلق على التربة.' },
    whatDidItDo: { en: 'When its right-front wheel seized in 2006, Spirit drove in reverse, dragging the dead wheel. The resulting furrow exposed 90% pure silica — smoking-gun evidence of past volcanic steam vents or hot springs.', ar: 'عندما توقفت عجلته الأمامية اليمنى عام ٢٠٠٦، قاد سبيريت إلى الخلف وهو يجرّ العجلة المعطّلة، فكشفت الحفرة الناتجة سيليكا بنقاء ٩٠٪، وهي دليل دامغ على فتحات بخار بركانية أو ينابيع ساخنة قديمة.' },
    lastContactStory: { en: 'In May 2009, Spirit broke through a crust into soft sulphate sands named Troy. Unable to extricate itself or tilt toward the low winter sun, power dropped critically. Final transmission was received March 22, 2010. JPL engineers determined internal freezing disabled system clocks.', ar: 'في مايو ٢٠٠٩ اخترق سبيريت قشرة صلبة إلى رمال كبريتية ناعمة سُميت تروي. ولعجزه عن الخروج أو الميل نحو شمس الشتاء المنخفضة انهارت طاقته، واستُلمت آخر إشارة في ٢٢ مارس ٢٠١٠. وخلص مهندسو JPL إلى أن التجمّد الداخلي أوقف ساعات النظام.' },
    whereIsItNow: { en: 'Spirit remains trapped at Troy beside Home Plate in the Columbia Hills, tilted southward under the freezing Martian sky.', ar: 'يبقى سبيريت عالقًا في تروي قرب هوم بليت في تلال كولومبيا، مائلًا جنوبًا تحت سماء مريخية متجمدة.' },
    source: 'https://science.nasa.gov/mission/mer-spirit/',
    quote: {
      text: { en: 'Spirit overcame a jammed wheel and turned adversity into triumph: its dragged furrow uncovered pure silica, proving ancient hydrothermal vents on Mars.', ar: 'تغلّب سبيريت على عجلة محشورة وحوّل الشدّة إلى انتصار: كشفت حفرته سيليكا نقية، فأثبت وجود فتحات مائية حرارية قديمة على المريخ.' },
      speaker: { en: 'MER Mission Science Review', ar: 'مراجعة علوم بعثة MER' },
      context: { en: 'Columbia Hills, Mars', ar: 'تلال كولومبيا، المريخ' },
      type: 'interpretation',
      typeLabel: { en: 'Mission Summary', ar: 'ملخص المهمة' },
      sourceUrl: 'https://science.nasa.gov/mission/mer-spirit/'
    },
    specs: [
      {
        label: { en: 'Launch Mass', ar: 'كتلة الإطلاق' },
        value: { en: '185 kg', ar: '١٨٥ كغ' }
      },
      {
        label: { en: 'Power Source', ar: 'مصدر الطاقة' },
        value: { en: 'Solar arrays (up to 140 W) + radioisotope heaters (RHU)', ar: 'مصفوفات شمسية (حتى ١٤٠ واط) + سخانات نظائر مشعة (RHU)' }
      },
      {
        label: { en: 'Instruments', ar: 'الأدوات' },
        value: { en: 'Pancam, Microscopic Imager, APXS, Mini-TES, RAT tool', ar: 'كاميرات Pancam والمصوّر المجهري ومطياف APXS وMini-TES وأداة حتّ الصخور RAT' }
      },
      {
        label: { en: 'Max Slope', ar: 'أقصى ميل' },
        value: { en: 'Climbed slopes up to 30 degrees', ar: 'صعد منحدرات حتى ٣٠ درجة' }
      },
      {
        label: { en: 'Winter Endurance', ar: 'تحمّل الشتاء' },
        value: { en: 'Survived 3 harsh Martian winters', ar: 'نجا من ثلاثة فصول شتاء مريخية قاسية' }
      },
    ],
    milestones: [
      {
        date: '04.01.2004',
        title: { en: 'Touchdown in Gusev', ar: 'الهبوط في غوسيف' },
        description: { en: 'Successful landing in a presumed ancient lakebed.', ar: 'هبوط ناجح في قاع بحيرة قديمة يُفترض وجودها.' }
      },
      {
        date: '2005',
        title: { en: 'Husband Hill Summit', ar: 'قمة هازبند هيل' },
        description: { en: 'First robot to summit an extraterrestrial peak (107m).', ar: 'أول روبوت يبلغ قمة جبل خارج الأرض (١٠٧ أمتار).' }
      },
      {
        date: '2007',
        title: { en: 'Silica Discovery', ar: 'اكتشاف السيليكا' },
        description: { en: 'Dragged stuck wheel uncovered ancient geothermal vents.', ar: 'كشفت العجلة المسحوبة فتحات حرارية أرضية قديمة.' }
      },
      {
        date: '22.03.2010',
        title: { en: 'Last Transmission from Troy', ar: 'آخر إرسال من تروي' },
        description: { en: 'Presumed by the mission team to be a bus voltage drop below autonomous wake-up threshold (source: NASA/JPL Spirit Mission Conclusion).', ar: 'يفترض فريق البعثة أن جهد الناقل انخفض دون حدّ الاستيقاظ الذاتي (المصدر: خلاصة بعثة سبيريت NASA/JPL).' }
      },
    ],
    signalData: {
      sol: 2210,
      frequency: 'Direct-to-Earth X-Band',
      lastTelemetry: 'VOLTAGE BUS: 24.1V // SLEEP MODE ENGAGED // SOLAR POWER: 133 Wh/sol // CARRIER UNLOCKED',
      fadeReason: { en: 'Per mission team analysis, battery depletion resulted from unfavourable sun orientation in sand trap during winter (source: NASA JPL).', ar: 'بحسب تحليل فريق البعثة، نتج استنزاف البطارية عن وضعية شمسية غير مواتية داخل المصيدة الرملية خلال الشتاء (المصدر: NASA JPL).' },
    }
  },
  {
    id: 'ingenuity',
    name: { en: 'Ingenuity', ar: 'إنجينويتي' },
    englishName: 'Ingenuity Mars Helicopter',
    designation: 'Mars Helicopter Scout (Ginny)',
    destination: 'Mars',
    type: { en: 'Helicopter', ar: 'مروحية' },
    launchDate: { en: 'July 30, 2020', ar: '٣٠ يوليو ٢٠٢٠' },
    landingDate: { en: 'February 18, 2021', ar: '١٨ فبراير ٢٠٢١' },
    lastContactDate: { en: 'January 18, 2024 (flight campaign ended; now a stationary weather station)', ar: '١٨ يناير ٢٠٢٤ (انتهى برنامج الطيران؛ تعمل الآن كمحطة أرصاد ثابتة)' },
    activeSpan: { en: '2021 — 2024+', ar: '٢٠٢١ — ٢٠٢٤+' },
    status: { en: 'Flights concluded (blade damage; active weather outpost)', ar: 'انتهت الرحلات (تلف في الشفرات؛ محطة أرصاد عاملة)' },
    statusType: 'active',
    coordinates: {
      lat: '18.4446° N',
      lon: '77.4509° E',
      latNum: 18.4446,
      lonNum: 77.4509,
      formatted: { en: '18°26′41″ N, 77°27′03″ E', ar: '١٨°٢٦′٤١″ شمالًا، ٧٧°٢٧′٠٣″ شرقًا' },
    },
    nasaSearchQuery: 'Ingenuity Mars Helicopter flight 72 Jezero',
    locationName: { en: 'Jezero Crater, Valinor Hills', ar: 'فوهة جيزيرو، تلال فالينور' },
    missionDuration: { en: 'nearly 3 years (72 flights; planned: 5 flights in 30 days)', ar: 'قرابة ٣ أعوام (٧٢ رحلة؛ المخطط: ٥ رحلات في ٣٠ يومًا)' },
    distanceTraveled: { en: '17.0 km total flight distance (128.8 minutes aloft)', ar: 'مسافة طيران إجمالية ١٧٫٠ كم (١٢٨٫٨ دقيقة في الجو)' },
    image: '',
    schematicType: 'helicopter',
    shortDescription: { en: 'First rotorcraft to achieve powered, controlled aerodynamic flight on another planet. Flew 72 times instead of the planned 5.', ar: 'أول مركبة دوّارة تحقق طيرانًا هوائيًا موجّهًا بمحرك على كوكب آخر. حلّقت ٧٢ مرة بدلًا من ٥ رحلات مخطط لها.' },
    howGotThere: { en: 'Carried on the belly of Perseverance beneath a carbon-composite debris shield. Dropped 10 cm onto Jezero soil, surviving freezing nights on its own batteries.', ar: 'حُمِلت في بطن المركبة بيرسيفيرانس تحت درع حطام من مركّب كربوني، وأُنزلت ١٠ سم على تربة جيزيرو، ونجت من الليالي المتجمدة ببطارياتها.' },
    whatDidItDo: { en: 'Proved rotorcraft flight in air less than 1% of Earth’s density with twin 2,400–2,900 rpm carbon-fiber blades. Scouted safe travel paths and geology targets for Perseverance.', ar: 'أثبتت إمكانية الطيران الدوّار في هواء تقل كثافته عن ١٪ من كثافة هواء الأرض بشفرتين من ألياف الكربون تدوران بسرعة ٢٤٠٠–٢٩٠٠ دورة/دقيقة، واستطلعت مسارات آمنة وأهدافًا جيولوجية لبيرسيفيرانس.' },
    lastContactStory: { en: 'On January 18, 2024, during Flight 72 over featureless sand dunes, Ingenuity executed an emergency hard landing. Navcam images confirmed blade-tip separation. The craft cannot fly again but remains fully operational as a permanent stationary weather observatory.', ar: 'في ١٨ يناير ٢٠٢٤، وخلال الرحلة ٧٢ فوق كثبان رملية متماثلة، نفّذت إنجينويتي هبوطًا اضطراريًا قاسيًا. وأكدت صور Navcam انفصال أطراف الشفرات. ولا تستطيع المركبة الطيران مجددًا لكنها لا تزال تعمل بكامل طاقتها كمحطة أرصاد جوية ثابتة دائمة.' },
    whereIsItNow: { en: 'Ingenuity rests on its four composite legs among the ripple sands of Valinor Hills. Every Martian sunrise it powers on, logging temperatures and winds in non-volatile flash memory for future astronauts.', ar: 'تستقر إنجينويتي على قوائمها المركّبة الأربع بين رمال تلال فالينور المتموجة، وتبدأ العمل عند كل شروق مريخي، مسجّلة درجات الحرارة والرياح في ذاكرة وميضية غير متطايرة من أجل روّاد المستقبل.' },
    source: 'https://www.jpl.nasa.gov/news/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends',
    quote: {
      text: { en: 'The historic journey of Ingenuity has come to end. That remarkable helicopter has flown higher and farther than we ever imagined.', ar: '«انتهت رحلة إنجينويتي التاريخية. لقد حلّقت تلك المروحية الاستثنائية أعلى وأبعد مما تخيّلنا.»' },
      speaker: { en: 'Bill Nelson, NASA Administrator', ar: 'بيل نيلسون، مدير NASA' },
      context: { en: 'NASA HQ Briefing Release 24-009, Jan 25, 2024', ar: 'بيان مقر NASA رقم 24-009، ٢٥ يناير ٢٠٢٤' },
      type: 'team_message',
      typeLabel: { en: 'Official Statement', ar: 'بيان رسمي' },
      sourceUrl: 'https://www.nasa.gov/news-release/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/'
    },
    specs: [
      {
        label: { en: 'Mass', ar: 'الكتلة' },
        value: { en: 'Just 1.8 kg', ar: '١٫٨ كغ فقط' }
      },
      {
        label: { en: 'Rotor Diameter', ar: 'قطر الدوّار' },
        value: { en: '1.2 m (coaxial counter-rotating blades)', ar: '١٫٢ م (شفرتان متعاكستان على محور واحد)' }
      },
      {
        label: { en: 'Rotor Speed', ar: 'سرعة الدوّار' },
        value: { en: 'up to 2,900 rpm', ar: 'حتى ٢٩٠٠ دورة/دقيقة' }
      },
      {
        label: { en: 'Power System', ar: 'نظام الطاقة' },
        value: { en: 'Top-mounted solar array + 6 Sony Li-ion cells', ar: 'مصفوفة شمسية علوية + ٦ خلايا ليثيوم أيون من Sony' }
      },
      {
        label: { en: 'Max Altitude', ar: 'أقصى ارتفاع' },
        value: { en: '24.0 meters above surface', ar: '٢٤٫٠ مترًا فوق السطح' }
      },
    ],
    milestones: [
      {
        date: '19.04.2021',
        title: { en: 'Historic Flight 1', ar: 'الرحلة التاريخية الأولى' },
        description: { en: 'First powered controlled flight on another world (39.1 sec).', ar: 'أول طيران موجّه بمحرك على عالم آخر (٣٩٫١ ثانية).' }
      },
      {
        date: '05.07.2021',
        title: { en: 'Flight 9 Across Dunes', ar: 'الرحلة ٩ عبر الكثبان' },
        description: { en: 'Daring shortcut across the treacherous Séítah sand dunes.', ar: 'اختصار جسور عبر كثبان سيتاح الخطرة.' }
      },
      {
        date: '19.04.2023',
        title: { en: 'Two Years Flying', ar: 'عامان من الطيران' },
        description: { en: '50th milestone flight, scaling 18 meters altitude.', ar: 'الرحلة الخمسون، بارتفاع بلغ ١٨ مترًا.' }
      },
      {
        date: '18.01.2024',
        title: { en: 'Flight 72: Finale', ar: 'الرحلة ٧٢: الختام' },
        description: { en: 'Rotor tip separation upon landing at Valinor Hills.', ar: 'انفصال أطراف الدوّار عند الهبوط في تلال فالينور.' }
      },
    ],
    signalData: {
      sol: 1040,
      frequency: {
        en: 'ZigBee 900 MHz (relayed via Perseverance)',
        ar: 'ZigBee ٩٠٠ ميغاهرتز (عبر المسبار بيرسيفيرانس)',
      },
      lastTelemetry: 'FLIGHT 72 TERMINATION // NAV FILTER DISVERGENCE // ROTOR BLADE DEFORMATION CONFIRMED // STATIONARY LOGGING ACTIVE',
      fadeReason: { en: 'Rotor blade tip separation during Flight 72 touchdown on featureless dunes (confirmed by JPL analysis).', ar: 'انفصل طرف الشفرة أثناء هبوط الرحلة ٧٢ على كثبان متماثلة (مؤكد بتحليل JPL).' },
    }
  },
  {
    id: 'insight',
    name: { en: 'InSight', ar: 'إنسايت' },
    englishName: 'InSight Lander',
    designation: 'Interior Exploration using Seismic Investigations (InSight)',
    destination: 'Mars',
    type: { en: 'Seismic Station', ar: 'محطة زلزالية' },
    launchDate: { en: 'May 5, 2018', ar: '٥ مايو ٢٠١٨' },
    landingDate: { en: 'November 26, 2018', ar: '٢٦ نوفمبر ٢٠١٨' },
    lastContactDate: { en: 'December 15, 2022 (officially declared December 21, 2022)', ar: '١٥ ديسمبر ٢٠٢٢ (الإعلان الرسمي في ٢١ ديسمبر ٢٠٢٢)' },
    activeSpan: { en: '2018 — 2022', ar: '٢٠١٨ — ٢٠٢٢' },
    status: { en: 'Mission complete (dust depletion of solar power)', ar: 'المهمة منتهية (استنزاف الغبار للطاقة الشمسية)' },
    statusType: 'silent',
    coordinates: {
      lat: '4.5024° N',
      lon: '135.6234° E',
      latNum: 4.5024,
      lonNum: 135.6234,
      formatted: { en: '4°30′09″ N, 135°37′24″ E', ar: '٤°٣٠′٠٩″ شمالًا، ١٣٥°٣٧′٢٤″ شرقًا' },
    },
    nasaSearchQuery: 'InSight lander Mars Elysium Planitia SEIS',
    locationName: { en: 'Elysium Planitia', ar: 'سهل إليسيوم' },
    missionDuration: { en: '4 years 19 days (1,440 sols; planned: 1 Mars year / 709 sols)', ar: '٤ أعوام و١٩ يومًا (١٬٤٤٠ يومًا مريخيًا؛ المخطط: سنة مريخية واحدة / ٧٠٩ أيام)' },
    distanceTraveled: { en: '0 km (stationary geophysical station)', ar: '٠ كم (محطة جيوفيزيائية ثابتة)' },
    image: '',
    schematicType: 'station',
    shortDescription: { en: 'First robotic geophysicist on Mars. Logged over 1,300 marsquakes and mapped the core, mantle, and crust structure.', ar: 'أول جيوفيزيائي آلي على المريخ. سجّل أكثر من ١٣٠٠ هزة مريخية ورسم بنية اللب والوشاح والقشرة.' },
    howGotThere: { en: 'Ballistic atmospheric entry, supersonic parachute decelerator, and pulsed descent hydrazine thrusters onto flat Elysium Planitia sands.', ar: 'دخول جوي بالستي، ثم مظلة كبح فوق صوتية، ثم دافعات هيدرازين نابضة للهبوط على رمال سهل إليسيوم المستوية.' },
    whatDidItDo: { en: 'Deployed the ultra-sensitive French SEIS seismometer under a wind and thermal shield. Detected meteorite impacts and a record magnitude 4.7 marsquake, confirming a molten metallic core.', ar: 'نشرت الزلزالي الفرنسي فائق الحساسية SEIS تحت درع للحماية من الرياح والحرارة، ورصدت اصطدامات نيازك وهزة مريخية قياسية بقوة ٤٫٧، ما أكد وجود لب معدني منصهر.' },
    lastContactStory: { en: 'Stationary solar panels could not shed dust. Output dropped from 5,000 Wh/day to under 300 Wh. Sent its final dust-shrouded SEIS photo on Dec 15, 2022 before battery depleted.', ar: 'لم تستطع الألواح الشمسية الثابتة إزالة الغبار، فانخفض الإنتاج من ٥٠٠٠ واط/ساعة يوميًا إلى أقل من ٣٠٠ واط/ساعة. وأرسلت آخر صورة للزلزالي SEIS مغطاة بالغبار في ١٥ ديسمبر ٢٠٢٢ قبل نفاد البطارية.' },
    whereIsItNow: { en: 'InSight sits on Elysium Planitia, nearly camouflaged by ochre dust that blankets its dome and deck.', ar: 'تستقر إنسايت على سهل إليسيوم، شبه متخفية بغبار مغرة يغطي قبتها وسطحها.' },
    source: 'https://science.nasa.gov/mission/insight/',
    quote: {
      text: { en: 'My power is really low, so this may be the last image I can send... Don’t worry about me: my time here has been both productive and serene.', ar: '«طاقتي منخفضة جدًا، وربما تكون هذه آخر صورة أستطيع إرسالها... لا تقلقوا عليّ: كان وقتي هنا مثمرًا وهادئًا.»' },
      speaker: { en: 'Official Mission Account @NASAInSight', ar: 'الحساب الرسمي للبعثة @NASAInSight' },
      context: { en: 'Dec 19, 2022, Twitter/X', ar: '١٩ ديسمبر ٢٠٢٢، تويتر/X' },
      type: 'team_message',
      typeLabel: { en: 'Mission Team Farewell', ar: 'وداع فريق البعثة' },
      sourceUrl: 'https://www.nasa.gov/news-release/nasas-insight-mission-ends-after-four-years-of-groundbreaking-science/'
    },
    specs: [
      {
        label: { en: 'Landed Mass', ar: 'كتلة الهبوط' },
        value: { en: '358 kg', ar: '٣٥٨ كغ' }
      },
      {
        label: { en: 'Solar Wingspan', ar: 'باع الجناحين الشمسيين' },
        value: { en: '6.0 meters (dual UltraFlex circles)', ar: '٦٫٠ أمتار (دائرتا UltraFlex)' }
      },
      {
        label: { en: 'Primary Instrument', ar: 'الأداة الرئيسية' },
        value: { en: 'SEIS ultra-sensitive broad-band seismometer', ar: 'الزلزالي عريض النطاق فائق الحساسية SEIS' }
      },
      {
        label: { en: 'Heat Flow Probe', ar: 'مسبار التدفق الحراري' },
        value: { en: 'HP³ Heat Flow and Physical Properties Package', ar: 'حزمة HP³ للتدفق الحراري والخصائص الفيزيائية' }
      },
      {
        label: { en: 'Events Logged', ar: 'الأحداث المسجلة' },
        value: { en: '1,319 marsquakes', ar: '١٬٣١٩ هزة مريخية' }
      },
    ],
    milestones: [
      {
        date: '26.11.2018',
        title: { en: 'Soft Landing', ar: 'هبوط ناعم' },
        description: { en: 'Flawless touchdown on Elysium Planitia.', ar: 'هبوط خالٍ من العيوب على سهل إليسيوم.' }
      },
      {
        date: '06.04.2019',
        title: { en: 'First Marsquake Sound', ar: 'أول صوت لهزة مريخية' },
        description: { en: 'SEIS captured first subterranean seismic rumble.', ar: 'التقط SEIS أول دمدمة زلزالية تحت السطح.' }
      },
      {
        date: '04.05.2022',
        title: { en: 'Magnitude 4.7 Monster Quake', ar: 'هزة عملاقة بقوة ٤٫٧' },
        description: { en: 'Record subterranean tremor that reverberated for 10 hours.', ar: 'هزة جوفية قياسية استمرت أصداؤها ١٠ ساعات.' }
      },
      {
        date: '15.12.2022',
        title: { en: 'The Final Frame', ar: 'الإطار الأخير' },
        description: { en: 'Final image of dust-draped SEIS dome.', ar: 'الصورة الأخيرة لقبة SEIS المغطاة بالغبار.' }
      },
    ],
    signalData: {
      sol: 1440,
      frequency: 'X-band DTE 8.4 GHz',
      lastTelemetry: 'SOLAR BUS OUTPUT: 285 Wh/sol // BATTERY DEPLETION IMMINENT // CRITICAL VOLTAGE SHUTDOWN',
      fadeReason: { en: 'Engineering consensus: multi-year accumulation of dust on UltraFlex arrays drained reserves below computer boot voltage.', ar: 'إجماع هندسي: أدى تراكم الغبار على مصفوفات UltraFlex على مدى سنوات إلى إنزال الاحتياطي دون جهد إقلاع الحاسوب.' },
    }
  },
  {
    id: 'sojourner',
    name: { en: 'Sojourner', ar: 'سوجورنر' },
    englishName: 'Sojourner (Mars Pathfinder)',
    designation: 'Mars Pathfinder Microrover',
    destination: 'Mars',
    type: { en: 'Rover', ar: 'متجوّل' },
    launchDate: { en: 'December 4, 1996', ar: '٤ ديسمبر ١٩٩٦' },
    landingDate: { en: 'July 4, 1997', ar: '٤ يوليو ١٩٩٧' },
    lastContactDate: { en: 'September 27, 1997', ar: '٢٧ سبتمبر ١٩٩٧' },
    activeSpan: { en: 'July — September 1997', ar: 'يوليو — سبتمبر ١٩٩٧' },
    status: { en: 'Mission complete (lander relay failure)', ar: 'المهمة منتهية (فشل مرحّل مركبة الهبوط)' },
    statusType: 'silent',
    coordinates: {
      lat: '19.33° N',
      lon: '326.45° E',
      latNum: 19.33,
      lonNum: -33.55,
      formatted: { en: '19°20′ N, 33°33′ W', ar: '١٩°٢٠′ شمالًا، ٣٣°٣٣′ غربًا' },
    },
    nasaSearchQuery: 'Sojourner rover Mars Pathfinder Ares Vallis',
    locationName: { en: 'Ares Vallis', ar: 'وادي آريس' },
    missionDuration: { en: '83 days (planned: 7 days)', ar: '٨٣ يومًا (المخطط: ٧ أيام)' },
    distanceTraveled: { en: '100 meters', ar: '١٠٠ متر' },
    image: '',
    schematicType: 'rover',
    shortDescription: { en: 'Humanity’s first wheeled vehicle on Mars. A microwave-sized, 6-wheeled pioneer that launched the planetary rover era.', ar: 'أول مركبة بعجلات للبشرية على المريخ. رائد بحجم فرن الميكروويف بست عجلات أطلق عصر المتجوّلات الكوكبية.' },
    howGotThere: { en: 'Pioneered low-cost Discovery entry: aeroshell, parachute, solid RAD rockets, and bouncing airbag cluster cushioning 15+ impacts.', ar: 'ارتقى بمدخل Discovery منخفض التكلفة: درع جوي، ومظلة، وصواريخ RAD صلبة، ومجموعة وسائد هوائية ماصّة لأكثر من ١٥ ارتطامًا.' },
    whatDidItDo: { en: 'Validated the rocker-bogie suspension system used by all subsequent Mars rovers. Analyzed rocks "Barnacle Bill" and "Yogi", proving ancient mega-floods shaped Ares Vallis.', ar: 'أثبت صلاحية نظام التعليق rocker-bogie المستخدم في كل المتجوّلات المريخية اللاحقة، وحلّل صخرتي «بارناكل بيل» و«يوغي»، مثبتًا أن فيضانات هائلة قديمة شكّلت وادي آريس.' },
    lastContactStory: { en: 'Sojourner was healthy, but relied entirely on the Carl Sagan Memorial Station lander for relay. On Sept 27, 1997, the lander battery died from repeated freeze-thaw cycles. Autonomous programming instructed Sojourner to circle the silent station indefinitely.', ar: 'كان سوجورنر سليمًا لكنه اعتمد كليًا على مركبة الهبوط كارل ساغان لنقل الإشارة. وفي ٢٧ سبتمبر ١٩٩٧ نفدت بطارية المركبة بسبب دورات تجمّد وذوبان متكررة، فأمرت برمجياته الذاتية بالدوران حول المحطة الصامتة بلا نهاية.' },
    whereIsItNow: { en: 'Sojourner rests on the rocky plain of Ares Vallis near the darkened solar panels of the Sagan Station.', ar: 'يستقر سوجورنر على سهل وادي آريس الصخري قرب الألواح الشمسية المعتمة لمحطة ساغان.' },
    source: 'https://science.nasa.gov/mission/mars-pathfinder-sojourner/',
    quote: {
      text: { en: 'This small step by a tiny rover proved to be a giant leap for Martian exploration.', ar: '«هذه الخطوة الصغيرة من متجوّل صغير كانت قفزة عملاقة في استكشاف المريخ.»' },
      speaker: { en: 'NASA Mars Pathfinder Mission Team', ar: 'فريق بعثة Mars Pathfinder التابعة لـ NASA' },
      context: { en: 'Ares Vallis, Mars', ar: 'وادي آريس، المريخ' },
      type: 'team_message',
      typeLabel: { en: 'Team Message', ar: 'رسالة الفريق' },
      sourceUrl: 'https://science.nasa.gov/mission/mars-pathfinder-sojourner/'
    },
    specs: [
      {
        label: { en: 'Mass', ar: 'الكتلة' },
        value: { en: '11.5 kg (microwave-sized)', ar: '١١٫٥ كغ (بحجم فرن الميكروويف)' }
      },
      {
        label: { en: 'Power', ar: 'الطاقة' },
        value: { en: 'GaAs solar panel (16 W) + lithium battery', ar: 'لوح شمسي GaAs بقدرة ١٦ واط + بطارية ليثيوم' }
      },
      {
        label: { en: 'Wheelbase', ar: 'قاعدة العجلات' },
        value: { en: '6 x 13 cm wheels, Rocker-Bogie suspension', ar: '٦ عجلات بقطر ١٣ سم، تعليق Rocker-Bogie' }
      },
      {
        label: { en: 'Instruments', ar: 'الأدوات' },
        value: { en: 'APXS spectrometer, 3 monochrome/color cameras', ar: 'مطياف APXS و٣ كاميرات أحادية اللون/ملونة' }
      },
      {
        label: { en: 'CPU', ar: 'المعالج' },
        value: { en: '8-bit Intel 80C85 at 2 MHz', ar: 'معالج Intel 80C85 ثماني البتات بسرعة ٢ ميغاهرتز' }
      },
    ],
    milestones: [
      {
        date: '04.07.1997',
        title: { en: 'Independence Day Landing', ar: 'الهبوط في يوم الاستقلال' },
        description: { en: 'Historic airbag touchdown in Ares Vallis.', ar: 'هبوط تاريخي بالوسائد الهوائية في وادي آريس.' }
      },
      {
        date: '05.07.1997',
        title: { en: 'Ramping onto Martian Soil', ar: 'الصعود إلى التربة المريخية' },
        description: { en: 'First tire tracks imprinted on Martian soil.', ar: 'أول آثار إطارات تُطبع على تربة المريخ.' }
      },
      {
        date: '27.09.1997',
        title: { en: 'Signal Loss', ar: 'فقدان الإشارة' },
        description: { en: 'Lander base battery failure ended communication.', ar: 'فشل بطارية قاعدة الهبوط أنهى الاتصال.' }
      },
    ],
    signalData: {
      sol: 83,
      frequency: 'UHF Radio to Sagan Memorial Station',
      lastTelemetry: 'LINK INTERRUPTED // BASE STATION POWER TERMINATED // CONTINGENCY HOLD EXECUTED',
      fadeReason: { en: 'Mission engineers concluded lander relay failed due to irreversible primary battery degradation.', ar: 'خلص مهندسو البعثة إلى أن مرحّل مركبة الهبوط فشل بسبب تدهور لا رجعة فيه في البطارية الأولية.' },
    }
  },
  {
    id: 'phoenix',
    name: { en: 'Phoenix', ar: 'فينيكس' },
    englishName: 'Phoenix Mars Lander',
    destination: 'Mars',
    designation: 'Phoenix Mars Scout',
    type: { en: 'Lander', ar: 'مركبة هبوط' },
    launchDate: { en: 'August 4, 2007', ar: '٤ أغسطس ٢٠٠٧' },
    landingDate: { en: 'May 25, 2008', ar: '٢٥ مايو ٢٠٠٨' },
    lastContactDate: { en: 'November 2, 2008', ar: '٢ نوفمبر ٢٠٠٨' },
    activeSpan: { en: 'May — November 2008', ar: 'مايو — نوفمبر ٢٠٠٨' },
    status: { en: 'Mission complete (crushed by polar ice)', ar: 'المهمة منتهية (سحقتها الجليدية القطبية)' },
    statusType: 'silent',
    coordinates: {
      lat: '68.2188° N',
      lon: '234.2508° E',
      latNum: 68.2188,
      lonNum: -125.75,
      formatted: { en: '68°13′08″ N, 125°44′57″ W', ar: '٦٨°١٣′٠٨″ شمالًا، ١٢٥°٤٤′٥٧″ غربًا' },
    },
    nasaSearchQuery: 'Phoenix Mars Lander Vastitas Borealis ice',
    locationName: { en: 'Vastitas Borealis, Northern Arctic Plains', ar: 'فاستيتاس بورياليس، السهول القطبية الشمالية' },
    missionDuration: { en: '161 days (planned: 90 days)', ar: '١٦١ يومًا (المخطط: ٩٠ يومًا)' },
    distanceTraveled: { en: '0 km (stationary arctic lander)', ar: '٠ كم (مركبة هبوط قطبية ثابتة)' },
    image: '',
    schematicType: 'lander',
    shortDescription: { en: 'First lander to touch down in the Martian arctic plains and physically scrape water ice with its robotic arm.', ar: 'أول مركبة هبوط تبلغ السهول القطبية المريخية وتحفر جليد الماء فعليًا بذراعها الآلية.' },
    howGotThere: { en: 'Descended using pulsed Aerojet descent thrusters. First successful Mars Scout surface mission.', ar: 'نزلت باستخدام دافعات هبوط Aerojet النابضة، وكانت أول بعثة Mars Scout ناجحة على السطح.' },
    whatDidItDo: { en: 'Trench digging revealed white subsurface water-ice chunks that sublimated over 4 days. Discovered perchlorates and detected snowfall from cirrus clouds using LIDAR.', ar: 'كشف حفر الخنادق عن كتل بيضاء من جليد الماء تحت السطح تبخّرت خلال ٤ أيام، واكتشفت البيركلورات ورصدت تساقط ثلوج من سحب سمحاقية بواسطة LIDAR.' },
    lastContactStory: { en: 'As arctic winter closed in, sunlight vanished, temperatures plummeted below -120°C, and dry ice entombed the lander. Final signal was received Nov 2, 2008. MRO HiRISE later photographed solar panels crushed by hundreds of kilograms of solid CO₂ ice.', ar: 'مع اقتراب الشتاء القطبي غاب ضوء الشمس وهبطت الحرارة دون -١٢٠°م، فطمر الجليد الجاف المركبة. واستُلمت الإشارة الأخيرة في ٢ نوفمبر ٢٠٠٨، ثم صوّرت HiRISE على MRO ألواحًا شمسية سحقتها مئات الكيلوجرامات من جليد ثاني أكسيد الكربون الصلب.' },
    whereIsItNow: { en: 'Phoenix is encased in the permafrost of Vastitas Borealis, buried beneath a meter-thick slab of dry ice each Martian winter.', ar: 'فينيكس مطمورة في التربة الصقيعية لفاستيتاس بورياليس، تحت طبقة جليد جاف يبلغ سمكها مترًا كل شتاء مريخي.' },
    source: 'https://www.jpl.nasa.gov/missions/phoenix-mars-lander',
    quote: {
      text: { en: 'We have touched and tasted the water of Mars.', ar: '«لقد لمسنا مياه المريخ وذقناها.»' },
      speaker: { en: 'Peter Smith, Phoenix Principal Investigator', ar: 'بيتر سميث، الباحث الرئيسي لبعثة فينيكس' },
      context: { en: 'Mars North Pole', ar: 'القطب الشمالي للمريخ' },
      type: 'team_message',
      typeLabel: { en: 'Mission Team', ar: 'فريق البعثة' },
      sourceUrl: 'https://www.jpl.nasa.gov/missions/phoenix-mars-lander'
    },
    specs: [
      {
        label: { en: 'Mass', ar: 'الكتلة' },
        value: { en: '350 kg', ar: '٣٥٠ كغ' }
      },
      {
        label: { en: 'Robotic Arm Length', ar: 'طول الذراع الآلية' },
        value: { en: '2.35 meters with scraper', ar: '٢٫٣٥ متر مع أداة الحتّ' }
      },
      {
        label: { en: 'Ovens / Chemistry', ar: 'الأفران / الكيمياء' },
        value: { en: 'TEGA thermal & evolved gas analyzer', ar: 'محلّل TEGA الحراري للغازات المنبعثة' }
      },
      {
        label: { en: 'Microscopy', ar: 'المجهرية' },
        value: { en: 'Optical & atomic-force microscopes', ar: 'مجاهر بصرية ومجهر قوة ذرية' }
      },
      {
        label: { en: 'Cold Limit', ar: 'حدّ البرودة' },
        value: { en: 'Engineered down to -125°C', ar: 'مصممة للعمل حتى -١٢٥°م' }
      },
    ],
    milestones: [
      {
        date: '25.05.2008',
        title: { en: 'Arctic Touchdown', ar: 'هبوط قطبي' },
        description: { en: 'First soft landing in the Martian polar circle.', ar: 'أول هبوط ناعم داخل الدائرة القطبية المريخية.' }
      },
      {
        date: '19.06.2008',
        title: { en: 'Ice Sublimation', ar: 'تسامي الجليد' },
        description: { en: 'White trench crumbs vaporized under sunlight — water ice confirmed.', ar: 'تبخّرت الفتات البيضاء في الخندق تحت الشمس، فتأكد وجود جليد الماء.' }
      },
      {
        date: '02.11.2008',
        title: { en: 'Polar Night Falls', ar: 'حلول الليل القطبي' },
        description: { en: 'Final transmission before batteries froze solid.', ar: 'آخر إرسال قبل تجمّد البطاريات.' }
      },
    ],
    signalData: {
      sol: 161,
      frequency: 'UHF Relay via Mars Odyssey',
      lastTelemetry: 'BATTERY CHARGE: 0.1% // SOLAR FLUX: 0 W // HEATER POWER DEGRADED // LINK TERMINATED',
      fadeReason: { en: 'Polar night and mechanical collapse of solar panels under heavy dry-ice snow (confirmed by MRO HiRISE).', ar: 'الليل القطبي والانهيار الميكانيكي للألواح الشمسية تحت ثلوج جليد جاف ثقيلة (مؤكد بصور MRO HiRISE).' },
    }
  },
  {
    id: 'curiosity',
    name: { en: 'Curiosity', ar: 'كيوريوسيتي' },
    englishName: 'Curiosity (MSL)',
    designation: 'Mars Science Laboratory (MSL)',
    destination: 'Mars',
    type: { en: 'Rover', ar: 'متجوّل' },
    launchDate: { en: 'November 26, 2011', ar: '٢٦ نوفمبر ٢٠١١' },
    landingDate: { en: 'August 6, 2012', ar: '٦ أغسطس ٢٠١٢' },
    activeSpan: { en: '2012 — present', ar: '٢٠١٢ — حتى الآن' },
    status: { en: 'Active (exploring Mount Sharp)', ar: 'عامل (يستكشف جبل شارب)' },
    statusType: 'active',
    coordinates: {
      lat: '4.5895° S',
      lon: '137.4417° E',
      latNum: -4.5895,
      lonNum: 137.4417,
      formatted: { en: '4°35′22″ S, 137°26′30″ E', ar: '٤°٣٥′٢٢″ جنوبًا، ١٣٧°٢٦′٣٠″ شرقًا' },
    },
    nasaSearchQuery: 'Curiosity rover Mars Gale crater Mount Sharp',
    locationName: { en: 'Gale Crater, Mount Sharp slope', ar: 'فوهة غيل، منحدر جبل شارب' },
    missionDuration: { en: '13+ years of operations (4,400+ sols; ongoing)', ar: 'أكثر من ١٣ عامًا من التشغيل (أكثر من ٤٤٠٠ يوم مريخي؛ مستمر)' },
    distanceTraveled: { en: '32+ km across Mount Sharp', ar: 'أكثر من ٣٢ كم عبر جبل شارب' },
    image: '',
    schematicType: 'rover',
    shortDescription: { en: 'Nuclear-powered SUV-sized robotic lab that discovered ancient organic molecules and confirmed past habitable lake systems.', ar: 'مختبر آلي بحجم سيارة دفع رباعي يعمل بالطاقة النووية، اكتشف جزيئات عضوية قديمة وأكد وجود أنظمة بحيرات صالحة للحياة في الماضي.' },
    howGotThere: { en: 'Pioneered the Sky Crane descent system: a rocket platform hovered 20m above the Martian surface and lowered the rover on nylon bridles.', ar: 'ارتقى بنظام الهبوط «الرافعة السماوية»: منصة صاروخية حامت ٢٠ مترًا فوق السطح وأنزلت المتجوّل بحبال نايلون.' },
    whatDidItDo: { en: 'Drilled mudstones in Yellowknife Bay, discovering carbon rings, sulfur, nitrogen, oxygen, phosphorus — prime ingredients for life, plus seasonal methane cycles.', ar: 'حفر صخور طينية في خليج يلو نايف فوجد حلقات كربونية وكبريتًا ونيتروجينًا وأكسجينًا وفوسفورًا، وهي مكوّنات أساسية للحياة، إضافة إلى دورات موسمية للميثان.' },
    lastContactStory: { en: 'Active and communicating! Powered by an MMRTG plutonium generator, it defies dust storms while steadily climbing Mount Sharp despite wheel punctures.', ar: 'لا يزال عاملًا ويتواصل! يعمل بمولّد بلوتونيوم MMRTG، ويتحدى العواصف الغبارية صاعدًا جبل شارب بثبات رغم ثقوب العجلات.' },
    whereIsItNow: { en: 'Ascending the sulfate-bearing unit of Mount Sharp, downlinking hundreds of images and ChemCam spectra every sol.', ar: 'يصعد وحدة الكبريتات في جبل شارب، منزلًا كل يوم مريخي مئات الصور وأطياف ChemCam.' },
    source: 'https://science.nasa.gov/mission/msl-curiosity/',
    specs: [
      {
        label: { en: 'Mass', ar: 'الكتلة' },
        value: { en: '899 kg', ar: '٨٩٩ كغ' }
      },
      {
        label: { en: 'Power Source', ar: 'مصدر الطاقة' },
        value: { en: 'MMRTG plutonium-238 generator (110 W electric)', ar: 'مولّد MMRTG بلوتونيوم-٢٣٨ (١١٠ واط كهربائي)' }
      },
      {
        label: { en: 'Key Science Tool', ar: 'أداة العلم الرئيسية' },
        value: { en: 'ChemCam laser (vaporizes rock at 7m range)', ar: 'ليزر ChemCam (يبخّر الصخر من مسافة ٧ أمتار)' }
      },
      {
        label: { en: 'Internal Lab', ar: 'المختبر الداخلي' },
        value: { en: 'SAM sample analyzer + CheMin X-ray diffraction', ar: 'محلّل العيّنات SAM + حيود الأشعة السينية CheMin' }
      },
    ],
    milestones: [
      {
        date: '06.08.2012',
        title: { en: 'Sky Crane Touchdown', ar: 'هبوط الرافعة السماوية' },
        description: { en: 'Flawless lowering onto Gale Crater floor.', ar: 'إنزال خالٍ من العيوب على أرض فوهة غيل.' }
      },
      {
        date: '2013',
        title: { en: 'Ancient Freshwater Lake', ar: 'بحيرة مياه عذبة قديمة' },
        description: { en: 'Yellowknife Bay confirmed as habitable ancient lakebed.', ar: 'أُكد أن خليج يلو نايف قاع بحيرة قديمة صالح للحياة.' }
      },
      {
        date: '2018',
        title: { en: 'Complex Organics Found', ar: 'اكتشاف جزيئات عضوية معقدة' },
        description: { en: 'Preserved organic sulfur-carbon molecules identified.', ar: 'تحديد جزيئات كبريت-كربون عضوية محفوظة.' }
      },
    ],
  },
  {
    id: 'perseverance',
    name: { en: 'Perseverance', ar: 'بيرسيفيرانس' },
    englishName: 'Perseverance (Mars 2020)',
    designation: 'Mars 2020 Rover (Percy)',
    destination: 'Mars',
    type: { en: 'Rover', ar: 'متجوّل' },
    launchDate: { en: 'July 30, 2020', ar: '٣٠ يوليو ٢٠٢٠' },
    landingDate: { en: 'February 18, 2021', ar: '١٨ فبراير ٢٠٢١' },
    activeSpan: { en: '2021 — present', ar: '٢٠٢١ — حتى الآن' },
    status: { en: 'Active (caching delta cores)', ar: 'عامل (يجمع لباب الدلتا)' },
    statusType: 'active',
    coordinates: {
      lat: '18.4447° N',
      lon: '77.4508° E',
      latNum: 18.4447,
      lonNum: 77.4508,
      formatted: { en: '18°26′41″ N, 77°27′03″ E', ar: '١٨°٢٦′٤١″ شمالًا، ٧٧°٢٧′٠٣″ شرقًا' },
    },
    nasaSearchQuery: 'Perseverance rover Mars Jezero crater samples',
    locationName: { en: 'Jezero Crater, river delta deposit', ar: 'فوهة جيزيرو، رواسب دلتا نهرية' },
    missionDuration: { en: '5+ years of operations (ongoing)', ar: 'أكثر من ٥ أعوام من التشغيل (مستمر)' },
    distanceTraveled: { en: '29+ km across Jezero floor', ar: 'أكثر من ٢٩ كم عبر أرض جيزيرو' },
    image: '',
    schematicType: 'rover',
    shortDescription: { en: 'NASA’s flagship astrobiology rover caching drill cores in sealed titanium tubes for future Mars Sample Return.', ar: 'متجوّل NASA الرائد في علم الأحياء الفلكي، يجمع لباب حفر في أنابيب تيتانيوم محكمة من أجل إعادة عيّنات المريخ مستقبلًا.' },
    howGotThere: { en: 'Landed via Terrain Relative Navigation (TRN) Sky Crane, scanning surface hazards in real-time to touch down safely.', ar: 'هبط بنظام الرافعة السماوية مع الملاحة النسبية للتضاريس (TRN)، ماسحًا المخاطر السطحية لحظيًا ليهبط بأمان.' },
    whatDidItDo: { en: 'Cached 20+ titanium sample tubes and dropped the Three Forks depot. Extracted 122g of breathable oxygen from CO₂ atmosphere using MOXIE.', ar: 'جمع أكثر من ٢٠ أنبوب عيّنات تيتانيوم وأنزل مستودع Three Forks، واستخرج ١٢٢ غرامًا من الأكسجين القابل للتنفس من غلاف CO₂ بواسطة MOXIE.' },
    lastContactStory: { en: 'Active and flourishing, exploring the rim crests and river delta deposits of Jezero.', ar: 'لا يزال عاملًا ونشطًا، يستكشف حواف الفوهة ورواسب دلتا النهر في جيزيرو.' },
    whereIsItNow: { en: 'Climbing toward the outer rim of Jezero Crater, returning ultra-high-resolution soundscapes and color panoramas.', ar: 'يصعد نحو الحافة الخارجية لفوهة جيزيرو، مرسلًا مشاهد صوتية فائقة الدقة وبانورامات ملونة.' },
    source: 'https://science.nasa.gov/mission/mars-2020-perseverance/',
    specs: [
      {
        label: { en: 'Mass', ar: 'الكتلة' },
        value: { en: '1,025 kg (heaviest rover ever flown)', ar: '١٬٠٢٥ كغ (أثقل متجوّل أُطلق إلى الفضاء)' }
      },
      {
        label: { en: 'Helicopter Scout', ar: 'المروحية الاستطلاعية' },
        value: { en: 'Carried Ingenuity scout drone', ar: 'حملت الطائرة الاستطلاعية إنجينويتي' }
      },
      {
        label: { en: 'Oxygen Generator', ar: 'مولّد الأكسجين' },
        value: { en: 'MOXIE in-situ oxygen electrolysis', ar: 'تحليل كهربائي للأكسجين في الموقع MOXIE' }
      },
      {
        label: { en: 'Audio Sensors', ar: 'مجسّات الصوت' },
        value: { en: 'Dual microphones (recorded first true Mars sounds)', ar: 'ميكروفونان (سجّلا أول أصوات مريخية حقيقية)' }
      },
    ],
    milestones: [
      {
        date: '18.02.2021',
        title: { en: 'Jezero Touchdown', ar: 'الهبوط في جيزيرو' },
        description: { en: 'High-precision landing at Jezero Crater.', ar: 'هبوط عالي الدقة في فوهة جيزيرو.' }
      },
      {
        date: '20.04.2021',
        title: { en: 'First Oxygen Produced', ar: 'إنتاج أول أكسجين' },
        description: { en: 'MOXIE generated 5.4 grams of breathable O₂.', ar: 'ولّد MOXIE ٥٫٤ غرام من الأكسجين القابل للتنفس.' }
      },
      {
        date: '2023',
        title: { en: 'Three Forks Sample Depot', ar: 'مستودع عيّنات Three Forks' },
        description: { en: '10 duplicate sample tubes deposited for Mars Sample Return.', ar: 'إيداع ١٠ أنابيب عيّنات مكررة لإعادة عيّنات المريخ.' }
      },
    ],
  },
  {
    id: 'viking-1',
    name: { en: 'Viking 1 Lander', ar: 'مركبة الهبوط فايكنغ ١' },
    englishName: 'Viking 1 Lander',
    designation: 'Viking 1 Lander (Thomas Mutch Memorial Station)',
    destination: 'Mars',
    type: { en: 'Stationary Lander', ar: 'مركبة هبوط ثابتة' },
    launchDate: { en: 'August 20, 1975', ar: '٢٠ أغسطس ١٩٧٥' },
    landingDate: { en: 'July 20, 1976', ar: '٢٠ يوليو ١٩٧٦' },
    lastContactDate: { en: 'November 11, 1982', ar: '١١ نوفمبر ١٩٨٢' },
    activeSpan: { en: '1976 — 1982', ar: '١٩٧٦ — ١٩٨٢' },
    status: { en: 'Mission complete (uplink antenna table overwrite)', ar: 'المهمة منتهية (استُبدلت جدول توجيه هوائي التحميل)' },
    statusType: 'complete',
    coordinates: {
      lat: '22.48° N',
      lon: '47.95° W',
      latNum: 22.48,
      lonNum: -47.95,
      formatted: { en: '22°28′48″ N, 47°58′12″ W', ar: '٢٢°٢٨′٤٨″ شمالًا، ٤٧°٥٨′١٢″ غربًا' },
    },
    nasaSearchQuery: 'Viking 1 lander Chryse Planitia Mars',
    orbitalSearchQuery: 'Viking 1 Chryse Planitia lander HiRISE MRO',
    locationName: { en: 'Chryse Planitia (Plains of Gold), Thomas Mutch Memorial Station', ar: 'سهل كرايسي (سهل الذهب)، محطة توماس موتش التذكارية' },
    missionDuration: { en: '6 years 3 months 22 days (2,245 sols; planned: 90 sols)', ar: '٦ أعوام و٣ أشهر و٢٢ يومًا (٢٬٢٤٥ يومًا مريخيًا؛ المخطط: ٩٠ يومًا)' },
    distanceTraveled: { en: '0 km (stationary surface lander)', ar: '٠ كم (مركبة هبوط ثابتة على السطح)' },
    image: '',
    schematicType: 'lander',
    shortDescription: { en: 'First spacecraft to successfully operate long-term on the surface of Mars, transmitting the first high-resolution color panoramas and conducting the first in-situ search for organic biosignatures.', ar: 'أول مركبة تعمل بنجاح طويل الأمد على سطح المريخ، بثّت أول بانورامات ملونة عالية الدقة وأجرت أول بحث ميداني عن بصمات حيوية عضوية.' },
    howGotThere: { en: 'Launched via a Titan IIIE / Centaur rocket. After entering Mars orbit in June 1976, the orbiter mapped the surface to certify a safe touchdown site. On July 20, 1976, the lander separated, utilized an aeroshell and parachute, and completed terminal descent using three throttleable monopropellant hydrazine engines.', ar: 'أُطلقت على صاروخ Titan IIIE / Centaur. وبعد دخولها مدار المريخ في يونيو ١٩٧٦ رسمت خريطة السطح لتحديد موقع هبوط آمن. وفي ٢٠ يوليو ١٩٧٦ انفصلت المركبة واستخدمت درعًا جويًا ومظلة ثم أكملت النزول النهائي بثلاثة محركات هيدرازين أحادية الدفع قابلة للخنق.' },
    whatDidItDo: { en: 'Transmitted the very first panoramic image from the surface of Mars within minutes of landing. Its robotic arm scooped surface samples into three biological laboratories and a GCMS spectrometer. The station monitored temperature, wind, and atmospheric pressure for over six years, providing humanity’s first multi-year Martian weather record.', ar: 'بثّت أول صورة بانورامية من سطح المريخ في غضون دقائق من الهبوط. وجرفت ذراعها الآلية عيّنات إلى ثلاثة مختبرات حيوية ومطياف GCMS، ورصدت المحطة الحرارة والرياح والضغط الجوي أكثر من ست سنوات، مقدمة أول سجل طقس مريخي متعدد السنوات للبشرية.' },
    lastContactStory: { en: 'On November 11, 1982, ground controllers transmitted an uplink software patch intended to upgrade battery management. An inadvertent memory address overlap overwrote the high-gain antenna pointing tables. The antenna drifted away from Earth alignment, permanently breaking the communications link despite recovery campaigns lasting until May 1983.', ar: 'في ١١ نوفمبر ١٩٨٢ أرسل مراقبو الأرض تصحيحًا برمجيًا لتحديث إدارة البطارية، فتداخل عنوان ذاكرة غير مقصود مع جداول توجيه الهوائي عالي الكسب. وانحرف الهوائي عن محاذاة الأرض فانقطع الاتصال نهائيًا رغم حملات الاستعادة التي استمرت حتى مايو ١٩٨٣.' },
    whereIsItNow: { en: 'Viking 1 Lander rests among wind-carved drifts in Chryse Planitia. In 1984, NASA designated the site the Thomas A. Mutch Memorial Station in tribute to the Viking imaging team leader. Mars Reconnaissance Orbiter’s HiRISE camera captured clear orbital imagery of the lander and its backshell in 2006.', ar: 'تستقر مركبة فايكنغ ١ بين كثبان نحتتها الرياح في سهل كرايسي. وفي ١٩٨٤ أطلقت NASA على الموقع اسم محطة توماس أ. موتش التذكارية تكريمًا لقائد فريق تصوير فايكنغ، والتقطت كاميرا HiRISE على مسبار Mars Reconnaissance Orbiter صورًا مدارية واضحة للمركبة وغطائها الخلفي عام ٢٠٠٦.' },
    source: 'https://science.nasa.gov/mission/viking-1/',
    quote: {
      text: { en: 'This is not just a landing on another world — it is our first permanent foothold in the deep cosmos.', ar: '«هذا ليس مجرد هبوط على عالم آخر، بل هو أول موطئ دائم لنا في الكون السحيق.»' },
      speaker: { en: 'James S. Martin Jr. (Viking Project Manager, NASA Langley)', ar: 'جيمس س. مارتن الابن (مدير مشروع فايكنغ، NASA لانغلي)' },
      context: { en: 'July 20, 1976, NASA JPL landing press conference', ar: '٢٠ يوليو ١٩٧٦، مؤتمر صحفي للهبوط في NASA JPL' },
      type: 'team_message',
      typeLabel: { en: 'Mission statement', ar: 'بيان المهمة' },
      sourceUrl: 'https://history.nasa.gov/SP-4212/ch11-5.htm',
    },
    specs: [
      {
        label: { en: 'Landed Mass', ar: 'كتلة الهبوط' },
        value: { en: '657 kg (572 kg dry mass on surface)', ar: '٦٥٧ كغ (٦٧٢ كغ كتلة جافة على السطح)' },
      },
      {
        label: { en: 'Power Source', ar: 'مصدر الطاقة' },
        value: { en: 'Two SNAP-19 RTGs (Plutonium-238, ~70 W electrical)', ar: 'مولّدا SNAP-19 RTG (بلوتونيوم-٢٣٨، نحو ٧٠ واط كهربائي)' },
      },
      {
        label: { en: 'Payload', ar: 'الحمولة' },
        value: { en: 'Dual facsimile cameras, GCMS, biology experiments (GEX, PR, LR), meteorology boom, X-ray fluorescence', ar: 'كاميرا فاكسيميل مزدوجة، وGCMS، وتجارب حيوية (GEX وPR وLR)، وذراع أرصاد جوية، وتألق بالأشعة السينية' },
      },
      {
        label: { en: 'Robotic Arm Reach', ar: 'مدى الذراع الآلية' },
        value: { en: '3.0 meters with trenching scoop and backhoe sieve', ar: '٣٫٠ أمتار مع مغرفة الحفر ومنخل الحفّار' },
      },
      {
        label: { en: 'Communications', ar: 'الاتصالات' },
        value: { en: 'Direct-to-Earth S-band HGA + UHF relay to Viking Orbiter', ar: 'هوائي عالي الكسب S-band مباشر إلى الأرض + مرحّل UHF إلى مسبار فايكنغ المداري' },
      },
    ],
    milestones: [
      {
        date: '20.08.1975',
        title: { en: 'Launch from Cape Canaveral', ar: 'الإطلاق من كيب كانافيرال' },
        description: { en: 'Launched on Titan IIIE / Centaur towards Mars.', ar: 'أُطلقت على Titan IIIE / Centaur نحو المريخ.' },
      },
      {
        date: '20.07.1976',
        title: { en: 'Chryse Planitia Touchdown', ar: 'الهبوط في سهل كرايسي' },
        description: { en: 'First successful soft landing by an American spacecraft on Mars.', ar: 'أول هبوط ناعم ناجح لمركبة أمريكية على المريخ.' },
      },
      {
        date: '28.07.1976',
        title: { en: 'First Soil Sampling', ar: 'أول أخذ عيّنات تربة' },
        description: { en: 'Surface sampler dug the first trench, delivering regolith into internal biology incubators.', ar: 'حفرت أداة أخذ العيّنات أول خندق، وأوصلت التربة إلى حاضنات حيوية داخلية.' },
      },
      {
        date: '11.11.1982',
        title: { en: 'Loss of Signal', ar: 'فقدان الإشارة' },
        description: { en: 'An antenna pointing command error severed communications forever.', ar: 'خطأ في أمر توجيه الهوائي قطع الاتصالات نهائيًا.' },
      },
    ],
    signalData: {
      sol: 2245,
      frequency: '2295.0 MHz (S-band)',
      lastTelemetry: 'CARRIER DETECTED // HGA STEERING REGISTERS OVERWRITTEN // AZIMUTH ANGLE DRIFT // SIGNAL DROP TO NOISE FLOOR',
      fadeReason: { en: 'Accidental software overwrite of High Gain Antenna pointing memory coordinates during a battery patch upload, causing beam misalignment with Earth.', ar: 'كتابة برمجية عرضية فوق إحداثيات ذاكرة توجيه الهوائي عالي الكسب أثناء تحميل تصحيح للبطارية، ما سبب انحراف الحزمة عن الأرض.' },
      sourceUrl: 'https://science.nasa.gov/mission/viking-1/',
    },
  },
  {
    id: 'viking-2',
    name: { en: 'Viking 2 Lander', ar: 'مركبة الهبوط فايكنغ ٢' },
    englishName: 'Viking 2 Lander',
    designation: 'Viking 2 Lander (Viking-B)',
    destination: 'Mars',
    type: { en: 'Stationary Lander', ar: 'مركبة هبوط ثابتة' },
    launchDate: { en: 'September 9, 1975', ar: '٩ سبتمبر ١٩٧٥' },
    landingDate: { en: 'September 3, 1976', ar: '٣ سبتمبر ١٩٧٦' },
    lastContactDate: { en: 'April 11, 1980', ar: '١١ أبريل ١٩٨٠' },
    activeSpan: { en: '1976 — 1980', ar: '١٩٧٦ — ١٩٨٠' },
    status: { en: 'Mission complete (battery failure)', ar: 'المهمة منتهية (فشل البطارية)' },
    statusType: 'complete',
    coordinates: {
      lat: '47.97° N',
      lon: '134.28° E',
      latNum: 47.97,
      lonNum: 134.28,
      formatted: { en: '47°58′12″ N, 134°16′48″ E', ar: '٤٧°٥٨′١٢″ شمالًا، ١٣٤°١٦′٤٨″ شرقًا' },
    },
    nasaSearchQuery: 'Viking 2 lander Utopia Planitia Mars',
    orbitalSearchQuery: 'Viking 2 Utopia Planitia lander HiRISE',
    locationName: { en: 'Utopia Planitia', ar: 'يوتوبيا بلانيتيا' },
    missionDuration: { en: '3 years 7 months 8 days (1,281 sols; planned: 90 sols)', ar: '٣ أعوام و٧ أشهر و٨ أيام (١٬٢٨١ يومًا مريخيًا؛ المخطط: ٩٠ يومًا)' },
    distanceTraveled: { en: '0 km (stationary surface lander)', ar: '٠ كم (مركبة هبوط ثابتة على السطح)' },
    image: '',
    schematicType: 'lander',
    shortDescription: { en: 'The twin Viking probe landing at high northern latitudes in Utopia Planitia. Its surface seismometer recorded the only confirmed Martian quake of the 20th century and captured seasonal water-ice frost mantling boulders.', ar: 'التوأم الآخر لفايكنغ هبط في خطوط العرض الشمالية العالية في يوتوبيا بلانيتيا. سجّل زلزاليه الوحيد المؤكد للهزة المريخية في القرن العشرين، وصوّر صقيعًا موسميًا من جليد الماء يغطي الصخور.' },
    howGotThere: { en: 'Launched atop a Titan IIIE / Centaur rocket. After orbital insertion in August 1976, it separated on September 3, 1976. The lander touched down safely in Utopia Planitia; one of its footpads rested on a rock, tilting the science deck by 8.2 degrees.', ar: 'أُطلقت على صاروخ Titan IIIE / Centaur. وبعد الدخول المداري في أغسطس ١٩٧٦ انفصلت في ٣ سبتمبر ١٩٧٦ وهبطت بأمان في يوتوبيا بلانيتيا، لكن إحدى وسائدها استقرت على صخرة فأمالت منصة العلوم ٨٫٢ درجة.' },
    whatDidItDo: { en: 'While Viking 1’s seismometer failed to uncage, Viking 2’s seismometer deployed successfully and registered a genuine Martian seismic event on Sol 80. Transmitted 16,000 images, documented seasonal thin sheets of water frost, and proved abundant permafrost in the northern lowlands.', ar: 'بينما تعذّر تحرير زلزالي فايكنغ ١، نُشر زلزالي فايكنغ ٢ بنجاح وسجّل حدثًا زلزاليًا مريخيًا حقيقيًا في اليوم ٨٠. بثّت المركبة ١٦ ألف صورة، ووثّقت طبقات رقيقة موسمية من صقيع الماء، وأثبتت وفرة التربة الصقيعية في السهول الشمالية.' },
    lastContactStory: { en: 'By the spring of 1980, the lander’s nickel-cadmium batteries degraded following years of extreme diurnal thermal cycling. On April 11, 1980, the station transmitted its final telemetry packet and permanently exhausted its power storage.', ar: 'بحلول ربيع ١٩٨٠ تدهورت بطاريات النيكل-كادميوم بعد سنوات من الدورات الحرارية اليومية القاسية. وفي ١١ أبريل ١٩٨٠ بثّت المحطة آخر حزمة قياسات ونفد مخزون طاقتها نهائيًا.' },
    whereIsItNow: { en: 'Viking 2 rests in Utopia Planitia amidst a field of pitted boulders. In 2007, NASA’s Mars Reconnaissance Orbiter HiRISE camera resolved the lander, its parachute, and heat shield on the Martian surface.', ar: 'تستقر فايكنغ ٢ في يوتوبيا بلانيتيا وسط حقل من الصخور المنقّرة. وفي ٢٠٠٧ حدّدت كاميرا HiRISE على مسبار Mars Reconnaissance Orbiter المركبة ومظلتها ودرعها الحراري على سطح المريخ.' },
    source: 'https://science.nasa.gov/mission/viking-2/',
    specs: [
      {
        label: { en: 'Landed Mass', ar: 'كتلة الهبوط' },
        value: { en: '657 kg (572 kg dry mass)', ar: '٦٥٧ كغ (٦٧٢ كغ كتلة جافة)' },
      },
      {
        label: { en: 'Power Source', ar: 'مصدر الطاقة' },
        value: { en: 'Two SNAP-19 RTGs (Plutonium-238)', ar: 'مولّدا SNAP-19 RTG (بلوتونيوم-٢٣٨)' },
      },
      {
        label: { en: 'Seismometer', ar: 'الزلزالي' },
        value: { en: '3-axis short-period seismometer (operational)', ar: 'زلزالي ثلاثي المحاور قصير الدورة (عامل)' },
      },
      {
        label: { en: 'Surface Tilt', ar: 'ميل السطح' },
        value: { en: '8.2° (one footpad rested on a rock)', ar: '٨٫٢° (استقرت إحدى الوسائد على صخرة)' },
      },
    ],
    milestones: [
      {
        date: '09.09.1975',
        title: { en: 'Launch', ar: 'الإطلاق' },
        description: { en: 'Launched to Mars on a Titan IIIE / Centaur.', ar: 'أُطلقت نحو المريخ على Titan IIIE / Centaur.' },
      },
      {
        date: '03.09.1976',
        title: { en: 'Touchdown in Utopia', ar: 'الهبوط في يوتوبيا' },
        description: { en: 'Soft landing in the Martian northern lowlands.', ar: 'هبوط ناعم في السهول الشمالية المريخية.' },
      },
      {
        date: '23.11.1976',
        title: { en: 'Sol 80 Marsquake', ar: 'هزة اليوم ٨٠' },
        description: { en: 'First detection of seismic vibrations originating inside Mars.', ar: 'أول رصد لاهتزازات زلزالية تنشأ داخل المريخ.' },
      },
      {
        date: '11.04.1980',
        title: { en: 'End of Mission', ar: 'نهاية المهمة' },
        description: { en: 'Degraded storage batteries permanently ended transmissions.', ar: 'أوقفت البطاريات المتدهورة الإرسال نهائيًا.' },
      },
    ],
    signalData: {
      sol: 1281,
      frequency: '2295.0 MHz (S-band)',
      lastTelemetry: 'VOLTAGE BUS FAULT // CELL REVERSAL IN BATTERY SET // TX CARRIER UNSTABLE // SHUTDOWN',
      fadeReason: { en: 'Degradation and cell reversal of Ni-Cd secondary batteries after 1,281 sols enduring deep thermal cycles from -120°C to -20°C.', ar: 'تدهور وانعكاس خلايا بطاريات النيكل-كادميوم الثانوية بعد ١٬٢٨١ يومًا مريخيًا من الدورات الحرارية العميقة بين -١٢٠°م و-٢٠°م.' },
      sourceUrl: 'https://science.nasa.gov/mission/viking-2/',
    },
  },
  {
    id: 'surveyor-3',
    name: { en: 'Surveyor 3', ar: 'سيرفيور ٣' },
    englishName: 'Surveyor 3',
    designation: 'Surveyor 3 (Surveyor-C)',
    destination: 'Moon',
    type: { en: 'Lunar Lander', ar: 'مركبة هبوط قمرية' },
    launchDate: { en: 'April 17, 1967', ar: '١٧ أبريل ١٩٦٧' },
    landingDate: { en: 'April 20, 1967', ar: '٢٠ أبريل ١٩٦٧' },
    lastContactDate: { en: 'May 4, 1967 (Apollo 12 visit: November 19–20, 1969)', ar: '٤ مايو ١٩٦٧ (زيارة أبولو ١٢: ١٩–٢٠ نوفمبر ١٩٦٩)' },
    activeSpan: { en: '1967 (visit: 1969)', ar: '١٩٦٧ (الزيارة: ١٩٦٩)' },
    status: { en: 'Mission complete (visited by Apollo 12 crew)', ar: 'المهمة منتهية (زارها طاقم أبولو ١٢)' },
    statusType: 'complete',
    coordinates: {
      lat: '3.015° S',
      lon: '23.418° W',
      latNum: -3.015,
      lonNum: -23.418,
      formatted: { en: '3°00′54″ S, 23°25′05″ W', ar: '٣°٠٠′٥٤″ جنوبًا، ٢٣°٢٥′٠٥″ غربًا' },
    },
    nasaSearchQuery: 'Surveyor 3 Apollo 12 Moon crater',
    orbitalSearchQuery: 'Surveyor 3 Apollo 12 LROC landing site',
    locationName: { en: 'Oceanus Procellarum, Surveyor Crater', ar: 'أوقيانوس بروسيلاروم، فوهة سيرفيور' },
    missionDuration: { en: '14 days active telemetry (components retrieved after 2.5 years by Apollo 12)', ar: '١٤ يومًا من القياسات العاملة (استُخرجت مكوّناتها بعد عامين ونصف بواسطة أبولو ١٢)' },
    distanceTraveled: { en: '0 km (stationary lunar lander)', ar: '٠ كم (مركبة هبوط قمرية ثابتة)' },
    image: '',
    schematicType: 'lander',
    shortDescription: { en: 'Pioneering lunar lander that dug the first trenches in lunar soil. Two and a half years later, Apollo 12 landed 160 meters away; astronauts walked to it and brought its TV camera back to Earth for laboratory study.', ar: 'مركبة هبوط قمرية رائدة حفرت أول خنادق في التربة القمرية. وبعد عامين ونصف هبط أبولو ١٢ على بعد ١٦٠ مترًا، وسار الروّاد إليها وأعادوا كاميرا التلفزيون إلى الأرض لدراستها مختبريًا.' },
    howGotThere: { en: 'Launched on an Atlas-Centaur rocket directly into a lunar transfer orbit. During final descent, surface radar reflections delayed engine cutoff, causing the lander to bounce twice — first leaping 10 meters, then 3 meters — before coming to rest on the 14-degree inner slope of Surveyor Crater.', ar: 'أُطلقت على صاروخ Atlas-Centaur مباشرة إلى مدار انتقالي قمري. وأثناء النزول النهائي أخّرت انعكاسات رادار السطح إيقاف المحرك، فارتدّت المركبة مرتين: ١٠ أمتار ثم ٣ أمتار، قبل أن تستقر على المنحدر الداخلي لفوهة سيرفيور بميل ١٤ درجة.' },
    whatDidItDo: { en: 'Returned 6,315 television pictures of the lunar terrain. Its robotic scoop dug four trenches up to 17.5 cm deep, confirming lunar regolith had the bearing strength to support Apollo astronaut landings. On November 19-20, 1969, Apollo 12 astronauts Pete Conrad and Alan Bean walked to the lander, removed its TV camera, scoop, and cables, and returned them to Earth to evaluate prolonged cosmic exposure.', ar: 'أعادت ٦٬٣١٥ صورة تلفزيونية للتضاريس القمرية، وحفرت مغرفتها الآلية أربعة خنادق حتى عمق ١٧٫٥ سم، مؤكدة أن التربة القمرية تتحمل هبوط روّاد أبولو. وفي ١٩–٢٠ نوفمبر ١٩٦٩ سار بيت كونراد وآلان بين إلى المركبة وأزالوا كاميرا التلفزيون والمغرفة والكابلات وأعادوها إلى الأرض لتقييم التعرض الكوني الطويل.' },
    lastContactStory: { en: 'Surveyor 3 operated until sunset on May 4, 1967, when the bitter two-week lunar night (-170°C) set in. Following sunrise, freezing cold prevented battery resuscitation. Its epic conclusion unfolded on November 19, 1969, when Apollo 12 crew inspected the silent craft, noting that 942 days of solar radiation turned its polished white painted surface tan-brown.', ar: 'عملت سيرفيور ٣ حتى غروب ٤ مايو ١٩٦٧ حين حلّ الليل القمري القارس (-١٧٠°م). وبعد الشروق منع البرد القارس إنعاش البطارية. وجاء ختامها الملحمي في ١٩ نوفمبر ١٩٦٩ حين فحصها طاقم أبولو ١٢ ولاحظ أن ٩٤٢ يومًا من الإشعاع الشمسي حوّلت سطحها الأبيض المصقول إلى بني مُصفَر.' },
    whereIsItNow: { en: 'The Surveyor 3 frame (minus its retrieved camera and scoop) still rests on the gentle slope of Surveyor Crater in Oceanus Procellarum, 160 meters from Apollo 12 Intrepid descent stage. Its TV camera is exhibited at the Smithsonian National Air and Space Museum in Washington, D.C.', ar: 'لا يزال هيكل سيرفيور ٣ (دون الكاميرا والمغرفة المستخرجتين) على المنحدر اللطيف لفوهة سيرفيور في أوقيانوس بروسيلاروم، على بعد ١٦٠ مترًا من مرحلة هبوط أبولو ١٢ «إنتريبيد». وتُعرض كاميرا التلفزيون في متحف سميثسونيان الوطني للطيران والفضاء في واشنطن.' },
    source: 'https://science.nasa.gov/mission/surveyor-3/',
    quote: {
      text: { en: 'Hey, look at that! There it is, right on the edge of the crater — Surveyor is sitting right there!', ar: '«انظر إلى ذلك! ها هي، على حافة الفوهة تمامًا — سيرفيور جالسة هناك!»' },
      speaker: { en: 'Pete Conrad (Apollo 12 Commander on lunar surface)', ar: 'بيت كونراد (قائد أبولو ١٢ على سطح القمر)' },
      context: { en: 'November 19, 1969, Apollo 12 lunar surface EVA-2', ar: '١٩ نوفمبر ١٩٦٩، النشاط الثاني على سطح القمر في أبولو ١٢' },
      type: 'team_message',
      typeLabel: { en: 'Crew voice loop', ar: 'تسجيل صوتي للطاقم' },
      sourceUrl: 'https://www.history.nasa.gov/alsj/a12/a12.surveyor.html',
    },
    specs: [
      {
        label: { en: 'Landed Mass', ar: 'كتلة الهبوط' },
        value: { en: '296 kg (on lunar surface)', ar: '٢٩٦ كغ (على سطح القمر)' },
      },
      {
        label: { en: 'Power Source', ar: 'مصدر الطاقة' },
        value: { en: 'Solar panel (up to 85 W) + Ag-Zn batteries', ar: 'لوح شمسي (حتى ٨٥ واط) + بطاريات فضة-زنك' },
      },
      {
        label: { en: 'Payload', ar: 'الحمولة' },
        value: { en: 'Surveyor TV camera, surface sampler scoop, thermal & acceleration strain gauges', ar: 'كاميرا سيرفيور التلفزيونية، ومغرفة أخذ العيّنات، ومقاييس حرارية وتسارع' },
      },
      {
        label: { en: 'Historic Status', ar: 'الحالة التاريخية' },
        value: { en: 'Only extraterrestrial probe partially sampled and returned to Earth by astronauts', ar: 'المسبار الوحيد خارج الأرض الذي أُخذت منه عيّنات جزئية وأُعيدت إلى الأرض بواسطة روّاد فضاء' },
      },
    ],
    milestones: [
      {
        date: '17.04.1967',
        title: { en: 'Launch', ar: 'الإطلاق' },
        description: { en: 'Launched on Atlas-Centaur on direct lunar ascent.', ar: 'أُطلق على Atlas-Centaur في صعود قمري مباشر.' },
      },
      {
        date: '20.04.1967',
        title: { en: 'Bouncing Touchdown', ar: 'هبوط بارتداد' },
        description: { en: 'Bounced twice before settling on the inner wall of Surveyor Crater.', ar: 'ارتدّت مرتين قبل أن تستقر على الجدار الداخلي لفوهة سيرفيور.' },
      },
      {
        date: '22.04.1967',
        title: { en: 'First Trenching Scoop', ar: 'أول مغرفة حفر' },
        description: { en: 'Mechanically excavated the first trenches in lunar soil.', ar: 'حفرت ميكانيكيًا أول خنادق في التربة القمرية.' },
      },
      {
        date: '19.11.1969',
        title: { en: 'Apollo 12 Astronaut Visit', ar: 'زيارة روّاد أبولو ١٢' },
        description: { en: 'Conrad and Bean walked to the probe, removing parts for terrestrial science.', ar: 'سار كونراد وبين إلى المسبار وأزالا أجزاء منه للعلم الأرضي.' },
      },
    ],
  },
  {
    id: 'mars-polar-lander',
    name: { en: 'Mars Polar Lander', ar: 'مسبار المريخ القطبي' },
    englishName: 'Mars Polar Lander',
    designation: 'Mars Polar Lander (Mars Surveyor 1998 Lander)',
    destination: 'Mars',
    type: { en: 'Polar Lander', ar: 'مركبة هبوط قطبية' },
    launchDate: { en: 'January 3, 1999', ar: '٣ يناير ١٩٩٩' },
    landingDate: { en: 'December 3, 1999 (planned touchdown)', ar: '٣ ديسمبر ١٩٩٩ (وقت الهبوط المخطط)' },
    lastContactDate: { en: 'December 3, 1999 (before atmospheric entry)', ar: '٣ ديسمبر ١٩٩٩ (قبل دخول الغلاف الجوي)' },
    activeSpan: { en: '1999', ar: '١٩٩٩' },
    status: { en: 'Lost during landing (EDL sensor anomaly)', ar: 'فُقدت أثناء الهبوط (خلل في مجسّات النزول)' },
    statusType: 'silent',
    coordinates: {
      lat: '76.13° S',
      lon: '164.7° W',
      latNum: -76.13,
      lonNum: -164.7,
      formatted: { en: '76°07′48″ S, 164°42′00″ W', ar: '٧٦°٠٧′٤٨″ جنوبًا، ١٦٤°٤٢′٠٠″ غربًا' },
    },
    nasaSearchQuery: 'Mars Polar Lander Deep Space 2 Mars',
    orbitalSearchQuery: 'Mars Polar Lander HiRISE south pole',
    locationName: { en: 'Planum Australe, South Polar Layered Deposits', ar: 'بلانوم أوسترالي، رواسب القطب الجنوبي الطبقية' },
    missionDuration: { en: '11 months cruise (signal lost prior to touchdown on Dec 3, 1999)', ar: '١١ شهرًا من الرحلة (فُقدت الإشارة قبل الهبوط في ٣ ديسمبر ١٩٩٩)' },
    distanceTraveled: { en: '0 km (lost during descent)', ar: '٠ كم (فُقدت أثناء النزول)' },
    image: '',
    schematicType: 'lander',
    shortDescription: { en: 'NASA’s pioneering mission to touch down near the Martian South Pole. Lost during descent when landing leg deployment vibrations triggered premature engine shutdown, completely reshaping future Mars EDL engineering.', ar: 'بعثة NASA الرائدة للهبوط قرب القطب الجنوبي للمريخ. فُقدت أثناء النزول حين تسبّبت اهتزازات نشر أرجل الهبوط في إيقاف المحرك مبكرًا، ما أعاد تشكيل هندسة النزول المريخية مستقبلًا بالكامل.' },
    howGotThere: { en: 'Launched via a Delta II 7425 rocket carrying two Deep Space 2 microprobes. On December 3, 1999, it entered the Martian atmosphere without real-time telemetry. The Thomas Young Investigation Board concluded that microswitch bounce during landing leg deployment at 40 meters altitude falsely signaled touchdown, causing the flight software to shut down thrusters prematurely and crash into the ice.', ar: 'أُطلقت على صاروخ Delta II 7425 حاملًا مسباري Deep Space 2 الدقيقين. وفي ٣ ديسمبر ١٩٩٩ دخلت الغلاف الجوي المريخي دون قياسات لحظية. وخلص مجلس تحقيق توماس يونغ إلى أن ارتداد مفتاح دقيق أثناء نشر أرجل الهبوط على ارتفاع ٤٠ مترًا أوهم الحاسوب بحدوث الهبوط، فأوقف الدافعات مبكرًا وارتطمت المركبة بالجليد.' },
    whatDidItDo: { en: 'While the spacecraft was lost, its flight spare hardware and scientific instruments (lidar, meteorological boom, and thermal evolved gas analyzer TEGA) were re-engineered and successfully deployed nine years later on Mars by the Phoenix Lander in 2008.', ar: 'رغم فقدان المركبة، أُعيدت هندسة معداتها الاحتياطية وأدواتها العلمية (LIDAR وذراع الأرصاد الجوية ومحلّل TEGA الحراري) ونُشرت بنجاح بعد تسع سنوات على المريخ مع مركبة فينيكس عام ٢٠٠٨.' },
    lastContactStory: { en: 'Final standard telemetry ended 12 minutes prior to atmospheric entry on December 3, 1999. Following the scheduled touchdown window, antennas at Goldstone and Canberra detected no carrier signal. Radio listening campaigns continued until January 2000, and orbital cameras systematically surveyed the target footprint.', ar: 'انتهت آخر قياسات قياسية قبل ١٢ دقيقة من الدخول الجوي في ٣ ديسمبر ١٩٩٩. وبعد نافذة الهبوط المقررة لم ترصد هوائيات غولدستون وكانبرا أي موجة حاملة، واستمرت حملات الاستماع الراديوي حتى يناير ٢٠٠٠، ومسحت الكاميرات المدارية منطقة الهدف بانتظام.' },
    whereIsItNow: { en: 'The wreckage of Mars Polar Lander and its twin Deep Space 2 microprobes rests among the south polar layered deposits of Planum Australe, covered each winter by seasonal dry-ice frost.', ar: 'تستقر حطام مسبار المريخ القطبي ومسباري Deep Space 2 في رواسب القطب الجنوبي الطبقية ببلانوم أوسترالي، مغطاة كل شتاء بصقيع جليد جاف موسمي.' },
    source: 'https://science.nasa.gov/mission/mars-polar-lander/',
    specs: [
      {
        label: { en: 'Landed Mass', ar: 'كتلة الهبوط' },
        value: { en: '290 kg (dry mass)', ar: '٢٩٠ كغ (كتلة جافة)' },
      },
      {
        label: { en: 'Power Source', ar: 'مصدر الطاقة' },
        value: { en: 'GaAs solar arrays (up to 200 W)', ar: 'مصفوفات شمسية GaAs (حتى ٢٠٠ واط)' },
      },
      {
        label: { en: 'Piggyback Probes', ar: 'المسابير المرافقة' },
        value: { en: 'Two Deep Space 2 microprobe penetrators ("Scott" & "Amundsen")', ar: 'مسباران اختراقيان دقيقان Deep Space 2 («سكوت» و«أموندسن»)' },
      },
      {
        label: { en: 'Failure Cause', ar: 'سبب الفشل' },
        value: { en: 'Leg deployment microswitch transient at 40m altitude (thruster cutoff)', ar: 'نبضة عابرة في مفتاح نشر الأرجل على ارتفاع ٤٠ مترًا (إيقاف الدافعات)' },
      },
    ],
    milestones: [
      {
        date: '03.01.1999',
        title: { en: 'Launch', ar: 'الإطلاق' },
        description: { en: 'Launched towards Mars south pole on Delta II.', ar: 'أُطلق نحو القطب الجنوبي للمريخ على Delta II.' },
      },
      {
        date: '03.12.1999',
        title: { en: 'Atmospheric Entry', ar: 'الدخول الجوي' },
        description: { en: 'Atmospheric entry at 6.9 km/s.', ar: 'دخول جوي بسرعة ٦٫٩ كم/ث.' },
      },
      {
        date: '03.12.1999',
        title: { en: 'Loss of Spacecraft', ar: 'فقدان المركبة' },
        description: { en: 'Premature thruster shutdown resulted in impact on polar terrain.', ar: 'أدى الإيقاف المبكر للدافعات إلى الارتطام بالتضاريس القطبية.' },
      },
      {
        date: '28.03.2000',
        title: { en: 'Thomas Young Report', ar: 'تقرير توماس يونغ' },
        description: { en: 'Independent board report completely reorganized NASA Mars exploration.', ar: 'أعاد تقرير المجلس المستقل تنظيم استكشاف المريخ في NASA بالكامل.' },
      },
    ],
    signalData: {
      frequency: '401.5 MHz (UHF) / 2295 MHz (S-band)',
      lastTelemetry: 'EDL INITIALIZED // ENTRY INTERFACE // SENSOR CHATTER DETECTED // CARRIER LOST // CARRIER NOT ACQUIRED POST-TOUCHDOWN',
      fadeReason: { en: 'Catastrophic loss of vehicle due to impact from 40m altitude caused by premature descent engine shutdown triggered by spurious sensor transient.', ar: 'فقدان كارثي للمركبة بسبب ارتطام من ارتفاع ٤٠ مترًا نجم عن إيقاف مبكر لمحرك النزول بسبب نبضة استشعار زائفة.' },
      sourceUrl: 'https://science.nasa.gov/mission/mars-polar-lander/',
    },
  },
];
