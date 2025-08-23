/**
 * CLASSE SFIDA 6: SUDDEN DEATH
 */
class SuddenDeathGame {
    constructor(challengeId) { 
        this.challengeId = challengeId;
        this.challengeData = skillChallenges[challengeId];
        this.gameActive = false; 
        this.waitingForStart = true; 
        this.thumbPosition = 0; 
        this.sweetSpotPosition = 50; 
        this.baseSweetSpotWidth = 20; // Zona ancora più ampia per sudden death
        this.animationSpeed = 2.5; // Velocità ridotta per dare più tempo
        this.direction = 1; 
        this.animationId = null; 
        this.phaseStartTime = 0; 
        this.phaseDuration = 4000; // Tempo raddoppiato per reagire
        this.waitingForNext = false; 
        this.missionFinished = false; 
        this.progressMade = 0; 
        this.targetProgress = 3; // Serve raggiungere 3 colpi per vincere
        this.livesRemaining = 1; // Una vita sola - sudden death
        this.maxLives = 1; 
        
        this.elements = { 
            // status rimosso - ora usiamo testo narrativo statico
            icon: document.getElementById('missionIcon-sudden-death'), 
            progressCounter: document.getElementById('progress-counter-sudden-death'), 
            progressFill: document.getElementById('progress-fill-sudden-death'), 
            livesCounter: document.getElementById('lives-counter-sudden-death'), 
            livesFill: document.getElementById('lives-fill-sudden-death'), 
            sweetSpot: document.getElementById('sweet-spot-sudden-death'), 
            thumb: document.getElementById('thumb-sudden-death'), 
            resultScreen: document.getElementById('result-screen-sudden-death'), 
            resultTitle: document.getElementById('result-title-sudden-death'), 
            resultIcon: document.getElementById('result-icon-sudden-death'), 
            resultMessage: document.getElementById('result-message-sudden-death'), 
            resultButtons: document.getElementById('result-buttons-sudden-death') 
        }; 
        
        this.setupEventListeners(); 
        this.setupChallengeElements();
        this.startMission(); 
    }

    setupChallengeElements() {
        // Non usiamo più setupChallengeDisplay perché non abbiamo più status
        // L'icona e il testo narrativo sono gestiti staticamente
    }

    setupEventListeners() { 
        document.addEventListener('keydown', this.handleKeyDown.bind(this)); 
    }

    handleKeyDown(e) { 
        if (e.code === 'Space') { 
            e.preventDefault(); 
            if(gameData.player.location !== 'skill-challenge-sudden-death-section') return; 
            if (this.waitingForStart) { 
                this.waitingForStart = false; 
                this.showReadyPhase(); 
            } else if (this.gameActive && !this.waitingForNext) { 
                this.handleAction(); 
            } 
        } 
    }

    startMission() { 
        const startMessage = this.challengeData.statusMessages?.start || "⚰️ Premi SPAZIO per iniziare il duello mortale!";
        this.showMessage(startMessage); 
        this.updateMissionIcon(this.challengeData.missionIcon || '💀'); 
        this.updateDisplay(); 
    }

    showReadyPhase() { 
        this.updateMissionIcon('⚡'); 
        const readyMessage = this.challengeData.statusMessages?.ready || "⚰️ SUDDEN DEATH INIZIATO!";
        this.showMessage(readyMessage); 
        setTimeout(() => { 
            this.updateMissionIcon(this.challengeData.missionIcon || '💀'); 
            this.startSuddenDeathPhase(); 
        }, 2000); 
    }

    updateMissionIcon(icon) { 
        this.elements.icon.textContent = icon; 
    }

    startSuddenDeathPhase() { 
        if (this.missionFinished) return; 
        this.gameActive = true; 
        this.waitingForNext = false; 
        this.thumbPosition = 2; 
        this.direction = 1; 
        this.phaseStartTime = Date.now(); 
        
        // Zona costante, non si restringe più ad ogni colpo
        this.currentSweetSpotWidth = this.baseSweetSpotWidth; 
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
            `🎯 COLPO ${this.progressMade + 1} DI ${this.targetProgress}!`, 
            "🎯 PRECISIONE ASSOLUTA!", 
            "💀 UN ERRORE = MORTE!"
        ]; 
        let message = messages[Math.floor(Math.random() * messages.length)];
        // Sostituisci i placeholder con i valori attuali
        message = message.replace(/\$\{this\.progressMade \+ 1\}/g, this.progressMade + 1);
        message = message.replace(/\$\{this\.targetProgress\}/g, this.targetProgress);
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
        if (this.thumbPosition >= 98) { 
            this.direction = -1; 
            this.thumbPosition = 98; 
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
        // FERMA TUTTO - niente più animazioni
        this.gameActive = false; 
        this.waitingForNext = true;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        const sweetSpotStart = this.sweetSpotPosition; 
        const sweetSpotEnd = this.sweetSpotPosition + this.currentSweetSpotWidth; 
        const tolerance = 2; // Tolleranza ragionevole
        const isInSweetSpot = (this.thumbPosition >= (sweetSpotStart - tolerance)) && 
                             (this.thumbPosition <= (sweetSpotEnd + tolerance)); 
        
        // Debug per capire cosa sta succedendo
        console.log('SUDDEN DEATH DEBUG:', {
            colpo: this.progressMade + 1,
            thumbPosition: this.thumbPosition,
            sweetSpotStart: sweetSpotStart,
            sweetSpotEnd: sweetSpotEnd,
            sweetSpotWidth: this.currentSweetSpotWidth,
            tolerance: tolerance,
            isInSweetSpot: isInSweetSpot,
            livesRemaining: this.livesRemaining
        });
        
        this.processAction(isInSweetSpot); 
    }

    processAction(success) { 
        if (success) { 
            this.progressMade++; 
            this.showMessage("🎯 COLPO LETALE!", 'success'); 
            this.updateMissionIcon('✅'); 
        } else { 
            const oldLives = this.livesRemaining;
            this.livesRemaining--; 
            this.showMessage(`❌ MANCATO! Vite: ${oldLives} → ${this.livesRemaining}`, 'error'); 
            this.updateMissionIcon('❌');
            if (this.livesRemaining <= 0) {
                this.endMission('failure'); 
                return;
            }
        } 
        this.updateDisplay(); 
        if (this.checkMissionEnd()) return; 
        setTimeout(() => { 
            if (!this.missionFinished) this.startSuddenDeathPhase(); 
        }, 2000); 
    }

    timeOut() { 
        this.gameActive = false; 
        this.waitingForNext = true; 
        const oldLives = this.livesRemaining;
        this.livesRemaining--; 
        this.showMessage(`⏰ TEMPO SCADUTO! Vite: ${oldLives} → ${this.livesRemaining}`, 'error');
        this.updateMissionIcon('⏰');
        this.updateDisplay();
        if (this.livesRemaining <= 0) {
            this.endMission('failure');
        } else {
            setTimeout(() => { 
                if (!this.missionFinished) this.startSuddenDeathPhase(); 
            }, 2000);
        }
    }

    updateDisplay() { 
        const progressPercentage = (this.progressMade / this.targetProgress) * 100; 
        this.elements.progressCounter.textContent = `${this.progressMade}/${this.targetProgress}`; 
        this.elements.progressFill.style.width = progressPercentage + '%'; 
        
        const livesPercentage = (this.livesRemaining / this.maxLives) * 100; 
        this.elements.livesCounter.textContent = `${this.livesRemaining}/${this.maxLives}`; 
        this.elements.livesFill.style.width = livesPercentage + '%'; 
    }

    checkMissionEnd() { 
        if (this.livesRemaining <= 0) { 
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
            this.elements.resultTitle.textContent = "ASSASSINO SCONFITTO!"; 
            this.elements.resultTitle.className = "result-title result-success"; 
            this.elements.resultIcon.textContent = "👑"; 
            this.elements.resultMessage.textContent = `🎯 INCREDIBILE! Hai completato tutti e ${this.targetProgress} i colpi letali! L'assassino giace morto ai tuoi piedi!`; 
            this.updateMissionIcon('🏆'); 
            this.elements.resultButtons.innerHTML = `<button class="retry-button" onclick="completeChallenge('sudden_death_challenge')">RIVENDICA IL TESORO</button>`; 
        } else { 
            this.elements.resultTitle.textContent = "MORTE ONOREVOLE!"; 
            this.elements.resultTitle.className = "result-title result-failure"; 
            this.elements.resultIcon.textContent = "⚰️"; 
            this.elements.resultMessage.textContent = `💀 L'assassino ti ha ucciso! Progresso: ${this.progressMade}/${this.targetProgress}. Le Valchirie ti accompagnano al Valhalla.`; 
            this.updateMissionIcon('⚰️'); 
            this.elements.resultButtons.innerHTML = `<button class="retry-button" onclick="failChallenge('sudden_death_challenge')">AL VALHALLA</button>`; 
        } 
        this.elements.resultScreen.classList.remove('hidden'); 
    }

    showMessage(message) { 
        // Non fa nulla - il messaggio narrativo è ora statico nell'HTML
    }
}

window.SuddenDeathGame = SuddenDeathGame;