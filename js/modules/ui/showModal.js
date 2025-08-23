/**
 * Mostra un modal con titolo, messaggio e pulsanti
 * @param {string} title - Titolo del modal
 * @param {string} message - Messaggio da mostrare
 * @param {Array} buttons - Array di oggetti {text, action}
 */
function showModal(title, message, buttons) {
    const overlay = document.getElementById('modal-overlay');
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    
    const buttonsEl = document.getElementById('modal-buttons');
    buttonsEl.innerHTML = '';
    
    buttons.forEach(b => {
        const btn = document.createElement('button');
        btn.className = 'modal-button';
        btn.textContent = b.text;
        btn.onclick = b.action;
        buttonsEl.appendChild(btn);
    });
    
    overlay.classList.add('show');
}

window.showModal = showModal;