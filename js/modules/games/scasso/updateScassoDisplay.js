/**
 * updateScassoDisplay.js
 * Aggiorna le barre di allarme e progresso
 */

function updateScassoDisplay(gameState, elements) {
    // Aggiorna barra allarme
    const alarmPercentage = (gameState.alarmLevel / gameState.maxAlarm) * 100;
    if (elements.alarmFill) {
        elements.alarmFill.style.width = alarmPercentage + '%';
    }
    if (elements.alarmText) {
        elements.alarmText.textContent = `${gameState.alarmLevel}/${gameState.maxAlarm}`;
    }
    
    // Aggiorna barra progresso
    const progressPercentage = (gameState.progressMade / gameState.targetProgress) * 100;
    if (elements.progressCounter) {
        elements.progressCounter.textContent = `${gameState.progressMade}/${gameState.targetProgress}`;
    }
    if (elements.progressFill) {
        elements.progressFill.style.width = progressPercentage + '%';
    }
}

window.updateScassoDisplay = updateScassoDisplay;