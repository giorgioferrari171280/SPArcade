/**
 * Gestore Audio per la riproduzione della musica di sfondo
 */
class AudioManager {
    constructor() {
        this.backgroundMusic = null;
        this.musicFiles = [];
        this.currentTrackIndex = 0;
    }
    
    playBackgroundMusic(files) {
        if (!files || files.length === 0) return;
        this.musicFiles = files;
        this.currentTrackIndex = 0;
        this.loadAndPlayTrack();
    }
    
    loadAndPlayTrack() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.backgroundMusic = null;
        }
        
        const currentFile = this.musicFiles[this.currentTrackIndex];
        this.backgroundMusic = new Audio(currentFile);
        this.backgroundMusic.volume = gameData.settings.volume / 100;
        this.backgroundMusic.loop = this.musicFiles.length === 1;
        
        this.backgroundMusic.addEventListener('ended', () => {
            if (this.musicFiles.length > 1) {
                this.currentTrackIndex = (this.currentTrackIndex + 1) % this.musicFiles.length;
                this.loadAndPlayTrack();
            }
        });
        
        this.backgroundMusic.play().catch(error => console.warn('Audio playback failed:', error));
    }
    
    setVolume(volume) {
        if (this.backgroundMusic) {
            this.backgroundMusic.volume = volume / 100;
        }
    }
    
    toggleMute() {
        if (this.backgroundMusic) {
            this.backgroundMusic.muted = !this.backgroundMusic.muted;
        }
    }
    
    isMuted() {
        return this.backgroundMusic ? this.backgroundMusic.muted : false;
    }
}

const audioManager = new AudioManager();
window.audioManager = audioManager;