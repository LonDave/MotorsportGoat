import { career } from '../engine/careerEngine.js';
import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';
import { ToastNotification } from './toastNotification.js';
import { SaveManagerModal } from './saveManagerModal.js';

export class LandingView {
  static render(container, onNavigate, onOpenModManager) {
    const hasSave = career.hasActiveCareer() || career.hasAnySavedCareer();
    const player = career.hasActiveCareer() ? career.player : null;
    const careerData = career.hasActiveCareer() ? career.career : null;
    const team = (player && careerData) 
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
        category: "SCALATA DELLA CARRIERA & DISCIPLINE",
        icon: "🏁",
        title: "Dalle Formule Giovanili al Titolo Iridato",
        desc: isReal
          ? "Scegli il tuo percorso tra Automobilismo (Formula 4, Formula 3, Formula 2, Formula 1 con 11 scuderie, WEC Hypercar e IndyCar) o Motociclismo (Moto3, Moto2, MotoGP e WorldSBK). Guadagna punti Superlicenza, soddisfa la dirigenza e domina per ricevere offerte di promozione nelle classi regine del motorsport."
          : "Scegli il tuo percorso tra Automobilismo (Formula 4 Regional, Formula 3 International, Formula 2 World Series, Formula Apex con 11 scuderie, Hypercar Endurance e Speedway USA) o Motociclismo (Moto 3 Junior, Moto 2 Intermediate, Moto Apex e Superbike SBK). Guadagna punti Superlicenza, soddisfa la dirigenza e domina per ricevere offerte di promozione nelle classi regine del motorsport.",
        tips: [
          { title: "⭐ Promozioni & Superlicenza", text: "Conquistare il podio mondiale o il titolo di categoria sblocca immediatamente le chiamate dei top team della classe superiore." },
          { title: "📈 Progressione Abilità & OVR", text: "I punti abilità assegnati ad ogni weekend migliorano Giro Secco, Staccata, Gestione Gomme, Costanza, Bagnato e Telemetria." }
        ]
      },
      {
        id: 2,
        category: "ASSETTO & TELEMETRIA PROVE LIBERE",
        icon: "🛠️",
        title: "Il Bilanciamento Ottimale Nelle Prove Libere",
        desc: isReal
          ? "Nelle sessioni di Prove Libere (FP1-FP3 nei weekend standard; solo FP1 nei weekend Sprint F1), scendi in pista per mettere a punto Carico Aerodinamico, Rigidità Sospensioni e Rapportatura del Cambio. Il feedback degli ingegneri ti guiderà verso il 100% di bilanciamento."
          : "Nelle sessioni di Prove Libere (FP1-FP3 nei weekend standard; solo FP1 nei weekend Sprint Apex), scendi in pista per mettere a punto Carico Aerodinamico, Rigidità Sospensioni e Rapportatura del Cambio. Il feedback degli ingegneri ti guiderà verso il 100% di bilanciamento.",
        tips: [
          { title: "🎯 100% Bilanciamento Assetto", text: "Un setup perfetto regala fino a 3 decimi di secondo di vantaggio sul giro e riduce il degrado degli pneumatici in gara fino al 30%." },
          { title: "🧪 Test Mescole Pneumatici", text: "Effettuare long run nelle prove libere svela il degrado al giro delle mescole slick e bagnate per impostare la strategia ideale." }
        ]
      },
      {
        id: 3,
        category: "QUALIFICHE SHOOTOUT & POLE POSITION",
        icon: "⏱️",
        title: "Il Giro Secco Perfetto nei Minuti Decisivi",
        desc: isReal
          ? "Affronta il format a eliminazione Q1, Q2 e la sparata finale Q3 per la pole position. Gestisci con furbizia il tempo della sessione: uscire negli ultimissimi minuti sfrutta l'evoluzione della gommatura dell'asfalto e il traino delle scie avversarie."
          : "Affronta il format a eliminazione Q1, Q2 e la sparata finale Q3 per la pole position. Gestisci con furbizia il tempo della sessione: uscire negli ultimissimi minuti sfrutta l'evoluzione della gommatura dell'asfalto e il traino delle scie avversarie.",
        tips: [
          { title: "⚡ Timing Negli Shootout", text: "Tieni un set di gomme soft nuove per gli ultimi secondi del Q3 quando la pista offre il massimo grip e la temperatura è ottimale." },
          { title: "👑 Bonus Pole GOAT", text: "Partire in pole position garantisce aria pulita in Curva 1, minimizza il rischio di contatti al via e incrementa il punteggio GOAT." }
        ]
      },
      {
        id: 4,
        category: "STRATEGIA DI GARA, METEO & SAFETY CAR",
        icon: "🛑",
        title: "Gestione Gomme, Undercut e Neutralizzazioni",
        desc: isReal
          ? "Durante il Gran Premio, monitora costantemente l'usura del battistrada e l'evoluzione meteo. Ricorda l'obbligo regolamentare di utilizzare almeno due mescole slick asciutte differenti (C1-C5). In caso di acquazzone improvviso, passa tempestivamente a gomme Intermedie o Full Wet."
          : "Durante il Gran Premio, monitora costantemente l'usura del battistrada e l'evoluzione meteo. Ricorda l'obbligo regolamentare di utilizzare almeno due mescole slick asciutte differenti. In caso di acquazzone improvviso, passa tempestivamente a gomme Intermedie o Full Wet.",
        tips: [
          { title: "⚡ Mossa Undercut vs Overcut", text: "Fermarsi un giro prima del rivale con gomma fresca consente di scavalcarlo all'uscita dai box prima che le sue gomme calino." },
          { title: "🚨 Finestra di Safety Car", text: "Approfitta delle neutralizzazioni per effettuare pit stop: il delta tempo perso in corsia box è dimezzato rispetto alla bandiera verde." }
        ]
      },
      {
        id: 5,
        category: "REPARTO CORSE R&D & SUB-COMPONENTI",
        icon: "⚙️",
        title: "Ingegneria di Fabbrica & Breakthrough Tecnologici",
        desc: isReal
          ? "Sviluppa la monoposto nei 4 dipartimenti e nei dettagliati sub-componenti (Ala Anteriore, Ala Posteriore, Fondo Venturi, Motore Termico ICE, Ibrido ERS, Telaio e Affidabilità). Investi i Punti Telemetria (PT) e il budget per sbloccare salti prestazionali epocali."
          : "Sviluppa il mezzo nei 4 dipartimenti e nei dettagliati sub-componenti (Ala Anteriore, Ala Posteriore, Fondo Venturi, Motore Termico, Sistema ERS, Telaio e Affidabilità). Investi i Punti Telemetria (PT) e il budget per sbloccare salti prestazionali epocali.",
        tips: [
          { title: "💡 Breakthrough Tecnologico", text: "Ogni sviluppo completato ha una probabilità di generare una scoperta rivoluzionaria con un guadagno di decimi doppio e gratuito." },
          { title: "🛡️ Protezione Anti-DNF", text: "Potenziare l'affidabilità meccanica azzera il rischio di ritiri per noie al motore, all'idraulica o al cambio nelle fasi calde del GP." }
        ]
      },
      {
        id: 6,
        category: "COMPAGNO DI SCUDERIA & SVILUPPO CONGIUNTO",
        icon: "🤝",
        title: "Telemetria Condivisa & Duello Interno H2H",
        desc: isReal
          ? "Nel motorsport la prima regola è battere chi guida la tua stessa vettura, ma il compagno è anche la tua prima risorsa. I suoi dati telemetrici e il suo feedback tecnico contribuiscono attivamente allo sviluppo di fabbrica della scuderia."
          : "Nel motorsport la prima regola è battere chi guida il tuo stesso veicolo, ma il compagno è anche la tua prima risorsa. I suoi dati telemetrici e il suo feedback tecnico contribuiscono attivamente allo sviluppo di fabbrica della scuderia.",
        tips: [
          { title: "🏭 Sviluppo di Fabbrica Continuo", text: "Anche tra una gara e l'altra la scuderia progredisce grazie ai dati combinati di entrambi i piloti, mantenendo il passo con i top team AI." },
          { title: "⚔️ Gerarchia di Prima Guida", text: "Battere il compagno nei confronti diretti H2H consolida la fiducia della dirigenza, evita tagli di stipendio e dà priorità sui nuovi pacchetti." }
        ]
      },
      {
        id: 7,
        category: "RIVALITÀ PADDOCK & CONFERENZE STAMPA",
        icon: "🎙️",
        title: "Interviste ai Media & Guerra Psicologica",
        desc: isReal
          ? "Al termine di qualifiche e gare, affronta i microfoni della stampa internazionale. Le tue dichiarazioni impattano il morale della fabbrica, la fiducia dei dirigenti e alimentano le rivalità stagionali con i piloti che lottano per i tuoi stessi obiettivi."
          : "Al termine di qualifiche e gare, affronta i microfoni della stampa internazionale. Le tue dichiarazioni impattano il morale della fabbrica, la fiducia dei dirigenti e alimentano le rivalità stagionali con i piloti che lottano per i tuoi stessi obiettivi.",
        tips: [
          { title: "🎙️ Gestione delle Risposte", text: "Lodare la squadra aumenta la motivazione dei tecnici; pungolare la scuderia aumenta la pressione ma richiede risultati immediati." },
          { title: "🔥 Punti Rivalità GOAT", text: "Lanciare guanti di sfida al rivale designato e batterlo in pista moltiplica il punteggio carisma e la tua reputazione storica." }
        ]
      },
      {
        id: 8,
        category: "MERCATO PILOTI, CLAUSOLE & SVINCOLATI",
        icon: "💼",
        title: "Trattative Contrattuali, Buyout & Scelta Lineup",
        desc: isReal
          ? "Gestisci il tuo futuro professionale come un vero manager: firma contratti annuali o biennali (+15% stipendio e stabilità). In caso di addio anticipato è attiva la clausola di rescissione (buyout). Se firmi per un team al completo, sceglierai personalmente il tuo compagno di squadra!"
          : "Gestisci il tuo futuro professionale come un vero manager: firma contratti annuali o biennali (+15% stipendio e stabilità). In caso di addio anticipato è attiva la clausola di rescissione (buyout). Se firmi per un team al completo, sceglierai personalmente il tuo compagno di squadra!",
        tips: [
          { title: "👥 Scelta del Compagno", text: "Quando ti unisci a una scuderia con sedili già occupati, decidi chi affiancare e chi rimpiazzare nel roster ufficiale." },
          { title: "🆓 Mercato Piloti Svincolati", text: "Esplora i Free Agents: campioni senza sedile pronti a subentrare nei team che cercano rilancio o sostituzioni a stagione in corso." }
        ]
      },
      {
        id: 9,
        category: "CICLI REGOLAMENTARI FIA, RITIRI & REGEN",
        icon: "🔄",
        title: "Rivoluzioni Tecniche & Nuove Leggende Nascenti",
        desc: isReal
          ? "Il motorsport non si ferma mai. Ogni 3-4 anni la Federazione introduce una rivoluzione tecnica regolamentare che rimescola le forze in campo. A fine stagione i piloti veterani si ritirano e lasciano il posto a giovani promesse Regen ispirate ai grandi della storia con tratti genetici unici."
          : "Il motorsport non si ferma mai. Ogni 3-4 anni la Federazione introduce una rivoluzione tecnica regolamentare che rimescola le forze in campo. A fine stagione i piloti veterani si ritirano e lasciano il posto a giovani promesse Regen ispirate ai grandi della storia con tratti genetici unici.",
        tips: [
          { title: "🔄 Rivoluzione Regolamentare", text: "Accumula budget e Punti Telemetria negli anni di transizione per presentarti al nuovo ciclo regolamentare con un vantaggio devastante." },
          { title: "⭐ Tratti DNA Regen", text: "I giovani prodigi promossi dalle academy possiedono tratti speciali (DNA da Qualifica, Maestro del Bagnato, Guerriero dei Duelli) ispirati alle leggende." }
        ]
      },
      {
        id: 10,
        category: "INDICE GOAT, HALL OF FAME & LIFESTYLE HQ",
        icon: "👑",
        title: "La Caccia al Titolo di Migliore di Sempre",
        desc: isReal
          ? "Un algoritmo oggettivo valuta la tua eredità sportiva: vittorie, titoli, pole position, podi, dominanza percentuale e longevità a confronto con mostri sacri come Michael Schumacher, Valentino Rossi, Lewis Hamilton, Ayrton Senna e Marc Márquez."
          : "Un algoritmo oggettivo valuta la tua eredità sportiva: vittorie, titoli, pole position, podi, dominanza percentuale e longevità a confronto con leggende eterne come Il Barone Rosso, Il Dottore, Sir Lewis, Il Mago di San Paolo e La Formica Atomica.",
        tips: [
          { title: "🏰 Lifestyle & Quartier Generale", text: "Investi i premi gara in simulatori di guida professionali, personal trainer, contratti sponsor e residenze a Monte Carlo per gonfiare il tuo prestigio." },
          { title: "🏆 Titoli con Costruttori Differenti", text: "Vincere il Campionato Mondiale con scuderie diverse conferisce un moltiplicatore d'onore nel ranking della Hall of Fame." }
        ]
      },
      {
        id: 11,
        category: "GESTIONE SALVATAGGI & MOD NOMI REALI 2026",
        icon: "💾",
        title: "Salvataggi Multi-Slot & Personalizzazione Totale",
        desc: isReal
          ? "Goditi la massima libertà di gioco con 3 slot di salvataggio indipendenti e la funzione di esportazione/importazione in file .json. Tramite il Mod Manager integrato puoi passare istantaneamente dai nomi fittizi a quelli reali 2026 (Ferrari, Ducati, Red Bull, Cadillac, Audi, Hamilton, Bagnaia...) o modificare qualsiasi nome a piacimento."
          : "Goditi la massima libertà di gioco con 3 slot di salvataggio indipendenti e la funzione di esportazione/importazione in file .json. Tramite il Mod Manager integrato puoi passare istantaneamente dai nomi fittizi a quelli reali 2026 (Ferrari, Ducati, Red Bull, Cadillac, Audi, Hamilton, Bagnaia...) o modificare qualsiasi nome a piacimento.",
        tips: [
          { title: "💾 Backup Sicuro (.json)", text: "Esporta la tua carriera sul computer in un click per avere sempre un backup sicuro e condividerla tra dispositivi differenti." },
          { title: "🎨 Mod Manager Dinamico", text: "Attiva o disattiva il database ufficiale 2026 in qualsiasi momento: l'intero circus, il paddock e i mercati si aggiornano all'istante!" }
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
                    <small>${player ? `${player.firstName} ${player.lastName} (${player.ovr} OVR) • ${team ? team.displayName : 'Scuderia'}` : 'Carica una carriera salvata'}</small>
                  </div>
                </button>
                <button id="landing-btn-new-career" class="landing-cta-btn secondary">
                  <span class="cta-icon">⚡</span>
                  <div class="cta-text-box">
                    <strong>NUOVA CARRIERA</strong>
                    <small>Crea un pilota in un nuovo slot</small>
                  </div>
                </button>
                <button id="landing-btn-saves" class="landing-cta-btn tertiary" style="background: rgba(14, 165, 233, 0.12); border: 1px solid rgba(14, 165, 233, 0.4); color: #38bdf8;">
                  <span class="cta-icon">💾</span>
                  <div class="cta-text-box">
                    <strong>GESTIONE SALVATAGGI</strong>
                    <small>3 Slot & Backup (.json)</small>
                  </div>
                </button>
                <button id="landing-btn-goat" class="landing-cta-btn goat-btn" style="background: rgba(234, 179, 8, 0.12); border: 1px solid rgba(234, 179, 8, 0.4); color: #facc15;">
                  <span class="cta-icon">👑</span>
                  <div class="cta-text-box">
                    <strong>GOAT HALL OF FAME</strong>
                    <small>Classifica Storica & Indice GOAT</small>
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
                <button id="landing-btn-saves" class="landing-cta-btn secondary" style="background: rgba(14, 165, 233, 0.12); border: 1px solid rgba(14, 165, 233, 0.4); color: #38bdf8;">
                  <span class="cta-icon">💾</span>
                  <div class="cta-text-box">
                    <strong>IMPORTA / GESTISCI SALVATAGGI</strong>
                    <small>Carica backup file (.json) o slot</small>
                  </div>
                </button>
                <button id="landing-btn-goat" class="landing-cta-btn goat-btn" style="background: rgba(234, 179, 8, 0.12); border: 1px solid rgba(234, 179, 8, 0.4); color: #facc15;">
                  <span class="cta-icon">👑</span>
                  <div class="cta-text-box">
                    <strong>GOAT HALL OF FAME</strong>
                    <small>Classifica Storica & Indice GOAT</small>
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
              <p class="feat-desc">Il centro nevralgico della carriera: meteo, telemetria del tracciato, comunicazioni radio box, fiducia della dirigenza e sfida interna con il compagno di scuderia.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">📅</div>
              <h4 class="feat-title">${featCalendarTitle}</h4>
              <p class="feat-desc">${featCalendarDesc}</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">📊</div>
              <h4 class="feat-title">Classifiche & Campionato</h4>
              <p class="feat-desc">Graduatorie mondiali Piloti e Costruttori dettagliate in tempo reale, con storico gare, vittorie, podi, pole position e distacchi di classifica.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">⚙️</div>
              <h4 class="feat-title">Reparto Corse R&D & Sub-Componenti</h4>
              <p class="feat-desc">Sviluppa Ali, Fondo Venturi, Motore Termico ICE, Ibrido ERS, Telaio e Sospensioni. Accumula Punti Telemetria (PT) e sblocca Breakthrough tecnologici clamorosi.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">⏱️</div>
              <h4 class="feat-title">Weekend di Gara Realistico</h4>
              <p class="feat-desc">Prove Libere con bilanciamento setup, Qualifiche a eliminazione Q1-Q3 al centesimo di secondo e Gara con strategie gomme, meteo dinamico e Safety Car.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">🤝</div>
              <h4 class="feat-title">Telemetria Condivisa & Fabbrica</h4>
              <p class="feat-desc">Il tuo compagno di squadra collabora allo sviluppo: la sua telemetria apporta miglioramenti continui alla vettura tra una gara e l'altra.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">🎙️</div>
              <h4 class="feat-title">Interviste Media & Rivalità Paddock</h4>
              <p class="feat-desc">Affronta le domande insidiose della stampa nel dopogara, gestisci il morale del team e alimenta accese rivalità psicologiche con i tuoi avversari diretti.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">💼</div>
              <h4 class="feat-title">Mercato Piloti, Buyout & Free Agents</h4>
              <p class="feat-desc">Tratta stipendi, accordi annuali o biennali, clausole di rescissione e scegli chi affiancare come compagno quando ti unisci a un nuovo team.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">🔄</div>
              <h4 class="feat-title">Regolamenti FIA, Ritiri & Regens</h4>
              <p class="feat-desc">Rivoluzioni tecniche cicliche ogni 3-4 anni per rimescolare i valori in pista, ritiri di vecchie glorie e nascita di prodigi Regen con tratti speciali unici.</p>
            </div>

            <div class="feature-card">
              <div class="feat-icon">👑</div>
              <h4 class="feat-title">Algoritmo GOAT Hall of Fame & Lifestyle</h4>
              <p class="feat-desc">${featGoatDesc} Investi in simulatori personali e proprietà a Monte Carlo per consacrare il tuo status da leggenda.</p>
            </div>
          </div>
        </section>

        <!-- SEZIONE TUTORIAL & GUIDE STRATEGICHE EVERGREEN -->
        <section class="landing-section tutorial-carousel-section">
          <div class="section-header-box">
            <span class="section-tag">ACCADEMIA PILOTI & STRATEGIA</span>
            <h2 class="section-heading">GUIDA RAPIDA AL GIOCO</h2>
            <p class="section-desc">Tutto ciò che devi sapere per dominare la pista, sviluppare il veicolo, gestire il team e scalare la Hall of Fame mondiale.</p>
          </div>

          <div class="tutorial-carousel-container" id="tutorial-carousel">
            <div class="tutorial-carousel-track">
              ${tutorialSlides.map((slide, idx) => `
                <div class="tutorial-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                  <div class="slide-badge-row">
                    <span class="slide-category-pill">
                      <span>${slide.icon}</span> ${slide.category}
                    </span>
                    <span class="slide-counter">${String(idx + 1).padStart(2, '0')} / ${String(tutorialSlides.length).padStart(2, '0')}</span>
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
                  <button class="tutorial-dot ${idx === 0 ? 'active' : ''}" data-slide="${idx}" title="Vai al capitolo ${idx + 1}"></button>
                `).join('')}
              </div>

              <div class="carousel-btn-group">
                <button id="tutorial-prev-btn" class="carousel-nav-btn" title="Capitolo precedente">‹</button>
                <button id="tutorial-next-btn" class="carousel-nav-btn" title="Capitolo successivo">›</button>
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
        sound.playClick();
        const freeSlot = career.getFreeSlot();
        if (freeSlot) {
          ToastNotification.confirm({
            title: `Nuova Carriera nello Slot ${freeSlot}`,
            message: `È disponibile lo Slot ${freeSlot} libero! Vuoi iniziare qui la tua nuova avventura? La tua carriera attuale rimarrà salvata e al sicuro.`,
            confirmText: `Inizia nello Slot ${freeSlot}`,
            cancelText: "Scegli un Altro Slot",
            onConfirm: () => {
              career.setActiveSlot(freeSlot);
              career.player = null;
              career.career = null;
              ToastNotification.show(`Slot ${freeSlot} selezionato. Benvenuto nella creazione pilota!`, "info");
              onNavigate('creation');
            },
            onCancel: () => {
              SaveManagerModal.open((hasLoadedNew) => {
                if (hasLoadedNew) onNavigate('dashboard');
              }, (newSlot) => {
                career.setActiveSlot(newSlot);
                career.player = null;
                career.career = null;
                onNavigate('creation');
              });
            }
          });
        } else {
          ToastNotification.confirm({
            title: "Tutti i 3 Slot Sono Pieni",
            message: "Tutti i 3 slot contengono già una carriera salvata. Apri il Gestore Salvataggi per scegliere quale slot sostituire o esportare prima di iniziare.",
            confirmText: "Apri Gestore Salvataggi",
            cancelText: "Annulla",
            onConfirm: () => {
              SaveManagerModal.open((hasLoadedNew) => {
                if (hasLoadedNew) onNavigate('dashboard');
              }, (newSlot) => {
                career.setActiveSlot(newSlot);
                career.player = null;
                career.career = null;
                onNavigate('creation');
              });
            }
          });
        }
      };
    }

    const savesBtn = container.querySelector('#landing-btn-saves');
    if (savesBtn) {
      savesBtn.onclick = () => {
        sound.playClick();
        SaveManagerModal.open((hasLoadedNew) => {
          if (hasLoadedNew) {
            onNavigate('dashboard');
          }
        }, (newSlot) => {
          career.setActiveSlot(newSlot);
          career.player = null;
          career.career = null;
          onNavigate('creation');
        });
      };
    }

    const goatBtn = container.querySelector('#landing-btn-goat');
    if (goatBtn) {
      goatBtn.onclick = () => {
        sound.playClick();
        onNavigate('goat');
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
