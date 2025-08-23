/**
 * Gestisce il fallimento di una sfida
 * @param {string} challengeId - ID della sfida fallita
 */
function failChallenge(challengeId) {
    const challenge = skillChallenges[challengeId];
    
    // Salva la sfida fallita per poterla riprovare
    gameData.lastFailedChallenge = challengeId;
    
    if (challenge && challenge.failureCutscene) {
        // Procedi alla cutscene di fallimento
        gameData.currentCutsceneId = challenge.failureCutscene;
        gameData.currentSlideIndex = 0;
        saveGameState();
        loadCutscene(0);
        showSection('cutscene-section');
    } else {
        saveGameState();
        backToMainMenu();
    }
}

window.failChallenge = failChallenge;