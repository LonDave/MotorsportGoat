import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';

export class TeammateSelectionModal {
  /**
   * Mostra il modal di selezione del compagno di squadra.
   * @param {Object} options
   * @param {Object} options.team - Oggetto scuderia di destinazione
   * @param {Object} options.category - Oggetto categoria
   * @param {Array} options.existingDrivers - Array di piloti attualmente nel team
   * @param {number} options.maxDriversPerTeam - Capacità massima (2 per quasi tutte, 3 per F3)
   * @param {string} options.discipline - 'auto' o 'moto'
   * @param {Function} options.onConfirm - Callback({ chosenTeammateIds, replacedDriverIds })
   * @param {Function} options.onCancel - Callback()
   */
  static show(options) {
    const {
      team,
      category,
      existingDrivers = [],
      maxDriversPerTeam = 2,
      discipline = 'auto',
      onConfirm,
      onCancel
    } = options;

    const teamColor = team.color || '#e10600';
    const teamName = db.getTeamName(team.id, discipline, category.id);
    const categoryName = db.getSeriesName(category.id, discipline);

    // Il giocatore occuperà 1 sedile. I compagni da mantenere sono (maxDriversPerTeam - 1)
    const neededTeammatesCount = Math.max(1, maxDriversPerTeam - 1);

    // Stato iniziale selezione: di default seleziona il primo (o i primi N) pilota/i
    let selectedDriverIds = existingDrivers.slice(0, neededTeammatesCount).map(d => d.id);

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay teammate-selection-overlay';

    const render = () => {
      overlay.innerHTML = `
        <div class="teammate-modal-container" style="border-top: 4px solid ${teamColor}; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8), 0 0 30px ${teamColor}33;">
          <!-- HEADER -->
          <div class="teammate-modal-header">
            <div class="teammate-header-info">
              <div class="teammate-cat-badge">
                <span class="team-color-dot" style="background: ${teamColor};"></span>
                <span class="team-cat-label" style="color: ${teamColor};">
                  ${categoryName} • REGOLAMENTO UFFICIALE
                </span>
              </div>
              <h2 class="teammate-modal-title">
                Scegli il tuo Compagno di Squadra in ${teamName}
              </h2>
              <p class="teammate-modal-desc">
                Il regolamento impone un limite di <strong>${maxDriversPerTeam} piloti ufficiali</strong> per scuderia.
                Seleziona chi tenere al tuo fianco: il pilota escluso diventerà uno <strong>svincolato (Free Agent)</strong> appetibile sul mercato rivale.
              </p>
            </div>
            <button id="btn-close-teammate-modal" class="teammate-close-btn" title="Chiudi finestra">✕</button>
          </div>

          <!-- DRIVER CARDS LIST -->
          <div class="teammate-cards-grid">
            ${existingDrivers.map(driver => {
              const isSelected = selectedDriverIds.includes(driver.id);
              const driverName = db.getDriverName(driver.id, discipline);
              const ovr = driver.ovr || 75;
              const pace = driver.pace || driver.attributes?.pace || 75;
              const racecraft = driver.racecraft || driver.attributes?.racecraft || 75;
              const tyreMgmt = driver.tyreMgmt || driver.attributes?.tyreMgmt || 75;
              const consistency = driver.consistency || driver.attributes?.consistency || 75;

              return `
                <div class="teammate-driver-card ${isSelected ? 'selected' : ''}" data-driver-id="${driver.id}">
                  <!-- BADGE STATO -->
                  <div class="driver-card-top-row">
                    <span class="status-pill ${isSelected ? 'selected-pill' : 'free-pill'}">
                      ${isSelected ? '✓ CONFERMATO' : '✕ SVINCOLATO'}
                    </span>
                    <span class="driver-ovr-tag">
                      ${ovr} OVR
                    </span>
                  </div>

                  <!-- INFO PILOTA -->
                  <div class="driver-profile-row">
                    <div class="driver-avatar-circle" style="background: ${teamColor}33; border: 2px solid ${teamColor};">
                      ${driver.number ? `#${driver.number}` : '🏎️'}
                    </div>
                    <div class="driver-names-box">
                      <strong class="driver-full-name">${driverName}</strong>
                      <span class="driver-sub-meta">${driver.nationality || 'INT'} • ${driver.role || 'Pilota Ufficiale'}</span>
                    </div>
                  </div>

                  <!-- STATS RADAR / MINI METRICHE -->
                  <div class="driver-metrics-grid">
                    <div class="metric-item">
                      <span>Velocità:</span>
                      <strong class="pace-val">${pace}</strong>
                    </div>
                    <div class="metric-item">
                      <span>Racecraft:</span>
                      <strong class="racecraft-val">${racecraft}</strong>
                    </div>
                    <div class="metric-item">
                      <span>Costanza:</span>
                      <strong class="consistency-val">${consistency}</strong>
                    </div>
                    <div class="metric-item">
                      <span>Gestione Gomme:</span>
                      <strong class="tyre-val">${tyreMgmt}</strong>
                    </div>
                  </div>

                  <!-- BOTTONE SELEZIONA -->
                  <button type="button" class="btn-select-driver-action ${isSelected ? 'is-selected' : ''}">
                    ${isSelected ? '✓ COMPAGNO ATTUALE' : 'SCEGLI COME COMPAGNO ➔'}
                  </button>
                </div>
              `;
            }).join('')}
          </div>

          <!-- FOOTER / BOTTONI AZIONE -->
          <div class="teammate-modal-footer">
            <button id="btn-cancel-teammate-modal" class="btn-cancel-teammate">
              Rinuncia e Chiudi
            </button>

            <button id="btn-confirm-teammate-selection" class="btn-confirm-teammate">
              CONFERMA LINEUP E FIRMA ✍️
            </button>
          </div>
        </div>
      `;

      // Event listeners driver selection
      overlay.querySelectorAll('.teammate-driver-card').forEach(card => {
        card.onclick = () => {
          sound.playClick();
          const dId = card.dataset.driverId;
          if (neededTeammatesCount === 1) {
            selectedDriverIds = [dId];
          } else {
            // Se multi-teammate (come F3 a 3 piloti): toggle o cap a neededTeammatesCount
            if (selectedDriverIds.includes(dId)) {
              if (selectedDriverIds.length > 1) {
                selectedDriverIds = selectedDriverIds.filter(id => id !== dId);
              }
            } else {
              if (selectedDriverIds.length >= neededTeammatesCount) {
                selectedDriverIds.shift();
              }
              selectedDriverIds.push(dId);
            }
          }
          render();
        };
      });

      const closeBtn = overlay.querySelector('#btn-close-teammate-modal');
      if (closeBtn) {
        closeBtn.onclick = () => {
          sound.playClick();
          overlay.remove();
          if (onCancel) onCancel();
        };
      }

      const cancelBtn = overlay.querySelector('#btn-cancel-teammate-modal');
      if (cancelBtn) {
        cancelBtn.onclick = () => {
          sound.playClick();
          overlay.remove();
          if (onCancel) onCancel();
        };
      }

      const confirmBtn = overlay.querySelector('#btn-confirm-teammate-selection');
      if (confirmBtn) {
        confirmBtn.onclick = () => {
          sound.playClick();
          const replacedDriverIds = existingDrivers
            .filter(d => !selectedDriverIds.includes(d.id))
            .map(d => d.id);

          overlay.remove();
          if (onConfirm) {
            onConfirm({
              chosenTeammateIds: selectedDriverIds,
              chosenTeammateId: selectedDriverIds[0],
              replacedDriverIds,
              replacedDriverId: replacedDriverIds[0]
            });
          }
        };
      }
    };

    render();
    document.body.appendChild(overlay);
  }
}
