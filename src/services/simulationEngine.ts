import { 
  MarineStation, 
  TelemetrySnapshot, 
  ClimateStressType, 
  BleachingRiskLevel,
  SensorLogEntry,
  AlertSeverity
} from '../types';

export class BiogeochemicalEngine {
  /**
   * Generates initial snapshot for a given station
   */
  static generateInitialSnapshot(station: MarineStation, date: Date = new Date()): TelemetrySnapshot {
    const hours = date.getUTCHours() + date.getUTCMinutes() / 60;
    const solarFactor = Math.max(0, Math.sin((hours - 6) * (Math.PI / 12))); // 0 to 1 between 6:00 and 18:00
    
    const temp = station.baseline.temperature + (solarFactor * 0.4) - 0.2;
    const tempAnomaly = +(temp - station.baseline.temperature).toFixed(2);
    
    return {
      timestamp: date.getTime(),
      timeDisplay: date.toLocaleTimeString('en-US', { hour12: false }),
      temperature: +temp.toFixed(2),
      temperatureAnomaly: tempAnomaly,
      ph: +(station.baseline.ph + (solarFactor * 0.04) - 0.02).toFixed(3),
      aragoniteSaturation: +(station.baseline.aragonite + (solarFactor * 0.08) - 0.04).toFixed(2),
      dissolvedOxygen: +(station.baseline.dissolvedOxygen + (solarFactor * 0.35) - 0.15).toFixed(2),
      chlorophyllA: +(station.baseline.chlorophyllA + (solarFactor * 0.05)).toFixed(3),
      turbidityNTU: +(station.baseline.turbidity + (Math.random() * 0.08 - 0.04)).toFixed(2),
      acousticBiomassIndex: +(station.baseline.acousticBiomass + (Math.random() * 2.0 - 1.0)).toFixed(1),
      salinityPSU: +(35.2 + Math.sin(hours / 2) * 0.2).toFixed(2),
      coralBleachingRisk: 'None',
      degreeHeatingWeeks: 0.15,
      currentSpeedKnots: +(1.4 + Math.sin(hours) * 0.6).toFixed(2),
      currentDirectionDeg: Math.round((140 + Math.sin(hours) * 35) % 360),
      waveHeightMeters: +(0.8 + Math.cos(hours) * 0.3).toFixed(2),
      solarRadiationPAR: Math.round(solarFactor * 1650)
    };
  }

  /**
   * Generates a 24-point initial history for smooth sparkline graphs
   */
  static generateInitialHistory(station: MarineStation, currentSnapshot: TelemetrySnapshot): TelemetrySnapshot[] {
    const history: TelemetrySnapshot[] = [];
    const count = 24;
    const now = currentSnapshot.timestamp;
    
    for (let i = count; i >= 1; i--) {
      const pastTime = new Date(now - i * 60 * 1000);
      const hours = pastTime.getUTCHours() + pastTime.getUTCMinutes() / 60;
      const solarFactor = Math.max(0, Math.sin((hours - 6) * (Math.PI / 12)));
      
      const jitter = (Math.sin(i * 0.6) + Math.cos(i * 0.4)) * 0.12;
      const temp = +(station.baseline.temperature + (solarFactor * 0.35) - 0.18 + jitter).toFixed(2);
      
      history.push({
        timestamp: pastTime.getTime(),
        timeDisplay: pastTime.toLocaleTimeString('en-US', { hour12: false }),
        temperature: temp,
        temperatureAnomaly: +(temp - station.baseline.temperature).toFixed(2),
        ph: +(station.baseline.ph + (solarFactor * 0.03) - 0.015 + jitter * 0.04).toFixed(3),
        aragoniteSaturation: +(station.baseline.aragonite + (solarFactor * 0.07) + jitter * 0.06).toFixed(2),
        dissolvedOxygen: +(station.baseline.dissolvedOxygen + (solarFactor * 0.3) + jitter * 0.1).toFixed(2),
        chlorophyllA: +(station.baseline.chlorophyllA + jitter * 0.04).toFixed(3),
        turbidityNTU: +(station.baseline.turbidity + Math.abs(jitter) * 0.1).toFixed(2),
        acousticBiomassIndex: +(station.baseline.acousticBiomass + jitter * 2.2).toFixed(1),
        salinityPSU: +(35.2 + Math.sin(hours / 2) * 0.15).toFixed(2),
        coralBleachingRisk: 'None',
        degreeHeatingWeeks: 0.15,
        currentSpeedKnots: +(1.4 + Math.sin(hours) * 0.5).toFixed(2),
        currentDirectionDeg: Math.round((140 + Math.sin(hours) * 30) % 360),
        waveHeightMeters: +(0.8 + Math.cos(hours) * 0.25).toFixed(2),
        solarRadiationPAR: Math.round(solarFactor * 1650)
      });
    }

    history.push(currentSnapshot);
    return history;
  }

  /**
   * Advances the simulation forward by 1 time step
   */
  static stepSimulation(
    station: MarineStation,
    prevSnapshot: TelemetrySnapshot,
    activeStress: ClimateStressType | null,
    simulatedDate: Date,
    tickCount: number
  ): { nextSnapshot: TelemetrySnapshot; logEntry?: SensorLogEntry } {
    const hours = simulatedDate.getUTCHours() + simulatedDate.getUTCMinutes() / 60;
    const solarFactor = Math.max(0, Math.sin((hours - 6) * (Math.PI / 12)));
    
    // Natural micro-fluctuations (Brownian jitter)
    const microJitter = (Math.random() - 0.5) * 0.05;
    
    // Baseline diurnal trajectory
    let targetTemp = station.baseline.temperature + (solarFactor * 0.42) - 0.2 + microJitter;
    let targetPh = station.baseline.ph + (solarFactor * 0.03) - 0.015 + (microJitter * 0.02);
    let targetAragonite = station.baseline.aragonite + (solarFactor * 0.07) - 0.035 + (microJitter * 0.04);
    let targetDO = station.baseline.dissolvedOxygen + (solarFactor * 0.32) - 0.16 + (microJitter * 0.08);
    let targetChl = station.baseline.chlorophyllA + (solarFactor * 0.04) + (microJitter * 0.015);
    let targetTurbidity = station.baseline.turbidity + Math.abs(microJitter * 0.2);
    let targetBiomass = station.baseline.acousticBiomass + (microJitter * 3.5);
    let targetDHW = prevSnapshot.degreeHeatingWeeks;
    let bleachingRisk: BleachingRiskLevel = 'None';
    
    let generatedLog: SensorLogEntry | undefined;

    // Apply Climate Stress Scenarios
    if (activeStress === 'heatwave') {
      const heatWaveIntensity = 2.45 + Math.sin(tickCount * 0.2) * 0.4;
      targetTemp += heatWaveIntensity;
      // Oxygen solubility decreases at higher temperature
      targetDO -= 1.15;
      targetDHW = +(prevSnapshot.degreeHeatingWeeks + 0.08).toFixed(2);
      
      if (targetDHW >= 8.0) {
        bleachingRisk = 'Alert Level 2';
      } else if (targetDHW >= 4.0) {
        bleachingRisk = 'Alert Level 1';
      } else if (targetTemp - station.baseline.temperature > 1.8) {
        bleachingRisk = 'Warning';
      } else {
        bleachingRisk = 'Watch';
      }

      if (tickCount % 6 === 0) {
        generatedLog = {
          id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          timestamp: simulatedDate.toLocaleTimeString('en-US', { hour12: false }),
          epoch: Date.now(),
          stationId: station.id,
          sensorCode: 'SST-RADIOM-094',
          severity: bleachingRisk === 'Alert Level 2' ? 'critical' : 'warning',
          metric: 'Sea Surface Temp',
          value: `+${(targetTemp - station.baseline.temperature).toFixed(2)}°C Anomaly`,
          message: `Marine heatwave threshold breached. Thermal stress accum: ${targetDHW.toFixed(1)} DHW.`
        };
      }
    } else if (activeStress === 'acidification') {
      targetPh -= 0.32;
      targetAragonite -= 1.15; // Plummets below 3.0 threshold
      targetDO -= 0.35;
      
      if (tickCount % 6 === 0) {
        generatedLog = {
          id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          timestamp: simulatedDate.toLocaleTimeString('en-US', { hour12: false }),
          epoch: Date.now(),
          stationId: station.id,
          sensorCode: 'SEAFET-PH-811',
          severity: 'critical',
          metric: 'Ocean pH / Ω_arg',
          value: `pH ${targetPh.toFixed(3)} | Ω ${targetAragonite.toFixed(2)}`,
          message: 'Severe ocean acidification pulse detected. Scleractinian aragonite calcification rate inhibited.'
        };
      }
    } else if (activeStress === 'hypoxia') {
      targetDO = Math.max(2.1, targetDO - 3.4);
      targetBiomass -= 18.5; // Fishes migrate or suffocate
      
      if (tickCount % 6 === 0) {
        generatedLog = {
          id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          timestamp: simulatedDate.toLocaleTimeString('en-US', { hour12: false }),
          epoch: Date.now(),
          stationId: station.id,
          sensorCode: 'OPTODE-DO-423',
          severity: 'critical',
          metric: 'Dissolved Oxygen',
          value: `${targetDO.toFixed(2)} mg/L`,
          message: 'Hypoxic upwelling intrusion detected. Dissolved oxygen critically below reef survival threshold (4.0 mg/L).'
        };
      }
    } else if (activeStress === 'algal_bloom') {
      targetChl += 2.85;
      targetTurbidity += 4.6;
      targetDO += 0.8; // Supersaturated surface oxygen
      
      if (tickCount % 6 === 0) {
        generatedLog = {
          id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          timestamp: simulatedDate.toLocaleTimeString('en-US', { hour12: false }),
          epoch: Date.now(),
          stationId: station.id,
          sensorCode: 'FLNTU-CHL-602',
          severity: 'warning',
          metric: 'Chlorophyll-A / Turbidity',
          value: `${targetChl.toFixed(2)} µg/L | ${targetTurbidity.toFixed(1)} NTU`,
          message: 'Dinoflagellate micro-algal bloom expanding rapidly. Benthic photosynthetic light penetration reduced by 64%.'
        };
      }
    } else {
      // Natural slow recovery if DHW was high
      if (targetDHW > 0.15) {
        targetDHW = +(targetDHW - 0.02).toFixed(2);
      }
      if (targetDHW > 4.0) bleachingRisk = 'Alert Level 1';
      else if (targetDHW > 1.5) bleachingRisk = 'Warning';
      else if (targetDHW > 0.5) bleachingRisk = 'Watch';
      else bleachingRisk = 'None';

      // Routine telemetry check log every 18 ticks
      if (tickCount % 18 === 0) {
        const routineMetrics = [
          { code: 'CTD-SBE37-902', name: 'SST & Salinity', val: `${targetTemp.toFixed(2)}°C`, sev: 'normal' as AlertSeverity, msg: 'Telemetry stream synchronous. Calibrated drift within ±0.002°C.' },
          { code: 'HYDRO-HTI96-104', name: 'Acoustic Soundscape', val: `${targetBiomass.toFixed(1)} dB`, sev: 'normal' as AlertSeverity, msg: 'Reef soundscape baseline vibrant. Snapping shrimp high-frequency band consistent.' },
          { code: 'ARGO-BUOY-77', name: 'Wave Profiler', val: `${(0.8 + Math.cos(hours) * 0.3).toFixed(2)} m`, sev: 'normal' as AlertSeverity, msg: 'Surface wave swell nominal. Solar PV charging array operating at 96% efficiency.' }
        ];
        const chosen = routineMetrics[Math.floor(Math.random() * routineMetrics.length)];
        generatedLog = {
          id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          timestamp: simulatedDate.toLocaleTimeString('en-US', { hour12: false }),
          epoch: Date.now(),
          stationId: station.id,
          sensorCode: chosen.code,
          severity: chosen.sev,
          metric: chosen.name,
          value: chosen.val,
          message: chosen.msg
        };
      }
    }

    // Smooth exponential moving average transition (low-pass filter)
    const alpha = 0.35;
    const smoothTemp = +(prevSnapshot.temperature * (1 - alpha) + targetTemp * alpha).toFixed(2);
    const smoothPh = +(prevSnapshot.ph * (1 - alpha) + targetPh * alpha).toFixed(3);
    const smoothAragonite = +(prevSnapshot.aragoniteSaturation * (1 - alpha) + targetAragonite * alpha).toFixed(2);
    const smoothDO = +(prevSnapshot.dissolvedOxygen * (1 - alpha) + targetDO * alpha).toFixed(2);
    const smoothChl = +(prevSnapshot.chlorophyllA * (1 - alpha) + targetChl * alpha).toFixed(3);
    const smoothTurbidity = +(prevSnapshot.turbidityNTU * (1 - alpha) + targetTurbidity * alpha).toFixed(2);
    const smoothBiomass = +(prevSnapshot.acousticBiomassIndex * (1 - alpha) + targetBiomass * alpha).toFixed(1);

    const nextSnapshot: TelemetrySnapshot = {
      timestamp: simulatedDate.getTime(),
      timeDisplay: simulatedDate.toLocaleTimeString('en-US', { hour12: false }),
      temperature: smoothTemp,
      temperatureAnomaly: +(smoothTemp - station.baseline.temperature).toFixed(2),
      ph: smoothPh,
      aragoniteSaturation: smoothAragonite,
      dissolvedOxygen: smoothDO,
      chlorophyllA: smoothChl,
      turbidityNTU: smoothTurbidity,
      acousticBiomassIndex: smoothBiomass,
      salinityPSU: +(35.2 + Math.sin(hours / 2) * 0.2).toFixed(2),
      coralBleachingRisk: bleachingRisk,
      degreeHeatingWeeks: +targetDHW.toFixed(2),
      currentSpeedKnots: +(1.4 + Math.sin(hours) * 0.6).toFixed(2),
      currentDirectionDeg: Math.round((140 + Math.sin(hours) * 35) % 360),
      waveHeightMeters: +(0.8 + Math.cos(hours) * 0.3).toFixed(2),
      solarRadiationPAR: Math.round(solarFactor * 1650)
    };

    return { nextSnapshot, logEntry: generatedLog };
  }
}
