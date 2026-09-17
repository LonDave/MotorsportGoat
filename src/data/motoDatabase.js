// Database del mondo Motociclismo aggiornato a Settembre 2026 con griglie e calendari completi
export const MOTO_CATEGORIES = {
  moto_3: {
    id: "moto_3",
    tier: 4,
    name: "Moto3 Junior World GP",
    realSeriesName: "FIM Moto3 World Championship 2026",
    minAge: 16,
    calendar: ["buriram", "cota", "jerez", "le_mans", "barcelona", "mugello", "brno", "assen", "sachsenring", "silverstone", "red_bull_ring", "misano", "phillip_island", "valencia"],
    weekendFormat: { practiceLaps: 6, qualiLaps: 4, raceLapsMultiplier: 0.50, hasSprint: false },
    licensePointsAwarded: 15,
    prizeBudgetPerRace: 14000,
    teams: [
      { id: "m3_aspar", fictionalName: "Aspar Cyan CFMOTO", realName: "CFMOTO Gaviota Aspar Team", bikePace: 77, reliability: 88, color: "#00acc1", country: "ESP" },
      { id: "m3_redbull_ajo", fictionalName: "Ajo Orange Rookies KTM", realName: "Red Bull KTM Ajo Moto3", bikePace: 78, reliability: 89, color: "#ff6600", country: "FIN" },
      { id: "m3_leopard", fictionalName: "Ghepardo Celesta Honda", realName: "Leopard Racing", bikePace: 76, reliability: 86, color: "#00e5ff", country: "LUX" },
      { id: "m3_sic58", fictionalName: "Squadra Corse 58 Marco", realName: "SIC58 Squadra Corse", bikePace: 75, reliability: 85, color: "#d50000", country: "ITA" },
      { id: "m3_tech3", fictionalName: "Tech3 Red Bull Junior", realName: "Red Bull KTM Tech3 Moto3", bikePace: 76, reliability: 87, color: "#ff3300", country: "FRA" }
    ],
    roster: [
      { id: "rid_m3_1", fictionalName: "Ivan Freccia", realName: "Iván Ortolá", teamId: "m3_redbull_ajo", ovr: 83, nationality: "ESP" },
      { id: "rid_m3_2", fictionalName: "Luca Lunetta", realName: "Luca Lunetta", teamId: "m3_sic58", ovr: 81, nationality: "ITA" },
      { id: "rid_m3_3", fictionalName: "Collin Olandese", realName: "Collin Veijer", teamId: "m3_leopard", ovr: 84, nationality: "NLD" },
      { id: "rid_m3_4", fictionalName: "Maximo Quiles", realName: "Máximo Quiles", teamId: "m3_aspar", ovr: 80, nationality: "ESP" }
    ]
  },

  moto_2: {
    id: "moto_2",
    tier: 3,
    name: "Moto2 Intermediate GP",
    realSeriesName: "FIM Moto2 World Championship 2026",
    minAge: 18,
    calendar: ["buriram", "cota", "jerez", "le_mans", "barcelona", "mugello", "brno", "assen", "sachsenring", "silverstone", "red_bull_ring", "aragon", "misano", "phillip_island", "sepang", "valencia"],
    weekendFormat: { practiceLaps: 8, qualiLaps: 4, raceLapsMultiplier: 0.65, hasSprint: false },
    licensePointsAwarded: 30,
    prizeBudgetPerRace: 48000,
    teams: [
      { id: "m2_aspar", fictionalName: "Aspar Moto2 Team", realName: "CFMOTO Gaviota Aspar Team", bikePace: 86, reliability: 88, color: "#00acc1", country: "ESP" },
      { id: "m2_mt", fictionalName: "MT Helmets MSi Speed", realName: "MT Helmets - MSi Moto2", bikePace: 85, reliability: 88, color: "#00bcd4", country: "ESP" },
      { id: "m2_marc_vds", fictionalName: "Elf Marc VDS Birra Rossa", realName: "Elf Marc VDS Racing Team", bikePace: 84, reliability: 86, color: "#b71c1c", country: "BEL" },
      { id: "m2_redbull_ajo", fictionalName: "Ajo Red Bull Moto2", realName: "Red Bull KTM Ajo Moto2", bikePace: 84, reliability: 87, color: "#ff6600", country: "FIN" },
      { id: "m2_fantic", fictionalName: "Fantic Cavalleria Tricolore", realName: "Fantic Racing Moto2", bikePace: 83, reliability: 85, color: "#e53935", country: "ITA" }
    ],
    roster: [
      { id: "rid_alonso_d", fictionalName: "David Colombo Il Fenomeno", realName: "David Alonso", teamId: "m2_aspar", ovr: 86, nationality: "COL" },
      { id: "rid_holgado", fictionalName: "Dani Furia Holgado", realName: "Daniel Holgado", teamId: "m2_mt", ovr: 84, nationality: "ESP" },
      { id: "rid_arbolino", fictionalName: "Tony Erba Arbolino", realName: "Tony Arbolino", teamId: "m2_marc_vds", ovr: 84, nationality: "ITA" },
      { id: "rid_vietti", fictionalName: "Cele Vietti 13", realName: "Celestino Vietti", teamId: "m2_redbull_ajo", ovr: 83, nationality: "ITA" }
    ]
  },

  moto_gp: {
    id: "moto_gp",
    tier: 1,
    name: "MotoGP World Championship 2026",
    realSeriesName: "FIM MotoGP World Championship 2026 (Final 1000cc Era)",
    minAge: 20,
    calendar: [
      "buriram", "cota", "jerez", "le_mans", "barcelona", "mugello",
      "brno", "assen", "sachsenring", "silverstone", "red_bull_ring",
      "aragon", "misano", "phillip_island", "sepang", "lusail", "valencia"
    ],
    weekendFormat: { practiceLaps: 10, qualiLaps: 5, raceLapsMultiplier: 1.0, hasSprint: true },
    licensePointsAwarded: 50,
    prizeBudgetPerRace: 420000,
    teams: [
      { id: "mgp_ducati", fictionalName: "Bologna Desmo Dream Team (Márquez/Bagnaia)", realName: "Ducati Lenovo Team", bikePace: 98, reliability: 95, engine: 99, aero: 98, braking: 98, color: "#cc0000", country: "ITA" },
      { id: "mgp_pramac", fictionalName: "Pramac Yamaha Factory (Toprak/Miller)", realName: "Prima Pramac Yamaha MotoGP", bikePace: 92, reliability: 93, engine: 92, aero: 93, braking: 93, color: "#002060", country: "ITA" },
      { id: "mgp_aprilia", fictionalName: "Noale V4 Factory (Martín/Bezzecchi)", realName: "Aprilia Racing Factory", bikePace: 95, reliability: 92, engine: 95, aero: 96, braking: 95, color: "#000000", country: "ITA" },
      { id: "mgp_ktm", fictionalName: "Orange Bull Factory (Acosta/Binder)", realName: "Red Bull KTM Factory Racing", bikePace: 95, reliability: 93, engine: 97, aero: 94, braking: 96, color: "#ff6600", country: "AUT" },
      { id: "mgp_tech3", fictionalName: "Tech3 Red Bull Factory (Viñales/Bastianini)", realName: "Red Bull KTM Tech3", bikePace: 94, reliability: 92, engine: 96, aero: 93, braking: 94, color: "#ff3300", country: "FRA" },
      { id: "mgp_vr46", fictionalName: "Tavullia 46 Desmo Factory (Diggia/Morbidelli)", realName: "Pertamina Enduro VR46 Racing", bikePace: 94, reliability: 93, engine: 96, aero: 94, braking: 94, color: "#ffff00", country: "ITA" },
      { id: "mgp_gresini", fictionalName: "Gresini Famiglia Azzurra (A. Márquez/Aldeguer)", realName: "Gresini Racing MotoGP", bikePace: 93, reliability: 93, engine: 95, aero: 93, braking: 93, color: "#81d4fa", country: "ITA" },
      { id: "mgp_yamaha", fictionalName: "Iwata Monster V4 (Quartararo/Rins)", realName: "Monster Energy Yamaha MotoGP", bikePace: 92, reliability: 94, engine: 92, aero: 93, braking: 93, color: "#001a4e", country: "JPN" },
      { id: "mgp_trackhouse", fictionalName: "Trackhouse USA Wings (Fernández/Ogura)", realName: "Trackhouse MotoGP Team", bikePace: 90, reliability: 90, engine: 93, aero: 92, braking: 90, color: "#0033a0", country: "USA" },
      { id: "mgp_honda", fictionalName: "Tokyo Repsol HRC (Mir/Marini)", realName: "Honda HRC Castrol Factory", bikePace: 89, reliability: 91, engine: 93, aero: 88, braking: 90, color: "#ff5500", country: "JPN" },
      { id: "mgp_lcr", fictionalName: "LCR Lucio Corse (Zarco/Moreira)", realName: "LCR Honda Idemitsu / Castrol", bikePace: 88, reliability: 90, engine: 92, aero: 87, braking: 89, color: "#008855", country: "MCO" }
    ],
    roster: [
      { id: "rid_marquez_m", fictionalName: "Marc La Formica Atomica", realName: "Marc Márquez", teamId: "mgp_ducati", ovr: 97, number: 93, nationality: "ESP", pace: 99, racecraft: 99, tyreMgmt: 94, consistency: 93, wetSkill: 99 },
      { id: "rid_bagnaia", fictionalName: "Pecco Lasagna Nuvola Rossa", realName: "Francesco Bagnaia", teamId: "mgp_ducati", ovr: 96, number: 63, nationality: "ITA", pace: 98, racecraft: 95, tyreMgmt: 96, consistency: 94, wetSkill: 92 },
      { id: "rid_toprak", fictionalName: "Toprak Stoppie King Lo Spettacolo", realName: "Toprak Razgatlıoğlu", teamId: "mgp_pramac", ovr: 95, number: 54, nationality: "TUR", pace: 96, racecraft: 97, tyreMgmt: 92, consistency: 93, wetSkill: 94 },
      { id: "rid_miller", fictionalName: "Jack Thriller Il Selvaggio", realName: "Jack Miller", teamId: "mgp_pramac", ovr: 86, number: 43, nationality: "AUS", pace: 88, racecraft: 89, tyreMgmt: 82, consistency: 83, wetSkill: 94 },
      { id: "rid_martin", fictionalName: "Jorge Martinator Lo Spagnolo", realName: "Jorge Martín", teamId: "mgp_aprilia", ovr: 95, number: 89, nationality: "ESP", pace: 98, racecraft: 94, tyreMgmt: 92, consistency: 93, wetSkill: 90 },
      { id: "rid_bezzecchi", fictionalName: "Bez Il Riccio Romagnolo", realName: "Marco Bezzecchi", teamId: "mgp_aprilia", ovr: 90, number: 72, nationality: "ITA", pace: 92, racecraft: 91, tyreMgmt: 89, consistency: 89, wetSkill: 92 },
      { id: "rid_acosta", fictionalName: "Pedro Lo Squalo Di Mazarron", realName: "Pedro Acosta", teamId: "mgp_ktm", ovr: 94, number: 31, nationality: "ESP", pace: 96, racecraft: 96, tyreMgmt: 91, consistency: 90, wetSkill: 94 },
      { id: "rid_binder", fictionalName: "Brad Il Gladiatore Africano", realName: "Brad Binder", teamId: "mgp_ktm", ovr: 89, number: 33, nationality: "ZAF", pace: 89, racecraft: 94, tyreMgmt: 88, consistency: 88, wetSkill: 94 },
      { id: "rid_vinales", fictionalName: "Maverick Top Gun Batmav", realName: "Maverick Viñales", teamId: "mgp_tech3", ovr: 90, number: 12, nationality: "ESP", pace: 93, racecraft: 88, tyreMgmt: 87, consistency: 86, wetSkill: 87 },
      { id: "rid_bastianini", fictionalName: "Enea La Bestia Riminese", realName: "Enea Bastianini", teamId: "mgp_tech3", ovr: 92, number: 23, nationality: "ITA", pace: 93, racecraft: 96, tyreMgmt: 98, consistency: 90, wetSkill: 89 },
      { id: "rid_digiannantonio", fictionalName: "Diggia Gladiatore Capitolino", realName: "Fabio Di Giannantonio", teamId: "mgp_vr46", ovr: 90, number: 49, nationality: "ITA", pace: 91, racecraft: 90, tyreMgmt: 91, consistency: 89, wetSkill: 88 },
      { id: "rid_morbidelli", fictionalName: "Franco Il Poeta Del Gas", realName: "Franco Morbidelli", teamId: "mgp_vr46", ovr: 88, number: 21, nationality: "ITA", pace: 89, racecraft: 88, tyreMgmt: 88, consistency: 87, wetSkill: 87 },
      { id: "rid_marquez_a", fictionalName: "Alex Pistola Fratellino", realName: "Alex Márquez", teamId: "mgp_gresini", ovr: 88, number: 73, nationality: "ESP", pace: 88, racecraft: 88, tyreMgmt: 87, consistency: 87, wetSkill: 89 },
      { id: "rid_aldeguer", fictionalName: "Fermín Il Missile Murciano", realName: "Fermín Aldeguer", teamId: "mgp_gresini", ovr: 86, number: 54, nationality: "ESP", pace: 89, racecraft: 85, tyreMgmt: 84, consistency: 83, wetSkill: 84 },
      { id: "rid_quartararo", fictionalName: "Fabio El Diablo Di Nizza", realName: "Fabio Quartararo", teamId: "mgp_yamaha", ovr: 92, number: 20, nationality: "FRA", pace: 95, racecraft: 93, tyreMgmt: 93, consistency: 94, wetSkill: 87 },
      { id: "rid_rins", fictionalName: "Alex Lo Specialista Di Curve", realName: "Alex Rins", teamId: "mgp_yamaha", ovr: 86, number: 42, nationality: "ESP", pace: 87, racecraft: 87, tyreMgmt: 87, consistency: 85, wetSkill: 88 },
      { id: "rid_raulfernandez", fictionalName: "Raúl Lo Spagnolo", realName: "Raúl Fernández", teamId: "mgp_trackhouse", ovr: 85, number: 25, nationality: "ESP", pace: 87, racecraft: 85, tyreMgmt: 84, consistency: 85, wetSkill: 84 },
      { id: "rid_ogura", fictionalName: "Ai Samurai Silenzioso", realName: "Ai Ogura", teamId: "mgp_trackhouse", ovr: 85, number: 79, nationality: "JPN", pace: 87, racecraft: 86, tyreMgmt: 85, consistency: 86, wetSkill: 84 },
      { id: "rid_mir", fictionalName: "Joan Il Miracoloso", realName: "Joan Mir", teamId: "mgp_honda", ovr: 85, number: 36, nationality: "ESP", pace: 86, racecraft: 87, tyreMgmt: 85, consistency: 83, wetSkill: 87 },
      { id: "rid_marini", fictionalName: "Luca Il Professore Di Paddock", realName: "Luca Marini", teamId: "mgp_honda", ovr: 85, number: 10, nationality: "ITA", pace: 86, racecraft: 85, tyreMgmt: 86, consistency: 89, wetSkill: 84 },
      { id: "rid_zarco", fictionalName: "Johann Salto Mortale", realName: "Johann Zarco", teamId: "mgp_lcr", ovr: 86, number: 5, nationality: "FRA", pace: 86, racecraft: 87, tyreMgmt: 87, consistency: 85, wetSkill: 93 },
      { id: "rid_moreira", fictionalName: "Diogo Il Brasiliano", realName: "Diogo Moreira", teamId: "mgp_lcr", ovr: 82, number: 10, nationality: "BRA", pace: 83, racecraft: 83, tyreMgmt: 82, consistency: 81, wetSkill: 82 }
    ]
  },

  moto_sbk: {
    id: "moto_sbk",
    tier: 1,
    name: "World Superbike SBK 2026",
    realSeriesName: "FIM Superbike World Championship 2026",
    minAge: 20,
    calendar: ["phillip_island", "portimao", "assen", "most", "aragon", "misano", "donington", "le_mans", "cremona", "jerez"],
    weekendFormat: { practiceLaps: 8, qualiLaps: 4, raceLapsMultiplier: 0.8, hasSprint: true },
    licensePointsAwarded: 40,
    prizeBudgetPerRace: 220000,
    teams: [
      { id: "sbk_ducati", fictionalName: "Aruba Rossa Superbike (Bulega/Lecuona)", realName: "Aruba.it Racing - Ducati SBK", bikePace: 96, reliability: 95, color: "#cc0000", country: "ITA" },
      { id: "sbk_bmw", fictionalName: "Bavaria Motorrad SBK (Petrucci/Oliveira)", realName: "ROKiT BMW Motorrad WorldSBK", bikePace: 95, reliability: 94, color: "#0d47a1", country: "DEU" },
      { id: "sbk_barni", fictionalName: "Barni Spark Rossa (Bautista)", realName: "Barni Spark Racing Team Ducati", bikePace: 94, reliability: 94, color: "#e53935", country: "ITA" },
      { id: "sbk_yamaha", fictionalName: "Pata Maxus Yamaha SBK (Locatelli/Vierge)", realName: "Pata Maxus Yamaha SBK", bikePace: 92, reliability: 93, color: "#002060", country: "JPN" },
      { id: "sbk_bimota", fictionalName: "Bimota Kawasaki Factory (Bassani/Lowes)", realName: "bimota by Kawasaki Racing Team", bikePace: 92, reliability: 92, color: "#d50000", country: "ITA" },
      { id: "sbk_goeleven", fictionalName: "Team GoEleven Giallo (Iannone)", realName: "Team GoEleven Ducati", bikePace: 91, reliability: 92, color: "#ffd700", country: "ITA" }
    ],
    roster: [
      { id: "rid_bulega", fictionalName: "Niccolò Bulegas Il Capitano", realName: "Nicolò Bulega", teamId: "sbk_ducati", ovr: 95, number: 11, nationality: "ITA" },
      { id: "rid_lecuona", fictionalName: "Iker Lo Spagnolo", realName: "Iker Lecuona", teamId: "sbk_ducati", ovr: 90, number: 7, nationality: "ESP" },
      { id: "rid_petrucci", fictionalName: "Danilo Petrux Il Gladiatore", realName: "Danilo Petrucci", teamId: "sbk_bmw", ovr: 93, number: 9, nationality: "ITA" },
      { id: "rid_bautista", fictionalName: "Alvaro Bau Bau Il Campione", realName: "Álvaro Bautista", teamId: "sbk_barni", ovr: 93, number: 19, nationality: "ESP" },
      { id: "rid_locatelli", fictionalName: "Loka Andrea Bergamo", realName: "Andrea Locatelli", teamId: "sbk_yamaha", ovr: 91, number: 55, nationality: "ITA" },
      { id: "rid_iannone", fictionalName: "The Maniac Andrea Show", realName: "Andrea Iannone", teamId: "sbk_goeleven", ovr: 90, number: 29, nationality: "ITA" },
      { id: "rid_bassani", fictionalName: "Axel Il Selvaggio Veneto", realName: "Axel Bassani", teamId: "sbk_bimota", ovr: 89, number: 47, nationality: "ITA" }
    ]
  }
};
