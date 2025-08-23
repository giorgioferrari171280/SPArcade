/**
 * animateScasso.js
 * Gestisce l'animazione del thumb durante il lockpicking
 */

function animateScasso(gameState, elements) {
    if (!gameState.gameActive || gameState.missionFinished) return;
    
    gameState.thumbPosition += gameState.animationSpeed * gameState.direction;
    
    // Limiti estesi da 2% a 95% per coprire tutta la barra
    if (gameState.thumbPosition >= 95) {
        gameState.direction = -1;
        gameState.thumbPosition = 95;
    } else if (gameState.thumbPosition <= 2) {
        gameState.direction = 1;
        gameState.thumbPosition = 2;
    }
    
    if (elements.thumb) {
        elements.thumb.style.left = gameState.thumbPosition + '%';
    }
    
    // Controlla il timeout
    if (Date.now() - gameState.phaseStartTime > gameState.phaseDuration) {
        scassoTimeOut(gameState, elements);
        return;
    }
    
    gameState.animationId = requestAnimationFrame(() => animateScasso(gameState, elements));
}

window.animateScasso = animateScasso;