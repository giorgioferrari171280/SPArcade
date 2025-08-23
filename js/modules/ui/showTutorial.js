/**
 * Mostra il tutorial
 */
function showTutorial() {
    showModal('Tutorial', 'Supera le sfide per continuare. Premi SPAZIO al momento giusto.', [{ text: 'Per Odino!', action: closeModal }]);
}

window.showTutorial = showTutorial;