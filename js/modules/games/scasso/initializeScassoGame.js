/**
 * initializeScassoGame.js
 * Inizializza il gioco di scasso con layout barra_standard_ortho
 */

function initializeScassoGame(challengeId) {
    const gameState = {
        challengeId: challengeId,
        challengeData: skillChallenges[challengeId],
        gameActive: false,
        waitingForStart: true,
        thumbPosition: 0,
        sweetSpotPosition: 50,
        baseSweetSpotWidth: 15,
        animationSpeed: 1.8,
        direction: 1,
        animationId: null,
        phaseStartTime: 0,
        phaseDuration: 3500,
        waitingForNext: false,
        missionFinished: false,
        alarmLevel: 0,
        maxAlarm: 100,
        progressMade: 0,
        targetProgress: 15,
        alarmIncrease: 15,
        currentSweetSpotWidth: 15
    };
    
    const elements = getScassoElements();
    loadScassoMissionConfig(gameState, elements);
    
    return { gameState, elements };
}

window.initializeScassoGame = initializeScassoGame;