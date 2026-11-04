import React from 'react';
import { ActiveTab } from '../../types';
import { Compass, Volume2, Sparkles, FileText, ArrowLeft, CheckCircle2, Cpu } from 'lucide-react';

interface PhasePreviewCardProps {
  tab: ActiveTab;
  onReturnToObservatory: () => void;
}

export const PhasePreviewCard: React.FC<PhasePreviewCardProps> = ({ tab, onReturnToObservatory }) => {
  const contentMap: Record<
    Exclude<ActiveTab, 'observatory'>,
    {
      title: string;
      phase: string;
      icon: React.ReactNode;
      tagline: string;
      description: string;
      features: string[];
      techStack: string[];
    }
  > = {
    bathymetry: {
      title: 'Interactive Bathymetric Spatial Map & Fleet Radar',
      phase: 'Phase 2',
      icon: <Compass className="w-8 h-8 text-biolum-400" />,
      tagline: 'Deep-Ocean Topography & Autonomous Asset Telemetry',
      description:
        'A vector SVG and Canvas bathymetry explorer mapping subsea depth contours down to -4,200m abyss. Tracks Wave Glider ASVs, benthic seabed rovers, and bio-buoy arrays with real-time waypoint routing.',
      features: [
        'Interactive SVG bathymetric depth gradient layer with depth soundings',
        'Fleet telemetry tracking (battery %, heading, solar PV charging, ping frequency)',
        'Thermal anomaly heatmap overlay and acoustic biomass density spots',
        'MPA sanctuary boundary visualization and intrusion detection'
      ],
      techStack: ['HTML5 Canvas', 'SVG Vector Contours', 'Spherical Geodesics', 'Fleet Telemetry Link']
    },
    acoustics: {
      title: 'Bio-Acoustic Hydrophone Studio & Soundscape Synthesizer',
      phase: 'Phase 3',
      icon: <Volume2 className="w-8 h-8 text-lagoon-400" />,
      tagline: 'Native Web Audio API Marine Biophony & FFT Spectrogram',
      description:
        'Synthesizes organic tropical ocean soundscapes directly in the browser—including snapping shrimp high-frequency clicks, deep sub-bass ocean swells, and cetacean bio-acoustics—paired with a 60fps real-time FFT frequency waterfall.',
      features: [
        'Browser-native Web Audio API multi-oscillator and noise convolution engine',
        'Real-time Canvas FFT Spectrogram waterfall and oscilloscope waveform display',
        'AI Bio-Acoustic Classifier (Cetaceans, Delphinidae, Alpheidae, Scaridae)',
        'Reef Sound Vitality Index & frequency band pass filtering'
      ],
      techStack: ['Web Audio API', 'AnalyserNode FFT', 'Canvas 2D Waterfall', 'AudioDSP Filters']
    },
    restoration: {
      title: 'Coral Restoration & Climate Intervention Laboratory',
      phase: 'Phase 4',
      icon: <Sparkles className="w-8 h-8 text-sunburst-400" />,
      tagline: 'Multi-Variable Ecological Modeling & Monte Carlo Forecasting',
      description:
        'An interactive restoration sandbox to test intervention protocols: clade C/D super-coral larval seeding, deep cold-water upwelling pumps, and benthic alkalinity dispersion with 12-60 month predictive impact models.',
      features: [
        'Interactive parameter tuning for restoration interventions',
        'Forward mathematical projection engine (12, 36, 60 months) with comparison graphs',
        'Monte Carlo bleaching risk reduction calculator',
        'Protocol deployment workflow with celebratory execution and audit log'
      ],
      techStack: ['Biogeochemical Math Models', 'Dynamic Projections', 'Canvas Confetti', 'Protocol Ledger']
    },
    ledger: {
      title: 'Taxa Genomic Ledger, Blue Carbon Audit Studio & Exporter',
      phase: 'Phase 5',
      icon: <FileText className="w-8 h-8 text-coral-400" />,
      tagline: 'Biodiversity Taxa Dossiers & Verified Carbon Impact Certificates',
      description:
        'A comprehensive marine taxa catalog with thermal limits and genetic markers, alongside an automated Blue Carbon credit calculator and verifiable cryptographic audit certificate generator.',
      features: [
        'Searchable marine species index with thermal critical curves (T_crit) and IUCN status',
        'Blue Carbon credit accounting engine (mangrove, seagrass, carbonate budgets)',
        'Verifiable cryptographic ecological audit certificate generation',
        'Multi-format telemetry exporter (CSV, JSON, printable reports)'
      ],
      techStack: ['Taxonomic Database', 'Carbon Ledger Math', 'Cryptographic Digest', 'CSV/JSON Generators']
    }
  };

  if (tab === 'observatory') return null;
  const current = contentMap[tab];

  return (
    <div className="max-w-4xl mx-auto my-8 p-8 rounded-3xl glass-panel border border-lagoon-500/20 text-center animate-fadeIn">
      <div className="inline-flex p-4 rounded-2xl bg-abyss-900 border border-lagoon-500/30 mb-4 shadow-glow-lagoon">
        {current.icon}
      </div>

      <div className="flex items-center justify-center space-x-2 mb-2">
        <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-lagoon-500/20 text-lagoon-300 border border-lagoon-500/30">
          {current.phase} Roadmap
        </span>
        <span className="text-xs font-mono text-sand-400">Scheduled for sequential implementation</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-display font-bold text-sand-50 tracking-tight mb-2">
        {current.title}
      </h2>
      <p className="text-sm font-medium text-lagoon-400 mb-4 font-mono">
        {current.tagline}
      </p>

      <p className="text-sm text-sand-300 max-w-2xl mx-auto mb-8 leading-relaxed">
        {current.description}
      </p>

      {/* Feature Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-8">
        {current.features.map((feat, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-2.5 p-3 rounded-xl bg-abyss-900/60 border border-abyss-800 text-xs text-sand-200"
          >
            <CheckCircle2 className="w-4 h-4 text-lagoon-400 shrink-0 mt-0.5" />
            <span>{feat}</span>
          </div>
        ))}
      </div>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <span className="text-xs font-mono text-sand-400 mr-2 flex items-center">
          <Cpu className="w-3.5 h-3.5 mr-1 text-biolum-400" /> Planned Architecture:
        </span>
        {current.techStack.map((tech, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 rounded-lg bg-abyss-950 border border-abyss-800 text-[11px] font-mono text-biolum-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <div>
        <button
          onClick={onReturnToObservatory}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-lagoon-500 hover:bg-lagoon-400 text-abyss-950 font-bold text-xs tracking-wide shadow-glow-lagoon transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Live Observatory (Feature 1)</span>
        </button>
      </div>
    </div>
  );
};
