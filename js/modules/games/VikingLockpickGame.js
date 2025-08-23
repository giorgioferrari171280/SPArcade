/**
 * CLASSE SFIDA 1: SCASSO STANDARD
 * Gioco di lockpicking standard con barre di allarme e progresso
 */
class VikingLockpickGame {
    constructor(challengeId) {
        this.challengeId = challengeId;
        this.challengeData = skillChallenges[challengeId];
        this.gameActive = false;
        this.waitingForStart = true;
        this.thumbPosition = 0;
        this.sweetSpotPosition = 50;
        this.baseSweetSpotWidth = 15;
        this.animationSpeed = 2.5;
        this.direction = 1;
        this.animationId = null;
        this.phaseStartTime = 0;
        this.phaseDuration = 3500;
        this.waitingForNext = false;
        this.missionFinished = false;
        this.alarmLevel = 0;
        this.maxAlarm = 100;
        this.progressMade = 0;
        this.targetProgress = 15;
        this.alarmIncrease = 15;
        
        this.elements = {
            status: document.getElementById('game-status'),
            icon: document.getElementById('missionIcon'),
            alarmFill: document.getElementById('suspicion-fill'),
            alarmText: document.getElementById('suspicion-text'),
            progressCounter: document.getElementById('progress-counter'),
            progressFill: document.getElementById('progress-fill'),
            sweetSpot: document.getElementById('sweet-spot'),
            thumb: document.getElementById('thumb'),
            resultScreen: document.getElementById('result-screen'),
            resultTitle: document.getElementById('result-title'),
            resultIcon: document.getElementById('result-icon'),
            resultMessage: document.getElementById('result-message'),
            resultButtons: document.getElementById('result-buttons')
        };
        
        this.setupEventListeners();
        this.setupChallengeElements();
        this.startMission();
    }

    setupChallengeElements() {
        setupChallengeDisplay(this.challengeId, this.elements.icon, this.elements.status);
    }

    setupEventListeners() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handleKeyDown(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            if(gameData.player.location !== 'skill-challenge-section') return;
            if (this.waitingForStart) {
                this.waitingForStart = false;
                this.showReadyPhase();
            } else if (this.gameActive && !this.waitingForNext) {
                this.handleAction();
            }
        }
    }

    startMission() {
        const startMessage = this.challengeData.statusMessages?.start || "Premi SPAZIO per iniziare!";
        this.showMessage(startMessage);
        this.updateMissionIcon(this.challengeData.missionIcon || '🗝');
    }

    showReadyPhase() {
        this.updateMissionIcon('⚡');
        const readyMessage = this.challengeData.statusMessages?.ready || "INFILTRAZIONE INIZIATA...";
        this.showMessage(readyMessage);
        setTimeout(() => {
            this.updateMissionIcon(this.challengeData.missionIcon || '🗝');
            this.startLockpicking();
        }, 2000);
    }

    updateMissionIcon(icon) {
        this.elements.icon.textContent = icon;
    }

    startLockpicking() {
        if (this.missionFinished) return;
        this.gameActive = true;
        this.waitingForNext = false;
        this.thumbPosition = 2;
        this.direction = 1;
        this.phaseStartTime = Date.now();
        
        this.currentSweetSpotWidth = Math.max(5, this.baseSweetSpotWidth - (this.alarmLevel / 100) * 10);
        const minPosition = 5;
        const maxPosition = 90 - this.currentSweetSpotWidth;
        this.sweetSpotPosition = minPosition + Math.random() * (maxPosition - minPosition);
        
        this.updateSweetSpot();
        this.resetThumb();
        this.updateStatus();
        this.animate();
    }

    updateStatus() {
        const messages = this.challengeData.statusMessages?.inProgress || [
            "Senti il click dei meccanismi...",
            "Concentrati sui suoni...",
            "Un movimento sbagliato e ti sentiranno..."
        ];
        const alarmMessages = this.challengeData.statusMessages?.alarm || [
            "Stai facendo troppo rumore!",
            "Qualcuno si sta muovendo!",
            "Un cane ha iniziato ad abbaiare!"
        ];
        
        let message = this.alarmLevel > 60 ? 
            alarmMessages[Math.floor(Math.random() * alarmMessages.length)] :
            messages[Math.floor(Math.random() * messages.length)];
        
        if (this.alarmLevel > 60) {
            this.updateMissionIcon('🚨');
        } else {
            this.updateMissionIcon(this.challengeData.missionIcon || '🗝');
        }
        
        this.showMessage(message);
    }

    updateSweetSpot() {
        this.elements.sweetSpot.style.left = this.sweetSpotPosition + '%';
        this.elements.sweetSpot.style.width = this.currentSweetSpotWidth + '%';
    }

    resetThumb() {
        this.elements.thumb.style.left = '2%';
    }

    animate() {
        if (!this.gameActive || this.missionFinished) return;
        
        this.thumbPosition += this.animationSpeed * this.direction;
        
        if (this.thumbPosition >= 95) {
            this.direction = -1;
            this.thumbPosition = 95;
        } else if (this.thumbPosition <= 2) {
            this.direction = 1;
            this.thumbPosition = 2;
        }
        
        this.elements.thumb.style.left = this.thumbPosition + '%';
        
        if (Date.now() - this.phaseStartTime > this.phaseDuration) {
            this.timeOut();
            return;
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    handleAction() {
        const sweetSpotStart = this.sweetSpotPosition;
        const sweetSpotEnd = this.sweetSpotPosition + this.currentSweetSpotWidth;
        const tolerance = 1.0; // Fixed tolerance instead of increasing with alarm
        const isInSweetSpot = (this.thumbPosition >= (sweetSpotStart - tolerance)) && 
                             (this.thumbPosition <= (sweetSpotEnd + tolerance));
        
        this.gameActive = false;
        this.waitingForNext = true;
        this.processAction(isInSweetSpot);
    }

    processAction(success) {
        if (success) {
            this.progressMade++;
            this.showMessage("CLICK! Perfetto!", 'success');
            this.updateMissionIcon('✅');
        } else {
            this.alarmLevel = Math.min(this.maxAlarm, this.alarmLevel + this.alarmIncrease);
            this.showMessage("CLANK! Hai fatto rumore!", 'status-alert');
            this.updateMissionIcon('❌');
        }
        
        this.updateDisplay();
        
        if (this.checkMissionEnd()) return;
        
        setTimeout(() => {
            if (!this.missionFinished) this.startLockpicking();
        }, 1500);
    }

    timeOut() {
        this.gameActive = false;
        this.waitingForNext = true;
        this.alarmLevel = Math.min(this.maxAlarm, this.alarmLevel + this.alarmIncrease);
        this.showMessage("TROPPO LENTO! Hai attirato attenzione!", 'status-alert');
        this.updateMissionIcon('⏳');
        this.updateDisplay();
        
        if (this.checkMissionEnd()) return;
        
        setTimeout(() => {
            if (!this.missionFinished) this.startLockpicking();
        }, 1500);
    }

    updateDisplay() {
        const alarmPercentage = (this.alarmLevel / this.maxAlarm) * 100;
        this.elements.alarmFill.style.width = alarmPercentage + '%';
        this.elements.alarmText.textContent = `${this.alarmLevel}/${this.maxAlarm}`;
        
        const progressPercentage = (this.progressMade / this.targetProgress) * 100;
        this.elements.progressCounter.textContent = `${this.progressMade}/${this.targetProgress}`;
        this.elements.progressFill.style.width = progressPercentage + '%';
    }

    checkMissionEnd() {
        if (this.alarmLevel >= this.maxAlarm) {
            this.endMission('failure');
            return true;
        } else if (this.progressMade >= this.targetProgress) {
            this.endMission('success');
            return true;
        }
        return false;
    }

    endMission(result) {
        this.missionFinished = true;
        this.gameActive = false;
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.showResult(result);
    }

    showResult(result) {
        if (result === 'success') {
            this.elements.resultTitle.textContent = "PORTA SCASSINATA!";
            this.elements.resultTitle.className = "result-title result-success";
            this.elements.resultIcon.textContent = "🏆";
            this.elements.resultMessage.textContent = `SUCCESSO! Hai scassinato la porta con ${this.progressMade}/15 click. Allarme finale: ${this.alarmLevel}/100.`;
            this.updateMissionIcon('🏆');
            this.elements.resultButtons.innerHTML = `<button class="retry-button" onclick="completeChallenge(currentChallengeId)">ENTRA NEL VILLAGGIO</button>`;
        } else {
            this.elements.resultTitle.textContent = "ALLARME DATO!";
            this.elements.resultTitle.className = "result-title result-failure";
            this.elements.resultIcon.textContent = "💥";
            this.elements.resultMessage.textContent = `SCOPERTO! Allarme al massimo. Hai completato solo ${this.progressMade}/15 click.`;
            this.updateMissionIcon('💀');
            this.elements.resultButtons.innerHTML = `<button class="retry-button" onclick="failChallenge(currentChallengeId)">RITIRATA</button>`;
        }
        this.elements.resultScreen.classList.remove('hidden');
    }

    showMessage(message) {
        this.elements.status.textContent = message;
    }
}

window.VikingLockpickGame = VikingLockpickGame;