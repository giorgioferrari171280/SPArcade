/**
 * setupScassoEventListeners.js
 * Configura gli event listener per il gioco di scasso
 */

function setupScassoEventListeners(gameState, elements) {
    const handleKeyDown = (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            
            // Controlla che siamo nella sezione corretta
            if (gameData.player.location !== 'skill-challenge-section') return;
            
            if (gameState.waitingForStart) {
                // Prima pressione di SPAZIO: inizia la missione
                gameState.waitingForStart = false;
                showScassoReadyPhase(gameState, elements);
            } else if (gameState.gameActive && !gameState.waitingForNext) {
                // Durante il gioco: azione di lockpicking
                handleScassoAction(gameState, elements);
            }
        }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Ritorna la funzione per rimuovere il listener se necessario
    return () => document.removeEventListener('keydown', handleKeyDown);
}

window.setupScassoEventListeners = setupScassoEventListeners;