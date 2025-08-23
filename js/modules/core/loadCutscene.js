/**
 * Carica e mostra una cutscene
 * @param {number} slideIndex - Indice della slide da mostrare
 */
function loadCutscene(slideIndex) {
    gameData.player.location = 'cutscene-section';
    saveGameState();
    
    const cutscene = cutsceneData[gameData.currentCutsceneId];
    if (!cutscene || !cutscene.slides || slideIndex >= cutscene.slides.length) return;
    
    const slide = cutscene.slides[slideIndex];
    document.getElementById('cutscene-title').textContent = cutscene.title;
    document.getElementById('cutscene-narrative-content').innerHTML = slide.narrative.replace(/\n\n/g, '<br><br>');
    
    const imgContainer = document.querySelector('#cutscene-section .image-container');
    if (slide.image) {
        imgContainer.innerHTML = `<img src="${slide.image}" alt="Immagine cutscene">`;
    } else {
        imgContainer.innerHTML = '<div class="image-placeholder">Immagine qui</div>';
    }
}

window.loadCutscene = loadCutscene;