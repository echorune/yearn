import React from 'react';
import { ClimateStressType } from '../../types';
import { Flame, Droplets, Skull, Waves, X, AlertTriangle, RefreshCw } from 'lucide-react';

interface AnomalyInjectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeStress: ClimateStressType | null;
  onInject: (stress: ClimateStressType) => void;
  onClear: () => void;
}

export const AnomalyInjectorModal: React.FC<AnomalyInjectorModalProps> = ({
  isOpen,
  onClose,
  activeStress,
  onInject,
  onClear
}) => {
  if (!isOpen) return null;

  const scenarios: Array<{
    type: ClimateStressType;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    color: string;
    border: string;
    bg: string;
    impacts: string[];
  }> = [
    {
      type: 'heatwave',
      title: 'Marine Heatwave Shockwave',
      subtitle: 'Severe El Niño / Thermal Spike',
      icon: <Flame className="w-6 h-6 text-coral-500" />,
      color: 'text-coral-400',
      border: 'border-coral-500/30 hover:border-coral-500',
      bg: 'from-coral-950/40 to-abyss-900',
      impacts: [
        '+2.5°C to +3.2°C surface temperature surge',
        'Degree Heating Weeks (DHW) escalation to Bleaching Level 2',
        'Accelerated zooxanthellae expulsion and coral skeleton breakdown'
      ]
    },
    {
      type: 'acidification',
      title: 'Ocean Acidification Plume',
      subtitle: 'Atmospheric CO₂ Saturation & Corrosive Influx',
      icon: <Droplets className="w-6 h-6 text-biolum-400" />,
      color: 'text-biolum-400',
      border: 'border-biolum-500/30 hover:border-biolum-400',
      bg: 'from-biolum-950/40 to-abyss-900',
      impacts: [
        'Seawater pH falls rapidly below 7.85',
        'Aragonite Saturation (Ω_arg) drops below critical calcification threshold (< 3.0)',
        'Calcifying organisms experience skeletal dissolution stress'
      ]
    },
    {
      type: 'hypoxia',
      title: 'Hypoxic Upwelling Intrusion',
      subtitle: 'Oxygen-Depleted Deep Abyss Inflow',
      icon: <Skull className="w-6 h-6 text-sunburst-400" />,
      color: 'text-sunburst-400',
      border: 'border-sunburst-500/30 hover:border-sunburst-400',
      bg: 'from-sunburst-950/30 to-abyss-900',
      impacts: [
        'Dissolved oxygen plummets under 3.5 mg/L',
        'Benthic community asphyxiation & mobile reef fauna exodus',
        'Acoustic biomass index drops by up to 20 dB'
      ]
    },
    {
      type: 'algal_bloom',
      title: 'Dinoflagellate Algal Bloom',
      subtitle: 'Hyper-Eutrophic Red Tide Intrusion',
      icon: <Waves className="w-6 h-6 text-lagoon-400" />,
      color: 'text-lagoon-400',
      border: 'border-lagoon-500/30 hover:border-lagoon-400',
      bg: 'from-lagoon-950/40 to-abyss-900',
      impacts: [
        'Chlorophyll-A spikes over 3.5 µg/L',
        'Turbidity escalates to 8+ NTU, blocking 70% of benthic PAR light',
        'Surface oxygen supersaturation followed by nocturnal microbial crash'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-abyss-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-abyss-900 border border-lagoon-500/25 rounded-2xl shadow-2xl overflow-hidden glass-panel"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-abyss-800 bg-abyss-850/60">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-coral-500/10 border border-coral-500/20 text-coral-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-sand-50">
                Climate Stress & Anomaly Injector
              </h2>
              <p className="text-xs text-sand-300">
                Simulate catastrophic climate disturbances to stress-test reef resilience and telemetry triggers.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-sand-400 hover:text-sand-100 hover:bg-abyss-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scenarios Grid */}
        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
          {activeStress && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-coral-950/30 border border-coral-500/40 text-coral-200">
              <div className="flex items-center space-x-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-coral-500"></span>
                </span>
                <span className="text-sm font-medium">
                  Active Stressor: <strong className="uppercase">{activeStress}</strong>
                </span>
              </div>
              <button
                onClick={() => {
                  onClear();
                  onClose();
                }}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-lagoon-600/20 hover:bg-lagoon-600/30 text-lagoon-300 text-xs font-semibold border border-lagoon-500/30 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restore Equilibrium</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((sc) => {
              const isCurrent = activeStress === sc.type;
              return (
                <div
                  key={sc.type}
                  className={`p-4 rounded-xl border bg-gradient-to-br ${sc.bg} ${sc.border} transition-all duration-200 flex flex-col justify-between ${
                    isCurrent ? 'ring-2 ring-coral-400 shadow-glow-coral' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-lg bg-abyss-950/60 border border-sand-400/10">
                        {sc.icon}
                      </div>
                      {isCurrent && (
                        <span className="text-[10px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 rounded bg-coral-500/20 text-coral-300 border border-coral-500/30">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <h3 className={`font-display font-semibold text-base ${sc.color}`}>
                      {sc.title}
                    </h3>
                    <p className="text-xs text-sand-300 mb-3">{sc.subtitle}</p>
                    <ul className="space-y-1 mb-4">
                      {sc.impacts.map((imp, idx) => (
                        <li key={idx} className="text-[11px] text-sand-300/80 flex items-start space-x-1.5">
                          <span className="text-lagoon-400 mt-0.5">•</span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      onInject(sc.type);
                      onClose();
                    }}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      isCurrent
                        ? 'bg-coral-500 text-abyss-950 hover:bg-coral-400 shadow-glow-coral'
                        : 'bg-abyss-800 hover:bg-lagoon-600 hover:text-abyss-950 text-sand-200 border border-sand-400/10'
                    }`}
                  >
                    {isCurrent ? 'Re-intensify Shock' : 'Inject Stressor Event'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-abyss-800 bg-abyss-850/40 text-xs text-sand-400">
          <span>Stressor dynamics decay gradually over 45 simulated cycles.</span>
          <button
            onClick={() => {
              onClear();
              onClose();
            }}
            className="px-3 py-1.5 rounded-lg text-sand-300 hover:text-sand-100 hover:bg-abyss-800 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
