/**
 * Mostra la hall of fame
 */
function showHallOfFame() {
    showModal('Hall of Fame', 'Nessun punteggio registrato.', [{ text: 'Chiudi', action: closeModal }]);
}

window.showHallOfFame = showHallOfFame;