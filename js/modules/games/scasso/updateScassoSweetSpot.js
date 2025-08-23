/**
 * updateScassoSweetSpot.js
 * Aggiorna la posizione e dimensione dello sweet spot
 */

function updateScassoSweetSpot(gameState, elements) {
    if (elements.sweetSpot) {
        elements.sweetSpot.style.left = gameState.sweetSpotPosition + '%';
        elements.sweetSpot.style.width = gameState.currentSweetSpotWidth + '%';
    }
}

window.updateScassoSweetSpot = updateScassoSweetSpot;