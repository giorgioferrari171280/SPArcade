/**
 * Inizializzazione del gioco al caricamento della pagina
 */
window.addEventListener('load', function() {
    showSection('main-menu-section');
    if (loadGameState() && gameData.player.name) {
        console.log('Salvataggio trovato');
    }
    updateVolumeSlider();
    updateVolumeIcon();
    audioManager.playBackgroundMusic(['audio/placeholder.mp3']);
});

window.initialization = true;