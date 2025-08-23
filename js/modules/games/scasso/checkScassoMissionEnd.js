/**
 * checkScassoMissionEnd.js
 * Controlla se la missione è terminata (vittoria o sconfitta)
 */

function checkScassoMissionEnd(gameState, elements) {
    if (gameState.alarmLevel >= gameState.maxAlarm) {
        endScassoMission(gameState, elements, 'failure');
        return true;
    } else if (gameState.progressMade >= gameState.targetProgress) {
        endScassoMission(gameState, elements, 'success');
        return true;
    }
    return false;
}

window.checkScassoMissionEnd = checkScassoMissionEnd;