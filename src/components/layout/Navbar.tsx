import React, { useState } from 'react';
import { MarineStation, SimulationState, SimulationSpeed, ActiveTab } from '../../types';
import { 
  Compass, 
  Play, 
  Pause, 
  AlertTriangle, 
  ChevronDown, 
  Clock, 
  Volume2, 
  Activity, 
  Sparkles,
  FileText
} from 'lucide-react';

interface NavbarProps {
  stations: MarineStation[];
  activeStation: MarineStation;
  onSelectStation: (station: MarineStation) => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  simulation: SimulationState;
  onTogglePlay: () => void;
  onChangeSpeed: (speed: SimulationSpeed) => void;
  onOpenAnomalyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stations,
  activeStation,
  onSelectStation,
  activeTab,
  onSelectTab,
  simulation,
  onTogglePlay,
  onChangeSpeed,
  onOpenAnomalyModal
}) => {
  const [stationDropdownOpen, setStationDropdownOpen] = useState(false);

  const tabs: Array<{ id: ActiveTab; label: string; icon: React.ReactNode; phaseBadge?: string }> = [
    { id: 'observatory', label: 'Observatory', icon: <Activity className="w-4 h-4" /> },
    { id: 'bathymetry', label: 'Bathymetry & Fleet', icon: <Compass className="w-4 h-4" />, phaseBadge: 'Phase 2' },
    { id: 'acoustics', label: 'Bio-Acoustics', icon: <Volume2 className="w-4 h-4" />, phaseBadge: 'Phase 3' },
    { id: 'restoration', label: 'Restoration Lab', icon: <Sparkles className="w-4 h-4" />, phaseBadge: 'Phase 4' },
    { id: 'ledger', label: 'Taxa & Carbon', icon: <FileText className="w-4 h-4" />, phaseBadge: 'Phase 5' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-abyss-950/85 backdrop-blur-xl border-b border-lagoon-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand Identity & Station Selector */}
          <div className="flex items-center space-x-4">
            {/* Brand Logo */}
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => onSelectTab('observatory')}>
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-lagoon-500 to-biolum-600 shadow-glow-lagoon">
                <span className="w-4 h-4 rounded-full bg-abyss-950 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-coral-400 animate-ping" />
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-display font-bold text-lg tracking-tight text-sand-50">
                    THALASSA<span className="text-lagoon-400 font-mono text-sm ml-1 font-semibold">OS</span>
                  </span>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-lagoon-500/15 text-lagoon-300 border border-lagoon-500/30">
                    v2.4
                  </span>
                </div>
                <p className="text-[10px] text-sand-400 uppercase tracking-widest font-mono">
                  Oceanic Biosphere Intelligence
                </p>
              </div>
            </div>

            {/* Station Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setStationDropdownOpen(!stationDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-abyss-900 border border-lagoon-500/30 hover:border-lagoon-400 text-xs text-sand-100 transition-all shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-lagoon-400 animate-pulse" />
                <span className="font-medium max-w-[150px] sm:max-w-[180px] truncate">
                  {activeStation.name}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-sand-400 transition-transform ${stationDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Station Dropdown Menu */}
              {stationDropdownOpen && (
                <div className="absolute left-0 mt-2 w-80 rounded-2xl bg-abyss-900 border border-lagoon-500/30 shadow-2xl z-50 p-2 space-y-1 glass-panel animate-fadeIn">
                  <div className="px-3 py-2 text-[10px] font-mono uppercase text-sand-400 tracking-wider border-b border-abyss-800">
                    Global Equatorial Marine Reserves
                  </div>
                  {stations.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => {
                        onSelectStation(st);
                        setStationDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                        st.id === activeStation.id
                          ? 'bg-lagoon-500/20 border border-lagoon-500/40 text-sand-50 shadow-glow-lagoon'
                          : 'hover:bg-abyss-800/80 text-sand-200 border border-transparent'
                      }`}
                    >
                      <div>
                        <div className="font-display font-semibold text-xs text-sand-100">
                          {st.name}
                        </div>
                        <div className="text-[10px] text-sand-400 font-mono">
                          {st.region} • {st.ocean}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-xs font-bold text-lagoon-400">
                          {st.healthScore}
                        </span>
                        <span className="text-[9px] block text-sand-400 font-mono uppercase">
                          Score
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center: Main Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-abyss-900/60 p-1 rounded-xl border border-abyss-800">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-lagoon-500 text-abyss-950 font-semibold shadow-glow-lagoon'
                      : 'text-sand-300 hover:text-sand-100 hover:bg-abyss-800/60'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.phaseBadge && (
                    <span className={`text-[9px] font-mono px-1 py-0.2 rounded ml-1 ${
                      isActive ? 'bg-abyss-950/40 text-sand-100' : 'bg-abyss-800 text-sand-400'
                    }`}>
                      {tab.phaseBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Simulation Controls & Stress Injector */}
          <div className="flex items-center space-x-3">
            {/* UTC Simulation Clock */}
            <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-abyss-900/90 border border-abyss-800 text-xs font-mono text-sand-300">
              <Clock className="w-3.5 h-3.5 text-biolum-400" />
              <span>{simulation.simulatedDate.toLocaleTimeString('en-US', { hour12: false })} UTC</span>
            </div>

            {/* Play/Pause & Speed Pod */}
            <div className="flex items-center space-x-1 bg-abyss-900 p-1 rounded-xl border border-abyss-800">
              <button
                onClick={onTogglePlay}
                className={`p-1.5 rounded-lg transition-all ${
                  simulation.isRunning
                    ? 'bg-lagoon-500/20 text-lagoon-400 hover:bg-lagoon-500/30'
                    : 'bg-sunburst-500/20 text-sunburst-400 hover:bg-sunburst-500/30'
                }`}
                title={simulation.isRunning ? 'Pause Simulation' : 'Resume Simulation'}
              >
                {simulation.isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              {/* Speed Multipliers */}
              {([1, 5, 20] as SimulationSpeed[]).map((spd) => (
                <button
                  key={spd}
                  onClick={() => onChangeSpeed(spd)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold transition-all ${
                    simulation.speedMultiplier === spd
                      ? 'bg-biolum-500 text-abyss-950 shadow-glow-biolum'
                      : 'text-sand-400 hover:text-sand-200'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Anomaly Stressor Button */}
            <button
              onClick={onOpenAnomalyModal}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all border ${
                simulation.activeStress
                  ? 'bg-coral-500 text-abyss-950 border-coral-400 shadow-glow-coral animate-pulse'
                  : 'bg-coral-500/15 text-coral-300 border-coral-500/30 hover:bg-coral-500/25'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {simulation.activeStress ? 'Anomaly Active' : 'Inject Stress'}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-between overflow-x-auto py-2 border-t border-abyss-800 space-x-2 text-xs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg shrink-0 ${
                activeTab === tab.id
                  ? 'bg-lagoon-500 text-abyss-950 font-bold'
                  : 'text-sand-300 hover:bg-abyss-850'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

      </div>
    </header>
  );
};
