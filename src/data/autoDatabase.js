// Database del mondo Automobilismo aggiornato a Settembre 2026 con calendari completi ufficiali
export const AUTO_CATEGORIES = {
  auto_f4: {
    id: "auto_f4",
    tier: 4,
    name: "Formula 4 Regional Championship",
    realSeriesName: "FIA Formula 4 Regional Championship",
    minAge: 16,
    calendar: ["misano", "imola", "red_bull_ring", "mugello", "barcelona", "jerez", "monza"],
    weekendFormat: { practiceLaps: 5, qualiLaps: 3, raceLapsMultiplier: 0.35, pitStops: false },
    licensePointsAwarded: 12,
    prizeBudgetPerRace: 10000,
    teams: [
      { id: "f4_cram", fictionalName: "Cram Scuderia Giovani", realName: "Cram Motorsport", carPace: 72, reliability: 80, color: "#c40000", country: "ITA" },
      { id: "f4_jenzer", fictionalName: "Jenzer Helvetia Racing", realName: "Jenzer Motorsport", carPace: 74, reliability: 85, color: "#0055a5", country: "CHE" },
      { id: "f4_iron_lynx", fictionalName: "Lince Rossa Junior Team", realName: "Iron Lynx Academy", carPace: 76, reliability: 88, color: "#e10600", country: "ITA" },
      { id: "f4_bhaechler", fictionalName: "Bavaria Young Talents", realName: "Bhaechler Junior Racing", carPace: 71, reliability: 82, color: "#333333", country: "DEU" }
    ],
    roster: [
      { id: "drv_f4_1", fictionalName: "Marco Fulmine", realName: "Matteo De Palo", teamId: "f4_iron_lynx", ovr: 72, nationality: "ITA" },
      { id: "drv_f4_2", fictionalName: "Lukas Schnell", realName: "Luka Sammalisto", teamId: "f4_jenzer", ovr: 71, nationality: "FIN" },
      { id: "drv_f4_3", fictionalName: "Enzo Pignone", realName: "Enzo Deligny", teamId: "f4_cram", ovr: 70, nationality: "FRA" },
      { id: "drv_f4_4", fictionalName: "Hans Von Berg", realName: "Maxim Rehm", teamId: "f4_bhaechler", ovr: 69, nationality: "DEU" }
    ]
  },

  auto_f3: {
    id: "auto_f3",
    tier: 3,
    name: "Formula 3 International",
    realSeriesName: "FIA Formula 3 Championship 2026",
    minAge: 17,
    calendar: ["melbourne", "bahrain", "imola", "monaco", "barcelona", "red_bull_ring", "silverstone", "spa", "hungaroring", "monza"],
    weekendFormat: { practiceLaps: 6, qualiLaps: 4, raceLapsMultiplier: 0.45, pitStops: false },
    licensePointsAwarded: 25,
    prizeBudgetPerRace: 28000,
    teams: [
      { id: "f3_trident", fictionalName: "Tridente Corse", realName: "Trident Motorsport", carPace: 81, reliability: 86, color: "#0047ba", country: "ITA" },
      { id: "f3_campos", fictionalName: "Campos Iberia GP", realName: "Campos Racing", carPace: 80, reliability: 84, color: "#f2a900", country: "ESP" },
      { id: "f3_van_amersfoort", fictionalName: "Van Tulip Racing", realName: "Van Amersfoort Racing", carPace: 78, reliability: 82, color: "#ff7900", country: "NLD" },
      { id: "f3_dams", fictionalName: "DAMS Bleu Racing", realName: "DAMS Lucas Oil", carPace: 79, reliability: 85, color: "#002f6c", country: "FRA" }
    ],
    roster: [
      { id: "drv_f3_1", fictionalName: "Mariano El Torero", realName: "Mari Boya", teamId: "f3_campos", ovr: 78, nationality: "ESP" },
      { id: "drv_f3_2", fictionalName: "Noel Storm", realName: "Noel León", teamId: "f3_van_amersfoort", ovr: 77, nationality: "MEX" },
      { id: "drv_f3_3", fictionalName: "Dino Cavallini", realName: "Dino Beganovic", teamId: "f3_dams", ovr: 79, nationality: "SWE" },
      { id: "drv_f3_4", fictionalName: "Sami Meguetounif", realName: "Sami Meguetounif", teamId: "f3_trident", ovr: 78, nationality: "FRA" }
    ]
  },

  auto_f2: {
    id: "auto_f2",
    tier: 2,
    name: "Formula 2 World Series",
    realSeriesName: "FIA Formula 2 Championship 2026",
    minAge: 19,
    calendar: ["melbourne", "bahrain", "jeddah", "imola", "monaco", "barcelona", "red_bull_ring", "silverstone", "spa", "hungaroring", "monza", "baku", "lusail", "yas_marina"],
    weekendFormat: { practiceLaps: 8, qualiLaps: 5, raceLapsMultiplier: 0.60, pitStops: true },
    licensePointsAwarded: 40,
    prizeBudgetPerRace: 80000,
    teams: [
      { id: "f2_prema", fictionalName: "Prima Squadra Corse", realName: "PREMA Racing", carPace: 87, reliability: 88, color: "#e60000", country: "ITA" },
      { id: "f2_invicta", fictionalName: "Invicta Golden Arrows", realName: "Invicta Racing", carPace: 87, reliability: 86, color: "#ffd700", country: "GBR" },
      { id: "f2_art", fictionalName: "ART Grand Prix Paris", realName: "ART Grand Prix", carPace: 86, reliability: 87, color: "#ffffff", country: "FRA" },
      { id: "f2_mp", fictionalName: "Orange MP Speed", realName: "MP Motorsport", carPace: 85, reliability: 86, color: "#ff6600", country: "NLD" },
      { id: "f2_rodin", fictionalName: "Rodin Down Under", realName: "Rodin Motorsport", carPace: 84, reliability: 84, color: "#002050", country: "NZL" },
      { id: "f2_hitech", fictionalName: "Hitech Pulse Engineering", realName: "Hitech Pulse-Eight", carPace: 83, reliability: 83, color: "#b0b0b0", country: "GBR" }
    ],
    roster: [
      { id: "drv_mini", fictionalName: "Gabriele Veloce", realName: "Gabriele Minì", teamId: "f2_prema", ovr: 83, nationality: "ITA" },
      { id: "drv_fornaroli", fictionalName: "Leo Campione", realName: "Leonardo Fornaroli", teamId: "f2_invicta", ovr: 83, nationality: "ITA" },
      { id: "drv_martins", fictionalName: "Victor Parigino", realName: "Victor Martins", teamId: "f2_art", ovr: 82, nationality: "FRA" },
      { id: "drv_aron", fictionalName: "Paul D'Argent", realName: "Paul Aron", teamId: "f2_hitech", ovr: 83, nationality: "EST" }
    ]
  },

  auto_f1: {
    id: "auto_f1",
    tier: 1,
    name: "Formula Apex World Championship 2026",
    realSeriesName: "Formula 1 World Championship 2026 (11 Teams)",
    minAge: 20,
    // Calendario ufficiale completo 2026 a 24 Gran Premi
    calendar: [
      "melbourne", "shanghai", "suzuka", "bahrain", "jeddah", "miami",
      "imola", "monaco", "montreal", "barcelona", "red_bull_ring", "silverstone",
      "spa", "hungaroring", "zandvoort", "monza", "madrid", "baku",
      "singapore", "cota", "mexico", "interlagos", "las_vegas", "lusail", "yas_marina"
    ],
    weekendFormat: { practiceLaps: 10, qualiLaps: 6, raceLapsMultiplier: 1.0, pitStops: true },
    licensePointsAwarded: 50,
    prizeBudgetPerRace: 480000,
    teams: [
      { id: "f1_mclaren", fictionalName: "Papaya Rocket F1 (Norris #1/Piastri)", realName: "McLaren F1 Team", carPace: 97, reliability: 95, aero: 97, power: 96, chassis: 97, color: "#ff8000", country: "GBR" },
      { id: "f1_ferrari", fictionalName: "Scuderia Cavallino HP (Hamilton/Leclerc)", realName: "Scuderia Ferrari HP", carPace: 96, reliability: 93, aero: 95, power: 97, chassis: 95, color: "#e10600", country: "ITA" },
      { id: "f1_redbull", fictionalName: "Red Bullish Ford (Verstappen/Hadjar)", realName: "Oracle Red Bull Racing", carPace: 96, reliability: 92, aero: 96, power: 95, chassis: 95, color: "#1e41ff", country: "AUT" },
      { id: "f1_mercedes", fictionalName: "Silver Star NextGen (Russell/Antonelli)", realName: "Mercedes-AMG PETRONAS", carPace: 94, reliability: 95, aero: 94, power: 96, chassis: 94, color: "#00d2be", country: "DEU" },
      { id: "f1_aston", fictionalName: "British Green Newey Honda (Alonso/Stroll)", realName: "Aston Martin Aramco F1 Team", carPace: 93, reliability: 92, aero: 95, power: 94, chassis: 92, color: "#00665e", country: "GBR" },
      { id: "f1_williams", fictionalName: "Williams Smooth Revival (Sainz/Albon)", realName: "Williams Racing", carPace: 90, reliability: 91, aero: 89, power: 94, chassis: 89, color: "#00a0dd", country: "GBR" },
      { id: "f1_cadillac", fictionalName: "General Motors American Dream (Pérez/Bottas)", realName: "Cadillac Formula 1 Team", carPace: 88, reliability: 89, aero: 87, power: 93, chassis: 87, color: "#c4a000", country: "USA" },
      { id: "f1_audi", fictionalName: "Audi German Ring Factory (Hülk/Bortoleto)", realName: "Audi Revolut F1 Team", carPace: 88, reliability: 89, aero: 87, power: 89, chassis: 88, color: "#e00000", country: "DEU" },
      { id: "f1_haas", fictionalName: "Haas Stars & Stripes Toyota (Ocon/Bearman)", realName: "MoneyGram Haas F1 Team Toyota", carPace: 87, reliability: 88, aero: 86, power: 94, chassis: 86, color: "#b6babd", country: "USA" },
      { id: "f1_rb", fictionalName: "Racing Bulls Faenza (Lawson/Lindblad)", realName: "Visa Cash App Racing Bulls F1", carPace: 87, reliability: 89, aero: 87, power: 93, chassis: 86, color: "#1634ca", country: "ITA" },
      { id: "f1_alpine", fictionalName: "Bleu Alpine Mercedes (Gasly/Colapinto)", realName: "BWT Alpine F1 Team", carPace: 86, reliability: 87, aero: 85, power: 94, chassis: 86, color: "#0090ff", country: "FRA" }
    ],
    roster: [
      { id: "drv_norris", fictionalName: "Lando Porris Il Campione", realName: "Lando Norris", teamId: "f1_mclaren", ovr: 95, number: 1, nationality: "GBR", pace: 96, racecraft: 94, tyreMgmt: 95, consistency: 94, wetSkill: 95 },
      { id: "drv_piastri", fictionalName: "Oscar Glaciale", realName: "Oscar Piastri", teamId: "f1_mclaren", ovr: 92, number: 81, nationality: "AUS", pace: 93, racecraft: 92, tyreMgmt: 91, consistency: 94, wetSkill: 91 },
      { id: "drv_hamilton", fictionalName: "Sir Lewis Spamilton in Rosso", realName: "Lewis Hamilton", teamId: "f1_ferrari", ovr: 95, number: 44, nationality: "GBR", pace: 95, racecraft: 97, tyreMgmt: 97, consistency: 95, wetSkill: 98 },
      { id: "drv_leclerc", fictionalName: "Charles Predestinato", realName: "Charles Leclerc", teamId: "f1_ferrari", ovr: 94, number: 16, nationality: "MCO", pace: 98, racecraft: 93, tyreMgmt: 92, consistency: 91, wetSkill: 93 },
      { id: "drv_verstappen", fictionalName: "Max Versteppin Lo Sterminatore", realName: "Max Verstappen", teamId: "f1_redbull", ovr: 97, number: 33, nationality: "NLD", pace: 98, racecraft: 98, tyreMgmt: 95, consistency: 98, wetSkill: 99 },
      { id: "drv_hadjar", fictionalName: "Isack Rapace", realName: "Isack Hadjar", teamId: "f1_redbull", ovr: 83, number: 6, nationality: "FRA", pace: 85, racecraft: 84, tyreMgmt: 82, consistency: 82, wetSkill: 84 },
      { id: "drv_russell", fictionalName: "George Righello", realName: "George Russell", teamId: "f1_mercedes", ovr: 91, number: 63, nationality: "GBR", pace: 93, racecraft: 91, tyreMgmt: 91, consistency: 92, wetSkill: 92 },
      { id: "drv_antonelli", fictionalName: "Kimi Prodigio Nazionale", realName: "Andrea Kimi Antonelli", teamId: "f1_mercedes", ovr: 87, number: 12, nationality: "ITA", pace: 91, racecraft: 87, tyreMgmt: 85, consistency: 85, wetSkill: 89 },
      { id: "drv_alonso", fictionalName: "Fernando Alonslow Il Samurai", realName: "Fernando Alonso", teamId: "f1_aston", ovr: 91, number: 14, nationality: "ESP", pace: 90, racecraft: 97, tyreMgmt: 94, consistency: 95, wetSkill: 94 },
      { id: "drv_stroll", fictionalName: "Lance Milliardo", realName: "Lance Stroll", teamId: "f1_aston", ovr: 81, number: 18, nationality: "CAN", pace: 80, racecraft: 81, tyreMgmt: 82, consistency: 79, wetSkill: 86 },
      { id: "drv_sainz", fictionalName: "Carlos Operatore Liscio", realName: "Carlos Sainz Jr.", teamId: "f1_williams", ovr: 91, number: 55, nationality: "ESP", pace: 91, racecraft: 93, tyreMgmt: 93, consistency: 93, wetSkill: 90 },
      { id: "drv_albon", fictionalName: "Alex Redivivo", realName: "Alexander Albon", teamId: "f1_williams", ovr: 86, number: 23, nationality: "THA", pace: 87, racecraft: 88, tyreMgmt: 87, consistency: 86, wetSkill: 86 },
      { id: "drv_perez", fictionalName: "Checo Ministro Americano", realName: "Sergio Pérez", teamId: "f1_cadillac", ovr: 86, number: 11, nationality: "MEX", pace: 86, racecraft: 87, tyreMgmt: 91, consistency: 85, wetSkill: 86 },
      { id: "drv_bottas", fictionalName: "Valtteri Baffo Bottas", realName: "Valtteri Bottas", teamId: "f1_cadillac", ovr: 85, number: 77, nationality: "FIN", pace: 86, racecraft: 85, tyreMgmt: 86, consistency: 88, wetSkill: 87 },
      { id: "drv_hulkenberg", fictionalName: "Nico Il Pompiere Audi", realName: "Nico Hülkenberg", teamId: "f1_audi", ovr: 85, number: 27, nationality: "DEU", pace: 87, racecraft: 85, tyreMgmt: 84, consistency: 89, wetSkill: 87 },
      { id: "drv_bortoleto", fictionalName: "Gabriel Carioca Sauber-Audi", realName: "Gabriel Bortoleto", teamId: "f1_audi", ovr: 84, number: 5, nationality: "BRA", pace: 86, racecraft: 84, tyreMgmt: 83, consistency: 84, wetSkill: 85 },
      { id: "drv_ocon", fictionalName: "Esteban Barricata", realName: "Esteban Ocon", teamId: "f1_haas", ovr: 85, number: 31, nationality: "FRA", pace: 85, racecraft: 88, tyreMgmt: 85, consistency: 85, wetSkill: 87 },
      { id: "drv_bearman", fictionalName: "Ollie Orsetto", realName: "Oliver Bearman", teamId: "f1_haas", ovr: 84, number: 87, nationality: "GBR", pace: 86, racecraft: 85, tyreMgmt: 82, consistency: 83, wetSkill: 84 },
      { id: "drv_lawson", fictionalName: "Liam Kiwiboy", realName: "Liam Lawson", teamId: "f1_rb", ovr: 85, number: 30, nationality: "NZL", pace: 86, racecraft: 86, tyreMgmt: 84, consistency: 85, wetSkill: 86 },
      { id: "drv_lindblad", fictionalName: "Arvid Il Giovane Vichingo", realName: "Arvid Lindblad", teamId: "f1_rb", ovr: 81, number: 8, nationality: "GBR", pace: 83, racecraft: 82, tyreMgmt: 80, consistency: 81, wetSkill: 82 },
      { id: "drv_gasly", fictionalName: "Pierre Riscatto", realName: "Pierre Gasly", teamId: "f1_alpine", ovr: 85, number: 10, nationality: "FRA", pace: 85, racecraft: 86, tyreMgmt: 85, consistency: 85, wetSkill: 87 },
      { id: "drv_colapinto", fictionalName: "Franco Pampa Express", realName: "Franco Colapinto", teamId: "f1_alpine", ovr: 84, number: 43, nationality: "ARG", pace: 86, racecraft: 86, tyreMgmt: 83, consistency: 84, wetSkill: 85 }
    ]
  },

  auto_wec: {
    id: "auto_wec",
    tier: 1,
    name: "Hypercar World Endurance",
    realSeriesName: "FIA World Endurance Championship (Hypercar) 2026",
    minAge: 21,
    calendar: ["lusail", "imola", "spa", "le_mans", "interlagos", "cota", "suzuka", "bahrain"],
    weekendFormat: { practiceLaps: 12, qualiLaps: 6, raceLapsMultiplier: 1.2, pitStops: true },
    licensePointsAwarded: 40,
    prizeBudgetPerRace: 340000,
    teams: [
      { id: "wec_ferrari_af", fictionalName: "Cavallino Sarthe Hypercar (499P)", realName: "Ferrari AF Corse Hypercar", carPace: 95, reliability: 94, color: "#e10600", country: "ITA" },
      { id: "wec_toyota", fictionalName: "Sol Levante Hybrid 24 (GR010)", realName: "Toyota Gazoo Racing", carPace: 94, reliability: 95, color: "#ffffff", country: "JPN" },
      { id: "wec_porsche", fictionalName: "Stuttgart Penske Prototype (963)", realName: "Porsche Penske Motorsport", carPace: 95, reliability: 94, color: "#000000", country: "DEU" },
      { id: "wec_cadillac", fictionalName: "Detroit Thunder JOTA (V-Series.R)", realName: "Cadillac Hertz Team JOTA", carPace: 92, reliability: 91, color: "#d4af37", country: "USA" }
    ],
    roster: [
      { id: "drv_fuoco", fictionalName: "Antonio Fiamma", realName: "Antonio Fuoco", teamId: "wec_ferrari_af", ovr: 91, nationality: "ITA" },
      { id: "drv_giovinazzi", fictionalName: "Antonio Redentore", realName: "Antonio Giovinazzi", teamId: "wec_ferrari_af", ovr: 89, nationality: "ITA" },
      { id: "drv_estre", fictionalName: "Kévin Sorpassatutto", realName: "Kévin Estre", teamId: "wec_porsche", ovr: 91, nationality: "FRA" },
      { id: "drv_kobayashi", fictionalName: "Kamui Kamikaze", realName: "Kamui Kobayashi", teamId: "wec_toyota", ovr: 89, nationality: "JPN" }
    ]
  },

  auto_indy: {
    id: "auto_indy",
    tier: 1,
    name: "American Open Wheel Series",
    realSeriesName: "NTT IndyCar Series 2026",
    minAge: 20,
    calendar: ["miami", "cota", "indianapolis", "silverstone", "red_bull_ring", "interlagos", "las_vegas"],
    weekendFormat: { practiceLaps: 10, qualiLaps: 4, raceLapsMultiplier: 0.9, pitStops: true },
    licensePointsAwarded: 40,
    prizeBudgetPerRace: 290000,
    teams: [
      { id: "indy_ganassi", fictionalName: "Ganassi Victory Factory", realName: "Chip Ganassi Racing", carPace: 95, reliability: 95, color: "#003da5", country: "USA" },
      { id: "indy_penske", fictionalName: "The Captain Penske Team", realName: "Team Penske", carPace: 94, reliability: 94, color: "#e31837", country: "USA" },
      { id: "indy_arrow_mclaren", fictionalName: "Arrow Papaya America", realName: "Arrow McLaren IndyCar Team", carPace: 93, reliability: 91, color: "#ff8000", country: "USA" },
      { id: "indy_andretti", fictionalName: "Andretti Global Dynasty", realName: "Andretti Global", carPace: 92, reliability: 90, color: "#002b49", country: "USA" }
    ],
    roster: [
      { id: "drv_palou", fictionalName: "Alex Matematico", realName: "Alex Palou", teamId: "indy_ganassi", ovr: 93, nationality: "ESP" },
      { id: "drv_newgarden", fictionalName: "Joe Newgarden", realName: "Josef Newgarden", teamId: "indy_penske", ovr: 90, nationality: "USA" },
      { id: "drv_oward", fictionalName: "Pato Pato", realName: "Pato O'Ward", teamId: "indy_arrow_mclaren", ovr: 90, nationality: "MEX" },
      { id: "drv_dixon", fictionalName: "Scott L'Immortale", realName: "Scott Dixon", teamId: "indy_ganassi", ovr: 90, nationality: "NZL" }
    ]
  }
};
