import { career } from '../engine/careerEngine.js';
import { GoatScorer } from '../engine/goatScorer.js';
import { sound } from '../engine/audioManager.js';
import { ToastNotification } from './toastNotification.js';

export class GoatHallOfFameView {
  static currentFilter = 'all'; // 'all' | 'auto_f1' | 'auto_f2' | etc.

  static render(container, onNavigate) {
    const player = career.player;
    const careerData = career.career;
    const stats = careerData.stats;
    const discipline = player.discipline || 'auto';

    const categoriesList = discipline === 'auto'
      ? [
          { key: 'auto_f4', name: 'Formula 4 Regional Junior', icon: '🏁', tier: 'Livello 4 (Giovanili)' },
          { key: 'auto_f3', name: 'FIA Formula 3 Championship', icon: '🥉', tier: 'Livello 3' },
          { key: 'auto_f2', name: 'FIA Formula 2 World Series', icon: '🥈', tier: 'Livello 2 (Anticamera F1)' },
          { key: 'auto_f1', name: 'Formula 1 World Championship', icon: '👑', tier: 'Livello 1 (Massima Formula)' },
          { key: 'auto_wec', name: 'FIA World Endurance Championship (Hypercar)', icon: '⏱️', tier: 'Mondiale Endurance' },
          { key: 'auto_indy', name: 'NTT IndyCar Series', icon: '⚡', tier: 'Open Wheel USA' }
        ]
      : [
          { key: 'moto_3', name: 'Moto3 World Championship', icon: '🏁', tier: 'Livello 3 (Junior 250cc)' },
          { key: 'moto_2', name: 'Moto2 Intermediate Class', icon: '🥈', tier: 'Livello 2 (Triumph 765cc)' },
          { key: 'moto_sbk', name: 'FIM Superbike World Championship', icon: '⚡', tier: 'Derivate di Serie (1000cc)' },
          { key: 'moto_gp', name: 'MotoGP World Championship', icon: '👑', tier: 'Livello 1 (Prototipi 1000cc)' }
        ];

    const filterOptions = discipline === 'auto'
      ? [
          { key: 'all', label: '🌐 Tutte le Categorie (Totale)' },
          { key: 'auto_f1', label: '👑 Formula 1' },
          { key: 'auto_f2', label: '🥈 Formula 2' },
          { key: 'auto_f3', label: '🥉 Formula 3' },
          { key: 'auto_f4', label: '🏁 Formula 4' },
          { key: 'auto_wec', label: '⏱️ WEC Hypercar' },
          { key: 'auto_indy', label: '⚡ IndyCar' }
        ]
      : [
          { key: 'all', label: '🌐 Tutte le Classi (Totale)' },
          { key: 'moto_gp', label: '👑 MotoGP' },
          { key: 'moto_sbk', label: '⚡ WorldSBK' },
          { key: 'moto_2', label: '🥈 Moto2' },
          { key: 'moto_3', label: '🏁 Moto3' }
        ];

    const renderView = () => {
      // Calcolo analitico e dinamico del punteggio GOAT con pesi realistici per categoria
      const breakdown = GoatScorer.getScoreBreakdown(player, stats);
      const goatScore = breakdown.total;
      const verdict = GoatScorer.getTitleAndTier(goatScore);
      const hallOfFame = GoatScorer.getHallOfFameRanking(
        goatScore,
        player,
        stats,
        this.currentFilter,
        careerData.driverCareerStats
      );

      const statsByCategory = stats?.byCategory || {};

      // Calcolo dinamico in tempo reale della somma delle categorie per il giocatore
      const totalTitles = categoriesList.reduce((acc, cat) => acc + (statsByCategory[cat.key]?.worldTitles || 0), 0);
      const totalWins = categoriesList.reduce((acc, cat) => acc + (statsByCategory[cat.key]?.wins || 0), 0);
      const totalPodiums = categoriesList.reduce((acc, cat) => acc + (statsByCategory[cat.key]?.podiums || 0), 0);
      const totalPoles = categoriesList.reduce((acc, cat) => acc + (statsByCategory[cat.key]?.poles || 0), 0);
      const totalRaces = categoriesList.reduce((acc, cat) => acc + (statsByCategory[cat.key]?.racesStarted || 0), 0);
      const totalWinRate = totalRaces > 0 ? ((totalWins / totalRaces) * 100).toFixed(1) : '0.0';

      const currentFilterLabel = filterOptions.find(f => f.key === this.currentFilter)?.label || 'Tutte le Categorie';

      container.innerHTML = `
        <div class="goat-view-wrapper">
          <div class="goat-hero-banner">
            <div class="crown-glow-badge">👑 MOTORSPORT GOAT INDEX</div>
            <h1 class="goat-hero-title">${verdict.title}</h1>
            <p class="goat-hero-desc">${verdict.desc}</p>
            
            <div class="goat-score-meter-box">
              <span class="meter-label">IL TUO PUNTEGGIO LEGACY GOAT</span>
              <strong class="meter-score-glow">${goatScore} <small>PTS</small></strong>
              <span class="meter-rank">
                ${this.currentFilter === 'all' 
                  ? `Posizione Storica Mondiale: #${hallOfFame.playerRank} di ${hallOfFame.totalDrivers}` 
                  : `Classifica ${currentFilterLabel}: #${hallOfFame.playerRank} di ${hallOfFame.totalDrivers}`}
              </span>
            </div>
          </div>

          <div class="goat-main-grid">
            <!-- Scomposizione Punti Legacy -->
            <div class="dash-card goat-breakdown-card">
              <h3 class="card-title">Dettaglio Punteggio GOAT</h3>
              <p class="section-subtext">Calcolo ponderato per livello di categoria, prestigio dei titoli e dominanza in pista.</p>

              <div class="breakdown-list">
                <div class="breakdown-item">
                  <div class="breakdown-item-info">
                    <span>🏆 Titoli & Campionati Mondiali</span>
                    <small class="breakdown-subtext">${totalTitles} conquistati (pesati per prestigio categoria)</small>
                  </div>
                  <strong class="breakdown-pts">+${breakdown.titlesPoints} Punti</strong>
                </div>

                <div class="breakdown-item">
                  <div class="breakdown-item-info">
                    <span>🥇 Vittorie nei Gran Premi</span>
                    <small class="breakdown-subtext">${totalWins} successi ufficiali</small>
                  </div>
                  <strong class="breakdown-pts">+${breakdown.winsPoints} Punti</strong>
                </div>

                <div class="breakdown-item">
                  <div class="breakdown-item-info">
                    <span>⏱️ Pole Position Ufficiali</span>
                    <small class="breakdown-subtext">${totalPoles} partenze al palo</small>
                  </div>
                  <strong class="breakdown-pts">+${breakdown.polesPoints} Punti</strong>
                </div>

                <div class="breakdown-item">
                  <div class="breakdown-item-info">
                    <span>🍾 Piazzamenti a Podio</span>
                    <small class="breakdown-subtext">${totalPodiums} volte tra i primi 3</small>
                  </div>
                  <strong class="breakdown-pts">+${breakdown.podiumsPoints} Punti</strong>
                </div>

                <div class="breakdown-item">
                  <div class="breakdown-item-info">
                    <span>🏎️ Tasso di Vittorie & Dominio (${breakdown.winRate}%)</span>
                    <small class="breakdown-subtext">Rapporto vittorie/gare disputate ponderato</small>
                  </div>
                  <strong class="breakdown-pts">+${breakdown.dominancePoints} Punti</strong>
                </div>

                <div class="breakdown-item">
                  <div class="breakdown-item-info">
                    <span>⚔️ Dominio sul Compagno (${stats.teammateBeatenCount || 0}x)</span>
                    <small class="breakdown-subtext">Stagioni concluse davanti al vicino di box</small>
                  </div>
                  <strong class="breakdown-pts">+${breakdown.teammatePoints} Punti</strong>
                </div>

                <div class="breakdown-item">
                  <div class="breakdown-item-info">
                    <span>⭐ Picco di Valutazione Pilota (${stats.peakOvr || player.ovr} OVR)</span>
                    <small class="breakdown-subtext">Livello di abilità e notorietà raggiunto</small>
                  </div>
                  <strong class="breakdown-pts">+${breakdown.peakOvrPoints} Punti</strong>
                </div>

                <div class="breakdown-item">
                  <div class="breakdown-item-info">
                    <span>🏁 Gare Disputate & Longevità (${totalRaces} GP)</span>
                    <small class="breakdown-subtext">Esperienza accumulata nei campionati</small>
                  </div>
                  <strong class="breakdown-pts">+${breakdown.longevityPoints} Punti</strong>
                </div>

                ${breakdown.specialWinsPoints > 0 ? `
                  <div class="breakdown-item special-highlight">
                    <div class="breakdown-item-info">
                      <span>👑 Gare di Prestigio Storico / Triple Crown</span>
                      <small class="breakdown-subtext">Successi nei classici monumenti del motorsport</small>
                    </div>
                    <strong class="breakdown-pts gold-text">+${breakdown.specialWinsPoints} Punti</strong>
                  </div>
                ` : ''}
              </div>

              ${!careerData.isRetired ? `
                <div class="retire-action-box">
                  <button id="btn-retire-career" class="retire-button danger">
                    <span>ANNUNCIA IL RITIRO DALLE CORSE 🏁</span>
                    <small>Sigilla per sempre le tue statistiche e ritirati da leggenda</small>
                  </button>
                </div>
              ` : `
                <div class="retired-badge-box" style="display: flex; flex-direction: column; gap: 8px;">
                  <span class="retired-stamp">PILOTA UFFICIALMENTE RITIRATO</span>
                  <button id="btn-open-retirement-summary" class="modal-btn btn-gold" style="margin-top: 8px;">
                    <span>📜 VEDI SCHERMATA DI RIEPILOGO RITIRO ➔</span>
                  </button>
                </div>
              `}
            </div>

            <!-- Classifica All-Time Hall of Fame con Filtro Categorie Dinamico -->
            <div class="dash-card hall-of-fame-card">
              <div class="card-title-row" style="flex-direction: column; align-items: flex-start; gap: 8px;">
                <h3 class="card-title">Classifica Storica dei Mostri Sacri</h3>
                <p class="section-subtext">
                  Statistiche storiche e dinamiche aggiornate durante la carriera di gioco. Confronta i titoli e i successi totali o filtra per ciascuna categoria!
                </p>
              </div>

              <!-- BARRA DEI FILTRI CATEGORIA -->
              <div class="goat-filter-bar" style="display: flex; gap: 6px; flex-wrap: wrap; margin: 12px 0 16px 0;">
                ${filterOptions.map(opt => `
                  <button class="goat-filter-pill ${this.currentFilter === opt.key ? 'active' : ''}" data-cat="${opt.key}">
                    ${opt.label}
                  </button>
                `).join('')}
              </div>

              <div class="table-scroll-hint">
                <span>👈 Scorri la classifica per vedere tutti i dati (Titoli, Vittorie, Podi, GOAT Score) 👉</span>
              </div>

              <div class="hall-table-wrapper">
                <table class="motorsport-table compact">
                  <thead>
                    <tr>
                      <th>RANK</th>
                      <th>PILOTA / LEGGENDARIO</th>
                      <th>ERA</th>
                      <th class="text-center">TITOLI</th>
                      <th class="text-center">VITTORIE</th>
                      <th class="text-center">PODI</th>
                      ${this.currentFilter !== 'all' ? '<th class="text-center">POLE</th>' : ''}
                      <th class="text-right">${this.currentFilter === 'all' ? 'GOAT SCORE' : 'PUNTI CATEGORIA'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${hallOfFame.ranking.map((leg, idx) => `
                      <tr class="${leg.isPlayer ? 'player-hall-row' : ''}">
                        <td class="pos-cell"><span class="badge pos-${idx + 1}">${idx + 1}</span></td>
                        <td class="pilot-cell">
                          <div class="pilot-cell-inner">
                            <strong>${leg.name}</strong>
                            ${leg.isPlayer ? '<span class="you-tag">TU</span>' : ''}
                            ${leg.isLegend ? '<span class="legend-chip">LEGGENDA</span>' : ''}
                            ${leg.isRetired ? '<span class="retired-chip">RITIRATO</span>' : ''}
                          </div>
                          ${leg.notableNote ? `<small class="legend-note">${leg.notableNote}</small>` : ''}
                        </td>
                        <td><small>${leg.era}</small></td>
                        <td class="stat-cell text-center">
                          ${leg.titles > 0 ? `<strong class="gold-text">🏆 ${leg.titles}</strong>` : '<span class="text-muted">0</span>'}
                        </td>
                        <td class="stat-cell text-center">
                          <strong class="${leg.wins > 0 ? 'win-count' : 'text-muted'}">${leg.wins}</strong>
                        </td>
                        <td class="stat-cell text-center">
                          <strong class="${leg.podiums > 0 ? '' : 'text-muted'}">${leg.podiums}</strong>
                        </td>
                        ${this.currentFilter !== 'all' ? `
                          <td class="stat-cell text-center">
                            <strong class="${leg.poles > 0 ? '' : 'text-muted'}">${leg.poles}</strong>
                          </td>
                        ` : ''}
                        <td class="points-cell text-right">
                          <strong class="${leg.isPlayer ? 'gold-text' : ''}">${leg.goatScore}</strong>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- SCHEDA PALMARES PILOTA PER CATEGORIA -->
          <div class="dash-card goat-categories-card">
            <div class="card-title-row">
              <div>
                <h3 class="card-title">🏁 Palmarès Pilota Diviso per Categoria</h3>
                <p class="section-subtext">Ripartizione dinamica di Titoli Mondiali, Vittorie, Podi, Pole e Gare corse in ciascun campionato.</p>
              </div>
              <div class="goat-stats-summary-pill">
                <span>Totale Carriera: <strong>${totalTitles} ${totalTitles === 1 ? 'Titolo' : 'Titoli'}</strong> • <strong>${totalWins} Vittorie</strong> • <strong>${totalPoles} Pole</strong> • <strong>${totalPodiums} Podi</strong></span>
              </div>
            </div>

            <div class="table-scroll-hint">
              <span>👈 Scorri il palmarès per visualizzare tutte le statistiche per categoria 👉</span>
            </div>

            <div class="table-responsive">
              <table class="motorsport-table full-table">
                <thead>
                  <tr>
                    <th>CATEGORIA</th>
                    <th>SERIE / LIVELLO</th>
                    <th class="text-center">CAMPIONATI MONDIALI</th>
                    <th class="text-center">VITTORIE</th>
                    <th class="text-center">PODI</th>
                    <th class="text-center">POLE POSITION</th>
                    <th class="text-center">GARE DISPUTATE</th>
                    <th class="text-right">% VITTORIE</th>
                  </tr>
                </thead>
                <tbody>
                  ${categoriesList.map(cat => {
                    const s = statsByCategory[cat.key] || { poles: 0, wins: 0, podiums: 0, racesStarted: 0, worldTitles: 0 };
                    const isCurrent = careerData.currentCategory === cat.key;
                    const winRate = s.racesStarted > 0 ? ((s.wins / s.racesStarted) * 100).toFixed(1) : '0.0';
                    const hasRaced = s.racesStarted > 0 || s.worldTitles > 0;

                    return `
                      <tr class="${isCurrent ? 'player-standings-row highlight' : (hasRaced ? '' : 'faded-row')}">
                        <td class="driver-cell">
                          <div class="driver-cell-flex">
                            <span class="cat-icon-badge">${cat.icon}</span>
                            <div class="driver-names-box">
                              <strong class="pilot-name">${cat.name}</strong>
                              ${isCurrent ? '<span class="you-badge">CATEGORIA ATTUALE</span>' : ''}
                            </div>
                          </div>
                        </td>
                        <td class="team-cell">
                          <small>${cat.tier}</small>
                        </td>
                        <td class="stat-cell text-center">
                          ${s.worldTitles > 0 
                            ? `<strong class="gold-text" style="font-size: 15px;">🏆 ${s.worldTitles}</strong>` 
                            : '<span class="text-muted">0</span>'}
                        </td>
                        <td class="stat-cell text-center">
                          <strong class="${s.wins > 0 ? 'win-count' : 'text-muted'}">${s.wins}</strong>
                        </td>
                        <td class="stat-cell text-center">
                          <strong class="${s.podiums > 0 ? '' : 'text-muted'}">${s.podiums}</strong>
                        </td>
                        <td class="stat-cell text-center">
                          <strong class="${s.poles > 0 ? '' : 'text-muted'}">${s.poles}</strong>
                        </td>
                        <td class="stat-cell text-center">
                          <span>${s.racesStarted}</span>
                        </td>
                        <td class="gap-cell text-right">
                          <strong class="${parseFloat(winRate) > 0 ? 'gold-text' : 'text-muted'}">${winRate}%</strong>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
                <tfoot>
                  <tr class="table-total-row">
                    <td class="driver-cell">
                      <div class="driver-cell-flex">
                        <span class="cat-icon-badge">🏁</span>
                        <div class="driver-names-box">
                          <strong class="pilot-name gold-text">TOTALE CARRIERA</strong>
                        </div>
                      </div>
                    </td>
                    <td class="team-cell">
                      <small class="gold-text">Tutte le categorie</small>
                    </td>
                    <td class="stat-cell text-center">
                      ${totalTitles > 0 
                        ? `<strong class="gold-text" style="font-size: 15px;">🏆 ${totalTitles}</strong>` 
                        : '<span class="text-muted">0</span>'}
                    </td>
                    <td class="stat-cell text-center">
                      <strong class="${totalWins > 0 ? 'win-count' : 'text-muted'}">${totalWins}</strong>
                    </td>
                    <td class="stat-cell text-center">
                      <strong class="${totalPodiums > 0 ? '' : 'text-muted'}">${totalPodiums}</strong>
                    </td>
                    <td class="stat-cell text-center">
                      <strong class="${totalPoles > 0 ? '' : 'text-muted'}">${totalPoles}</strong>
                    </td>
                    <td class="stat-cell text-center">
                      <strong>${totalRaces}</strong>
                    </td>
                    <td class="gap-cell text-right">
                      <strong class="${parseFloat(totalWinRate) > 0 ? 'gold-text' : 'text-muted'}">${totalWinRate}%</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div class="finish-weekend-action-bar">
            <button id="btn-return-from-goat" class="start-race-button">
              <span>RITORNA AL PADDOCK ➔</span>
            </button>
          </div>
        </div>
      `;

      // Event listeners per i bottoni dei filtri
      container.querySelectorAll('.goat-filter-pill').forEach(btn => {
        btn.onclick = () => {
          sound.playClick();
          this.currentFilter = btn.dataset.cat;
          renderView();
        };
      });

      // Event listeners per il ritiro
      const retireBtn = container.querySelector('#btn-retire-career');
      if (retireBtn) {
        retireBtn.onclick = () => {
          ToastNotification.confirm({
            title: "Ritiro Definitivo dalle Corse",
            message: "Vuoi davvero annunciare il tuo ritiro ufficiale dalle corse? La tua leggenda e le tue statistiche saranno celebrate per sempre nella Hall of Fame del motorsport.",
            confirmText: "Annuncia Ritiro 🏁",
            cancelText: "Continua a Correre",
            danger: true,
            onConfirm: () => {
              sound.playChequeredFlag();
              career.retire();
              ToastNotification.show("Hai ufficializzato il tuo ritiro dalle corse.", "info");
              onNavigate('retirement');
            }
          });
        };
      }

      const summaryBtn = container.querySelector('#btn-open-retirement-summary');
      if (summaryBtn) {
        summaryBtn.onclick = () => {
          sound.playClick();
          onNavigate('retirement');
        };
      }

      const returnBtn = container.querySelector('#btn-return-from-goat');
      if (returnBtn) {
        returnBtn.onclick = () => {
          sound.playClick();
          onNavigate('dashboard');
        };
      }
    };

    renderView();
  }
}
