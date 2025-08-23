/**
 * scassoTimeOut.js
 * Gestisce il timeout quando il giocatore impiega troppo tempo
 */

function scassoTimeOut(gameState, elements) {
    // Ferma l'animazione corrente
    if (gameState.animationId) {
        cancelAnimationFrame(gameState.animationId);
        gameState.animationId = null;
    }
    
    gameState.gameActive = false;
    gameState.waitingForNext = true;
    
    gameState.alarmLevel = Math.min(gameState.maxAlarm, gameState.alarmLevel + gameState.alarmIncrease);
    showScassoMessage(elements, "TROPPO LENTO! I rumori del tentativo prolungato attirano attenzione!", 'status-alert');
    updateScassoMissionIcon(elements, '⏰');
    
    updateScassoDisplay(gameState, elements);
    
    if (checkScassoMissionEnd(gameState, elements)) {
        return;
    }
    
    // Pausa di 1 secondo prima di riprendere
    setTimeout(() => {
        if (!gameState.missionFinished) {
            startScassoLockpicking(gameState, elements);
        }
    }, 1000);
}

window.scassoTimeOut = scassoTimeOut;