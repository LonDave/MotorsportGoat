// Database dei palmarès storici reali dei piloti e delle leggende prima della stagione 2026
// Utilizzato per rendere dinamica la classifica GOAT Hall of Fame, aggiornabile durante la carriera di gioco.

export const DRIVER_BASELINES = {
  // === LEGENDE STORICHE RITIRATE ===
  legend_agostini: {
    id: "legend_agostini",
    realName: "Giacomo Agostini",
    fictionalName: "Giacomo Ago Nazionale",
    discipline: "moto",
    isLegend: true,
    era: "1963-1977",
    notableNote: "15 Mondiali (8 in 500cc/MotoGP), 122 vittorie e 10 Tourist Trophy",
    byCategory: {
      moto_gp: { worldTitles: 8, wins: 68, poles: 9, podiums: 88, racesStarted: 120 },
      moto_2: { worldTitles: 7, wins: 54, poles: 0, podiums: 71, racesStarted: 70 } // 350cc World Championships
    }
  },

  legend_schumacher: {
    id: "legend_schumacher",
    realName: "Michael Schumacher",
    fictionalName: "Michele Il Barone Rosso",
    discipline: "auto",
    isLegend: true,
    era: "1991-2012",
    notableNote: "7 Titoli Mondiali F1 (5 con la Ferrari), 91 vittorie e 155 podi",
    byCategory: {
      auto_f1: { worldTitles: 7, wins: 91, poles: 68, podiums: 155, racesStarted: 308 },
      auto_f3: { worldTitles: 1, wins: 6, poles: 7, podiums: 9, racesStarted: 14 } // F3 Tedesca & Macao 1990
    }
  },

  legend_rossi: {
    id: "legend_rossi",
    realName: "Valentino Rossi",
    fictionalName: "Valentin Il Dottore 46",
    discipline: "moto",
    isLegend: true,
    era: "1996-2021",
    notableNote: "9 Mondiali in 4 classi diverse, 115 vittorie e 235 podi mondiali",
    byCategory: {
      moto_gp: { worldTitles: 7, wins: 89, poles: 55, podiums: 199, racesStarted: 372 },
      moto_2: { worldTitles: 1, wins: 14, poles: 5, podiums: 21, racesStarted: 30 }, // 250cc 1999
      moto_3: { worldTitles: 1, wins: 12, poles: 5, podiums: 15, racesStarted: 30 }  // 125cc 1997
    }
  },

  legend_fangio: {
    id: "legend_fangio",
    realName: "Juan Manuel Fangio",
    fictionalName: "Juan Il Maestro Delle Pampas",
    discipline: "auto",
    isLegend: true,
    era: "1950-1958",
    notableNote: "Record storico di 47.1% di vittorie e 5 mondiali F1 con 4 team diversi",
    byCategory: {
      auto_f1: { worldTitles: 5, wins: 24, poles: 29, podiums: 35, racesStarted: 51 }
    }
  },

  legend_senna: {
    id: "legend_senna",
    realName: "Ayrton Senna",
    fictionalName: "Ayrton Il Mago Di San Paolo",
    discipline: "auto",
    isLegend: true,
    era: "1984-1994",
    notableNote: "3 Titoli Mondiali F1, 41 vittorie, 65 pole e 6 trionfi a Monaco",
    byCategory: {
      auto_f1: { worldTitles: 3, wins: 41, poles: 65, podiums: 80, racesStarted: 161 },
      auto_f3: { worldTitles: 1, wins: 12, poles: 15, podiums: 15, racesStarted: 20 } // British F3 & Macao 1983
    }
  },

  legend_prost: {
    id: "legend_prost",
    realName: "Alain Prost",
    fictionalName: "Alain Il Professore Di Francia",
    discipline: "auto",
    isLegend: true,
    era: "1980-1993",
    notableNote: "4 Titoli Mondiali F1, 51 vittorie e maestro supremo di strategia e tattica",
    byCategory: {
      auto_f1: { worldTitles: 4, wins: 51, poles: 33, podiums: 106, racesStarted: 199 },
      auto_f3: { worldTitles: 1, wins: 7, poles: 5, podiums: 10, racesStarted: 16 } // F3 Europea 1979
    }
  },

  legend_doohan: {
    id: "legend_doohan",
    realName: "Mick Doohan",
    fictionalName: "Mick Mano Di Ferro",
    discipline: "moto",
    isLegend: true,
    era: "1989-1999",
    notableNote: "5 Titoli Mondiali 500cc consecutivi dominati con coraggio indomito",
    byCategory: {
      moto_gp: { worldTitles: 5, wins: 54, poles: 58, podiums: 95, racesStarted: 137 }
    }
  },

  legend_lorenzo: {
    id: "legend_lorenzo",
    realName: "Jorge Lorenzo",
    fictionalName: "Giorgio Martillo Y Mantequilla",
    discipline: "moto",
    isLegend: true,
    era: "2002-2019",
    notableNote: "5 Titoli Mondiali (3 MotoGP, 2 250cc), 68 vittorie e 152 podi",
    byCategory: {
      moto_gp: { worldTitles: 3, wins: 47, poles: 43, podiums: 114, racesStarted: 203 },
      moto_2: { worldTitles: 2, wins: 17, poles: 23, podiums: 29, racesStarted: 48 }, // 250cc
      moto_3: { worldTitles: 0, wins: 4, poles: 3, podiums: 9, racesStarted: 46 }     // 125cc
    }
  },

  legend_surtees: {
    id: "legend_surtees",
    realName: "John Surtees",
    fictionalName: "John Il Dominatore Di Due Mondi",
    discipline: "both",
    isLegend: true,
    era: "1952-1972",
    notableNote: "Unico pilota nella storia del motorsport iridato sia in Formula 1 che in 500cc",
    byCategory: {
      auto_f1: { worldTitles: 1, wins: 6, poles: 8, podiums: 24, racesStarted: 111 },
      moto_gp: { worldTitles: 7, wins: 38, poles: 8, podiums: 45, racesStarted: 49 } // 500cc e 350cc
    }
  },

  legend_stoner: {
    id: "legend_stoner",
    realName: "Casey Stoner",
    fictionalName: "Casey Il Canguro Mannaro",
    discipline: "moto",
    isLegend: true,
    era: "2002-2012",
    notableNote: "2 Titoli Mondiali MotoGP con Ducati e Honda, talento naturale puro",
    byCategory: {
      moto_gp: { worldTitles: 2, wins: 38, poles: 39, podiums: 69, racesStarted: 115 },
      moto_2: { worldTitles: 0, wins: 5, poles: 2, podiums: 10, racesStarted: 31 },
      moto_3: { worldTitles: 0, wins: 2, poles: 2, podiums: 10, racesStarted: 30 }
    }
  },

  legend_lauda: {
    id: "legend_lauda",
    realName: "Niki Lauda",
    fictionalName: "Niki Il Computer Viennese",
    discipline: "auto",
    isLegend: true,
    era: "1971-1985",
    notableNote: "3 Titoli Mondiali F1 (2 Ferrari, 1 McLaren) e leggenda vivente",
    byCategory: {
      auto_f1: { worldTitles: 3, wins: 25, poles: 24, podiums: 54, racesStarted: 171 }
    }
  },

  legend_vettel: {
    id: "legend_vettel",
    realName: "Sebastian Vettel",
    fictionalName: "Seb Il Dito Imperiale",
    discipline: "auto",
    isLegend: true,
    era: "2007-2022",
    notableNote: "4 Titoli Mondiali F1 consecutivi, 53 vittorie e 57 pole position",
    byCategory: {
      auto_f1: { worldTitles: 4, wins: 53, poles: 57, podiums: 122, racesStarted: 299 },
      auto_f4: { worldTitles: 1, wins: 18, poles: 14, podiums: 20, racesStarted: 20 } // Formula BMW ADAC
    }
  },

  // === PILOTI ATTIVI AUTOMOBILISMO (Formula 1, F2, F3, F4) ===
  drv_hamilton: {
    id: "drv_hamilton",
    realName: "Lewis Hamilton",
    fictionalName: "Sir Lewis Spamilton in Rosso",
    discipline: "auto",
    isLegend: false,
    era: "2007-Attivo",
    notableNote: "Record assoluto di 105 Vittorie e 104 Pole in F1, 7 Titoli Mondiali",
    byCategory: {
      auto_f1: { worldTitles: 7, wins: 105, poles: 104, podiums: 201, racesStarted: 350 },
      auto_f2: { worldTitles: 1, wins: 5, poles: 1, podiums: 14, racesStarted: 21 }, // GP2 2006 Champion
      auto_f3: { worldTitles: 1, wins: 15, poles: 13, podiums: 17, racesStarted: 20 }, // F3 Euro 2005 Champion
      auto_f4: { worldTitles: 1, wins: 10, poles: 11, podiums: 13, racesStarted: 15 } // Formula Renault UK
    }
  },

  drv_verstappen: {
    id: "drv_verstappen",
    realName: "Max Verstappen",
    fictionalName: "Max Versteppin Lo Sterminatore",
    discipline: "auto",
    isLegend: false,
    era: "2015-Attivo",
    notableNote: "4 Titoli Mondiali F1, record di 19 vittorie in una stagione e 63 successi",
    byCategory: {
      auto_f1: { worldTitles: 4, wins: 63, poles: 40, podiums: 111, racesStarted: 206 },
      auto_f3: { worldTitles: 0, wins: 10, poles: 7, podiums: 16, racesStarted: 33 } // European F3 2014
    }
  },

  drv_alonso: {
    id: "drv_alonso",
    realName: "Fernando Alonso",
    fictionalName: "Fernando Alonslow Il Samurai",
    discipline: "auto",
    isLegend: false,
    era: "2001-Attivo",
    notableNote: "2 Titoli Mondiali F1, Campione del Mondo WEC Hypercar e 2x 24h Le Mans",
    byCategory: {
      auto_f1: { worldTitles: 2, wins: 32, poles: 22, podiums: 106, racesStarted: 398 },
      auto_wec: { worldTitles: 1, wins: 5, poles: 4, podiums: 7, racesStarted: 8 },
      auto_f3: { worldTitles: 1, wins: 6, poles: 6, podiums: 8, racesStarted: 15 }
    }
  },

  drv_leclerc: {
    id: "drv_leclerc",
    realName: "Charles Leclerc",
    fictionalName: "Charles Predestinato",
    discipline: "auto",
    isLegend: false,
    era: "2018-Attivo",
    notableNote: "Vincitore a Monaco e Monza con la Ferrari, Campione del Mondo F2 e GP3",
    byCategory: {
      auto_f1: { worldTitles: 0, wins: 8, poles: 26, podiums: 42, racesStarted: 146 },
      auto_f2: { worldTitles: 1, wins: 7, poles: 8, podiums: 10, racesStarted: 22 }, // F2 2017 Champion
      auto_f3: { worldTitles: 1, wins: 3, poles: 4, podiums: 8, racesStarted: 18 },  // GP3 2016 Champion
      auto_f4: { worldTitles: 0, wins: 2, poles: 1, podiums: 7, racesStarted: 14 }
    }
  },

  drv_norris: {
    id: "drv_norris",
    realName: "Lando Norris",
    fictionalName: "Lando Porris Il Campione",
    discipline: "auto",
    isLegend: false,
    era: "2019-Attivo",
    notableNote: "Vincitore di Gran Premi F1 con McLaren, Campione F3 e MSA Formula",
    byCategory: {
      auto_f1: { worldTitles: 0, wins: 4, poles: 8, podiums: 28, racesStarted: 128 },
      auto_f2: { worldTitles: 0, wins: 1, poles: 1, podiums: 9, racesStarted: 24 },
      auto_f3: { worldTitles: 1, wins: 9, poles: 8, podiums: 20, racesStarted: 30 }, // European F3 2017
      auto_f4: { worldTitles: 1, wins: 8, poles: 10, podiums: 15, racesStarted: 30 } // MSA Formula 2015
    }
  },

  drv_piastri: {
    id: "drv_piastri",
    realName: "Oscar Piastri",
    fictionalName: "Oscar Glaciale",
    discipline: "auto",
    isLegend: false,
    era: "2023-Attivo",
    notableNote: "Vincitore al debutto in F1, straordinario triplo campione consecutivo F4/F3/F2",
    byCategory: {
      auto_f1: { worldTitles: 0, wins: 2, poles: 0, podiums: 10, racesStarted: 44 },
      auto_f2: { worldTitles: 1, wins: 6, poles: 5, podiums: 11, racesStarted: 23 }, // F2 2021
      auto_f3: { worldTitles: 1, wins: 2, poles: 0, podiums: 6, racesStarted: 18 },  // F3 2020
      auto_f4: { worldTitles: 1, wins: 7, poles: 5, podiums: 11, racesStarted: 19 } // Eurocup 2019
    }
  },

  drv_russell: {
    id: "drv_russell",
    realName: "George Russell",
    fictionalName: "George Righello",
    discipline: "auto",
    isLegend: false,
    era: "2019-Attivo",
    notableNote: "Vincitore di GP con la Mercedes, Campione del Mondo F2 e GP3",
    byCategory: {
      auto_f1: { worldTitles: 0, wins: 3, poles: 5, podiums: 15, racesStarted: 126 },
      auto_f2: { worldTitles: 1, wins: 7, poles: 5, podiums: 11, racesStarted: 24 }, // F2 2018
      auto_f3: { worldTitles: 1, wins: 4, poles: 1, podiums: 9, racesStarted: 15 },  // GP3 2017
      auto_f4: { worldTitles: 1, wins: 5, poles: 3, podiums: 11, racesStarted: 24 } // BRDC F4 2014
    }
  },

  drv_sainz: {
    id: "drv_sainz",
    realName: "Carlos Sainz Jr.",
    fictionalName: "Carlos Operatore Liscio",
    discipline: "auto",
    isLegend: false,
    era: "2015-Attivo",
    notableNote: "Vincitore con Ferrari a Silverstone, Singapore, Melbourne e Messico, Campione FR3.5",
    byCategory: {
      auto_f1: { worldTitles: 0, wins: 4, poles: 6, podiums: 25, racesStarted: 204 },
      auto_f2: { worldTitles: 1, wins: 7, poles: 7, podiums: 7, racesStarted: 17 } // Formula Renault 3.5 2014
    }
  },

  drv_perez: {
    id: "drv_perez",
    realName: "Sergio Pérez",
    fictionalName: "Checo Ministro Americano",
    discipline: "auto",
    isLegend: false,
    era: "2011-Attivo",
    notableNote: "6 vittorie in F1 (Monaco, Baku, Singapore), 39 podi e campione F3 National",
    byCategory: {
      auto_f1: { worldTitles: 0, wins: 6, poles: 3, podiums: 39, racesStarted: 281 },
      auto_f2: { worldTitles: 0, wins: 5, poles: 1, podiums: 7, racesStarted: 20 },
      auto_f3: { worldTitles: 1, wins: 14, poles: 12, podiums: 19, racesStarted: 22 }
    }
  },

  drv_bottas: {
    id: "drv_bottas",
    realName: "Valtteri Bottas",
    fictionalName: "Valtteri Baffo Bottas",
    discipline: "auto",
    isLegend: false,
    era: "2013-Attivo",
    notableNote: "10 vittorie in Formula 1 con la Mercedes, 67 podi e Campione GP3 2011",
    byCategory: {
      auto_f1: { worldTitles: 0, wins: 10, poles: 20, podiums: 67, racesStarted: 244 },
      auto_f3: { worldTitles: 1, wins: 4, poles: 1, podiums: 7, racesStarted: 16 }
    }
  },

  drv_gasly: {
    id: "drv_gasly",
    realName: "Pierre Gasly",
    fictionalName: "Pierre Riscatto",
    discipline: "auto",
    isLegend: false,
    era: "2017-Attivo",
    notableNote: "Vincitore a Monza 2020 con AlphaTauri e Campione GP2 2016",
    byCategory: {
      auto_f1: { worldTitles: 0, wins: 1, poles: 0, podiums: 4, racesStarted: 150 },
      auto_f2: { worldTitles: 1, wins: 4, poles: 5, podiums: 9, racesStarted: 22 }
    }
  },

  drv_ocon: {
    id: "drv_ocon",
    realName: "Esteban Ocon",
    fictionalName: "Esteban Barricata",
    discipline: "auto",
    isLegend: false,
    era: "2016-Attivo",
    notableNote: "Vincitore del GP d'Ungheria 2021, Campione F3 Europea e GP3",
    byCategory: {
      auto_f1: { worldTitles: 0, wins: 1, poles: 0, podiums: 4, racesStarted: 154 },
      auto_f3: { worldTitles: 2, wins: 10, poles: 18, podiums: 29, racesStarted: 51 }
    }
  },

  drv_antonelli: {
    id: "drv_antonelli",
    realName: "Andrea Kimi Antonelli",
    fictionalName: "Kimi Prodigio Nazionale",
    discipline: "auto",
    isLegend: false,
    era: "2025-Attivo",
    notableNote: "Prodigio Mercedes, vincitore di F2 e dominatore assoluto di F4 e FRECA",
    byCategory: {
      auto_f1: { worldTitles: 0, wins: 0, poles: 0, podiums: 0, racesStarted: 0 },
      auto_f2: { worldTitles: 0, wins: 2, poles: 0, podiums: 3, racesStarted: 24 },
      auto_f4: { worldTitles: 3, wins: 26, poles: 23, podiums: 35, racesStarted: 44 }
    }
  },

  drv_bearman: {
    id: "drv_bearman",
    realName: "Oliver Bearman",
    fictionalName: "Ollie Orsetto",
    discipline: "auto",
    isLegend: false,
    era: "2024-Attivo",
    notableNote: "Campione Italiano ed Europeo F4, plurivincitore di manche in Formula 2",
    byCategory: {
      auto_f1: { worldTitles: 0, wins: 0, poles: 0, podiums: 0, racesStarted: 3 },
      auto_f2: { worldTitles: 0, wins: 6, poles: 3, podiums: 8, racesStarted: 44 },
      auto_f4: { worldTitles: 2, wins: 14, poles: 10, podiums: 23, racesStarted: 40 }
    }
  },

  drv_bortoleto: {
    id: "drv_bortoleto",
    realName: "Gabriel Bortoleto",
    fictionalName: "Gabriel Carioca Sauber-Audi",
    discipline: "auto",
    isLegend: false,
    era: "2025-Attivo",
    notableNote: "Campione consecutivo Formula 3 (2023) e Formula 2 (2024)",
    byCategory: {
      auto_f1: { worldTitles: 0, wins: 0, poles: 0, podiums: 0, racesStarted: 0 },
      auto_f2: { worldTitles: 1, wins: 2, poles: 2, podiums: 5, racesStarted: 24 },
      auto_f3: { worldTitles: 1, wins: 2, poles: 1, podiums: 6, racesStarted: 18 }
    }
  },

  drv_fornaroli: {
    id: "drv_fornaroli",
    realName: "Leonardo Fornaroli",
    fictionalName: "Leo Campione",
    discipline: "auto",
    isLegend: false,
    era: "2025-Attivo",
    notableNote: "Campione del Mondo FIA Formula 3 2024",
    byCategory: {
      auto_f2: { worldTitles: 0, wins: 0, poles: 0, podiums: 0, racesStarted: 0 },
      auto_f3: { worldTitles: 1, wins: 0, poles: 2, podiums: 7, racesStarted: 18 }
    }
  },

  drv_mini: {
    id: "drv_mini",
    realName: "Gabriele Minì",
    fictionalName: "Gabriele Veloce",
    discipline: "auto",
    isLegend: false,
    era: "2025-Attivo",
    notableNote: "Campione Italiano Formula 4 2020 e plurivincitore a Monaco F3",
    byCategory: {
      auto_f2: { worldTitles: 0, wins: 0, poles: 0, podiums: 1, racesStarted: 2 },
      auto_f3: { worldTitles: 0, wins: 3, poles: 2, podiums: 9, racesStarted: 36 },
      auto_f4: { worldTitles: 1, wins: 4, poles: 9, podiums: 12, racesStarted: 21 }
    }
  },

  // === PILOTI ATTIVI MOTOCICLISMO (MotoGP, Moto2, Moto3, WorldSBK) ===
  drv_marquez: {
    id: "drv_marquez",
    realName: "Marc Márquez",
    fictionalName: "Marc La Formica Atomica",
    discipline: "moto",
    isLegend: false,
    era: "2008-Attivo",
    notableNote: "8 Titoli Mondiali (6 MotoGP, 1 Moto2, 1 125cc), 88 vittorie e 94 pole",
    byCategory: {
      moto_gp: { worldTitles: 6, wins: 62, poles: 66, podiums: 107, racesStarted: 173 },
      moto_2: { worldTitles: 1, wins: 16, poles: 14, podiums: 25, racesStarted: 32 },
      moto_3: { worldTitles: 1, wins: 10, poles: 14, podiums: 14, racesStarted: 46 }
    }
  },

  drv_bagnaia: {
    id: "drv_bagnaia",
    realName: "Francesco Bagnaia",
    fictionalName: "Pecco Nuvola Rossa",
    discipline: "moto",
    isLegend: false,
    era: "2013-Attivo",
    notableNote: "3 Titoli Mondiali (2 MotoGP consecutivi con Ducati, 1 Moto2) e 29 vittorie",
    byCategory: {
      moto_gp: { worldTitles: 2, wins: 29, poles: 24, podiums: 51, racesStarted: 108 },
      moto_2: { worldTitles: 1, wins: 8, poles: 6, podiums: 16, racesStarted: 36 },
      moto_3: { worldTitles: 0, wins: 2, poles: 1, podiums: 7, racesStarted: 68 }
    }
  },

  drv_martin: {
    id: "drv_martin",
    realName: "Jorge Martín",
    fictionalName: "Martinator Lo Specialista",
    discipline: "moto",
    isLegend: false,
    era: "2015-Attivo",
    notableNote: "Campione del Mondo MotoGP 2024 e Campione Moto3 2018",
    byCategory: {
      moto_gp: { worldTitles: 1, wins: 8, poles: 20, podiums: 32, racesStarted: 74 },
      moto_2: { worldTitles: 0, wins: 2, poles: 1, podiums: 6, racesStarted: 29 },
      moto_3: { worldTitles: 1, wins: 8, poles: 20, podiums: 20, racesStarted: 65 }
    }
  },

  drv_acosta: {
    id: "drv_acosta",
    realName: "Pedro Acosta",
    fictionalName: "El Tiburón Di Mazarrón",
    discipline: "moto",
    isLegend: false,
    era: "2021-Attivo",
    notableNote: "Campione del Mondo Moto3 (2021) e Moto2 (2023) al debutto",
    byCategory: {
      moto_gp: { worldTitles: 0, wins: 0, poles: 1, podiums: 5, racesStarted: 20 },
      moto_2: { worldTitles: 1, wins: 10, poles: 4, podiums: 19, racesStarted: 38 },
      moto_3: { worldTitles: 1, wins: 6, poles: 1, podiums: 8, racesStarted: 18 }
    }
  },

  drv_quartararo: {
    id: "drv_quartararo",
    realName: "Fabio Quartararo",
    fictionalName: "El Diablo Di Nizza",
    discipline: "moto",
    isLegend: false,
    era: "2015-Attivo",
    notableNote: "Campione del Mondo MotoGP 2021 con Yamaha, 11 vittorie e 16 pole",
    byCategory: {
      moto_gp: { worldTitles: 1, wins: 11, poles: 16, podiums: 31, racesStarted: 110 },
      moto_2: { worldTitles: 0, wins: 1, poles: 1, podiums: 2, racesStarted: 36 }
    }
  },

  drv_bautista: {
    id: "drv_bautista",
    realName: "Álvaro Bautista",
    fictionalName: "Alvaro La Furia Rossa",
    discipline: "moto",
    isLegend: false,
    era: "2002-Attivo",
    notableNote: "2 Titoli Mondiali WorldSBK Superbike consecutivi con Ducati e Campione 125cc",
    byCategory: {
      moto_sbk: { worldTitles: 2, wins: 61, poles: 10, podiums: 102, racesStarted: 185 },
      moto_gp: { worldTitles: 0, wins: 0, poles: 1, podiums: 3, racesStarted: 158 },
      moto_2: { worldTitles: 0, wins: 8, poles: 8, podiums: 28, racesStarted: 49 },
      moto_3: { worldTitles: 1, wins: 8, poles: 8, podiums: 18, racesStarted: 67 }
    }
  },

  drv_toprak: {
    id: "drv_toprak",
    realName: "Toprak Razgatlıoğlu",
    fictionalName: "El Turco Acrobata",
    discipline: "moto",
    isLegend: false,
    era: "2018-Attivo",
    notableNote: "2 Titoli Mondiali WorldSBK Superbike con Yamaha e BMW, maestro di staccate",
    byCategory: {
      moto_sbk: { worldTitles: 2, wins: 54, poles: 17, podiums: 138, racesStarted: 222 }
    }
  },

  // === INDYCAR SERIES ===
  drv_dixon: {
    id: "drv_dixon",
    realName: "Scott Dixon",
    fictionalName: "Scott L'Immortale",
    discipline: "auto",
    isLegend: false,
    era: "2001-Attivo",
    notableNote: "6 Titoli IndyCar, 58 vittorie, 142 podi e vincitore della 500 Miglia di Indianapolis",
    byCategory: {
      auto_indy: { worldTitles: 6, wins: 58, poles: 33, podiums: 142, racesStarted: 400 }
    }
  },

  drv_palou: {
    id: "drv_palou",
    realName: "Alex Palou",
    fictionalName: "Alex Matematico",
    discipline: "auto",
    isLegend: false,
    era: "2020-Attivo",
    notableNote: "3 Titoli IndyCar (2021, 2023, 2024), 12 vittorie e dominatore moderno della serie",
    byCategory: {
      auto_indy: { worldTitles: 3, wins: 12, poles: 6, podiums: 31, racesStarted: 81 }
    }
  },

  drv_newgarden: {
    id: "drv_newgarden",
    realName: "Josef Newgarden",
    fictionalName: "Joe Newgarden",
    discipline: "auto",
    isLegend: false,
    era: "2012-Attivo",
    notableNote: "2 Titoli IndyCar e 2 volte vincitore consecutivo della leggendaria Indy 500 (2023, 2024)",
    byCategory: {
      auto_indy: { worldTitles: 2, wins: 31, poles: 18, podiums: 56, racesStarted: 200 }
    }
  },

  drv_power: {
    id: "drv_power",
    realName: "Will Power",
    fictionalName: "Will Power Il Fulmine",
    discipline: "auto",
    isLegend: false,
    era: "2008-Attivo",
    notableNote: "2 Titoli IndyCar, vincitore Indy 500 e recordman assoluto con 70 pole position",
    byCategory: {
      auto_indy: { worldTitles: 2, wins: 44, poles: 70, podiums: 100, racesStarted: 290 }
    }
  },

  drv_herta: {
    id: "drv_herta",
    realName: "Colton Herta",
    fictionalName: "Colton Rock Star",
    discipline: "auto",
    isLegend: false,
    era: "2019-Attivo",
    notableNote: "Il più giovane vincitore di sempre in IndyCar (18 anni), 9 vittorie e 14 pole",
    byCategory: {
      auto_indy: { worldTitles: 0, wins: 9, poles: 14, podiums: 19, racesStarted: 90 }
    }
  },

  drv_oward: {
    id: "drv_oward",
    realName: "Pato O'Ward",
    fictionalName: "Pato Pato",
    discipline: "auto",
    isLegend: false,
    era: "2019-Attivo",
    notableNote: "Stella messicana McLaren IndyCar, 7 vittorie e 26 podi",
    byCategory: {
      auto_indy: { worldTitles: 0, wins: 7, poles: 5, podiums: 26, racesStarted: 90 }
    }
  },

  drv_rahal: {
    id: "drv_rahal",
    realName: "Graham Rahal",
    fictionalName: "Graham Il Veterano",
    discipline: "auto",
    isLegend: false,
    era: "2007-Attivo",
    notableNote: "Veterano storico IndyCar con 6 vittorie e 33 podi in carriera",
    byCategory: {
      auto_indy: { worldTitles: 0, wins: 6, poles: 5, podiums: 33, racesStarted: 270 }
    }
  },

  drv_kirkwood: {
    id: "drv_kirkwood",
    realName: "Kyle Kirkwood",
    fictionalName: "Kyle Florida Boy",
    discipline: "auto",
    isLegend: false,
    era: "2022-Attivo",
    notableNote: "Vincitore a Long Beach e Nashville IndyCar con Andretti Global",
    byCategory: {
      auto_indy: { worldTitles: 0, wins: 2, poles: 2, podiums: 3, racesStarted: 45 }
    }
  },

  drv_lundgaard: {
    id: "drv_lundgaard",
    realName: "Christian Lundgaard",
    fictionalName: "Christian Vichingo",
    discipline: "auto",
    isLegend: false,
    era: "2022-Attivo",
    notableNote: "Vincitore a Toronto in IndyCar ed ex vincitore di manche in Formula 2",
    byCategory: {
      auto_indy: { worldTitles: 0, wins: 1, poles: 2, podiums: 3, racesStarted: 50 },
      auto_f2: { worldTitles: 0, wins: 2, poles: 1, podiums: 9, racesStarted: 41 }
    }
  },

  drv_fittipaldi_p: {
    id: "drv_fittipaldi_p",
    realName: "Pietro Fittipaldi",
    fictionalName: "Pietro Il Nipote",
    discipline: "auto",
    isLegend: false,
    era: "2018-Attivo",
    notableNote: "Campione Formula V8 3.5 e pilota ufficiale Rahal Letterman Lanigan IndyCar",
    byCategory: {
      auto_indy: { worldTitles: 0, wins: 0, poles: 0, podiums: 0, racesStarted: 30 }
    }
  },

  // === FIA WEC HYPERCAR ===
  drv_buemi: {
    id: "drv_buemi",
    realName: "Sébastien Buemi",
    fictionalName: "Sébastien Svizzero",
    discipline: "auto",
    isLegend: false,
    era: "2012-Attivo",
    notableNote: "4 Titoli Mondiali WEC Hypercar e 4 volte trionfatore alla 24 Ore di Le Mans",
    byCategory: {
      auto_wec: { worldTitles: 4, wins: 24, poles: 18, podiums: 45, racesStarted: 80 }
    }
  },

  drv_kobayashi: {
    id: "drv_kobayashi",
    realName: "Kamui Kobayashi",
    fictionalName: "Kamui Kamikaze",
    discipline: "auto",
    isLegend: false,
    era: "2013-Attivo",
    notableNote: "2 Titoli Mondiali WEC, vincitore 24h Le Mans 2021 e podio storico a Suzuka F1",
    byCategory: {
      auto_wec: { worldTitles: 2, wins: 16, poles: 19, podiums: 36, racesStarted: 65 },
      auto_f1: { worldTitles: 0, wins: 0, poles: 0, podiums: 1, racesStarted: 75 }
    }
  },

  drv_lotterer: {
    id: "drv_lotterer",
    realName: "André Lotterer",
    fictionalName: "André Il Maestro",
    discipline: "auto",
    isLegend: false,
    era: "2012-Attivo",
    notableNote: "2 Titoli Mondiali WEC (2012 con Audi, 2024 con Porsche) e 3 volte re di Le Mans",
    byCategory: {
      auto_wec: { worldTitles: 2, wins: 15, poles: 14, podiums: 42, racesStarted: 80 }
    }
  },

  drv_estre: {
    id: "drv_estre",
    realName: "Kévin Estre",
    fictionalName: "Kévin Sorpassatutto",
    discipline: "auto",
    isLegend: false,
    era: "2015-Attivo",
    notableNote: "2 Titoli Mondiali WEC (GT e Hypercar 2024 con Porsche 963)",
    byCategory: {
      auto_wec: { worldTitles: 2, wins: 11, poles: 12, podiums: 30, racesStarted: 60 }
    }
  },

  drv_fuoco: {
    id: "drv_fuoco",
    realName: "Antonio Fuoco",
    fictionalName: "Antonio Fiamma",
    discipline: "auto",
    isLegend: false,
    era: "2023-Attivo",
    notableNote: "Vincitore storico della 24 Ore di Le Mans 2024 con la Ferrari 499P Hypercar",
    byCategory: {
      auto_wec: { worldTitles: 0, wins: 3, poles: 6, podiums: 12, racesStarted: 25 },
      auto_f2: { worldTitles: 0, wins: 3, poles: 0, podiums: 11, racesStarted: 46 }
    }
  },

  drv_giovinazzi: {
    id: "drv_giovinazzi",
    realName: "Antonio Giovinazzi",
    fictionalName: "Antonio Redentore",
    discipline: "auto",
    isLegend: false,
    era: "2023-Attivo",
    notableNote: "Vincitore del Centenario della 24 Ore di Le Mans 2023 con Ferrari 499P ed ex F1",
    byCategory: {
      auto_wec: { worldTitles: 0, wins: 2, poles: 2, podiums: 8, racesStarted: 20 },
      auto_f1: { worldTitles: 0, wins: 0, poles: 0, podiums: 0, racesStarted: 62 },
      auto_f2: { worldTitles: 0, wins: 5, poles: 2, podiums: 8, racesStarted: 22 }
    }
  },

  drv_bourdais: {
    id: "drv_bourdais",
    realName: "Sébastien Bourdais",
    fictionalName: "Sébastien Professore",
    discipline: "auto",
    isLegend: false,
    era: "2003-Attivo",
    notableNote: "4 Titoli ChampCar consecutivi, vincitore di classe a Le Mans e podi WEC Hypercar",
    byCategory: {
      auto_wec: { worldTitles: 0, wins: 4, poles: 6, podiums: 15, racesStarted: 40 },
      auto_indy: { worldTitles: 4, wins: 37, poles: 34, podiums: 73, racesStarted: 218 }
    }
  },

  // === WORLDSBK SUPERBIKE ===
  drv_rea: {
    id: "drv_rea",
    realName: "Jonathan Rea",
    fictionalName: "Johnny Cannibale",
    discipline: "moto",
    isLegend: false,
    era: "2008-Attivo",
    notableNote: "Record assoluto di 6 Mondiali WorldSBK consecutivi, 119 vittorie e 264 podi",
    byCategory: {
      moto_sbk: { worldTitles: 6, wins: 119, poles: 44, podiums: 264, racesStarted: 420 }
    }
  },

  drv_bulega: {
    id: "drv_bulega",
    realName: "Nicolò Bulega",
    fictionalName: "Nicolò Il Razzo",
    discipline: "moto",
    isLegend: false,
    era: "2023-Attivo",
    notableNote: "Campione del Mondo WorldSSP 2023 e Vice-Campione WorldSBK 2024 al debutto con Ducati",
    byCategory: {
      moto_sbk: { worldTitles: 0, wins: 6, poles: 4, podiums: 24, racesStarted: 36 }
    }
  },

  drv_petrucci: {
    id: "drv_petrucci",
    realName: "Danilo Petrucci",
    fictionalName: "Petrux Nazionale",
    discipline: "moto",
    isLegend: false,
    era: "2012-Attivo",
    notableNote: "2 Vittorie in MotoGP (Mugello e Le Mans), tripletta storica WorldSBK Cremona e tappa Dakar",
    byCategory: {
      moto_sbk: { worldTitles: 0, wins: 3, poles: 0, podiums: 14, racesStarted: 70 },
      moto_gp: { worldTitles: 0, wins: 2, poles: 0, podiums: 10, racesStarted: 169 }
    }
  },

  drv_iannone: {
    id: "drv_iannone",
    realName: "Andrea Iannone",
    fictionalName: "The Maniac",
    discipline: "moto",
    isLegend: false,
    era: "2005-Attivo",
    notableNote: "Vincitore in MotoGP (Austria 2016 Ducati) e vincitore al rientro in WorldSBK ad Aragon 2024",
    byCategory: {
      moto_sbk: { worldTitles: 0, wins: 1, poles: 0, podiums: 5, racesStarted: 36 },
      moto_gp: { worldTitles: 0, wins: 1, poles: 2, podiums: 11, racesStarted: 118 },
      moto_2: { worldTitles: 0, wins: 8, poles: 5, podiums: 19, racesStarted: 51 }
    }
  },

  drv_locatelli: {
    id: "drv_locatelli",
    realName: "Andrea Locatelli",
    fictionalName: "Loka Regolarità",
    discipline: "moto",
    isLegend: false,
    era: "2020-Attivo",
    notableNote: "Campione del Mondo WorldSSP 2020 con record di vittorie e pilota ufficiale Yamaha WorldSBK",
    byCategory: {
      moto_sbk: { worldTitles: 0, wins: 0, poles: 1, podiums: 16, racesStarted: 120 }
    }
  }
};
