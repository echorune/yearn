// Thalassa Bio-Marine OS - Domain Types

export type BleachingRiskLevel = 'None' | 'Watch' | 'Warning' | 'Alert Level 1' | 'Alert Level 2';

export type AlertSeverity = 'normal' | 'advisory' | 'warning' | 'critical';

export type SimulationSpeed = 1 | 5 | 20;

export type ClimateStressType = 'heatwave' | 'acidification' | 'hypoxia' | 'algal_bloom';

export type ActiveTab = 'observatory' | 'bathymetry' | 'acoustics' | 'restoration' | 'ledger';

export interface TelemetrySnapshot {
  timestamp: number;
  timeDisplay: string;
  temperature: number; // °C
  temperatureAnomaly: number; // °C relative to 30yr baseline
  ph: number;
  aragoniteSaturation: number; // Ω_arg
  dissolvedOxygen: number; // mg/L
  chlorophyllA: number; // µg/L
  turbidityNTU: number; // NTU
  acousticBiomassIndex: number; // dB
  salinityPSU: number; // PSU
  coralBleachingRisk: BleachingRiskLevel;
  degreeHeatingWeeks: number; // °C-weeks
  currentSpeedKnots: number;
  currentDirectionDeg: number;
  waveHeightMeters: number;
  solarRadiationPAR: number; // µmol photons/m²/s
}

export interface TelemetryTimeSeries {
  metricKey: keyof TelemetrySnapshot;
  dataPoints: Array<{ time: string; value: number }>;
}

export interface SensorLogEntry {
  id: string;
  timestamp: string;
  epoch: number;
  stationId: string;
  sensorCode: string;
  severity: AlertSeverity;
  metric: string;
  value: string;
  message: string;
}

export interface MarineStation {
  id: string;
  name: string;
  shortCode: string;
  region: string;
  ocean: string;
  coordinates: {
    lat: number;
    lng: number;
    latDMS: string;
    lngDMS: string;
  };
  depthMeters: {
    min: number;
    max: number;
    average: number;
  };
  mpaCategory: string; // e.g. "Strict Nature Reserve (IUCN Ia)"
  primaryEcosystem: string;
  description: string;
  baseline: {
    temperature: number;
    ph: number;
    aragonite: number;
    dissolvedOxygen: number;
    chlorophyllA: number;
    turbidity: number;
    acousticBiomass: number;
  };
  activeSensors: {
    buoys: number;
    gliders: number;
    hydrophones: number;
    benthicRovers: number;
  };
  healthScore: number; // 0 - 100
  dominantClade: string;
  coralCoveragePct: number;
}

export interface SimulationState {
  isRunning: boolean;
  speedMultiplier: SimulationSpeed;
  activeStress: ClimateStressType | null;
  stressRemainingTicks: number;
  ticks: number;
  simulatedDate: Date;
}
