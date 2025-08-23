/**
 * Riprova la sfida fallita
 */
function retryFailedChallenge() {
    if (gameData.lastFailedChallenge) {
        // Trova la cutscene introduttiva appropriata per la sfida
        let introCutsceneId = 'intro_cutscene'; // Default
        
        switch (gameData.lastFailedChallenge) {
            case 'scasso_challenge':
                introCutsceneId = 'intro_cutscene';
                break;
            case 'accumulator_challenge':
                introCutsceneId = 'success_cutscene';
                break;
            case 'sudden_death_challenge':
                introCutsceneId = 'second_cutscene';
                break;
            case 'viking_lockpick_timed':
                introCutsceneId = 'intro_cutscene';
                break;
            case 'viking_combat':
                introCutsceneId = 'success_cutscene';
                break;
            case 'viking_lockpick_perfect':
                introCutsceneId = 'second_cutscene';
                break;
        }
        
        // Carica la cutscene introduttiva della sfida fallita
        gameData.currentCutsceneId = introCutsceneId;
        gameData.currentSlideIndex = 0;
        loadCutscene(0);
        showSection('cutscene-section');
    } else {
        backToMainMenu();
    }
}

window.retryFailedChallenge = retryFailedChallenge;