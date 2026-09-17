import { career } from '../engine/careerEngine.js';
import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';

export class CalendarView {
  static render(container, onNavigate) {
    const player = career.player;
    const careerData = career.career;
    const catData = career.getCurrentCategoryData();
    const calendarIds = catData.calendar || [];
    const currentIndex = careerData.currentRaceIndex;
    const seriesName = db.getSeriesName(careerData.currentCategory, player.discipline);

    container.innerHTML = `
      <div class="page-container calendar-page">
        <!-- HEADER DELLA PAGINA CALENDARIO -->
        <div class="page-title-banner">
          <div class="banner-text">
            <span class="page-subtag">STAGIONE ${careerData.seasonNumber} • ANNO ${careerData.currentYear}</span>
            <h2 class="page-main-title">📅 CALENDARIO UFFICIALE MONDIALE</h2>
            <p class="page-desc">Tutte le tappe del campionato ${seriesName}. Esamina le caratteristiche tecniche dei tracciati, l'usura degli pneumatici e prepara l'assetto ideale.</p>
          </div>
          <div class="calendar-summary-pill">
            <span><strong>${calendarIds.length}</strong> Gran Premi in Calendario</span>
            <span>•</span>
            <span>Round Corrente: <strong>${currentIndex < calendarIds.length ? currentIndex + 1 : 'Concluso'} / ${calendarIds.length}</strong></span>
          </div>
        </div>

        <!-- GRIGLIA SCHEDE CIRCUITI -->
        <div class="calendar-grid">
          ${calendarIds.map((circuitId, index) => {
            const circuit = db.getCircuit(circuitId);
            const isPast = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isFuture = index > currentIndex;
            const roundNumber = index + 1;

            const laps = Math.round((player.discipline === 'auto' ? circuit.lapsF1 : circuit.lapsMoto) * (catData.weekendFormat.raceLapsMultiplier || 1));

            let statusBadge = '<span class="round-status future">In Programma</span>';
            if (isPast) statusBadge = '<span class="round-status completed">✓ Disputato</span>';
            if (isCurrent) statusBadge = '<span class="round-status current pulse-glow">🏁 PROSSIMA GARA</span>';

            return `
              <div class="calendar-race-card ${isCurrent ? 'current-race-highlight' : ''} ${isPast ? 'past-race' : ''}">
                <div class="card-round-badge">ROUND ${roundNumber}</div>
                
                <div class="card-circuit-head">
                  <div class="flag-box">${circuit.flag}</div>
                  <div class="circuit-names">
                    <h3 class="circuit-name">${circuit.displayName}</h3>
                    <span class="circuit-country">${circuit.country}</span>
                  </div>
                  <div class="round-status-box">${statusBadge}</div>
                </div>

                <p class="circuit-short-desc">${circuit.description}</p>

                <!-- TELEMETRIA E CARATTERISTICHE TRACCIATO -->
                <div class="circuit-specs-grid">
                  <div class="spec-item">
                    <span class="spec-lbl">📏 Lunghezza</span>
                    <strong class="spec-val">${circuit.lengthKm} km</strong>
                  </div>
                  <div class="spec-item">
                    <span class="spec-lbl">🔄 Giri Gara</span>
                    <strong class="spec-val">${laps} giri</strong>
                  </div>
                  <div class="spec-item">
                    <span class="spec-lbl">🛞 Usura Gomme</span>
                    <strong class="spec-val">${'★'.repeat(circuit.tyreStress || 3)}${'☆'.repeat(5 - (circuit.tyreStress || 3))}</strong>
                  </div>
                  <div class="spec-item">
                    <span class="spec-lbl">🌬️ Carico Aero</span>
                    <strong class="spec-val upper">${circuit.downforceLevel || 'Medio'}</strong>
                  </div>
                  <div class="spec-item">
                    <span class="spec-lbl">⚡ Sorpassi</span>
                    <strong class="spec-val">${circuit.overtakeEase || 3}/5</strong>
                  </div>
                  <div class="spec-item">
                    <span class="spec-lbl">🌧️ Rischio Pioggia</span>
                    <strong class="spec-val">${Math.round((circuit.rainChance || 0.15) * 100)}%</strong>
                  </div>
                </div>

                ${isCurrent ? `
                  <div class="card-action-box">
                    <button class="btn-enter-gp-card" id="btn-enter-current-gp">
                      <span>PARTECIPA AL GP ➔</span>
                      <small>Prove Libere • Qualifiche • Gara</small>
                    </button>
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    this.bindEvents(container, onNavigate);
  }

  static bindEvents(container, onNavigate) {
    const enterBtn = container.querySelector('#btn-enter-current-gp');
    if (enterBtn) {
      enterBtn.onclick = () => {
        sound.playEngineRev();
        onNavigate('weekend');
      };
    }
  }
}
