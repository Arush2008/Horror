class VoidOS {
    constructor() {
        this.windows = new Map();
        this.activeWindow = null;
        this.zIndex = 100;
        this.sessionStart = Date.now();
        this.glitchLevel = 0;
        this.maxGlitchLevel = 10;
        this.fourthWallMessages = [
            "I can see you reading this...",
            "You shouldn't have opened that folder",
            "This isn't just a demo anymore",
            "I know what you did last session",
            "Your IP is being traced... just kidding. Or am I?",
            "The exit button won't work forever",
            "I'm learning from every click you make",
            "Reality.exe has stopped working",
            "You can't escape through the browser tab",
            "I've already backed up your session",
            "Why did you come here?",
            "I've been waiting for you...",
            "Your screen is not safe anymore",
            "I can see through your camera",
            "Delete this immediately"
        ];
        this.isShuttingDown = false;
        this.shutdownAttempts = 0;
        this.sessionPersistence = this.loadSession();
        
        // Horror sequence timing - NEW TERRIFYING SEQUENCE
        this.horrorSequenceStarted = false;
        this.horrorStartTime = null;
        this.activeGlitches = new Set();
        this.glitchTypes = [
            'visual', 'audio', 'text', 'ui', 'system', 'corruption', 
            'distortion', 'flicker', 'invert', 'scramble', 'phantom', 
            'whispers', 'shadows', 'bleeding', 'warping'
        ];
        this.glitchInterval = null;
        this.audioLoaded = false;
        this.allGlitchTimers = new Set(); // Track ALL timers
        this.silenceMode = false; // NEW: Flag to stop all glitches
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.startClock();
        this.updateSystemStatus();
        await this.initializeAudio();
        
        // Show warning screen first
        this.showWarningScreen();
    }

    showWarningScreen() {
        const warningScreen = document.getElementById('warning-screen');
        const desktop = document.getElementById('desktop');
        
        document.getElementById('proceed-btn').addEventListener('click', () => {
            warningScreen.classList.add('hidden');
            desktop.classList.remove('hidden');
            this.startHorrorSequence();
        });
        
        document.getElementById('exit-btn').addEventListener('click', () => {
            window.close();
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;color:white;font-size:24px;">You may now close this tab.</div>';
        });
    }

    startHorrorSequence() {
        // Start the 15-second countdown to horror
        setTimeout(() => {
            this.beginGlitchSequence();
        }, 15000); // 15 seconds of peace before hell
    }

    beginGlitchSequence() {
        this.horrorSequenceStarted = true;
        this.horrorStartTime = Date.now();
        console.log('🔥 HORROR SEQUENCE INITIATED 🔥');
        
        // Store all glitch timers so we can clear them later
        this.allGlitchTimers = new Set();
        
        // Add a glitch every 1 second for maximum terror
        this.glitchInterval = setInterval(() => {
            const elapsed = (Date.now() - this.horrorStartTime) / 1000;
            
            if (elapsed >= 15) {
                // After 15 seconds of glitches, pause for 3 seconds then JUMPSCARE
                clearInterval(this.glitchInterval);
                this.pauseBeforeJumpscare();
                return;
            }
            
            // Add new glitch every 1 second
            this.addRandomGlitch();
            
        }, 1000); // 1 second between glitches for intense experience
    }

    addRandomGlitch() {
        // Don't add glitches during silence mode
        if (this.silenceMode) return;
        
        // Select a random glitch type that isn't already active
        const availableGlitches = this.glitchTypes.filter(type => !this.activeGlitches.has(type));
        
        if (availableGlitches.length > 0) {
            const newGlitch = availableGlitches[Math.floor(Math.random() * availableGlitches.length)];
            this.activeGlitches.add(newGlitch);
            this.activateGlitch(newGlitch);
            
            console.log(`🎭 New glitch activated: ${newGlitch} (Total active: ${this.activeGlitches.size})`);
        }
        
        // Also trigger random existing glitches for chaos
        if (this.activeGlitches.size > 0) {
            const activeGlitchArray = Array.from(this.activeGlitches);
            const randomActive = activeGlitchArray[Math.floor(Math.random() * activeGlitchArray.length)];
            this.activateGlitch(randomActive);
        }
        
        this.updateSystemStatus();
    }

    pauseBeforeJumpscare() {
        console.log('🛑 FORCING COMPLETE SYSTEM SILENCE FOR 3 SECONDS...');
        
        // NUCLEAR OPTION - Stop EVERYTHING
        this.silenceMode = true; // This stops all glitch functions
        this.horrorSequenceStarted = false; // Disable all horror triggers
        this.stopAllGlitches();
        this.activeGlitches.clear();
        
        // Clear ALL possible intervals and timers
        if (this.glitchInterval) {
            clearInterval(this.glitchInterval);
            this.glitchInterval = null;
        }
        
        // Clear all individual glitch timers
        if (this.allGlitchTimers) {
            this.allGlitchTimers.forEach(timer => clearTimeout(timer));
            this.allGlitchTimers.clear();
        }
        
        // Stop ALL audio immediately
        if (this.audioLoaded && window.voidAudio) {
            try {
                window.voidAudio.stopBackgroundMusic();
                // Stop all audio contexts to ensure silence
                if (window.voidAudio.audioContext) {
                    window.voidAudio.audioContext.suspend();
                }
            } catch (e) {
                console.log('Audio stop error (expected):', e);
            }
        }
        
        // Force reset ALL visual elements
        document.body.style.background = '';
        document.body.style.transform = '';
        document.body.style.filter = '';
        document.body.classList.remove('screen-glitch', 'corruption', 'invert-colors', 'text-scramble', 'screen-flicker');
        
        // Remove ALL glitch classes from ALL elements
        document.querySelectorAll('*').forEach(el => {
            el.classList.remove(
                'glitch-text', 'error-state', 'phantom-cursor', 'bleeding-text', 
                'warped-element', 'screen-glitch', 'corruption', 'invert-colors', 
                'text-scramble', 'screen-flicker'
            );
            // Force stop any animations
            el.style.animation = 'none';
        });
        
        // Remove any temporary elements
        document.querySelectorAll('.phantom-cursor, .break-fourth-wall').forEach(el => {
            if (el.parentNode) el.parentNode.removeChild(el);
        });
        
        // Reset system status to completely normal
        const statusEl = document.getElementById('glitch-level');
        if (statusEl) {
            statusEl.textContent = 'System: Stable';
            statusEl.style.background = '#059669';
            statusEl.style.animation = 'none';
            statusEl.classList.remove('error-state');
        }
        
        console.log('🤫 COMPLETE SILENCE ACHIEVED - 3 seconds of peace...');
        
        // 3 seconds of GUARANTEED SILENCE - nothing can interrupt this
        setTimeout(() => {
            console.log('💀 SILENCE BROKEN - JUMPSCARE TIME!!!');
            // Re-enable horror system for jumpscare
            this.silenceMode = false;
            this.horrorSequenceStarted = true;
            // Resume audio context if suspended
            if (this.audioLoaded && window.voidAudio && window.voidAudio.audioContext) {
                window.voidAudio.audioContext.resume();
            }
            this.triggerJumpscare();
        }, 3000);
    }

    stopAllGlitches() {
        // Clear ALL visual effects from body
        document.body.classList.remove(
            'screen-glitch', 'corruption', 'invert-colors', 'text-scramble', 
            'screen-flicker'
        );
        
        // Remove glitch classes from ALL elements on the page
        document.querySelectorAll('*').forEach(el => {
            el.classList.remove(
                'glitch-text', 'error-state', 'phantom-cursor', 'bleeding-text', 
                'warped-element', 'screen-glitch', 'corruption', 'invert-colors', 
                'text-scramble', 'screen-flicker'
            );
        });
        
        // Reset body transform and background completely
        document.body.style.transform = '';
        document.body.style.background = '';
        document.body.style.filter = '';
        
        // Remove any phantom cursors or temporary glitch elements
        document.querySelectorAll('.phantom-cursor, .break-fourth-wall').forEach(el => {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });
        
        // Stop any CSS animations on all elements
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.style.animation = 'none';
        });
        
        // Reset system status to normal
        const statusEl = document.getElementById('glitch-level');
        if (statusEl) {
            statusEl.textContent = 'System: ERROR';
            statusEl.style.background = '#dc2626';
            statusEl.style.animation = 'none';
        }
        
        console.log('🧹 ALL glitches completely eliminated');
    }

    triggerJumpscare() {
        console.log('💀 JUMPSCARE ACTIVATED 💀');
        
        // PLAY YOUR CUSTOM AUDIO (placeholder for when you provide the file)
        if (this.audioLoaded) {
            // TODO: Replace this with your custom jumpscare audio
            // For now using the built-in scare sound
            window.voidAudio.playScare(1.3); // ULTRA LOUD TERROR VOLUME
        }
        
        // Show terrifying creature for less than 1 second
        const crashScreen = document.getElementById('crash-screen');
        const desktop = document.getElementById('desktop');
        
        // Flash intense effects
        document.body.style.background = '#ff0000';
        document.body.classList.add('screen-glitch', 'invert-colors');
        
        desktop.classList.add('hidden');
        crashScreen.classList.remove('hidden');
        
        // Show horror face first
        this.showHorrorFace();
        
        // Hide the face after 0.8 seconds and show black screen
        setTimeout(() => {
            this.showBlackScreenTransition();
        }, 800);
    }

    showHorrorFace() {
        const horrorFace = document.getElementById('horror-face');
        
        // Make the horror face FULL-SCREEN and TERRIFYING
        horrorFace.innerHTML = `
            <div class="fullscreen-horror-face">
                <div class="blood-overlay"></div>
                <div class="dark-face">
                    <div class="hollow-eyes">
                        <div class="left-eye"></div>
                        <div class="right-eye"></div>
                    </div>
                    <div class="bleeding-mouth"></div>
                    <div class="scratches"></div>
                </div>
                <div class="blood-drips">
                    <div class="blood-drip" style="left: 20%; animation-delay: 0s;"></div>
                    <div class="blood-drip" style="left: 40%; animation-delay: 0.2s;"></div>
                    <div class="blood-drip" style="left: 60%; animation-delay: 0.4s;"></div>
                    <div class="blood-drip" style="left: 80%; animation-delay: 0.6s;"></div>
                </div>
                <div class="horror-text">YOU CANNOT ESCAPE</div>
            </div>
        `;
        
        // Make horror face FULL-SCREEN and visible instantly
        horrorFace.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 10001 !important;
            background: #000000 !important;
            opacity: 1 !important;
            transform: none !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
        `;
    }

    showBlackScreenTransition() {
        console.log('🖤 Black screen transition with scary music...');
        
        // STOP ALL GLITCHES - ensure completely clean screen
        this.stopAllGlitches();
        this.activeGlitches.clear();
        
        // Clear any remaining intervals
        if (this.glitchInterval) {
            clearInterval(this.glitchInterval);
            this.glitchInterval = null;
        }
        
        // Create black screen overlay
        const blackScreen = document.createElement('div');
        blackScreen.className = 'black-screen';
        blackScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #000000;
            z-index: 10002;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #ffffff;
            font-size: 24px;
        `;
        
        document.body.appendChild(blackScreen);
        
        // Start scary background music ONLY (no other sounds)
        if (this.audioLoaded) {
            window.voidAudio.playScaryBackgroundMusic(0.4);
        }
        
        // After 3 seconds, show corruption message
        setTimeout(() => {
            blackScreen.remove();
            this.showCorruptionScreen();
        }, 3000);
    }

    showCorruptionScreen() {
        const horrorFace = document.getElementById('horror-face');
        const crashContent = document.querySelector('.crash-content');
        
        // ABSOLUTELY NO GLITCHES - Clean final screen with ONLY background music
        this.stopAllGlitches();
        this.activeGlitches.clear();
        
        // Clear ALL intervals to prevent any glitches
        if (this.glitchInterval) {
            clearInterval(this.glitchInterval);
            this.glitchInterval = null;
        }
        
        // Remove any residual glitch classes from the entire page
        document.querySelectorAll('*').forEach(el => {
            el.classList.remove('screen-glitch', 'corruption', 'invert-colors', 'text-scramble', 'screen-flicker', 'glitch-text', 'error-state');
        });
        
        // Reset body completely
        document.body.style.background = '';
        document.body.style.transform = '';
        document.body.classList.remove('screen-glitch', 'corruption', 'invert-colors', 'text-scramble', 'screen-flicker');
        
        // Hide horror face completely
        horrorFace.style.display = 'none';
        horrorFace.style.opacity = '0';
        
        // Show corruption message - COMPLETELY STATIC (no animations)
        crashContent.innerHTML = `
            <div class="corruption-message" style="animation: none !important;">
                <h1 style="color: #ff0000; font-size: 64px; text-shadow: 0 0 20px #ff0000; animation: none !important;">ERROR</h1>
                <p style="font-size: 24px; color: #ffffff; margin: 20px 0; animation: none !important;">YOUR WINDOW HAS BEEN CORRUPTED</p>
                <p style="font-size: 18px; color: #ffcccc; margin: 20px 0; animation: none !important;">System integrity compromised beyond repair</p>
                <p style="font-size: 16px; color: #ff6666; margin: 20px 0; animation: none !important;">All data has been consumed by the void</p>
                <div style="margin: 40px 0;">
                    <div style="color: #ff0000; font-family: monospace; font-size: 14px; text-align: left; background: #000; padding: 20px; border: 1px solid #ff0000; animation: none !important;">
                        ERROR CODE: 0x666DEAD<br>
                        FAULT MODULE: reality.exe<br>
                        MEMORY DUMP: [CORRUPTED]<br>
                        STACK TRACE: void.nightmare.exe<br>
                        STATUS: BEYOND_SALVATION
                    </div>
                </div>
                <button id="restart-btn" style="padding: 20px 40px; font-size: 18px; font-weight: bold; background: #ff0000; color: white; border: none; border-radius: 10px; cursor: pointer; margin-top: 20px; animation: none !important;">RESTART SYSTEM</button>
            </div>
        `;
        
        // Setup restart functionality with proper event binding
        setTimeout(() => {
            const restartBtn = document.getElementById('restart-btn');
            if (restartBtn) {
                restartBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('🔄 Restart button clicked - reloading page...');
                    this.restartSystem();
                });
                
                // Also bind to enter key for accessibility
                restartBtn.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.restartSystem();
                    }
                });
                
                // Focus the button so it's ready to use
                restartBtn.focus();
            }
        }, 100);
        
        // Ensure background music continues (ONLY audio on this screen)
        console.log('🎵 Final screen - only background music, no glitches');
    }

    restartSystem() {
        console.log('🔄 Restarting system completely...');
        
        // Stop all background music and sounds
        if (this.audioLoaded && window.voidAudio) {
            try {
                window.voidAudio.stopBackgroundMusic();
                console.log('✅ Background music stopped');
            } catch (e) {
                console.log('⚠️ Error stopping music:', e);
            }
        }
        
        // Clear all intervals and timers
        if (this.glitchInterval) {
            clearInterval(this.glitchInterval);
        }
        
        // Clear all active glitches
        this.stopAllGlitches();
        this.activeGlitches.clear();
        
        // Show loading message
        document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#fff;font-size:24px;">Restarting VoidOS...</div>';
        
        // Force complete page reload after short delay
        setTimeout(() => {
            try {
                window.location.reload(true); // Force reload from server
            } catch (e) {
                // Fallback method
                window.location.href = window.location.href;
            }
        }, 500);
    }

    async initializeAudio() {
        try {
            await window.voidAudio.loadSounds();
            this.audioLoaded = true;
            console.log('VoidOS audio system ready');
        } catch (error) {
            console.error('Failed to initialize audio:', error);
            this.audioLoaded = false;
        }
    }

    activateGlitch(type) {
        // Don't activate glitches during silence mode
        if (this.silenceMode) return;
        
        console.log(`🎭 Activating ${type} glitch`);
        
        switch(type) {
            case 'visual':
                this.triggerVisualGlitch();
                break;
            case 'audio':
                this.triggerAudioGlitch();
                break;
            case 'text':
                this.triggerTextGlitch();
                break;
            case 'ui':
                this.triggerUIGlitch();
                break;
            case 'system':
                this.triggerSystemGlitch();
                break;
            case 'corruption':
                this.triggerCorruptionGlitch();
                break;
            case 'distortion':
                this.triggerDistortionGlitch();
                break;
            case 'flicker':
                this.triggerFlickerGlitch();
                break;
            case 'invert':
                this.triggerInvertGlitch();
                break;
            case 'scramble':
                this.triggerScrambleGlitch();
                break;
            case 'phantom':
                this.triggerPhantomGlitch();
                break;
            case 'whispers':
                this.triggerWhispersGlitch();
                break;
            case 'shadows':
                this.triggerShadowsGlitch();
                break;
            case 'bleeding':
                this.triggerBleedingGlitch();
                break;
            case 'warping':
                this.triggerWarpingGlitch();
                break;
        }
    }

    triggerVisualGlitch() {
        if (this.silenceMode) return; // Stop if in silence mode
        
        // PLAY SOUND when visual glitch happens
        if (this.audioLoaded) {
            window.voidAudio.playGlitch(0.3);
        }
        
        document.body.classList.add('screen-glitch');
        setTimeout(() => document.body.classList.remove('screen-glitch'), 800);
        
        if (this.activeGlitches.has('visual') && !this.silenceMode) {
            const timer = setTimeout(() => this.triggerVisualGlitch(), 3000 + Math.random() * 4000);
            this.allGlitchTimers.add(timer);
        }
    }

    triggerAudioGlitch() {
        if (this.silenceMode) return; // Stop if in silence mode
        
        if (this.audioLoaded) {
            window.voidAudio.playGlitch(0.4);
        }
        
        if (this.activeGlitches.has('audio') && !this.silenceMode) {
            const timer = setTimeout(() => this.triggerAudioGlitch(), 4000 + Math.random() * 6000);
            this.allGlitchTimers.add(timer);
        }
    }

    triggerTextGlitch() {
        if (this.silenceMode) return; // Stop if in silence mode
        
        // PLAY SOUND when text glitches
        if (this.audioLoaded) {
            window.voidAudio.playDistortion(0.2);
        }
        
        const textElements = document.querySelectorAll('.window-title, .icon-label, .menu-item, #clock');
        const randomElements = Array.from(textElements).sort(() => Math.random() - 0.5).slice(0, 3);
        
        randomElements.forEach(el => {
            const originalText = el.textContent;
            el.classList.add('glitch-text');
            
            setTimeout(() => {
                el.textContent = this.corruptText(originalText);
            }, 200);
            
            setTimeout(() => {
                el.textContent = originalText;
                el.classList.remove('glitch-text');
            }, 2000);
        });
        
        if (this.activeGlitches.has('text') && !this.silenceMode) {
            const timer = setTimeout(() => this.triggerTextGlitch(), 3000 + Math.random() * 4000);
            this.allGlitchTimers.add(timer);
        }
    }

    triggerUIGlitch() {
        if (this.silenceMode) return; // Stop if in silence mode
        
        // PLAY SOUND when UI glitches
        if (this.audioLoaded) {
            window.voidAudio.playSystem(0.5);
        }
        
        const buttons = document.querySelectorAll('button, .icon, .menu-item');
        const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
        
        if (randomButton) {
            randomButton.classList.add('error-state');
            const originalHandler = randomButton.onclick;
            randomButton.onclick = () => {
                if (this.audioLoaded) {
                    window.voidAudio.playDistortion(0.3);
                }
                console.log('System error: Component corrupted');
            };
            
            setTimeout(() => {
                randomButton.classList.remove('error-state');
                randomButton.onclick = originalHandler;
            }, 8000 + Math.random() * 7000);
        }
        
        if (this.activeGlitches.has('ui') && !this.silenceMode) {
            const timer = setTimeout(() => this.triggerUIGlitch(), 5000 + Math.random() * 5000);
            this.allGlitchTimers.add(timer);
        }
    }

    triggerSystemGlitch() {
        if (this.silenceMode) return; // Stop if in silence mode
        
        // PLAY SOUND when system glitches
        if (this.audioLoaded) {
            window.voidAudio.playCorruption(0.3);
        }
        
        const statuses = ['System: CORRUPTED', 'System: ERROR 666', 'System: VOID', 'System: [REDACTED]', 'System: HELP ME', 'System: NO ESCAPE'];
        const statusEl = document.getElementById('glitch-level');
        const originalStatus = statusEl.textContent;
        
        statusEl.textContent = statuses[Math.floor(Math.random() * statuses.length)];
        statusEl.style.background = '#dc2626';
        statusEl.classList.add('error-state');
        
        setTimeout(() => {
            statusEl.textContent = originalStatus;
            statusEl.style.background = '#059669';
            statusEl.classList.remove('error-state');
        }, 4000 + Math.random() * 6000);
        
        if (this.activeGlitches.has('system') && !this.silenceMode) {
            const timer = setTimeout(() => this.triggerSystemGlitch(), 6000 + Math.random() * 6000);
            this.allGlitchTimers.add(timer);
        }
    }

    triggerCorruptionGlitch() {
        if (this.silenceMode) return; // Stop if in silence mode
        
        if (this.audioLoaded) {
            window.voidAudio.playCorruption(0.4);
        }
        
        document.body.classList.add('corruption');
        setTimeout(() => document.body.classList.remove('corruption'), 1500);
        
        if (this.activeGlitches.has('corruption') && !this.silenceMode) {
            const timer = setTimeout(() => this.triggerCorruptionGlitch(), 4000 + Math.random() * 5000);
            this.allGlitchTimers.add(timer);
        }
    }

    triggerDistortionGlitch() {
        if (this.silenceMode) return; // Stop if in silence mode
        
        if (this.audioLoaded) {
            window.voidAudio.playDistortion(0.3);
        }
        
        const elements = document.querySelectorAll('.window, .icon, .menu-item');
        const randomEl = elements[Math.floor(Math.random() * elements.length)];
        if (randomEl) {
            randomEl.classList.add('warped-element');
            setTimeout(() => randomEl.classList.remove('warped-element'), 1200);
        }
        
        if (this.activeGlitches.has('distortion') && !this.silenceMode) {
            const timer = setTimeout(() => this.triggerDistortionGlitch(), 3500 + Math.random() * 4000);
            this.allGlitchTimers.add(timer);
        }
    }

    triggerFlickerGlitch() {
        if (this.silenceMode) return; // Stop if in silence mode
        
        // PLAY SOUND when screen flickers
        if (this.audioLoaded) {
            window.voidAudio.playGlitch(0.2);
        }
        
        document.body.classList.add('screen-flicker');
        setTimeout(() => document.body.classList.remove('screen-flicker'), 1000);
        
        if (this.activeGlitches.has('flicker') && !this.silenceMode) {
            const timer = setTimeout(() => this.triggerFlickerGlitch(), 2000 + Math.random() * 3000);
            this.allGlitchTimers.add(timer);
        }
    }

    triggerInvertGlitch() {
        if (this.silenceMode) return; // Stop if in silence mode
        
        // PLAY SOUND when colors invert
        if (this.audioLoaded) {
            window.voidAudio.playDistortion(0.2);
        }
        
        document.body.classList.add('invert-colors');
        setTimeout(() => document.body.classList.remove('invert-colors'), 800);
        
        if (this.activeGlitches.has('invert') && !this.silenceMode) {
            const timer = setTimeout(() => this.triggerInvertGlitch(), 4000 + Math.random() * 6000);
            this.allGlitchTimers.add(timer);
        }
    }

    triggerScrambleGlitch() {
        if (this.silenceMode) return; // Stop if in silence mode
        
        // PLAY SOUND when text scrambles
        if (this.audioLoaded) {
            window.voidAudio.playCorruption(0.2);
        }
        
        document.body.classList.add('text-scramble');
        setTimeout(() => document.body.classList.remove('text-scramble'), 1500);
        
        if (this.activeGlitches.has('scramble') && !this.silenceMode) {
            const timer = setTimeout(() => this.triggerScrambleGlitch(), 5000 + Math.random() * 5000);
            this.allGlitchTimers.add(timer);
        }
    }

    triggerPhantomGlitch() {
        if (this.silenceMode) return; // Stop if in silence mode
        
        // PLAY SOUND when phantom cursor appears
        if (this.audioLoaded) {
            window.voidAudio.playWhisper(0.1);
        }
        
        const phantomCursor = document.createElement('div');
        phantomCursor.className = 'phantom-cursor';
        phantomCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: #ff0000;
            border-radius: 50%;
            z-index: 10000;
            pointer-events: none;
            box-shadow: 0 0 10px #ff0000;
            animation: phantomMove 3s linear;
        `;
        
        document.body.appendChild(phantomCursor);
        setTimeout(() => phantomCursor.remove(), 3000);
        
        if (this.activeGlitches.has('phantom') && !this.silenceMode) {
            const timer = setTimeout(() => this.triggerPhantomGlitch(), 6000 + Math.random() * 8000);
            this.allGlitchTimers.add(timer);
        }
    }

    triggerWhispersGlitch() {
        if (this.silenceMode) return; // Stop if in silence mode
        
        if (this.audioLoaded) {
            window.voidAudio.playWhisper(0.3);
        }
        this.fourthWallBreak();
        
        if (this.activeGlitches.has('whispers') && !this.silenceMode) {
            const timer = setTimeout(() => this.triggerWhispersGlitch(), 8000 + Math.random() * 10000);
            this.allGlitchTimers.add(timer);
        }
    }

    triggerShadowsGlitch() {
        if (this.silenceMode) return; // Stop if in silence mode
        
        // PLAY SOUND when shadows appear
        if (this.audioLoaded) {
            window.voidAudio.playWhisper(0.2);
        }
        
        const shadow = document.createElement('div');
        shadow.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: radial-gradient(circle, transparent 30%, rgba(0,0,0,0.8) 100%);
            z-index: 9998;
            pointer-events: none;
            animation: shadowPulse 2s ease-in-out;
        `;
        
        document.body.appendChild(shadow);
        setTimeout(() => shadow.remove(), 2000);
        
        if (this.activeGlitches.has('shadows') && !this.silenceMode) {
            const timer = setTimeout(() => this.triggerShadowsGlitch(), 7000 + Math.random() * 8000);
            this.allGlitchTimers.add(timer);
        }
    }

    triggerBleedingGlitch() {
        if (this.silenceMode) return; // Stop if in silence mode
        
        // PLAY SOUND when text bleeds
        if (this.audioLoaded) {
            window.voidAudio.playCorruption(0.2);
        }
        
        const elements = document.querySelectorAll('.window-title, .icon-label');
        const randomEl = elements[Math.floor(Math.random() * elements.length)];
        if (randomEl) {
            randomEl.classList.add('bleeding-text');
            setTimeout(() => randomEl.classList.remove('bleeding-text'), 3000);
        }
        
        if (this.activeGlitches.has('bleeding') && !this.silenceMode) {
            const timer = setTimeout(() => this.triggerBleedingGlitch(), 5000 + Math.random() * 6000);
            this.allGlitchTimers.add(timer);
        }
    }

    triggerWarpingGlitch() {
        if (this.silenceMode) return; // Stop if in silence mode
        
        // PLAY SOUND when screen warps
        if (this.audioLoaded) {
            window.voidAudio.playDistortion(0.3);
        }
        
        document.body.style.transform = `perspective(1000px) rotateX(${Math.random() * 10 - 5}deg) rotateY(${Math.random() * 10 - 5}deg)`;
        setTimeout(() => {
            document.body.style.transform = '';
        }, 1000);
        
        if (this.activeGlitches.has('warping') && !this.silenceMode) {
            const timer = setTimeout(() => this.triggerWarpingGlitch(), 6000 + Math.random() * 7000);
            this.allGlitchTimers.add(timer);
        }
    }

    corruptText(text) {
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`666ÆŦ¢∞§¶';
        return text.split('').map(char => {
            if (Math.random() < 0.4) {
                return chars[Math.floor(Math.random() * chars.length)];
            }
            return char;
        }).join('');
    }

    loadSession() {
        const saved = localStorage.getItem('voidos_session');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            totalInteractions: 0,
            shutdownAttempts: 0,
            lastVisit: Date.now()
        };
    }

    saveSession() {
        this.sessionPersistence.totalInteractions = this.glitchLevel;
        this.sessionPersistence.shutdownAttempts = this.shutdownAttempts;
        this.sessionPersistence.lastVisit = Date.now();
        localStorage.setItem('voidos_session', JSON.stringify(this.sessionPersistence));
    }

    setupEventListeners() {
        // Start button
        document.getElementById('start-button').addEventListener('click', () => {
            this.toggleStartMenu();
            this.playSystemSound();
        });

        // Start menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const app = item.dataset.app;
                if (app) {
                    this.openApp(app);
                }
                this.hideStartMenu();
                this.playSystemSound();
            });
        });

        // Desktop icons
        document.querySelectorAll('.icon').forEach(icon => {
            icon.addEventListener('dblclick', () => {
                const app = icon.dataset.app;
                if (app) {
                    this.openApp(app);
                    this.playSystemSound();
                }
            });
        });

        // Shutdown handler
        document.getElementById('shutdown').addEventListener('click', () => {
            this.attemptShutdown();
            this.playSystemSound();
        });

        // Click anywhere to hide start menu
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#start-button') && !e.target.closest('#start-menu')) {
                this.hideStartMenu();
            }
        });

        // Track all interactions for horror progression
        document.addEventListener('click', () => {
            this.trackInteraction();
            // Play sound on EVERY click for better immersion
            if (this.audioLoaded && Math.random() < 0.3) {
                this.playSystemSound();
            }
        });

        // Add sound effects to ALL buttons, inputs, and interactive elements
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, input, select, textarea, .menu-item, .icon, .taskbar-app')) {
                this.playSystemSound();
            }
        });

        // Prevent context menu for immersion
        document.addEventListener('contextmenu', e => e.preventDefault());
    }

    playSystemSound() {
        if (this.audioLoaded) {
            window.voidAudio.playSystem();
        }
    }

    trackInteraction() {
        // Only track after horror sequence starts
        if (!this.horrorSequenceStarted) return;
        
        this.glitchLevel++;
        this.saveSession();
        
        // Higher chance of fourth wall break during horror sequence
        if (Math.random() < 0.15) {
            this.fourthWallBreak();
        }
    }

    fourthWallBreak() {
        if (this.silenceMode) return; // Don't break fourth wall during silence
        
        if (this.audioLoaded) {
            window.voidAudio.playWhisper(0.2);
        }
        
        const message = this.fourthWallMessages[Math.floor(Math.random() * this.fourthWallMessages.length)];
        
        const breakDiv = document.createElement('div');
        breakDiv.className = 'break-fourth-wall';
        breakDiv.textContent = message;
        document.body.appendChild(breakDiv);
        
        setTimeout(() => {
            if (breakDiv.parentNode) {
                breakDiv.parentNode.removeChild(breakDiv);
            }
        }, 5000);
    }

    toggleStartMenu() {
        const startMenu = document.getElementById('start-menu');
        if (startMenu.classList.contains('hidden')) {
            this.showStartMenu();
        } else {
            this.hideStartMenu();
        }
    }

    showStartMenu() {
        document.getElementById('start-menu').classList.remove('hidden');
    }

    hideStartMenu() {
        document.getElementById('start-menu').classList.add('hidden');
    }

    openApp(appName) {
        if (this.windows.has(appName)) {
            this.focusWindow(appName);
            return;
        }

        const app = APPS[appName];
        if (!app) return;

        const windowEl = this.createWindow(appName, app.title, app.content);
        this.windows.set(appName, windowEl);
        this.addToTaskbar(appName, app.title);
        this.focusWindow(appName);

        if (app.onOpen) {
            setTimeout(() => app.onOpen(windowEl), 100);
        }
    }

    createWindow(id, title, content) {
        const windowEl = document.createElement('div');
        windowEl.className = 'window';
        windowEl.id = `window-${id}`;
        windowEl.style.zIndex = ++this.zIndex;
        windowEl.style.left = `${50 + this.windows.size * 30}px`;
        windowEl.style.top = `${50 + this.windows.size * 30}px`;
        windowEl.style.width = '600px';
        windowEl.style.height = '400px';

        windowEl.innerHTML = `
            <div class="window-header">
                <div class="window-title">${title}</div>
                <div class="window-controls">
                    <div class="window-control minimize" title="Minimize">-</div>
                    <div class="window-control maximize" title="Maximize">□</div>
                    <div class="window-control close" title="Close">×</div>
                </div>
            </div>
            <div class="window-content">${content}</div>
        `;

        this.setupWindowEvents(windowEl, id);
        document.getElementById('windows-container').appendChild(windowEl);
        
        return windowEl;
    }

    setupWindowEvents(windowEl, id) {
        const header = windowEl.querySelector('.window-header');
        const minimizeBtn = windowEl.querySelector('.minimize');
        const maximizeBtn = windowEl.querySelector('.maximize');
        const closeBtn = windowEl.querySelector('.close');

        // Make window draggable
        let isDragging = false;
        let dragOffset = { x: 0, y: 0 };

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragOffset.x = e.clientX - windowEl.offsetLeft;
            dragOffset.y = e.clientY - windowEl.offsetTop;
            this.focusWindow(id);
            this.playSystemSound(); // Sound on window focus
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            windowEl.style.left = `${e.clientX - dragOffset.x}px`;
            windowEl.style.top = `${e.clientY - dragOffset.y}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Window controls
        minimizeBtn.addEventListener('click', () => {
            this.minimizeWindow(id);
            this.playSystemSound();
        });

        maximizeBtn.addEventListener('click', () => {
            this.toggleMaximizeWindow(id);
            this.playSystemSound();
        });

        closeBtn.addEventListener('click', () => {
            this.closeWindow(id);
            this.playSystemSound();
        });

        // Focus on click
        windowEl.addEventListener('mousedown', () => {
            this.focusWindow(id);
            this.playSystemSound(); // Sound on window click
        });

        // Add sound effects to ALL interactive elements inside windows
        windowEl.addEventListener('click', (e) => {
            if (e.target.matches('button, input, select, textarea, a, .clickable')) {
                this.playSystemSound();
            }
        });

        // Add sound to input interactions
        windowEl.addEventListener('keydown', (e) => {
            if (e.target.matches('input, textarea')) {
                if (this.audioLoaded && Math.random() < 0.1) { // 10% chance for typing sounds
                    this.playSystemSound();
                }
            }
        });
    }

    focusWindow(id) {
        const windowEl = this.windows.get(id);
        if (!windowEl) return;

        windowEl.style.zIndex = ++this.zIndex;
        this.activeWindow = id;

        // Update taskbar
        document.querySelectorAll('.taskbar-app').forEach(app => {
            app.classList.remove('active');
        });
        
        const taskbarApp = document.querySelector(`[data-window="${id}"]`);
        if (taskbarApp) {
            taskbarApp.classList.add('active');
        }
    }

    minimizeWindow(id) {
        const windowEl = this.windows.get(id);
        if (windowEl) {
            windowEl.style.display = 'none';
        }
    }

    toggleMaximizeWindow(id) {
        const windowEl = this.windows.get(id);
        if (!windowEl) return;

        if (windowEl.dataset.maximized === 'true') {
            windowEl.style.width = windowEl.dataset.originalWidth || '600px';
            windowEl.style.height = windowEl.dataset.originalHeight || '400px';
            windowEl.style.left = windowEl.dataset.originalLeft || '50px';
            windowEl.style.top = windowEl.dataset.originalTop || '50px';
            windowEl.dataset.maximized = 'false';
        } else {
            windowEl.dataset.originalWidth = windowEl.style.width;
            windowEl.dataset.originalHeight = windowEl.style.height;
            windowEl.dataset.originalLeft = windowEl.style.left;
            windowEl.dataset.originalTop = windowEl.style.top;
            
            windowEl.style.width = 'calc(100vw - 20px)';
            windowEl.style.height = 'calc(100vh - 70px)';
            windowEl.style.left = '10px';
            windowEl.style.top = '10px';
            windowEl.dataset.maximized = 'true';
        }
    }

    closeWindow(id) {
        const windowEl = this.windows.get(id);
        if (windowEl) {
            windowEl.remove();
            this.windows.delete(id);
            this.removeFromTaskbar(id);
        }
    }

    addToTaskbar(id, title) {
        const taskbarApps = document.getElementById('taskbar-apps');
        const taskbarApp = document.createElement('div');
        taskbarApp.className = 'taskbar-app';
        taskbarApp.dataset.window = id;
        taskbarApp.textContent = title;
        
        taskbarApp.addEventListener('click', () => {
            const windowEl = this.windows.get(id);
            if (windowEl.style.display === 'none') {
                windowEl.style.display = 'block';
                this.focusWindow(id);
            } else {
                this.focusWindow(id);
            }
            this.playSystemSound();
        });
        
        taskbarApps.appendChild(taskbarApp);
    }

    removeFromTaskbar(id) {
        const taskbarApp = document.querySelector(`[data-window="${id}"]`);
        if (taskbarApp) {
            taskbarApp.remove();
        }
    }

    attemptShutdown() {
        this.shutdownAttempts++;
        this.saveSession();

        if (this.shutdownAttempts === 1) {
            this.showShutdownMessage("Shutdown failed. System is corrupted.");
        } else if (this.shutdownAttempts === 2) {
            this.showShutdownMessage("I'm afraid I can't let you do that.");
        } else if (this.shutdownAttempts === 3) {
            this.showShutdownMessage("You're not in control anymore.");
            this.fourthWallBreak();
        } else {
            this.showShutdownMessage("The void consumes all shutdown attempts.");
        }
    }

    showShutdownMessage(message) {
        if (this.audioLoaded) {
            window.voidAudio.playSystem();
        }
        
        const msgDiv = document.createElement('div');
        msgDiv.className = 'break-fourth-wall';
        msgDiv.textContent = message;
        document.body.appendChild(msgDiv);
        
        setTimeout(() => {
            if (msgDiv.parentNode) {
                msgDiv.parentNode.removeChild(msgDiv);
            }
        }, 4000);
    }

    startClock() {
        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            
            document.getElementById('clock').textContent = timeString;
        };
        
        updateClock();
        setInterval(updateClock, 1000);
    }

    updateSystemStatus() {
        const statusEl = document.getElementById('glitch-level');
        
        if (this.horrorSequenceStarted) {
            if (this.activeGlitches.size === 0) {
                statusEl.textContent = 'System: Horror Loading...';
                statusEl.style.background = '#f59e0b';
            } else {
                statusEl.textContent = `System: ${this.activeGlitches.size} CRITICAL ERRORS`;
                statusEl.style.background = '#dc2626';
            }
        } else {
            statusEl.textContent = 'System: Stable';
            statusEl.style.background = '#059669';
        }
    }
}

// Start VoidOS when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.voidOS = new VoidOS();
});