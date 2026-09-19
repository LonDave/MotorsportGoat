import { career } from '../engine/careerEngine.js';
import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';
import { ToastNotification } from './toastNotification.js';

export class LifestyleView {
  static render(container, onNavigate) {
    const player = career.player;
    const careerData = career.career;
    const hq = careerData.hqUpgrades || { simulatorLevel: 0, gymLevel: 0, prAgencyLevel: 0, telemetryCoachLevel: 0 };

    const luxuryCatalog = [
      { 
        id: "supercar", 
        name: player.discipline === 'auto' 
          ? (db.isRealNames ? "Supercar Ferrari SF90 Stradale" : "Supercar Cavallino SF90") 
          : (db.isRealNames ? "Ducati Panigale V4 SP2" : "Bologna Desmo V4 SP2"), 
        price: 220000, 
        fameBonus: 5, 
        icon: "🏎️", 
        desc: "Bolide stradale da sfoggiare nel paddock dei Gran Premi." 
      },
      { id: "villa_monaco", name: "Attico Panoramico a Monte Carlo", price: 1500000, fameBonus: 15, icon: "🏰", desc: "Residenza fiscale con vista mozzafiato sul circuito e sul porto di Monaco." },
      { id: "private_jet", name: "Jet Privato Bombardier con Livrea Personale", price: 3500000, fameBonus: 25, icon: "✈️", desc: "Spostamenti transcontinentali tra una gara e l'altra senza jet-lag." },
      { id: "kart_team", name: "Scuderia Personale Karting / Minimoto", price: 650000, fameBonus: 10, icon: "🏆", desc: "Finanzia e allena i campioni del domani per costruire la tua dinastia." }
    ];

    container.innerHTML = `
      <div class="lifestyle-view-wrapper">
        <div class="weekend-top-header">
          <span class="session-badge">VITA DA PILOTA & INVESTIMENTI</span>
          <h2>Headquarters, Allenamento & Lifestyle</h2>
          <p class="header-sub">Investi i tuoi milioni in strutture all'avanguardia per migliorare le prestazioni e scalare la notorietà mondiale.</p>
        </div>

        <div class="lifestyle-grid-layout">
          <!-- Strutture HQ & Performance -->
          <div class="dash-card hq-upgrades-card">
            <h3 class="card-title">Strutture di Allenamento Personali (HQ)</h3>
            <p class="section-subtext">Aumentano l'efficacia dei tuoi allenamenti tra un Gran Premio e l'altro.</p>

            <div class="hq-items-list">
              ${this.renderHqItem("simulatorLevel", "Simulatore Dinamico Professionale", "Migliora l'acquisizione di ritmo e passo sul giro secco.", hq.simulatorLevel, 40000, "🖥️")}
              ${this.renderHqItem("gymLevel", "Palestra & Fisioterapista Personale", "Aumenta la resistenza fisica e la concentrazione negli ultimi giri.", hq.gymLevel, 30000, "🏋️")}
              ${this.renderHqItem("prAgencyLevel", "Agenzia di PR & Comunicazione", "Incrementa la popolarità mediatica e attrae sponsor milionari.", hq.prAgencyLevel, 50000, "📱")}
              ${this.renderHqItem("telemetryCoachLevel", "Ingegnere Telemetrista Dedicato", "Ottimizza il feedback per trovare l'assetto perfetto nelle libere.", hq.telemetryCoachLevel, 45000, "📈")}
            </div>
          </div>

          <!-- Lusso & Sfizi da Campione -->
          <div class="dash-card luxury-purchases-card">
            <h3 class="card-title">Stile di Vita & Status da Celebrità</h3>
            <p class="section-subtext">Oggetti di lusso che testimoniano il tuo status da superstar globale del motorsport.</p>

            <div class="luxury-items-grid">
              ${luxuryCatalog.map(item => {
                const alreadyOwned = careerData.lifestyleItems?.some(i => i.id === item.id);
                return `
                  <div class="luxury-item-card ${alreadyOwned ? 'owned' : ''}">
                    <div class="luxury-icon">${item.icon}</div>
                    <div class="luxury-info">
                      <strong>${item.name}</strong>
                      <span class="luxury-desc">${item.desc}</span>
                      <div class="luxury-meta">
                        <span class="fame-tag">+${item.fameBonus} Popolarità</span>
                        <span class="price-tag">€${item.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div class="luxury-action">
                      ${alreadyOwned ? `
                        <span class="owned-badge">POSSEDUTO ✅</span>
                      ` : `
                        <button class="buy-luxury-btn" data-item-id="${item.id}">
                          ACQUISTA
                        </button>
                      `}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <div class="finish-weekend-action-bar">
          <button id="btn-return-from-lifestyle" class="start-race-button">
            <span>RITORNA ALLA DASHBOARD ➔</span>
          </button>
        </div>
      </div>
    `;

    // Event listeners
    container.querySelectorAll('.buy-hq-btn').forEach(btn => {
      btn.onclick = () => {
        const type = btn.dataset.type;
        const res = career.buyHqUpgrade(type);
        if (res.success) {
          sound.playClick();
          ToastNotification.show("🏛️ Struttura HQ potenziata con successo!", "success");
          LifestyleView.render(container, onNavigate);
        } else {
          ToastNotification.show(`⚠️ ${res.message}`, "warning");
        }
      };
    });

    container.querySelectorAll('.buy-luxury-btn').forEach(btn => {
      btn.onclick = () => {
        const itemId = btn.dataset.itemId;
        const item = luxuryCatalog.find(i => i.id === itemId);
        if (!item) return;
        const res = career.buyLifestyleItem(item);
        if (res.success) {
          sound.playChequeredFlag();
          ToastNotification.show(`🎉 Acquisto completato: ${item.name}!`, "success");
          LifestyleView.render(container, onNavigate);
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
  }

  static renderHqItem(key, title, desc, level, cost, icon) {
    const nextCost = cost * (level + 1);
    const isMax = level >= 5;

    return `
      <div class="hq-item-row" data-key="${key}">
        <div class="hq-icon-box">${icon}</div>
        <div class="hq-info-box">
          <strong>${title} <small class="level-tag">Lvl ${level}/5</small></strong>
          <span class="hq-desc">${desc}</span>
          <div class="dept-progress-bar">
            <div class="dept-fill" style="width:${(level / 5) * 100}%"></div>
          </div>
        </div>
        <div class="hq-action-box">
          ${!isMax ? `
            <button class="buy-hq-btn" data-type="${key}">
              <span>Potenzia</span>
              <small>€${nextCost.toLocaleString()}</small>
            </button>
          ` : `
            <span class="max-badge">MAX</span>
          `}
        </div>
      </div>
    `;
  }
}
