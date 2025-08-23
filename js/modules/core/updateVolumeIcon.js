/**
 * Aggiorna l'icona del volume
 */
function updateVolumeIcon() {
    const icon = document.querySelector('.volume-icon');
    if (gameData.settings.muted || gameData.settings.volume === 0) {
        icon.textContent = '🔇';
    } else if (gameData.settings.volume < 50) {
        icon.textContent = '🔉';
    } else {
        icon.textContent = '🔊';
    }
}

window.updateVolumeIcon = updateVolumeIcon;