/**
 * Gestisce il completamento con successo di una sfida
 * @param {string} challengeId - ID della sfida completata
 */
function completeChallenge(challengeId) {
    const challenge = skillChallenges[challengeId];
    
    // Aggiungi punteggio (esempio)
    gameData.player.score += 100;
    
    // Pulisci il fallimento precedente
    gameData.lastFailedChallenge = null;
    
    if (challenge && challenge.successCutscene) {
        gameData.currentCutsceneId = challenge.successCutscene;
        gameData.currentSlideIndex = 0;
        saveGameState();
        loadCutscene(0);
        showSection('cutscene-section');
    } else {
        saveGameState();
        backToMainMenu();
    }
}

window.completeChallenge = completeChallenge;