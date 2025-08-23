/**
 * Configura l'immagine e la descrizione per una sfida
 * @param {string} challengeId - ID della sfida
 * @param {HTMLElement} iconElement - Elemento dell'icona della missione
 * @param {HTMLElement} statusElement - Elemento dello status del gioco
 */
function setupChallengeDisplay(challengeId, iconElement, statusElement) {
    const challengeData = skillChallenges[challengeId];
    if (!challengeData) return;

    // Setup immagine
    if (challengeData.image && iconElement) {
        const container = iconElement.parentElement;
        let imgElement = container.querySelector('.challenge-image');
        
        if (!imgElement) {
            imgElement = document.createElement('img');
            imgElement.className = 'challenge-image';
            imgElement.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 12px;
                display: block;
            `;
            container.appendChild(imgElement);
        }
        
        imgElement.src = `images/${challengeData.image}`;
        imgElement.alt = challengeData.title;
        imgElement.onerror = () => {
            imgElement.style.display = 'none';
            iconElement.style.display = 'block';
        };
        imgElement.onload = () => {
            iconElement.style.display = 'none';
            imgElement.style.display = 'block';
        };
    }

    // Setup descrizione
    if (challengeData.description && statusElement) {
        const textBox = statusElement.parentElement;
        let descElement = textBox.querySelector('.challenge-description');
        
        if (!descElement) {
            descElement = document.createElement('div');
            descElement.className = 'challenge-description';
            descElement.style.cssText = `
                padding: 10px;
                font-size: 1.8vh;
                color: rgba(255,255,255,0.8);
                text-align: center;
                line-height: 1.4;
                margin-bottom: 10px;
                background: rgba(0,0,0,0.3);
                border-radius: 8px;
                border-left: 4px solid #d4af37;
            `;
            textBox.insertBefore(descElement, textBox.firstChild);
        }
        
        descElement.textContent = challengeData.description;
    }
}

window.setupChallengeDisplay = setupChallengeDisplay;