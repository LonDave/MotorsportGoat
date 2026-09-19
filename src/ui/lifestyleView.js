import { career, HQ_CONFIG, LIFESTYLE_ASSETS_CONFIG, TRAINING_CAMPS_CONFIG } from '../engine/careerEngine.js';
import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';
import { ToastNotification } from './toastNotification.js';

export class LifestyleView {
  static currentTab = 'hq'; // 'hq' | 'assets' | 'camps'

  static render(container, onNavigate) {
    const player = career.player;
    const careerData = career.career;
    if (!player || !careerData) return;

    if (!careerData.hqUpgrades) {
      careerData.hqUpgrades = { simulatorLevel: 0, gymLevel: 0, prAgencyLevel: 0, telemetryCoachLevel: 0, biohackingLevel: 0 };
    }
    const hq = careerData.hqUpgrades;
    const finSummary = career.getLifestyleFinancialSummary();

    const renderView = () => {
      container.innerHTML = `
        <div class="lifestyle-view-wrapper">
          <div class="weekend-top-header">
            <span class="session-badge">PATRIMONIO, PREPARAZIONE & LIFESTYLE</span>
            <h2>Headquarters, Investimenti & Vita da Pilota</h2>
            <p class="header-sub">Investi i tuoi compensi in strutture di preparazione d'élite, attività imprenditoriali e beni di lusso con rendite e perk reali in pista.</p>
          </div>

          <!-- CRUSCOTTO FINANZIARIO & NET WORTH -->
          <div class="dash-card net-worth-hero-card">
            <div class="net-worth-main-flex">
              <div class="net-worth-title-block">
                <span class="net-worth-subtag">
                  Patrimonio Netto da Superstar (Net Worth)
                </span>
                <div class="net-worth-val-row">
                  <h2 class="net-worth-amount">
                    €${finSummary.netWorth.toLocaleString()}
                  </h2>
                  <span class="net-worth-breakdown">
                    (Liquidità: <strong style="color: #4ade80;">€${careerData.money.toLocaleString()}</strong> • Asset: <strong style="color: #38bdf8;">€${finSummary.assetsValue.toLocaleString()}</strong>)
                  </span>
                </div>
              </div>

              <!-- RENDITA PASSIVA A GRAN PREMIO -->
              <div class="net-worth-passive-badge">
                <span class="passive-lbl">Rendite Passive / GP</span>
                <div class="passive-val">
                  +€${finSummary.passiveIncomePerRace.toLocaleString()} <span class="passive-unit">/ Gara</span>
                </div>
              </div>
            </div>

            <!-- PERK ATTIVI IN PISTA -->
            ${finSummary.activePerks.length > 0 ? `
              <div class="active-perks-row">
                <strong class="perks-lbl">Perk & Bonus Attivi:</strong>
                ${finSummary.activePerks.map(p => `
                  <span class="perk-chip">
                    ⚡ ${p}
                  </span>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <!-- TAB SELECTOR -->
          <div class="standings-tab-bar lifestyle-tabs-bar">
            <button class="tab-btn ${this.currentTab === 'hq' ? 'active' : ''}" data-tab="hq">
              🏛️ Strutture HQ & Staff Personale (5)
            </button>
            <button class="tab-btn ${this.currentTab === 'assets' ? 'active' : ''}" data-tab="assets">
              🏰 Investimenti & Immobili (${finSummary.ownedAssetsCount}/${LIFESTYLE_ASSETS_CONFIG.length})
            </button>
            <button class="tab-btn ${this.currentTab === 'camps' ? 'active' : ''}" data-tab="camps">
              ⏱️ Stage & Ritiri Intensivi (${TRAINING_CAMPS_CONFIG.length})
            </button>
          </div>

          <!-- CONTENUTO DELLE TAB -->
          <div class="lifestyle-tab-content">
            <!-- TAB 1: STRUTTURE HQ -->
            ${this.currentTab === 'hq' ? `
              <div class="dash-card hq-upgrades-card">
                <div style="margin-bottom: 16px;">
                  <h3 class="card-title">Strutture di Allenamento & Dipartimenti HQ</h3>
                  <p class="section-subtext">Le infrastrutture personali garantiscono Punti Telemetria (PT) continui per l'R&D, sponsor personali e immunità ai cali prestazionali in gara.</p>
                </div>

                <div class="hq-items-list">
                  ${Object.keys(HQ_CONFIG).map(key => {
                    const cfg = HQ_CONFIG[key];
                    const level = hq[key] || 0;
                    const nextCost = cfg.baseCost + (level * cfg.costMult);
                    const isMax = level >= (cfg.maxLevel || 5);
                    const canAfford = careerData.money >= nextCost;

                    return `
                      <div class="hq-item-row ${isMax ? 'is-maxed' : ''}">
                        <div class="hq-icon-box">
                          ${cfg.icon}
                        </div>

                        <div class="hq-info-box">
                          <div class="hq-title-line">
                            <strong class="hq-name">${cfg.name}</strong>
                            <span class="hq-lvl-tag ${level > 0 ? 'active' : ''}">
                              Livello ${level}/5
                            </span>
                          </div>
                          <span class="hq-desc">
                            ${cfg.desc}
                          </span>

                          <div class="hq-perk-summary">
                            <span class="current-perk">Beneficio: ${level > 0 ? cfg.perkText(level) : 'Inattivo (Lvl 0)'}</span>
                            ${!isMax ? `<span class="next-perk">Prossimo: <strong>${cfg.perkText(level + 1)}</strong></span>` : ''}
                          </div>

                          <!-- Barra a 5 segmenti -->
                          <div class="hq-meter-bar">
                            ${[1, 2, 3, 4, 5].map(step => `
                              <div class="hq-meter-unit ${step <= level ? 'active' : ''}"></div>
                            `).join('')}
                          </div>
                        </div>

                        <div class="hq-action-box">
                          ${!isMax ? `
                            <button class="buy-hq-btn modal-btn btn-primary ${!canAfford ? 'disabled' : ''}" data-type="${key}" ${!canAfford ? 'disabled' : ''}>
                              <div class="btn-lbl-main">POTENZIA ➔</div>
                              <div class="btn-lbl-cost">€${nextCost.toLocaleString()}</div>
                            </button>
                          ` : `
                            <span class="hq-max-badge">
                              LIVELLO MAX ⭐
                            </span>
                          `}
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            ` : ''}

            <!-- TAB 2: INVESTIMENTI & ASSET DI LUSSO -->
            ${this.currentTab === 'assets' ? `
              <div class="dash-card luxury-purchases-card">
                <div style="margin-bottom: 16px;">
                  <h3 class="card-title">Portafoglio Immobili & Business Personali</h3>
                  <p class="section-subtext">Ogni bene produce vantaggi fiscali, rendite monetarie passive costanti a ogni GP, immunità ai viaggi intercontinentali o boost per il punteggio GOAT.</p>
                </div>

                <div class="luxury-items-grid">
                  ${LIFESTYLE_ASSETS_CONFIG.map(item => {
                    const isAuto = player.discipline === 'auto';
                    let resolvedName = item.name;
                    if (item.id === 'supercar') {
                      resolvedName = isAuto 
                        ? (db.isRealNames ? item.nameAuto : item.nameAutoFictional)
                        : (db.isRealNames ? item.nameMoto : item.nameMotoFictional);
                    }

                    const alreadyOwned = careerData.lifestyleItems?.some(i => i.id === item.id);
                    const canAfford = careerData.money >= item.price;

                    return `
                      <div class="luxury-item-card ${alreadyOwned ? 'owned' : ''}">
                        <div class="luxury-header">
                          <div class="luxury-icon-title">
                            <span class="luxury-icon">${item.icon}</span>
                            <div>
                              <strong class="luxury-title">${resolvedName}</strong>
                              <div class="luxury-perk-badge">
                                ${item.perkBadge}
                              </div>
                            </div>
                          </div>
                        </div>

                        <p class="luxury-desc">
                          ${item.desc}
                        </p>

                        <div class="luxury-footer">
                          <div class="luxury-price-box">
                            <div class="luxury-price-lbl">Valore Asset</div>
                            <strong class="luxury-price-val">€${item.price.toLocaleString()}</strong>
                          </div>

                          <div class="luxury-action-col">
                            ${alreadyOwned ? `
                              <span class="luxury-owned-tag">
                                POSSEDUTO ✅
                              </span>
                            ` : `
                              <button class="buy-luxury-btn modal-btn btn-primary ${!canAfford ? 'disabled' : ''}" data-item-id="${item.id}" ${!canAfford ? 'disabled' : ''}>
                                ACQUISTA ASSET ✍️
                              </button>
                            `}
                          </div>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            ` : ''}

            <!-- TAB 3: STAGE & RITIRI INTENSIVI -->
            ${this.currentTab === 'camps' ? `
              <div class="dash-card camps-card">
                <div style="margin-bottom: 16px;">
                  <h3 class="card-title">Programmi di Preparazione Intensiva (Camp tra i GP)</h3>
                  <p class="section-subtext">Pianifica stage atletici, sessioni prolungate al simulatore o ritiri specialistici prima del prossimo weekend di gara.</p>
                </div>

                <div class="camps-grid">
                  ${TRAINING_CAMPS_CONFIG.map(camp => {
                    const canAfford = careerData.money >= camp.cost;

                    return `
                      <div class="camp-item-card">
                        <div class="camp-header">
                          <span class="camp-icon">${camp.icon}</span>
                          <div class="camp-info">
                            <strong class="camp-title">${camp.name}</strong>
                            <div class="camp-effect">
                              Effetto: ${camp.effect}
                            </div>
                          </div>
                        </div>

                        <p class="camp-desc">
                          ${camp.desc}
                        </p>

                        <div class="camp-footer">
                          <div class="camp-cost-box">
                            <div class="camp-cost-lbl">Costo Stage</div>
                            <strong class="camp-cost-val">€${camp.cost.toLocaleString()}</strong>
                          </div>

                          <button class="execute-camp-btn modal-btn btn-primary ${!canAfford ? 'disabled' : ''}" data-camp-id="${camp.id}" ${!canAfford ? 'disabled' : ''}>
                            PRENOTA STAGE ➔
                          </button>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            ` : ''}
          </div>

          <div class="finish-weekend-action-bar">
            <button id="btn-return-from-lifestyle" class="start-race-button">
              <span>RITORNA ALLA DASHBOARD ➔</span>
            </button>
          </div>
        </div>
      `;

      // Event listeners per cambio tab
      container.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
          sound.playClick();
          this.currentTab = btn.dataset.tab;
          renderView();
        };
      });

      // Event listeners acquisto HQ
      container.querySelectorAll('.buy-hq-btn').forEach(btn => {
        btn.onclick = () => {
          const type = btn.dataset.type;
          const res = career.buyHqUpgrade(type);
          if (res.success) {
            sound.playClick();
            ToastNotification.show(`🏛️ ${res.message}`, "success");
            renderView();
          } else {
            ToastNotification.show(`⚠️ ${res.message}`, "warning");
          }
        };
      });

      // Event listeners acquisto Asset Lifestyle
      container.querySelectorAll('.buy-luxury-btn').forEach(btn => {
        btn.onclick = () => {
          const itemId = btn.dataset.itemId;
          const item = LIFESTYLE_ASSETS_CONFIG.find(i => i.id === itemId);
          if (!item) return;

          const res = career.buyLifestyleItem(item);
          if (res.success) {
            sound.playChequeredFlag();
            ToastNotification.show(`🎉 ${res.message}`, "success");
            renderView();
          } else {
            ToastNotification.show(`⚠️ ${res.message}`, "warning");
          }
        };
      });

      // Event listeners esecuzione Stage
      container.querySelectorAll('.execute-camp-btn').forEach(btn => {
        btn.onclick = () => {
          const campId = btn.dataset.campId;
          const res = career.executeTrainingCamp(campId);
          if (res.success) {
            sound.playClick();
            ToastNotification.show(`⚡ ${res.message}`, "success");
            renderView();
          } else {
            ToastNotification.show(`⚠️ ${res.message}`, "warning");
          }
        };
      });

      const returnBtn = container.querySelector('#btn-return-from-lifestyle');
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
