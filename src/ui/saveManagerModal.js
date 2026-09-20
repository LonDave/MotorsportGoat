import { career } from '../engine/careerEngine.js';
import { sound } from '../engine/audioManager.js';
import { ToastNotification } from './toastNotification.js';

export class SaveManagerModal {
  static open(onComplete = () => {}, onStartNewCareer = null) {
    const existing = document.getElementById('save-manager-modal');
    if (existing) existing.remove();

    let targetImportSlot = null;

    const getSlotData = (slotNum) => {
      const key = career.getStorageKeyForSlot(slotNum);
      try {
        let raw = localStorage.getItem(key);
        if (!raw && slotNum === 1) {
          raw = localStorage.getItem('il_nuovo_goat_motorsport_save');
        }
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || !parsed.player) return null;
        return parsed;
      } catch (e) {
        return null;
      }
    };

    const downloadJsonFile = (data, slotNum = 1) => {
      const p = data.player;
      const pName = p ? `${p.firstName || ''}_${p.lastName || ''}`.replace(/\s+/g, '_') : 'pilota';
      const dateStr = new Date().toISOString().slice(0, 10);
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `il_nuovo_goat_${pName}_slot${slotNum}_${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      sound.playClick();
      ToastNotification.show(`Salvataggio dello Slot ${slotNum} esportato con successo!`, "success");
    };

    const modal = document.createElement('div');
    modal.className = 'in-game-modal-overlay modal-visible';
    modal.id = 'save-manager-modal';

    const render = () => {
      const activeSlotNum = career.getActiveSlot();
      const hasActiveCareer = career.hasActiveCareer();
      const anySlotHasData = [1, 2, 3].some(num => !!getSlotData(num));

      const slots = [1, 2, 3].map(num => {
        const data = getSlotData(num);
        const isActive = (num === activeSlotNum);
        return { num, data, isActive };
      });

      modal.innerHTML = `
        <div class="in-game-modal-card save-manager-card">
          <div class="modal-header-row">
            <div>
              <span class="session-badge">💾 CLOUD & MEMORIA LOCALE</span>
              <h2 class="modal-title">Gestione Multi-Salvataggio & Backup</h2>
              <p class="modal-subtitle">Gestisci fino a 3 carriere indipendenti o esporta il tuo file di salvataggio per non perdere mai i tuoi progressi.</p>
            </div>
            <button class="modal-close-btn" id="btn-close-save-modal" title="Chiudi finestra">✕</button>
          </div>

          <!-- GRIGLIA DEI 3 SLOT -->
          <div class="save-slots-grid">
            ${slots.map(s => {
              const d = s.data;
              const hasData = !!d && !!d.player;
              const p = d?.player;
              const c = d?.career;

              return `
                <div class="save-slot-card ${s.isActive && hasData ? 'active-slot' : ''} ${!hasData ? 'empty-slot' : ''}">
                  <div class="slot-card-header">
                    <span class="slot-badge ${s.isActive && hasData ? 'active' : ''}">${s.isActive && hasData ? '⭐ SLOT ATTIVO' : `SLOT ${s.num}`}</span>
                    ${hasData ? `<span class="slot-date">Anno ${c.currentYear || 2026} • St. ${c.seasonNumber || 1}</span>` : ''}
                  </div>

                  ${hasData ? `
                    <div class="slot-driver-preview">
                      <strong class="slot-driver-name">${p.firstName} ${p.lastName}</strong>
                      <div class="slot-pills-row">
                        <span class="meta-pill disc">${p.discipline === 'auto' ? '🏎️ Auto' : '🏍️ Moto'}</span>
                        <span class="meta-pill cat">${c.currentCategory ? c.currentCategory.toUpperCase() : 'SERIE'}</span>
                        <span class="meta-pill ovr">OVR ${p.ovr || 60}</span>
                      </div>
                      <div class="slot-finances">
                        Liquidità: <strong style="color:#4ade80;">€${(c.money || 0).toLocaleString()}</strong>
                      </div>
                    </div>

                    <div class="slot-actions-row">
                      ${!s.isActive ? `
                        <button class="btn-slot-action load-btn" data-slot="${s.num}" title="Carica questa carriera">
                          <span>📂 Carica</span>
                        </button>
                      ` : `
                        <button class="btn-slot-action save-here-btn" data-slot="${s.num}" title="Aggiorna salvataggio attuale">
                          <span>💾 Salva</span>
                        </button>
                      `}
                      <button class="btn-slot-action export-slot-btn" data-slot="${s.num}" title="Esporta .json di questa carriera">
                        <span>⬇️ Esporta</span>
                      </button>
                      <button class="btn-slot-action delete-btn" data-slot="${s.num}" title="Cancella questo slot">
                        <span>🗑️</span>
                      </button>
                    </div>
                  ` : `
                    <div class="empty-slot-content">
                      <span class="empty-icon">📁</span>
                      <strong style="color: #cbd5e1; font-size: 14px;">Slot ${s.num} Libero</strong>
                      <p style="font-size: 12px; color: #64748b; margin: 4px 0 10px;">Nessuna carriera salvata in questa posizione.</p>
                      
                      <div class="empty-slot-actions">
                        <button class="btn-slot-action new-slot-btn" data-slot="${s.num}" title="Inizia una nuova carriera in questo slot">
                          <span>✨ Nuova Carriera</span>
                        </button>
                        <button class="btn-slot-action import-slot-btn" data-slot="${s.num}" title="Importa un file .json in questo slot">
                          <span>⬆️ Importa File</span>
                        </button>
                        ${hasActiveCareer && !s.isActive ? `
                          <button class="btn-slot-action save-here-btn" data-slot="${s.num}" title="Copia la carriera attiva corrente in questo slot" style="margin-top: 4px;">
                            <span>💾 Salva Carriera Qui</span>
                          </button>
                        ` : ''}
                      </div>
                    </div>
                  `}
                </div>
              `;
            }).join('')}
          </div>

          <!-- SEZIONE IMPORT / EXPORT JSON -->
          <div class="save-backup-footer-card">
            <div class="backup-left">
              <span class="backup-title">📥 Esportazione & Importazione File (.json)</span>
              <p class="backup-desc">Scarica il file della tua carriera per giocarlo su un altro computer o browser, oppure ripristina un backup precedente.</p>
            </div>
            <div class="backup-actions">
              <button id="btn-export-save-json" class="btn-export" ${!hasActiveCareer && !anySlotHasData ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
                <span>⬇️ Esporta Salvataggio (.json)</span>
              </button>
              <button id="btn-trigger-import-json" class="btn-import" type="button">
                <span>⬆️ Importa File (.json)</span>
              </button>
              <input type="file" id="input-import-save-file" accept=".json" style="display: none;" />
            </div>
          </div>
        </div>
      `;

      // Chiudi modal
      const closeBtn = modal.querySelector('#btn-close-save-modal');
      if (closeBtn) {
        closeBtn.onclick = () => {
          sound.playClick();
          modal.remove();
          onComplete(false);
        };
      }

      modal.onclick = (e) => {
        if (e.target === modal) {
          sound.playClick();
          modal.remove();
          onComplete(false);
        }
      };

      // Carica Slot
      modal.querySelectorAll('.load-btn').forEach(btn => {
        btn.onclick = () => {
          sound.playClick();
          const slotNum = parseInt(btn.dataset.slot, 10);
          career.loadFromStorage(slotNum);
          if (career.player && career.career) {
            sound.playChequeredFlag();
            ToastNotification.show(`Carriera di ${career.player.firstName} ${career.player.lastName} caricata dallo Slot ${slotNum}!`, "success");
            modal.remove();
            window.dispatchEvent(new CustomEvent('career-data-updated'));
            onComplete(true);
          } else {
            ToastNotification.show("Impossibile caricare la carriera selezionata.", "danger");
          }
        };
      });

      // Salva Nello Slot
      modal.querySelectorAll('.save-here-btn').forEach(btn => {
        btn.onclick = () => {
          sound.playClick();
          const slotNum = parseInt(btn.dataset.slot, 10);
          if (!career.player || !career.career) {
            ToastNotification.show("Nessuna carriera attiva da salvare!", "warning");
            return;
          }
          career.saveToStorage(slotNum);
          career.setActiveSlot(slotNum);
          sound.playRadioBeep();
          ToastNotification.show(`Carriera salvata con successo nello Slot ${slotNum}!`, "success");
          render();
        };
      });

      // Nuova Carriera in uno Slot Libero
      modal.querySelectorAll('.new-slot-btn').forEach(btn => {
        btn.onclick = () => {
          sound.playClick();
          const slotNum = parseInt(btn.dataset.slot, 10);
          career.setActiveSlot(slotNum);
          career.player = null;
          career.career = null;
          modal.remove();
          ToastNotification.show(`Avvio nuova carriera nello Slot ${slotNum}!`, "info");
          if (typeof onStartNewCareer === 'function') {
            onStartNewCareer(slotNum);
          } else {
            window.dispatchEvent(new CustomEvent('career-start-new', { detail: { slot: slotNum } }));
            onComplete(true);
          }
        };
      });

      // Esporta Slot Singolo
      modal.querySelectorAll('.export-slot-btn').forEach(btn => {
        btn.onclick = () => {
          const slotNum = parseInt(btn.dataset.slot, 10);
          const data = getSlotData(slotNum);
          if (data) {
            downloadJsonFile(data, slotNum);
          } else {
            ToastNotification.show("Nessun dato presente in questo slot da esportare.", "warning");
          }
        };
      });

      // Importa Slot Singolo
      modal.querySelectorAll('.import-slot-btn').forEach(btn => {
        btn.onclick = () => {
          sound.playClick();
          targetImportSlot = parseInt(btn.dataset.slot, 10);
          const fileInput = modal.querySelector('#input-import-save-file');
          if (fileInput) {
            fileInput.value = '';
            fileInput.click();
          }
        };
      });

      // Cancella Slot
      modal.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = () => {
          const slotNum = parseInt(btn.dataset.slot, 10);
          ToastNotification.confirm({
            title: `Cancellare lo Slot ${slotNum}?`,
            message: "Questa operazione rimuoverà la carriera memorizzata in questo slot. Gli altri slot rimarranno intatti.",
            confirmText: "Cancella Definitivamente",
            cancelText: "Annulla",
            danger: true,
            onConfirm: () => {
              const wasActive = (career.getActiveSlot() === slotNum);
              career.resetCareer(slotNum, wasActive);
              ToastNotification.show(`Slot ${slotNum} svuotato.`, "warning");
              window.dispatchEvent(new CustomEvent('career-data-updated'));
              render();
            }
          });
        };
      });

      // Esporta Globale (Carriera Attiva o primo slot occupato)
      const exportBtn = modal.querySelector('#btn-export-save-json');
      if (exportBtn) {
        exportBtn.onclick = () => {
          let dataToExport = null;
          let exportSlotNum = career.getActiveSlot();

          if (career.player && career.career) {
            career.syncAndReconcileStats();
            dataToExport = { player: career.player, career: career.career };
          } else {
            dataToExport = getSlotData(exportSlotNum);
            if (!dataToExport) {
              for (let i = 1; i <= 3; i++) {
                dataToExport = getSlotData(i);
                if (dataToExport) {
                  exportSlotNum = i;
                  break;
                }
              }
            }
          }

          if (!dataToExport) {
            ToastNotification.show("Nessun salvataggio trovato da esportare!", "warning");
            return;
          }

          downloadJsonFile(dataToExport, exportSlotNum);
        };
      }

      // Importa Globale Trigger
      const importTrigger = modal.querySelector('#btn-trigger-import-json');
      const fileInput = modal.querySelector('#input-import-save-file');
      if (importTrigger && fileInput) {
        importTrigger.onclick = () => {
          sound.playClick();
          targetImportSlot = null;
          fileInput.value = '';
          fileInput.click();
        };
      }

      // Elaborazione File Importato
      if (fileInput) {
        fileInput.onchange = (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const parsed = JSON.parse(event.target.result);
              const playerData = parsed.player || (parsed.careerData && parsed.careerData.player);
              const careerData = parsed.career || (parsed.careerData && parsed.careerData.career);

              if (playerData && careerData) {
                // Determina lo slot di destinazione
                const chosenSlot = targetImportSlot || career.getFreeSlot() || career.getActiveSlot() || 1;
                const key = career.getStorageKeyForSlot(chosenSlot);
                const toSave = { player: playerData, career: careerData, importedAt: new Date().toISOString() };
                localStorage.setItem(key, JSON.stringify(toSave));
                if (chosenSlot === 1) {
                  localStorage.setItem('il_nuovo_goat_motorsport_save', JSON.stringify(toSave));
                }
                career.setActiveSlot(chosenSlot);
                career.loadFromStorage(chosenSlot);

                sound.playChequeredFlag();
                ToastNotification.show(`Carriera di ${playerData.firstName} ${playerData.lastName} importata nello Slot ${chosenSlot}!`, "success");
                modal.remove();
                window.dispatchEvent(new CustomEvent('career-data-updated'));
                onComplete(true);
              } else {
                ToastNotification.show("File JSON non valido: mancano i dati del pilota o della carriera.", "danger");
              }
            } catch (err) {
              console.error("Errore importazione file JSON:", err);
              ToastNotification.show("Errore nella lettura del file di salvataggio.", "danger");
            }
          };
          reader.readAsText(file);
        };
      }
    };

    render();
    document.body.appendChild(modal);
  }
}
