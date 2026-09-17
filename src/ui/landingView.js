import { career } from '../engine/careerEngine.js';
import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';
import { ToastNotification } from './toastNotification.js';

export class LandingView {
  static render(container, onNavigate, onOpenModManager) {
    const hasSave = career.hasActiveCareer();
    const player = hasSave ? career.player : null;
    const careerData = hasSave ? career.career : null;
    const team = (hasSave && player && careerData) 
      ? db.getTeam(careerData.currentTeamId, player.discipline) 
      : null;

    const isReal = db.isRealNames;

    const badgeText = isReal 
      ? 'STAGIONE MOTORSPORT UFFICIALE 2026 • AUTOMOBILISMO & MOTOCICLISMO'
      : 'STAGIONE MOTORSPORT 2026 • APEX & PROTOTIPI RACING';

    const heroLeadText = isReal
      ? `Dalle categorie propedeutiche minori al trionfo nel Campionato Mondiale. Vivi l'esperienza manageriale e di guida più completa: <strong>11 scuderie F1 2026</strong> con <strong>Cadillac</strong> e <strong>Audi</strong>, la <strong>MotoGP</strong> dei giganti, telemetria in tempo reale, sviluppo Reparto Corse e la caccia all'indice GOAT contro le leggende della storia.`
      : `Dalle categorie propedeutiche minori al trionfo nel Campionato Mondiale. Vivi l'esperienza manageriale e di guida più completa: <strong>11 scuderie Formula Apex 2026</strong> con <strong>American Dream</strong> e <strong>German Ring</strong>, la <strong>Moto Apex</strong> dei giganti, telemetria in tempo reale, sviluppo Reparto Corse e la caccia all'indice GOAT contro le leggende della storia.`;

    const stat1Label = isReal ? 'Scuderie F1 2026 (+Cadillac TWG)' : 'Scuderie Formula Apex 2026 (+American Team)';
    const stat2Label = isReal ? 'GP F1 & Round MotoGP Calendari Ufficiali' : 'GP Apex & Round Moto Apex Calendari';

    const autoDesc = isReal
      ? `Dalle dure battaglie a ruote scoperte della Formula 4 e Formula Regional, fino al vertice assoluto della Formula 1 con il nuovo team Cadillac TWG e Audi Revolut, oltre alle sfide del WEC Hypercar e IndyCar.`
      : `Dalle dure battaglie a ruote scoperte della Formula 4 Regional, fino al vertice assoluto della Formula Apex con i nuovi team American Dream e German Ring, oltre alle sfide dell'Hypercar Endurance e American Open Wheel.`;

    const autoSteps = [
      { num: '1', title: isReal ? 'Formula 4' : 'Formula 4 Regional', desc: isReal ? 'Iniziazione' : 'Iniziazione Giovani' },
      { num: '2', title: isReal ? 'Formula 3' : 'Formula 3 International', desc: isReal ? 'Competizione Internazionale' : 'Competizione Internazionale' },
      { num: '3', title: isReal ? 'Formula 2' : 'Formula 2 World Series', desc: isReal ? 'Anticamera F1' : 'Anticamera Formula Apex' },
      { num: '★', premier: true, title: isReal ? 'Formula 1 2026' : 'Formula Apex 2026', desc: isReal ? '11 Scuderie Mondiali' : '11 Scuderie Mondiali' },
      { num: 'WEC', cls: 'wec', title: isReal ? 'WEC Hypercar' : 'Hypercar Endurance', desc: isReal ? 'Ferrari 499P, Porsche & 24h Le Mans' : 'Cavallino Sarthe, Stuttgart & 24h Le Mans' },
      { num: 'INDY', cls: 'indy', title: isReal ? 'IndyCar Series' : 'American Open Wheel', desc: isReal ? 'Penske, Ganassi & Open Wheel USA' : 'Victory Factory & Speedway USA' }
    ];

    const motoDesc = isReal
      ? `Pieghe al limite, staccate furiose e pieghe gomito a terra. Dalle staccate di gruppo della Moto3 al controllo di potenza della Moto2, fino ai mostri da 1000cc della MotoGP e alla WorldSBK.`
      : `Pieghe al limite, staccate furiose e pieghe gomito a terra. Dalle staccate di gruppo della Moto 3 Junior al controllo di potenza della Moto 2 Intermediate, fino ai mostri da 1000cc della Moto Apex e della Superbike Series.`;

    const motoSteps = [
      { num: '1', title: isReal ? 'Moto3' : 'Moto 3 Junior GP', desc: isReal ? '250cc Leggere e Aggressive' : '250cc Leggere e Aggressive' },
      { num: '2', title: isReal ? 'Moto2' : 'Moto 2 Intermediate', desc: isReal ? 'Motori 765cc e Telaio Rigido' : 'Motori 765cc e Telaio Rigido' },
      { num: '★', premier: true, moto: true, title: isReal ? 'MotoGP 2026' : 'Moto Apex World GP 2026', desc: isReal ? '1000cc Ufficiali Ducati, Aprilia, Yamaha' : '1000cc Bologna Desmo, Noale, Iwata' },
      { num: 'SBK', cls: 'sbk', title: isReal ? 'WorldSBK' : 'Superbike SBK Series', desc: isReal ? 'Superbike Derivate di Serie' : 'Derivate di Serie 1000cc' }
    ];

    const featCalendarTitle = isReal ? 'Calendari Ufficiali 2026' : 'Calendari Mondiali 2026';
    const featCalendarDesc = isReal 
      ? 'Le 24 tappe di F1, 17 di MotoGP, WEC Hypercar e IndyCar. Esplora lunghezza, curve, usura pneumatici, difficoltà di sorpasso e lo storico dei vincitori.'
      : 'Le 24 tappe di Formula Apex, 17 di Moto Apex, Hypercar Endurance e Speedway USA. Esplora lunghezza, curve, usura pneumatici, difficoltà di sorpasso e lo storico dei vincitori.';

    const featGoatDesc = isReal
      ? 'Un punteggio oggettivo misura la tua eredità contro mostri sacri come Michael Schumacher, Valentino Rossi, Lewis Hamilton, Ayrton Senna e Marc Márquez.'
      : 'Un punteggio oggettivo misura la tua eredità contro leggende eterne come Il Barone Rosso, Il Dottore, Sir Lewis, Il Mago di San Paolo e La Formica Atomica.';

    const spotlight1Title = isReal ? 'Cadillac Formula 1 Team (TWG)' : 'General Motors American Dream (TWG)';
    const spotlight1Desc = isReal
      ? `L'undicesima scuderia debutta in Formula 1 con motorizzazione Ferrari e la coppia esperta formata da <strong>Sergio Pérez</strong> e <strong>Valtteri Bottas</strong>.`
      : `L'undicesima scuderia debutta nel mondiale con motorizzazione Cavallino e la coppia formata da <strong>Checo Ministro Americano</strong> e <strong>Valtteri Baffo Bottas</strong>.`;

    const spotlight2Title = isReal ? 'Audi Revolut F1 Team' : 'Audi German Ring Factory';
    const spotlight2Desc = isReal
      ? `Completata l'acquisizione di Sauber, la casa dei quattro cerchi entra ufficialmente in griglia con <strong>Nico Hülkenberg</strong> e la giovane stella <strong>Gabriel Bortoleto</strong>.`
      : `Completata la transizione con Sauber, la prestigiosa casa tedesca scende in pista con <strong>Nico Il Pompiere</strong> e la giovane promessa <strong>Gabriel Carioca</strong>.`;

    const spotlight3Title = isReal ? 'Hamilton in Rosso Ferrari' : 'Sir Lewis in Rosso Cavallino';
    const spotlight3Desc = isReal
      ? `Lewis Hamilton affronta la stagione in tuta Scuderia Ferrari al fianco di Charles Leclerc, mentre Lando Norris difende l'iride col #1 in McLaren.`
      : `Sir Lewis Spamilton affronta la stagione in tuta Scuderia Cavallino al fianco di Charles Predestinato, mentre Lando Porris difende il titolo con Papaya Rocket.`;

    const spotlight4Title = isReal ? 'Marc Márquez in Ducati Factory & Toprak' : 'La Formica Atomica in Bologna Desmo & Toprak';
    const spotlight4Desc = isReal
      ? `Marc Márquez veste il rosso Ducati Lenovo insieme a Pecco Bagnaia, mentre il re del WorldSBK Toprak Razgatlıoğlu debutta in MotoGP con Prima Pramac Yamaha.`
      : `Marc La Formica Atomica veste il rosso Bologna Desmo insieme a Pecco Nuvola Rossa, mentre il funambolo Toprak debutta nella classe regina con Pramac Factory.`;

    container.innerHTML = `
      <div class="landing-page-root">
        <!-- HERO SECTION CINEMATOGRAFICA -->
        <section class="landing-hero">
          <div class="landing-hero-backdrop"></div>
          
          <div class="landing-hero-container">
            <div class="hero-top-badge">
              <span class="pulse-dot"></span>
              <span>${badgeText}</span>
            </div>

            <h1 class="landing-main-title">
              <span class="title-sub">IL NUOVO</span>
              <span class="title-gold">GOAT</span>
              <span class="title-discipline">MOTORSPORT CAREER</span>
            </h1>

            <p class="landing-lead-text">
              ${heroLeadText}
            </p>

            <!-- CALL TO ACTION RAPIDE -->
            <div class="landing-cta-group">
              ${hasSave ? `
                <button id="landing-btn-continue" class="landing-cta-btn primary pulse-glow">
                  <span class="cta-icon">▶</span>
                  <div class="cta-text-box">
                    <strong>CONTINUA CARRIERA</strong>
                    <small>${player.firstName} ${player.lastName} (${player.ovr} OVR) • ${team ? team.displayName : 'Scuderia'}</small>
                  </div>
                </button>
                <button id="landing-btn-new-career" class="landing-cta-btn secondary">
                  <span class="cta-icon">⚡</span>
                  <div class="cta-text-box">
                    <strong>NUOVA CARRIERA</strong>
                    <small>Crea un nuovo pilota da zero</small>
                  </div>
                </button>
              ` : `
                <button id="landing-btn-start" class="landing-cta-btn primary pulse-glow">
                  <span class="cta-icon">🚀</span>
                  <div class="cta-text-box">
                    <strong>INIZIA LA TUA CARRIERA</strong>
                    <small>Crea il tuo pilota, casco e scegli Auto o Moto</small>
                  </div>
                </button>
              `}
            </div>

            <!-- STATISTICHE CHIAVE IN EVIDENZA -->
            <div class="landing-key-stats">
              <div class="key-stat-box">
                <span class="stat-number">11</span>
                <span class="stat-label">${stat1Label}</span>
              </div>
              <div class="key-stat-box">
                <span class="stat-number">24+17</span>
                <span class="stat-label">${stat2Label}</span>
              </div>
              <div class="key-stat-box">
                <span class="stat-number">2</span>
                <span class="stat-label">Discipline a Scelta: Auto o Moto</span>
              </div>
              <div class="key-stat-box">
                <span class="stat-number">100%</span>
                <span class="stat-label">Simulazione Telemetria & Strategia Box</span>
              </div>
            </div>
          </div>
        </section>

        <!-- SEZIONE DUE DISCIPLINE -->
        <section class="landing-section disciplines-section">
          <div class="section-header-box">
            <span class="section-tag">DUE MONDI, UN'UNICA GLORIA</span>
            <h2 class="section-heading">SCEGLI LA TUA STRADA NEL MOTORSPORT</h2>
            <p class="section-desc">Due percorsi di carriera completamente indipendenti, con fisiche dedicate, categorie propedeutiche e calendari realistici.</p>
          </div>

          <div class="disciplines-grid">
            <!-- SCHEDA AUTO -->
            <div class="discipline-card auto-card">
              <div class="card-accent-strip red"></div>
              <div class="discipline-card-header">
                <span class="disc-icon">🏎️</span>
                <div>
                  <h3 class="disc-title">AUTOMOBILISMO</h3>
                  <span class="disc-subtitle">Monoposto & Prototipi</span>
                </div>
              </div>
              <p class="disc-body">${autoDesc}</p>
              
              <div class="ladder-steps">
                ${autoSteps.map(step => `
                  <div class="ladder-step ${step.premier ? 'premier' : ''} ${step.cls || ''}">
                    <span class="step-num">${step.num}</span> 
                    <strong>${step.title}</strong> 
                    <small>${step.desc}</small>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- SCHEDA MOTO -->
            <div class="discipline-card moto-card">
              <div class="card-accent-strip blue"></div>
              <div class="discipline-card-header">
                <span class="disc-icon">🏍️</span>
                <div>
                  <h3 class="disc-title">MOTOCICLISMO</h3>
                  <span class="disc-subtitle">Prototipi da Gran Premio</span>
                </div>
              </div>
              <p class="disc-body">${motoDesc}</p>

              <div class="ladder-steps">
                ${motoSteps.map(step => `
                  <div class="ladder-step ${step.premier ? 'premier moto' : ''} ${step.cls || ''}">
                    <span class="step-num">${step.num}</span> 
                    <strong>${step.title}</strong> 
                    <small>${step.desc}</small>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </section>

        <!-- SEZIONE SPEZZETTAMENTO DELLE AREE DI GIOCO -->
        <section class="landing-section features-overview-section">
          <div class="section-header-box">
            <span class="section-tag">ESPERIENZA PROFESSIONALE</span>
            <h2 class="section-heading">TUTTI GLI ASPETTI DELLA CARRIERA AL TUO COMANDO</h2>
            <p class="section-desc">Niente schermate caotiche e confuse. Ogni elemento della tua carriera è organizzato in sezioni dedicate ad altissima fedeltà.</p>
          </div>

          <div class="features-grid">
            <div class="feature-card">
              <div class="feat-icon">🏠</div>
              <h4 class="feat-title">Paddock Hub & Race Control</h4>
              <p class="feat-desc">Il centro nevralgico tra una gara e l'altra. Meteo, telemetria tracciato, radio box e la sfida all'ultimo decimo con il tuo compagno di scuderia.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">📅</div>
              <h4 class="feat-title">${featCalendarTitle}</h4>
              <p class="feat-desc">${featCalendarDesc}</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">📊</div>
              <h4 class="feat-title">Classifiche & Campionato</h4>
              <p class="feat-desc">Graduatorie mondiali Piloti e Costruttori dettagliate con grafici di punti, vittorie, podi e gap dal leader sempre aggiornati.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">⚙️</div>
              <h4 class="feat-title">Reparto Corse & Garage R&D</h4>
              <p class="feat-desc">Sviluppa la tua monoposto o moto: Galleria del Vento, Banco Motore Power Unit, Telaio & Sospensioni e Affidabilità Meccanica.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">⏱️</div>
              <h4 class="feat-title">Weekend di Gara Realistico</h4>
              <p class="feat-desc">Prove Libere con bilanciamento setup, Qualifiche a eliminazione Q1-Q3 al centesimo di secondo e Gara con strategie gomme, meteo dinamico e Safety Car.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">💼</div>
              <h4 class="feat-title">Mercato Piloti & Contratti</h4>
              <p class="feat-desc">Tratta stipendi, bonus vittoria e clausole di prima guida. Scala le gerarchie e ricevi offerte dai top team mondiali.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">🏛️</div>
              <h4 class="feat-title">Lifestyle & Sponsor Personali</h4>
              <p class="feat-desc">Gestisci i tuoi guadagni tra simulatori di guida, palestre d'élite, contratti pubblicitari e proprietà di lusso a Monte Carlo.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">👑</div>
              <h4 class="feat-title">Algoritmo GOAT Hall of Fame</h4>
              <p class="feat-desc">${featGoatDesc}</p>
            </div>
          </div>
        </section>

        <!-- SEZIONE FOCUS GRIGLIA 2026 -->
        <section class="landing-section season2026-spotlight">
          <div class="section-header-box">
            <span class="section-tag">AGGIORNAMENTO SETTEMBRE 2026</span>
            <h2 class="section-heading">LE GRANDI NOVITÀ DEL MONDIALE 2026</h2>
            <p class="section-desc">Roster, cambi di casacca e nuovi team ufficiali integrati al 100%.</p>
          </div>

          <div class="spotlight-grid">
            <div class="spotlight-card">
              <div class="spotlight-header">
                <span class="spot-flag">🇺🇸</span>
                <strong>${spotlight1Title}</strong>
              </div>
              <p>${spotlight1Desc}</p>
            </div>

            <div class="spotlight-card">
              <div class="spotlight-header">
                <span class="spot-flag">🇩🇪</span>
                <strong>${spotlight2Title}</strong>
              </div>
              <p>${spotlight2Desc}</p>
            </div>

            <div class="spotlight-card">
              <div class="spotlight-header">
                <span class="spot-flag">🇮🇹</span>
                <strong>${spotlight3Title}</strong>
              </div>
              <p>${spotlight3Desc}</p>
            </div>

            <div class="spotlight-card">
              <div class="spotlight-header">
                <span class="spot-flag">🏍️</span>
                <strong>${spotlight4Title}</strong>
              </div>
              <p>${spotlight4Desc}</p>
            </div>
          </div>
        </section>

        <!-- FOOTER LANDING -->
        <footer class="landing-footer">
          <div class="footer-content">
            <div class="footer-logo clickable-home-logo" id="footer-logo-home" title="Torna all'inizio">
              <span class="goat-badge">GOAT</span>
              <span class="logo-title">MOTORSPORT EDITION 2026</span>
            </div>
            <p class="footer-text">Ispirato a ilnuovogoat.it — Simulatore di carriera completo per appassionati di corse.</p>
            <div class="footer-actions">
              <button id="footer-btn-start" class="btn-footer-cta">
                ${hasSave ? 'Continua la tua Carriera ➔' : 'Avvia Nuova Carriera ➔'}
              </button>
            </div>
          </div>
        </footer>
      </div>
    `;

    this.bindEvents(container, onNavigate, onOpenModManager);
  }

  static bindEvents(container, onNavigate, onOpenModManager) {
    const footerLogo = container.querySelector('#footer-logo-home');
    if (footerLogo) {
      footerLogo.onclick = () => {
        sound.playClick();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    }

    const continueBtn = container.querySelector('#landing-btn-continue');
    if (continueBtn) {
      continueBtn.onclick = () => {
        sound.playEngineRev();
        onNavigate('dashboard');
      };
    }

    const startBtn = container.querySelector('#landing-btn-start');
    if (startBtn) {
      startBtn.onclick = () => {
        sound.playEngineRev();
        onNavigate('creation');
      };
    }

    const newCareerBtn = container.querySelector('#landing-btn-new-career');
    if (newCareerBtn) {
      newCareerBtn.onclick = () => {
        ToastNotification.confirm({
          title: "Iniziare una Nuova Carriera?",
          message: "La carriera corrente verrà sovrascritta. Vuoi procedere con la creazione di un nuovo pilota?",
          confirmText: "Crea Nuovo Pilota",
          cancelText: "Annulla",
          danger: true,
          onConfirm: () => {
            career.resetCareer();
            ToastNotification.show("Carriera azzerata. Benvenuto nella schermata di creazione!", "info");
            onNavigate('creation');
          }
        });
      };
    }

    const footerBtn = container.querySelector('#footer-btn-start');
    if (footerBtn) {
      footerBtn.onclick = () => {
        sound.playClick();
        if (career.hasActiveCareer()) {
          onNavigate('dashboard');
        } else {
          onNavigate('creation');
        }
      };
    }
  }
}
