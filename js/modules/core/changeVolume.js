/**
 * Cambia il volume
 * @param {number} value - Nuovo valore del volume
 */
function changeVolume(value) {
    gameData.settings.volume = parseInt(value);
    audioManager.setVolume(gameData.settings.volume);
    updateVolumeIcon();
}

window.changeVolume = changeVolume;