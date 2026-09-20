import { career } from '../engine/careerEngine.js';
import { sound } from '../engine/audioManager.js';
import { ToastNotification } from './toastNotification.js';

export class SaveManagerModal {
  static open(onComplete = () => {}) {
    const existing = document.getElementById('save-manager-modal');
    if (existing) existing.remove();

    const activeSlotKey = localStorage.getItem('il_nuovo_goat_active_slot') || 'slot_1';
    const hasActiveCareer = career.hasActiveCareer() || (career.hasSavedCareer() && career.career?.isRetired);

    const getSlotData = (slotNum) => {
      const key = slotNum === 1 
        ? 'il_nuovo_goat_motorsport_save' 
        : `il_nuovo_goat_save_slot_${slotNum}`;
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        return JSON.parse(raw);
      } catch (e) {
        return null;
      }
    };

    const modal = document.createElement('div');
    modal.className = 'in-game-modal-overlay modal-visible';
    modal.id = 'save-manager-modal';

    const render = () => {
      const slots = [1, 2, 3].map(num => {
        const data = getSlotData(num);
        const isActive = (num === 1 && activeSlotKey === 'slot_1') || activeSlotKey === `slot_${num}`;
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
                        <button class="btn-slot-action load-btn" data-slot="${s.num}">
                          <span>📂 Carica</span>
                        </button>
                      ` : `
                        <button class="btn-slot-action save-here-btn" data-slot="${s.num}" title="Aggiorna salvataggio attuale">
                          <span>💾 Salva</span>
                        </button>
                      `}
                      <button class="btn-slot-action delete-btn" data-slot="${s.num}" title="Cancella questo slot">
                        <span>🗑️</span>
                      </button>
                    </div>
                  ` : `
                    <div class="empty-slot-content">
                      <span class="empty-icon">📁</span>
                      <strong style="color: #cbd5e1; font-size: 14px;">Slot ${s.num} Libero</strong>
                      <p style="font-size: 12px; color: #64748b; margin: 4px 0 12px;">Nessuna carriera salvata in questa posizione.</p>
                      ${hasActiveCareer ? `
                        <button class="btn-slot-action save-here-btn" data-slot="${s.num}">
                          <span>💾 Salva Carriera Qui</span>
                        </button>
                      ` : `
                        <span class="slot-empty-hint" style="font-size: 11px; color: #475569;">Avvia una carriera per salvare</span>
                      `}
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
              <button id="btn-export-save-json" class="btn-export" ${!hasActiveCareer ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
                <span>⬇️ Esporta Salvataggio (.json)</span>
              </button>
              <label class="btn-import" for="input-import-save-file">
                <span>⬆️ Importa File (.json)</span>
              </label>
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
          const key = slotNum === 1 ? 'il_nuovo_goat_motorsport_save' : `il_nuovo_goat_save_slot_${slotNum}`;
          const raw = localStorage.getItem(key);
          if (raw) {
            try {
              const parsed = JSON.parse(raw);
              if (parsed.player && parsed.career) {
                localStorage.setItem('il_nuovo_goat_motorsport_save', raw);
                localStorage.setItem('il_nuovo_goat_active_slot', `slot_${slotNum}`);
                career.loadFromStorage();
                sound.playChequeredFlag();
                ToastNotification.show(`Carriera di ${parsed.player.firstName} ${parsed.player.lastName} caricata dallo Slot ${slotNum}!`, "success");
                modal.remove();
                window.dispatchEvent(new CustomEvent('career-data-updated'));
                onComplete(true);
              } else {
                ToastNotification.show("Salvataggio non valido.", "danger");
              }
            } catch (e) {
              ToastNotification.show("Errore nel caricamento del file.", "danger");
            }
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
          career.syncAndReconcileStats();
          const currentData = { player: career.player, career: career.career, savedAt: new Date().toISOString() };
          const key = slotNum === 1 ? 'il_nuovo_goat_motorsport_save' : `il_nuovo_goat_save_slot_${slotNum}`;
          localStorage.setItem(key, JSON.stringify(currentData));
          localStorage.setItem('il_nuovo_goat_active_slot', `slot_${slotNum}`);
          sound.playRadioBeep();
          ToastNotification.show(`Carriera salvata con successo nello Slot ${slotNum}!`, "success");
          render();
        };
      });

      // Cancella Slot
      modal.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = () => {
          const slotNum = parseInt(btn.dataset.slot, 10);
          ToastNotification.confirm({
            title: `Cancellare lo Slot ${slotNum}?`,
            message: "Questa operazione rimuoverà definitivamente la carriera memorizzata in questo slot.",
            confirmText: "Cancella Definitivamente",
            cancelText: "Annulla",
            danger: true,
            onConfirm: () => {
              const key = slotNum === 1 ? 'il_nuovo_goat_motorsport_save' : `il_nuovo_goat_save_slot_${slotNum}`;
              localStorage.removeItem(key);
              if (activeSlotKey === `slot_${slotNum}`) {
                localStorage.removeItem('il_nuovo_goat_active_slot');
              }
              ToastNotification.show(`Slot ${slotNum} svuotato.`, "warning");
              render();
            }
          });
        };
      });

      // Esporta JSON
      const exportBtn = modal.querySelector('#btn-export-save-json');
      if (exportBtn) {
        exportBtn.onclick = () => {
          if (!career.player || !career.career) {
            ToastNotification.show("Nessuna carriera attiva da esportare!", "warning");
            return;
          }
          sound.playClick();
          career.syncAndReconcileStats();
          const currentData = { player: career.player, career: career.career, exportDate: new Date().toISOString() };
          const jsonStr = JSON.stringify(currentData, null, 2);
          const blob = new Blob([jsonStr], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          const pName = career.player ? `${career.player.firstName}_${career.player.lastName}` : 'pilota';
          a.href = url;
          a.download = `il_nuovo_goat_${pName}_${new Date().toISOString().slice(0, 10)}.json`;
          a.click();
          URL.revokeObjectURL(url);
          ToastNotification.show("File di salvataggio esportato con successo!", "success");
        };
      }

      // Importa JSON
      const fileInput = modal.querySelector('#input-import-save-file');
      if (fileInput) {
        fileInput.onchange = (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const parsed = JSON.parse(event.target.result);
              if (parsed.player && parsed.career) {
                localStorage.setItem('il_nuovo_goat_motorsport_save', JSON.stringify(parsed));
                localStorage.setItem('il_nuovo_goat_active_slot', 'slot_1');
                career.loadFromStorage();
                sound.playChequeredFlag();
                ToastNotification.show(`Salvataggio di ${parsed.player.firstName} ${parsed.player.lastName} importato con successo!`, "success");
                modal.remove();
                window.dispatchEvent(new CustomEvent('career-data-updated'));
                onComplete(true);
              } else {
                ToastNotification.show("File JSON non valido per Il Nuovo GOAT.", "danger");
              }
            } catch (err) {
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
