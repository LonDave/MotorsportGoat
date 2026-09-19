import { sound } from '../engine/audioManager.js';

export class ToastNotification {
  static container = null;
  static modalContainer = null;

  static init() {
    if (!this.container) {
      let el = document.getElementById('toast-notification-container');
      if (!el) {
        el = document.createElement('div');
        el.id = 'toast-notification-container';
        el.className = 'toast-container';
        document.body.appendChild(el);
      }
      this.container = el;
    }

    if (!this.modalContainer) {
      let modalEl = document.getElementById('app-modal-root');
      if (!modalEl) {
        modalEl = document.createElement('div');
        modalEl.id = 'app-modal-root';
        document.body.appendChild(modalEl);
      }
      this.modalContainer = modalEl;
    }
  }

  /**
   * Mostra una notifica a scomparsa (Toast)
   * @param {string} message - Testo del messaggio
   * @param {'info' | 'success' | 'warning' | 'danger'} type - Tipo di notifica
   * @param {number} duration - Durata in millisecondi (default 3500ms)
   */
  static show(message, type = 'info', duration = 3500) {
    this.init();

    const toast = document.createElement('div');
    toast.className = `in-game-toast toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'warning') icon = '⚠️';
    if (type === 'danger') icon = '🛑';

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <div class="toast-msg">${message}</div>
      </div>
      <button class="toast-close-btn">&times;</button>
    `;

    // Riproduce effetto sonoro appropriato
    if (type === 'danger' || type === 'warning') {
      sound.playClick();
    } else if (type === 'success') {
      sound.playRadioBeep();
    } else {
      sound.playClick();
    }

    this.container.appendChild(toast);

    // Animazione di ingresso
    requestAnimationFrame(() => {
      toast.classList.add('toast-visible');
    });

    const closeToast = () => {
      toast.classList.remove('toast-visible');
      toast.classList.add('toast-hiding');
      setTimeout(() => {
        if (toast.parentElement) {
          toast.parentElement.removeChild(toast);
        }
      }, 300);
    };

    toast.querySelector('.toast-close-btn').onclick = closeToast;

    setTimeout(closeToast, duration);
  }

  /**
   * Mostra un modal di conferma in-game al posto del confirm() nativo del browser
   * @param {Object} options - { title, message, confirmText, cancelText, danger, onConfirm, onCancel }
   */
  static confirm({
    title = "Conferma Azione",
    message = "Sei sicuro di voler procedere?",
    confirmText = "Conferma",
    cancelText = "Annulla",
    danger = false,
    onConfirm = () => {},
    onCancel = () => {}
  }) {
    this.init();

    const overlay = document.createElement('div');
    overlay.className = 'in-game-modal-overlay confirmation-dialog-overlay';

    overlay.innerHTML = `
      <div class="in-game-modal-card">
        <div class="modal-card-header ${danger ? 'danger-header' : ''}">
          <span class="modal-badge">${danger ? '⚠️ ATTENZIONE' : '💬 COMUNICAZIONE'}</span>
          <h3 class="modal-title">${title}</h3>
        </div>
        <div class="modal-card-body">
          <p class="modal-message">${message}</p>
        </div>
        <div class="modal-card-footer">
          <button class="modal-btn btn-secondary" id="modal-cancel-btn">${cancelText}</button>
          <button class="modal-btn ${danger ? 'btn-danger' : 'btn-primary'}" id="modal-confirm-btn">${confirmText}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    sound.playRadioBeep();

    requestAnimationFrame(() => {
      overlay.classList.add('modal-visible');
    });

    const closeModal = (callback) => {
      overlay.classList.remove('modal-visible');
      if (callback) {
        try { callback(); } catch (e) { console.error(e); }
      }
      setTimeout(() => {
        if (overlay.parentElement) {
          overlay.parentElement.removeChild(overlay);
        }
      }, 250);
    };

    overlay.querySelector('#modal-cancel-btn').onclick = () => {
      sound.playClick();
      closeModal(onCancel);
    };

    overlay.querySelector('#modal-confirm-btn').onclick = () => {
      sound.playClick();
      closeModal(onConfirm);
    };
  }

  /**
   * Dialogo celebrativo per fine stagione o eventi speciali
   */
  static celebrate({
    title = "FESTEGGIAMENTI DI FINE STAGIONE",
    subtitle = "CAMPIONATO MONDIALE",
    message = "",
    isChampion = false,
    onClose = () => {}
  }) {
    this.init();

    const overlay = document.createElement('div');
    overlay.className = 'in-game-modal-overlay celebrate-overlay';

    overlay.innerHTML = `
      <div class="in-game-modal-card celebrate-card ${isChampion ? 'gold-celebration' : ''}">
        <div class="celebrate-banner">
          <span class="trophy-emoji">${isChampion ? '🏆' : '🏁'}</span>
          <span class="celebrate-sub">${subtitle}</span>
          <h2 class="celebrate-main-title">${title}</h2>
        </div>
        <div class="modal-card-body">
          <p class="modal-message large-text">${message}</p>
        </div>
        <div class="modal-card-footer center">
          <button class="modal-btn btn-gold" id="celebrate-close-btn">
            ${isChampion ? 'VAI AL PODIO & APRI IL MERCATO 🍾' : 'PROCEDI AL MERCATO PILOTI ➔'}
          </button>
        </div>
      </div>
    `;

    this.modalContainer.appendChild(overlay);
    if (isChampion) {
      sound.playChequeredFlag();
    } else {
      sound.playRadioBeep();
    }

    requestAnimationFrame(() => {
      overlay.classList.add('modal-visible');
    });

    const closeModal = () => {
      overlay.classList.remove('modal-visible');
      setTimeout(() => {
        if (overlay.parentElement) {
          overlay.parentElement.removeChild(overlay);
        }
        onClose();
      }, 250);
    };

    overlay.querySelector('#celebrate-close-btn').onclick = () => {
      sound.playClick();
      closeModal();
    };
  }
}
