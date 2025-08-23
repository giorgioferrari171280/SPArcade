/**
 * showScassoResult.js
 * Mostra la schermata di risultato finale
 */

function showScassoResult(gameState, elements, result) {
    if (result === 'success') {
        if (elements.resultTitle) {
            elements.resultTitle.textContent = "MISSIONE COMPIUTA!";
            elements.resultTitle.className = "result-title result-success";
        }
        if (elements.resultIcon) {
            elements.resultIcon.textContent = "🎯";
        }
        if (elements.resultMessage) {
            elements.resultMessage.textContent = `SUCCESSO! Hai scassinato la porta con ${gameState.progressMade}/15 click completati! Livello di allarme finale: ${gameState.alarmLevel}/100. Sei riuscito ad infiltrarti senza essere scoperto!`;
        }
        updateScassoMissionIcon(elements, '🏆');
        
        if (elements.resultButtons) {
            elements.resultButtons.innerHTML = `
                <button class="retry-button" onclick="completeChallenge('${gameState.challengeId}')" style="background: linear-gradient(135deg, #27ae60, #229954);">ENTRA NEL VILLAGGIO</button>
            `;
        }
    } else {
        if (elements.resultTitle) {
            elements.resultTitle.textContent = "MISSIONE FALLITA!";
            elements.resultTitle.className = "result-title result-failure";
        }
        if (elements.resultIcon) {
            elements.resultIcon.textContent = "🚨";
        }
        if (elements.resultMessage) {
            elements.resultMessage.textContent = `SCOPERTO! Il tuo livello di allarme ha raggiunto il massimo. Hai completato solo ${gameState.progressMade}/15 click prima di essere individuato. Le guardie sassoni sono in arrivo!`;
        }
        updateScassoMissionIcon(elements, '💥');
        
        if (elements.resultButtons) {
            elements.resultButtons.innerHTML = `
                <button class="retry-button" onclick="failChallenge('${gameState.challengeId}')">RITIRATA</button>
            `;
        }
    }
    
    if (elements.resultScreen) {
        elements.resultScreen.classList.remove('hidden');
    }
}

window.showScassoResult = showScassoResult;