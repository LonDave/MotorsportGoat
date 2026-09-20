import { career } from '../engine/careerEngine.js';
import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';
import { RaceEngine } from '../engine/raceEngine.js';
import { ToastNotification } from './toastNotification.js';
import { DriverSkillsModal } from './driverSkillsModal.js';
import { MediaInterviewModal } from './mediaInterviewModal.js';

export class WeekendView {
  static render(container, onFinishWeekend) {
    const player = career.player;
    const careerData = career.career;
    const circuit = career.getNextCircuit();
    const catData = career.getCurrentCategoryData();
    const team = career.getPlayerTeam();

    if (!circuit) {
      container.innerHTML = `<div class="page-container text-center"><p>Nessun Gran Premio disponibile.</p><button id="btn-back-hub" class="modal-btn btn-primary">Torna alla Dashboard</button></div>`;
      container.querySelector('#btn-back-hub').onclick = onFinishWeekend;
      return;
    }

    // Determina la sequenza realistica delle sessioni in base al campionato e al circuito
    const sessionsList = this.getSessionsList(careerData.currentCategory, player.discipline, catData, circuit);

    // Stato del weekend di gara
    const state = {
      sessionsList,
      currentSessionIndex: 0,
      setupSettings: {
        aeroLevel: 50,
        suspensionStiffness: 50,
        tyrePressure: 50
      },
      practiceSelectedTyre: 'MEDIUM',
      qualySelectedTyre: 'SOFT',
      practiceStates: {},
      qualifyingStates: {},  // keyed by session.id (e.g. 'sprint_quali', 'quali')
      qualifyingState: null, // alias for the LAST completed qualifying session (used for race grid)
      raceState: null,
      playerTactics: {
        paceMode: 'BALANCED',
        powerMode: 'STANDARD',
        boxThisLap: false,
        newCompound: 'HARD'
      },
      startingCompound: 'MEDIUM',
      timingTowerMode: 'interval',
      simulationSpeed: 1,
      isAutoPlaying: false,
      autoPlayTimer: null,
      mobileRaceTab: 'cockpit'
    };

    const renderCurrentPhase = () => {
      if (state.autoPlayTimer) {
        clearInterval(state.autoPlayTimer);
        state.autoPlayTimer = null;
        state.isAutoPlaying = false;
      }

      const currentSession = state.sessionsList[state.currentSessionIndex];

      // Reset raceState when switching between sprint and race sessions
      if ((currentSession.type === 'sprint' || currentSession.type === 'race') && state.activeRaceSessionId !== currentSession.id) {
        state.raceState = null;
        state.activeRaceSessionId = currentSession.id;
      }

      if (currentSession.type === 'practice') {
        this.renderPracticeSession(container, state, currentSession, circuit, team, catData, player, renderCurrentPhase);
      } else if (currentSession.type === 'qualifying') {
        this.renderQualifyingSession(container, state, currentSession, circuit, team, catData, player, renderCurrentPhase);
      } else if (currentSession.type === 'sprint' || currentSession.type === 'race') {
        this.renderRaceSession(container, state, currentSession, circuit, team, catData, player, renderCurrentPhase);
      } else if (currentSession.type === 'podium') {
        this.renderPodiumSession(container, state, circuit, player, onFinishWeekend);
      }
    };

    renderCurrentPhase();
  }

  // Costruisce il calendario delle sessioni veritiero per la categoria e il circuito corrente
  static getSessionsList(categoryKey, discipline, catData, circuit) {
    const fmt = catData?.weekendFormat || {};
    const isReal = db.isRealNames;

    if (discipline === 'auto') {
      if (categoryKey === 'auto_f1') {
        // Controlla se questo circuito è un weekend Sprint F1
        const sprintCircuits = catData?.sprintCircuits || [];
        const isSprint = circuit && sprintCircuits.includes(circuit.id);

        if (isSprint) {
          // Weekend Sprint F1: FP1 + Sprint Qualifying + Sprint Race + Qualifying + Race
          return [
            { id: "fp1", name: "Prove Libere 1 (FP1)", type: "practice", sub: "Venerdì • Installazione e Messa a Punto Base" },
            { id: "sprint_quali", name: isReal ? "Sprint Shootout (Qualifiche Sprint)" : "Sprint Apex Shootout", type: "qualifying", sub: "Sabato Mattina • Griglia per la Gara Sprint" },
            { id: "sprint", name: isReal ? "Gara Sprint F1 (Sabato)" : "Sprint Apex Race (Sabato)", type: "sprint", sub: "Sabato Pomeriggio • 17 Giri con Punti Mondiali" },
            { id: "quali", name: isReal ? "Qualifiche Ufficiali (Q1-Q2-Q3)" : "Qualifiche Apex (Q1-Q2-Q3)", type: "qualifying", sub: "Sabato Sera • Shootout per la Pole Position" },
            { id: "race", name: isReal ? "Gran Premio della Domenica" : "Grand Prix Apex della Domenica", type: "race", sub: "Domenica • 100% Gara Mondiale" },
            { id: "podium", name: "Cerimonia del Podio", type: "podium", sub: "Premiazioni & Classifica Campionato" }
          ];
        } else {
          // Weekend Standard F1: FP1 + FP2 + FP3 + Qualifying + Race
          return [
            { id: "fp1", name: "Prove Libere 1 (FP1)", type: "practice", sub: "Venerdì • Installazione & Assetto Base" },
            { id: "fp2", name: "Prove Libere 2 (FP2)", type: "practice", sub: "Venerdì • Simulazione Passo Gara & Degrado Gomme" },
            { id: "fp3", name: "Prove Libere 3 (FP3)", type: "practice", sub: "Sabato Mattina • Simulazione Qualifica al Limite" },
            { id: "quali", name: isReal ? "Qualifiche Ufficiali (Q1-Q2-Q3)" : "Qualifiche Apex (Q1-Q2-Q3)", type: "qualifying", sub: "Sabato Pomeriggio • Shootout per la Pole Position" },
            { id: "race", name: isReal ? "Gran Premio della Domenica" : "Grand Prix Apex della Domenica", type: "race", sub: "Domenica • 100% Gara Mondiale" },
            { id: "podium", name: "Cerimonia del Podio", type: "podium", sub: "Premiazioni & Classifica Campionato" }
          ];
        }
      } else if (categoryKey === 'auto_wec') {
        // WEC Hypercar: 3 prove libere + Hyperpole + Gara endurance
        return [
          { id: "fp1", name: isReal ? "Free Practice 1 (Endurance)" : "Prove Libere Endurance 1", type: "practice", sub: "Giovedì • Verifica Affidabilità e Traiettorie" },
          { id: "fp2", name: isReal ? "Free Practice 2 (Endurance)" : "Prove Libere Endurance 2", type: "practice", sub: "Venerdì Mattina • Simulazione Stint Lunghi e Degrado" },
          { id: "fp3", name: isReal ? "Free Practice 3 (Endurance)" : "Prove Libere Endurance 3", type: "practice", sub: "Venerdì Pomeriggio • Ultime Verifiche Affidabilità" },
          { id: "quali", name: isReal ? "Hyperpole (Qualifiche WEC)" : "Hyperpole Endurance", type: "qualifying", sub: "Venerdì Sera • 6 Migliori Auto a Qualificarsi" },
          { id: "race", name: isReal ? "Gara Endurance WEC" : "Gara Endurance", type: "race", sub: "Sabato/Domenica • Distanza Endurance Multi-stint" },
          { id: "podium", name: "Cerimonia del Podio", type: "podium", sub: "Premiazioni & Classifica WEC" }
        ];
      } else if (categoryKey === 'auto_indy') {
        // IndyCar: 2 prove libere + qualifiche (1 giro secco) + gara
        return [
          { id: "fp1", name: isReal ? "Practice 1 (IndyCar)" : "Practice 1 Open Wheel USA", type: "practice", sub: "Venerdì • Messa a Punto Ovale/Stradale" },
          { id: "fp2", name: isReal ? "Practice 2 (IndyCar)" : "Practice 2 Open Wheel USA", type: "practice", sub: "Sabato Mattina • Ultimi Aggiustamenti Assetto" },
          { id: "quali", name: isReal ? "Qualifiche IndyCar (Fast 6)" : "Qualifiche Open Wheel Fast 6", type: "qualifying", sub: "Sabato Pomeriggio • Giro Secco per la Pole" },
          { id: "race", name: isReal ? "IndyCar Race" : "Open Wheel USA Race", type: "race", sub: "Domenica • Gara Ufficiale" },
          { id: "podium", name: "Cerimonia del Podio", type: "podium", sub: "Premiazioni" }
        ];
      } else if (categoryKey === 'auto_f2') {
        // Formula 2: 1 prove libere + qualifiche + Sprint Race (sabato) + Feature Race (domenica)
        return [
          { id: "fp1", name: isReal ? "Prove Libere F2" : "Prove Libere Formula 2 World Series", type: "practice", sub: "Venerdì • Sessione Unica di Messa a Punto" },
          { id: "quali", name: isReal ? "Qualifiche F2 (Griglia Feature Race)" : "Qualifiche Formula 2 World Series", type: "qualifying", sub: "Sabato Mattina • Griglia per la Feature Race (e Sprint invertita)" },
          { id: "sprint", name: isReal ? "Sprint Race F2 (Sabato)" : "Sprint Race Formula 2 (Sabato)", type: "sprint", sub: "Sabato Pomeriggio • Griglia Invertita Top 10, Punti Mondiali" },
          { id: "race", name: isReal ? "Feature Race F2 (Domenica)" : "Feature Race Formula 2 (Domenica)", type: "race", sub: "Domenica • Gara Principale con Punti Mondiali" },
          { id: "podium", name: "Cerimonia del Podio", type: "podium", sub: "Premiazioni F2" }
        ];
      } else {
        // Formula 3, Formula 4: prova libera unica + qualifica + gara
        return [
          { id: "fp1", name: "Prove Libere (Practice)", type: "practice", sub: "Sessione Unica di Messa a Punto" },
          { id: "quali", name: "Qualifiche Ufficiali", type: "qualifying", sub: "Griglia di Partenza" },
          { id: "race", name: "Gran Premio Ufficiale", type: "race", sub: "Gara di Campionato" },
          { id: "podium", name: "Cerimonia del Podio", type: "podium", sub: "Premiazioni" }
        ];
      }
    } else {
      if (categoryKey === 'moto_gp') {
        // MotoGP 2026: FP1 + Practice (pre-Q2) + Sprint Qualifying + Sprint Race + Qualifying + Race
        return [
          { id: "fp1", name: isReal ? "Free Practice 1 (FP1)" : "Free Practice 1 Moto Apex", type: "practice", sub: "Venerdì Mattina • Studio Traiettorie e Feeling" },
          { id: "practice", name: isReal ? "Practice Session (Pre-Q2)" : "Practice Pre-Qualifiche Moto Apex", type: "practice", sub: "Venerdì Pomeriggio • Top 10 Accesso Diretto Q2" },
          { id: "sprint_quali", name: isReal ? "Sprint Qualifying (Q1 & Q2 Sprint)" : "Sprint Qualifying Moto Apex", type: "qualifying", sub: "Sabato Mattina • Griglia per la Gara Sprint" },
          { id: "sprint", name: isReal ? "MotoGP Sprint Race (Sabato)" : "Moto Apex Sprint Race", type: "sprint", sub: "Sabato Pomeriggio • 50% dei Giri con Punti Mondiali" },
          { id: "quali", name: isReal ? "Qualifiche Ufficiali (Q1 & Q2)" : "Qualifiche Ufficiali Moto Apex (Q1 & Q2)", type: "qualifying", sub: "Sabato Sera • Caccia alla Pole Position" },
          { id: "race", name: isReal ? "Gran Premio della Domenica" : "Moto Apex Grand Prix della Domenica", type: "race", sub: "Domenica • GP Ufficiale 1000cc" },
          { id: "podium", name: "Cerimonia del Podio", type: "podium", sub: "Premiazioni & Inni Nazionali" }
        ];
      } else if (categoryKey === 'moto_sbk') {
        // WorldSBK: FP1 + FP2 + Superpole (sabato) + Gara 1 (sabato PM) + Superpole Race (domenica AM) + podio
        // Per semplicità giocabilità: FP1 + FP2 + Superpole + Sprint (Superpole Race) + Race (Gara 1) + Podio
        return [
          { id: "fp1", name: isReal ? "Free Practice 1 (WorldSBK)" : "Prove Libere 1 SBK Series", type: "practice", sub: "Venerdì Mattina • Messa a Punto Base" },
          { id: "fp2", name: isReal ? "Free Practice 2 (WorldSBK)" : "Prove Libere 2 SBK Series", type: "practice", sub: "Venerdì Pomeriggio • Assetto Definitivo" },
          { id: "quali", name: isReal ? "Superpole (Qualifiche WorldSBK)" : "Superpole SBK Series", type: "qualifying", sub: "Sabato Mattina • Giro Secco per la Pole Position" },
          { id: "race", name: isReal ? "Gara 1 WorldSBK (Sabato)" : "Gara 1 SBK Series (Sabato)", type: "race", sub: "Sabato Pomeriggio • Prima Gara Ufficiale con Punti Mondiali" },
          { id: "sprint", name: isReal ? "Superpole Race (Domenica Mattina)" : "Superpole Race SBK (Domenica)", type: "sprint", sub: "Domenica Mattina • Gara Corta 10 Giri con Punti Mondiali" },
          { id: "podium", name: "Cerimonia del Podio", type: "podium", sub: "Premiazioni & Classifica WorldSBK" }
        ];
      } else {
        // Moto3, Moto2: prove libere + qualifica + gara
        return [
          { id: "fp1", name: isReal ? "Free Practice (FP)" : "Free Practice Moto Junior", type: "practice", sub: "Assetto e Feeling Pneumatici" },
          { id: "quali", name: isReal ? "Qualifiche Ufficiali (Q1 & Q2)" : "Qualifiche Junior (Q1 & Q2)", type: "qualifying", sub: "Griglia di Partenza" },
          { id: "race", name: isReal ? "Gran Premio Ufficiale" : "Moto Junior Grand Prix", type: "race", sub: "Gara Mondiale" },
          { id: "podium", name: "Cerimonia del Podio", type: "podium", sub: "Podio" }
        ];
      }
    }
  }

  // Header della barra di avanzamento delle sessioni
  static renderSessionStepper(sessionsList, currentIndex) {
    return `
      <div class="weekend-stepper-bar">
        ${sessionsList.map((s, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          let stepLabel = "Sessione";
          if (s.type === 'practice') {
            if (s.id === 'fp1') stepLabel = 'FP1';
            else if (s.id === 'fp2') stepLabel = 'FP2';
            else if (s.id === 'fp3') stepLabel = 'FP3';
            else stepLabel = 'Prove';
          }
          if (s.type === 'qualifying') stepLabel = s.id === 'sprint_quali' ? 'SQ' : 'Qualifiche';
          if (s.type === 'sprint') stepLabel = 'Sprint';
          if (s.type === 'race') stepLabel = 'Gara';
          if (s.type === 'podium') stepLabel = 'Podio';

          return `
            <div class="stepper-step ${isCurrent ? 'current' : ''} ${isDone ? 'done' : ''}" title="${s.name}">
              <span class="step-badge">${isDone ? '✓' : idx + 1}</span>
              <span class="step-title">${stepLabel}</span>
            </div>
          `;
        }).join('<div class="stepper-line"></div>')}
      </div>
    `;
  }

  // =========================================================================
  // 1. PROVE LIBERE: A ZERO ASSOLUTO, TEMPO SCORREVOLE, METEO & GOMME
  // =========================================================================
  static renderPracticeSession(container, state, session, circuit, team, catData, player, nextPhase) {
    if (!state.practiceStates[session.id]) {
      state.practiceStates[session.id] = RaceEngine.initPracticeState(
        circuit, catData, career.getActiveRoster(catData.id), player, team, player.discipline, session.name
      );
    }

    const currentResult = state.practiceStates[session.id];
    const isFinished = currentResult.isFinished;

    container.innerHTML = `
      <div class="weekend-stage-wrapper">
        ${this.renderSessionStepper(state.sessionsList, state.currentSessionIndex)}

        <!-- HEADER SESSIONE CON OROLOGIO DIGITALE -->
        <div class="weekend-top-header">
          <div class="header-left">
            <span class="session-badge">${session.name.toUpperCase()}</span>
            <h2>${circuit.flag} Gran Premio di ${circuit.displayName}</h2>
            <div class="session-clock-pill">
              <span class="clock-icon">⏱️</span>
              <span>TEMPO RIMANENTE: <strong>${currentResult.timeRemainingMinutes}:00</strong> / ${currentResult.totalMinutes}:00</span>
              <span class="clock-weather-tag">${currentResult.weatherText}</span>
            </div>
          </div>

          <!-- CONTROLLI VELOCITÀ & SALTA SESSIONE -->
          <div class="session-speed-actions">
            <div class="speed-buttons-group">
              <button class="speed-btn ${state.simulationSpeed === 1 ? 'active' : ''}" data-speed="1">1x</button>
              <button class="speed-btn ${state.simulationSpeed === 2 ? 'active' : ''}" data-speed="2">2x</button>
              <button class="speed-btn ${state.simulationSpeed === 5 ? 'active' : ''}" data-speed="5">5x</button>
              <button class="speed-btn ${state.simulationSpeed === 10 ? 'active' : ''}" data-speed="10">10x ⚡</button>
            </div>

            ${!isFinished ? `
              <button id="btn-toggle-autoplay-practice" class="btn-play-pause ${state.isAutoPlaying ? 'pause' : 'play'}">
                ${state.isAutoPlaying ? '⏸ PAUSA' : '▶ AVVIA PROVE'}
              </button>
              <button id="btn-step-5min-practice" class="speed-ctrl-btn">
                <span>+5 Minuti ⏩</span>
              </button>
              <button id="btn-skip-practice" class="speed-ctrl-btn skip pulse-glow" title="Simula istantaneamente tutti i minuti rimanenti della sessione">
                <span>⏭️ Salta Sessione</span>
              </button>
            ` : `
              <button id="btn-proceed-next-session" class="speed-ctrl-btn next pulse-glow">
                <span>Avanza alla Sessione Successiva ➔</span>
              </button>
            `}
          </div>
        </div>

        <!-- GRIGLIA PRINCIPALE: ASSETTO/STINT + TABELLA TEMPI LIVE -->
        <div class="practice-stage-grid">
          <!-- Colonna Sinistra: Regolazione Assetto, Scelta Gomme & Stint -->
          <div class="practice-controls-col">
            <div class="dash-card setup-sliders-card">
              <div class="card-title-row">
                <h3 class="card-title">Messa a Punto Assetto Meccanico & Aero</h3>
                <span class="setup-gain-badge">Guadagno Stimato: -${currentResult.feedback.lapTimeBonusSec.toFixed(3)}s</span>
              </div>
              <p class="section-subtext">Regola i parametri e scegli la mescola per mandare la monoposto in pista.</p>

              <div class="slider-group-box">
                <div class="slider-item">
                  <div class="slider-label-row">
                    <span>Carico Aerodinamico</span>
                    <strong id="val-aero">${state.setupSettings.aeroLevel}%</strong>
                  </div>
                  <input type="range" id="range-aero" min="10" max="90" value="${state.setupSettings.aeroLevel}" class="motorsport-range">
                  <div class="range-endpoints">
                    <small>Basso Carico (Monza/Spa)</small>
                    <small>Alto Carico (Monaco/Hungaroring)</small>
                  </div>
                </div>

                <div class="slider-item">
                  <div class="slider-label-row">
                    <span>Rigidità Sospensioni</span>
                    <strong id="val-susp">${state.setupSettings.suspensionStiffness}%</strong>
                  </div>
                  <input type="range" id="range-susp" min="10" max="90" value="${state.setupSettings.suspensionStiffness}" class="motorsport-range">
                  <div class="range-endpoints">
                    <small>Morbida (Cordoli & Trazione)</small>
                    <small>Rigida (Reattività & Stabilità)</small>
                  </div>
                </div>

                <div class="slider-item">
                  <div class="slider-label-row">
                    <span>Pressione Pneumatici</span>
                    <strong id="val-tyres">${state.setupSettings.tyrePressure}%</strong>
                  </div>
                  <input type="range" id="range-tyres" min="10" max="90" value="${state.setupSettings.tyrePressure}" class="motorsport-range">
                  <div class="range-endpoints">
                    <small>Bassa (Grip Immediato)</small>
                    <small>Alta (Conservazione Gomma)</small>
                  </div>
                </div>
              </div>

              <!-- Selettore Gomme per lo Stint -->
              <div class="practice-tyre-choice-row">
                <label>Mescola per lo Stint:</label>
                <select id="select-practice-tyre" class="dark-select">
                  <option value="SOFT" ${state.practiceSelectedTyre === 'SOFT' ? 'selected' : ''}>🔴 Gomme Soft (Veloci, alto degrado)</option>
                  <option value="MEDIUM" ${state.practiceSelectedTyre === 'MEDIUM' ? 'selected' : ''}>🟡 Gomme Medium (Equilibrate)</option>
                  <option value="HARD" ${state.practiceSelectedTyre === 'HARD' ? 'selected' : ''}>⚪ Gomme Hard (Lunga percorrenza)</option>
                  <option value="INTER" ${state.practiceSelectedTyre === 'INTER' ? 'selected' : ''}>🟢 Intermedie (Pioggia leggera/umido)</option>
                  <option value="WET" ${state.practiceSelectedTyre === 'WET' ? 'selected' : ''}>🔵 Gomme Wet (Bagnato estremo)</option>
                </select>
              </div>

              <div class="practice-action-buttons">
                <button id="btn-run-stint" class="btn-primary-action" ${isFinished ? 'disabled' : ''}>
                  <span>⏱️ Manda in Pista • Esegui Stint</span>
                </button>
              </div>

              <!-- Radio Box Ingegnere -->
              <div class="engineer-radio-card">
                <div class="radio-head">
                  <span class="radio-icon">📻</span>
                  <strong>Muretto Box Telemetria:</strong>
                </div>
                <p class="radio-quote">"${currentResult.feedback.advice}"</p>
                <div class="confidence-bar-box">
                  <span>Fiducia Assetto: <strong>${currentResult.feedback.setupMastery}%</strong></span>
                  <div class="confidence-track">
                    <div class="confidence-fill" style="width: ${currentResult.feedback.setupMastery}%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Colonna Destra: Classifica dei Tempi Live -->
          <div class="practice-timing-col">
            <div class="dash-card timing-board-card">
              <div class="card-title-row">
                <h3 class="card-title">Classifica dei Tempi Ufficiale • ${session.name}</h3>
                <span class="timing-count-badge">${currentResult.timingBoard.length} Piloti Iscritti</span>
              </div>
              <p class="section-subtext">Classifica progressiva sul giro secco. All'inizio della sessione tutti i piloti sono al box a zero giri.</p>

              <div class="timing-table-wrapper">
                <table class="timing-tower-table">
                  <thead>
                    <tr>
                      <th class="text-center" style="width: 45px;">POS</th>
                      <th>PILOTA</th>
                      <th>SCUDERIA</th>
                      <th class="text-center">GOMMA</th>
                      <th class="text-center">SETTORE 1</th>
                      <th class="text-center">SETTORE 2</th>
                      <th class="text-center">SETTORE 3</th>
                      <th class="text-right">TEMPO MIGLIORE</th>
                      <th class="text-right">DISTACCO</th>
                      <th class="text-center">GIRI</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${currentResult.timingBoard.map(p => {
                      let tyreBadge = '<span class="tyre-circle medium">M</span>';
                      if (p.compound === 'SOFT') tyreBadge = '<span class="tyre-circle soft">S</span>';
                      if (p.compound === 'HARD') tyreBadge = '<span class="tyre-circle hard">H</span>';
                      if (p.compound === 'INTER') tyreBadge = '<span class="tyre-circle inter">I</span>';
                      if (p.compound === 'WET') tyreBadge = '<span class="tyre-circle wet">W</span>';

                      return `
                        <tr class="${p.isPlayer ? 'player-timing-row' : ''}">
                          <td class="pos-badge-cell text-center">
                            <span class="badge pos-${p.position}">${p.position}</span>
                          </td>
                          <td class="pilot-cell">
                            <span class="team-bar" style="background:${p.color || '#888'}"></span>
                            <strong>${p.name}</strong>
                            <small class="driver-code-tag">${p.code}</small>
                            ${p.isPlayer ? '<span class="you-tag">TU</span>' : ''}
                            <small class="status-tag ${p.status === 'IN PISTA' ? 'on-track' : 'in-pit'}">${p.status}</small>
                          </td>
                          <td class="team-name-cell">${p.teamName}</td>
                          <td class="text-center">${tyreBadge}</td>
                          <td class="sector-time text-center">${p.s1 !== '-' ? `${p.s1}s` : '-'}</td>
                          <td class="sector-time text-center">${p.s2 !== '-' ? `${p.s2}s` : '-'}</td>
                          <td class="sector-time text-center">${p.s3 !== '-' ? `${p.s3}s` : '-'}</td>
                          <td class="lap-time-cell text-right"><strong>${p.formattedTime}</strong></td>
                          <td class="gap-cell text-right">${p.gap}</td>
                          <td class="laps-run-cell text-center"><small>${p.lapsRun} Giri</small></td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    const aeroRange = container.querySelector('#range-aero');
    const suspRange = container.querySelector('#range-susp');
    const tyreRange = container.querySelector('#range-tyres');
    if (aeroRange) aeroRange.oninput = (e) => { state.setupSettings.aeroLevel = parseInt(e.target.value, 10); container.querySelector('#val-aero').textContent = `${state.setupSettings.aeroLevel}%`; };
    if (suspRange) suspRange.oninput = (e) => { state.setupSettings.suspensionStiffness = parseInt(e.target.value, 10); container.querySelector('#val-susp').textContent = `${state.setupSettings.suspensionStiffness}%`; };
    if (tyreRange) tyreRange.oninput = (e) => { state.setupSettings.tyrePressure = parseInt(e.target.value, 10); container.querySelector('#val-tyres').textContent = `${state.setupSettings.tyrePressure}%`; };

    const tyreSelect = container.querySelector('#select-practice-tyre');
    if (tyreSelect) {
      tyreSelect.onchange = (e) => {
        state.practiceSelectedTyre = e.target.value;
        const playerItem = currentResult.timingBoard.find(d => d.isPlayer);
        if (playerItem) playerItem.compound = e.target.value;
      };
    }

    // Velocità
    container.querySelectorAll('.speed-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playClick();
        state.simulationSpeed = parseInt(btn.dataset.speed, 10);
        if (state.isAutoPlaying) {
          this.startPracticeAutoPlay(container, state, session, circuit, team, catData, player, nextPhase);
        }
        this.renderPracticeSession(container, state, session, circuit, team, catData, player, nextPhase);
      };
    });

    // Toggle Play/Pausa
    const toggleBtn = container.querySelector('#btn-toggle-autoplay-practice');
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        sound.playClick();
        if (state.isAutoPlaying) {
          if (state.autoPlayTimer) clearInterval(state.autoPlayTimer);
          state.autoPlayTimer = null;
          state.isAutoPlaying = false;
        } else {
          state.isAutoPlaying = true;
          this.startPracticeAutoPlay(container, state, session, circuit, team, catData, player, nextPhase);
        }
        this.renderPracticeSession(container, state, session, circuit, team, catData, player, nextPhase);
      };
    }

    // +5 Minuti
    const step5Btn = container.querySelector('#btn-step-5min-practice');
    if (step5Btn) {
      step5Btn.onclick = () => {
        sound.playRadioBeep();
        RaceEngine.stepPracticeTime(currentResult, 5, false, player, team, circuit, state.setupSettings, player.discipline);
        this.renderPracticeSession(container, state, session, circuit, team, catData, player, nextPhase);
      };
    }

    // Esegui Stint
    const runStintBtn = container.querySelector('#btn-run-stint');
    if (runStintBtn) {
      runStintBtn.onclick = () => {
        sound.playEngineRev();
        RaceEngine.stepPracticeTime(currentResult, 5, true, player, team, circuit, state.setupSettings, player.discipline);
        ToastNotification.show("⏱️ Stint completato! Telemetria e intertempi aggiornati.", "info");
        this.renderPracticeSession(container, state, session, circuit, team, catData, player, nextPhase);
      };
    }

    // Salta sessione
    const skipPracticeBtn = container.querySelector('#btn-skip-practice');
    if (skipPracticeBtn) {
      skipPracticeBtn.onclick = () => {
        sound.playRadioBeep();
        if (state.autoPlayTimer) clearInterval(state.autoPlayTimer);
        state.isAutoPlaying = false;
        RaceEngine.fastForwardPracticeToEnd(currentResult, player, team, circuit, state.setupSettings, player.discipline);
        ToastNotification.show("⏭️ Sessione completata con successo! Tempi definitivi calcolati.", "success");
        this.renderPracticeSession(container, state, session, circuit, team, catData, player, nextPhase);
      };
    }

    // Procedi
    const proceedBtn = container.querySelector('#btn-proceed-next-session');
    if (proceedBtn) {
      proceedBtn.onclick = () => {
        sound.playClick();
        state.currentSessionIndex++;
        nextPhase();
      };
    }
  }

  // Autoplay per Prove Libere
  static startPracticeAutoPlay(container, state, session, circuit, team, catData, player, nextPhase) {
    if (state.autoPlayTimer) clearInterval(state.autoPlayTimer);
    const speedMs = { 1: 600, 2: 300, 5: 120, 10: 60 }[state.simulationSpeed] || 400;

    state.autoPlayTimer = setInterval(() => {
      const curState = state.practiceStates[session.id];
      if (curState.isFinished) {
        clearInterval(state.autoPlayTimer);
        state.autoPlayTimer = null;
        state.isAutoPlaying = false;
        sound.playChequeredFlag();
        this.renderPracticeSession(container, state, session, circuit, team, catData, player, nextPhase);
        return;
      }

      RaceEngine.stepPracticeTime(curState, 2, false, player, team, circuit, state.setupSettings, player.discipline);
      this.renderPracticeSession(container, state, session, circuit, team, catData, player, nextPhase);
    }, speedMs);
  }

  // =========================================================================
  // 2. QUALIFICHE: A ZERO ASSOLUTO, CONTO ALLA ROVESCIA, METEO & GOMME
  // =========================================================================
  static renderQualifyingSession(container, state, session, circuit, team, catData, player, nextPhase) {
    if (!state.qualifyingStates[session.id]) {
      const bestBonus = Object.values(state.practiceStates).reduce((max, r) => {
        return Math.max(max, r?.feedback?.lapTimeBonusSec || 0);
      }, 0);

      state.qualifyingStates[session.id] = RaceEngine.initQualifyingState(
        circuit, catData, career.getActiveRoster(catData.id), player, team, bestBonus, player.discipline
      );
    }
    // aggiorna l'alias qualifyingState con lo stato più recente (usato per la griglia di gara)
    state.qualifyingState = state.qualifyingStates[session.id];

    const qualy = state.qualifyingState;
    const isFinished = qualy.isFinished;
    const playerItem = qualy.grid.find(p => p.isPlayer);
    const isPole = isFinished && playerItem && playerItem.position === 1;

    const minStr = Math.floor(qualy.phaseTimeRemainingSec / 60);
    const secStr = (qualy.phaseTimeRemainingSec % 60).toString().padStart(2, '0');

    container.innerHTML = `
      <div class="weekend-stage-wrapper">
        ${this.renderSessionStepper(state.sessionsList, state.currentSessionIndex)}

        <!-- HEADER QUALIFICHE CON COUNTDOWN TEMPORALE -->
        <div class="weekend-top-header">
          <div class="header-left">
            <span class="session-badge">${qualy.currentPhase} • SHOOTOUT</span>
            <h2>${circuit.flag} Griglia di Partenza • ${circuit.displayName}</h2>
            <div class="session-clock-pill">
              <span class="clock-icon">⏱️</span>
              <span>TEMPO FASE ${qualy.currentPhase}: <strong>${minStr}:${secStr}</strong></span>
              <span class="clock-weather-tag">${qualy.weatherText}</span>
            </div>
          </div>

          <!-- CONTROLLI VELOCITÀ & SALTA -->
          <div class="session-speed-actions">
            <div class="speed-buttons-group">
              <button class="speed-btn ${state.simulationSpeed === 1 ? 'active' : ''}" data-speed="1">1x</button>
              <button class="speed-btn ${state.simulationSpeed === 2 ? 'active' : ''}" data-speed="2">2x</button>
              <button class="speed-btn ${state.simulationSpeed === 5 ? 'active' : ''}" data-speed="5">5x</button>
              <button class="speed-btn ${state.simulationSpeed === 10 ? 'active' : ''}" data-speed="10">10x ⚡</button>
            </div>

            ${!isFinished ? `
              <button id="btn-toggle-autoplay-qualy" class="btn-play-pause ${state.isAutoPlaying ? 'pause' : 'play'}">
                ${state.isAutoPlaying ? '⏸ PAUSA' : '▶ AVVIA QUALIFICHE'}
              </button>
              <button id="btn-step-qualy" class="speed-ctrl-btn">
                <span>+3 Minuti ⏩</span>
              </button>
              <button id="btn-player-hotlap" class="speed-ctrl-btn pulse-glow" ${playerItem?.eliminated ? 'disabled' : ''}>
                <span>🔥 Fai Giro Lanciato</span>
              </button>
              <button id="btn-skip-quali" class="speed-ctrl-btn skip" title="Simula istantaneamente tutte le fasi rimanenti">
                <span>⏭️ Salta Qualifiche</span>
              </button>
            ` : `
              <button id="btn-start-race-action" class="speed-ctrl-btn start-race pulse-glow">
                <span>Schierati sulla Griglia di Partenza 🏁</span>
              </button>
            `}
          </div>
        </div>

        ${isFinished ? `
          <!-- HERO RISULTATO FINALE QUALIFICHE -->
          <div class="quali-results-summary-card ${isPole ? 'pole-celebration' : ''}">
            <div class="quali-summary-flex">
              <div class="grid-slot-display">
                <span class="slot-label">LA TUA POSIZIONE IN GRIGLIA</span>
                <strong class="slot-big-number pos-${playerItem.position}">P${playerItem.position}</strong>
                <span class="slot-time">${playerItem.formattedTime} (${playerItem.gap})</span>
              </div>
              <div class="quali-message">
                ${isPole ? `
                  <h3 class="pole-title">👑 POLE POSITION MONDIALE!</h3>
                  <p>Prestazione stratosferica! Scatterai in testa al gruppo dalla prima casella della griglia.</p>
                ` : playerItem.position <= 4 ? `
                  <h3>PRIMA / SECONDA FILA CONQUISTATA! 🔥</h3>
                  <p>Posizione di vertice per attaccare la vittoria fin dallo stacco della frizione.</p>
                ` : `
                  <h3>QUALIFICA COMPLETATA IN P${playerItem.position}</h3>
                  <p>Partirai nel cuore del gruppo. Sarà fondamentale una grande partenza e la giusta strategia gomme.</p>
                `}
              </div>
            </div>
          </div>
        ` : ''}

        <!-- TABELLA QUALIFICHE -->
        <div class="dash-card timing-board-card">
          <div class="card-title-row">
            <h3 class="card-title">Classifica Tempi Qualifiche • Fase Attuale: ${qualy.currentPhase}</h3>
            <span class="timing-count-badge">${qualy.grid.filter(d => !d.eliminated).length} Piloti Attivi</span>
          </div>
          <p class="section-subtext">I piloti escono dai box per completare i loro tentativi cronometrati prima della bandiera a scacchi.</p>

          <div class="timing-table-wrapper">
            <table class="timing-tower-table full-quali-table">
              <thead>
                <tr>
                  <th class="text-center" style="width: 45px;">POS</th>
                  <th>PILOTA</th>
                  <th>SCUDERIA</th>
                  <th class="text-center">Q1</th>
                  <th class="text-center">Q2</th>
                  <th class="text-center">Q3</th>
                  <th class="text-right">TEMPO MIGLIORE</th>
                  <th class="text-right">DISTACCO</th>
                </tr>
              </thead>
              <tbody>
                ${qualy.grid.map((p, idx) => {
                  let cutOffRow = '';
                  if (qualy.isMultiStage) {
                    if (idx === 10 && qualy.currentPhase !== "Q3") {
                      cutOffRow = `<tr class="cutoff-line-row q2-cutoff"><td colspan="8">── TAGLIO TOP 10 (QUALIFICATI PER Q3 SHOOTOUT) ──</td></tr>`;
                    } else if (idx === 16 && qualy.currentPhase === "Q1") {
                      cutOffRow = `<tr class="cutoff-line-row q1-cutoff"><td colspan="8">── ZONA ELIMINAZIONE Q1 (P17-P22) ──</td></tr>`;
                    }
                  }

                  return `
                    ${cutOffRow}
                    <tr class="${p.isPlayer ? 'player-timing-row' : ''} ${p.eliminated ? 'eliminated-row' : ''}">
                      <td class="pos-badge-cell text-center">
                        <span class="badge pos-${p.position}">${p.position}</span>
                      </td>
                      <td class="pilot-cell">
                        <span class="team-bar" style="background:${p.color || '#888'}"></span>
                        <strong>${p.name}</strong>
                        <small class="driver-code-tag">${p.code}</small>
                        ${p.isPlayer ? '<span class="you-tag">TU</span>' : ''}
                        ${p.eliminated ? `<span class="eliminated-tag">OUT in ${p.stageReached}</span>` : `<small class="status-tag ${p.status === 'IN PISTA' ? 'on-track' : 'in-pit'}">${p.status}</small>`}
                      </td>
                      <td class="team-name-cell">${p.teamName}</td>
                      <td class="sector-time text-center">${p.q1Time}</td>
                      <td class="sector-time text-center">${p.q2Time}</td>
                      <td class="sector-time text-center ${p.q3Time !== '-' ? 'q3-active' : ''}">${p.q3Time}</td>
                      <td class="lap-time-cell text-right"><strong>${p.formattedTime}</strong></td>
                      <td class="gap-cell text-right">${p.gap}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    container.querySelectorAll('.speed-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playClick();
        state.simulationSpeed = parseInt(btn.dataset.speed, 10);
        if (state.isAutoPlaying) {
          this.startQualyAutoPlay(container, state, session, circuit, team, catData, player, nextPhase);
        }
        this.renderQualifyingSession(container, state, session, circuit, team, catData, player, nextPhase);
      };
    });

    const toggleQualyBtn = container.querySelector('#btn-toggle-autoplay-qualy');
    if (toggleQualyBtn) {
      toggleQualyBtn.onclick = () => {
        sound.playClick();
        if (state.isAutoPlaying) {
          if (state.autoPlayTimer) clearInterval(state.autoPlayTimer);
          state.autoPlayTimer = null;
          state.isAutoPlaying = false;
        } else {
          state.isAutoPlaying = true;
          this.startQualyAutoPlay(container, state, session, circuit, team, catData, player, nextPhase);
        }
        this.renderQualifyingSession(container, state, session, circuit, team, catData, player, nextPhase);
      };
    }

    const stepQualyBtn = container.querySelector('#btn-step-qualy');
    if (stepQualyBtn) {
      stepQualyBtn.onclick = () => {
        sound.playRadioBeep();
        RaceEngine.stepQualifyingTime(qualy, 180, false, player, team, circuit, player.discipline);
        this.renderQualifyingSession(container, state, session, circuit, team, catData, player, nextPhase);
      };
    }

    const hotlapBtn = container.querySelector('#btn-player-hotlap');
    if (hotlapBtn) {
      hotlapBtn.onclick = () => {
        sound.playEngineRev();
        RaceEngine.stepQualifyingTime(qualy, 180, true, player, team, circuit, player.discipline);
        ToastNotification.show("🔥 Giro lanciato completato! Tempo sul giro registrato.", "info");
        this.renderQualifyingSession(container, state, session, circuit, team, catData, player, nextPhase);
      };
    }

    const skipQualiBtn = container.querySelector('#btn-skip-quali');
    if (skipQualiBtn) {
      skipQualiBtn.onclick = () => {
        sound.playClick();
        if (state.autoPlayTimer) clearInterval(state.autoPlayTimer);
        state.isAutoPlaying = false;
        RaceEngine.fastForwardQualifyingToEnd(qualy, player, team, circuit, player.discipline);
        ToastNotification.show("Griglia di partenza ufficiale definita!", "success");
        this.renderQualifyingSession(container, state, session, circuit, team, catData, player, nextPhase);
      };
    }

    const startRaceBtn = container.querySelector('#btn-start-race-action');
    if (startRaceBtn) {
      startRaceBtn.onclick = () => {
        sound.playEngineRev();
        const isSprint = session.type === 'sprint';
        state.raceState = RaceEngine.initRaceState(
          qualy.grid, circuit, catData, isSprint, player.discipline, state.setupSettings, player, team
        );
        state.currentSessionIndex++;
        nextPhase();
      };
    }
  }

  static startQualyAutoPlay(container, state, session, circuit, team, catData, player, nextPhase) {
    if (state.autoPlayTimer) clearInterval(state.autoPlayTimer);
    const speedMs = { 1: 600, 2: 300, 5: 120, 10: 60 }[state.simulationSpeed] || 400;

    state.autoPlayTimer = setInterval(() => {
      const qualy = state.qualifyingState;
      if (qualy.isFinished) {
        clearInterval(state.autoPlayTimer);
        state.autoPlayTimer = null;
        state.isAutoPlaying = false;
        sound.playChequeredFlag();
        this.renderQualifyingSession(container, state, session, circuit, team, catData, player, nextPhase);
        return;
      }

      RaceEngine.stepQualifyingTime(qualy, 45, false, player, team, circuit, player.discipline);
      this.renderQualifyingSession(container, state, session, circuit, team, catData, player, nextPhase);
    }, speedMs);
  }

  // =========================================================================
  // 3. GARA / SPRINT: GRIGLIA A ZERO, GIRI REALI, METEO & PIT STOP
  // =========================================================================
  static renderRaceSession(container, state, session, circuit, team, catData, player, nextPhase) {
    if (!state.raceState) {
      // Per i weekend sprint, la gara sprint usa la griglia sprint_quali, la gara principale usa la griglia 'quali'
      const qualId = session.type === 'sprint' && state.qualifyingStates?.sprint_quali
        ? 'sprint_quali'
        : 'quali';
      const grid = state.qualifyingStates?.[qualId]?.grid
        || state.qualifyingState?.grid
        || state.qualifyingGrid;
      const isSprint = session.type === 'sprint';
      state.raceState = RaceEngine.initRaceState(grid, circuit, catData, isSprint, player.discipline, state.setupSettings, player, team);
    }

    const race = state.raceState;
    const playerDriver = race.drivers.find(d => d.isPlayer);
    const isFinished = race.finished;
    const isSprint = session.type === 'sprint';
    const isWet = race.weather.condition === 'HEAVY_RAIN' || race.weather.condition === 'LIGHT_RAIN';

    // FASE 1: SULLA GRIGLIA DI PARTENZA (A ZERO CON SCELTA GOMME & SEMAFORI)
    if (race.gridPhase) {
      container.innerHTML = `
        <div class="weekend-stage-wrapper grid-start-stage">
          ${this.renderSessionStepper(state.sessionsList, state.currentSessionIndex)}

          <div class="grid-start-hero-card">
            <div class="grid-semafori-row">
              <span class="start-light red pulse"></span>
              <span class="start-light red pulse"></span>
              <span class="start-light red pulse"></span>
              <span class="start-light red pulse"></span>
              <span class="start-light red pulse"></span>
            </div>

            <h2 class="grid-main-title">SCHIERAMENTO SULLA GRIGLIA DI PARTENZA</h2>
            <p class="grid-sub-text">
              ${circuit.flag} ${circuit.displayName} • ${isSprint ? 'Gara Sprint' : 'Gran Premio Ufficiale'} • ${race.totalLaps} Giri Previsti
            </p>

            <div class="grid-briefing-grid">
              <!-- Meteo & Condizioni Tracciato -->
              <div class="grid-briefing-tile">
                <span class="tile-lbl">CONDIZIONI METEO</span>
                <strong class="tile-val ${isWet ? 'wet-highlight' : 'dry-highlight'}">${race.weatherText}</strong>
                <small>Aria: ${race.airTemp} • Asfalto: ${race.trackTemp} • Rischio Pioggia: ${Math.round(race.weather.rainChance * 100)}%</small>
              </div>

              <!-- Posizione di Partenza -->
              <div class="grid-briefing-tile">
                <span class="tile-lbl">CASELLA DI PARTENZA</span>
                <strong class="tile-val pos-highlight">P${playerDriver.startPos}</strong>
                <small>Distacco iniziale a semafori spenti: 0.000s</small>
              </div>

              <!-- Regolamento Soste -->
              <div class="grid-briefing-tile">
                <span class="tile-lbl">REGOLAMENTO SOSTE AI BOX</span>
                <strong class="tile-val">${race.mandatoryPit ? 'OBBLIGATORIO (Almeno 1 Sosta)' : 'LIBERO / FLAG-TO-FLAG'}</strong>
                <small>${race.mandatoryTwoDryCompounds ? 'F1: Obbligo di usare 2 mescole da asciutto diverse' : (race.isMotoGP ? 'MotoGP: Cambio moto consentito se piove' : 'Gara standard')}</small>
              </div>
            </div>

            <!-- SCELTA GOMMA DI PARTENZA -->
            <div class="grid-tyre-selection-card">
              <h3>Scegli la Mescola di Partenza per il Via</h3>
              <p class="tyre-hint-text">
                ${isWet 
                  ? '🌧️ L\'asfalto è bagnato! Si consigliano vivamente gomme WET o INTERMEDIE per evitare aquaplaning e testacoda alla partenza.' 
                  : '☀️ L\'asfalto è asciutto. Scegli tra lo scatto delle Soft, l\'equilibrio delle Medium o la durata delle Hard.'}
              </p>

              <div class="grid-tyres-flex">
                <label class="grid-tyre-card ${playerDriver.tyreCompound === 'SOFT' ? 'active' : ''}">
                  <input type="radio" name="startTyre" value="SOFT" ${playerDriver.tyreCompound === 'SOFT' ? 'checked' : ''} style="display:none;">
                  <span class="tyre-circle soft">S</span>
                  <strong>SOFT (Rossa)</strong>
                  <small>Grip massimo al via, degrado rapido</small>
                </label>

                <label class="grid-tyre-card ${playerDriver.tyreCompound === 'MEDIUM' ? 'active' : ''}">
                  <input type="radio" name="startTyre" value="MEDIUM" ${playerDriver.tyreCompound === 'MEDIUM' ? 'checked' : ''} style="display:none;">
                  <span class="tyre-circle medium">M</span>
                  <strong>MEDIUM (Gialla)</strong>
                  <small>Ritmo bilanciato e flessibilità tattica</small>
                </label>

                <label class="grid-tyre-card ${playerDriver.tyreCompound === 'HARD' ? 'active' : ''}">
                  <input type="radio" name="startTyre" value="HARD" ${playerDriver.tyreCompound === 'HARD' ? 'checked' : ''} style="display:none;">
                  <span class="tyre-circle hard">H</span>
                  <strong>HARD (Bianca)</strong>
                  <small>Riscaldamento lento, durata estrema</small>
                </label>

                <label class="grid-tyre-card ${playerDriver.tyreCompound === 'INTER' ? 'active' : ''}">
                  <input type="radio" name="startTyre" value="INTER" ${playerDriver.tyreCompound === 'INTER' ? 'checked' : ''} style="display:none;">
                  <span class="tyre-circle inter">I</span>
                  <strong>INTERMEDIA (Verde)</strong>
                  <small>Per asfalto umido o pioggerellina</small>
                </label>

                <label class="grid-tyre-card ${playerDriver.tyreCompound === 'WET' ? 'active' : ''}">
                  <input type="radio" name="startTyre" value="WET" ${playerDriver.tyreCompound === 'WET' ? 'checked' : ''} style="display:none;">
                  <span class="tyre-circle wet">W</span>
                  <strong>FULL WET (Blu)</strong>
                  <small>Massimo drenaggio per pioggia battente</small>
                </label>
              </div>
            </div>

            <!-- PULSANTE SPEGNI I SEMAFORI -->
            <div class="grid-action-box">
              <button id="btn-lights-out" class="start-race-button pulse-glow">
                <span>🚦 SPEGNI I SEMAFORI • VIA AL GRAN PREMIO!</span>
                <span class="btn-arrow">🏁</span>
              </button>
            </div>
          </div>
        </div>
      `;

      // Selezione gomma iniziale
      container.querySelectorAll('.grid-tyre-card').forEach(card => {
        card.onclick = () => {
          sound.playClick();
          container.querySelectorAll('.grid-tyre-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          const chosen = card.querySelector('input').value;
          playerDriver.tyreCompound = chosen;
          playerDriver.compoundsUsed = [chosen];
        };
      });

      const lightsOutBtn = container.querySelector('#btn-lights-out');
      if (lightsOutBtn) {
        lightsOutBtn.onclick = () => {
          sound.playEngineRev();
          RaceEngine.stepRaceLap(race, state.playerTactics, player.discipline);
          this.renderRaceSession(container, state, session, circuit, team, catData, player, nextPhase);
        };
      }
      return;
    }

    // FASE 2: GARA IN CORSO
    container.innerHTML = `
      <div class="weekend-stage-wrapper race-stage-wrapper">
        <!-- BARRA SUPERIORE TELEVISIVA F1 STYLE -->
        <div class="f1-broadcast-top-bar ${race.safetyCar ? 'sc-active' : (race.virtualSafetyCar ? 'vsc-active' : '')}">
          <div class="broadcast-left">
            <div class="f1-badge-logo">${player.discipline === 'auto' ? 'F1 TV LIVE' : 'MOTOGP LIVE'}</div>
            <span class="live-dot-pulse"></span>
            <div class="lap-counter-box">
              <span class="lap-title">GIRO</span>
              <strong class="lap-num">${race.currentLap} / ${race.totalLaps}</strong>
            </div>
            <div class="track-status-pill ${race.safetyCar ? 'sc' : (race.virtualSafetyCar ? 'vsc' : 'green')}">
              ${race.safetyCar ? '🟡 SAFETY CAR IN PISTA' : (race.virtualSafetyCar ? '🟡 VIRTUAL SAFETY CAR (VSC)' : '🟢 TRACK CLEAR • BANDIERA VERDE')}
            </div>
            <div class="weather-pill">
              <span>${race.weatherText} • Aria ${race.airTemp} / Asfalto ${race.trackTemp}</span>
              ${race.weather?.forecast ? `<span class="radar-forecast" style="margin-left: 8px; color: #38bdf8; font-weight: 600;">📡 ${race.weather.forecast}</span>` : ''}
            </div>
          </div>

          <!-- CONTROLLI VELOCITÀ GARA -->
          <div class="race-speed-controller">
            <div class="speed-buttons-group">
              <button class="speed-btn ${state.simulationSpeed === 1 ? 'active' : ''}" data-speed="1">1x</button>
              <button class="speed-btn ${state.simulationSpeed === 2 ? 'active' : ''}" data-speed="2">2x</button>
              <button class="speed-btn ${state.simulationSpeed === 5 ? 'active' : ''}" data-speed="5">5x</button>
              <button class="speed-btn ${state.simulationSpeed === 10 ? 'active' : ''}" data-speed="10">10x ⚡</button>
            </div>

            ${!isFinished ? `
              <button id="btn-toggle-autoplay-race" class="btn-play-pause ${state.isAutoPlaying ? 'pause' : 'play'}">
                ${state.isAutoPlaying ? '⏸ PAUSA' : '▶ AVVIA CONTINUA'}
              </button>
              <button id="btn-step-single-lap" class="speed-ctrl-btn">
                <span>+1 Giro ⏩</span>
              </button>
              <button id="btn-skip-to-finish" class="speed-ctrl-btn skip-finish pulse-glow" title="Simula istantaneamente tutti i giri rimanenti">
                <span>⏭️ Salta al Traguardo</span>
              </button>
            ` : `
              <button id="btn-proceed-podium" class="speed-ctrl-btn podium pulse-glow">
                <span>${session.type === 'sprint' ? 'COMPLETA SPRINT & AVANZA ➔' : 'VAI AL PODIO & PREMIAZIONI 🏆'}</span>
              </button>
            `}
          </div>
        </div>

        <!-- BARRA RAPIDA TELEMETRIA SU MOBILE (STICKY / COMPATTA) -->
        <div class="mobile-race-quick-bar">
          <div class="quick-chip pos">P${playerDriver.currentPos}</div>
          <div class="quick-chip lap">Giro ${race.currentLap}/${race.totalLaps}</div>
          <div class="quick-chip tyre ${playerDriver.tyreCompound.toLowerCase()}">
            <span class="tyre-dot">●</span> ${playerDriver.tyreCompound} ${Math.round(playerDriver.tyreLife)}%
          </div>
          <div class="quick-chip gap">
            ${playerDriver.currentPos === 1 ? 'LEADER' : '+' + playerDriver.gapToLeaderSec.toFixed(1) + 's'}
          </div>
        </div>

        <!-- SWITCHER A TAB PER MOBILE & TABLET (<900px) -->
        <div class="mobile-race-view-toggle">
          <button class="mobile-tab-btn ${state.mobileRaceTab === 'cockpit' ? 'active' : ''}" data-tab="cockpit">
            🏎️ Cockpit & Box
          </button>
          <button class="mobile-tab-btn ${state.mobileRaceTab === 'tower' ? 'active' : ''}" data-tab="tower">
            ⏱️ Classifica Live (${playerDriver ? 'P' + playerDriver.currentPos : 'P--'})
          </button>
        </div>

        <!-- GRIGLIA PRINCIPALE DELLA GARA: COLONNINA F1 A SINISTRA + COCKPIT A DESTRA -->
        <div class="race-main-broadcast-grid ${state.mobileRaceTab === 'tower' ? 'show-tower-mobile' : 'show-cockpit-mobile'}">
          <!-- ===============================================================
               COLONNINA DEI TEMPI DINAMICA TIPO F1 (TIMING TOWER)
               =============================================================== -->
          <div class="f1-timing-tower-card">
            <div class="tower-header">
              <div class="tower-header-title">
                <span class="f1-icon">${player.discipline === 'auto' ? '🏎️' : '🏍️'}</span>
                <strong>CLASSIFICA LIVE</strong>
              </div>
              <div class="tower-mode-toggle">
                <button id="btn-toggle-tower-mode" class="toggle-mode-btn">
                  ${state.timingTowerMode === 'interval' ? 'MODO: INTERVALLO' : 'MODO: DISTACCO'}
                </button>
              </div>
            </div>

            <div class="f1-tower-rows-container">
              ${[...race.drivers].sort((a, b) => a.currentPos - b.currentPos).map((d) => {
                const isLeader = d.currentPos === 1;
                const posDelta = d.startPos - d.currentPos;
                const lapDelta = d.lastPos ? d.lastPos - d.currentPos : 0;
                let deltaHtml = '<span class="pos-delta same">-</span>';
                if (posDelta > 0) deltaHtml = `<span class="pos-delta gain">▲${posDelta}</span>`;
                if (posDelta < 0) deltaHtml = `<span class="pos-delta loss">▼${Math.abs(posDelta)}</span>`;

                let compoundClass = 'medium';
                if (d.tyreCompound === 'SOFT') compoundClass = 'soft';
                if (d.tyreCompound === 'HARD') compoundClass = 'hard';
                if (d.tyreCompound === 'INTER') compoundClass = 'inter';
                if (d.tyreCompound === 'WET') compoundClass = 'wet';

                let gapStr = isLeader ? 'LEADER' : `+${d.gapToLeaderSec.toFixed(1)}s`;
                if (state.timingTowerMode === 'interval') {
                  gapStr = isLeader ? 'LEADER' : `+${d.intervalAheadSec.toFixed(1)}s`;
                }

                if (d.status === 'DNF') gapStr = 'OUT';
                if (d.status === 'PITTING') gapStr = 'IN PIT';

                return `
                  <div class="f1-tower-row ${d.isPlayer ? 'player-row' : ''} ${d.status === 'DNF' ? 'dnf' : ''} ${d.status === 'PITTING' ? 'pitting' : ''} ${lapDelta > 0 ? 'pos-up' : (lapDelta < 0 ? 'pos-down' : '')}">
                    <div class="tower-pos-box">
                      <span class="pos-num">${d.status === 'DNF' ? 'OUT' : d.currentPos}</span>
                      ${deltaHtml}
                    </div>

                    <div class="team-stripe-bar" style="background: ${d.color || '#888'}"></div>

                    <div class="tower-driver-box">
                      <strong class="driver-code">${d.code}</strong>
                      <span class="driver-full-mini">${d.name.split(' ').slice(-1)[0]}</span>
                      ${d.isPlayer ? '<span class="tower-you-badge">TU</span>' : ''}
                      ${d.hasDrs && d.status === 'RUNNING' ? '<span class="drs-active-badge">DRS</span>' : ''}
                      ${race.fastestLapHolder === d.name ? '<span class="fl-purple-badge" title="Giro più veloce">🟣 FL</span>' : ''}
                    </div>

                    <div class="tower-tyre-box" title="${d.tyreCompound} (${Math.round(d.tyreLife)}% vita)">
                      <span class="tyre-circle ${compoundClass}">${d.tyreCompound.charAt(0)}</span>
                      <div class="mini-tyre-wear-bar">
                        <div class="wear-fill ${d.tyreLife < 25 ? 'critical' : ''}" style="width:${d.tyreLife}%"></div>
                      </div>
                    </div>

                    <div class="tower-gap-box">
                      <span class="gap-text ${isLeader ? 'leader' : ''}">${gapStr}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- ===============================================================
               COCKPIT MURETTO BOX, GOMME, METEO & PIT STOP
               =============================================================== -->
          <div class="race-cockpit-controls-card">
            <!-- Alert Gomma Errata / Meteo -->
            ${isWet && ['SOFT', 'MEDIUM', 'HARD'].includes(playerDriver.tyreCompound) ? `
              <div class="tyre-weather-alert-card pulse-glow">
                <span class="alert-icon">⚠️</span>
                <div>
                  <strong>AQUAPLANING GRAVE: Gomme Slick su Pista Bagnata!</strong>
                  <p>Stai perdendo oltre 9 secondi al giro e rischi l'uscita di pista. Chiama subito il box per montare gomme WET!</p>
                </div>
              </div>
            ` : ''}

            ${!isWet && ['WET', 'INTER'].includes(playerDriver.tyreCompound) ? `
              <div class="tyre-weather-alert-card dry-warning pulse-glow">
                <span class="alert-icon">♨️</span>
                <div>
                  <strong>SURRISCALDAMENTO GOMME: Gomme da Bagnato su Asfalto Asciutto!</strong>
                  <p>Le gomme wet si stanno distruggendo rapidamente. Rientra ai box per passare alle Slick!</p>
                </div>
              </div>
            ` : ''}

            <!-- Scheda Status Telemetria Giocatore -->
            <div class="dash-card player-cockpit-status">
              <div class="card-title-row">
                <h3 class="card-title">Cockpit Pilota: ${player.firstName} ${player.lastName}</h3>
                <span class="cockpit-pos-big">P${playerDriver.currentPos}</span>
              </div>

              <div class="cockpit-stats-grid">
                <div class="cockpit-stat-tile">
                  <span class="lbl">Stato Gomme (${playerDriver.tyreCompound})</span>
                  <strong class="val ${playerDriver.tyreLife < 25 ? 'danger' : ''}">${Math.round(playerDriver.tyreLife)}%</strong>
                  <div class="tyre-life-bar">
                    <div class="tyre-life-fill" style="width:${playerDriver.tyreLife}%; background:${playerDriver.tyreLife < 30 ? '#ff1801' : '#00e676'}"></div>
                  </div>
                </div>

                <div class="cockpit-stat-tile">
                  <span class="lbl">Distacco dal Leader</span>
                  <strong class="val">${playerDriver.currentPos === 1 ? 'LEADER' : `+${playerDriver.gapToLeaderSec.toFixed(2)}s`}</strong>
                </div>

                <div class="cockpit-stat-tile">
                  <span class="lbl">Soste ai Box Effettuate</span>
                  <strong class="val">${playerDriver.pitStops} Pit Stop</strong>
                </div>

                <div class="cockpit-stat-tile">
                  <span class="lbl">Zona DRS</span>
                  <strong class="val ${playerDriver.hasDrs ? 'drs-on' : ''}">${playerDriver.hasDrs ? '🟢 ATTIVO (<1s)' : 'DISATTIVO'}</strong>
                </div>
              </div>

              <!-- TELEMETRIA DEGRADO GOMME: ASSETTO & PILOTA -->
              <div class="cockpit-tyre-telemetry-box">
                <div class="telemetry-row-header">
                  <span class="telemetry-lbl">🔬 TELEMETRIA DEGRADO GOMME</span>
                  <span class="telemetry-val-rate">~${(playerDriver.baseWearRate * (playerDriver.tyreCompound === 'SOFT' ? 1.6 : (playerDriver.tyreCompound === 'HARD' ? 0.7 : 1.05)) * (playerDriver.setupWearMultiplier || 1.0) * (playerDriver.driverStatsMultiplier || 1.0)).toFixed(1)}% / giro</span>
                </div>
                <div class="telemetry-pills-flex">
                  <span class="wear-info-pill setup" title="Impatto dell'assetto vettura sulla gomma">
                    📐 Assetto: <strong>${race.setupWearInfo?.feedback || 'Standard'}</strong>
                  </span>
                  <span class="wear-info-pill pilot" title="Impatto della Gestione Gomme del pilota">
                    ⭐ Pilota (Gest. Gomme ${playerDriver.tyreSkill || Math.round(player.attributes?.tyreMgmt || 75)}): 
                    <strong>${Math.round(((playerDriver.driverStatsMultiplier || 1.0) - 1.0) * 100) > 0 ? '+' : ''}${Math.round(((playerDriver.driverStatsMultiplier || 1.0) - 1.0) * 100)}% usura</strong>
                  </span>
                </div>
              </div>
            </div>

            <!-- Muretto Box: Tattica, Ritmo & Pit Stop -->
            <div class="dash-card race-tactics-box">
              <h3 class="card-title">Muretto Box: Ordini di Scuderia & Strategia</h3>

              <div class="tactics-group">
                <label>Ritmo di Guida & Degrado Battistrada</label>
                <div class="tactics-btn-row" id="pace-mode-group">
                  <button class="tactic-btn ${state.playerTactics.paceMode === 'SAVE' ? 'active' : ''}" data-pace="SAVE">
                    <span>🔋 Conserva Gomme</span>
                    <small>Risparmia pneumatico</small>
                  </button>
                  <button class="tactic-btn ${state.playerTactics.paceMode === 'BALANCED' ? 'active' : ''}" data-pace="BALANCED">
                    <span>⚡ Ritmo Bilanciato</span>
                    <small>Passo di riferimento</small>
                  </button>
                  <button class="tactic-btn ${state.playerTactics.paceMode === 'PUSH' ? 'active' : ''}" data-pace="PUSH">
                    <span>🔥 Spinta al Limite</span>
                    <small>Attacca per sorpassare</small>
                  </button>
                </div>
              </div>

              <!-- SEZIONE PIT STOP REALISTICA -->
              ${!isSprint ? `
                <div class="tactics-group pit-action-group">
                  <div class="pit-header-row">
                    <label>Sosta ai Box & Cambio Mescola</label>
                    <span class="pit-rule-tag">
                      ${race.mandatoryTwoDryCompounds 
                        ? `F1: Mescole usate: [${playerDriver.compoundsUsed.join(', ')}] • Obbligo: ${playerDriver.compoundsUsed.filter(c => ['SOFT','MEDIUM','HARD'].includes(c)).length >= 2 ? '✅ OK' : '⚠️ Serve 2ª mescola'}` 
                        : (race.isMotoGP ? 'MotoGP: Cambio Moto Flag-to-Flag se piove' : 'Sosta standard')}
                    </span>
                  </div>

                  <div class="pit-controls-row">
                    <button id="btn-call-box-action" class="btn-pit-call ${state.playerTactics.boxThisLap ? 'active pulse-glow' : ''}">
                      ${state.playerTactics.boxThisLap ? '🛑 PIT STOP PROGRAMMATO QUESTO GIRO!' : '🛠️ CHIAMA SOSTA AI BOX (BOX THIS LAP)'}
                    </button>
                    <select id="select-pit-tyre" class="dark-select">
                      <option value="HARD" ${state.playerTactics.newCompound === 'HARD' ? 'selected' : ''}>⚪ Hard (Dura)</option>
                      <option value="MEDIUM" ${state.playerTactics.newCompound === 'MEDIUM' ? 'selected' : ''}>🟡 Medium (Media)</option>
                      <option value="SOFT" ${state.playerTactics.newCompound === 'SOFT' ? 'selected' : ''}>🔴 Soft (Morbida)</option>
                      <option value="INTER" ${state.playerTactics.newCompound === 'INTER' ? 'selected' : ''}>🟢 Intermedie (Umido)</option>
                      <option value="WET" ${state.playerTactics.newCompound === 'WET' ? 'selected' : ''}>🔵 Wet (Bagnato Estremo)</option>
                    </select>
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- Feed Radio & Cronaca Pista -->
            <div class="dash-card live-radio-feed-card">
              <h3 class="card-title">Live Radio Muretto & Cronaca</h3>
              <div class="race-log-scroller">
                ${race.log.map(item => `
                  <div class="log-entry">${item}</div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Event listeners Gara
    // Switcher Tab Mobile (Cockpit vs Timing Tower)
    container.querySelectorAll('.mobile-tab-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playClick();
        state.mobileRaceTab = btn.dataset.tab;
        this.renderRaceSession(container, state, session, circuit, team, catData, player, nextPhase);
      };
    });

    const toggleTowerBtn = container.querySelector('#btn-toggle-tower-mode');
    if (toggleTowerBtn) {
      toggleTowerBtn.onclick = () => {
        sound.playClick();
        state.timingTowerMode = state.timingTowerMode === 'interval' ? 'gap' : 'interval';
        this.renderRaceSession(container, state, session, circuit, team, catData, player, nextPhase);
      };
    }

    container.querySelectorAll('.speed-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playClick();
        state.simulationSpeed = parseInt(btn.dataset.speed, 10);
        if (state.isAutoPlaying) {
          this.startRaceAutoPlay(container, state, session, circuit, team, catData, player, nextPhase);
        }
        this.renderRaceSession(container, state, session, circuit, team, catData, player, nextPhase);
      };
    });

    const toggleAutoBtn = container.querySelector('#btn-toggle-autoplay-race');
    if (toggleAutoBtn) {
      toggleAutoBtn.onclick = () => {
        sound.playClick();
        if (state.isAutoPlaying) {
          if (state.autoPlayTimer) clearInterval(state.autoPlayTimer);
          state.autoPlayTimer = null;
          state.isAutoPlaying = false;
        } else {
          state.isAutoPlaying = true;
          this.startRaceAutoPlay(container, state, session, circuit, team, catData, player, nextPhase);
        }
        this.renderRaceSession(container, state, session, circuit, team, catData, player, nextPhase);
      };
    }

    const stepSingleBtn = container.querySelector('#btn-step-single-lap');
    if (stepSingleBtn) {
      stepSingleBtn.onclick = () => {
        sound.playEngineRev();
        RaceEngine.stepRaceLap(state.raceState, state.playerTactics, player.discipline);
        state.playerTactics.boxThisLap = false;
        this.renderRaceSession(container, state, session, circuit, team, catData, player, nextPhase);
      };
    }

    const skipFinishBtn = container.querySelector('#btn-skip-to-finish');
    if (skipFinishBtn) {
      skipFinishBtn.onclick = () => {
        sound.playChequeredFlag();
        if (state.autoPlayTimer) clearInterval(state.autoPlayTimer);
        state.isAutoPlaying = false;
        RaceEngine.fastForwardToEnd(state.raceState, state.playerTactics, player.discipline);
        ToastNotification.show("🏁 Bandiera a scacchi! Il Gran Premio si è concluso.", "success");
        this.renderRaceSession(container, state, session, circuit, team, catData, player, nextPhase);
      };
    }

    container.querySelectorAll('#pace-mode-group .tactic-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playClick();
        state.playerTactics.paceMode = btn.dataset.pace;
        this.renderRaceSession(container, state, session, circuit, team, catData, player, nextPhase);
      };
    });

    const callBoxBtn = container.querySelector('#btn-call-box-action');
    if (callBoxBtn) {
      callBoxBtn.onclick = () => {
        sound.playRadioBeep();
        state.playerTactics.boxThisLap = !state.playerTactics.boxThisLap;
        this.renderRaceSession(container, state, session, circuit, team, catData, player, nextPhase);
      };
    }

    const tyreSelect = container.querySelector('#select-pit-tyre');
    if (tyreSelect) {
      tyreSelect.onchange = (e) => {
        state.playerTactics.newCompound = e.target.value;
      };
    }

    const proceedPodiumBtn = container.querySelector('#btn-proceed-podium');
    if (proceedPodiumBtn) {
      proceedPodiumBtn.onclick = () => {
        sound.playChequeredFlag();
        if (session.type === 'sprint') {
          state.sprintResults = state.raceState;
          state.currentSessionIndex++;
          nextPhase();
        } else {
          const finishPos = playerDriver?.status === 'DNF' ? 99 : (playerDriver?.currentPos || 10);
          MediaInterviewModal.open(finishPos, () => {
            state.currentSessionIndex++;
            nextPhase();
          });
        }
      };
    }
  }

  static startRaceAutoPlay(container, state, session, circuit, team, catData, player, nextPhase) {
    if (state.autoPlayTimer) clearInterval(state.autoPlayTimer);
    const speedMs = { 1: 600, 2: 300, 5: 120, 10: 60 }[state.simulationSpeed] || 400;

    state.autoPlayTimer = setInterval(() => {
      if (state.raceState.finished) {
        clearInterval(state.autoPlayTimer);
        state.autoPlayTimer = null;
        state.isAutoPlaying = false;
        sound.playChequeredFlag();
        this.renderRaceSession(container, state, session, circuit, team, catData, player, nextPhase);
        return;
      }

      RaceEngine.stepRaceLap(state.raceState, state.playerTactics, player.discipline);
      state.playerTactics.boxThisLap = false;
      this.renderRaceSession(container, state, session, circuit, team, catData, player, nextPhase);
    }, speedMs);
  }

  // =========================================================================
  // 4. PODIO & PREMIAZIONI
  // =========================================================================
  static renderPodiumSession(container, state, circuit, player, onFinishWeekend) {
    const race = state.raceState;
    const playerDriver = race.drivers.find(d => d.isPlayer);
    const pos = playerDriver ? playerDriver.currentPos : 10;
    const isWin = pos === 1;
    const isPodium = pos <= 3;
    const isPoints = player.discipline === 'moto' ? pos <= 15 : pos <= 10;

    // Registra i risultati ufficiali nella carriera globale con sprint inclusa (con protezione di idempotenza)
    if (!state.gpResultRecorded) {
      state.gpResultRecorded = true;
      state.gpResult = career.recordGrandPrixResults(state.qualifyingState?.grid || state.qualifyingGrid, race, state.sprintResults);
    }
    const gpResult = state.gpResult;
    const earnedSkillPts = gpResult?.earnedSkillPoints || career.career.lastWeekendRecap?.earnedSkillPoints || 1;
    const tmCollab = gpResult?.teammateContribution || career.career.lastWeekendRecap?.teammateContribution;
    const earnedWorldPts = gpResult?.earnedPoints !== undefined 
      ? gpResult.earnedPoints 
      : RaceEngine.calculatePoints(pos, false, player.discipline);

    const top3 = race.drivers.filter(d => d.status !== 'DNF').slice(0, 3);

    container.innerHTML = `
      <div class="weekend-stage-wrapper podium-stage">
        <div class="podium-hero-card ${isWin ? 'gold-celebration' : ''}">
          <span class="podium-trophy">${isWin ? '🏆' : (isPodium ? '🍾' : '🏁')}</span>
          <h2 class="podium-title">
            ${isWin ? 'VITTORIA ASSOLUTA NEL GRAN PREMIO!' : (isPodium ? 'PODIO CONQUISTATO!' : `GRAN PREMIO CONCLUSO IN P${pos}`)}
          </h2>
          <p class="podium-sub">
            ${circuit.flag} Gran Premio di ${circuit.displayName} • ${circuit.country}
          </p>

          <!-- PODIO A 3 GRADINI -->
          <div class="podium-3d-display">
            <!-- P2 -->
            <div class="podium-step-column p2">
              <div class="podium-pilot-info">
                <span class="podium-pos-badge">P2</span>
                <strong>${top3[1]?.name || 'Pilota P2'}</strong>
                <small>${top3[1]?.teamName || ''}</small>
              </div>
              <div class="podium-pillar p2-pillar">2</div>
            </div>

            <!-- P1 -->
            <div class="podium-step-column p1">
              <div class="podium-pilot-info">
                <span class="podium-pos-badge gold">P1 👑</span>
                <strong>${top3[0]?.name || 'Pilota P1'}</strong>
                <small>${top3[0]?.teamName || ''}</small>
              </div>
              <div class="podium-pillar p1-pillar">1</div>
            </div>

            <!-- P3 -->
            <div class="podium-step-column p3">
              <div class="podium-pilot-info">
                <span class="podium-pos-badge bronze">P3</span>
                <strong>${top3[2]?.name || 'Pilota P3'}</strong>
                <small>${top3[2]?.teamName || ''}</small>
              </div>
              <div class="podium-pillar p3-pillar">3</div>
            </div>
          </div>

          <!-- RIEPILOGO PUNTI & GUADAGNI -->
          <div class="podium-points-award-card">
            <div class="points-bubble">
              <span class="lbl">PUNTI MONDIALE</span>
              <strong class="val">+${earnedWorldPts} pts ${gpResult?.fastestLapBonus ? '<small style="color: #c084fc; font-size: 11px;">(+1 FL)</small>' : ''}</strong>
            </div>
            <div class="points-bubble">
              <span class="lbl">PREMIO GARA & STIPENDIO</span>
              <strong class="val money">+€${((career.career.contract?.salaryPerRace || 5000) + (isWin ? (career.career.contract?.winBonus || 10000) : (isPodium ? Math.round((career.career.contract?.winBonus || 10000) * 0.4) : 0))).toLocaleString()}</strong>
            </div>
            <div class="points-bubble">
              <span class="lbl">PUNTI SUPERRICENZA</span>
              <strong class="val license">+${isPodium ? 5 : (isPoints ? 2 : 1)} Pts</strong>
            </div>
            <div class="points-bubble skill-award-bubble">
              <span class="lbl">SVILUPPO PILOTA</span>
              <strong class="val skill-val">+${earnedSkillPts} Punti Abilità ⭐</strong>
            </div>
          </div>

          <!-- COLLABORAZIONE COMPAGNO DI SQUADRA & R&D -->
          ${tmCollab ? `
            <div class="podium-teammate-collab-card" style="margin: 1.25rem auto 0; max-width: 650px; background: rgba(0, 210, 255, 0.07); border: 1px solid rgba(0, 210, 255, 0.3); border-radius: 14px; padding: 1rem 1.25rem; text-align: left;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 1.3rem;">🤝</span>
                  <strong style="color: #00d2ff; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.5px;">Collaborazione Compagno: ${tmCollab.tmName}</strong>
                </div>
                <span style="background: rgba(0, 210, 255, 0.15); color: #00e5ff; font-weight: 700; font-size: 0.8rem; padding: 2px 8px; border-radius: 6px;">R&D & Telemetria</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.88rem; color: #cbd5e1;">
                <div style="background: rgba(15, 23, 42, 0.5); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                  💼 <strong>Sponsor apportati:</strong> <span style="color: #4ade80; font-weight: 700;">+€${(tmCollab.sponsorMoney || 0).toLocaleString()}</span>
                </div>
                <div style="background: rgba(15, 23, 42, 0.5); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                  📡 <strong>Telemetria generata:</strong> <span style="color: #38bdf8; font-weight: 700;">+${tmCollab.totalTelemetry || 0} PT</span> <span style="font-size: 0.75rem; color: #94a3b8;">(+${tmCollab.tmTelemetry || 0} dal compagno)</span>
                </div>
              </div>
              ${tmCollab.breakthrough ? `
                <div style="margin-top: 0.6rem; background: linear-gradient(90deg, rgba(168, 85, 247, 0.15), rgba(59, 130, 246, 0.15)); border: 1px solid rgba(168, 85, 247, 0.4); border-radius: 8px; padding: 8px 12px; font-size: 0.85rem; color: #e9d5ff;">
                  🚀 <strong>BREAKTHROUGH SIMULATORE:</strong> ${tmCollab.breakthrough.message}
                </div>
              ` : ''}
            </div>
          ` : ''}

          <div class="podium-action-bar">
            <button id="btn-conclude-weekend" class="start-race-button pulse-glow">
              <span>${(career.player?.unspentSkillPoints || 0) > 0 ? `ASSEGNA PUNTI ABILITÀ (${career.player.unspentSkillPoints} Disp.) ➔` : 'RITORNA AL PADDOCK HUB ➔'}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const concludeBtn = container.querySelector('#btn-conclude-weekend');
    if (concludeBtn) {
      concludeBtn.onclick = () => {
        sound.playClick();
        if ((career.player?.unspentSkillPoints || 0) > 0) {
          DriverSkillsModal.open({
            isPostWeekend: true,
            onConfirm: () => onFinishWeekend(),
            onClose: () => onFinishWeekend()
          });
        } else {
          onFinishWeekend();
        }
      };
    }
  }
}
