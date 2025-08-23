/**
 * Esce dal gioco
 */
function exitGame() {
    showModal('Ritorno a Midgard', 'Sei sicuro di voler abbandonare il raid?', [
        { text: 'Abbandona', action: () => window.close() },
        { text: 'Resta', action: closeModal }
    ]);
}

window.exitGame = exitGame;