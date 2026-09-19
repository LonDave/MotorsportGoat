import { AUTO_CATEGORIES } from '../data/autoDatabase.js';
import { MOTO_CATEGORIES } from '../data/motoDatabase.js';
import { CIRCUITS_DATA } from '../data/circuitsDatabase.js';
import { db } from '../data/databaseManager.js';
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
    baseCost: 20000,
    costMult: 14000,
    basePoints: 35,
    pointsMult: 20,
    paceGain: 0.6,
    reliabilityGain: 0,
    spec: '+0.6 Passo • Inserimento in Curva & Bilanciamento'
  },
  aero_floor_venturi: {
    id: 'aero_floor_venturi',
    dept: 'aero',
    deptName: 'Aerodinamica',
    name: 'Fondo Venturi & Canali Effetto Suolo',
    desc: 'Genera elevatissimo carico aerodinamico dal sottovettura mantenendo minima la resistenza all\'avanzamento.',
    icon: '🌪️',
    maxLevel: 5,
    baseCost: 28000,
    costMult: 18000,
    basePoints: 50,
    pointsMult: 28,
    paceGain: 0.8,
    reliabilityGain: 0,
    spec: '+0.8 Passo • Carico Globale & Efficienza ad Alta Velocità'
  },
  aero_rear_wing_drs: {
    id: 'aero_rear_wing_drs',
    dept: 'aero',
    deptName: 'Aerodinamica',
    name: 'Ala Posteriore & Meccanismo DRS',
    desc: 'Ottimizza lo scarico d\'aria sul retrotreno e la velocità di punta in rettilineo a DRS aperto.',
    icon: '⚡',
    maxLevel: 5,
    baseCost: 22000,
    costMult: 15000,
    basePoints: 40,
    pointsMult: 22,
    paceGain: 0.6,
    reliabilityGain: 0,
    spec: '+0.6 Passo • Velocità di Punta & Sorpassi'
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
    baseCost: 30000,
    costMult: 20000,
    basePoints: 55,
    pointsMult: 30,
    paceGain: 0.8,
    reliabilityGain: 0,
    spec: '+0.8 Passo • Cavalli Vapore & Allungo'
  },
  engine_ers_hybrid: {
    id: 'engine_ers_hybrid',
    dept: 'engine',
    deptName: 'Power Unit & Motore',
    name: 'Sistema Ibrido ERS & MGU-K',
    desc: 'Aumenta il recupero dell\'energia cinetica in staccata e la spinta della coppia elettrica istantanea in trazione.',
    icon: '🔋',
    maxLevel: 5,
    baseCost: 25000,
    costMult: 17000,
    basePoints: 45,
    pointsMult: 25,
    paceGain: 0.7,
    reliabilityGain: 0,
    spec: '+0.7 Passo • Trazione Ibrida & Erogazione Coppia'
  },
  engine_ecu_exhaust: {
    id: 'engine_ecu_exhaust',
    dept: 'engine',
    deptName: 'Power Unit & Motore',
    name: 'Mappature ECU & Scarichi Inconel',
    desc: 'Mappature progressive del gas, isolamento termico avanzato e riduzione degli stress da detonazione.',
    icon: '💻',
    maxLevel: 5,
    baseCost: 18000,
    costMult: 12000,
    basePoints: 30,
    pointsMult: 18,
    paceGain: 0.5,
    reliabilityGain: 2,
    spec: '+0.5 Passo • +2% Affidabilità Termica'
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
    baseCost: 22000,
    costMult: 15000,
    basePoints: 40,
    pointsMult: 22,
    paceGain: 0.6,
    reliabilityGain: 0,
    spec: '+0.6 Passo • Grip Meccanico & Gestione Gomme'
  },
  chassis_monocoque: {
    id: 'chassis_monocoque',
    dept: 'chassis',
    deptName: 'Telaio & Sospensioni',
    name: 'Monoscocca in Carbonio Ultraleggera',
    desc: 'Riduce la massa sospesa complessiva, abbassando il baricentro ed esaltando la reattività nei cambi di direzione.',
    icon: '🏎️',
    maxLevel: 5,
    baseCost: 26000,
    costMult: 18000,
    basePoints: 45,
    pointsMult: 25,
    paceGain: 0.7,
    reliabilityGain: 0,
    spec: '+0.7 Passo • Agilità & Reattività nei Settori Lenti'
  },
  chassis_brakes: {
    id: 'chassis_brakes',
    dept: 'chassis',
    deptName: 'Telaio & Sospensioni',
    name: 'Impianto Frenante Carbon-Carbon & Condotti',
    desc: 'Staccate fulminee, minor surriscaldamento del liquido freni e controllo calibrato delle temperature cerchi.',
    icon: '🛑',
    maxLevel: 5,
    baseCost: 18000,
    costMult: 12000,
    basePoints: 30,
    pointsMult: 18,
    paceGain: 0.5,
    reliabilityGain: 2,
    spec: '+0.5 Passo • +2% Affidabilità in Staccata'
  },

  // 🛡️ AFFIDABILITÀ & CONTROLLO QUALITÀ
  rel_sensor_telemetry: {
    id: 'rel_sensor_telemetry',
    dept: 'reliability',
    deptName: 'Affidabilità & Qualità',
    name: 'Sensoristica Real-Time & Predictive Quality',
    desc: 'Reti di sensori wireless sui componenti critici per rilevare anomalie prima che provochino un guasto in gara.',
    icon: '📡',
    maxLevel: 5,
    baseCost: 16000,
    costMult: 11000,
    basePoints: 25,
    pointsMult: 15,
    paceGain: 0,
    reliabilityGain: 4,
    spec: '+4% Affidabilità • Prevenzione Guasti Elettronici'
  },
  rel_dyno_stress_test: {
    id: 'rel_dyno_stress_test',
    dept: 'reliability',
    deptName: 'Affidabilità & Qualità',
    name: 'Procedure Banco Prova Dinamico & Durabilità',
    desc: 'Stress test termomeccanici al banco prova su cambio, scatola differenziale e circuito idraulico ad alta pressione.',
    icon: '🛡️',
    maxLevel: 5,
    baseCost: 18000,
    costMult: 13000,
    basePoints: 30,
    pointsMult: 18,
    paceGain: 0,
    reliabilityGain: 4,
    spec: '+4% Affidabilità • Resistenza Meccanica & Cambio'
  }
};

// 🏛️ CONFIGURAZIONE STRUTTURE HQ & STAFF PERSONALE
export const HQ_CONFIG = {
  simulatorLevel: {
    id: "simulatorLevel",
    name: "Simulatore Dinamico Professionale",
    icon: "🖥️",
    baseCost: 45000,
    costMult: 35000,
    maxLevel: 5,
    desc: "Genera Punti Telemetria (PT) ogni weekend di gara (+15 PT per livello) e affina la messa a punto sul giro secco in Qualifica (+0.03s per livello).",
    perkText: (lvl) => `+${lvl * 15} PT/Gara • +${(lvl * 0.03).toFixed(2)}s Qualifica`
  },
  gymLevel: {
    id: "gymLevel",
    name: "Palestra, Fisioterapia & Crioterapia",
    icon: "🏋️",
    baseCost: 35000,
    costMult: 25000,
    maxLevel: 5,
    desc: "Aumenta la resistenza fisica (Fitness) prevenendo errori e cali di concentrazione nei finali di gara e nelle gare ad alto degrado.",
    perkText: (lvl) => `+${lvl * 2} Fitness • -${lvl * 12}% Calo fisico a fine gara`
  },
  prAgencyLevel: {
    id: "prAgencyLevel",
    name: "Ufficio Stampa & PR Agency Globale",
    icon: "📱",
    baseCost: 50000,
    costMult: 35000,
    maxLevel: 5,
    desc: "Attrae sponsor commerciali personali (+€6.000 a gara per livello) e potenzia costantemente la Marketability del pilota.",
    perkText: (lvl) => `+€${(lvl * 6000).toLocaleString()} Sponsor/GP • +${lvl * 3} Marketability`
  },
  telemetryCoachLevel: {
    id: "telemetryCoachLevel",
    name: "Coach Telemetrico & Race Engineer Dedicato",
    icon: "📈",
    baseCost: 40000,
    costMult: 30000,
    maxLevel: 5,
    desc: "Ottimizza il feedback per l'assetto (+0.02s per livello) e velocizza lo sviluppo R&D dei subcomponenti con +10 PT extra per gara.",
    perkText: (lvl) => `+${lvl * 10} PT/Gara • +${(lvl * 0.02).toFixed(2)}s Setup Assetto`
  },
  biohackingLevel: {
    id: "biohackingLevel",
    name: "Biohacking, Chef Nutrizionista & Mental Coach",
    icon: "🧠",
    baseCost: 40000,
    costMult: 30000,
    maxLevel: 5,
    desc: "Migliora la lucidità e la Costanza in pista (+2 Costanza per livello), riducendo le probabilità di testacoda e sbavature in condizioni mutevoli.",
    perkText: (lvl) => `+${lvl * 2} Costanza • -${lvl * 15}% Rischio Sbavature`
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
    price: 250000,
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
    price: 1800000,
    icon: "🏰",
    desc: "Attico affacciato su Port Hercule. Garantisce l'azzeramento fiscale su stipendi e premi gara (+15% guadagni netti da contratto a ogni GP!).",
    fameBonus: 15,
    goatBonus: 15,
    passivePerRace: 0,
    taxExemption: 0.15,
    perkBadge: "+15% Guadagni Netti da Contratto/Gara"
  },
  {
    id: "kart_team",
    name: "Scuderia Personale Karting & Driver Academy",
    price: 750000,
    icon: "🏁",
    desc: "Team di sviluppo giovanile che allena i talenti del futuro. Genera una solida rendita passiva da sponsor e premi di categoria.",
    fameBonus: 10,
    goatBonus: 12,
    passivePerRace: 12000,
    perkBadge: "Rendita Passiva +€12.000 a ogni GP"
  },
  {
    id: "fashion_brand",
    name: "Brand Personale di Abbigliamento & Merchandising",
    price: 450000,
    icon: "🕶️",
    desc: "Linea esclusiva di streetwear e accessori sportivi venduta in tutto il mondo. Produce royalty proporzionali alla tua popolarità.",
    fameBonus: 12,
    goatBonus: 8,
    passivePerRace: 8000,
    perkBadge: "Rendita Royalty +€8.000 a ogni GP"
  },
  {
    id: "private_jet",
    name: "Jet Privato Long-Range con Livrea Personalizzata",
    price: 4000000,
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
    price: 2500000,
    icon: "🏛️",
    desc: "Padiglione privato con le vetture più iconiche della storia dei motori. Monumentale attrazione mediatica che consacra la tua leggenda.",
    fameBonus: 20,
    goatBonus: 35,
    passivePerRace: 15000,
    perkBadge: "Rendita +€15.000/GP • +35 Punti GOAT"
  }
];

// ⏱️ CONFIGURAZIONE STAGE & RITIRI INTENSIVI
export const TRAINING_CAMPS_CONFIG = [
  {
    id: "wet_bootcamp",
    name: "Stage di Guida su Bagnato Estremo",
    icon: "🌧️",
    cost: 25000,
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
    cost: 30000,
    desc: "Test no-stop al simulatore dinamico per estrarre dati telemetrici e affinare il feeling dell'assetto.",
    effect: "+85 Punti Telemetria (PT) per R&D",
    apply: (player, career) => {
      career.career.rdTelemetryPoints = (career.career.rdTelemetryPoints || 0) + 85;
    }
  },
  {
    id: "altitude_camp",
    name: "Ritiro Atletico in Alta Quota (Alpi)",
    icon: "🏔️",
    cost: 20000,
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
    cost: 20000,
    desc: "Esibizione su strada e conferenze stampa internazionali nelle capitali mondiali per incendiare l'entusiasmo dei tifosi.",
    effect: "+5 Marketability & Notorietà Globale",
    apply: (player) => {
      player.attributes.marketability = Math.min(99, (player.attributes.marketability || 60) + 5);
    }
  }
];

export class CareerEngine {
  constructor() {
    this.player = null;
    this.career = null;
    this.loadFromStorage();
  }

  hasActiveCareer() {
    return !!this.player && !!this.career && !this.career.isRetired;
  }

  // Avvio nuova carriera con personalizzazione completa del giocatore
  startNewCareer(customData) {
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

    // Trova scuderia iniziale della categoria base
    const categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    const catData = categories[startingCategory];
    const initialTeam = catData.teams[0];

    this.player = {
      id: "player_custom",
      firstName: customData.firstName || "Alessandro",
      lastName: customData.lastName || "Veloci",
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

    this.career = {
      currentYear: 2026,
      seasonNumber: 1,
      currentCategory: startingCategory,
      currentTeamId: initialTeam.id,
      contract: {
        salaryPerRace: customData.origin === 'paydriver' ? 0 : 5000,
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
      hqUpgrades: { simulatorLevel: 0, gymLevel: 0, prAgencyLevel: 0, telemetryCoachLevel: 0 },
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
        playerNextGenInvestment: 0
      },
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
        year: 2026
      });
    }

    this.initSeasonStandings();
    this.saveToStorage();
    return true;
  }

  calculateOvr(attrs) {
    const total = 
      (attrs.pace * 0.28) +
      (attrs.racecraft * 0.22) +
      (attrs.tyreMgmt * 0.16) +
      (attrs.consistency * 0.14) +
      (attrs.wetSkill * 0.10) +
      (attrs.technicalFeedback * 0.10);
    return Math.min(99, Math.round(total));
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

  // Ottiene il roster attivo dei piloti AI per una specifica categoria, escludendo svincolati e il pilota sostituito dal giocatore
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
        return effTeam !== 'free_agent';
      }).map(d => {
        const effTeam = (this.career?.teamDriverOverrides && this.career.teamDriverOverrides[d.id]) || d.teamId;
        return effTeam !== d.teamId ? { ...d, teamId: effTeam } : d;
      });
    }

    // Assicura che teamBenchedDriverId appartenga effettivamente al team del giocatore
    const playerTeamDrivers = cat.roster.filter(d => {
      const effTeam = (this.career?.teamDriverOverrides && this.career.teamDriverOverrides[d.id]) || d.teamId;
      return effTeam === playerTeamId;
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
    // 3. Esclusione totale dei piloti svincolati (free_agent o presenti in freeAgents)
    const activeRoster = [];
    const freeAgentIds = new Set((this.career?.freeAgents || []).map(f => f.driverId));

    cat.teams.forEach(team => {
      const isPlayerTeam = (team.id === playerTeamId);
      const capacity = isPlayerTeam ? Math.max(1, maxDrivers - 1) : maxDrivers;

      let candidates = cat.roster.filter(d => {
        const effTeam = (this.career?.teamDriverOverrides && this.career.teamDriverOverrides[d.id]) || d.teamId;
        if (effTeam !== team.id) return false;
        if (effTeam === 'free_agent') return false;
        if (isPlayerTeam && (d.id === benchedId || (Array.isArray(benchedId) && benchedId.includes(d.id)))) return false;
        if (freeAgentIds.has(d.id)) return false;
        return true;
      });

      // Se il team del giocatore ha chosenTeammateId, ordinalo per primo
      if (isPlayerTeam && this.career?.chosenTeammateId) {
        candidates.sort((a, b) => (a.id === this.career.chosenTeammateId ? -1 : 1));
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

  // Crescita organica degli attributi dei piloti AI a fine stagione
  growAiDriverAttributes() {
    if (!this.career || !this.career.aiDriverAttributes) {
      this.career.aiDriverAttributes = {};
    }

    const discipline = this.player?.discipline || 'auto';
    const categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    const catKey = this.career.currentCategory;
    const cat = categories[catKey];
    if (!cat || !cat.roster) return;

    cat.roster.forEach(driver => {
      const dId = driver.id;
      // Inizializza il profilo AI se non esiste (clona gli attributi base)
      if (!this.career.aiDriverAttributes[dId]) {
        this.career.aiDriverAttributes[dId] = {
          ovr: driver.ovr || 75,
          pace: driver.pace || 75,
          racecraft: driver.racecraft || 75,
          tyreMgmt: driver.tyreMgmt || 75,
          consistency: driver.consistency || 75,
          wetSkill: driver.wetSkill || 75,
          age: driver.age || 24
        };
      }

      const attrs = this.career.aiDriverAttributes[dId];
      attrs.age = (attrs.age || 24) + 1;
      const age = attrs.age;

      // Crescita dipende dall'età: i giovani crescono, i veterani declinano
      if (attrs.ovr < 99) {
        if (age <= 22) {
          // Giovani talenti: crescita rapida
          const gain = 0.6 + Math.random() * 0.6;
          attrs.pace = Math.min(99, (attrs.pace || 75) + gain);
          attrs.racecraft = Math.min(99, (attrs.racecraft || 75) + gain * 0.7);
          attrs.consistency = Math.min(99, (attrs.consistency || 75) + gain * 0.5);
        } else if (age <= 27) {
          // Prime: piccola crescita, affinamento
          const gain = 0.2 + Math.random() * 0.3;
          attrs.racecraft = Math.min(99, (attrs.racecraft || 75) + gain);
          attrs.tyreMgmt = Math.min(99, (attrs.tyreMgmt || 75) + gain * 0.6);
        } else if (age <= 32) {
          // Plateau/lieve declino: costanza aumenta, velocità resta
          const gain = 0.1 + Math.random() * 0.1;
          attrs.consistency = Math.min(99, (attrs.consistency || 75) + gain);
        } else {
          // Declino naturale post-32
          const loss = 0.2 + Math.random() * 0.3;
          attrs.pace = Math.max(60, (attrs.pace || 75) - loss);
          if (age > 36) {
            attrs.racecraft = Math.max(60, (attrs.racecraft || 75) - loss * 0.5);
          }
        }

        // Ricalcola OVR come media pesata degli attributi
        const sum = (attrs.pace || 75) * 0.3 + (attrs.racecraft || 75) * 0.25 +
                    (attrs.tyreMgmt || 75) * 0.2 + (attrs.consistency || 75) * 0.15 + (attrs.wetSkill || 75) * 0.1;
        attrs.ovr = Math.min(99, Math.round(sum));
      }
    });

    // Sincronizza i nuovi attributi cresciuti al database per i calcoli di gara
    db.setAiDriverAttributes(this.career.aiDriverAttributes);
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
      return { id: 'default_team', displayName: 'Scuderia', color: '#e10600', carPace: 75, bikePace: 75, reliability: 75 };
    }
    const team = catData.teams.find(t => t.id === this.career?.currentTeamId) || catData.teams[0];
    const upgrades = this.career?.carUpgrades || { aero: 0, engine: 0, chassis: 0, reliability: 0 };
    const bonusPace = (upgrades.aero * 1.5) + (upgrades.engine * 1.5) + (upgrades.chassis * 1.2);
    const bonusReliability = upgrades.reliability * 2.5;

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

    const resolvedName = db.getTeamName(team.id, this.player?.discipline);

    return {
      ...team,
      carPace: Math.min(99, Math.round(basePace + bonusPace + subPaceGain)),
      bikePace: Math.min(99, Math.round(basePace + bonusPace + subPaceGain)),
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
      this.career.rdTelemetryPoints = 120;
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
    const sponsorMoney = Math.round(5000 + (tmMarketability * 160));
    this.career.money += sponsorMoney;

    // 2. Dati e Punti Telemetrici R&D (PT) generati dal lavoro in pista e al simulatore
    const tmTelemetry = Math.round(8 + (tmFeedback * 0.30));
    const playerFeedback = this.player?.attributes?.technicalFeedback || 60;
    const playerTelemetry = Math.round(12 + (playerFeedback * 0.35) + (finishPos <= 10 ? 8 : 2));
    const totalTelemetry = tmTelemetry + playerTelemetry;

    this.career.rdTelemetryPoints = (this.career.rdTelemetryPoints || 0) + totalTelemetry;

    // 3. Probabilità di Upgrade Autonomo / Breakthrough dal Simulatore da parte del compagno (~25-35%)
    let breakthrough = null;
    const breakthroughChance = 0.16 + (tmFeedback / 450);
    if (Math.random() < breakthroughChance) {
      const compKeys = Object.keys(RD_SUBCOMPONENTS_CONFIG);
      const chosenCompKey = compKeys[Math.floor(Math.random() * compKeys.length)];
      const compCfg = RD_SUBCOMPONENTS_CONFIG[chosenCompKey];
      const currentLvl = this.career.rdSubComponents[chosenCompKey] || 0;

      if (currentLvl < (compCfg.maxLevel || 5)) {
        this.career.rdSubComponents[chosenCompKey] = currentLvl + 1;
        breakthrough = {
          type: 'component_upgrade',
          componentName: compCfg.name,
          deptName: compCfg.deptName,
          newLevel: currentLvl + 1,
          message: `Il compagno ${tmName} ha completato una sessione intensiva al simulatore testando con successo: ${compCfg.name} (Livello ${currentLvl + 1})!`
        };
      } else {
        const bonusMoney = 15000;
        this.career.money += bonusMoney;
        breakthrough = {
          type: 'sponsor_bonus',
          amount: bonusMoney,
          message: `Il compagno ${tmName} ha chiuso una partnership commerciale esclusiva portando un extra budget di €${bonusMoney.toLocaleString()}!`
        };
      }

      if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
      this.career.aiTransferNews.unshift(
        `🤝 COLLABORAZIONE REPARTO CORSE: ${breakthrough.message}`
      );
    }

    // Aggiorna statistiche cumulative di collaborazione
    const stats = this.career.teammateCollaborationStats;
    stats.totalMoneyContributed = (stats.totalMoneyContributed || 0) + sponsorMoney;
    stats.totalTelemetryContributed = (stats.totalTelemetryContributed || 0) + tmTelemetry;
    if (breakthrough) {
      stats.upgradesDelivered = (stats.upgradesDelivered || 0) + 1;
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

      if (isPlayerPole) {
        stats.poles++;
        catStats.poles = (catStats.poles || 0) + 1;
      }
    }

    // Risultato gara principale
    const playerResult = raceResults.drivers.find(d => d.isPlayer);
    if (playerResult) {
      stats.racesStarted++;
      catStats.racesStarted = (catStats.racesStarted || 0) + 1;
      const pos = playerResult.currentPos;
      if (pos === 1) {
        stats.wins++;
        catStats.wins = (catStats.wins || 0) + 1;
        if (currentCircuit) {
          stats.specialWins[currentCircuit.id] = (stats.specialWins[currentCircuit.id] || 0) + 1;
        }
      }
      if (pos <= 3) {
        stats.podiums++;
        catStats.podiums = (catStats.podiums || 0) + 1;
      }

      // Punti gara
      const racePts = raceResults.isSprint ? 0 : this.getPointsForPosition(pos);
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
        const pts = this.getPointsForPosition(d.currentPos);
        this.addDriverPoints(d.driverId, pts, d.currentPos === 1, d.currentPos <= 3);
        this.addTeamPoints(d.teamId, pts);
      }
    });

    // Se c'è stata una Sprint race, assegna anche i punti sprint
    if (sprintResults) {
      sprintResults.drivers.forEach(d => {
        const pts = this.getSprintPointsForPosition(d.currentPos);
        this.addDriverPoints(d.isPlayer ? "player" : d.driverId, pts, false, false);
        this.addTeamPoints(d.teamId, pts);
      });
    }

    // Ordina classifica aggiornata
    this.career.standings.drivers.sort((a, b) => b.points - a.points || b.wins - a.wins);
    this.career.standings.teams.sort((a, b) => b.points - a.points);

    // Sviluppo progressivo delle vetture AI durante la stagione
    this.developAiCars();

    // Crescita organica e calcolo Punti Abilità Pilota guadagnati nel weekend
    this.progressPlayerAttributes(playerResult ? playerResult.currentPos : 10);

    // Calcolo punti abilità:
    // Base garantita: 2 punti (esperienza giro in pista, telemetria, setup)
    // +1 se a punti (Top 10)
    // Calcolo punti abilità:
    // Progressione bilanciata in base alla maturità/OVR del pilota:
    // A basso OVR (rookie) si cresce più rapidamente, mentre ai vertici (85-90+ OVR)
    // i punti abilità sono rari e richiedono grandi risultati.
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
        // Sopra 92 OVR (livello superstar F1: Verstappen/Hamilton/Leclerc):
        // I punti si guadagnano unicamente con podi e vittorie
        earnedSkillPoints = 0;
        if (playerResult) {
          if (playerResult.currentPos <= 3) earnedSkillPoints += 1;
        }
      }
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
    const racePts = playerResult ? (raceResults.isSprint ? 0 : this.getPointsForPosition(playerResult.currentPos)) : 0;
    return {
      isSeasonEnd,
      nextRaceIndex: this.career.currentRaceIndex,
      earnedSkillPoints,
      earnedPoints: racePts,
      teammateContribution
    };
  }

  getPointsForPosition(pos) {
    const table = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
    return table[pos - 1] || 0;
  }

  getSprintPointsForPosition(pos) {
    const table = [8, 7, 6, 5, 4, 3, 2, 1];
    return table[pos - 1] || 0;
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
    } else if (playerPos === 2) {
      this.career.licensePoints += Math.round(baseLicensePts * 0.75);
    } else if (playerPos === 3) {
      this.career.licensePoints += Math.round(baseLicensePts * 0.5);
    } else if (playerPos <= 5) {
      this.career.licensePoints += Math.round(baseLicensePts * 0.25);
    }

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
      categoryName: db.getSeriesName(this.career.currentCategory, this.player.discipline),
      team: db.getTeamName(this.career.currentTeamId, this.player.discipline),
      playerPos: this.career.standings.drivers.findIndex(d => d.isPlayer) + 1,
      playerPoints: playerStanding ? playerStanding.points : 0,
      wins: playerStanding ? playerStanding.wins : 0,
      championName: isPlayerChampion ? `${this.player.firstName} ${this.player.lastName}` : db.getDriverName(champion?.driverId, this.player.discipline)
    });

    // Avanzamento anagrafico ed evoluzione organica annuale
    const prevAge = this.player.age;
    this.player.age++;
    const newAge = this.player.age;
    this.career.currentYear++;
    this.career.seasonNumber++;
    this.career.stats.currentYear = this.career.currentYear;

    // Report di sviluppo / declino stagionale
    const devReport = this.applyAnnualCareerEvolution(prevAge, newAge);

    // Gestione contratto a fine stagione: decrementa 1 anno
    const currentContract = this.career.contract || { yearsLeft: 1, durationYears: 1, buyoutClause: 0 };
    const prevYearsLeft = currentContract.yearsLeft !== undefined ? currentContract.yearsLeft : 1;
    currentContract.yearsLeft = Math.max(0, prevYearsLeft - 1);
    const isUnderContract = currentContract.yearsLeft > 0;

    // Fonde una quota degli upgrade R&D stagionali nel passo base permanente della vettura
    if (this.career.teamDevelopment && this.career.teamDevelopment[this.career.currentTeamId]) {
      const up = this.career.carUpgrades || {};
      const gained = Math.round((up.aero * 0.8) + (up.engine * 0.8) + (up.chassis * 0.6));
      if (gained > 0) {
        this.career.teamDevelopment[this.career.currentTeamId].carPace = Math.min(
          98,
          (this.career.teamDevelopment[this.career.currentTeamId].carPace || 75) + gained
        );
      }
    }
    this.career.carUpgrades = { aero: 0, engine: 0, chassis: 0, reliability: 0 };

    // Esegui trasferimenti piloti AI e movimenti di mercato Free Agent
    this.aiDriverTransfers();

    // Crescita annuale degli attributi AI (giovani migliorano, veterani declinano)
    this.growAiDriverAttributes();

    // Verifica milestone e cicli regolamentari FIA (ogni 3 anni)
    this.checkRegulationMilestones();

    // Genera offerte contrattuali per il nuovo anno
    const offers = this.generateContractOffers();

    const offseasonResult = {
      isPlayerChampion,
      championName: isPlayerChampion ? `${this.player.firstName} ${this.player.lastName}` : db.getDriverName(champion?.driverId, this.player.discipline),
      offers,
      devReport,
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

    // Se ha cambiato categoria, azzera gli upgrade della vettura precedente
    if (previousCategory !== offer.category) {
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
      const sprintState = RaceEngine.initRaceState(qualyGrid, circuit, catData, true, player.discipline, null, player);
      RaceEngine.fastForwardToEnd(sprintState, defaultTactics, player.discipline);
      sprintResults = sprintState;
    }

    // 3. Gara Principale
    const raceState = RaceEngine.initRaceState(qualyGrid, circuit, catData, false, player.discipline, null, player);
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
    const cost = 25000 * ((this.career.carUpgrades[dept] || 0) + 1);
    if (this.career.money < cost) {
      return { success: false, message: "Fondi insufficienti per questo pacchetto R&D." };
    }
    if ((this.career.carUpgrades[dept] || 0) >= 5) {
      return { success: false, message: "Reparto già al massimo sviluppo consentito per questa stagione." };
    }

    this.career.money -= cost;
    this.career.carUpgrades[dept] = (this.career.carUpgrades[dept] || 0) + 1;
    this.saveToStorage();
    return { success: true, message: `Aggiornamento R&D ${dept.toUpperCase()} installato con successo!` };
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

    const cost = cfg.baseCost + (currentLvl * cfg.costMult);
    const ptsCost = cfg.basePoints + (currentLvl * cfg.pointsMult);

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

    this.career.money -= cost;
    this.career.rdTelemetryPoints -= ptsCost;
    this.career.rdSubComponents[compKey] = currentLvl + 1;

    this.saveToStorage();

    const gainStr = cfg.paceGain > 0 ? `+${cfg.paceGain} Passo Mezzo` : `+${cfg.reliabilityGain}% Affidabilità`;
    return {
      success: true,
      message: `Upgrade installato! ${cfg.name} portato al Livello ${currentLvl + 1} (${gainStr}).`,
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
    const hqTelemetry = (simLvl * 15) + (coachLvl * 10);
    if (hqTelemetry > 0) {
      telemetryGain += hqTelemetry;
      this.career.rdTelemetryPoints = (this.career.rdTelemetryPoints || 0) + hqTelemetry;
      perksApplied.push(`+${hqTelemetry} PT Telemetria da Simulatore & Coach HQ`);
    }

    // 2. Sponsor Commerciali Personali da Agenzia PR HQ
    const prLvl = hq.prAgencyLevel || 0;
    if (prLvl > 0) {
      const prMoney = prLvl * 6000;
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
      taxBonus = Math.round((salary + winBonus) * 0.15);
      if (taxBonus > 0) {
        passiveRevenue += taxBonus;
        perksApplied.push(`+€${taxBonus.toLocaleString()} Risparmio Fiscale Monte Carlo (+15%)`);
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
      const prMoney = prLvl * 6000;
      passivePerRace += prMoney;
      activePerks.push(`Sponsor PR HQ: +€${prMoney.toLocaleString()}/GP`);
    }

    const simLvl = hq.simulatorLevel || 0;
    if (simLvl > 0) {
      activePerks.push(`Simulatore HQ: +${simLvl * 15} PT/GP`);
    }

    const coachLvl = hq.telemetryCoachLevel || 0;
    if (coachLvl > 0) {
      activePerks.push(`Coach Telemetria: +${coachLvl * 10} PT/GP`);
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
      const baseGain = paceVal > 85 ? 0.35 : (paceVal > 78 ? 0.28 : 0.22);
      const randBonus = Math.random() * 0.15;

      // Collaborazione Piloti AI: il feedback tecnico e gli sponsor dei piloti accelerano lo sviluppo vettura
      const teamDrivers = cat.roster.filter(d => {
        const effTeam = this.career.teamDriverOverrides[d.id] || d.teamId;
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

      const technicalBonus = (avgFeedback - 70) * 0.005; // Fino a +0.12 per top piloti
      const sponsorBonus = (avgMarket - 65) * 0.003;     // Fino a +0.08 per piloti famosi
      const totalGain = Math.max(0.12, baseGain + randBonus + technicalBonus + sponsorBonus);

      teamDev.devPoints = (teamDev.devPoints || 0) + totalGain;

      // Al raggiungimento di 1 punto sviluppo: +1 a carPace
      if (teamDev.devPoints >= 1.0) {
        teamDev.devPoints -= 1.0;
        if (teamDev.carPace < 98) {
          teamDev.carPace += 1;
          teamDev.seasonPaceGain = (teamDev.seasonPaceGain || 0) + 1;

          if (Math.random() < 0.25 && teamDrivers.length > 0) {
            const teamName = db.getTeamName(team.id, discipline, currentCatKey);
            const leadDriver = teamDrivers[0];
            const dName = db.getDriverName(leadDriver.id, discipline);
            if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
            this.career.aiTransferNews.unshift(
              `🛠️ R&D PADDOCK: ${teamName} delibera un nuovo pacchetto evolutivo dopo i test condotti da ${dName}!`
            );
          }
        }
        if (Math.random() < 0.35 && teamDev.reliability < 98) {
          teamDev.reliability += 1;
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
        playerNextGenInvestment: 0
      };
    }

    const reg = this.career.regulations;
    const currentYear = this.career.currentYear;

    // 1. Annuncio nell'anno precedente al cambio regolamentare (es. anno 2028 per il 2029)
    if (currentYear + 1 === reg.nextRegulationChangeYear && !reg.isRegulationYearAnnounced) {
      reg.isRegulationYearAnnounced = true;
      if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
      this.career.aiTransferNews.unshift(
        `🚨 REGOLAMENTO TECNICO FIA: Ufficiale! La Federazione ha deliberato il nuovo regolamento per la Stagione ${reg.nextRegulationChangeYear}. I team devono allocare risorse sul Progetto Vettura Nuovo Regolamento per evitare penalizzazioni di passo.`
      );
    }

    // 2. Entrata in vigore del Nuovo Regolamento Tecnico (anno del cambio, es. 2029)
    if (currentYear >= reg.nextRegulationChangeYear) {
      const playerBonus = (reg.playerNextGenInvestment || 0) * 1.5;
      this.career.carUpgrades = { aero: 0, engine: 0, chassis: 0, reliability: 0 };

      if (this.career.teamDevelopment) {
        Object.values(this.career.teamDevelopment).forEach(td => {
          const isPlayerTeam = td.teamId === this.career.currentTeamId;
          const regDrop = 6;
          let recovery = 0;
          if (isPlayerTeam) {
            recovery = playerBonus;
          } else {
            const baseInvest = td.carPace >= 85 ? 4.5 : (td.carPace >= 78 ? 3.0 : 2.0);
            const surprise = (Math.random() * 4.0) - 1.5;
            recovery = Math.max(1, baseInvest + surprise);
          }

          td.carPace = Math.min(98, Math.max(65, Math.round(td.carPace - regDrop + recovery)));
          td.seasonPaceGain = 0;
          td.devPoints = 0;
        });
        db.setTeamDevelopment(this.career.teamDevelopment);
      }

      if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
      this.career.aiTransferNews.unshift(
        `🏁 RIVOLUZIONE TECNICA ${currentYear}: Entrano ufficialmente in vigore i Nuovi Regolamenti! Le gerarchie della griglia sono state rimescolate. ${playerBonus >= 4.5 ? 'Il tuo team ha centrato alla perfezione il progetto vettura!' : 'Inizia la sfida per sviluppare la monoposto della nuova era!'}`
      );

      reg.currentCycle += 1;
      reg.nextRegulationChangeYear = currentYear + reg.cycleLengthYears;
      reg.isRegulationYearAnnounced = false;
      reg.playerNextGenInvestment = 0;
    }
  }

  // Investimento R&D sul Progetto Nuovo Regolamento
  buyNextGenRegulationUpgrade() {
    if (!this.career?.regulations?.isRegulationYearAnnounced) {
      return { success: false, message: "Nessun cambio regolamentare annunciato per la prossima stagione." };
    }
    const currentLevel = this.career.regulations.playerNextGenInvestment || 0;
    if (currentLevel >= 5) {
      return { success: false, message: "Progetto Nuovo Regolamento già al massimo livello consentito (5/5)!" };
    }
    const cost = 40000 * (currentLevel + 1);
    if (this.career.money < cost) {
      return { success: false, message: `Fondi insufficienti per questo step R&D. Richiesti €${cost.toLocaleString()}.` };
    }
    this.career.money -= cost;
    this.career.regulations.playerNextGenInvestment = currentLevel + 1;
    this.saveToStorage();
    return {
      success: true,
      message: `Progetto Vettura Nuovo Regolamento avanzato al Livello ${currentLevel + 1}/5! (+${((currentLevel + 1) * 1.5).toFixed(1)} Passo Garantito nella nuova era)`
    };
  }

  // Ritiro dalle corse e verdetto GOAT finale
  retire() {
    this.career.isRetired = true;
    const goatScore = GoatScorer.calculateScore(this.player, this.career.stats);
    const hallOfFame = GoatScorer.getHallOfFameRanking(goatScore, this.player, this.career.stats);
    const verdict = GoatScorer.getTitleAndTier(goatScore);

    this.saveToStorage();
    return {
      goatScore,
      hallOfFame,
      verdict
    };
  }

  // Persistenza salvataggio su localStorage
  saveToStorage() {
    try {
      if (typeof localStorage === 'undefined') return;
      this.syncAndReconcileStats();
      const data = {
        player: this.player,
        career: this.career
      };
      localStorage.setItem('il_nuovo_goat_motorsport_save', JSON.stringify(data));
    } catch (e) {
      console.error("Errore nel salvataggio della carriera:", e);
    }
  }

  loadFromStorage() {
    try {
      if (typeof localStorage === 'undefined') return;
      const raw = localStorage.getItem('il_nuovo_goat_motorsport_save');
      if (raw) {
        const data = JSON.parse(raw);
        this.player = data.player;
        this.career = data.career;
        if (this.player && this.player.unspentSkillPoints === undefined) {
          this.player.unspentSkillPoints = 0;
        }
        if (this.career) {
          if (!this.career.stats) this.career.stats = {};
          if (!this.career.stats.byCategory) {
            this.career.stats.byCategory = {};
          }
          if (!this.career.freeAgents) this.career.freeAgents = [];
          if (!this.career.aiTransferNews) this.career.aiTransferNews = [];
          if (!this.career.teamDriverOverrides) this.career.teamDriverOverrides = {};
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

  resetCareer() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('il_nuovo_goat_motorsport_save');
    }
    this.player = null;
    this.career = null;
  }
}

export const career = new CareerEngine();
