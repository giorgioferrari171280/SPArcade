/**
 * loadScassoMissionConfig.js
 * Carica la configurazione della missione di scasso
 */

function loadScassoMissionConfig(gameState, elements) {
    // Carica l'immagine di sfondo
    if (elements.backgroundImage && gameState.challengeData.image) {
        elements.backgroundImage.src = gameState.challengeData.image;
    }
    
    // Carica il titolo della sfida
    if (elements.challengeTitle && gameState.challengeData.title) {
        elements.challengeTitle.textContent = `🗝 ${gameState.challengeData.title.toUpperCase()} 🗝`;
        elements.challengeTitle.setAttribute('data-text', `🗝 ${gameState.challengeData.title.toUpperCase()} 🗝`);
    }
    
    // Carica il messaggio iniziale
    if (elements.status) {
        const startMessage = gameState.challengeData.statusMessages?.start || "Premi SPAZIO per iniziare!";
        elements.status.textContent = startMessage;
    }
    
    // Imposta l'icona iniziale della missione
    if (elements.icon) {
        elements.icon.textContent = gameState.challengeData.missionIcon || '🗝';
    }
}

window.loadScassoMissionConfig = loadScassoMissionConfig;