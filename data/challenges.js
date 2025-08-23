/**
 * Challenges Data - Configurazione di tutte le sfide del gioco
 * Collega ogni sfida al tipo di gioco corrispondente e alle cutscene
 */

const skillChallenges = {
    "scasso_challenge": { 
        "title": "Il sentiero verso il villaggio", 
        "type": "viking_lockpick", 
        "successCutscene": "success_cutscene", 
        "failureCutscene": "defeat_cutscene",
        "description": "Cammina nella foresta fino a raggiungere il villaggio sassone vicino alla costa. Non fare rumore, altrimenti i soldati di guardia daranno l'allarme.",
        "image": "lockpick_challenge.png",
        "missionIcon": "🗝",
        "statusMessages": {
            "start": "Premi SPAZIO per iniziare lo scasso!",
            "ready": "INFILTRAZIONE INIZIATA...",
            "inProgress": [
                "Senti il click dei meccanismi...",
                "Concentrati sui suoni...",
                "Un movimento sbagliato e ti sentiranno..."
            ],
            "alarm": [
                "Stai facendo troppo rumore!",
                "Qualcuno si sta muovendo!",
                "Un cane ha iniziato ad abbaiare!"
            ]
        }
    },

    "accumulator_challenge": { 
        "title": "Sfida di Forza", 
        "type": "viking_accumulator", 
        "successCutscene": "second_cutscene", 
        "failureCutscene": "defeat_cutscene",
        "description": "Dimostra la tua forza e resistenza vichinga",
        "image": "strength_challenge.png",
        "missionIcon": "💪",
        "statusMessages": {
            "start": "Premi SPAZIO per iniziare!",
            "ready": "💪 Colpisci la zona verde!"
        }
    },

    "sudden_death_challenge": { 
        "title": "L'ARCIERE SASSONE NASCOSTO", 
        "type": "viking_sudden_death", 
        "successCutscene": "assassin_victory_cutscene", 
        "failureCutscene": "defeat_cutscene",
        "description": "Un arciere sassone è nascosto fra i cespugli. Tende la corda del suo arco e lascia partire una freccia verso di te!!! Devi schivarla, hai solo una possibilità!!!",
        "image": "../images/assassino.png",
        "missionIcon": "💀",
        "statusMessages": {
            "start": "Premi SPAZIO per iniziare!",
            "ready": "L'ARCIERE HA SCOCCATO LA FRECCIA!!!",
            "inProgress": [
                "LA FRECCIA VOLA VERSO DI TE!!!",
                "SE FALLISCI MORIRAI!!!",
                "SCANSA LA FRECCIA!"
            ]
        }
    },

    "viking_lockpick_timed": { 
        "title": "Fuga dal Forte", 
        "type": "viking_lockpick_timed", 
        "successCutscene": "victory_cutscene", 
        "failureCutscene": "defeat_cutscene",
        "description": "Scappa prima che arrivi l'alba",
        "image": "timed_escape.png",
        "missionIcon": "🗝",
        "statusMessages": {
            "start": "Premi SPAZIO per iniziare la fuga!",
            "ready": "FUGA INIZIATA...",
            "inProgress": [
                "⏰ Il tempo scorre veloce!",
                "🗝 Sbrigati, l'alba si avvicina!",
                "⚡ Ogni secondo conta!"
            ],
            "alarm": [
                "⏰ TROPPO RUMORE E POCO TEMPO!",
                "🚨 Le guardie si stanno avvicinando!",
                "⏰ L'alba si avvicina velocemente!"
            ]
        }
    },

    "viking_combat": { 
        "title": "Duello all'Ultimo Sangue", 
        "type": "viking_combat", 
        "successCutscene": "victory_cutscene", 
        "failureCutscene": "defeat_cutscene",
        "description": "Combatti con ascia e scudo contro un nemico formidabile",
        "image": "combat_challenge.png",
        "missionIcon": "⚔️",
        "statusMessages": {
            "start": "Premi SPAZIO per iniziare il combattimento!",
            "ready": "COMBATTIMENTO INIZIATO!",
            "attack": [
                "🔥 ATTACCA: Colpisci ora!",
                "OFFENSIVA: Preciso e letale!"
            ],
            "defend": [
                "🛡️ DIFENDI: Para l'attacco!",
                "RESISTENZA: Mantieni la guardia!"
            ]
        }
    },

    "viking_lockpick_perfect": { 
        "title": "Prova degli Dei", 
        "type": "viking_lockpick_perfect", 
        "successCutscene": "victory_cutscene", 
        "failureCutscene": "defeat_cutscene",
        "description": "Una prova di precisione assoluta - ogni errore è fatale",
        "image": "perfect_challenge.png",
        "missionIcon": "🗝",
        "statusMessages": {
            "start": "Premi SPAZIO per la Prova degli Dei!",
            "ready": "MODALITÀ PERFETTA ATTIVATA!"
        }
    },

    "hit_or_miss_challenge": { 
        "title": "La Prova del Cecchino", 
        "type": "hit_or_miss", 
        "successCutscene": "archer_success_cutscene", 
        "failureCutscene": "defeat_cutscene",
        "description": "Sei un tiratore scelto. Devi allineare perfettamente entrambi gli assi X e Y per centrare il bersaglio. Hai un solo colpo!",
        "image": "sniper_bg.png",
        "missionIcon": "🎯",
        "statusMessages": {
            "start": "Premi SPAZIO per bloccare l'Asse X!",
            "ready": "🎯 MISSIONE CECCHINO INIZIATA!",
            "lockingX": "ASSE X BLOCCATO! Premi SPAZIO per bloccare l'Asse Y",
            "lockingY": "ASSE Y BLOCCATO! COLPO IN CORSO...",
            "shotFired": "COLPO SPARATO!"
        }
    },

    "double_bar_challenge": { 
        "title": "Combattimento Stealth Doppio", 
        "type": "double_bar_combat", 
        "successCutscene": "victory_cutscene", 
        "failureCutscene": "defeat_cutscene",
        "description": "Due guerrieri sassoni ti attaccano contemporaneamente! Devi bilanciare perfettamente attacco e difesa per sopravvivere al combattimento stealth.",
        "image": "stealth_mission_bg.png",
        "missionIcon": "⚔️",
        "statusMessages": {
            "start": "Premi SPAZIO per iniziare il combattimento stealth!",
            "ready": "⚔️ COMBATTIMENTO STEALTH INIZIATO!",
            "attackPhase": "🔥 FASE ATTACCO: Colpisci nel momento giusto!",
            "defendPhase": "🛡️ FASE DIFESA: Para l'attacco nemico!"
        }
    }
};

/**
 * Ottiene le informazioni di una sfida
 * @param {string} challengeId - ID della sfida
 * @returns {Object|null} Oggetto con i dati della sfida o null se non trovata
 */
function getChallengeData(challengeId) {
    return skillChallenges[challengeId] || null;
}

/**
 * Ottiene tutte le sfide disponibili
 * @returns {Object} Oggetto con tutte le sfide
 */
function getAllChallenges() {
    return skillChallenges;
}

/**
 * Ottiene le sfide di un tipo specifico
 * @param {string} type - Tipo di sfida (es: "viking_lockpick")
 * @returns {Array} Array degli ID delle sfide di quel tipo
 */
function getChallengesByType(type) {
    return Object.keys(skillChallenges).filter(id => 
        skillChallenges[id].type === type
    );
}