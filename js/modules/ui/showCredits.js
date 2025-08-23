/**
 * Mostra i crediti
 */
function showCredits() {
    showModal('Crediti', '© 2025 - Tutti i diritti riservati', [{ text: 'Chiudi', action: closeModal }]);
}

window.showCredits = showCredits;