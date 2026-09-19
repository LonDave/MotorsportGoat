import { db } from '../data/databaseManager.js';

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

    const total = Math.min(1000, Math.round(rawTotal));

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

  // Classifica Hall of Fame storica con tutti i partecipanti ricalcolati su basi realistiche
  static getHallOfFameRanking(playerScore, playerDriver, careerStats) {
    const historicalLegends = [
      {
        realName: "Giacomo Agostini",
        fictionalName: "Giacomo Ago Nazionale",
        discipline: "moto",
        titles: 15,
        premierTitles: 8,
        wins: 122,
        poles: 9,
        podiums: 159,
        goatScore: 997,
        era: "1963-1977",
        notableNote: "15 Mondiali (8 in 500cc), 122 vittorie e 10 Tourist Trophy"
      },
      {
        realName: "Lewis Hamilton",
        fictionalName: "Sir Lewis Spamilton",
        discipline: "auto",
        titles: 7,
        premierTitles: 7,
        wins: 105,
        poles: 104,
        podiums: 201,
        goatScore: 995,
        era: "2007-Attivo",
        notableNote: "Record assoluto di Vittorie (105) e Pole (104) in Formula 1"
      },
      {
        realName: "Valentino Rossi",
        fictionalName: "Valentin Il Dottore 46",
        discipline: "moto",
        titles: 9,
        premierTitles: 7,
        wins: 115,
        poles: 65,
        podiums: 235,
        goatScore: 993,
        era: "1996-2021",
        notableNote: "9 Mondiali in 4 classi diverse, 235 podi e longevità infinita"
      },
      {
        realName: "Michael Schumacher",
        fictionalName: "Michele Il Barone Rosso",
        discipline: "auto",
        titles: 7,
        premierTitles: 7,
        wins: 91,
        poles: 68,
        podiums: 155,
        goatScore: 991,
        era: "1991-2012",
        notableNote: "7 Titoli Mondiali F1 di cui 5 consecutivi con la Ferrari"
      },
      {
        realName: "Marc Márquez",
        fictionalName: "Marc La Formica Atomica",
        discipline: "moto",
        titles: 8,
        premierTitles: 6,
        wins: 88,
        poles: 94,
        podiums: 140,
        goatScore: 984,
        era: "2008-Attivo",
        notableNote: "8 Titoli Mondiali, dominatore assoluto dell'era MotoGP moderna"
      },
      {
        realName: "Max Verstappen",
        fictionalName: "Max Versteppin Lo Sterminatore",
        discipline: "auto",
        titles: 4,
        premierTitles: 4,
        wins: 63,
        poles: 40,
        podiums: 111,
        goatScore: 979,
        era: "2015-Attivo",
        notableNote: "Record di 19 vittorie in una stagione e 4 mondiali F1 dominati"
      },
      {
        realName: "Juan Manuel Fangio",
        fictionalName: "Juan Il Maestro Delle Pampas",
        discipline: "auto",
        titles: 5,
        premierTitles: 5,
        wins: 24,
        poles: 29,
        podiums: 35,
        goatScore: 973,
        era: "1950-1958",
        notableNote: "Record storico di 47.1% di vittorie e 5 mondiali con 4 team diversi"
      },
      {
        realName: "Ayrton Senna",
        fictionalName: "Ayrton Il Mago Di San Paolo",
        discipline: "auto",
        titles: 3,
        premierTitles: 3,
        wins: 41,
        poles: 65,
        podiums: 80,
        goatScore: 966,
        era: "1984-1994",
        notableNote: "Velocità pura sovrumana, 6 vittorie a Monaco e 65 pole position"
      },
      {
        realName: "Alain Prost",
        fictionalName: "Alain Il Professore Di Francia",
        discipline: "auto",
        titles: 4,
        premierTitles: 4,
        wins: 51,
        poles: 33,
        podiums: 106,
        goatScore: 961,
        era: "1980-1993",
        notableNote: "4 Titoli Mondiali F1 e maestro supremo di strategia e intelligenza tattica"
      },
      {
        realName: "Mick Doohan",
        fictionalName: "Mick Mano Di Ferro",
        discipline: "moto",
        titles: 5,
        premierTitles: 5,
        wins: 54,
        poles: 58,
        podiums: 95,
        goatScore: 954,
        era: "1989-1999",
        notableNote: "5 Titoli Mondiali 500cc consecutivi dominati con coraggio indomito"
      },
      {
        realName: "Jorge Lorenzo",
        fictionalName: "Giorgio Martillo Y Mantequilla",
        discipline: "moto",
        titles: 5,
        premierTitles: 3,
        wins: 68,
        poles: 69,
        podiums: 152,
        goatScore: 948,
        era: "2002-2019",
        notableNote: "5 Titoli Mondiali (3 MotoGP), stile di guida chirurgico e ritmo martellante"
      },
      {
        realName: "John Surtees",
        fictionalName: "John Il Dominatore Di Due Mondi",
        discipline: "both",
        titles: 8,
        premierTitles: 5,
        wins: 44,
        poles: 16,
        podiums: 92,
        goatScore: 945,
        era: "1952-1972",
        notableNote: "Unico pilota nella storia del motorsport iridato sia in F1 che in 500cc"
      },
      {
        realName: "Casey Stoner",
        fictionalName: "Casey Il Canguro Mannaro",
        discipline: "moto",
        titles: 2,
        premierTitles: 2,
        wins: 45,
        poles: 43,
        podiums: 89,
        goatScore: 938,
        era: "2002-2012",
        notableNote: "Talento naturale puro, iridato MotoGP con Ducati e Honda"
      },
      {
        realName: "Fernando Alonso",
        fictionalName: "Fernando Il Samurai Asturiano",
        discipline: "auto",
        titles: 3,
        premierTitles: 2,
        wins: 37,
        poles: 22,
        podiums: 106,
        goatScore: 932,
        era: "2001-Attivo",
        notableNote: "2 Mondiali F1, Campione del Mondo WEC e 2 vittorie a Le Mans"
      },
      {
        realName: "Niki Lauda",
        fictionalName: "Niki Il Computer Viennese",
        discipline: "auto",
        titles: 3,
        premierTitles: 3,
        wins: 25,
        poles: 24,
        podiums: 54,
        goatScore: 928,
        era: "1971-1985",
        notableNote: "3 Titoli Mondiali F1 e leggenda vivente di determinazione e coraggio"
      }
    ].map(l => ({
      ...l,
      name: db.isRealNames ? l.realName : l.fictionalName
    }));

    const playerEntry = {
      name: `${playerDriver?.firstName || 'Pilota'} ${playerDriver?.lastName || 'GOAT'} "${playerDriver?.nickname || 'Flash'}"`,
      discipline: playerDriver?.discipline || 'auto',
      titles: careerStats.worldTitles || 0,
      wins: careerStats.wins || 0,
      poles: careerStats.poles || 0,
      podiums: careerStats.podiums || 0,
      goatScore: playerScore,
      era: `${careerStats.startYear || 2026}-${careerStats.currentYear || 2026}`,
      isPlayer: true
    };

    const combined = [...historicalLegends, playerEntry];
    combined.sort((a, b) => b.goatScore - a.goatScore);

    const playerRank = combined.findIndex(item => item.isPlayer) + 1;
    return {
      ranking: combined,
      playerRank,
      totalDrivers: combined.length
    };
  }
}
