// Database del mondo Automobilismo aggiornato alla stagione 2026 con griglie e regolamenti ufficiali
export const AUTO_CATEGORIES = {
  auto_f4: {
    id: "auto_f4",
    tier: 4,
    maxDriversPerTeam: 2,
    name: "Formula 4 Regional Championship",
    realSeriesName: "FIA Formula 4 Regional Championship 2026",
    minAge: 16,
    calendar: ["misano", "imola", "red_bull_ring", "mugello", "barcelona", "jerez", "monza"],
    weekendFormat: { practiceLaps: 5, qualiLaps: 3, raceLapsMultiplier: 0.35, pitStops: false },
    licensePointsAwarded: 12,
    prizeBudgetPerRace: 10000,
    teams: [
      { id: "f4_prema", fictionalName: "Prima Squadra Junior", realName: "PREMA Racing F4", carPace: 70, reliability: 88, color: "#e10600", country: "ITA" },
      { id: "f4_us_racing", fictionalName: "US Schumacher Speed", realName: "US Racing", carPace: 69, reliability: 87, color: "#002b49", country: "DEU" },
      { id: "f4_van_amersfoort", fictionalName: "Van Tulip Junior", realName: "Van Amersfoort Racing F4", carPace: 68, reliability: 86, color: "#ff7900", country: "NLD" },
      { id: "f4_phm", fictionalName: "PHM Berlin Talents", realName: "PHM Racing", carPace: 67, reliability: 85, color: "#111111", country: "DEU" },
      { id: "f4_cram", fictionalName: "Cram Scuderia Giovani", realName: "Cram Motorsport", carPace: 66, reliability: 84, color: "#c40000", country: "ITA" },
      { id: "f4_jenzer", fictionalName: "Jenzer Helvetia Racing", realName: "Jenzer Motorsport F4", carPace: 66, reliability: 85, color: "#0055a5", country: "CHE" },
      { id: "f4_iron_lynx", fictionalName: "Lince Rossa Junior Team", realName: "Iron Lynx Academy", carPace: 67, reliability: 86, color: "#d50000", country: "ITA" },
      { id: "f4_race_gp", fictionalName: "Hexagone Junior GP", realName: "R-ace GP F4", carPace: 66, reliability: 84, color: "#0055ff", country: "FRA" }
    ],
    roster: [
      { id: "drv_f4_1", fictionalName: "Freddie Saetta", realName: "Freddie Slater", teamId: "f4_prema", ovr: 76, number: 27, nationality: "GBR", pace: 78, racecraft: 76, tyreMgmt: 74, consistency: 75, wetSkill: 76 },
      { id: "drv_f4_2", fictionalName: "Kean Scatto", realName: "Kean Nakamura-Berta", teamId: "f4_prema", ovr: 75, number: 51, nationality: "JPN", pace: 77, racecraft: 75, tyreMgmt: 73, consistency: 74, wetSkill: 75 },
      { id: "drv_f4_3", fictionalName: "Jack Flash", realName: "Jack Beeton", teamId: "f4_us_racing", ovr: 74, number: 12, nationality: "AUS", pace: 75, racecraft: 74, tyreMgmt: 73, consistency: 73, wetSkill: 74 },
      { id: "drv_f4_4", fictionalName: "Maxime Fulmine", realName: "Maxim Rehm", teamId: "f4_us_racing", ovr: 73, number: 19, nationality: "DEU", pace: 74, racecraft: 73, tyreMgmt: 72, consistency: 73, wetSkill: 72 },
      { id: "drv_f4_5", fictionalName: "Hiyu Tempesta", realName: "Hiyu Yamakoshi", teamId: "f4_van_amersfoort", ovr: 74, number: 28, nationality: "JPN", pace: 76, racecraft: 73, tyreMgmt: 72, consistency: 74, wetSkill: 73 },
      { id: "drv_f4_6", fictionalName: "Alvise Vento", realName: "Alvise Rodella", teamId: "f4_van_amersfoort", ovr: 71, number: 33, nationality: "ITA", pace: 72, racecraft: 71, tyreMgmt: 70, consistency: 71, wetSkill: 70 },
      { id: "drv_f4_7", fictionalName: "Davide Rapido", realName: "Davide Larini", teamId: "f4_phm", ovr: 73, number: 3, nationality: "ITA", pace: 74, racecraft: 73, tyreMgmt: 71, consistency: 72, wetSkill: 73 },
      { id: "drv_f4_8", fictionalName: "Kamal Furia", realName: "Kamal Mrad", teamId: "f4_phm", ovr: 70, number: 9, nationality: "AUS", pace: 71, racecraft: 70, tyreMgmt: 70, consistency: 70, wetSkill: 69 },
      { id: "drv_f4_9", fictionalName: "Enzo Pignone", realName: "Enzo Deligny", teamId: "f4_cram", ovr: 73, number: 7, nationality: "FRA", pace: 74, racecraft: 73, tyreMgmt: 72, consistency: 72, wetSkill: 73 },
      { id: "drv_f4_10", fictionalName: "Filippo Curva", realName: "Filippo Fiorentino", teamId: "f4_cram", ovr: 70, number: 22, nationality: "BRA", pace: 71, racecraft: 70, tyreMgmt: 69, consistency: 70, wetSkill: 69 },
      { id: "drv_f4_11", fictionalName: "Lukas Schnell", realName: "Luka Sammalisto", teamId: "f4_jenzer", ovr: 72, number: 24, nationality: "FIN", pace: 73, racecraft: 72, tyreMgmt: 71, consistency: 72, wetSkill: 74 },
      { id: "drv_f4_12", fictionalName: "Adam Dardo", realName: "Adam Hideg", teamId: "f4_jenzer", ovr: 71, number: 25, nationality: "HUN", pace: 72, racecraft: 71, tyreMgmt: 70, consistency: 71, wetSkill: 70 },
      { id: "drv_f4_13", fictionalName: "Marco Fulmine", realName: "Matteo De Palo", teamId: "f4_iron_lynx", ovr: 73, number: 14, nationality: "ITA", pace: 74, racecraft: 73, tyreMgmt: 72, consistency: 73, wetSkill: 72 },
      { id: "drv_f4_14", fictionalName: "Emanuele Razzo", realName: "Emanuele Olivieri", teamId: "f4_iron_lynx", ovr: 71, number: 8, nationality: "ITA", pace: 72, racecraft: 71, tyreMgmt: 70, consistency: 70, wetSkill: 71 },
      { id: "drv_f4_15", fictionalName: "Luka Veloce", realName: "Luka Stolcermanis", teamId: "f4_race_gp", ovr: 72, number: 11, nationality: "LVA", pace: 73, racecraft: 72, tyreMgmt: 71, consistency: 71, wetSkill: 73 },
      { id: "drv_f4_16", fictionalName: "Nils Tempesta", realName: "Nils Koolen Junior", teamId: "f4_race_gp", ovr: 70, number: 17, nationality: "NLD", pace: 71, racecraft: 70, tyreMgmt: 69, consistency: 70, wetSkill: 69 }
    ]
  },

  auto_f3: {
    id: "auto_f3",
    tier: 3,
    maxDriversPerTeam: 3, // Regolamento FIA F3 ufficiale: 10 team x 3 vetture = 30 piloti
    name: "Formula 3 International",
    realSeriesName: "FIA Formula 3 Championship 2026",
    minAge: 17,
    calendar: ["melbourne", "bahrain", "imola", "monaco", "barcelona", "red_bull_ring", "silverstone", "spa", "hungaroring", "monza"],
    weekendFormat: { practiceLaps: 6, qualiLaps: 4, raceLapsMultiplier: 0.45, pitStops: false },
    licensePointsAwarded: 25,
    prizeBudgetPerRace: 28000,
    teams: [
      { id: "f3_prema", fictionalName: "Prima Scuderia F3", realName: "PREMA Racing F3", carPace: 76, reliability: 89, color: "#e10600", country: "ITA" },
      { id: "f3_trident", fictionalName: "Tridente Corse", realName: "Trident Motorsport F3", carPace: 76, reliability: 88, color: "#0047ba", country: "ITA" },
      { id: "f3_art", fictionalName: "ART Grand Prix F3", realName: "ART Grand Prix F3", carPace: 75, reliability: 87, color: "#ffffff", country: "FRA" },
      { id: "f3_campos", fictionalName: "Campos Iberia GP", realName: "Campos Racing F3", carPace: 74, reliability: 86, color: "#f2a900", country: "ESP" },
      { id: "f3_hitech", fictionalName: "Hitech Pulse F3", realName: "Hitech Pulse-Eight F3", carPace: 73, reliability: 85, color: "#b0b0b0", country: "GBR" },
      { id: "f3_van_amersfoort", fictionalName: "Van Tulip Racing F3", realName: "Van Amersfoort Racing F3", carPace: 73, reliability: 85, color: "#ff7900", country: "NLD" },
      { id: "f3_mp", fictionalName: "Orange MP Speed F3", realName: "MP Motorsport F3", carPace: 72, reliability: 84, color: "#ff6600", country: "NLD" },
      { id: "f3_rodin", fictionalName: "Rodin Down Under F3", realName: "Rodin Motorsport F3", carPace: 72, reliability: 84, color: "#002050", country: "NZL" },
      { id: "f3_dams", fictionalName: "DAMS Bleu Racing", realName: "DAMS Lucas Oil F3", carPace: 71, reliability: 83, color: "#002f6c", country: "FRA" },
      { id: "f3_jenzer", fictionalName: "Jenzer Helvetia GP", realName: "Jenzer Motorsport F3", carPace: 71, reliability: 84, color: "#0055a5", country: "CHE" }
    ],
    roster: [
      // PREMA (3 piloti)
      { id: "drv_f3_1", fictionalName: "Ugo Scattante", realName: "Ugo Ugochukwu", teamId: "f3_prema", ovr: 81, number: 1, nationality: "USA", pace: 83, racecraft: 81, tyreMgmt: 80, consistency: 80, wetSkill: 81 },
      { id: "drv_f3_2", fictionalName: "Brando Veloce", realName: "Brando Badoer", teamId: "f3_prema", ovr: 80, number: 2, nationality: "ITA", pace: 82, racecraft: 80, tyreMgmt: 79, consistency: 80, wetSkill: 80 },
      { id: "drv_f3_3", fictionalName: "Noel Storm", realName: "Noel León", teamId: "f3_prema", ovr: 79, number: 3, nationality: "MEX", pace: 81, racecraft: 79, tyreMgmt: 78, consistency: 79, wetSkill: 80 },
      // Trident (3 piloti)
      { id: "drv_f3_4", fictionalName: "Sami Meguetounif", realName: "Sami Meguetounif", teamId: "f3_trident", ovr: 81, number: 4, nationality: "FRA", pace: 82, racecraft: 81, tyreMgmt: 80, consistency: 81, wetSkill: 80 },
      { id: "drv_f3_5", fictionalName: "Charlie Dardo", realName: "Charlie Wurz", teamId: "f3_trident", ovr: 79, number: 5, nationality: "AUT", pace: 80, racecraft: 79, tyreMgmt: 79, consistency: 80, wetSkill: 81 },
      { id: "drv_f3_6", fictionalName: "Rafael Saetta", realName: "Rafael Câmara", teamId: "f3_trident", ovr: 80, number: 6, nationality: "BRA", pace: 82, racecraft: 80, tyreMgmt: 79, consistency: 78, wetSkill: 80 },
      // ART Grand Prix (3 piloti)
      { id: "drv_f3_7", fictionalName: "Laurens Van Fiandre", realName: "Laurens van Hoepen", teamId: "f3_art", ovr: 80, number: 7, nationality: "NLD", pace: 82, racecraft: 80, tyreMgmt: 79, consistency: 80, wetSkill: 81 },
      { id: "drv_f3_8", fictionalName: "Christian Fulmine", realName: "Christian Mansell", teamId: "f3_art", ovr: 80, number: 8, nationality: "AUS", pace: 81, racecraft: 81, tyreMgmt: 80, consistency: 79, wetSkill: 80 },
      { id: "drv_f3_9", fictionalName: "Tuukka Rapido", realName: "Tuukka Taponen", teamId: "f3_art", ovr: 79, number: 9, nationality: "FIN", pace: 81, racecraft: 79, tyreMgmt: 78, consistency: 79, wetSkill: 82 },
      // Campos (3 piloti)
      { id: "drv_f3_10", fictionalName: "Mariano El Torero", realName: "Mari Boya", teamId: "f3_campos", ovr: 80, number: 10, nationality: "ESP", pace: 81, racecraft: 81, tyreMgmt: 79, consistency: 80, wetSkill: 79 },
      { id: "drv_f3_11", fictionalName: "Oliver Lampo", realName: "Oliver Goethe", teamId: "f3_campos", ovr: 79, number: 11, nationality: "DEU", pace: 81, racecraft: 79, tyreMgmt: 78, consistency: 79, wetSkill: 80 },
      { id: "drv_f3_12", fictionalName: "Nikola Tempesta", realName: "Nikola Tsolov", teamId: "f3_campos", ovr: 79, number: 12, nationality: "BGR", pace: 81, racecraft: 80, tyreMgmt: 78, consistency: 78, wetSkill: 79 },
      // Hitech (3 piloti)
      { id: "drv_f3_13", fictionalName: "Gerrard Razzo", realName: "Gerrard Xie", teamId: "f3_hitech", ovr: 77, number: 14, nationality: "CHN", pace: 79, racecraft: 77, tyreMgmt: 76, consistency: 77, wetSkill: 76 },
      { id: "drv_f3_14", fictionalName: "Luke Dardo", realName: "Luke Browning Jr", teamId: "f3_hitech", ovr: 78, number: 15, nationality: "GBR", pace: 80, racecraft: 78, tyreMgmt: 77, consistency: 78, wetSkill: 80 },
      { id: "drv_f3_15", fictionalName: "Martinius Veloce", realName: "Martinius Stenshorne", teamId: "f3_hitech", ovr: 79, number: 16, nationality: "NOR", pace: 81, racecraft: 79, tyreMgmt: 78, consistency: 78, wetSkill: 81 },
      // Van Amersfoort (3 piloti)
      { id: "drv_f3_16", fictionalName: "Sophia Grinta", realName: "Sophia Flörsch", teamId: "f3_van_amersfoort", ovr: 76, number: 17, nationality: "DEU", pace: 77, racecraft: 78, tyreMgmt: 77, consistency: 78, wetSkill: 79 },
      { id: "drv_f3_17", fictionalName: "Tommy Frecce", realName: "Tommy Smith", teamId: "f3_van_amersfoort", ovr: 75, number: 18, nationality: "AUS", pace: 76, racecraft: 75, tyreMgmt: 75, consistency: 75, wetSkill: 74 },
      { id: "drv_f3_18", fictionalName: "Ivan Rapido", realName: "Ivan Domingues", teamId: "f3_van_amersfoort", ovr: 77, number: 19, nationality: "PRT", pace: 79, racecraft: 77, tyreMgmt: 76, consistency: 76, wetSkill: 77 },
      // MP Motorsport (3 piloti)
      { id: "drv_f3_19", fictionalName: "Tim Tulipano", realName: "Tim Tramnitz", teamId: "f3_mp", ovr: 79, number: 20, nationality: "DEU", pace: 81, racecraft: 79, tyreMgmt: 78, consistency: 79, wetSkill: 80 },
      { id: "drv_f3_20", fictionalName: "Kacper Polacco", realName: "Kacper Sztuka", teamId: "f3_mp", ovr: 77, number: 21, nationality: "POL", pace: 79, racecraft: 77, tyreMgmt: 76, consistency: 77, wetSkill: 78 },
      { id: "drv_f3_21", fictionalName: "Alex Falco", realName: "Alex Dunne", teamId: "f3_mp", ovr: 79, number: 22, nationality: "IRL", pace: 81, racecraft: 80, tyreMgmt: 77, consistency: 78, wetSkill: 81 },
      // Rodin (3 piloti)
      { id: "drv_f3_22", fictionalName: "Callum Fulmine", realName: "Callum Voisin", teamId: "f3_rodin", ovr: 78, number: 23, nationality: "GBR", pace: 80, racecraft: 78, tyreMgmt: 77, consistency: 78, wetSkill: 79 },
      { id: "drv_f3_23", fictionalName: "Joseph Vento", realName: "Joseph Loake", teamId: "f3_rodin", ovr: 76, number: 24, nationality: "GBR", pace: 78, racecraft: 76, tyreMgmt: 75, consistency: 76, wetSkill: 77 },
      { id: "drv_f3_24", fictionalName: "Piotr Razzo", realName: "Piotr Wiśnicki", teamId: "f3_rodin", ovr: 75, number: 25, nationality: "POL", pace: 76, racecraft: 75, tyreMgmt: 74, consistency: 75, wetSkill: 75 },
      // DAMS (3 piloti)
      { id: "drv_f3_25", fictionalName: "Dino Cavallini", realName: "Dino Beganovic", teamId: "f3_dams", ovr: 80, number: 26, nationality: "SWE", pace: 82, racecraft: 80, tyreMgmt: 80, consistency: 79, wetSkill: 80 },
      { id: "drv_f3_26", fictionalName: "Matías Scatto", realName: "Matías Zagazeta", teamId: "f3_dams", ovr: 76, number: 27, nationality: "PER", pace: 78, racecraft: 76, tyreMgmt: 75, consistency: 76, wetSkill: 75 },
      { id: "drv_f3_27", fictionalName: "Nicola Veloce", realName: "Nicola Lacorte", teamId: "f3_dams", ovr: 76, number: 28, nationality: "ITA", pace: 77, racecraft: 76, tyreMgmt: 75, consistency: 76, wetSkill: 77 },
      // Jenzer (3 piloti)
      { id: "drv_f3_28", fictionalName: "Max Alpen", realName: "Max Esterson", teamId: "f3_jenzer", ovr: 76, number: 29, nationality: "USA", pace: 78, racecraft: 76, tyreMgmt: 75, consistency: 76, wetSkill: 76 },
      { id: "drv_f3_29", fictionalName: "Charlie Alpino", realName: "Matías Ramos", teamId: "f3_jenzer", ovr: 75, number: 30, nationality: "ESP", pace: 76, racecraft: 75, tyreMgmt: 74, consistency: 75, wetSkill: 75 },
      { id: "drv_f3_30", fictionalName: "Joshua Razzo", realName: "Joshua Dufek", teamId: "f3_jenzer", ovr: 76, number: 31, nationality: "AUT", pace: 77, racecraft: 76, tyreMgmt: 75, consistency: 76, wetSkill: 77 }
    ]
  },

  auto_f2: {
    id: "auto_f2",
    tier: 2,
    maxDriversPerTeam: 2, // Regolamento FIA F2 ufficiale: 11 team x 2 vetture = 22 piloti
    name: "Formula 2 World Series",
    realSeriesName: "FIA Formula 2 Championship 2026",
    minAge: 19,
    calendar: ["melbourne", "bahrain", "jeddah", "imola", "monaco", "barcelona", "red_bull_ring", "silverstone", "spa", "hungaroring", "monza", "baku", "lusail", "yas_marina"],
    weekendFormat: { practiceLaps: 8, qualiLaps: 5, raceLapsMultiplier: 0.60, pitStops: true },
    licensePointsAwarded: 40,
    prizeBudgetPerRace: 80000,
    teams: [
      { id: "f2_prema", fictionalName: "Prima Squadra F2", realName: "PREMA Racing F2", carPace: 81, reliability: 89, color: "#e60000", country: "ITA" },
      { id: "f2_invicta", fictionalName: "Invicta Golden Arrows", realName: "Invicta Racing F2", carPace: 81, reliability: 88, color: "#ffd700", country: "GBR" },
      { id: "f2_art", fictionalName: "ART Grand Prix Paris", realName: "ART Grand Prix F2", carPace: 80, reliability: 88, color: "#ffffff", country: "FRA" },
      { id: "f2_mp", fictionalName: "Orange MP Speed", realName: "MP Motorsport F2", carPace: 79, reliability: 87, color: "#ff6600", country: "NLD" },
      { id: "f2_campos", fictionalName: "Campos Iberia F2", realName: "Campos Racing F2", carPace: 79, reliability: 86, color: "#f2a900", country: "ESP" },
      { id: "f2_hitech", fictionalName: "Hitech Pulse Engineering", realName: "Hitech Pulse-Eight F2", carPace: 78, reliability: 85, color: "#b0b0b0", country: "GBR" },
      { id: "f2_rodin", fictionalName: "Rodin Down Under", realName: "Rodin Motorsport F2", carPace: 78, reliability: 85, color: "#002050", country: "NZL" },
      { id: "f2_dams", fictionalName: "DAMS Lucas Oil", realName: "DAMS Lucas Oil F2", carPace: 77, reliability: 85, color: "#002f6c", country: "FRA" },
      { id: "f2_trident", fictionalName: "Tridente F2", realName: "Trident F2", carPace: 77, reliability: 84, color: "#0047ba", country: "ITA" },
      { id: "f2_van_amersfoort", fictionalName: "Van Tulip F2", realName: "Van Amersfoort Racing F2", carPace: 76, reliability: 84, color: "#ff7900", country: "NLD" },
      { id: "f2_aix", fictionalName: "AIX Berlin Racing", realName: "AIX Racing", carPace: 76, reliability: 83, color: "#00e5ff", country: "DEU" }
    ],
    roster: [
      { id: "drv_mini", fictionalName: "Gabriele Veloce", realName: "Gabriele Minì", teamId: "f2_prema", ovr: 86, number: 3, nationality: "ITA", pace: 88, racecraft: 86, tyreMgmt: 85, consistency: 86, wetSkill: 87 },
      { id: "drv_fornaroli", fictionalName: "Leo Campione", realName: "Leonardo Fornaroli", teamId: "f2_invicta", ovr: 86, number: 1, nationality: "ITA", pace: 87, racecraft: 86, tyreMgmt: 87, consistency: 88, wetSkill: 86 },
      { id: "drv_martins", fictionalName: "Victor Parigino", realName: "Victor Martins", teamId: "f2_art", ovr: 85, number: 5, nationality: "FRA", pace: 88, racecraft: 85, tyreMgmt: 83, consistency: 83, wetSkill: 86 },
      { id: "drv_aron", fictionalName: "Paul D'Argent", realName: "Paul Aron", teamId: "f2_hitech", ovr: 85, number: 17, nationality: "EST", pace: 87, racecraft: 86, tyreMgmt: 84, consistency: 84, wetSkill: 85 },
      { id: "drv_browning", fictionalName: "Luke Il Corsaro", realName: "Luke Browning", teamId: "f2_art", ovr: 84, number: 6, nationality: "GBR", pace: 86, racecraft: 85, tyreMgmt: 84, consistency: 83, wetSkill: 86 },
      { id: "drv_dunne", fictionalName: "Alex Shamrock", realName: "Alex Dunne", teamId: "f2_prema", ovr: 84, number: 4, nationality: "IRL", pace: 86, racecraft: 85, tyreMgmt: 83, consistency: 83, wetSkill: 87 },
      { id: "drv_maini", fictionalName: "Kush Bangalore", realName: "Kush Maini", teamId: "f2_invicta", ovr: 84, number: 2, nationality: "IND", pace: 85, racecraft: 84, tyreMgmt: 85, consistency: 85, wetSkill: 84 },
      { id: "drv_verschoor", fictionalName: "Richard Il Veterano", realName: "Richard Verschoor", teamId: "f2_mp", ovr: 84, number: 7, nationality: "NLD", pace: 85, racecraft: 86, tyreMgmt: 86, consistency: 85, wetSkill: 85 },
      { id: "drv_hauger", fictionalName: "Dennis Vichingo", realName: "Dennis Hauger", teamId: "f2_mp", ovr: 84, number: 8, nationality: "NOR", pace: 86, racecraft: 84, tyreMgmt: 84, consistency: 83, wetSkill: 85 },
      { id: "drv_crawford", fictionalName: "Jak Texas", realName: "Jak Crawford", teamId: "f2_dams", ovr: 84, number: 11, nationality: "USA", pace: 85, racecraft: 85, tyreMgmt: 84, consistency: 84, wetSkill: 83 },
      { id: "drv_correa", fictionalName: "Juan Manuel Miracolo", realName: "Juan Manuel Correa", teamId: "f2_dams", ovr: 82, number: 12, nationality: "USA", pace: 83, racecraft: 83, tyreMgmt: 83, consistency: 84, wetSkill: 83 },
      { id: "drv_miyata", fictionalName: "Ritomo Samurai", realName: "Ritomo Miyata", teamId: "f2_rodin", ovr: 83, number: 9, nationality: "JPN", pace: 85, racecraft: 83, tyreMgmt: 84, consistency: 83, wetSkill: 84 },
      { id: "drv_cordeel", fictionalName: "Amaury Belgio", realName: "Amaury Cordeel", teamId: "f2_hitech", ovr: 81, number: 18, nationality: "BEL", pace: 83, racecraft: 81, tyreMgmt: 80, consistency: 81, wetSkill: 82 },
      { id: "drv_stanek", fictionalName: "Roman Boemia", realName: "Roman Staněk", teamId: "f2_trident", ovr: 82, number: 22, nationality: "CZE", pace: 84, racecraft: 82, tyreMgmt: 82, consistency: 82, wetSkill: 84 },
      { id: "drv_villagomez", fictionalName: "Rafael Azteco", realName: "Rafael Villagómez", teamId: "f2_van_amersfoort", ovr: 81, number: 24, nationality: "MEX", pace: 83, racecraft: 81, tyreMgmt: 81, consistency: 81, wetSkill: 80 },
      { id: "drv_fittipaldi", fictionalName: "Enzo Dinastia", realName: "Enzo Fittipaldi", teamId: "f2_van_amersfoort", ovr: 83, number: 25, nationality: "BRA", pace: 85, racecraft: 84, tyreMgmt: 83, consistency: 83, wetSkill: 84 },
      { id: "drv_mansell", fictionalName: "Christian Downunder", realName: "Christian Mansell", teamId: "f2_rodin", ovr: 82, number: 10, nationality: "AUS", pace: 84, racecraft: 83, tyreMgmt: 82, consistency: 82, wetSkill: 83 },
      { id: "drv_montoya", fictionalName: "Sebas Cavalleria", realName: "Sebastián Montoya", teamId: "f2_campos", ovr: 83, number: 20, nationality: "COL", pace: 85, racecraft: 84, tyreMgmt: 82, consistency: 81, wetSkill: 85 },
      { id: "drv_goethe_f2", fictionalName: "Oliver Il Poeta", realName: "Oliver Goethe", teamId: "f2_campos", ovr: 83, number: 21, nationality: "DEU", pace: 85, racecraft: 83, tyreMgmt: 82, consistency: 83, wetSkill: 84 },
      { id: "drv_durksen", fictionalName: "Joshua Guaraní", realName: "Joshua Dürksen", teamId: "f2_aix", ovr: 83, number: 14, nationality: "PRY", pace: 85, racecraft: 84, tyreMgmt: 82, consistency: 82, wetSkill: 85 },
      { id: "drv_koolen", fictionalName: "Niels Tulipano", realName: "Niels Koolen", teamId: "f2_aix", ovr: 79, number: 15, nationality: "NLD", pace: 80, racecraft: 79, tyreMgmt: 79, consistency: 79, wetSkill: 80 },
      { id: "drv_verschoor_sub", fictionalName: "Maximiliano Veloce", realName: "Maximiliano Esterson", teamId: "f2_trident", ovr: 81, number: 23, nationality: "USA", pace: 83, racecraft: 81, tyreMgmt: 81, consistency: 81, wetSkill: 82 }
    ]
  },

  auto_f1: {
    id: "auto_f1",
    tier: 1,
    maxDriversPerTeam: 2, // Regolamento FIA F1 ufficiale: 11 team x 2 vetture = 22 piloti
    name: "Formula Apex World Championship 2026",
    realSeriesName: "Formula 1 World Championship 2026 (11 Teams)",
    minAge: 20,
    calendar: [
      "melbourne", "shanghai", "suzuka", "bahrain", "jeddah", "miami",
      "imola", "monaco", "montreal", "barcelona", "red_bull_ring", "silverstone",
      "spa", "hungaroring", "zandvoort", "monza", "madrid", "baku",
      "singapore", "cota", "mexico", "interlagos", "las_vegas", "lusail", "yas_marina"
    ],
    weekendFormat: { practiceLaps: 10, qualiLaps: 6, raceLapsMultiplier: 1.0, pitStops: true, hasSprint: false },
    sprintCircuits: ["shanghai", "miami", "spa", "cota", "interlagos", "lusail"],
    licensePointsAwarded: 50,
    prizeBudgetPerRace: 480000,
    teams: [
      { id: "f1_mclaren", fictionalName: "Papaya Rocket F1 (Norris #1/Piastri)", realName: "McLaren F1 Team", carPace: 89, reliability: 96, aero: 89, power: 88, chassis: 89, color: "#ff8000", country: "GBR" },
      { id: "f1_ferrari", fictionalName: "Scuderia Cavallino HP (Hamilton/Leclerc)", realName: "Scuderia Ferrari HP", carPace: 88, reliability: 94, aero: 88, power: 89, chassis: 88, color: "#e10600", country: "ITA" },
      { id: "f1_redbull", fictionalName: "Red Bullish Ford (Verstappen/Hadjar)", realName: "Oracle Red Bull Racing", carPace: 88, reliability: 93, aero: 88, power: 88, chassis: 88, color: "#1e41ff", country: "AUT" },
      { id: "f1_mercedes", fictionalName: "Silver Star Factory (Russell/Antonelli)", realName: "Mercedes-AMG PETRONAS F1 Team", carPace: 88, reliability: 96, aero: 87, power: 89, chassis: 88, color: "#00d2be", country: "DEU" },
      { id: "f1_aston", fictionalName: "British Green Newey Honda (Alonso/Stroll)", realName: "Aston Martin Aramco F1 Team", carPace: 84, reliability: 92, aero: 86, power: 85, chassis: 84, color: "#00665e", country: "GBR" },
      { id: "f1_williams", fictionalName: "Williams Smooth Revival (Sainz/Albon)", realName: "Williams Racing", carPace: 82, reliability: 92, aero: 81, power: 86, chassis: 81, color: "#00a0dd", country: "GBR" },
      { id: "f1_cadillac", fictionalName: "General Motors American Dream (Pérez/Bottas)", realName: "Cadillac Formula 1 Team", carPace: 79, reliability: 90, aero: 79, power: 84, chassis: 79, color: "#c4a000", country: "USA" },
      { id: "f1_audi", fictionalName: "Audi German Ring Factory (Hülk/Bortoleto)", realName: "Audi Revolut F1 Team", carPace: 79, reliability: 89, aero: 79, power: 81, chassis: 79, color: "#e00000", country: "DEU" },
      { id: "f1_haas", fictionalName: "Haas Stars & Stripes Toyota (Ocon/Bearman)", realName: "MoneyGram Haas F1 Team Toyota", carPace: 79, reliability: 89, aero: 78, power: 84, chassis: 78, color: "#b6babd", country: "USA" },
      { id: "f1_rb", fictionalName: "Racing Bulls Faenza (Lawson/Lindblad)", realName: "Visa Cash App Racing Bulls F1", carPace: 78, reliability: 89, aero: 78, power: 83, chassis: 78, color: "#1634ca", country: "ITA" },
      { id: "f1_alpine", fictionalName: "Bleu Alpine Mercedes (Gasly/Colapinto)", realName: "BWT Alpine F1 Team", carPace: 77, reliability: 88, aero: 76, power: 84, chassis: 77, color: "#0090ff", country: "FRA" }
    ],
    roster: [
      { id: "drv_norris", fictionalName: "Lando Porris Il Campione", realName: "Lando Norris", teamId: "f1_mclaren", ovr: 96, number: 1, nationality: "GBR", pace: 97, racecraft: 95, tyreMgmt: 96, consistency: 95, wetSkill: 96 },
      { id: "drv_piastri", fictionalName: "Oscar Glaciale", realName: "Oscar Piastri", teamId: "f1_mclaren", ovr: 93, number: 81, nationality: "AUS", pace: 94, racecraft: 93, tyreMgmt: 92, consistency: 95, wetSkill: 92 },
      { id: "drv_hamilton", fictionalName: "Sir Lewis Spamilton in Rosso", realName: "Lewis Hamilton", teamId: "f1_ferrari", ovr: 96, number: 44, nationality: "GBR", pace: 96, racecraft: 98, tyreMgmt: 98, consistency: 96, wetSkill: 98 },
      { id: "drv_leclerc", fictionalName: "Charles Predestinato", realName: "Charles Leclerc", teamId: "f1_ferrari", ovr: 96, number: 16, nationality: "MCO", pace: 99, racecraft: 95, tyreMgmt: 93, consistency: 93, wetSkill: 94 },
      { id: "drv_verstappen", fictionalName: "Max Versteppin Lo Sterminatore", realName: "Max Verstappen", teamId: "f1_redbull", ovr: 98, number: 33, nationality: "NLD", pace: 99, racecraft: 99, tyreMgmt: 96, consistency: 99, wetSkill: 99 },
      { id: "drv_hadjar", fictionalName: "Isack Rapace", realName: "Isack Hadjar", teamId: "f1_redbull", ovr: 84, number: 6, nationality: "FRA", pace: 86, racecraft: 85, tyreMgmt: 83, consistency: 83, wetSkill: 85 },
      { id: "drv_russell", fictionalName: "George Righello", realName: "George Russell", teamId: "f1_mercedes", ovr: 94, number: 63, nationality: "GBR", pace: 95, racecraft: 94, tyreMgmt: 93, consistency: 94, wetSkill: 94 },
      { id: "drv_antonelli", fictionalName: "Kimi Prodigio Nazionale", realName: "Andrea Kimi Antonelli", teamId: "f1_mercedes", ovr: 89, number: 12, nationality: "ITA", pace: 93, racecraft: 89, tyreMgmt: 87, consistency: 87, wetSkill: 91 },
      { id: "drv_alonso", fictionalName: "Fernando Alonslow Il Samurai", realName: "Fernando Alonso", teamId: "f1_aston", ovr: 92, number: 14, nationality: "ESP", pace: 91, racecraft: 98, tyreMgmt: 95, consistency: 96, wetSkill: 95 },
      { id: "drv_stroll", fictionalName: "Lance Milliardo", realName: "Lance Stroll", teamId: "f1_aston", ovr: 81, number: 18, nationality: "CAN", pace: 80, racecraft: 81, tyreMgmt: 82, consistency: 79, wetSkill: 86 },
      { id: "drv_sainz", fictionalName: "Carlos Operatore Liscio", realName: "Carlos Sainz Jr.", teamId: "f1_williams", ovr: 91, number: 55, nationality: "ESP", pace: 91, racecraft: 93, tyreMgmt: 93, consistency: 93, wetSkill: 91 },
      { id: "drv_albon", fictionalName: "Alex Redivivo", realName: "Alexander Albon", teamId: "f1_williams", ovr: 87, number: 23, nationality: "THA", pace: 88, racecraft: 89, tyreMgmt: 88, consistency: 87, wetSkill: 87 },
      { id: "drv_perez", fictionalName: "Checo Ministro Americano", realName: "Sergio Pérez", teamId: "f1_cadillac", ovr: 86, number: 11, nationality: "MEX", pace: 86, racecraft: 87, tyreMgmt: 91, consistency: 86, wetSkill: 87 },
      { id: "drv_bottas", fictionalName: "Valtteri Baffo Bottas", realName: "Valtteri Bottas", teamId: "f1_cadillac", ovr: 85, number: 77, nationality: "FIN", pace: 86, racecraft: 85, tyreMgmt: 86, consistency: 88, wetSkill: 87 },
      { id: "drv_hulkenberg", fictionalName: "Nico Il Pompiere Audi", realName: "Nico Hülkenberg", teamId: "f1_audi", ovr: 86, number: 27, nationality: "DEU", pace: 88, racecraft: 86, tyreMgmt: 85, consistency: 89, wetSkill: 88 },
      { id: "drv_bortoleto", fictionalName: "Gabriel Carioca Sauber-Audi", realName: "Gabriel Bortoleto", teamId: "f1_audi", ovr: 85, number: 5, nationality: "BRA", pace: 87, racecraft: 85, tyreMgmt: 84, consistency: 85, wetSkill: 86 },
      { id: "drv_ocon", fictionalName: "Esteban Barricata", realName: "Esteban Ocon", teamId: "f1_haas", ovr: 86, number: 31, nationality: "FRA", pace: 86, racecraft: 89, tyreMgmt: 86, consistency: 86, wetSkill: 88 },
      { id: "drv_bearman", fictionalName: "Ollie Orsetto", realName: "Oliver Bearman", teamId: "f1_haas", ovr: 85, number: 87, nationality: "GBR", pace: 87, racecraft: 86, tyreMgmt: 84, consistency: 85, wetSkill: 85 },
      { id: "drv_lawson", fictionalName: "Liam Kiwiboy", realName: "Liam Lawson", teamId: "f1_rb", ovr: 85, number: 30, nationality: "NZL", pace: 87, racecraft: 86, tyreMgmt: 85, consistency: 85, wetSkill: 86 },
      { id: "drv_lindblad", fictionalName: "Arvid Il Giovane Vichingo", realName: "Arvid Lindblad", teamId: "f1_rb", ovr: 82, number: 8, nationality: "GBR", pace: 84, racecraft: 83, tyreMgmt: 81, consistency: 82, wetSkill: 83 },
      { id: "drv_gasly", fictionalName: "Pierre Riscatto", realName: "Pierre Gasly", teamId: "f1_alpine", ovr: 86, number: 10, nationality: "FRA", pace: 86, racecraft: 87, tyreMgmt: 86, consistency: 86, wetSkill: 88 },
      { id: "drv_colapinto", fictionalName: "Franco Pampa Express", realName: "Franco Colapinto", teamId: "f1_alpine", ovr: 85, number: 43, nationality: "ARG", pace: 87, racecraft: 87, tyreMgmt: 84, consistency: 85, wetSkill: 86 }
    ]
  },

  auto_wec: {
    id: "auto_wec",
    tier: 1,
    maxDriversPerTeam: 2,
    name: "Hypercar World Endurance",
    realSeriesName: "FIA World Endurance Championship (Hypercar) 2026",
    minAge: 21,
    calendar: ["lusail", "imola", "spa", "le_mans", "interlagos", "cota", "suzuka", "bahrain"],
    weekendFormat: { practiceLaps: 12, qualiLaps: 6, raceLapsMultiplier: 1.2, pitStops: true },
    licensePointsAwarded: 40,
    prizeBudgetPerRace: 340000,
    teams: [
      { id: "wec_ferrari_af", fictionalName: "Cavallino Sarthe Hypercar (499P)", realName: "Ferrari AF Corse Hypercar", carPace: 96, reliability: 95, color: "#e10600", country: "ITA" },
      { id: "wec_toyota", fictionalName: "Sol Levante Hybrid 24 (GR010)", realName: "Toyota Gazoo Racing", carPace: 95, reliability: 96, color: "#ffffff", country: "JPN" },
      { id: "wec_porsche", fictionalName: "Stuttgart Penske Prototype (963)", realName: "Porsche Penske Motorsport", carPace: 95, reliability: 95, color: "#000000", country: "DEU" },
      { id: "wec_cadillac", fictionalName: "Detroit Thunder JOTA (V-Series.R)", realName: "Cadillac Hertz Team JOTA", carPace: 93, reliability: 92, color: "#d4af37", country: "USA" },
      { id: "wec_alpine", fictionalName: "Bleu Endurance Prototype (A424)", realName: "Alpine Endurance Team", carPace: 92, reliability: 91, color: "#0090ff", country: "FRA" },
      { id: "wec_bmw", fictionalName: "Bavaria WRT Hypercar (M Hybrid)", realName: "BMW M Team WRT", carPace: 93, reliability: 92, color: "#0033a0", country: "DEU" },
      { id: "wec_peugeot", fictionalName: "Leone Alato Alaless (9X8)", realName: "Peugeot TotalEnergies", carPace: 91, reliability: 90, color: "#99cc00", country: "FRA" },
      { id: "wec_aston", fictionalName: "Valkyrie Hypercar Sound (AMR-LMH)", realName: "Aston Martin Heart of Racing", carPace: 92, reliability: 90, color: "#00665e", country: "GBR" }
    ],
    roster: [
      { id: "drv_fuoco", fictionalName: "Antonio Fiamma", realName: "Antonio Fuoco", teamId: "wec_ferrari_af", ovr: 92, number: 50, nationality: "ITA", pace: 94, racecraft: 92, tyreMgmt: 93, consistency: 93, wetSkill: 94 },
      { id: "drv_giovinazzi", fictionalName: "Antonio Redentore", realName: "Antonio Giovinazzi", teamId: "wec_ferrari_af", ovr: 90, number: 51, nationality: "ITA", pace: 91, racecraft: 90, tyreMgmt: 91, consistency: 92, wetSkill: 90 },
      { id: "drv_kobayashi", fictionalName: "Kamui Kamikaze", realName: "Kamui Kobayashi", teamId: "wec_toyota", ovr: 91, number: 7, nationality: "JPN", pace: 93, racecraft: 92, tyreMgmt: 92, consistency: 92, wetSkill: 93 },
      { id: "drv_buemi", fictionalName: "Sébastien Svizzero", realName: "Sébastien Buemi", teamId: "wec_toyota", ovr: 90, number: 8, nationality: "CHE", pace: 91, racecraft: 91, tyreMgmt: 92, consistency: 93, wetSkill: 91 },
      { id: "drv_estre", fictionalName: "Kévin Sorpassatutto", realName: "Kévin Estre", teamId: "wec_porsche", ovr: 92, number: 6, nationality: "FRA", pace: 94, racecraft: 94, tyreMgmt: 92, consistency: 92, wetSkill: 95 },
      { id: "drv_lotterer", fictionalName: "André Il Maestro", realName: "André Lotterer", teamId: "wec_porsche", ovr: 90, number: 5, nationality: "DEU", pace: 91, racecraft: 91, tyreMgmt: 92, consistency: 93, wetSkill: 92 },
      { id: "drv_lynn", fictionalName: "Alex Velocissimo", realName: "Alex Lynn", teamId: "wec_cadillac", ovr: 89, number: 2, nationality: "GBR", pace: 90, racecraft: 89, tyreMgmt: 89, consistency: 90, wetSkill: 90 },
      { id: "drv_bourdais", fictionalName: "Sébastien Professore", realName: "Sébastien Bourdais", teamId: "wec_cadillac", ovr: 89, number: 3, nationality: "FRA", pace: 90, racecraft: 90, tyreMgmt: 91, consistency: 91, wetSkill: 91 },
      { id: "drv_schumacher_m", fictionalName: "Mick Baroncino", realName: "Mick Schumacher", teamId: "wec_alpine", ovr: 88, number: 36, nationality: "DEU", pace: 90, racecraft: 88, tyreMgmt: 87, consistency: 88, wetSkill: 89 },
      { id: "drv_chatin", fictionalName: "Paul Tricolore", realName: "Paul-Loup Chatin", teamId: "wec_alpine", ovr: 87, number: 35, nationality: "FRA", pace: 88, racecraft: 87, tyreMgmt: 88, consistency: 88, wetSkill: 87 },
      { id: "drv_vanthoor", fictionalName: "Dries Missile", realName: "Dries Vanthoor", teamId: "wec_bmw", ovr: 90, number: 15, nationality: "BEL", pace: 92, racecraft: 90, tyreMgmt: 89, consistency: 90, wetSkill: 91 },
      { id: "drv_marciello", fictionalName: "Lello Il Fulmine", realName: "Raffaele Marciello", teamId: "wec_bmw", ovr: 91, number: 20, nationality: "CHE", pace: 93, racecraft: 91, tyreMgmt: 90, consistency: 91, wetSkill: 94 },
      { id: "drv_vergne", fictionalName: "Jean-Éric Campione", realName: "Jean-Éric Vergne", teamId: "wec_peugeot", ovr: 89, number: 93, nationality: "FRA", pace: 90, racecraft: 90, tyreMgmt: 90, consistency: 91, wetSkill: 90 },
      { id: "drv_di_resta", fictionalName: "Paul Scozzese", realName: "Paul di Resta", teamId: "wec_peugeot", ovr: 87, number: 94, nationality: "GBR", pace: 88, racecraft: 88, tyreMgmt: 89, consistency: 89, wetSkill: 88 },
      { id: "drv_gunnon", fictionalName: "Jules Valkyrie", realName: "Jules Gounon", teamId: "wec_aston", ovr: 89, number: "007", nationality: "AND", pace: 91, racecraft: 89, tyreMgmt: 89, consistency: 90, wetSkill: 91 },
      { id: "drv_riberas", fictionalName: "Alex Cuore Racing", realName: "Alex Riberas", teamId: "wec_aston", ovr: 88, number: "009", nationality: "ESP", pace: 89, racecraft: 88, tyreMgmt: 88, consistency: 89, wetSkill: 88 }
    ]
  },

  auto_indy: {
    id: "auto_indy",
    tier: 1,
    maxDriversPerTeam: 2,
    name: "American Open Wheel Series",
    realSeriesName: "NTT IndyCar Series 2026",
    minAge: 20,
    calendar: ["miami", "cota", "indianapolis", "silverstone", "red_bull_ring", "interlagos", "las_vegas"],
    weekendFormat: { practiceLaps: 10, qualiLaps: 4, raceLapsMultiplier: 0.9, pitStops: true },
    licensePointsAwarded: 40,
    prizeBudgetPerRace: 290000,
    teams: [
      { id: "indy_ganassi", fictionalName: "Ganassi Victory Factory", realName: "Chip Ganassi Racing", carPace: 95, reliability: 95, color: "#003da5", country: "USA" },
      { id: "indy_penske", fictionalName: "The Captain Penske Team", realName: "Team Penske", carPace: 95, reliability: 95, color: "#e31837", country: "USA" },
      { id: "indy_arrow_mclaren", fictionalName: "Arrow Papaya America", realName: "Arrow McLaren IndyCar", carPace: 94, reliability: 93, color: "#ff8000", country: "USA" },
      { id: "indy_andretti", fictionalName: "Andretti Global Dynasty", realName: "Andretti Global", carPace: 93, reliability: 92, color: "#002b49", country: "USA" },
      { id: "indy_rahal", fictionalName: "Rahal Letterman Lanigan", realName: "Rahal Letterman Lanigan Racing", carPace: 91, reliability: 91, color: "#b30000", country: "USA" }
    ],
    roster: [
      { id: "drv_palou", fictionalName: "Alex Matematico", realName: "Alex Palou", teamId: "indy_ganassi", ovr: 94, number: 10, nationality: "ESP", pace: 95, racecraft: 94, tyreMgmt: 96, consistency: 97, wetSkill: 94 },
      { id: "drv_dixon", fictionalName: "Scott L'Immortale", realName: "Scott Dixon", teamId: "indy_ganassi", ovr: 92, number: 9, nationality: "NZL", pace: 91, racecraft: 94, tyreMgmt: 98, consistency: 98, wetSkill: 93 },
      { id: "drv_newgarden", fictionalName: "Joe Newgarden", realName: "Josef Newgarden", teamId: "indy_penske", ovr: 93, number: 2, nationality: "USA", pace: 95, racecraft: 95, tyreMgmt: 92, consistency: 93, wetSkill: 91 },
      { id: "drv_power", fictionalName: "Will Power Il Fulmine", realName: "Will Power", teamId: "indy_penske", ovr: 91, number: 12, nationality: "AUS", pace: 94, racecraft: 92, tyreMgmt: 90, consistency: 91, wetSkill: 92 },
      { id: "drv_oward", fictionalName: "Pato Pato", realName: "Pato O'Ward", teamId: "indy_arrow_mclaren", ovr: 92, number: 5, nationality: "MEX", pace: 94, racecraft: 95, tyreMgmt: 90, consistency: 90, wetSkill: 94 },
      { id: "drv_lundgaard", fictionalName: "Christian Vichingo", realName: "Christian Lundgaard", teamId: "indy_arrow_mclaren", ovr: 90, number: 7, nationality: "DNK", pace: 92, racecraft: 90, tyreMgmt: 90, consistency: 91, wetSkill: 91 },
      { id: "drv_herta", fictionalName: "Colton Rock Star", realName: "Colton Herta", teamId: "indy_andretti", ovr: 92, number: 26, nationality: "USA", pace: 95, racecraft: 93, tyreMgmt: 89, consistency: 89, wetSkill: 95 },
      { id: "drv_kirkwood", fictionalName: "Kyle Florida Boy", realName: "Kyle Kirkwood", teamId: "indy_andretti", ovr: 90, number: 27, nationality: "USA", pace: 92, racecraft: 91, tyreMgmt: 89, consistency: 90, wetSkill: 90 },
      { id: "drv_rahal", fictionalName: "Graham Il Veterano", realName: "Graham Rahal", teamId: "indy_rahal", ovr: 88, number: 15, nationality: "USA", pace: 88, racecraft: 89, tyreMgmt: 90, consistency: 90, wetSkill: 89 },
      { id: "drv_fittipaldi_p", fictionalName: "Pietro Il Nipote", realName: "Pietro Fittipaldi", teamId: "indy_rahal", ovr: 87, number: 30, nationality: "BRA", pace: 88, racecraft: 87, tyreMgmt: 88, consistency: 88, wetSkill: 88 }
    ]
  }
};
