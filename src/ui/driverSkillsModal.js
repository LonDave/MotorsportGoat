import { career } from '../engine/careerEngine.js';
import { sound } from '../engine/audioManager.js';
import { ToastNotification } from './toastNotification.js';

export class DriverSkillsModal {
  static open(options = {}) {
    const onClose = options.onClose || (() => {});
    const onConfirm = options.onConfirm || (() => {});
    const isPostWeekend = !!options.isPostWeekend;

    const player = career.player;
    if (!player) return;

    // Rimuovi eventuali istanze residue
    const existing = document.getElementById('driver-skills-modal');
    if (existing) existing.remove();

    // Bozza locale per le allocazioni temporanee
    const draftAllocations = {
      pace: 0,
      racecraft: 0,
      tyreMgmt: 0,
      consistency: 0,
      wetSkill: 0,
      technicalFeedback: 0,
      fitness: 0
    };

    let availablePoints = player.unspentSkillPoints || 0;
    const initialOvr = player.ovr;

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'in-game-modal-overlay modal-visible';
    modalOverlay.id = 'driver-skills-modal';

    const attributeDefinitions = [
      { key: 'pace', name: 'Giro Secco & Qualifica', icon: '⚡', weight: '28%', desc: 'Velocità pura sul giro singolo, staccata al limite e caccia alla Pole Position.' },
      { key: 'racecraft', name: 'Staccata & Sorpasso', icon: '⚔️', weight: '22%', desc: 'Efficacia nei duelli corpo a corpo, difesa della traiettoria e attacco in curva.' },
      { key: 'tyreMgmt', name: 'Gestione Gomme', icon: '🛞', weight: '16%', desc: 'Capacità di preservare la mescola evitando surriscaldamenti e blistering sui long run.' },
      { key: 'consistency', name: 'Costanza di Passo', icon: '⏱️', weight: '14%', desc: 'Ripetitività dei tempi su ogni giro e riduzione del rischio di errori o sbavature.' },
      { key: 'wetSkill', name: 'Abilità sul Bagnato', icon: '🌧️', weight: '10%', desc: 'Sensibilità sull\'asfalto allagato, galleggiamento e controllo dell\'aquaplaning.' },
      { key: 'technicalFeedback', name: 'Feedback Telemetrico', icon: '📡', weight: '10%', desc: 'Qualità dei dati telemetrici trasmessi agli ingegneri per il bilanciamento dell\'assetto.' },
      { key: 'fitness', name: 'Forma Fisica & Riflessi', icon: '🏃', weight: 'Atletica', desc: 'Resistenza al carico gravitazionale G e mantenimento della lucidità sotto sforzo.' }
    ];

    const renderContent = () => {
      const totalDraftSpent = Object.values(draftAllocations).reduce((sum, v) => sum + v, 0);
      const remainingPoints = availablePoints - totalDraftSpent;
      const previewOvr = career.previewOvrWithAllocations(draftAllocations);
      const ovrDelta = previewOvr - initialOvr;

      modalOverlay.innerHTML = `
        <div class="in-game-modal-card skills-modal-card">
          <!-- HEADER MODAL -->
          <div class="modal-card-header skills-modal-header">
            <div class="header-titles">
              <span class="modal-badge gold">
                ${isPostWeekend ? '🏁 WEEKEND COMPLETATO • SVILUPPO PILOTA' : '⚡ SCHEDA OVR & ABILITÀ PILOTA'}
              </span>
              <h2 class="skills-modal-title">
                ${player.firstName} ${player.lastName} (${player.age} Anni)
              </h2>
              <small class="skills-modal-subtitle">
                Distribuisci i Punti Abilità per far crescere il tuo pilota curva dopo curva.
              </small>
            </div>
            <button id="btn-close-skills-modal" class="modal-close-icon" title="Chiudi finestra">✕</button>
          </div>

          <!-- CORPO MODAL -->
          <div class="modal-card-body skills-modal-body">
            <!-- HERO OVR & PUNTI DISPONIBILI -->
            <div class="skills-hero-banner">
              <div class="ovr-rating-display">
                <span class="ovr-lbl">VALUTAZIONE COMPLESSIVA</span>
                <div class="ovr-values-row">
                  <span class="current-ovr-number">${initialOvr}</span>
                  ${ovrDelta > 0 ? `<span class="ovr-upgrade-arrow">➔</span><span class="new-ovr-number">+${ovrDelta} (${previewOvr} OVR)</span>` : ''}
                </div>
                <small class="ovr-peak-tag">Picco Massimo Raggiunto: <strong>${career.career?.stats?.peakOvr || initialOvr} OVR</strong></small>
              </div>

              <div class="skill-points-counter-box ${remainingPoints > 0 ? 'pulse-border' : ''}">
                <span class="pts-lbl">PUNTI ABILITÀ DISPONIBILI</span>
                <strong class="pts-val">${remainingPoints} ⭐</strong>
                <small class="pts-hint">
                  ${remainingPoints > 0 ? 'Clicca [+] sugli attributi per assegnarli' : 'Guadagna nuovi punti completando i GP'}
                </small>
              </div>
            </div>

            <!-- RIEPILOGO PONDERAZIONE OVR -->
            <div class="ovr-weights-summary-pill">
              <span class="formula-tag">FORMULA OVR:</span>
              <span>28% Passo • 22% Duelli • 16% Gomme • 14% Costanza • 10% Bagnato • 10% Telemetria</span>
            </div>

            <!-- GRIGLIA INTERATTIVA ATTRIBUTI -->
            <div class="skills-attributes-grid">
              ${attributeDefinitions.map(attr => {
                const baseVal = Math.round(player.attributes[attr.key] || 50);
                const addedVal = draftAllocations[attr.key] || 0;
                const totalVal = baseVal + addedVal;
                const canAdd = remainingPoints > 0 && totalVal < 99;
                const canRemove = addedVal > 0;

                return `
                  <div class="skill-row-item ${addedVal > 0 ? 'upgraded' : ''}">
                    <div class="skill-info-col">
                      <div class="skill-name-row">
                        <span class="skill-icon">${attr.icon}</span>
                        <strong class="skill-title">${attr.name}</strong>
                        <span class="skill-weight-tag">${attr.weight}</span>
                      </div>
                      <p class="skill-desc">${attr.desc}</p>
                    </div>

                    <div class="skill-progress-col">
                      <div class="skill-bar-wrapper">
                        <div class="skill-bar-bg">
                          <div class="skill-bar-base" style="width:${baseVal}%"></div>
                          ${addedVal > 0 ? `<div class="skill-bar-added" style="left:${baseVal}%; width:${addedVal}%"></div>` : ''}
                        </div>
                      </div>
                      <div class="skill-numbers">
                        <span class="base-num">${baseVal}</span>
                        ${addedVal > 0 ? `<strong class="bonus-num">+${addedVal} (${totalVal})</strong>` : ''}
                      </div>
                    </div>

                    <div class="skill-controls-col">
                      <button class="btn-step-attr btn-minus" data-key="${attr.key}" ${!canRemove ? 'disabled' : ''}>-</button>
                      <span class="draft-added-badge ${addedVal > 0 ? 'has-points' : ''}">+${addedVal}</span>
                      <button class="btn-step-attr btn-plus" data-key="${attr.key}" ${!canAdd ? 'disabled' : ''}>+</button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- FOOTER AZIONI -->
          <div class="modal-card-footer skills-modal-footer">
            <button id="btn-cancel-skills" class="modal-btn btn-secondary">
              ${totalDraftSpent > 0 ? 'Annulla Modifiche' : 'Chiudi / Conserva per Dopo'}
            </button>
            <button id="btn-confirm-skills" class="modal-btn btn-primary pulse-glow" ${totalDraftSpent === 0 ? 'disabled' : ''}>
              <span>CONFERMA E SALVA SVILUPPO (+${totalDraftSpent} Pts) 💾</span>
            </button>
          </div>
        </div>
      `;

      // Event listener incrementi e decrementi
      modalOverlay.querySelectorAll('.btn-plus').forEach(btn => {
        btn.onclick = () => {
          const key = btn.dataset.key;
          if (remainingPoints > 0 && (player.attributes[key] + draftAllocations[key]) < 99) {
            sound.playClick();
            draftAllocations[key]++;
            renderContent();
          }
        };
      });

      modalOverlay.querySelectorAll('.btn-minus').forEach(btn => {
        btn.onclick = () => {
          const key = btn.dataset.key;
          if (draftAllocations[key] > 0) {
            sound.playClick();
            draftAllocations[key]--;
            renderContent();
          }
        };
      });

      // Conferma allocazione
      const confirmBtn = modalOverlay.querySelector('#btn-confirm-skills');
      if (confirmBtn) {
        confirmBtn.onclick = () => {
          if (totalDraftSpent <= 0) return;
          sound.playRadioBeep();
          const res = career.assignBatchSkillPoints(draftAllocations);
          if (res.success) {
            ToastNotification.show(`🎉 Abilità potenziate! Valutazione pilota aggiornata a ${res.newOvr} OVR.`, 'success');
            modalOverlay.remove();
            window.dispatchEvent(new CustomEvent('career-data-updated'));
            onConfirm(res);
          }
        };
      }

      // Chiusura o annullamento
      const closeBtn = modalOverlay.querySelector('#btn-close-skills-modal');
      const cancelBtn = modalOverlay.querySelector('#btn-cancel-skills');
      const closeAction = () => {
        sound.playClick();
        modalOverlay.remove();
        onClose();
      };

      if (closeBtn) closeBtn.onclick = closeAction;
      if (cancelBtn) cancelBtn.onclick = closeAction;
    };

    renderContent();
    document.body.appendChild(modalOverlay);
  }
}
