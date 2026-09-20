# 🏎️ Il Nuovo GOAT — Motorsport Career Edition

Un simulatore di carriera motorsport completo, giocabile nel browser, ispirato al mondo dei motori. Scala dalle categorie giovanili fino alla Formula 1 (11 team 2026), MotoGP, WEC Hypercar, IndyCar e WorldSBK.

## 🚀 Demo Live

**[Gioca ora su GitHub Pages →](https://londave.github.io/MotorsportGoat/)**

## 🏁 Caratteristiche

- **10 campionati** — F4, F3, F2, F1, WEC Hypercar, IndyCar, Moto3, Moto2, MotoGP, WorldSBK
- **Weekend realistici** — Format specifico per campionato: FP1/FP2/FP3, Sprint weekends F1, Sprint MotoGP, Superpole WorldSBK, Hyperpole WEC
- **Gare in tempo reale** — Telemetria giro per giro, degrado gomme, meteo dinamico, safety car, pit stop
- **Carriera completa** — OVR pilota, R&D scuderia, mercato piloti, contratti, lifestyle, indice GOAT
- **Modalità nomi** — Toggle tra nomi reali (F1 2026, MotoGP 2026) e versione fittizia (Formula Apex, Moto Apex)
- **Nomi personalizzabili** — Importa il tuo database JSON con nomi personalizzati via Mod Manager
- **Fully responsive** — Ottimizzato per desktop, tablet e mobile

## 🛠️ Tecnologie

- **Vite** — Build tool e dev server
- **Vanilla JS** — Zero framework, puro JavaScript ES Modules
- **CSS** — Vanilla CSS con glassmorphism e animazioni
- **localStorage** — Salvataggio carriera lato client (nessun backend)
- **GitHub Pages** — Deploy automatico via GitHub Actions

## ⚙️ Installazione Locale

```bash
# Clona il repository
git clone https://github.com/LonDave/MotorsportGoat.git
cd MotorsportGoat

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

Apri il browser su `http://localhost:5173/MotorsportGoat/`

## 🔨 Build per Produzione

```bash
npm run build
```

Il risultato sarà nella cartella `dist/`. Il deploy su GitHub Pages avviene automaticamente ad ogni push su `main`.

## 📁 Struttura Progetto

```
src/
├── data/           # Database campionati, circuiti, piloti
├── engine/         # Logica di gara, carriera, scoring GOAT
├── ui/             # Viste e componenti UI
├── main.js         # Entry point e router
└── style.css       # Stili globali

motorsport_real_names.json  # Database nomi reali (esempio per Mod Manager)
.github/workflows/deploy.yml # CI/CD GitHub Pages
```

## 🎮 Come Giocare

1. **Crea il tuo pilota** — Scegli nome, disciplina (Auto o Moto), background e distribuisci i punti abilità
2. **Inizia dalla base** — Formula 4 o Moto3: conquista punti campionato e soddisfa le aspettative team
3. **Weekend di gara** — Completa prove libere (setup), qualifiche e gara
4. **Gestisci la carriera** — R&D, mercato piloti, contratti, lifestyle e investimenti HQ
5. **Diventa il GOAT** — Accumula l'indice GOAT sfidando le leggende della storia

## 📄 Licenza

Progetto personale a scopo educativo e di intrattenimento.  
I nomi reali di piloti, team e circuiti sono proprietà dei rispettivi titolari.  
La modalità "nomi fittizi" (attiva di default) utilizza nomi di fantasia per evitare problemi di copyright.
