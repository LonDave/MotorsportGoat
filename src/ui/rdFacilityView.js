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
          <div class="teammate-collaboration-banner">
            <div class="collab-header-flex">
              <div class="collab-left-info">
                <div class="collab-avatar-badge">🤝</div>
                <div class="collab-text-block">
                  <span class="collab-subtag">
                    COLLABORAZIONE COMPAGNO DI SQUADRA • LINEUP UFFICIALE
                  </span>
                  <h3 class="collab-name">
                    ${tmName} <small class="collab-ovr">(${teammate.ovr || 75} OVR)</small>
                  </h3>
                  <div class="collab-meta-row">
                    <span>Sensibilità Telemetrica: <strong style="color: #38bdf8;">${tmFeedback}/99</strong></span>
                    <span>Notorietà Sponsor: <strong style="color: #f59e0b;">${tmMarketability}/99</strong></span>
                  </div>
                </div>
              </div>

              <div class="collab-stats-grid">
                <div class="collab-stat-card">
                  <span class="collab-stat-label">Budget Sponsor Portato</span>
                  <strong class="collab-stat-val money">+€${(collabStats.totalMoneyContributed || 0).toLocaleString()}</strong>
                </div>
                <div class="collab-stat-card">
                  <span class="collab-stat-label">Telemetria Fornita</span>
                  <strong class="collab-stat-val telemetry">+${collabStats.totalTelemetryContributed || 0} PT</strong>
                </div>
                <div class="collab-stat-card">
                  <span class="collab-stat-label">Collaudi Riusciti</span>
                  <strong class="collab-stat-val upgrades">${collabStats.upgradesDelivered || 0} Innovazioni</strong>
                </div>
              </div>
            </div>
            ${collabStats.lastBreakthrough ? `
              <div class="collab-breakthrough-note">
                ⭐ <em>Ultimo collaudo al simulatore: ${collabStats.lastBreakthrough.message}</em>
              </div>
            ` : ''}
          </div>

          <!-- SEZIONE NUOVO REGOLAMENTO TECNICO (SE ANNUNCIATO) -->
          ${reg.isRegulationYearAnnounced ? `
            <div class="regulation-alert-card">
              <div class="reg-alert-flex">
                <div class="reg-alert-text">
                  <span class="reg-alert-subtag">
                    🚨 RIVOLUZIONE REGOLAMENTARE FIA IN ARRIVO (${reg.nextRegulationChangeYear})
                  </span>
                  <h3 class="reg-alert-title">
                    Progetto Vettura Nuovo Regolamento Tecnico
                  </h3>
                  <p class="reg-alert-desc">
                    Alla fine di questa stagione scatterà il cambio regolamentare FIA: le monoposto perderanno circa 6 punti di passo.
                    Investi fondi per progettare in anticipo la nuova vettura e conservare un vantaggio competitivo al debutto!
                  </p>
                </div>

                <div class="reg-alert-action">
                  <div class="reg-status-info">
                    <span class="reg-status-lbl">PREPARAZIONE PROGETTO:</span>
                    <strong class="reg-status-val">Livello ${reg.playerNextGenInvestment || 0} / 5</strong>
                    <small class="reg-status-gain">+${(((reg.playerNextGenInvestment || 0)) * 1.5).toFixed(1)} Passo Garantito</small>
                  </div>

                  ${(reg.playerNextGenInvestment || 0) < 5 ? `
                    <button id="btn-buy-next-gen-reg" class="modal-btn btn-gold pulse-glow reg-action-btn">
                      <span>Investi €${(40000 * ((reg.playerNextGenInvestment || 0) + 1)).toLocaleString()} ➔</span>
                    </button>
                  ` : `
                    <button class="modal-btn reg-action-btn" disabled style="background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; color: #10b981;">
                      <span>✓ Progetto al 100%</span>
                    </button>
                  `}
                </div>
              </div>
            </div>
          ` : ''}

          <!-- TAB SELETTORE DIPARTIMENTI R&D -->
          <div class="standings-tab-bar rd-tabs-bar" style="margin-bottom: 24px; display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="tab-btn ${this.currentTab === 'all' ? 'active' : ''}" data-tab="all">
              🔬 Tutti i Reparti (${allCompKeys.length})
            </button>
            <button class="tab-btn ${this.currentTab === 'aero' ? 'active' : ''}" data-tab="aero">
              🌬️ Aerodinamica
            </button>
            <button class="tab-btn ${this.currentTab === 'engine' ? 'active' : ''}" data-tab="engine">
              🔥 Power Unit
            </button>
            <button class="tab-btn ${this.currentTab === 'chassis' ? 'active' : ''}" data-tab="chassis">
              ⚙️ Telaio & Dinamica
            </button>
            <button class="tab-btn ${this.currentTab === 'reliability' ? 'active' : ''}" data-tab="reliability">
              🛡️ Affidabilità
            </button>
          </div>

          <!-- GRIGLIA PRINCIPALE R&D SOTTOCOMPONENTI + GERARCHIA GRIGLIA -->
          <div class="rd-grid-container">
            <!-- ELENCO SOTTOCOMPONENTI TECNICI -->
            <div class="rd-subcomponents-list">
              ${filteredKeys.map(k => this.renderSubComponentCard(k, subComponents[k] || 0, careerData.money, telemetryPoints)).join('')}
            </div>

            <!-- COMPARAZIONE GERARCHIA TECNICA MEZZI GRIGLIA -->
            <div class="grid-hierarchy-card">
              <div class="hierarchy-header">
                <h3 class="hierarchy-title">Gerarchia Tecnica Campionato</h3>
                <span class="hierarchy-year">${careerData.currentYear}</span>
              </div>
              <p class="hierarchy-desc">
                Confronto delle prestazioni attuali dei mezzi in griglia, aggiornato in tempo reale con gli sviluppi portati da tutte le scuderie:
              </p>
              
              <div class="hierarchy-list">
                ${allTeams.map((t, idx) => `
                  <div class="hierarchy-row ${t.isPlayerTeam ? 'player-team-row' : ''}">
                    <div class="hierarchy-team-left">
                      <span class="hierarchy-rank">${idx + 1}</span>
                      <span class="hierarchy-color-dot" style="background: ${t.color || '#888'};"></span>
                      <strong class="hierarchy-team-name">${t.displayName || t.realName || t.name || 'Scuderia'}</strong>
                      ${t.isPlayerTeam ? '<span class="hierarchy-you-tag">TU</span>' : ''}
                    </div>
                    <span class="hierarchy-pace-val">${t.pace}/99</span>
                  </div>
                `).join('')}
              </div>
            </div>
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
    const { risk, successRate } = career.calculateSubComponentRisk ? career.calculateSubComponentRisk(compKey) : { risk: 20, successRate: 80 };

    return `
      <div class="rd-subcomp-card ${isMax ? 'is-maxed' : ''}" data-comp="${compKey}">
        <div class="rd-card-body">
          <div class="rd-card-header">
            <div class="rd-card-identity">
              <span class="rd-card-icon">${cfg.icon}</span>
              <div class="rd-card-title-box">
                <span class="rd-card-dept-tag">${cfg.deptName}</span>
                <h4 class="rd-card-comp-name">${cfg.name}</h4>
              </div>
            </div>
            <span class="rd-card-lvl-badge ${isMax ? 'badge-max' : ''}">
              ${isMax ? 'MASSIMO' : `Lvl ${level}/${maxLevel}`}
            </span>
          </div>

          <p class="rd-card-desc">${cfg.desc}</p>

          <div class="rd-spec-badge">
            ⚡ ${cfg.spec}
          </div>

          <!-- RISCHIO FLOP & SUCCESSO UPGRADE -->
          ${!isMax ? `
            <div class="rd-risk-badge-row">
              <span class="rd-risk-badge ${risk >= 35 ? 'risk-high' : (risk >= 24 ? 'risk-med' : 'risk-low')}">
                🎲 Rischio Flop: <strong>${risk}%</strong>
              </span>
              <span class="rd-success-badge">
                🎯 Successo: <strong>${successRate}%</strong>
              </span>
            </div>
          ` : ''}

          <!-- BARRA LIVELLO SEGMENTATA -->
          <div class="rd-segment-bar">
            ${[1, 2, 3, 4, 5].map(step => `
              <div class="rd-segment-unit ${step <= level ? 'active' : ''}"></div>
            `).join('')}
          </div>
        </div>

        <div class="rd-card-footer">
          ${!isMax ? `
            <div class="rd-cost-row">
              <div class="rd-cost-col">
                <span class="rd-cost-lbl">COSTO PROTOTIPO:</span>
                <strong class="rd-cost-val ${hasMoney ? 'money-ok' : 'money-err'}">€${cost.toLocaleString()}</strong>
              </div>
              <div class="rd-cost-col right">
                <span class="rd-cost-lbl">TELEMETRIA:</span>
                <strong class="rd-cost-val ${hasPoints ? 'pts-ok' : 'pts-err'}">${ptsCost} PT</strong>
              </div>
            </div>

            <button class="btn-upgrade-subcomponent ${canAfford ? '' : 'btn-disabled'}" data-comp="${compKey}">
              <span>${canAfford ? `Sviluppa & Collauda In Pista (${successRate}% Successo) ➔` : (!hasMoney ? 'Budget Insufficiente' : 'Telemetria Insufficiente')}</span>
            </button>
          ` : `
            <div class="rd-max-notice">
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
    container.querySelectorAll('.btn-upgrade-subcomponent').forEach(btn => {
      btn.onclick = () => {
        const compKey = btn.dataset.comp;
        if (btn.classList.contains('btn-disabled')) {
          sound.playClick();
          const cfg = RD_SUBCOMPONENTS_CONFIG[compKey];
          const lvl = (career.career?.rdSubComponents?.[compKey]) || 0;
          const cost = cfg ? cfg.baseCost + (lvl * cfg.costMult) : 0;
          const ptsCost = cfg ? cfg.basePoints + (lvl * cfg.pointsMult) : 0;
          const money = career.career?.money || 0;
          const pt = career.career?.rdTelemetryPoints || 0;
          if (money < cost) {
            ToastNotification.show(`⚠️ Budget insufficiente! Richiesti €${cost.toLocaleString()}, disponibili €${money.toLocaleString()}.`, "warning");
          } else if (pt < ptsCost) {
            ToastNotification.show(`⚠️ Dati telemetrici insufficienti! Richiesti ${ptsCost} PT, disponibili ${pt} PT.`, "warning");
          }
          return;
        }

        const res = career.buySubComponentUpgrade(compKey);
        if (res.success) {
          sound.playRadioBeep();
          ToastNotification.show(`⚙️ ${res.message}`, "success");
          window.dispatchEvent(new CustomEvent('career-data-updated'));
          renderPage();
        } else if (res.failedAttempt) {
          sound.playClick();
          ToastNotification.show(`❌ ${res.message}`, "danger");
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
