/**
 * Dati di gioco globali
 */
let gameData = {
    player: { name: '', score: 0, location: 'main-menu-section' },
    currentCutsceneId: 'intro_cutscene',
    currentSlideIndex: 0,
    lastFailedChallenge: null,
    settings: { volume: 50, muted: false }
};

// Mapping delle cutscene che precedono ogni sfida
const challengePrecedingCutscenes = {
    "scasso_challenge": "intro_cutscene",
    "accumulator_challenge": "success_cutscene", 
    "sudden_death_challenge": "second_cutscene",
    "viking_lockpick_timed": "intro_cutscene",
    "viking_combat": "success_cutscene",
    "viking_lockpick_perfect": "second_cutscene"
};

// Variabili globali per le istanze dei giochi
let currentGame;
let currentChallengeId;

window.gameData = gameData;
window.challengePrecedingCutscenes = challengePrecedingCutscenes;
window.currentGame = currentGame;
window.currentChallengeId = currentChallengeId;