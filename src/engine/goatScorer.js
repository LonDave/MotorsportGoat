import { db } from '../data/databaseManager.js';

// Calcolatore del Motorsport GOAT Index (Legacy Score) e classifica Hall of Fame
export class GoatScorer {
  static calculateScore(driver, careerStats) {
    let score = 0;

    // 1. Titoli Mondiali vinti
    const worldTitles = careerStats.worldTitles || 0;
    score += worldTitles * 250;

    // 2. Vittorie in Gran Premio
    const wins = careerStats.wins || 0;
    score += wins * 12;

    // 3. Pole Position
    const poles = careerStats.poles || 0;
    score += poles * 6;

    // 4. Podi
    const podiums = careerStats.podiums || 0;
    score += podiums * 4;

    // 5. Giri Veloci
    const fastestLaps = careerStats.fastestLaps || 0;
    score += fastestLaps * 3;

    // 6. Vittorie speciali storiche
    const specialWins = careerStats.specialWins || {};
    if (driver.discipline === 'auto') {
      if (specialWins['monaco']) score += 45;
      if (specialWins['le_mans']) score += 65;
      if (specialWins['indianapolis']) score += 55;
      // Bonus Triple Crown
      if (specialWins['monaco'] && specialWins['le_mans'] && specialWins['indianapolis']) {
        score += 150;
      }
    } else {
      if (specialWins['mugello']) score += 40;
      if (specialWins['assen']) score += 40;
      if (specialWins['phillip_island']) score += 40;
      // Bonus Moto Legend
      if (specialWins['mugello'] && specialWins['assen'] && specialWins['phillip_island']) {
        score += 120;
      }
    }

    // 7. Dominio sul compagno di squadra (H2H)
    const teammateSeasonsWon = careerStats.teammateBeatenCount || 0;
    score += teammateSeasonsWon * 15;

    // 8. Picco di OVR (Overall Rating)
    const peakOvr = careerStats.peakOvr || driver.ovr || 75;
    if (peakOvr >= 95) score += 100;
    else if (peakOvr >= 90) score += 60;
    else if (peakOvr >= 85) score += 30;

    // 9. Longevità e presenze
    const racesStarted = careerStats.racesStarted || 0;
    score += Math.min(100, Math.floor(racesStarted * 0.4));

    return Math.round(score);
  }

  static getTitleAndTier(goatScore) {
    if (goatScore >= 980) return { title: "IL GOAT ASSOLUTO DEI MOTORI 👑", badge: "LEGGENDA IMMORTALE", desc: "Hai scolpito per sempre il tuo nome nell'Olimpo. Nessuno potrà mai eguagliare la tua grandezza." };
    if (goatScore >= 900) return { title: "MONSTRO SACRO DELLA VELOCITÀ 🏆", badge: "HALL OF FAME", desc: "Riconosciuto all'unanimità tra i migliori piloti mai esistiti sul pianeta Terra." };
    if (goatScore >= 700) return { title: "CAMPIONE MONDIALE LEGGENDARIO ⭐⭐⭐", badge: "PLURICAMPIONE", desc: "Hai dominato un'era intera del motorsport, lasciando record indelebili." };
    if (goatScore >= 450) return { title: "RE DEI GRAN PREMI ⭐⭐", badge: "VINCITORE SERIALE", desc: "Hai vinto gare memorabili, duellato con i migliori e scritto pagine storiche." };
    if (goatScore >= 200) return { title: "PILOTA DI CULTO ⭐", badge: "EROE DEL PADDOCK", desc: "Una carriera solida, podi prestigiosi e l'affetto sconfinato dei tifosi." };
    return { title: "GREGARIO D'ONORE 🏁", badge: "VETERANO", desc: "Hai vissuto il sogno delle corse ai massimi livelli mondiali fino all'ultima curva." };
  }

  static getHallOfFameRanking(playerScore, playerDriver, careerStats) {
    const historicalLegends = [
      { realName: "Giacomo Agostini", fictionalName: "Giacomo Ago Nazionale", discipline: "moto", titles: 15, wins: 122, poles: 9, goatScore: 998, era: "1963-1977" },
      { realName: "Lewis Hamilton", fictionalName: "Sir Lewis Spamilton", discipline: "auto", titles: 7, wins: 105, poles: 104, goatScore: 995, era: "2007-Attivo" },
      { realName: "Valentino Rossi", fictionalName: "Valentin Il Dottore 46", discipline: "moto", titles: 9, wins: 115, poles: 65, goatScore: 994, era: "1996-2021" },
      { realName: "Michael Schumacher", fictionalName: "Michele Il Barone Rosso", discipline: "auto", titles: 7, wins: 91, poles: 68, goatScore: 992, era: "1991-2012" },
      { realName: "Marc Márquez", fictionalName: "Marc La Formica Atomica", discipline: "moto", titles: 8, wins: 88, poles: 94, goatScore: 985, era: "2008-Attivo" },
      { realName: "Max Verstappen", fictionalName: "Max Versteppin Lo Sterminatore", discipline: "auto", titles: 4, wins: 63, poles: 40, goatScore: 978, era: "2015-Attivo" },
      { realName: "Juan Manuel Fangio", fictionalName: "Juan Il Maestro Delle Pampas", discipline: "auto", titles: 5, wins: 24, poles: 29, goatScore: 970, era: "1950-1958" },
      { realName: "Ayrton Senna", fictionalName: "Ayrton Il Mago Di San Paolo", discipline: "auto", titles: 3, wins: 41, poles: 65, goatScore: 965, era: "1984-1994" },
      { realName: "Alain Prost", fictionalName: "Alain Il Professore Di Francia", discipline: "auto", titles: 4, wins: 51, poles: 33, goatScore: 960, era: "1980-1993" },
      { realName: "Mick Doohan", fictionalName: "Mick Mano Di Ferro", discipline: "moto", titles: 5, wins: 54, poles: 58, goatScore: 955, era: "1989-1999" },
      { realName: "Jorge Lorenzo", fictionalName: "Giorgio Martillo Y Mantequilla", discipline: "moto", titles: 5, wins: 68, poles: 69, goatScore: 950, era: "2002-2019" },
      { realName: "Casey Stoner", fictionalName: "Casey Il Canguro Mannaro", discipline: "moto", titles: 2, wins: 45, poles: 43, goatScore: 940, era: "2002-2012" },
      { realName: "John Surtees", fictionalName: "John Il Dominatore Di Due Mondi", discipline: "both", titles: 8, wins: 44, poles: 16, goatScore: 935, era: "1952-1972" }
    ].map(l => ({
      ...l,
      name: db.isRealNames ? l.realName : l.fictionalName
    }));

    const playerEntry = {
      name: `${playerDriver.firstName} ${playerDriver.lastName} "${playerDriver.nickname}"`,
      discipline: playerDriver.discipline,
      titles: careerStats.worldTitles || 0,
      wins: careerStats.wins || 0,
      poles: careerStats.poles || 0,
      goatScore: playerScore,
      era: `${careerStats.startYear}-${careerStats.currentYear}`,
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
