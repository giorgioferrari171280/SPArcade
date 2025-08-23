/**
 * resetScassoThumb.js
 * Reimposta la posizione del thumb
 */

function resetScassoThumb(elements) {
    if (elements.thumb) {
        elements.thumb.style.left = '2%';
    }
}

window.resetScassoThumb = resetScassoThumb;