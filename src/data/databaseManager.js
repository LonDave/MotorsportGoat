import { AUTO_CATEGORIES } from './autoDatabase.js';
import { MOTO_CATEGORIES } from './motoDatabase.js';
import { CIRCUITS_DATA } from './circuitsDatabase.js';

class DatabaseManager {
  constructor() {
    // Carica preferenza nomi da localStorage (default: false = Fittizi, come Il Nuovo GOAT)
    const savedReal = typeof localStorage !== 'undefined' ? localStorage.getItem('il_nuovo_goat_real_names') : null;
    this.isRealNames = savedReal === 'true';
    this.customOverrides = {};
    // Database piloti personalizzati e Regen generati durante la carriera
    this.customDrivers = {};
    // Anno di campionato attivo (aggiornato a ogni passaggio di stagione)
    this.activeYear = 2026;
    // Attributi dinamici AI aggiornati dalla carriera (crescita/declino stagionale)
    this.aiDriverAttributes = {};
    // Sviluppo dinamico vetture/moto aggiornato da R&D e progressione AI
    this.teamDevelopment = {};

    // Prova a caricare eventuali override personalizzati
    try {
      const savedCustom = typeof localStorage !== 'undefined' ? localStorage.getItem('il_nuovo_goat_custom_names_db') : null;
      if (savedCustom) {
        this.customOverrides = JSON.parse(savedCustom);
      }
    } catch (e) {
      console.warn("Impossibile caricare database personalizzato:", e);
    }

    this.listeners = [];
  }

  onModeChange(callback) {
    this.listeners.push(callback);
  }

  notifyChange() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('il_nuovo_goat_real_names', this.isRealNames ? 'true' : 'false');
    }
    this.listeners.forEach(cb => {
      try { cb(this.isRealNames); } catch (e) { console.error(e); }
    });
  }

  toggleRealNames() {
    this.isRealNames = !this.isRealNames;
    this.notifyChange();
    return this.isRealNames;
  }

  setRealNames(enabled) {
    this.isRealNames = !!enabled;
    this.notifyChange();
  }

  importCustomJson(jsonString) {
    try {
      const parsed = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
      if (!parsed || typeof parsed !== 'object') throw new Error("File JSON non valido.");
      this.customOverrides = parsed;
      localStorage.setItem('il_nuovo_goat_custom_names_db', JSON.stringify(parsed));
      this.isRealNames = true; // Attiva automaticamente i nomi reali se importato
      this.notifyChange();
      return { success: true, message: "Database nomi reali importato con successo!" };
    } catch (err) {
      return { success: false, message: "Errore durante l'importazione: " + err.message };
    }
  }

  resetToDefault() {
    this.customOverrides = {};
    localStorage.removeItem('il_nuovo_goat_custom_names_db');
    this.notifyChange();
  }

  // Imposta l'anno di campionato corrente per la sincronizzazione dinamica dei nomi
  setActiveYear(year) {
    if (year && typeof year === 'number') {
      this.activeYear = year;
    }
  }

  // Risolve il nome della serie / campionato garantendo l'aggiornamento dinamico dell'anno
  getSeriesName(categoryId, discipline = 'auto', year = null) {
    const categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    const cat = categories[categoryId];
    if (!cat) return categoryId;
    let name = this.isRealNames ? (cat.realSeriesName || cat.name) : cat.name;
    const targetYear = year || this.activeYear || 2026;
    if (name) {
      if (/\b20\d{2}\b/.test(name)) {
        name = name.replace(/\b20\d{2}\b/g, targetYear);
      } else {
        name = `${name} ${targetYear}`;
      }
    }
    return name;
  }

  // Risolve il nome di una scuderia
  getTeamName(teamId, discipline = 'auto', categoryId = null) {
    if (!teamId) return 'Scuderia';
    // Check custom overrides first
    const override = this.customOverrides[discipline]?.teams?.[teamId];
    if (override && this.isRealNames) return override.name || override.displayName || teamId || 'Scuderia';

    const categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    for (const catKey in categories) {
      const cat = categories[catKey];
      const team = cat.teams.find(t => t.id === teamId);
      if (team) {
        const n = this.isRealNames ? team.realName : team.fictionalName;
        return n || team.name || team.realName || team.fictionalName || teamId || 'Scuderia';
      }
    }
    return teamId || 'Scuderia';
  }

  // Imposta lo sviluppo dinamico delle vetture/moto (aggiornato dalla carriera e R&D)
  setTeamDevelopment(teamDev) {
    this.teamDevelopment = teamDev || {};
  }

  // Risolve le informazioni complete di un team
  getTeam(teamId, discipline = 'auto') {
    if (!teamId) {
      return { id: 'default_team', displayName: 'Scuderia', color: '#e10600', carPace: 75, bikePace: 75, reliability: 75 };
    }
    const override = this.customOverrides[discipline]?.teams?.[teamId];
    if (override && this.isRealNames) {
      const dev = this.teamDevelopment[teamId];
      const carPace = dev?.carPace !== undefined ? dev.carPace : (override.carPace || 75);
      const bikePace = dev?.bikePace !== undefined ? dev.bikePace : (override.bikePace || 75);
      const reliability = dev?.reliability !== undefined ? dev.reliability : (override.reliability || 75);
      return {
        ...override,
        carPace,
        bikePace,
        reliability,
        displayName: override.name || override.displayName || teamId || 'Scuderia',
        color: override.color || '#e10600'
      };
    }

    const categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    for (const catKey in categories) {
      const cat = categories[catKey];
      const team = cat.teams.find(t => t.id === teamId);
      if (team) {
        const name = this.getTeamName(teamId, discipline, catKey);
        const dev = this.teamDevelopment[teamId];
        const carPace = dev?.carPace !== undefined ? dev.carPace : (team.carPace || team.bikePace || 75);
        const bikePace = dev?.bikePace !== undefined ? dev.bikePace : (team.bikePace || team.carPace || 75);
        const reliability = dev?.reliability !== undefined ? dev.reliability : (team.reliability || 75);
        return {
          ...team,
          carPace,
          bikePace,
          reliability,
          displayName: name || team.realName || team.fictionalName || team.name || teamId || 'Scuderia',
          color: team.color || '#e10600'
        };
      }
    }
    return { id: teamId, displayName: teamId || 'Scuderia', color: "#888888", carPace: 75, bikePace: 75, reliability: 75 };
  }

  // Registra un pilota custom o un Regen nel database
  registerCustomDriver(driver) {
    if (!driver || !driver.id) return;
    this.customDrivers[driver.id] = driver;
  }

  // Risolve il nome di un pilota avversario o regen
  getDriverName(driverId, discipline = 'auto') {
    if (this.customDrivers[driverId]) {
      const cd = this.customDrivers[driverId];
      return this.isRealNames
        ? (cd.realName || cd.name || cd.displayName)
        : (cd.fictionalName || cd.name || cd.displayName);
    }

    const override = this.customOverrides[discipline]?.drivers?.[driverId];
    if (override && this.isRealNames) return override.name;

    const categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    for (const catKey in categories) {
      const cat = categories[catKey];
      const driver = cat.roster?.find(d => d.id === driverId);
      if (driver) {
        return this.isRealNames ? driver.realName : driver.fictionalName;
      }
    }
    return driverId;
  }

  // Imposta gli attributi AI cresciuti dalla carriera (chiamato dopo loadFromStorage)
  setAiDriverAttributes(attrs) {
    this.aiDriverAttributes = attrs || {};
  }

  // Risolve l'oggetto completo del pilota (inclusi Regens)
  getDriver(driverId, discipline = 'auto') {
    if (this.customDrivers[driverId]) {
      const cd = this.customDrivers[driverId];
      const grown = this.aiDriverAttributes[driverId];
      return {
        ...cd,
        ...(grown || {}),
        displayName: this.getDriverName(driverId, discipline)
      };
    }

    const categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    for (const catKey in categories) {
      const cat = categories[catKey];
      const driver = cat.roster?.find(d => d.id === driverId);
      if (driver) {
        // Fonde gli attributi di crescita AI se disponibili
        const grown = this.aiDriverAttributes[driverId];
        const merged = grown ? { ...driver, ...grown } : driver;
        return {
          ...merged,
          displayName: this.getDriverName(driverId, discipline)
        };
      }
    }
    return { id: driverId, displayName: driverId, ovr: 75, pace: 75 };
  }

  // Risolve il nome di un circuito
  getCircuitName(circuitId) {
    const circ = CIRCUITS_DATA[circuitId];
    if (!circ) return circuitId;
    return this.isRealNames ? circ.realName : circ.fictionalName;
  }

  getCircuit(circuitId) {
    const circ = CIRCUITS_DATA[circuitId];
    if (!circ) return null;
    return {
      ...circ,
      displayName: this.getCircuitName(circuitId)
    };
  }

  // Esporta il database completo attuale in formato JSON scaricabile
  exportDatabaseJson() {
    return JSON.stringify({
      version: "1.0.0",
      isRealNames: this.isRealNames,
      exportedAt: new Date().toISOString(),
      customOverrides: this.customOverrides
    }, null, 2);
  }
}

export const db = new DatabaseManager();
