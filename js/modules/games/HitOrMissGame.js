/**
 * HitOrMissGame - Classe principale per la sfida di precisione cecchino
 * Gestisce l'allineamento di due assi (X e Y) per centrare il bersaglio
 */

class HitOrMissGame {
    constructor(challengeId) {
        this.challengeId = challengeId;
        this.challengeData = skillChallenges[challengeId];
        
        this.elements = {
            status: document.getElementById('game-status'),
            icon: document.getElementById('missionIcon'),
            horizontalBar: document.getElementById('horizontal-bar'),
            verticalBar: document.getElementById('vertical-bar'),
            horizontalSweetSpot: document.getElementById('horizontal-sweet-spot'),
            verticalSweetSpot: document.getElementById('vertical-sweet-spot'),
            horizontalThumb: document.getElementById('horizontal-thumb'),
            verticalThumb: document.getElementById('vertical-thumb')
        };
        
        this.gameActive = false;
        this.waitingForStart = true; // Aspetta che l'utente prema SPAZIO per iniziare
        this.currentPhase = 'waiting'; // 'waiting', 'aiming-x', 'aiming-y', 'shot-fired', 'game-over'
        
        // Posizioni dei thumb (0-100)
        this.horizontalThumbPosition = 0;
        this.verticalThumbPosition = 0;
        
        // Posizioni degli sweet spot (0-100)
        this.horizontalSweetSpotPosition = 50;
        this.verticalSweetSpotPosition = 50;
        
        // Dimensioni degli sweet spot
        this.sweetSpotWidth = 15; // percentuale per orizzontale
        this.sweetSpotHeight = 15; // percentuale per verticale
        
        // Velocità e direzione
        this.horizontalSpeed = 2.5;
        this.verticalSpeed = 2.5;
        this.horizontalDirection = 1;
        this.verticalDirection = 1;
        
        // Stati di blocco
        this.horizontalLocked = false;
        this.verticalLocked = false;
        
        // Animazioni
        this.horizontalAnimationId = null;
        this.verticalAnimationId = null;
        
        this.missionConfig = {
            background: {
                image: "sniper_bg.png"
            },
            texts: {
                initialMessage: "Premi SPAZIO per bloccare l'Asse X",
                lockingX: "ASSE X BLOCCATO! Premi SPAZIO per bloccare l'Asse Y",
                lockingY: "ASSE Y BLOCCATO! COLPO IN CORSO...",
                shotFired: "COLPO SPARATO!"
            }
        };
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.loadMissionConfig();
        this.setupChallengeElements();
        this.setupEventListeners();
        this.startMission();
    }
    
    setupChallengeElements() {
        // Setup della sfida usando il pattern delle altre classi
        const iconElement = document.getElementById('missionIcon');
        const statusElement = document.getElementById('game-status');
        setupChallengeDisplay(this.challengeId, iconElement, statusElement);
    }
    
    // Metodo per completare la sfida con successo
    onSuccess() {
        // Prima mostra il risultato, POI completa la sfida
        this.showResult('perfect');
    }
    
    // Metodo per fallire la sfida
    onFailure() {
        // Prima mostra il risultato, POI fallisce la sfida
        this.showResult('miss');
    }
    
    loadMissionConfig() {
        const backgroundImg = document.getElementById('background-image');
        if (backgroundImg) {
            backgroundImg.src = this.missionConfig.background.image;
        }
        
        const gameStatus = document.getElementById('game-status');
        if (gameStatus) {
            gameStatus.textContent = this.missionConfig.texts.initialMessage;
        }
    }
    
    setupEventListeners() {
        // Listener per SPAZIO
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                // Assicurati che siamo nella sezione giusta
                if (!document.getElementById('challenge-hit-or-miss-section')?.classList.contains('active')) {
                    return;
                }
                
                e.preventDefault();
                this.handleAction();
            }
        });
        
        // Listener per click del mouse
        document.addEventListener('click', (e) => {
            if (e.target.closest('#result-screen')) {
                return;
            }
            
            if (this.gameActive || this.currentPhase !== 'game-over') {
                e.preventDefault();
                this.handleAction();
            }
        });
    }
    
    startMission() {
        this.showMessage(this.missionConfig.texts.initialMessage);
        this.updateMissionIcon('🎯');
        
        // Posiziona gli sweet spot in posizioni casuali
        this.setupSweetSpots();
        
        // NON avviare automaticamente - aspetta che l'utente prema SPAZIO
        // Nascondi entrambi i thumb inizialmente
        const horizontalThumb = document.getElementById('horizontal-thumb');
        const verticalThumb = document.getElementById('vertical-thumb');
        if (horizontalThumb) horizontalThumb.classList.add('inactive');
        if (verticalThumb) verticalThumb.classList.add('inactive');
    }
    
    setupSweetSpots() {
        // Posiziona sweet spot orizzontale
        const minHorizontal = this.sweetSpotWidth / 2;
        const maxHorizontal = 100 - this.sweetSpotWidth / 2;
        this.horizontalSweetSpotPosition = minHorizontal + Math.random() * (maxHorizontal - minHorizontal);
        
        // Posiziona sweet spot verticale
        const minVertical = this.sweetSpotHeight / 2;
        const maxVertical = 100 - this.sweetSpotHeight / 2;
        this.verticalSweetSpotPosition = minVertical + Math.random() * (maxVertical - minVertical);
        
        // Applica posizioni agli elementi DOM
        const horizontalSweetSpot = document.getElementById('horizontal-sweet-spot');
        const verticalSweetSpot = document.getElementById('vertical-sweet-spot');
        
        if (horizontalSweetSpot) {
            horizontalSweetSpot.style.width = this.sweetSpotWidth + '%';
            horizontalSweetSpot.style.left = (this.horizontalSweetSpotPosition - this.sweetSpotWidth/2) + '%';
        }
        
        if (verticalSweetSpot) {
            verticalSweetSpot.style.height = this.sweetSpotHeight + '%';
            verticalSweetSpot.style.top = (this.verticalSweetSpotPosition - this.sweetSpotHeight/2) + '%';
        }
    }
    
    startHorizontalAnimation() {
        this.gameActive = true;
        
        // Attiva SOLO il thumb orizzontale
        const horizontalThumb = document.getElementById('horizontal-thumb');
        const verticalThumb = document.getElementById('vertical-thumb');
        
        if (horizontalThumb) {
            horizontalThumb.classList.remove('inactive');
        }
        if (verticalThumb) {
            verticalThumb.classList.add('inactive');
        }
        
        this.animateHorizontalThumb();
    }

    startVerticalAnimation() {
        // Ferma animazione orizzontale e attiva quella verticale
        if (this.horizontalAnimationId) {
            cancelAnimationFrame(this.horizontalAnimationId);
        }
        
        // Attiva SOLO il thumb verticale
        document.getElementById('horizontal-thumb').classList.add('inactive');
        document.getElementById('vertical-thumb').classList.remove('inactive');
        this.animateVerticalThumb();
    }
    
    animateHorizontalThumb() {
        if (!this.gameActive || this.horizontalLocked) return;
        
        this.horizontalThumbPosition += this.horizontalSpeed * this.horizontalDirection;
        
        if (this.horizontalThumbPosition >= 98) {
            this.horizontalThumbPosition = 98;
            this.horizontalDirection = -1;
        } else if (this.horizontalThumbPosition <= 2) {
            this.horizontalThumbPosition = 2;
            this.horizontalDirection = 1;
        }
        
        const thumb = document.getElementById('horizontal-thumb');
        if (thumb) {
            thumb.style.left = this.horizontalThumbPosition + '%';
        }
        this.horizontalAnimationId = requestAnimationFrame(() => this.animateHorizontalThumb());
    }
    
    animateVerticalThumb() {
        if (!this.gameActive || this.verticalLocked) return;
        
        this.verticalThumbPosition += this.verticalSpeed * this.verticalDirection;
        
        if (this.verticalThumbPosition >= 98) {
            this.verticalThumbPosition = 98;
            this.verticalDirection = -1;
        } else if (this.verticalThumbPosition <= 2) {
            this.verticalThumbPosition = 2;
            this.verticalDirection = 1;
        }
        
        const thumb = document.getElementById('vertical-thumb');
        if (thumb) {
            thumb.style.top = this.verticalThumbPosition + '%';
        }
        this.verticalAnimationId = requestAnimationFrame(() => this.animateVerticalThumb());
    }
    
    handleAction() {
        if (this.currentPhase === 'waiting' && this.waitingForStart) {
            // Prima pressione di SPAZIO - avvia il gioco
            this.waitingForStart = false;
            this.currentPhase = 'aiming-x';
            this.showMessage("Blocca l'asse X!");
            this.startHorizontalAnimation();
        } else if (this.currentPhase === 'aiming-x' && !this.horizontalLocked) {
            this.lockHorizontalAxis();
        } else if (this.currentPhase === 'aiming-y' && !this.verticalLocked) {
            this.lockVerticalAxisAndShoot();
        } else if (this.currentPhase === 'game-over') {
            return;
        }
    }
    
    lockHorizontalAxis() {
        this.horizontalLocked = true;
        this.currentPhase = 'aiming-y';
        
        const isInHorizontalSweet = this.checkHorizontalHit();
        
        if (isInHorizontalSweet) {
            document.getElementById('horizontal-thumb').classList.add('locked');
            document.getElementById('horizontal-sweet-spot').classList.add('locked');
        }
        
        this.showMessage(this.missionConfig.texts.lockingX);
        this.updateMissionIcon('🟡');
        
        // Avvia l'animazione verticale
        setTimeout(() => {
            this.startVerticalAnimation();
        }, 500);
    }
    
    lockVerticalAxisAndShoot() {
        this.verticalLocked = true;
        this.currentPhase = 'shot-fired';
        this.gameActive = false;
        
        // Ferma tutte le animazioni
        if (this.verticalAnimationId) {
            cancelAnimationFrame(this.verticalAnimationId);
        }
        
        const isInVerticalSweet = this.checkVerticalHit();
        const isInHorizontalSweet = this.checkHorizontalHit();
        
        if (isInVerticalSweet) {
            document.getElementById('vertical-thumb').classList.add('locked');
            document.getElementById('vertical-sweet-spot').classList.add('locked');
        }
        
        // Disattiva entrambi i thumb
        document.getElementById('horizontal-thumb').classList.add('inactive');
        document.getElementById('vertical-thumb').classList.add('inactive');
        
        this.showMessage(this.missionConfig.texts.shotFired);
        this.updateMissionIcon('💥');
        
        setTimeout(() => {
            this.evaluateShot(isInHorizontalSweet, isInVerticalSweet);
        }, 1500);
    }
    
    checkHorizontalHit() {
        const sweetStart = this.horizontalSweetSpotPosition - this.sweetSpotWidth/2;
        const sweetEnd = this.horizontalSweetSpotPosition + this.sweetSpotWidth/2;
        return this.horizontalThumbPosition >= sweetStart && this.horizontalThumbPosition <= sweetEnd;
    }
    
    checkVerticalHit() {
        const sweetStart = this.verticalSweetSpotPosition - this.sweetSpotHeight/2;
        const sweetEnd = this.verticalSweetSpotPosition + this.sweetSpotHeight/2;
        return this.verticalThumbPosition >= sweetStart && this.verticalThumbPosition <= sweetEnd;
    }
    
    evaluateShot(horizontalHit, verticalHit) {
        this.currentPhase = 'game-over';
        
        let result;
        if (horizontalHit && verticalHit) {
            result = 'perfect';
            this.onSuccess(); // Chiama il successo
        } else {
            result = horizontalHit || verticalHit ? 'near' : 'miss';
            this.onFailure(); // Chiama il fallimento
        }
        
        this.showResult(result);
    }
    
    showResult(result) {
        if (result === 'perfect') {
            this.updateMissionIcon('🏆');
            showModal('🎯 COLPO PERFETTO!', 
                'INCREDIBILE! Hai centrato perfettamente il bersaglio con un solo colpo! Precisione chirurgica degna di un cecchino d\'élite.', 
                [{ 
                    text: 'CONTINUA', 
                    action: () => { 
                        closeModal(); 
                        window.completeChallenge(this.challengeId);
                    } 
                }]
            );
        } else if (result === 'near') {
            this.updateMissionIcon('⚠️');
            showModal('🎯 COLPO VICINO!', 
                'Quasi! Il colpo è passato vicino al bersaglio, ma non abbastanza per centrarlo. Un cecchino deve essere perfetto.', 
                [{ 
                    text: 'RIPROVA', 
                    action: () => { 
                        closeModal(); 
                        window.failChallenge(this.challengeId);
                    } 
                }]
            );
        } else {
            this.updateMissionIcon('💥');
            showModal('💥 COLPO MANCATO!', 
                'Il colpo è andato completamente fuori bersaglio! Un cecchino non può permettersi errori del genere.', 
                [{ 
                    text: 'RIPROVA', 
                    action: () => { 
                        closeModal(); 
                        window.failChallenge(this.challengeId);
                    } 
                }]
            );
        }
    }
    
    updateMissionIcon(icon) {
        const missionIconEl = document.getElementById('missionIcon');
        if (missionIconEl) {
            missionIconEl.textContent = icon;
        }
    }
    
    showMessage(message) {
        const statusDiv = document.getElementById('game-status');
        if (statusDiv) {
            statusDiv.textContent = message;
        }
    }
    
    // Metodo per reset del gioco
    reset() {
        // Reset stato
        this.gameActive = false;
        this.currentPhase = 'aiming-x';
        this.horizontalLocked = false;
        this.verticalLocked = false;
        this.horizontalThumbPosition = 0;
        this.verticalThumbPosition = 0;
        
        // Ferma animazioni
        if (this.horizontalAnimationId) {
            cancelAnimationFrame(this.horizontalAnimationId);
            this.horizontalAnimationId = null;
        }
        if (this.verticalAnimationId) {
            cancelAnimationFrame(this.verticalAnimationId);
            this.verticalAnimationId = null;
        }
        
        // Reset visuali
        const horizontalThumb = document.getElementById('horizontal-thumb');
        const verticalThumb = document.getElementById('vertical-thumb');
        const horizontalSweetSpot = document.getElementById('horizontal-sweet-spot');
        const verticalSweetSpot = document.getElementById('vertical-sweet-spot');
        
        if (horizontalThumb) {
            horizontalThumb.classList.remove('locked', 'inactive');
            horizontalThumb.style.left = '2%';
        }
        if (verticalThumb) {
            verticalThumb.classList.remove('locked');
            verticalThumb.classList.add('inactive');
            verticalThumb.style.top = '2%';
        }
        if (horizontalSweetSpot) {
            horizontalSweetSpot.classList.remove('locked');
        }
        if (verticalSweetSpot) {
            verticalSweetSpot.classList.remove('locked');
        }
    }
}

// Esposizione globale
window.HitOrMissGame = HitOrMissGame;