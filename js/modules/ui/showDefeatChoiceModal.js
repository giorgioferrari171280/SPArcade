/**
 * Mostra il modal per scegliere cosa fare dopo una sconfitta
 */
function showDefeatChoiceModal() {
    const challenge = skillChallenges[gameData.lastFailedChallenge];
    const challengeName = challenge ? challenge.title : 'Sfida';
    
    showModal(
        'Sconfitta!', 
        `La tua impresa "${challengeName}" è fallita, ma puoi riprovare. Cosa vuoi fare?`,
        [
            { 
                text: 'Riprova Sfida', 
                action: () => { 
                    closeModal(); 
                    retryFailedChallenge(); 
                } 
            },
            { 
                text: 'Torna al Campo', 
                action: () => { 
                    closeModal(); 
                    backToMainMenu(); 
                } 
            }
        ]
    );
}

window.showDefeatChoiceModal = showDefeatChoiceModal;