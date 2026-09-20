import { AUTO_CATEGORIES } from '../data/autoDatabase.js';
import { MOTO_CATEGORIES } from '../data/motoDatabase.js';
import { CIRCUITS_DATA } from '../data/circuitsDatabase.js';
import { db } from '../data/databaseManager.js';
import { DRIVER_BASELINES } from '../data/driverBaselines.js';
import { GoatScorer } from './goatScorer.js';
import { RaceEngine } from './raceEngine.js';

// Profili di Background con statistiche di partenza ribassate, realistiche ed equilibrate
export const BACKGROUND_PROFILES = {
  prodigy: {
    id: "prodigy",
    name: "Talento Puro",
    icon: "⚡",
    badge: "⚡ TALENTO PURO",
    desc: "Cresciuto nei kartodromi senza budget ma con riflessi fuori dal comune e istinto puro. Grande velocità sul giro secco e abilità nel bagnato, ma devi affinare la gestione gomme e la sensibilità tecnica.",
    startMoney: 15000,
    startingPointsPool: 8,
    baseAttributes: {
      pace: 65,
      racecraft: 63,
      tyreMgmt: 57,
      consistency: 59,
      wetSkill: 64,
      technicalFeedback: 55,
      fitness: 64,
      marketability: 48
    },
    pros: "Velocità pura e riflessi sul bagnato",
    cons: "Gestione pneumatici e telemetria da sviluppare"
  },

  dynasty: {
    id: "dynasty",
    name: "Figlio d'Arte",
    icon: "👑",
    badge: "👑 FIGLIO D'ARTE",
    desc: "Il tuo cognome è già nella storia dei motori. Sei cresciuto nei box con ingegneri e telemetristi di livello mondiale. Spiccata maturità tecnica, costanza e sponsor, ma aspettative altissime.",
    startMoney: 45000,
    startingPointsPool: 8,
    baseAttributes: {
      pace: 61,
      racecraft: 60,
      tyreMgmt: 63,
      consistency: 62,
      wetSkill: 58,
      technicalFeedback: 65,
      fitness: 61,
      marketability: 68
    },
    pros: "Sensibilità tecnica, costanza e gestione gomme",
    cons: "Velocità pura sul giro secco leggermente inferiore"
  },

  paydriver: {
    id: "paydriver",
    name: "Pilota con la Valigia",
    icon: "💼",
    badge: "💼 PILOTA CON LA VALIGIA",
    desc: "Ingenti capitali e sponsor per assicurarsi subito i migliori materiali. Altissima notorietà e budget iniziale, ma dovrai zittire gli scettici costruendo la tua velocità in pista curva dopo curva.",
    startMoney: 180000,
    startingPointsPool: 8,
    baseAttributes: {
      pace: 58,
      racecraft: 57,
      tyreMgmt: 60,
      consistency: 60,
      wetSkill: 55,
      technicalFeedback: 58,
      fitness: 59,
      marketability: 82
    },
    pros: "Budget iniziale ricchissimo per HQ e R&D",
    cons: "Statistiche di guida grezze, richiede duro allenamento"
  }
};

// Configurazione Dettagliata Sottocomponenti R&D Reparto Corse
export const RD_SUBCOMPONENTS_CONFIG = {
  // 🌬️ AERODINAMICA
  aero_front_wing: {
    id: 'aero_front_wing',
    dept: 'aero',
    deptName: 'Aerodinamica',
    name: 'Ala Anteriore & Flap Flessibili',
    desc: 'Migliora l\'inserimento in curva veloce, la sensibilità direzionale e il controllo dei vortici turbolenti.',
    icon: '🏎️',
    maxLevel: 5,
    baseCost: 45000,
    costMult: 30000,
    basePoints: 85,
    pointsMult: 55,
    paceGain: 0.45,
    reliabilityGain: 0,
    spec: '+0.45 Passo • Inserimento in Curva & Bilanciamento'
  },
  aero_floor_venturi: {
    id: 'aero_floor_venturi',
    dept: 'aero',
    deptName: 'Aerodinamica',
    name: 'Fondo Venturi & Canali Effetto Suolo',
    desc: 'Genera elevatissimo carico aerodinamico dal sottovettura mantenendo minima la resistenza all\'avanzamento.',
    icon: '🌪️',
    maxLevel: 5,
    baseCost: 65000,
    costMult: 45000,
    basePoints: 110,
    pointsMult: 70,
    paceGain: 0.60,
    reliabilityGain: 0,
    spec: '+0.60 Passo • Carico Globale & Efficienza ad Alta Velocità'
  },
  aero_rear_wing_drs: {
    id: 'aero_rear_wing_drs',
    dept: 'aero',
    deptName: 'Aerodinamica',
    name: 'Ala Posteriore & Meccanismo DRS',
    desc: 'Ottimizza lo scarico d\'aria sul retrotreno e la velocità di punta in rettilineo a DRS aperto.',
    icon: '⚡',
    maxLevel: 5,
    baseCost: 50000,
    costMult: 35000,
    basePoints: 90,
    pointsMult: 60,
    paceGain: 0.45,
    reliabilityGain: 0,
    spec: '+0.45 Passo • Velocità di Punta & Efficacia DRS'
  },

  // 🔥 POWER UNIT & MOTORE
  engine_ice_combustion: {
    id: 'engine_ice_combustion',
    dept: 'engine',
    deptName: 'Power Unit & Motore',
    name: 'Motore Termico (ICE) & Precamera',
    desc: 'Aumenta la pressione nella camera di scoppio e i cavalli vapore effettivi a pieno regime di rotazione.',
    icon: '🔥',
    maxLevel: 5,
    baseCost: 75000,
    costMult: 50000,
    basePoints: 120,
    pointsMult: 75,
    paceGain: 0.60,
    reliabilityGain: 0,
    spec: '+0.60 Passo • Cavalli Vapore & Allungo'
  },
  engine_ers_hybrid: {
    id: 'engine_ers_hybrid',
    dept: 'engine',
    deptName: 'Power Unit & Motore',
    name: 'Sistema Ibrido ERS & MGU-K',
    desc: 'Aumenta il recupero dell\'energia cinetica in staccata e la spinta della coppia elettrica istantanea in trazione.',
    icon: '🔋',
    maxLevel: 5,
    baseCost: 60000,
    costMult: 40000,
    basePoints: 100,
    pointsMult: 65,
    paceGain: 0.50,
    reliabilityGain: 0,
    spec: '+0.50 Passo • Trazione Ibrida & Erogazione Coppia'
  },
  engine_ecu_exhaust: {
    id: 'engine_ecu_exhaust',
    dept: 'engine',
    deptName: 'Power Unit & Motore',
    name: 'Mappature ECU & Scarichi Inconel',
    desc: 'Mappature progressive del gas, isolamento termico avanzato e riduzione degli stress da detonazione.',
    icon: '💻',
    maxLevel: 5,
    baseCost: 40000,
    costMult: 28000,
    basePoints: 75,
    pointsMult: 45,
    paceGain: 0.35,
    reliabilityGain: 2,
    spec: '+0.35 Passo • +2% Affidabilità Termica'
  },

  // ⚙️ TELAIO & SOSPENSIONI
  chassis_suspension: {
    id: 'chassis_suspension',
    dept: 'chassis',
    deptName: 'Telaio & Sospensioni',
    name: 'Cinematica Sospensioni & Barre Antirollio',
    desc: 'Ottimizza l\'assorbimento delle asperità e dei cordoli, preservando l\'impronta a terra degli pneumatici.',
    icon: '⚙️',
    maxLevel: 5,
    baseCost: 50000,
    costMult: 35000,
    basePoints: 90,
    pointsMult: 60,
    paceGain: 0.45,
    reliabilityGain: 0,
    spec: '+0.45 Passo • Grip Meccanico & Gestione Gomme'
  },
  chassis_monocoque: {
    id: 'chassis_monocoque',
    dept: 'chassis',
    deptName: 'Telaio & Sospensioni',
    name: 'Monoscocca in Carbonio Ultraleggera',
    desc: 'Riduce la massa sospesa complessiva, abbassando il baricentro ed esaltando la reattività nei cambi di direzione.',
    icon: '🏎️',
    maxLevel: 5,
    baseCost: 60000,
    costMult: 42000,
    basePoints: 105,
    pointsMult: 68,
    paceGain: 0.50,
    reliabilityGain: 0,
    spec: '+0.50 Passo • Agilità & Reattività nei Settori Lenti'
  },
  chassis_brakes: {
    id: 'chassis_brakes',
    dept: 'chassis',
    deptName: 'Telaio & Sospensioni',
    name: 'Impianto Frenante Carbon-Carbon & Condotti',
    desc: 'Staccate fulminee, minor surriscaldamento del liquido freni e controllo calibrato delle temperature cerchi.',
    icon: '🛑',
    maxLevel: 5,
    baseCost: 40000,
    costMult: 28000,
    basePoints: 75,
    pointsMult: 45,
    paceGain: 0.35,
    reliabilityGain: 2,
    spec: '+0.35 Passo • +2% Affidabilità in Staccata'
  },

  // 🛡️ AFFIDABILITÀ & CONTROLLO QUALITÀ (Riducono anche il rischio di fallimento R&D)
  rel_sensor_telemetry: {
    id: 'rel_sensor_telemetry',
    dept: 'reliability',
    deptName: 'Affidabilità & Qualità',
    name: 'Sensoristica Real-Time & Predictive Quality',
    desc: 'Reti di sensori wireless sui componenti critici per rilevare anomalie prima che provochino un guasto in gara.',
    icon: '📡',
    maxLevel: 5,
    baseCost: 35000,
    costMult: 25000,
    basePoints: 70,
    pointsMult: 40,
    paceGain: 0,
    reliabilityGain: 2,
    spec: '+2% Affidabilità • -1.5% Rischio Fallimento R&D'
  },
  rel_dyno_stress_test: {
    id: 'rel_dyno_stress_test',
    dept: 'reliability',
    deptName: 'Affidabilità & Qualità',
    name: 'Procedure Banco Prova Dinamico & Durabilità',
    desc: 'Stress test termomeccanici al banco prova su cambio, scatola differenziale e circuito idraulico ad alta pressione.',
    icon: '🛡️',
    maxLevel: 5,
    baseCost: 40000,
    costMult: 28000,
    basePoints: 75,
    pointsMult: 45,
    paceGain: 0,
    reliabilityGain: 2,
    spec: '+2% Affidabilità • -2.0% Rischio Fallimento R&D'
  }
};

// 🏛️ CONFIGURAZIONE STRUTTURE HQ & STAFF PERSONALE
export const HQ_CONFIG = {
  simulatorLevel: {
    id: "simulatorLevel",
    name: "Simulatore Dinamico Professionale",
    icon: "🖥️",
    baseCost: 90000,
    costMult: 70000,
    maxLevel: 5,
    desc: "Genera Punti Telemetria (PT) ogni weekend (+6 PT per livello), affina la Qualifica (+0.02s per livello) e riduce il rischio di fallimento degli upgrade R&D (-2% per livello).",
    perkText: (lvl) => `+${lvl * 6} PT • -${lvl * 2}% Rischio R&D • +${(lvl * 0.02).toFixed(2)}s Qualifica`
  },
  gymLevel: {
    id: "gymLevel",
    name: "Palestra, Fisioterapia & Crioterapia",
    icon: "🏋️",
    baseCost: 70000,
    costMult: 55000,
    maxLevel: 5,
    desc: "Aumenta la resistenza fisica (Fitness) prevenendo errori e cali di concentrazione nei finali di gara e nelle gare ad alto degrado.",
    perkText: (lvl) => `+${lvl * 2} Fitness • -${lvl * 10}% Calo fisico a fine gara`
  },
  prAgencyLevel: {
    id: "prAgencyLevel",
    name: "Ufficio Stampa & PR Agency Globale",
    icon: "📱",
    baseCost: 95000,
    costMult: 80000,
    maxLevel: 5,
    desc: "Attrae sponsor commerciali personali (+€1.800 a gara per livello) e potenzia costantemente la Marketability del pilota.",
    perkText: (lvl) => `+€${(lvl * 1800).toLocaleString()} Sponsor/GP • +${lvl * 2} Marketability`
  },
  telemetryCoachLevel: {
    id: "telemetryCoachLevel",
    name: "Coach Telemetrico & Race Engineer Dedicato",
    icon: "📈",
    baseCost: 80000,
    costMult: 65000,
    maxLevel: 5,
    desc: "Ottimizza il setup in qualifica (+0.02s per livello), genera +4 PT extra per gara e riduce il rischio di flop degli upgrade R&D (-1.5% per livello).",
    perkText: (lvl) => `+${lvl * 4} PT • -${(lvl * 1.5).toFixed(1)}% Rischio R&D • Setup Assetto`
  },
  biohackingLevel: {
    id: "biohackingLevel",
    name: "Biohacking, Chef Nutrizionista & Mental Coach",
    icon: "🧠",
    baseCost: 80000,
    costMult: 65000,
    maxLevel: 5,
    desc: "Migliora la lucidità e la Costanza in pista (+2 Costanza per livello), riducendo le probabilità di testacoda e sbavature in condizioni mutevoli.",
    perkText: (lvl) => `+${lvl * 2} Costanza • -${lvl * 12}% Rischio Sbavature`
  }
};

// 🏰 CONFIGURAZIONE ASSET LIFESTYLE & RENDITE PASSIVE
export const LIFESTYLE_ASSETS_CONFIG = [
  {
    id: "supercar",
    nameAuto: "Supercar Ferrari SF90 Stradale",
    nameAutoFictional: "Supercar Cavallino SF90",
    nameMoto: "Ducati Panigale V4 SP2",
    nameMotoFictional: "Bologna Desmo V4 SP2",
    price: 450000,
    icon: "🏎️",
    desc: "Bolide stradale da sfoggiare nel paddock. Accresce la notorietà globale ed esalta il tuo status tra i piloti d'élite.",
    fameBonus: 8,
    goatBonus: 5,
    passivePerRace: 0,
    perkBadge: "+8 Notorietà • +5 Punti GOAT"
  },
  {
    id: "villa_monaco",
    name: "Residenza Fiscale a Monte Carlo",
    price: 3500000,
    icon: "🏰",
    desc: "Attico affacciato su Port Hercule. Garantisce l'azzeramento fiscale su stipendi e premi gara (+8% guadagni netti da contratto a ogni GP!).",
    fameBonus: 15,
    goatBonus: 15,
    passivePerRace: 0,
    taxExemption: 0.08,
    perkBadge: "+8% Guadagni Netti da Contratto/Gara"
  },
  {
    id: "kart_team",
    name: "Scuderia Personale Karting & Driver Academy",
    price: 1500000,
    icon: "🏁",
    desc: "Team di sviluppo giovanile che allena i talenti del futuro. Genera una solida rendita passiva da sponsor e premi di categoria.",
    fameBonus: 10,
    goatBonus: 12,
    passivePerRace: 3500,
    perkBadge: "Rendita Passiva +€3.500 a ogni GP"
  },
  {
    id: "fashion_brand",
    name: "Brand Personale di Abbigliamento & Merchandising",
    price: 950000,
    icon: "🕶️",
    desc: "Linea esclusiva di streetwear e accessori sportivi venduta in tutto il mondo. Produce royalty proporzionali alla tua popolarità.",
    fameBonus: 12,
    goatBonus: 8,
    passivePerRace: 2200,
    perkBadge: "Rendita Royalty +€2.200 a ogni GP"
  },
  {
    id: "private_jet",
    name: "Jet Privato Long-Range con Livrea Personalizzata",
    price: 8500000,
    icon: "✈️",
    desc: "Velivolo intercontinentale per viaggiare nel massimo comfort. Annulla qualsiasi malus da jet-lag nei Gran Premi extra-europei (+1.5 Passo Mezzo nei round intercontinentali).",
    fameBonus: 25,
    goatBonus: 25,
    passivePerRace: 0,
    jetLagImmunity: true,
    perkBadge: "Immunità Jet-Lag (+1.5 Passo nei GP Extra-UE)"
  },
  {
    id: "supercar_museum",
    name: "Museo Privato & Collezione Hypercar",
    price: 5000000,
    icon: "🏛️",
    desc: "Padiglione privato con le vetture più iconiche della storia dei motori. Monumentale attrazione mediatica che consacra la tua leggenda.",
    fameBonus: 20,
    goatBonus: 35,
    passivePerRace: 4500,
    perkBadge: "Rendita +€4.500/GP • +35 Punti GOAT"
  }
];

// ⏱️ CONFIGURAZIONE STAGE & RITIRI INTENSIVI
export const TRAINING_CAMPS_CONFIG = [
  {
    id: "wet_bootcamp",
    name: "Stage di Guida su Bagnato Estremo",
    icon: "🌧️",
    cost: 60000,
    desc: "Sessioni intensive su pista allagata con kart e monoposto storiche per affinare la sensibilità sul viscido.",
    effect: "+3 Abilità Bagnato (Wet Skill)",
    apply: (player) => {
      player.attributes.wetSkill = Math.min(99, (player.attributes.wetSkill || 75) + 3);
    }
  },
  {
    id: "sim_marathon",
    name: "Maratona 48h al Simulatore con Ingegneri",
    icon: "⏱️",
    cost: 75000,
    desc: "Test no-stop al simulatore dinamico per estrarre dati telemetrici e affinare il feeling dell'assetto.",
    effect: "+35 Punti Telemetria (PT) per R&D",
    apply: (player, career) => {
      career.career.rdTelemetryPoints = (career.career.rdTelemetryPoints || 0) + 35;
    }
  },
  {
    id: "altitude_camp",
    name: "Ritiro Atletico in Alta Quota (Alpi)",
    icon: "🏔️",
    cost: 55000,
    desc: "Camp ad altitudine elevata con preparatori olimpici per potenziare il VO2 Max e la resistenza al calore.",
    effect: "+3 Forma Fisica (Fitness)",
    apply: (player) => {
      player.attributes.fitness = Math.min(99, (player.attributes.fitness || 75) + 3);
    }
  },
  {
    id: "media_tour",
    name: "Media Tour Globale & Showrun Cittadino",
    icon: "📺",
    cost: 80000,
    desc: "Esibizione su strada e conferenze stampa internazionali nelle capitali mondiali per incendiare l'entusiasmo dei tifosi.",
    effect: "+5 Marketability & Notorietà Globale",
    apply: (player) => {
      player.attributes.marketability = Math.min(99, (player.attributes.marketability || 60) + 5);
    }
  }
];

// Database delle età di partenza reali dei piloti al 2026 per la curva anagrafica di crescita e declino
export const INITIAL_DRIVER_AGES = {
  // Formula 1 2026
  drv_alonso: 45,
  drv_hamilton: 41,
  drv_hulkenberg: 39,
  drv_bottas: 37,
  drv_perez: 36,
  drv_sainz: 32,
  drv_stroll: 28,
  drv_gasly: 30,
  drv_ocon: 30,
  drv_albon: 30,
  drv_verstappen: 29,
  drv_leclerc: 29,
  drv_russell: 28,
  drv_norris: 27,
  drv_hadjar: 22,
  drv_lawson: 24,
  drv_piastri: 25,
  drv_bortoleto: 22,
  drv_colapinto: 23,
  drv_bearman: 21,
  drv_antonelli: 20,
  drv_lindblad: 19,
  // MotoGP 2026
  drv_marquez: 33,
  drv_zarco: 36,
  drv_espargaro: 37,
  drv_bagnaia: 29,
  drv_martin: 28,
  drv_bastiani: 28,
  drv_binder: 28,
  drv_quartararo: 27,
  drv_morbidelli: 31,
  drv_marini: 29,
  drv_bezzecchi: 27,
  drv_miller: 31,
  drv_vinales: 31,
  drv_rins: 30,
  drv_oliveira: 31,
  drv_alex_marquez: 30,
  drv_fernandez: 26,
  drv_acosta: 22,
  drv_aldeguer: 21,
  drv_ogura: 25,
  drv_somkiat: 27,
  // WorldSBK
  drv_bautista: 41,
  drv_rea: 39,
  drv_toprak: 29,
  drv_bulega: 26,
  drv_locatelli: 29,
  drv_bassani: 26,
  drv_iannone: 37,
  drv_petrucci: 35,
  drv_gerloff: 30,
  drv_lowes: 35,
  drv_van_der_mark: 33,
  drv_gardner: 28
};

// Pool di Mostri Sacri e Leggende storiche per la generazione dinamica dei Regens (Automobilismo)
export const AUTO_LEGENDS_REGEN_POOL = [
  {
    id: "senna",
    realName: "Ayrton Senna",
    fictionalName: "Il Mago Senna",
    regenRealNames: ["Thiago Senna da Silva", "Mateo da Silva Sena", "Tiago Silveira"],
    fictionalRegenNames: ["Tiago Il Mago", "Mateo O Fenômeno", "Thiago Il Carioca"],
    nationality: "BRA",
    number: 12,
    traits: { paceBias: 5, racecraftBias: 4, tyreMgmtBias: -1, consistencyBias: 1, wetSkillBias: 9, traitNote: "Mago della pioggia, staccatore e velocista sul giro secco" }
  },
  {
    id: "schumacher",
    realName: "Michael Schumacher",
    fictionalName: "Michele Il Barone Rosso",
    regenRealNames: ["Maximilian Schuhmacher", "Lukas Schuhmann", "Mikael Schuber"],
    fictionalRegenNames: ["Max Il Piccolo Barone", "Lukas Il Kaiser", "Mikael Il Tedesco"],
    nationality: "DEU",
    number: 1,
    traits: { paceBias: 4, racecraftBias: 4, tyreMgmtBias: 3, consistencyBias: 7, wetSkillBias: 3, traitNote: "Costanza chirurgica, mentalità vincente e resistenza fisica" }
  },
  {
    id: "lauda",
    realName: "Niki Lauda",
    fictionalName: "Niki Il Computer Viennese",
    regenRealNames: ["Nikolas Lauden", "Klaus Lauder", "Nikolaus Lauer"],
    fictionalRegenNames: ["Niko Il Calcolatore", "Klaus Mente Fredda", "Nikolaus Il Viennese"],
    nationality: "AUT",
    number: 11,
    traits: { paceBias: 2, racecraftBias: 4, tyreMgmtBias: 7, consistencyBias: 6, wetSkillBias: 0, traitNote: "Analisi telemetrica, gestione gomme e intelligenza tattica" }
  },
  {
    id: "prost",
    realName: "Alain Prost",
    fictionalName: "Alain Il Professore",
    regenRealNames: ["Antoine Proust", "Alexis Prouteau", "Adrien Prosper"],
    fictionalRegenNames: ["Antoine Il Professore Jr.", "Alexis Il Tattico", "Adrien Il Chirurgo"],
    nationality: "FRA",
    number: 2,
    traits: { paceBias: 2, racecraftBias: 5, tyreMgmtBias: 8, consistencyBias: 6, wetSkillBias: -1, traitNote: "Gestione impeccabile degli pneumatici e zero errori in gara" }
  },
  {
    id: "fangio",
    realName: "Juan Manuel Fangio",
    fictionalName: "El Chueco Maestro",
    regenRealNames: ["Manuel Balcarce", "Marcos Fanzio", "Joaquin Fangione"],
    fictionalRegenNames: ["Manuel El Maestrito", "Marcos Il Pibe", "Joaquin Il Pampa"],
    nationality: "ARG",
    number: 1,
    traits: { paceBias: 4, racecraftBias: 6, tyreMgmtBias: 4, consistencyBias: 5, wetSkillBias: 2, traitNote: "Saggezza di guida, fluidità nei cambi di marcia e lettura della pista" }
  },
  {
    id: "vettel",
    realName: "Sebastian Vettel",
    fictionalName: "Seb Il Dito Imperiale",
    regenRealNames: ["Stefan Vettler", "Sven Vedder", "Simon Vettori"],
    fictionalRegenNames: ["Stefan Baby Seb", "Sven Il Nuovo Dito", "Simon Tempesta"],
    nationality: "DEU",
    number: 5,
    traits: { paceBias: 5, racecraftBias: 3, tyreMgmtBias: 2, consistencyBias: 4, wetSkillBias: 2, traitNote: "Partenze a razzo, dominio al comando e precisione in qualifica" }
  },
  {
    id: "hunt",
    realName: "James Hunt",
    fictionalName: "James Il Ribelle",
    regenRealNames: ["Jasper Hunter", "Jem Huntley", "Archie Huntington"],
    fictionalRegenNames: ["Jasper Il Ribelle Jr.", "Jem Cuore di Leone", "Archie Wild Boy"],
    nationality: "GBR",
    number: 11,
    traits: { paceBias: 5, racecraftBias: 6, tyreMgmtBias: -2, consistencyBias: -1, wetSkillBias: 4, traitNote: "Sorpassi audaci all'esterno, coraggio puro e staccate al limite" }
  },
  {
    id: "clark",
    realName: "Jim Clark",
    fictionalName: "Jim Lo Scozzese Volante",
    regenRealNames: ["Jamie Clarke", "Jock Clarkson", "Ewan MacClark"],
    fictionalRegenNames: ["Jamie Lo Scozzese Jr.", "Jock Il Falco", "Ewan Il Silenzioso"],
    nationality: "GBR",
    number: 1,
    traits: { paceBias: 7, racecraftBias: 3, tyreMgmtBias: 5, consistencyBias: 5, wetSkillBias: 3, traitNote: "Fluidità di traiettoria paradisiaca e conservazione meccanica" }
  },
  {
    id: "villeneuve",
    realName: "Gilles Villeneuve",
    fictionalName: "Gilles L'Aviatore",
    regenRealNames: ["Gabriel Villeneuve", "Gaétan Villeroy", "Guillaume Villefort"],
    fictionalRegenNames: ["Gabriel L'Aviatore Jr.", "Gaétan Senza Paura", "Guillaume Il Folle"],
    nationality: "CAN",
    number: 27,
    traits: { paceBias: 6, racecraftBias: 7, tyreMgmtBias: -3, consistencyBias: -1, wetSkillBias: 5, traitNote: "Controsterzi spettacolari, staccate selvagge e coraggio da vendere" }
  },
  {
    id: "mansell",
    realName: "Nigel Mansell",
    fictionalName: "Nigel Il Leone",
    regenRealNames: ["Noah Manning", "Niall Manson", "Oliver Manser"],
    fictionalRegenNames: ["Noah Il Leoncino", "Niall Braccio di Ferro", "Oliver Il Gladiatore"],
    nationality: "GBR",
    number: 5,
    traits: { paceBias: 5, racecraftBias: 6, tyreMgmtBias: 0, consistencyBias: 3, wetSkillBias: 2, traitNote: "Aggressività nel corpo a corpo, staccate poderose e cuore immenso" }
  },
  {
    id: "raikkonen",
    realName: "Kimi Räikkönen",
    fictionalName: "Kimi L'Uomo di Ghiaccio",
    regenRealNames: ["Kasper Rainio", "Kalle Rämänen", "Kristian Raiko"],
    fictionalRegenNames: ["Kasper Ice Kid", "Kalle Il Freddo", "Kristian Il Silenzioso"],
    nationality: "FIN",
    number: 7,
    traits: { paceBias: 6, racecraftBias: 4, tyreMgmtBias: 6, consistencyBias: 2, wetSkillBias: 1, traitNote: "Calma di ghiaccio sotto pressione e ritmo costante sul passo gara" }
  },
  {
    id: "hakkinen",
    realName: "Mika Häkkinen",
    fictionalName: "Mika Il Finlandese Volante",
    regenRealNames: ["Markus Häkkilä", "Matias Hakola", "Eero Hakanen"],
    fictionalRegenNames: ["Markus Il Fulmine Bianco", "Matias Sisu", "Eero L'Anti-Kaiser"],
    nationality: "FIN",
    number: 1,
    traits: { paceBias: 7, racecraftBias: 4, tyreMgmtBias: 1, consistencyBias: 4, wetSkillBias: 2, traitNote: "Giro secco infallibile e staccate millimetriche nelle curve veloci" }
  },
  {
    id: "surtees",
    realName: "John Surtees",
    fictionalName: "John Il Titano Bivalente",
    regenRealNames: ["Johnathan Surtis", "Jack Surman", "Julian Surtin"],
    fictionalRegenNames: ["Jack Il Titano Jr.", "Johnathan Il Doppio Campione"],
    nationality: "GBR",
    number: 7,
    traits: { paceBias: 4, racecraftBias: 5, tyreMgmtBias: 3, consistencyBias: 5, wetSkillBias: 3, traitNote: "Versatilità suprema tra 2 e 4 ruote, grande sensibilità meccanica" }
  },
  {
    id: "piquet",
    realName: "Nelson Piquet",
    fictionalName: "Nelson Il Tattico Carioca",
    regenRealNames: ["Nilo Piquet da Silva", "Nestor Piqueira", "Nicolas Piket"],
    fictionalRegenNames: ["Nilo Il Tattico Jr.", "Nestor Astuzia Carioca"],
    nationality: "BRA",
    number: 3,
    traits: { paceBias: 4, racecraftBias: 5, tyreMgmtBias: 4, consistencyBias: 3, wetSkillBias: 2, traitNote: "Astuzia tattica, partenze fulminee e mente da stratega" }
  },
  {
    id: "stewart",
    realName: "Jackie Stewart",
    fictionalName: "Sir Jackie La Leggenda",
    regenRealNames: ["Lachlan Stewartson", "Callum Stewart", "Gordon MacStewart"],
    fictionalRegenNames: ["Lachlan Il Professore delle Highlands", "Callum Il Tattico Scozzese"],
    nationality: "GBR",
    number: 1,
    traits: { paceBias: 4, racecraftBias: 4, tyreMgmtBias: 5, consistencyBias: 6, wetSkillBias: 2, traitNote: "Precisione di guida millimetrica e sicurezza impeccabile al volante" }
  },
  {
    id: "rindt",
    realName: "Jochen Rindt",
    fictionalName: "Jochen L'Intrepido",
    regenRealNames: ["Julian Rindter", "Jonas Rindtner", "Josef Rindter"],
    fictionalRegenNames: ["Julian L'Intrepido Jr.", "Jonas Coraggio d'Acciaio"],
    nationality: "AUT",
    number: 2,
    traits: { paceBias: 6, racecraftBias: 6, tyreMgmtBias: -1, consistencyBias: 2, wetSkillBias: 3, traitNote: "Attacco continuo, riflessi felini e traiettorie non convenzionali" }
  }
];

// Pool di Leggende per i Regens Motociclismo
export const MOTO_LEGENDS_REGEN_POOL = [
  {
    id: "rossi",
    realName: "Valentino Rossi",
    fictionalName: "Valentin Il Dottore 46",
    regenRealNames: ["Valerio Rossini", "Vasco De Rossi", "Mattia Rossello"],
    fictionalRegenNames: ["Valerio Il Dottorino", "Vasco Tavullia Boy", "Mattia 46 Junior"],
    nationality: "ITA",
    number: 46,
    traits: { paceBias: 4, racecraftBias: 8, tyreMgmtBias: 5, consistencyBias: 4, wetSkillBias: 3, traitNote: "Maestro nei corpo a corpo all'ultimo giro e gestione del posteriore" }
  },
  {
    id: "agostini",
    realName: "Giacomo Agostini",
    fictionalName: "Giacomo Ago Nazionale",
    regenRealNames: ["Gianni Agosti", "Giacomo D'Agostino", "Lorenzo Agostinelli"],
    fictionalRegenNames: ["Gianni Ago Nazionale Jr.", "Giacomo Il Dominatore", "Lorenzo L'Immortale"],
    nationality: "ITA",
    number: 1,
    traits: { paceBias: 5, racecraftBias: 5, tyreMgmtBias: 4, consistencyBias: 7, wetSkillBias: 2, traitNote: "Regolarità disarmante, fughe in solitaria e percentuali record" }
  },
  {
    id: "stoner",
    realName: "Casey Stoner",
    fictionalName: "Casey Il Canguro Mannaro",
    regenRealNames: ["Callum Stone", "Caleb Stoner", "Lachlan Stone"],
    fictionalRegenNames: ["Callum Il Canguro Boy", "Caleb Polso d'Oro", "Lachlan Traiettoria Pura"],
    nationality: "AUS",
    number: 27,
    traits: { paceBias: 8, racecraftBias: 3, tyreMgmtBias: -1, consistencyBias: 3, wetSkillBias: 5, traitNote: "Controllo millimetrico della derapata e velocità supersonica in inserimento" }
  },
  {
    id: "doohan",
    realName: "Mick Doohan",
    fictionalName: "Mick Il Cannibale",
    regenRealNames: ["Mitchell Dolan", "Mason Doogan", "Marcus Doohan"],
    fictionalRegenNames: ["Mitchell Il Piccolo Cannibale", "Mason Pugno di Ferro", "Marcus Il Demolitore"],
    nationality: "AUS",
    number: 1,
    traits: { paceBias: 5, racecraftBias: 6, tyreMgmtBias: 3, consistencyBias: 6, wetSkillBias: 2, traitNote: "Tenuta fisica brutale, accelerazione rabbiosa in uscita di curva" }
  },
  {
    id: "lorenzo",
    realName: "Jorge Lorenzo",
    fictionalName: "Jorge Martillo Y Mantequilla",
    regenRealNames: ["Jordi Lorente", "Joan Lorens", "Javier Lorenzetti"],
    fictionalRegenNames: ["Jordi Martillo Jr.", "Joan Mantequilla", "Javier Compasso d'Oro"],
    nationality: "ESP",
    number: 99,
    traits: { paceBias: 6, racecraftBias: 3, tyreMgmtBias: 3, consistencyBias: 8, wetSkillBias: -2, traitNote: "Passo martellante identico al decimo e partenze a fionda" }
  },
  {
    id: "pedrosa",
    realName: "Dani Pedrosa",
    fictionalName: "Dani Il Piccolo Samurai",
    regenRealNames: ["Daniel Pedron", "Diego Pedroza", "David Pedret"],
    fictionalRegenNames: ["Daniel Il Giovane Samurai", "Diego Piuma d'Oro", "David Linea Perfetta"],
    nationality: "ESP",
    number: 26,
    traits: { paceBias: 5, racecraftBias: 4, tyreMgmtBias: 5, consistencyBias: 5, wetSkillBias: 0, traitNote: "Rialzo immediato della moto in uscita e dolcezza sul gas" }
  },
  {
    id: "hayden",
    realName: "Nicky Hayden",
    fictionalName: "Kentucky Kid Leggendario",
    regenRealNames: ["Nathan Haywood", "Noah Hayden", "Colt Haydon"],
    fictionalRegenNames: ["Nathan Kentucky Boy", "Noah Dirt Tracker", "Colt Cuore d'America"],
    nationality: "USA",
    number: 69,
    traits: { paceBias: 4, racecraftBias: 6, tyreMgmtBias: 3, consistencyBias: 4, wetSkillBias: 4, traitNote: "Guida generosa di traverso, grande cuore e costanza encomiabile" }
  },
  {
    id: "rainey",
    realName: "Wayne Rainey",
    fictionalName: "Wayne Stella Californiana",
    regenRealNames: ["Wyatt Rayner", "Warren Raines", "Weston Rainey"],
    fictionalRegenNames: ["Wyatt Stella Californiana Jr.", "Warren L'Ingegnere in Pista"],
    nationality: "USA",
    number: 1,
    traits: { paceBias: 5, racecraftBias: 5, tyreMgmtBias: 5, consistencyBias: 6, wetSkillBias: 1, traitNote: "Guida impeccabile senza sbavature, staccatore di precisione chirurgica" }
  },
  {
    id: "schwantz",
    realName: "Kevin Schwantz",
    fictionalName: "Kevin Il Matador 34",
    regenRealNames: ["Kurt Schwartz", "Kyle Schwartzen", "Kip Schwantz"],
    fictionalRegenNames: ["Kurt Il Matador Jr.", "Kyle Frenata Impossibile", "Kip Numero 34"],
    nationality: "USA",
    number: 34,
    traits: { paceBias: 6, racecraftBias: 7, tyreMgmtBias: -2, consistencyBias: 1, wetSkillBias: 4, traitNote: "Staccate a ruota posteriore alzata e sorpassi nei punti più impensabili" }
  },
  {
    id: "sheene",
    realName: "Barry Sheene",
    fictionalName: "Barry Il Glamour British",
    regenRealNames: ["Barry Sheen", "Brodie Sheene", "Barty Sheenan"],
    fictionalRegenNames: ["Barry Glamour British Jr.", "Brodie Lucky Seven"],
    nationality: "GBR",
    number: 7,
    traits: { paceBias: 5, racecraftBias: 5, tyreMgmtBias: 2, consistencyBias: 3, wetSkillBias: 4, traitNote: "Carisma innato, astuzia nella scia e coraggio sul bagnato" }
  },
  {
    id: "criville",
    realName: "Alex Crivillé",
    fictionalName: "Alex Il Pioniere Iberico",
    regenRealNames: ["Alex Crivell", "Aleix Crivillero", "Arnau Crivellat"],
    fictionalRegenNames: ["Aleix Il Pioniere Jr.", "Arnau Orgoglio Catalano"],
    nationality: "ESP",
    number: 1,
    traits: { paceBias: 4, racecraftBias: 4, tyreMgmtBias: 4, consistencyBias: 5, wetSkillBias: 2, traitNote: "Determinazione incrollabile e metodo di lavoro scrupoloso" }
  }
];

// Profili di rigenerazione dinamica per piloti contemporanei che si ritirano durante la carriera
export const RETIRED_DRIVERS_REGEN_PROFILES = {
  // Formula 1 & Ruote Scoperte
  drv_alonso: {
    regenRealNames: ["Federico Alvarez", "Nando Alons", "Alfonso Solano"],
    fictionalRegenNames: ["Nando Il Samurai Jr.", "Federico Il Gladiatore", "Alfonso Furia Asturiana"],
    nationality: "ESP",
    traits: { paceBias: 6, racecraftBias: 8, tyreMgmtBias: 6, consistencyBias: 7, wetSkillBias: 6, traitNote: "Guerriero indomabile nei corpo a corpo, staccate aggressive e partenze fulminee" }
  },
  drv_hamilton: {
    regenRealNames: ["Liam Hamill", "Lewis Hammond", "Logan Milton"],
    fictionalRegenNames: ["Liam Hammer Time Jr.", "Lewis Il Maestro", "Logan La Saetta Nera"],
    nationality: "GBR",
    traits: { paceBias: 7, racecraftBias: 7, tyreMgmtBias: 8, consistencyBias: 7, wetSkillBias: 8, traitNote: "Gestione magistrale del degrado gomme, velocità pura in qualifica e feeling eccezionale sul bagnato" }
  },
  drv_verstappen: {
    regenRealNames: ["Marten van der Staap", "Mats Versloot", "Maxime van Steppen"],
    fictionalRegenNames: ["Mats Mad Max Jr.", "Marten Il Predatore", "Maxime Il Mastino d'Olanda"],
    nationality: "NLD",
    traits: { paceBias: 9, racecraftBias: 8, tyreMgmtBias: 5, consistencyBias: 7, wetSkillBias: 8, traitNote: "Aggressività implacabile nei duelli ruota a ruota e ritmo devastante su asfalto scivoloso" }
  },
  drv_leclerc: {
    regenRealNames: ["Charlot Leclerq", "Cédric Leclerc", "Julien Leclair"],
    fictionalRegenNames: ["Charlot Il Predestinato Jr.", "Cédric Lampo di Monaco", "Julien Cuore Rosso"],
    nationality: "MCO",
    traits: { paceBias: 9, racecraftBias: 5, tyreMgmtBias: 4, consistencyBias: 4, wetSkillBias: 5, traitNote: "Giro secco strabiliante in qualifica e precisione millimetrica sul limite della pista" }
  },
  drv_norris: {
    regenRealNames: ["Leo Norrington", "Luke Norris", "Lance North"],
    fictionalRegenNames: ["Leo Last Lap Jr.", "Luke Il Fulmine Papaya", "Lance Sorpasso Pulito"],
    nationality: "GBR",
    traits: { paceBias: 7, racecraftBias: 6, tyreMgmtBias: 6, consistencyBias: 6, wetSkillBias: 7, traitNote: "Velocità di punta e passo martellante fino alla bandiera a scacchi" }
  },
  drv_russell: {
    regenRealNames: ["Grant Russell", "George Rostron", "Giles Ross"],
    fictionalRegenNames: ["Grant Mr Saturday Jr.", "George Il Calcolatore", "Giles Stella d'Argento"],
    nationality: "GBR",
    traits: { paceBias: 7, racecraftBias: 5, tyreMgmtBias: 5, consistencyBias: 7, wetSkillBias: 6, traitNote: "Qualificatore micidiale e freddezza chirurgica nella lettura della telemetria" }
  },
  drv_perez: {
    regenRealNames: ["Santiago Pereda", "Saul Pereira", "Sergio Peraza"],
    fictionalRegenNames: ["Santiago Ministro della Difesa Jr.", "Saul Checo II", "Sergio Re delle Cittadine"],
    nationality: "MEX",
    traits: { paceBias: 4, racecraftBias: 6, tyreMgmtBias: 9, consistencyBias: 6, wetSkillBias: 3, traitNote: "Cura maniacale degli pneumatici negli stint lunghi e difesa invalicabile" }
  },
  drv_bottas: {
    regenRealNames: ["Viljami Bottio", "Verner Botta", "Valtteri Bottas"],
    fictionalRegenNames: ["Viljami Il Boscaiolo Jr.", "Verner Freddo Polare", "Valtteri Passo Sicuro"],
    nationality: "FIN",
    traits: { paceBias: 6, racecraftBias: 4, tyreMgmtBias: 5, consistencyBias: 8, wetSkillBias: 5, traitNote: "Partenze pulitissime, consistenza glaciale e regolarità ai punti" }
  },
  drv_sainz: {
    regenRealNames: ["Carlos Sanz", "Cristian Sainz", "Cesar Sanchez"],
    fictionalRegenNames: ["Carlos Smooth Operator Jr.", "Cristian Mente Lucida", "Cesar Il Tattico"],
    nationality: "ESP",
    traits: { paceBias: 6, racecraftBias: 6, tyreMgmtBias: 7, consistencyBias: 8, wetSkillBias: 4, traitNote: "Intelligenza tattica sopraffina, grande sensibilità d'assetto e concretezza" }
  },
  drv_hulkenberg: {
    regenRealNames: ["Niko Hülsemann", "Noah Hulberg", "Nick Hülser"],
    fictionalRegenNames: ["Niko Hulk Jr.", "Noah Il Mastino Tedesco", "Nick Ritorno Vincente"],
    nationality: "DEU",
    traits: { paceBias: 6, racecraftBias: 6, tyreMgmtBias: 5, consistencyBias: 7, wetSkillBias: 6, traitNote: "Solidità a punti costante, velocità sul bagnato e grande esperienza tecnica" }
  },
  drv_piastri: {
    regenRealNames: ["Owen Piastri", "Oliver Piasente", "Oscar Piastek"],
    fictionalRegenNames: ["Owen Sangue Freddo Jr.", "Oliver L'Aussie Tranquillo", "Oscar Ghiaccio Puro"],
    nationality: "AUS",
    traits: { paceBias: 7, racecraftBias: 6, tyreMgmtBias: 6, consistencyBias: 8, wetSkillBias: 5, traitNote: "Lucidità imperturbabile sotto pressione e traiettorie geometriche impeccabili" }
  },
  drv_ricciardo: {
    regenRealNames: ["Dante Rizzardi", "Darren Rich", "Daniel Ricciardo"],
    fictionalRegenNames: ["Dante Honey Badger Jr.", "Darren Staccata Sorridente", "Daniel Il Mieliere"],
    nationality: "AUS",
    traits: { paceBias: 6, racecraftBias: 8, tyreMgmtBias: 5, consistencyBias: 5, wetSkillBias: 4, traitNote: "Staccate profonde con sorpassi spettacolari all'ultimo metro" }
  },
  drv_gasly: {
    regenRealNames: ["Pascal Gascogne", "Patrice Gassin", "Pierre Gasly"],
    fictionalRegenNames: ["Pascal Il Galletto Jr.", "Patrice Cuore Francese", "Pierre Riscatto Rapido"],
    nationality: "FRA",
    traits: { paceBias: 6, racecraftBias: 6, tyreMgmtBias: 6, consistencyBias: 6, wetSkillBias: 6, traitNote: "Grinta agonistica nei duelli di centro gruppo e tempismo perfetto nei cambi meteo" }
  },
  drv_ocon: {
    regenRealNames: ["Eliot Oconnor", "Enzo Ocana", "Esteban Ocon"],
    fictionalRegenNames: ["Eliot Barricata Jr.", "Enzo Il Tenace", "Esteban Muro d'Acciaio"],
    nationality: "FRA",
    traits: { paceBias: 6, racecraftBias: 7, tyreMgmtBias: 5, consistencyBias: 6, wetSkillBias: 5, traitNote: "Difensore coriaceo e implacabile nelle lotte ruota a ruota ad alta velocità" }
  },
  drv_albon: {
    regenRealNames: ["Aaron Alborn", "Alan Alborg", "Alexander Albon"],
    fictionalRegenNames: ["Aaron Il Condottiero Jr.", "Alan Sorpasso Pulito", "Alex L'Inguardabile"],
    nationality: "THA",
    traits: { paceBias: 7, racecraftBias: 6, tyreMgmtBias: 7, consistencyBias: 7, wetSkillBias: 5, traitNote: "Capacità di estrarre il 100% da qualsiasi pacchetto tecnico e costanza nei long-run" }
  },
  drv_tsunoda: {
    regenRealNames: ["Yuta Tsuboi", "Yuya Tsunemura", "Yuki Tsunoda"],
    fictionalRegenNames: ["Yuta Piccolo Guerriero Jr.", "Yuya Furia di Sagamihara", "Yuki Grinta d'Oriente"],
    nationality: "JPN",
    traits: { paceBias: 7, racecraftBias: 6, tyreMgmtBias: 4, consistencyBias: 5, wetSkillBias: 5, traitNote: "Foga agonistica esplosiva, staccatore coraggioso e reattività immediata" }
  },
  drv_stroll: {
    regenRealNames: ["Lucas Strachan", "Logan Strolling", "Lance Stroll"],
    fictionalRegenNames: ["Lucas Cavaliere delle Piogge Jr.", "Logan Il Canadese", "Lance Partenza a Fionda"],
    nationality: "CAN",
    traits: { paceBias: 4, racecraftBias: 5, tyreMgmtBias: 4, consistencyBias: 4, wetSkillBias: 8, traitNote: "Feeling eccezionale sul bagnato e rimonte clamorose nei primi giri" }
  },
  drv_magnussen: {
    regenRealNames: ["Kurt Magnus", "Kasper Magness", "Kevin Magnussen"],
    fictionalRegenNames: ["Kurt Il Vichingo Jr.", "Kasper Gomiti Larghi", "Kevin Cuore Danese"],
    nationality: "DNK",
    traits: { paceBias: 6, racecraftBias: 8, tyreMgmtBias: 3, consistencyBias: 5, wetSkillBias: 5, traitNote: "Coraggio senza paura nei corpo a corpo e partenze furiose allo spegnimento dei semafori" }
  },
  // WEC & IndyCar
  drv_dixon: {
    regenRealNames: ["Sean Dickson", "Stuart Dix", "Scott Dixon"],
    fictionalRegenNames: ["Sean Il Professore Indy Jr.", "Stuart Ice Man Kiwi", "Scott Mago del Fuel Save"],
    nationality: "NZL",
    traits: { paceBias: 6, racecraftBias: 7, tyreMgmtBias: 9, consistencyBias: 9, wetSkillBias: 6, traitNote: "Gestione prodigiosa di carburante e pneumatici, rimonte leggendarie dalla distanza" }
  },
  drv_newgarden: {
    regenRealNames: ["Jesse Newgard", "Julian Garden", "Josef Newgarden"],
    fictionalRegenNames: ["Jesse Il Cowboy Jr.", "Julian Velocità Pura USA", "Josef Il Fulmine del Tennessee"],
    nationality: "USA",
    traits: { paceBias: 7, racecraftBias: 7, tyreMgmtBias: 6, consistencyBias: 7, wetSkillBias: 4, traitNote: "Velocità brutale sugli ovali e precisione chirurgica nei circuiti cittadini" }
  },
  drv_palou: {
    regenRealNames: ["Arnau Palou", "Alvaro Palas", "Alex Palomero"],
    fictionalRegenNames: ["Arnau Il Metronomo Catalano Jr.", "Alvaro Compasso d'Oro", "Alex Dominatore Calmo"],
    nationality: "ESP",
    traits: { paceBias: 8, racecraftBias: 7, tyreMgmtBias: 8, consistencyBias: 9, wetSkillBias: 5, traitNote: "Consistenza schiacciante e capacità di vincere su qualsiasi tipologia di tracciato" }
  },
  drv_kobayashi: {
    regenRealNames: ["Kenji Kobata", "Koji Koba", "Kamui Kobayashi"],
    fictionalRegenNames: ["Kenji Furia del Sol Levante Jr.", "Koji Staccata Estrema", "Kamui Re di Le Mans"],
    nationality: "JPN",
    traits: { paceBias: 7, racecraftBias: 8, tyreMgmtBias: 5, consistencyBias: 6, wetSkillBias: 6, traitNote: "Sorpassi al limite nel traffico delle endurance e staccate mozzafiato" }
  },
  drv_buemi: {
    regenRealNames: ["Stephane Buemer", "Sylvain Buemel", "Sebastien Buemi"],
    fictionalRegenNames: ["Stephane L'Orologiaio Svizzero Jr.", "Sylvain Esperienza Pura", "Sebastien Pluricampione Sarthe"],
    nationality: "CHE",
    traits: { paceBias: 6, racecraftBias: 7, tyreMgmtBias: 7, consistencyBias: 8, wetSkillBias: 7, traitNote: "Visione tattica impeccabile nelle gare di durata e sensibilità d'assetto" }
  },

  // MotoGP & Superbike
  drv_bagnaia: {
    regenRealNames: ["Pietro Bagnoli", "Paolo Bignami", "Patrizio Bagnesi"],
    fictionalRegenNames: ["Pietro Il Martello Torinese Jr.", "Paolo Pecco II", "Patrizio Staccata Posteriore"],
    nationality: "ITA",
    traits: { paceBias: 8, racecraftBias: 6, tyreMgmtBias: 6, consistencyBias: 8, wetSkillBias: 4, traitNote: "Staccate micidiali con derapata controllata e passo da martello in solitaria" }
  },
  drv_martin: {
    regenRealNames: ["Jaime Martinet", "Jordi Martinez", "Jorge Martin"],
    fictionalRegenNames: ["Jaime Martinator Jr.", "Jordi Velocità Pura", "Jorge Lampo di Madrid"],
    nationality: "ESP",
    traits: { paceBias: 9, racecraftBias: 6, tyreMgmtBias: 4, consistencyBias: 6, wetSkillBias: 5, traitNote: "Giro secco atomico in qualifica, partenze a fionda e pieghe estreme gomito a terra" }
  },
  drv_marquez: {
    regenRealNames: ["Mateo Marqués", "Marcello Marquez", "Manolo Marquez"],
    fictionalRegenNames: ["Mateo Il Formichino Jr.", "Marcello L'Alieno di Cervera", "Manolo Furia Spagnola"],
    nationality: "ESP",
    traits: { paceBias: 8, racecraftBias: 8, tyreMgmtBias: 4, consistencyBias: 5, wetSkillBias: 8, traitNote: "Salvataggi acrobatici al limite della fisica e aggressività incontenibile nei duelli" }
  },
  drv_quartararo: {
    regenRealNames: ["Florent Quartier", "Fabrice Quatrain", "Fabio Quartararo"],
    fictionalRegenNames: ["Florent El Diablo Jr.", "Fabrice Danza in Curva", "Fabio Traiettoria Perfetta"],
    nationality: "FRA",
    traits: { paceBias: 8, racecraftBias: 5, tyreMgmtBias: 6, consistencyBias: 7, wetSkillBias: 3, traitNote: "Velocità di percorrenza curva inarrivabile e dolcezza straordinaria sul gas" }
  },
  drv_bastianini: {
    regenRealNames: ["Enrico Bastianoni", "Elia Bastia", "Enea Bastiani"],
    fictionalRegenNames: ["Enrico La Bestia Jr.", "Elia Finale Rovente", "Enea Rimonta Selvaggia"],
    nationality: "ITA",
    traits: { paceBias: 6, racecraftBias: 7, tyreMgmtBias: 9, consistencyBias: 5, wetSkillBias: 4, traitNote: "Gestione capolavoro della gomma posteriore e rimonte furiose negli ultimi 5 giri" }
  },
  drv_miller: {
    regenRealNames: ["Jesse Milburn", "Jaxon Mills", "Jack Miller"],
    fictionalRegenNames: ["Jesse Jackass Jr.", "Jaxon Acrobata dell'Acqua", "Jack Staccata da Baraccone"],
    nationality: "AUS",
    traits: { paceBias: 6, racecraftBias: 7, tyreMgmtBias: 3, consistencyBias: 4, wetSkillBias: 8, traitNote: "Mago indiscusso su asfalto bagnato o viscido e ingressi travolgenti in curva" }
  },
  drv_binder: {
    regenRealNames: ["Brett Bindon", "Bryce Bingley", "Brad Binder"],
    fictionalRegenNames: ["Brett Il Cobra Sudafricano Jr.", "Bryce Sorpasso di Ferro", "Brad Frenatore Folle"],
    nationality: "ZAF",
    traits: { paceBias: 6, racecraftBias: 8, tyreMgmtBias: 5, consistencyBias: 6, wetSkillBias: 6, traitNote: "Staccatore d'acciaio senza timori reverenziali e maestro delle battaglie di mischia" }
  },
  drv_aleix_espargaro: {
    regenRealNames: ["Adria Esparga", "Artur Espada", "Aleix Espargat"],
    fictionalRegenNames: ["Adria Il Capitano Jr.", "Artur Cuore Catalano", "Aleix Velocità di Corda"],
    nationality: "ESP",
    traits: { paceBias: 6, racecraftBias: 6, tyreMgmtBias: 6, consistencyBias: 7, wetSkillBias: 4, traitNote: "Guida pulita con elevata velocità di corda e metodo di sviluppo costante" }
  },
  drv_zarco: {
    regenRealNames: ["Jules Zarque", "Jerome Zarc", "Johann Zarconi"],
    fictionalRegenNames: ["Jules Il Tattico Francese Jr.", "Jerome Salto Mortale", "Johann Traiettorie Magiche"],
    nationality: "FRA",
    traits: { paceBias: 6, racecraftBias: 6, tyreMgmtBias: 7, consistencyBias: 6, wetSkillBias: 7, traitNote: "Sensibilità chirurgica con gomme da pioggia e linee di guida atipiche" }
  },
  drv_rea: {
    regenRealNames: ["Jack Reade", "Joel Reader", "Jonah Rea"],
    fictionalRegenNames: ["Jack Cannibale d'Ulster Jr.", "Joel Re della Superbike", "Jonah Tenacia d'Acciaio"],
    nationality: "GBR",
    traits: { paceBias: 7, racecraftBias: 8, tyreMgmtBias: 7, consistencyBias: 8, wetSkillBias: 6, traitNote: "Frenata rabbiosa, tenacia da guerriero e dominanza nei doppi round mondiali" }
  },
  drv_razgatlioglu: {
    regenRealNames: ["Tarik Razgan", "Tayfun Razgatl", "Toprak Razgati"],
    fictionalRegenNames: ["Tarik El Turco Jr.", "Tayfun Acrobata della Staccata", "Toprak Stop and Go Spettacolo"],
    nationality: "TUR",
    traits: { paceBias: 8, racecraftBias: 9, tyreMgmtBias: 5, consistencyBias: 6, wetSkillBias: 5, traitNote: "Staccate a ruota posteriore alzata e controllo acrobatico della moto nei cambi di direzione" }
  },
  drv_bautista: {
    regenRealNames: ["Armando Bautista", "Alejandro Bautiz", "Alvaro Bautist"],
    fictionalRegenNames: ["Armando Il Folletto Spagnolo Jr.", "Alejandro Missile in Uscita", "Alvaro Re dei Raccordi"],
    nationality: "ESP",
    traits: { paceBias: 8, racecraftBias: 6, tyreMgmtBias: 6, consistencyBias: 7, wetSkillBias: 3, traitNote: "Raddrizzo immediato della moto, velocità di punta nei rettilinei e accelerazione devastante" }
  }
};

export class CareerEngine {
  constructor() {
    this.player = null;
    this.career = null;
    this.loadFromStorage();
  }

  getActiveSlot() {
    if (typeof localStorage === 'undefined') return 1;
    const raw = localStorage.getItem('il_nuovo_goat_active_slot');
    if (!raw) return 1;
    const num = parseInt(raw.replace('slot_', ''), 10);
    return (num >= 1 && num <= 3) ? num : 1;
  }

  setActiveSlot(slotNum) {
    if (typeof localStorage === 'undefined') return;
    const validNum = (slotNum >= 1 && slotNum <= 3) ? slotNum : 1;
    localStorage.setItem('il_nuovo_goat_active_slot', `slot_${validNum}`);
  }

  getStorageKeyForSlot(slotNum) {
    const num = (slotNum >= 1 && slotNum <= 3) ? slotNum : 1;
    return num === 1 ? 'il_nuovo_goat_motorsport_save' : `il_nuovo_goat_save_slot_${num}`;
  }

  hasActiveCareer() {
    return !!this.player && !!this.career && !this.career.isRetired;
  }

  hasSavedCareer(slotNum = null) {
    if (slotNum) {
      if (typeof localStorage === 'undefined') return false;
      const key = this.getStorageKeyForSlot(slotNum);
      const raw = localStorage.getItem(key);
      if (raw) return true;
      if (slotNum === 1) return !!localStorage.getItem('il_nuovo_goat_motorsport_save');
      return false;
    }
    return !!this.player && !!this.career;
  }

  hasAnySavedCareer() {
    if (this.hasSavedCareer()) return true;
    if (typeof localStorage === 'undefined') return false;
    return !!localStorage.getItem('il_nuovo_goat_motorsport_save') ||
           !!localStorage.getItem('il_nuovo_goat_save_slot_2') ||
           !!localStorage.getItem('il_nuovo_goat_save_slot_3');
  }

  getFreeSlot() {
    if (typeof localStorage === 'undefined') return 1;
    for (let i = 1; i <= 3; i++) {
      const key = this.getStorageKeyForSlot(i);
      const data = localStorage.getItem(key);
      if (!data) return i;
    }
    return null;
  }

  // Avvio nuova carriera con personalizzazione completa del giocatore e scelta scuderia dai Rookie Test
  startNewCareer(customData, chosenTeamId = null, chosenContract = null) {
    const discipline = customData.discipline || 'auto';
    const startingCategory = discipline === 'auto' ? 'auto_f4' : 'moto_3';

    const origin = customData.origin || 'prodigy';
    const bgProfile = BACKGROUND_PROFILES[origin] || BACKGROUND_PROFILES.prodigy;

    // Calcolo attributi iniziali partendo rigorosamente dalla base dell'origine
    const baseAttrs = {
      ...bgProfile.baseAttributes,
      ...(customData.attributes || {})
    };

    // Assicura che nessun attributo possa mai scendere sotto la base dell'origine
    for (const key in bgProfile.baseAttributes) {
      if (baseAttrs[key] < bgProfile.baseAttributes[key]) {
        baseAttrs[key] = bgProfile.baseAttributes[key];
      }
    }

    const startMoney = bgProfile.startMoney;

    // Trova scuderia iniziale della categoria base (da Rookie Test o default)
    const categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    const catData = categories[startingCategory];
    const initialTeam = (chosenTeamId && catData.teams.find(t => t.id === chosenTeamId)) || catData.teams[0];

    const pFirst = customData.firstName || "Alessandro";
    const pLast = customData.lastName || "Veloci";
    this.player = {
      id: "player_custom",
      firstName: pFirst,
      lastName: pLast,
      name: `${pFirst} ${pLast}`,
      displayName: `${pFirst} ${pLast}`,
      nickname: customData.nickname || "Il Predatore",
      nationality: customData.nationality || "ITA",
      number: customData.number || 77,
      age: 16,
      discipline,
      origin: customData.origin || "prodigy",
      celebration: customData.celebration || "burnout",
      attributes: baseAttrs,
      ovr: this.calculateOvr(baseAttrs),
      helmet: customData.helmet || {
        primaryColor: "#e10600",
        secondaryColor: "#ffd000",
        visorColor: "#00d2be",
        pattern: "stripes",
        decal: "star"
      },
      unspentSkillPoints: customData.unspentSkillPoints || 0
    };

    const defaultSalary = customData.origin === 'paydriver' ? 0 : 5000;
    this.career = {
      currentYear: 2026,
      seasonNumber: 1,
      currentCategory: startingCategory,
      currentTeamId: initialTeam.id,
      contract: chosenContract || {
        salaryPerRace: defaultSalary,
        durationYears: 1,
        yearsLeft: 1,
        role: "1st Driver",
        winBonus: 10000,
        buyoutClause: 0
      },
      money: startMoney,
      licensePoints: 0,
      currentRaceIndex: 0,
      standings: {
        drivers: [],
        teams: []
      },
      stats: {
        racesStarted: 0,
        wins: 0,
        podiums: 0,
        poles: 0,
        fastestLaps: 0,
        worldTitles: 0,
        careerEarnings: startMoney,
        peakOvr: this.player.ovr,
        startYear: 2026,
        currentYear: 2026,
        specialWins: {},
        teammateBeatenCount: 0,
        byCategory: {}
      },
      carUpgrades: { aero: 0, engine: 0, chassis: 0, reliability: 0 },
      hqUpgrades: { simulatorLevel: 0, gymLevel: 0, prAgencyLevel: 0, telemetryCoachLevel: 0, biohackingLevel: 0 },
      lifestyleItems: [],
      history: [],
      chosenTeammateId: null,
      teamBenchedDriverId: null,
      freeAgents: [],
      aiTransferNews: [],
      teamDriverOverrides: {},
      teamDevelopment: {},
      regulations: {
        currentCycle: 1,
        cycleLengthYears: 3,
        nextRegulationChangeYear: 2029,
        isRegulationYearAnnounced: false,
        playerNextGenInvestment: 0,
        teammateNextGenInvestment: 0,
        teammateContribution: { money: 0, points: 0, log: [] },
        aiTeamInvestments: {}
      },
      driverCareerStats: JSON.parse(JSON.stringify(DRIVER_BASELINES)),
      retiredDrivers: [],
      regens: {},
      isRetired: false
    };

    // Inizializza sviluppo e gerarchia iniziale dei mezzi per tutte le scuderie
    this.initTeamDevelopment();
    this.initRdSystem();

    // Configura compagno di squadra iniziale ed eventuale pilota svincolato per rispettare i limiti di categoria
    const initTeamDrivers = (catData?.roster || []).filter(r => r.teamId === initialTeam.id);
    const maxDrivers = catData?.maxDriversPerTeam || 2;
    if (initTeamDrivers.length >= maxDrivers) {
      const benched = initTeamDrivers[initTeamDrivers.length - 1];
      this.career.chosenTeammateId = initTeamDrivers[0].id;
      this.career.teamBenchedDriverId = benched.id;
      this.career.freeAgents.push({
        driverId: benched.id,
        originalTeamId: initialTeam.id,
        category: startingCategory,
        year: this.career.currentYear || 2026
      });
    }

    db.setActiveYear(this.career.currentYear);
    this.initSeasonStandings();
    this.saveToStorage();
    return true;
  }

  calculateOvr(attrsOrPace, maybeRacecraft, maybeTyreMgmt, maybeConsistency, maybeWetSkill, maybeTechnicalFeedback) {
    let attrs = {};
    if (typeof attrsOrPace === 'object' && attrsOrPace !== null) {
      attrs = attrsOrPace;
    } else if (typeof attrsOrPace === 'number') {
      attrs = {
        pace: attrsOrPace,
        racecraft: maybeRacecraft !== undefined ? maybeRacecraft : attrsOrPace,
        tyreMgmt: maybeTyreMgmt !== undefined ? maybeTyreMgmt : attrsOrPace,
        consistency: maybeConsistency !== undefined ? maybeConsistency : attrsOrPace,
        wetSkill: maybeWetSkill !== undefined ? maybeWetSkill : 70,
        technicalFeedback: maybeTechnicalFeedback !== undefined ? maybeTechnicalFeedback : 70
      };
    } else {
      return 70;
    }

    const total = 
      ((attrs.pace || 70) * 0.30) +
      ((attrs.racecraft || 70) * 0.25) +
      ((attrs.tyreMgmt || 70) * 0.18) +
      ((attrs.consistency || 70) * 0.17) +
      ((attrs.wetSkill || 70) * 0.05) +
      ((attrs.technicalFeedback || 70) * 0.05);

    let ovr = total;
    const peakDriverScore = (attrs.pace || 70) + (attrs.racecraft || 70);
    if (peakDriverScore >= 185) {
      ovr += 2;
    } else if (peakDriverScore >= 175) {
      ovr += 1;
    }
    return Math.min(99, Math.round(ovr));
  }

  // Ottiene o inizializza le statistiche suddivise per categoria
  getCategoryStats(catKey = null) {
    const key = catKey || this.career?.currentCategory;
    if (!this.career || !this.career.stats) {
      return { racesStarted: 0, wins: 0, podiums: 0, poles: 0, worldTitles: 0 };
    }
    if (!this.career.stats.byCategory) {
      this.career.stats.byCategory = {};
    }
    if (!this.career.stats.byCategory[key]) {
      this.career.stats.byCategory[key] = {
        racesStarted: 0,
        wins: 0,
        podiums: 0,
        poles: 0,
        worldTitles: 0
      };
    }
    return this.career.stats.byCategory[key];
  }

  // Sincronizza e riconcilia le statistiche complessive e suddivise per categoria
  syncAndReconcileStats() {
    if (!this.career || !this.career.stats) return;
    const stats = this.career.stats;
    if (!stats.byCategory) {
      stats.byCategory = {};
    }

    const discipline = this.player?.discipline || 'auto';
    const categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    Object.keys(categories).forEach(catKey => {
      if (!stats.byCategory[catKey]) {
        stats.byCategory[catKey] = { racesStarted: 0, wins: 0, podiums: 0, poles: 0, worldTitles: 0 };
      }
    });

    // 1. Se ci sono stagioni storiche (history), verifica che i titoli e vittorie registrati siano presenti
    if (Array.isArray(this.career.history) && this.career.history.length > 0) {
      this.career.history.forEach(h => {
        const catKey = h.category;
        if (catKey && stats.byCategory[catKey]) {
          const s = stats.byCategory[catKey];
          if (h.playerPos === 1 && (!s.worldTitles || s.worldTitles === 0)) {
            s.worldTitles = Math.max(s.worldTitles || 0, 1);
          }
        }
      });
    }

    // 2. Calcola le somme attuali per categoria
    let sumTitles = 0, sumWins = 0, sumPodiums = 0, sumPoles = 0, sumRaces = 0;
    Object.values(stats.byCategory).forEach(c => {
      sumTitles += (c.worldTitles || 0);
      sumWins += (c.wins || 0);
      sumPodiums += (c.podiums || 0);
      sumPoles += (c.poles || 0);
      sumRaces += (c.racesStarted || 0);
    });

    // 3. Riconciliazione discrepanze con la categoria appropriata
    const diffTitles = Math.max(0, (stats.worldTitles || 0) - sumTitles);
    const diffWins = Math.max(0, (stats.wins || 0) - sumWins);
    const diffPodiums = Math.max(0, (stats.podiums || 0) - sumPodiums);
    const diffPoles = Math.max(0, (stats.poles || 0) - sumPoles);
    const diffRaces = Math.max(0, (stats.racesStarted || 0) - sumRaces);

    if (diffTitles > 0 || diffWins > 0 || diffPodiums > 0 || diffPoles > 0 || diffRaces > 0) {
      let targetCat = 'auto_f4';
      if (Array.isArray(this.career.history) && this.career.history.length > 0) {
        const lastHist = this.career.history[this.career.history.length - 1];
        if (lastHist && lastHist.category && stats.byCategory[lastHist.category]) {
          targetCat = lastHist.category;
        }
      }
      if (!stats.byCategory[targetCat]) {
        targetCat = this.career.currentCategory || (discipline === 'auto' ? 'auto_f4' : 'moto_3');
      }

      const target = stats.byCategory[targetCat];
      target.worldTitles = (target.worldTitles || 0) + diffTitles;
      target.wins = (target.wins || 0) + diffWins;
      target.podiums = (target.podiums || 0) + diffPodiums;
      target.poles = (target.poles || 0) + diffPoles;
      target.racesStarted = (target.racesStarted || 0) + diffRaces;
    }

    // 4. Allinea perfettamente i totali globali alla somma esatta di tutte le categorie
    let finalTitles = 0, finalWins = 0, finalPodiums = 0, finalPoles = 0, finalRaces = 0;
    Object.values(stats.byCategory).forEach(c => {
      finalTitles += (c.worldTitles || 0);
      finalWins += (c.wins || 0);
      finalPodiums += (c.podiums || 0);
      finalPoles += (c.poles || 0);
      finalRaces += (c.racesStarted || 0);
    });

    stats.worldTitles = finalTitles;
    stats.wins = finalWins;
    stats.podiums = finalPodiums;
    stats.poles = finalPoles;
    stats.racesStarted = finalRaces;
  }

  // Ottiene il roster attivo dei piloti AI per una specifica categoria, escludendo svincolati, ritirati e il pilota sostituito dal giocatore
  getActiveRoster(catKey = null) {
    const key = catKey || this.career?.currentCategory;
    const categories = this.player?.discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    const cat = categories[key];
    if (!cat || !cat.roster || !cat.teams) return [];

    const isCurrentPlayerCat = (key === this.career?.currentCategory);
    const maxDrivers = cat.maxDriversPerTeam || 2;
    const playerTeamId = this.career?.currentTeamId;

    if (!isCurrentPlayerCat) {
      return cat.roster.filter(d => {
        const effTeam = (this.career?.teamDriverOverrides && this.career.teamDriverOverrides[d.id]) || d.teamId;
        return effTeam !== 'free_agent' && effTeam !== 'retired';
      }).map(d => {
        const effTeam = (this.career?.teamDriverOverrides && this.career.teamDriverOverrides[d.id]) || d.teamId;
        return effTeam !== d.teamId ? { ...d, teamId: effTeam } : d;
      });
    }

    // Assicura che teamBenchedDriverId appartenga effettivamente al team del giocatore
    const playerTeamDrivers = cat.roster.filter(d => {
      const effTeam = (this.career?.teamDriverOverrides && this.career.teamDriverOverrides[d.id]) || d.teamId;
      return effTeam === playerTeamId && effTeam !== 'retired';
    });

    let benchedId = this.career?.teamBenchedDriverId;
    const isBenchedValid = playerTeamDrivers.some(d => d.id === benchedId);

    if (!isBenchedValid && playerTeamDrivers.length >= maxDrivers) {
      let teammate = null;
      if (this.career?.chosenTeammateId) {
        teammate = playerTeamDrivers.find(d => d.id === this.career.chosenTeammateId);
      }
      if (!teammate) {
        const sorted = [...playerTeamDrivers].sort((a, b) => (b.ovr || 75) - (a.ovr || 75));
        teammate = sorted[0];
      }
      this.career.chosenTeammateId = teammate.id;
      const toBench = playerTeamDrivers.find(d => d.id !== teammate.id) || playerTeamDrivers[playerTeamDrivers.length - 1];
      benchedId = toBench.id;
      this.career.teamBenchedDriverId = benchedId;

      if (!this.career.freeAgents) this.career.freeAgents = [];
      if (!this.career.freeAgents.some(fa => fa.driverId === benchedId)) {
        this.career.freeAgents.push({
          driverId: benchedId,
          originalTeamId: playerTeamId,
          category: key,
          year: this.career?.currentYear || 2026
        });
      }
    }

    // Costruisci il roster attivo garantendo per ogni scuderia la capienza esatta:
    // 1. Team del giocatore: maxDrivers - 1 piloti AI
    // 2. Tutti gli altri team: maxDrivers piloti AI
    // 3. Esclusione totale dei piloti svincolati (free_agent o presenti in freeAgents) e RITIRATI (retired)
    const activeRoster = [];
    const freeAgentIds = new Set((this.career?.freeAgents || []).map(f => f.driverId));

    cat.teams.forEach(team => {
      const isPlayerTeam = (team.id === playerTeamId);
      const capacity = isPlayerTeam ? Math.max(1, maxDrivers - 1) : maxDrivers;

      // Unisci il roster di base, i regens creati per questa categoria e i piloti trasferiti tramite override
      const pool = [...cat.roster];
      if (this.career?.regens) {
        for (const [rId, rData] of Object.entries(this.career.regens)) {
          if (rData.category === key && !pool.some(c => c.id === rId)) {
            pool.push(rData);
          }
        }
      }
      if (this.career?.teamDriverOverrides) {
        for (const [dId, ovrTeam] of Object.entries(this.career.teamDriverOverrides)) {
          if (ovrTeam === team.id && !pool.some(c => c.id === dId)) {
            const drv = db.getDriver(dId, this.player?.discipline || 'auto');
            if (drv) pool.push(drv);
          }
        }
      }

      let candidates = pool.filter(d => {
        const effTeam = (this.career?.teamDriverOverrides && this.career.teamDriverOverrides[d.id]) || d.teamId;
        if (effTeam !== team.id) return false;
        if (effTeam === 'free_agent' || effTeam === 'retired') return false;
        if (this.career?.retiredDriverIds && this.career.retiredDriverIds.includes(d.id)) return false;
        if (isPlayerTeam && (d.id === benchedId || (Array.isArray(benchedId) && benchedId.includes(d.id)))) return false;
        if (freeAgentIds.has(d.id)) return false;
        return true;
      });

      // Se il team del giocatore ha chosenTeammateId, ordinalo per primo
      if (isPlayerTeam && this.career?.chosenTeammateId) {
        candidates.sort((a, b) => (a.id === this.career.chosenTeammateId ? -1 : 1));
      }

      // Se ci sono meno piloti del necessario per rispettare il regolamento, usa un collaudatore di riserva per la visualizzazione
      while (candidates.length < capacity) {
        candidates.push({
          id: `reserve_${team.id}_${candidates.length + 1}`,
          name: "Collaudatore Ufficiale",
          ovr: 72,
          pace: 72,
          teamId: team.id,
          isReserve: true
        });
      }

      // Prendi esattamente fino a capacity piloti
      const selected = candidates.slice(0, capacity);
      selected.forEach(d => {
        const effTeam = (this.career?.teamDriverOverrides && this.career.teamDriverOverrides[d.id]) || d.teamId;
        activeRoster.push(effTeam !== d.teamId ? { ...d, teamId: effTeam } : d);
      });
    });

    return activeRoster;
  }

  // Configura la scelta del compagno e invia il pilota sostituito nei Free Agent
  setTeamDrivers(teamId, catKey, chosenTeammateId, replacedDriverId) {
    if (!this.career) return;
    this.career.chosenTeammateId = chosenTeammateId;
    this.career.teamBenchedDriverId = replacedDriverId;

    if (!this.career.teamDriverOverrides) this.career.teamDriverOverrides = {};
    if (!this.career.freeAgents) this.career.freeAgents = [];

    if (chosenTeammateId) {
      this.career.teamDriverOverrides[chosenTeammateId] = teamId;
      this.career.freeAgents = this.career.freeAgents.filter(fa => fa.driverId !== chosenTeammateId);
    }

    if (replacedDriverId) {
      this.career.teamDriverOverrides[replacedDriverId] = 'free_agent';
      if (!this.career.freeAgents.some(fa => fa.driverId === replacedDriverId)) {
        this.career.freeAgents.push({
          driverId: replacedDriverId,
          originalTeamId: teamId,
          category: catKey,
          year: this.career.currentYear || 2026
        });
      }

      const repName = db.getDriverName(replacedDriverId, this.player?.discipline);
      const teamName = db.getTeamName(teamId, this.player?.discipline, catKey);
      if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
      this.career.aiTransferNews.unshift(
        `📢 MERCATO: ${repName} lascia il sedile di ${teamName} a seguito dell'arrivo di ${this.player?.firstName} ${this.player?.lastName}!`
      );
    }
  }

  // La scuderia lasciata dal giocatore effettua mercato per ingaggiare un pilota di rimpiazzo
  signMarketReplacementForVacatedSeat(vacatedTeamId, categoryKey, preferredCandidateId = null) {
    if (!this.career || !vacatedTeamId) return null;
    const discipline = this.player?.discipline || 'auto';
    const categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    const cat = categories[categoryKey];
    if (!cat || !cat.teams || !cat.roster) return null;

    if (!this.career.freeAgents) this.career.freeAgents = [];
    if (!this.career.teamDriverOverrides) this.career.teamDriverOverrides = {};
    if (!this.career.aiTransferNews) this.career.aiTransferNews = [];

    const oldTeamName = db.getTeamName(vacatedTeamId, discipline, categoryKey);

    // 1. Candidato 1: Il pilota liberato dal nuovo team del giocatore (se compatibile con la categoria o disciplina)
    let candidateDriverId = null;
    if (preferredCandidateId && preferredCandidateId !== 'player' && preferredCandidateId !== this.career.chosenTeammateId) {
      candidateDriverId = preferredCandidateId;
    }

    // 2. Candidato 2: Se nessun preferredCandidateId o non compatibile, cerca il miglior Free Agent della serie
    if (!candidateDriverId) {
      const catFAs = this.career.freeAgents
        .filter(fa => fa.category === categoryKey || !fa.category)
        .map(fa => ({ ...fa, driver: db.getDriver(fa.driverId, discipline) }))
        .filter(fa => fa.driver && fa.driverId !== this.career.chosenTeammateId)
        .sort((a, b) => (b.driver.ovr || 75) - (a.driver.ovr || 75));

      if (catFAs.length > 0) {
        candidateDriverId = catFAs[0].driverId;
      }
    }

    // 3. Candidato 3: Qualsiasi altro Free Agent globale
    if (!candidateDriverId && this.career.freeAgents.length > 0) {
      const anyFA = this.career.freeAgents.find(fa => fa.driverId !== this.career.chosenTeammateId);
      if (anyFA) candidateDriverId = anyFA.driverId;
    }

    // 4. Candidato 4: Poaching da un team rivale con più piloti
    if (!candidateDriverId) {
      const otherTeams = cat.teams.filter(t => t.id !== vacatedTeamId && t.id !== this.career.currentTeamId);
      for (const t of otherTeams) {
        const tDrivers = cat.roster.filter(d => (this.career.teamDriverOverrides[d.id] || d.teamId) === t.id);
        if (tDrivers.length > 1) {
          const poached = tDrivers[Math.floor(Math.random() * tDrivers.length)];
          candidateDriverId = poached.id;
          break;
        }
      }
    }

    if (candidateDriverId) {
      this.career.teamDriverOverrides[candidateDriverId] = vacatedTeamId;
      this.career.freeAgents = this.career.freeAgents.filter(fa => fa.driverId !== candidateDriverId);

      const driverName = db.getDriverName(candidateDriverId, discipline);
      this.career.aiTransferNews.unshift(
        `📢 MERCATO: ${oldTeamName} corre ai ripari dopo l'addio di ${this.player.firstName} ${this.player.lastName} e ingaggia ufficialmente ${driverName}!`
      );
      return candidateDriverId;
    }

    return null;
  }

  // Trasferimenti di mercato dinamici per i piloti AI nello stesso campionato e ingaggio Free Agents
  aiDriverTransfers() {
    if (!this.career) return;
    if (!this.career.freeAgents) this.career.freeAgents = [];
    if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
    if (!this.career.teamDriverOverrides) this.career.teamDriverOverrides = {};

    const discipline = this.player?.discipline || 'auto';
    const categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    const catKey = this.career.currentCategory;
    const cat = categories[catKey];
    if (!cat || !cat.roster || !cat.teams) return;

    const playerTeamId = this.career.currentTeamId;

    // Helper: piloti attivi di una scuderia AI
    const getActiveTeamDrivers = (teamId) => {
      return cat.roster.filter(d => {
        const effTeam = this.career.teamDriverOverrides[d.id] || d.teamId;
        return effTeam === teamId;
      });
    };

    // 1. TRASFERIMENTI INTRA-CAMPIONATO TRA SCUDERIE RIVALI (Poaching da parte dei Top Team)
    const sortedTeams = [...cat.teams]
      .map(t => {
        const dev = this.career.teamDevelopment?.[t.id];
        const pace = dev?.carPace || t.carPace || t.bikePace || 75;
        return { ...t, currentPace: pace };
      })
      .sort((a, b) => b.currentPace - a.currentPace);

    const topTeams = sortedTeams.filter(t => t.id !== playerTeamId).slice(0, 4);
    const midLowTeams = sortedTeams.filter(t => t.id !== playerTeamId && !topTeams.some(tt => tt.id === t.id));

    if (topTeams.length > 0 && midLowTeams.length > 0 && Math.random() < 0.85) {
      const buyerTeam = topTeams[Math.floor(Math.random() * topTeams.length)];
      const buyerDrivers = getActiveTeamDrivers(buyerTeam.id);

      let bestRisingDriver = null;
      let sellerTeam = null;

      for (const mTeam of midLowTeams) {
        const mDrivers = getActiveTeamDrivers(mTeam.id);
        for (const md of mDrivers) {
          const ovr = (this.career.aiDriverAttributes?.[md.id]?.ovr) || md.ovr || 75;
          if (!bestRisingDriver || ovr > (bestRisingDriver.ovr || 75)) {
            bestRisingDriver = { ...md, ovr };
            sellerTeam = mTeam;
          }
        }
      }

      if (bestRisingDriver && sellerTeam && buyerDrivers.length > 0) {
        const sortedBuyerDrivers = [...buyerDrivers].sort((a, b) => {
          const ovrA = (this.career.aiDriverAttributes?.[a.id]?.ovr) || a.ovr || 75;
          const ovrB = (this.career.aiDriverAttributes?.[b.id]?.ovr) || b.ovr || 75;
          return ovrA - ovrB;
        });
        const replacedBuyerDriver = sortedBuyerDrivers[0];
        const buyerOvr = (this.career.aiDriverAttributes?.[replacedBuyerDriver.id]?.ovr) || replacedBuyerDriver.ovr || 75;

        if (bestRisingDriver.ovr >= buyerOvr - 1 && bestRisingDriver.id !== replacedBuyerDriver.id) {
          this.career.teamDriverOverrides[bestRisingDriver.id] = buyerTeam.id;
          this.career.teamDriverOverrides[replacedBuyerDriver.id] = sellerTeam.id;

          const buyerName = db.getTeamName(buyerTeam.id, discipline, catKey);
          const sellerName = db.getTeamName(sellerTeam.id, discipline, catKey);
          const starName = db.getDriverName(bestRisingDriver.id, discipline);
          const repName = db.getDriverName(replacedBuyerDriver.id, discipline);

          this.career.aiTransferNews.unshift(
            `🔥 COLPO INTRA-CAMPIONATO: ${buyerName} strappa la stella ${starName} da ${sellerName}! ${repName} compie il percorso inverso.`
          );
        }
      }
    }

    // 2. SCAMBIO DIRETTO DI MERCATO TRA SCUDERIE RIVALI (Driver Trade)
    if (Math.random() < 0.70 && cat.teams.length >= 4) {
      const candidateTeams = cat.teams.filter(t => t.id !== playerTeamId);
      const teamA = candidateTeams[Math.floor(Math.random() * candidateTeams.length)];
      const remaining = candidateTeams.filter(t => t.id !== teamA.id);
      const teamB = remaining[Math.floor(Math.random() * remaining.length)];

      if (teamA && teamB) {
        const driversA = getActiveTeamDrivers(teamA.id);
        const driversB = getActiveTeamDrivers(teamB.id);

        if (driversA.length > 0 && driversB.length > 0) {
          const dA = driversA[Math.floor(Math.random() * driversA.length)];
          const dB = driversB[Math.floor(Math.random() * driversB.length)];

          if (dA.id !== dB.id) {
            this.career.teamDriverOverrides[dA.id] = teamB.id;
            this.career.teamDriverOverrides[dB.id] = teamA.id;

            const nameA = db.getDriverName(dA.id, discipline);
            const nameB = db.getDriverName(dB.id, discipline);
            const tNameA = db.getTeamName(teamA.id, discipline, catKey);
            const tNameB = db.getTeamName(teamB.id, discipline, catKey);

            this.career.aiTransferNews.unshift(
              `🔄 SCAMBIO DI MERCATO: Accordo tra scuderie! ${nameA} passa in ${tNameB}, mentre ${nameB} approda in ${tNameA}.`
            );
          }
        }
      }
    }

    // 3. INGAGGIO FREE AGENTS DA PARTE DEI TEAM CON PILOTI PIÙ DEBOLI
    const availableFAs = [...this.career.freeAgents];
    availableFAs.forEach(fa => {
      const faDriver = db.getDriver(fa.driverId, discipline);
      if (!faDriver) return;
      const faOvr = faDriver.ovr || 78;

      const candidateTeams = cat.teams.filter(t => t.id !== playerTeamId);
      for (const team of candidateTeams) {
        const teamDrivers = getActiveTeamDrivers(team.id);
        const weakerDriver = teamDrivers.find(d => {
          const ovr = (this.career.aiDriverAttributes?.[d.id]?.ovr) || d.ovr || 75;
          return ovr < faOvr - 2;
        });

        if (weakerDriver) {
          this.career.teamDriverOverrides[fa.driverId] = team.id;
          this.career.teamDriverOverrides[weakerDriver.id] = 'free_agent';
          this.career.freeAgents = this.career.freeAgents.filter(f => f.driverId !== fa.driverId);
          this.career.freeAgents.push({
            driverId: weakerDriver.id,
            originalTeamId: team.id,
            category: catKey,
            year: this.career.currentYear
          });

          const faName = db.getDriverName(fa.driverId, discipline);
          const teamName = db.getTeamName(team.id, discipline, catKey);
          this.career.aiTransferNews.unshift(
            `💼 MERCATO AI: ${teamName} ingaggia lo svincolato ${faName} per alzare il livello del team!`
          );
          break;
        }
      }
    });

    // Mantieni le notizie più recenti
    if (this.career.aiTransferNews.length > 20) {
      this.career.aiTransferNews = this.career.aiTransferNews.slice(0, 20);
    }
  }

  // Crescita e declino organico degli attributi di TUTTI i piloti AI attraverso tutte le categorie del motorsport
  growAiDriverAttributes() {
    if (!this.career) return null;
    if (!this.career.aiDriverAttributes) this.career.aiDriverAttributes = {};

    const discipline = this.player?.discipline || 'auto';
    const categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;

    const evolvedDrivers = [];
    const processedDriverIds = new Set();

    // Raccoglie tutti i piloti da tutte le categorie
    for (const catKey in categories) {
      const cat = categories[catKey];
      if (!cat || !cat.roster) continue;

      cat.roster.forEach(driver => {
        const dId = driver.id;
        if (processedDriverIds.has(dId)) return;
        processedDriverIds.add(dId);

        // Se è già ritirato, non cresce più
        const effTeam = this.career.teamDriverOverrides?.[dId];
        if (effTeam === 'retired') return;

        // Inizializza il profilo se non presente
        if (!this.career.aiDriverAttributes[dId]) {
          const initAge = INITIAL_DRIVER_AGES[dId] || driver.age || (dId.startsWith('regen_') ? 18 : 24);
          this.career.aiDriverAttributes[dId] = {
            ovr: driver.ovr || 75,
            pace: driver.pace || 75,
            racecraft: driver.racecraft || 75,
            tyreMgmt: driver.tyreMgmt || 75,
            consistency: driver.consistency || 75,
            wetSkill: driver.wetSkill || 75,
            age: initAge
          };
        }

        const attrs = this.career.aiDriverAttributes[dId];
        attrs.age = (attrs.age || 24) + 1;
        const age = attrs.age;
        const oldOvr = attrs.ovr || 75;

        // Curve anagrafiche di sviluppo e declino
        if (age <= 22) {
          // GIOVANI PROMESSE & REGENS: Crescita esplosiva
          const gainPace = 1.0 + Math.random() * 1.5;
          const gainRacecraft = 0.8 + Math.random() * 1.2;
          const gainConsistency = 0.6 + Math.random() * 1.0;
          attrs.pace = Math.min(99, (attrs.pace || 75) + gainPace);
          attrs.racecraft = Math.min(99, (attrs.racecraft || 75) + gainRacecraft);
          attrs.consistency = Math.min(99, (attrs.consistency || 75) + gainConsistency);
          attrs.tyreMgmt = Math.min(99, (attrs.tyreMgmt || 75) + 0.5);
        } else if (age <= 28) {
          // PRIME YEARS: Affinamento e picco di maturità
          const gainPace = 0.3 + Math.random() * 0.7;
          const gainRace = 0.4 + Math.random() * 0.6;
          const gainTyre = 0.5 + Math.random() * 0.8;
          attrs.pace = Math.min(99, (attrs.pace || 75) + gainPace);
          attrs.racecraft = Math.min(99, (attrs.racecraft || 75) + gainRace);
          attrs.tyreMgmt = Math.min(99, (attrs.tyreMgmt || 75) + gainTyre);
          attrs.consistency = Math.min(99, (attrs.consistency || 75) + 0.4);
        } else if (age <= 33) {
          // PICCO ESPERTO: Costanza massima, velocità stabile, nessun declino netto
          const gainConst = 0.3 + Math.random() * 0.4;
          attrs.consistency = Math.min(99, (attrs.consistency || 75) + gainConst);
          attrs.tyreMgmt = Math.min(99, (attrs.tyreMgmt || 75) + 0.2);
          attrs.pace = Math.min(99, Math.max(60, (attrs.pace || 75) + (Math.random() * 0.4 - 0.2)));
        } else if (age <= 37) {
          // VETERANI MATURI: Inizio del declino fisico e nei riflessi sul giro secco
          const lossPace = 0.8 + Math.random() * 1.2;
          const lossRacecraft = 0.4 + Math.random() * 0.6;
          attrs.pace = Math.max(60, (attrs.pace || 75) - lossPace);
          attrs.racecraft = Math.max(60, (attrs.racecraft || 75) - lossRacecraft);
        } else {
          // OLD MASTERS (38+ ANNI): Declino marcato, la velocità pura cala drasticamente
          const lossPace = 1.5 + Math.random() * 1.8;
          const lossRacecraft = 1.0 + Math.random() * 1.2;
          const lossWet = 0.5 + Math.random() * 0.8;
          attrs.pace = Math.max(60, (attrs.pace || 75) - lossPace);
          attrs.racecraft = Math.max(60, (attrs.racecraft || 75) - lossRacecraft);
          attrs.wetSkill = Math.max(60, (attrs.wetSkill || 75) - lossWet);
        }

        // Ricalcola OVR come media pesata
        const sum = (attrs.pace * 0.30) +
                    (attrs.racecraft * 0.25) +
                    (attrs.tyreMgmt * 0.20) +
                    (attrs.consistency * 0.15) +
                    (attrs.wetSkill * 0.10);
        attrs.ovr = Math.min(99, Math.max(60, Math.round(sum)));

        const delta = attrs.ovr - oldOvr;
        evolvedDrivers.push({
          id: dId,
          name: db.getDriverName(dId, discipline),
          age,
          oldOvr,
          newOvr: attrs.ovr,
          delta
        });
      });
    }

    // Sincronizza subito al database
    db.setAiDriverAttributes(this.career.aiDriverAttributes);

    // Ordina per evoluzione
    const improvers = evolvedDrivers.filter(d => d.delta > 0).sort((a, b) => b.delta - a.delta);
    const decliners = evolvedDrivers.filter(d => d.delta < 0).sort((a, b) => a.delta - b.delta);

    return { evolvedDrivers, improvers, decliners };
  }

  // Procedural generator di profilo Regen ispirato a un pilota recentemente ritiratosi
  generateRegenFromRetiredDriver(source, discipline = 'auto') {
    if (!source) return null;
    const sourceId = source.id || '';
    const lookupKey = sourceId.startsWith('drv_') ? sourceId : `drv_${sourceId}`;

    // 1. Controlla nel dizionario dei profili preconfigurati
    let profile = RETIRED_DRIVERS_REGEN_PROFILES[lookupKey] || RETIRED_DRIVERS_REGEN_PROFILES[sourceId];
    if (!profile) {
      // Cerca per corrispondenza di cognome
      for (const [k, p] of Object.entries(RETIRED_DRIVERS_REGEN_PROFILES)) {
        if (source.name && source.name.toLowerCase().includes(k.replace('drv_', '').toLowerCase())) {
          profile = p;
          break;
        }
      }
    }

    if (profile) {
      const realNames = profile.regenRealNames || [source.name];
      const fictionalNames = profile.fictionalRegenNames || [profile.regenRealNames?.[0] || source.name];
      const rIdx = Math.floor(Math.random() * realNames.length);

      return {
        id: source.id || 'retired_protege',
        realName: realNames[rIdx],
        fictionalName: fictionalNames[rIdx % fictionalNames.length],
        nationality: profile.nationality || source.nationality || 'ITA',
        number: Math.floor(Math.random() * 88 + 11),
        traits: profile.traits || {},
        legendSource: source.name
      };
    }

    // 2. Procedural Fallback credibile per qualsiasi pilota ritirato
    const nameParts = (source.name || 'Pilota Veterano').split(' ');
    const lastName = nameParts[nameParts.length - 1] || 'Racer';
    const nationality = source.nationality || 'ITA';

    const firstNamesByNat = {
      ITA: ["Matteo", "Lorenzo", "Davide", "Andrea", "Luca", "Edoardo", "Tommaso"],
      ESP: ["Jordi", "Adrián", "Mateo", "Lucas", "César", "Iker", "Gael"],
      GBR: ["Oliver", "Callum", "Archie", "George", "Leo", "Toby", "Harvey"],
      FRA: ["Julien", "Cédric", "Lucas", "Mathis", "Adrien", "Tristan", "Robin"],
      DEU: ["Lukas", "Maximilian", "Simon", "Jonas", "Felix", "Niklas", "Tim"],
      NLD: ["Mats", "Lars", "Jesse", "Sem", "Milan", "Finn", "Daan"],
      AUS: ["Lachlan", "Callum", "Jaxon", "Cooper", "Harrison", "Flynn"],
      JPN: ["Ren", "Haruto", "Kaito", "Sota", "Riku", "Taiki", "Hayato"],
      USA: ["Chase", "Colt", "Mason", "Wyatt", "Logan", "Austin", "Carter"],
      BRA: ["Thiago", "Mateo", "Enzo", "Felipe", "Lucas", "Gabriel", "Rodrigo"]
    };

    const firstPool = firstNamesByNat[nationality] || ["Leo", "Alex", "Marco", "Lucas", "Julian"];
    const chosenFirst = firstPool[Math.floor(Math.random() * firstPool.length)];

    // Sfumatura evocativa del cognome
    let evocativeLast = lastName;
    if (lastName.endsWith('o') || lastName.endsWith('i')) evocativeLast = `${lastName.slice(0, -1)}ini`;
    else if (lastName.endsWith('ez')) evocativeLast = `${lastName.slice(0, -2)}ado`;
    else if (lastName.endsWith('er')) evocativeLast = `${lastName}mann`;
    else if (lastName.endsWith('s')) evocativeLast = `${lastName}on`;
    else evocativeLast = `${lastName}er`;

    const generatedReal = `${chosenFirst} ${evocativeLast}`;
    const generatedFictional = `${chosenFirst} Il Giovane ${lastName}`;

    // Determina bias dai tratti/attributi del pilota
    const sourceAttrs = source.attrs || source.stats || {};
    const pace = sourceAttrs.pace || source.ovr || 75;
    const tyreMgmt = sourceAttrs.tyreMgmt || 75;
    const racecraft = sourceAttrs.racecraft || 75;

    let traits = { paceBias: 4, racecraftBias: 4, tyreMgmtBias: 4, consistencyBias: 4, wetSkillBias: 3, traitNote: "Nuova promessa della scuderia" };
    if (pace >= 85) {
      traits = { paceBias: 7, racecraftBias: 5, tyreMgmtBias: 3, consistencyBias: 5, wetSkillBias: 5, traitNote: "Velocità di punta bruciante sul giro singolo" };
    } else if (tyreMgmt >= 85) {
      traits = { paceBias: 4, racecraftBias: 5, tyreMgmtBias: 8, consistencyBias: 7, wetSkillBias: 4, traitNote: "Gestione magistrale del degrado pneumatici" };
    } else if (racecraft >= 85) {
      traits = { paceBias: 5, racecraftBias: 8, tyreMgmtBias: 4, consistencyBias: 5, wetSkillBias: 5, traitNote: "Istinto predatorio e grinta feroce nei duelli" };
    }

    return {
      id: source.id || 'retired_protege',
      realName: generatedReal,
      fictionalName: generatedFictional,
      nationality,
      number: Math.floor(Math.random() * 88 + 11),
      traits,
      legendSource: source.name
    };
  }

  // Processa i ritiri dei piloti AI veterani e aggiorna la loro scheda nella Hall of Fame GOAT
  processAiDriverRetirements() {
    if (!this.career) return { retired: [] };
    if (!this.career.retiredDrivers) this.career.retiredDrivers = [];
    if (!this.career.teamDriverOverrides) this.career.teamDriverOverrides = {};
    if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
    if (!this.career.driverCareerStats) {
      this.career.driverCareerStats = JSON.parse(JSON.stringify(DRIVER_BASELINES));
    }

    const discipline = this.player?.discipline || 'auto';
    const categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    const retiredThisYear = [];

    const allDriversMap = new Map();
    for (const catKey in categories) {
      const cat = categories[catKey];
      if (!cat?.roster) continue;
      cat.roster.forEach(d => {
        if (!allDriversMap.has(d.id)) {
          allDriversMap.set(d.id, { driver: d, category: catKey });
        }
      });
    }

    allDriversMap.forEach(({ driver, category }, dId) => {
      const effTeam = this.career.teamDriverOverrides[dId] || driver.teamId;
      if (effTeam === 'retired') return; // Già ritirato

      const attrs = this.career.aiDriverAttributes?.[dId] || { age: INITIAL_DRIVER_AGES[dId] || driver.age || 25, ovr: driver.ovr || 75 };
      const age = attrs.age || 25;
      const ovr = attrs.ovr || 75;

      // I piloti possono iniziare a ritirarsi a partire da 35 anni
      if (age >= 35) {
        let retireProbability = 0;
        if (age === 35) retireProbability = 0.12;
        else if (age === 36) retireProbability = 0.22;
        else if (age === 37) retireProbability = 0.35;
        else if (age === 38) retireProbability = 0.50;
        else if (age === 39) retireProbability = 0.65;
        else if (age === 40) retireProbability = 0.78;
        else if (age === 41) retireProbability = 0.88;
        else retireProbability = 0.96; // 42+ anni

        // Se il rendimento è calato parecchio (OVR basso per la categoria), aumento probabilità
        if (ovr <= 74) retireProbability = Math.min(0.98, retireProbability + 0.15);

        if (Math.random() < retireProbability) {
          // Il pilota si ritira!
          const driverName = db.getDriverName(dId, discipline);
          const finalTeamName = effTeam && effTeam !== 'free_agent' ? db.getTeamName(effTeam, discipline, category) : 'Svincolato';

          this.career.teamDriverOverrides[dId] = 'retired';
          if (!this.career.retiredDriverIds) this.career.retiredDriverIds = [];
          if (!this.career.retiredDriverIds.includes(dId)) {
            this.career.retiredDriverIds.push(dId);
          }
          if (this.career.freeAgents) {
            this.career.freeAgents = this.career.freeAgents.filter(fa => fa.driverId !== dId);
          }

          // Aggiornamento definitivo della scheda GOAT Hall of Fame
          if (!this.career.driverCareerStats[dId]) {
            this._ensureDriverStatsEntry(dId, category);
          }
          const statEntry = this.career.driverCareerStats[dId];
          statEntry.isRetired = true;
          statEntry.retiredYear = this.career.currentYear || 2026;

          // Risolve e fissa l'era di attività (es. 2001-2027)
          let startYear = 2026;
          if (statEntry.era) {
            const match = String(statEntry.era).match(/^(\d{4})/);
            if (match) startYear = parseInt(match[1], 10);
            else startYear = Math.max(1990, (this.career.currentYear || 2026) - (age - 20));
          } else {
            startYear = Math.max(1990, (this.career.currentYear || 2026) - (age - 20));
          }
          statEntry.era = `${startYear}-${this.career.currentYear || 2026}`;

          // Calcolo palmarès totale
          let totalTitles = 0;
          let totalWins = 0;
          let totalPodiums = 0;
          let totalPoles = 0;
          for (const cKey in statEntry.byCategory || {}) {
            const cs = statEntry.byCategory[cKey];
            totalTitles += cs.worldTitles || 0;
            totalWins += cs.wins || 0;
            totalPodiums += cs.podiums || 0;
            totalPoles += cs.poles || 0;
          }

          if (totalTitles > 0 || totalWins >= 10) {
            statEntry.isLegend = true;
            statEntry.notableNote = `Leggenda del Motorsport ritiratasi nel ${this.career.currentYear} (${totalTitles} Titoli Mondiali, ${totalWins} Vittorie e ${totalPodiums} Podi)`;
          } else if (totalWins > 0 || totalPodiums >= 5) {
            statEntry.notableNote = `Veterano affermato ritiratosi nel ${this.career.currentYear} (${totalWins} Vittorie e ${totalPodiums} Podi in carriera)`;
          } else {
            statEntry.notableNote = `Pilota professionista ritiratosi nel ${this.career.currentYear} all'età di ${age} anni`;
          }

          const retiredObj = {
            id: dId,
            name: driverName,
            age,
            ovr,
            finalTeamId: effTeam,
            finalTeamName,
            category,
            retiredYear: this.career.currentYear || 2026,
            stats: JSON.parse(JSON.stringify(statEntry))
          };

          this.career.retiredDrivers.push(retiredObj);
          retiredThisYear.push(retiredObj);

          this.career.aiTransferNews.unshift(
            `🏁 RITIRO UFFICIALE: All'età di ${age} anni, ${driverName} annuncia l'addio definitivo alle corse e il ritiro dal motorsport!`
          );
        }
      }
    });

    return { retired: retiredThisYear };
  }

  // Genera un giovane talento Rookie (Regen) con nome di fantasia evocativo e tratti/caratteristiche comuni
  createRegenDriver(assignedTeamId, categoryKey, discipline = 'auto', source = null) {
    if (!this.career) return null;
    if (!this.career.regens) this.career.regens = {};
    if (!this.career.teamDriverOverrides) this.career.teamDriverOverrides = {};
    if (!this.career.aiDriverAttributes) this.career.aiDriverAttributes = {};
    if (!this.career.aiTransferNews) this.career.aiTransferNews = [];

    const categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    const cat = categories[categoryKey];
    if (!cat) return null;

    let inspiration = null;
    let legendSource = 'Leggenda Storica';

    // 1. Se è fornito un pilota sorgente ritirato
    if (source && source.name) {
      inspiration = this.generateRegenFromRetiredDriver(source, discipline);
      legendSource = source.name;
    } else {
      // 2. Se ci sono piloti ritirati nella carriera non ancora omaggiati da un regen, 45% di probabilità di rigenerarli
      const usedSourceNames = new Set(Object.values(this.career.regens || {}).map(r => r.legendSource));
      const unusedRetired = (this.career.retiredDrivers || []).filter(rd => rd.name && !usedSourceNames.has(rd.name));

      if (unusedRetired.length > 0 && Math.random() < 0.45) {
        const pickedRetired = unusedRetired[Math.floor(Math.random() * unusedRetired.length)];
        inspiration = this.generateRegenFromRetiredDriver(pickedRetired, discipline);
        legendSource = pickedRetired.name;
      } else {
        // 3. Selezione dal pool di mostri sacri e leggende storiche
        const legendPool = discipline === 'auto' ? AUTO_LEGENDS_REGEN_POOL : MOTO_LEGENDS_REGEN_POOL;
        if (!this.career.usedRegenLegendIds) this.career.usedRegenLegendIds = [];
        const usedLegendIds = new Set([
          ...Object.values(this.career.regens || {}).map(r => r.legendId).filter(Boolean),
          ...this.career.usedRegenLegendIds
        ]);
        const unusedLegends = legendPool.filter(l => l && !usedLegendIds.has(l.id));
        const pickedLegend = (unusedLegends.length > 0)
          ? unusedLegends[Math.floor(Math.random() * unusedLegends.length)]
          : legendPool[Math.floor(Math.random() * legendPool.length)];

        if (pickedLegend && !this.career.usedRegenLegendIds.includes(pickedLegend.id)) {
          this.career.usedRegenLegendIds.push(pickedLegend.id);
        }

        // Estrazione nomi di fantasia evocativi e tratti distintivi
        const realNames = pickedLegend.regenRealNames || [pickedLegend.realName];
        const fictionalNames = pickedLegend.fictionalRegenNames || [pickedLegend.fictionalName || pickedLegend.realName];
        const rIdx = Math.floor(Math.random() * realNames.length);

        inspiration = {
          id: pickedLegend.id,
          realName: realNames[rIdx],
          fictionalName: fictionalNames[rIdx % fictionalNames.length],
          nationality: pickedLegend.nationality || 'ITA',
          number: pickedLegend.number || Math.floor(Math.random() * 88 + 11),
          traits: pickedLegend.traits || {},
          legendSource: pickedLegend.realName
        };
        legendSource = pickedLegend.realName;
      }
    }

    if (!inspiration) return null;

    const uniqueSuffix = Math.random().toString(36).substring(2, 6);
    const regenId = `regen_${inspiration.id || 'rookie'}_${this.career.currentYear || 2026}_${uniqueSuffix}`;

    const age = 17 + Math.floor(Math.random() * 3); // 17, 18, o 19 anni

    // OVR tarato sulla categoria di debutto
    let baseOvr = 72;
    if (categoryKey === 'auto_f1' || categoryKey === 'moto_gp') baseOvr = 77 + Math.floor(Math.random() * 6);
    else if (categoryKey === 'auto_f2' || categoryKey === 'moto_2' || categoryKey === 'auto_wec' || categoryKey === 'auto_indy' || categoryKey === 'moto_sbk') baseOvr = 73 + Math.floor(Math.random() * 5);
    else baseOvr = 69 + Math.floor(Math.random() * 5);

    // Applicazione caratteristiche comuni / bias di DNA
    const traits = inspiration.traits || {};
    const paceBias = traits.paceBias || 0;
    const racecraftBias = traits.racecraftBias || 0;
    const tyreMgmtBias = traits.tyreMgmtBias || 0;
    const consistencyBias = traits.consistencyBias || 0;
    const wetSkillBias = traits.wetSkillBias || 0;

    const pace = Math.min(99, Math.max(60, baseOvr + paceBias + Math.floor(Math.random() * 3 - 1)));
    const racecraft = Math.min(99, Math.max(60, baseOvr + racecraftBias + Math.floor(Math.random() * 3 - 1)));
    const tyreMgmt = Math.min(99, Math.max(60, baseOvr + tyreMgmtBias + Math.floor(Math.random() * 3 - 1)));
    const consistency = Math.min(99, Math.max(60, baseOvr + consistencyBias + Math.floor(Math.random() * 3 - 1)));
    const wetSkill = Math.min(99, Math.max(60, baseOvr + wetSkillBias + Math.floor(Math.random() * 3 - 1)));
    const calculatedOvr = this.calculateOvr(pace, racecraft, tyreMgmt, consistency, wetSkill, 70);

    const realName = inspiration.realName;
    const fictionalName = inspiration.fictionalName || inspiration.realName;

    const regenData = {
      id: regenId,
      name: realName,
      realName,
      fictionalName,
      displayName: realName,
      nationality: inspiration.nationality || 'ITA',
      number: inspiration.number || Math.floor(Math.random() * 88 + 11),
      age,
      ovr: calculatedOvr,
      pace,
      racecraft,
      tyreMgmt,
      consistency,
      wetSkill,
      teamId: assignedTeamId,
      category: categoryKey,
      discipline,
      isRegen: true,
      legendId: inspiration.id || null,
      legendSource,
      traits,
      traitNote: traits.traitNote || 'Nuova stella promettente del vivaio'
    };

    // Registra nel DatabaseManager e nell'engine
    this.career.regens[regenId] = regenData;
    db.registerCustomDriver(regenData);

    this.career.aiDriverAttributes[regenId] = {
      ovr: calculatedOvr,
      pace,
      racecraft,
      tyreMgmt,
      consistency,
      wetSkill,
      age
    };

    // Assegna al team
    this.career.teamDriverOverrides[regenId] = assignedTeamId;

    // Aggiungi al roster della categoria se non già presente
    if (!cat.roster.some(d => d.id === regenId)) {
      cat.roster.push(regenData);
    }

    const assignedTeamName = db.getTeamName(assignedTeamId, discipline, categoryKey);
    this.career.aiTransferNews.unshift(
      `⭐ DEBUTTO PRODIGIO: ${assignedTeamName} promuove la giovane promessa ${realName} (${age} anni, OVR ${baseOvr}), ispirato a ${legendSource}! Stile: ${regenData.traitNote}.`
    );

    return regenData;
  }

  // Risolve e garantisce che ogni scuderia di ogni categoria soddisfi esattamente i requisiti regolamentari di piloti
  resolveRegulationRostersAndRegens() {
    if (!this.career) return { promotions: [], createdRegens: [] };
    const discipline = this.player?.discipline || 'auto';
    const categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    const playerTeamId = this.career.currentTeamId;
    const playerCatKey = this.career.currentCategory;

    // Gerarchia per promozioni dalle serie minori
    const feederHierarchy = discipline === 'auto'
      ? [
          { target: 'auto_f1', feeders: ['auto_f2', 'auto_f3'] },
          { target: 'auto_f2', feeders: ['auto_f3', 'auto_f4'] },
          { target: 'auto_f3', feeders: ['auto_f4'] },
          { target: 'auto_wec', feeders: ['auto_f2', 'auto_f3'] },
          { target: 'auto_indy', feeders: ['auto_f2', 'auto_f3'] },
          { target: 'auto_f4', feeders: [] }
        ]
      : [
          { target: 'moto_gp', feeders: ['moto_2', 'moto_3'] },
          { target: 'moto_sbk', feeders: ['moto_2', 'moto_3'] },
          { target: 'moto_2', feeders: ['moto_3'] },
          { target: 'moto_3', feeders: [] }
        ];

    const promotions = [];
    const createdRegens = [];

    for (const step of feederHierarchy) {
      const catKey = step.target;
      const cat = categories[catKey];
      if (!cat || !cat.teams || !cat.roster) continue;

      const maxDrivers = cat.maxDriversPerTeam || 2;
      const isPlayerCat = (catKey === playerCatKey);

      for (const team of cat.teams) {
        const isPlayerTeam = isPlayerCat && (team.id === playerTeamId);
        const capacity = isPlayerTeam ? Math.max(1, maxDrivers - 1) : maxDrivers;

        // Trova piloti attivi validi (non ritirati, non free agent)
        let activeDrivers = cat.roster.filter(d => {
          const effTeam = this.career.teamDriverOverrides?.[d.id] || d.teamId;
          if (effTeam !== team.id) return false;
          if (effTeam === 'retired' || effTeam === 'free_agent') return false;
          if (isPlayerTeam && d.id === this.career.teamBenchedDriverId) return false;
          return true;
        });

        // Se mancano piloti per la capienza regolamentare
        while (activeDrivers.length < capacity) {
          let filled = false;

          // 1. Tenta la promozione da una serie giovanile
          for (const feederCatKey of step.feeders) {
            const feederCat = categories[feederCatKey];
            if (!feederCat || !feederCat.roster) continue;

            // Trova i migliori talenti della serie inferiore non ancora promossi o ritirati
            const feederCandidates = feederCat.roster.filter(fd => {
              const eff = this.career.teamDriverOverrides?.[fd.id] || fd.teamId;
              return eff !== 'retired' && eff !== 'promoted';
            }).sort((a, b) => {
              const ovrA = this.career.aiDriverAttributes?.[a.id]?.ovr || a.ovr || 70;
              const ovrB = this.career.aiDriverAttributes?.[b.id]?.ovr || b.ovr || 70;
              return ovrB - ovrA;
            });

            if (feederCandidates.length > 0) {
              const promotedDriver = feederCandidates[0];
              // Rimuovi dalla serie precedente assegnando al nuovo team e nuova categoria
              this.career.teamDriverOverrides[promotedDriver.id] = team.id;
              // Rimuovi dal vecchio roster per evitare duplicati
              feederCat.roster = feederCat.roster.filter(d => d.id !== promotedDriver.id);
              // Aggiungi al roster della categoria superiore
              cat.roster.push(promotedDriver);
              activeDrivers.push(promotedDriver);

              const pName = db.getDriverName(promotedDriver.id, discipline);
              const tName = db.getTeamName(team.id, discipline, catKey);
              const targetSeries = db.getSeriesName(catKey, discipline);

              this.career.aiTransferNews.unshift(
                `🚀 PROMOZIONE DI MERCATO: ${pName} viene promosso in ${targetSeries} e correrà per ${tName}!`
              );
              promotions.push({ driverId: promotedDriver.id, name: pName, targetTeam: team.id, targetCategory: catKey });
              filled = true;
              break;
            }
          }

          // 2. Se nessuna promozione possibile, cerca un Free Agent valido
          if (!filled && this.career.freeAgents && this.career.freeAgents.length > 0) {
            const validFAIdx = this.career.freeAgents.findIndex(fa => {
              const eff = this.career.teamDriverOverrides?.[fa.driverId];
              return eff !== 'retired';
            });
            if (validFAIdx >= 0) {
              const faObj = this.career.freeAgents.splice(validFAIdx, 1)[0];
              this.career.teamDriverOverrides[faObj.driverId] = team.id;
              const faDriver = db.getDriver(faObj.driverId, discipline);
              if (faDriver && !cat.roster.some(d => d.id === faObj.driverId)) {
                cat.roster.push(faDriver);
              }
              activeDrivers.push(faDriver || { id: faObj.driverId });
              const faName = db.getDriverName(faObj.driverId, discipline);
              const tName = db.getTeamName(team.id, discipline, catKey);
              this.career.aiTransferNews.unshift(
                `✍️ ACCORDO DI MERCATO: ${tName} ingaggia lo svincolato ${faName} per completare la line-up!`
              );
              filled = true;
            }
          }

          // 3. Se ancora vuoto: CREA UN REGEN di una leggenda o pilota ritirato!
          if (!filled) {
            const regen = this.createRegenDriver(team.id, catKey, discipline);
            if (regen) {
              activeDrivers.push(regen);
              createdRegens.push(regen);
              filled = true;
            } else {
              break; // Safety break
            }
          }
        }
      }
    }

    return { promotions, createdRegens };
  }

  // Inizializza la classifica piloti e team all'inizio di ogni stagione
  initSeasonStandings() {
    const categories = this.player.discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    const cat = categories[this.career.currentCategory];
    if (!cat) return;

    // Driver standings: Player + Active AI Roster only (esclude rigorosamente i piloti benched)
    const activeRoster = this.getActiveRoster(this.career.currentCategory);
    const driverList = [
      { driverId: "player", points: 0, wins: 0, podiums: 0, poles: 0, isPlayer: true }
    ];

    activeRoster.forEach(r => {
      driverList.push({
        driverId: r.id,
        points: 0,
        wins: 0,
        podiums: 0,
        poles: 0,
        isPlayer: false
      });
    });

    // Team standings
    const teamList = cat.teams.map(t => ({
      teamId: t.id,
      points: 0
    }));

    this.career.standings = {
      drivers: driverList,
      teams: teamList
    };
    this.career.currentRaceIndex = 0;
  }

  // Ottiene la categoria corrente
  getCurrentCategoryData() {
    const categories = this.player.discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    return categories[this.career.currentCategory];
  }

  // Ottiene il circuito della prossima gara del calendario
  getNextCircuit() {
    const catData = this.getCurrentCategoryData();
    if (!catData || !catData.calendar) return null;
    const circuitId = catData.calendar[this.career.currentRaceIndex];
    return db.getCircuit(circuitId);
  }

  // Ottiene la scuderia attuale del giocatore con upgrade R&D applicati
  getPlayerTeam() {
    const catData = this.getCurrentCategoryData();
    if (!catData || !catData.teams) {
      return { id: 'default_team', displayName: 'Scuderia', color: '#e10600', carPace: 75, bikePace: 75, performance: 75, carPerformance: 75, reliability: 75 };
    }
    const team = catData.teams.find(t => t.id === this.career?.currentTeamId) || catData.teams[0];
    const upgrades = this.career?.carUpgrades || { aero: 0, engine: 0, chassis: 0, reliability: 0 };
    const bonusPace = (upgrades.aero * 0.40) + (upgrades.engine * 0.40) + (upgrades.chassis * 0.30);
    const bonusReliability = upgrades.reliability * 1.5;

    // Bonus derivanti dai sottocomponenti R&D specialistici
    const subComps = this.career?.rdSubComponents || {};
    let subPaceGain = 0;
    let subRelGain = 0;
    for (const [key, lvl] of Object.entries(subComps)) {
      const cfg = RD_SUBCOMPONENTS_CONFIG[key];
      if (cfg && lvl > 0) {
        subPaceGain += (cfg.paceGain || 0) * lvl;
        subRelGain += (cfg.reliabilityGain || 0) * lvl;
      }
    }

    const dev = this.career?.teamDevelopment?.[team.id];
    const basePace = (dev && dev.carPace !== undefined) ? dev.carPace : (team.carPace || team.bikePace || 75);
    const baseReliability = (dev && dev.reliability !== undefined) ? dev.reliability : (team.reliability || 85);

    // Curva di sviluppo progressivo: cap morbido a 97 per permettere a team dominanti con R&D completo di raggiungere 98-99
    const rawPace = basePace + bonusPace + subPaceGain;
    let finalPace = rawPace;
    if (rawPace > 97) {
      finalPace = 97 + ((rawPace - 97) * 0.65);
    }
    finalPace = Math.min(99, Math.round(finalPace));

    const resolvedName = db.getTeamName(team.id, this.player?.discipline);

    return {
      ...team,
      carPace: finalPace,
      bikePace: finalPace,
      performance: finalPace,
      carPerformance: finalPace,
      bikePerformance: finalPace,
      reliability: Math.min(99, Math.round(baseReliability + bonusReliability + subRelGain)),
      displayName: resolvedName || team.realName || team.fictionalName || team.name || 'Scuderia',
      color: team.color || '#e10600'
    };
  }

  // Ottiene il compagno di squadra attuale
  getCurrentTeammate() {
    const catData = this.getCurrentCategoryData();
    if (!catData) return { name: "Rookie Collaudatore", ovr: 74, id: "test_driver" };
    
    // Se c'è un compagno scelto esplicitamente
    if (this.career?.chosenTeammateId) {
      const chosenId = Array.isArray(this.career.chosenTeammateId) ? this.career.chosenTeammateId[0] : this.career.chosenTeammateId;
      const driver = catData.roster.find(r => r.id === chosenId);
      if (driver) {
        return {
          ...driver,
          name: db.getDriverName(driver.id, this.player.discipline)
        };
      }
    }

    // Altrimenti cerca i piloti del team escludendo quello benched
    const activeTeammates = catData.roster.filter(r => {
      const effTeam = (this.career?.teamDriverOverrides && this.career.teamDriverOverrides[r.id]) || r.teamId;
      return effTeam === this.career.currentTeamId && r.id !== this.career.teamBenchedDriverId;
    });

    if (activeTeammates.length > 0) {
      const teammate = activeTeammates[0];
      return {
        ...teammate,
        name: db.getDriverName(teammate.id, this.player.discipline)
      };
    }

    return { name: "Rookie Collaudatore", ovr: 74, id: "test_driver" };
  }

  // Inizializza il sistema R&D avanzato, sottocomponenti e punti telemetria
  initRdSystem() {
    if (!this.career) return;
    if (this.career.rdTelemetryPoints === undefined) {
      this.career.rdTelemetryPoints = 25;
    }
    if (!this.career.rdSubComponents) {
      this.career.rdSubComponents = {
        aero_front_wing: 0,
        aero_floor_venturi: 0,
        aero_rear_wing_drs: 0,
        engine_ice_combustion: 0,
        engine_ers_hybrid: 0,
        engine_ecu_exhaust: 0,
        chassis_suspension: 0,
        chassis_monocoque: 0,
        chassis_brakes: 0,
        rel_sensor_telemetry: 0,
        rel_dyno_stress_test: 0
      };
    }
    if (!this.career.rdFocus) {
      this.career.rdFocus = 'balanced';
    }
    if (!this.career.teammateCollaborationStats) {
      this.career.teammateCollaborationStats = {
        totalMoneyContributed: 0,
        totalTelemetryContributed: 0,
        upgradesDelivered: 0,
        lastBreakthrough: null
      };
    }
    if (!this.career.regulations) {
      this.career.regulations = {
        currentCycle: 1,
        cycleLengthYears: 3,
        nextRegulationChangeYear: 2029,
        isRegulationYearAnnounced: false,
        playerNextGenInvestment: 0,
        teammateNextGenInvestment: 0,
        teammateContribution: { money: 0, points: 0, log: [] },
        aiTeamInvestments: {}
      };
    } else {
      if (this.career.regulations.teammateNextGenInvestment === undefined) {
        this.career.regulations.teammateNextGenInvestment = 0;
      }
      if (!this.career.regulations.teammateContribution) {
        this.career.regulations.teammateContribution = { money: 0, points: 0, log: [] };
      }
      if (!this.career.regulations.aiTeamInvestments) {
        this.career.regulations.aiTeamInvestments = {};
      }
    }

    if (!this.career.driverCareerStats) {
      this.career.driverCareerStats = JSON.parse(JSON.stringify(DRIVER_BASELINES));
    } else {
      // Assicura che nuove leggende o piloti baseline siano presenti
      for (const [k, v] of Object.entries(DRIVER_BASELINES)) {
        if (!this.career.driverCareerStats[k]) {
          this.career.driverCareerStats[k] = JSON.parse(JSON.stringify(v));
        }
      }
    }
  }

  // Registrazione dinamica statistiche carriera per tutti i piloti (Player & AI)
  _ensureDriverStatsEntry(driverId, category) {
    if (!this.career.driverCareerStats) {
      this.career.driverCareerStats = JSON.parse(JSON.stringify(DRIVER_BASELINES));
    }
    if (!this.career.driverCareerStats[driverId]) {
      const discipline = this.player?.discipline || 'auto';
      const dName = driverId === 'player'
        ? `${this.player?.firstName || 'Pilota'} ${this.player?.lastName || 'Player'}`
        : db.getDriverName(driverId, discipline);
      this.career.driverCareerStats[driverId] = {
        id: driverId,
        realName: dName,
        fictionalName: dName,
        discipline,
        isLegend: false,
        era: `${this.career.currentYear || 2026}-Attivo`,
        byCategory: {}
      };
    }
    const d = this.career.driverCareerStats[driverId];
    if (!d.byCategory[category]) {
      d.byCategory[category] = { worldTitles: 0, wins: 0, poles: 0, podiums: 0, racesStarted: 0 };
    }
    return d.byCategory[category];
  }

  recordDriverPole(driverId, category) {
    const cat = this._ensureDriverStatsEntry(driverId, category);
    cat.poles = (cat.poles || 0) + 1;
  }

  recordDriverWin(driverId, category) {
    const cat = this._ensureDriverStatsEntry(driverId, category);
    cat.wins = (cat.wins || 0) + 1;
  }

  recordDriverPodium(driverId, category) {
    const cat = this._ensureDriverStatsEntry(driverId, category);
    cat.podiums = (cat.podiums || 0) + 1;
  }

  recordDriverRaceStarted(driverId, category) {
    const cat = this._ensureDriverStatsEntry(driverId, category);
    cat.racesStarted = (cat.racesStarted || 0) + 1;
  }

  recordDriverTitle(driverId, category) {
    const cat = this._ensureDriverStatsEntry(driverId, category);
    cat.worldTitles = (cat.worldTitles || 0) + 1;
  }

  // Simula l'esito dei campionati delle categorie non attive per rendere vivo tutto il circus
  simulateOtherCategoriesSeasonEnd() {
    const categories = this.player?.discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    const discipline = this.player?.discipline || 'auto';
    const activeCatKey = this.career.currentCategory;

    for (const [catKey, catData] of Object.entries(categories)) {
      if (catKey === activeCatKey) continue;
      if (!catData || !catData.roster || catData.roster.length === 0) continue;

      // Calcola punteggio stagionale per ciascun pilota della categoria
      const scoredDrivers = catData.roster.map(d => {
        const team = catData.teams.find(t => t.id === d.teamId);
        const teamPace = (this.career.teamDevelopment?.[d.teamId]?.carPace) || (team?.carPace || team?.bikePace || 75);
        const driverOvr = d.ovr || 75;
        const form = (Math.random() * 12) - 6;
        const score = (teamPace * 0.5) + (driverOvr * 0.5) + form;
        return { driver: d, team, score };
      }).sort((a, b) => b.score - a.score);

      if (scoredDrivers.length > 0) {
        const champ = scoredDrivers[0];
        // Assegna titolo al campione
        this.recordDriverTitle(champ.driver.id, catKey);
        this.recordDriverWin(champ.driver.id, catKey);
        this.recordDriverWin(champ.driver.id, catKey);
        this.recordDriverWin(champ.driver.id, catKey);
        this.recordDriverWin(champ.driver.id, catKey);
        this.recordDriverPodium(champ.driver.id, catKey);
        this.recordDriverPodium(champ.driver.id, catKey);
        this.recordDriverPodium(champ.driver.id, catKey);

        // Se è la categoria regina (F1 o MotoGP) e il giocatore correva altrove, aggiungi notizia ufficiale
        if (catKey === 'auto_f1' || catKey === 'moto_gp') {
          const dName = db.getDriverName(champ.driver.id, discipline);
          const tName = champ.team ? db.getTeamName(champ.team.id, discipline, catKey) : 'Scuderia Ufficiale';
          if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
          this.career.aiTransferNews.unshift(
            `🏆 ALBO D'ORO ${this.career.currentYear - 1}: ${dName} (${tName}) si laurea Campione del Mondo nella classe regina!`
          );
        }
      }
    }
  }

  // Moltiplicatori economici di sviluppo R&D in base alla categoria attiva
  getCategoryEconomyMultiplier(categoryKey = null) {
    const cat = categoryKey || this.career?.currentCategory || (this.player?.discipline === 'moto' ? 'moto_3' : 'auto_f4');
    const multipliers = {
      // Formule Junior / Moto minori: costi accessibili e proporzionati a montepremi e stipendi ridotti
      auto_f4: { moneyMult: 0.15, ptsMult: 0.35, label: 'Formula 4 (Accessibile)' },
      moto_3:  { moneyMult: 0.15, ptsMult: 0.35, label: 'Moto3 (Accessibile)' },
      auto_f3: { moneyMult: 0.35, ptsMult: 0.55, label: 'Formula 3 (Moderata)' },
      moto_2:  { moneyMult: 0.35, ptsMult: 0.55, label: 'Moto2 (Moderata)' },
      // Serie Intermedie / Grandi campionati internazionali
      auto_f2: { moneyMult: 0.65, ptsMult: 0.80, label: 'Formula 2 (Standard)' },
      auto_indy: { moneyMult: 0.70, ptsMult: 0.85, label: 'IndyCar (Standard)' },
      auto_wec: { moneyMult: 0.75, ptsMult: 0.90, label: 'WEC Hypercar (Avanzata)' },
      moto_sbk: { moneyMult: 0.60, ptsMult: 0.80, label: 'WorldSBK (Standard)' },
      // Top Class Assoluta
      auto_f1: { moneyMult: 1.0, ptsMult: 1.0, label: 'Formula 1 (Massima Competizione)' },
      moto_gp: { moneyMult: 1.0, ptsMult: 1.0, label: 'MotoGP (Massima Competizione)' },
    };
    return multipliers[cat] || { moneyMult: 0.40, ptsMult: 0.60, label: 'Formula Standard' };
  }

  // Calcolo dinamico costi in denaro e telemetria per un sottocomponente
  calculateSubComponentCost(compKey, level = null) {
    const cfg = RD_SUBCOMPONENTS_CONFIG[compKey];
    if (!cfg) return { cost: 0, ptsCost: 0, rawCost: 0, rawPtsCost: 0, moneyMult: 1, ptsMult: 1, categoryLabel: '' };

    const currentLvl = level !== null ? level : (this.career?.rdSubComponents?.[compKey] || 0);
    const rawCost = cfg.baseCost + (currentLvl * cfg.costMult);
    const rawPtsCost = cfg.basePoints + (currentLvl * cfg.pointsMult);

    const eco = this.getCategoryEconomyMultiplier();
    const cost = Math.round(rawCost * eco.moneyMult);
    const ptsCost = Math.max(10, Math.round(rawPtsCost * eco.ptsMult));

    return {
      cost,
      ptsCost,
      rawCost,
      rawPtsCost,
      moneyMult: eco.moneyMult,
      ptsMult: eco.ptsMult,
      categoryLabel: eco.label
    };
  }

  // Calcola probabilità di fallimento e successo per un determinato sottocomponente R&D
  calculateSubComponentRisk(compKey) {
    this.initRdSystem();
    const cfg = RD_SUBCOMPONENTS_CONFIG[compKey];
    if (!cfg) return { risk: 20, successRate: 80 };

    const currentLvl = this.career.rdSubComponents[compKey] || 0;
    const targetLvl = currentLvl + 1;

    // Rischio base progressivo per livello:
    // Livello 1: 18%, Livello 2: 26%, Livello 3: 34%, Livello 4: 42%, Livello 5: 50%
    const baseRiskByLevel = [0, 18, 26, 34, 42, 50];
    let risk = baseRiskByLevel[targetLvl] || 25;

    // Mitigazioni Strategiche:
    // 1. Livello Simulatore Dinamico HQ (-2% per livello, max -10%)
    const simLvl = this.career.hqUpgrades?.simulatorLevel || 0;
    risk -= simLvl * 2;

    // 2. Race Engineer & Coach Telemetrico HQ (-1.5% per livello, max -7.5%)
    const coachLvl = this.career.hqUpgrades?.telemetryCoachLevel || 0;
    risk -= coachLvl * 1.5;

    // 3. Feedback Tecnico del Pilota (Pilota esperto dà migliori indicazioni agli ingegneri)
    const techFeedback = this.player?.attributes?.technicalFeedback || 60;
    risk -= (techFeedback - 60) * 0.20;

    // 4. Componenti di Controllo Qualità & Durabilità installati
    const subComps = this.career.rdSubComponents || {};
    const gearboxLvl = subComps.rel_gearbox || 0;
    const hydLvl = subComps.rel_hydraulics || 0;
    risk -= gearboxLvl * 1.5; // fino a -7.5%
    risk -= hydLvl * 2.0;     // fino a -10%

    // Clamp tra 8% (minimo fisiologico in F1) e 65% (massimo rischio consentito)
    risk = Math.max(8, Math.min(65, Math.round(risk)));
    const successRate = 100 - risk;

    return { risk, successRate };
  }

  // Elabora la collaborazione tecnica ed economica del compagno di squadra dopo ogni weekend
  processTeammateCollaboration(finishPos = 10) {
    if (!this.career) return null;
    this.initRdSystem();

    const tm = this.getCurrentTeammate();
    const discipline = this.player?.discipline || 'auto';
    const tmFeedback = tm?.technicalFeedback || tm?.attributes?.technicalFeedback || 65;
    const tmMarketability = tm?.marketability || tm?.attributes?.marketability || 60;
    const tmName = tm?.name || db.getDriverName(tm?.id, discipline) || "Compagno di Squadra";

    // 1. Contributo Sponsor Commerciale del Compagno (€)
    const sponsorMoney = Math.round(2200 + (tmMarketability * 70));
    this.career.money += sponsorMoney;

    // 2. Dati e Punti Telemetrici R&D (PT) generati dal lavoro in pista e al simulatore
    // Generazione efficace per consentire sviluppi realistici ogni 2-3 gare
    const tmTelemetry = Math.round(8 + (tmFeedback * 0.15));
    const playerFeedback = this.player?.attributes?.technicalFeedback || 60;
    const playerTelemetry = Math.round(10 + (playerFeedback * 0.16) + (finishPos <= 10 ? 5 : 0));
    const totalTelemetry = tmTelemetry + playerTelemetry;

    this.career.rdTelemetryPoints = (this.career.rdTelemetryPoints || 0) + totalTelemetry;

    // 3. Breakthrough del Compagno: probabilità ~8-12% con rischio di flop dimezzato
    let breakthrough = null;
    const breakthroughChance = 0.05 + (tmFeedback / 1200);
    if (Math.random() < breakthroughChance) {
      const compKeys = Object.keys(RD_SUBCOMPONENTS_CONFIG);
      const chosenCompKey = compKeys[Math.floor(Math.random() * compKeys.length)];
      const compCfg = RD_SUBCOMPONENTS_CONFIG[chosenCompKey];
      const currentLvl = this.career.rdSubComponents[chosenCompKey] || 0;

      if (currentLvl < (compCfg.maxLevel || 5)) {
        // Rischio fallimento dimezzato per i test controllati del compagno
        const { risk } = this.calculateSubComponentRisk(chosenCompKey);
        const compRisk = Math.round(risk * 0.5);
        const compRoll = Math.random() * 100;
        if (compRoll < compRisk) {
          breakthrough = {
            type: 'failed_breakthrough',
            componentName: compCfg.name,
            deptName: compCfg.deptName,
            message: `Il compagno ${tmName} ha collaudato al simulatore una modifica per ${compCfg.name}, ma i dati hanno rilevato instabilità aerodinamica/termica. Il pacchetto è stato scartato.`
          };
          if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
          this.career.aiTransferNews.unshift(
            `⚠️ COLLABORAZIONE REPARTO CORSE: ${breakthrough.message}`
          );
        } else {
          this.career.rdSubComponents[chosenCompKey] = currentLvl + 1;
          breakthrough = {
            type: 'component_upgrade',
            componentName: compCfg.name,
            deptName: compCfg.deptName,
            newLevel: currentLvl + 1,
            message: `Il compagno ${tmName} ha completato una sessione intensiva al simulatore testando con successo: ${compCfg.name} (Livello ${currentLvl + 1})!`
          };
          if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
          this.career.aiTransferNews.unshift(
            `🤝 COLLABORAZIONE REPARTO CORSE: ${breakthrough.message}`
          );
        }
      } else {
        const bonusMoney = 12000;
        this.career.money += bonusMoney;
        breakthrough = {
          type: 'sponsor_bonus',
          amount: bonusMoney,
          message: `Il compagno ${tmName} ha chiuso una partnership commerciale esclusiva portando un extra budget di €${bonusMoney.toLocaleString()}!`
        };
        if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
        this.career.aiTransferNews.unshift(
          `🤝 COLLABORAZIONE REPARTO CORSE: ${breakthrough.message}`
        );
      }
    }

    // 3b. Sviluppo Tecnico Diretto della Scuderia ad opera del Compagno
    if (!this.career.teammateDevRaces) this.career.teammateDevRaces = 0;
    this.career.teammateDevRaces++;
    if (this.career.teammateDevRaces >= 4 && tmFeedback >= 68) {
      this.career.teammateDevRaces = 0;
      const playerTeamId = this.career.currentTeamId;
      if (this.career.teamDevelopment && this.career.teamDevelopment[playerTeamId]) {
        const teamDev = this.career.teamDevelopment[playerTeamId];
        const gain = 0.25;
        teamDev.carPace = Math.min(98, Math.round((teamDev.carPace + gain) * 100) / 100);
        if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
        this.career.aiTransferNews.unshift(
          `🔧 SVILUPPO IN GALLERIA DEL VENTO: Il feedback tecnico di ${tmName} ha permesso al team di affinare il bilanciamento (+${gain} Passo vettura)!`
        );
      }
    }

    // 4. Investimento del Compagno nel Progetto Nuovo Regolamento Tecnico (se annunciato dalla FIA)
    if (this.career.regulations && this.career.regulations.isRegulationYearAnnounced) {
      const reg = this.career.regulations;
      if (reg.teammateNextGenInvestment === undefined) reg.teammateNextGenInvestment = 0;
      if (!reg.teammateContribution) {
        reg.teammateContribution = { money: 0, points: 0, log: [] };
      }

      const currentTotalReadiness = (reg.playerNextGenInvestment || 0) + reg.teammateNextGenInvestment;
      if (currentTotalReadiness < 5 && reg.teammateNextGenInvestment < 3) {
        // Circa 55% di probabilità a gara: il compagno investe risorse sponsor e sessioni al simulatore
        if (Math.random() < 0.55) {
          const tmRegMoney = Math.round(7000 + (tmMarketability * 80));
          const tmRegPoints = Math.round(5 + (tmFeedback * 0.12));
          
          reg.teammateContribution.money = (reg.teammateContribution.money || 0) + tmRegMoney;
          reg.teammateContribution.points = (reg.teammateContribution.points || 0) + tmRegPoints;

          const neededMoney = 22000 + (reg.teammateNextGenInvestment * 12000);
          const neededPts = 20 + (reg.teammateNextGenInvestment * 8);

          if (reg.teammateContribution.money >= neededMoney && reg.teammateContribution.points >= neededPts) {
            reg.teammateContribution.money -= neededMoney;
            reg.teammateContribution.points -= neededPts;
            reg.teammateNextGenInvestment += 1;

            const newTotal = Math.min(5, (reg.playerNextGenInvestment || 0) + reg.teammateNextGenInvestment);
            const tmMsg = `Il compagno ${tmName} ha finanziato un pacchetto di sviluppo (€${neededMoney.toLocaleString()} e ${neededPts} PT), portando la preparazione della scuderia per il ${reg.nextRegulationChangeYear} al Livello ${newTotal}/5!`;
            reg.teammateContribution.log.unshift(tmMsg);

            if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
            this.career.aiTransferNews.unshift(`🤝 COLLABORAZIONE REGOLAMENTI: ${tmMsg}`);
          }
        }
      }
    }

    // Aggiorna statistiche cumulative di collaborazione
    const stats = this.career.teammateCollaborationStats;
    stats.totalMoneyContributed = (stats.totalMoneyContributed || 0) + sponsorMoney;
    stats.totalTelemetryContributed = (stats.totalTelemetryContributed || 0) + tmTelemetry;
    if (breakthrough) {
      if (breakthrough.type === 'component_upgrade') {
        stats.upgradesDelivered = (stats.upgradesDelivered || 0) + 1;
      }
      stats.lastBreakthrough = breakthrough;
    }

    return {
      tmName,
      sponsorMoney,
      tmTelemetry,
      playerTelemetry,
      totalTelemetry,
      breakthrough
    };
  }

  // Registra i risultati al termine di un Gran Premio
  recordGrandPrixResults(qualifyingGrid, raceResults, sprintResults = null) {
    const stats = this.career.stats;
    const currentCircuit = this.getNextCircuit();
    const currentCatKey = this.career.currentCategory;
    const catStats = this.getCategoryStats(currentCatKey);

    // Pole position (aggiorna sia statistiche globali/categoria che classifica piloti ufficiale)
    if (qualifyingGrid && qualifyingGrid.length > 0) {
      const poleDriver = qualifyingGrid[0];
      const isPlayerPole = !!(poleDriver.isPlayer || poleDriver.driverId === 'player');
      const poleDriverId = isPlayerPole ? "player" : (poleDriver.driverId || poleDriver.id);
      
      let poleEntry = this.career.standings.drivers.find(d => d.driverId === poleDriverId || (isPlayerPole && d.isPlayer));
      if (!poleEntry) {
        poleEntry = { driverId: poleDriverId, points: 0, wins: 0, podiums: 0, poles: 0, isPlayer: isPlayerPole };
        this.career.standings.drivers.push(poleEntry);
      }
      poleEntry.poles = (poleEntry.poles || 0) + 1;
      this.recordDriverPole(poleDriverId, currentCatKey);

      if (isPlayerPole) {
        stats.poles++;
        catStats.poles = (catStats.poles || 0) + 1;
      }
    }

    const discipline = this.career?.player?.discipline || this.player?.discipline || 'auto';

    // Risultato gara principale
    const playerResult = raceResults.drivers.find(d => d.isPlayer);
    if (playerResult) {
      stats.racesStarted++;
      catStats.racesStarted = (catStats.racesStarted || 0) + 1;
      this.recordDriverRaceStarted('player', currentCatKey);

      const pos = playerResult.currentPos;
      if (pos === 1) {
        stats.wins++;
        catStats.wins = (catStats.wins || 0) + 1;
        this.recordDriverWin('player', currentCatKey);
        if (currentCircuit) {
          if (!stats.specialWins) stats.specialWins = {};
          stats.specialWins[currentCircuit.id] = (stats.specialWins[currentCircuit.id] || 0) + 1;
        }
      }
      if (pos <= 3) {
        stats.podiums++;
        catStats.podiums = (catStats.podiums || 0) + 1;
        this.recordDriverPodium('player', currentCatKey);
      }

      // Punti gara
      const racePts = raceResults.isSprint ? 0 : this.getPointsForPosition(pos, discipline);
      this.addDriverPoints("player", racePts, pos === 1, pos <= 3);

      // Punti scuderia
      this.addTeamPoints(this.career.currentTeamId, racePts);

      // Assegna stipendio e premi gara
      let earnings = this.career.contract?.salaryPerRace || 5000;
      if (pos === 1) earnings += (this.career.contract?.winBonus || 10000);
      else if (pos <= 3) earnings += Math.round((this.career.contract?.winBonus || 10000) * 0.4);

      this.career.money += earnings;
      stats.careerEarnings += earnings;
    }

    // Risultati degli altri piloti AI
    raceResults.drivers.forEach(d => {
      if (!d.isPlayer) {
        const pts = this.getPointsForPosition(d.currentPos, discipline);
        this.addDriverPoints(d.driverId, pts, d.currentPos === 1, d.currentPos <= 3);
        this.addTeamPoints(d.teamId, pts);

        this.recordDriverRaceStarted(d.driverId, currentCatKey);
        if (d.currentPos === 1) {
          this.recordDriverWin(d.driverId, currentCatKey);
        }
        if (d.currentPos <= 3) {
          this.recordDriverPodium(d.driverId, currentCatKey);
        }
      }
    });

    // Se c'è stata una Sprint race, assegna anche i punti sprint
    if (sprintResults) {
      sprintResults.drivers.forEach(d => {
        const pts = this.getSprintPointsForPosition(d.currentPos, discipline);
        this.addDriverPoints(d.isPlayer ? "player" : d.driverId, pts, false, false);
        this.addTeamPoints(d.teamId, pts);
      });
    }

    // Assegnazione punto addizionale per il Giro Veloce della gara (se conclusa in Top 10 e SOLO per discipline 'auto' FIA)
    let playerFlPointAwarded = false;
    const flDriverId = raceResults?.fastestLapDriverId;
    if (flDriverId && !raceResults.isSprint && raceResults.drivers && discipline !== 'moto') {
      const flDriver = raceResults.drivers.find(d => d.driverId === flDriverId || (d.isPlayer && flDriverId === 'player'));
      if (flDriver && flDriver.currentPos <= 10) {
        const isPlayerFl = !!(flDriver.isPlayer || flDriverId === 'player');
        this.addDriverPoints(isPlayerFl ? "player" : flDriverId, 1, false, false);
        this.addTeamPoints(flDriver.teamId, 1);
        if (isPlayerFl) {
          stats.fastestLaps = (stats.fastestLaps || 0) + 1;
          playerFlPointAwarded = true;
        }
      }
    }

    // Ordina classifica aggiornata
    this.career.standings.drivers.sort((a, b) => b.points - a.points || b.wins - a.wins);
    this.career.standings.teams.sort((a, b) => b.points - a.points);

    // Sviluppo progressivo delle vetture AI durante la stagione
    this.developAiCars();

    // Aggiornamento statistiche del Rival stagionale e fiducia dirigenza
    this.updateRivalStats(qualifyingGrid, raceResults);
    if (playerResult) {
      this.updateBoardTrust(playerResult.currentPos);
    }

    // Crescita organica e calcolo Punti Abilità Pilota guadagnati nel weekend
    this.progressPlayerAttributes(playerResult ? playerResult.currentPos : 10);

    // Calcolo punti abilità:
    // Progressione bilanciata in base alla maturità/OVR del pilota:
    let earnedSkillPoints = 0;
    const currentOvr = this.player.ovr || 60;
    if (currentOvr < 99) {
      if (currentOvr < 75) {
        earnedSkillPoints = 2;
        if (playerResult) {
          if (playerResult.currentPos <= 10) earnedSkillPoints += 1;
          if (playerResult.currentPos <= 3) earnedSkillPoints += 1;
        }
      } else if (currentOvr < 85) {
        earnedSkillPoints = 1;
        if (playerResult) {
          if (playerResult.currentPos <= 8) earnedSkillPoints += 1;
          if (playerResult.currentPos <= 3) earnedSkillPoints += 1;
        }
      } else if (currentOvr < 92) {
        earnedSkillPoints = 0;
        if (playerResult) {
          if (playerResult.currentPos <= 10) earnedSkillPoints += 1;
          if (playerResult.currentPos <= 3) earnedSkillPoints += 1;
        }
      } else {
        earnedSkillPoints = 0;
        if (playerResult) {
          if (playerResult.currentPos <= 3) earnedSkillPoints += 1;
        }
      }
    }

    // Bonus Qualifica per la Pole
    if (qualifyingGrid && qualifyingGrid[0]?.isPlayer && currentOvr < 99) {
      earnedSkillPoints += 1;
    }

    if ((this.player.ovr || 60) >= 99) {
      this.player.unspentSkillPoints = 0;
      earnedSkillPoints = 0;
    } else {
      this.player.unspentSkillPoints = (this.player.unspentSkillPoints || 0) + earnedSkillPoints;
    }

    // Collaborazione Compagno di Squadra: apporto sponsor, punti telemetria e upgrade simulatore
    const teammateContribution = this.processTeammateCollaboration(playerResult ? playerResult.currentPos : 10);

    // Gestione perk Lifestyle, rendite passive e strutture HQ
    const lifestylePerks = this.processLifestyleRacePerks(currentCircuit, playerResult ? playerResult.currentPos : 10);

    this.career.lastWeekendRecap = {
      earnedSkillPoints,
      finishPos: playerResult ? playerResult.currentPos : 10,
      isPole: !!(qualifyingGrid && qualifyingGrid[0]?.isPlayer),
      teammateContribution,
      lifestylePerks
    };

    // Avanza indice del calendario
    this.career.currentRaceIndex++;
    const catData = this.getCurrentCategoryData();
    const isSeasonEnd = this.career.currentRaceIndex >= (catData?.calendar?.length || 1);

    this.saveToStorage();
    const basePts = playerResult ? (raceResults.isSprint ? 0 : this.getPointsForPosition(playerResult.currentPos, discipline)) : 0;
    const totalEarnedPts = basePts + (playerFlPointAwarded ? 1 : 0);
    return {
      isSeasonEnd,
      nextRaceIndex: this.career.currentRaceIndex,
      earnedSkillPoints,
      earnedPoints: totalEarnedPts,
      fastestLapBonus: playerFlPointAwarded,
      teammateContribution
    };
  }

  getPointsForPosition(pos, discipline = null) {
    const disc = discipline || this.career?.player?.discipline || this.player?.discipline || 'auto';
    if (disc === 'moto') {
      // Tabella Ufficiale FIM MotoGP: Top 15 a punti
      const tableMoto = [25, 20, 16, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
      return tableMoto[pos - 1] || 0;
    }
    // Tabella Ufficiale FIA Formula 1: Top 10 a punti
    const tableAuto = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
    return tableAuto[pos - 1] || 0;
  }

  getSprintPointsForPosition(pos, discipline = null) {
    const disc = discipline || this.career?.player?.discipline || this.player?.discipline || 'auto';
    if (disc === 'moto') {
      // Tabella Ufficiale FIM MotoGP Sprint: Top 9 a punti
      const tableMotoSprint = [12, 9, 7, 6, 5, 4, 3, 2, 1];
      return tableMotoSprint[pos - 1] || 0;
    }
    // Tabella Ufficiale FIA Formula 1 Sprint: Top 8 a punti
    const tableAutoSprint = [8, 7, 6, 5, 4, 3, 2, 1];
    return tableAutoSprint[pos - 1] || 0;
  }

  addDriverPoints(driverId, pts, isWin, isPodium) {
    let entry = this.career.standings.drivers.find(d => d.driverId === driverId);
    if (!entry) {
      entry = { driverId, points: 0, wins: 0, podiums: 0, poles: 0, isPlayer: driverId === 'player' };
      this.career.standings.drivers.push(entry);
    }
    entry.points += pts;
    if (isWin) entry.wins++;
    if (isPodium) entry.podiums++;
  }

  addTeamPoints(teamId, pts) {
    let entry = this.career.standings.teams.find(t => t.teamId === teamId);
    if (entry) {
      entry.points += pts;
    }
  }

  // Crescita organica del pilota a fine gara: calibrata in modo progressivo e bloccata a 99 OVR
  progressPlayerAttributes(finishPos) {
    if ((this.player.ovr || 60) >= 99) {
      this.player.ovr = 99;
      this.player.unspentSkillPoints = 0;
      return;
    }

    const attrs = this.player.attributes;
    const hq = this.career.hqUpgrades || {};
    const age = this.player.age;

    // 1. Curva di crescita anagrafica bilanciata e progressiva:
    let growthRate = 1.0;
    if (age <= 22) {
      growthRate = 1.0 - (age - 16) * 0.04;
    } else if (age <= 28) {
      growthRate = 0.75 - (age - 23) * 0.05;
    } else if (age <= 33) {
      growthRate = 0.4 - (age - 29) * 0.05;
    } else {
      growthRate = Math.max(0.02, 0.15 - (age - 34) * 0.02);
    }

    // Supporto delle infrastrutture HQ
    const simBoost = (hq.simulatorLevel || 0) * 0.01;
    const gymBoost = (hq.gymLevel || 0) * 0.01;

    // Passo sul giro (crescita graduale ~0.03/gara max)
    const paceGain = (0.03 * growthRate) + simBoost;
    attrs.pace = Math.min(99, Number((attrs.pace + paceGain).toFixed(2)));

    // Forma fisica
    if (age <= 30) {
      const fitnessGain = (0.025 * growthRate) + gymBoost;
      attrs.fitness = Math.min(99, Number((attrs.fitness + fitnessGain).toFixed(2)));
    }

    // Racecraft nei duelli
    let racecraftGain = 0.02 * growthRate;
    if (finishPos <= 3) {
      racecraftGain += 0.04;
      attrs.marketability = Math.min(99, Number((attrs.marketability + 0.1).toFixed(2)));
    } else if (finishPos <= 8) {
      racecraftGain += 0.02;
    }
    attrs.racecraft = Math.min(99, Number((attrs.racecraft + racecraftGain).toFixed(2)));

    // Gomme e costanza
    const tyreGain = 0.025 * Math.min(1.0, 0.5 + (age - 16) * 0.03);
    attrs.tyreMgmt = Math.min(99, Number((attrs.tyreMgmt + tyreGain).toFixed(2)));

    const constGain = 0.02 * Math.min(1.0, 0.5 + (age - 16) * 0.03);
    attrs.consistency = Math.min(99, Number((attrs.consistency + constGain).toFixed(2)));

    // Ricalcola OVR pilota e applica tetto massimo a 99
    this.player.ovr = Math.min(99, this.calculateOvr(attrs));
    if (this.player.ovr >= 99) {
      this.player.ovr = 99;
      this.player.unspentSkillPoints = 0;
    }
    if (this.player.ovr > (this.career.stats.peakOvr || 0)) {
      this.career.stats.peakOvr = this.player.ovr;
    }
  }

  // Auto-crescita dei punti pilota durante la simulazione rapida (non richiede modale manuale)
  autoGrowDriverAttributes() {
    if ((this.player.ovr || 60) >= 99) {
      this.player.ovr = 99;
      this.player.unspentSkillPoints = 0;
      return;
    }

    const available = this.player.unspentSkillPoints || 0;
    if (available <= 0) return;

    const coreKeys = ['pace', 'racecraft', 'tyreMgmt', 'consistency', 'wetSkill', 'technicalFeedback'];
    let remaining = available;

    while (remaining > 0) {
      // Trova l'attributo attualmente più basso tra i principali (sotto 99)
      const sorted = coreKeys
        .filter(k => (this.player.attributes[k] || 60) < 99)
        .sort((a, b) => (this.player.attributes[a] || 60) - (this.player.attributes[b] || 60));

      if (sorted.length === 0) break;
      const target = sorted[0];
      const val = this.player.attributes[target] || 60;
      // Costo proporzionato al valore:
      // < 80: 1 punto
      // 80 - 89: 2 punti
      // 90 - 94: 3 punti
      // 95+: 4 punti
      const cost = val >= 95 ? 4 : (val >= 90 ? 3 : (val >= 80 ? 2 : 1));
      if (remaining < cost) break;

      this.player.attributes[target] = Math.min(99, val + 1);
      remaining -= cost;
    }

    this.player.unspentSkillPoints = remaining;
    this.player.ovr = Math.min(99, this.calculateOvr(this.player.attributes));
    if (this.player.ovr >= 99) {
      this.player.ovr = 99;
      this.player.unspentSkillPoints = 0;
    }
    if (this.player.ovr > (this.career.stats.peakOvr || 0)) {
      this.career.stats.peakOvr = this.player.ovr;
    }
  }

  // Calcola in tempo reale la previsione di OVR in base ai punti allocati in bozza
  previewOvrWithAllocations(allocations = {}) {
    if (!this.player || !this.player.attributes) return this.player?.ovr || 60;
    const tempAttrs = { ...this.player.attributes };
    for (const [key, pts] of Object.entries(allocations)) {
      const p = Number(pts) || 0;
      if (p > 0 && tempAttrs[key] !== undefined) {
        tempAttrs[key] = Math.min(99, tempAttrs[key] + p);
      }
    }
    return this.calculateOvr(tempAttrs);
  }

  // Assegna e applica definitivamente i punti abilità selezionati
  assignBatchSkillPoints(allocations) {
    if (!this.player) return { success: false, reason: "Nessun pilota attivo" };
    const totalToSpend = Object.values(allocations).reduce((sum, val) => sum + (Number(val) || 0), 0);
    const available = this.player.unspentSkillPoints || 0;

    if (totalToSpend <= 0) return { success: false, reason: "Nessun punto selezionato" };
    if (totalToSpend > available) return { success: false, reason: "Punti insufficienti" };

    const oldOvr = this.player.ovr;
    for (const [key, pts] of Object.entries(allocations)) {
      const p = Number(pts) || 0;
      if (p > 0 && this.player.attributes[key] !== undefined) {
        this.player.attributes[key] = Math.min(99, this.player.attributes[key] + p);
      }
    }

    this.player.unspentSkillPoints -= totalToSpend;
    this.player.ovr = this.calculateOvr(this.player.attributes);
    if (this.player.ovr > this.career.stats.peakOvr) {
      this.career.stats.peakOvr = this.player.ovr;
    }
    this.saveToStorage();
    return {
      success: true,
      oldOvr,
      newOvr: this.player.ovr,
      pointsSpent: totalToSpend,
      remainingPoints: this.player.unspentSkillPoints
    };
  }

  // Evoluzione annuale biologica e atletica (maturazione giovanile vs declino naturale con l'età)
  applyAnnualCareerEvolution(prevAge, newAge) {
    const attrs = this.player.attributes;
    const hq = this.career.hqUpgrades || {};
    const deltas = {};

    let phase = "";
    let summary = "";

    if (newAge <= 23) {
      phase = "Apprendistato & Sviluppo Rapido";
      const techBonus = 1.0;
      const constBonus = 1.0;
      attrs.technicalFeedback = Math.min(99, Number((attrs.technicalFeedback + techBonus).toFixed(1)));
      attrs.consistency = Math.min(99, Number((attrs.consistency + constBonus).toFixed(1)));
      deltas.technicalFeedback = +techBonus;
      deltas.consistency = +constBonus;
      summary = "L'esperienza accumulata nella stagione junior affina la sensibilità tecnica (+1) e la costanza (+1).";
    } else if (newAge <= 29) {
      phase = "Prime Atletico & Apice Tecnico";
      const racecraftBonus = 0.5;
      const tyreBonus = 0.5;
      attrs.racecraft = Math.min(99, Number((attrs.racecraft + racecraftBonus).toFixed(1)));
      attrs.tyreMgmt = Math.min(99, Number((attrs.tyreMgmt + tyreBonus).toFixed(1)));
      deltas.racecraft = +racecraftBonus;
      deltas.tyreMgmt = +tyreBonus;
      summary = "Sei nel pieno del tuo Prime: massima freddezza nei duelli e gestione gara al vertice.";
    } else if (newAge <= 33) {
      phase = "Maturità & Maestria";
      summary = "Pilota veterano e punto di riferimento. L'astuzia tattica compensa i primissimi segni dell'età.";
    } else if (newAge <= 36) {
      phase = "Declino Fisico Iniziale";
      // Prime flessioni fisiologiche contrastate dagli investimenti HQ
      const gymShield = Math.min(0.65, (hq.gymLevel || 0) * 0.15);
      const simShield = Math.min(0.65, (hq.simulatorLevel || 0) * 0.15);

      const fitnessLoss = Number((0.8 * (1 - gymShield)).toFixed(1));
      const paceLoss = Number((0.6 * (1 - simShield)).toFixed(1));

      attrs.fitness = Math.max(50, Number((attrs.fitness - fitnessLoss).toFixed(1)));
      attrs.pace = Math.max(50, Number((attrs.pace - paceLoss).toFixed(1)));

      deltas.fitness = -fitnessLoss;
      deltas.pace = -paceLoss;
      summary = `I riflessi e la tenuta atletica mostrano la prima flessione anagrafica (Passo -${paceLoss}, Forma -${fitnessLoss}).`;
    } else {
      phase = "Veterano Storico & Declino Avanzato";
      // Declino naturale più sensibile oltre i 37 anni
      const gymShield = Math.min(0.55, (hq.gymLevel || 0) * 0.12);
      const simShield = Math.min(0.55, (hq.simulatorLevel || 0) * 0.12);

      const fitnessLoss = Number(((1.2 + (newAge - 37) * 0.2) * (1 - gymShield)).toFixed(1));
      const paceLoss = Number(((1.0 + (newAge - 37) * 0.15) * (1 - simShield)).toFixed(1));
      const wetLoss = 0.4;

      attrs.fitness = Math.max(45, Number((attrs.fitness - fitnessLoss).toFixed(1)));
      attrs.pace = Math.max(45, Number((attrs.pace - paceLoss).toFixed(1)));
      attrs.wetSkill = Math.max(45, Number((attrs.wetSkill - wetLoss).toFixed(1)));

      // L'esperienza estrema consolida ulteriormente il feedback tecnico
      attrs.technicalFeedback = Math.min(99, Number((attrs.technicalFeedback + 0.4).toFixed(1)));

      deltas.fitness = -fitnessLoss;
      deltas.pace = -paceLoss;
      deltas.wetSkill = -wetLoss;
      deltas.technicalFeedback = +0.4;
      summary = `Età avanzata (${newAge} anni): la velocità pura cala (-${paceLoss}), ma la saggezza tecnica resta infinita. Valuta il momento ideale per il ritiro.`;
    }

    this.player.ovr = this.calculateOvr(attrs);

    return {
      prevAge,
      newAge,
      phase,
      deltas,
      summary,
      ovr: this.player.ovr
    };
  }

  // Conclusione stagione: assegna titoli, gestisce promozioni e offerte contrattuali
  concludeSeason() {
    // Se siamo già nella fase di transizione fine stagione, riutilizza il risultato pendente senza incrementare nuovamente anno, età o statistiche!
    if (this.career.pendingOffseasonResult) {
      return this.career.pendingOffseasonResult;
    }

    const catData = this.getCurrentCategoryData();
    const champion = this.career.standings.drivers[0];
    const isPlayerChampion = champion && champion.isPlayer;

    const playerStandingIndex = this.career.standings.drivers.findIndex(d => d.isPlayer);
    const playerPos = playerStandingIndex >= 0 ? playerStandingIndex + 1 : 10;
    const baseLicensePts = catData?.licensePointsAwarded || 30;

    if (isPlayerChampion) {
      this.career.stats.worldTitles++;
      const catStats = this.getCategoryStats(this.career.currentCategory);
      catStats.worldTitles = (catStats.worldTitles || 0) + 1;
      this.career.licensePoints += baseLicensePts;
      this.recordDriverTitle('player', this.career.currentCategory);
    } else {
      if (champion && champion.driverId) {
        this.recordDriverTitle(champion.driverId, this.career.currentCategory);
      }
      if (playerPos === 2) {
        this.career.licensePoints += Math.round(baseLicensePts * 0.75);
      } else if (playerPos === 3) {
        this.career.licensePoints += Math.round(baseLicensePts * 0.5);
      } else if (playerPos <= 5) {
        this.career.licensePoints += Math.round(baseLicensePts * 0.25);
      }
    }

    // Simula l'esito dei campionati delle categorie non attive per mantenere vivo tutto il circus
    this.simulateOtherCategoriesSeasonEnd();

    // Confronto col compagno di squadra
    const teammate = this.getCurrentTeammate();
    const playerStanding = this.career.standings.drivers.find(d => d.isPlayer);
    const teammateStanding = teammate ? this.career.standings.drivers.find(d => d.driverId === teammate.id) : null;
    if (playerStanding && teammateStanding && playerStanding.points > teammateStanding.points) {
      this.career.stats.teammateBeatenCount++;
    }

    // Archivia record storico della stagione
    this.career.history.push({
      year: this.career.currentYear,
      season: this.career.seasonNumber,
      category: this.career.currentCategory,
      categoryName: db.getSeriesName(this.career.currentCategory, this.player.discipline, this.career.currentYear),
      team: db.getTeamName(this.career.currentTeamId, this.player.discipline),
      playerPos: this.career.standings.drivers.findIndex(d => d.isPlayer) + 1,
      playerPoints: playerStanding ? playerStanding.points : 0,
      wins: playerStanding ? playerStanding.wins : 0,
      ovr: this.player?.ovr || 60,
      championName: isPlayerChampion ? `${this.player.firstName} ${this.player.lastName}` : db.getDriverName(champion?.driverId, this.player.discipline)
    });

    // Avanzamento anagrafico ed evoluzione organica annuale
    const prevAge = this.player.age;
    this.player.age++;
    const newAge = this.player.age;
    this.career.currentYear++;
    this.career.seasonNumber++;
    this.career.stats.currentYear = this.career.currentYear;
    db.setActiveYear(this.career.currentYear);

    // Report di sviluppo / declino stagionale
    const devReport = this.applyAnnualCareerEvolution(prevAge, newAge);

    // Gestione contratto a fine stagione: decrementa 1 anno
    const currentContract = this.career.contract || { yearsLeft: 1, durationYears: 1, buyoutClause: 0 };
    const prevYearsLeft = currentContract.yearsLeft !== undefined ? currentContract.yearsLeft : 1;
    currentContract.yearsLeft = Math.max(0, prevYearsLeft - 1);
    const isUnderContract = currentContract.yearsLeft > 0;

    // Reset annuale dei dati telemetrici per costringere a nuovo sviluppo in pista e dinamismo
    this.career.rdTelemetryPoints = 0;
    if (this.career.teammateCollaborationStats) {
      this.career.teammateCollaborationStats.totalTelemetryContributed = 0;
    }

    // Decadimento organico annuale (-1 livello) dei sottocomponenti R&D per mantenere viva la sfida tecnica
    // (Se è già anno di rivoluzione regolamentare FIA, checkRegulationMilestones applicherà il decremento specifico)
    const isRegYear = this.career.regulations && (this.career.currentYear >= this.career.regulations.nextRegulationChangeYear);
    if (!isRegYear && this.career.rdSubComponents) {
      for (const k in this.career.rdSubComponents) {
        if (this.career.rdSubComponents[k] > 0) {
          this.career.rdSubComponents[k] = Math.max(0, this.career.rdSubComponents[k] - 1);
        }
      }
    }

    // Reset upgrade vettura standard
    this.career.carUpgrades = { aero: 0, engine: 0, chassis: 0, reliability: 0 };

    // Decadimento invernale paritetico per le scuderie AI in anni non regolamentari (evita che l'AI scappi via all'infinito)
    if (!isRegYear && this.career.teamDevelopment) {
      Object.values(this.career.teamDevelopment).forEach(td => {
        const winterDecay = 1.0 + Math.random() * 0.8;
        td.carPace = Math.max(65, Math.round((td.carPace - winterDecay) * 10) / 10);
        td.seasonPaceGain = 0;
        td.devPoints = 0;
      });
      db.setTeamDevelopment(this.career.teamDevelopment);
    }

    // Esegui la crescita e il declino organico degli attributi di tutti i piloti AI
    const aiEvolutionReport = this.growAiDriverAttributes();

    // Processa i ritiri dei piloti AI veterani
    const retirementReport = this.processAiDriverRetirements();

    // Esegui trasferimenti piloti AI e movimenti di mercato Free Agent
    this.aiDriverTransfers();

    // Risolvi tutti i sedili vacanti per rispettare i regolamenti di gara (promozioni serie minori e generazione REGEN)
    const regenReport = this.resolveRegulationRostersAndRegens();

    // Verifica milestone e cicli regolamentari FIA (ogni 3 anni)
    this.checkRegulationMilestones();

    // Genera offerte contrattuali per il nuovo anno
    const offers = this.generateContractOffers();

    const offseasonResult = {
      isPlayerChampion,
      championName: isPlayerChampion ? `${this.player.firstName} ${this.player.lastName}` : db.getDriverName(champion?.driverId, this.player.discipline),
      offers,
      devReport,
      aiEvolutionReport,
      retirementReport,
      regenReport,
      isUnderContract,
      yearsLeft: currentContract.yearsLeft,
      buyoutClause: currentContract.buyoutClause || 0
    };

    this.career.pendingOffseasonResult = offseasonResult;
    this.saveToStorage();
    return offseasonResult;
  }

  // Genera offerte di mercato basate su OVR, categoria, scuderie rivali e promozioni
  generateContractOffers() {
    const discipline = this.player.discipline;
    const categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    const currentCatKey = this.career.currentCategory;
    const currentCatData = categories[currentCatKey];
    const currentTeamId = this.career.currentTeamId;
    const playerOvr = this.player.ovr || 75;
    const offers = [];

    // Parametri economici differenziati per categoria e prestigio
    const getCategoryScale = (catKey) => {
      const scales = {
        auto_f4: { baseSalary: 4500, salaryMult: 65, winBonus: 8000, buyout: 25000 },
        auto_f3: { baseSalary: 11000, salaryMult: 140, winBonus: 20000, buyout: 55000 },
        auto_f2: { baseSalary: 28000, salaryMult: 350, winBonus: 50000, buyout: 130000 },
        auto_f1: { baseSalary: 90000, salaryMult: 1500, winBonus: 180000, buyout: 500000 },
        auto_wec: { baseSalary: 55000, salaryMult: 850, winBonus: 120000, buyout: 280000 },
        auto_indy: { baseSalary: 48000, salaryMult: 750, winBonus: 100000, buyout: 240000 },
        moto_3: { baseSalary: 4000, salaryMult: 60, winBonus: 7500, buyout: 22000 },
        moto_2: { baseSalary: 13000, salaryMult: 170, winBonus: 26000, buyout: 60000 },
        moto_gp: { baseSalary: 85000, salaryMult: 1400, winBonus: 170000, buyout: 480000 },
        moto_sbk: { baseSalary: 32000, salaryMult: 460, winBonus: 65000, buyout: 140000 },
      };
      return scales[catKey] || { baseSalary: 6000, salaryMult: 100, winBonus: 12000, buyout: 35000 };
    };

    const curScale = getCategoryScale(currentCatKey);
    const currentTeam = db.getTeam(currentTeamId, discipline);
    const renewalSalary1yr = Math.max(3000, Math.round(curScale.baseSalary + (playerOvr - 60) * curScale.salaryMult));
    const renewalSalary2yr = Math.round(renewalSalary1yr * 1.15); // +15% per impegno biennale
    const renewalWinBonus = Math.round(curScale.winBonus + (playerOvr - 60) * (curScale.salaryMult * 1.5));

    // 1. Offerta di Rinnovo / Continuazione con il team attuale
    offers.push({
      id: "offer_renewal",
      teamId: currentTeamId,
      teamName: currentTeam.displayName,
      category: currentCatKey,
      categoryName: db.getSeriesName(currentCatKey, discipline),
      salaryPerRace: renewalSalary1yr,
      salaryPerRace1yr: renewalSalary1yr,
      salaryPerRace2yr: renewalSalary2yr,
      winBonus: renewalWinBonus,
      role: playerOvr >= 85 ? "1st Driver (Caposquadra)" : "Equal Status (Pari Trattamento)",
      isPromotion: false,
      isRenewal: true,
      color: currentTeam.color || "#e10600",
      buyoutClause2yr: curScale.buyout,
      carPace: currentTeam.carPace || currentTeam.bikePace || 75
    });

    // 2. Offerte da altri team della STESSA categoria (scambi orizzontali)
    if (currentCatData && currentCatData.teams) {
      const rivalTeams = currentCatData.teams.filter(t => t.id !== currentTeamId);
      rivalTeams.slice(0, 3).forEach(team => {
        const pace = team.carPace || team.bikePace || 75;
        const paceDelta = pace - 75;
        const rivalSalary1yr = Math.max(2500, Math.round(renewalSalary1yr * (1 + paceDelta * 0.015)));
        const rivalSalary2yr = Math.round(rivalSalary1yr * 1.15);
        const rivalBonus = Math.round(renewalWinBonus * (1 + paceDelta * 0.01));

        offers.push({
          id: `offer_same_${team.id}`,
          teamId: team.id,
          teamName: db.getTeamName(team.id, discipline, currentCatKey),
          category: currentCatKey,
          categoryName: db.getSeriesName(currentCatKey, discipline),
          salaryPerRace: rivalSalary1yr,
          salaryPerRace1yr: rivalSalary1yr,
          salaryPerRace2yr: rivalSalary2yr,
          winBonus: rivalBonus,
          role: playerOvr >= 88 ? "1st Driver" : (playerOvr >= 80 ? "Equal Status" : "Challenger"),
          isPromotion: false,
          isRenewal: false,
          color: team.color || "#888888",
          buyoutClause2yr: Math.round(curScale.buyout * (1 + paceDelta * 0.01)),
          carPace: pace
        });
      });
    }

    // 3. Offerte di Promozione / Nuova Categoria per tutte le gerarchie
    const promotionTargets = [];
    if (discipline === 'auto') {
      if (currentCatKey === 'auto_f4') {
        promotionTargets.push('auto_f3');
      } else if (currentCatKey === 'auto_f3') {
        promotionTargets.push('auto_f2');
      } else if (currentCatKey === 'auto_f2') {
        promotionTargets.push('auto_f1', 'auto_wec', 'auto_indy');
      } else if (currentCatKey === 'auto_f1') {
        promotionTargets.push('auto_wec', 'auto_indy');
      } else if (currentCatKey === 'auto_wec') {
        promotionTargets.push('auto_f1', 'auto_indy');
      } else if (currentCatKey === 'auto_indy') {
        promotionTargets.push('auto_f1', 'auto_wec');
      }
    } else {
      if (currentCatKey === 'moto_3') {
        promotionTargets.push('moto_2');
      } else if (currentCatKey === 'moto_2') {
        promotionTargets.push('moto_gp', 'moto_sbk');
      } else if (currentCatKey === 'moto_gp') {
        promotionTargets.push('moto_sbk');
      } else if (currentCatKey === 'moto_sbk') {
        promotionTargets.push('moto_gp');
      }
    }

    promotionTargets.forEach(targetCatKey => {
      const targetCat = categories[targetCatKey];
      if (!targetCat) return;

      const meetsAge = this.player.age >= (targetCat.minAge || 16);
      const isChamp = this.career.history?.some(h => h.category === currentCatKey && h.playerPos === 1);
      const targetScale = getCategoryScale(targetCatKey);

      const isTop3 = this.career.history?.some(h => h.category === currentCatKey && h.playerPos <= 3);
      if (meetsAge && (playerOvr >= 67 || isChamp || isTop3 || this.career.licensePoints >= 8)) {
        const teamIndex = isChamp ? 0 : Math.min(1, targetCat.teams.length - 1);
        const promoTeam = targetCat.teams[teamIndex] || targetCat.teams[0];
        const pace = promoTeam.carPace || promoTeam.bikePace || 80;

        const promoSalary1yr = Math.round(targetScale.baseSalary + (playerOvr - 65) * targetScale.salaryMult);
        const promoSalary2yr = Math.round(promoSalary1yr * 1.15);
        const promoBonus = Math.round(targetScale.winBonus + (playerOvr - 65) * (targetScale.salaryMult * 1.5));

        offers.push({
          id: `offer_promo_${targetCatKey}_${promoTeam.id}`,
          teamId: promoTeam.id,
          teamName: db.getTeamName(promoTeam.id, discipline, targetCatKey),
          category: targetCatKey,
          categoryName: db.getSeriesName(targetCatKey, discipline),
          salaryPerRace: promoSalary1yr,
          salaryPerRace1yr: promoSalary1yr,
          salaryPerRace2yr: promoSalary2yr,
          winBonus: promoBonus,
          role: playerOvr >= 90 ? "1st Driver" : "Challenger / 2nd Driver",
          isPromotion: true,
          isRenewal: false,
          color: promoTeam.color || "#00d2be",
          buyoutClause2yr: targetScale.buyout,
          carPace: pace
        });
      }
    });

    this.career.contractOffers = offers;
    return offers;
  }

  // Avvia ufficialmente la nuova stagione (con eventuale nuovo contratto firmato o mantenimento del contratto)
  startNewSeason(offer = null, durationYears = 1, selectionData = null) {
    if (offer) {
      const res = this.acceptContract(offer, durationYears, true, selectionData);
      if (!res.success) return res;
    }

    // Reset rigoroso del calendario per la nuova stagione e azzeramento classifiche
    db.setActiveYear(this.career.currentYear);
    this.career.currentRaceIndex = 0;
    this.career.contractOffers = null;
    this.initSeasonStandings();

    // Rimuovi lo stato offseason pendente
    this.career.pendingOffseasonResult = null;
    this.saveToStorage();

    return { success: true, newContract: this.career.contract };
  }

  // Accetta una proposta di contratto (con o senza promozione)
  acceptContract(offer, durationYears = 1, isNewSeason = false, selectionData = null) {
    const currentContract = this.career.contract || {};
    const yearsLeft = currentContract.yearsLeft || 0;
    const previousTeamId = this.career.currentTeamId;
    const previousCategory = this.career.currentCategory;
    const isChangingTeam = offer.teamId !== previousTeamId;
    let paidBuyout = 0;

    // Se è una promozione a fine stagione (isNewSeason) o offerta di promozione, NESSUNA penale rescissoria deve essere addebitata!
    const isPromo = !!offer.isPromotion;
    const shouldChargeBuyout = isChangingTeam && !isNewSeason && !isPromo && yearsLeft > 0 && currentContract.buyoutClause > 0;

    if (shouldChargeBuyout) {
      const buyoutToPay = currentContract.buyoutClause;
      if (this.career.money < buyoutToPay) {
        return {
          success: false,
          reason: `Fondi insufficienti! La rescissione anticipata del contratto richiede una penale di €${buyoutToPay.toLocaleString()}. Disponi di €${this.career.money.toLocaleString()}.`
        };
      }
      this.career.money -= buyoutToPay;
      paidBuyout = buyoutToPay;
    }

    // 1. Determina compagno e pilota sostituito nel nuovo team
    let chosenId = selectionData?.chosenTeammateId || (Array.isArray(selectionData?.chosenTeammateIds) ? selectionData.chosenTeammateIds[0] : null);
    let repId = selectionData?.replacedDriverId || (Array.isArray(selectionData?.replacedDriverIds) ? selectionData.replacedDriverIds[0] : null);

    if (isChangingTeam || previousCategory !== offer.category) {
      const categories = this.player.discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
      const newCat = categories[offer.category];
      const maxDrivers = newCat?.maxDriversPerTeam || 2;
      const teamDrivers = (newCat?.roster || []).filter(d => {
        const effTeam = (this.career?.teamDriverOverrides && this.career.teamDriverOverrides[d.id]) || d.teamId;
        return effTeam === offer.teamId;
      });

      if (!chosenId && teamDrivers.length > 0) {
        const sorted = [...teamDrivers].sort((a, b) => (b.ovr || 75) - (a.ovr || 75));
        chosenId = sorted[0].id;
        repId = teamDrivers.find(d => d.id !== chosenId)?.id || sorted[sorted.length - 1]?.id;
      }

      // Configura la nuova lineup del nuovo team
      this.setTeamDrivers(offer.teamId, offer.category, chosenId, repId);

      // 2. LA VECCHIA SCUDERIA EFFETTUA MERCATO PER RIMPIAZZARE IL GIOCATORE
      if (previousTeamId) {
        this.signMarketReplacementForVacatedSeat(previousTeamId, previousCategory, repId);
      }
    }

    const salary = durationYears === 2 
      ? (offer.salaryPerRace2yr || Math.round((offer.salaryPerRace || 5000) * 1.15)) 
      : (offer.salaryPerRace1yr || offer.salaryPerRace || 5000);
    const buyoutClause = durationYears === 2 ? (offer.buyoutClause2yr || 50000) : 0;

    this.career.currentTeamId = offer.teamId;
    this.career.currentCategory = offer.category;
    this.career.contract = {
      salaryPerRace: salary,
      winBonus: offer.winBonus || 10000,
      role: offer.role || "1st Driver",
      durationYears: durationYears,
      yearsLeft: durationYears,
      buyoutClause: buyoutClause
    };

    // Pulisce offerte pendenti memorizzate dopo la firma
    this.career.contractOffers = null;

    // Se ha cambiato scuderia o categoria, azzera gli upgrade della vettura precedente
    if (isChangingTeam || previousCategory !== offer.category) {
      this.career.carUpgrades = { aero: 0, engine: 0, chassis: 0, reliability: 0 };
      if (this.career.rdSubComponents) {
        for (const k in this.career.rdSubComponents) {
          this.career.rdSubComponents[k] = 0;
        }
      }
    }

    // Se è inizio nuova stagione OPPURE ha cambiato categoria OPPURE le gare erano terminate, ripristina la classifica iniziale e il calendario da Round 1
    const catData = this.getCurrentCategoryData();
    const totalRaces = catData?.calendar?.length || 1;
    if (isNewSeason || previousCategory !== offer.category || this.career.currentRaceIndex >= totalRaces) {
      this.career.currentRaceIndex = 0;
      this.initSeasonStandings();
    }

    this.saveToStorage();
    return {
      success: true,
      paidBuyout,
      newContract: this.career.contract
    };
  }

  // Simula un singolo weekend di gara (veloce)
  simulateSingleWeekend(tactics = null, autoGrow = true) {
    const circuit = this.getNextCircuit();
    const catData = this.getCurrentCategoryData();
    if (!circuit || !catData || this.career.currentRaceIndex >= catData.calendar.length) {
      return { isSeasonEnd: true };
    }

    const player = this.player;
    const team = this.getPlayerTeam();
    const isReal = db.isRealNames;
    const defaultTactics = tactics || {
      paceMode: 'BALANCED',
      powerMode: 'STANDARD',
      boxThisLap: false,
      newCompound: 'HARD'
    };

    // 1. Simula Qualifiche
    const activeRoster = this.getActiveRoster(this.career.currentCategory);
    const hqSetupBonus = (this.career?.hqUpgrades?.telemetryCoachLevel || 0) * 0.02;
    const qualy = RaceEngine.initQualifyingState(circuit, catData, activeRoster, player, team, hqSetupBonus, player.discipline);
    RaceEngine.fastForwardQualifyingToEnd(qualy, player, team, circuit, player.discipline);
    const qualyGrid = qualy.grid;

    // 2. Eventuale Gara Sprint (se prevista dalla categoria/circuito)
    const hasSprint = catData.weekendFormat?.hasSprint || (catData.sprintCircuits && catData.sprintCircuits.includes(circuit.id));
    let sprintResults = null;
    if (hasSprint) {
      const sprintState = RaceEngine.initRaceState(qualyGrid, circuit, catData, true, player.discipline, null, player, team);
      RaceEngine.fastForwardToEnd(sprintState, defaultTactics, player.discipline);
      sprintResults = sprintState;
    }

    // 3. Gara Principale
    const raceState = RaceEngine.initRaceState(qualyGrid, circuit, catData, false, player.discipline, null, player, team);
    RaceEngine.fastForwardToEnd(raceState, defaultTactics, player.discipline);

    // 4. Registra risultati ufficiali
    const gpResult = this.recordGrandPrixResults(qualyGrid, raceState, sprintResults);

    // 5. Crescita automatica attributi in simulazione
    if (autoGrow) {
      this.autoGrowDriverAttributes();
    }

    const playerDriver = raceState.drivers.find(d => d.isPlayer);
    const finishPos = playerDriver ? playerDriver.currentPos : 10;
    const isPole = !!(qualyGrid && qualyGrid[0]?.isPlayer);

    return {
      success: true,
      circuit,
      circuitName: circuit ? circuit.displayName : "Gran Premio",
      finishPos,
      playerPos: finishPos,
      isWin: finishPos === 1,
      isPodium: finishPos <= 3,
      isPole,
      earnedPoints: gpResult.earnedPoints,
      pointsEarned: gpResult.earnedPoints,
      earnedSkillPoints: gpResult.earnedSkillPoints,
      teammateContribution: gpResult.teammateContribution,
      isSeasonEnd: gpResult.isSeasonEnd
    };
  }

  // Simula l'intera stagione rimanente fino al termine del calendario
  simulateFullSeason(autoGrow = true) {
    const catData = this.getCurrentCategoryData();
    const results = [];
    let isSeasonEnd = this.career.currentRaceIndex >= (catData?.calendar?.length || 1);

    while (!isSeasonEnd) {
      const res = this.simulateSingleWeekend(null, autoGrow);
      results.push(res);
      isSeasonEnd = res.isSeasonEnd;
    }

    this.saveToStorage();
    const playerRank = this.career.standings.drivers.findIndex(d => d.isPlayer) + 1;
    return {
      success: true,
      totalRacesSimulated: results.length,
      racesSimulated: results.length,
      results,
      playerStanding: this.career.standings.drivers.find(d => d.isPlayer),
      playerRank,
      finalPlayerRank: playerRank,
      isChampion: this.career.standings.drivers[0]?.isPlayer
    };
  }

  // Acquisto Upgrade R&D Vettura/Moto (Macro Reparto Legacy)
  buyCarUpgrade(dept) {
    const currentLvl = this.career.carUpgrades[dept] || 0;
    if (currentLvl >= 5) {
      return { success: false, message: "Reparto già al massimo sviluppo consentito per questa stagione." };
    }

    const cost = 75000 * (currentLvl + 1);
    if (this.career.money < cost) {
      return { success: false, message: `Fondi insufficienti! Richiesti €${cost.toLocaleString()}, disponibili €${this.career.money.toLocaleString()}.` };
    }

    const targetLvl = currentLvl + 1;
    const risk = Math.min(50, 15 + (targetLvl * 6));
    const roll = Math.random() * 100;
    this.career.money -= cost;

    if (roll < risk) {
      this.saveToStorage();
      return {
        success: false,
        failedAttempt: true,
        risk,
        message: `Upgrade ${dept.toUpperCase()} fallito al banco prova (${risk}% rischio flop). Il prototipo ha mostrato difetti strutturali ed è stato scartato.`
      };
    }

    this.career.carUpgrades[dept] = targetLvl;
    this.saveToStorage();
    return { success: true, message: `Aggiornamento R&D ${dept.toUpperCase()} collaudato e installato con successo!` };
  }

  // Acquisto Upgrade Sottocomponente R&D Dettagliato
  buySubComponentUpgrade(compKey) {
    this.initRdSystem();
    const cfg = RD_SUBCOMPONENTS_CONFIG[compKey];
    if (!cfg) {
      return { success: false, message: "Componente R&D non riconosciuto." };
    }

    const currentLvl = this.career.rdSubComponents[compKey] || 0;
    if (currentLvl >= (cfg.maxLevel || 5)) {
      return { success: false, message: `${cfg.name} è già al massimo livello consentito (${cfg.maxLevel}/5).` };
    }

    const { cost, ptsCost } = this.calculateSubComponentCost(compKey, currentLvl);

    if (this.career.money < cost) {
      return {
        success: false,
        message: `Fondi insufficienti! Richiesti €${cost.toLocaleString()}, disponibili €${this.career.money.toLocaleString()}.`
      };
    }

    if ((this.career.rdTelemetryPoints || 0) < ptsCost) {
      return {
        success: false,
        message: `Dati telemetrici insufficienti! Richiesti ${ptsCost} Punti Telemetria (PT), disponibili ${this.career.rdTelemetryPoints || 0} PT.`
      };
    }

    // Calcolo probabilità di successo e rischio fallimento (mitigato da HQ, simulatore, pilota e qualità)
    const { risk, successRate } = this.calculateSubComponentRisk(compKey);
    const roll = Math.random() * 100;
    const isFailed = roll < risk;

    // Il costo del prototipo in denaro viene comunque consumato per fabbricazione e ore banco
    this.career.money -= cost;

    if (isFailed) {
      // In caso di fallimento: il livello non aumenta, ma il 45% dei punti telemetria viene salvato come telemetria diagnostica
      const refundedPts = Math.round(ptsCost * 0.45);
      this.career.rdTelemetryPoints -= (ptsCost - refundedPts);
      this.saveToStorage();

      const failureReasons = [
        "disallineamento tra galleria del vento e pista (perdita di carico aerodinamico e turbolenze).",
        "surriscaldamento anomalo al banco dinamico ad alti regimi di rotazione.",
        "vibrazioni parassite e risonanza torsionale non tollerata sulle sospensioni.",
        "difetto di laminazione del carbonio e cedimento strutturale sui carichi limite.",
        "perdita di pressione nel circuito idraulico e mancata omologazione FIA."
      ];
      const reason = failureReasons[Math.floor(Math.random() * failureReasons.length)];

      if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
      this.career.aiTransferNews.unshift(
        `❌ FLOP R&D: Il pacchetto evolutivo ${cfg.name} (Lvl ${currentLvl + 1}) è stato bocciato dai tecnici per ${reason}`
      );

      return {
        success: false,
        failedAttempt: true,
        risk,
        successRate,
        refundedPts,
        message: `Test in pista/banco FALLITO (${risk}% rischio)! Il pacchetto ${cfg.name} è stato scartato per ${reason} (Recuperati ${refundedPts} PT di dati telemetrici).`
      };
    }

    // Upgrade riuscito!
    this.career.rdTelemetryPoints -= ptsCost;
    this.career.rdSubComponents[compKey] = currentLvl + 1;
    this.saveToStorage();

    const gainStr = cfg.paceGain > 0 ? `+${cfg.paceGain} Passo Mezzo` : `+${cfg.reliabilityGain}% Affidabilità`;
    return {
      success: true,
      risk,
      successRate,
      message: `Upgrade promosso con successo (${successRate}% successo)! ${cfg.name} portato al Livello ${currentLvl + 1} (${gainStr}).`,
      newLevel: currentLvl + 1,
      cost,
      ptsCost
    };
  }

  // Acquisto Upgrade HQ / Stile di vita
  buyHqUpgrade(type) {
    const cfg = HQ_CONFIG[type];
    if (!cfg) return { success: false, message: "Struttura HQ non riconosciuta." };
    if (!this.career.hqUpgrades) {
      this.career.hqUpgrades = { simulatorLevel: 0, gymLevel: 0, prAgencyLevel: 0, telemetryCoachLevel: 0, biohackingLevel: 0 };
    }

    const currentLvl = this.career.hqUpgrades[type] || 0;
    if (currentLvl >= (cfg.maxLevel || 5)) {
      return { success: false, message: `${cfg.name} è già al massimo livello consentito (${cfg.maxLevel}/5).` };
    }

    const cost = cfg.baseCost + (currentLvl * cfg.costMult);
    if (this.career.money < cost) {
      return { success: false, message: `Budget insufficiente! Richiesti €${cost.toLocaleString()}, disponibili €${this.career.money.toLocaleString()}.` };
    }

    this.career.money -= cost;
    this.career.hqUpgrades[type] = currentLvl + 1;

    // Bonus immediato sugli attributi del pilota in base alla struttura
    if (type === 'gymLevel') {
      this.player.attributes.fitness = Math.min(99, (this.player.attributes.fitness || 75) + 1);
    } else if (type === 'prAgencyLevel') {
      this.player.attributes.marketability = Math.min(99, (this.player.attributes.marketability || 60) + 2);
    } else if (type === 'biohackingLevel') {
      this.player.attributes.consistency = Math.min(99, (this.player.attributes.consistency || 75) + 1);
    } else if (type === 'telemetryCoachLevel') {
      this.player.attributes.technicalFeedback = Math.min(99, (this.player.attributes.technicalFeedback || 70) + 1);
    }

    this.player.ovr = Math.min(99, this.calculateOvr(this.player.attributes));
    this.saveToStorage();

    return {
      success: true,
      message: `${cfg.name} potenziato al Livello ${currentLvl + 1}/5! (${cfg.perkText(currentLvl + 1)})`,
      newLevel: currentLvl + 1,
      cost
    };
  }

  // Acquisto immobile o asset di lusso a rendita passiva
  buyLifestyleItem(item) {
    if (!this.career) return { success: false, message: "Nessuna carriera attiva." };
    if (!this.career.lifestyleItems) this.career.lifestyleItems = [];
    if (this.career.lifestyleItems.some(i => i.id === item.id)) {
      return { success: false, message: "Possiedi già questo immobile / investimento!" };
    }
    if (this.career.money < item.price) {
      return { success: false, message: `Budget personale insufficiente! Richiesti €${item.price.toLocaleString()}, disponibili €${this.career.money.toLocaleString()}.` };
    }

    this.career.money -= item.price;
    this.career.lifestyleItems.push(item);

    if (item.fameBonus) {
      this.player.attributes.marketability = Math.min(99, (this.player.attributes.marketability || 60) + item.fameBonus);
    }
    if (item.goatBonus && this.career.stats) {
      this.career.stats.lifestyleGoatBonus = (this.career.stats.lifestyleGoatBonus || 0) + item.goatBonus;
    }

    this.saveToStorage();
    return {
      success: true,
      message: `Acquisto completato: ${item.name}! (${item.perkBadge || `+${item.fameBonus} Notorietà`})`
    };
  }

  // Esecuzione di uno Stage o Ritiro intensivo di preparazione
  executeTrainingCamp(campId) {
    if (!this.career) return { success: false, message: "Nessuna carriera attiva." };
    const camp = TRAINING_CAMPS_CONFIG.find(c => c.id === campId);
    if (!camp) return { success: false, message: "Stage di preparazione non riconosciuto." };

    if (this.career.money < camp.cost) {
      return { success: false, message: `Budget insufficiente! Richiesti €${camp.cost.toLocaleString()}, disponibili €${this.career.money.toLocaleString()}.` };
    }

    this.career.money -= camp.cost;
    camp.apply(this.player, this);

    this.player.ovr = Math.min(99, this.calculateOvr(this.player.attributes));
    this.saveToStorage();

    return {
      success: true,
      message: `Stage completato con successo: ${camp.name}! (${camp.effect})`
    };
  }

  // Accredita i perk lifestyle ad ogni Gran Premio (rendite passive, bonus telemetria HQ, esenzione fiscale)
  processLifestyleRacePerks(circuit, finishPos = 10) {
    if (!this.career) return null;
    const hq = this.career.hqUpgrades || {};
    const owned = this.career.lifestyleItems || [];

    let passiveRevenue = 0;
    let telemetryGain = 0;
    let taxBonus = 0;
    const perksApplied = [];

    // 1. Dati Telemetrici da Strutture HQ (Simulatore + Telemetrista)
    const simLvl = hq.simulatorLevel || 0;
    const coachLvl = hq.telemetryCoachLevel || 0;
    const hqTelemetry = (simLvl * 6) + (coachLvl * 4);
    if (hqTelemetry > 0) {
      telemetryGain += hqTelemetry;
      this.career.rdTelemetryPoints = (this.career.rdTelemetryPoints || 0) + hqTelemetry;
      perksApplied.push(`+${hqTelemetry} PT Telemetria da Simulatore & Coach HQ`);
    }

    // 2. Sponsor Commerciali Personali da Agenzia PR HQ
    const prLvl = hq.prAgencyLevel || 0;
    if (prLvl > 0) {
      const prMoney = prLvl * 1800;
      passiveRevenue += prMoney;
      perksApplied.push(`+€${prMoney.toLocaleString()} Sponsor da Agenzia PR HQ`);
    }

    // 3. Rendite da Investimenti Lifestyle (Kart Academy, Fashion Brand, Museo)
    owned.forEach(item => {
      const cfg = LIFESTYLE_ASSETS_CONFIG.find(a => a.id === item.id);
      if (cfg && cfg.passivePerRace > 0) {
        passiveRevenue += cfg.passivePerRace;
        perksApplied.push(`+€${cfg.passivePerRace.toLocaleString()} Rendita da ${cfg.name || item.name}`);
      }
    });

    // 4. Esonero Fiscale Monte Carlo (se posseduta villa_monaco)
    const hasMonaco = owned.some(i => i.id === 'villa_monaco');
    if (hasMonaco && this.career.contract) {
      const salary = this.career.contract.salaryPerRace || 5000;
      const winBonus = finishPos === 1 ? (this.career.contract.winBonus || 10000) : 0;
      taxBonus = Math.round((salary + winBonus) * 0.08);
      if (taxBonus > 0) {
        passiveRevenue += taxBonus;
        perksApplied.push(`+€${taxBonus.toLocaleString()} Risparmio Fiscale Monte Carlo (+8%)`);
      }
    }

    // Accredita il totale delle entrate passive
    if (passiveRevenue > 0) {
      this.career.money += passiveRevenue;
      if (this.career.stats) {
        this.career.stats.careerEarnings = (this.career.stats.careerEarnings || 0) + passiveRevenue;
      }
    }

    return {
      passiveRevenue,
      telemetryGain,
      taxBonus,
      perksApplied
    };
  }

  // Riepilogo finanziario per il cruscotto Lifestyle & Net Worth
  getLifestyleFinancialSummary() {
    if (!this.career) return { netWorth: 0, assetsValue: 0, passiveIncomePerRace: 0, activePerks: [], ownedAssetsCount: 0 };
    const owned = this.career.lifestyleItems || [];
    const hq = this.career.hqUpgrades || {};

    let assetsValue = 0;
    let passivePerRace = 0;
    const activePerks = [];

    owned.forEach(item => {
      const cfg = LIFESTYLE_ASSETS_CONFIG.find(a => a.id === item.id) || item;
      assetsValue += cfg.price || 0;
      if (cfg.passivePerRace) passivePerRace += cfg.passivePerRace;
      if (cfg.perkBadge) activePerks.push(cfg.perkBadge);
    });

    const prLvl = hq.prAgencyLevel || 0;
    if (prLvl > 0) {
      const prMoney = prLvl * 1800;
      passivePerRace += prMoney;
      activePerks.push(`Sponsor PR HQ: +€${prMoney.toLocaleString()}/GP`);
    }

    const simLvl = hq.simulatorLevel || 0;
    if (simLvl > 0) {
      activePerks.push(`Simulatore HQ: +${simLvl * 6} PT/GP`);
    }

    const coachLvl = hq.telemetryCoachLevel || 0;
    if (coachLvl > 0) {
      activePerks.push(`Coach Telemetria: +${coachLvl * 4} PT/GP`);
    }

    const gymLvl = hq.gymLevel || 0;
    if (gymLvl > 0) {
      activePerks.push(`Fisioterapia HQ: -${gymLvl * 12}% Calo Fisico`);
    }

    const bioLvl = hq.biohackingLevel || 0;
    if (bioLvl > 0) {
      activePerks.push(`Biohacking & Mind: -${bioLvl * 15}% Rischio Errori`);
    }

    const netWorth = (this.career.money || 0) + assetsValue;

    return {
      netWorth,
      assetsValue,
      passiveIncomePerRace: passivePerRace,
      activePerks,
      ownedAssetsCount: owned.length
    };
  }

  // Inizializza il database di sviluppo delle vetture/moto per tutte le categorie
  initTeamDevelopment() {
    if (!this.career) return;
    if (!this.career.teamDevelopment) this.career.teamDevelopment = {};

    const discipline = this.player?.discipline || 'auto';
    const categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;

    for (const catKey in categories) {
      const cat = categories[catKey];
      if (!cat.teams) continue;
      cat.teams.forEach(t => {
        if (!this.career.teamDevelopment[t.id]) {
          this.career.teamDevelopment[t.id] = {
            teamId: t.id,
            category: catKey,
            carPace: t.carPace || t.bikePace || 75,
            reliability: t.reliability || 85,
            devPoints: 0,
            seasonPaceGain: 0
          };
        }
      });
    }
    db.setTeamDevelopment(this.career.teamDevelopment);
  }

  // Sviluppo progressivo e collaborativo delle vetture per i team AI durante la stagione
  developAiCars() {
    if (!this.career) return;
    if (!this.career.teamDevelopment || Object.keys(this.career.teamDevelopment).length === 0) {
      this.initTeamDevelopment();
    }

    const currentCatKey = this.career.currentCategory;
    const discipline = this.player?.discipline || 'auto';
    const categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    const cat = categories[currentCatKey];
    if (!cat || !cat.teams) return;

    const playerTeamId = this.career.currentTeamId;

    cat.teams.forEach(team => {
      // Non sviluppa automaticamente il team del giocatore (il giocatore usa R&D)
      if (team.id === playerTeamId) return;

      if (!this.career.teamDevelopment[team.id]) {
        this.career.teamDevelopment[team.id] = {
          teamId: team.id,
          category: currentCatKey,
          carPace: team.carPace || team.bikePace || 75,
          reliability: team.reliability || 85,
          devPoints: 0,
          seasonPaceGain: 0
        };
      }

      const teamDev = this.career.teamDevelopment[team.id];
      const paceVal = teamDev.carPace || 75;
      // Ribilanciato: sviluppo più graduale (circa 1 upgrade ogni 4-6 gare per team anziché ogni 2 gare)
      const baseGain = paceVal > 85 ? 0.12 : (paceVal > 78 ? 0.16 : 0.20);
      const randBonus = Math.random() * 0.08;

      // Collaborazione Piloti AI: il feedback tecnico e gli sponsor dei piloti accelerano lo sviluppo vettura
      const teamDrivers = cat.roster.filter(d => {
        const effTeam = (this.career.teamDriverOverrides && this.career.teamDriverOverrides[d.id]) || d.teamId;
        return effTeam === team.id;
      });

      let sumFeedback = 0;
      let sumMarket = 0;
      teamDrivers.forEach(d => {
        const aiAttrs = this.career.aiDriverAttributes?.[d.id] || {};
        sumFeedback += (aiAttrs.technicalFeedback !== undefined ? aiAttrs.technicalFeedback : (d.technicalFeedback || 70));
        sumMarket += (aiAttrs.marketability !== undefined ? aiAttrs.marketability : (d.marketability || 65));
      });
      const dCount = Math.max(1, teamDrivers.length);
      const avgFeedback = sumFeedback / dCount;
      const avgMarket = sumMarket / dCount;

      const technicalBonus = (avgFeedback - 70) * 0.003;
      const sponsorBonus = (avgMarket - 65) * 0.002;
      const totalGain = Math.max(0.08, baseGain + randBonus + technicalBonus + sponsorBonus);

      const teamName = db.getTeamName(team.id, discipline, currentCatKey);
      const leadDriver = teamDrivers[0];
      const dName = leadDriver ? db.getDriverName(leadDriver.id, discipline) : "collaudatori";

      teamDev.devPoints = (teamDev.devPoints || 0) + totalGain;

      // Al raggiungimento di 1 punto sviluppo: delibera del pacchetto evolutivo con rischio fallimento
      if (teamDev.devPoints >= 1.0) {
        teamDev.devPoints -= 1.0;

        // Calcolo probabilità di fallimento upgrade per l'AI (tra 10% e 45%)
        let aiFailureRisk = paceVal >= 88 ? 32 : (paceVal >= 80 ? 25 : 20);
        aiFailureRisk -= (avgFeedback - 70) * 0.35;
        aiFailureRisk = Math.max(10, Math.min(45, Math.round(aiFailureRisk)));

        const roll = Math.random() * 100;
        const failed = roll < aiFailureRisk;

        if (failed) {
          teamDev.failedUpgrades = (teamDev.failedUpgrades || 0) + 1;
          // In caso di flop, nessun incremento di passo vettura e potenziale piccolo difetto di affidabilità
          if (Math.random() < 0.30 && teamDev.reliability > 70) {
            teamDev.reliability -= 1;
          }
          if (Math.random() < 0.40) {
            if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
            this.career.aiTransferNews.unshift(
              `⚠️ FLOP R&D: Il pacchetto evolutivo portato in pista da ${teamName} ha fallito la correlazione coi dati di ${dName} e non darà vantaggi cronometrici!`
            );
          }
        } else {
          // Upgrade AI promosso con successo
          if (teamDev.carPace < 98) {
            teamDev.carPace += 1;
            teamDev.seasonPaceGain = (teamDev.seasonPaceGain || 0) + 1;

            if (Math.random() < 0.30 && teamDrivers.length > 0) {
              if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
              this.career.aiTransferNews.unshift(
                `🛠️ R&D PADDOCK: ${teamName} promuove con successo il nuovo pacchetto evolutivo grazie ai collaudi di ${dName}!`
              );
            }
          }
          if (Math.random() < 0.25 && teamDev.reliability < 98) {
            teamDev.reliability += 1;
          }
        }
      }

      // Se il cambio regolamentare è annunciato, la scuderia AI divide gli sforzi e investe sul Progetto Nuovo Regolamento
      const reg = this.career.regulations;
      if (reg && reg.isRegulationYearAnnounced) {
        if (teamDev.nextGenLevel === undefined) teamDev.nextGenLevel = 0;
        if (teamDev.nextGenPoints === undefined) teamDev.nextGenPoints = 0;

        if (teamDev.nextGenLevel < 5) {
          const share = 0.35 + ((avgFeedback - 70) * 0.004) + ((avgMarket - 65) * 0.003);
          const aiRegGain = Math.max(0.04, totalGain * Math.min(0.65, share));
          teamDev.nextGenPoints += aiRegGain;

          if (teamDev.nextGenPoints >= 1.0 && teamDev.nextGenLevel < 5) {
            teamDev.nextGenPoints -= 1.0;
            teamDev.nextGenLevel += 1;

            if (!reg.aiTeamInvestments) reg.aiTeamInvestments = {};
            reg.aiTeamInvestments[team.id] = {
              teamName,
              nextGenLevel: teamDev.nextGenLevel
            };

            if (Math.random() < 0.18 && leadDriver) {
              if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
              this.career.aiTransferNews.unshift(
                `🏛️ R&D PADDOCK: ${teamName} delibera un pacchetto di sviluppo per i Nuovi Regolamenti ${reg.nextRegulationChangeYear} (Avanzamento Progetto: Livello ${teamDev.nextGenLevel}/5)!`
              );
            }
          }
        }
      }
    });

    db.setTeamDevelopment(this.career.teamDevelopment);
  }

  // Verifica e gestione dei cicli regolamentari (ogni 3 anni)
  checkRegulationMilestones() {
    if (!this.career) return;
    if (!this.career.regulations) {
      this.career.regulations = {
        currentCycle: 1,
        cycleLengthYears: 3,
        nextRegulationChangeYear: 2029,
        isRegulationYearAnnounced: false,
        playerNextGenInvestment: 0,
        teammateNextGenInvestment: 0,
        teammateContribution: { money: 0, points: 0, log: [] },
        aiTeamInvestments: {}
      };
    }

    const reg = this.career.regulations;
    const currentYear = this.career.currentYear;

    // 1. Annuncio nell'anno precedente al cambio regolamentare (es. anno 2028 per il 2029)
    if (currentYear + 1 === reg.nextRegulationChangeYear && !reg.isRegulationYearAnnounced) {
      reg.isRegulationYearAnnounced = true;
      if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
      this.career.aiTransferNews.unshift(
        `🚨 REGOLAMENTO TECNICO FIA: Ufficiale! La Federazione ha deliberato il nuovo regolamento per la Stagione ${reg.nextRegulationChangeYear}. Tutte le scuderie devono allocare budget e punti telemetrici sul Progetto Vettura Nuovo Regolamento per limitare il declassamento dei componenti e la perdita di passo!`
      );
    }

    // 2. Entrata in vigore del Nuovo Regolamento Tecnico (anno del cambio, es. 2029)
    if (currentYear >= reg.nextRegulationChangeYear) {
      const playerLevel = reg.playerNextGenInvestment || 0;
      const tmLevel = reg.teammateNextGenInvestment || 0;
      const totalTeamReadiness = Math.min(5, playerLevel + tmLevel);

      // Decremento controllato dei sottocomponenti R&D per creare un loop gradevole:
      // A preparazione massima (5/5), ogni componente scende di solo 1 livello (-1 anziché reset a 0)
      // A preparazione intermedia (3-4/5), scende di 1 o 2 livelli
      // A preparazione bassa (1-2/5), scende di 2 livelli
      // Senza preparazione (0/5), scende di 2 o 3 livelli
      let totalLevelsLost = 0;
      if (this.career.rdSubComponents) {
        for (const [k, lvl] of Object.entries(this.career.rdSubComponents)) {
          if (lvl > 0) {
            let dropAmount = 1;
            if (totalTeamReadiness >= 5) {
              dropAmount = 1;
            } else if (totalTeamReadiness >= 3) {
              dropAmount = Math.random() < 0.6 ? 1 : 2;
            } else if (totalTeamReadiness >= 1) {
              dropAmount = 2;
            } else {
              dropAmount = Math.random() < 0.5 ? 2 : 3;
            }
            const actualDrop = Math.min(lvl, dropAmount);
            this.career.rdSubComponents[k] = Math.max(0, lvl - actualDrop);
            totalLevelsLost += actualDrop;
          }
        }
      }

      this.career.carUpgrades = { aero: 0, engine: 0, chassis: 0, reliability: 0 };

      // Rimescolamento gerarchia scuderie in base agli investimenti Next-Gen
      if (this.career.teamDevelopment) {
        Object.values(this.career.teamDevelopment).forEach(td => {
          const isPlayerTeam = td.teamId === this.career.currentTeamId;
          const regDrop = 6;
          let recovery = 0;

          if (isPlayerTeam) {
            // Recupero passo del team giocatore basato sulla preparazione complessiva (giocatore + compagno)
            recovery = totalTeamReadiness * 1.2;
          } else {
            // Squadre AI: usano il livello Next-Gen sviluppato durante la stagione precedente
            const aiLvl = td.nextGenLevel !== undefined 
              ? td.nextGenLevel 
              : (td.carPace >= 85 ? 4 : (td.carPace >= 78 ? 2 : 1));
            const variance = (Math.random() * 1.2) - 0.6;
            recovery = Math.max(0.5, (aiLvl * 1.2) + variance);
          }

          td.carPace = Math.min(98, Math.max(65, Math.round(td.carPace - regDrop + recovery)));
          td.seasonPaceGain = 0;
          td.devPoints = 0;
          td.nextGenLevel = 0;
          td.nextGenPoints = 0;
        });
        db.setTeamDevelopment(this.career.teamDevelopment);
      }

      const protectionSummary = totalTeamReadiness >= 4
        ? `La tua scuderia ha gestito magistralmente la transizione tecnica (Preparazione ${totalTeamReadiness}/5)! I reparti hanno perso solo ${totalLevelsLost > 0 ? totalLevelsLost + ' livelli complessivi (-1 per componente)' : '0 livelli'}, conservando la maggior parte del lavoro pregresso!`
        : (totalTeamReadiness >= 2
          ? `Preparazione discreta (${totalTeamReadiness}/5): la vettura ha limitato i danni (-1/-2 livelli su alcuni componenti) rispetto al nuovo regolamento.`
          : `Preparazione carente (${totalTeamReadiness}/5): forte impatto regolamentare con calo di 2-3 livelli su diversi componenti tecnici!`);

      if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
      this.career.aiTransferNews.unshift(
        `🏁 RIVOLUZIONE TECNICA FIA ${currentYear}: Entrano in vigore i Nuovi Regolamenti! Le gerarchie della griglia sono state rimescolate. ${protectionSummary}`
      );

      // Reset ciclo regolamentare per i successivi 3 anni
      reg.currentCycle += 1;
      reg.nextRegulationChangeYear = currentYear + reg.cycleLengthYears;
      reg.isRegulationYearAnnounced = false;
      reg.playerNextGenInvestment = 0;
      reg.teammateNextGenInvestment = 0;
      reg.teammateContribution = { money: 0, points: 0, log: [] };
      reg.aiTeamInvestments = {};
    }
  }

  // Investimento R&D sul Progetto Nuovo Regolamento (Giocatore)
  buyNextGenRegulationUpgrade() {
    if (!this.career?.regulations?.isRegulationYearAnnounced) {
      return { success: false, message: "Nessun cambio regolamentare annunciato per la prossima stagione." };
    }
    const reg = this.career.regulations;
    const playerLevel = reg.playerNextGenInvestment || 0;
    const tmLevel = reg.teammateNextGenInvestment || 0;
    const totalLevel = Math.min(5, playerLevel + tmLevel);

    if (totalLevel >= 5) {
      return { success: false, message: "Progetto Nuovo Regolamento già al massimo livello consentito (5/5)!" };
    }

    const cost = 35000 * (playerLevel + 1);
    const ptsCost = 25 + (playerLevel * 15);

    if (this.career.money < cost) {
      return { success: false, message: `Fondi insufficienti per questo step R&D. Richiesti €${cost.toLocaleString()}, disponibili €${this.career.money.toLocaleString()}.` };
    }
    if ((this.career.rdTelemetryPoints || 0) < ptsCost) {
      return { success: false, message: `Dati telemetrici insufficienti. Richiesti ${ptsCost} PT, disponibili ${this.career.rdTelemetryPoints || 0} PT.` };
    }

    this.career.money -= cost;
    this.career.rdTelemetryPoints -= ptsCost;
    reg.playerNextGenInvestment = playerLevel + 1;

    const newTotal = Math.min(5, (reg.playerNextGenInvestment || 0) + (reg.teammateNextGenInvestment || 0));
    this.saveToStorage();

    return {
      success: true,
      message: `Progetto Vettura Nuovo Regolamento avanzato al Livello ${newTotal}/5 (Tuo step: ${reg.playerNextGenInvestment}/5)! Protezione upgrade attiva.`
    };
  }

  // Ritiro dalle corse e verdetto GOAT finale
  retire() {
    this.career.isRetired = true;
    const currentYear = this.career.currentYear || 2026;
    const startYear = this.career.stats?.startYear || 2026;

    if (!this.career.driverCareerStats) {
      this.career.driverCareerStats = JSON.parse(JSON.stringify(DRIVER_BASELINES));
    }

    if (this.career.stats) {
      this.career.stats.isRetired = true;
      this.career.stats.retiredYear = currentYear;
      this.career.stats.era = `${startYear}-${currentYear}`;
    }

    const pBreakdown = GoatScorer.getScoreBreakdown(this.player, this.career.stats);
    const goatScore = pBreakdown.total;
    const pTitles = pBreakdown.totalTitles || 0;
    const pWins = pBreakdown.totalWins || 0;
    const pPodiums = pBreakdown.totalPodiums || 0;

    const pName = `${this.player?.firstName || 'Pilota'} ${this.player?.lastName || 'Player'}`;
    this.career.driverCareerStats['player'] = {
      id: 'player',
      realName: pName,
      fictionalName: pName,
      name: pName,
      discipline: this.player?.discipline || 'auto',
      isLegend: pTitles > 0 || goatScore >= 300,
      isRetired: true,
      retiredYear: currentYear,
      era: `${startYear}-${currentYear}`,
      notableNote: pTitles > 0 
        ? `Campione del Mondo (${pTitles} ${pTitles === 1 ? 'Titolo' : 'Titoli'}, ${pWins} Vittorie e ${pPodiums} Podi) ritiratosi nel ${currentYear}`
        : `Pilota ritiratosi nel ${currentYear} con ${pWins} Vittorie e ${pPodiums} Podi in carriera`,
      byCategory: this.career.stats?.byCategory || {}
    };

    const hallOfFame = GoatScorer.getHallOfFameRanking(goatScore, this.player, this.career.stats, 'all', this.career.driverCareerStats);
    const verdict = GoatScorer.getTitleAndTier(goatScore);

    this.saveToStorage();
    return {
      goatScore,
      hallOfFame,
      verdict
    };
  }

  // Persistenza salvataggio su localStorage
  saveToStorage(targetSlotNum = null) {
    try {
      if (typeof localStorage === 'undefined') return;
      if (!this.player || !this.career) return;
      this.syncAndReconcileStats();
      const slotNum = targetSlotNum || this.getActiveSlot();
      const key = this.getStorageKeyForSlot(slotNum);
      const data = {
        player: this.player,
        career: this.career,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(key, JSON.stringify(data));
      if (slotNum === 1) {
        localStorage.setItem('il_nuovo_goat_motorsport_save', JSON.stringify(data));
      }
    } catch (e) {
      console.error("Errore nel salvataggio della carriera:", e);
    }
  }

  loadFromStorage(targetSlotNum = null) {
    try {
      if (typeof localStorage === 'undefined') return;
      const slotNum = targetSlotNum || this.getActiveSlot();
      this.setActiveSlot(slotNum);
      const key = this.getStorageKeyForSlot(slotNum);
      let raw = localStorage.getItem(key);
      if (!raw && slotNum === 1) {
        raw = localStorage.getItem('il_nuovo_goat_motorsport_save');
      }
      if (raw) {
        const data = JSON.parse(raw);
        this.player = data.player;
        this.career = data.career;
        if (this.player) {
          if (!this.player.name) {
            this.player.name = (this.player.firstName && this.player.lastName)
              ? `${this.player.firstName} ${this.player.lastName}`
              : (this.player.displayName || 'Pilota');
          }
          if (!this.player.displayName) {
            this.player.displayName = this.player.name;
          }
          if (this.player.unspentSkillPoints === undefined) {
            this.player.unspentSkillPoints = 0;
          }
        }
        if (this.career) {
          if (!this.career.stats) this.career.stats = {};
          if (!this.career.stats.byCategory) {
            this.career.stats.byCategory = {};
          }
          if (!this.career.freeAgents) this.career.freeAgents = [];
          if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
          if (!this.career.teamDriverOverrides) this.career.teamDriverOverrides = {};
          if (!this.career.retiredDrivers) this.career.retiredDrivers = [];
          if (!this.career.regens) this.career.regens = {};

          // Ripristina e registra tutti i regens generati nel DatabaseManager e nelle roster delle categorie
          if (this.career.regens) {
            for (const [rId, rData] of Object.entries(this.career.regens)) {
              db.registerCustomDriver(rData);
              const categories = rData.discipline === 'moto' ? MOTO_CATEGORIES : AUTO_CATEGORIES;
              const cat = categories[rData.category];
              if (cat && cat.roster && !cat.roster.some(d => d.id === rId)) {
                cat.roster.push(rData);
              }
            }
          }

          if (this.career.chosenTeammateId === undefined) this.career.chosenTeammateId = null;
          if (this.career.teamBenchedDriverId === undefined) this.career.teamBenchedDriverId = null;

          if (this.career.contract) {
            if (this.career.contract.durationYears === undefined) {
              this.career.contract.durationYears = this.career.contract.yearsLeft || 1;
            }
            if (this.career.contract.buyoutClause === undefined) {
              this.career.contract.buyoutClause = 0;
            }
          }
          if (!this.career.aiDriverAttributes) this.career.aiDriverAttributes = {};
          if (!this.career.teamDevelopment) {
            this.initTeamDevelopment();
          } else {
            db.setTeamDevelopment(this.career.teamDevelopment);
          }
          if (!this.career.regulations) {
            this.career.regulations = {
              currentCycle: 1,
              cycleLengthYears: 3,
              nextRegulationChangeYear: 2029,
              isRegulationYearAnnounced: false,
              playerNextGenInvestment: 0
            };
          }
          if (this.career.currentYear) {
            db.setActiveYear(this.career.currentYear);
          }
          this.syncAndReconcileStats();
          this.initRdSystem();
          // Calcola il roster attivo per prevenire problemi di terzi piloti nei vecchi salvataggi
          this.getActiveRoster();
          // Sincronizza gli attributi AI cresciuti al database per i calcoli di gara
          db.setAiDriverAttributes(this.career.aiDriverAttributes);
        }
      }
    } catch (e) {
      console.warn("Nessun salvataggio valido trovato o errore di lettura:", e);
    }
  }

  // === SISTEMA RIVALI DINAMICO (HEAD-TO-HEAD) ===
  assignSeasonRival(force = false) {
    if (!this.career) return null;
    if (this.career.seasonRival && !force) return this.career.seasonRival;

    const roster = this.getActiveRoster(this.career.currentCategory);
    const tm = this.getCurrentTeammate();
    const playerOvr = this.player?.ovr || 75;
    const discipline = this.player?.discipline || 'auto';

    // Filtra piloti rivali (escludi te stesso e il tuo compagno)
    const rivals = roster.filter(d => !d.isPlayer && d.id !== tm?.id && d.teamId !== this.career.currentTeamId);
    if (rivals.length === 0) return null;

    // Ordina per vicinanza di OVR rispetto al giocatore
    rivals.sort((a, b) => {
      const aOvr = this.career.aiDriverAttributes?.[a.id]?.ovr || a.ovr || 75;
      const bOvr = this.career.aiDriverAttributes?.[b.id]?.ovr || b.ovr || 75;
      return Math.abs(aOvr - playerOvr) - Math.abs(bOvr - playerOvr);
    });

    const chosen = rivals[0];
    const teamName = db.getTeamName(chosen.teamId, discipline, this.career.currentCategory);
    const driverName = chosen.name || db.getDriverName(chosen.id, discipline);

    this.career.seasonRival = {
      driverId: chosen.id,
      name: driverName,
      teamId: chosen.teamId,
      teamName,
      ovr: this.career.aiDriverAttributes?.[chosen.id]?.ovr || chosen.ovr || 75,
      playerWins: 0,
      rivalWins: 0,
      playerPoles: 0,
      rivalPoles: 0,
      playerPoints: 0,
      rivalPoints: 0,
      headToHeadWins: 0,
      headToHeadLosses: 0
    };
    return this.career.seasonRival;
  }

  getSeasonRival() {
    if (!this.career) return null;
    if (!this.career.seasonRival) {
      this.assignSeasonRival();
    }
    const r = this.career.seasonRival;
    if (!r) return null;
    r.playerScore = r.headToHeadWins || 0;
    r.rivalScore = r.headToHeadLosses || 0;
    r.status = (r.playerScore > r.rivalScore) ? 'leading' : ((r.rivalScore > r.playerScore) ? 'trailing' : 'tied');
    return r;
  }

  updateRivalStats(qualifyingGrid, raceResults) {
    if (!this.career) return;
    const rival = this.getSeasonRival();
    if (!rival) return;

    // Check Qualy
    if (qualifyingGrid && qualifyingGrid.length > 0) {
      const playerQPos = qualifyingGrid.findIndex(d => d.isPlayer) + 1;
      const rivalQPos = qualifyingGrid.findIndex(d => d.driverId === rival.driverId || d.id === rival.driverId) + 1;
      if (qualifyingGrid[0]?.isPlayer) rival.playerPoles++;
      else if (qualifyingGrid[0]?.driverId === rival.driverId || qualifyingGrid[0]?.id === rival.driverId) rival.rivalPoles++;
    }

    // Check Gara
    if (raceResults && raceResults.drivers) {
      const playerD = raceResults.drivers.find(d => d.isPlayer);
      const rivalD = raceResults.drivers.find(d => d.driverId === rival.driverId || d.id === rival.driverId);
      if (playerD && rivalD) {
        if (playerD.currentPos < rivalD.currentPos) {
          rival.headToHeadWins = (rival.headToHeadWins || 0) + 1;
        } else if (playerD.currentPos > rivalD.currentPos) {
          rival.headToHeadLosses = (rival.headToHeadLosses || 0) + 1;
        }
        if (playerD.currentPos === 1) rival.playerWins = (rival.playerWins || 0) + 1;
        if (rivalD.currentPos === 1) rival.rivalWins = (rival.rivalWins || 0) + 1;
      }
    }

    const pStanding = this.career.standings?.drivers?.find(d => d.isPlayer);
    const rStanding = this.career.standings?.drivers?.find(d => d.driverId === rival.driverId);
    if (pStanding) rival.playerPoints = pStanding.points;
    if (rStanding) rival.rivalPoints = rStanding.points;
  }

  // === OBIETTIVO DIRIGENZA & FIDUCIA TEAM PRINCIPAL ===
  getBoardExpectation() {
    if (!this.career) return { targetText: "Top 10", targetDesc: "Top 10", targetPos: 10, currentPos: 10, trust: 75, trustPercent: 75, status: "Saldo" };
    if (this.career.boardTrust === undefined) this.career.boardTrust = 75;

    const team = this.getPlayerTeam();
    const pace = team?.carPace || 75;
    let targetPos = 10;
    let targetText = "Punti Regolari (Top 10)";
    if (pace >= 90) {
      targetPos = 3;
      targetText = "Vittorie & Podi Costanti (Top 3)";
    } else if (pace >= 84) {
      targetPos = 6;
      targetText = "Zona Punti Alta (Top 6)";
    } else if (pace >= 78) {
      targetPos = 10;
      targetText = "Zona Punti (Top 10)";
    } else {
      targetPos = 14;
      targetText = "Lotta a Centro Gruppo (Top 14)";
    }

    const trustPercent = Math.max(0, Math.min(100, Math.round(this.career.boardTrust)));
    const standings = this.career.standings?.drivers || [];
    const pIdx = standings.findIndex(d => d.isPlayer);
    const currentPos = pIdx >= 0 ? pIdx + 1 : (targetPos || 10);
    let status = "Saldo";
    if (trustPercent >= 75) status = "Massima Fiducia";
    else if (trustPercent >= 55) status = "Saldo";
    else if (trustPercent >= 40) status = "Sotto Osservazione";
    else status = "A Rischio Esonero";

    let warning = null;
    if (trustPercent < 40) {
      warning = "La dirigenza è insoddisfatta dei risultati. Rischio rescissione anticipata!";
    }

    return {
      targetText,
      targetDesc: targetText,
      targetPos,
      currentPos,
      trust: trustPercent,
      trustPercent,
      status,
      warning
    };
  }

  updateBoardTrust(finishPos) {
    if (!this.career) return;
    const { targetPos } = this.getBoardExpectation();
    const delta = targetPos - finishPos;
    let trustDelta = 0;
    if (delta >= 4) trustDelta = +4;
    else if (delta >= 1) trustDelta = +2;
    else if (delta === 0) trustDelta = +1;
    else if (delta >= -3) trustDelta = -2;
    else trustDelta = -5;

    this.career.boardTrust = Math.max(10, Math.min(100, (this.career.boardTrust || 75) + trustDelta));
  }

  // === INTERVISTE MEDIA & DICHIARAZIONI POST-GARA ===
  applyMediaInterviewOutcome(choice) {
    if (!this.career) return { success: false };
    if (!this.career.aiTransferNews) this.career.aiTransferNews = [];

    const pName = `${this.player?.firstName || 'Pilota'} ${this.player?.lastName || ''}`.trim();
    let result = { type: choice, message: "", bonusText: "" };

    if (choice === 'team') {
      this.career.rdTelemetryPoints = (this.career.rdTelemetryPoints || 0) + 18;
      this.career.boardTrust = Math.min(100, (this.career.boardTrust || 75) + 4);
      result.message = "Hai elogiato pubblicamente il lavoro della scuderia e dei meccanici!";
      result.bonusText = "+18 Punti Telemetria R&D • +4% Fiducia Dirigenza";
      this.career.aiTransferNews.unshift(`🎙️ INTERVISTA: ${pName} ringrazia la scuderia: 'Macchina impeccabile, merito dello straordinario lavoro dei ragazzi ai box!'`);
    } else if (choice === 'critical') {
      const sponsorBonus = 12000;
      this.career.money += sponsorBonus;
      this.career.boardTrust = Math.max(15, (this.career.boardTrust || 75) - 3);
      result.message = "Hai espresso ambizione pretendendo aggiornamenti rapidi dal reparto corse!";
      result.bonusText = `+€${sponsorBonus.toLocaleString()} Attenzione Sponsor • -3% Pressione sui Tecnici`;
      this.career.aiTransferNews.unshift(`🎙️ INTERVISTA: ${pName} pungola il team: 'Serve più carico e velocità di punta se vogliamo vincere. Il muretto deve osare di più!'`);
    } else if (choice === 'rival') {
      const rival = this.getSeasonRival();
      const rivalName = rival ? rival.name : "gli avversari";
      result.message = `Hai lanciato il guanto di sfida a ${rivalName}!`;
      result.bonusText = "+15 Punti Notorietà GOAT • Accesa la rivalità diretta!";
      this.career.aiTransferNews.unshift(`🔥 SCINTILLE PADDOCK: ${pName} lancia la sfida a ${rivalName}: 'In pista non si fanno prigionieri, ci vediamo alla staccata della prossima gara!'`);
    }

    this.saveToStorage();
    return result;
  }

  resetCareer(targetSlotNum = null, clearInMemory = true) {
    const slotNum = targetSlotNum || this.getActiveSlot();
    if (typeof localStorage !== 'undefined') {
      const key = this.getStorageKeyForSlot(slotNum);
      localStorage.removeItem(key);
      if (slotNum === 1) {
        localStorage.removeItem('il_nuovo_goat_motorsport_save');
      }
    }
    if (clearInMemory) {
      this.player = null;
      this.career = null;
    }
  }
}

export const career = new CareerEngine();
