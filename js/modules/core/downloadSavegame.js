/**
 * Esporta e scarica il salvataggio come file JSON
 */
function downloadSavegame() {
    try {
        const dataStr = JSON.stringify({ gameData, timestamp: new Date().toISOString() }, null, 2);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([dataStr], { type: 'application/json' }));
        link.download = `viking_raid_save_${new Date().getTime()}.json`;
        link.click();
        showModal('Salvataggio Completato', 'File di salvataggio scaricato!', [{ text: 'OK', action: closeModal }]);
    } catch (error) {
        showModal('Errore di Salvataggio', 'Impossibile salvare.', [{ text: 'OK', action: closeModal }]);
    }
}

window.downloadSavegame = downloadSavegame;