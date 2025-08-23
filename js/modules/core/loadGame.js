/**
 * Carica un gioco salvato
 */
function loadGame() {
    if (loadGameState()) {
        updateVolumeSlider();
        updateVolumeIcon();
        audioManager.setVolume(gameData.settings.volume);
        
        // Se il giocatore era in una cutscene, ricaricala
        if (gameData.player.location === 'cutscene-section') {
            loadCutscene(gameData.currentSlideIndex);
            showSection('cutscene-section');
        } 
        // Se il giocatore era in una sfida, riavviala direttamente
        else if (gameData.player.location && gameData.player.location.includes('challenge') && gameData.currentChallengeId) {
            startChallenge(gameData.currentChallengeId);
        }
        // Se c'è una sfida fallita, riproponila direttamente
        else if (gameData.lastFailedChallenge) {
            retryFailedChallenge();
        }
        // Altrimenti mostra la sezione salvata
        else {
            showSection(gameData.player.location);
        }
    } else {
        showModal('Nessun Salvataggio', 'Nessun raid salvato trovato.', [{ text: 'OK', action: closeModal }]);
    }
}

window.loadGame = loadGame;