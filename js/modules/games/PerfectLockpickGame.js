/**
 * CLASSE SFIDA 4: SCASSO MODALITÀ PERFETTA
 */
class PerfectLockpickGame extends VikingLockpickGame {
    constructor(challengeId) {
        super(challengeId);
        this.targetProgress = 5;
        this.baseSweetSpotWidth = 12;
        this.animationSpeed = 2.2;
        this.phaseDuration = 4000;
        
        // Override elements per perfect version
        this.elements.status = document.getElementById('game-status-perfect');
        this.elements.icon = document.getElementById('missionIcon-perfect');
        this.elements.progressCounter = document.getElementById('progress-counter-perfect');
        this.elements.progressFill = document.getElementById('progress-fill-perfect');
        this.elements.sweetSpot = document.getElementById('sweet-spot-perfect');
        this.elements.thumb = document.getElementById('thumb-perfect');
        this.elements.resultScreen = document.getElementById('result-screen-perfect');
        this.elements.resultTitle = document.getElementById('result-title-perfect');
        this.elements.resultIcon = document.getElementById('result-icon-perfect');
        this.elements.resultMessage = document.getElementById('result-message-perfect');
        this.elements.resultButtons = document.getElementById('result-buttons-perfect');
        
        // Setup elementi specifici per la challenge
        this.setupChallengeElements();
    }

    setupChallengeElements() {
        setupChallengeDisplay(this.challengeId, this.elements.icon, this.elements.status);
    }

    handleKeyDown(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            if(gameData.player.location !== 'skill-challenge-perfect-section') return;
            if (this.waitingForStart) {
                this.waitingForStart = false;
                this.showReadyPhase();
            } else if (this.gameActive && !this.waitingForNext) {
                this.handleAction();
            }
        }
    }

    showReadyPhase() {
        this.updateMissionIcon('⚡');
        const readyMessage = this.challengeData.statusMessages?.ready || "MODALITÀ PERFETTA ATTIVATA!";
        this.showMessage(readyMessage);
        setTimeout(() => {
            this.updateMissionIcon(this.challengeData.missionIcon || '🗝');
            this.startLockpicking();
        }, 2500);
    }

    startLockpicking() {
        if (this.missionFinished) return;
        this.gameActive = true;
        this.waitingForNext = false;
        this.thumbPosition = 2;
        this.direction = 1;
        this.phaseStartTime = Date.now();
        
        this.currentSweetSpotWidth = Math.max(8, this.baseSweetSpotWidth - this.progressMade);
        
        const minPosition = 5;
        const maxPosition = 90 - this.currentSweetSpotWidth;
        this.sweetSpotPosition = minPosition + Math.random() * (maxPosition - minPosition);
        
        this.updateSweetSpot();
        this.resetThumb();
        this.updateStatus();
        this.animate();
    }

    updateStatus() {
        // Messaggio dinamico personalizzato per la sfida perfetta
        const baseMessage = this.challengeData.statusMessages?.ready || "🎯 CONCENTRAZIONE MASSIMA!";
        const dynamicMessage = `${baseMessage} ${this.targetProgress - this.progressMade} colpi perfetti rimanenti!`;
        this.showMessage(dynamicMessage);
    }

    startMission() {
        const startMessage = this.challengeData.statusMessages?.start || "Premi SPAZIO per la Prova degli Dei!";
        this.showMessage(startMessage);
        this.updateMissionIcon(this.challengeData.missionIcon || '🗝');
        this.updateDisplay();
    }

    handleAction() {
        const sweetSpotStart = this.sweetSpotPosition;
        const sweetSpotEnd = this.sweetSpotPosition + this.currentSweetSpotWidth;
        const tolerance = 1.0;
        const isInSweetSpot = (this.thumbPosition >= (sweetSpotStart - tolerance)) && 
                             (this.thumbPosition <= (sweetSpotEnd + tolerance));
        
        this.gameActive = false;
        this.waitingForNext = true;
        this.processAction(isInSweetSpot);
    }

    processAction(success) {
        if (success) {
            this.progressMade++;
            this.showMessage("✅ PERFETTO!", 'success');
            this.updateMissionIcon('✅');
        } else {
            // In modalità perfetta un errore termina il gioco
            this.endMission('failure');
            return;
        }
        
        this.updateDisplay();
        
        if (this.checkMissionEnd()) return;
        
        setTimeout(() => {
            if (!this.missionFinished) this.startLockpicking();
        }, 1800);
    }

    timeOut() {
        // In modalità perfetta il timeout è un fallimento
        this.endMission('failure');
    }

    updateDisplay() {
        const progressPercentage = (this.progressMade / this.targetProgress) * 100;
        this.elements.progressCounter.textContent = `${this.progressMade}/${this.targetProgress}`;
        this.elements.progressFill.style.width = progressPercentage + '%';
    }

    checkMissionEnd() {
        if (this.progressMade >= this.targetProgress) {
            this.endMission('success');
            return true;
        }
        return false;
    }

    showResult(result) {
        if (result === 'success') {
            this.elements.resultTitle.textContent = "SFIDA PERFETTA COMPLETATA!";
            this.elements.resultTitle.className = "result-title result-success";
            this.elements.resultIcon.textContent = "🏆";
            this.elements.resultMessage.textContent = `🎯 INCREDIBILE! Hai completato ${this.targetProgress} colpi perfetti consecutivi!`;
            this.updateMissionIcon('🏆');
            this.elements.resultButtons.innerHTML = `<button class="retry-button" onclick="completeChallenge(currentChallengeId)">AVANTI</button>`;
        } else {
            this.elements.resultTitle.textContent = "SFIDA PERFETTA FALLITA!";
            this.elements.resultTitle.className = "result-title result-failure";
            this.elements.resultIcon.textContent = "💀";
            this.elements.resultMessage.textContent = `💥 FALLIMENTO AL ${this.progressMade + 1}° COLPO! Un solo errore e tutto è perduto.`;
            this.updateMissionIcon('💀');
            this.elements.resultButtons.innerHTML = `<button class="retry-button" onclick="failChallenge(currentChallengeId)">RITIRATA</button>`;
        }
        this.elements.resultScreen.classList.remove('hidden');
    }
}

window.PerfectLockpickGame = PerfectLockpickGame;