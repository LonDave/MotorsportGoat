import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';
import { ToastNotification } from './toastNotification.js';

export class ModManagerModal {
  static open(onClose) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-backdrop-overlay';
    modalOverlay.id = 'mod-manager-modal';

    modalOverlay.innerHTML = `
      <div class="modal-card-dialog">
        <div class="modal-dialog-header">
          <div class="modal-header-text">
            <span class="modal-pill-badge">⚙️ IMPOSTAZIONI & DATABASE NOMI</span>
            <h3>Opzioni Nomi (Fittizi / Reali 2026) & File Personalizzati</h3>
          </div>
          <button id="btn-close-modal" class="modal-close-icon">✕</button>
        </div>

        <div class="modal-dialog-body">
          <p class="modal-intro-text">
            Come in <em>ilnuovogoat.it</em>, il gioco include divertenti nomi parodistici e fittizi.
            Puoi selezionare la modalità desiderata: passa ai <strong>Nomi Reali Ufficiali di Settembre 2026</strong> oppure importa/esporta un tuo file JSON personalizzato.
          </p>

          <div class="modal-toggle-card">
            <div class="toggle-info">
              <strong>Modalità Attuale: <span id="current-mode-label" class="highlight-mode">${db.isRealNames ? '🏁 Nomi Reali Ufficiali (2026)' : '🎭 Nomi Fittizi / Parodistici'}</span></strong>
              <small>L'aggiornamento ha effetto immediato su tutte le classifiche, griglie e piloti.</small>
            </div>
            <button id="btn-modal-toggle-names" class="btn-toggle-switch ${db.isRealNames ? 'active' : ''}">
              ${db.isRealNames ? 'ATTIVI: REALI 2026' : 'ATTIVI: FITTIZI'}
            </button>
          </div>

          <div class="modal-actions-grid">
            <!-- Scarica File JSON Ufficiale -->
            <div class="modal-action-box">
              <span class="box-icon">📥</span>
              <div class="box-desc">
                <strong>Scarica File Nomi Reali</strong>
                <small>Ottieni il file <code>motorsport_real_names.json</code> completo e modificabile.</small>
              </div>
              <button id="btn-download-json" class="btn-secondary-action">
                SCARICA JSON
              </button>
            </div>

            <!-- Importa File JSON Personalizzato -->
            <div class="modal-action-box">
              <span class="box-icon">📤</span>
              <div class="box-desc">
                <strong>Importa File JSON Personalizzato</strong>
                <small>Carica un file JSON con i tuoi nomi, scuderie e piloti personalizzati.</small>
              </div>
              <label class="btn-secondary-action upload-label">
                <span>CARICA JSON</span>
                <input type="file" id="input-upload-json" accept=".json" style="display:none;">
              </label>
            </div>
          </div>

          <div class="modal-reset-area">
            <button id="btn-reset-db" class="btn-link-danger">Ripristina Database ai Valori Predefiniti</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalOverlay);

    // Event listeners
    const closeBtn = modalOverlay.querySelector('#btn-close-modal');
    closeBtn.onclick = () => {
      sound.playClick();
      modalOverlay.remove();
      if (onClose) onClose();
    };

    // Event listener per lo switch Nomi Reali / Fittizi
    const toggleBtn = modalOverlay.querySelector('#btn-modal-toggle-names');
    if (toggleBtn) {
      toggleBtn.onclick = (e) => {
        e.stopPropagation();
        sound.playClick();
        const isReal = db.toggleRealNames();
        toggleBtn.className = `btn-toggle-switch ${isReal ? 'active' : ''}`;
        toggleBtn.textContent = isReal ? 'ATTIVI: REALI 2026' : 'ATTIVI: FITTIZI';
        const modeLabel = modalOverlay.querySelector('#current-mode-label');
        if (modeLabel) {
          modeLabel.textContent = isReal 
            ? '🏁 Nomi Reali Ufficiali (2026)' 
            : '🎭 Nomi Fittizi / Parodistici';
        }
        ToastNotification.show(
          isReal ? "🏁 Database impostato sui Nomi Reali Ufficiali 2026!" : "🎭 Database impostato sui Nomi Fittizi / Parodia!",
          "success"
        );
      };
    }

    // Rendi anche l'intera card cliccabile per massima comodità d'uso
    const toggleCard = modalOverlay.querySelector('.modal-toggle-card');
    if (toggleCard && toggleBtn) {
      toggleCard.style.cursor = 'pointer';
      toggleCard.onclick = () => {
        toggleBtn.click();
      };
    }

    // Download JSON
    const downloadBtn = modalOverlay.querySelector('#btn-download-json');
    downloadBtn.onclick = async () => {
      sound.playClick();
      try {
        const response = await fetch('/motorsport_real_names.json');
        const text = await response.text();
        const blob = new Blob([text], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'motorsport_real_names.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } catch (err) {
        // Fallback export dal databaseManager
        const exported = db.exportDatabaseJson();
        const blob = new Blob([exported], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'motorsport_names.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }
    };

    // Upload JSON
    const uploadInput = modalOverlay.querySelector('#input-upload-json');
    uploadInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const res = db.importCustomJson(event.target.result);
        ToastNotification.show(res.message, res.success ? "success" : "danger");
        if (res.success) {
          modalOverlay.remove();
          if (onClose) onClose();
        }
      };
      reader.readAsText(file);
    };

    // Reset DB
    const resetBtn = modalOverlay.querySelector('#btn-reset-db');
    resetBtn.onclick = () => {
      ToastNotification.confirm({
        title: "Ripristinare Database?",
        message: "Vuoi davvero ripristinare i dati ai valori predefiniti? Tutte le modifiche personalizzate verranno sovrascritte.",
        confirmText: "Ripristina Database",
        cancelText: "Annulla",
        danger: true,
        onConfirm: () => {
          sound.playClick();
          db.resetToDefault();
          ToastNotification.show("Database ripristinato con successo ai valori 2026 predefiniti.", "info");
          modalOverlay.remove();
          if (onClose) onClose();
        }
      });
    };
  }
}
