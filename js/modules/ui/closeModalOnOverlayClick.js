/**
 * Chiude il modal se si clicca sull'overlay
 * @param {Event} event - Evento del click
 */
function closeModalOnOverlayClick(event) {
    if (event.target === event.currentTarget) {
        closeModal();
    }
}

window.closeModalOnOverlayClick = closeModalOnOverlayClick;