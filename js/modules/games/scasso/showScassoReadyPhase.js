/**
 * showScassoReadyPhase.js
 * Mostra la fase di preparazione prima dell'inizio del gioco
 */

function showScassoReadyPhase(gameState, elements) {
    updateScassoMissionIcon(elements, '🎯');
    const readyMessage = gameState.challengeData.statusMessages?.ready || "INFILTRAZIONE INIZIATA...";
    showScassoMessage(elements, readyMessage);
    
    // Inizia immediatamente senza delay
    updateScassoMissionIcon(elements, gameState.challengeData.missionIcon || '🗝');
    startScassoLockpicking(gameState, elements);
}

window.showScassoReadyPhase = showScassoReadyPhase;