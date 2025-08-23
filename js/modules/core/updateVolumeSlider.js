/**
 * Aggiorna lo slider del volume
 */
function updateVolumeSlider() {
    document.getElementById('volume-slider').value = gameData.settings.volume;
}

window.updateVolumeSlider = updateVolumeSlider;