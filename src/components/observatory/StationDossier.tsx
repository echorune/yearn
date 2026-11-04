import React from 'react';
import { MarineStation, TelemetrySnapshot } from '../../types';
import { 
  ShieldCheck, 
  MapPin, 
  Layers, 
  Radio, 
  Wind, 
  Compass, 
  Sun, 
  ThermometerSnowflake, 
  Waves
} from 'lucide-react';

interface StationDossierProps {
  station: MarineStation;
  snapshot: TelemetrySnapshot;
  onOpenAnomalyModal: () => void;
}

export const StationDossier: React.FC<StationDossierProps> = ({
  station,
  snapshot,
  onOpenAnomalyModal
}) => {
  // Bleaching risk level badge styles
  const bleachingStyles = {
    'None': {
      bg: 'bg-lagoon-500/15',
      text: 'text-lagoon-300',
      border: 'border-lagoon-500/30',
      barColor: 'bg-lagoon-500',
      barWidth: '15%'
    },
    'Watch': {
      bg: 'bg-sunburst-400/15',
      text: 'text-sunburst-300',
      border: 'border-sunburst-400/30',
      barColor: 'bg-sunburst-400',
      barWidth: '35%'
    },
    'Warning': {
      bg: 'bg-sunburst-500/20',
      text: 'text-sunburst-400',
      border: 'border-sunburst-500/40',
      barColor: 'bg-sunburst-500',
      barWidth: '60%'
    },
    'Alert Level 1': {
      bg: 'bg-coral-500/20',
      text: 'text-coral-400',
      border: 'border-coral-500/40',
      barColor: 'bg-coral-500',
      barWidth: '85%'
    },
    'Alert Level 2': {
      bg: 'bg-coral-600/30 animate-pulse',
      text: 'text-coral-300 font-bold',
      border: 'border-coral-500/60 shadow-glow-coral',
      barColor: 'bg-coral-600',
      barWidth: '100%'
    }
  };

  const currentBleaching = bleachingStyles[snapshot.coralBleachingRisk] || bleachingStyles['None'];

  return (
    <div className="rounded-2xl glass-panel p-6 border border-lagoon-500/20 relative overflow-hidden">
      {/* Decorative subtle ambient light */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-lagoon-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-biolum-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Main Grid: Left Station Bio + Center Health & Bleaching + Right Telemetry Environmental Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Left Column: Station Identity & Geography (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center space-x-2.5">
            <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-lagoon-500/15 text-lagoon-300 border border-lagoon-500/30">
              {station.shortCode}
            </span>
            <span className="font-mono text-xs text-sand-300 px-2 py-0.5 rounded bg-abyss-900 border border-abyss-800">
              {station.ocean}
            </span>
            <span className="font-sans text-xs text-biolum-300 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-biolum-400 inline" />
              <span>{station.mpaCategory}</span>
            </span>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-sand-50 tracking-tight">
              {station.name}
            </h1>
            <p className="text-xs text-sand-300/90 mt-1 leading-relaxed">
              {station.description}
            </p>
          </div>

          {/* Coordinates and Depth Sounding strip */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-abyss-900/60 border border-abyss-800/80 text-xs">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-lagoon-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-sand-400 text-[10px] uppercase font-mono block">GPS Sounding</span>
                <span className="font-mono text-sand-100 font-medium">
                  {station.coordinates.latDMS} <br />
                  {station.coordinates.lngDMS}
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Layers className="w-4 h-4 text-biolum-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-sand-400 text-[10px] uppercase font-mono block">Depth Profile</span>
                <span className="font-mono text-sand-100 font-medium">
                  Avg: {station.depthMeters.average}m <br />
                  <span className="text-sand-400 text-[11px]">(Min {station.depthMeters.min}m / Max {station.depthMeters.max}m)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Active Sensor Mesh Nodes */}
          <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-abyss-900/40 border border-abyss-800/60">
            <span className="text-sand-300 flex items-center space-x-1.5 font-medium">
              <Radio className="w-3.5 h-3.5 text-lagoon-400 animate-pulse" />
              <span>Active Sensor Grid Nodes</span>
            </span>
            <div className="flex items-center space-x-3 font-mono text-[11px]">
              <span className="text-sand-200">
                <strong className="text-lagoon-400">{station.activeSensors.buoys}</strong> Buoys
              </span>
              <span className="text-sand-200">
                <strong className="text-biolum-400">{station.activeSensors.gliders}</strong> Gliders
              </span>
              <span className="text-sand-200">
                <strong className="text-sunburst-400">{station.activeSensors.hydrophones}</strong> Hydrophones
              </span>
              <span className="text-sand-200">
                <strong className="text-coral-400">{station.activeSensors.benthicRovers}</strong> Rovers
              </span>
            </div>
          </div>
        </div>

        {/* Center Column: Ecological Health & Bleaching Thermal Stress Dial (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4 p-4 rounded-xl bg-abyss-900/50 border border-abyss-800">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ThermometerSnowflake className="w-4 h-4 text-coral-400" />
              <span className="text-xs font-semibold text-sand-200 uppercase font-mono tracking-wider">
                Reef Thermal & Health Index
              </span>
            </div>
            <button
              onClick={onOpenAnomalyModal}
              className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-coral-500/15 text-coral-300 hover:bg-coral-500/25 border border-coral-500/30 transition-all"
            >
              Simulate Stressor
            </button>
          </div>

          {/* Health Score Progress Ring */}
          <div className="flex items-center justify-around py-2">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#072124"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * station.healthScore) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-mono text-2xl font-bold text-sand-50">
                    {station.healthScore}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-lagoon-400">
                    Vitality
                  </span>
                </div>
              </div>
              <p className="text-[11px] font-sans text-sand-300 mt-1">Ecosystem Vitality</p>
            </div>

            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#072124"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#06b6d4"
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * station.coralCoveragePct) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-mono text-2xl font-bold text-sand-50">
                    {station.coralCoveragePct}%
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-biolum-400">
                    Coverage
                  </span>
                </div>
              </div>
              <p className="text-[11px] font-sans text-sand-300 mt-1">Live Hard Coral Cover</p>
            </div>
          </div>

          {/* Bleaching Alert Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-sand-400">Bleaching Warning Tier:</span>
              <span className={`font-mono font-semibold px-2 py-0.5 rounded text-[11px] border ${currentBleaching.bg} ${currentBleaching.text} ${currentBleaching.border}`}>
                {snapshot.coralBleachingRisk}
              </span>
            </div>

            {/* NOAA Degree Heating Weeks Bar */}
            <div className="w-full bg-abyss-950 rounded-full h-2 overflow-hidden border border-abyss-800">
              <div 
                className={`h-full transition-all duration-500 ${currentBleaching.barColor}`} 
                style={{ width: currentBleaching.barWidth }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-sand-400 pt-0.5">
              <span>Accumulated Thermal Stress:</span>
              <span className="text-sand-200 font-semibold">{snapshot.degreeHeatingWeeks} DHW (°C-weeks)</span>
            </div>
          </div>

          {/* Dominant Clade Bio Tag */}
          <div className="text-[11px] bg-abyss-950/70 p-2.5 rounded-lg border border-abyss-800/80 text-sand-300">
            <span className="text-sand-400 block text-[10px] font-mono uppercase">Dominant Coral Clade:</span>
            <span className="text-lagoon-300 font-medium">{station.dominantClade}</span>
          </div>
        </div>

        {/* Right Column: Hydrodynamic & Surface Meteorological Readouts (3 cols) */}
        <div className="lg:col-span-3 flex flex-col justify-between space-y-3 p-4 rounded-xl bg-abyss-900/40 border border-abyss-800">
          <div className="text-xs font-semibold text-sand-200 uppercase font-mono tracking-wider flex items-center space-x-1.5">
            <Wind className="w-4 h-4 text-biolum-400" />
            <span>Hydrodynamics & Microclimate</span>
          </div>

          {/* Wave Height */}
          <div className="p-2.5 rounded-lg bg-abyss-950/60 border border-abyss-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded bg-biolum-500/10 text-biolum-400">
                <Waves className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-sand-400 block">Significant Wave Height</span>
                <span className="text-sm font-mono font-bold text-sand-100">{snapshot.waveHeightMeters} m</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-lagoon-300 bg-lagoon-500/10 px-1.5 py-0.5 rounded">
              Mild Swell
            </span>
          </div>

          {/* Current Speed & Vector Direction */}
          <div className="p-2.5 rounded-lg bg-abyss-950/60 border border-abyss-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded bg-lagoon-500/10 text-lagoon-400">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-sand-400 block">Tidal Current Vector</span>
                <span className="text-sm font-mono font-bold text-sand-100">
                  {snapshot.currentSpeedKnots} kts @ {snapshot.currentDirectionDeg}°
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-biolum-300 bg-biolum-500/10 px-1.5 py-0.5 rounded">
              Laminar
            </span>
          </div>

          {/* Solar PAR Irradiance */}
          <div className="p-2.5 rounded-lg bg-abyss-950/60 border border-abyss-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded bg-sunburst-500/10 text-sunburst-400">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-sand-400 block">Solar PAR Irradiance</span>
                <span className="text-sm font-mono font-bold text-sand-100">
                  {snapshot.solarRadiationPAR} <span className="text-[10px] text-sand-400 font-normal">µmol/m²/s</span>
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-sunburst-300 bg-sunburst-500/10 px-1.5 py-0.5 rounded">
              {snapshot.solarRadiationPAR > 1200 ? 'Peak Solar' : snapshot.solarRadiationPAR > 300 ? 'Active Light' : 'Nocturnal'}
            </span>
          </div>

          {/* Salinity Gauge */}
          <div className="p-2.5 rounded-lg bg-abyss-950/60 border border-abyss-800/80 flex items-center justify-between text-xs">
            <span className="text-sand-400 font-mono text-[11px]">Oceanic Salinity:</span>
            <span className="font-mono font-bold text-sand-100">{snapshot.salinityPSU} PSU</span>
          </div>
        </div>

      </div>
    </div>
  );
};
