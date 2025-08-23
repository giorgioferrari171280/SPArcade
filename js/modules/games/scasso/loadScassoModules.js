/**
 * loadScassoModules.js
 * Carica tutti i moduli necessari per il gioco di scasso
 */

function loadScassoModules() {
    const scassoModules = [
        'js/modules/games/scasso/getScassoElements.js',
        'js/modules/games/scasso/loadScassoMissionConfig.js',
        'js/modules/games/scasso/updateScassoMissionIcon.js',
        'js/modules/games/scasso/showScassoMessage.js',
        'js/modules/games/scasso/showScassoReadyPhase.js',
        'js/modules/games/scasso/updateScassoSweetSpot.js',
        'js/modules/games/scasso/resetScassoThumb.js',
        'js/modules/games/scasso/updateScassoStatus.js',
        'js/modules/games/scasso/animateScasso.js',
        'js/modules/games/scasso/handleScassoAction.js',
        'js/modules/games/scasso/processScassoAction.js',
        'js/modules/games/scasso/scassoTimeOut.js',
        'js/modules/games/scasso/updateScassoDisplay.js',
        'js/modules/games/scasso/checkScassoMissionEnd.js',
        'js/modules/games/scasso/endScassoMission.js',
        'js/modules/games/scasso/showScassoResult.js',
        'js/modules/games/scasso/startScassoLockpicking.js',
        'js/modules/games/scasso/setupScassoEventListeners.js',
        'js/modules/games/scasso/initializeScassoGame.js',
        'js/modules/games/scasso/ScassoChallenge.js'
    ];
    
    // Carica tutti i moduli in sequenza
    scassoModules.forEach(modulePath => {
        const script = document.createElement('script');
        script.src = modulePath;
        script.defer = true;
        document.head.appendChild(script);
    });
}

// Carica i moduli quando il DOM è pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadScassoModules);
} else {
    loadScassoModules();
}

window.loadScassoModules = loadScassoModules;