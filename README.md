# Viking Raids - Architettura Modulare

Un gioco web di avventura vichinga con architettura SPA modulare e scalabile.

## Struttura del Progetto

```
VIKING RAIDS/
├── index.html                 # HTML principale con sistema SPA
├── css/
│   └── styles.css            # Tutti gli stili CSS centralizzati
├── js/
│   ├── core/                 # Moduli centrali del gioco
│   │   ├── audio-manager.js  # Gestione audio e musica
│   │   ├── game-data.js      # Dati di gioco e salvataggi
│   │   ├── cutscene-manager.js # Gestione cutscene e narrativa
│   │   ├── challenge-manager.js # Gestione sfide e HTML dinamico
│   │   ├── ui-manager.js     # Interfaccia utente e navigazione
│   │   └── game-manager.js   # Gestore principale e inizializzazione
│   └── challenges/           # Classi delle sfide individuali
│       ├── viking-lockpick.js     # Scasso base
│       ├── timed-lockpick.js      # Scasso con timer
│       ├── combat.js              # Combattimento doppia barra
│       ├── perfect-lockpick.js    # Scasso perfetto
│       ├── accumulator.js         # Accumulo punteggio
│       └── sudden-death.js        # Duello mortale
├── data/
│   ├── cutscenes.js          # Dati delle cutscene
│   └── challenges.js         # Configurazione sfide
└── README.md                 # Questa documentazione
```

## Caratteristiche dell'Architettura

### 🎯 **Sistema SPA (Single Page Application)**
- Tutte le sezioni sono gestite dinamicamente
- Audio continuo senza interruzioni
- Navigazione fluida tra sezioni
- Stato del gioco persistente

### 🧩 **Modulare e Scalabile**
- Ogni modulo ha una responsabilità specifica
- Facile aggiungere nuove cutscene e sfide
- Codice organizzato e manutenibile
- Separazione netta tra logica e presentazione

### 🎮 **Sistema di Sfide Estensibile**
- Ogni sfida è una classe separata
- HTML generato dinamicamente per ogni tipo
- Facile ereditarietà per nuove varianti
- Sistema di risultati unificato

### 📱 **Design Responsive**
- CSS ottimizzato per tutti i dispositivi
- Layout flessibili e adattivi
- Gestione touch per dispositivi mobili

## Come Aggiungere Nuovi Contenuti

### 📖 **Aggiungere una Nuova Cutscene**

1. **Apri `data/cutscenes.js`**
2. **Aggiungi la nuova cutscene:**
```javascript
"mia_cutscene": {
    "title": "Il Mio Titolo",
    "slides": [
        {
            "narrative": "Il mio testo narrativo...",
            "image": "mia_immagine.png"
        }
    ],
    "nextChallengeId": "mia_sfida" // opzionale
}
```

### ⚔️ **Aggiungere una Nuova Sfida**

1. **Crea il file della classe** in `js/challenges/mia-sfida.js`:
```javascript
class MiaSfida {
    constructor(challengeId) {
        this.challengeId = challengeId;
        // ... implementazione
    }
    // ... metodi della sfida
}
```

2. **Aggiungi la configurazione** in `data/challenges.js`:
```javascript
"mia_sfida": {
    "title": "La Mia Sfida",
    "type": "mia_sfida_type",
    "successCutscene": "vittoria",
    "failureCutscene": "sconfitta",
    "description": "Descrizione della sfida"
}
```

3. **Aggiorna il challenge-manager** per gestire il nuovo tipo

4. **Includi il file** nell'`index.html`:
```html
<script src="js/challenges/mia-sfida.js"></script>
```

### 🎨 **Personalizzare gli Stili**

- **Stili globali:** Modifica `css/styles.css`
- **Nuovi temi:** Aggiungi variabili CSS per i colori
- **Animazioni:** Usa le @keyframes esistenti o creane di nuove
- **Responsive:** Utilizza le classi esistenti come base

## Funzionalità Avanzate

### 🔧 **Modalità Debug**
Quando il gioco viene caricato su localhost, vengono esposte funzioni di test:
```javascript
vikingRaidsTestMode.startCutscene('intro_cutscene');
vikingRaidsTestMode.startChallenge('scasso_challenge');
vikingRaidsTestMode.debugState();
vikingRaidsTestMode.resetGame();
```

### 💾 **Sistema di Salvataggio**
- Salvataggio automatico dei progressi
- Esportazione/importazione di salvataggi
- Recupero automatico in caso di errori

### 🔊 **Gestione Audio**
- Musica di sottofondo continua
- Effetti sonori per le azioni
- Controlli volume e mute
- Fallback silenzioso se audio non disponibile

### 📱 **Controlli Multi-Piattaforma**
- **Spazio:** Azione principale
- **ESC:** Torna al menu (quando possibile)
- **Ctrl+M:** Mute/Unmute
- **Ctrl+Shift+F:** Fullscreen
- **Touch:** Supporto per dispositivi mobili

## Vantaggi dell'Architettura

✅ **Manutenibilità:** Ogni funzionalità in file separati  
✅ **Scalabilità:** Facile aggiungere nuovi contenuti  
✅ **Performance:** Caricamento ottimizzato dei moduli  
✅ **Debug:** Strumenti integrati per sviluppo  
✅ **Compatibilità:** Funziona su tutti i browser moderni  
✅ **Audio Continuo:** SPA permette musica ininterrotta  

## Note Tecniche

- **ES6+ Features:** Usa sintassi moderna JavaScript
- **CSS Grid/Flexbox:** Layout moderni e flessibili  
- **Local Storage:** Salvataggio dati nel browser
- **Error Handling:** Gestione errori robusta
- **Memory Management:** Pulizia automatica delle risorse
- **Performance Monitoring:** Tracciamento uso memoria

## Per Sviluppatori

Per modificare o estendere il gioco:

1. **Mantieni la struttura modulare**
2. **Segui le convenzioni di naming**
3. **Testa su dispositivi multipli**  
4. **Documenta i nuovi moduli**
5. **Usa la modalità debug per test**

## Compatibilità

- **Browser:** Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile:** iOS 12+, Android 8+
- **Desktop:** Windows 10+, macOS 10.14+, Linux (Ubuntu 18+)

---

**Viking Raids** - Un'epica avventura modulare che cresce con te! 🏴‍☠️⚡