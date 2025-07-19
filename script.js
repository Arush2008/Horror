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
        // Start the 30-second countdown to horror
        setTimeout(() => {
            this.beginGlitchSequence();
        }, 30000); // 30 seconds of peace before hell
    }

    beginGlitchSequence() {
        this.horrorSequenceStarted = true;
        this.horrorStartTime = Date.now();
        console.log('🔥 HORROR SEQUENCE INITIATED 🔥');
        
        // Add a glitch every 2-3 seconds for maximum terror
        this.glitchInterval = setInterval(() => {
            const elapsed = (Date.now() - this.horrorStartTime) / 1000;
            
            if (elapsed >= 30) {
                // After 30 seconds of glitches, pause for 5 seconds then JUMPSCARE
                clearInterval(this.glitchInterval);
                this.pauseBeforeJumpscare();
                return;
            }
            
            // Add new glitch every 2-3 seconds
            this.addRandomGlitch();
            
        }, 2000 + Math.random() * 1000); // 2-3 seconds between glitches
    }

    addRandomGlitch() {
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
    }

    pauseBeforeJumpscare() {
        console.log('😶 5 seconds of eerie calm before the storm...');
        
        // Stop all glitches for 5 seconds
        this.stopAllGlitches();
        
        // After 5 seconds of silence, JUMPSCARE!
        setTimeout(() => {
            this.triggerJumpscare();
        }, 5000);
    }

    stopAllGlitches() {
        // Clear all visual effects
        document.body.classList.remove('screen-glitch', 'corruption', 'invert-colors', 'text-scramble', 'screen-flicker');
        document.querySelectorAll('.glitch-text, .error-state, .phantom-cursor, .bleeding-text, .warped-element').forEach(el => {
            el.classList.remove('glitch-text', 'error-state', 'phantom-cursor', 'bleeding-text', 'warped-element');
        });
        
        // Reset system status
        document.getElementById('glitch-level').textContent = 'System: ...';
        document.getElementById('glitch-level').style.background = '#666';
    }

    triggerJumpscare() {
        console.log('💀 JUMPSCARE ACTIVATED 💀');
        
        // EXTREMELY LOUD SCARE SOUND
        if (this.audioLoaded) {
            window.voidAudio.playScare(1.0); // MAXIMUM VOLUME
        }
        
        // Show terrifying creature for less than 1 second
        const horrorFace = document.getElementById('horror-face');
        const crashScreen = document.getElementById('crash-screen');
        const desktop = document.getElementById('desktop');
        
        // Make the horror face MUCH scarier
        horrorFace.innerHTML = `
            <div class="scary-face">
                <div class="evil-eyes">👁️‍🗨️👁️‍🗨️</div>
                <div class="evil-mouth">👹</div>
                <div class="blood-drip">🩸</div>
            </div>
        `;
        
        // Flash intense effects
        document.body.style.background = '#ff0000';
        document.body.classList.add('screen-glitch', 'invert-colors');
        
        desktop.classList.add('hidden');
        crashScreen.classList.remove('hidden');
        
        // Make horror face visible instantly
        horrorFace.style.opacity = '1';
        horrorFace.style.transform = 'scale(1.5)';
        horrorFace.style.animation = 'horrorPulse 0.1s ease-in-out infinite alternate, shake 0.1s infinite';
        
        // Hide the face after 0.8 seconds and show corruption message
        setTimeout(() => {
            this.showCorruptionScreen();
        }, 800);
    }

    showCorruptionScreen() {
        const horrorFace = document.getElementById('horror-face');
        const crashContent = document.querySelector('.crash-content');
        
        // Hide horror face
        horrorFace.style.opacity = '0';
        
        // Show corruption message
        crashContent.innerHTML = `
            <div class="corruption-message">
                <h1 style="color: #ff0000; font-size: 64px; text-shadow: 0 0 20px #ff0000; animation: textGlitch 0.5s infinite;">ERROR</h1>
                <p style="font-size: 24px; color: #ffffff; margin: 20px 0;">YOUR WINDOW HAS BEEN CORRUPTED</p>
                <p style="font-size: 18px; color: #ffcccc; margin: 20px 0;">System integrity compromised beyond repair</p>
                <p style="font-size: 16px; color: #ff6666; margin: 20px 0;">All data has been consumed by the void</p>
                <div style="margin: 40px 0;">
                    <div style="color: #ff0000; font-family: monospace; font-size: 14px; text-align: left; background: #000; padding: 20px; border: 1px solid #ff0000;">
                        ERROR CODE: 0x666DEAD<br>
                        FAULT MODULE: reality.exe<br>
                        MEMORY DUMP: [CORRUPTED]<br>
                        STACK TRACE: void.nightmare.exe<br>
                        STATUS: BEYOND_SALVATION
                    </div>
                </div>
                <button id="restart-btn" style="padding: 20px 40px; font-size: 18px; font-weight: bold; background: #ff0000; color: white; border: none; border-radius: 10px; cursor: pointer; margin-top: 20px; animation: pulse 1s infinite;">RESTART SYSTEM</button>
            </div>
        `;
        
        // Setup restart functionality
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restartSystem();
        });
        
        // Continue glitching the screen even after crash
        setInterval(() => {
            document.body.classList.toggle('screen-glitch');
        }, 500);
    }

    restartSystem() {
        // Reset everything
        this.horrorSequenceStarted = false;
        this.horrorStartTime = null;
        this.activeGlitches.clear();
        this.glitchLevel = 0;
        
        if (this.glitchInterval) {
            clearInterval(this.glitchInterval);
        }
        
        // Clear all visual effects
        document.body.style.background = '';
        document.body.classList.remove('screen-glitch', 'corruption', 'invert-colors', 'text-scramble', 'screen-flicker');
        document.querySelectorAll('.glitch-text, .error-state, .phantom-cursor, .bleeding-text, .warped-element').forEach(el => {
            el.classList.remove('glitch-text', 'error-state', 'phantom-cursor', 'bleeding-text', 'warped-element');
        });
        
        // Hide crash screen and show warning screen again
        document.getElementById('crash-screen').classList.add('hidden');
        document.getElementById('warning-screen').classList.remove('hidden');
        document.getElementById('desktop').classList.add('hidden');
        
        // Clear all windows
        this.windows.clear();
        document.getElementById('windows-container').innerHTML = '';
        document.getElementById('taskbar-apps').innerHTML = '';
        
        this.updateSystemStatus();
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
        document.body.classList.add('screen-glitch');
        setTimeout(() => document.body.classList.remove('screen-glitch'), 800);
        
        if (this.activeGlitches.has('visual')) {
            setTimeout(() => this.triggerVisualGlitch(), 3000 + Math.random() * 4000);
        }
    }

    triggerAudioGlitch() {
        if (this.audioLoaded) {
            window.voidAudio.playGlitch();
        }
        
        if (this.activeGlitches.has('audio')) {
            setTimeout(() => this.triggerAudioGlitch(), 4000 + Math.random() * 6000);
        }
    }

    triggerTextGlitch() {
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
        
        if (this.activeGlitches.has('text')) {
            setTimeout(() => this.triggerTextGlitch(), 3000 + Math.random() * 4000);
        }
    }

    triggerUIGlitch() {
        const buttons = document.querySelectorAll('button, .icon, .menu-item');
        const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
        
        if (randomButton) {
            randomButton.classList.add('error-state');
            const originalHandler = randomButton.onclick;
            randomButton.onclick = () => {
                if (this.audioLoaded) {
                    window.voidAudio.playDistortion();
                }
                console.log('System error: Component corrupted');
            };
            
            setTimeout(() => {
                randomButton.classList.remove('error-state');
                randomButton.onclick = originalHandler;
            }, 8000 + Math.random() * 7000);
        }
        
        if (this.activeGlitches.has('ui')) {
            setTimeout(() => this.triggerUIGlitch(), 5000 + Math.random() * 5000);
        }
    }

    triggerSystemGlitch() {
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
        
        if (this.activeGlitches.has('system')) {
            setTimeout(() => this.triggerSystemGlitch(), 6000 + Math.random() * 6000);
        }
    }

    triggerCorruptionGlitch() {
        if (this.audioLoaded) {
            window.voidAudio.playCorruption();
        }
        
        document.body.classList.add('corruption');
        setTimeout(() => document.body.classList.remove('corruption'), 1500);
        
        if (this.activeGlitches.has('corruption')) {
            setTimeout(() => this.triggerCorruptionGlitch(), 4000 + Math.random() * 5000);
        }
    }

    triggerDistortionGlitch() {
        if (this.audioLoaded) {
            window.voidAudio.playDistortion();
        }
        
        const elements = document.querySelectorAll('.window, .icon, .menu-item');
        const randomEl = elements[Math.floor(Math.random() * elements.length)];
        if (randomEl) {
            randomEl.classList.add('warped-element');
            setTimeout(() => randomEl.classList.remove('warped-element'), 1200);
        }
        
        if (this.activeGlitches.has('distortion')) {
            setTimeout(() => this.triggerDistortionGlitch(), 3500 + Math.random() * 4000);
        }
    }

    triggerFlickerGlitch() {
        document.body.classList.add('screen-flicker');
        setTimeout(() => document.body.classList.remove('screen-flicker'), 1000);
        
        if (this.activeGlitches.has('flicker')) {
            setTimeout(() => this.triggerFlickerGlitch(), 2000 + Math.random() * 3000);
        }
    }

    triggerInvertGlitch() {
        document.body.classList.add('invert-colors');
        setTimeout(() => document.body.classList.remove('invert-colors'), 800);
        
        if (this.activeGlitches.has('invert')) {
            setTimeout(() => this.triggerInvertGlitch(), 4000 + Math.random() * 6000);
        }
    }

    triggerScrambleGlitch() {
        document.body.classList.add('text-scramble');
        setTimeout(() => document.body.classList.remove('text-scramble'), 1500);
        
        if (this.activeGlitches.has('scramble')) {
            setTimeout(() => this.triggerScrambleGlitch(), 5000 + Math.random() * 5000);
        }
    }

    triggerPhantomGlitch() {
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
        
        if (this.activeGlitches.has('phantom')) {
            setTimeout(() => this.triggerPhantomGlitch(), 6000 + Math.random() * 8000);
        }
    }

    triggerWhispersGlitch() {
        if (this.audioLoaded) {
            window.voidAudio.playWhisper();
        }
        this.fourthWallBreak();
        
        if (this.activeGlitches.has('whispers')) {
            setTimeout(() => this.triggerWhispersGlitch(), 8000 + Math.random() * 10000);
        }
    }

    triggerShadowsGlitch() {
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
        
        if (this.activeGlitches.has('shadows')) {
            setTimeout(() => this.triggerShadowsGlitch(), 7000 + Math.random() * 8000);
        }
    }

    triggerBleedingGlitch() {
        const elements = document.querySelectorAll('.window-title, .icon-label');
        const randomEl = elements[Math.floor(Math.random() * elements.length)];
        if (randomEl) {
            randomEl.classList.add('bleeding-text');
            setTimeout(() => randomEl.classList.remove('bleeding-text'), 3000);
        }
        
        if (this.activeGlitches.has('bleeding')) {
            setTimeout(() => this.triggerBleedingGlitch(), 5000 + Math.random() * 6000);
        }
    }

    triggerWarpingGlitch() {
        document.body.style.transform = `perspective(1000px) rotateX(${Math.random() * 10 - 5}deg) rotateY(${Math.random() * 10 - 5}deg)`;
        setTimeout(() => {
            document.body.style.transform = '';
        }, 1000);
        
        if (this.activeGlitches.has('warping')) {
            setTimeout(() => this.triggerWarpingGlitch(), 6000 + Math.random() * 7000);
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
        if (this.audioLoaded) {
            window.voidAudio.playWhisper();
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
