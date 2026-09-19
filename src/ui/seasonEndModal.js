import { career } from '../engine/careerEngine.js';
import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';
import { ToastNotification } from './toastNotification.js';
import { TeammateSelectionModal } from './teammateSelectionModal.js';
import { AUTO_CATEGORIES } from '../data/autoDatabase.js';
import { MOTO_CATEGORIES } from '../data/motoDatabase.js';

export class SeasonEndModal {
  static open(seasonResult, onComplete) {
    const existing = document.getElementById('season-end-modal');
    if (existing) existing.remove();

    const player = career.player;
    const careerData = career.career;
    const currentTeam = career.getPlayerTeam();
    const teamDisplayName = currentTeam?.displayName || currentTeam?.realName || currentTeam?.fictionalName || 'Scuderia';
    const teamColor = currentTeam?.color || '#e10600';
    const categoryName = db.getSeriesName(careerData.currentCategory, player.discipline);

    const isUnderContract = !!seasonResult.isUnderContract;
    const yearsLeft = seasonResult.yearsLeft || 0;
    const buyoutPenalty = seasonResult.buyoutClause || 0;
    const offers = seasonResult.offers || career.generateContractOffers();
    const dev = seasonResult.devReport;

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'in-game-modal-overlay modal-visible';
    modalOverlay.id = 'season-end-modal';

    let activeTab = 'stay'; // 'stay', 'rivals', 'promotions'
    const selectedDurations = {};
    offers.forEach((_, idx) => { selectedDurations[idx] = 1; });

    const renderContent = () => {
      const renewalOffer = offers.find(o => o.isRenewal) || offers[0];
      const rivalOffers = offers.filter(o => !o.isRenewal && !o.isPromotion);
      const promoOffers = offers.filter(o => o.isPromotion);

      let devHtml = '';
      if (dev) {
        const deltaEntries = Object.entries(dev.deltas || {});
        const deltasStr = deltaEntries.length > 0
          ? deltaEntries.map(([k, v]) => {
              const labelMap = {
                pace: 'Giro Secco',
                racecraft: 'Staccata',
                tyreMgmt: 'Gomme',
                consistency: 'Costanza',
                wetSkill: 'Bagnato',
                technicalFeedback: 'Telemetria',
                fitness: 'Forma Fisica'
              };
              const name = labelMap[k] || k;
              const sign = v > 0 ? `+${v}` : `${v}`;
              const color = v > 0 ? '#00f0ff' : '#ff4d4d';
              return `<span class="dev-delta-tag" style="color:${color}">${name}: ${sign}</span>`;
            }).join(' ')
          : '<span style="color:#aaa;">Statistiche stabili</span>';

        devHtml = `
          <div class="season-end-dev-card">
            <div class="dev-card-header">
              <span class="dev-title">🧬 SVILUPPO ANNUALE: ${dev.newAge} ANNI (${dev.phase})</span>
              <span class="dev-ovr-tag">OVR: ${dev.ovr}</span>
            </div>
            <p class="dev-summary-text">${dev.summary}</p>
            <div class="dev-deltas-row">${deltasStr}</div>
          </div>
        `;
      }

      modalOverlay.innerHTML = `
        <div class="in-game-modal-card season-end-modal-card">
          <!-- HEADER MODAL -->
          <div class="modal-card-header season-end-header">
            <div class="header-titles">
              <span class="modal-badge gold">
                ${seasonResult.isPlayerChampion ? '🏆 CAMPIONATO VINTO • CELEBRAZIONE' : '🏁 STAGIONE CONCLUSA • BILANCIO'}
              </span>
              <h2 class="season-modal-title">
                ${seasonResult.isPlayerChampion ? 'Sei Campione del Mondo!' : `Stagione ${careerData.seasonNumber - 1} Conclusa`}
              </h2>
              <small class="season-modal-sub">
                Campione del Mondo: <strong>${seasonResult.championName}</strong> • È tempo di decidere il tuo futuro contrattuale!
              </small>
            </div>
          </div>

          <!-- CORPO MODAL -->
          <div class="modal-card-body season-end-body">
            <!-- SCHEDA EVOLUZIONE PILOTA -->
            ${devHtml}

            <!-- STATUS CONTRATTUALE ATTUALE -->
            <div class="season-contract-status-card ${isUnderContract ? 'locked' : 'free'}">
              <div class="status-top-line">
                <span class="status-badge ${isUnderContract ? 'under-contract' : 'free-agent'}">
                  ${isUnderContract ? `🔒 SOTTO CONTRATTO (${yearsLeft} ANNO/I RIMANENTI)` : '✨ SVINCOLATO (FREE AGENT)'}
                </span>
                <span class="team-lbl" style="border-left: 3px solid ${teamColor}; padding-left: 8px;">
                  Scuderia Attuale: <strong>${teamDisplayName}</strong> (${categoryName})
                </span>
              </div>
              <p class="status-desc">
                ${isUnderContract ? `
                  Il tuo contratto biennale è ancora valido per un'altra stagione. Puoi rispettare l'accordo senza alcun costo, oppure rompere il contratto versando la <strong>clausola di rescissione di €${buyoutPenalty.toLocaleString()}</strong> per accasarti altrove.
                ` : `
                  Il tuo accordo è terminato! Sei libero di rinnovare con ${teamDisplayName} o di firmare con qualsiasi altra scuderia senza pagare alcuna penale.
                `}
              </p>
            </div>

            <!-- TABS SCELTA FUTURO -->
            <div class="season-decision-tabs">
              <button class="season-tab-btn ${activeTab === 'stay' ? 'active' : ''}" data-tab="stay">
                <span>🛡️ Scuderia Attuale (${teamDisplayName})</span>
              </button>
              <button class="season-tab-btn ${activeTab === 'rivals' ? 'active' : ''}" data-tab="rivals">
                <span>⚔️ Team Rivali (${rivalOffers.length})</span>
              </button>
              ${promoOffers.length > 0 ? `
                <button class="season-tab-btn ${activeTab === 'promotions' ? 'active' : ''}" data-tab="promotions">
                  <span>🚀 Salto di Categoria (${promoOffers.length})</span>
                </button>
              ` : ''}
            </div>

            <!-- CONTENUTO DELLE SCELTE -->
            <div class="season-tab-content-wrapper">
              ${activeTab === 'stay' ? `
                <div class="stay-choice-container">
                  ${isUnderContract ? `
                    <div class="stay-card under-contract-stay">
                      <div class="stay-info">
                        <span class="stay-badge gold">ACCORDO IN VIGORE</span>
                        <h4>Rispetta il 2° Anno di Contratto</h4>
                        <p>Continua a difendere i colori di <strong>${teamDisplayName}</strong> per la Stagione ${careerData.seasonNumber}. Nessun costo di rescissione.</p>
                        <div class="stay-financials">
                          <div><span>Stipendio per Gara:</span> <strong>€${(careerData.contract.salaryPerRace || 5000).toLocaleString()}</strong></div>
                          <div><span>Bonus Vittoria:</span> <strong>€${(careerData.contract.winBonus || 10000).toLocaleString()}</strong></div>
                          <div><span>Ruolo:</span> <strong class="role">${careerData.contract.role || '1st Driver'}</strong></div>
                        </div>
                      </div>
                      <button id="btn-stay-respect-contract" class="modal-btn btn-primary pulse-glow">
                        <span>CONFERMA E RISPETTA IL CONTRATTO (€0) ➔</span>
                      </button>
                    </div>
                  ` : `
                    <div class="stay-card renewal-stay">
                      <div class="stay-info">
                        <span class="stay-badge green">PROPOSTA DI RINNOVO</span>
                        <h4>Rinnova con ${teamDisplayName}</h4>
                        <p>La squadra è entusiasta dei tuoi risultati e ti propone un rinnovo contrattuale ufficiale.</p>
                        
                        <div class="duration-selector-row">
                          <span>DURATA ACCORDO:</span>
                          <div class="duration-btn-group">
                            <button class="duration-pill ${selectedDurations['renewal'] === 2 ? '' : 'active'}" data-key="renewal" data-dur="1">1 Anno</button>
                            <button class="duration-pill ${selectedDurations['renewal'] === 2 ? 'active' : ''}" data-key="renewal" data-dur="2">2 Anni (+15% Stipendio ⭐)</button>
                          </div>
                        </div>

                        <div class="stay-financials">
                          <div><span>Stipendio:</span> <strong>€${(selectedDurations['renewal'] === 2 ? renewalOffer.salaryPerRace2yr : renewalOffer.salaryPerRace1yr).toLocaleString()} / gara</strong></div>
                          <div><span>Bonus Vittoria:</span> <strong>€${renewalOffer.winBonus.toLocaleString()}</strong></div>
                          <div><span>Clausola Rescissione:</span> <strong>${selectedDurations['renewal'] === 2 ? `€${renewalOffer.buyoutClause2yr.toLocaleString()}` : 'Nessuna'}</strong></div>
                        </div>
                      </div>
                      <button id="btn-renew-current-team" class="modal-btn btn-primary pulse-glow">
                        <span>FIRMA RINNOVO CONTRATTO ✍️</span>
                      </button>
                    </div>
                  `}
                </div>
              ` : ''}

              ${activeTab === 'rivals' ? `
                <div class="offers-grid-cards">
                  ${rivalOffers.length === 0 ? '<p class="no-offers-msg">Nessuna offerta rivale disponibile per questa stagione.</p>' : ''}
                  ${rivalOffers.map((offer, idx) => {
                    const dur = selectedDurations[`rival_${idx}`] || 1;
                    const salary = dur === 2 ? offer.salaryPerRace2yr : offer.salaryPerRace1yr;
                    const needsBuyout = isUnderContract && buyoutPenalty > 0;
                    const canAfford = careerData.money >= buyoutPenalty;

                    return `
                      <div class="mini-offer-card">
                        <div class="card-head">
                          <span class="team-dot" style="background:${offer.color}"></span>
                          <div>
                            <strong>${offer.teamName}</strong>
                            <small>${offer.categoryName}</small>
                          </div>
                        </div>

                        <div class="duration-selector-row mini">
                          <div class="duration-btn-group">
                            <button class="duration-pill ${dur === 1 ? 'active' : ''}" data-key="rival_${idx}" data-dur="1">1 Anno</button>
                            <button class="duration-pill ${dur === 2 ? 'active' : ''}" data-key="rival_${idx}" data-dur="2">2 Anni (+15%)</button>
                          </div>
                        </div>

                        <div class="offer-nums">
                          <div><span>Stipendio:</span> <strong>€${salary.toLocaleString()}</strong></div>
                          <div><span>Bonus Vittoria:</span> <strong>€${offer.winBonus.toLocaleString()}</strong></div>
                          <div><span>Clausola Rescissione:</span> <strong>${dur === 2 ? `€${offer.buyoutClause2yr.toLocaleString()}` : '€0'}</strong></div>
                        </div>

                        ${needsBuyout ? `
                          <div class="buyout-pill-warning ${!canAfford ? 'danger' : ''}">
                            <span>Penale Rescissione: €${buyoutPenalty.toLocaleString()}</span>
                            ${!canAfford ? '<small>Fondi insufficienti</small>' : ''}
                          </div>
                        ` : ''}

                        <button class="btn-sign-decision-offer ${needsBuyout && !canAfford ? 'disabled' : ''}" data-offer-id="${offer.id}" data-dur="${dur}" ${needsBuyout && !canAfford ? 'disabled' : ''}>
                          <span>${needsBuyout ? `PAGA PENALE (€${buyoutPenalty.toLocaleString()}) E FIRMA ✍️` : 'FIRMA CONTRATTO ✍️'}</span>
                        </button>
                      </div>
                    `;
                  }).join('')}
                </div>
              ` : ''}

              ${activeTab === 'promotions' ? `
                <div class="offers-grid-cards">
                  ${promoOffers.length === 0 ? `
                    <div class="no-offers-container" style="text-align:center; padding:36px 20px; background:rgba(255,255,255,0.02); border-radius:12px; border:1px dashed rgba(255,255,255,0.15); width:100%; grid-column:1/-1;">
                      <div style="font-size:36px; margin-bottom:12px;">🔒</div>
                      <h4 style="margin-bottom:8px; color:var(--text-primary); font-size:16px;">Nessuna Offerta di Promozione per la Prossima Stagione</h4>
                      <p style="color:var(--text-secondary); max-width:540px; margin:0 auto; font-size:13px; line-height:1.5;">
                        I team delle categorie superiori offrono contratti ai piloti che brillano nella serie attuale. Per sbloccare la promozione: termina il campionato sul podio (Top 3), vinci il Titolo Mondiale o incrementa la tua valutazione complessiva (67+ OVR).
                      </p>
                    </div>
                  ` : ''}
                  ${promoOffers.map((offer, idx) => {
                    const dur = selectedDurations[`promo_${idx}`] || 1;
                    const salary = dur === 2 ? offer.salaryPerRace2yr : offer.salaryPerRace1yr;
                    // Le promozioni conquistate a fine stagione non richiedono mai penali di rescissione
                    const needsBuyout = false;

                    return `
                      <div class="mini-offer-card promo-highlight">
                        <div class="card-head">
                          <span class="team-dot" style="background:${offer.color}"></span>
                          <div>
                            <span class="promo-mini-badge">PROMOZIONE 🚀</span>
                            <strong>${offer.teamName}</strong>
                            <small class="cat-target">${offer.categoryName}</small>
                          </div>
                        </div>

                        <div class="duration-selector-row mini">
                          <div class="duration-btn-group">
                            <button class="duration-pill ${dur === 1 ? 'active' : ''}" data-key="promo_${idx}" data-dur="1">1 Anno</button>
                            <button class="duration-pill ${dur === 2 ? 'active' : ''}" data-key="promo_${idx}" data-dur="2">2 Anni (+15%)</button>
                          </div>
                        </div>

                        <div class="offer-nums">
                          <div><span>Stipendio:</span> <strong>€${salary.toLocaleString()}</strong></div>
                          <div><span>Bonus Vittoria:</span> <strong>€${offer.winBonus.toLocaleString()}</strong></div>
                          <div><span>Clausola Rescissione:</span> <strong>${dur === 2 ? `€${offer.buyoutClause2yr.toLocaleString()}` : '€0'}</strong></div>
                        </div>

                        <button class="btn-sign-decision-offer" data-offer-id="${offer.id}" data-dur="${dur}">
                          <span>ACCETTA PROMOZIONE 🚀</span>
                        </button>
                      </div>
                    `;
                  }).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;

      // Gestione Tab
      modalOverlay.querySelectorAll('.season-tab-btn').forEach(btn => {
        btn.onclick = () => {
          sound.playClick();
          activeTab = btn.dataset.tab;
          renderContent();
        };
      });

      // Gestione Pill Durata
      modalOverlay.querySelectorAll('.duration-pill').forEach(btn => {
        btn.onclick = () => {
          sound.playClick();
          const key = btn.dataset.key;
          const dur = parseInt(btn.dataset.dur, 10);
          selectedDurations[key] = dur;
          renderContent();
        };
      });

      // Bottone: Rispetta contratto
      const respectBtn = modalOverlay.querySelector('#btn-stay-respect-contract');
      if (respectBtn) {
        respectBtn.onclick = () => {
          sound.playEngineRev();
          ToastNotification.show(`🤝 Continuerai a correre con ${teamDisplayName} per il 2° anno!`, 'success');
          modalOverlay.remove();
          career.startNewSeason(null, 1);
          window.dispatchEvent(new CustomEvent('career-data-updated'));
          onComplete();
        };
      }

      // Bottone: Rinnova con team attuale
      const renewBtn = modalOverlay.querySelector('#btn-renew-current-team');
      if (renewBtn) {
        renewBtn.onclick = () => {
          const dur = selectedDurations['renewal'] || 1;
          const res = career.startNewSeason(renewalOffer, dur);
          if (res.success) {
            sound.playChequeredFlag();
            ToastNotification.show(`🤝 Rinnovo confermato per ${dur} anno/i con ${teamDisplayName}!`, 'success');
            modalOverlay.remove();
            window.dispatchEvent(new CustomEvent('career-data-updated'));
            onComplete();
          } else {
            ToastNotification.show(res.reason || "Errore nel rinnovo del contratto.", "danger");
          }
        };
      }

      // Bottoni offerte rivali / promozioni
      modalOverlay.querySelectorAll('.btn-sign-decision-offer').forEach(btn => {
        btn.onclick = () => {
          const offerId = btn.dataset.offerId;
          const dur = parseInt(btn.dataset.dur, 10);
          const chosen = offers.find(o => o.id === offerId);
          if (!chosen) return;

          const categories = player.discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
          const targetCat = categories[chosen.category];
          const maxDrivers = targetCat?.maxDriversPerTeam || 2;
          const existingDrivers = (targetCat?.roster || []).filter(r => {
            const effTeam = (careerData.teamDriverOverrides && careerData.teamDriverOverrides[r.id]) || r.teamId;
            return effTeam === chosen.teamId;
          });

          const executeNewSeasonSigning = (chosenTeammateId = null, replacedDriverId = null) => {
            if (chosenTeammateId && replacedDriverId) {
              career.setTeamDrivers(chosen.teamId, chosen.category, chosenTeammateId, replacedDriverId);
            }
            const res = career.startNewSeason(chosen, dur);
            if (res.success) {
              sound.playChequeredFlag();
              ToastNotification.show(`🚀 Ufficiale! Benvenuto in ${chosen.teamName}! ${res.paidBuyout > 0 ? `Pagata penale di rescissione di €${res.paidBuyout.toLocaleString()}.` : ''}`, 'success');
              modalOverlay.remove();
              window.dispatchEvent(new CustomEvent('career-data-updated'));
              onComplete();
            } else {
              ToastNotification.show(res.reason || "Errore nella firma del contratto.", "danger");
            }
          };

          const openSigningModalFlow = () => {
            if (existingDrivers.length >= maxDrivers) {
              TeammateSelectionModal.show({
                team: { id: chosen.teamId, color: chosen.color },
                category: targetCat,
                existingDrivers,
                maxDriversPerTeam: maxDrivers,
                discipline: player.discipline,
                onConfirm: ({ chosenTeammateId, replacedDriverId }) => {
                  executeNewSeasonSigning(chosenTeammateId, replacedDriverId);
                }
              });
            } else {
              executeNewSeasonSigning();
            }
          };

          const needsBuyout = isUnderContract && buyoutPenalty > 0;
          let confirmMsg = `Confermi l'accordo di ${dur} anno/i con ${chosen.teamName} (${chosen.categoryName})?`;
          if (needsBuyout) {
            confirmMsg += `\n\n⚠️ RESCISSIONE ANTICIPATA: Verrà addebitata la penale di rescissione di €${buyoutPenalty.toLocaleString()} per liberarti dal vecchio contratto.`;
          }

          ToastNotification.confirm({
            title: needsBuyout ? "Rescissione e Firma Accordo" : "Firma Nuovo Contratto",
            message: confirmMsg,
            confirmText: needsBuyout ? `Paga €${buyoutPenalty.toLocaleString()} e Firma ✍️` : "Firma Contratto ✍️",
            cancelText: "Valuta Ancora",
            danger: needsBuyout,
            onConfirm: () => {
              openSigningModalFlow();
            }
          });
        };
      });
    };

    renderContent();
    document.body.appendChild(modalOverlay);
  }
}
