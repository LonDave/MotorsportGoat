import { career } from '../engine/careerEngine.js';
import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';
import { ToastNotification } from './toastNotification.js';
import { TeammateSelectionModal } from './teammateSelectionModal.js';
import { AUTO_CATEGORIES } from '../data/autoDatabase.js';
import { MOTO_CATEGORIES } from '../data/motoDatabase.js';

export class MarketView {
  static currentTab = 'offers'; // 'offers' | 'free_agents' | 'news'

  static render(container, onNavigate) {
    const player = career.player;
    const careerData = career.career;
    const currentTeam = career.getPlayerTeam() || db.getTeam(careerData.currentTeamId, player.discipline);
    const teamDisplayName = currentTeam?.displayName || currentTeam?.realName || currentTeam?.fictionalName || currentTeam?.name || 'Scuderia';
    const teamColor = currentTeam?.color || '#e10600';
    const categoryName = db.getSeriesName(careerData.currentCategory, player.discipline);
    const catData = career.getCurrentCategoryData() || {};
    const catTeams = catData.teams || [];

    const offers = careerData.contractOffers || career.generateContractOffers();
    const currentContract = careerData.contract || { yearsLeft: 1, durationYears: 1, buyoutClause: 0 };
    const isUnderContract = (currentContract.yearsLeft || 0) > 0;
    const buyoutRequired = isUnderContract ? (currentContract.buyoutClause || 0) : 0;

    // Traccia la durata scelta (1 o 2 anni) per ciascuna offerta (default: 1)
    const selectedDurations = {};
    offers.forEach((_, idx) => { selectedDurations[idx] = 1; });

    const renderView = () => {
      const freeAgents = careerData.freeAgents || [];
      const transferNews = careerData.aiTransferNews || [];

      container.innerHTML = `
        <div class="market-view-wrapper">
          <div class="weekend-top-header">
            <span class="session-badge">PADDOCK & TRATTATIVE</span>
            <h2>Mercato Piloti & Contratti Ufficiali</h2>
            <p class="header-sub">Gestisci il tuo ingaggio, consulta le formazioni delle scuderie, i piloti svincolati e le trattative AI del motorsport mondiale.</p>
          </div>

          <!-- TAB SELECTOR MERCATO -->
          <div class="standings-tab-bar" style="margin-bottom: 24px; display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="tab-btn ${this.currentTab === 'offers' ? 'active' : ''}" data-tab="offers">
              📋 Trattative & Offerte (${offers.length})
            </button>
            <button class="tab-btn ${this.currentTab === 'grid' ? 'active' : ''}" data-tab="grid">
              🏎️ Griglia Scuderie & Formazioni
            </button>
            <button class="tab-btn ${this.currentTab === 'free_agents' ? 'active' : ''}" data-tab="free_agents">
              🆓 Piloti Svincolati (${freeAgents.length})
            </button>
            <button class="tab-btn ${this.currentTab === 'news' ? 'active' : ''}" data-tab="news">
              📰 Ultime Notizie AI (${transferNews.length})
            </button>
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

            <!-- TAB 1: OFFERTE DI MERCATO -->
            ${this.currentTab === 'offers' ? `
              <div class="dash-card offers-card">
                <h3 class="card-title">Offerte sul Tavolo delle Trattative</h3>
                <p class="section-subtext">Scegli tra accordo annuale o biennale. Se firmi con una scuderia al completo, selezionerai il tuo compagno di squadra.</p>

                <div class="offers-list-container">
                  ${offers.length === 0 ? '<p style="padding: 24px; color: #94a3b8; text-align: center;">Nessuna proposta contrattuale pendente sul tavolo.</p>' : ''}
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

                        <!-- Condizioni Finanziarie -->
                        <div class="offer-financials-row">
                          <div class="fin-item">
                            <span class="fin-lbl">Stipendio per Gara</span>
                            <strong class="fin-val">€${salary.toLocaleString()}</strong>
                          </div>

                          <div class="fin-item">
                            <span class="fin-lbl">Bonus per Vittoria</span>
                            <strong class="fin-val">€${(offer.winBonus || 10000).toLocaleString()}</strong>
                          </div>

                          <div class="fin-item">
                            <span class="fin-lbl">Clausola Rescissione</span>
                            <strong class="fin-val">${duration === 2 ? `€${(offer.buyoutClause2yr || 50000).toLocaleString()}` : 'Nessuna (€0)'}</strong>
                          </div>

                          <div class="fin-item">
                            <span class="fin-lbl">Ruolo Offerto</span>
                            <strong class="fin-val">${offer.role || '1st Driver'}</strong>
                          </div>
                        </div>

                        ${needsBuyout ? `
                          <div class="offer-buyout-warning ${!canAffordBuyout ? 'insufficient-funds' : ''}">
                            <span class="warning-icon">⚠️</span>
                            <span>Richiesta penale di rescissione di <strong>€${buyoutRequired.toLocaleString()}</strong> verso ${teamDisplayName}.</span>
                            ${!canAffordBuyout ? '<strong class="danger-tag">FONDI INSUFFICIENTI</strong>' : ''}
                          </div>
                        ` : ''}

                        <!-- Azione Firma -->
                        <div class="offer-actions-row">
                          <button class="accept-offer-btn ${!canSign ? 'disabled' : ''}" data-idx="${idx}" ${!canSign ? 'disabled' : ''}>
                            <span>${offer.isRenewal ? 'RINNOVA ACCORDO UFFICIALE ✍️' : (needsBuyout ? `PAGA PENALE (€${buyoutRequired.toLocaleString()}) E FIRMA ✍️` : 'SCEGLI COMPAGNO E FIRMA ✍️')}</span>
                          </button>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            ` : ''}

            <!-- TAB 2: GRIGLIA & FORMAZIONI SCUDERIE -->
            ${this.currentTab === 'grid' ? `
              <div class="dash-card offers-card">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 8px;">
                  <div>
                    <h3 class="card-title">Schieramento Ufficiale Categoria: ${categoryName}</h3>
                    <p class="section-subtext">Roster attivi delle scuderie, competitività delle vetture e movimenti di mercato aggiornati.</p>
                  </div>
                  <span style="background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 6px;">
                    ${catTeams.length} Scuderie • ${(catData.maxDriversPerTeam || 2) * catTeams.length} Sedili Ufficiali
                  </span>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; margin-top: 14px;">
                  ${catTeams.map(t => {
                    const isPlayerTeam = t.id === careerData.currentTeamId;
                    const tName = db.getTeamName(t.id, player.discipline, careerData.currentCategory) || t.name;
                    const tColor = t.color || '#e10600';
                    const devInfo = careerData.teamDevelopment?.[t.id];
                    const carRating = isPlayerTeam 
                      ? Math.round(career.getPlayerTeam()?.performance || 75) 
                      : Math.round(devInfo?.currentPace || t.carPerformance || t.bikePerformance || 75);

                    // Costruisce la lista piloti attivi rispettando le modifiche di mercato e il giocatore
                    let driversList = [];
                    if (isPlayerTeam) {
                      driversList.push({
                        id: 'player',
                        name: `${player.name} ${player.surname || ''}`,
                        ovr: player.ovr || 75,
                        isPlayer: true,
                        role: 'Tu (1° Pilota)',
                        flag: player.nationality || '🇮🇹'
                      });
                      const tm = career.getCurrentTeammate();
                      if (tm) {
                        const tmOvr = (careerData.aiDriverAttributes?.[tm.id]?.ovr) || tm.ovr || 75;
                        driversList.push({
                          id: tm.id,
                          name: db.getDriverName(tm.id, player.discipline) || tm.name,
                          ovr: tmOvr,
                          isPlayer: false,
                          role: 'Compagno di Squadra',
                          flag: tm.nationality || '🏁'
                        });
                      }
                    } else {
                      const roster = (catData.roster || []).filter(r => {
                        const effTeam = (careerData.teamDriverOverrides && careerData.teamDriverOverrides[r.id]) || r.teamId;
                        return effTeam === t.id;
                      });
                      roster.forEach((r, rIdx) => {
                        const ovr = (careerData.aiDriverAttributes?.[r.id]?.ovr) || r.ovr || 75;
                        driversList.push({
                          id: r.id,
                          name: db.getDriverName(r.id, player.discipline) || r.name,
                          ovr,
                          isPlayer: false,
                          role: rIdx === 0 ? '1° Pilota' : '2° Pilota',
                          flag: r.nationality || '🏁'
                        });
                      });
                    }

                    return `
                      <div style="
                        background: rgba(15, 23, 42, 0.6);
                        border: 1px solid ${isPlayerTeam ? 'rgba(245, 158, 11, 0.5)' : 'rgba(255, 255, 255, 0.08)'};
                        border-left: 5px solid ${tColor};
                        border-radius: 12px;
                        padding: 14px 16px;
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                        ${isPlayerTeam ? 'box-shadow: 0 0 15px rgba(245, 158, 11, 0.15);' : ''}
                      ">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                          <div style="display: flex; align-items: center; gap: 8px;">
                            <span class="team-badge-bullet" style="background:${tColor}; width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 6px ${tColor};"></span>
                            <div>
                              <strong style="font-size: 15px; color: #fff;">${tName}</strong>
                              ${isPlayerTeam ? '<span style="margin-left: 6px; font-size: 10px; background: #f59e0b; color: #000; font-weight: 800; padding: 1px 6px; border-radius: 4px;">IL TUO TEAM</span>' : ''}
                            </div>
                          </div>
                          <div style="text-align: right;">
                            <div style="font-size: 11px; color: #94a3b8;">Vettura</div>
                            <strong style="font-size: 13px; color: #38bdf8;">${carRating} / 99</strong>
                          </div>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 8px; background: rgba(0,0,0,0.25); padding: 10px; border-radius: 8px;">
                          ${driversList.length === 0 ? '<div style="font-size: 12px; color: #94a3b8;">Nessun pilota assegnato</div>' : ''}
                          ${driversList.map(d => `
                            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px;">
                              <div style="display: flex; align-items: center; gap: 6px;">
                                <span>${d.flag}</span>
                                <strong style="color: ${d.isPlayer ? '#fbbf24' : '#f8fafc'};">${d.name}</strong>
                                <small style="font-size: 10px; color: #64748b;">(${d.role})</small>
                              </div>
                              <span style="background: ${d.ovr >= 90 ? 'linear-gradient(135deg, #eab308, #ca8a04)' : (d.ovr >= 80 ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)')}; color: ${d.ovr >= 90 ? '#000' : '#fff'}; font-weight: 800; padding: 2px 7px; border-radius: 5px; font-size: 11px;">
                                ${d.ovr} OVR
                              </span>
                            </div>
                          `).join('')}
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            ` : ''}

            <!-- TAB 3: PILOTI SVINCOLATI (FREE AGENTS) -->
            ${this.currentTab === 'free_agents' ? `
              <div class="dash-card offers-card">
                <h3 class="card-title">Piloti Svincolati Disponibili (Free Agents)</h3>
                <p class="section-subtext">Piloti liberi da vincoli contrattuali pronti a subentrare nei team tramite il mercato piloti.</p>

                ${freeAgents.length === 0 ? `
                  <div style="text-align: center; padding: 40px; color: #94a3b8;">
                    <div style="font-size: 32px; margin-bottom: 8px;">🤝</div>
                    <strong>Nessun pilota attualmente svincolato</strong>
                    <p style="font-size: 13px; margin-top: 4px;">Tutti i piloti delle categorie attive hanno un sedile ufficiale assegnato.</p>
                  </div>
                ` : `
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 14px; margin-top: 14px;">
                    ${freeAgents.map(fa => {
                      const driver = db.getDriver(fa.driverId, player.discipline) || {};
                      const driverName = db.getDriverName(fa.driverId, player.discipline);
                      const origTeamName = db.getTeamName(fa.originalTeamId, player.discipline, fa.category);
                      const seriesName = db.getSeriesName(fa.category, player.discipline);

                      return `
                        <div style="
                          background: rgba(255, 255, 255, 0.03);
                          border: 1px solid rgba(255, 255, 255, 0.1);
                          border-left: 4px solid #f59e0b;
                          border-radius: 12px;
                          padding: 16px;
                          display: flex;
                          flex-direction: column;
                          gap: 10px;
                        ">
                          <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                              <strong style="font-size: 16px; color: #fff;">${driverName}</strong>
                              <div style="font-size: 11px; color: #94a3b8;">Ex ${origTeamName} • ${seriesName}</div>
                            </div>
                            <span style="background: #f59e0b; color: #000; font-weight: 900; padding: 2px 8px; border-radius: 6px; font-size: 13px;">
                              ${driver.ovr || 75} OVR
                            </span>
                          </div>

                          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 11px; background: rgba(0,0,0,0.25); padding: 8px; border-radius: 6px;">
                            <div>Velocità: <strong style="color: #38bdf8;">${driver.pace || 75}</strong></div>
                            <div>Racecraft: <strong style="color: #f59e0b;">${driver.racecraft || 75}</strong></div>
                            <div>Costanza: <strong style="color: #a855f7;">${driver.consistency || 75}</strong></div>
                            <div>Gomme: <strong style="color: #4ade80;">${driver.tyreMgmt || 75}</strong></div>
                          </div>

                          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #64748b;">
                            <span>Svincolato nel ${fa.year || 2026}</span>
                            <span style="color: #22c55e; font-weight: 700;">🟢 DISPONIBILE SUL MERCATO</span>
                          </div>
                        </div>
                      `;
                    }).join('')}
                  </div>
                `}
              </div>
            ` : ''}

            <!-- TAB 3: ULTIME NOTIZIE MERCATO AI -->
            ${this.currentTab === 'news' ? `
              <div class="dash-card offers-card">
                <h3 class="card-title">Bollettino Ufficiale: Mercato Piloti AI</h3>
                <p class="section-subtext">Tutti i movimenti, passaggi di scuderia e ingaggi registrati nel paddock.</p>

                ${transferNews.length === 0 ? `
                  <div style="text-align: center; padding: 40px; color: #94a3b8;">
                    <div style="font-size: 32px; margin-bottom: 8px;">📰</div>
                    <strong>Nessuna notizia di mercato recente</strong>
                    <p style="font-size: 13px; margin-top: 4px;">Le trattative tra i team AI si animeranno al termine del campionato!</p>
                  </div>
                ` : `
                  <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 14px;">
                    ${transferNews.map((news, nIdx) => `
                      <div style="
                        background: rgba(255, 255, 255, 0.03);
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        border-radius: 10px;
                        padding: 14px 18px;
                        font-size: 13px;
                        color: #f1f5f9;
                        display: flex;
                        align-items: center;
                        gap: 12px;
                      ">
                        <span style="font-size: 18px;">🏁</span>
                        <div style="line-height: 1.4;">${news}</div>
                      </div>
                    `).join('')}
                  </div>
                `}
              </div>
            ` : ''}
          </div>

          <div class="finish-weekend-action-bar">
            <button id="btn-return-from-market" class="start-race-button">
              <span>RITORNA ALLA DASHBOARD ➔</span>
            </button>
          </div>
        </div>
      `;

      // Gestione Tab
      container.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
          sound.playClick();
          this.currentTab = btn.dataset.tab;
          renderView();
        };
      });

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

      // Firma contratto con Teammate Selection
      container.querySelectorAll('.accept-offer-btn').forEach(btn => {
        btn.onclick = () => {
          const idx = parseInt(btn.dataset.idx, 10);
          const chosenOffer = offers[idx];
          const duration = selectedDurations[idx] || 1;
          const salary = duration === 2 ? chosenOffer.salaryPerRace2yr : chosenOffer.salaryPerRace1yr;
          const isSameTeam = chosenOffer.teamId === careerData.currentTeamId;
          const needsBuyout = !isSameTeam && isUnderContract && buyoutRequired > 0;

          const categories = player.discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
          const targetCat = categories[chosenOffer.category];
          const maxDrivers = targetCat?.maxDriversPerTeam || 2;
          let existingDrivers = (targetCat?.roster || []).filter(r => {
            const effTeam = (careerData.teamDriverOverrides && careerData.teamDriverOverrides[r.id]) || r.teamId;
            return effTeam === chosenOffer.teamId;
          });
          if (existingDrivers.length === 0 && targetCat?.roster) {
            existingDrivers = targetCat.roster.filter(r => r.teamId === chosenOffer.teamId);
          }

          const executeContractSigning = (chosenTeammateId = null, replacedDriverId = null) => {
            const res = career.acceptContract(chosenOffer, duration, false, { chosenTeammateId, replacedDriverId });
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
          };

          const openSigningFlow = () => {
            // Se si cambia team e ci sono piloti nel team di destinazione, mostra sempre la scelta del compagno
            if (!isSameTeam && existingDrivers.length > 0) {
              TeammateSelectionModal.show({
                team: { id: chosenOffer.teamId, color: chosenOffer.color },
                category: targetCat,
                existingDrivers,
                maxDriversPerTeam: maxDrivers,
                discipline: player.discipline,
                onConfirm: ({ chosenTeammateId, replacedDriverId }) => {
                  executeContractSigning(chosenTeammateId, replacedDriverId);
                }
              });
            } else {
              executeContractSigning();
            }
          };

          if (needsBuyout) {
            ToastNotification.confirm({
              title: "Rescissione e Firma Nuovo Contratto",
              message: `Confermi l'accordo di ${duration} anno/i con ${chosenOffer.teamName} (${chosenOffer.categoryName}) con stipendio di €${salary.toLocaleString()} a Gran Premio?\n\n⚠️ RESCISSIONE ANTICIPATA: Verrà addebitata la penale di rescissione di €${buyoutRequired.toLocaleString()} dal tuo saldo personale.`,
              confirmText: `Paga €${buyoutRequired.toLocaleString()} e Firma ✍️`,
              cancelText: "Valuta Ancora",
              danger: true,
              onConfirm: () => {
                openSigningFlow();
              }
            });
          } else {
            openSigningFlow();
          }
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
