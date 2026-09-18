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

    const heroLeadText = isReal
      ? `Dalle categorie propedeutiche minori al trionfo nel Campionato Mondiale. Vivi l'esperienza manageriale e di guida più completa: <strong>11 scuderie F1 2026</strong> con <strong>Cadillac</strong> e <strong>Audi</strong>, la <strong>MotoGP</strong> dei giganti, telemetria in tempo reale, sviluppo Reparto Corse e la caccia all'indice GOAT contro le leggende della storia.`
      : `Dalle categorie propedeutiche minori al trionfo nel Campionato Mondiale. Vivi l'esperienza manageriale e di guida più completa: <strong>11 scuderie Formula Apex 2026</strong> con <strong>American Dream</strong> e <strong>German Ring</strong>, la <strong>Moto Apex</strong> dei giganti, telemetria in tempo reale, sviluppo Reparto Corse e la caccia all'indice GOAT contro le leggende della storia.`;

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

    const tutorialSlides = [
      {
        id: 1,
        category: "SCALATA DELLA CARRIERA",
        icon: "🏁",
        title: "Dalle Minori alle Classi Regina",
        desc: isReal
          ? "Parti dalle categorie propedeutiche (Formula 4 per le monoposto o Moto3 per le due ruote). Conquista punti, soddisfa le aspettative del team e vinci il titolo iridato per ricevere offerte di promozione in Formula 1, MotoGP, WEC Hypercar e IndyCar."
          : "Parti dalle categorie propedeutiche (Formula 4 Regional per le monoposto o Moto 3 Junior per le due ruote). Conquista punti, soddisfa le aspettative del team e vinci il titolo iridato per ricevere offerte di promozione in Formula Apex, Moto Apex, Hypercar Endurance e Open Wheel USA.",
        tips: [
          { title: "⭐ Promozioni di Fine Anno", text: "Chiudere sul podio mondiale spalanca le porte dei team di categoria superiore." },
          { title: "📈 Progressione OVR", text: "Ogni gara assegna punti abilità per potenziare Velocità, Sorpasso, Calma e Ritmo." }
        ]
      },
      {
        id: 2,
        category: "ASSETTO & TELEMETRIA",
        icon: "🛠️",
        title: "Il Bilanciamento Nelle Prove Libere",
        desc: isReal
          ? "Nelle sessioni di Prove Libere (FP1, FP2, FP3 nei weekend standard; solo FP1 nei weekend Sprint F1), metti a punto Carico Aerodinamico, Rigidità delle Sospensioni e Rapportatura del Cambio. Il riscontro dei tecnici ti indicherà la direzione esatta per raggiungere il 100% di bilanciamento."
          : "Nelle sessioni di Prove Libere (FP1, FP2, FP3 nei weekend standard; solo FP1 nei weekend Sprint Apex), metti a punto Carico Aerodinamico, Rigidità delle Sospensioni e Rapportatura del Cambio. Il riscontro dei tecnici ti indicherà la direzione esatta per raggiungere il 100% di bilanciamento.",
        tips: [
          { title: "💡 Conservazione Gomme", text: "Un setup con bilanciamento elevato riduce il degrado degli pneumatici in gara fino al 30%." },
          { title: "⏱️ Pole Position", text: "L'assetto perfetto ti regala i decimi fondamentali per superare i tagli in Qualifica." }
        ]
      },
      {
        id: 3,
        category: "STRATEGIA DI GARA",
        icon: "🛑",
        title: "Gestione Gomme, Box & Undercut",
        desc: isReal
          ? "Durante la corsa, monitora attentamente l'usura del battistrada e il meteo dinamico. Ricorda che in Formula 1 vige l'obbligo regolamentare di utilizzare almeno due mescole slick asciutte differenti. Scegli il momento ideale per il cambio gomme."
          : "Durante la corsa, monitora attentamente l'usura del battistrada e il meteo dinamico. Ricorda che in Formula Apex vige l'obbligo regolamentare di utilizzare almeno due mescole slick asciutte differenti. Scegli il momento ideale per il cambio gomme.",
        tips: [
          { title: "⚡ Mossa Undercut", text: "Fermarsi un giro prima del diretto rivale su gomma nuova consente spesso di sorpassarlo all'uscita dai box." },
          { title: "🚨 Safety Car", text: "Approfitta delle neutralizzazioni per effettuare pit stop risparmiando tempo prezioso rispetto al ritmo di gara." }
        ]
      },
      {
        id: 4,
        category: "INGEGNERIA & SVILUPPO",
        icon: "⚙️",
        title: "Reparto Corse & Potenziamenti R&D",
        desc: isReal
          ? "Investi i premi gara e i bonus sponsor nei 4 dipartimenti tecnici della tua scuderia: Aerodinamica, Banco Motore, Telaio e Affidabilità Meccanica. Ogni livello incrementa il passo sul giro ed elimina i punti deboli della vettura."
          : "Investi i premi gara e i bonus sponsor nei 4 dipartimenti tecnici della tua scuderia Apex: Aerodinamica, Banco Motore, Telaio e Affidabilità Meccanica. Ogni livello incrementa il passo sul giro ed elimina i punti deboli della vettura.",
        tips: [
          { title: "🛡️ Protezione Anti-DNF", text: "Migliorare l'affidabilità minimizza drasticamente il rischio di ritiri improvvisi per guasto tecnico." },
          { title: isReal ? "🏎️ Griglia Prestazionale F1" : "🏎️ Griglia Prestazionale Apex", text: "Controlla la graduatoria del centro sviluppo per portare la scuderia in cima alle gerarchie." }
        ]
      },
      {
        id: 5,
        category: "MERCATO & CONTRATTI",
        icon: "💼",
        title: "Trattative, Accordi e Clausole",
        desc: isReal
          ? "Gestisci il tuo futuro professionale come un vero manager. Valuta le proposte di rinnovo o le offerte delle scuderie rivali di Formula 1, MotoGP, WEC e IndyCar: puoi firmare accordi annuali o biennali (con stipendio maggiorato e bonus vittoria). Se decidi di cambiare prima del termine, dovrai pagare la clausola."
          : "Gestisci il tuo futuro professionale come un vero manager. Valuta le proposte di rinnovo o le offerte delle scuderie rivali di Formula Apex, Moto Apex, Hypercar Endurance e Open Wheel USA: puoi firmare accordi annuali o biennali (con stipendio maggiorato e bonus vittoria). Se decidi di cambiare prima del termine, dovrai pagare la clausola.",
        tips: [
          { title: "🔒 Penale di Rescissione", text: "Abbandonare un contratto pluriennale prima della scadenza richiede il pagamento del riscatto." },
          { title: "🥇 Prima Guida", text: "Il ruolo di prima guida garantisce bonus monetari raddoppiati e priorità nello sviluppo tecnico." }
        ]
      },
      {
        id: 6,
        category: "LEGGENDA EREDITARIA",
        icon: "👑",
        title: "La Caccia all'Indice GOAT Mondiale",
        desc: isReal
          ? "Vincere qualche gara non basta: l'algoritmo GOAT valuta la grandezza della tua eredità storica a confronto con le leggende assolute del motorsport come Schumacher, Hamilton, Rossi e Senna. Conquista Titoli Mondiali, podi e pole position, e acquista proprietà e simulatori a Monte Carlo."
          : "Vincere qualche gara non basta: l'algoritmo GOAT valuta la grandezza della tua eredità storica a confronto con le leggende eterne come Il Barone Rosso, Sir Lewis, Il Dottore e Il Mago di San Paolo. Conquista Titoli Mondiali, podi e pole, e acquista proprietà e simulatori a Monte Carlo.",
        tips: [
          { title: "🏆 Titoli con Più Scuderie", text: isReal ? "Vincere titoli con team F1/MotoGP differenti conferisce un moltiplicatore di punteggio prestigio GOAT." : "Vincere titoli con scuderie Apex differenti conferisce un moltiplicatore di punteggio prestigio GOAT." },
          { title: "🏰 Status da Superstar", text: "Investire nell'HQ personale e nel lifestyle aumenta la tua notorietà e attrae sponsor d'élite." }
        ]
      }
    ];

    container.innerHTML = `
      <div class="landing-page-root">
        <!-- HERO SECTION CINEMATOGRAFICA -->
        <section class="landing-hero">
          <div class="landing-hero-backdrop"></div>
          
          <div class="landing-hero-container">
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

        <!-- SEZIONE TUTORIAL & GUIDE STRATEGICHE EVERGREEN -->
        <section class="landing-section tutorial-carousel-section">
          <div class="section-header-box">
            <span class="section-tag">ACCADEMIA PILOTI & STRATEGIA</span>
            <h2 class="section-heading">GUIDA RAPIDA AL GIOCO</h2>
            <p class="section-desc">Tutto ciò che devi sapere per dominare la pista, sviluppare il veicolo e scalare la Hall of Fame mondiale.</p>
          </div>

          <div class="tutorial-carousel-container" id="tutorial-carousel">
            <div class="tutorial-carousel-track">
              ${tutorialSlides.map((slide, idx) => `
                <div class="tutorial-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                  <div class="slide-badge-row">
                    <span class="slide-category-pill">
                      <span>${slide.icon}</span> ${slide.category}
                    </span>
                    <span class="slide-counter">0${idx + 1} / 0${tutorialSlides.length}</span>
                  </div>

                  <div class="slide-main-content">
                    <div class="slide-text-col">
                      <h3><span>${slide.icon}</span> ${slide.title}</h3>
                      <p class="slide-desc">${slide.desc}</p>
                    </div>

                    <div class="slide-tips-col">
                      ${slide.tips.map(tip => `
                        <div class="slide-tip-box">
                          <strong>${tip.title}</strong>
                          <p>${tip.text}</p>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- CONTROLLI NAVIGAZIONE CAROSELLO -->
            <div class="tutorial-nav-controls">
              <div class="tutorial-dots">
                ${tutorialSlides.map((_, idx) => `
                  <button class="tutorial-dot ${idx === 0 ? 'active' : ''}" data-slide="${idx}" title="Vai al tutorial ${idx + 1}"></button>
                `).join('')}
              </div>

              <div class="carousel-btn-group">
                <button id="tutorial-prev-btn" class="carousel-nav-btn" title="Tutorial precedente">‹</button>
                <button id="tutorial-next-btn" class="carousel-nav-btn" title="Tutorial successivo">›</button>
              </div>
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

    // ==========================================
    // LOGICA INTERATTIVA TUTORIAL CAROUSEL
    // ==========================================
    const carouselEl = container.querySelector('#tutorial-carousel');
    if (carouselEl) {
      const slides = carouselEl.querySelectorAll('.tutorial-slide');
      const dots = carouselEl.querySelectorAll('.tutorial-dot');
      const prevBtn = carouselEl.querySelector('#tutorial-prev-btn');
      const nextBtn = carouselEl.querySelector('#tutorial-next-btn');
      const total = slides.length;
      let currentIndex = 0;
      let autoPlayTimer = null;

      const goToSlide = (newIdx, playSfx = true) => {
        currentIndex = (newIdx + total) % total;
        slides.forEach((s, idx) => {
          s.classList.toggle('active', idx === currentIndex);
        });
        dots.forEach((d, idx) => {
          d.classList.toggle('active', idx === currentIndex);
        });
        if (playSfx) sound.playClick();
      };

      if (prevBtn) {
        prevBtn.onclick = () => {
          stopAutoPlay();
          goToSlide(currentIndex - 1);
        };
      }

      if (nextBtn) {
        nextBtn.onclick = () => {
          stopAutoPlay();
          goToSlide(currentIndex + 1);
        };
      }

      dots.forEach((dot, idx) => {
        dot.onclick = () => {
          stopAutoPlay();
          goToSlide(idx);
        };
      });

      // Supporto Swipe Touch su Smartphone
      let touchStartX = 0;
      let touchEndX = 0;
      carouselEl.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      carouselEl.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 45) {
          stopAutoPlay();
          if (diff > 0) {
            goToSlide(currentIndex + 1); // Swipe sinistra -> successivo
          } else {
            goToSlide(currentIndex - 1); // Swipe destra -> precedente
          }
        }
      }, { passive: true });

      // Auto-play continuo ogni 8 secondi con pausa all'hover
      const startAutoPlay = () => {
        if (!autoPlayTimer) {
          autoPlayTimer = setInterval(() => {
            goToSlide(currentIndex + 1, false);
          }, 8000);
        }
      };

      const stopAutoPlay = () => {
        if (autoPlayTimer) {
          clearInterval(autoPlayTimer);
          autoPlayTimer = null;
        }
      };

      carouselEl.addEventListener('mouseenter', stopAutoPlay);
      carouselEl.addEventListener('mouseleave', startAutoPlay);
      startAutoPlay();
    }
  }
}
