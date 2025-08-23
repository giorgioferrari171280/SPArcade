/**
 * Gestisce il caricamento di un file di salvataggio
 * @param {Event} event - Evento del file input
 */
function handleSavegameFileLoad(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const saveData = JSON.parse(e.target.result);
            if (saveData.gameData) {
                gameData = saveData.gameData;
                updateVolumeSlider();
                updateVolumeIcon();
                audioManager.setVolume(gameData.settings.volume);
                showModal('Caricamento Completato', 'Salvataggio caricato!', [{ text: 'OK', action: closeModal }]);
            } else {
                throw new Error('Formato non valido');
            }
        } catch (error) {
            showModal('Errore di Caricamento', 'File non valido.', [{ text: 'OK', action: closeModal }]);
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

window.handleSavegameFileLoad = handleSavegameFileLoad;