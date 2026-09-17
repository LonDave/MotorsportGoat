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
import { ModManagerModal } from './ui/modManagerModal.js';

class AppRouter {
  constructor() {
    this.headerContainer = document.getElementById('app-header');
    this.mainContainer = document.getElementById('app-main-content');
    this.currentRoute = 'landing';

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openModManager() {
    ModManagerModal.open(() => {
      this.render();
    });
  }

  render() {
    // 1. Se non c'è una carriera attiva e la rotta richiede la sessione pilota, reindirizza alla landing page
    if (!career.hasActiveCareer() && this.currentRoute !== 'landing' && this.currentRoute !== 'creation') {
      this.currentRoute = 'landing';
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
        CreationView.render(this.mainContainer, () => {
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
