import { career } from '../engine/careerEngine.js';
import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';
import { ToastNotification } from './toastNotification.js';

export class MarketView {
  static render(container, onNavigate) {
    const player = career.player;
    const careerData = career.career;
    const currentTeam = career.getPlayerTeam() || db.getTeam(careerData.currentTeamId, player.discipline);
    const teamDisplayName = currentTeam?.displayName || currentTeam?.realName || currentTeam?.fictionalName || currentTeam?.name || 'Scuderia';
    const teamColor = currentTeam?.color || '#e10600';
    const categoryName = db.getSeriesName(careerData.currentCategory, player.discipline);

    const offers = careerData.contractOffers || career.generateContractOffers();
    const currentContract = careerData.contract || { yearsLeft: 1, durationYears: 1, buyoutClause: 0 };
    const isUnderContract = (currentContract.yearsLeft || 0) > 0;
    const buyoutRequired = isUnderContract ? (currentContract.buyoutClause || 0) : 0;

    // Traccia la durata scelta (1 o 2 anni) per ciascuna offerta (default: 1)
    const selectedDurations = {};
    offers.forEach((_, idx) => { selectedDurations[idx] = 1; });

    const renderView = () => {
      container.innerHTML = `
        <div class="market-view-wrapper">
          <div class="weekend-top-header">
            <span class="session-badge">PADDOCK & TRATTATIVE</span>
            <h2>Mercato Piloti & Contratti Ufficiali</h2>
            <p class="header-sub">Gestisci il tuo ingaggio, valuta le proposte delle scuderie e scala le categorie del motorsport mondiale.</p>
          </div>

          <div class="market-grid-layout">
            <!-- Card Contratto Attuale -->
            <div class="dash-card current-contract-card">
              <div class="card-title-row">
                <h3 class="card-title">Il Tuo Contratto Attuale</h3>
                <div class="team-identity-badge">
                  <span class="team-badge-bullet" style="background:${teamColor}; box-shadow: 0 0 8px ${teamColor}"></span>
                  <span class="team-badge-name">${teamDisplayName}</span>
                </div>
              </div>

              <div class="contract-details-grid">
                <div class="contract-stat-item">
                  <span class="c-label">Campionato</span>
                  <strong class="c-val">${categoryName}</strong>
                </div>

                <div class="contract-stat-item">
                  <span class="c-label">Ruolo nel Team</span>
                  <strong class="c-val highlight-role">${currentContract.role || 'Prima Guida'}</strong>
                </div>

                <div class="contract-stat-item">
                  <span class="c-label">Stipendio per Gara</span>
                  <strong class="c-val money">€${(currentContract.salaryPerRace || 5000).toLocaleString()}</strong>
                </div>

                <div class="contract-stat-item">
                  <span class="c-label">Bonus Vittoria</span>
                  <strong class="c-val bonus">€${(currentContract.winBonus || 10000).toLocaleString()}</strong>
                </div>

                <div class="contract-stat-item">
                  <span class="c-label">Fondi Disponibili</span>
                  <strong class="c-val money">€${careerData.money.toLocaleString()}</strong>
                </div>

                <div class="contract-stat-item">
                  <span class="c-label">Durata Contratto</span>
                  <strong class="c-val ${isUnderContract ? 'gold-text' : ''}">
                    ${isUnderContract ? `${currentContract.yearsLeft} Anno/i rimanenti (di ${currentContract.durationYears || 1})` : 'Scaduto (Free Agent)'}
                  </strong>
                </div>
              </div>

              <!-- Banner di Stato Contrattuale -->
              <div class="contract-alert-banner ${isUnderContract ? 'under-contract' : 'free-agent'}">
                ${isUnderContract ? `
                  <span class="alert-icon">🔒</span>
                  <div>
                    <strong class="alert-banner-title">CONTRATTO IN CORSO (${currentContract.yearsLeft} ${currentContract.yearsLeft === 1 ? 'Anno Rimanente' : 'Anni Rimanenti'})</strong>
                    <p>Sei attualmente vincolato alla scuderia <strong>${teamDisplayName}</strong>.${buyoutRequired > 0 
                      ? ` In caso di trasferimento verso un'altra scuderia prima della naturale scadenza, sarà richiesta una <strong>clausola di rescissione di €${buyoutRequired.toLocaleString()}</strong>.`
                      : ` Il tuo accordo per questa stagione non prevede penali di rescissione (€0): puoi valutare liberamente altre offerte senza costi di svincolo.`
                    }</p>
                  </div>
                ` : `
                  <span class="alert-icon">✨</span>
                  <div>
                    <strong class="alert-banner-title">PILOTA LIBERO SUL MERCATO (FREE AGENT)</strong>
                    <p>Il tuo contratto è giunto al termine. Puoi rinnovare con la tua scuderia o firmare con qualsiasi nuova scuderia a costo zero (€0 penale di rescissione).</p>
                  </div>
                `}
              </div>
            </div>

            <!-- Offerte di Mercato Ricevute -->
            <div class="dash-card offers-card">
              <h3 class="card-title">Offerte sul Tavolo delle Trattative</h3>
              <p class="section-subtext">Scegli tra accordo annuale o biennale (con stipendio maggiorato e clausola rescissoria).</p>

              <div class="offers-list-container">
                ${offers.map((offer, idx) => {
                  const duration = selectedDurations[idx] || 1;
                  const salary = duration === 2 ? offer.salaryPerRace2yr : offer.salaryPerRace1yr;
                  const isSameTeam = offer.teamId === careerData.currentTeamId;
                  const needsBuyout = !isSameTeam && isUnderContract && buyoutRequired > 0;
                  const canAffordBuyout = careerData.money >= buyoutRequired;
                  const canSign = !needsBuyout || canAffordBuyout;

                  return `
                    <div class="offer-item-card ${offer.isPromotion ? 'promotion-offer' : ''} ${offer.isRenewal ? 'renewal-offer' : ''}">
                      <div class="offer-header">
                        <div class="offer-team-title">
                          <span class="team-badge-bullet" style="background:${offer.color || '#888'}; box-shadow: 0 0 8px ${offer.color || '#888'}"></span>
                          <div class="offer-team-info">
                            <strong class="offer-team-name">${offer.teamName || 'Scuderia'}</strong>
                            <span class="cat-subtitle">${offer.categoryName || ''} • Competitività Mezzo: <strong>${offer.carPace || 75}/99</strong></span>
                          </div>
                        </div>
                        ${offer.isPromotion 
                          ? '<span class="promo-badge">PROMOZIONE DI CATEGORIA 🚀</span>' 
                          : (offer.isRenewal ? '<span class="renewal-badge">PROPOSTA DI RINNOVO 📄</span>' : '<span class="rival-badge">OFFERTA TEAM RIVALE ⚔️</span>')}
                      </div>

                      <!-- Selettore Durata Contratto -->
                      <div class="contract-duration-selector">
                        <span class="selector-lbl">DURATA ACCORDO:</span>
                        <div class="duration-btn-group">
                          <button class="duration-pill ${duration === 1 ? 'active' : ''}" data-idx="${idx}" data-dur="1">
                            1 Anno
                          </button>
                          <button class="duration-pill ${duration === 2 ? 'active' : ''}" data-idx="${idx}" data-dur="2">
                            2 Anni (+15% Stipendio ⭐)
                          </button>
                        </div>
                      </div>

                      <div class="offer-financials">
                        <div class="fin-col">
                          <span class="fin-lbl">Stipendio a Gara</span>
                          <strong class="salary-val">€${salary.toLocaleString()}</strong>
                        </div>
                        <div class="fin-col">
                          <span class="fin-lbl">Bonus Vittoria</span>
                          <strong class="bonus-val">€${offer.winBonus.toLocaleString()}</strong>
                        </div>
                        <div class="fin-col">
                          <span class="fin-lbl">Ruolo nel Team</span>
                          <strong class="role-text">${offer.role}</strong>
                        </div>
                        <div class="fin-col">
                          <span class="fin-lbl">Clausola Rescissione</span>
                          <strong class="buyout-val ${duration === 2 ? 'buyout-tag' : ''}">
                            ${duration === 2 ? `€${(offer.buyoutClause2yr || 15000).toLocaleString()}` : 'Nessuna (€0)'}
                          </strong>
                        </div>
                      </div>

                      ${needsBuyout ? `
                        <div class="offer-buyout-warning ${!canAffordBuyout ? 'danger' : ''}">
                          <span>⚠️ Rescissione vecchio contratto: <strong>€${buyoutRequired.toLocaleString()}</strong></span>
                          ${!canAffordBuyout ? `<small class="not-enough-funds">Fondi insufficienti (Mancano €${(buyoutRequired - careerData.money).toLocaleString()})</small>` : ''}
                        </div>
                      ` : ''}

                      <div class="offer-action-row">
                        <button class="accept-offer-btn ${!canSign ? 'disabled' : ''}" data-idx="${idx}" ${!canSign ? 'disabled' : ''}>
                          <span>${offer.isRenewal ? 'RINNOVA ACCORDO UFFICIALE ✍️' : (needsBuyout ? `PAGA PENALE (€${buyoutRequired.toLocaleString()}) E FIRMA ✍️` : 'FIRMA ACCORDO UFFICIALE ✍️')}</span>
                        </button>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <div class="finish-weekend-action-bar">
            <button id="btn-return-from-market" class="start-race-button">
              <span>RITORNA ALLA DASHBOARD ➔</span>
            </button>
          </div>
        </div>
      `;

      // Toggle durata contratto
      container.querySelectorAll('.duration-pill').forEach(btn => {
        btn.onclick = () => {
          sound.playClick();
          const idx = parseInt(btn.dataset.idx, 10);
          const dur = parseInt(btn.dataset.dur, 10);
          selectedDurations[idx] = dur;
          renderView();
        };
      });

      // Firma contratto
      container.querySelectorAll('.accept-offer-btn').forEach(btn => {
        btn.onclick = () => {
          const idx = parseInt(btn.dataset.idx, 10);
          const chosenOffer = offers[idx];
          const duration = selectedDurations[idx] || 1;
          const salary = duration === 2 ? chosenOffer.salaryPerRace2yr : chosenOffer.salaryPerRace1yr;
          const isSameTeam = chosenOffer.teamId === careerData.currentTeamId;
          const needsBuyout = !isSameTeam && isUnderContract && buyoutRequired > 0;

          let confirmMsg = `Confermi l'accordo di ${duration} anno/i con ${chosenOffer.teamName} (${chosenOffer.categoryName}) con stipendio di €${salary.toLocaleString()} a Gran Premio?`;
          if (needsBuyout) {
            confirmMsg += `\n\n⚠️ RESCISSIONE ANTICIPATA: Verrà addebitata la penale di rescissione di €${buyoutRequired.toLocaleString()} dal tuo saldo personale.`;
          }

          ToastNotification.confirm({
            title: needsBuyout ? "Rescissione e Firma Nuovo Contratto" : "Firma Contratto Ufficiale",
            message: confirmMsg,
            confirmText: needsBuyout ? `Paga €${buyoutRequired.toLocaleString()} e Firma ✍️` : "Firma Contratto ✍️",
            cancelText: "Valuta Ancora",
            danger: needsBuyout,
            onConfirm: () => {
              const res = career.acceptContract(chosenOffer, duration);
              if (res.success) {
                sound.playChequeredFlag();
                ToastNotification.show(
                  `🤝 Congratulazioni! Hai firmato ufficialmente con ${chosenOffer.teamName}! ${res.paidBuyout > 0 ? `Pagata clausola di €${res.paidBuyout.toLocaleString()}.` : ''}`, 
                  "success"
                );
                window.dispatchEvent(new CustomEvent('career-data-updated'));
                onNavigate('dashboard');
              } else {
                ToastNotification.show(res.reason || "Errore nella stipula del contratto.", "danger");
              }
            }
          });
        };
      });

      const returnBtn = container.querySelector('#btn-return-from-market');
      if (returnBtn) {
        returnBtn.onclick = () => {
          sound.playClick();
          onNavigate('dashboard');
        };
      }
    };

    renderView();
  }
}
