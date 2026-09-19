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
    overlay.style.cssText = `
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(4, 6, 12, 0.88);
      backdrop-filter: blur(12px);
      z-index: 100100 !important;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      overflow-y: auto;
      box-sizing: border-box;
      animation: modalFadeIn 0.25s ease-out;
    `;

    const render = () => {
      overlay.innerHTML = `
        <div class="teammate-modal-container" style="
          background: linear-gradient(135deg, #111420 0%, #161a29 100%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-top: 4px solid ${teamColor};
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8), 0 0 30px ${teamColor}33;
          border-radius: 16px;
          max-width: 760px;
          width: 100%;
          padding: 28px;
          color: #f1f5f9;
          font-family: inherit;
        ">
          <!-- HEADER -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: ${teamColor};"></span>
                <span style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: ${teamColor}; text-transform: uppercase;">
                  ${categoryName} • REGOLAMENTO UFFICIALE
                </span>
              </div>
              <h2 style="font-size: 22px; font-weight: 800; margin: 0 0 6px 0; color: #ffffff;">
                Scegli il tuo Compagno di Squadra in ${teamName}
              </h2>
              <p style="font-size: 13px; color: #94a3b8; margin: 0; line-height: 1.5;">
                Il regolamento impone un limite di <strong>${maxDriversPerTeam} piloti ufficiali</strong> per scuderia.
                Seleziona chi tenere al tuo fianco: il pilota escluso diventerà uno <strong>svincolato (Free Agent)</strong> appetibile sul mercato rivale.
              </p>
            </div>
            <button id="btn-close-teammate-modal" style="
              background: rgba(255, 255, 255, 0.06);
              border: 1px solid rgba(255, 255, 255, 0.12);
              color: #94a3b8;
              width: 34px; height: 34px; border-radius: 8px;
              cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center;
              transition: all 0.2s;
            ">✕</button>
          </div>

          <!-- DRIVER CARDS LIST -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 24px;">
            ${existingDrivers.map(driver => {
              const isSelected = selectedDriverIds.includes(driver.id);
              const driverName = db.getDriverName(driver.id, discipline);
              const ovr = driver.ovr || 75;
              const pace = driver.pace || driver.attributes?.pace || 75;
              const racecraft = driver.racecraft || driver.attributes?.racecraft || 75;
              const tyreMgmt = driver.tyreMgmt || driver.attributes?.tyreMgmt || 75;
              const consistency = driver.consistency || driver.attributes?.consistency || 75;

              return `
                <div class="teammate-driver-card" data-driver-id="${driver.id}" style="
                  background: ${isSelected ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.12) 0%, rgba(16, 185, 129, 0.05) 100%)' : 'rgba(255, 255, 255, 0.03)'};
                  border: 2px solid ${isSelected ? '#22c55e' : 'rgba(255, 255, 255, 0.08)'};
                  border-radius: 14px;
                  padding: 18px;
                  cursor: pointer;
                  position: relative;
                  transition: all 0.2s ease;
                  box-shadow: ${isSelected ? '0 0 20px rgba(34, 197, 94, 0.25)' : 'none'};
                ">
                  <!-- BADGE STATO -->
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="
                      font-size: 10px; font-weight: 800; letter-spacing: 0.8px; padding: 4px 10px; border-radius: 20px;
                      background: ${isSelected ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.15)'};
                      color: ${isSelected ? '#4ade80' : '#f87171'};
                      border: 1px solid ${isSelected ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.3)'};
                    ">
                      ${isSelected ? '✓ CONFERMATO COME COMPAGNO' : '✕ SVINCOLATO SUL MERCATO'}
                    </span>
                    <span style="
                      font-size: 16px; font-weight: 900;
                      background: linear-gradient(135deg, #f59e0b, #e11d48);
                      color: #fff; padding: 2px 10px; border-radius: 8px;
                    ">
                      ${ovr} OVR
                    </span>
                  </div>

                  <!-- INFO PILOTA -->
                  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
                    <div style="
                      width: 44px; height: 44px; border-radius: 50%;
                      background: ${teamColor}33;
                      border: 2px solid ${teamColor};
                      display: flex; align-items: center; justify-content: center;
                      font-size: 18px; font-weight: 800; color: #fff;
                    ">
                      ${driver.number ? `#${driver.number}` : '🏎️'}
                    </div>
                    <div>
                      <div style="font-size: 16px; font-weight: 800; color: #ffffff;">${driverName}</div>
                      <div style="font-size: 12px; color: #94a3b8;">${driver.nationality || 'INT'} • ${driver.role || 'Pilota Ufficiale'}</div>
                    </div>
                  </div>

                  <!-- STATS RADAR / MINI METRICHE -->
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px; background: rgba(0,0,0,0.25); padding: 10px; border-radius: 8px; margin-bottom: 14px;">
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: #94a3b8;">Velocità:</span>
                      <strong style="color: #38bdf8;">${pace}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: #94a3b8;">Racecraft:</span>
                      <strong style="color: #f59e0b;">${racecraft}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: #94a3b8;">Costanza:</span>
                      <strong style="color: #a855f7;">${consistency}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: #94a3b8;">Gestione Gomme:</span>
                      <strong style="color: #4ade80;">${tyreMgmt}</strong>
                    </div>
                  </div>

                  <!-- BOTTONE SELEZIONA -->
                  <button type="button" style="
                    width: 100%; padding: 8px; border-radius: 8px; font-size: 12px; font-weight: 700;
                    cursor: pointer; transition: all 0.2s; border: none;
                    background: ${isSelected ? '#22c55e' : 'rgba(255, 255, 255, 0.08)'};
                    color: ${isSelected ? '#0f172a' : '#cbd5e1'};
                  ">
                    ${isSelected ? 'COMPAGNO ATTUALE' : 'SCEGLI COME COMPAGNO ➔'}
                  </button>
                </div>
              `;
            }).join('')}
          </div>

          <!-- FOOTER / BOTTONI AZIONE -->
          <div style="display: flex; justify-content: flex-end; gap: 12px; align-items: center; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 20px;">
            <button id="btn-cancel-teammate-modal" style="
              background: transparent;
              border: 1px solid rgba(255, 255, 255, 0.15);
              color: #94a3b8;
              padding: 10px 20px;
              border-radius: 10px;
              font-size: 13px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s;
            ">
              Rinuncia e Chiudi
            </button>

            <button id="btn-confirm-teammate-selection" style="
              background: linear-gradient(135deg, #e10600 0%, #ff2b2b 100%);
              border: none;
              color: #ffffff;
              padding: 11px 24px;
              border-radius: 10px;
              font-size: 13px;
              font-weight: 800;
              letter-spacing: 0.5px;
              cursor: pointer;
              box-shadow: 0 4px 15px rgba(225, 6, 0, 0.4);
              transition: all 0.2s;
            ">
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
