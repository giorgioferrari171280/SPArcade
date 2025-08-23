/**
 * Avvia una sfida specifica
 * @param {string} challengeId - ID della sfida da avviare
 */
function startChallenge(challengeId) {
    const challenge = skillChallenges[challengeId];
    if (!challenge) return;
    
    currentChallengeId = challengeId;
    // Salva la sfida corrente nel gameData
    gameData.currentChallengeId = challengeId;
    saveGameState();
    let sectionId;

    // Nasconde tutte le schermate di risultato
    document.querySelectorAll('.result-overlay').forEach(el => el.classList.add('hidden'));

    switch (challenge.type) {
        case 'viking_lockpick':
            // Usa la nuova classe ScassoChallenge per scasso_challenge
            if (challengeId === 'scasso_challenge') {
                sectionId = 'skill-challenge-section';
                currentGame = new ScassoChallenge(challengeId);
            } else {
                sectionId = 'skill-challenge-section';
                currentGame = new VikingLockpickGame(challengeId);
            }
            break;
        case 'viking_lockpick_timed':
            sectionId = 'skill-challenge-timer-section';
            currentGame = new TimedLockpickGame(challengeId);
            break;
        case 'viking_combat':
            sectionId = 'skill-challenge-combat-section';
            currentGame = new DualBarCombatGame(challengeId);
            break;
        case 'viking_lockpick_perfect':
            sectionId = 'skill-challenge-perfect-section';
            currentGame = new PerfectLockpickGame(challengeId);
            break;
        case 'viking_accumulator':
            sectionId = 'skill-challenge-accumulator-section';
            currentGame = new ScoreAccumulatorGame(challengeId);
            break;
        case 'viking_sudden_death':
            sectionId = 'skill-challenge-sudden-death-section';
            currentGame = new SuddenDeathGame(challengeId);
            break;
        case 'hit_or_miss':
            sectionId = 'challenge-hit-or-miss-section';
            currentGame = new HitOrMissGame(challengeId);
            break;
        case 'double_bar_combat':
            sectionId = 'challenge-double-bar-section';
            currentGame = new DoubleBarCombatGame(challengeId);
            break;
    }
    
    if(sectionId) showSection(sectionId);
}

window.startChallenge = startChallenge;