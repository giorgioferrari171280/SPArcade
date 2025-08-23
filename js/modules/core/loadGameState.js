/**
 * Carica lo stato del gioco dal localStorage
 * @returns {boolean} True se il caricamento è riuscito
 */
function loadGameState() {
    try {
        const savedData = localStorage.getItem('gameData');
        if (savedData) {
            const loadedData = JSON.parse(savedData);
            // Invece di sostituire gameData, aggiorna le sue proprietà
            Object.assign(gameData, loadedData);
            // Aggiorna anche il riferimento globale
            window.gameData = gameData;
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error loading game state:', error);
        return false;
    }
}

window.loadGameState = loadGameState;