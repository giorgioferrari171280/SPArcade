/**
 * ScassoChallenge.js
 * Classe principale per il gioco di scasso con layout barra_standard_ortho
 * Utilizza funzioni modulari granulari per ogni operazione
 */

class ScassoChallenge {
    constructor(challengeId) {
        // Inizializza il gioco
        const { gameState, elements } = initializeScassoGame(challengeId);
        this.gameState = gameState;
        this.elements = elements;
        
        // Setup event listeners
        this.removeEventListener = setupScassoEventListeners(this.gameState, this.elements);
        
        // Avvia la missione
        this.startMission();
    }
    
    startMission() {
        const startMessage = this.gameState.challengeData.statusMessages?.start || "Premi SPAZIO per iniziare!";
        showScassoMessage(this.elements, startMessage);
        updateScassoMissionIcon(this.elements, this.gameState.challengeData.missionIcon || '🗝');
    }
    
    destroy() {
        // Cleanup quando il gioco viene distrutto
        if (this.gameState.animationId) {
            cancelAnimationFrame(this.gameState.animationId);
        }
        if (this.removeEventListener) {
            this.removeEventListener();
        }
    }
}

// Esporta la classe globalmente
window.ScassoChallenge = ScassoChallenge;