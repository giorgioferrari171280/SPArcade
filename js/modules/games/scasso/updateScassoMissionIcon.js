/**
 * updateScassoMissionIcon.js
 * Aggiorna l'icona della missione
 */

function updateScassoMissionIcon(elements, icon) {
    if (elements.icon) {
        elements.icon.textContent = icon;
    }
}

window.updateScassoMissionIcon = updateScassoMissionIcon;