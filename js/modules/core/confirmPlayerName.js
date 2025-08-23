/**
 * Conferma il nome del giocatore e avvia il gioco
 */
function confirmPlayerName() {
    const name = document.getElementById('player-name-input').value.trim();
    if (name === '') {
        showModal('Nome Richiesto', 'Inserisci un nome.', [{ text: 'OK', action: closeModal }]);
        return;
    }
    gameData.player.name = name;
    gameData.currentCutsceneId = 'intro_cutscene';
    gameData.currentSlideIndex = 0;
    saveGameState();
    loadCutscene(0);
    showSection('cutscene-section');
}

window.confirmPlayerName = confirmPlayerName;