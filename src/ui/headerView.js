import { career } from '../engine/careerEngine.js';
import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';
import { HelmetRenderer } from './helmetEditorView.js';
import { ToastNotification } from './toastNotification.js';
import { DriverSkillsModal } from './driverSkillsModal.js';

export class HeaderView {
  static render(container, currentRoute, onNavigate, onOpenModManager) {
    const hasCareer = career.hasActiveCareer() || (career.hasSavedCareer() && career.career?.isRetired);
    const player = hasCareer ? career.player : null;
    const careerData = hasCareer ? career.career : null;

    // Se siamo sulla landing page o non c'è una carriera attiva, mostra l'header del portale
    if (!hasCareer || currentRoute === 'landing') {
      container.innerHTML = `
        <header class="top-nav-bar landing-nav">
          <div class="logo-area clickable-home-logo" id="logo-click-home" title="Clicca per tornare alla Home / Landing Page">
            <span class="goat-badge">GOAT</span>
            <span class="logo-title">MOTORSPORT EDITION</span>
          </div>

          <div class="nav-controls">
            <button id="btn-mod-manager" class="nav-icon-btn" title="Impostazioni & Database Nomi">⚙️</button>
            <button id="btn-toggle-sound" class="nav-icon-btn" title="Audio On/Off">
              ${sound.muted ? '🔇' : '🔊'}
            </button>
          </div>
        </header>
      `;

      this.bindLandingHeaderEvents(container, onNavigate, onOpenModManager);
      return;
    }

    // Header completo durante la carriera
    const team = career.getPlayerTeam() || db.getTeam(careerData.currentTeamId, player.discipline);
    const categoryName = db.getSeriesName(careerData.currentCategory, player.discipline);
    const helmetSvg = HelmetRenderer.generateHelmetSvg({
      ...player.helmet,
      number: player.number,
      nationality: player.nationality
    }, 42);

    container.innerHTML = `
      <header class="top-nav-bar career-header">
        <!-- RIGA SUPERIORE: LOGO BRAND, IDENTITÀ PILOTA, STATS & CONTROLLI -->
        <div class="career-header-top">
          <!-- Blocco 1: Brand Logo -->
          <div class="header-brand-block" style="cursor: pointer;">
            <div class="logo-area clickable-home-logo" id="header-brand-logo" title="Torna alla Home del Sito / Schermata Principale">
              <span class="goat-badge">GOAT</span>
              <span class="logo-title">MOTORSPORT EDITION</span>
            </div>
          </div>

          <!-- Blocco 2: Identità Pilota -->
          <div class="driver-summary-left">
            <div class="mini-helmet-container" title="Casco Ufficiale">
              ${helmetSvg}
            </div>
            <div class="driver-info-meta">
              <div class="driver-name-row">
                <span class="country-flag">${this.getFlagEmoji(player.nationality)}</span>
                <strong class="pilot-full-name">${player.firstName} ${player.lastName}</strong>
                <span class="pilot-number-tag">#${player.number}</span>
                <span class="discipline-tag ${player.discipline}">${player.discipline === 'auto' ? '🏎️ AUTO' : '🏍️ MOTO'}</span>
              </div>
              <div class="driver-team-row">
                ${careerData.isRetired ? `
                  <span class="meta-chip team" style="background: rgba(234, 179, 8, 0.15); border-color: rgba(234, 179, 8, 0.4); color: #facc15;">
                    🏁 <strong>PILOTA RITIRATO (HALL OF FAME)</strong>
                  </span>
                  <span class="meta-chip age">${player.age} Anni • ${careerData.seasonNumber} Stagioni</span>
                ` : `
                  <span class="meta-chip team">
                    <span class="team-bullet" style="background:${team.color || '#e10600'}"></span>
                    <strong>${team.displayName}</strong>
                  </span>
                  <span class="meta-chip cat">${categoryName}</span>
                  <span class="meta-chip age">${player.age} Anni • Stag. ${careerData.seasonNumber}</span>
                `}
              </div>
            </div>
          </div>

          <!-- Riga 3: Metriche Pilota & Scuderia -->
          <div class="driver-stats-center">
            <div class="stat-bubble clickable-ovr-bubble ${player.unspentSkillPoints > 0 ? 'has-points-pulse' : ''}" id="btn-header-ovr-modal" title="Clicca per aprire la Scheda OVR e Assegnare i Punti Abilità">
              <span class="stat-label">OVR ${player.unspentSkillPoints > 0 ? `<span class="unspent-star-badge">+${player.unspentSkillPoints}⭐</span>` : ''}</span>
              <span class="stat-val rating">${player.ovr}</span>
            </div>
            <div class="stat-bubble" title="Fondi Disponibili">
              <span class="stat-label">FONDI</span>
              <span class="stat-val money">€${careerData.money.toLocaleString()}</span>
            </div>
            <div class="stat-bubble" title="Vittorie in Carriera">
              <span class="stat-label">VITTORIE</span>
              <span class="stat-val wins">${careerData.stats.wins}</span>
            </div>
            <div class="stat-bubble" title="Campionati Mondiali Vinti">
              <span class="stat-label">MONDIALI</span>
              <span class="stat-val titles">🏆 ${careerData.stats.worldTitles}</span>
            </div>
          </div>

          <!-- Blocco 4: Controlli Globali (Settings, Audio, Reset) -->
          <div class="nav-controls">
            <button id="btn-mod-manager" class="nav-icon-btn" title="Impostazioni di Gioco & Database Nomi">⚙️</button>
            <button id="btn-toggle-sound" class="nav-icon-btn" title="Disattiva/Attiva Suoni">
              ${sound.muted ? '🔇' : '🔊'}
            </button>
            <button id="btn-reset-career" class="nav-icon-btn danger" title="Nuova Carriera / Reset">🔄</button>
          </div>
        </div>

        <!-- RIGA INFERIORE: BARRA DI NAVIGAZIONE A TAB PER SPEZZETTARE LE PAGINE -->
        <nav class="career-subnav-bar">
          ${careerData.isRetired ? `
            <button class="subnav-tab ${currentRoute === 'retirement' ? 'active' : ''}" data-route="retirement">
              <span class="tab-icon">🏁</span>
              <span class="tab-title">Riepilogo Ritiro</span>
            </button>
            <button class="subnav-tab ${currentRoute === 'goat' ? 'active' : ''}" data-route="goat">
              <span class="tab-icon">👑</span>
              <span class="tab-title">GOAT Hall of Fame</span>
            </button>
            <button class="subnav-tab ${currentRoute === 'standings' ? 'active' : ''}" data-route="standings">
              <span class="tab-icon">📊</span>
              <span class="tab-title">Albo d'Oro</span>
            </button>
          ` : `
            <button class="subnav-tab ${currentRoute === 'dashboard' ? 'active' : ''}" data-route="dashboard">
              <span class="tab-icon">${player?.discipline === 'moto' ? '🏍️' : '🏎️'}</span>
              <span class="tab-title">Paddock</span>
            </button>

            <button class="subnav-tab ${currentRoute === 'calendar' ? 'active' : ''}" data-route="calendar">
              <span class="tab-icon">📅</span>
              <span class="tab-title">Calendario</span>
            </button>

            <button class="subnav-tab ${currentRoute === 'standings' ? 'active' : ''}" data-route="standings">
              <span class="tab-icon">📊</span>
              <span class="tab-title">Classifiche</span>
            </button>

            <button class="subnav-tab ${currentRoute === 'rd' ? 'active' : ''}" data-route="rd">
              <span class="tab-icon">⚙️</span>
              <span class="tab-title">R&D</span>
            </button>

            <button class="subnav-tab ${currentRoute === 'market' ? 'active' : ''}" data-route="market">
              <span class="tab-icon">💼</span>
              <span class="tab-title">Mercato</span>
            </button>

            <button class="subnav-tab ${currentRoute === 'lifestyle' ? 'active' : ''}" data-route="lifestyle">
              <span class="tab-icon">🏛️</span>
              <span class="tab-title">Lifestyle</span>
            </button>

            <button class="subnav-tab ${currentRoute === 'goat' ? 'active' : ''}" data-route="goat">
              <span class="tab-icon">👑</span>
              <span class="tab-title">GOAT</span>
            </button>
          `}
        </nav>
      </header>
    `;

    this.bindCareerHeaderEvents(container, onNavigate, onOpenModManager);
  }

  static bindLandingHeaderEvents(container, onNavigate, onOpenModManager) {
    const homeLogo = container.querySelector('#logo-click-home');
    if (homeLogo) {
      homeLogo.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        sound.playClick();
        onNavigate('landing');
      };
    }

    const modBtn = container.querySelector('#btn-mod-manager');
    if (modBtn) {
      modBtn.onclick = () => {
        sound.playClick();
        onOpenModManager();
      };
    }

    const soundBtn = container.querySelector('#btn-toggle-sound');
    if (soundBtn) {
      soundBtn.onclick = () => {
        sound.toggleMute();
        soundBtn.textContent = sound.muted ? '🔇' : '🔊';
      };
    }
  }

  static bindCareerHeaderEvents(container, onNavigate, onOpenModManager) {
    const brandLogo = container.querySelector('#header-brand-logo');
    if (brandLogo) {
      brandLogo.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        sound.playClick();
        onNavigate('landing');
      };
    }

    const brandBlock = container.querySelector('.header-brand-block');
    if (brandBlock) {
      brandBlock.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        sound.playClick();
        onNavigate('landing');
      };
    }

    const ovrBubble = container.querySelector('#btn-header-ovr-modal');
    if (ovrBubble) {
      ovrBubble.onclick = () => {
        sound.playClick();
        DriverSkillsModal.open();
      };
    }

    // Navigazione a tab della carriera (con auto-scroll interno solo su desktop se la barra dovesse eccedere)
    const subnavBar = container.querySelector('.career-subnav-bar');
    const activeTab = container.querySelector('.subnav-tab.active');
    if (subnavBar && activeTab && window.innerWidth > 768) {
      setTimeout(() => {
        try {
          const barRect = subnavBar.getBoundingClientRect();
          const tabRect = activeTab.getBoundingClientRect();
          const offset = (tabRect.left - barRect.left) - (barRect.width / 2) + (tabRect.width / 2);
          subnavBar.scrollBy({ left: offset, behavior: 'smooth' });
        } catch (e) {}
      }, 50);
    }

    container.querySelectorAll('.subnav-tab').forEach(tab => {
      tab.onclick = () => {
        const route = tab.dataset.route;
        sound.playClick();
        onNavigate(route);
      };
    });

    const modBtn = container.querySelector('#btn-mod-manager');
    if (modBtn) {
      modBtn.onclick = () => {
        sound.playClick();
        onOpenModManager();
      };
    }

    const soundBtn = container.querySelector('#btn-toggle-sound');
    if (soundBtn) {
      soundBtn.onclick = () => {
        sound.toggleMute();
        soundBtn.textContent = sound.muted ? '🔇' : '🔊';
      };
    }

    const resetBtn = container.querySelector('#btn-reset-career');
    if (resetBtn) {
      resetBtn.onclick = () => {
        ToastNotification.confirm({
          title: "Azzerare la Carriera?",
          message: "Vuoi davvero iniziare una nuova carriera da zero? La carriera attuale verrà cancellata in modo definitivo.",
          confirmText: "Cancella e Ricomincia",
          cancelText: "Continua Carriera",
          danger: true,
          onConfirm: () => {
            career.resetCareer();
            ToastNotification.show("Carriera cancellata con successo.", "info");
            onNavigate('creation');
          }
        });
      };
    }
  }

  static getFlagEmoji(countryCode) {
    const flags = {
      ITA: "🇮🇹", GBR: "🇬🇧", NLD: "🇳🇱", ESP: "🇪🇸", MCO: "🇲🇨",
      DEU: "🇩🇪", FRA: "🇫🇷", USA: "🇺🇸", AUS: "🇦🇺", JPN: "🇯🇵",
      BRA: "🇧🇷", FIN: "🇫🇮", CHE: "🇨🇭", BEL: "🇧🇪", AUT: "🇦🇹",
      MEX: "🇲🇽", CAN: "🇨🇦", THA: "🇹🇭", ARG: "🇦🇷", TUR: "🇹🇷",
      COL: "🇨🇴", PRT: "🇵🇹", ZAF: "🇿🇦", NZL: "🇳🇿"
    };
    return flags[countryCode] || "🏁";
  }
}
