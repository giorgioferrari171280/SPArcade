/**
 * DoubleBarCombatGame - Classe per la sfida di combattimento doppia barra
 * Gestisce il combattimento stealth con fasi di attacco e difesa alternate
 */

class DoubleBarCombatGame {
    constructor(challengeId) {
        this.challengeId = challengeId;
        this.challengeData = skillChallenges[challengeId];
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
        
        this.missionConfig = {
            background: {
                image: "stealth_mission_bg.png"
            },
            texts: {
                initialMessage: "Premi SPAZIO per iniziare il combattimento stealth!",
                readyPhase: "COMBATTIMENTO INIZIATO - Prepara attacco e difesa...",
                victoryAlert: "CONTINUA - Hai dominato il campo di battaglia!"
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
        if (typeof window.completeChallenge === 'function') {
            window.completeChallenge(this.challengeId);
        }
    }
    
    // Metodo per fallire la sfida
    onFailure() {
        if (typeof window.failChallenge === 'function') {
            window.failChallenge(this.challengeId);
        }
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
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                // Assicurati che siamo nella sezione giusta
                if (!document.getElementById('challenge-double-bar-section')?.classList.contains('active')) {
                    return;
                }
                
                e.preventDefault();
                
                if (this.waitingForStart) {
                    this.waitingForStart = false;
                    this.showReadyPhase();
                } else if (this.gameActive && !this.waitingForNext) {
                    this.handleAction();
                }
            }
        });
    }
    
    startMission() {
        this.showMessage(this.missionConfig.texts.initialMessage, 'instruction');
        this.updateMissionIcon('⚔️');
        this.updateDisplay();
    }
    
    showReadyPhase() {
        this.updateMissionIcon('🎯');
        this.showMessage(this.missionConfig.texts.readyPhase, 'instruction');
        
        setTimeout(() => {
            this.updateMissionIcon('⚔️');
            this.startMissionTimer();
            this.startCombatPhase();
        }, 2000);
    }
    
    startMissionTimer() {
        this.missionTimer = setInterval(() => {
            this.missionTimeLeft--;
            this.updateMissionTimerDisplay();
            
            if (this.missionTimeLeft <= 0) {
                this.endMissionByTimer();
            }
        }, 1000);
    }
    
    updateMissionTimerDisplay() {
        const minutes = Math.floor(this.missionTimeLeft / 60);
        const seconds = this.missionTimeLeft % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        const timerText = document.getElementById('timer-text');
        if (timerText) {
            timerText.textContent = timeString;
        }
        
        const percentage = (this.missionTimeLeft / this.maxMissionTime) * 100;
        const timerFill = document.getElementById('timer-fill');
        if (timerFill) {
            timerFill.style.width = percentage + '%';
        }
        
        if (timerText) {
            if (this.missionTimeLeft <= 30) {
                timerText.className = 'timer-value danger';
            } else if (this.missionTimeLeft <= 60) {
                timerText.className = 'timer-value warning';
            } else {
                timerText.className = 'timer-value';
            }
        }
    }
    
    endMissionByTimer() {
        if (this.missionTimer) {
            clearInterval(this.missionTimer);
        }
        
        if (this.attackScore > this.defendScore) {
            this.endMission('time_victory');
        } else if (this.defendScore > this.attackScore) {
            this.endMission('time_defeat');
        } else {
            this.endMission('time_victory');
        }
    }
    
    updateMissionIcon(icon) {
        const missionIconEl = document.getElementById('missionIcon');
        if (missionIconEl) {
            missionIconEl.textContent = icon;
        }
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
        const attackMessages = [
            "🔥 FASE ATTACCO: Colpisci nel momento giusto!",
            "⚔️ ATTACCA: Trova l'apertura nella difesa nemica!",
            "💥 OFFENSIVA: Preciso e letale!",
            "🎯 MIRA: Concentrati sul bersaglio!",
            "⚡ STRIKE: Veloce come un fulmine!"
        ];
        
        const defendMessages = [
            "🛡️ FASE DIFESA: Para l'attacco nemico!",
            "⚔️ DIFENDI: Blocca ogni colpo in arrivo!",
            "💪 RESISTENZA: Mantieni la guardia alta!",
            "🏰 FORTEZZA: Inespugnabile come una roccia!",
            "🌊 DEFLETTI: Fluido come l'acqua!"
        ];
        
        let message;
        
        if (this.currentPhase === 'attack') {
            message = attackMessages[Math.floor(Math.random() * attackMessages.length)];
            this.updateMissionIcon('🔥');
        } else {
            message = defendMessages[Math.floor(Math.random() * defendMessages.length)];
            this.updateMissionIcon('🛡️');
        }
        
        this.showMessage(message, '');
    }
    
    updateSweetSpot() {
        const attackSweetSpot = document.getElementById('attack-sweet-spot');
        const defendSweetSpot = document.getElementById('defend-sweet-spot');
        
        if (this.currentPhase === 'attack') {
            if (attackSweetSpot) {
                attackSweetSpot.style.left = this.sweetSpotPosition + '%';
                attackSweetSpot.style.width = this.currentSweetSpotWidth + '%';
                attackSweetSpot.style.display = 'block';
            }
            if (defendSweetSpot) {
                defendSweetSpot.style.display = 'none';
            }
        } else {
            if (defendSweetSpot) {
                defendSweetSpot.style.left = this.sweetSpotPosition + '%';
                defendSweetSpot.style.width = this.currentSweetSpotWidth + '%';
                defendSweetSpot.style.display = 'block';
            }
            if (attackSweetSpot) {
                attackSweetSpot.style.display = 'none';
            }
        }
    }
    
    resetThumb() {
        const attackThumb = document.getElementById('attack-thumb');
        const defendThumb = document.getElementById('defend-thumb');
        
        this.thumbPosition = 2;
        
        if (this.currentPhase === 'attack') {
            if (attackThumb) {
                attackThumb.style.left = '2%';
                attackThumb.style.display = 'block';
            }
            if (defendThumb) {
                defendThumb.style.display = 'none';
            }
        } else {
            if (defendThumb) {
                defendThumb.style.left = '2%';
                defendThumb.style.display = 'block';
            }
            if (attackThumb) {
                attackThumb.style.display = 'none';
            }
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
        
        const activeThumb = this.currentPhase === 'attack' ? 
            document.getElementById('attack-thumb') : 
            document.getElementById('defend-thumb');
            
        if (activeThumb && activeThumb.style.display !== 'none') {
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
        const tolerance = 1;
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
                const successMessages = [
                    "🔥 COLPO CRITICO! Attacco devastante!",
                    "⚔️ PERFECT HIT! Colpo perfetto!",
                    "💥 DEVASTAZIONE! Il nemico vacilla!",
                    "🎯 BULL'S EYE! Centro del bersaglio!",
                    "⚡ LIGHTNING STRIKE! Veloce e preciso!"
                ];
                const randomMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
                this.showMessage(randomMessage, 'success');
                this.updateMissionIcon('🔥');
            } else {
                const successMessages = [
                    "🛡️ PARATA PERFETTA! Attacco respinto!",
                    "⚔️ BLOCK! Difesa impeccabile!",
                    "💪 RESISTENZA! Saldo come una roccia!",
                    "🏰 FORTRESS! Invalicabile!",
                    "🌊 DEFLECT! Colpo deviato magistralmente!"
                ];
                const randomMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
                this.showMessage(randomMessage, 'success');
                this.updateMissionIcon('🛡️');
            }
        } else {
            if (this.currentPhase === 'attack') {
                const failMessages = [
                    "❌ MISS! L'attacco va a vuoto!",
                    "🌀 WHIFF! Colpo mancato!",
                    "💨 ARIA! Il nemico schiva!",
                    "🎯 OFF TARGET! Fuori bersaglio!",
                    "⚡ TOO SLOW! Troppo lento!"
                ];
                const randomMessage = failMessages[Math.floor(Math.random() * failMessages.length)];
                this.showMessage(randomMessage, 'fail');
                this.updateMissionIcon('❌');
            } else {
                this.defendScore--;
                const failMessages = [
                    "💔 COLPITO! La difesa cede!",
                    "⚔️ PENETRATO! Attacco subito!",
                    "💥 IMPATTO! Danni alla resistenza!",
                    "🩸 FERITA! La guardia si abbassa!",
                    "💀 DAMAGE! Resistenza compromessa!"
                ];
                const randomMessage = failMessages[Math.floor(Math.random() * failMessages.length)];
                this.showMessage(randomMessage, 'fail');
                this.updateMissionIcon('💔');
            }
        }
        
        this.updateDisplay();
        
        if (this.checkMissionEnd()) {
            return;
        }
        
        setTimeout(() => {
            if (!this.missionFinished) {
                this.startCombatPhase();
            }
        }, 1500);
    }
    
    timeOut() {
        this.gameActive = false;
        this.waitingForNext = true;
        
        if (this.currentPhase === 'defend') {
            this.defendScore--;
            this.showMessage("⏰ TROPPO LENTO! L'attacco nemico passa!", 'fail');
            this.updateMissionIcon('⏰');
        } else {
            this.showMessage("⏰ TIMING SBAGLIATO! Riprova con più velocità!", '');
            this.updateMissionIcon('⏰');
        }
        
        this.updateDisplay();
        
        if (this.checkMissionEnd()) {
            return;
        }
        
        setTimeout(() => {
            if (!this.missionFinished) {
                this.startCombatPhase();
            }
        }, 1500);
    }
    
    updateDisplay() {
        const attackCounter = document.getElementById('attack-counter');
        const attackProgress = document.getElementById('attack-progress');
        const defendCounter = document.getElementById('defend-counter');
        const defendProgress = document.getElementById('defend-progress');
        
        if (attackCounter) {
            attackCounter.textContent = `${this.attackScore}/${this.maxAttackScore}`;
        }
        if (attackProgress) {
            const attackPercentage = (this.attackScore / this.maxAttackScore) * 100;
            attackProgress.style.width = attackPercentage + '%';
        }
        
        if (defendCounter) {
            defendCounter.textContent = `${this.defendScore}/${this.maxDefendScore}`;
        }
        if (defendProgress) {
            const defendPercentage = (this.defendScore / this.maxDefendScore) * 100;
            defendProgress.style.width = defendPercentage + '%';
        }
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
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.missionTimer) {
            clearInterval(this.missionTimer);
        }
        
        // Chiama il callback appropriato
        if (result === 'victory' || result === 'time_victory') {
            this.onSuccess();
        } else {
            this.onFailure();
        }
        
        this.showResult(result);
    }
    
    showResult(result) {
        // La visualizzazione del risultato sarà gestita dal sistema di modali
        if (result === 'victory' || result === 'time_victory') {
            this.updateMissionIcon('👑');
        } else {
            this.updateMissionIcon('💥');
        }
    }
    
    showMessage(message, statusClass) {
        const statusDiv = document.getElementById('game-status');
        if (statusDiv) {
            statusDiv.textContent = message;
            if (statusClass === 'fail') {
                statusDiv.style.color = '#FF6347';
            } else if (statusClass === 'success') {
                statusDiv.style.color = '#98FB98';
            } else {
                statusDiv.style.color = '#FFD700';
            }
        }
    }
    
    // Metodo per reset del gioco
    reset() {
        this.gameActive = false;
        this.waitingForStart = true;
        this.currentPhase = 'attack';
        this.missionFinished = false;
        this.attackScore = 0;
        this.defendScore = 15;
        this.missionTimeLeft = 180;
        this.thumbPosition = 2;
        this.waitingForNext = false;
        
        // Ferma animazioni e timer
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        if (this.missionTimer) {
            clearInterval(this.missionTimer);
            this.missionTimer = null;
        }
        
        // Reset visuali
        this.resetVisualElements();
    }
    
    resetVisualElements() {
        const elements = [
            'attack-counter', 'defend-counter', 'attack-progress', 'defend-progress',
            'timer-text', 'timer-fill', 'attack-sweet-spot', 'defend-sweet-spot',
            'attack-thumb', 'defend-thumb'
        ];
        
        elements.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                if (id === 'attack-counter') el.textContent = '0/15';
                else if (id === 'defend-counter') el.textContent = '15/15';
                else if (id === 'attack-progress') el.style.width = '0%';
                else if (id === 'defend-progress') el.style.width = '100%';
                else if (id === 'timer-text') el.textContent = '3:00';
                else if (id === 'timer-fill') el.style.width = '100%';
                else if (id.includes('sweet-spot') || id.includes('thumb')) el.style.display = 'none';
            }
        });
        
        const timerText = document.getElementById('timer-text');
        if (timerText) {
            timerText.className = 'timer-value';
        }
    }
}

// Esposizione globale
window.DoubleBarCombatGame = DoubleBarCombatGame;