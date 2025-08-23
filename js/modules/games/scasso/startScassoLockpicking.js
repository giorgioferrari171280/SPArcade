/**
 * startScassoLockpicking.js
 * Avvia una fase di lockpicking
 */

function startScassoLockpicking(gameState, elements) {
    if (gameState.missionFinished) return;
    
    gameState.gameActive = true;
    gameState.waitingForNext = false;
    gameState.thumbPosition = 2;
    gameState.direction = 1;
    gameState.phaseStartTime = Date.now();
    
    // Calcola la larghezza attuale dello sweet spot basata sull'allarme
    gameState.currentSweetSpotWidth = Math.max(5, gameState.baseSweetSpotWidth - (gameState.alarmLevel / 100) * 10);
    
    // Posiziona lo sweet spot in modo casuale
    const minPosition = 5;
    const maxPosition = 90 - gameState.currentSweetSpotWidth;
    gameState.sweetSpotPosition = minPosition + Math.random() * (maxPosition - minPosition);
    
    updateScassoSweetSpot(gameState, elements);
    resetScassoThumb(elements);
    updateScassoStatus(gameState, elements);
    animateScasso(gameState, elements);
}

window.startScassoLockpicking = startScassoLockpicking;