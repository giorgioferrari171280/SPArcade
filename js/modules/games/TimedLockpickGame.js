/**
 * CLASSE SFIDA 2: SCASSO CON TIMER
 * Estende VikingLockpickGame aggiungendo il timer
 */
class TimedLockpickGame extends VikingLockpickGame {
    constructor(challengeId) {
        super(challengeId);
        this.missionTimeLeft = 180;
        this.maxMissionTime = 180;
        this.missionTimer = null;
        
        // Override elements per timer version
        this.elements.timerText = document.getElementById('timer-text-timer');
        this.elements.timerFill = document.getElementById('timer-fill-timer');
        this.elements.status = document.getElementById('game-status-timer');
        this.elements.icon = document.getElementById('missionIcon-timer');
        this.elements.alarmFill = document.getElementById('suspicion-fill-timer');
        this.elements.alarmText = document.getElementById('suspicion-text-timer');
        this.elements.progressCounter = document.getElementById('progress-counter-timer');
        this.elements.progressFill = document.getElementById('progress-fill-timer');
        this.elements.sweetSpot = document.getElementById('sweet-spot-timer');
        this.elements.thumb = document.getElementById('thumb-timer');
        this.elements.resultScreen = document.getElementById('result-screen-timer');
        this.elements.resultTitle = document.getElementById('result-title-timer');
        this.elements.resultIcon = document.getElementById('result-icon-timer');
        this.elements.resultMessage = document.getElementById('result-message-timer');
        this.elements.resultButtons = document.getElementById('result-buttons-timer');
        
        // Setup elementi specifici per la challenge
        this.setupChallengeElements();
    }

    setupChallengeElements() {
        setupChallengeDisplay(this.challengeId, this.elements.icon, this.elements.status);
    }

    handleKeyDown(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            if(gameData.player.location !== 'skill-challenge-timer-section') return;
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
        const readyMessage = this.challengeData.statusMessages?.ready || "FUGA INIZIATA...";
        this.showMessage(readyMessage);
        this.startMissionTimer();
        setTimeout(() => {
            this.updateMissionIcon(this.challengeData.missionIcon || '🗝');
            this.startLockpicking();
        }, 2000);
    }

    updateStatus() {
        const messages = this.challengeData.statusMessages?.inProgress || [
            "⏰ Il tempo scorre veloce!",
            "🗝 Sbrigati, l'alba si avvicina!",
            "⚡ Ogni secondo conta!"
        ];
        const alarmMessages = this.challengeData.statusMessages?.alarm || [
            "⏰ TROPPO RUMORE E POCO TEMPO!",
            "🚨 Le guardie si stanno avvicinando!",
            "⏰ L'alba si avvicina velocemente!"
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

    startMission() {
        const startMessage = this.challengeData.statusMessages?.start || "Premi SPAZIO per iniziare la fuga!";
        this.showMessage(startMessage);
        this.updateMissionIcon(this.challengeData.missionIcon || '🗝');
        this.updateDisplay();
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
        this.endMission('time_failure');
    }

    endMission(result) {
        if (this.missionTimer) clearInterval(this.missionTimer);
        super.endMission(result);
    }

    showResult(result) {
        if (result === 'time_failure') {
            this.elements.resultTitle.textContent = "TEMPO SCADUTO!";
            this.elements.resultTitle.className = "result-title result-failure";
            this.elements.resultIcon.textContent = "⏰";
            this.elements.resultMessage.textContent = `TEMPO SCADUTO! Progresso: ${this.progressMade}/15. L'alba si avvicina!`;
            this.updateMissionIcon('💀');
            this.elements.resultButtons.innerHTML = `<button class="retry-button" onclick="failChallenge(currentChallengeId)">RITIRATA</button>`;
            this.elements.resultScreen.classList.remove('hidden');
        } else {
            super.showResult(result);
        }
    }
}

window.TimedLockpickGame = TimedLockpickGame;