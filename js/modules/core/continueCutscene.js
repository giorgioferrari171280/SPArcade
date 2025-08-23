/**
 * Continua alla slide successiva della cutscene
 */
function continueCutscene() {
    const cutscene = cutsceneData[gameData.currentCutsceneId];
    gameData.currentSlideIndex++;
    saveGameState();
    
    if (gameData.currentSlideIndex < cutscene.slides.length) {
        loadCutscene(gameData.currentSlideIndex);
    } else if (cutscene.nextChallengeId) {
        startChallenge(cutscene.nextChallengeId);
    } else {
        // Fine della cutscene
        if (gameData.currentCutsceneId === 'defeat_cutscene' && gameData.lastFailedChallenge) {
            showDefeatChoiceModal();
        } else {
            showModal('Fine Capitolo', 'Hai completato questo capitolo!', [{ text: 'Torna al Campo', action: () => { closeModal(); backToMainMenu(); } }]);
        }
    }
}

window.continueCutscene = continueCutscene;