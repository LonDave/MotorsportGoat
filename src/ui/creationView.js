import { HelmetRenderer } from './helmetEditorView.js';
import { career, BACKGROUND_PROFILES } from '../engine/careerEngine.js';
import { db } from '../data/databaseManager.js';
import { sound } from '../engine/audioManager.js';

export class CreationView {
  static render(container, onComplete) {
    const isReal = db.isRealNames;
    const initialOrigin = "prodigy";
    const bgProfile = BACKGROUND_PROFILES[initialOrigin];

    // Stato locale del form di creazione
    const state = {
      discipline: "auto", // "auto" or "moto"
      firstName: "Alessandro",
      lastName: "Veloci",
      nickname: "Il Martello",
      nationality: "ITA",
      number: 77,
      origin: initialOrigin,
      celebration: "burnout",
      helmet: {
        primaryColor: "#e10600",
        secondaryColor: "#ffd000",
        visorColor: "#00d2be",
        pattern: "stripes",
        decal: "star"
      },
      pointsPool: bgProfile.startingPointsPool,
      baseAttributes: { ...bgProfile.baseAttributes },
      attributes: { ...bgProfile.baseAttributes }
    };

    const updatePreview = () => {
      const previewContainer = container.querySelector('#helmet-live-preview');
      if (previewContainer) {
        previewContainer.innerHTML = HelmetRenderer.generateHelmetSvg({
          ...state.helmet,
          number: state.number,
          nationality: state.nationality
        }, 160);
      }

      // Calcola OVR in tempo reale
      const ovrVal = career.calculateOvr(state.attributes);
      const ovrElem = container.querySelector('#live-ovr-tag');
      if (ovrElem) ovrElem.textContent = ovrVal;

      const poolElem = container.querySelector('#points-pool-left');
      if (poolElem) poolElem.textContent = state.pointsPool;

      // Aggiorna controlli stepper: disabilita minus se <= base, disabilita plus se pool == 0
      container.querySelectorAll('.attr-stepper-row').forEach(row => {
        const key = row.dataset.attr;
        const valSpan = row.querySelector('.attr-display-val');
        const baseSpan = row.querySelector('.attr-base-tag');
        const minusBtn = row.querySelector('.attr-btn.minus');
        const plusBtn = row.querySelector('.attr-btn.plus');

        if (valSpan) valSpan.textContent = state.attributes[key];
        if (baseSpan) baseSpan.textContent = `Base: ${state.baseAttributes[key]}`;

        if (minusBtn) {
          // Impossibile togliere punti sotto la base naturale del background!
          minusBtn.disabled = state.attributes[key] <= state.baseAttributes[key];
        }
        if (plusBtn) {
          plusBtn.disabled = state.pointsPool <= 0 || state.attributes[key] >= 85;
        }
      });
    };

    container.innerHTML = `
      <div class="creation-screen-wrapper">
        <div class="creation-header-banner">
          <span class="goat-subtitle">IL NUOVO GOAT • MOTORSPORT EDITION</span>
          <h1 class="creation-main-title">CREA IL TUO PILOTA E DIVENTA UNA LEGGENDA</h1>
          <p class="creation-desc">${isReal ? "Dalle categorie promozionali all'Olimpo della Formula 1 e della MotoGP." : "Dalle categorie promozionali all'Olimpo della Formula Apex e della Moto Apex."} Personalizza ogni dettaglio prima di accendere i motori.</p>
        </div>

        <div class="creation-grid-layout">
          <!-- Colonna Sinistra: Scelta Disciplina & Dati Personali -->
          <div class="creation-card discipline-and-bio">
            <h3 class="card-section-title">1. Scegli la tua Disciplina</h3>
            <div class="discipline-selector-group">
              <label class="discipline-card ${state.discipline === 'auto' ? 'active' : ''}" data-discipline="auto">
                <input type="radio" name="discipline" value="auto" checked style="display:none;">
                <div class="disc-icon">🏎️</div>
                <div class="disc-content">
                  <strong>AUTOMOBILISMO</strong>
                  <span>${isReal ? 'Formula 4 ➔ F3 ➔ F2 ➔ Formula 1 / WEC Hypercar / IndyCar' : 'Formula 4 ➔ F3 ➔ F2 ➔ Formula Apex / Hypercar / Open Wheel'}</span>
                </div>
              </label>

              <label class="discipline-card ${state.discipline === 'moto' ? 'active' : ''}" data-discipline="moto">
                <input type="radio" name="discipline" value="moto" style="display:none;">
                <div class="disc-icon">🏍️</div>
                <div class="disc-content">
                  <strong>MOTOCICLISMO</strong>
                  <span>${isReal ? 'Moto3 ➔ Moto2 ➔ MotoGP (Sprint + GP) / WorldSBK' : 'Moto 3 ➔ Moto 2 ➔ Moto Apex (Sprint + GP) / Superbike'}</span>
                </div>
              </label>
            </div>

            <h3 class="card-section-title" style="margin-top:24px;">2. Identità & Dati Personali</h3>
            <div class="bio-fields-grid">
              <div class="input-field-group">
                <label>Nome</label>
                <input type="text" id="input-first-name" value="${state.firstName}" class="dark-input" maxlength="20">
              </div>

              <div class="input-field-group">
                <label>Cognome</label>
                <input type="text" id="input-last-name" value="${state.lastName}" class="dark-input" maxlength="20">
              </div>

              <div class="input-field-group">
                <label>Soprannome Stampa</label>
                <div class="input-with-action">
                  <input type="text" id="input-nickname" value="${state.nickname}" class="dark-input" maxlength="25">
                  <button id="btn-random-nickname" class="secondary-mini-btn" title="Genera Casuale">🎲</button>
                </div>
              </div>

              <div class="input-field-group">
                <label>Nazionalità</label>
                <select id="select-nationality" class="dark-select">
                  <option value="ITA" selected>🇮🇹 Italia</option>
                  <option value="GBR">🇬🇧 Regno Unito</option>
                  <option value="NLD">🇳🇱 Paesi Bassi</option>
                  <option value="ESP">🇪🇸 Spagna</option>
                  <option value="FRA">🇫🇷 Francia</option>
                  <option value="DEU">🇩🇪 Germania</option>
                  <option value="MCO">🇲🇨 Monaco</option>
                  <option value="USA">🇺🇸 Stati Uniti</option>
                  <option value="AUS">🇦🇺 Australia</option>
                  <option value="JPN">🇯🇵 Giappone</option>
                  <option value="BRA">🇧🇷 Brasile</option>
                  <option value="FIN">🇫🇮 Finlandia</option>
                  <option value="CHE">🇨🇭 Svizzera</option>
                  <option value="ARG">🇦🇷 Argentina</option>
                  <option value="COL">🇨🇴 Colombia</option>
                </select>
              </div>

              <div class="input-field-group">
                <label>Numero di Gara (#2 - #99)</label>
                <input type="number" id="input-number" min="2" max="99" value="${state.number}" class="dark-input highlight-number">
              </div>

              <div class="input-field-group">
                <label>Stile Celebrazione</label>
                <select id="select-celebration" class="dark-select">
                  <option value="burnout">🍩 Burnout & Ciambelle</option>
                  <option value="wheelie">🏍️ Impennata a Candela</option>
                  <option value="jump">🏆 Salto dal Cupolino / Tetto</option>
                  <option value="mechanics">🫂 Tuffo tra i Meccanici</option>
                </select>
              </div>
            </div>

            <h3 class="card-section-title" style="margin-top:24px;">3. Background & Origine</h3>
            <div class="origins-list">
              ${Object.values(BACKGROUND_PROFILES).map(bg => {
                const bgOvr = career.calculateOvr(bg.baseAttributes);
                const isActive = state.origin === bg.id;
                return `
                  <label class="origin-option ${isActive ? 'active' : ''}" data-origin="${bg.id}">
                    <input type="radio" name="origin" value="${bg.id}" ${isActive ? 'checked' : ''} style="display:none;">
                    <div class="origin-header">
                      <div class="origin-badge">${bg.badge}</div>
                      <div class="origin-pills">
                        <span class="origin-pill pill-money">💰 €${bg.startMoney.toLocaleString()}</span>
                        <span class="origin-pill pill-ovr">OVR Base ~${bgOvr}</span>
                      </div>
                    </div>
                    <div class="origin-desc">${bg.desc}</div>
                    <div class="origin-traits">
                      <span class="trait-pro">✅ ${bg.pros}</span>
                      <span class="trait-con">⚠️ ${bg.cons}</span>
                    </div>
                  </label>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Colonna Centro: Editor Visivo Casco & Livrea -->
          <div class="creation-card helmet-customizer-card">
            <h3 class="card-section-title">4. Personalizza Casco & Livrea</h3>
            <div class="preview-stage-box">
              <div id="helmet-live-preview"></div>
              <div class="preview-floating-labels">
                <span class="preview-driver-tag">${state.firstName} ${state.lastName}</span>
                <span class="preview-number-badge">#${state.number}</span>
              </div>
            </div>

            <div class="customizer-controls">
              <div class="control-row">
                <label>Colore Calotta Primario</label>
                <div class="color-picker-palette" data-target="primaryColor">
                  <button class="color-swatch active" style="background:#e10600;" data-color="#e10600"></button>
                  <button class="color-swatch" style="background:#ffd000;" data-color="#ffd000"></button>
                  <button class="color-swatch" style="background:#1e41ff;" data-color="#1e41ff"></button>
                  <button class="color-swatch" style="background:#00d2be;" data-color="#00d2be"></button>
                  <button class="color-swatch" style="background:#ff8000;" data-color="#ff8000"></button>
                  <button class="color-swatch" style="background:#111111;" data-color="#111111"></button>
                  <button class="color-swatch" style="background:#ffffff;" data-color="#ffffff"></button>
                  <button class="color-swatch" style="background:#9c27b0;" data-color="#9c27b0"></button>
                </div>
              </div>

              <div class="control-row">
                <label>Colore Grafica & Dettagli</label>
                <div class="color-picker-palette" data-target="secondaryColor">
                  <button class="color-swatch" style="background:#ffffff;" data-color="#ffffff"></button>
                  <button class="color-swatch active" style="background:#ffd000;" data-color="#ffd000"></button>
                  <button class="color-swatch" style="background:#e10600;" data-color="#e10600"></button>
                  <button class="color-swatch" style="background:#00f0ff;" data-color="#00f0ff"></button>
                  <button class="color-swatch" style="background:#39b54a;" data-color="#39b54a"></button>
                  <button class="color-swatch" style="background:#111111;" data-color="#111111"></button>
                </div>
              </div>

              <div class="control-row">
                <label>Finitura Visiera</label>
                <div class="visor-presets-grid">
                  <button class="visor-btn ${state.helmet.visorColor === '#00d2be' ? 'active' : ''}" data-visor="#00d2be">💎 Cromo Blu</button>
                  <button class="visor-btn ${state.helmet.visorColor === '#ffd000' ? 'active' : ''}" data-visor="#ffd000">✨ Iridata Oro</button>
                  <button class="visor-btn ${state.helmet.visorColor === '#222222' ? 'active' : ''}" data-visor="#222222">🕶️ Fumé Scura</button>
                  <button class="visor-btn ${state.helmet.visorColor === '#ffffff' ? 'active' : ''}" data-visor="#ffffff">🏁 Trasparente</button>
                </div>
              </div>

              <div class="control-row">
                <label>Motivo Grafico Calotta</label>
                <div class="pattern-presets-grid">
                  <button class="pattern-btn ${state.helmet.pattern === 'stripes' ? 'active' : ''}" data-pattern="stripes">🏎️ Strisce Racing</button>
                  <button class="pattern-btn ${state.helmet.pattern === 'lightning' ? 'active' : ''}" data-pattern="lightning">⚡ Saetta Tagliente</button>
                  <button class="pattern-btn ${state.helmet.pattern === 'bicolor' ? 'active' : ''}" data-pattern="bicolor">🎨 Bicolore Bipartito</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Colonna Destra: Attributi & Conferma -->
          <div class="creation-card attributes-card">
            <div class="attr-header-flex">
              <div>
                <h3 class="card-section-title">5. Distribuzione Abilità</h3>
                <span class="pool-hint">Punti da assegnare: <strong id="points-pool-left" class="glow-val">${state.pointsPool}</strong></span>
              </div>
              <div class="live-ovr-box">
                <span class="ovr-text">OVR INIZIALE</span>
                <span id="live-ovr-tag" class="ovr-number">${career.calculateOvr(state.attributes)}</span>
              </div>
            </div>
            <p class="attr-rules-hint">ℹ️ Le abilità partono dai valori base del background scelto. Puoi solo <strong>aggiungere</strong> i punti disponibili (${state.pointsPool} punti rookie) per plasmare il tuo stile. Non è consentito togliere punti sotto la base.</p>

            <div class="attributes-list-stepper">
              ${this.renderAttributeRow("pace", "Giro Secco & Qualifica", "Velocità pura e intertempi", state.attributes.pace, state.baseAttributes.pace)}
              ${this.renderAttributeRow("racecraft", "Staccata & Sorpassi", "Duelli corpo a corpo e bagarre", state.attributes.racecraft, state.baseAttributes.racecraft)}
              ${this.renderAttributeRow("tyreMgmt", "Gestione Gomme", "Conservazione battistrada e ritmo costante", state.attributes.tyreMgmt, state.baseAttributes.tyreMgmt)}
              ${this.renderAttributeRow("consistency", "Costanza di Rendimento", "Minimizza errori, testacoda e cadute", state.attributes.consistency, state.baseAttributes.consistency)}
              ${this.renderAttributeRow("wetSkill", "Mago del Bagnato", "Controllo assoluto sotto la pioggia torrenziale", state.attributes.wetSkill, state.baseAttributes.wetSkill)}
              ${this.renderAttributeRow("technicalFeedback", "Sensibilità Tecnica", "Ottimizzazione assetto e sviluppo R&D", state.attributes.technicalFeedback, state.baseAttributes.technicalFeedback)}
            </div>

            <div class="start-career-action-box">
              <button id="btn-start-career-submit" class="start-race-button">
                <span>SCENDI IN PISTA PER I ROOKIE TEST</span>
                <span class="btn-arrow">➔</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    this.bindEvents(container, state, updatePreview, onComplete);
    updatePreview();
  }

  static renderAttributeRow(key, title, subtitle, val, baseVal) {
    return `
      <div class="attr-stepper-row" data-attr="${key}">
        <div class="attr-info">
          <div class="attr-title-row">
            <strong>${title}</strong>
            <span class="attr-base-tag">Base: ${baseVal}</span>
          </div>
          <small>${subtitle}</small>
        </div>
        <div class="attr-controls">
          <button class="attr-btn minus" data-key="${key}" title="Annulla punto" ${val <= baseVal ? 'disabled' : ''}>-</button>
          <span class="attr-display-val" id="val-${key}">${val}</span>
          <button class="attr-btn plus" data-key="${key}" title="Aggiungi punto">+</button>
        </div>
      </div>
    `;
  }

  static bindEvents(container, state, updatePreview, onComplete) {
    // Switch disciplina
    container.querySelectorAll('.discipline-card').forEach(card => {
      card.onclick = () => {
        sound.playClick();
        container.querySelectorAll('.discipline-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        state.discipline = card.dataset.discipline;
      };
    });

    // Campi anagrafica
    const fnInput = container.querySelector('#input-first-name');
    fnInput.oninput = (e) => { state.firstName = e.target.value.trim() || "Pilota"; updatePreview(); };

    const lnInput = container.querySelector('#input-last-name');
    lnInput.oninput = (e) => { state.lastName = e.target.value.trim() || "Pro"; updatePreview(); };

    const nickInput = container.querySelector('#input-nickname');
    nickInput.oninput = (e) => { state.nickname = e.target.value.trim() || "Il Razzo"; };

    const numInput = container.querySelector('#input-number');
    numInput.oninput = (e) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val) || val < 2) val = 2;
      if (val > 99) val = 99;
      state.number = val;
      updatePreview();
    };

    const natSelect = container.querySelector('#select-nationality');
    natSelect.onchange = (e) => { state.nationality = e.target.value; updatePreview(); };

    const celebSelect = container.querySelector('#select-celebration');
    celebSelect.onchange = (e) => { state.celebration = e.target.value; };

    // Genera nickname casuale
    const randNickBtn = container.querySelector('#btn-random-nickname');
    randNickBtn.onclick = () => {
      sound.playClick();
      const nicknames = [
        "Il Martello", "The Predator", "Mister Sabato", "Il Professore", 
        "La Furia", "Il Cecchino", "The Bullet", "L'Ingegnere Volante", 
        "L'Extraterrestre", "Il Dottorino", "Speed Demon", "Il Mago della Pioggia"
      ];
      state.nickname = nicknames[Math.floor(Math.random() * nicknames.length)];
      nickInput.value = state.nickname;
    };

    // Scelta Origine
    container.querySelectorAll('.origin-option').forEach(opt => {
      opt.onclick = () => {
        sound.playClick();
        container.querySelectorAll('.origin-option').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        const chosenOrigin = opt.dataset.origin || opt.querySelector('input').value;
        state.origin = chosenOrigin;

        const bg = BACKGROUND_PROFILES[chosenOrigin];
        if (bg) {
          state.baseAttributes = { ...bg.baseAttributes };
          state.attributes = { ...bg.baseAttributes };
          state.pointsPool = bg.startingPointsPool;
        }
        updatePreview();
      };
    });

    // Colori calotta
    container.querySelectorAll('.color-picker-palette').forEach(palette => {
      const target = palette.dataset.target;
      palette.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.onclick = () => {
          sound.playClick();
          palette.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
          swatch.classList.add('active');
          state.helmet[target] = swatch.dataset.color;
          updatePreview();
        };
      });
    });

    // Finitura visiera
    container.querySelectorAll('.visor-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playClick();
        container.querySelectorAll('.visor-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.helmet.visorColor = btn.dataset.visor;
        updatePreview();
      };
    });

    // Motivo grafico
    container.querySelectorAll('.pattern-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playClick();
        container.querySelectorAll('.pattern-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.helmet.pattern = btn.dataset.pattern;
        updatePreview();
      };
    });

    // Attributi più e meno
    container.querySelectorAll('.attr-btn').forEach(btn => {
      btn.onclick = () => {
        const key = btn.dataset.key;
        const isPlus = btn.classList.contains('plus');

        if (isPlus) {
          if (state.pointsPool > 0 && state.attributes[key] < 85) {
            sound.playClick();
            state.pointsPool--;
            state.attributes[key]++;
          }
        } else {
          // NON PERMETTERE DI TOGLIERE PUNTI SOTTO LA BASE NATURALE DEL BACKGROUND!
          // È consentito solo annullare punti appena assegnati dal pool
          if (state.attributes[key] > state.baseAttributes[key]) {
            sound.playClick();
            state.pointsPool++;
            state.attributes[key]--;
          }
        }

        updatePreview();
      };
    });

    // Invio form: Accesso ai Rookie Test ufficiali
    const submitBtn = container.querySelector('#btn-start-career-submit');
    submitBtn.onclick = () => {
      sound.playEngineRev();
      onComplete(state);
    };
  }
}
