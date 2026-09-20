import { career } from '../engine/careerEngine.js';
import { sound } from '../engine/audioManager.js';
import { ToastNotification } from './toastNotification.js';

export class MediaInterviewModal {
  static open(finishPos, onComplete = () => {}) {
    const existing = document.getElementById('media-interview-modal');
    if (existing) existing.remove();

    const player = career.player;
    const rival = career.getSeasonRival();
    const rivalName = rival ? rival.name : "i tuoi avversari diretti";
    const isWin = finishPos === 1;
    const isPodium = finishPos <= 3;
    const isPoints = finishPos <= 10;
    const isDnf = finishPos > 20;

    let question = "Gara combattuta oggi nel paddock. Qual è la tua analisi a caldo su quanto visto in pista?";
    if (isWin) {
      question = "🏆 Trionfo magistrale! Una vittoria da cineteca davanti a tutti. A chi dedichi questo successo?";
    } else if (isPodium) {
      question = "🍾 Straordinario podio conquistato con grinta! Quanto conta questo risultato per la stagione?";
    } else if (isDnf) {
      question = "💥 Un Gran Premio terminato anzitempo con un amaro ritiro. Cosa è andato storto là fuori?";
    } else if (isPoints) {
      question = "🏁 Punti pesanti messi in cassaforte oggi al termine di una gara molto serrata. Soddisfatto del bilanciamento?";
    }

    const modal = document.createElement('div');
    modal.className = 'in-game-modal-overlay modal-visible';
    modal.id = 'media-interview-modal';

    modal.innerHTML = `
      <div class="in-game-modal-card media-interview-card">
        <div class="interview-header">
          <div class="media-live-badge">
            <span class="live-dot-pulse"></span>
            LIVE PADDOCK PRESS CONFERENCE • F1 / MOTOGP TV
          </div>
          <h2 class="interview-title">🎙️ Intervista Esclusiva con la Stampa</h2>
          <p class="interview-subtitle">I microfoni delle televisioni internazionali sono puntati su di te. Le tue risposte influenzeranno il morale del team, la pressione dei tecnici e l'hype degli sponsor!</p>
        </div>

        <div class="interview-question-box">
          <div class="journalist-avatar">🎤</div>
          <div class="question-text-content">
            <span class="journalist-tag">Inviato Speciale Sky Sport / Paddock Live:</span>
            <p class="question-quote">"${question}"</p>
          </div>
        </div>

        <div class="interview-options-grid">
          <!-- OPZIONE 1: DIPLOMATICA / TEAM FIRST -->
          <button class="interview-choice-btn team-choice" data-choice="team">
            <div class="choice-head">
              <span class="choice-icon">🤝</span>
              <strong>Elogio alla Scuderia & Meccanici</strong>
            </div>
            <p class="choice-quote">"La macchina era perfetta oggi. Questo risultato è il frutto dell'instancabile lavoro di tutti i ragazzi in fabbrica e ai box."</p>
            <div class="choice-impacts">
              <span class="impact-tag pos">+18 PT Telemetria R&D</span>
              <span class="impact-tag pos">+4% Fiducia Dirigenza</span>
              <span class="impact-tag neutral">Morale Team al Top</span>
            </div>
          </button>

          <!-- OPZIONE 2: CRITICA COSTRUTTIVA / SPONSOR & AMBIZIONE -->
          <button class="interview-choice-btn critical-choice" data-choice="critical">
            <div class="choice-head">
              <span class="choice-icon">🏎️</span>
              <strong>Ambizione & Pressione Tecnica</strong>
            </div>
            <p class="choice-quote">"Ho dato l'anima ma il mezzo deve fare uno step avanti. Se vogliamo vincere il titolo, servono aggiornamenti e più carico subito!"</p>
            <div class="choice-impacts">
              <span class="impact-tag pos">+€12.000 Attenzione Sponsor</span>
              <span class="impact-tag neutral">+3 Notorietà Pilota</span>
              <span class="impact-tag neg">-3% Pressione sui Tecnici</span>
            </div>
          </button>

          <!-- OPZIONE 3: SFIDA DIRETTA AL RIVALE -->
          <button class="interview-choice-btn rival-choice" data-choice="rival">
            <div class="choice-head">
              <span class="choice-icon">🔥</span>
              <strong>Guanto di Sfida a ${rivalName}</strong>
            </div>
            <p class="choice-quote">"In pista non si fanno prigionieri. ${rivalName} pensava di intimidirmi alla staccata, ma ci vediamo alla prossima gara per la rivincita!"</p>
            <div class="choice-impacts">
              <span class="impact-tag pos">+15 Punti Rivalità GOAT</span>
              <span class="impact-tag pos">Hype Globale nel Paddock</span>
              <span class="impact-tag neutral">Accesa la Rivalità Diretta</span>
            </div>
          </button>
        </div>
      </div>
    `;

    modal.querySelectorAll('.interview-choice-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playRadioBeep();
        const choice = btn.dataset.choice;
        const res = career.applyMediaInterviewOutcome(choice);
        modal.remove();
        sound.playClick();
        ToastNotification.show(`🎙️ Dichiarazione rilasciata: ${res.bonusText}`, "success");
        window.dispatchEvent(new CustomEvent('career-data-updated'));
        onComplete();
      };
    });

    document.body.appendChild(modal);
  }
}
