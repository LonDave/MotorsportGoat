import { db } from '../data/databaseManager.js';
import { DRIVER_BASELINES } from '../data/driverBaselines.js';
import { AUTO_CATEGORIES } from '../data/autoDatabase.js';
import { MOTO_CATEGORIES } from '../data/motoDatabase.js';

// Pesi e moltiplicatori di prestigio per ciascuna categoria del motorsport
export const CATEGORY_TIER_CONFIG = {
  // Automobilismo
  auto_f1: { name: 'Formula 1', tier: 1, titleWeight: 75, winWeight: 2.2, poleWeight: 1.1, podiumWeight: 0.8 },
  auto_wec: { name: 'FIA WEC Hypercar', tier: 1.5, titleWeight: 55, winWeight: 1.6, poleWeight: 0.8, podiumWeight: 0.6 },
  auto_indy: { name: 'NTT IndyCar', tier: 1.5, titleWeight: 50, winWeight: 1.5, poleWeight: 0.7, podiumWeight: 0.55 },
  auto_f2: { name: 'FIA Formula 2', tier: 2, titleWeight: 22, winWeight: 0.75, poleWeight: 0.35, podiumWeight: 0.25 },
  auto_f3: { name: 'FIA Formula 3', tier: 3, titleWeight: 12, winWeight: 0.40, poleWeight: 0.20, podiumWeight: 0.15 },
  auto_f4: { name: 'Formula 4 Regional Junior', tier: 4, titleWeight: 6, winWeight: 0.20, poleWeight: 0.10, podiumWeight: 0.08 },

  // Motociclismo
  moto_gp: { name: 'MotoGP', tier: 1, titleWeight: 75, winWeight: 2.2, poleWeight: 1.1, podiumWeight: 0.8 },
  moto_sbk: { name: 'WorldSBK Superbike', tier: 1.5, titleWeight: 50, winWeight: 1.5, poleWeight: 0.7, podiumWeight: 0.55 },
  moto_2: { name: 'Moto2 Intermediate', tier: 2, titleWeight: 22, winWeight: 0.75, poleWeight: 0.35, podiumWeight: 0.25 },
  moto_3: { name: 'Moto3 Junior', tier: 3, titleWeight: 12, winWeight: 0.40, poleWeight: 0.20, podiumWeight: 0.15 }
};

// Calcolatore del Motorsport GOAT Index (Legacy Score) e classifica Hall of Fame
export class GoatScorer {
  // Scomposizione analitica dettagliata del punteggio GOAT
  static getScoreBreakdown(driver, careerStats) {
    if (!careerStats) careerStats = {};
    const byCategory = careerStats.byCategory || {};

    let titlesPoints = 0;
    let winsPoints = 0;
    let polesPoints = 0;
    let podiumsPoints = 0;

    let totalRaces = 0;
    let totalWins = 0;
    let totalPoles = 0;
    let totalPodiums = 0;
    let totalTitles = 0;

    const hasCategoryBreakdown = Object.keys(byCategory).length > 0;

    if (hasCategoryBreakdown) {
      for (const [catKey, catStats] of Object.entries(byCategory)) {
        const config = CATEGORY_TIER_CONFIG[catKey] || CATEGORY_TIER_CONFIG.auto_f4;
        const titles = catStats.worldTitles || 0;
        const wins = catStats.wins || 0;
        const poles = catStats.poles || 0;
        const podiums = catStats.podiums || 0;
        const races = catStats.racesStarted || 0;

        titlesPoints += titles * config.titleWeight;
        winsPoints += wins * config.winWeight;
        polesPoints += poles * config.poleWeight;
        podiumsPoints += podiums * config.podiumWeight;

        totalTitles += titles;
        totalWins += wins;
        totalPoles += poles;
        totalPodiums += podiums;
        totalRaces += races;
      }
    } else {
      totalTitles = careerStats.worldTitles || 0;
      totalWins = careerStats.wins || 0;
      totalPoles = careerStats.poles || 0;
      totalPodiums = careerStats.podiums || 0;
      totalRaces = careerStats.racesStarted || 0;

      // Se non c'è suddivisione per categorie (fallback generico per il pilota)
      titlesPoints = totalTitles * 65;
      winsPoints = totalWins * 2.0;
      polesPoints = totalPoles * 1.0;
      podiumsPoints = totalPodiums * 0.7;
    }

    // Calcolo Percentuale Vittorie e Bonus Dominanza
    const winRate = totalRaces > 0 ? (totalWins / totalRaces) : 0;
    let dominancePoints = 0;

    // Fattore di scala del prestigio delle categorie corse (un 50% in F4 vale in proporzione al livello giovanile)
    const avgPrestige = (totalTitles > 0 || totalWins > 0)
      ? (titlesPoints + winsPoints) / Math.max(1, (totalTitles * 75 + totalWins * 2.2))
      : 0.15;
    const tierMultiplier = Math.min(1.0, Math.max(0.10, avgPrestige));

    if (winRate >= 0.40) dominancePoints = Math.round(45 * tierMultiplier);
    else if (winRate >= 0.30) dominancePoints = Math.round(30 * tierMultiplier);
    else if (winRate >= 0.20) dominancePoints = Math.round(18 * tierMultiplier);
    else if (winRate >= 0.10) dominancePoints = Math.round(10 * tierMultiplier);

    // Vittorie speciali storiche (Monaco, Le Mans, Indy 500 / Mugello, Assen, Phillip Island)
    let specialWinsPoints = 0;
    const specialWins = careerStats.specialWins || {};
    if (driver?.discipline === 'auto' || driver?.discipline === 'both') {
      if (specialWins['monaco']) specialWinsPoints += 15;
      if (specialWins['le_mans']) specialWinsPoints += 25;
      if (specialWins['indianapolis']) specialWinsPoints += 20;
      if (specialWins['monaco'] && specialWins['le_mans'] && specialWins['indianapolis']) {
        specialWinsPoints += 40; // Triple Crown Bonus
      }
    }
    if (driver?.discipline === 'moto' || driver?.discipline === 'both') {
      if (specialWins['mugello']) specialWinsPoints += 12;
      if (specialWins['assen']) specialWinsPoints += 15;
      if (specialWins['phillip_island']) specialWinsPoints += 15;
      if (specialWins['mugello'] && specialWins['assen'] && specialWins['phillip_island']) {
        specialWinsPoints += 30; // Moto Triple Crown Bonus
      }
    }

    // Dominio interno sul compagno di squadra (H2H stagioni)
    const teammateSeasons = careerStats.teammateBeatenCount || 0;
    const teammatePoints = Math.min(30, teammateSeasons * 3);

    // Longevità e presenze nei Gran Premi
    const longevityPoints = Math.min(25, Math.floor(totalRaces * 0.1));

    // Picco di Valutazione Pilota (OVR)
    const ovr = careerStats.peakOvr || driver?.ovr || 60;
    const peakOvrPoints = Math.max(0, Math.min(25, Math.round((ovr - 60) * 0.65)));

    const rawTotal = titlesPoints + winsPoints + polesPoints + podiumsPoints +
                     dominancePoints + specialWinsPoints + teammatePoints +
                     longevityPoints + peakOvrPoints;

    const total = Math.max(0, Math.round(rawTotal));

    return {
      titlesPoints: Math.round(titlesPoints),
      winsPoints: Math.round(winsPoints),
      polesPoints: Math.round(polesPoints),
      podiumsPoints: Math.round(podiumsPoints),
      dominancePoints,
      specialWinsPoints,
      teammatePoints,
      longevityPoints,
      peakOvrPoints,
      total,
      totalTitles,
      totalWins,
      totalPoles,
      totalPodiums,
      totalRaces,
      winRate: (winRate * 100).toFixed(1)
    };
  }

  // Calcola il punteggio complessivo GOAT per il pilota
  static calculateScore(driver, careerStats) {
    const breakdown = this.getScoreBreakdown(driver, careerStats);
    return breakdown.total;
  }

  // Restituisce titolo e status del pilota in base al punteggio GOAT effettivo
  static getTitleAndTier(goatScore) {
    if (goatScore >= 1200) {
      return { 
        title: "DIVINITÀ DEL MOTORSPORT 🌟👑", 
        badge: "LEGGENDA SUPREMA", 
        desc: "Hai infranto ogni limite umano conosciuto. Un'icona eterna del motorsport destinata a risplendere nei secoli." 
      };
    }
    if (goatScore >= 980) {
      return { 
        title: "IL GOAT ASSOLUTO DEI MOTORI 👑", 
        badge: "LEGGENDA IMMORTALE", 
        desc: "Hai scolpito per sempre il tuo nome nell'Olimpo dei motori. Nessuno potrà mai eguagliare la tua grandezza storica." 
      };
    }
    if (goatScore >= 930) {
      return { 
        title: "MOSTRI SACRI DELLA VELOCITÀ 🏆", 
        badge: "HALL OF FAME", 
        desc: "Riconosciuto all'unanimità tra i migliori piloti mai esistiti sul pianeta Terra, al fianco di Senna, Rossi e Schumacher." 
      };
    }
    if (goatScore >= 750) {
      return { 
        title: "PLURICAMPIONE MONDIALE LEGGENDARIO ⭐⭐⭐", 
        badge: "PLURICAMPIONE DEL MONDO", 
        desc: "Hai dominato un'era della massima formula o classe regina, vincendo molteplici campionati mondiali assoluti." 
      };
    }
    if (goatScore >= 500) {
      return { 
        title: "CAMPIONE DEL MONDO DELLA CLASSE REGINA ⭐⭐", 
        badge: "IRIDATO MONDIALE", 
        desc: "Hai conquistato il titolo mondiale nella massima categoria (F1 / MotoGP), coronando il sogno di una vita." 
      };
    }
    if (goatScore >= 250) {
      return { 
        title: "VINCITORE SERIALE DI GRAN PREMI ⭐", 
        badge: "TOP CLASS WINNER", 
        desc: "Hai vinto gare memorabili nella massima categoria, duellando al vertice contro i migliori campioni al mondo." 
      };
    }
    if (goatScore >= 120) {
      return { 
        title: "PILOTA D'ÉLITE INTERNAZIONALE 🏎️", 
        badge: "PRO RACER", 
        desc: "Pilota affermato nel panorama professionistico con podi prestigiosi e un solido palmarès nelle categorie maggiori." 
      };
    }
    if (goatScore >= 50) {
      return { 
        title: "CAMPIONE DELLE FORMULE PROPEDEUTICHE 🚀", 
        badge: "RISING STAR", 
        desc: "Dominatore nelle categorie giovanili e di passaggio. I team della classe regina tengono gli occhi puntati su di te." 
      };
    }
    return { 
      title: "GIOVANE TALENTO IN RAMPA DI LANCIO 🏁", 
      badge: "ROOKIE IN ASCESA", 
      desc: "Muovi i tuoi primi passi nelle categorie propedeutiche. Costruisci il tuo palmarès curva dopo curva per scalare la piramide del motorsport." 
    };
  }

  // Classifica Hall of Fame storica dinamica, con filtro per categoria e aggiornamento in tempo reale
  static getHallOfFameRanking(playerScore, playerDriver, careerStats, categoryFilter = 'all', allDriverStats = null) {
    const statsPool = allDriverStats || DRIVER_BASELINES;
    const ranking = [];
    const allCategories = { ...AUTO_CATEGORIES, ...MOTO_CATEGORIES };

    if (categoryFilter === 'all') {
      // 1. Piloti e leggende dal pool dinamico delle carriere
      for (const [drvId, data] of Object.entries(statsPool)) {
        if (drvId === 'player') continue;
        const byCat = data.byCategory || {};
        const name = db.isRealNames ? (data.realName || data.name) : (data.fictionalName || data.name || data.realName);
        const discipline = data.discipline || 'auto';
        const isLegend = !!data.isLegend;
        const era = data.era || 'Carriera';
        const notableNote = data.notableNote || '';

        let totalTitles = 0;
        let totalWins = 0;
        let totalPoles = 0;
        let totalPodiums = 0;
        let totalRaces = 0;

        let titlesPts = 0;
        let winsPts = 0;
        let polesPts = 0;
        let podiumsPts = 0;

        for (const [catKey, cs] of Object.entries(byCat)) {
          const cfg = CATEGORY_TIER_CONFIG[catKey] || CATEGORY_TIER_CONFIG.auto_f4;
          const t = cs.worldTitles || 0;
          const w = cs.wins || 0;
          const p = cs.poles || 0;
          const pod = cs.podiums || 0;
          const r = cs.racesStarted || 0;

          totalTitles += t;
          totalWins += w;
          totalPoles += p;
          totalPodiums += pod;
          totalRaces += r;

          titlesPts += t * cfg.titleWeight;
          winsPts += w * cfg.winWeight;
          polesPts += p * cfg.poleWeight;
          podiumsPts += pod * cfg.podiumWeight;
        }

        if (totalRaces === 0 && totalTitles === 0 && totalWins === 0 && totalPodiums === 0) continue;

        const winRate = totalRaces > 0 ? (totalWins / totalRaces) : 0;
        let dominancePts = 0;
        if (winRate >= 0.35) dominancePts = 35;
        else if (winRate >= 0.20) dominancePts = 20;
        else if (winRate >= 0.10) dominancePts = 10;

        const longevityPts = Math.min(25, Math.floor(totalRaces * 0.1));
        const finalScore = Math.round(titlesPts + winsPts + polesPts + podiumsPts + dominancePts + longevityPts);

        ranking.push({
          id: drvId,
          name,
          discipline,
          era,
          titles: totalTitles,
          wins: totalWins,
          poles: totalPoles,
          podiums: totalPodiums,
          races: totalRaces,
          goatScore: finalScore,
          isLegend,
          notableNote,
          isPlayer: false
        });
      }
    } else {
      // Categoria specifica (es. auto_indy, auto_f1, auto_wec, auto_f2, auto_f3, auto_f4, moto_gp, etc.)
      const targetCat = allCategories[categoryFilter];
      const categoryDriversMap = new Map();

      // 1. Includi TUTTI i piloti del roster ufficiale della categoria presenti nel gioco
      if (targetCat && targetCat.roster) {
        targetCat.roster.forEach(d => {
          categoryDriversMap.set(d.id, {
            id: d.id,
            name: db.getDriverName(d.id, targetCat.discipline || 'auto'),
            discipline: targetCat.discipline || 'auto',
            isLegend: false,
            era: 'Attivo',
            notableNote: '',
            ovr: d.ovr || 75
          });
        });
      }

      // 2. Includi tutti i piloti storici, leggende o altri piloti che hanno dati in questa categoria da statsPool
      for (const [drvId, data] of Object.entries(statsPool)) {
        if (drvId === 'player') continue;
        const byCat = data.byCategory || {};
        if (byCat[categoryFilter]) {
          const existing = categoryDriversMap.get(drvId) || {};
          const name = db.isRealNames ? (data.realName || data.name || existing.name) : (data.fictionalName || data.name || existing.name);
          categoryDriversMap.set(drvId, {
            ...existing,
            id: drvId,
            name: name || db.getDriverName(drvId, data.discipline || 'auto'),
            discipline: data.discipline || existing.discipline || 'auto',
            isLegend: !!data.isLegend,
            era: data.era || existing.era || 'Carriera',
            notableNote: data.notableNote || existing.notableNote || '',
            ovr: existing.ovr || 75
          });
        }
      }

      const cfg = CATEGORY_TIER_CONFIG[categoryFilter] || CATEGORY_TIER_CONFIG.auto_f4;

      categoryDriversMap.forEach((drvInfo, drvId) => {
        const cs = statsPool[drvId]?.byCategory?.[categoryFilter] || {
          worldTitles: 0, wins: 0, poles: 0, podiums: 0, racesStarted: 0
        };

        const titles = cs.worldTitles || 0;
        const wins = cs.wins || 0;
        const poles = cs.poles || 0;
        const podiums = cs.podiums || 0;
        const races = cs.racesStarted || 0;
        const catScore = Math.round((titles * cfg.titleWeight) + (wins * cfg.winWeight) + (poles * cfg.poleWeight) + (podiums * cfg.podiumWeight));

        ranking.push({
          id: drvId,
          name: drvInfo.name,
          discipline: drvInfo.discipline,
          era: drvInfo.era,
          titles,
          wins,
          poles,
          podiums,
          races,
          goatScore: catScore,
          isLegend: drvInfo.isLegend,
          notableNote: drvInfo.notableNote,
          ovr: drvInfo.ovr || 75,
          isPlayer: false
        });
      });
    }

    // 2. Aggiunta del Giocatore
    if (playerDriver) {
      const pName = `${playerDriver.firstName || 'Pilota'} ${playerDriver.lastName || 'GOAT'} "${playerDriver.nickname || 'Flash'}"`;
      const pDiscipline = playerDriver.discipline || 'auto';
      const pEra = `${careerStats?.startYear || 2026}-${careerStats?.currentYear || 2026}`;

      if (categoryFilter === 'all') {
        const breakdown = this.getScoreBreakdown(playerDriver, careerStats);
        ranking.push({
          id: 'player',
          name: pName,
          discipline: pDiscipline,
          era: pEra,
          titles: breakdown.totalTitles,
          wins: breakdown.totalWins,
          poles: breakdown.totalPoles,
          podiums: breakdown.totalPodiums,
          races: breakdown.totalRaces,
          goatScore: playerScore !== undefined ? playerScore : breakdown.total,
          isLegend: false,
          isPlayer: true
        });
      } else {
        const pCat = (careerStats?.byCategory && careerStats.byCategory[categoryFilter]) || {
          worldTitles: 0, wins: 0, poles: 0, podiums: 0, racesStarted: 0
        };
        const cfg = CATEGORY_TIER_CONFIG[categoryFilter] || CATEGORY_TIER_CONFIG.auto_f4;
        const titles = pCat.worldTitles || 0;
        const wins = pCat.wins || 0;
        const poles = pCat.poles || 0;
        const podiums = pCat.podiums || 0;
        const races = pCat.racesStarted || 0;
        const catScore = Math.round((titles * cfg.titleWeight) + (wins * cfg.winWeight) + (poles * cfg.poleWeight) + (podiums * cfg.podiumWeight));

        ranking.push({
          id: 'player',
          name: pName,
          discipline: pDiscipline,
          era: pEra,
          titles,
          wins,
          poles,
          podiums,
          races,
          goatScore: catScore,
          ovr: playerDriver.ovr || 75,
          isLegend: false,
          isPlayer: true
        });
      }
    }

    // 3. Ordinamento classifica
    if (categoryFilter === 'all') {
      ranking.sort((a, b) => b.goatScore - a.goatScore || b.titles - a.titles || b.wins - a.wins);
    } else {
      ranking.sort((a, b) => 
        b.titles - a.titles || 
        b.wins - a.wins || 
        b.podiums - a.podiums || 
        b.poles - a.poles || 
        b.goatScore - a.goatScore ||
        (b.ovr || 0) - (a.ovr || 0)
      );
    }

    const playerRank = ranking.findIndex(d => d.isPlayer) + 1;
    return {
      ranking,
      playerRank,
      totalDrivers: ranking.length
    };
  }
}
