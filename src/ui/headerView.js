import { career } from '../engine/careerEngine.js';
import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';
import { HelmetRenderer } from './helmetEditorView.js';
import { ToastNotification } from './toastNotification.js';
import { DriverSkillsModal } from './driverSkillsModal.js';

export class HeaderView {
  static render(container, currentRoute, onNavigate, onOpenModManager) {
    const hasCareer = career.hasActiveCareer();
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
            ${hasCareer ? `
              <button id="btn-return-career" class="nav-pill-btn career-return-btn pulse-glow">
                ▶ TORNA ALLA CARRIERA (${player.firstName} ${player.lastName})
              </button>
            ` : ''}

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
          <!-- Logo Brand (Non cliccabile: la navigazione alla Home/Menu è gestita dal tasto dedicato sottostante) -->
          <div class="logo-area static-brand-logo" id="header-brand-logo">
            <span class="goat-badge">GOAT</span>
            <span class="logo-title">MOTORSPORT EDITION</span>
          </div>

          <!-- Identità Pilota -->
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
                <span class="team-bullet" style="background:${team.color || '#e10600'}"></span>
                <strong class="team-label">${team.displayName}</strong>
                <span class="separator">•</span>
                <span class="cat-label">${categoryName}</span>
                <span class="separator">•</span>
                <span class="age-label">${player.age} Anni (Stagione ${careerData.seasonNumber})</span>
              </div>
            </div>
          </div>

          <!-- Metriche Pilota & Scuderia -->
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

          <!-- Pulsanti di controllo globali (Solo Impostazioni, Audio e Reset) -->
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
          <button class="subnav-tab ${currentRoute === 'landing' ? 'active' : ''}" data-route="landing" title="Torna alla Landing Page del portale">
            <span class="tab-icon">🌐</span>
            <span class="tab-title">Home / Menu</span>
          </button>
          
          <button class="subnav-tab ${currentRoute === 'dashboard' ? 'active' : ''}" data-route="dashboard">
            <span class="tab-icon">🏠</span>
            <span class="tab-title">Paddock Hub</span>
          </button>

          <button class="subnav-tab ${currentRoute === 'calendar' ? 'active' : ''}" data-route="calendar">
            <span class="tab-icon">📅</span>
            <span class="tab-title">Calendario 2026</span>
          </button>

          <button class="subnav-tab ${currentRoute === 'standings' ? 'active' : ''}" data-route="standings">
            <span class="tab-icon">📊</span>
            <span class="tab-title">Classifiche</span>
          </button>

          <button class="subnav-tab ${currentRoute === 'rd' ? 'active' : ''}" data-route="rd">
            <span class="tab-icon">⚙️</span>
            <span class="tab-title">Reparto Corse R&D</span>
          </button>

          <button class="subnav-tab ${currentRoute === 'market' ? 'active' : ''}" data-route="market">
            <span class="tab-icon">💼</span>
            <span class="tab-title">Mercato & Contratti</span>
          </button>

          <button class="subnav-tab ${currentRoute === 'lifestyle' ? 'active' : ''}" data-route="lifestyle">
            <span class="tab-icon">🏛️</span>
            <span class="tab-title">Lifestyle & Sponsor</span>
          </button>

          <button class="subnav-tab ${currentRoute === 'goat' ? 'active' : ''}" data-route="goat">
            <span class="tab-icon">👑</span>
            <span class="tab-title">GOAT Index</span>
          </button>
        </nav>
      </header>
    `;

    this.bindCareerHeaderEvents(container, onNavigate, onOpenModManager);
  }

  static bindLandingHeaderEvents(container, onNavigate, onOpenModManager) {
    const homeLogo = container.querySelector('#logo-click-home');
    if (homeLogo) {
      homeLogo.onclick = () => {
        sound.playClick();
        onNavigate('landing');
      };
    }

    const returnCareerBtn = container.querySelector('#btn-return-career');
    if (returnCareerBtn) {
      returnCareerBtn.onclick = () => {
        sound.playClick();
        onNavigate('dashboard');
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
    const ovrBubble = container.querySelector('#btn-header-ovr-modal');
    if (ovrBubble) {
      ovrBubble.onclick = () => {
        sound.playClick();
        DriverSkillsModal.open();
      };
    }

    // Navigazione a tab della carriera (include 'Home / Menu')
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
