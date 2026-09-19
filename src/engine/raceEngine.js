import { db } from '../data/databaseManager.js';

export class RaceEngine {
  // Helper per generare il codice a 3 lettere F1/MotoGP (es. VER, HAM, NOR, BOT, PER, VEL)
  static getDriverCode(driverName, isPlayer = false) {
    if (isPlayer) {
      const parts = driverName.split(' ');
      const last = parts[parts.length - 1] || "PIL";
      return last.substring(0, 3).toUpperCase();
    }
    const parts = driverName.split(' ');
    const last = parts[parts.length - 1] || parts[0];
    return last.substring(0, 3).toUpperCase();
  }

  // Formattazione tempo sul giro (es. 1:19.482)
  static formatLapTime(totalSec) {
    if (isNaN(totalSec) || totalSec === null || totalSec <= 0) return "--:--.---";
    const minutes = Math.floor(totalSec / 60);
    const remainingSec = totalSec % 60;
    const secStr = remainingSec.toFixed(3).padStart(6, '0');
    return `${minutes}:${secStr}`;
  }

  // 1. Calcolo del feedback dell'ingegnere sull'assetto nelle prove libere
  static calculateSetupFeedback(playerDriver, setupSettings, circuit) {
    let optimalAero = 50;
    if (circuit.downforceLevel === 'low') optimalAero = 25; // Monza, Spa
    if (circuit.downforceLevel === 'high') optimalAero = 85; // Monaco, Hungaroring

    const aeroDiff = Math.abs(setupSettings.aeroLevel - optimalAero);
    const mechDiff = Math.abs(setupSettings.suspensionStiffness - (circuit.tyreStress > 3 ? 40 : 65));

    const feedbackSkill = (playerDriver.attributes.technicalFeedback || 75) / 100;
    const accuracy = Math.max(50, 100 - (aeroDiff * 0.4 + mechDiff * 0.4) * (1.2 - feedbackSkill * 0.4));

    return {
      setupMastery: Math.min(100, Math.round(accuracy)),
      lapTimeBonusSec: ((accuracy - 50) / 50) * 0.5, // Fino a 0.5s di guadagno
      advice: aeroDiff > 20 
        ? (setupSettings.aeroLevel < optimalAero ? "L'auto scivola nei curvoni veloci, serve più carico alare!" : "Siamo lenti in rettilineo, scarica l'ala!")
        : (mechDiff > 20 ? "Le sospensioni non assorbono bene i cordoli, ammorbidisci l'assetto." : "Assetto equilibrato! Ottimo compromesso tra stabilità e trazione.")
    };
  }

  // 1b. Calcolo impatto dell'assetto sull'usura gomme (aerodinamica, sospensioni, pressione)
  static calculateSetupTyreWearFactor(setupSettings, circuit) {
    if (!setupSettings) return { wearMultiplier: 1.0, feedback: 'Assetto Standard', wearDeltaPct: 0 };

    let optimalAero = 50;
    if (circuit.downforceLevel === 'low') optimalAero = 25;
    if (circuit.downforceLevel === 'high') optimalAero = 85;

    const circuitStress = circuit.tyreStress || 3;
    const optimalSusp = circuitStress >= 4 ? 40 : (circuitStress <= 2 ? 65 : 52);
    const optimalPress = 50 + (circuitStress - 3) * 4;

    // 1. Aerodinamica: se sottocarico -> scivolamento e usura battistrada rapida
    const aeroDelta = setupSettings.aeroLevel - optimalAero;
    const aeroWear = aeroDelta < 0 
      ? Math.abs(aeroDelta) * 0.0045 // Slittamento
      : aeroDelta * 0.0022;          // Carico verticale

    // 2. Sospensioni: se troppo rigide su pista sconnessa -> rimbalzi e usura violenta
    const suspDelta = setupSettings.suspensionStiffness - optimalSusp;
    const suspWear = circuitStress >= 4
      ? Math.max(0, suspDelta / 50) * 0.16
      : (suspDelta < -15 ? 0.07 : (suspDelta > 20 ? 0.05 : 0.0));

    // 3. Pressione gomme: sovrapressione = blistering centrale, sottopressione = usura spalla
    const pressDelta = setupSettings.tyrePressure - optimalPress;
    const pressWear = pressDelta > 0
      ? (pressDelta / 40) * 0.15
      : Math.abs(pressDelta / 40) * 0.11;

    const totalPenalty = aeroWear + suspWear + pressWear;
    // Se assetto ben centrato, guadagna bonus conservazione fino a -12%
    const wearMultiplier = Math.max(0.85, Math.min(1.45, 1.0 + totalPenalty - 0.06));
    const wearDeltaPct = Math.round((wearMultiplier - 1.0) * 100);

    let feedback = "Assetto Bilanciato";
    if (wearDeltaPct <= -5) feedback = "🟢 Assetto Ottimale (Gomme Protette)";
    else if (wearDeltaPct >= 16) feedback = "⚠️ Assetto Squilibrato (Degrado Elevato)";
    else if (wearDeltaPct >= 6) feedback = "🟡 Assetto Rigido/Scarico (Degrado Medio)";

    return {
      wearMultiplier,
      wearDeltaPct,
      feedback,
      aeroDelta,
      suspDelta,
      pressDelta
    };
  }

  // =========================================================================
  // PROVE LIBERE: STATO INIZIALE A ZERO & SIMULAZIONE A TEMPO
  // =========================================================================
  static initPracticeState(circuit, category, roster, playerDriver, playerCar, discipline = 'auto', sessionName = 'FP1') {
    const isWet = Math.random() < (circuit.rainChance || 0.15);
    const totalMinutes = 60;

    const drivers = [];
    // Giocatore
    drivers.push({
      driverId: "player",
      isPlayer: true,
      name: `${playerDriver.firstName} ${playerDriver.lastName}`,
      code: this.getDriverCode(playerDriver.lastName || playerDriver.firstName, true),
      teamId: playerCar.id,
      teamName: db.getTeamName(playerCar.id, discipline),
      color: playerCar.color || "#e10600",
      lapTimeSec: null,
      formattedTime: "--:--.---",
      gap: "-",
      s1: "-",
      s2: "-",
      s3: "-",
      compound: isWet ? "WET" : "MEDIUM",
      lapsRun: 0,
      status: "IN PIT",
      position: 1
    });

    // AI
    roster.forEach(ai => {
      const aiTeam = db.getTeam(ai.teamId, discipline);
      const dName = db.getDriverName(ai.id, discipline);
      drivers.push({
        driverId: ai.id,
        isPlayer: false,
        name: dName,
        code: this.getDriverCode(dName),
        teamId: ai.teamId,
        teamName: db.getTeamName(ai.teamId, discipline),
        color: aiTeam.color || "#888888",
        lapTimeSec: null,
        formattedTime: "--:--.---",
        gap: "-",
        s1: "-",
        s2: "-",
        s3: "-",
        compound: isWet ? "WET" : (Math.random() > 0.5 ? "HARD" : "MEDIUM"),
        lapsRun: 0,
        status: "IN PIT",
        position: drivers.length + 1
      });
    });

    return {
      sessionName,
      totalMinutes,
      timeRemainingMinutes: totalMinutes,
      elapsedMinutes: 0,
      isFinished: false,
      isWet,
      weatherText: isWet ? "🌧️ Asfalto Bagnato" : "☀️ Pista Asciutta",
      feedback: {
        setupMastery: 50,
        lapTimeBonusSec: 0,
        advice: "La monoposto è ai box a ruote ferme. Effettua uno stint di giri per raccogliere i primi dati telemetrici."
      },
      timingBoard: drivers,
      log: ["🟢 BANDIERA VERDE: Semaforo verde in corsia box, la sessione ha inizio!"]
    };
  }

  static stepPracticeTime(practiceState, minutesToAdvance, playerStint, playerDriver, playerCar, circuit, setupSettings, discipline = 'auto') {
    if (practiceState.isFinished) return practiceState;

    const baseCircuitSec = discipline === 'auto' ? circuit.baseLapTimeSecAuto : circuit.baseLapTimeSecMoto;
    practiceState.elapsedMinutes = Math.min(practiceState.totalMinutes, practiceState.elapsedMinutes + minutesToAdvance);
    practiceState.timeRemainingMinutes = Math.max(0, practiceState.totalMinutes - practiceState.elapsedMinutes);

    // AI stint simulation
    practiceState.timingBoard.forEach(d => {
      if (d.isPlayer) return;

      // 45% chance driver is out on track for a stint during this time slice
      if (Math.random() < 0.65 || practiceState.timeRemainingMinutes <= 10) {
        d.lapsRun += Math.floor(Math.random() * 3) + 2;
        d.status = "IN PISTA";

        const ai = db.getDriver(d.driverId, discipline) || {};
        const aiTeam = db.getTeam(d.teamId, discipline) || {};
        const aiBasePace = ai.pace || ai.ovr || 78;
        const aiCarPace = aiTeam.carPace || aiTeam.bikePace || 78;
        const rating = (aiBasePace * 0.55 + aiCarPace * 0.45);
        const variance = (Math.random() - 0.5) * 0.4;
        let weatherPenalty = 0;
        if (practiceState.isWet && d.compound !== "WET" && d.compound !== "INTER") {
          weatherPenalty = 8.5; // Huge penalty for slick in wet!
        }
        const lapSec = baseCircuitSec + 0.8 + (95 - rating) * 0.08 + variance + weatherPenalty;

        if (d.lapTimeSec === null || lapSec < d.lapTimeSec) {
          d.lapTimeSec = lapSec;
          d.s1 = Number((lapSec * 0.31 + (Math.random() - 0.5) * 0.06).toFixed(3));
          d.s2 = Number((lapSec * 0.41 + (Math.random() - 0.5) * 0.06).toFixed(3));
          d.s3 = Number((lapSec * 0.28 + (Math.random() - 0.5) * 0.06).toFixed(3));
          d.formattedTime = this.formatLapTime(lapSec);
        }
      } else {
        d.status = "IN PIT";
      }
    });

    // Se il giocatore ha effettuato uno stint
    if (playerStint) {
      const p = practiceState.timingBoard.find(d => d.isPlayer);
      if (p) {
        p.lapsRun += 4;
        p.status = "IN PISTA";

        const feedback = this.calculateSetupFeedback(playerDriver, setupSettings, circuit);
        practiceState.feedback = feedback;

        const pBasePace = playerDriver.attributes.pace || 75;
        const pCarPace = playerCar.carPace || playerCar.bikePace || 75;
        const rating = (pBasePace * 0.55 + pCarPace * 0.45);
        const variance = (Math.random() - 0.5) * 0.3;
        let weatherPenalty = 0;
        if (practiceState.isWet && p.compound !== "WET" && p.compound !== "INTER") {
          weatherPenalty = 9.0;
          practiceState.log.unshift("⚠️ TELEMETRIA: Giri su gomma d'asciutto con pista bagnata! Perdita enorme di aderenza e rischio aquaplaning!");
        }

        const pLapSec = baseCircuitSec + 0.8 + (95 - rating) * 0.08 - feedback.lapTimeBonusSec + variance + weatherPenalty;

        if (p.lapTimeSec === null || pLapSec < p.lapTimeSec) {
          p.lapTimeSec = pLapSec;
          p.s1 = Number((pLapSec * 0.31 + (Math.random() - 0.5) * 0.05).toFixed(3));
          p.s2 = Number((pLapSec * 0.41 + (Math.random() - 0.5) * 0.05).toFixed(3));
          p.s3 = Number((pLapSec * 0.28 + (Math.random() - 0.5) * 0.05).toFixed(3));
          p.formattedTime = this.formatLapTime(pLapSec);
          practiceState.log.unshift(`⏱️ GIRO VELOCE: Hai migliorato il tuo tempo sul giro: ${p.formattedTime}!`);
        }
      }
    }

    // Riordina la classifica: prima chi ha un tempo valido, poi chi non lo ha ancora registrato
    const timedDrivers = practiceState.timingBoard.filter(d => d.lapTimeSec !== null);
    const untimedDrivers = practiceState.timingBoard.filter(d => d.lapTimeSec === null);

    timedDrivers.sort((a, b) => a.lapTimeSec - b.lapTimeSec);
    const leaderTime = timedDrivers[0]?.lapTimeSec;

    timedDrivers.forEach((d, idx) => {
      d.position = idx + 1;
      d.gap = idx === 0 ? "LEADER" : `+${(d.lapTimeSec - leaderTime).toFixed(3)}s`;
    });

    untimedDrivers.forEach((d, idx) => {
      d.position = timedDrivers.length + idx + 1;
      d.gap = "-";
      d.formattedTime = "--:--.---";
    });

    practiceState.timingBoard = [...timedDrivers, ...untimedDrivers];

    if (practiceState.timeRemainingMinutes <= 0) {
      practiceState.isFinished = true;
      practiceState.log.unshift("🏁 BANDIERA A SCACCHI: Sessione di Prove Libere conclusa!");
    }

    return practiceState;
  }

  static fastForwardPracticeToEnd(practiceState, playerDriver, playerCar, circuit, setupSettings, discipline = 'auto') {
    while (!practiceState.isFinished) {
      this.stepPracticeTime(practiceState, 15, true, playerDriver, playerCar, circuit, setupSettings, discipline);
    }
    return practiceState;
  }

  // Legacy fallback per compatibilità
  static simulatePractice(playerDriver, playerCar, roster, circuit, setupSettings, discipline = 'auto', sessionName = 'FP1') {
    const state = this.initPracticeState(circuit, { id: 'generic' }, roster, playerDriver, playerCar, discipline, sessionName);
    this.fastForwardPracticeToEnd(state, playerDriver, playerCar, circuit, setupSettings, discipline);
    return state;
  }

  // =========================================================================
  // QUALIFICHE UFFICIALI: STATO INIZIALE A ZERO, TEMPO & SHOOTOUT
  // =========================================================================
  static initQualifyingState(circuit, category, roster, playerDriver, playerCar, setupBonusSec = 0, discipline = 'auto') {
    const isMultiStage = category.id === 'auto_f1' || category.id === 'moto_gp';
    const isWet = Math.random() < (circuit.rainChance || 0.15);
    const q1DurationSec = isMultiStage ? 18 * 60 : 15 * 60;

    const drivers = [];
    drivers.push({
      driverId: "player",
      isPlayer: true,
      name: `${playerDriver.firstName} ${playerDriver.lastName}`,
      code: this.getDriverCode(playerDriver.lastName || playerDriver.firstName, true),
      teamId: playerCar.id,
      teamName: db.getTeamName(playerCar.id, discipline),
      color: playerCar.color || "#e10600",
      lapTimeSec: null,
      formattedTime: "--:--.---",
      gap: "-",
      q1Time: "-",
      q2Time: "-",
      q3Time: "-",
      compound: isWet ? "WET" : "SOFT",
      lapsRun: 0,
      status: "IN PIT",
      eliminated: false,
      stageReached: "Q1",
      position: 1
    });

    roster.forEach(ai => {
      const aiTeam = db.getTeam(ai.teamId, discipline);
      const dName = db.getDriverName(ai.id, discipline);
      drivers.push({
        driverId: ai.id,
        isPlayer: false,
        name: dName,
        code: this.getDriverCode(dName),
        teamId: ai.teamId,
        teamName: db.getTeamName(ai.teamId, discipline),
        color: aiTeam.color || "#888888",
        lapTimeSec: null,
        formattedTime: "--:--.---",
        gap: "-",
        q1Time: "-",
        q2Time: "-",
        q3Time: "-",
        compound: isWet ? "WET" : "SOFT",
        lapsRun: 0,
        status: "IN PIT",
        eliminated: false,
        stageReached: "Q1",
        position: drivers.length + 1
      });
    });

    return {
      isMultiStage,
      currentPhase: isMultiStage ? "Q1" : "QUALY",
      phaseIndex: 1, // 1 = Q1, 2 = Q2, 3 = Q3
      phaseTimeTotalSec: q1DurationSec,
      phaseTimeRemainingSec: q1DurationSec,
      isFinished: false,
      isWet,
      weatherText: isWet ? "🌧️ Asfalto Bagnato" : "☀️ Pista Asciutta",
      setupBonusSec,
      grid: drivers,
      log: ["🟢 SEMAFORO VERDE QUALIFICHE: Inizia la caccia alla Pole Position!"]
    };
  }

  static stepQualifyingTime(qualyState, secondsToAdvance, playerHotLap, playerDriver, playerCar, circuit, discipline = 'auto') {
    if (qualyState.isFinished) return qualyState;

    const baseCircuitSec = discipline === 'auto' ? circuit.baseLapTimeSecAuto : circuit.baseLapTimeSecMoto;
    qualyState.phaseTimeRemainingSec = Math.max(0, qualyState.phaseTimeRemainingSec - secondsToAdvance);

    // AI Flying laps for non-eliminated drivers
    qualyState.grid.forEach(d => {
      if (d.isPlayer || d.eliminated) return;

      // Probability of going out for a push lap
      if (Math.random() < 0.35 || qualyState.phaseTimeRemainingSec <= 120) {
        d.lapsRun += 2;
        d.status = "IN PISTA";

        const ai = db.getDriver(d.driverId, discipline) || {};
        const aiTeam = db.getTeam(d.teamId, discipline) || {};
        const rating = ((ai.pace || ai.ovr || 78) * 0.55 + (aiTeam.carPace || aiTeam.bikePace || 78) * 0.45);
        const variance = (Math.random() - 0.5) * 0.45;
        let weatherPenalty = 0;
        if (qualyState.isWet && d.compound !== "WET" && d.compound !== "INTER") {
          weatherPenalty = 9.0;
        }

        const lapSec = baseCircuitSec + (95 - rating) * 0.08 + variance + weatherPenalty;

        if (d.lapTimeSec === null || lapSec < d.lapTimeSec) {
          d.lapTimeSec = lapSec;
          d.formattedTime = this.formatLapTime(lapSec);
          if (qualyState.currentPhase === "Q1") d.q1Time = d.formattedTime;
          else if (qualyState.currentPhase === "Q2") d.q2Time = d.formattedTime;
          else if (qualyState.currentPhase === "Q3") d.q3Time = d.formattedTime;
        }
      } else {
        d.status = "IN PIT";
      }
    });

    // Player push lap
    if (playerHotLap) {
      const p = qualyState.grid.find(d => d.isPlayer);
      if (p && !p.eliminated) {
        p.lapsRun += 2;
        p.status = "IN PISTA";

        const rating = ((playerDriver.attributes.pace || 75) * 0.55 + (playerCar.carPace || playerCar.bikePace || 75) * 0.45);
        const variance = (Math.random() - 0.5) * 0.3;
        let weatherPenalty = 0;
        if (qualyState.isWet && p.compound !== "WET" && p.compound !== "INTER") {
          weatherPenalty = 9.0;
          qualyState.log.unshift("⚠️ ATTENZIONE: Gomme slick su pista bagnata! Tempo sul giro compromesso dall'aquaplaning!");
        }

        const pLapSec = baseCircuitSec + (95 - rating) * 0.08 - qualyState.setupBonusSec + variance + weatherPenalty;

        if (p.lapTimeSec === null || pLapSec < p.lapTimeSec) {
          p.lapTimeSec = pLapSec;
          p.formattedTime = this.formatLapTime(pLapSec);
          if (qualyState.currentPhase === "Q1") p.q1Time = p.formattedTime;
          else if (qualyState.currentPhase === "Q2") p.q2Time = p.formattedTime;
          else if (qualyState.currentPhase === "Q3") p.q3Time = p.formattedTime;
          qualyState.log.unshift(`🔥 GIRO LANCIATO: ${p.name} registra ${p.formattedTime}!`);
        }
      }
    }

    // Re-ranking of non-eliminated drivers
    const activeTimed = qualyState.grid.filter(d => !d.eliminated && d.lapTimeSec !== null);
    const activeUntimed = qualyState.grid.filter(d => !d.eliminated && d.lapTimeSec === null);
    const eliminatedDrivers = qualyState.grid.filter(d => d.eliminated);

    activeTimed.sort((a, b) => a.lapTimeSec - b.lapTimeSec);
    const leaderTime = activeTimed[0]?.lapTimeSec;

    activeTimed.forEach((d, idx) => {
      d.position = idx + 1;
      d.gap = idx === 0 ? "POLE" : `+${(d.lapTimeSec - leaderTime).toFixed(3)}s`;
    });

    activeUntimed.forEach((d, idx) => {
      d.position = activeTimed.length + idx + 1;
      d.gap = "-";
      d.formattedTime = "--:--.---";
    });

    qualyState.grid = [...activeTimed, ...activeUntimed, ...eliminatedDrivers];

    // Controllo fine tempo della fase
    if (qualyState.phaseTimeRemainingSec <= 0) {
      if (qualyState.isMultiStage && qualyState.phaseIndex === 1) {
        // Fine Q1: elimina gli ultimi (es. P17-P22 in F1)
        qualyState.log.unshift("🏁 BANDIERA A SCACCHI Q1: Verdetto della prima sessione!");
        const cutIndex = Math.min(16, qualyState.grid.length - 4);
        qualyState.grid.slice(cutIndex).forEach(d => {
          d.eliminated = true;
          d.stageReached = "Q1";
        });
        qualyState.phaseIndex = 2;
        qualyState.currentPhase = "Q2";
        qualyState.phaseTimeTotalSec = 15 * 60;
        qualyState.phaseTimeRemainingSec = 15 * 60;
        // Reset tempi della fase corrente per i piloti passati
        qualyState.grid.filter(d => !d.eliminated).forEach(d => {
          d.lapTimeSec = null;
          d.status = "IN PIT";
        });
      } else if (qualyState.isMultiStage && qualyState.phaseIndex === 2) {
        // Fine Q2: elimina da P11 a P16
        qualyState.log.unshift("🏁 BANDIERA A SCACCHI Q2: Determinata la Top 10 per la Pole!");
        const cutIndex = 10;
        qualyState.grid.slice(cutIndex).forEach(d => {
          d.eliminated = true;
          d.stageReached = "Q2";
        });
        qualyState.phaseIndex = 3;
        qualyState.currentPhase = "Q3";
        qualyState.phaseTimeTotalSec = 12 * 60;
        qualyState.phaseTimeRemainingSec = 12 * 60;
        qualyState.grid.filter(d => !d.eliminated).forEach(d => {
          d.lapTimeSec = null;
          d.status = "IN PIT";
        });
      } else {
        // Fine Qualifiche definitive
        qualyState.isFinished = true;
        qualyState.log.unshift("👑 QUALIFICHE CONCLUSE: Griglia di Partenza Ufficiale stabilita!");
        qualyState.grid.forEach((d, idx) => {
          d.position = idx + 1;
        });
      }
    }

    return qualyState;
  }

  static fastForwardQualifyingToEnd(qualyState, playerDriver, playerCar, circuit, discipline = 'auto') {
    while (!qualyState.isFinished) {
      this.stepQualifyingTime(qualyState, 300, true, playerDriver, playerCar, circuit, discipline);
    }
    return qualyState;
  }

  // Fallback per griglia istantanea
  static simulateQualifying(playerDriver, playerCar, roster, circuit, setupBonusSec = 0, discipline = 'auto') {
    const state = this.initQualifyingState(circuit, { id: 'auto_f1' }, roster, playerDriver, playerCar, setupBonusSec, discipline);
    this.fastForwardQualifyingToEnd(state, playerDriver, playerCar, circuit, discipline);
    return state.grid;
  }

  // =========================================================================
  // GARA / SPRINT: GRIGLIA A ZERO, GIRI REALI, METEO DINAMICO & PIT STOP
  // =========================================================================
  static initRaceState(grid, circuit, category, isSprint = false, discipline = 'auto', setupSettings = null, playerDriver = null) {
    const baseCircuitLaps = (discipline === 'auto')
      ? (circuit.lapsF1 || circuit.laps || circuit.lapsMoto || 50)
      : (circuit.lapsMoto || circuit.laps || circuit.lapsF1 || 24);
    const lapsMultiplier = category.weekendFormat?.raceLapsMultiplier || 1.0;
    const sprintMultiplier = isSprint ? 0.35 : 1.0;
    const totalLaps = Math.max(8, Math.round(baseCircuitLaps * lapsMultiplier * sprintMultiplier));

    const initialRain = Math.random() < (circuit.rainChance || 0.15);
    const weatherCondition = initialRain ? "HEAVY_RAIN" : "DRY";

    // Regolamenti Pit Stop per tutte le categorie (F1, F2, WEC, IndyCar e categorie con soste da regolamento)
    const isF1 = discipline === 'auto' && category.id === 'auto_f1';
    const isMotoGP = discipline === 'moto' && category.id === 'moto_gp';

    const mandatoryPit = (category.weekendFormat?.pitStops === true || 
      ['auto_f1', 'auto_f2', 'auto_wec', 'auto_indy'].includes(category.id)) && !isSprint;
    const mandatoryTwoDryCompounds = isF1 && !initialRain;

    // Calcolo base usura per giro calibrato sulla durata della gara e lo stress asfalto
    const circuitStress = circuit.tyreStress || 3;
    const expectedMediumLaps = Math.max(6, Math.round(totalLaps * (0.42 + (3 - circuitStress) * 0.035)));
    const baseWearPerLap = Math.max(3.8, 80 / expectedMediumLaps);

    // Impatto assetto giocatore
    const playerSetupInfo = this.calculateSetupTyreWearFactor(setupSettings, circuit);

    const teamPitLapsUsed = {};
    const drivers = grid.map((g, idx) => {
      let startingTyre = initialRain ? "WET" : "MEDIUM";
      if (!initialRain) {
        if (isSprint) {
          startingTyre = g.position <= 8 ? "SOFT" : "MEDIUM";
        } else if (g.isPlayer) {
          startingTyre = "MEDIUM";
        } else {
          // Distribuzione strategica mescole per l'AI
          if (g.position <= 4) {
            startingTyre = (idx % 2 === 0) ? "MEDIUM" : "SOFT";
          } else if (g.position >= 15) {
            startingTyre = (idx % 2 === 0) ? "HARD" : "MEDIUM";
          } else {
            startingTyre = (idx % 3 === 0) ? "SOFT" : (idx % 3 === 1 ? "HARD" : "MEDIUM");
          }
        }
      }

      // Risolvi statistiche del pilota
      let tyreSkill = 75;
      let consistency = 75;
      let paceSkill = 75;
      let wetSkill = 75;
      let racecraft = 75;
      let reliability = 88;
      let setupWearMult = 1.0;
      let carPace = 75;

      if (g.isPlayer) {
        tyreSkill = playerDriver?.attributes?.tyreMgmt || 75;
        consistency = playerDriver?.attributes?.consistency || 75;
        paceSkill = playerDriver?.attributes?.pace || 75;
        wetSkill = playerDriver?.attributes?.wetSkill || 75;
        racecraft = playerDriver?.attributes?.racecraft || 75;
        reliability = 90;
        setupWearMult = playerSetupInfo.wearMultiplier;
        const pTeam = db.getTeam(g.teamId, discipline) || {};
        carPace = pTeam.carPace || pTeam.bikePace || 75;
      } else {
        const ai = db.getDriver(g.driverId, discipline) || {};
        tyreSkill = ai.tyreMgmt || ai.ovr || 75;
        consistency = ai.consistency || ai.ovr || 75;
        paceSkill = ai.pace || ai.ovr || 75;
        wetSkill = ai.wetSkill || ai.ovr || 75;
        racecraft = ai.racecraft || ai.ovr || 75;
        const aiTeam = db.getTeam(g.teamId, discipline) || {};
        carPace = aiTeam.carPace || aiTeam.bikePace || 75;
        reliability = aiTeam.reliability || 85;
        // Qualità assetto per l'AI basata sulla scuderia
        setupWearMult = Math.max(0.88, Math.min(1.20, 1.0 - ((carPace - 75) / 250)));
      }

      // Moltiplicatori abilità pilota su usura (pilota 95 = 0.80x, pilota 55 = 1.20x)
      const driverSkillFactor = Math.max(0.75, Math.min(1.35, 1.0 - ((tyreSkill - 75) / 100)));
      const driverConsFactor = Math.max(0.92, Math.min(1.08, 1.0 - ((consistency - 75) / 300)));
      const driverStatsMultiplier = driverSkillFactor * driverConsFactor;

      // Pianificazione soste ai box per l'AI
      const plannedPitLaps = [];
      if (!g.isPlayer && !isSprint) {
        const numStops = (category.id === 'auto_wec' || totalLaps >= 28) ? 2 : (mandatoryPit || totalLaps >= 14 ? 1 : 0);
        if (numStops === 1) {
          let baseLap = Math.round(totalLaps * 0.46);
          if (startingTyre === 'SOFT') baseLap = Math.round(totalLaps * 0.32);
          if (startingTyre === 'HARD') baseLap = Math.round(totalLaps * 0.62);
          let targetLap = Math.max(2, Math.min(totalLaps - 2, baseLap + ((idx % 3) - 1)));
          // Evita il doppio pit stop consecutivo per i compagni di squadra
          if (teamPitLapsUsed[g.teamId] && Math.abs(teamPitLapsUsed[g.teamId] - targetLap) <= 1) {
            targetLap += 2;
          }
          teamPitLapsUsed[g.teamId] = targetLap;
          plannedPitLaps.push(targetLap);
        } else if (numStops === 2) {
          const stop1 = Math.max(3, Math.round(totalLaps * 0.33) + ((idx % 3) - 1));
          const stop2 = Math.min(totalLaps - 2, Math.round(totalLaps * 0.67) + ((idx % 3) - 1));
          plannedPitLaps.push(stop1, stop2);
        }
      }

      // Distacco geometrico di partenza da piazzola griglia (~0.25s per posizione)
      const startGap = (g.position - 1) * 0.25;

      return {
        ...g,
        startPos: g.position,
        currentPos: g.position,
        lastPos: g.position,
        currentLap: 0,
        tyreCompound: startingTyre,
        tyreLife: 100,
        baseWearRate: baseWearPerLap,
        setupWearMultiplier: setupWearMult,
        driverStatsMultiplier,
        carPace,
        tyreSkill,
        consistency,
        paceSkill,
        wetSkill,
        racecraft,
        reliability,
        plannedPitLaps,
        pitStops: 0,
        compoundsUsed: [startingTyre],
        gapToLeaderSec: startGap,
        intervalAheadSec: g.position === 1 ? 0.0 : 0.25,
        status: "GRID",
        dnfReason: null,
        bestLapSec: null,
        paceMode: "BALANCED",
        powerMode: "STANDARD",
        hasDrs: false,
        flagToFlagSwapped: false,
        stopGoPenaltySec: 0
      };
    });

    return {
      totalLaps,
      currentLap: 0,
      gridPhase: true,
      isSprint,
      discipline,
      categoryId: category.id,
      mandatoryPit,
      mandatoryTwoDryCompounds,
      isMotoGP,
      setupWearInfo: playerSetupInfo,
      weather: {
        condition: weatherCondition,
        rainChance: circuit.rainChance || 0.15,
        lapsUntilChange: Math.floor(Math.random() * 20) + 12
      },
      safetyCar: false,
      safetyCarLapsLeft: 0,
      weatherText: initialRain ? "🌧️ Pioggia Battente (Bagnato)" : "☀️ Pista Asciutta",
      airTemp: initialRain ? "20°C" : "28°C",
      trackTemp: initialRain ? "23°C" : "42°C",
      drivers,
      log: ["🔴 SEMAFORI ACCESI: Vetture schierate sulla griglia di partenza. Pronti al via!"],
      finished: false,
      fastestLapHolder: null,
      fastestLapSec: null
    };
  }

  // Avanzamento di un giro di gara con usura fisica da assetti/piloti e pit stop AI
  static stepRaceLap(raceState, playerTactics, discipline = 'auto') {
    if (raceState.finished) return raceState;

    // Se eravamo sulla griglia, spegni i semafori e avvia il Giro 1!
    if (raceState.gridPhase) {
      raceState.gridPhase = false;
      raceState.currentLap = 1;
      raceState.drivers.forEach(d => {
        d.status = "RUNNING";
        d.currentLap = 1;
      });
      raceState.log.unshift("🟢 VIA AL GRAN PREMIO! Semafori spenti, scatto bruciante verso curva 1!");
      return raceState;
    }

    const lap = raceState.currentLap;
    const events = [];

    // 1. Meteo Dinamico
    raceState.weather.lapsUntilChange--;
    if (raceState.weather.lapsUntilChange <= 0 && Math.random() < 0.45) {
      if (raceState.weather.condition === "DRY") {
        raceState.weather.condition = "HEAVY_RAIN";
        raceState.weatherText = "🌧️ ALLERTA METEO: Pioggia Torrenziale in Pista!";
        events.push("🌧️ DILUVIO IN PISTA! L'asfalto è allagato: le gomme slick perdono aderenza!");
        if (raceState.isMotoGP) {
          events.push("🏳️ BANDIERA BIANCA: Flag-to-Flag attivo! Rientro ai box per cambio moto autorizzato!");
        }
      } else {
        raceState.weather.condition = "DRY";
        raceState.weatherText = "☀️ METEO: La pioggia è cessata, pista in rapida asciugatura!";
        events.push("☀️ LA PIOGGIA È CESSATA: Si forma la traiettoria asciutta, gomme da bagnato a rischio surriscaldamento!");
      }
      raceState.weather.lapsUntilChange = Math.floor(Math.random() * 25) + 15;
    }

    // 2. Safety Car
    if (raceState.safetyCar) {
      raceState.safetyCarLapsLeft--;
      if (raceState.safetyCarLapsLeft <= 0) {
        raceState.safetyCar = false;
        events.push("🟢 SAFETY CAR RIENTRA: Bandiera verde, riparte la bagarre!");
      }
    } else {
      if (Math.random() < 0.03 && lap > 2 && lap < raceState.totalLaps - 2) {
        raceState.safetyCar = true;
        raceState.safetyCarLapsLeft = Math.floor(Math.random() * 2) + 2;
        events.push(discipline === 'auto' 
          ? "🟡 SAFETY CAR IN PISTA: Detriti sul tracciato! Gruppo ricompattato."
          : "🟡 BANDIERA GIALLA: Caduta a centro gruppo! Distacchi congelati.");
      }
    }

    // 3. Simulazione per ciascun pilota
    const isWet = raceState.weather.condition === "HEAVY_RAIN" || raceState.weather.condition === "LIGHT_RAIN";

    raceState.drivers.forEach(driver => {
      if (driver.status !== "RUNNING" && driver.status !== "PITTING") return;

      // Se era ai box nel giro precedente, esce e torna in pista
      if (driver.status === "PITTING") {
        driver.status = "RUNNING";
        events.push(`🟢 PIT EXIT: ${driver.name} rientra in pista su gomme ${driver.tyreCompound} nuove!`);
      }

      // Tattiche giocatore
      if (driver.isPlayer && playerTactics) {
        driver.paceMode = playerTactics.paceMode || driver.paceMode;
        driver.powerMode = playerTactics.powerMode || driver.powerMode;

        // Esecuzione sosta ai box per il giocatore
        if (playerTactics.boxThisLap) {
          driver.status = "PITTING";
          driver.pitStops++;
          driver.tyreLife = 100;
          driver.tyreCompound = playerTactics.newCompound || (isWet ? "WET" : "HARD");
          driver.compoundsUsed.push(driver.tyreCompound);
          playerTactics.boxThisLap = false;
          const pitLoss = raceState.safetyCar ? 12 : (discipline === 'auto' ? 22 : 28);
          driver.gapToLeaderSec += pitLoss;
          events.push(`🛠️ SOSTA AI BOX per ${driver.name}: Montate gomme nuove ${driver.tyreCompound}! (${pitLoss}s fermo)`);
          return;
        }
      }

      // Usura gomme calcolata su: mescola + assetto + statistiche pilota + stile di guida
      let compoundMultiplier = 1.0;
      if (driver.tyreCompound === 'SOFT') compoundMultiplier = 1.60;
      if (driver.tyreCompound === 'MEDIUM') compoundMultiplier = 1.05;
      if (driver.tyreCompound === 'HARD') compoundMultiplier = 0.70;
      if (!isWet && (driver.tyreCompound === 'WET' || driver.tyreCompound === 'INTER')) compoundMultiplier = 3.50; // distruzione termica su asciutto
      if (isWet && ['SOFT', 'MEDIUM', 'HARD'].includes(driver.tyreCompound)) compoundMultiplier = 1.80; // slittamento

      let paceMultiplier = driver.paceMode === 'PUSH' ? 1.45 : (driver.paceMode === 'SAVE' ? 0.70 : 1.0);
      if (raceState.safetyCar) paceMultiplier = 0.20;

      const lapWear = driver.baseWearRate * compoundMultiplier * driver.setupWearMultiplier * driver.driverStatsMultiplier * paceMultiplier;
      driver.tyreLife = Math.max(0, driver.tyreLife - lapWear);

      // AI PIT STOP STRATEGY (Attiva su tutte le categorie!)
      if (!driver.isPlayer && !raceState.isSprint) {
        let aiNeedsPit = false;
        let aiTargetCompound = "HARD";

        // 1. Allerta Meteo: pioggia improvvisa con slick o pista asciugata con wet
        if (isWet && !['WET', 'INTER'].includes(driver.tyreCompound)) {
          aiNeedsPit = true;
          aiTargetCompound = "WET";
        } else if (!isWet && ['WET', 'INTER'].includes(driver.tyreCompound)) {
          aiNeedsPit = true;
          aiTargetCompound = "HARD";
        }
        // 2. Usura critica (< 20%)
        else if (driver.tyreLife < 20 && lap < raceState.totalLaps - 1) {
          aiNeedsPit = true;
        }
        // 3. Finestra programmata raggiunta
        else if (driver.plannedPitLaps.includes(lap)) {
          aiNeedsPit = true;
        }
        // 4. Opportunità Safety Car (pit stop scontato se la finestra è vicina)
        else if (raceState.safetyCar && driver.plannedPitLaps.some(l => Math.abs(l - lap) <= 3)) {
          aiNeedsPit = true;
        }

        if (aiNeedsPit) {
          // Selezione mescola ottimale
          if (isWet) {
            aiTargetCompound = "WET";
          } else {
            const remainingLaps = raceState.totalLaps - lap;
            // Se F1, assicurati di usare la 2ª mescola da asciutto obbligatoria
            if (raceState.mandatoryTwoDryCompounds) {
              const unusedDry = ['SOFT', 'MEDIUM', 'HARD'].filter(c => !driver.compoundsUsed.includes(c));
              aiTargetCompound = unusedDry[0] || (remainingLaps <= 6 ? "SOFT" : "HARD");
            } else {
              aiTargetCompound = remainingLaps <= 6 ? "SOFT" : (remainingLaps <= 12 ? "MEDIUM" : "HARD");
            }
          }

          driver.status = "PITTING";
          driver.pitStops++;
          driver.tyreLife = 100;
          driver.tyreCompound = aiTargetCompound;
          driver.compoundsUsed.push(aiTargetCompound);
          driver.plannedPitLaps = driver.plannedPitLaps.filter(l => l !== lap);

          const pitLoss = raceState.safetyCar ? 12 : (discipline === 'auto' ? 22 : 28);
          driver.gapToLeaderSec += pitLoss;
          events.push(`🛠️ PIT STOP AI: ${driver.name} rientra ai box al giro ${lap} e monta gomme ${aiTargetCompound}! (${pitLoss}s fermo)`);
          return;
        }
      }

      // Calcolo del ritmo sul giro con FISICA GOMME, MEZZO, PILOTA & METEO
      const vehiclePace = driver.carPace || 75;
      const driverPace = driver.paceSkill || 75;
      const isSpec = ['auto_f2', 'auto_f3', 'auto_f4', 'moto_2', 'moto_3'].includes(raceState.categoryId);
      const carWeight = isSpec ? 0.35 : 0.55;
      const driverWeight = 1.0 - carWeight;
      const effectiveRating = (driverPace * driverWeight) + (vehiclePace * carWeight);

      // Baseline delta rispetto al punto di riferimento 95 OVR (~0.04s per punto di valutazione)
      const paceDeltaSec = (95 - effectiveRating) * 0.04;

      let performanceDelta = (Math.random() - 0.5) * 0.30;
      if (driver.paceMode === 'PUSH') performanceDelta -= 0.28;
      if (driver.paceMode === 'SAVE') performanceDelta += 0.32;
      if (driver.powerMode === 'ATTACK') performanceDelta -= 0.22;

      // DRS vantaggio in scia (-0.35s al giro)
      if (driver.hasDrs) performanceDelta -= 0.35;

      // Vantaggio mescola morbida / penalità mescola dura
      if (driver.tyreCompound === 'SOFT') performanceDelta -= 0.25;
      if (driver.tyreCompound === 'HARD') performanceDelta += 0.20;

      // Penalità mescole errate sul bagnato / asciutto
      let spinChance = 0.0008;
      const driverWetSkill = driver.wetSkill || 75;
      const driverConsistency = driver.consistency || 75;
      const wetSkillFactor = Math.max(0.35, Math.min(1.65, 1.0 - ((driverWetSkill - 75) / 100)));
      const consFactor = Math.max(0.55, Math.min(1.45, 1.0 - ((driverConsistency - 75) / 150)));

      if (isWet && ['SOFT', 'MEDIUM', 'HARD'].includes(driver.tyreCompound)) {
        performanceDelta += 9.5;
        // Rischio instabilità/sbandata realistico: ~2.5% per giro, mitigato dal talento sul bagnato
        spinChance = 0.024 * wetSkillFactor * consFactor;
        if (driver.isPlayer) {
          events.push("⚠️ AQUAPLANING GRAVE: Le gomme slick galleggiano sull'acqua! Sosta necessaria.");
        }
      } else if (!isWet && ['WET', 'INTER'].includes(driver.tyreCompound)) {
        performanceDelta += 4.5;
        spinChance = 0.002 * consFactor;
      } else if (isWet) {
        // Gomme adatte (WET / INTER) su pista bagnata
        spinChance = 0.0025 * wetSkillFactor;
      } else {
        // Asciutto normale: probabilità base bassissima e calibrata sull'affidabilità scuderia e costanza
        const teamReliability = driver.reliability || 85;
        const relFactor = Math.max(0.5, 1.0 - ((teamReliability - 80) / 100));
        spinChance = (driver.isPlayer ? 0.0003 : 0.0009) * consFactor * relFactor;
      }

      // Penalità degrado battistrada ("the cliff")
      if (driver.tyreLife < 25) {
        performanceDelta += (25 - driver.tyreLife) * 0.18;
      }
      if (driver.tyreLife < 10) {
        performanceDelta += (10 - driver.tyreLife) * 0.35; // Usura estrema
      }

      // Se il battistrada è completamente esaurito (<= 0%)
      if (driver.tyreLife <= 0) {
        performanceDelta += 12.0; // Limp mode verso i box
        if (driver.isPlayer) {
          events.push("⚠️ FORATURA / DEGRADO TOTALE: Battistrada distrutto! La vettura perde oltre 12s al giro.");
          if (playerTactics && !playerTactics.boxThisLap) {
            playerTactics.boxThisLap = true;
            events.push("📻 RADIO MURETTO: 'Rientra subito ai box per il cambio gomme di emergenza!'");
          }
        }
        spinChance = Math.max(spinChance, 0.015);
      }

      // Controllo Evento di Instabilità (Testacoda vs Ritiro Definitivo)
      if (Math.random() < spinChance && !raceState.safetyCar) {
        // Nell'85% dei casi è un TESTACODA con perdita di tempo (+6-9s) da cui il pilota riparte
        // Solo nel 15% dei casi critici si verifica un DNF fatale a muro
        const isFatalCrash = Math.random() < 0.15;

        if (isFatalCrash) {
          driver.status = "DNF";
          driver.dnfReason = isWet 
            ? "Aquaplaning & Impatto contro le barriere" 
            : (discipline === 'auto' ? (driver.tyreLife <= 0 ? "Foratura & Rottura Sospensione" : "Contatto / Guasto Meccanico") : "Caduta ad Alta Velocità");
          events.push(`💥 RITIRO: ${driver.name} fuori gara! (${driver.dnfReason})`);
          return;
        } else {
          const spinLoss = Math.floor(Math.random() * 4) + 6; // 6 - 9 secondi persi
          driver.gapToLeaderSec += spinLoss;
          events.push(`🔄 TESTACODA: ${driver.name} si gira ma controlla il mezzo e riparte! (+${spinLoss}s persi)`);
        }
      }

      if (!raceState.safetyCar) {
        driver.gapToLeaderSec = Math.max(0, driver.gapToLeaderSec + paceDeltaSec + performanceDelta);
      }
    });

    // Riordina classifica considerando sia chi è in pista che chi è in pit lane
    const activeDrivers = raceState.drivers.filter(d => d.status === "RUNNING" || d.status === "PITTING");
    activeDrivers.sort((a, b) => a.gapToLeaderSec - b.gapToLeaderSec);

    if (activeDrivers.length > 0) {
      const minGap = activeDrivers[0].gapToLeaderSec;
      activeDrivers.forEach((d, idx) => {
        d.gapToLeaderSec -= minGap;
        d.lastPos = d.currentPos;
        d.currentPos = idx + 1;
        const interval = idx === 0 ? 0 : d.gapToLeaderSec - activeDrivers[idx - 1].gapToLeaderSec;
        d.intervalAheadSec = Math.max(0, interval);
        d.hasDrs = idx > 0 && d.intervalAheadSec < 1.0 && !isWet && !raceState.safetyCar && d.status === 'RUNNING';
      });
      raceState.fastestLapHolder = activeDrivers[0].name;
    }

    let dnfPos = activeDrivers.length + 1;
    const dnfDrivers = raceState.drivers.filter(d => d.status === "DNF");
    dnfDrivers.forEach(d => {
      d.lastPos = d.currentPos;
      d.currentPos = dnfPos++;
      d.hasDrs = false;
    });

    // FONDAMENTALE: aggiorna l'array raceState.drivers ordinato in-place per posizione corrente (P1, P2, P3...)
    raceState.drivers = [...activeDrivers, ...dnfDrivers];

    // Monitor sorpassi giocatore
    const player = raceState.drivers.find(d => d.isPlayer);
    if (player && (player.status === "RUNNING" || player.status === "PITTING")) {
      if (player.currentPos < player.lastPos) {
        events.push(`🏎️ SORPASSO! Hai conquistato la P${player.currentPos}!`);
      } else if (player.currentPos > player.lastPos) {
        events.push(`⚠️ ATTENZIONE: Sei scivolato in P${player.currentPos}.`);
      }
    }

    // Avanza giro
    raceState.currentLap++;
    if (raceState.currentLap > raceState.totalLaps) {
      raceState.finished = true;
      events.push("🏁 BANDIERA A SCACCHI: Il Gran Premio è giunto al termine!");

      // Verifica Penalità F1 (2 mescole asciutte diverse obbligatorie)
      if (raceState.mandatoryTwoDryCompounds && !isWet) {
        raceState.drivers.forEach(d => {
          const dryCompounds = d.compoundsUsed.filter(c => ['SOFT', 'MEDIUM', 'HARD'].includes(c));
          const uniqueDry = new Set(dryCompounds);
          if (uniqueDry.size < 2) {
            d.stopGoPenaltySec = 25;
            d.gapToLeaderSec += 25;
            events.push(`🛑 PENALITÀ 25s per ${d.name}: Regolamento F1 violato (mancato uso di 2 mescole asciutte diverse)!`);
          }
        });
        activeDrivers.sort((a, b) => a.gapToLeaderSec - b.gapToLeaderSec);
        activeDrivers.forEach((d, idx) => { d.currentPos = idx + 1; });
        raceState.drivers = [...activeDrivers, ...dnfDrivers];
      }
    }

    raceState.log.unshift(...events);
    if (raceState.log.length > 30) raceState.log.length = 30;

    return raceState;
  }

  static fastForwardToEnd(raceState, playerTactics, discipline = 'auto') {
    while (!raceState.finished) {
      // Gestione sosta strategica automatica del muretto per il giocatore durante la simulazione rapida
      const player = raceState.drivers.find(d => d.isPlayer);
      if (player && (player.status === "RUNNING" || player.status === "GRID") && !raceState.gridPhase) {
        const isWet = raceState.weather.condition === "HEAVY_RAIN" || raceState.weather.condition === "LIGHT_RAIN";
        const slickOnWet = isWet && ['SOFT', 'MEDIUM', 'HARD'].includes(player.tyreCompound);
        const wetOnDry = !isWet && ['WET', 'INTER'].includes(player.tyreCompound);
        const tyreCritical = player.tyreLife < 22 && raceState.currentLap < raceState.totalLaps - 1;
        const mandatoryNeeded = raceState.mandatoryPit && player.pitStops === 0 && raceState.currentLap >= Math.floor(raceState.totalLaps * 0.4);

        if (slickOnWet || wetOnDry || tyreCritical || mandatoryNeeded) {
          playerTactics.boxThisLap = true;
          if (isWet) {
            playerTactics.newCompound = "WET";
          } else if (raceState.mandatoryTwoDryCompounds) {
            const unusedDry = ['SOFT', 'MEDIUM', 'HARD'].filter(c => !player.compoundsUsed.includes(c));
            playerTactics.newCompound = unusedDry[0] || "HARD";
          } else {
            playerTactics.newCompound = player.tyreLife < 25 ? "HARD" : "MEDIUM";
          }
        }
      }

      this.stepRaceLap(raceState, playerTactics, discipline);
    }
    return raceState;
  }

  static calculatePoints(position, isSprint = false) {
    if (isSprint) {
      const sprintTable = [8, 7, 6, 5, 4, 3, 2, 1];
      return sprintTable[position - 1] || 0;
    } else {
      const raceTable = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
      return raceTable[position - 1] || 0;
    }
  }
}
