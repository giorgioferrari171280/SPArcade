/**
 * Avvia un nuovo gioco
 */
function startNewGame() {
    // Reset dei dati di gioco
    gameData.player = { name: '', score: 0, location: 'player-name-section' };
    gameData.currentCutsceneId = 'intro_cutscene';
    gameData.currentSlideIndex = 0;
    gameData.lastFailedChallenge = null;
    saveGameState();
    
    showSection('player-name-section');
    setTimeout(() => document.getElementById('player-name-input').focus(), 100);
}

window.startNewGame = startNewGame;