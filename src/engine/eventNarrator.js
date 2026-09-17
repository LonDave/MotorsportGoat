// Generatore narrativo di eventi, interviste stampa, ordini di scuderia e imprevisti paddock
export class EventNarrator {
  static generateTeamRadioDilemma(player, teammate, currentPos, discipline) {
    if (discipline === 'auto') {
      return {
        id: "team_orders_auto",
        title: "📻 ORDINE DI SCUDERIA DAL MURETTO",
        speaker: "Ingegnere di Pista",
        message: `"${player.lastName}, qui è il muretto. Il tuo compagno di squadra ${teammate.name} ha gomme più fresche ed è in lotta per il campionato. Lascialo passare alla prima curva."`,
        options: [
          {
            label: "Obbedisci e fai passare il compagno",
            moraleDelta: +15,
            teammateRelDelta: +20,
            fanRepDelta: -10,
            outcomeText: "Hai alzato il piede. Il team principal ti ringrazia via radio, ma i tifosi fischiano la scelta."
          },
          {
            label: "Fingi un problema radio ('Ksshh... Non sento niente!')",
            moraleDelta: -5,
            teammateRelDelta: -15,
            fanRepDelta: +20,
            outcomeText: "Tiri dritto staccando al limite! Il pubblico impazzisce per il tuo coraggio, ma il box bolle di rabbia."
          },
          {
            label: "Rifiuta apertamente via radio: 'Se è più veloce, che mi superi!'",
            moraleDelta: -20,
            teammateRelDelta: -30,
            fanRepDelta: +30,
            outcomeText: "La tua frase diventa virale sui social nel giro di 2 minuti. Guerra aperta all'interno della scuderia!"
          }
        ]
      };
    } else {
      return {
        id: "team_orders_moto",
        title: "📻 CARTELLO SEGNALATORE DAI BOX",
        speaker: "Capotecnico",
        message: `"TABELLA BOX: P${currentPos} - MAPPATURA ECO. Il compagno ${teammate.name} è attaccato ai tuoi scarichi. Proteggi il risultato di squadra senza duelli suicidi!"`,
        options: [
          {
            label: "Mantieni la traiettoria difensiva pulita",
            moraleDelta: +10,
            teammateRelDelta: +15,
            fanRepDelta: 0,
            outcomeText: "Chiudi ogni varco con maestria senza scorrettezze. Doppietta blindata al traguardo!"
          },
          {
            label: "Stacca a ruota fumante e spalanca il gas al massimo",
            moraleDelta: +5,
            teammateRelDelta: -10,
            fanRepDelta: +25,
            outcomeText: "In staccata la moto si intraversa, il pubblico è in piedi sulla tribuna! Spettacolo puro da pilota vero."
          }
        ]
      };
    }
  }

  static generatePressConference(sessionResult, driver) {
    const isWin = sessionResult.position === 1;
    const isPodium = sessionResult.position <= 3;
    const isBad = sessionResult.position > 10;

    let question = "";
    if (isWin) {
      question = `"Una vittoria magistrale oggi, ${driver.lastName}! Sei sembrato su un altro pianeta rispetto a tutti gli altri. Qual è il segreto?"`;
    } else if (isPodium) {
      question = `"Un grandissimo podio dopo una rimonta furibonda. Sei soddisfatto o punti già al gradino più alto?"`;
    } else if (isBad) {
      question = `"Un fine settimana complicato e lontano dalle posizioni che contano. Cosa non ha funzionato sulla vettura/moto?"`;
    } else {
      question = `"Zona punti raggiunta con determinazione. Come vedi la crescita del pacchetto per le prossime gare?"`;
    }

    return {
      title: "🎙️ CONFERENZA STAMPA PADDOCK",
      interviewer: "Sky Motorsport World",
      question,
      answers: [
        {
          label: "Risposta Umile: 'Il merito va tutto al lavoro instancabile dei ragazzi ai box.'",
          teamTrustDelta: +10,
          sponsorDelta: +5,
          hypeDelta: +5,
          reaction: "I meccanici e gli ingegneri apprezzano immensamente la tua dedizione al collettivo."
        },
        {
          label: "Risposta Aggressiva: 'Oggi ho guidato al 110%. Quando ho il mezzo giusto non ce n'è per nessuno.'",
          teamTrustDelta: -5,
          sponsorDelta: +15,
          hypeDelta: +20,
          reaction: "I media impazziscono per la tua sicurezza. La tua immagine pubblica diventa quella di un predatore."
        },
        {
          label: "Risposta Tecnica: 'Dobbiamo ancora migliorare sul bilanciamento e sulla gestione dell'usura.'",
          teamTrustDelta: +5,
          sponsorDelta: 0,
          hypeDelta: 0,
          reaction: "Gli ingegneri annotano i dettagli tecnici. Un approccio metodico e professionale."
        }
      ]
    };
  }

  static getRandomPaddockGossip(year, discipline) {
    const autoGossip = [
      "Voci di corridoio parlano di un fondo aerodinamico rivoluzionario testato nella galleria del vento.",
      "Un noto costruttore tedesco potrebbe entrare a sorpresa nel mondiale con un budget monstre.",
      "Il mercato piloti è già incandescente: una scuderia di vertice starebbe preparando una clausola rescissoria record.",
      "Le nuove regole sui carburanti sintetici potrebbero rimescolare completamente la gerarchia dei motori."
    ];
    const motoGossip = [
      "In Moto2 e MotoGP si parla di un nuovo abbassatore anteriore idraulico ultra-leggero.",
      "Un giovane prodigio delle categorie inferiori sta attirando l'attenzione di tutte le factory ufficiali.",
      "Tensione alle stelle nel box rivale: i due compagni di squadra non si rivolgerebbero la parola.",
      "I tecnici hanno sviluppato una mescola speciale posteriore che promette 3 decimi al giro in trazione."
    ];
    const pool = discipline === 'auto' ? autoGossip : motoGossip;
    return pool[Math.floor(Math.random() * pool.length)];
  }
}
