/**
 * Mostra una sezione specifica nascondendo le altre
 * @param {string} sectionId - ID della sezione da mostrare
 */
function showSection(sectionId) {
    document.querySelectorAll('.spa-section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId)?.classList.add('active');
    gameData.player.location = sectionId;
    // Salva automaticamente quando cambia sezione
    saveGameState();
}

window.showSection = showSection;