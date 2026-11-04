import { MarineStation } from '../types';

export const MARINE_STATIONS: MarineStation[] = [
  {
    id: 'sta-aldabra',
    name: 'Aldabra Atoll Marine Sanctuary',
    shortCode: 'ALD-01',
    region: 'Outer Islands, Seychelles',
    ocean: 'Western Indian Ocean',
    coordinates: {
      lat: -9.4184,
      lng: 46.3477,
      latDMS: "9°25'06\" S",
      lngDMS: "46°20'51\" E"
    },
    depthMeters: {
      min: 2,
      max: 1850,
      average: 42
    },
    mpaCategory: 'UNESCO World Heritage / Strict Biosphere',
    primaryEcosystem: 'Pristine Coral Atoll Lagoon & Deep Oceanic Drop-off',
    description: 'One of the largest elevated coral atolls on Earth, largely untouched by human development with extreme biodiversity, dense predatory shark populations, and giant coral tables.',
    baseline: {
      temperature: 28.4,
      ph: 8.16,
      aragonite: 4.02,
      dissolvedOxygen: 6.95,
      chlorophyllA: 0.28,
      turbidity: 0.45,
      acousticBiomass: 68.4
    },
    activeSensors: {
      buoys: 12,
      gliders: 4,
      hydrophones: 8,
      benthicRovers: 2
    },
    healthScore: 94,
    dominantClade: 'Clade C1 & D1a (Thermal-Tolerant Porites)',
    coralCoveragePct: 62.8
  },
  {
    id: 'sta-raja-ampat',
    name: 'Raja Ampat Coral Haven',
    shortCode: 'RJA-04',
    region: 'Bird\'s Head Peninsula, West Papua',
    ocean: 'Coral Triangle (Western Pacific)',
    coordinates: {
      lat: -0.2343,
      lng: 130.5186,
      latDMS: "0°14'03\" S",
      lngDMS: "130°31'07\" E"
    },
    depthMeters: {
      min: 1,
      max: 950,
      average: 35
    },
    mpaCategory: 'Marine Protected Area Network (IUCN II)',
    primaryEcosystem: 'Karst Island Lagoon & High-Energy Barrier Straits',
    description: 'The global epicenter of marine biodiversity, sheltering over 600 scleractinian coral species and 1,500 reef fish species, sustained by nutrient-rich tidal whirlpools and currents.',
    baseline: {
      temperature: 29.1,
      ph: 8.14,
      aragonite: 3.96,
      dissolvedOxygen: 6.82,
      chlorophyllA: 0.38,
      turbidity: 0.62,
      acousticBiomass: 74.2
    },
    activeSensors: {
      buoys: 18,
      gliders: 6,
      hydrophones: 12,
      benthicRovers: 4
    },
    healthScore: 91,
    dominantClade: 'Symbiodiniaceae Clade A & C3',
    coralCoveragePct: 67.4
  },
  {
    id: 'sta-belize',
    name: 'Belize Mesoamerican Barrier',
    shortCode: 'BLZ-02',
    region: 'Glover\'s Reef & Turneffe Atoll, Belize',
    ocean: 'Caribbean Sea',
    coordinates: {
      lat: 16.8242,
      lng: -87.8015,
      latDMS: "16°49'27\" N",
      lngDMS: "87°48'05\" W"
    },
    depthMeters: {
      min: 3,
      max: 3200,
      average: 28
    },
    mpaCategory: 'UNESCO World Heritage Barrier Reserve',
    primaryEcosystem: 'Mesoamerican Barrier System & Patch Reef Complexes',
    description: 'The largest barrier reef in the Western Hemisphere, renowned for Acropora palmata thickets, deep sponge walls, and active offshore blue hole sinkholes.',
    baseline: {
      temperature: 28.8,
      ph: 8.11,
      aragonite: 3.88,
      dissolvedOxygen: 6.65,
      chlorophyllA: 0.32,
      turbidity: 0.58,
      acousticBiomass: 62.1
    },
    activeSensors: {
      buoys: 14,
      gliders: 3,
      hydrophones: 6,
      benthicRovers: 3
    },
    healthScore: 82,
    dominantClade: 'Clade B1 & F4 Endosymbionts',
    coralCoveragePct: 48.3
  },
  {
    id: 'sta-chagos',
    name: 'Chagos Marine Trench & Archipelago',
    shortCode: 'CHG-07',
    region: 'Great Chagos Bank & Salomon Islands',
    ocean: 'Central Indian Ocean',
    coordinates: {
      lat: -5.3211,
      lng: 72.1539,
      latDMS: "5°19'16\" S",
      lngDMS: "72°09'14\" E"
    },
    depthMeters: {
      min: 5,
      max: 5400,
      average: 85
    },
    mpaCategory: 'No-Take Marine Reserve (IUCN Ia)',
    primaryEcosystem: 'Deep Oceanic Seamount & Submerged Carbonate Bank',
    description: 'A remote oceanic wilderness exhibiting exceptional water clarity, vast table coral plateaus, and pristine pelagic apex predator aggregations.',
    baseline: {
      temperature: 27.9,
      ph: 8.19,
      aragonite: 4.12,
      dissolvedOxygen: 7.12,
      chlorophyllA: 0.22,
      turbidity: 0.32,
      acousticBiomass: 65.8
    },
    activeSensors: {
      buoys: 10,
      gliders: 5,
      hydrophones: 7,
      benthicRovers: 2
    },
    healthScore: 89,
    dominantClade: 'Durusdinium trenchii (High Thermal Tolerance Clade D)',
    coralCoveragePct: 59.1
  },
  {
    id: 'sta-tuamotu',
    name: 'Tuamotu Deep Biosphere',
    shortCode: 'TMT-09',
    region: 'Rangiroa & Fakarava Atoll, French Polynesia',
    ocean: 'South Pacific Ocean',
    coordinates: {
      lat: -15.1147,
      lng: -147.6432,
      latDMS: "15°06'53\" S",
      lngDMS: "147°38'35\" W"
    },
    depthMeters: {
      min: 1,
      max: 2400,
      average: 38
    },
    mpaCategory: 'UNESCO Biosphere Reserve',
    primaryEcosystem: 'Hyper-Oligotrophic Deep Oceanic Lagoon Pass',
    description: 'Famous for raging tidal passes with hundreds of gray reef sharks, pristine coralline algal ridges, and high aragonite mineral stability.',
    baseline: {
      temperature: 28.2,
      ph: 8.18,
      aragonite: 4.08,
      dissolvedOxygen: 7.04,
      chlorophyllA: 0.24,
      turbidity: 0.39,
      acousticBiomass: 71.5
    },
    activeSensors: {
      buoys: 16,
      gliders: 4,
      hydrophones: 9,
      benthicRovers: 3
    },
    healthScore: 92,
    dominantClade: 'Clade C2 / Breviolum',
    coralCoveragePct: 64.2
  }
];
