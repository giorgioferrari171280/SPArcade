/**
 * CLASSE SFIDA 5: ACCUMULATORE PUNTEGGIO
 */
class ScoreAccumulatorGame {
    constructor(challengeId) {
        this.challengeId = challengeId;
        this.challengeData = skillChallenges[challengeId];
        
        this.elements = {
            status: document.getElementById('game-status-acc'),
            timerText: document.getElementById('timer-text-acc'),
            timerFill: document.getElementById('timer-fill-acc'),
            scoreDisplay: document.getElementById('score-display-acc'),
            actionBar: document.getElementById('action-bar-acc'),
            thumb: document.getElementById('action-thumb-acc'),
            sweetSpot: document.getElementById('action-sweet-spot-acc'),
            resultScreen: document.getElementById('result-screen-acc'),
            resultTitle: document.getElementById('result-title-acc'),
            resultIcon: document.getElementById('result-icon-acc'),
            resultMessage: document.getElementById('result-message-acc'),
            resultButtons: document.getElementById('result-buttons-acc'),
            winThreshold: document.getElementById('win-threshold-acc')
        };
        
        this.config = {
            timerDuration: 60,
            winThreshold: 10,
            thumbSpeed: 5,
            sweetSpotSize: 0.12,
            moveInterval: 30
        };
        
        this.state = {};
        this.intervals = {};
        
        this.initializeGame();
    }

    initializeGame() {
        this.resetGameState();
        this.updateDisplay();
        this.setupSweetSpot();
        this.setupChallengeElements();
        
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.elements.actionBar.addEventListener('click', this.handleAction.bind(this));
    }

    setupChallengeElements() {
        // Setup immagine e descrizione - usa l'elemento placeholder come icona
        const iconElement = document.getElementById('image-placeholder-acc');
        setupChallengeDisplay(this.challengeId, iconElement, this.elements.status);
        
        // Mostra messaggio iniziale personalizzato
        const startMessage = this.challengeData.statusMessages?.start || "Premi SPAZIO per iniziare!";
        this.elements.status.textContent = startMessage;
        
        // Aggiorna l'icona della missione se definita
        if (this.challengeData.missionIcon && iconElement) {
            iconElement.textContent = this.challengeData.missionIcon + " SFIDA DI FORZA";
        }
    }

    handleKeyDown(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            if (gameData.player.location !== 'skill-challenge-accumulator-section') return;
            this.handleAction();
        }
    }

    resetGameState() {
        this.state = {
            isRunning: false,
            score: 0,
            timeLeft: this.config.timerDuration,
            thumbPosition: 0,
            thumbDirection: 1,
            sweetSpotPosition: Math.random() * (1 - this.config.sweetSpotSize) + this.config.sweetSpotSize / 2
        };
        
        Object.values(this.intervals).forEach(clearInterval);
        this.intervals = {};
    }

    setupSweetSpot() {
        const width = this.config.sweetSpotSize * 100;
        const left = (this.state.sweetSpotPosition - this.config.sweetSpotSize / 2) * 100;
        this.elements.sweetSpot.style.width = width + '%';
        this.elements.sweetSpot.style.left = left + '%';
    }

    handleAction() {
        if (!this.state.isRunning) {
            this.startGame();
            return;
        }
        
        const isInSweetSpot = this.checkSweetSpotHit();
        if (isInSweetSpot) {
            this.state.score++;
            this.showFeedback('HIT');
            // Sposta la sweet spot in una nuova posizione
            this.state.sweetSpotPosition = Math.random() * (1 - this.config.sweetSpotSize) + this.config.sweetSpotSize / 2;
            this.setupSweetSpot();
        } else {
            this.showFeedback('MISS');
        }
        
        this.updateDisplay();
    }

    showFeedback(type) {
        // Rimuovi feedback esistente
        const existingFeedback = document.querySelector('.hit-miss-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        // Crea nuovo elemento feedback
        const feedback = document.createElement('div');
        feedback.className = `hit-miss-feedback ${type.toLowerCase()}`;
        feedback.textContent = type;
        
        // Aggiungi al container della barra azione
        this.elements.actionBar.parentElement.appendChild(feedback);
        
        // Rimuovi dopo l'animazione
        setTimeout(() => {
            feedback.remove();
        }, 600);
    }

    startGame() {
        if (this.state.isRunning) return;
        
        this.state.isRunning = true;
        const readyMessage = this.challengeData.statusMessages?.ready || "💪 Colpisci la zona verde!";
        this.elements.status.textContent = readyMessage;
        this.startTimer();
        this.startThumbMovement();
    }

    startTimer() {
        this.intervals.timer = setInterval(() => {
            if (!this.state.isRunning) return;
            
            this.state.timeLeft--;
            this.updateDisplay();
            
            if (this.state.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    startThumbMovement() {
        this.intervals.thumbMovement = setInterval(() => {
            if (!this.state.isRunning) return;
            
            this.state.thumbPosition += this.state.thumbDirection * this.config.thumbSpeed;
            
            const barWidth = this.elements.actionBar.offsetWidth;
            const thumbWidth = 20;
            const maxPosition = 100 - ((thumbWidth / barWidth) * 100);
            
            if (this.state.thumbPosition >= maxPosition) {
                this.state.thumbPosition = maxPosition;
                this.state.thumbDirection = -1;
            } else if (this.state.thumbPosition <= 0) {
                this.state.thumbPosition = 0;
                this.state.thumbDirection = 1;
            }
            
            this.elements.thumb.style.left = this.state.thumbPosition + '%';
        }, this.config.moveInterval);
    }

    checkSweetSpotHit() {
        const barWidth = this.elements.actionBar.offsetWidth;
        const thumbWidthPercent = (20 / barWidth) * 100;
        const thumbCenter = this.state.thumbPosition + (thumbWidthPercent / 2);
        
        const sweetSpotLeft = (this.state.sweetSpotPosition - this.config.sweetSpotSize / 2) * 100;
        const sweetSpotRight = sweetSpotLeft + (this.config.sweetSpotSize * 100);
        
        return thumbCenter >= sweetSpotLeft && thumbCenter <= sweetSpotRight;
    }

    endGame() {
        this.state.isRunning = false;
        Object.values(this.intervals).forEach(clearInterval);
        this.showResults();
    }

    updateDisplay() {
        this.elements.scoreDisplay.textContent = this.state.score;
        this.elements.timerText.textContent = this.state.timeLeft;
        
        const percentage = this.state.timeLeft / this.config.timerDuration;
        const angle = percentage * 360;
        this.elements.timerFill.style.setProperty('--timer-angle', angle + 'deg');
    }

    showResults() {
        const hasWon = this.state.score >= this.config.winThreshold;
        
        if (hasWon) {
            this.elements.resultTitle.textContent = "VITTORIA!";
            this.elements.resultIcon.textContent = "🏆";
            this.elements.resultMessage.textContent = `💪 Complimenti! Punteggio finale: ${this.state.score}.`;
            this.elements.resultButtons.innerHTML = `<button class="retry-button" onclick="completeChallenge(currentChallengeId)">AVANTI</button>`;
        } else {
            this.elements.resultTitle.textContent = "SCONFITTA!";
            this.elements.resultIcon.textContent = "💀";
            this.elements.resultMessage.textContent = `💥 Non hai raggiunto il minimo! Punteggio: ${this.state.score}/${this.config.winThreshold}.`;
            this.elements.resultButtons.innerHTML = `<button class="retry-button" onclick="failChallenge(currentChallengeId)">RITIRATA</button>`;
        }
        
        this.elements.resultScreen.classList.remove('hidden');
    }
}

window.ScoreAccumulatorGame = ScoreAccumulatorGame;