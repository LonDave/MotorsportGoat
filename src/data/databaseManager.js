import { AUTO_CATEGORIES } from './autoDatabase.js';
import { MOTO_CATEGORIES } from './motoDatabase.js';
import { CIRCUITS_DATA } from './circuitsDatabase.js';
import { DRIVER_BASELINES } from './driverBaselines.js';

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
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
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

    let categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    for (const catKey in categories) {
      const cat = categories[catKey];
      const team = cat.teams.find(t => t.id === teamId);
      if (team) {
        const n = this.isRealNames ? team.realName : team.fictionalName;
        return n || team.name || team.realName || team.fictionalName || teamId || 'Scuderia';
      }
    }

    // Fallback: ricerca nell'altra disciplina (es. team moto richiesto senza specificare disciplina)
    const otherDisc = discipline === 'auto' ? 'moto' : 'auto';
    const otherOverride = this.customOverrides[otherDisc]?.teams?.[teamId];
    if (otherOverride && this.isRealNames) return otherOverride.name || otherOverride.displayName || teamId || 'Scuderia';

    categories = otherDisc === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
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

    let categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
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

    // Fallback: ricerca nell'altra disciplina
    const otherDisc = discipline === 'auto' ? 'moto' : 'auto';
    const otherOverride = this.customOverrides[otherDisc]?.teams?.[teamId];
    if (otherOverride && this.isRealNames) {
      const dev = this.teamDevelopment[teamId];
      const carPace = dev?.carPace !== undefined ? dev.carPace : (otherOverride.carPace || 75);
      const bikePace = dev?.bikePace !== undefined ? dev.bikePace : (otherOverride.bikePace || 75);
      const reliability = dev?.reliability !== undefined ? dev.reliability : (otherOverride.reliability || 75);
      return {
        ...otherOverride,
        carPace,
        bikePace,
        reliability,
        displayName: otherOverride.name || otherOverride.displayName || teamId || 'Scuderia',
        color: otherOverride.color || '#e10600'
      };
    }

    categories = otherDisc === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    for (const catKey in categories) {
      const cat = categories[catKey];
      const team = cat.teams.find(t => t.id === teamId);
      if (team) {
        const name = this.getTeamName(teamId, otherDisc, catKey);
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
    if (!driverId) return 'Pilota';
    if (driverId === 'player' || driverId === 'player_custom') return 'Il Tuo Pilota';

    if (this.customDrivers[driverId]) {
      const cd = this.customDrivers[driverId];
      return this.isRealNames
        ? (cd.realName || cd.name || cd.displayName)
        : (cd.fictionalName || cd.name || cd.displayName);
    }

    // Controllo override custom per la disciplina richiesta
    const override = this.customOverrides[discipline]?.drivers?.[driverId];
    if (override) {
      if (this.isRealNames && override.name) return override.name;
      if (!this.isRealNames && override.fictionalName) return override.fictionalName;
    }

    // Ricerca nella disciplina principale
    let categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    for (const catKey in categories) {
      const cat = categories[catKey];
      const driver = cat.roster?.find(d => d.id === driverId);
      if (driver) {
        return this.isRealNames ? driver.realName : driver.fictionalName;
      }
    }

    // Fallback: ricerca nell'altra disciplina (es. pilota cercato con disciplina non specificata)
    const otherDisc = discipline === 'auto' ? 'moto' : 'auto';
    const otherOverride = this.customOverrides[otherDisc]?.drivers?.[driverId];
    if (otherOverride) {
      if (this.isRealNames && otherOverride.name) return otherOverride.name;
      if (!this.isRealNames && otherOverride.fictionalName) return otherOverride.fictionalName;
    }
    categories = otherDisc === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    for (const catKey in categories) {
      const cat = categories[catKey];
      const driver = cat.roster?.find(d => d.id === driverId);
      if (driver) {
        return this.isRealNames ? driver.realName : driver.fictionalName;
      }
    }

    // Controllo nel database dei palmarès storici e leggende (DRIVER_BASELINES)
    if (DRIVER_BASELINES && DRIVER_BASELINES[driverId]) {
      const bl = DRIVER_BASELINES[driverId];
      const blName = this.isRealNames
        ? (bl.realName || bl.name)
        : (bl.fictionalName || bl.name || bl.realName);
      if (blName) return blName;
    }

    return driverId;
  }

  // Imposta gli attributi AI cresciuti dalla carriera (chiamato dopo loadFromStorage)
  setAiDriverAttributes(attrs) {
    this.aiDriverAttributes = attrs || {};
  }

  // Risolve l'oggetto completo del pilota (inclusi Regens)
  getDriver(driverId, discipline = 'auto') {
    if (!driverId) return { id: 'unknown', displayName: 'Pilota', ovr: 75, pace: 75 };

    if (this.customDrivers[driverId]) {
      const cd = this.customDrivers[driverId];
      const grown = this.aiDriverAttributes[driverId];
      return {
        ...cd,
        ...(grown || {}),
        displayName: this.getDriverName(driverId, discipline)
      };
    }

    // Cerca nella disciplina primaria
    let categories = discipline === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    for (const catKey in categories) {
      const cat = categories[catKey];
      const driver = cat.roster?.find(d => d.id === driverId);
      if (driver) {
        const grown = this.aiDriverAttributes[driverId];
        const merged = grown ? { ...driver, ...grown } : driver;
        return {
          ...merged,
          displayName: this.getDriverName(driverId, discipline)
        };
      }
    }

    // Fallback sull'altra disciplina
    const otherDisc = discipline === 'auto' ? 'moto' : 'auto';
    categories = otherDisc === 'auto' ? AUTO_CATEGORIES : MOTO_CATEGORIES;
    for (const catKey in categories) {
      const cat = categories[catKey];
      const driver = cat.roster?.find(d => d.id === driverId);
      if (driver) {
        const grown = this.aiDriverAttributes[driverId];
        const merged = grown ? { ...driver, ...grown } : driver;
        return {
          ...merged,
          displayName: this.getDriverName(driverId, otherDisc)
        };
      }
    }

    return { id: driverId, displayName: this.getDriverName(driverId, discipline), ovr: 75, pace: 75 };
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
