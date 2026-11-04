import React, { useState, useEffect, useRef } from 'react';
import { 
  MarineStation, 
  TelemetrySnapshot, 
  SensorLogEntry, 
  SimulationState, 
  SimulationSpeed, 
  ClimateStressType, 
  ActiveTab 
} from './types';
import { MARINE_STATIONS } from './data/stations';
import { BiogeochemicalEngine } from './services/simulationEngine';
import { Navbar } from './components/layout/Navbar';
import { ObservatoryView } from './components/observatory/ObservatoryView';
import { AnomalyInjectorModal } from './components/observatory/AnomalyInjectorModal';
import { PhasePreviewCard } from './components/layout/PhasePreviewCard';

export const App: React.FC = () => {
  // Current Active Station
  const [activeStation, setActiveStation] = useState<MarineStation>(MARINE_STATIONS[0]);
  
  // Navigation view tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('observatory');

  // Simulation State
  const [simulation, setSimulation] = useState<SimulationState>({
    isRunning: true,
    speedMultiplier: 1,
    activeStress: null,
    stressRemainingTicks: 0,
    ticks: 0,
    simulatedDate: new Date()
  });

  // Telemetry Snapshot and History
  const [snapshot, setSnapshot] = useState<TelemetrySnapshot>(() => {
    return BiogeochemicalEngine.generateInitialSnapshot(MARINE_STATIONS[0]);
  });

  const [history, setHistory] = useState<TelemetrySnapshot[]>(() => {
    const initialSnap = BiogeochemicalEngine.generateInitialSnapshot(MARINE_STATIONS[0]);
    return BiogeochemicalEngine.generateInitialHistory(MARINE_STATIONS[0], initialSnap);
  });

  // Sensor Packets & Log entries
  const [logs, setLogs] = useState<SensorLogEntry[]>([
    {
      id: 'init-1',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      epoch: Date.now() - 3000,
      stationId: MARINE_STATIONS[0].id,
      sensorCode: 'SYS-UPLINK-001',
      severity: 'normal',
      metric: 'Telemetry Link',
      value: 'Synchronized',
      message: 'Autonomous sensor mesh link established. Calibrated against WMO baseline.'
    },
    {
      id: 'init-2',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      epoch: Date.now() - 1500,
      stationId: MARINE_STATIONS[0].id,
      sensorCode: 'CTD-SEA-BIRD-99',
      severity: 'normal',
      metric: 'Conductivity & Temp',
      value: `${MARINE_STATIONS[0].baseline.temperature}°C`,
      message: 'Mooring telemetry nominal. Salinity and thermal stratification within bounds.'
    }
  ]);

  // Modal State
  const [isAnomalyModalOpen, setIsAnomalyModalOpen] = useState(false);

  // References to keep closure values fresh in timer
  const simRef = useRef(simulation);
  simRef.current = simulation;
  const snapshotRef = useRef(snapshot);
  snapshotRef.current = snapshot;
  const stationRef = useRef(activeStation);
  stationRef.current = activeStation;

  // Station Switching Handler
  const handleSelectStation = (newStation: MarineStation) => {
    setActiveStation(newStation);
    const newSnapshot = BiogeochemicalEngine.generateInitialSnapshot(newStation);
    setSnapshot(newSnapshot);
    setHistory(BiogeochemicalEngine.generateInitialHistory(newStation, newSnapshot));

    // Log the switch
    const switchLog: SensorLogEntry = {
      id: `log-sw-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      epoch: Date.now(),
      stationId: newStation.id,
      sensorCode: 'SYS-ORCH-01',
      severity: 'normal',
      metric: 'Reserve Context',
      value: newStation.shortCode,
      message: `Active observatory context shifted to ${newStation.name} (${newStation.ocean}).`
    };
    setLogs((prev) => [switchLog, ...prev.slice(0, 99)]);
  };

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    setSimulation((prev) => ({
      ...prev,
      isRunning: !prev.isRunning
    }));
  };

  // Change Speed
  const handleChangeSpeed = (speed: SimulationSpeed) => {
    setSimulation((prev) => ({
      ...prev,
      speedMultiplier: speed
    }));
  };

  // Inject Anomaly Stress
  const handleInjectStress = (stress: ClimateStressType) => {
    setSimulation((prev) => ({
      ...prev,
      activeStress: stress,
      stressRemainingTicks: 45
    }));

    const alertLog: SensorLogEntry = {
      id: `stress-init-${Date.now()}`,
      timestamp: simulation.simulatedDate.toLocaleTimeString('en-US', { hour12: false }),
      epoch: Date.now(),
      stationId: activeStation.id,
      sensorCode: 'SYS-STRESS-SIM',
      severity: 'critical',
      metric: 'Climate Shock',
      value: stress.toUpperCase(),
      message: `Forced anomaly stress injected: ${stress}. Telemetry monitors will adjust to thermodynamic perturbation.`
    };
    setLogs((prev) => [alertLog, ...prev.slice(0, 99)]);
  };

  // Clear Stress / Restore Equilibrium
  const handleClearStress = () => {
    setSimulation((prev) => ({
      ...prev,
      activeStress: null,
      stressRemainingTicks: 0
    }));

    const recoveryLog: SensorLogEntry = {
      id: `stress-clear-${Date.now()}`,
      timestamp: simulation.simulatedDate.toLocaleTimeString('en-US', { hour12: false }),
      epoch: Date.now(),
      stationId: activeStation.id,
      sensorCode: 'SYS-RECOVER-01',
      severity: 'normal',
      metric: 'Equilibrium',
      value: 'Restored',
      message: 'Climate stressor neutralized. Seawater chemistry and thermal profile returning to equilibrium.'
    };
    setLogs((prev) => [recoveryLog, ...prev.slice(0, 99)]);
  };

  // Simulation Tick Loop
  useEffect(() => {
    if (!simulation.isRunning) return;

    // Tick period adjusted by speed multiplier
    const intervalMs = Math.max(250, 1500 / simulation.speedMultiplier);

    const timer = setInterval(() => {
      const curSim = simRef.current;
      const curStation = stationRef.current;
      const curSnap = snapshotRef.current;

      // Advance simulated clock: 1 tick = 15 seconds * multiplier in simulated time
      const nextDate = new Date(curSim.simulatedDate.getTime() + 15000 * curSim.speedMultiplier);

      // Decrement stress duration if active
      let nextStress = curSim.activeStress;
      let nextRemaining = curSim.stressRemainingTicks;
      if (nextStress && nextRemaining > 0) {
        nextRemaining -= 1;
        if (nextRemaining <= 0) {
          nextStress = null;
        }
      }

      // Compute biogeochemical physics update
      const { nextSnapshot, logEntry } = BiogeochemicalEngine.stepSimulation(
        curStation,
        curSnap,
        nextStress,
        nextDate,
        curSim.ticks + 1
      );

      // Update state
      setSnapshot(nextSnapshot);
      setHistory((prev) => [...prev.slice(-29), nextSnapshot]);

      if (logEntry) {
        setLogs((prev) => [logEntry, ...prev.slice(0, 99)]);
      }

      setSimulation((prev) => ({
        ...prev,
        ticks: prev.ticks + 1,
        simulatedDate: nextDate,
        activeStress: nextStress,
        stressRemainingTicks: nextRemaining
      }));
    }, intervalMs);

    return () => clearInterval(timer);
  }, [simulation.isRunning, simulation.speedMultiplier]);

  return (
    <div className="min-h-screen bg-abyss-950 text-sand-100 flex flex-col font-sans selection:bg-lagoon-500 selection:text-abyss-950 tropical-glow-bg">
      {/* Top Navigation */}
      <Navbar
        stations={MARINE_STATIONS}
        activeStation={activeStation}
        onSelectStation={handleSelectStation}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        simulation={simulation}
        onTogglePlay={handleTogglePlay}
        onChangeSpeed={handleChangeSpeed}
        onOpenAnomalyModal={() => setIsAnomalyModalOpen(true)}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'observatory' ? (
          <ObservatoryView
            station={activeStation}
            snapshot={snapshot}
            history={history}
            logs={logs}
            activeStress={simulation.activeStress}
            onOpenAnomalyModal={() => setIsAnomalyModalOpen(true)}
            onClearStress={handleClearStress}
            onClearLogs={() => setLogs([])}
          />
        ) : (
          <PhasePreviewCard
            tab={activeTab}
            onReturnToObservatory={() => setActiveTab('observatory')}
          />
        )}
      </main>

      {/* Tactical Climate Stressor Modal */}
      <AnomalyInjectorModal
        isOpen={isAnomalyModalOpen}
        onClose={() => setIsAnomalyModalOpen(false)}
        activeStress={simulation.activeStress}
        onInject={handleInjectStress}
        onClear={handleClearStress}
      />

      {/* Atmospheric Footer */}
      <footer className="w-full border-t border-abyss-800/80 bg-abyss-950/70 py-4 text-xs text-sand-400 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-lagoon-400 animate-pulse" />
            <span>Thalassa Bio-Marine OS • Mission Control Telemetry Station</span>
          </div>
          <div>
            <span>Equatorial Coral Reserve Telemetry Network • Latency: 42ms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
