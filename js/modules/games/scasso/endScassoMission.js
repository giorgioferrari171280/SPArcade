/**
 * endScassoMission.js
 * Termina la missione e mostra il risultato
 */

function endScassoMission(gameState, elements, result) {
    gameState.missionFinished = true;
    gameState.gameActive = false;
    
    if (gameState.animationId) {
        cancelAnimationFrame(gameState.animationId);
        gameState.animationId = null;
    }
    
    showScassoResult(gameState, elements, result);
}

window.endScassoMission = endScassoMission;