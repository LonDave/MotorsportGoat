import { career, RD_SUBCOMPONENTS_CONFIG } from '../engine/careerEngine.js';
import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';
import { ToastNotification } from './toastNotification.js';

export class RdFacilityView {
  static currentTab = 'all'; // 'all' | 'aero' | 'engine' | 'chassis' | 'reliability'

  static render(container, onNavigate) {
    career.initRdSystem();
    const player = career.player;
    const careerData = career.career;
    const team = career.getPlayerTeam();
    const catData = career.getCurrentCategoryData();
    const vehicleType = player.discipline === 'auto' ? 'Monoposto' : 'Prototipo';

    const reg = careerData.regulations || { currentCycle: 1, nextRegulationChangeYear: 2029, isRegulationYearAnnounced: false, playerNextGenInvestment: 0 };
    const yearsUntilRegChange = Math.max(0, (reg.nextRegulationChangeYear || 2029) - careerData.currentYear);

    // Calcolo gerarchia tecnica sulla griglia
    const allTeams = catData.teams.map(t => {
      const isPlayerTeam = t.id === careerData.currentTeamId;
      const resolved = db.getTeam(t.id, player.discipline);
      const pace = isPlayerTeam 
        ? (player.discipline === 'auto' ? team.carPace : team.bikePace)
        : (player.discipline === 'auto' ? resolved.carPace : resolved.bikePace);
      return { ...resolved, pace, isPlayerTeam };
    }).sort((a, b) => b.pace - a.pace);

    const playerTeamRank = allTeams.findIndex(t => t.isPlayerTeam) + 1;
    const currentPace = player.discipline === 'auto' ? team.carPace : team.bikePace;
    const currentReliability = team.reliability || 85;

    // Dati Compagno di Squadra e Collaborazione Tecnica
    const teammate = career.getCurrentTeammate();
    const tmFeedback = teammate?.technicalFeedback || teammate?.attributes?.technicalFeedback || 65;
    const tmMarketability = teammate?.marketability || teammate?.attributes?.marketability || 60;
    const tmName = teammate?.name || db.getDriverName(teammate?.id, player.discipline) || "Compagno di Squadra";
    const collabStats = careerData.teammateCollaborationStats || {
      totalMoneyContributed: 0,
      totalTelemetryContributed: 0,
      upgradesDelivered: 0,
      lastBreakthrough: null
    };

    const telemetryPoints = careerData.rdTelemetryPoints || 0;
    const subComponents = careerData.rdSubComponents || {};

    const renderPage = () => {
      // Filtra componenti in base al tab
      const allCompKeys = Object.keys(RD_SUBCOMPONENTS_CONFIG);
      const filteredKeys = this.currentTab === 'all'
        ? allCompKeys
        : allCompKeys.filter(k => RD_SUBCOMPONENTS_CONFIG[k].dept === this.currentTab);

      container.innerHTML = `
        <div class="page-container rd-facility-page">
          <!-- HEADER REPARTO CORSE -->
          <div class="page-title-banner">
            <div class="banner-text">
              <span class="page-subtag">CENTRO INGEGNERIA & SVILUPPO • ${(team?.displayName || team?.realName || team?.name || 'SCUDERIA').toUpperCase()}</span>
              <h2 class="page-main-title">⚙️ REPARTO CORSE & SVILUPPO R&D</h2>
              <p class="page-desc">Progetta e installa pacchetti evolutivi sui sottocomponenti chiave della ${vehicleType.toLowerCase()}. Combina budget economico e telemetria generata in pista con il tuo compagno.</p>
            </div>

            <div class="rd-quick-stats">
              <div class="rd-stat-pill">
                <span class="pill-lbl">Passo Mezzo</span>
                <strong class="pill-val">${currentPace} <small>/99</small></strong>
              </div>
              <div class="rd-stat-pill">
                <span class="pill-lbl">Affidabilità</span>
                <strong class="pill-val" style="color: #10b981;">${currentReliability}%</strong>
              </div>
              <div class="rd-stat-pill">
                <span class="pill-lbl">Gerarchia Griglia</span>
                <strong class="pill-val">${playerTeamRank}° <small>su ${allTeams.length}</small></strong>
              </div>
              <div class="rd-stat-pill highlight-telemetry">
                <span class="pill-lbl">Dati Telemetrici</span>
                <strong class="pill-val" style="color: #38bdf8;">${telemetryPoints} <small>PT</small></strong>
              </div>
              <div class="rd-stat-pill">
                <span class="pill-lbl">Fondi Disponibili</span>
                <strong class="pill-val money">€${careerData.money.toLocaleString()}</strong>
              </div>
            </div>
          </div>

          <!-- SCHEDA SPECIALE: COLLABORAZIONE ATTIVA DEL COMPAGNO DI SQUADRA -->
          <div class="teammate-collaboration-banner" style="
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%);
            border: 1px solid rgba(16, 185, 129, 0.35);
            border-left: 5px solid #10b981;
            border-radius: 14px;
            padding: 20px 24px;
            margin-bottom: 24px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
              <div style="display: flex; align-items: center; gap: 16px;">
                <div style="
                  width: 52px; height: 52px; border-radius: 50%;
                  background: rgba(16, 185, 129, 0.2);
                  border: 2px solid #10b981;
                  display: flex; align-items: center; justify-content: center;
                  font-size: 24px;
                ">🤝</div>
                <div>
                  <span style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: #10b981; text-transform: uppercase;">
                    COLLABORAZIONE COMPAGNO DI SQUADRA • LINEUP UFFICIALE
                  </span>
                  <h3 style="font-size: 18px; font-weight: 800; margin: 2px 0 4px 0; color: #fff;">
                    ${tmName} <small style="font-size: 12px; color: #94a3b8; font-weight: 600;">(${teammate.ovr || 75} OVR)</small>
                  </h3>
                  <div style="font-size: 12px; color: #cbd5e1; display: flex; gap: 16px; flex-wrap: wrap;">
                    <span>Sensibilità Telemetrica: <strong style="color: #38bdf8;">${tmFeedback}/99</strong></span>
                    <span>Notorietà Sponsor: <strong style="color: #f59e0b;">${tmMarketability}/99</strong></span>
                  </div>
                </div>
              </div>

              <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
                <div style="background: rgba(0,0,0,0.3); padding: 8px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
                  <span style="font-size: 10px; color: #94a3b8; text-transform: uppercase; display: block;">Budget Sponsor Portato</span>
                  <strong style="font-size: 15px; color: #22c55e;">+€${(collabStats.totalMoneyContributed || 0).toLocaleString()}</strong>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 8px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
                  <span style="font-size: 10px; color: #94a3b8; text-transform: uppercase; display: block;">Telemetria Fornita</span>
                  <strong style="font-size: 15px; color: #38bdf8;">+${collabStats.totalTelemetryContributed || 0} PT</strong>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 8px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
                  <span style="font-size: 10px; color: #94a3b8; text-transform: uppercase; display: block;">Collaudi Riusciti</span>
                  <strong style="font-size: 15px; color: #f59e0b;">${collabStats.upgradesDelivered || 0} Innovazioni</strong>
                </div>
              </div>
            </div>
            ${collabStats.lastBreakthrough ? `
              <div style="margin-top: 12px; padding-top: 10px; border-top: 1px dashed rgba(16, 185, 129, 0.25); font-size: 12px; color: #a7f3d0;">
                ⭐ <em>Ultimo collaudo al simulatore: ${collabStats.lastBreakthrough.message}</em>
              </div>
            ` : ''}
          </div>

          <!-- SEZIONE NUOVO REGOLAMENTO TECNICO (SE ANNUNCIATO) -->
          ${reg.isRegulationYearAnnounced ? `
            <div class="regulation-alert-card" style="
              background: linear-gradient(135deg, rgba(255, 71, 87, 0.15) 0%, rgba(20, 24, 40, 0.95) 100%);
              border: 1px solid rgba(255, 71, 87, 0.4);
              border-left: 5px solid #ff4757;
              border-radius: 12px;
              padding: 20px 24px;
              margin-bottom: 24px;
              box-shadow: 0 8px 30px rgba(255, 71, 87, 0.15);
            ">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                <div style="max-width: 650px;">
                  <span style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: #ff4757; text-transform: uppercase;">
                    🚨 RIVOLUZIONE REGOLAMENTARE FIA IN ARRIVO (${reg.nextRegulationChangeYear})
                  </span>
                  <h3 style="font-size: 18px; font-weight: 800; margin: 4px 0 6px 0; color: #fff;">
                    Progetto Vettura Nuovo Regolamento Tecnico
                  </h3>
                  <p style="font-size: 13px; color: #cbd5e1; margin: 0; line-height: 1.5;">
                    Alla fine di questa stagione scatterà il cambio regolamentare FIA: le monoposto perderanno circa 6 punti di passo.
                    Investi fondi per progettare in anticipo la nuova vettura e conservare un vantaggio competitivo al debutto!
                  </p>
                </div>

                <div style="display: flex; align-items: center; gap: 16px;">
                  <div style="text-align: right;">
                    <span style="font-size: 11px; color: #94a3b8; display: block;">PREPARAZIONE PROGETTO:</span>
                    <strong style="font-size: 16px; color: #00f0ff;">Livello ${reg.playerNextGenInvestment || 0} / 5</strong>
                    <small style="display: block; color: #10b981; font-size: 11px;">+${(((reg.playerNextGenInvestment || 0)) * 1.5).toFixed(1)} Passo Garantito</small>
                  </div>

                  ${(reg.playerNextGenInvestment || 0) < 5 ? `
                    <button id="btn-buy-next-gen-reg" class="modal-btn btn-gold pulse-glow" style="padding: 10px 18px; font-size: 13px; font-weight: 800;">
                      <span>Investi €${(40000 * ((reg.playerNextGenInvestment || 0) + 1)).toLocaleString()} ➔</span>
                    </button>
                  ` : `
                    <button class="modal-btn" disabled style="background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; color: #10b981; padding: 10px 18px; font-size: 13px;">
                      <span>✓ Progetto al 100%</span>
                    </button>
                  `}
                </div>
              </div>
            </div>
          ` : ''}

          <!-- TAB SELETTORE DIPARTIMENTI R&D -->
          <div class="standings-tab-bar" style="margin-bottom: 20px; display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="tab-btn ${this.currentTab === 'all' ? 'active' : ''}" data-tab="all">
              🔬 Tutti i Reparti (${allCompKeys.length})
            </button>
            <button class="tab-btn ${this.currentTab === 'aero' ? 'active' : ''}" data-tab="aero">
              🌬️ Aerodinamica
            </button>
            <button class="tab-btn ${this.currentTab === 'engine' ? 'active' : ''}" data-tab="engine">
              🔥 Power Unit & Motore
            </button>
            <button class="tab-btn ${this.currentTab === 'chassis' ? 'active' : ''}" data-tab="chassis">
              ⚙️ Telaio & Dinamica
            </button>
            <button class="tab-btn ${this.currentTab === 'reliability' ? 'active' : ''}" data-tab="reliability">
              🛡️ Affidabilità & Qualità
            </button>
          </div>

          <!-- GRIGLIA PRINCIPALE R&D SOTTOCOMPONENTI + GERARCHIA GRIGLIA -->
          <div class="rd-grid-container" style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; align-items: start;">
            <!-- ELENCO SOTTOCOMPONENTI TECNICI -->
            <div class="rd-subcomponents-list" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
              ${filteredKeys.map(k => this.renderSubComponentCard(k, subComponents[k] || 0, careerData.money, telemetryPoints)).join('')}
            </div>

            <!-- COMPARAZIONE GERARCHIA TECNICA MEZZI GRIGLIA -->
            <div class="grid-hierarchy-card" style="
              background: var(--bg-surface, #131726);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 14px;
              padding: 20px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            ">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h3 style="font-size: 16px; font-weight: 800; margin: 0; color: #fff;">Gerarchia Tecnica Campionato</h3>
                <span style="font-size: 11px; color: #94a3b8;">${careerData.currentYear}</span>
              </div>
              <p style="font-size: 12px; color: #94a3b8; margin: 0 0 16px 0; line-height: 1.4;">
                Confronto delle prestazioni attuali dei mezzi in griglia, aggiornato in tempo reale con gli sviluppi portati da tutte le scuderie:
              </p>
              
              <div class="hierarchy-list" style="display: flex; flex-direction: column; gap: 8px; max-height: 520px; overflow-y: auto; padding-right: 4px;">
                ${allTeams.map((t, idx) => `
                  <div style="
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 8px 12px; border-radius: 8px;
                    background: ${t.isPlayerTeam ? 'linear-gradient(90deg, rgba(225, 6, 0, 0.2) 0%, rgba(225, 6, 0, 0.05) 100%)' : 'rgba(255, 255, 255, 0.02)'};
                    border: 1px solid ${t.isPlayerTeam ? '#e10600' : 'rgba(255, 255, 255, 0.06)'};
                  ">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="font-size: 12px; font-weight: 800; color: #94a3b8; width: 18px;">${idx + 1}</span>
                      <span style="width: 8px; height: 8px; border-radius: 50%; background: ${t.color || '#888'};"></span>
                      <strong style="font-size: 13px; color: #fff;">${t.displayName || t.realName || t.name || 'Scuderia'}</strong>
                      ${t.isPlayerTeam ? '<span style="font-size: 9px; font-weight: 900; background: #e10600; color: #fff; padding: 2px 6px; border-radius: 4px;">TU</span>' : ''}
                    </div>
                    <span style="font-size: 13px; font-weight: 800; font-family: monospace; color: #00f0ff;">${t.pace}/99</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;

      this.bindEvents(container, onNavigate, renderPage);
    };

    renderPage();
  }

  static renderSubComponentCard(compKey, level, playerMoney, playerTelemetry) {
    const cfg = RD_SUBCOMPONENTS_CONFIG[compKey];
    if (!cfg) return '';

    const maxLevel = cfg.maxLevel || 5;
    const isMax = level >= maxLevel;
    const cost = cfg.baseCost + (level * cfg.costMult);
    const ptsCost = cfg.basePoints + (level * cfg.pointsMult);

    const hasMoney = playerMoney >= cost;
    const hasPoints = playerTelemetry >= ptsCost;
    const canAfford = hasMoney && hasPoints;

    return `
      <div class="rd-subcomp-card" data-comp="${compKey}" style="
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(15, 23, 42, 0.85) 100%);
        border: 1px solid ${isMax ? 'rgba(34, 197, 94, 0.35)' : 'rgba(255, 255, 255, 0.08)'};
        border-radius: 12px;
        padding: 16px 18px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 12px;
        transition: transform 0.2s, border-color 0.2s;
        box-shadow: 0 4px 16px rgba(0,0,0,0.3);
      ">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 22px;">${cfg.icon}</span>
              <div>
                <span style="font-size: 10px; font-weight: 800; letter-spacing: 0.8px; color: #94a3b8; text-transform: uppercase;">
                  ${cfg.deptName}
                </span>
                <h4 style="font-size: 15px; font-weight: 800; margin: 0; color: #fff;">${cfg.name}</h4>
              </div>
            </div>
            <span style="
              font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 6px;
              background: ${isMax ? 'rgba(34, 197, 94, 0.2)' : 'rgba(0, 240, 255, 0.12)'};
              color: ${isMax ? '#4ade80' : '#38bdf8'};
              border: 1px solid ${isMax ? '#22c55e' : 'rgba(0, 240, 255, 0.3)'};
            ">
              ${isMax ? 'MASSIMO' : `Lvl ${level} / ${maxLevel}`}
            </span>
          </div>

          <p style="font-size: 12px; color: #94a3b8; margin: 0 0 8px 0; line-height: 1.4;">${cfg.desc}</p>

          <div style="
            background: rgba(0,0,0,0.25);
            border-radius: 6px;
            padding: 6px 10px;
            font-size: 11px;
            font-weight: 700;
            color: #10b981;
            margin-bottom: 12px;
            display: inline-block;
          ">
            ⚡ ${cfg.spec}
          </div>

          <!-- BARRA LIVELLO SEGMENTATA -->
          <div style="display: flex; gap: 4px; margin-bottom: 12px;">
            ${[1, 2, 3, 4, 5].map(step => `
              <div style="
                flex: 1; height: 6px; border-radius: 3px;
                background: ${step <= level ? '#22c55e' : 'rgba(255, 255, 255, 0.1)'};
              "></div>
            `).join('')}
          </div>
        </div>

        <div style="border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 12px;">
          ${!isMax ? `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 12px;">
              <div>
                <span style="color: #94a3b8; font-size: 10px; display: block;">COSTO UPGRADE:</span>
                <strong style="color: ${hasMoney ? '#fff' : '#f87171'};">€${cost.toLocaleString()}</strong>
              </div>
              <div style="text-align: right;">
                <span style="color: #94a3b8; font-size: 10px; display: block;">TELEMETRIA RICHIESTA:</span>
                <strong style="color: ${hasPoints ? '#38bdf8' : '#f87171'};">${ptsCost} PT</strong>
              </div>
            </div>

            <button class="btn-upgrade-subcomponent ${canAfford ? '' : 'btn-disabled'}" data-comp="${compKey}" style="
              width: 100%; padding: 10px; border-radius: 8px; font-size: 12px; font-weight: 800;
              cursor: ${canAfford ? 'pointer' : 'not-allowed'};
              background: ${canAfford ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' : 'rgba(255, 255, 255, 0.05)'};
              color: ${canAfford ? '#ffffff' : '#64748b'};
              border: 1px solid ${canAfford ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)'};
              transition: all 0.2s;
            ">
              <span>${canAfford ? 'Installa Pacchetto Evolutivo ➔' : (!hasMoney ? 'Budget Insufficiente' : 'Telemetria Insufficiente')}</span>
            </button>
          ` : `
            <div style="text-align: center; padding: 6px; font-size: 12px; font-weight: 700; color: #4ade80;">
              ✓ Massima Efficienza Raggiunta
            </div>
          `}
        </div>
      </div>
    `;
  }

  static bindEvents(container, onNavigate, renderPage) {
    // Gestione Tab Reparti
    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playClick();
        this.currentTab = btn.dataset.tab;
        renderPage();
      };
    });

    // Acquisto Sottocomponente
    container.querySelectorAll('.btn-upgrade-subcomponent:not(.btn-disabled)').forEach(btn => {
      btn.onclick = () => {
        const compKey = btn.dataset.comp;
        const res = career.buySubComponentUpgrade(compKey);
        if (res.success) {
          sound.playRadioBeep();
          ToastNotification.show(`⚙️ ${res.message}`, "success");
          window.dispatchEvent(new CustomEvent('career-data-updated'));
          renderPage();
        } else {
          ToastNotification.show(`⚠️ ${res.message}`, "warning");
        }
      };
    });

    // Investimento Nuovo Regolamento
    const nextGenBtn = container.querySelector('#btn-buy-next-gen-reg');
    if (nextGenBtn) {
      nextGenBtn.onclick = () => {
        const res = career.buyNextGenRegulationUpgrade();
        if (res.success) {
          sound.playChequeredFlag();
          ToastNotification.show(res.message, "success");
          window.dispatchEvent(new CustomEvent('career-data-updated'));
          renderPage();
        } else {
          ToastNotification.show(`⚠️ ${res.message}`, "warning");
        }
      };
    }
  }
}
