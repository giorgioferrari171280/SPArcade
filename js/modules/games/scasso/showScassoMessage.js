/**
 * showScassoMessage.js
 * Mostra un messaggio di stato nel gioco
 */

function showScassoMessage(elements, message, statusClass) {
    if (elements.status) {
        elements.status.textContent = message;
        if (statusClass === 'status-alert') {
            elements.status.style.color = '#E74C3C';
        } else {
            elements.status.style.color = '#FFD700';
        }
    }
}

window.showScassoMessage = showScassoMessage;