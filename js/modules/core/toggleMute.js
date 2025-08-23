/**
 * Toggle mute audio
 */
function toggleMute() {
    audioManager.toggleMute();
    gameData.settings.muted = audioManager.isMuted();
    updateVolumeIcon();
}

window.toggleMute = toggleMute;