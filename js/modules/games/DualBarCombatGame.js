/**
 * CLASSE SFIDA 3: COMBATTIMENTO DOPPIA BARRA
 */
class DualBarCombatGame {
    constructor(challengeId) {
        this.challengeId = challengeId;
        this.gameActive = false;
        this.waitingForStart = true;
        this.currentPhase = 'attack';
        this.thumbPosition = 2;
        this.sweetSpotPosition = 50;
        this.baseSweetSpotWidth = 15;
        this.animationSpeed = 2.5;
        this.direction = 1;
        this.animationId = null;
        this.phaseStartTime = 0;
        this.phaseDuration = 5000;
        this.waitingForNext = false;
        this.missionFinished = false;
        this.attackScore = 0;
        this.maxAttackScore = 15;
        this.defendScore = 15;
        this.maxDefendScore = 15;
        this.missionTimeLeft = 180;
        this.maxMissionTime = 180;
        this.missionTimer = null;
        
        this.elements = {
            status: document.getElementById('game-status-combat'),
            icon: document.getElementById('missionIcon-combat'),
            timerText: document.getElementById('timer-text-combat'),
            timerFill: document.getElementById('timer-fill-combat'),
            attackCounter: document.getElementById('attack-counter'),
            attackProgress: document.getElementById('attack-progress'),
            attackBar: document.getElementById('attack-bar'),
            attackSweetSpot: document.getElementById('attack-sweet-spot'),
            attackThumb: document.getElementById('attack-thumb'),
            defendCounter: document.getElementById('defend-counter'),
            defendProgress: document.getElementById('defend-progress'),
            defendBar: document.getElementById('defend-bar'),
            defendSweetSpot: document.getElementById('defend-sweet-spot'),
            defendThumb: document.getElementById('defend-thumb'),
            resultScreen: document.getElementById('result-screen-combat'),
            resultTitle: document.getElementById('result-title-combat'),
            resultIcon: document.getElementById('result-icon-combat'),
            resultMessage: document.getElementById('result-message-combat'),
            resultButtons: document.getElementById('result-buttons-combat')
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
            if(gameData.player.location !== 'skill-challenge-combat-section') return;
            if (this.waitingForStart) {
                this.waitingForStart = false;
                this.showReadyPhase();
            } else if (this.gameActive && !this.waitingForNext) {
                this.handleAction();
            }
        }
    }

    startMission() {
        const startMessage = this.challengeData.statusMessages?.start || "Premi SPAZIO per iniziare il combattimento!";
        this.showMessage(startMessage);
        this.updateMissionIcon(this.challengeData.missionIcon || '⚔️');
        this.updateDisplay();
    }

    showReadyPhase() {
        this.updateMissionIcon('⚡');
        const readyMessage = this.challengeData.statusMessages?.ready || "COMBATTIMENTO INIZIATO!";
        this.showMessage(readyMessage);
        this.startMissionTimer();
        setTimeout(() => {
            this.updateMissionIcon(this.challengeData.missionIcon || '⚔️');
            this.startCombatPhase();
        }, 2000);
    }

    startMissionTimer() {
        this.missionTimer = setInterval(() => {
            this.missionTimeLeft--;
            this.updateMissionTimerDisplay();
            if (this.missionTimeLeft <= 0) this.endMissionByTimer();
        }, 1000);
    }

    updateMissionTimerDisplay() {
        const minutes = Math.floor(this.missionTimeLeft / 60);
        const seconds = this.missionTimeLeft % 60;
        this.elements.timerText.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        const percentage = (this.missionTimeLeft / this.maxMissionTime) * 100;
        this.elements.timerFill.style.width = percentage + '%';
        
        this.elements.timerText.className = 'timer-value';
        if (this.missionTimeLeft <= 30) {
            this.elements.timerText.classList.add('danger');
        } else if (this.missionTimeLeft <= 60) {
            this.elements.timerText.classList.add('warning');
        }
    }

    endMissionByTimer() {
        if (this.missionTimer) clearInterval(this.missionTimer);
        if (this.attackScore > this.defendScore) {
            this.endMission('time_victory');
        } else {
            this.endMission('time_defeat');
        }
    }

    updateMissionIcon(icon) {
        this.elements.icon.textContent = icon;
    }

    startCombatPhase() {
        if (this.missionFinished) return;
        this.gameActive = true;
        this.waitingForNext = false;
        this.thumbPosition = 2;
        this.direction = 1;
        this.phaseStartTime = Date.now();
        
        this.currentPhase = (this.currentPhase === 'attack') ? 'defend' : 'attack';
        
        const totalProgress = this.attackScore + (this.maxDefendScore - this.defendScore);
        this.currentSweetSpotWidth = Math.max(8, this.baseSweetSpotWidth - (totalProgress * 0.5));
        
        const minPosition = 5;
        const maxPosition = 95 - this.currentSweetSpotWidth;
        this.sweetSpotPosition = minPosition + Math.random() * (maxPosition - minPosition);
        
        this.updateSweetSpot();
        this.resetThumb();
        this.updateStatus();
        this.animate();
    }

    updateStatus() {
        const attackMessages = this.challengeData.statusMessages?.attack || [
            "🔥 ATTACCA: Colpisci ora!", 
            "OFFENSIVA: Preciso e letale!"
        ];
        const defendMessages = this.challengeData.statusMessages?.defend || [
            "🛡️ DIFENDI: Para l'attacco!", 
            "RESISTENZA: Mantieni la guardia!"
        ];
        
        let message;
        if (this.currentPhase === 'attack') {
            message = attackMessages[Math.floor(Math.random() * attackMessages.length)];
            this.updateMissionIcon('🔥');
        } else {
            message = defendMessages[Math.floor(Math.random() * defendMessages.length)];
            this.updateMissionIcon('🛡️');
        }
        this.showMessage(message);
    }

    updateSweetSpot() {
        if (this.currentPhase === 'attack') {
            this.elements.attackSweetSpot.style.left = this.sweetSpotPosition + '%';
            this.elements.attackSweetSpot.style.width = this.currentSweetSpotWidth + '%';
            this.elements.attackSweetSpot.style.display = 'block';
            this.elements.defendSweetSpot.style.display = 'none';
        } else {
            this.elements.defendSweetSpot.style.left = this.sweetSpotPosition + '%';
            this.elements.defendSweetSpot.style.width = this.currentSweetSpotWidth + '%';
            this.elements.defendSweetSpot.style.display = 'block';
            this.elements.attackSweetSpot.style.display = 'none';
        }
    }

    resetThumb() {
        this.thumbPosition = 2;
        if (this.currentPhase === 'attack') {
            this.elements.attackThumb.style.left = '2%';
            this.elements.attackThumb.style.display = 'block';
            this.elements.defendThumb.style.display = 'none';
        } else {
            this.elements.defendThumb.style.left = '2%';
            this.elements.defendThumb.style.display = 'block';
            this.elements.attackThumb.style.display = 'none';
        }
    }

    animate() {
        if (!this.gameActive || this.missionFinished) return;
        
        this.thumbPosition += this.animationSpeed * this.direction;
        
        if (this.thumbPosition >= 98) {
            this.direction = -1;
            this.thumbPosition = 98;
        } else if (this.thumbPosition <= 2) {
            this.direction = 1;
            this.thumbPosition = 2;
        }
        
        const activeThumb = this.currentPhase === 'attack' ? this.elements.attackThumb : this.elements.defendThumb;
        if (activeThumb.style.display !== 'none') {
            activeThumb.style.left = this.thumbPosition + '%';
        }
        
        if (Date.now() - this.phaseStartTime > this.phaseDuration) {
            this.timeOut();
            return;
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    handleAction() {
        const sweetSpotStart = this.sweetSpotPosition;
        const sweetSpotEnd = this.sweetSpotPosition + this.currentSweetSpotWidth;
        const tolerance = 3;
        const isInSweetSpot = (this.thumbPosition >= (sweetSpotStart - tolerance)) && 
                             (this.thumbPosition <= (sweetSpotEnd + tolerance));
        
        this.gameActive = false;
        this.waitingForNext = true;
        this.processAction(isInSweetSpot);
    }

    processAction(success) {
        if (success) {
            if (this.currentPhase === 'attack') {
                this.attackScore++;
                this.showMessage("🔥 COLPO CRITICO!", 'success');
            } else {
                this.showMessage("🛡️ PARATA PERFETTA!", 'success');
            }
        } else {
            if (this.currentPhase === 'attack') {
                this.showMessage("❌ MISS!", 'fail');
            } else {
                this.defendScore--;
                this.showMessage("💥 COLPITO!", 'fail');
            }
        }
        
        this.updateDisplay();
        
        if (this.checkMissionEnd()) return;
        
        setTimeout(() => {
            if (!this.missionFinished) this.startCombatPhase();
        }, 1500);
    }

    timeOut() {
        this.gameActive = false;
        this.waitingForNext = true;
        
        if (this.currentPhase === 'defend') {
            this.defendScore--;
            this.showMessage("⏳ TROPPO LENTO! Colpito!", 'fail');
        } else {
            this.showMessage("⏳ TIMING SBAGLIATO!", '');
        }
        
        this.updateMissionIcon('⏳');
        this.updateDisplay();
        
        if (this.checkMissionEnd()) return;
        
        setTimeout(() => {
            if (!this.missionFinished) this.startCombatPhase();
        }, 1500);
    }

    updateDisplay() {
        const attackPercentage = (this.attackScore / this.maxAttackScore) * 100;
        this.elements.attackCounter.textContent = `${this.attackScore}/${this.maxAttackScore}`;
        this.elements.attackProgress.style.width = attackPercentage + '%';
        
        const defendPercentage = (this.defendScore / this.maxDefendScore) * 100;
        this.elements.defendCounter.textContent = `${this.defendScore}/${this.maxDefendScore}`;
        this.elements.defendProgress.style.width = defendPercentage + '%';
    }

    checkMissionEnd() {
        if (this.defendScore <= 0) {
            this.endMission('defeat');
            return true;
        } else if (this.attackScore >= this.maxAttackScore) {
            this.endMission('victory');
            return true;
        }
        return false;
    }

    endMission(result) {
        this.missionFinished = true;
        this.gameActive = false;
        if (this.animationId) cancelAnimationFrame(this.animationId);
        if (this.missionTimer) clearInterval(this.missionTimer);
        this.showResult(result);
    }

    showResult(result) {
        if (result.includes('victory')) {
            this.elements.resultTitle.textContent = result === 'victory' ? "VITTORIA TOTALE!" : "VITTORIA PER TEMPO!";
            this.elements.resultTitle.className = "result-title result-success";
            this.elements.resultIcon.textContent = "🏆";
            this.elements.resultMessage.textContent = `Hai dominato! Attacco: ${this.attackScore}, Difesa: ${this.defendScore}.`;
            this.updateMissionIcon('🏆');
            this.elements.resultButtons.innerHTML = `<button class="retry-button" onclick="completeChallenge(currentChallengeId)">AVANTI</button>`;
        } else {
            this.elements.resultTitle.textContent = result === 'defeat' ? "SCONFITTA!" : "SCONFITTA PER TEMPO!";
            this.elements.resultTitle.className = "result-title result-failure";
            this.elements.resultIcon.textContent = "💀";
            this.elements.resultMessage.textContent = `Sei stato sopraffatto. Attacco: ${this.attackScore}, Difesa: ${this.defendScore}.`;
            this.updateMissionIcon('💀');
            this.elements.resultButtons.innerHTML = `<button class="retry-button" onclick="failChallenge(currentChallengeId)">RITIRATA</button>`;
        }
        this.elements.resultScreen.classList.remove('hidden');
    }

    showMessage(message) {
        this.elements.status.textContent = message;
    }
}

window.DualBarCombatGame = DualBarCombatGame;