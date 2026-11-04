import React from 'react';
import { MarineStation, TelemetrySnapshot, SensorLogEntry, ClimateStressType } from '../../types';
import { StationDossier } from './StationDossier';
import { TelemetryMetricCard } from './TelemetryMetricCard';
import { LiveStreamLog } from './LiveStreamLog';
import { 
  Thermometer, 
  Droplet, 
  Sparkles, 
  Wind, 
  Activity, 
  Volume2, 
  Flame, 
  RotateCcw 
} from 'lucide-react';

interface ObservatoryViewProps {
  station: MarineStation;
  snapshot: TelemetrySnapshot;
  history: TelemetrySnapshot[];
  logs: SensorLogEntry[];
  activeStress: ClimateStressType | null;
  onOpenAnomalyModal: () => void;
  onClearStress: () => void;
  onClearLogs: () => void;
}

export const ObservatoryView: React.FC<ObservatoryViewProps> = ({
  station,
  snapshot,
  history,
  logs,
  activeStress,
  onOpenAnomalyModal,
  onClearStress,
  onClearLogs
}) => {
  // Extract historical arrays for sparklines
  const tempHistory = history.map((h) => h.temperature);
  const phHistory = history.map((h) => h.ph);
  const aragoniteHistory = history.map((h) => h.aragoniteSaturation);
  const doHistory = history.map((h) => h.dissolvedOxygen);
  const chlHistory = history.map((h) => h.chlorophyllA);
  const biomassHistory = history.map((h) => h.acousticBiomassIndex);

  // Compute status tones and labels dynamically
  const tempDelta = +(snapshot.temperature - station.baseline.temperature).toFixed(2);
  const tempTone = tempDelta > 1.5 ? 'coral' : tempDelta > 0.6 ? 'amber' : 'emerald';
  const tempStatus = tempDelta > 1.5 ? 'Thermal Shock' : tempDelta > 0.6 ? 'Elevated SST' : 'Equilibrium';

  const phDelta = +(snapshot.ph - station.baseline.ph).toFixed(3);
  const phTone = snapshot.ph < 7.95 ? 'coral' : snapshot.ph < 8.08 ? 'amber' : 'emerald';
  const phStatus = snapshot.ph < 7.95 ? 'Acidification' : snapshot.ph < 8.08 ? 'Depressed' : 'Alkaline Buffered';

  const aragDelta = +(snapshot.aragoniteSaturation - station.baseline.aragonite).toFixed(2);
  const aragTone = snapshot.aragoniteSaturation < 3.2 ? 'coral' : snapshot.aragoniteSaturation < 3.6 ? 'amber' : 'emerald';
  const aragStatus = snapshot.aragoniteSaturation < 3.2 ? 'Critical Corrosive' : snapshot.aragoniteSaturation < 3.6 ? 'Low Calcification' : 'Optimal Calcification';

  const doDelta = +(snapshot.dissolvedOxygen - station.baseline.dissolvedOxygen).toFixed(2);
  const doTone = snapshot.dissolvedOxygen < 4.2 ? 'coral' : snapshot.dissolvedOxygen < 5.8 ? 'amber' : 'biolum';
  const doStatus = snapshot.dissolvedOxygen < 4.2 ? 'Hypoxic Stress' : snapshot.dissolvedOxygen < 5.8 ? 'Sub-optimal DO' : 'Oxygen Saturated';

  const chlDelta = +(snapshot.chlorophyllA - station.baseline.chlorophyllA).toFixed(3);
  const chlTone = snapshot.chlorophyllA > 2.0 ? 'amber' : chlDelta < -0.1 ? 'biolum' : 'emerald';
  const chlStatus = snapshot.chlorophyllA > 2.0 ? 'Eutrophic Bloom' : 'Oligotrophic Pristine';

  const bioDelta = +(snapshot.acousticBiomassIndex - station.baseline.acousticBiomass).toFixed(1);
  const bioTone = snapshot.acousticBiomassIndex < 50 ? 'coral' : snapshot.acousticBiomassIndex < 62 ? 'amber' : 'emerald';
  const bioStatus = snapshot.acousticBiomassIndex < 50 ? 'Acoustic Silence' : snapshot.acousticBiomassIndex < 62 ? 'Moderate Activity' : 'Vibrant Biophony';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Active Anomaly Alert Banner */}
      {activeStress && (
        <div className="rounded-2xl p-4 bg-gradient-to-r from-coral-950/80 via-abyss-900 to-coral-950/80 border border-coral-500/40 shadow-glow-coral flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-coral-500/20 text-coral-400 border border-coral-500/30">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sand-50 text-sm flex items-center space-x-2">
                <span>SIMULATED CLIMATE ANOMALY IN PROGRESS:</span>
                <span className="uppercase text-coral-300 font-mono tracking-wider">{activeStress}</span>
              </h4>
              <p className="text-xs text-sand-300">
                Oceanographic sensor grid telemetry reflects environmental forcing parameters. Observe multi-metric cascade dynamics.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={onClearStress}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-coral-500 hover:bg-coral-400 text-abyss-950 font-bold text-xs transition-all shadow-md"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore Equilibrium</span>
            </button>
          </div>
        </div>
      )}

      {/* Station Overview Dossier & Health Gauges */}
      <StationDossier
        station={station}
        snapshot={snapshot}
        onOpenAnomalyModal={onOpenAnomalyModal}
      />

      {/* 6 Biogeochemical Metric Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-lagoon-400" />
            <h2 className="font-display font-semibold text-lg text-sand-50">
              Real-Time Biogeochemical Telemetry
            </h2>
          </div>
          <span className="text-xs font-mono text-sand-400">
            Autonomous In-Situ Acoustic & Optical Profilers
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. Sea Surface Temperature */}
          <TelemetryMetricCard
            title="Sea Surface Temperature"
            subtitle="SST Radiometer & Mooring CTD"
            value={snapshot.temperature}
            unit="°C"
            anomalyDelta={tempDelta}
            baseline={station.baseline.temperature}
            statusLabel={tempStatus}
            statusTone={tempTone}
            historyValues={tempHistory}
            icon={<Thermometer className="w-5 h-5" />}
            scientificContext={{
              description: 'Key thermodynamic driver of coral reef metabolism, photosynthetic efficiency, and symbiotic dinoflagellate retention.',
              optimalRange: `${(station.baseline.temperature - 0.5).toFixed(1)} - ${(station.baseline.temperature + 0.8).toFixed(1)} °C`,
              criticalThreshold: `> ${(station.baseline.temperature + 1.2).toFixed(1)} °C (Degree Heating Week accumulation)`,
              consequences: 'Prolonged positive thermal anomalies trigger reactive oxygen species (ROS) cellular damage and coral bleaching.'
            }}
          />

          {/* 2. Seawater pH */}
          <TelemetryMetricCard
            title="Seawater Acidity (pH)"
            subtitle="SeaFET Dual pH Sensor Electrode"
            value={snapshot.ph}
            unit="pH"
            anomalyDelta={phDelta}
            baseline={station.baseline.ph}
            statusLabel={phStatus}
            statusTone={phTone}
            historyValues={phHistory}
            icon={<Droplet className="w-5 h-5" />}
            scientificContext={{
              description: 'Logarithmic measure of hydrogen ion activity in seawater, governed by ocean uptake of atmospheric carbon dioxide.',
              optimalRange: '8.10 - 8.25 pH',
              criticalThreshold: '< 7.95 pH (Severe Acidification)',
              consequences: 'Drop in pH reduces carbonate ion availability, hindering biocalcification in corals, mollusks, and foraminifera.'
            }}
          />

          {/* 3. Aragonite Saturation State */}
          <TelemetryMetricCard
            title="Aragonite Saturation"
            subtitle="Calcification Mineral Index (Ω_arg)"
            value={snapshot.aragoniteSaturation}
            unit="Ω"
            anomalyDelta={aragDelta}
            baseline={station.baseline.aragonite}
            statusLabel={aragStatus}
            statusTone={aragTone}
            historyValues={aragoniteHistory}
            icon={<Sparkles className="w-5 h-5" />}
            scientificContext={{
              description: 'The chemical thermodynamic potential for calcium carbonate (aragonite) mineral precipitation vs dissolution.',
              optimalRange: '3.80 - 4.25 Ω',
              criticalThreshold: '< 3.00 Ω (Net Coral Dissolution Zone)',
              consequences: 'When Ω_arg drops below 3.0, skeletal accretion slows significantly; below 1.0, existing coral skeletons dissolve.'
            }}
          />

          {/* 4. Dissolved Oxygen */}
          <TelemetryMetricCard
            title="Dissolved Oxygen"
            subtitle="Aanderaa Optical DO Optode"
            value={snapshot.dissolvedOxygen}
            unit="mg/L"
            anomalyDelta={doDelta}
            baseline={station.baseline.dissolvedOxygen}
            statusLabel={doStatus}
            statusTone={doTone}
            historyValues={doHistory}
            icon={<Wind className="w-5 h-5" />}
            scientificContext={{
              description: 'Concentration of free, non-compound oxygen molecules dissolved in water, vital for aerobic marine respiration.',
              optimalRange: '6.50 - 7.50 mg/L',
              criticalThreshold: '< 4.00 mg/L (Hypoxia threshold)',
              consequences: 'Hypoxia causes physiological stress, respiratory distress in reef fishes, and nocturnal coral suffocation.'
            }}
          />

          {/* 5. Chlorophyll-A Fluorescence */}
          <TelemetryMetricCard
            title="Chlorophyll-A Biomass"
            subtitle="Bio-Optical Fluorometer (WET Labs)"
            value={snapshot.chlorophyllA}
            unit="µg/L"
            anomalyDelta={chlDelta}
            baseline={station.baseline.chlorophyllA}
            statusLabel={chlStatus}
            statusTone={chlTone}
            historyValues={chlHistory}
            icon={<Activity className="w-5 h-5" />}
            scientificContext={{
              description: 'Primary proxy for phytoplankton biomass and nutrient enrichment in the photic water column.',
              optimalRange: '0.15 - 0.45 µg/L (Pristine Oligotrophic)',
              criticalThreshold: '> 2.00 µg/L (Eutrophication / Bloom)',
              consequences: 'Excessive phytoplankton blooms attenuate sunlight reaching zooxanthellae and fuel suffocating macroalgal overgrowth.'
            }}
          />

          {/* 6. Acoustic Biomass Index */}
          <TelemetryMetricCard
            title="Acoustic Biophony Index"
            subtitle="High-Sensitivity Hydrophone Network"
            value={snapshot.acousticBiomassIndex}
            unit="dB"
            anomalyDelta={bioDelta}
            baseline={station.baseline.acousticBiomass}
            statusLabel={bioStatus}
            statusTone={bioTone}
            historyValues={biomassHistory}
            icon={<Volume2 className="w-5 h-5" />}
            scientificContext={{
              description: 'Integral sound pressure level of biological reef frequencies (1 kHz - 24 kHz) generated by snapping shrimp and vocal fauna.',
              optimalRange: '65.0 - 78.0 dB (Vibrant Healthy Reef)',
              criticalThreshold: '< 52.0 dB (Degraded Acoustic Desert)',
              consequences: 'Pelagic coral and fish larvae navigate toward healthy reef soundscapes; silent degraded reefs fail to recruit new recruits.'
            }}
          />
        </div>
      </div>

      {/* Live Packet Streaming Console */}
      <LiveStreamLog
        logs={logs}
        onClearLogs={onClearLogs}
      />
    </div>
  );
};
