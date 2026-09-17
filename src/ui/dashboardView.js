import { career } from '../engine/careerEngine.js';
import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';
import { ToastNotification } from './toastNotification.js';
import { DriverSkillsModal } from './driverSkillsModal.js';
import { SeasonEndModal } from './seasonEndModal.js';

export class DashboardView {
  static render(container, onNavigate) {
    const player = career.player;
    const careerData = career.career;
    const circuit = career.getNextCircuit();
    const team = career.getPlayerTeam();
    const teammate = career.getCurrentTeammate();
    const catData = career.getCurrentCategoryData();
    const isSeasonEnd = careerData.currentRaceIndex >= catData.calendar.length;
    const seriesName = db.getSeriesName(careerData.currentCategory, player.discipline);

    // Leader della classifica per il mini-widget riassuntivo
    const driverStandings = careerData.standings.drivers || [];
    const playerStandingIndex = driverStandings.findIndex(d => d.isPlayer);
    const playerRank = playerStandingIndex >= 0 ? playerStandingIndex + 1 : 1;
    const playerPoints = playerStandingIndex >= 0 ? driverStandings[playerStandingIndex].points : 0;
    const leaderPoints = driverStandings[0]?.points || 0;

    container.innerHTML = `
      <div class="dashboard-wrapper paddock-hub">
        <!-- BANNER EROE PROSSIMA GARA / WEEKEND RACE CONTROL -->
        <div class="next-race-hero-card">
          <div class="hero-left-info">
            <div class="gp-round-pill">
              <span class="pulse-dot"></span>
              ROUND ${careerData.currentRaceIndex + 1} DI ${catData.calendar.length} • STAGIONE ${careerData.seasonNumber} (${seriesName})
            </div>
            
            <h2 class="gp-circuit-title">
              ${circuit ? `${circuit.flag} ${circuit.displayName}` : '🏁 STAGIONE MONDIALE COMPLETATA'}
            </h2>
            
            <p class="gp-circuit-desc">
              ${circuit 
                ? circuit.description 
                : 'Tutti i Gran Premi previsti dal calendario sono stati disputati. Procedi alle celebrazioni finali e alla sessione di mercato estiva.'}
            </p>
            
            ${circuit ? `
              <div class="gp-telemetry-badges">
                <span class="telemetry-badge">📏 <strong>${circuit.lengthKm} km</strong></span>
                <span class="telemetry-badge">🔄 <strong>${Math.round((player.discipline === 'auto' ? circuit.lapsF1 : circuit.lapsMoto) * (catData.weekendFormat.raceLapsMultiplier || 1))} Giri Previsti</strong></span>
                <span class="telemetry-badge">🛞 Usura Gomme: <strong>${'★'.repeat(circuit.tyreStress || 3)}${'☆'.repeat(5 - (circuit.tyreStress || 3))}</strong></span>
                <span class="telemetry-badge">🌧️ Meteo: <strong>${circuit.rainChance > 0.25 ? 'Rischio Pioggia (30%+)' : 'Asciutto / Sereno'}</strong></span>
                <span class="telemetry-badge">🌬️ Carico: <strong class="upper">${circuit.downforceLevel || 'Medio'}</strong></span>
              </div>
            ` : ''}
          </div>

          <div class="hero-right-action">
            ${!isSeasonEnd ? `
              <button id="btn-enter-weekend" class="hero-action-btn pulse-glow">
                <span class="btn-main-label">PARTECIPA AL GRAN PREMIO ➔</span>
                <span class="btn-sub-label">Prove Libere • Qualifiche • Gara Ufficiale</span>
              </button>
            ` : `
              <button id="btn-conclude-season" class="hero-action-btn gold-glow">
                <span class="btn-main-label">CONCLUDI LA STAGIONE 🏆</span>
                <span class="btn-sub-label">Festeggia i Titoli e Apri la Sessione di Mercato</span>
              </button>
            `}
          </div>
        </div>

        <!-- GRIGLIA MODULARE PADDOCK: Notizie, Sfida Compagno, Riepilogo Punti & Navigazione -->
        <div class="paddock-main-grid">
          <!-- Colonna Sinistra: Briefing Tecnico & Sfida Interna -->
          <div class="paddock-left-column">
            <!-- Scheda Sfida Interna Compagno di Squadra -->
            <div class="dash-card teammate-card">
              <div class="card-title-row">
                <h3 class="card-title">⚔️ Sfida Interna: Tu vs Compagno di Scuderia</h3>
                <div class="team-identity-badge">
                  <span class="team-badge-bullet" style="background:${team.color || '#e10600'}; box-shadow: 0 0 8px ${team.color || '#e10600'}"></span>
                  <span class="team-badge-name">${team.displayName || team.realName || team.fictionalName || team.name || 'Scuderia'}</span>
                </div>
              </div>

              <div class="h2h-comparison-box">
                <div class="h2h-driver-side you">
                  <span class="h2h-label">IL TUO PILOTA</span>
                  <strong class="h2h-name">${player.firstName} ${player.lastName}</strong>
                  <span class="h2h-ovr">${player.ovr} OVR</span>
                  <span class="h2h-role">Ruolo: ${careerData.contract?.role || '1° Pilota'}</span>
                </div>

                <div class="h2h-vs-badge">VS</div>

                <div class="h2h-driver-side opponent">
                  <span class="h2h-label">COMPAGNO DI SQUADRA</span>
                  <strong class="h2h-name">${teammate.name}</strong>
                  <span class="h2h-ovr">${teammate.ovr} OVR</span>
                  <span class="h2h-role">Stessa ${player.discipline === 'auto' ? 'Vettura' : 'Moto'}</span>
                </div>
              </div>
              <p class="h2h-desc">Nel motorsport la prima regola è battere chi guida il tuo stesso mezzo. Mantieni il vantaggio per conservare la priorità tecnica negli sviluppi!</p>
            </div>

            <!-- Scheda Notizie dal Paddock & Radiocronaca -->
            <div class="dash-card paddock-news-card">
              <h3 class="card-title">🎙️ Rassegna Stampa & Voci dal Paddock</h3>
              <div class="news-items-list">
                <div class="news-item">
                  <span class="news-tag">UFFICIALE</span>
                  <div class="news-text">
                    <strong>Tutto pronto per il Round ${careerData.currentRaceIndex + 1}:</strong>
                    Gli ingegneri di ${team.displayName || team.realName || team.fictionalName || team.name || 'Scuderia'} stanno ultimando i controlli telemetrici in vista della prima sessione di prove libere.
                  </div>
                </div>
                <div class="news-item">
                  <span class="news-tag highlight">MERCATO</span>
                  <div class="news-text">
                    <strong>Voci dal muretto:</strong>
                    I team manager osservano con estrema attenzione le tue prestazioni. Un podio nel prossimo GP potrebbe sbloccare offerte per il 2027.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Colonna Destra: Mini Stato Campionato & Scorciatoie Dedicate -->
          <div class="paddock-right-column">
            <!-- Scheda Stato nel Mondiale -->
            <div class="dash-card standings-mini-card">
              <div class="card-title-row">
                <h3 class="card-title">🏆 Posizione nel Mondiale</h3>
                <button id="btn-view-full-standings" class="link-btn">Vedi Classifica Completa ➔</button>
              </div>

              <div class="mini-standings-overview">
                <div class="standing-stat-box">
                  <span class="standing-rank-num">#${playerRank}</span>
                  <span class="standing-rank-lbl">Posizione Iride</span>
                </div>
                <div class="standing-stat-details">
                  <div class="stat-line">
                    <span>Punti Totali:</span>
                    <strong>${playerPoints} pts</strong>
                  </div>
                  <div class="stat-line">
                    <span>Distacco dal Leader:</span>
                    <strong class="${playerRank === 1 ? 'gold-text' : ''}">${playerRank === 1 ? 'LEADER DEL MONDIALE' : `-${leaderPoints - playerPoints} pts`}</strong>
                  </div>
                  <div class="stat-line">
                    <span>Vittorie Stagionali:</span>
                    <strong>${careerData.standings.drivers.find(d => d.isPlayer)?.wins || 0}</strong>
                  </div>
                </div>
              </div>
            </div>

            <!-- Scheda Stato Tecnico Mezzo & Sviluppo -->
            <div class="dash-card tech-mini-card">
              <div class="card-title-row">
                <h3 class="card-title">⚙️ Stato Tecnico ${player.discipline === 'auto' ? 'Monoposto' : 'Prototipo'}</h3>
                <button id="btn-view-full-rd" class="link-btn">Apri Reparto Corse ➔</button>
              </div>

              <div class="tech-mini-content">
                <div class="tech-metric-row">
                  <span>Passo Competitivo:</span>
                  <strong class="metric-val">${team.carPace || team.bikePace}/99 OVR</strong>
                </div>
                <div class="tech-metric-row">
                  <span>Livello Upgrade R&D:</span>
                  <strong class="metric-val">${Object.values(careerData.carUpgrades || {}).reduce((a, b) => a + b, 0)} / 20 Livelli</strong>
                </div>
                <div class="tech-metric-row">
                  <span>Budget di Squadra:</span>
                  <strong class="metric-val money">€${careerData.money.toLocaleString()}</strong>
                </div>
              </div>
            </div>

            <!-- Scheda Abilità Pilota & Obiettivi Sponsor del Weekend -->
            <div class="dash-card driver-skills-card">
              <div class="card-title-row">
                <div class="card-title-flex">
                  <h3 class="card-title">👤 Abilità Pilota & OVR (${player.age} Anni)</h3>
                  <span class="driver-peak-badge">Picco: ${careerData.stats.peakOvr || player.ovr} OVR</span>
                </div>
                <button id="btn-open-skills-card-modal" class="btn-skills-action-pill ${player.unspentSkillPoints > 0 ? 'pulse-glow has-points' : ''}" title="Clicca per aprire la Scheda OVR e assegnare i Punti Abilità">
                  ${player.unspentSkillPoints > 0 ? `⭐ ${player.unspentSkillPoints} Punti da Assegnare!` : '📊 Scheda OVR & Sviluppo ➔'}
                </button>
              </div>

              <div class="driver-attributes-mini-grid">
                <div class="driver-attr-item">
                  <div class="attr-lbl-row">
                    <span>Giro Secco</span>
                    <strong class="attr-val">${Math.round(player.attributes.pace)}</strong>
                  </div>
                  <div class="attr-bar-track"><div class="attr-bar-fill pace" style="width:${player.attributes.pace}%"></div></div>
                </div>
                <div class="driver-attr-item">
                  <div class="attr-lbl-row">
                    <span>Staccata</span>
                    <strong class="attr-val">${Math.round(player.attributes.racecraft)}</strong>
                  </div>
                  <div class="attr-bar-track"><div class="attr-bar-fill racecraft" style="width:${player.attributes.racecraft}%"></div></div>
                </div>
                <div class="driver-attr-item">
                  <div class="attr-lbl-row">
                    <span>Gestione Gomme</span>
                    <strong class="attr-val">${Math.round(player.attributes.tyreMgmt)}</strong>
                  </div>
                  <div class="attr-bar-track"><div class="attr-bar-fill tyre" style="width:${player.attributes.tyreMgmt}%"></div></div>
                </div>
                <div class="driver-attr-item">
                  <div class="attr-lbl-row">
                    <span>Costanza</span>
                    <strong class="attr-val">${Math.round(player.attributes.consistency)}</strong>
                  </div>
                  <div class="attr-bar-track"><div class="attr-bar-fill consistency" style="width:${player.attributes.consistency}%"></div></div>
                </div>
                <div class="driver-attr-item">
                  <div class="attr-lbl-row">
                    <span>Bagnato</span>
                    <strong class="attr-val">${Math.round(player.attributes.wetSkill)}</strong>
                  </div>
                  <div class="attr-bar-track"><div class="attr-bar-fill wet" style="width:${player.attributes.wetSkill}%"></div></div>
                </div>
                <div class="driver-attr-item">
                  <div class="attr-lbl-row">
                    <span>Telemetria</span>
                    <strong class="attr-val">${Math.round(player.attributes.technicalFeedback)}</strong>
                  </div>
                  <div class="attr-bar-track"><div class="attr-bar-fill tech" style="width:${player.attributes.technicalFeedback}%"></div></div>
                </div>
              </div>

              <!-- Obiettivi Sponsor Weekend -->
              <div class="weekend-sponsor-targets-box">
                <div class="sponsor-header">
                  <span class="sponsor-tag">🎯 OBIETTIVI SPONSOR WEEKEND</span>
                  <span class="sponsor-prize-total">+€25.000 in palio</span>
                </div>
                <div class="sponsor-target-item">
                  <span class="target-icon">🏁</span>
                  <div class="target-info">
                    <strong>Batti il compagno (${teammate.name.split(' ').slice(-1)[0]})</strong>
                    <small>Miglior piazzamento tra Qualifica e Gara</small>
                  </div>
                  <span class="target-reward">+€10.000</span>
                </div>
                <div class="sponsor-target-item">
                  <span class="target-icon">🎖️</span>
                  <div class="target-info">
                    <strong>Traguardo in Zona Punti (Top 10)</strong>
                    <small>Porta punti iride alla scuderia nel Gran Premio</small>
                  </div>
                  <span class="target-reward">+€15.000 • +2 Pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents(container, onNavigate);
  }

  static bindEvents(container, onNavigate) {
    const enterWeekendBtn = container.querySelector('#btn-enter-weekend');
    if (enterWeekendBtn) {
      enterWeekendBtn.onclick = () => {
        sound.playEngineRev();
        onNavigate('weekend');
      };
    }

    const concludeBtn = container.querySelector('#btn-conclude-season');
    if (concludeBtn) {
      concludeBtn.onclick = () => {
        sound.playRadioBeep();
        const result = career.concludeSeason();
        SeasonEndModal.open(result, () => {
          onNavigate('dashboard');
        });
      };
    }

    // Navigazioni dedicate
    const viewStandingsBtn = container.querySelector('#btn-view-full-standings');
    if (viewStandingsBtn) {
      viewStandingsBtn.onclick = () => { sound.playClick(); onNavigate('standings'); };
    }

    const viewRdBtn = container.querySelector('#btn-view-full-rd');
    if (viewRdBtn) {
      viewRdBtn.onclick = () => { sound.playClick(); onNavigate('rd'); };
    }

    const openSkillsModalBtn = container.querySelector('#btn-open-skills-card-modal');
    if (openSkillsModalBtn) {
      openSkillsModalBtn.onclick = () => {
        sound.playClick();
        DriverSkillsModal.open();
      };
    }
  }
}
