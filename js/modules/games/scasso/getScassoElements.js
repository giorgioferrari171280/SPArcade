/**
 * getScassoElements.js
 * Ottiene tutti gli elementi DOM per il gioco di scasso
 */

function getScassoElements() {
    return {
        status: document.getElementById('game-status'),
        icon: document.getElementById('missionIcon'),
        alarmFill: document.getElementById('suspicion-fill'),
        alarmText: document.getElementById('suspicion-text'),
        progressCounter: document.getElementById('progress-counter'),
        progressFill: document.getElementById('progress-fill'),
        sweetSpot: document.getElementById('sweet-spot'),
        thumb: document.getElementById('thumb'),
        resultScreen: document.getElementById('result-screen'),
        resultTitle: document.getElementById('result-title'),
        resultIcon: document.getElementById('result-icon'),
        resultMessage: document.getElementById('result-message'),
        resultButtons: document.getElementById('result-buttons'),
        backgroundImage: document.getElementById('background-image'),
        challengeTitle: document.getElementById('skill-challenge-title')
    };
}

window.getScassoElements = getScassoElements;