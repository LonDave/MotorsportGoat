// Test automatizzato per il sistema di Multi-Slot, Creazione Nuova Carriera senza cancellazione, Esportazione & Importazione JSON
import { career } from './src/engine/careerEngine.js';

// Mock localStorage in Node
const storage = {};
globalThis.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, val) => { storage[key] = String(val); },
  removeItem: (key) => { delete storage[key]; },
  clear: () => { for (const k in storage) delete storage[k]; }
};

console.log("=== INIZIO TEST MULTI-SLOT, NUOVA CARRIERA, EXPORT & IMPORT ===");

// 1. Inizializza Carriera Pilota 1 nello Slot 1
career.setActiveSlot(1);
const pilot1Data = {
  firstName: "Marco",
  lastName: "Rossi",
  nationality: "it",
  number: 12,
  discipline: "auto",
  origin: "prodigy"
};
career.startNewCareer(pilot1Data, "f4_prema");
console.log(`[TEST 1] Pilota 1 creato nello Slot 1: ${career.player.firstName} ${career.player.lastName}`);
if (career.getActiveSlot() !== 1) throw new Error("Slot attivo deve essere 1");
if (!localStorage.getItem('il_nuovo_goat_motorsport_save')) throw new Error("Dati slot 1 non trovati in storage");

// 2. Verifica getFreeSlot
const freeSlot = career.getFreeSlot();
console.log(`[TEST 2] Slot libero rilevato: Slot ${freeSlot}`);
if (freeSlot !== 2) throw new Error(`Atteso slot 2 libero, ottenuto ${freeSlot}`);

// 3. Avvia Carriera Pilota 2 nello Slot 2 SENZA cancellare lo Slot 1
career.setActiveSlot(2);
career.player = null;
career.career = null;
const pilot2Data = {
  firstName: "Francesco",
  lastName: "Baglietto",
  nationality: "it",
  number: 63,
  discipline: "moto",
  origin: "dynasty"
};
career.startNewCareer(pilot2Data, "moto3_leopard");
console.log(`[TEST 3] Pilota 2 creato nello Slot 2: ${career.player.firstName} ${career.player.lastName}`);
if (career.getActiveSlot() !== 2) throw new Error("Slot attivo deve essere 2");

// Verifica che Slot 1 sia ancora perfettamente intatto!
const slot1Raw = localStorage.getItem('il_nuovo_goat_motorsport_save');
if (!slot1Raw) throw new Error("CRITICO: Lo Slot 1 è stato cancellato creando lo Slot 2!");
const slot1Parsed = JSON.parse(slot1Raw);
if (slot1Parsed.player.firstName !== "Marco") throw new Error("CRITICO: I dati di Slot 1 sono stati sovrascritti!");
console.log(`  ✓ Slot 1 intatto: ${slot1Parsed.player.firstName} ${slot1Parsed.player.lastName} (${slot1Parsed.player.discipline})`);

// Verifica che Slot 2 sia salvato nella sua chiave
const slot2Raw = localStorage.getItem('il_nuovo_goat_save_slot_2');
if (!slot2Raw) throw new Error("Dati slot 2 non trovati nella chiave dedicata");
const slot2Parsed = JSON.parse(slot2Raw);
if (slot2Parsed.player.firstName !== "Francesco") throw new Error("I dati di Slot 2 non coincidono");
console.log(`  ✓ Slot 2 salvato: ${slot2Parsed.player.firstName} ${slot2Parsed.player.lastName} (${slot2Parsed.player.discipline})`);

// 4. Test Cambio Slot (Caricamento Slot 1 da Slot 2)
career.loadFromStorage(1);
console.log(`[TEST 4] Switch allo Slot 1: Pilota attivo ora è ${career.player.firstName} ${career.player.lastName}`);
if (career.player.firstName !== "Marco") throw new Error("Caricamento Slot 1 fallito");
if (career.getActiveSlot() !== 1) throw new Error("Slot attivo deve essere 1");

// 5. Test Esportazione JSON
const exportData = { player: career.player, career: career.career };
const jsonString = JSON.stringify(exportData, null, 2);
if (!jsonString.includes("Marco") || !jsonString.includes("Rossi")) throw new Error("Esportazione JSON non valida");
console.log(`[TEST 5] Esportazione JSON riuscita: ${jsonString.length} bytes`);

// 6. Test Importazione JSON in uno Slot libero (Slot 3)
const pilot3ImportedJson = JSON.stringify({
  player: {
    firstName: "Lewis",
    lastName: "Hamilton",
    discipline: "auto",
    ovr: 94,
    number: 44,
    nationality: "gb"
  },
  career: {
    currentCategory: "auto_f1",
    currentYear: 2026,
    seasonNumber: 1,
    money: 5000000,
    currentTeamId: "f1_ferrari",
    stats: { byCategory: {} }
  }
});

const parsedImport = JSON.parse(pilot3ImportedJson);
const targetSlot = 3;
const key3 = career.getStorageKeyForSlot(targetSlot);
localStorage.setItem(key3, JSON.stringify(parsedImport));
career.loadFromStorage(targetSlot);
console.log(`[TEST 6] Importazione nello Slot 3: Pilota attivo è ${career.player.firstName} ${career.player.lastName} in ${career.career.currentCategory}`);
if (career.player.firstName !== "Lewis") throw new Error("Importazione fallita nello slot 3");
if (career.getActiveSlot() !== 3) throw new Error("Slot attivo dopo import deve essere 3");

// Verifica che TUTTI e 3 gli slot coesistano contemporaneamente
const s1 = JSON.parse(localStorage.getItem('il_nuovo_goat_motorsport_save'));
const s2 = JSON.parse(localStorage.getItem('il_nuovo_goat_save_slot_2'));
const s3 = JSON.parse(localStorage.getItem('il_nuovo_goat_save_slot_3'));
console.log(`[TEST 7] Verifica coesistenza 3 slot:`);
console.log(`  - Slot 1: ${s1.player.firstName} ${s1.player.lastName} (${s1.player.discipline})`);
console.log(`  - Slot 2: ${s2.player.firstName} ${s2.player.lastName} (${s2.player.discipline})`);
console.log(`  - Slot 3: ${s3.player.firstName} ${s3.player.lastName} (${s3.player.discipline})`);

if (s1.player.firstName !== "Marco" || s2.player.firstName !== "Francesco" || s3.player.firstName !== "Lewis") {
  throw new Error("I 3 slot non coesistono in modo indipendente!");
}

// 7. Test Cancellazione Slot Singolo (Cancella solo lo Slot 2)
career.resetCareer(2, false); // cancella slot 2 senza resettare in-memory di slot 3
if (localStorage.getItem('il_nuovo_goat_save_slot_2')) throw new Error("Slot 2 non è stato rimosso");
if (!localStorage.getItem('il_nuovo_goat_motorsport_save')) throw new Error("Slot 1 è stato accidentalmente cancellato!");
if (!localStorage.getItem('il_nuovo_goat_save_slot_3')) throw new Error("Slot 3 è stato accidentalmente cancellato!");
console.log(`  ✓ Slot 2 cancellato correttamente senza toccare Slot 1 e Slot 3.`);

console.log("=== TUTTI I TEST MULTI-SLOT, NUOVA CARRIERA, EXPORT & IMPORT SONO PASSATI CON SUCCESSO! ===");
