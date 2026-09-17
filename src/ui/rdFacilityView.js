import { career } from '../engine/careerEngine.js';
import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';
import { ToastNotification } from './toastNotification.js';

export class RdFacilityView {
  static render(container, onNavigate) {
    const player = career.player;
    const careerData = career.career;
    const team = career.getPlayerTeam();
    const catData = career.getCurrentCategoryData();
    const upgrades = careerData.carUpgrades || { aero: 0, engine: 0, chassis: 0, reliability: 0 };
    const vehicleType = player.discipline === 'auto' ? 'Monoposto' : 'Prototipo';

    // Calcolo del posizionamento teorico del mezzo sulla griglia
    const allTeams = catData.teams.map(t => {
      const isPlayerTeam = t.id === careerData.currentTeamId;
      const pace = isPlayerTeam 
        ? (player.discipline === 'auto' ? team.carPace : team.bikePace)
        : (player.discipline === 'auto' ? t.carPace : t.bikePace);
      return { ...t, pace, isPlayerTeam };
    }).sort((a, b) => b.pace - a.pace);

    const playerTeamRank = allTeams.findIndex(t => t.isPlayerTeam) + 1;
    const currentPace = player.discipline === 'auto' ? team.carPace : team.bikePace;

    container.innerHTML = `
      <div class="page-container rd-facility-page">
        <!-- HEADER REPARTO CORSE -->
        <div class="page-title-banner">
          <div class="banner-text">
            <span class="page-subtag">CENTRO INGEGNERIA & SVILUPPO • ${(team?.displayName || team?.realName || team?.fictionalName || team?.name || 'SCUDERIA').toUpperCase()}</span>
            <h2 class="page-main-title">⚙️ REPARTO CORSE & SVILUPPO R&D</h2>
            <p class="page-desc">Investi il budget nei quattro dipartimenti tecnici chiave. Ogni sviluppo incrementa il passo sul giro ed elimina le lacune della ${vehicleType.toLowerCase()}.</p>
          </div>

          <div class="rd-quick-stats">
            <div class="rd-stat-pill">
              <span class="pill-lbl">Passo Mezzo</span>
              <strong class="pill-val">${currentPace} <small>/99</small></strong>
            </div>
            <div class="rd-stat-pill">
              <span class="pill-lbl">Gerarchia Griglia</span>
              <strong class="pill-val">${playerTeamRank}° <small>su ${allTeams.length}</small></strong>
            </div>
            <div class="rd-stat-pill">
              <span class="pill-lbl">Fondi Disponibili</span>
              <strong class="pill-val money">€${careerData.money.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        <!-- GRIGLIA DIPARTIMENTI R&D -->
        <div class="rd-grid-container">
          <div class="rd-departments-grid-large">
            ${this.renderDepartmentCard({
              key: 'aero',
              title: player.discipline === 'auto' ? 'Aerodinamica & Galleria del Vento' : 'Aerodinamica & Appendici Alari',
              desc: 'Migliora la deportanza, l\'aderenza nelle curve ad alta velocità e l\'efficienza nei rettilinei.',
              level: upgrades.aero || 0,
              icon: '🌬️',
              statGain: '+1.5 Passo / Livello',
              budget: careerData.money
            })}

            ${this.renderDepartmentCard({
              key: 'engine',
              title: player.discipline === 'auto' ? 'Motore & Power Unit' : 'Motore & Gestione Elettronica',
              desc: 'Aumenta i cavalli vapore, la velocità di punta e l\'erogazione della coppia in uscita dalle curve lente.',
              level: upgrades.engine || 0,
              icon: '🔥',
              statGain: '+1.5 Passo / Livello',
              budget: careerData.money
            })}

            ${this.renderDepartmentCard({
              key: 'chassis',
              title: 'Telaio & Geometria Sospensioni',
              desc: 'Massimizza la stabilità in inserimento, la trazione sui cordoli e riduce il consumo battistrada degli pneumatici.',
              level: upgrades.chassis || 0,
              icon: '⚙️',
              statGain: '+1.2 Passo / Livello',
              budget: careerData.money
            })}

            ${this.renderDepartmentCard({
              key: 'reliability',
              title: 'Affidabilità Meccanica & Controllo Qualità',
              desc: 'Minimizza drasticamente il rischio di surriscaldamenti, noie elettroniche, forature e guasti con ritiro (DNF).',
              level: upgrades.reliability || 0,
              icon: '🛡️',
              statGain: '+2.5% Affidabilità / Livello',
              budget: careerData.money
            })}
          </div>

          <!-- COMPARAZIONE VELOCE GRIGLIA MEZZI -->
          <div class="grid-hierarchy-card">
            <h3 class="hierarchy-title">Gerarchia Tecnica del Campionato</h3>
            <p class="hierarchy-desc">Confronto dei valori di passo vettura/moto tra tutte le scuderie della griglia 2026:</p>
            
            <div class="hierarchy-list">
              ${allTeams.map((t, idx) => `
                <div class="hierarchy-item ${t.isPlayerTeam ? 'active-team' : ''}">
                  <span class="hier-pos">${idx + 1}</span>
                  <span class="team-bullet-small" style="background:${t.color || '#888'}"></span>
                  <strong class="hier-name">${t.displayName || t.realName || t.fictionalName || t.name || 'Scuderia'}</strong>
                  ${t.isPlayerTeam ? '<span class="you-badge">TU</span>' : ''}
                  <span class="hier-pace">${t.pace}/99</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents(container, onNavigate);
  }

  static renderDepartmentCard({ key, title, desc, level, icon, statGain, budget }) {
    const cost = 25000 * (level + 1);
    const isMax = level >= 5;
    const canAfford = budget >= cost;

    return `
      <div class="rd-card-large" data-dept="${key}">
        <div class="rd-card-header">
          <div class="rd-icon-large">${icon}</div>
          <div class="rd-title-group">
            <h3 class="rd-title">${title}</h3>
            <span class="rd-gain-tag">${statGain}</span>
          </div>
          <span class="rd-level-pill ${isMax ? 'maxed' : ''}">
            ${isMax ? 'LIVELLO MAX' : `Lvl ${level} / 5`}
          </span>
        </div>

        <p class="rd-desc">${desc}</p>

        <!-- PROGRESS BAR -->
        <div class="rd-progress-track">
          <div class="rd-progress-fill" style="width: ${(level / 5) * 100}%"></div>
        </div>

        <div class="rd-card-action-bar">
          <div class="rd-cost-info">
            ${!isMax ? `
              <span class="cost-lbl">Costo Prossimo Livello:</span>
              <strong class="cost-amount ${canAfford ? 'affordable' : 'unaffordable'}">€${cost.toLocaleString()}</strong>
            ` : `
              <span class="cost-lbl">Sviluppo Completato</span>
              <strong class="cost-amount">Potenziale al 100%</strong>
            `}
          </div>

          ${!isMax ? `
            <button class="btn-upgrade-dept ${canAfford ? '' : 'btn-disabled'}" data-dept="${key}">
              <span>Installa Upgrade ➔</span>
            </button>
          ` : `
            <button class="btn-upgrade-dept max-reached" disabled>
              <span>✓ Massimo Livello</span>
            </button>
          `}
        </div>
      </div>
    `;
  }

  static bindEvents(container, onNavigate) {
    container.querySelectorAll('.btn-upgrade-dept:not(.max-reached)').forEach(btn => {
      btn.onclick = () => {
        const dept = btn.dataset.dept;
        const res = career.buyCarUpgrade(dept);
        if (res.success) {
          sound.playRadioBeep();
          ToastNotification.show(`⚙️ Upgrade installato con successo! ${res.message || ''}`, "success");
          this.render(container, onNavigate);
        } else {
          ToastNotification.show(`⚠️ ${res.message}`, "warning");
        }
      };
    });
  }
}
