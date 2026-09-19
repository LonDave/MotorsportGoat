import { career } from '../engine/careerEngine.js';
import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';
import { AUTO_CATEGORIES } from '../data/autoDatabase.js';
import { MOTO_CATEGORIES } from '../data/motoDatabase.js';
import { ToastNotification } from './toastNotification.js';
import { HelmetRenderer } from './helmetEditorView.js';

export class RookieTestView {
  static render(container, customDriver, onContractSigned) {
    const discipline = customDriver.discipline || 'auto';
    const isAuto = discipline === 'auto';
    const categoryKey = isAuto ? 'auto_f4' : 'moto_3';
    const catData = isAuto ? AUTO_CATEGORIES[categoryKey] : MOTO_CATEGORIES[categoryKey];
    const circuitName = isAuto ? 'Misano World Circuit Marco Simoncelli' : 'Circuito de Jerez - Ángel Nieto';
    const vehicleName = isAuto ? 'Tatuus F4-T421 Abarth' : 'KTM RC250GP Moto3';

    // Genera piloti di confronto (Rookie Benchmark AI)
    const benchmarkRookies = (catData.roster || []).slice(0, 7).map((drv, idx) => {
      const paceBase = isAuto ? 100.2 : 106.5; // Base in secondi per il giro di riferimento
      const delta = (idx * 0.18) + ((drv.pace ? (80 - drv.pace) * 0.05 : 0.2));
      const lapTimeSec = paceBase + delta;
      return {
        id: drv.id,
        name: db.getDriverName(drv.id, discipline) || drv.realName || drv.fictionalName,
        teamId: drv.teamId,
        teamName: db.getTeamName(drv.teamId, discipline),
        teamColor: catData.teams.find(t => t.id === drv.teamId)?.color || '#64748b',
        lapTimeSec: Number(lapTimeSec.toFixed(3)),
        lapTimeStr: RookieTestView.formatLapTime(lapTimeSec),
        number: drv.number || (idx + 10)
      };
    });

    // Stato locale della sessione Rookie Test
    const state = {
      completedStints: 0, // 0, 1, 2, 3
      activeStintStrategy: 'balanced', // 'safe' | 'balanced' | 'allout'
      stintResults: [],
      bestLapSec: null,
      bestLapStr: '--:--.---',
      playerRank: null,
      topSpeed: 0,
      telemetryRewardPoints: 0,
      engineerFeedback: "Benvenuto nel box! I tecnici hanno completato il check di telemetria. Quando sei pronto, calza il casco e scendi in pista per il primo stint.",
      offers: null
    };

    const runStint = (strategy) => {
      sound.playEngineRev();
      state.activeStintStrategy = strategy;
      state.completedStints++;

      // Calcolo prestazione in base agli attributi del pilota creato
      const paceAttr = customDriver.attributes?.pace || 60;
      const racecraftAttr = customDriver.attributes?.racecraft || 60;
      const consistencyAttr = customDriver.attributes?.consistency || 60;
      const techAttr = customDriver.attributes?.technicalFeedback || 60;

      // Bonus/Malus strategia
      let stratDelta = 0;
      let riskRoll = Math.random();
      let hadMistake = false;

      if (strategy === 'safe') {
        stratDelta = +0.28; // Più lento ma sicuro
      } else if (strategy === 'allout') {
        stratDelta = -0.32; // Più veloce ma rischioso
        if (riskRoll > (consistencyAttr / 100)) {
          hadMistake = true;
          stratDelta += +0.65; // Bloccaggio o scodata
        }
      }

      // Base cronometrica realistica
      const baseSec = isAuto ? 100.5 : 106.8;
      const driverSkillGain = ((paceAttr - 60) * 0.05) + ((racecraftAttr - 60) * 0.02);
      const stintProgressionGain = (state.completedStints - 1) * 0.18; // Gommatura pista e confidenza
      const randomness = (Math.random() * 0.25) - 0.12;

      const currentLapSec = Number((baseSec - driverSkillGain - stintProgressionGain + stratDelta + randomness).toFixed(3));
      
      if (!state.bestLapSec || currentLapSec < state.bestLapSec) {
        state.bestLapSec = currentLapSec;
        state.bestLapStr = RookieTestView.formatLapTime(currentLapSec);
      }

      // Settori parziali
      const s1 = (currentLapSec * 0.32).toFixed(3);
      const s2 = (currentLapSec * 0.40).toFixed(3);
      const s3 = (currentLapSec * 0.28).toFixed(3);

      const topSpeedBase = isAuto ? 232 : 224;
      state.topSpeed = Math.round(topSpeedBase + (paceAttr * 0.15) + (strategy === 'allout' ? 3 : 0));
      state.telemetryRewardPoints += Math.round(10 + (techAttr * 0.20));

      let radio = "";
      if (hadMistake) {
        radio = "⚠️ Hai bloccato l'anteriore in staccata al Curvone! Gomma leggermente spiattellata, ma sei riuscito a rientrare in traiettoria.";
      } else if (state.completedStints === 1) {
        radio = "✓ Stint 1 Shakedown completato! Sensazioni aerodinamiche positive. I tecnici stanno scaricando i dati della centralina.";
      } else if (state.completedStints === 2) {
        radio = "✓ Stint 2 Setup completato! Ottimo bilanciamento alle curve medie. Gomme morbide montate per l'assalto al tempo nel terzo stint!";
      } else {
        radio = "🏁 Bandiera a scacchi! Sessione Rookie completata. Gli osservatori e i team principal al muretto hanno preso nota dei tuoi riscontri!";
      }
      state.engineerFeedback = radio;

      state.stintResults.push({
        stintNum: state.completedStints,
        strategy,
        lapSec: currentLapSec,
        lapStr: RookieTestView.formatLapTime(currentLapSec),
        s1, s2, s3,
        hadMistake
      });

      // Se ha finito tutti e 3 gli stint, genera classifica finale e offerte
      if (state.completedStints >= 3) {
        finalizeTest();
      }

      render();
    };

    const finalizeTest = () => {
      // Unisci pilota con i benchmark
      const playerEntry = {
        isPlayer: true,
        id: 'player_test',
        name: `${customDriver.firstName} ${customDriver.lastName}`,
        teamName: 'Collaudo Federale FIA/FIM',
        teamColor: '#00f0ff',
        lapTimeSec: state.bestLapSec,
        lapTimeStr: state.bestLapStr,
        number: customDriver.number || 77
      };

      const allEntries = [...benchmarkRookies, playerEntry].sort((a, b) => a.lapTimeSec - b.lapTimeSec);
      state.playerRank = allEntries.findIndex(e => e.isPlayer) + 1;

      // Genera 3 offerte contrattuali basate sul risultato
      state.offers = generateOffersByRank(state.playerRank, catData.teams, customDriver);
    };

    const generateOffersByRank = (rank, teams, driver) => {
      const sortedTeams = [...teams].sort((a, b) => {
        const paceA = isAuto ? a.carPace : a.bikePace;
        const paceB = isAuto ? b.carPace : b.bikePace;
        return paceB - paceA;
      });

      const offers = [];
      const isPayDriver = driver.origin === 'paydriver';

      if (rank <= 3) {
        // TOP RESULT: P1 - P3 -> Offerte Top Tier (PREMA / Ajo), Midfield alta e Progetto Speciale
        const topTeam = sortedTeams[0];
        const midTeam = sortedTeams[2] || sortedTeams[1];
        const underTeam = sortedTeams[sortedTeams.length - 1];

        offers.push({
          id: 'offer_top',
          teamId: topTeam.id,
          teamName: topTeam.realName || topTeam.fictionalName,
          color: topTeam.color,
          tier: 'Top Team (Candidato al Titolo)',
          scoutVerdict: '🌟 Scout Entusiasta: Impressionato dalla velocità pura. Ti offrono il sedile più ambito della categoria!',
          pace: isAuto ? topTeam.carPace : topTeam.bikePace,
          reliability: topTeam.reliability || 88,
          salaryPerRace: isPayDriver ? 0 : 6500,
          winBonus: 12000,
          role: '1st Driver',
          durationYears: 1
        });

        offers.push({
          id: 'offer_mid',
          teamId: midTeam.id,
          teamName: midTeam.realName || midTeam.fictionalName,
          color: midTeam.color,
          tier: 'Scuderia Midfield di Vertice',
          scoutVerdict: '🎯 Ottima Alternativa: Meno pressione mediatica, budget sviluppo cospicuo e supporto totale.',
          pace: isAuto ? midTeam.carPace : midTeam.bikePace,
          reliability: midTeam.reliability || 86,
          salaryPerRace: isPayDriver ? 0 : 5500,
          winBonus: 10000,
          role: '1st Driver',
          durationYears: 1
        });

        offers.push({
          id: 'offer_under',
          teamId: underTeam.id,
          teamName: underTeam.realName || underTeam.fictionalName,
          color: underTeam.color,
          tier: 'Progetto Pilota Esclusivo',
          scoutVerdict: '🛠️ Leader di Sviluppo: Stipendio raddoppiato e tutta la squadra costruita attorno a te per scalare la griglia.',
          pace: isAuto ? underTeam.carPace : underTeam.bikePace,
          reliability: underTeam.reliability || 84,
          salaryPerRace: isPayDriver ? 0 : 8000,
          winBonus: 16000,
          role: 'Leader Assoluto',
          durationYears: 2
        });
      } else if (rank <= 6) {
        // MIDFIELD RESULT: P4 - P6
        const mid1 = sortedTeams[2] || sortedTeams[1];
        const mid2 = sortedTeams[3] || sortedTeams[2];
        const under = sortedTeams[sortedTeams.length - 2] || sortedTeams[sortedTeams.length - 1];

        offers.push({
          id: 'offer_mid1',
          teamId: mid1.id,
          teamName: mid1.realName || mid1.fictionalName,
          color: mid1.color,
          tier: 'Midfield Competitiva',
          scoutVerdict: '👍 Scout Molto Interessato: Giro solido e buona gestione. Pronto a combattere per il podio.',
          pace: isAuto ? mid1.carPace : mid1.bikePace,
          reliability: mid1.reliability || 86,
          salaryPerRace: isPayDriver ? 0 : 5000,
          winBonus: 9500,
          role: 'Co-Leader',
          durationYears: 1
        });

        offers.push({
          id: 'offer_mid2',
          teamId: mid2.id,
          teamName: mid2.realName || mid2.fictionalName,
          color: mid2.color,
          tier: 'Scuderia di Crescita',
          scoutVerdict: '🔧 Ottima telemetria: Gli ingegneri credono che il tuo feedback possa far fare il salto di qualità al mezzo.',
          pace: isAuto ? mid2.carPace : mid2.bikePace,
          reliability: mid2.reliability || 85,
          salaryPerRace: isPayDriver ? 0 : 4800,
          winBonus: 9000,
          role: '1st Driver',
          durationYears: 1
        });

        offers.push({
          id: 'offer_under',
          teamId: under.id,
          teamName: under.realName || under.fictionalName,
          color: under.color,
          tier: 'Underdog Combattiva',
          scoutVerdict: '🤝 Fiducia Totale: Ti garantiscono un contratto biennale con bonus generosi su ogni piazzamento a punti.',
          pace: isAuto ? under.carPace : under.bikePace,
          reliability: under.reliability || 84,
          salaryPerRace: isPayDriver ? 0 : 6000,
          winBonus: 14000,
          role: '1st Driver',
          durationYears: 2
        });
      } else {
        // UNDERDOG RESULT: P7+
        const under1 = sortedTeams[sortedTeams.length - 3] || sortedTeams[3];
        const under2 = sortedTeams[sortedTeams.length - 2] || sortedTeams[4];
        const under3 = sortedTeams[sortedTeams.length - 1];

        offers.push({
          id: 'offer_under1',
          teamId: under1.id,
          teamName: under1.realName || under1.fictionalName,
          color: under1.color,
          tier: 'Scuderia di Gavetta',
          scoutVerdict: '📋 Scout Fiducioso: Ritengono che in gara saprai sorprendere. Nessuna pressione, ideale per imparare.',
          pace: isAuto ? under1.carPace : under1.bikePace,
          reliability: under1.reliability || 85,
          salaryPerRace: isPayDriver ? 0 : 4000,
          winBonus: 8500,
          role: '2nd Driver',
          durationYears: 1
        });

        offers.push({
          id: 'offer_under2',
          teamId: under2.id,
          teamName: under2.realName || under2.fictionalName,
          color: under2.color,
          tier: 'Team di Sviluppo Indipendente',
          scoutVerdict: '⛽ Opportunità di Riscatto: Grande passione, ambiente familiare e libertà di assetto.',
          pace: isAuto ? under2.carPace : under2.bikePace,
          reliability: under2.reliability || 84,
          salaryPerRace: isPayDriver ? 0 : 4200,
          winBonus: 9000,
          role: 'Pilota Sviluppo',
          durationYears: 1
        });

        offers.push({
          id: 'offer_under3',
          teamId: under3.id,
          teamName: under3.realName || under3.fictionalName,
          color: under3.color,
          tier: 'Underdog di Fondo Griglia',
          scoutVerdict: '🏁 Occasione d\'Oro: Il team ha un sedile libero e crede nella tua fame agonistica.',
          pace: isAuto ? under3.carPace : under3.bikePace,
          reliability: under3.reliability || 83,
          salaryPerRace: isPayDriver ? 0 : 4500,
          winBonus: 11000,
          role: 'Titolare',
          durationYears: 1
        });
      }

      return offers;
    };

    const render = () => {
      const helmetSvg = HelmetRenderer.generateHelmetSvg({
        ...customDriver.helmet,
        number: customDriver.number,
        nationality: customDriver.nationality
      }, 54);

      // Costruzione tabella tempi combinata
      const allEntries = [...benchmarkRookies];
      if (state.bestLapSec) {
        allEntries.push({
          isPlayer: true,
          id: 'player_test',
          name: `${customDriver.firstName} ${customDriver.lastName}`,
          teamName: 'Collaudo Federale (Tu)',
          teamColor: '#00f0ff',
          lapTimeSec: state.bestLapSec,
          lapTimeStr: state.bestLapStr,
          number: customDriver.number || 77
        });
      }
      allEntries.sort((a, b) => a.lapTimeSec - b.lapTimeSec);
      const fastestLap = allEntries[0]?.lapTimeSec || 100;

      container.innerHTML = `
        <div class="page-container rookie-test-page">
          <!-- BANNER HEADER ROOKIE TEST -->
          <div class="page-title-banner rookie-test-banner">
            <div class="banner-text">
              <span class="page-subtag">SESSIONE UFFICIALE DI COLLAUDO • FIA / FIM ROOKIE EVALUATION DAY</span>
              <h2 class="page-main-title">🏁 ROOKIE TEST IN PISTA: ${catData.name.toUpperCase()}</h2>
              <p class="page-desc">Scendi sul tracciato di <strong>${circuitName}</strong> a bordo del mezzo standard federale (<strong>${vehicleName}</strong>). I tuoi tempi e la precisione telemetrica determineranno quali scuderie busseranno alla tua porta con una proposta contrattuale!</p>
            </div>

            <div class="rookie-quick-info">
              <div class="rookie-driver-preview">
                <div class="mini-helmet-container">${helmetSvg}</div>
                <div class="driver-text-meta">
                  <strong>${customDriver.firstName} ${customDriver.lastName}</strong>
                  <small>#${customDriver.number} • ${customDriver.nationality} • OVR ${career.calculateOvr(customDriver.attributes)}</small>
                </div>
              </div>

              <div class="test-status-pill">
                <span class="test-pill-lbl">Stint Completati</span>
                <strong class="test-pill-val">${state.completedStints} / 3</strong>
              </div>

              <div class="test-status-pill">
                <span class="test-pill-lbl">Miglior Crono</span>
                <strong class="test-pill-val" style="color: #00f0ff;">${state.bestLapStr}</strong>
              </div>

              <div class="test-status-pill">
                <span class="test-pill-lbl">Punti Telemetria Maturati</span>
                <strong class="test-pill-val" style="color: #38bdf8;">+${state.telemetryRewardPoints} PT</strong>
              </div>
            </div>
          </div>

          <!-- LAYOUT CENTRALE: MONITOR BOX & TIMING BOARD -->
          <div class="rookie-test-layout-grid">
            <!-- COLONNA SINISTRA: PITWALL, TELEMETRIA & STRATEGIA STINT -->
            <div class="pitwall-control-card">
              <div class="pitwall-header">
                <div class="pitwall-title-row">
                  <span class="pitwall-tag">CANALE BOX & TELEMETRIA</span>
                  <h3 class="pitwall-title">🎛️ Gestione Sessione di Collaudo</h3>
                </div>
                <span class="pitwall-circuit-badge">📍 ${circuitName}</span>
              </div>

              <!-- RADIO BOX INGEGNERE -->
              <div class="engineer-radio-box">
                <div class="radio-avatar">🎧</div>
                <div class="radio-content">
                  <span class="radio-sender">Capo Ingegnere di Pista:</span>
                  <p class="radio-msg">"${state.engineerFeedback}"</p>
                </div>
              </div>

              <!-- DETTAGLIO STINT EFFETTUATI -->
              <div class="stints-progress-stepper">
                <div class="stint-step-card ${state.completedStints >= 1 ? 'completed' : (state.completedStints === 0 ? 'current' : '')}">
                  <div class="step-num">1</div>
                  <div class="step-info">
                    <strong>Stint 1: Shakedown & Aerodinamica</strong>
                    <small>Valutazione risposta telaio e velocità nei curvoni veloci</small>
                  </div>
                  <span class="step-status">${state.completedStints >= 1 ? '✓ FATTO' : 'DA FARE'}</span>
                </div>

                <div class="stint-step-card ${state.completedStints >= 2 ? 'completed' : (state.completedStints === 1 ? 'current' : '')}">
                  <div class="step-num">2</div>
                  <div class="step-info">
                    <strong>Stint 2: Setup Meccanico & Bilanciamento</strong>
                    <small>Messa a punto sospensioni, frenata e trazione in uscita</small>
                  </div>
                  <span class="step-status">${state.completedStints >= 2 ? '✓ FATTO' : 'DA FARE'}</span>
                </div>

                <div class="stint-step-card ${state.completedStints >= 3 ? 'completed' : (state.completedStints === 2 ? 'current' : '')}">
                  <div class="step-num">3</div>
                  <div class="step-info">
                    <strong>Stint 3: Hot Lap Qualifica & Telemetria Limite</strong>
                    <small>Gomma nuova morbida, mappatura massima e ricerca del giro secco</small>
                  </div>
                  <span class="step-status">${state.completedStints >= 3 ? '✓ FATTO' : 'DA FARE'}</span>
                </div>
              </div>

              <!-- CONTROLLI AZIONE STINT -->
              ${state.completedStints < 3 ? `
                <div class="stint-actions-box">
                  <h4 class="action-section-title">Seleziona Approccio per lo Stint ${state.completedStints + 1}:</h4>
                  <div class="strategy-selector-row">
                    <button class="strat-btn ${state.activeStintStrategy === 'safe' ? 'active' : ''}" data-strat="safe">
                      <span class="strat-icon">🛡️</span>
                      <strong>Cauto & Pulito</strong>
                      <small>Minimo rischio, telemetria costante (+0.3s)</small>
                    </button>

                    <button class="strat-btn ${state.activeStintStrategy === 'balanced' ? 'active' : ''}" data-strat="balanced">
                      <span class="strat-icon">⚖️</span>
                      <strong>Bilanciato</strong>
                      <small>Assetto standard da test (Passo ottimale)</small>
                    </button>

                    <button class="strat-btn ${state.activeStintStrategy === 'allout' ? 'active' : ''}" data-strat="allout">
                      <span class="strat-icon">⚡</span>
                      <strong>Attacco al Limite</strong>
                      <small>Cerca il crono estremo (Possibili sbavature)</small>
                    </button>
                  </div>

                  <div class="stint-action-buttons-row">
                    <button id="btn-run-single-stint" class="btn-primary-action pulse-glow">
                      <span>${state.completedStints === 0 ? '🏁 INIZIA I TEST • STINT 1 ➔' : `Lancia Stint ${state.completedStints + 1} ➔`}</span>
                    </button>
                    <button id="btn-simulate-all-stints" class="btn-secondary-action">
                      <span>Simula Restanti Stint Fast ⏩</span>
                    </button>
                  </div>
                </div>
              ` : `
                <div class="test-completed-banner">
                  <span class="trophy-icon">🏁</span>
                  <div class="comp-text">
                    <strong>ROOKIE TEST COMPLETATO CON SUCCESSO!</strong>
                    <p>Hai concluso i 3 stint ufficiali al <strong>${state.playerRank}° posto assoluto</strong>. Esamina le proposte contrattuali degli scout qui sotto per firmare con la tua prima scuderia.</p>
                  </div>
                </div>
              `}
            </div>

            <!-- COLONNA DESTRA: OFFICIAL TIMING BOARD -->
            <div class="timing-board-card">
              <div class="timing-header">
                <div class="timing-title-box">
                  <span class="live-tag">LIVE TIMING</span>
                  <h3 class="timing-title">Classifica Ufficiale Rookie Test</h3>
                </div>
                <span class="timing-session-name">Giri Cronometrati Combinati</span>
              </div>

              <div class="timing-table-wrapper table-responsive">
                <table class="timing-table">
                  <thead>
                    <tr>
                      <th style="width: 45px;">POS</th>
                      <th>PILOTA</th>
                      <th>SCUDERIA BENCHMARK</th>
                      <th style="text-align: right;">TEMPO</th>
                      <th style="text-align: right;">GAP</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${allEntries.map((e, idx) => {
                      const pos = idx + 1;
                      const gap = idx === 0 ? 'LEADER' : `+${(e.lapTimeSec - fastestLap).toFixed(3)}s`;
                      const isYou = !!e.isPlayer;
                      return `
                        <tr class="timing-row ${isYou ? 'timing-row-you highlight-row' : ''}">
                          <td class="col-pos">
                            <span class="pos-badge pos-${pos}">${pos}</span>
                          </td>
                          <td class="col-driver">
                            <strong class="driver-name">${e.name}</strong>
                            ${isYou ? '<span class="you-badge">TU</span>' : ''}
                          </td>
                          <td class="col-team">
                            <span class="team-dot" style="background: ${e.teamColor};"></span>
                            <span>${e.teamName}</span>
                          </td>
                          <td class="col-time" style="text-align: right;">
                            <strong>${e.lapTimeStr}</strong>
                          </td>
                          <td class="col-gap" style="text-align: right; color: ${idx === 0 ? '#10b981' : '#94a3b8'};">
                            ${gap}
                          </td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>

              ${state.stintResults.length > 0 ? `
                <div class="telemetry-telemetry-strip">
                  <span class="strip-lbl">Ultimi Rilevamenti Telemetrici Pilota:</span>
                  <div class="telemetry-badges-row">
                    <span class="tele-badge">Velocità Massima: <strong>${state.topSpeed} km/h</strong></span>
                    <span class="tele-badge">S1: <strong>${state.stintResults[state.stintResults.length - 1].s1}s</strong></span>
                    <span class="tele-badge">S2: <strong>${state.stintResults[state.stintResults.length - 1].s2}s</strong></span>
                    <span class="tele-badge">S3: <strong>${state.stintResults[state.stintResults.length - 1].s3}s</strong></span>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- SEZIONE PROPOSTE CONTRATTUALI POST-TEST -->
          ${state.offers ? `
            <div class="rookie-contract-section" id="rookie-offers-anchor">
              <div class="offers-header-block">
                <span class="offers-subtag">OPPORTUNITÀ CONTRATTUALI SBLOCCATE DAI TUOI RISULTATI</span>
                <h3 class="offers-title">📝 Offerte di Ingaggio per la Stagione di Debutto 2026</h3>
                <p class="offers-desc">In base al tuo <strong>${state.playerRank}° posto</strong> nei Rookie Test, 3 scuderie ufficiali hanno avanzato una proposta d'ingaggio formale. Scegli attentamente la scuderia con cui iniziare la tua leggenda nel motorsport:</p>
              </div>

              <div class="rookie-offers-grid">
                ${state.offers.map((offer, idx) => `
                  <div class="rookie-offer-card ${idx === 0 ? 'top-tier-offer' : ''}">
                    <div class="offer-card-header" style="border-top: 4px solid ${offer.color};">
                      <span class="offer-tier-badge">${offer.tier}</span>
                      <h4 class="offer-team-name">${offer.teamName}</h4>
                      <div class="offer-scout-box">
                        ${offer.scoutVerdict}
                      </div>
                    </div>

                    <div class="offer-stats-grid">
                      <div class="offer-stat-item">
                        <span class="stat-lbl">Passo Mezzo</span>
                        <strong class="stat-val">${offer.pace} <small>/99</small></strong>
                      </div>
                      <div class="offer-stat-item">
                        <span class="stat-lbl">Affidabilità</span>
                        <strong class="stat-val" style="color: #10b981;">${offer.reliability}%</strong>
                      </div>
                      <div class="offer-stat-item">
                        <span class="stat-lbl">Stipendio a Gara</span>
                        <strong class="stat-val money">€${offer.salaryPerRace.toLocaleString()}</strong>
                      </div>
                      <div class="offer-stat-item">
                        <span class="stat-lbl">Bonus Vittoria</span>
                        <strong class="stat-val money">€${offer.winBonus.toLocaleString()}</strong>
                      </div>
                      <div class="offer-stat-item">
                        <span class="stat-lbl">Durata Contratto</span>
                        <strong class="stat-val">${offer.durationYears} ${offer.durationYears === 1 ? 'Anno' : 'Anni'}</strong>
                      </div>
                      <div class="offer-stat-item">
                        <span class="stat-lbl">Ruolo in Squadra</span>
                        <strong class="stat-val" style="color: #38bdf8;">${offer.role}</strong>
                      </div>
                    </div>

                    <div class="offer-action-footer">
                      <button class="btn-sign-contract" data-offer-id="${offer.id}">
                        <span>FIRMA CON ${offer.teamName.toUpperCase()} ➔</span>
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `;

      bindEvents();
    };

    const bindEvents = () => {
      // Cambio strategia stint
      container.querySelectorAll('.strat-btn').forEach(btn => {
        btn.onclick = () => {
          sound.playClick();
          container.querySelectorAll('.strat-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.activeStintStrategy = btn.dataset.strat;
        };
      });

      // Esegui singolo stint
      const singleBtn = container.querySelector('#btn-run-single-stint');
      if (singleBtn) {
        singleBtn.onclick = () => {
          runStint(state.activeStintStrategy);
          if (state.completedStints >= 3) {
            setTimeout(() => {
              const anchor = container.querySelector('#rookie-offers-anchor');
              if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        };
      }

      // Simula tutti i rimanenti stint
      const allBtn = container.querySelector('#btn-simulate-all-stints');
      if (allBtn) {
        allBtn.onclick = () => {
          while (state.completedStints < 3) {
            runStint(state.activeStintStrategy);
          }
          setTimeout(() => {
            const anchor = container.querySelector('#rookie-offers-anchor');
            if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        };
      }

      // Firma contratto scelto
      container.querySelectorAll('.btn-sign-contract').forEach(btn => {
        btn.onclick = () => {
          const offerId = btn.dataset.offerId;
          const chosenOffer = state.offers.find(o => o.id === offerId);
          if (!chosenOffer) return;

          sound.playChequeredFlag();
          ToastNotification.show(`✍️ Contratto firmato ufficialmente con ${chosenOffer.teamName}! Benvenuto nel paddock.`, "success");

          const contractData = {
            salaryPerRace: chosenOffer.salaryPerRace,
            durationYears: chosenOffer.durationYears,
            yearsLeft: chosenOffer.durationYears,
            role: chosenOffer.role,
            winBonus: chosenOffer.winBonus,
            buyoutClause: 0
          };

          // Salva anche i punti telemetria maturati durante i test rookie
          if (customDriver) {
            customDriver.initialTelemetryBonus = state.telemetryRewardPoints;
          }

          onContractSigned(chosenOffer.teamId, contractData);
        };
      });
    };

    render();
  }

  static formatLapTime(totalSeconds) {
    if (!totalSeconds || isNaN(totalSeconds)) return '--:--.---';
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    const millis = Math.floor((totalSeconds - Math.floor(totalSeconds)) * 1000);
    return `${mins}:${secs.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`;
  }
}
