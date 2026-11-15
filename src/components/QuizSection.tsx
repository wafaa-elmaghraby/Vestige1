import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, ExternalLink, Sparkles } from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { LocalizedText } from '../i18n/types';
import { useT } from '../i18n/LanguageContext';
import { SectionHeading } from './SectionHeading';

interface QuizQuestion {
  id: number;
  category: LocalizedText;
  question: LocalizedText;
  options: LocalizedText[];
  correctIndex: number;
  explanation: LocalizedText;
  sourceTitle: string;
  sourceUrl: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: { en: 'MARS RECORDS // OPPORTUNITY', ar: 'أرقام مريخية // أوبورتيونيتي' },
    question: { en: 'What off-Earth surface driving distance record did the Opportunity rover achieve during its 14.5-year mission?', ar: 'أي رقم قياسي في مسافة القيادة على سطح خارج الأرض حققه المتجوّل أوبورتيونيتي خلال مهمته التي استمرت ١٤٫٥ عامًا؟' },
    options: [
      { en: '7.73 km (Spirit rover total)', ar: '٧٫٧٣ كم (إجمالي المتجوّل سبيريت)' },
      { en: '17.0 km (Ingenuity flight distance)', ar: '١٧٫٠ كم (مسافة طيران إنجينويتي)' },
      { en: '45.16 km (surpassed marathon length of 42.195 km)', ar: '٤٥٫١٦ كم (تجاوز طول الماراثون ٤٢٫١٩٥ كم)' },
      { en: '100 meters (Sojourner micro-rover distance)', ar: '١٠٠ متر (مسافة المتجوّل الدقيق سوجورنر)' }
    ],
    correctIndex: 2,
    explanation: { en: 'Opportunity traversed an off-Earth record 45.16 km (28.06 miles) across craters Eagle, Victoria, and Endeavour, setting the all-time extraterrestrial wheeled roving record.', ar: 'قطع أوبورتيونيتي مسافة قياسية خارج الأرض بلغت ٤٥٫١٦ كم عبر فوهات إيغل وفيكتوريا وإنديفور، محققًا الرقم القياسي الأعلى في السير على عجلات خارج الأرض.' },
    sourceTitle: 'NASA Science: MER Opportunity Overview',
    sourceUrl: 'https://science.nasa.gov/mission/mer-opportunity/'
  },
  {
    id: 2,
    category: { en: 'SCIENTIFIC DISCOVERY // SPIRIT', ar: 'اكتشاف علمي // سبيريت' },
    question: { en: 'What landmark discovery did the Spirit rover stumble upon due to its jammed front-right wheel?', ar: 'أي اكتشاف بارز عثر عليه المتجوّل سبيريت بسبب انحشار عجلته الأمامية اليمنى؟' },
    options: [
      { en: 'Pure water ice deposits in polar cap', ar: 'رواسب جليد ماء نقي في الغطاء القطبي' },
      { en: 'Layer of 90% pure silica — evidence of ancient hydrothermal springs', ar: 'طبقة سيليكا بنقاء ٩٠٪، دليل على ينابيع حرارية قديمة' },
      { en: 'Hematite spherules (“Martian blueberries”)', ar: 'كريات هيماتيت («العنبيات المريخية»)' },
      { en: 'Perchlorates and winter dry-ice snowfalls', ar: 'بيركلورات وتساقط ثلوج جليد جاف شتوية' }
    ],
    correctIndex: 1,
    explanation: { en: 'In 2006, dragging its frozen front wheel in reverse churned the soil and exposed a patch of 90% pure silica, providing irrefutable proof of past habitable hydrothermal springs or fumaroles.', ar: 'في عام ٢٠٠٦، حرث المتجوّل التربة عكسيًا وهو يجرّ عجلته الأمامية المتجمدة، فكشف رقعة سيليكا بنقاء ٩٠٪، وهو دليل قاطع على ينابيع حرارية أو فوهات بخارية صالحة للحياة في الماضي.' },
    sourceTitle: 'NASA Science: MER Spirit Overview',
    sourceUrl: 'https://science.nasa.gov/mission/mer-spirit/'
  },
  {
    id: 3,
    category: { en: 'LUNAR PROGRAM // APOLLO RELICS', ar: 'البرنامج القمري // آثار أبولو' },
    question: { en: 'What was the true reason NASA deactivated the entire ALSEP lunar seismic station network on September 30, 1977?', ar: 'ما السبب الحقيقي وراء إيقاف NASA لشبكة محطات ALSEP الزلزالية القمرية بالكامل في ٣٠ سبتمبر ١٩٧٧؟' },
    options: [
      { en: 'SNAP-27 plutonium RTGs exhausted all charge and burnt out', ar: 'نفاد شحنة مولّدات SNAP-27 البلوتونية واحتراقها' },
      { en: 'Severe meteor shower destroyed antennas at all five sites', ar: 'تدمير وابل نيازك شديد لهوائيات المواقع الخمسة' },
      { en: 'US congressional budget cuts for operating ground tracking network ($5M/yr)', ar: 'تخفيضات الميزانية في الكونغرس لتشغيل شبكة التتبع الأرضية (٥ ملايين دولار سنويًا)' },
      { en: 'Stations reached warranty limit and were detonated', ar: 'بلوغ المحطات حدّ الضمان وتفجيرها' }
    ],
    correctIndex: 2,
    explanation: { en: 'ALSEP stations remained fully functional and generating prime science. Shutdown was purely budgetary due to congressional termination of MSFN ground tracking station funding.', ar: 'ظلت محطات ALSEP عاملة بكامل وظائفها وتنتج علمًا عالي الجودة. وكان الإيقاف لأسباب مالية بحتة بعد إنهاء الكونغرس تمويل محطات التتبع الأرضية MSFN.' },
    sourceTitle: 'NASA History Office: Apollo Expeditions to the Moon (SP-407)',
    sourceUrl: 'https://history.nasa.gov/SP-407/sp407.htm'
  },
  {
    id: 4,
    category: { en: 'SPACE ARCHAEOLOGY // ALAN SHEPARD', ar: 'علم آثار الفضاء // ألان شيبارد' },
    question: { en: 'What distance did Alan Shepard’s second lunar golf ball actually travel (contrary to his quip about “miles and miles”)?', ar: 'ما المسافة التي قطعتها كرة الغولف القمرية الثانية لألان شيبارد فعليًا (خلافًا لدعابته عن «أميال وأميال»)؟' },
    options: [
      { en: 'About 37 meters (40 yards) based on LRO orbiter image analysis', ar: 'نحو ٣٧ مترًا (٤٠ ياردة) بحسب تحليل صور المسبار LRO' },
      { en: 'Over 2.5 kilometers due to total vacuum', ar: 'أكثر من ٢٫٥ كيلومتر بسبب الفراغ التام' },
      { en: 'Roughly 400 meters to nearby crater rim', ar: 'نحو ٤٠٠ متر إلى حافة الفوهة القريبة' },
      { en: 'Ball failed to lift off due to one-handed swing', ar: 'لم ترتفع الكرة بسبب الضربة بيد واحدة' }
    ],
    correctIndex: 0,
    explanation: { en: 'Shepard exclaimed “miles and miles and miles!” But imaging analysis by British researcher Andy Saunders with NASA LRO orbiter frames proved the first ball flew 22 meters and the second roughly 37 meters.', ar: 'هتف شيبارد «أميال وأميال وأميال!» لكن تحليل الصور الذي أجراه الباحث البريطاني آندي ساندرز على إطارات المسبار LRO أثبت أن الكرة الأولى طارت ٢٢ مترًا والثانية نحو ٣٧ مترًا.' },
    sourceTitle: 'NASA Apollo Lunar Surface Journal (Apollo 14 EVA-2)',
    sourceUrl: 'https://history.nasa.gov/alsj/a14/a14.eva2.html'
  },
  {
    id: 5,
    category: { en: 'CURRENT STATUS // INGENUITY', ar: 'الحالة الحالية // إنجينويتي' },
    question: { en: 'What operational status does the Ingenuity Mars Helicopter maintain following rotor damage on Flight 72?', ar: 'ما الوضع التشغيلي الذي تحتفظ به مروحية المريخ إنجينويتي بعد تلف الدوّار في الرحلة ٧٢؟' },
    options: [
      { en: 'Fully powered down and scavenged for parts by Perseverance', ar: 'أُوقفت تمامًا وفُككت أجزاؤها بواسطة بيرسيفيرانس' },
      { en: 'Repurposed as a permanent weather station logging telemetry daily', ar: 'أُعيد توظيفها كمحطة أرصاد دائمة تسجّل القياسات يوميًا' },
      { en: 'Mothballed inside hermetic enclosure under rover chassis', ar: 'خُزّنت داخل حاوية محكمة تحت هيكل المتجوّل' },
      { en: 'Restricted to shallow hops under 50 centimeters', ar: 'قُيّدت بقفزات قصيرة دون ٥٠ سنتيمترًا' }
    ],
    correctIndex: 1,
    explanation: { en: 'Ingenuity survived: JPL engineers updated its firmware. The helicopter awakens every Martian morning to log sensor parameters and temperatures into flash memory for future expeditions.', ar: 'نجت إنجينويتي: حدّث مهندسو JPL برمجياتها. تستيقظ المروحية كل صباح مريخي لتسجّل معطيات المجسّات ودرجات الحرارة في ذاكرة وميضية من أجل بعثات المستقبل.' },
    sourceTitle: 'NASA Headquarters Release 24-009',
    sourceUrl: 'https://www.nasa.gov/news-release/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/'
  }
];

export const QuizSection: React.FC = () => {
  const { t, localize } = useT();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [answersHistory, setAnswersHistory] = useState<Array<{ questionId: number; selected: number; isCorrect: boolean }>>([]);

  const currentQ = quizQuestions[currentIndex];
  const isAnswered = selectedOption !== null;

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    const isCorrect = index === currentQ.correctIndex;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      spaceAudio.playTelemetryBeep(1400, 0.08);
    } else {
      spaceAudio.playTelemetryBeep(450, 0.12);
    }

    setAnswersHistory((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        selected: index,
        isCorrect
      }
    ]);
  };

  const handleNextQuestion = () => {
    spaceAudio.playTelemetryBeep(1100, 0.04);
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    spaceAudio.playTelemetryBeep(1200, 0.05);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsCompleted(false);
    setAnswersHistory([]);
  };

  const getRankData = () => {
    if (score === 5) {
      return {
        badge: t.quiz.rankBadgeMaster,
        title: t.quiz.rankTitleMaster,
        desc: t.quiz.rankDescMaster,
        color: 'text-[color:var(--ink-2)]',
        borderColor: 'border-[color:var(--indigo)]/60',
        bgGradient: 'from-[color:var(--blue-deep)]/40 via-slate-900/60 to-slate-950'
      };
    }
    if (score >= 3) {
      return {
        badge: t.quiz.rankBadgeOperator,
        title: t.quiz.rankTitleOperator,
        desc: t.quiz.rankDescOperator,
        color: 'text-cyan-400',
        borderColor: 'border-cyan-500/60',
        bgGradient: 'from-cyan-950/40 via-slate-900/60 to-slate-950'
      };
    }
    return {
      badge: t.quiz.rankBadgeTrainee,
      title: t.quiz.rankTitleTrainee,
      desc: t.quiz.rankDescTrainee,
      color: 'text-[color:var(--ink-2)]',
      borderColor: 'border-[color:var(--line-strong)]',
      bgGradient: 'from-slate-900/60 via-slate-900/40 to-slate-950'
    };
  };

  return (
    <section id="quiz" className="relative border-t border-[color:var(--line)] bg-[color:var(--abyss)] py-16 sm:py-20 xl:py-[88px]">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          index="09"
          tag={t.quiz.sectionTag.replace(/^\d+\s*\/\/\s*/, '')}
          title={t.quiz.title}
          description={t.quiz.subtitle}
          align="center"
        />

        {!isCompleted ? (
          /* Single Question Card Viewport */
          <div className="bg-[#070b12] border border-[color:var(--line)] rounded-2xl p-6 sm:p-10 shadow-2xl relative">
            {/* Top Meta Bar */}
            <div className="flex items-center justify-between border-b border-[color:var(--line)] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[color:var(--cyan)]" />
                <span className="text-xs font-mono text-[color:var(--ink-2)] uppercase tracking-wider">
                  {t.quiz.questionCount} {currentIndex + 1} / {quizQuestions.length}
                </span>
              </div>

              <div className="text-xs font-mono text-[color:var(--ink-2)]">
                {t.quiz.scoreCount} <span className="text-[color:var(--ink)] font-bold">{score}</span>
              </div>
            </div>

            {/* Question Category Tag */}
            <div className="text-[11px] font-mono text-[color:var(--ink-2)] uppercase tracking-wider mb-2">
              {localize(currentQ.category)}
            </div>

            {/* Question Text */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[color:var(--ink)] uppercase tracking-tight mb-8 leading-snug">
              {localize(currentQ.question)}
            </h3>

            {/* 4 Options Grid */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                const showSuccess = isAnswered && isCorrect;
                const showFailure = isAnswered && isSelected && !isCorrect;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-xl text-left text-sm font-sans transition-all flex items-center justify-between border ${
                      showSuccess
                        ? 'bg-[color:var(--signal)]/10 border-[color:var(--signal)] text-[color:var(--ink)] shadow-lg shadow-emerald-950/40'
                        : showFailure
                        ? 'bg-[color:var(--indigo)]/15 border-[color:var(--indigo)] text-[color:var(--ink)] shadow-lg shadow-[color:var(--indigo)]/25'
                        : isAnswered && !isSelected
                        ? 'bg-[color:var(--surface)]/50 border-[color:var(--line)] text-[color:var(--ink-3)] cursor-not-allowed'
                        : 'bg-[color:var(--surface)]/90 border-[color:var(--line)] text-[color:var(--ink)] hover:border-[color:var(--line-strong)] hover:bg-[color:var(--surface-2)]/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0 border ${
                        showSuccess
                          ? 'border-emerald-400 bg-[color:var(--signal)]/20 text-emerald-300'
                          : showFailure
                          ? 'border-[color:var(--indigo)] bg-[color:var(--indigo)]/20 text-[color:var(--indigo)]'
                          : 'border-[color:var(--line-strong)] bg-[color:var(--surface-2)] text-[color:var(--ink-2)]'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="font-medium">{localize(opt)}</span>
                    </div>

                    {showSuccess && <CheckCircle2 className="w-5 h-5 text-[color:var(--signal)] shrink-0 ml-2" />}
                    {showFailure && <XCircle className="w-5 h-5 text-[color:var(--indigo)] shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback & Explanation Card */}
            {isAnswered && (
              <div className="p-5 rounded-xl border bg-[color:var(--surface)]/90 border-[color:var(--line)] space-y-3 mb-8 animate-fadeIn">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
                  {selectedOption === currentQ.correctIndex ? (
                    <span className="text-[color:var(--signal)] flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      {t.quiz.correctLabel}
                    </span>
                  ) : (
                    <span className="text-[color:var(--indigo)] flex items-center gap-1 font-bold">
                      <XCircle className="w-4 h-4" />
                      {t.quiz.incorrectLabel}
                    </span>
                  )}
                  <span className="text-[color:var(--ink-3)]">·</span>
                  <span className="text-[color:var(--ink-2)]">{t.quiz.explanationTag}</span>
                </div>

                <p className="text-xs sm:text-sm text-[color:var(--ink-2)] leading-relaxed font-light">
                  {localize(currentQ.explanation)}
                </p>

                <div className="pt-2 border-t border-[color:var(--line)] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[color:var(--ink-3)]">{t.quiz.sourceLabel}</span>
                  <a
                    href={currentQ.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[color:var(--ink-2)] hover:text-[color:var(--ink-2)] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>{currentQ.sourceTitle}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Next Question / View Results Button */}
            {isAnswered && (
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-[color:var(--indigo)] hover:bg-[color:var(--cyan)] text-[#04101f] font-mono text-xs uppercase tracking-wider font-bold rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-[color:var(--indigo)]/25"
                >
                  <span>
                    {currentIndex < quizQuestions.length - 1 ? t.quiz.nextBtn : t.quiz.resultsBtn}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Final Results Scorecard View */
          <div className="bg-[#070b12] border border-[color:var(--line)] rounded-2xl p-6 sm:p-12 shadow-2xl text-center space-y-8">
            <div className="w-16 h-16 rounded-full bg-[color:var(--indigo)]/10 border border-[color:var(--indigo)]/30 flex items-center justify-center mx-auto text-[color:var(--ink-2)]">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-mono text-[color:var(--ink-2)] uppercase tracking-widest mb-1">
                {t.quiz.finalScoreTitle}
              </div>
              <div className="text-4xl sm:text-6xl font-display font-black text-[color:var(--ink)] tracking-tight font-mono-tabular">
                {score} <span className="text-2xl sm:text-3xl text-[color:var(--ink-3)] font-normal">/ {quizQuestions.length}</span>
              </div>
            </div>

            {/* Rank Evaluation Card */}
            {(() => {
              const rank = getRankData();
              return (
                <div className={`p-6 rounded-xl border ${rank.borderColor} bg-gradient-to-br ${rank.bgGradient} max-w-xl mx-auto space-y-2`}>
                  <div className={`text-xs font-mono font-bold tracking-widest uppercase ${rank.color}`}>
                    ★ {rank.badge} ★
                  </div>
                  <div className="text-lg font-display font-bold text-[color:var(--ink)] uppercase">
                    {rank.title}
                  </div>
                  <p className="text-xs sm:text-sm text-[color:var(--ink-2)] leading-relaxed font-light">
                    {rank.desc}
                  </p>
                </div>
              );
            })()}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handleRestartQuiz}
                className="w-full sm:w-auto px-8 py-3.5 bg-[color:var(--indigo)] hover:bg-[color:var(--cyan)] text-[#04101f] font-mono text-xs uppercase tracking-wider font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[color:var(--indigo)]/25"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.quiz.retakeBtn}</span>
              </button>

              <a
                href="#worlds"
                onClick={() => spaceAudio.playTelemetryBeep(1000, 0.03)}
                className="w-full sm:w-auto px-6 py-3.5 bg-[color:var(--surface-2)] hover:bg-[color:var(--surface-2)] border border-[color:var(--line-strong)] text-[color:var(--ink)] font-mono text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center"
              >
                {t.quiz.returnBtn}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
