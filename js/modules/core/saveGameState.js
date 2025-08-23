/**
 * Salva lo stato del gioco nel localStorage
 */
function saveGameState() {
    try {
        localStorage.setItem('gameData', JSON.stringify(gameData));
    } catch (error) {
        console.error('Error saving game state:', error);
    }
}

window.saveGameState = saveGameState;