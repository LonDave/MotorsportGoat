import { career } from './engine/careerEngine.js';
import { db } from './data/databaseManager.js';
import { HeaderView } from './ui/headerView.js';
import { LandingView } from './ui/landingView.js';
import { CreationView } from './ui/creationView.js';
import { DashboardView } from './ui/dashboardView.js';
import { CalendarView } from './ui/calendarView.js';
import { StandingsView } from './ui/standingsView.js';
import { RdFacilityView } from './ui/rdFacilityView.js';
import { WeekendView } from './ui/weekendView.js';
import { MarketView } from './ui/marketView.js';
import { LifestyleView } from './ui/lifestyleView.js';
import { GoatHallOfFameView } from './ui/goatHallOfFameView.js';
import { RetirementView } from './ui/retirementView.js';
import { RookieTestView } from './ui/rookieTestView.js';
import { ModManagerModal } from './ui/modManagerModal.js';

class AppRouter {
  constructor() {
    this.headerContainer = document.getElementById('app-header');
    this.mainContainer = document.getElementById('app-main-content');
    this.currentRoute = 'landing';
    try {
      const savedPending = sessionStorage.getItem('pending_custom_driver');
      this.pendingCustomDriver = savedPending ? JSON.parse(savedPending) : null;
    } catch (e) {
      this.pendingCustomDriver = null;
    }

    // Ascolta cambi nel database dei nomi (fittizi <-> reali 2026) e aggiorna la schermata all'istante
    db.onModeChange(() => {
      this.render();
    });

    // Ascolta aggiornamenti carriera e abilità pilota
    window.addEventListener('career-data-updated', () => {
      this.render();
    });
  }

  init() {
    // Di default apri la Landing Page cinematografica del portale
    this.navigate('landing');
  }

  navigate(route) {
    this.currentRoute = route;
    this.render();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  openModManager() {
    ModManagerModal.open(() => {
      this.render();
    });
  }

  render() {
    // 1. Reindirizzamento: se non c'è una carriera salvata o se il pilota è ritirato
    const hasCareer = career.hasSavedCareer();
    if (!hasCareer && this.currentRoute !== 'landing' && this.currentRoute !== 'creation' && this.currentRoute !== 'rookie-test') {
      this.currentRoute = 'landing';
    } else if (hasCareer && career.career?.isRetired) {
      if (['dashboard', 'calendar', 'rd', 'weekend', 'market', 'lifestyle'].includes(this.currentRoute)) {
        this.currentRoute = 'retirement';
      }
    }

    // 2. Render Header (con subnav tab durante la carriera)
    HeaderView.render(
      this.headerContainer,
      this.currentRoute,
      (route) => this.navigate(route),
      () => this.openModManager()
    );

    // 3. Render Vista Principale Spezzettata
    switch (this.currentRoute) {
      case 'landing':
        LandingView.render(
          this.mainContainer,
          (route) => this.navigate(route),
          () => this.openModManager()
        );
        break;

      case 'creation':
        CreationView.render(this.mainContainer, (createdDriverData) => {
          this.pendingCustomDriver = createdDriverData;
          try {
            sessionStorage.setItem('pending_custom_driver', JSON.stringify(createdDriverData));
          } catch (e) {}
          this.navigate('rookie-test');
        });
        break;

      case 'rookie-test':
        if (!this.pendingCustomDriver) {
          try {
            const savedPending = sessionStorage.getItem('pending_custom_driver');
            if (savedPending) this.pendingCustomDriver = JSON.parse(savedPending);
          } catch (e) {}
        }
        if (!this.pendingCustomDriver) {
          if (career.hasActiveCareer()) {
            this.navigate('dashboard');
          } else {
            this.navigate('creation');
          }
          break;
        }
        RookieTestView.render(this.mainContainer, this.pendingCustomDriver, (chosenTeamId, chosenContract) => {
          career.startNewCareer(this.pendingCustomDriver, chosenTeamId, chosenContract);
          if (this.pendingCustomDriver.initialTelemetryBonus) {
            career.career.rdTelemetryPoints = (career.career.rdTelemetryPoints || 0) + this.pendingCustomDriver.initialTelemetryBonus;
            career.saveToStorage();
          }
          try {
            sessionStorage.removeItem('pending_custom_driver');
          } catch (e) {}
          this.pendingCustomDriver = null;
          this.navigate('dashboard');
        });
        break;

      case 'dashboard':
        DashboardView.render(this.mainContainer, (route) => {
          this.navigate(route);
        });
        break;

      case 'calendar':
        CalendarView.render(this.mainContainer, (route) => {
          this.navigate(route);
        });
        break;

      case 'standings':
        StandingsView.render(this.mainContainer, (route) => {
          this.navigate(route);
        });
        break;

      case 'rd':
        RdFacilityView.render(this.mainContainer, (route) => {
          this.navigate(route);
        });
        break;

      case 'weekend':
        WeekendView.render(this.mainContainer, () => {
          this.navigate('dashboard');
        });
        break;

      case 'market':
        MarketView.render(this.mainContainer, (route) => {
          this.navigate(route);
        });
        break;

      case 'lifestyle':
        LifestyleView.render(this.mainContainer, (route) => {
          this.navigate(route);
        });
        break;

      case 'goat':
        GoatHallOfFameView.render(this.mainContainer, (route) => {
          this.navigate(route);
        });
        break;

      case 'retirement':
        RetirementView.render(this.mainContainer, (route) => {
          this.navigate(route);
        });
        break;

      default:
        LandingView.render(
          this.mainContainer,
          (route) => this.navigate(route),
          () => this.openModManager()
        );
        break;
    }
  }
}

// Avvio applicazione al caricamento del DOM
document.addEventListener('DOMContentLoaded', () => {
  const router = new AppRouter();
  router.init();
});
