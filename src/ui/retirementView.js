import { career } from '../engine/careerEngine.js';
import { GoatScorer } from '../engine/goatScorer.js';
import { sound } from '../engine/audioManager.js';
import { ToastNotification } from './toastNotification.js';
import { db } from '../data/databaseManager.js';

export class RetirementView {
  static render(container, onNavigate) {
    const player = career.player;
    const careerData = career.career;
    const stats = careerData.stats || {};
    const history = careerData.history || [];

    // Calcolo GOAT score finale
    const breakdown = GoatScorer.getScoreBreakdown(player, stats);
    const goatScore = breakdown.total;
    const verdict = GoatScorer.getTitleAndTier(goatScore);
    const hallOfFame = GoatScorer.getHallOfFameRanking(goatScore, player, stats, 'all', careerData.driverCareerStats);

    const discipline = player.discipline || 'auto';
    const totalSeasons = history.length > 0 ? history.length : Math.max(1, careerData.seasonNumber || 1);
    const startYear = history.length > 0 ? history[0].year : (careerData.stats.startYear || 2026);
    const endYear = careerData.currentYear || 2026;

    const categoriesList = discipline === 'auto'
      ? [
          { key: 'auto_f4', name: 'Formula 4 Regional Junior', icon: '🏁' },
          { key: 'auto_f3', name: 'FIA Formula 3 Championship', icon: '🥉' },
          { key: 'auto_f2', name: 'FIA Formula 2 World Series', icon: '🥈' },
          { key: 'auto_f1', name: 'Formula 1 World Championship', icon: '👑' },
          { key: 'auto_wec', name: 'FIA World Endurance Championship (Hypercar)', icon: '⏱️' },
          { key: 'auto_indy', name: 'NTT IndyCar Series', icon: '⚡' }
        ]
      : [
          { key: 'moto_3', name: 'Moto3 World Championship', icon: '🏁' },
          { key: 'moto_2', name: 'Moto2 Intermediate Class', icon: '🥈' },
          { key: 'moto_sbk', name: 'FIM Superbike World Championship', icon: '⚡' },
          { key: 'moto_gp', name: 'MotoGP World Championship', icon: '👑' }
        ];

    const statsByCategory = stats.byCategory || {};

    container.innerHTML = `
      <div class="page-container retirement-summary-page">
        <!-- HERO RETIREMENT BANNER -->
        <div class="retirement-hero-card">
          <div class="retirement-hero-badge">
            🏁 CERIMONIA DI RITIRO UFFICIALE DAL MOTORSPORT • ONORE ALLA LEGGENDA 👑
          </div>

          <div class="retirement-driver-header">
            <div class="retirement-avatar-box">
              <span class="avatar-icon">${discipline === 'auto' ? '🏎️' : '🏍️'}</span>
            </div>
            <div class="retirement-titles-box">
              <span class="retire-label">PILOTA DELLA HALL OF FAME MONDIALE</span>
              <h1 class="retirement-driver-name">
                ${player.firstName} ${player.lastName}
                <small class="retirement-nickname">"${player.nickname || 'Leggenda'}"</small>
              </h1>
              <div class="retirement-meta-chips">
                <span class="meta-chip">🇮🇹 ${player.nationality || 'ITA'}</span>
                <span class="meta-chip">📅 Anni di Attività: ${startYear} – ${endYear} (${totalSeasons} ${totalSeasons === 1 ? 'Stagione' : 'Stagioni'})</span>
                <span class="meta-chip">⭐ Età al Ritiro: ${player.age} Anni</span>
                <span class="meta-chip">🏆 Peak OVR: ${stats.peakOvr || player.ovr} OVR</span>
              </div>
            </div>
          </div>

          <!-- SCORE BOX CELEBRATIVO -->
          <div class="retirement-score-card">
            <div class="score-card-left">
              <span class="score-subtext">VERDETTO MOTORSPORT GOAT INDEX</span>
              <h2 class="verdict-title-glow">${verdict.title}</h2>
              <p class="verdict-desc-text">${verdict.desc}</p>
            </div>
            <div class="score-card-right">
              <span class="meter-label">PUNTEGGIO STORICO FINALE</span>
              <strong class="retirement-goat-score">${goatScore} <small>/ 1000</small></strong>
              <span class="retirement-hof-rank">
                Posizione nella Hall of Fame: <strong>#${hallOfFame.playerRank}</strong> su ${hallOfFame.totalDrivers} Piloti
              </span>
            </div>
          </div>
        </div>

        <!-- GRIGLIA RECORD E GRANDI NUMERI DI CARRIERA -->
        <div class="dash-card retirement-milestones-card">
          <h3 class="card-title">🎖️ Record Storici e Palmarès di Carriera</h3>
          <p class="section-subtext">Il bilancio definitivo e indelebile scolpito nella storia dei motori.</p>

          <div class="retirement-stats-grid">
            <div class="retire-stat-box gold-glow">
              <span class="stat-icon">🏆</span>
              <strong class="stat-number gold-text">${stats.worldTitles || 0}</strong>
              <span class="stat-name">TITOLI MONDIALI</span>
            </div>

            <div class="retire-stat-box">
              <span class="stat-icon">🥇</span>
              <strong class="stat-number win-count">${stats.wins || 0}</strong>
              <span class="stat-name">VITTORIE NEI GP</span>
            </div>

            <div class="retire-stat-box">
              <span class="stat-icon">🍾</span>
              <strong class="stat-number">${stats.podiums || 0}</strong>
              <span class="stat-name">PIAZZAMENTI A PODIO</span>
            </div>

            <div class="retire-stat-box">
              <span class="stat-icon">⏱️</span>
              <strong class="stat-number">${stats.poles || 0}</strong>
              <span class="stat-name">POLE POSITION</span>
            </div>

            <div class="retire-stat-box">
              <span class="stat-icon">🏁</span>
              <strong class="stat-number">${stats.racesStarted || 0}</strong>
              <span class="stat-name">GARE DISPUTATE</span>
            </div>

            <div class="retire-stat-box">
              <span class="stat-icon">📊</span>
              <strong class="stat-number">${stats.racesStarted > 0 ? ((stats.wins / stats.racesStarted) * 100).toFixed(1) : 0}%</strong>
              <span class="stat-name">% VITTORIE</span>
            </div>

            <div class="retire-stat-box">
              <span class="stat-icon">⚔️</span>
              <strong class="stat-number">${stats.teammateBeatenCount || 0}</strong>
              <span class="stat-name">COMPAGNI BATTUTI</span>
            </div>

            <div class="retire-stat-box">
              <span class="stat-icon">💰</span>
              <strong class="stat-number money">€${(stats.careerEarnings || 0).toLocaleString()}</strong>
              <span class="stat-name">GUADAGNI CARRIERA</span>
            </div>
          </div>
        </div>

        <!-- PALMARES PER CATEGORIA -->
        <div class="dash-card retirement-categories-card">
          <h3 class="card-title">🏁 Palmarès Pilota per Categoria</h3>
          <p class="section-subtext">Ripartizione ufficiale di tutti i successi conquistati nella piramide del motorsport.</p>

          <div class="table-responsive">
            <table class="motorsport-table full-table">
              <thead>
                <tr>
                  <th>CATEGORIA</th>
                  <th class="text-center">TITOLI MONDIALI</th>
                  <th class="text-center">VITTORIE</th>
                  <th class="text-center">PODI</th>
                  <th class="text-center">POLE</th>
                  <th class="text-center">GARE CORSE</th>
                  <th class="text-right">% VITTORIE</th>
                </tr>
              </thead>
              <tbody>
                ${categoriesList.map(cat => {
                  const s = statsByCategory[cat.key] || { poles: 0, wins: 0, podiums: 0, racesStarted: 0, worldTitles: 0 };
                  const winRate = s.racesStarted > 0 ? ((s.wins / s.racesStarted) * 100).toFixed(1) : '0.0';
                  const hasRaced = s.racesStarted > 0 || s.worldTitles > 0;

                  return `
                    <tr class="${hasRaced ? '' : 'faded-row'}">
                      <td class="driver-cell">
                        <div class="driver-cell-flex">
                          <span class="cat-icon-badge">${cat.icon}</span>
                          <strong class="pilot-name">${cat.name}</strong>
                        </div>
                      </td>
                      <td class="stat-cell text-center">
                        ${s.worldTitles > 0 ? `<strong class="gold-text">🏆 ${s.worldTitles}</strong>` : '<span class="text-muted">0</span>'}
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
                      <td class="stat-cell text-center">${s.racesStarted}</td>
                      <td class="gap-cell text-right">
                        <strong class="${parseFloat(winRate) > 0 ? 'gold-text' : 'text-muted'}">${winRate}%</strong>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- TIMELINE STORICA CARRIERA ANNO DOPO ANNO -->
        ${history.length > 0 ? `
          <div class="dash-card retirement-timeline-card">
            <h3 class="card-title">📖 Cronistoria della Carriera: Anno dopo Anno</h3>
            <p class="section-subtext">Il percorso memorabile attraverso campionati, scuderie e trionfi mondiali.</p>

            <div class="retirement-timeline-flow">
              ${history.map((h, idx) => {
                const isChampion = h.playerPos === 1;
                return `
                  <div class="timeline-season-card ${isChampion ? 'champion-season' : ''}">
                    <div class="timeline-season-header">
                      <span class="timeline-year">Anno ${h.year} • Stagione ${h.season}</span>
                      <span class="timeline-cat-pill">${h.categoryName}</span>
                    </div>

                    <div class="timeline-season-body">
                      <div class="timeline-team-info">
                        <strong class="timeline-team-name">🏎️ ${h.team}</strong>
                      </div>

                      <div class="timeline-season-result">
                        <span class="timeline-pos-badge ${isChampion ? 'gold' : ''}">
                          ${isChampion ? '🏆 CAMPIONE DEL MONDO' : `${h.playerPos}° Posizione Finale`}
                        </span>
                        <div class="timeline-stats-snippet">
                          <span>${h.wins || 0} Vittorie</span>
                          <span>${h.playerPoints || 0} Punti</span>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}

        <!-- BARRA AZIONI CONCLUSIVE -->
        <div class="retirement-action-bar">
          <button id="btn-retire-view-goat" class="modal-btn btn-gold pulse-glow">
            <span>👑 VEDI LA GOAT HALL OF FAME MONDIALE ➔</span>
          </button>

          <button id="btn-retire-new-career" class="modal-btn">
            <span>🔄 INIZIA UNA NUOVA CARRIERA</span>
          </button>

          <button id="btn-retire-back-home" class="modal-btn" style="background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2);">
            <span>🏠 TORNA AL MENU PRINCIPALE</span>
          </button>
        </div>
      </div>
    `;

    // Event Listeners
    const btnGoat = container.querySelector('#btn-retire-view-goat');
    if (btnGoat) {
      btnGoat.onclick = () => {
        sound.playClick();
        onNavigate('goat');
      };
    }

    const btnNewCareer = container.querySelector('#btn-retire-new-career');
    if (btnNewCareer) {
      btnNewCareer.onclick = () => {
        ToastNotification.confirm({
          title: "Inizia una Nuova Carriera",
          message: "Vuoi avviare una nuova carriera con un nuovo pilota? Le statistiche della tua attuale leggenda sono state salvate.",
          confirmText: "Nuovo Pilota 🚀",
          cancelText: "Annulla",
          onConfirm: () => {
            career.resetCareer();
            sound.playEngineRev();
            onNavigate('creation');
          }
        });
      };
    }

    const btnBackHome = container.querySelector('#btn-retire-back-home');
    if (btnBackHome) {
      btnBackHome.onclick = () => {
        sound.playClick();
        onNavigate('landing');
      };
    }
  }
}
