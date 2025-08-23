/**
 * updateScassoStatus.js
 * Aggiorna il messaggio di stato durante il gioco
 */

function updateScassoStatus(gameState, elements) {
    const messages = gameState.challengeData.statusMessages?.inProgress || [
        "Senti il click dei meccanismi...",
        "Concentrati sui suoni...",
        "Un movimento sbagliato e ti sentiranno..."
    ];
    
    const alarmMessages = gameState.challengeData.statusMessages?.alarm || [
        "Stai facendo troppo rumore!",
        "Qualcuno si sta muovendo!",
        "Un cane ha iniziato ad abbaiare!"
    ];
    
    let message;
    let statusClass = '';
    
    if (gameState.alarmLevel > 60) {
        message = alarmMessages[Math.floor(Math.random() * alarmMessages.length)];
        statusClass = 'status-alert';
        updateScassoMissionIcon(elements, '🚨');
    } else {
        message = messages[Math.floor(Math.random() * messages.length)];
        updateScassoMissionIcon(elements, gameState.challengeData.missionIcon || '🗝');
    }
    
    showScassoMessage(elements, message, statusClass);
}

window.updateScassoStatus = updateScassoStatus;