import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Info, HelpCircle } from 'lucide-react';

interface TelemetryMetricCardProps {
  title: string;
  subtitle: string;
  value: string | number;
  unit: string;
  anomalyDelta: number;
  baseline: number;
  statusLabel: string;
  statusTone: 'emerald' | 'amber' | 'coral' | 'biolum';
  historyValues: number[];
  icon: React.ReactNode;
  scientificContext: {
    description: string;
    optimalRange: string;
    criticalThreshold: string;
    consequences: string;
  };
}

export const TelemetryMetricCard: React.FC<TelemetryMetricCardProps> = ({
  title,
  subtitle,
  value,
  unit,
  anomalyDelta,
  baseline,
  statusLabel,
  statusTone,
  historyValues,
  icon,
  scientificContext
}) => {
  const [showDetail, setShowDetail] = useState(false);

  // Status Tone Styling
  const toneMap = {
    emerald: {
      badge: 'bg-lagoon-500/15 text-lagoon-300 border-lagoon-500/30',
      sparklineStroke: '#10b981',
      sparklineFill: 'url(#gradient-lagoon)',
      glow: 'shadow-glow-lagoon',
      iconBg: 'bg-lagoon-500/10 border-lagoon-500/20 text-lagoon-400'
    },
    amber: {
      badge: 'bg-sunburst-500/15 text-sunburst-300 border-sunburst-500/30',
      sparklineStroke: '#f59e0b',
      sparklineFill: 'url(#gradient-amber)',
      glow: 'shadow-glow-sunburst',
      iconBg: 'bg-sunburst-500/10 border-sunburst-500/20 text-sunburst-400'
    },
    coral: {
      badge: 'bg-coral-500/15 text-coral-300 border-coral-500/30',
      sparklineStroke: '#f43f5e',
      sparklineFill: 'url(#gradient-coral)',
      glow: 'shadow-glow-coral',
      iconBg: 'bg-coral-500/10 border-coral-500/20 text-coral-400'
    },
    biolum: {
      badge: 'bg-biolum-500/15 text-biolum-300 border-biolum-500/30',
      sparklineStroke: '#06b6d4',
      sparklineFill: 'url(#gradient-biolum)',
      glow: 'shadow-glow-biolum',
      iconBg: 'bg-biolum-500/10 border-biolum-500/20 text-biolum-400'
    }
  };

  const currentTone = toneMap[statusTone] || toneMap.emerald;

  // Calculate SVG Sparkline coordinates
  const width = 200;
  const height = 48;
  const padding = 4;
  
  const minVal = historyValues.length ? Math.min(...historyValues) : 0;
  const maxVal = historyValues.length ? Math.max(...historyValues) : 1;
  const range = maxVal - minVal === 0 ? 1 : maxVal - minVal;

  const points = historyValues.map((val, idx) => {
    const x = padding + (idx / Math.max(1, historyValues.length - 1)) * (width - padding * 2);
    const y = height - padding - ((val - minVal) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const pathD = points.length > 0 ? `M ${points.join(' L ')}` : '';
  const areaD = points.length > 0
    ? `M ${points[0]} L ${points.join(' L ')} L ${width - padding},${height} L ${padding},${height} Z`
    : '';

  const lastPoint = points.length > 0 ? points[points.length - 1].split(',') : [0, 0];

  return (
    <div className="relative group rounded-2xl glass-panel p-5 transition-all duration-300 hover:border-lagoon-500/40 hover:shadow-xl hover:-translate-y-0.5">
      {/* Background gradients */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <linearGradient id="gradient-lagoon" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="gradient-amber" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="gradient-coral" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="gradient-biolum" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Top Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-xl border ${currentTone.iconBg}`}>
            {icon}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-display font-semibold text-sand-50 text-base tracking-tight">
                {title}
              </h3>
              <button
                onClick={() => setShowDetail(!showDetail)}
                className="text-sand-400 hover:text-sand-200 transition-colors"
                title="View Oceanographic Context"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-sand-300/70 font-sans tracking-wide">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <span className={`text-[10px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 rounded-full border ${currentTone.badge}`}>
          {statusLabel}
        </span>
      </div>

      {/* Main Figures Row */}
      <div className="flex items-baseline justify-between mb-3">
        <div className="flex items-baseline space-x-1.5">
          <span className="font-mono text-3xl font-bold tracking-tight text-sand-50 drop-shadow-sm">
            {value}
          </span>
          <span className="font-mono text-sm text-sand-300 font-medium">
            {unit}
          </span>
        </div>

        {/* Anomaly Delta Indicator */}
        <div className="flex items-center space-x-1 text-xs font-mono font-medium">
          {anomalyDelta > 0 ? (
            <TrendingUp className={`w-3.5 h-3.5 ${statusTone === 'coral' ? 'text-coral-400' : 'text-lagoon-400'}`} />
          ) : anomalyDelta < 0 ? (
            <TrendingDown className={`w-3.5 h-3.5 ${statusTone === 'coral' ? 'text-coral-400' : 'text-biolum-400'}`} />
          ) : null}
          <span className={
            Math.abs(anomalyDelta) > 1.0 ? 'text-coral-400 font-bold' :
            Math.abs(anomalyDelta) > 0.3 ? 'text-sunburst-400' : 'text-lagoon-300'
          }>
            {anomalyDelta > 0 ? `+${anomalyDelta}` : anomalyDelta}
          </span>
          <span className="text-[10px] text-sand-400/80">vs base ({baseline})</span>
        </div>
      </div>

      {/* Sparkline Graph */}
      <div className="h-12 w-full pt-1 relative overflow-hidden rounded-lg bg-abyss-900/40 border border-abyss-800/80">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Fill under the curve */}
          {areaD && (
            <path
              d={areaD}
              fill={currentTone.sparklineFill}
            />
          )}

          {/* Sparkline trace */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke={currentTone.sparklineStroke}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Latest point ping */}
          {lastPoint[0] !== 0 && (
            <circle
              cx={lastPoint[0]}
              cy={lastPoint[1]}
              r="3.5"
              fill={currentTone.sparklineStroke}
              className="animate-pulse"
            />
          )}
        </svg>
      </div>

      {/* Expandable Oceanographic Context Drawer */}
      {showDetail && (
        <div className="mt-3 p-3 rounded-xl bg-abyss-950/80 border border-lagoon-500/20 text-xs space-y-2 animate-fadeIn">
          <div className="flex items-start justify-between">
            <span className="font-semibold text-lagoon-300 flex items-center space-x-1">
              <Info className="w-3.5 h-3.5 mr-1" /> Oceanographic Significance
            </span>
            <button
              onClick={() => setShowDetail(false)}
              className="text-sand-400 hover:text-sand-200 text-[11px]"
            >
              Close
            </button>
          </div>
          <p className="text-sand-200 leading-relaxed text-[11px]">
            {scientificContext.description}
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-abyss-800 text-[10px] font-mono">
            <div>
              <span className="text-sand-400 block">Baseline Band:</span>
              <span className="text-lagoon-300 font-semibold">{scientificContext.optimalRange}</span>
            </div>
            <div>
              <span className="text-sand-400 block">Critical Threshold:</span>
              <span className="text-coral-400 font-semibold">{scientificContext.criticalThreshold}</span>
            </div>
          </div>
          <p className="text-[10px] text-sand-300/80 italic pt-1 border-t border-abyss-850">
            Impact: {scientificContext.consequences}
          </p>
        </div>
      )}
    </div>
  );
};
