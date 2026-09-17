import { career } from '../engine/careerEngine.js';
import { GoatScorer } from '../engine/goatScorer.js';
import { sound } from '../engine/audioManager.js';
import { ToastNotification } from './toastNotification.js';

export class GoatHallOfFameView {
  static render(container, onNavigate) {
    const player = career.player;
    const careerData = career.career;
    const stats = careerData.stats;

    const goatScore = GoatScorer.calculateScore(player, stats);
    const verdict = GoatScorer.getTitleAndTier(goatScore);
    const hallOfFame = GoatScorer.getHallOfFameRanking(goatScore, player, stats);

    container.innerHTML = `
      <div class="goat-view-wrapper">
        <div class="goat-hero-banner">
          <div class="crown-glow-badge">👑 MOTORSPORT GOAT INDEX</div>
          <h1 class="goat-hero-title">${verdict.title}</h1>
          <p class="goat-hero-desc">${verdict.desc}</p>
          
          <div class="goat-score-meter-box">
            <span class="meter-label">IL TUO PUNTEGGIO LEGACY GOAT</span>
            <strong class="meter-score-glow">${goatScore}</strong>
            <span class="meter-rank">Posizione Storica Mondiale: #${hallOfFame.playerRank} di ${hallOfFame.totalDrivers}</span>
          </div>
        </div>

        <div class="goat-main-grid">
          <!-- Scomposizione Punti Legacy -->
          <div class="dash-card goat-breakdown-card">
            <h3 class="card-title">Dettaglio Punteggio GOAT</h3>
            <p class="section-subtext">Come è calcolata la tua grandezza rispetto ai canoni storici del motorsport.</p>

            <div class="breakdown-list">
              <div class="breakdown-item">
                <span>🏆 Titoli Mondiali (${stats.worldTitles}x)</span>
                <strong>+${stats.worldTitles * 250} Punti</strong>
              </div>
              <div class="breakdown-item">
                <span>🥇 Vittorie nei Gran Premi (${stats.wins}x)</span>
                <strong>+${stats.wins * 12} Punti</strong>
              </div>
              <div class="breakdown-item">
                <span>⏱️ Pole Position Ufficiali (${stats.poles}x)</span>
                <strong>+${stats.poles * 6} Punti</strong>
              </div>
              <div class="breakdown-item">
                <span>🍾 Piazzamenti a Podio (${stats.podiums}x)</span>
                <strong>+${stats.podiums * 4} Punti</strong>
              </div>
              <div class="breakdown-item">
                <span>🏁 Gare Disputate & Longevità (${stats.racesStarted} GP)</span>
                <strong>+${Math.min(100, Math.floor(stats.racesStarted * 0.4))} Punti</strong>
              </div>
              <div class="breakdown-item">
                <span>⚔️ Stagioni sopra il Compagno di Squadra (${stats.teammateBeatenCount || 0}x)</span>
                <strong>+${(stats.teammateBeatenCount || 0) * 15} Punti</strong>
              </div>
              <div class="breakdown-item">
                <span>⭐ Picco di Valutazione Raggiunto (${stats.peakOvr || player.ovr} OVR)</span>
                <strong>+${(stats.peakOvr >= 95 ? 100 : (stats.peakOvr >= 90 ? 60 : 30))} Punti</strong>
              </div>
            </div>

            ${!careerData.isRetired ? `
              <div class="retire-action-box">
                <button id="btn-retire-career" class="retire-button danger">
                  <span>ANNUNCIA IL RITIRO DALLE CORSE 🏁</span>
                  <small>Sigilla per sempre le tue statistiche e ritirati da leggenda</small>
                </button>
              </div>
            ` : `
              <div class="retired-badge-box">
                <span class="retired-stamp">PILOTA UFFICIALMENTE RITIRATO</span>
              </div>
            `}
          </div>

          <!-- Classifica All-Time Hall of Fame -->
          <div class="dash-card hall-of-fame-card">
            <h3 class="card-title">Classifica Storica dei Mostri Sacri</h3>
            <p class="section-subtext">Confronto con le leggende di tutti i tempi dell'Automobilismo e del Motociclismo.</p>

            <div class="hall-table-wrapper">
              <table class="motorsport-table compact">
                <thead>
                  <tr>
                    <th>RANK</th>
                    <th>PILOTA / LEGGENDARIO</th>
                    <th>ERA</th>
                    <th>TITOLI</th>
                    <th>VITTORIE</th>
                    <th class="text-right">GOAT SCORE</th>
                  </tr>
                </thead>
                <tbody>
                  ${hallOfFame.ranking.map((leg, idx) => `
                    <tr class="${leg.isPlayer ? 'player-hall-row' : ''}">
                      <td class="pos-cell"><span class="badge pos-${idx + 1}">${idx + 1}</span></td>
                      <td class="pilot-cell">
                        <strong>${leg.name}</strong>
                        ${leg.isPlayer ? '<span class="you-tag">TU</span>' : ''}
                      </td>
                      <td><small>${leg.era}</small></td>
                      <td>🏆 ${leg.titles}</td>
                      <td>🥇 ${leg.wins}</td>
                      <td class="points-cell text-right"><strong>${leg.goatScore}</strong></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="finish-weekend-action-bar">
          <button id="btn-return-from-goat" class="start-race-button">
            <span>RITORNA ALLA DASHBOARD ➔</span>
          </button>
        </div>
      </div>
    `;

    // Event listeners
    const retireBtn = container.querySelector('#btn-retire-career');
    if (retireBtn) {
      retireBtn.onclick = () => {
        ToastNotification.confirm({
          title: "Ritiro Definitivo dalle Corse",
          message: "Vuoi davvero annunciare il tuo ritiro ufficiale dalle corse? La tua leggenda e le tue statistiche saranno sigillate per sempre nella GOAT Hall of Fame.",
          confirmText: "Annuncia Ritiro 🏁",
          cancelText: "Continua a Correre",
          danger: true,
          onConfirm: () => {
            sound.playChequeredFlag();
            career.retire();
            ToastNotification.show("Hai ufficializzato il tuo ritiro dalle corse.", "info");
            GoatHallOfFameView.render(container, onNavigate);
          }
        });
      };
    }

    const returnBtn = container.querySelector('#btn-return-from-goat');
    if (returnBtn) {
      returnBtn.onclick = () => {
        sound.playClick();
        onNavigate('dashboard');
      };
    }
  }
}
