import React, { useState, useEffect, useRef, useId, useCallback } from 'react';
import { useT } from '../i18n/LanguageContext';
import type { LocalizedText } from '../i18n/types';
import { spaceAudio } from '../utils/audio';
import {
  Radio,
  Sliders,
  Terminal,
  Clock,
  Volume2,
  VolumeX,
  Award,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap,
  HelpCircle,
  Satellite
} from 'lucide-react';

type GameCraftId = 'opportunity' | 'spirit' | 'viking-1';
type GameStage =
  | 'select'
  | 'level1'
  | 'level1_reward'
  | 'level2'
  | 'level2_reward'
  | 'level3'
  | 'level3_reward'
  | 'victory';

interface CraftConfig {
  id: GameCraftId;
  nameKey: 'craftOppy' | 'craftSpirit' | 'craftViking';
  descKey: 'craftOppyDesc' | 'craftSpiritDesc' | 'craftVikingDesc';
  difficultyKey: 'difficultyMedium' | 'difficultyHard' | 'difficultyEasy';
  targetFreq: number; // MHz
  tolerance: number; // MHz
  initialFreq: number; // MHz
  word: string; // Codeword for level 2
  glyphs: string[]; // Glyphs corresponding to word letters
  delayRtt: number; // Seconds for simulated round-trip in Level 3
  windowStart: number; // Seconds into pass for valid reception
  windowEnd: number; // Seconds into pass for valid reception
  passDuration: number; // Total seconds of horizon pass
  rewards: {
    fact: LocalizedText;
    source: string;
  }[];
}

const CRAFTS: Record<GameCraftId, CraftConfig> = {
  opportunity: {
    id: 'opportunity',
    nameKey: 'craftOppy',
    descKey: 'craftOppyDesc',
    difficultyKey: 'difficultyMedium',
    targetFreq: 2295.5,
    tolerance: 0.15,
    initialFreq: 2291.0,
    word: 'EAGLE',
    glyphs: ['⬡', '▲', '⌖', '◬', '⬡'],
    delayRtt: 2.2,
    windowStart: 7.0,
    windowEnd: 13.0,
    passDuration: 18.0,
    rewards: [
      {
        fact: { en: 'Opportunity operated for 5,111 sols instead of the planned 90, driving 45.16 km — an unbroken off-Earth roving distance record.', ar: 'عملت Opportunity على المريخ ٥١١١ سولًا بدلًا من ٩٠ سولًا مخططًا لها، وقطعت ٤٥.١٦ كم — وهو رقم قياسي غير مسبوق لمسافة تجوّل مركبة ذات عجلات خارج الأرض.' },
        source: 'https://science.nasa.gov/mission/mer-opportunity/'
      },
      {
        fact: { en: 'During landing, the rover bounced inside its airbag cocoon dozens of times, rolling directly onto the floor of 22-meter Eagle Crater — an extraordinary "hole-in-one" landing.', ar: 'أثناء الهبوط ارتدّت المركبة داخل كيس الوسائد الهوائية عشرات المرات، ثم استقرّت مصادفةً في قاع فوهة إيجل البالغة ٢٢ مترًا — وهو أشبه بـ«ضربة واحدة في الثقب».' },
        source: 'https://science.nasa.gov/mission/mer-opportunity/'
      },
      {
        fact: { en: 'Opportunity’s chief discovery: hematite spherules ("blueberries") preserved in layered rocks, proving ancient neutral liquid water persisted on Mars.', ar: 'أبرز اكتشافات Opportunity هو كريات الهيماتيت («العنبيات») المحفوظة داخل الصخور الطبقية، وقد أثبتت استمرار وجود ماء سائل متعادل على المريخ في الماضي السحيق.' },
        source: 'https://science.nasa.gov/mission/mer-opportunity/'
      }
    ]
  },
  spirit: {
    id: 'spirit',
    nameKey: 'craftSpirit',
    descKey: 'craftSpiritDesc',
    difficultyKey: 'difficultyHard',
    targetFreq: 2296.8,
    tolerance: 0.1,
    initialFreq: 2293.0,
    word: 'GUSEV',
    glyphs: ['⌖', '⌬', '⍟', '⬡', '✦'],
    delayRtt: 2.6,
    windowStart: 6.0,
    windowEnd: 11.5,
    passDuration: 16.0,
    rewards: [
      {
        fact: { en: 'In 2006, Spirit’s right front wheel jammed. Dragging it backwards, the rover churned up bright soil containing 90% pure silica — unmistakable evidence of ancient volcanic hydrothermal vents.', ar: 'في عام ٢٠٠٦ تعطّلت العجلة الأمامية اليمنى لمركبة Spirit، فجرّتها المركبة إلى الخلف وحرثت التربة السطحية لتكشف عن سيليكا نقية بنسبة ٩٠٪ — دليل قاطع على فتحات حرمائية بركانية قديمة.' },
        source: 'https://science.nasa.gov/mission/mer-spirit/'
      },
      {
        fact: { en: 'Spirit captured the first-ever time-lapse movies of active Martian dust devils whirling across the floor of Gusev Crater.', ar: 'التقطت Spirit أول أفلام تسارُع زمني على الإطلاق لشياطين الغبار المريخية النشطة وهي تدور فوق قاع فوهة غوسيف.' },
        source: 'https://science.nasa.gov/mission/mer-spirit/'
      },
      {
        fact: { en: 'In May 2009, Spirit became embedded in soft sulfate sand at "Troy" and transitioned into a stationary planetary monitoring station.', ar: 'في مايو ٢٠٠٩ غرزت Spirit في رمل كبريتات رخو عند موقع «تروي»، فحوّلتها NASA إلى محطة رصد كوكبي ثابتة.' },
        source: 'https://science.nasa.gov/mission/mer-spirit/'
      }
    ]
  },
  'viking-1': {
    id: 'viking-1',
    nameKey: 'craftViking',
    descKey: 'craftVikingDesc',
    difficultyKey: 'difficultyEasy',
    targetFreq: 2295.0,
    tolerance: 0.18,
    initialFreq: 2298.5,
    word: 'CHRYSE',
    glyphs: ['⧫', '⬢', '⟐', '⬟', '⍟', '⬡'],
    delayRtt: 3.0,
    windowStart: 8.0,
    windowEnd: 15.0,
    passDuration: 20.0,
    rewards: [
      {
        fact: { en: 'On July 20, 1976, Viking 1 executed the first successful American soft landing on Mars, transmitting the first surface image minutes after touchdown.', ar: 'في ٢٠ يوليو ١٩٧٦ نفّذت Viking 1 أول هبوط أمريكي ناجح على المريخ، وبثّت أول صورة لسطح الكوكب بعد دقائق من ملامسة السطح.' },
        source: 'https://science.nasa.gov/mission/viking-1/'
      },
      {
        fact: { en: 'Chryse Planitia, where the lander sits, translates to "Plains of Gold" — a vast outflow plain carved by ancient catastrophic floodwaters.', ar: 'سهل «كريسي بلانيتيا» الذي تستقر عليه المركبة يعني «سهل الذهب» — وهو سهل فيضي واسع حفرته مياه فيضانات كارثية قديمة.' },
        source: 'https://science.nasa.gov/mission/viking-1/'
      },
      {
        fact: { en: 'The lander fell silent in November 1982 after an inadvertent memory address overlap in an uplink command shifted its high-gain antenna away from Earth.', ar: 'صمتت المركبة في نوفمبر ١٩٨٢ بعد تداخل غير مقصود في عنوان ذاكرة ضمن أمر مرسل من الأرض، أدّى إلى انحراف هوائيها عالي الكسب بعيدًا عن الأرض.' },
        source: 'https://science.nasa.gov/mission/viking-1/'
      }
    ]
  }
};

// Rosetta Table Alphabet
const ROSETTA_ALPHABET: { glyph: string; letter: string }[] = [
  { glyph: '▲', letter: 'A' },
  { glyph: '⧫', letter: 'C' },
  { glyph: '⬡', letter: 'E' },
  { glyph: '⌖', letter: 'G' },
  { glyph: '⬢', letter: 'H' },
  { glyph: '◬', letter: 'L' },
  { glyph: '◈', letter: 'O' },
  { glyph: '⟐', letter: 'R' },
  { glyph: '⍟', letter: 'S' },
  { glyph: '⌬', letter: 'U' },
  { glyph: '✦', letter: 'V' },
  { glyph: '⬟', letter: 'Y' }
];

export const SignalGame: React.FC = () => {
  const { t, localize } = useT();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const carrierOscRef = useRef<OscillatorNode | null>(null);
  const carrierGainRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const noiseGainRef = useRef<GainNode | null>(null);

  // High-level Game State
  const [selectedCraftId, setSelectedCraftId] = useState<GameCraftId>('opportunity');
  const [stage, setStage] = useState<GameStage>('select');
  const [score, setScore] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Level 1: Carrier Lock State
  const [currentFreq, setCurrentFreq] = useState<number>(2291.0);
  const [lockDuration, setLockDuration] = useState<number>(0); // 0.0 to 2.0s
  const [level1Success, setLevel1Success] = useState<boolean>(false);
  const lockTimerRef = useRef<number | null>(null);

  // Level 2: Packet Decryption State
  const [decodedLetters, setDecodedLetters] = useState<string[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(3);
  const [usedHint, setUsedHint] = useState<boolean>(false);
  const [wordError, setWordError] = useState<boolean>(false);

  // Level 3: DSN Delayed Uplink State
  const [passCurrentTime, setPassCurrentTime] = useState<number>(0);
  const [uplinkSentTime, setUplinkSentTime] = useState<number | null>(null);
  const [uplinkState, setUplinkState] = useState<'idle' | 'in_flight' | 'success' | 'too_early' | 'too_late'>('idle');
  const level3RafRef = useRef<number | null>(null);
  const uplinkTimeoutRef = useRef<number | null>(null);

  const activeCraft = CRAFTS[selectedCraftId];

  // Helper to init browser audio context on user gesture
  const initAudio = useCallback(() => {
    if (audioContextRef.current) {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume().catch(() => {});
      }
      return audioContextRef.current;
    }
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;
      return ctx;
    }
    return null;
  }, []);

  // Stop active level 1 continuous tone
  const stopCarrierAudio = useCallback(() => {
    if (carrierOscRef.current) {
      try { carrierOscRef.current.stop(); carrierOscRef.current.disconnect(); } catch { /* noop */ }
      carrierOscRef.current = null;
    }
    if (noiseSourceRef.current) {
      try { noiseSourceRef.current.stop(); noiseSourceRef.current.disconnect(); } catch { /* noop */ }
      noiseSourceRef.current = null;
    }
    carrierGainRef.current = null;
    noiseGainRef.current = null;
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      initAudio();
      spaceAudio.playTelemetryBeep(1000, 0.04);
    } else {
      stopCarrierAudio();
    }
  };

  // Update Level 1 Audio Nodes based on frequency proximity
  const updateCarrierAudio = useCallback((freq: number) => {
    if (!soundEnabled || spaceAudio.getMuted() || stage !== 'level1') {
      stopCarrierAudio();
      return;
    }

    const ctx = initAudio();
    if (!ctx) return;

    const diff = Math.abs(freq - activeCraft.targetFreq);
    const inTolerance = diff <= activeCraft.tolerance;
    const proximity = Math.max(0, 1 - diff / 3.0); // 0 to 1

    // Setup carrier oscillator if not existing
    if (!carrierOscRef.current) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      carrierOscRef.current = osc;
      carrierGainRef.current = gain;

      // Setup noise node
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1400;
      filter.Q.value = 2.0;

      const nGain = ctx.createGain();
      whiteNoise.connect(filter);
      filter.connect(nGain);
      nGain.connect(ctx.destination);
      whiteNoise.start();

      noiseSourceRef.current = whiteNoise;
      noiseGainRef.current = nGain;
    }

    if (carrierOscRef.current && carrierGainRef.current) {
      // Audible frequency resolves to 800 Hz when locked, or beat offset when tuning
      const targetAudibleFreq = inTolerance ? 800 : 800 + (freq - activeCraft.targetFreq) * 120;
      carrierOscRef.current.frequency.setTargetAtTime(targetAudibleFreq, ctx.currentTime, 0.05);

      const targetGain = inTolerance ? 0.08 : proximity * 0.04;
      carrierGainRef.current.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.05);
    }

    if (noiseGainRef.current) {
      // Noise drops as signal is locked
      const targetNoise = inTolerance ? 0.005 : Math.max(0.015, 0.06 * (1 - proximity * 0.7));
      noiseGainRef.current.gain.setTargetAtTime(targetNoise, ctx.currentTime, 0.05);
    }
  }, [soundEnabled, stage, activeCraft, initAudio, stopCarrierAudio]);

  // Clean audio on unmount or stage change
  useEffect(() => {
    return () => {
      stopCarrierAudio();
      if (level3RafRef.current) cancelAnimationFrame(level3RafRef.current);
      if (uplinkTimeoutRef.current) window.clearTimeout(uplinkTimeoutRef.current);
    };
  }, [stopCarrierAudio]);

  // Handle Level 1 Canvas Spectrum Drawing
  useEffect(() => {
    if (stage !== 'level1') return;

    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const diff = Math.abs(currentFreq - activeCraft.targetFreq);
    const inTolerance = diff <= activeCraft.tolerance;
    const proximity = Math.max(0, 1 - diff / 3.0);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // Background grid
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Center frequency target marker line
      ctx.strokeStyle = inTolerance ? 'rgba(34, 197, 94, 0.8)' : 'rgba(56, 189, 248, 0.4)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Spectrum curve
      ctx.beginPath();
      const numPoints = 80;
      const peakX = width / 2 + ((currentFreq - activeCraft.targetFreq) / 5) * (width / 2);

      for (let i = 0; i <= numPoints; i++) {
        const x = (i / numPoints) * width;
        const distFromPeak = Math.abs(x - peakX);
        const noise = (Math.random() - 0.5) * (inTolerance ? 6 : 18);

        // Peak curve amplitude
        const peakHeight = proximity * (height * 0.75);
        const peakWidth = inTolerance ? 25 : 45;
        const peakVal = Math.exp(-Math.pow(distFromPeak / peakWidth, 2)) * peakHeight;

        const y = height - 12 - peakVal + noise;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.strokeStyle = inTolerance ? '#22c55e' : proximity > 0.4 ? '#4fd8ff' : '#64748b';
      ctx.lineWidth = inTolerance ? 3 : 2;
      ctx.shadowColor = inTolerance ? '#22c55e' : '#4fd8ff';
      ctx.shadowBlur = inTolerance ? 12 : 4;
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [stage, currentFreq, activeCraft]);

  const inTolerance = Math.abs(currentFreq - activeCraft.targetFreq) <= activeCraft.tolerance + 1e-6;

  // Update Level 1 carrier audio continuously as frequency changes
  useEffect(() => {
    updateCarrierAudio(currentFreq);
  }, [currentFreq, updateCarrierAudio]);

  // Level 1: 2-Second Hold Loop (only resets when leaving tolerance, not on micro-tuning inside tolerance)
  useEffect(() => {
    if (stage !== 'level1' || level1Success) return;

    if (inTolerance) {
      const startTimestamp = performance.now();
      const interval = window.setInterval(() => {
        const elapsed = (performance.now() - startTimestamp) / 1000;
        setLockDuration(Math.min(2.0, elapsed));

        if (elapsed >= 2.0) {
          clearInterval(interval);
          lockTimerRef.current = null;
          setLevel1Success(true);
          setScore((prev) => prev + 500);
          stopCarrierAudio();
          spaceAudio.playTelemetryBeep(1200, 0.1);
          setTimeout(() => {
            spaceAudio.playTelemetryBeep(1600, 0.15);
            setStage('level1_reward');
          }, 600);
        }
      }, 50);
      lockTimerRef.current = interval;

      return () => {
        clearInterval(interval);
        lockTimerRef.current = null;
      };
    }

    setLockDuration(0);
    return undefined;
  }, [stage, inTolerance, level1Success, stopCarrierAudio]);

  // Start selected mission game
  const startGameWithCraft = (craftId: GameCraftId) => {
    if (uplinkTimeoutRef.current) {
      window.clearTimeout(uplinkTimeoutRef.current);
      uplinkTimeoutRef.current = null;
    }
    setSelectedCraftId(craftId);
    const cfg = CRAFTS[craftId];
    setCurrentFreq(cfg.initialFreq);
    setLockDuration(0);
    setLevel1Success(false);
    setDecodedLetters(new Array(cfg.word.length).fill(''));
    setAttemptsLeft(3);
    setUsedHint(false);
    setWordError(false);
    setUplinkState('idle');
    setUplinkSentTime(null);
    setPassCurrentTime(0);
    setScore(0);
    setStage('level1');
    spaceAudio.playTelemetryBeep(1100, 0.05);
  };

  // Level 2 Handlers
  const handleLetterInput = (letter: string) => {
    spaceAudio.playTelemetryBeep(1300, 0.03);
    setWordError(false);
    setDecodedLetters((prev) => {
      const emptyIdx = prev.findIndex((l) => l === '');
      if (emptyIdx === -1) return prev;
      const next = [...prev];
      next[emptyIdx] = letter.toUpperCase();
      return next;
    });
  };

  const handleBackspace = () => {
    spaceAudio.playTelemetryBeep(900, 0.03);
    setWordError(false);
    setDecodedLetters((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i >= 0; i--) {
        if (next[i] !== '') {
          next[i] = '';
          break;
        }
      }
      return next;
    });
  };

  const handleApplyHint = () => {
    if (usedHint) return;
    spaceAudio.playTelemetryBeep(1400, 0.06);
    setUsedHint(true);
    setScore((prev) => Math.max(0, prev - 150));
    // Fill first uncompleted or incorrect letter
    const targetWord = activeCraft.word;
    setDecodedLetters((prev) => {
      const next = [...prev];
      for (let i = 0; i < targetWord.length; i++) {
        if (next[i] !== targetWord[i]) {
          next[i] = targetWord[i];
          break;
        }
      }
      return next;
    });
  };

  const verifyCodeword = () => {
    const inputWord = decodedLetters.join('');
    if (inputWord === activeCraft.word) {
      spaceAudio.playTelemetryBeep(1200, 0.08);
      setTimeout(() => spaceAudio.playTelemetryBeep(1600, 0.12), 100);
      setScore((prev) => prev + 500);
      setTimeout(() => setStage('level2_reward'), 400);
    } else {
      setWordError(true);
      spaceAudio.playTelemetryBeep(400, 0.15);
      const remaining = attemptsLeft - 1;
      setAttemptsLeft(remaining);
      if (remaining <= 0) {
        // Auto-reveal for educational progression
        setDecodedLetters(activeCraft.word.split(''));
        setTimeout(() => setStage('level2_reward'), 1200);
      }
    }
  };

  // Level 3 Handlers: Horizon Pass Animation
  useEffect(() => {
    if (stage !== 'level3' || uplinkState === 'success') return;

    let lastTime = performance.now();
    const update = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      setPassCurrentTime((prev) => {
        const next = prev + dt;
        if (next >= activeCraft.passDuration) {
          // Loop pass time
          return 0;
        }
        return next;
      });

      level3RafRef.current = requestAnimationFrame(update);
    };

    level3RafRef.current = requestAnimationFrame(update);
    return () => {
      if (level3RafRef.current) cancelAnimationFrame(level3RafRef.current);
      if (uplinkTimeoutRef.current) window.clearTimeout(uplinkTimeoutRef.current);
    };
  }, [stage, uplinkState, activeCraft]);

  const sendUplinkCommand = () => {
    if (uplinkState === 'in_flight') return;
    spaceAudio.playTelemetryBeep(1500, 0.05);
    setUplinkState('in_flight');
    const sentTime = passCurrentTime;
    setUplinkSentTime(sentTime);

    // Simulate RTT delay
    if (uplinkTimeoutRef.current) window.clearTimeout(uplinkTimeoutRef.current);
    uplinkTimeoutRef.current = window.setTimeout(() => {
      uplinkTimeoutRef.current = null;
      const arrivalTime = (sentTime + activeCraft.delayRtt) % activeCraft.passDuration;

      if (arrivalTime >= activeCraft.windowStart && arrivalTime <= activeCraft.windowEnd) {
        setUplinkState('success');
        spaceAudio.playTelemetryBeep(1200, 0.08);
        setTimeout(() => spaceAudio.playTelemetryBeep(1800, 0.15), 120);
        setScore((prev) => prev + 500);
        setTimeout(() => setStage('level3_reward'), 1000);
      } else if (arrivalTime < activeCraft.windowStart) {
        setUplinkState('too_early');
        spaceAudio.playTelemetryBeep(450, 0.1);
      } else {
        setUplinkState('too_late');
        spaceAudio.playTelemetryBeep(400, 0.12);
      }
    }, activeCraft.delayRtt * 1000);
  };

  const getRewardFact = (idx: number) => {
    const item = activeCraft.rewards[idx];
    if (!item) return { fact: '', source: '' };
    return { fact: localize(item.fact), source: item.source };
  };

  const sliderId = useId();

  return (
    <section id="signal-game" className="border-t border-[color:var(--line)] bg-[color:var(--void)] py-16 sm:py-20 xl:py-[88px]">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 space-y-8">
        {/* Header with Educational Simulation Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[color:var(--line)] pb-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(55,224,200,0.35)] bg-[rgba(55,224,200,0.08)] font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--signal)] mb-3">
              <Satellite className="w-3.5 h-3.5" />
              <span>{t.signalGame.simulationBadge}</span>
              <span className="text-[color:var(--ink-3)]">|</span>
              <span className="text-[color:var(--ink-2)]">{t.signalGame.sectionTag}</span>
            </div>
            <h2 className="chapter-title">{t.signalGame.title}</h2>
            <p className="chapter-sub mt-3">{t.signalGame.subtitle}</p>
          </div>

          {/* Sound Toggle & Score Display */}
          <div className="flex items-center gap-3 self-start md:self-auto font-mono text-xs">
            <button
              onClick={toggleSound}
              className={`px-3 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
                soundEnabled
                  ? 'bg-cyan-950/60 border-cyan-700 text-cyan-300 shadow-sm shadow-cyan-950'
                  : 'bg-[color:var(--surface-2)] border-[color:var(--line)] text-[color:var(--ink-2)] hover:text-[color:var(--ink)]'
              }`}
              title="Web Audio API"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundEnabled ? t.signalGame.audioActiveBadge : t.signalGame.audioEnableBtn}</span>
            </button>

            {stage !== 'select' && (
              <div className="px-3.5 py-2 bg-[color:var(--surface-2)] border border-[color:var(--line)] rounded-lg text-[color:var(--ink-2)] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{score} PTS</span>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* SCREEN 1: CRAFT SELECTION                                      */}
        {/* ============================================================== */}
        {stage === 'select' && (
          <div className="space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[color:var(--ink-2)] flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.signalGame.selectCraftPrompt}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(Object.keys(CRAFTS) as GameCraftId[]).map((craftKey) => {
                const c = CRAFTS[craftKey];
                const isSelected = selectedCraftId === craftKey;
                return (
                  <button
                    key={craftKey}
                    onClick={() => {
                      setSelectedCraftId(craftKey);
                      spaceAudio.playTelemetryBeep(1100, 0.03);
                    }}
                    className={`text-left p-5 rounded-xl border transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[color:var(--surface-2)]/90 border-cyan-500 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500'
                        : 'bg-[color:var(--surface)]/70 border-[color:var(--line)] hover:border-[color:var(--line-strong)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[color:var(--surface-2)] text-[color:var(--ink-2)] border border-[color:var(--line-strong)]">
                          {t.signalGame[c.difficultyKey]}
                        </span>
                        <span className="text-xs font-mono text-cyan-400">{c.targetFreq.toFixed(1)} MHz</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-[color:var(--ink)] uppercase tracking-tight">
                        {t.signalGame[c.nameKey]}
                      </h3>
                      <p className="text-xs text-[color:var(--ink-2)] mt-2 leading-relaxed">
                        {t.signalGame[c.descKey]}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[color:var(--line)] flex items-center justify-between text-[11px] font-mono text-[color:var(--ink-3)]">
                      <span>Uplink RTT: ~{c.delayRtt}s</span>
                      <span className={isSelected ? 'text-cyan-400 font-bold' : ''}>
                        {isSelected ? `✓ ${t.signalGame.selectedBtn}` : t.signalGame.selectBtn}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => startGameWithCraft(selectedCraftId)}
                className="px-8 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-[#04101f] font-bold rounded-xl font-mono uppercase tracking-wider transition-all transform active:scale-95 shadow-lg shadow-cyan-900/30 flex items-center gap-2 text-sm cursor-pointer"
              >
                <span>{t.signalGame.startSimulationBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* LEVEL 1: CATCH THE CARRIER FREQUENCY                           */}
        {/* ============================================================== */}
        {stage === 'level1' && (
          <div className="bg-[color:var(--surface)] border border-[color:var(--line)] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[color:var(--line)] pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{t.signalGame.level1Tag}</span>
                <h3 className="font-display text-2xl font-bold text-[color:var(--ink)] uppercase tracking-tight mt-0.5">
                  {t.signalGame.level1Title}
                </h3>
              </div>
              <div className="text-xs font-mono text-[color:var(--ink-2)] bg-[color:var(--surface-2)] px-3 py-1.5 rounded-lg border border-[color:var(--line)] self-start sm:self-auto">
                {t.signalGame.targetLabel}{' '}
                <span className="text-[color:var(--ink)] font-bold">{t.signalGame[activeCraft.nameKey]}</span>
              </div>
            </div>

            <p className="text-sm text-[color:var(--ink-2)] leading-relaxed max-w-3xl">
              {t.signalGame.level1Desc}
            </p>

            {/* Spectrum Visualizer Canvas */}
            <div className="relative rounded-xl border border-[color:var(--line)] bg-[#070b13] overflow-hidden p-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-[color:var(--ink-2)] px-2 pb-1">
                <span>DSN SPECTRUM ANALYZER</span>
                <span className={inTolerance ? 'text-green-400 font-bold' : 'text-[color:var(--ink-3)]'}>
                  {inTolerance ? '● LOCK ACQUIRED' : '○ SEARCHING...'}
                </span>
              </div>
              <canvas
                ref={canvasRef}
                width={800}
                height={160}
                className="w-full h-36 sm:h-44 rounded bg-[color:var(--surface)]/80 block"
              />
            </div>

            {/* Frequency Tuning Slider Controls */}
            <div className="p-5 bg-[color:var(--surface-2)]/60 border border-[color:var(--line)] rounded-xl space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <label htmlFor={sliderId} className="text-[color:var(--ink-2)] uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.signalGame.frequencyLabel}</span>
                </label>
                <div className="text-lg font-bold text-cyan-300 font-mono">
                  {currentFreq.toFixed(2)} <span className="text-xs text-[color:var(--ink-2)]">MHz</span>
                </div>
              </div>

              <input
                id={sliderId}
                type="range"
                min="2290.0"
                max="2300.0"
                step="0.05"
                value={currentFreq}
                onChange={(e) => setCurrentFreq(parseFloat(e.target.value))}
                className="w-full h-2.5 bg-[color:var(--surface-2)] rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <div className="flex justify-between text-[10px] font-mono text-[color:var(--ink-3)]">
                <span>2290.0 MHz</span>
                <span className="text-[color:var(--ink-2)]">{t.signalGame.bandLabel}</span>
                <span>2300.0 MHz</span>
              </div>
            </div>

            {/* Lock Hold Progress Indicator */}
            <div className="p-4 bg-[color:var(--surface-2)]/40 border border-[color:var(--line)] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <div className={`w-3.5 h-3.5 rounded-full ${lockDuration > 0 ? 'bg-green-500 animate-ping' : 'bg-slate-700'}`} />
                <div>
                  <div className="font-bold text-[color:var(--ink)] uppercase">{t.signalGame.holdingLabel} {lockDuration.toFixed(1)} / 2.0s</div>
                  <div className="text-[11px] text-[color:var(--ink-2)]">{t.signalGame.holdTargetNote}</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full sm:w-64 h-3 bg-[color:var(--surface-2)] rounded-full overflow-hidden border border-[color:var(--line-strong)]">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-green-400 transition-all duration-75"
                  style={{ width: `${(lockDuration / 2.0) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* REWARD CARD MODAL / INLINE                                     */}
        {/* ============================================================== */}
        {(stage === 'level1_reward' || stage === 'level2_reward' || stage === 'level3_reward') && (
          <div className="bg-[color:var(--surface)] border border-cyan-900/60 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl shadow-cyan-950/20">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              <Award className="w-4 h-4 text-[color:var(--ink-2)]" />
              <span>{t.signalGame.rewardTitle}</span>
            </div>

            <div className="p-5 bg-cyan-950/20 border border-cyan-800/40 rounded-xl space-y-3">
              <h4 className="font-display text-xl font-bold text-[color:var(--ink)] uppercase tracking-tight">
                {t.signalGame[activeCraft.nameKey]}
              </h4>
              <p className="text-sm text-[color:var(--ink)] leading-relaxed">
                {stage === 'level1_reward' && getRewardFact(0).fact}
                {stage === 'level2_reward' && getRewardFact(1).fact}
                {stage === 'level3_reward' && getRewardFact(2).fact}
              </p>
              <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-between text-xs font-mono">
                <span className="text-[color:var(--ink-2)]">{t.signalGame.factSourceLabel}:</span>
                <a
                  href={
                    stage === 'level1_reward'
                      ? getRewardFact(0).source
                      : stage === 'level2_reward'
                      ? getRewardFact(1).source
                      : getRewardFact(2).source
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 underline"
                >
                  <span>NASA Science Archives</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  spaceAudio.playTelemetryBeep(1200, 0.04);
                  if (stage === 'level1_reward') setStage('level2');
                  else if (stage === 'level2_reward') setStage('level3');
                  else if (stage === 'level3_reward') setStage('victory');
                }}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-[#04101f] font-bold font-mono text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>{stage === 'level3_reward' ? t.signalGame.victoryTitle : t.signalGame.nextLevelBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* LEVEL 2: DECODE THE PACKET                                     */}
        {/* ============================================================== */}
        {stage === 'level2' && (
          <div className="bg-[color:var(--surface)] border border-[color:var(--line)] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[color:var(--line)] pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{t.signalGame.level2Tag}</span>
                <h3 className="font-display text-2xl font-bold text-[color:var(--ink)] uppercase tracking-tight mt-0.5">
                  {t.signalGame.level2Title}
                </h3>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-[color:var(--ink-2)]">{t.signalGame.attemptsLeft}</span>
                <span className="px-2 py-0.5 rounded bg-[color:var(--blue-deep)]/40 text-[color:var(--cyan)] border border-[color:var(--line-strong)] font-bold">
                  {attemptsLeft} / 3
                </span>
              </div>
            </div>

            <p className="text-sm text-[color:var(--ink-2)] leading-relaxed">
              {t.signalGame.level2Desc}
            </p>

            {/* Received Glyph Packet Display */}
            <div className="p-6 bg-[color:var(--surface-2)]/60 border border-[color:var(--line)] rounded-xl space-y-4 text-center">
              <div className="text-xs font-mono uppercase text-[color:var(--ink-2)] tracking-wider">
                {t.signalGame.packetLabel}
              </div>

              {/* Glyph Cards & Letter Guess Slots */}
              <div dir="ltr" className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                {activeCraft.glyphs.map((glyph, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    {/* Alien Glyph Symbol Card */}
                    <div className="w-12 h-14 sm:w-14 sm:h-16 rounded-lg bg-black border border-cyan-800/80 flex items-center justify-center text-cyan-300 text-2xl font-mono shadow-inner shadow-cyan-950">
                      {glyph}
                    </div>
                    {/* Decoded Letter Box */}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 flex items-center justify-center text-xl font-mono font-bold transition-all ${
                        wordError
                          ? 'border-[color:var(--cyan)] bg-[color:var(--blue)]/40 text-[color:var(--cyan)]'
                          : decodedLetters[idx]
                          ? 'border-cyan-400 bg-cyan-950/30 text-[color:var(--ink)]'
                          : 'border-[color:var(--line-strong)] bg-[color:var(--surface-2)] text-[color:var(--ink-3)]'
                      }`}
                    >
                      {decodedLetters[idx] || '_'}
                    </div>
                  </div>
                ))}
              </div>

              {wordError && (
                <div className="text-xs font-mono text-[color:var(--cyan)] animate-pulse">
                  {t.signalGame.wrongAttemptNotice}
                </div>
              )}
            </div>

            {/* Rosetta Stone Reference Table */}
            <div className="p-5 bg-[color:var(--surface-2)]/40 border border-[color:var(--line)] rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[color:var(--ink-2)]">
                <span className="uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  {t.signalGame.rosettaTitle}
                </span>
                <button
                  onClick={handleApplyHint}
                  disabled={usedHint}
                  className="px-2.5 py-1 bg-[color:var(--surface-2)] border border-[color:var(--line-strong)] rounded text-[color:var(--ink-2)] text-[11px] hover:bg-[color:var(--surface-2)] disabled:opacity-40 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>{t.signalGame.hintBtn}</span>
                </button>
              </div>

              {/* Clickable glyphs / letters */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {ROSETTA_ALPHABET.map((item) => (
                  <button
                    key={item.letter}
                    onClick={() => handleLetterInput(item.letter)}
                    className="p-2.5 rounded-lg bg-[color:var(--surface)] border border-[color:var(--line)] hover:border-cyan-500 hover:bg-[color:var(--surface-2)] text-center font-mono transition-all group flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="text-cyan-400 text-lg group-hover:scale-110 transition-transform">{item.glyph}</span>
                    <span className="text-[color:var(--ink-3)] text-xs">→</span>
                    <span className="text-[color:var(--ink)] font-bold text-sm">{item.letter}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Action Controls */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={handleBackspace}
                className="px-4 py-2.5 bg-[color:var(--surface-2)] hover:bg-slate-700 text-[color:var(--ink)] rounded-lg font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                {t.signalGame.clearBtn}
              </button>

              <button
                onClick={verifyCodeword}
                disabled={decodedLetters.some((l) => l === '')}
                className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-[#04101f] font-bold rounded-lg font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                {t.signalGame.submitWordBtn}
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* LEVEL 3: DELAYED UPLINK COMMAND TIMING                         */}
        {/* ============================================================== */}
        {stage === 'level3' && (
          <div className="bg-[color:var(--surface)] border border-[color:var(--line)] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[color:var(--line)] pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{t.signalGame.level3Tag}</span>
                <h3 className="font-display text-2xl font-bold text-[color:var(--ink)] uppercase tracking-tight mt-0.5">
                  {t.signalGame.level3Title}
                </h3>
              </div>
              <div className="text-xs font-mono text-[color:var(--ink-2)] bg-[color:var(--surface-2)] px-3 py-1 rounded-lg border border-[color:var(--line)] self-start sm:self-auto">
                DSN RTT: <span className="text-cyan-400 font-bold">{activeCraft.delayRtt}s</span>
              </div>
            </div>

            <p className="text-sm text-[color:var(--ink-2)] leading-relaxed max-w-3xl">
              {t.signalGame.level3Desc}
            </p>

            {/* Visual Timeline Window */}
            <div className="p-6 bg-[color:var(--surface-2)]/60 border border-[color:var(--line)] rounded-xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[color:var(--ink-2)]">
                <span>{t.signalGame.receptionWindowLabel}</span>
                <span>
                  {t.signalGame.optimalLabel} {activeCraft.windowStart.toFixed(1)}s – {activeCraft.windowEnd.toFixed(1)}s
                </span>
              </div>

              {/* Pass timeline bar */}
              <div className="relative h-12 bg-[color:var(--surface)] border border-[color:var(--line)] rounded-lg overflow-hidden">
                {/* Safe Reception Green Zone */}
                <div
                  className="absolute top-0 bottom-0 bg-green-950/60 border-x-2 border-green-500/80 flex items-center justify-center text-[10px] font-mono text-green-300 uppercase tracking-wider"
                  style={{
                    left: `${(activeCraft.windowStart / activeCraft.passDuration) * 100}%`,
                    width: `${((activeCraft.windowEnd - activeCraft.windowStart) / activeCraft.passDuration) * 100}%`
                  }}
                >
                  <span className="hidden sm:inline">{t.signalGame.ackWindowLabel}</span>
                </div>

                {/* Moving Current Horizon Time Cursor */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-cyan-400 z-10"
                  style={{
                    left: `${(passCurrentTime / activeCraft.passDuration) * 100}%`
                  }}
                >
                  <div className="absolute -top-1 -left-1.5 w-4 h-4 rounded-full bg-cyan-400 shadow-md shadow-cyan-500" />
                </div>

                {/* Projected ACK return indicator */}
                {uplinkSentTime !== null && uplinkState === 'in_flight' && (
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-[color:var(--cyan)] border-dashed border-l z-10"
                    style={{
                      left: `${(((uplinkSentTime + activeCraft.delayRtt) % activeCraft.passDuration) / activeCraft.passDuration) * 100}%`
                    }}
                  >
                    <div className="absolute bottom-1 -left-1 w-2.5 h-2.5 rounded-full bg-[color:var(--cyan)] animate-ping" />
                  </div>
                )}
              </div>

              <div className="flex justify-between text-[10px] font-mono text-[color:var(--ink-3)]">
                <span>{t.signalGame.sunriseLabel}</span>
                <span className="text-cyan-400 font-bold">T = {passCurrentTime.toFixed(1)}s</span>
                <span>
                  {activeCraft.passDuration.toFixed(1)}s ({t.signalGame.sunsetLabel})
                </span>
              </div>
            </div>

            {/* Status Message */}
            <div className="p-4 rounded-xl border font-mono text-xs flex items-center gap-3 bg-[color:var(--surface-2)]/40 border-[color:var(--line)]">
              {uplinkState === 'idle' && (
                <div className="text-[color:var(--ink-2)] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>
                    {t.signalGame.uplinkHint} {activeCraft.delayRtt}s
                  </span>
                </div>
              )}
              {uplinkState === 'in_flight' && (
                <div className="text-[color:var(--ink-2)] flex items-center gap-2">
                  <Zap className="w-4 h-4 animate-bounce" />
                  <span>{t.signalGame.transmittingState}</span>
                </div>
              )}
              {uplinkState === 'success' && (
                <div className="text-green-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.signalGame.ackReceivedState}</span>
                </div>
              )}
              {uplinkState === 'too_early' && (
                <div className="text-[color:var(--ink-2)] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{t.signalGame.tooEarlyState}</span>
                </div>
              )}
              {uplinkState === 'too_late' && (
                <div className="text-[color:var(--cyan)] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{t.signalGame.tooLateState}</span>
                </div>
              )}
            </div>

            {/* Uplink Command Button */}
            <div className="flex justify-center pt-2">
              {uplinkState === 'too_early' || uplinkState === 'too_late' ? (
                <button
                  onClick={() => setUplinkState('idle')}
                  className="px-6 py-3 bg-[color:var(--surface-2)] hover:bg-slate-700 text-[color:var(--ink)] font-mono text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.signalGame.retryBtn}</span>
                </button>
              ) : (
                <button
                  onClick={sendUplinkCommand}
                  disabled={uplinkState === 'in_flight' || uplinkState === 'success'}
                  className="px-8 py-3.5 bg-[color:var(--blue)] hover:bg-[color:var(--cyan)] disabled:opacity-40 disabled:cursor-not-allowed text-[color:var(--ink)] font-bold rounded-xl font-mono uppercase tracking-wider transition-all transform active:scale-95 shadow-lg shadow-[color:var(--blue)]/25 flex items-center gap-2 text-sm cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>{t.signalGame.sendCommandBtn}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VICTORY SCREEN                                                 */}
        {/* ============================================================== */}
        {stage === 'victory' && (
          <div className="bg-[color:var(--surface)] border border-green-900/60 rounded-2xl p-8 sm:p-10 text-center space-y-6 shadow-2xl shadow-green-950/20">
            <div className="w-16 h-16 rounded-full bg-green-950/80 border border-green-500 text-green-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-mono text-green-400 uppercase tracking-widest mb-1">
                MISSION ACCOMPLISHED // DSN LINK SECURED
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[color:var(--ink)] uppercase tracking-tight">
                {t.signalGame.victoryTitle}
              </h3>
              <p className="text-sm text-[color:var(--ink-2)] mt-2 max-w-xl mx-auto leading-relaxed">
                {t.signalGame.victorySubtitle}
              </p>
            </div>

            {/* Score Summary Box */}
            <div className="p-6 bg-[color:var(--surface-2)]/60 border border-[color:var(--line)] rounded-xl max-w-md mx-auto space-y-3 font-mono">
              <div className="text-xs text-[color:var(--ink-2)] uppercase">{t.signalGame.scoreLabel}</div>
              <div className="text-4xl font-extrabold text-[color:var(--ink-2)]">{score} PTS</div>
              <div className="text-xs text-green-400">★★★ {t.signalGame.stagesCompleted}</div>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setStage('select')}
                className="px-8 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-[#04101f] font-bold rounded-xl font-mono uppercase tracking-wider transition-all transform active:scale-95 shadow-lg shadow-cyan-900/30 flex items-center gap-2 text-sm cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.signalGame.playAgainBtn}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
