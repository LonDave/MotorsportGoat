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
          <div class="dash-card net-worth-hero-card" style="
            margin-bottom: 24px;
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.7));
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-top: 3px solid #f59e0b;
            border-radius: 16px;
            padding: 20px 24px;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
              <div>
                <span style="font-size: 11px; font-weight: 800; letter-spacing: 1px; color: #f59e0b; text-transform: uppercase;">
                  Patrimonio Netto da Superstar (Net Worth)
                </span>
                <div style="display: flex; align-items: baseline; gap: 12px; margin-top: 4px;">
                  <h2 style="font-size: 32px; font-weight: 900; color: #fff; margin: 0; font-family: var(--font-display, sans-serif);">
                    €${finSummary.netWorth.toLocaleString()}
                  </h2>
                  <span style="font-size: 13px; color: #94a3b8;">
                    (Liquidità: <strong style="color: #4ade80;">€${careerData.money.toLocaleString()}</strong> • Asset: <strong style="color: #38bdf8;">€${finSummary.assetsValue.toLocaleString()}</strong>)
                  </span>
                </div>
              </div>

              <!-- RENDITA PASSIVA A GRAN PREMIO -->
              <div style="
                background: rgba(0, 0, 0, 0.35);
                border: 1px solid rgba(245, 158, 11, 0.3);
                border-radius: 12px;
                padding: 10px 18px;
                text-align: right;
              ">
                <span style="font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase;">Rendite Passive / GP</span>
                <div style="font-size: 18px; font-weight: 900; color: #f59e0b; margin-top: 2px;">
                  +€${finSummary.passiveIncomePerRace.toLocaleString()} <span style="font-size: 12px; color: #cbd5e1;">/ Gara</span>
                </div>
              </div>
            </div>

            <!-- PERK ATTIVI IN PISTA -->
            ${finSummary.activePerks.length > 0 ? `
              <div style="margin-top: 16px; pt-3; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <strong style="font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">Perk & Bonus Attivi:</strong>
                ${finSummary.activePerks.map(p => `
                  <span style="
                    background: rgba(56, 189, 248, 0.12);
                    border: 1px solid rgba(56, 189, 248, 0.3);
                    color: #38bdf8;
                    font-size: 11px;
                    font-weight: 700;
                    padding: 3px 10px;
                    border-radius: 6px;
                  ">
                    ⚡ ${p}
                  </span>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <!-- TAB SELECTOR -->
          <div class="standings-tab-bar" style="margin-bottom: 24px; display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="tab-btn ${this.currentTab === 'hq' ? 'active' : ''}" data-tab="hq">
              🏛️ Strutture HQ & Staff Personale (5)
            </button>
            <button class="tab-btn ${this.currentTab === 'assets' ? 'active' : ''}" data-tab="assets">
              🏰 Investimenti, Immobili & Business (${finSummary.ownedAssetsCount}/${LIFESTYLE_ASSETS_CONFIG.length})
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

                <div class="hq-items-list" style="display: flex; flex-direction: column; gap: 14px;">
                  ${Object.keys(HQ_CONFIG).map(key => {
                    const cfg = HQ_CONFIG[key];
                    const level = hq[key] || 0;
                    const nextCost = cfg.baseCost + (level * cfg.costMult);
                    const isMax = level >= (cfg.maxLevel || 5);
                    const canAfford = careerData.money >= nextCost;

                    return `
                      <div class="hq-item-row" style="
                        background: rgba(15, 23, 42, 0.6);
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        border-left: 4px solid #38bdf8;
                        border-radius: 12px;
                        padding: 16px 20px;
                        display: flex;
                        align-items: center;
                        gap: 16px;
                      ">
                        <div class="hq-icon-box" style="font-size: 28px; background: rgba(56, 189, 248, 0.1); border-radius: 10px; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
                          ${cfg.icon}
                        </div>

                        <div class="hq-info-box" style="flex: 1;">
                          <div style="display: flex; align-items: center; gap: 10px;">
                            <strong style="font-size: 15px; color: #fff;">${cfg.name}</strong>
                            <span style="font-size: 11px; font-weight: 800; background: ${level > 0 ? '#38bdf8' : 'rgba(255,255,255,0.1)'}; color: ${level > 0 ? '#000' : '#94a3b8'}; padding: 2px 7px; border-radius: 5px;">
                              Livello ${level}/5
                            </span>
                          </div>
                          <span style="font-size: 12px; color: #94a3b8; display: block; margin: 4px 0 8px;">
                            ${cfg.desc}
                          </span>

                          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
                            <span style="color: #38bdf8; font-weight: 700;">Beneficio Attuale: ${level > 0 ? cfg.perkText(level) : 'Inattivo (Lvl 0)'}</span>
                            ${!isMax ? `<span style="color: #cbd5e1;">Prossimo Livello: <strong>${cfg.perkText(level + 1)}</strong></span>` : ''}
                          </div>

                          <!-- Barra a 5 segmenti -->
                          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; height: 6px;">
                            ${[1, 2, 3, 4, 5].map(step => `
                              <div style="
                                height: 100%;
                                border-radius: 3px;
                                background: ${step <= level ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)'};
                                box-shadow: ${step <= level ? '0 0 8px rgba(56, 189, 248, 0.4)' : 'none'};
                              "></div>
                            `).join('')}
                          </div>
                        </div>

                        <div class="hq-action-box" style="min-width: 140px; text-align: right;">
                          ${!isMax ? `
                            <button class="buy-hq-btn modal-btn btn-primary ${!canAfford ? 'disabled' : ''}" data-type="${key}" ${!canAfford ? 'disabled' : ''} style="width: 100%; padding: 10px 14px;">
                              <div style="font-weight: 800; font-size: 12px;">POTENZIA ➔</div>
                              <div style="font-size: 11px; opacity: 0.9;">€${nextCost.toLocaleString()}</div>
                            </button>
                          ` : `
                            <span style="display: inline-block; background: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.3); color: #4ade80; font-weight: 900; font-size: 12px; padding: 6px 14px; border-radius: 8px;">
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

                <div class="luxury-items-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
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
                      <div class="luxury-item-card ${alreadyOwned ? 'owned' : ''}" style="
                        background: rgba(15, 23, 42, 0.65);
                        border: 1px solid ${alreadyOwned ? 'rgba(34, 197, 94, 0.4)' : 'rgba(255, 255, 255, 0.08)'};
                        border-top: 4px solid ${alreadyOwned ? '#22c55e' : '#f59e0b'};
                        border-radius: 14px;
                        padding: 18px;
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                      ">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                          <div style="display: flex; align-items: center; gap: 12px;">
                            <span style="font-size: 32px;">${item.icon}</span>
                            <div>
                              <strong style="font-size: 15px; color: #fff;">${resolvedName}</strong>
                              <div style="font-size: 11px; color: #f59e0b; font-weight: 700; margin-top: 2px;">
                                ${item.perkBadge}
                              </div>
                            </div>
                          </div>
                        </div>

                        <p style="font-size: 12px; color: #94a3b8; line-height: 1.5; margin: 0; flex: 1;">
                          ${item.desc}
                        </p>

                        <div style="display: flex; justify-content: space-between; align-items: center; pt-2; border-top: 1px solid rgba(255, 255, 255, 0.06);">
                          <div>
                            <div style="font-size: 10px; color: #64748b; text-transform: uppercase;">Valore Asset</div>
                            <strong style="font-size: 15px; color: #4ade80;">€${item.price.toLocaleString()}</strong>
                          </div>

                          <div>
                            ${alreadyOwned ? `
                              <span style="background: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.3); color: #4ade80; font-weight: 800; font-size: 11px; padding: 6px 12px; border-radius: 6px;">
                                POSSEDUTO ✅
                              </span>
                            ` : `
                              <button class="buy-luxury-btn modal-btn btn-primary ${!canAfford ? 'disabled' : ''}" data-item-id="${item.id}" ${!canAfford ? 'disabled' : ''} style="padding: 8px 16px; font-size: 12px; font-weight: 800;">
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

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;">
                  ${TRAINING_CAMPS_CONFIG.map(camp => {
                    const canAfford = careerData.money >= camp.cost;

                    return `
                      <div style="
                        background: rgba(15, 23, 42, 0.65);
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        border-left: 4px solid #a855f7;
                        border-radius: 12px;
                        padding: 16px;
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                      ">
                        <div style="display: flex; align-items: center; gap: 12px;">
                          <span style="font-size: 28px;">${camp.icon}</span>
                          <div>
                            <strong style="font-size: 15px; color: #fff;">${camp.name}</strong>
                            <div style="font-size: 12px; color: #c084fc; font-weight: 700;">
                              Effetto: ${camp.effect}
                            </div>
                          </div>
                        </div>

                        <p style="font-size: 12px; color: #94a3b8; line-height: 1.4; margin: 0; flex: 1;">
                          ${camp.desc}
                        </p>

                        <div style="display: flex; justify-content: space-between; align-items: center; pt-2; border-top: 1px solid rgba(255, 255, 255, 0.06);">
                          <div>
                            <div style="font-size: 10px; color: #64748b; text-transform: uppercase;">Costo Stage</div>
                            <strong style="font-size: 14px; color: #fbbf24;">€${camp.cost.toLocaleString()}</strong>
                          </div>

                          <button class="execute-camp-btn modal-btn btn-primary ${!canAfford ? 'disabled' : ''}" data-camp-id="${camp.id}" ${!canAfford ? 'disabled' : ''} style="padding: 8px 14px; font-size: 12px; font-weight: 800;">
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
