import React, { useState, useMemo } from 'react';
import { SensorLogEntry, AlertSeverity } from '../../types';
import { Terminal, Filter, Download, Trash2, PauseCircle, PlayCircle, Search, Wifi } from 'lucide-react';

interface LiveStreamLogProps {
  logs: SensorLogEntry[];
  onClearLogs: () => void;
}

export const LiveStreamLog: React.FC<LiveStreamLogProps> = ({ logs, onClearLogs }) => {
  const [filterSeverity, setFilterSeverity] = useState<AlertSeverity | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchSeverity = filterSeverity === 'all' || log.severity === filterSeverity;
      const matchSearch =
        searchTerm === '' ||
        log.sensorCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.metric.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.message.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSeverity && matchSearch;
    });
  }, [logs, filterSeverity, searchTerm]);

  const severityBadge = (sev: AlertSeverity) => {
    switch (sev) {
      case 'critical':
        return 'bg-coral-500/20 text-coral-300 border-coral-500/40';
      case 'warning':
        return 'bg-sunburst-500/20 text-sunburst-300 border-sunburst-500/40';
      case 'advisory':
        return 'bg-biolum-500/20 text-biolum-300 border-biolum-500/40';
      case 'normal':
      default:
        return 'bg-lagoon-500/15 text-lagoon-300 border-lagoon-500/30';
    }
  };

  const downloadLogJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `thalassa-telemetry-log-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="rounded-2xl glass-panel p-5 border border-lagoon-500/20 flex flex-col h-[400px]">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-abyss-800 gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-lagoon-500/10 text-lagoon-400 border border-lagoon-500/20">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-sand-50 text-base flex items-center space-x-2">
              <span>Telemetry Packet Stream & Anomaly Log</span>
              <span className="flex items-center space-x-1 text-[11px] font-mono text-lagoon-400 font-normal">
                <Wifi className="w-3 h-3 text-lagoon-400 animate-pulse" />
                <span>Uplink: LEO Iridium (42ms)</span>
              </span>
            </h3>
            <p className="text-[11px] text-sand-300">
              High-frequency oceanic sensor network data packets and biogeochemical threshold triggers.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border transition-all ${
              isPaused
                ? 'bg-sunburst-500/20 text-sunburst-300 border-sunburst-500/40'
                : 'bg-abyss-900 text-sand-300 border-abyss-800 hover:text-sand-100 hover:bg-abyss-850'
            }`}
            title={isPaused ? 'Resume stream autoscroll' : 'Pause stream view'}
          >
            {isPaused ? <PlayCircle className="w-3.5 h-3.5" /> : <PauseCircle className="w-3.5 h-3.5" />}
            <span>{isPaused ? 'Resume' : 'Freeze'}</span>
          </button>

          <button
            onClick={downloadLogJSON}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-abyss-900 text-sand-300 border border-abyss-800 hover:text-sand-100 hover:bg-abyss-850 transition-colors"
            title="Export raw JSON log"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={onClearLogs}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-abyss-900 text-coral-400 border border-abyss-800 hover:bg-coral-950/30 transition-colors"
            title="Clear buffer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        {/* Severity Filter Chips */}
        <div className="flex items-center space-x-1 text-xs">
          <Filter className="w-3 h-3 text-sand-400 mr-1" />
          {(['all', 'normal', 'advisory', 'warning', 'critical'] as const).map((sev) => {
            const isActive = filterSeverity === sev;
            return (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono capitalize transition-all ${
                  isActive
                    ? 'bg-lagoon-500 text-abyss-950 font-bold shadow-glow-lagoon'
                    : 'text-sand-400 hover:text-sand-200 bg-abyss-900/80 border border-abyss-800'
                }`}
              >
                {sev}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-sand-400 absolute left-2.5 top-2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search sensor / metric..."
            className="pl-8 pr-3 py-1 text-xs rounded-lg bg-abyss-950 border border-abyss-800 text-sand-100 placeholder-sand-500 focus:outline-none focus:border-lagoon-500 font-mono w-48 transition-colors"
          />
        </div>
      </div>

      {/* Terminal Log Console */}
      <div className="flex-1 overflow-y-auto space-y-1.5 font-mono text-[11px] pr-1 select-text">
        {filteredLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-sand-500 text-xs">
            <span>No telemetry logs match the active filter criteria.</span>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start space-x-2 p-2 rounded-lg bg-abyss-950/60 border border-abyss-800/80 hover:bg-abyss-900/60 transition-colors"
            >
              {/* Timestamp */}
              <span className="text-sand-400 shrink-0 select-none">[{log.timestamp}]</span>

              {/* Sensor Code */}
              <span className="text-biolum-300 font-semibold shrink-0">
                {log.sensorCode}
              </span>

              {/* Severity Pill */}
              <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded border font-semibold shrink-0 ${severityBadge(log.severity)}`}>
                {log.severity}
              </span>

              {/* Metric & Value */}
              <span className="text-sand-200 font-medium shrink-0">
                {log.metric}: <strong className="text-sand-50">{log.value}</strong>
              </span>

              {/* Detail Message */}
              <span className="text-sand-300/80 truncate">
                — {log.message}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
