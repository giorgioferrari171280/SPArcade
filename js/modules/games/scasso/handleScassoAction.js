/**
 * handleScassoAction.js
 * Gestisce l'azione del giocatore quando preme SPAZIO
 */

function handleScassoAction(gameState, elements) {
    // FERMA SUBITO l'animazione e il flag gameActive
    gameState.gameActive = false;
    
    // Cancella l'animazione frame
    if (gameState.animationId) {
        cancelAnimationFrame(gameState.animationId);
        gameState.animationId = null;
    }
    
    gameState.waitingForNext = true;
    
    // Calcola se hai centrato lo sweet spot usando la posizione ATTUALE del thumb
    const sweetSpotStart = gameState.sweetSpotPosition;
    const sweetSpotEnd = gameState.sweetSpotPosition + gameState.currentSweetSpotWidth;
    
    // Calcolo di precisione con tolleranza dinamica
    const baseTolerance = 1.5;
    const difficultyMultiplier = Math.max(0.5, 1 - (gameState.alarmLevel / 200));
    const tolerance = baseTolerance * difficultyMultiplier;
    
    const isInSweetSpot = (gameState.thumbPosition >= (sweetSpotStart - tolerance)) && 
                         (gameState.thumbPosition <= (sweetSpotEnd + tolerance));
    
    processScassoAction(gameState, elements, isInSweetSpot);
}

window.handleScassoAction = handleScassoAction;