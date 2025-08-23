/**
 * processScassoAction.js
 * Processa il risultato dell'azione di lockpicking
 */

function processScassoAction(gameState, elements, success) {
    if (success) {
        // Lockpick riuscito
        gameState.progressMade++;
        const successMessages = [
            "CLICK! Perfetto! Un dente della serratura cede!",
            "SILENZIOSO! Hai fatto progressi senza rumore!",
            "PRECISIONE! Il meccanismo si sta aprendo!",
            "ECCELLENTE! Stai dominando la serratura!",
            "MAESTRIA! Come un vero vichingo!"
        ];
        const randomMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
        showScassoMessage(elements, randomMessage, 'success');
        updateScassoMissionIcon(elements, '✅');
    } else {
        // Lockpick fallito
        gameState.alarmLevel = Math.min(gameState.maxAlarm, gameState.alarmLevel + gameState.alarmIncrease);
        const failMessages = [
            "CLANK! Hai fatto rumore! Qualcuno l'ha sentito!",
            "SCRITCH! Gli strumenti scivolano rumorosamente!",
            "BANG! Un suono metallico echeggia nella foresta!",
            "CRACK! Il legno protesta rumorosamente!",
            "SCREECH! I cardini stridono!"
        ];
        const randomMessage = failMessages[Math.floor(Math.random() * failMessages.length)];
        showScassoMessage(elements, randomMessage, 'status-alert');
        updateScassoMissionIcon(elements, '❌');
    }
    
    updateScassoDisplay(gameState, elements);
    
    // Controlla fine missione
    if (checkScassoMissionEnd(gameState, elements)) {
        return;
    }
    
    // Pausa di 1 secondo per mostrare dove hai cliccato
    setTimeout(() => {
        if (!gameState.missionFinished) {
            startScassoLockpicking(gameState, elements);
        }
    }, 1000);
}

window.processScassoAction = processScassoAction;