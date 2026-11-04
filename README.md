# Thalassa Bio-Marine OS (ThalassaOS)

An original, premium-grade oceanographic intelligence, marine biosphere monitoring, and coral reef restoration operating system. Built with TypeScript, React 18, Tailwind CSS, and Web Audio API.

---

## 🌊 Product Overview

ThalassaOS is designed for oceanographic research stations, autonomous sensor buoys, and Marine Protected Area (MPA) restoration initiatives across equatorial atolls and coral archipelagos. It combines thermodynamic climate simulation, bathymetric asset tracking, real-time bio-acoustic soundscape synthesis, and predictive ecological intervention engineering.

### Key Capabilities
- **High-Frequency Telemetry Observatory**: Continuous biogeochemical simulation across 5 premier global marine reserves (Aldabra Atoll, Raja Ampat, Belize Mesoamerican Barrier, Chagos Trench, and Tuamotu Biosphere). Monitors Sea Surface Temperature (SST & $\Delta$SST anomaly), Aragonite Saturation ($\Omega_{arg}$), pH, Dissolved Oxygen, Chlorophyll-A fluorescence, Turbidity NTU, and Acoustic Biomass.
- **Biogeochemical Physics Engine**: Interactive simulation controls with pause/play, 1x/5x/20x time multipliers, and dynamic anomaly injection (Marine Heatwaves, Acidification Pulses, Hypoxic Upwelling, Algal Blooms).
- **Bathymetric Spatial Radar**: Subsea depth contours from 0m to -4,200m abyss, tracking autonomous surface gliders, profiling buoys, and benthic rovers.
- **Bio-Acoustic Hydrophone Studio**: In-browser Web Audio API soundscape synthesis (sub-bass ocean swells, snapping shrimp crackles, cetacean vocalizations, acoustic telemetry chirps) with real-time FFT spectrogram and waveform oscilloscope.
- **Reef Restoration Laboratory**: Dynamic multi-variable intervention simulator (thermally resilient larval seeding, deep cold-water upwelling pumps, benthic alkalinity dosing, acoustic fish recruitment beacons) with multi-year comparative trajectory forecasting.
- **Taxa Genomic Ledger & Blue Carbon Studio**: Species dossiers with thermal limits and genetic clades, alongside Blue Carbon accounting and verifiable ecological audit certificates.

---

## 🎨 Visual Identity & Tropical Palette

Crafted with a sophisticated tropical marine aesthetic:
- **Abyss Deep**: `#020b0d` / `#041517` / `#072124` / `#0c2d32`
- **Lagoon Emerald**: `#10b981` / `#059669` / `#34d399`
- **Bioluminescent Cyan**: `#06b6d4` / `#22d3ee` / `#38bdf8`
- **Tropical Hibiscus Coral**: `#f43f5e` / `#fb7185` / `#be123c`
- **Sunburst Amber**: `#f59e0b` / `#fbbf24` / `#d97706`
- **Atoll Warm Sand**: `#fdfbf7` / `#f7f3ea` / `#ede4d4`

Typography:
- Headers & Titles: **Outfit**
- Body & UI: **Plus Jakarta Sans**
- Data & Telemetry: **JetBrains Mono**

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or higher, tested on Node v24)
- npm (v9.x or higher)

### Installation
Clone or navigate to the repository directory and install dependencies:
```bash
npm install
```

### Running the Application in Development Mode
To launch the Vite development server with hot module replacement:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### Building for Production
To generate an optimized, type-checked production bundle:
```bash
npm run build
```
The compiled output will be generated in the `dist/` directory.

### Previewing the Production Build
To test the production build locally:
```bash
npm run preview
```

### Verification & Testing
To run TypeScript compiler verification without emitting files:
```bash
npx tsc --noEmit
```

---

## 📁 Project Structure

```
yearn/
├── index.html              # HTML5 entry with Google Fonts & meta tags
├── package.json            # Project manifest & dependencies
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tropical design tokens & animations
├── postcss.config.js       # PostCSS plugins
├── PLAN.md                 # Single source of truth feature roadmap & status
├── README.md               # Project guide & documentation
└── src/
    ├── main.tsx            # React application entrypoint
    ├── App.tsx             # Root application shell & routing
    ├── index.css           # Global Tailwind directives & glassmorphism
    ├── types/              # Domain models (telemetry, stations, alerts)
    ├── data/               # Realistic marine reserves & baseline stations
    ├── services/           # Simulation engine, physics calculations
    └── components/         # Modular, reusable UI components
        ├── layout/         # Navigation, telemetry ticker, header
        ├── observatory/    # Telemetry cards, charts, stream log, anomaly injector
        ├── spatial/        # Bathymetric map, fleet radar (Phase 2)
        ├── acoustics/      # Web Audio hydrophone & spectrogram (Phase 3)
        ├── restoration/    # Intervention lab & projection models (Phase 4)
        └── ledger/         # Taxa index & Blue Carbon exporter (Phase 5)
```
