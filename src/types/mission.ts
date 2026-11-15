import { LocalizedText } from '../i18n/types';

export type Destination = 'Moon' | 'Mars';

export type VehicleType =
  | 'Rover'
  | 'Lander'
  | 'Lunar Roving Vehicle'
  | 'Atmospheric Helicopter'
  | 'Seismic Station'
  | LocalizedText;

export type MissionStatusType = 'silent' | 'complete' | 'active';

export interface Milestone {
  date: string;
  title: string | LocalizedText;
  description: string | LocalizedText;
}

export interface Specification {
  label: string | LocalizedText;
  value: string | LocalizedText;
}

export type QuoteType = 'telemetry' | 'interpretation' | 'team_message';

export interface MissionQuote {
  text: string | LocalizedText;
  speaker: string | LocalizedText;
  context: string | LocalizedText;
  type?: QuoteType;
  typeLabel?: string | LocalizedText;
  sourceUrl?: string;
}

export type SignalFadeType =
  | 'jerky_noise_burst'   // Opportunity: intermittent signal, rising storm noise, power dropping in bursts
  | 'smooth_drift_freeze' // Spirit: slow downward frequency drift from cold, sparse weak packets
  | 'stable_then_click'   // InSight: clean steady tone, sparse packets, smooth decay and a relay click
  | 'instant_cutoff'      // Apollo 17 ALSEP: stable steady signal with no decay, instant commanded cut-off
  | 'active_pause_note';  // Ingenuity: brisk steady signal ending with a check-in pause tone (craft alive)

export interface SignalAudioScenario {
  id: string;
  carrierFreq: number;
  duration: number;
  fadeType: SignalFadeType;
  noiseBaseLevel: number;
  noiseGrowth: number;
  packetInterval: number;
  cutoffTimeRatio?: number;
  pauseNoteFreq?: number;
}

export interface Mission {
  id: string;
  name: string | LocalizedText;
  englishName: string;
  designation: string;
  destination: Destination;
  type: VehicleType;
  launchDate: string | LocalizedText;
  landingDate: string | LocalizedText;
  lastContactDate?: string | LocalizedText;
  activeSpan: string | LocalizedText;
  status: string | LocalizedText;
  statusType: MissionStatusType;
  coordinates: {
    lat: string;
    lon: string;
    latNum?: number;
    lonNum?: number;
    formatted: string | LocalizedText;
  };
  nasaSearchQuery?: string;
  orbitalSearchQuery?: string;
  locationName: string | LocalizedText;
  missionDuration: string | LocalizedText;
  distanceTraveled?: string | LocalizedText;
  image: string;
  schematicType: 'rover' | 'lander' | 'rover-buggy' | 'helicopter' | 'station';
  shortDescription: string | LocalizedText;
  howGotThere: string | LocalizedText;
  whatDidItDo: string | LocalizedText;
  lastContactStory: string | LocalizedText;
  whereIsItNow: string | LocalizedText;
  source?: string;
  quote?: MissionQuote;
  specs: Specification[];
  milestones: Milestone[];
  signalData?: {
    sol?: number;
    frequency?: string | LocalizedText;
    lastTelemetry?: string | LocalizedText;
    fadeReason: string | LocalizedText;
    sourceUrl?: string;
  };
}

export interface WorldInfo {
  id: Destination;
  name: string | LocalizedText;
  englishName: string;
  tagline: string | LocalizedText;
  description: string | LocalizedText;
  stats: {
    objectsCount: number;
    missionsCount: string | LocalizedText;
    timeSpan: string;
    distanceFromEarth: string | LocalizedText;
    environment: string | LocalizedText;
    surfaceTemp: string | LocalizedText;
  };
}
