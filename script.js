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
            "I've already backed up your session"
        ];
        this.isShuttingDown = false;
        this.shutdownAttempts = 0;
        this.sessionPersistence = this.loadSession();
        
        // Horror sequence timing
        this.horrorSequenceStarted = false;
        this.horrorStartTime = null;
        this.currentGlitches = [];
        this.glitchTypes = ['visual', 'audio', 'text', 'ui', 'system'];
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
            // If window.close() doesn't work (common in many browsers)
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;color:white;font-size:24px;">You may now close this tab.</div>';
        });
    }

    startHorrorSequence() {
        // Start the 30-second countdown to horror
        setTimeout(() => {
            this.beginGlitchSequence();
        }, 30000); // 30 seconds
    }

    beginGlitchSequence() {
        this.horrorSequenceStarted = true;
        this.horrorStartTime = Date.now();
        console.log('Horror sequence started!');
        
        // Activate one glitch type every 5 seconds for 30 seconds
        const glitchInterval = setInterval(() => {
            const elapsed = (Date.now() - this.horrorStartTime) / 1000;
            
            if (elapsed >= 30) {
                // After 30 seconds, show all glitches for a moment then crash
                clearInterval(glitchInterval);
                this.showAllGlitches();
                setTimeout(() => {
                    this.triggerHorrorCrash();
                }, 3000); // Show all glitches for 3 seconds then crash
                return;
            }
            
            // Add a new glitch type every 5 seconds
            const glitchIndex = Math.floor(elapsed / 5);
            if (glitchIndex < this.glitchTypes.length && !this.currentGlitches.includes(this.glitchTypes[glitchIndex])) {
                this.currentGlitches.push(this.glitchTypes[glitchIndex]);
                this.activateGlitch(this.glitchTypes[glitchIndex]);
            }
        }, 1000); // Check every second
    }

    showAllGlitches() {
        this.currentGlitches = [...this.glitchTypes];
        this.glitchTypes.forEach(type => this.activateGlitch(type));
        
        if (this.audioLoaded) {
            window.voidAudio.playRandomGlitch();
        }
        
        // Intense screen corruption
        document.body.classList.add('screen-glitch', 'corruption');
    }

    triggerHorrorCrash() {
        // Play scare sound
        if (this.audioLoaded) {
            window.voidAudio.playScare();
        }
        
        // Show crash screen
        const crashScreen = document.getElementById('crash-screen');
        const horrorFace = document.getElementById('horror-face');
        const desktop = document.getElementById('desktop');
        
        desktop.classList.add('hidden');
        crashScreen.classList.remove('hidden');
        
        // Animate horror face appearance
        setTimeout(() => {
            horrorFace.style.opacity = '1';
            horrorFace.style.animation = 'horrorPulse 0.5s ease-in-out infinite alternate, eyeTwitch 0.1s infinite';
        }, 500);
        
        // Setup restart button
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restartSystem();
        });
    }

    restartSystem() {
        // Reset everything
        this.horrorSequenceStarted = false;
        this.horrorStartTime = null;
        this.currentGlitches = [];
        this.glitchLevel = 0;
        
        // Clear all visual effects
        document.body.classList.remove('screen-glitch', 'corruption');
        document.querySelectorAll('.glitch-text, .error-state').forEach(el => {
            el.classList.remove('glitch-text', 'error-state');
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
        console.log(`Activating ${type} glitch`);
        
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
        }
    }

    triggerVisualGlitch() {
        document.body.classList.add('screen-glitch');
        setTimeout(() => document.body.classList.remove('screen-glitch'), 500);
        
        // Random screen corruption
        if (Math.random() < 0.3) {
            document.body.classList.add('corruption');
            setTimeout(() => document.body.classList.remove('corruption'), 1000);
        }
        
        // Repeat every 5-10 seconds while active
        if (this.currentGlitches.includes('visual')) {
            setTimeout(() => this.triggerVisualGlitch(), 5000 + Math.random() * 5000);
        }
    }

    triggerAudioGlitch() {
        if (this.audioLoaded) {
            window.voidAudio.playGlitch();
        }
        
        // Repeat every 8-15 seconds while active
        if (this.currentGlitches.includes('audio')) {
            setTimeout(() => this.triggerAudioGlitch(), 8000 + Math.random() * 7000);
        }
    }

    triggerTextGlitch() {
        const textElements = document.querySelectorAll('.window-title, .icon-label, .menu-item, #clock');
        const randomElements = Array.from(textElements).sort(() => Math.random() - 0.5).slice(0, 2);
        
        randomElements.forEach(el => {
            const originalText = el.textContent;
            el.classList.add('glitch-text');
            
            // Corrupt text temporarily
            setTimeout(() => {
                el.textContent = this.corruptText(originalText);
            }, 200);
            
            // Restore after a moment
            setTimeout(() => {
                el.textContent = originalText;
                el.classList.remove('glitch-text');
            }, 1500);
        });
        
        // Repeat every 6-12 seconds while active
        if (this.currentGlitches.includes('text')) {
            setTimeout(() => this.triggerTextGlitch(), 6000 + Math.random() * 6000);
        }
    }

    triggerUIGlitch() {
        // Random buttons become unresponsive
        const buttons = document.querySelectorAll('button, .icon, .menu-item');
        const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
        
        if (randomButton) {
            randomButton.classList.add('error-state');
            const originalHandler = randomButton.onclick;
            randomButton.onclick = () => {
                if (this.audioLoaded) {
                    window.voidAudio.playSystem();
                }
                console.log('System error: Component unresponsive');
            };
            
            // Restore after 10-20 seconds
            setTimeout(() => {
                randomButton.classList.remove('error-state');
                randomButton.onclick = originalHandler;
            }, 10000 + Math.random() * 10000);
        }
        
        // Repeat every 7-14 seconds while active
        if (this.currentGlitches.includes('ui')) {
            setTimeout(() => this.triggerUIGlitch(), 7000 + Math.random() * 7000);
        }
    }

    triggerSystemGlitch() {
        // Change system status randomly
        const statuses = ['System: Corrupted', 'System: ERROR', 'System: Unknown', 'System: [REDACTED]'];
        const statusEl = document.getElementById('glitch-level');
        const originalStatus = statusEl.textContent;
        
        statusEl.textContent = statuses[Math.floor(Math.random() * statuses.length)];
        statusEl.style.background = '#dc2626';
        statusEl.classList.add('error-state');
        
        // Restore after 3-8 seconds
        setTimeout(() => {
            statusEl.textContent = originalStatus;
            statusEl.style.background = '#059669';
            statusEl.classList.remove('error-state');
        }, 3000 + Math.random() * 5000);
        
        // Repeat every 10-20 seconds while active
        if (this.currentGlitches.includes('system')) {
            setTimeout(() => this.triggerSystemGlitch(), 10000 + Math.random() * 10000);
        }
    }

    corruptText(text) {
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';
        return text.split('').map(char => {
            if (Math.random() < 0.3) {
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
        
        // Random chance of fourth wall break during horror sequence
        if (Math.random() < 0.1) {
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
        }, 4000);
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

        // Execute app-specific initialization
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
            // Restore
            windowEl.style.width = windowEl.dataset.originalWidth || '600px';
            windowEl.style.height = windowEl.dataset.originalHeight || '400px';
            windowEl.style.left = windowEl.dataset.originalLeft || '50px';
            windowEl.style.top = windowEl.dataset.originalTop || '50px';
            windowEl.dataset.maximized = 'false';
        } else {
            // Maximize
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
            this.showShutdownMessage("Ha.");
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
        }, 3000);
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
            if (this.currentGlitches.length === 0) {
                statusEl.textContent = 'System: Initializing Horror...';
                statusEl.style.background = '#f59e0b';
            } else {
                statusEl.textContent = `System: ${this.currentGlitches.length} Errors Active`;
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
