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
      isRetired: false
    };

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

  // Inizializza la classifica piloti e team all'inizio di ogni stagione
  initSeasonStandings() {
    const categories = this.player.discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    const cat = categories[this.career.currentCategory];
    if (!cat) return;

    // Driver standings
    const driverList = [
      { driverId: "player", points: 0, wins: 0, podiums: 0, poles: 0, isPlayer: true }
    ];

    cat.roster.forEach(r => {
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

    const resolvedName = db.getTeamName(team.id, this.player?.discipline);

    return {
      ...team,
      carPace: Math.min(99, Math.round((team.carPace || team.bikePace || 75) + bonusPace)),
      bikePace: Math.min(99, Math.round((team.bikePace || team.carPace || 75) + bonusPace)),
      reliability: Math.min(99, Math.round(team.reliability + bonusReliability)),
      displayName: resolvedName || team.realName || team.fictionalName || team.name || 'Scuderia',
      color: team.color || '#e10600'
    };
  }

  // Ottiene il compagno di squadra attuale
  getCurrentTeammate() {
    const catData = this.getCurrentCategoryData();
    const teammate = catData.roster.find(r => r.teamId === this.career.currentTeamId);
    if (teammate) {
      return {
        ...teammate,
        name: db.getDriverName(teammate.id, this.player.discipline)
      };
    }
    return { name: "Rookie Collaudatore", ovr: 74, id: "test_driver" };
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

    // Crescita organica e calcolo Punti Abilità Pilota guadagnati nel weekend
    this.progressPlayerAttributes(playerResult ? playerResult.currentPos : 10);

    // Calcolo punti abilità: se il pilota ha già raggiunto 99 OVR, nessun punto ulteriore!
    let earnedSkillPoints = 0;
    if ((this.player.ovr || 60) < 99) {
      if (playerResult) {
        const pos = playerResult.currentPos;
        if (pos <= 3) {
          earnedSkillPoints = 1; // 1 punto per podio o vittoria
        } else if (pos <= 10 && Math.random() < 0.5) {
          earnedSkillPoints = 1; // 50% di probabilità per arrivo a punti regolare
        }
      }
    }

    if ((this.player.ovr || 60) >= 99) {
      this.player.unspentSkillPoints = 0;
      earnedSkillPoints = 0;
    } else {
      this.player.unspentSkillPoints = (this.player.unspentSkillPoints || 0) + earnedSkillPoints;
    }

    this.career.lastWeekendRecap = {
      earnedSkillPoints,
      finishPos: playerResult ? playerResult.currentPos : 10,
      isPole: !!(qualifyingGrid && qualifyingGrid[0]?.isPlayer)
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
      earnedPoints: racePts
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
      this.player.attributes[target] = Math.min(99, (this.player.attributes[target] || 60) + 1);
      remaining--;
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

    // Reset R&D parziale per regolamento tecnico
    this.career.carUpgrades = { aero: 0, engine: 0, chassis: 0, reliability: 0 };

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
  startNewSeason(offer = null, durationYears = 1) {
    if (offer) {
      const res = this.acceptContract(offer, durationYears, true);
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
  acceptContract(offer, durationYears = 1, isNewSeason = false) {
    const currentContract = this.career.contract || {};
    const yearsLeft = currentContract.yearsLeft || 0;
    const isChangingTeam = offer.teamId !== this.career.currentTeamId;
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

    const salary = durationYears === 2 
      ? (offer.salaryPerRace2yr || Math.round((offer.salaryPerRace || 5000) * 1.15)) 
      : (offer.salaryPerRace1yr || offer.salaryPerRace || 5000);
    const buyoutClause = durationYears === 2 ? (offer.buyoutClause2yr || 50000) : 0;

    const previousCategory = this.career.currentCategory;
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
    const qualy = RaceEngine.initQualifyingState(circuit, catData, catData.roster, player, team, 0.2, player.discipline);
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

  // Acquisto Upgrade R&D Vettura/Moto
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

  // Acquisto Upgrade HQ / Stile di vita
  buyHqUpgrade(type) {
    const costs = {
      simulatorLevel: 40000,
      gymLevel: 30000,
      prAgencyLevel: 50000,
      telemetryCoachLevel: 45000
    };
    const cost = costs[type] || 35000;
    if (this.career.money < cost) {
      return { success: false, message: "Budget insufficiente per espandere l'HQ." };
    }

    this.career.money -= cost;
    this.career.hqUpgrades[type] = (this.career.hqUpgrades[type] || 0) + 1;
    this.saveToStorage();
    return { success: true, message: "Struttura HQ potenziata con successo!" };
  }

  // Acquisto oggetto di lusso / Lifestyle
  buyLifestyleItem(item) {
    if (this.career.money < item.price) {
      return { success: false, message: "Non hai abbastanza milioni per questo sfizio da celebrità." };
    }
    this.career.money -= item.price;
    this.career.lifestyleItems.push(item);
    this.player.attributes.marketability = Math.min(99, this.player.attributes.marketability + item.fameBonus);
    this.saveToStorage();
    return { success: true, message: `Hai acquistato: ${item.name} (+${item.fameBonus} Notorietà Globale)` };
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
          if (this.career.contract) {
            if (this.career.contract.durationYears === undefined) {
              this.career.contract.durationYears = this.career.contract.yearsLeft || 1;
            }
            if (this.career.contract.buyoutClause === undefined) {
              this.career.contract.buyoutClause = 0;
            }
          }
          this.syncAndReconcileStats();
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
