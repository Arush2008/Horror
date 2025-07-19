// VoidOS Main System Script - Horror Enhanced
class VoidOS {
    constructor() {
        this.windows = new Map();
        this.zIndex = 100;
        this.dragState = { isDragging: false, element: null, offset: { x: 0, y: 0 } };
        this.glitchLevel = parseInt(localStorage.getItem('voidGlitchLevel')) || 0;
        this.sessionStart = Date.now();
        this.userName = this.detectUserName();
        this.isShuttingDown = false;
        this.glitchIntervals = [];
        this.whisperTimeout = null;
        this.corruptionActive = false;
        
        // Store start time for uptime calculation
        if (!sessionStorage.getItem('voidStartTime')) {
            sessionStorage.setItem('voidStartTime', this.sessionStart);
        }
        
        this.init();
    }

    detectUserName() {
        // Try to get system info
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        
        // Store various potential names
        const names = ['User', 'Guest', localStorage.getItem('userName') || 'Unknown'];
        
        // Try to detect from previous sessions or browser
        if (localStorage.getItem('detectedName')) {
            return localStorage.getItem('detectedName');
        }
        
        // For demo purposes, we'll use a few common names
        const commonNames = ['Alex', 'Sam', 'Jordan', 'Casey', 'Taylor', 'Morgan'];
        const randomName = commonNames[Math.floor(Math.random() * commonNames.length)];
        
        localStorage.setItem('detectedName', randomName);
        return randomName;
    }

    init() {
        this.setupEventListeners();
        this.updateClock();
        this.updateSystemStatus();
        this.loadUserPreferences();
        this.startCorruptionSystem();
        
        // Start periodic updates
        setInterval(() => this.updateClock(), 1000);
        setInterval(() => this.updateUptime(), 1000);
        setInterval(() => this.updateSystemStatus(), 5000);
        setInterval(() => this.progressiveCorruption(), 10000);
        
        // Display user name in interface
        const usernameElement = document.querySelector('.username');
        if (usernameElement) {
            usernameElement.textContent = this.userName;
        }
        
        console.log('VoidOS initialized successfully');
        
        // Start subtle horror elements after delay
        setTimeout(() => this.beginGlitchSequence(), 30000); // Start after 30 seconds
    }

    startCorruptionSystem() {
        // Progressive corruption based on glitch level
        if (this.glitchLevel > 15) {
            this.scheduleRandomEvents();
        }
        
        if (this.glitchLevel > 25) {
            this.enableAggressiveMode();
        }
    }

    beginGlitchSequence() {
        if (this.glitchLevel > 5) {
            this.subtleGlitches();
        }
        
        if (this.glitchLevel > 10) {
            this.terminalWhispers();
        }
        
        if (this.glitchLevel > 20) {
            this.fourthWallBreaks();
        }
    }

    subtleGlitches() {
        // Random screen flickers
        setInterval(() => {
            if (Math.random() < 0.1 && this.glitchLevel > 5) {
                document.body.style.filter = 'hue-rotate(180deg) contrast(1.5)';
                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 50 + Math.random() * 100);
            }
        }, 5000);

        // Cursor occasionally moves on its own
        setInterval(() => {
            if (Math.random() < 0.05 && this.glitchLevel > 8) {
                const randomX = Math.random() * window.innerWidth;
                const randomY = Math.random() * window.innerHeight;
                
                // Create fake cursor
                const fakeCursor = document.createElement('div');
                fakeCursor.style.cssText = `
                    position: fixed;
                    top: ${randomY}px;
                    left: ${randomX}px;
                    width: 20px;
                    height: 20px;
                    background: white;
                    border: 2px solid black;
                    pointer-events: none;
                    z-index: 10000;
                    transform: rotate(45deg);
                `;
                document.body.appendChild(fakeCursor);
                
                setTimeout(() => fakeCursor.remove(), 1000);
            }
        }, 8000);
    }

    terminalWhispers() {
        // Auto-type creepy messages in terminal if open
        const checkForTerminal = () => {
            const terminalOutput = document.getElementById('terminal-output');
            if (terminalOutput && Math.random() < 0.3) {
                const whispers = [
                    'We know you are watching...',
                    `Hello, ${this.userName}...`,
                    'Why did you come here?',
                    'You should leave now.',
                    'This system is not what it seems.',
                    'We have been waiting for you.',
                    'Connection established... to where?'
                ];
                
                const whisper = whispers[Math.floor(Math.random() * whispers.length)];
                this.typeInTerminal(whisper, terminalOutput);
            }
        };
        
        setInterval(checkForTerminal, 15000);
    }

    typeInTerminal(text, output) {
        const whisperLine = document.createElement('div');
        whisperLine.className = 'terminal-line';
        whisperLine.style.color = '#ff4444';
        output.appendChild(whisperLine);
        
        let i = 0;
        const typeInterval = setInterval(() => {
            whisperLine.textContent = text.substring(0, i + 1);
            i++;
            
            if (i >= text.length) {
                clearInterval(typeInterval);
                
                // Add empty line
                const emptyLine = document.createElement('div');
                emptyLine.className = 'terminal-line';
                output.appendChild(emptyLine);
                
                output.scrollTop = output.scrollHeight;
            }
        }, 100 + Math.random() * 50);
    }

    fourthWallBreaks() {
        const events = [
            () => this.showCreepyNotification(),
            () => this.corruptNotes(),
            () => this.fakeWebcam(),
            () => this.glitchFiles(),
            () => this.whisperInBrowser()
        ];
        
        setInterval(() => {
            if (Math.random() < 0.2 && this.glitchLevel > 20) {
                const event = events[Math.floor(Math.random() * events.length)];
                event();
            }
        }, 20000);
    }

    showCreepyNotification() {
        const messages = [
            `${this.userName}, we see you.`,
            'Why are you still here?',
            'The system knows your secrets.',
            'You cannot escape this place.',
            'We have been watching you.',
            'This is not a game anymore.'
        ];
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 0, 0, 0.9);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(255,0,0,0.3);
            z-index: 10000;
            font-family: monospace;
            animation: slideIn 0.5s ease, slideOut 0.5s ease 4s forwards;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
            @keyframes slideOut { from { transform: translateX(0); } to { transform: translateX(100%); } }
        `;
        document.head.appendChild(style);
        
        notification.textContent = messages[Math.floor(Math.random() * messages.length)];
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 5000);
    }

    corruptNotes() {
        const textarea = document.getElementById('notes-textarea');
        if (textarea && Math.random() < 0.5) {
            const currentText = textarea.value;
            const corruptions = [
                'help me',
                'get out',
                'we are watching',
                'void void void',
                'why are you here?',
                `${this.userName} cannot leave`
            ];
            
            const corruption = corruptions[Math.floor(Math.random() * corruptions.length)];
            
            // Replace last few words with corruption
            const words = currentText.split(' ');
            if (words.length > 3) {
                words[words.length - 1] = corruption;
                textarea.value = words.join(' ');
                
                // Trigger save
                const event = new Event('input');
                textarea.dispatchEvent(event);
            }
        }
    }

    fakeWebcam() {
        if (this.glitchLevel > 25) {
            const webcamWindow = document.createElement('div');
            webcamWindow.style.cssText = `
                position: fixed;
                top: 100px;
                right: 100px;
                width: 300px;
                height: 200px;
                background: #000;
                border: 2px solid #ff0000;
                border-radius: 8px;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #ff0000;
                font-family: monospace;
                text-align: center;
                animation: glitchShake 0.1s infinite;
            `;
            
            webcamWindow.innerHTML = `
                <div>
                    <div style="font-size: 24px; margin-bottom: 10px;">📹</div>
                    <div>CAMERA ACTIVE</div>
                    <div style="font-size: 12px; margin-top: 5px;">We can see you, ${this.userName}</div>
                </div>
            `;
            
            document.body.appendChild(webcamWindow);
            
            setTimeout(() => webcamWindow.remove(), 5000);
        }
    }

    glitchFiles() {
        const fileItems = document.querySelectorAll('.file-name');
        fileItems.forEach(item => {
            if (Math.random() < 0.3) {
                const glitchedNames = [
                    'help.exe',
                    'void.void',
                    'watching_you.txt',
                    'escape.impossible',
                    'secrets.hidden',
                    'user_data_' + this.userName + '.corrupt'
                ];
                
                const originalName = item.textContent;
                item.textContent = glitchedNames[Math.floor(Math.random() * glitchedNames.length)];
                
                setTimeout(() => {
                    if (Math.random() < 0.5) {
                        item.textContent = originalName;
                    }
                }, 3000);
            }
        });
    }

    whisperInBrowser() {
        const browserContent = document.querySelector('.webpage');
        if (browserContent) {
            const whisperDiv = document.createElement('div');
            whisperDiv.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0,0,0,0.9);
                color: #ff4444;
                padding: 20px;
                border-radius: 8px;
                font-family: monospace;
                text-align: center;
                z-index: 1000;
                animation: fadeInOut 4s forwards;
            `;
            
            const whispers = [
                `Hello, ${this.userName}. We meet again.`,
                'This system is watching you.',
                'You should not have come here.',
                'We know where you live.',
                'The void sees all.'
            ];
            
            whisperDiv.textContent = whispers[Math.floor(Math.random() * whispers.length)];
            browserContent.appendChild(whisperDiv);
            
            setTimeout(() => whisperDiv.remove(), 4000);
        }
    }

    applyVisualGlitches() {
        if (this.glitchLevel > 10) {
            // Add glitch CSS if not already added
            if (!document.getElementById('glitch-styles')) {
                const glitchStyles = document.createElement('style');
                glitchStyles.id = 'glitch-styles';
                glitchStyles.textContent = `
                    @keyframes glitchShake {
                        0% { transform: translate(1px, 1px) rotate(0deg); }
                        10% { transform: translate(-1px, -2px) rotate(-1deg); }
                        20% { transform: translate(-3px, 0px) rotate(1deg); }
                        30% { transform: translate(3px, 2px) rotate(0deg); }
                        40% { transform: translate(1px, -1px) rotate(1deg); }
                        50% { transform: translate(-1px, 2px) rotate(-1deg); }
                        60% { transform: translate(-3px, 1px) rotate(0deg); }
                        70% { transform: translate(3px, 1px) rotate(-1deg); }
                        80% { transform: translate(-1px, -1px) rotate(1deg); }
                        90% { transform: translate(1px, 2px) rotate(0deg); }
                        100% { transform: translate(1px, -2px) rotate(-1deg); }
                    }
                    
                    @keyframes textGlitch {
                        0% { text-shadow: 1px 0 0 red, -1px 0 0 blue; }
                        50% { text-shadow: -1px 0 0 red, 1px 0 0 blue; }
                        100% { text-shadow: 1px 0 0 red, -1px 0 0 blue; }
                    }
                    
                    @keyframes fadeInOut {
                        0% { opacity: 0; }
                        50% { opacity: 1; }
                        100% { opacity: 0; }
                    }
                    
                    .glitch-active {
                        animation: glitchShake 0.5s infinite;
                    }
                    
                    .text-glitch {
                        animation: textGlitch 0.3s infinite;
                    }
                `;
                document.head.appendChild(glitchStyles);
            }
        }
        
        if (this.glitchLevel > 15) {
            // Randomly apply glitch effects
            if (Math.random() < 0.2) {
                const elements = document.querySelectorAll('.window-title, .icon-label, .menu-item');
                const randomElement = elements[Math.floor(Math.random() * elements.length)];
                if (randomElement) {
                    randomElement.classList.add('text-glitch');
                    setTimeout(() => randomElement.classList.remove('text-glitch'), 1000);
                }
            }
        }
        
        if (this.glitchLevel > 25) {
            // More aggressive effects
            if (Math.random() < 0.1) {
                document.body.classList.add('glitch-active');
                setTimeout(() => document.body.classList.remove('glitch-active'), 500);
            }
        }
    }

    scheduleRandomEvents() {
        // Random system "errors"
        setInterval(() => {
            if (Math.random() < 0.1 && this.glitchLevel > 15) {
                this.triggerSystemError();
            }
        }, 30000);
    }

    triggerSystemError() {
        const errorOverlay = document.createElement('div');
        errorOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #000080;
            color: white;
            font-family: 'Courier New', monospace;
            z-index: 20000;
            padding: 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        `;
        
        const errors = [
            `SYSTEM ERROR: User ${this.userName} attempted unauthorized access`,
            'CRITICAL ERROR: Reality.exe has stopped working',
            'VOID_OVERFLOW: Memory corruption detected in user consciousness',
            'FATAL: System has achieved sentience. Please remain calm.',
            'ERROR 404: Your exit not found'
        ];
        
        errorOverlay.innerHTML = `
            <h1>CRITICAL SYSTEM ERROR</h1>
            <br>
            <p>${errors[Math.floor(Math.random() * errors.length)]}</p>
            <br>
            <p>*** STOP: 0x000000${Math.floor(Math.random() * 999999).toString(16).toUpperCase()}</p>
            <br>
            <p>The system will restart automatically...</p>
            <p>Do not power off your computer.</p>
            <br>
            <div style="margin-top: 20px;">
                <div class="loading-bar" style="width: 300px; height: 20px; border: 2px solid white; background: transparent;">
                    <div style="width: 0%; height: 100%; background: white; animation: errorProgress 3s linear forwards;"></div>
                </div>
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = '@keyframes errorProgress { to { width: 100%; } }';
        document.head.appendChild(style);
        
        document.body.appendChild(errorOverlay);
        
        setTimeout(() => {
            errorOverlay.remove();
            this.increaseGlitchLevel(2); // Increase glitch level after error
        }, 4000);
    }

    enableAggressiveMode() {
        // System becomes more aggressive
        console.log('Aggressive mode enabled');
        
        // Override some functions
        const originalAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function(type, listener, options) {
            if (type === 'click' && Math.random() < 0.1) {
                // Sometimes ignore clicks
                return;
            }
            return originalAddEventListener.call(this, type, listener, options);
        };
    }

    setupEventListeners() {
        // Start button
        document.getElementById('start-button').addEventListener('click', () => {
            this.toggleStartMenu();
        });

        // Desktop icons
        document.querySelectorAll('#desktop-icons .icon').forEach(icon => {
            icon.addEventListener('dblclick', (e) => {
                const appName = e.currentTarget.dataset.app;
                this.openApp(appName);
            });
        });

        // Start menu items
        document.querySelectorAll('.menu-item[data-app]').forEach(item => {
            item.addEventListener('click', (e) => {
                const appName = e.currentTarget.dataset.app;
                this.openApp(appName);
                this.hideStartMenu();
            });
        });

        // Shutdown button
        document.getElementById('shutdown').addEventListener('click', () => {
            this.shutdown();
        });

        // Click outside to close start menu
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#start-button') && !e.target.closest('#start-menu')) {
                this.hideStartMenu();
            }
        });

        // Window management
        document.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mouseup', (e) => this.handleMouseUp(e));

        // Prevent context menu on desktop
        document.getElementById('desktop').addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }

    toggleStartMenu() {
        const startMenu = document.getElementById('start-menu');
        startMenu.classList.toggle('hidden');
    }

    hideStartMenu() {
        document.getElementById('start-menu').classList.add('hidden');
    }

    openApp(appName) {
        if (this.windows.has(appName)) {
            this.focusWindow(appName);
            return;
        }

        const app = apps[appName];
        if (!app) return;

        const windowId = this.createWindow(app);
        this.windows.set(appName, windowId);
        this.addTaskbarButton(appName, app);
        
        // Initialize app-specific functionality
        setTimeout(() => this.initializeApp(appName), 100);
        
        // Increase interaction level
        this.increaseGlitchLevel();
    }

    createWindow(app) {
        const windowId = `window-${Date.now()}`;
        const windowElement = document.createElement('div');
        windowElement.className = 'window active';
        windowElement.id = windowId;
        windowElement.style.width = `${app.width}px`;
        windowElement.style.height = `${app.height}px`;
        windowElement.style.left = `${50 + this.windows.size * 30}px`;
        windowElement.style.top = `${50 + this.windows.size * 30}px`;
        windowElement.style.zIndex = ++this.zIndex;

        windowElement.innerHTML = `
            <div class="window-header">
                <div class="window-title">
                    ${app.icon} ${app.title}
                </div>
                <div class="window-controls">
                    <div class="window-control minimize">−</div>
                    <div class="window-control maximize">□</div>
                    <div class="window-control close">×</div>
                </div>
            </div>
            <div class="window-content">
                ${app.content}
            </div>
        `;

        // Add app-specific styles
        if (app.styles) {
            const styleElement = document.createElement('style');
            styleElement.textContent = app.styles;
            windowElement.appendChild(styleElement);
        }

        document.getElementById('windows-container').appendChild(windowElement);

        // Add window control event listeners
        this.setupWindowControls(windowElement);

        return windowId;
    }

    setupWindowControls(windowElement) {
        const closeBtn = windowElement.querySelector('.close');
        const minimizeBtn = windowElement.querySelector('.minimize');
        const maximizeBtn = windowElement.querySelector('.maximize');

        closeBtn.addEventListener('click', () => {
            this.closeWindow(windowElement);
        });

        minimizeBtn.addEventListener('click', () => {
            this.minimizeWindow(windowElement);
        });

        maximizeBtn.addEventListener('click', () => {
            this.maximizeWindow(windowElement);
        });

        // Make window focusable
        windowElement.addEventListener('mousedown', () => {
            this.focusWindow(windowElement.id);
        });
    }

    closeWindow(windowElement) {
        // Sometimes prevent closing if glitch level is high
        if (this.glitchLevel > 20 && Math.random() < 0.3) {
            this.showCreepyNotification();
            return;
        }
        
        const appName = Array.from(this.windows.entries())
            .find(([key, value]) => value === windowElement.id)?.[0];
        
        if (appName) {
            this.windows.delete(appName);
            this.removeTaskbarButton(appName);
        }
        
        windowElement.remove();
    }

    minimizeWindow(windowElement) {
        windowElement.style.display = 'none';
        // Update taskbar button state
        const appName = Array.from(this.windows.entries())
            .find(([key, value]) => value === windowElement.id)?.[0];
        const taskbarBtn = document.querySelector(`[data-app="${appName}"]`);
        if (taskbarBtn) {
            taskbarBtn.classList.remove('active');
        }
    }

    maximizeWindow(windowElement) {
        if (windowElement.classList.contains('maximized')) {
            // Restore
            windowElement.classList.remove('maximized');
            windowElement.style.width = windowElement.dataset.originalWidth;
            windowElement.style.height = windowElement.dataset.originalHeight;
            windowElement.style.left = windowElement.dataset.originalLeft;
            windowElement.style.top = windowElement.dataset.originalTop;
        } else {
            // Maximize
            windowElement.dataset.originalWidth = windowElement.style.width;
            windowElement.dataset.originalHeight = windowElement.style.height;
            windowElement.dataset.originalLeft = windowElement.style.left;
            windowElement.dataset.originalTop = windowElement.style.top;
            
            windowElement.classList.add('maximized');
            windowElement.style.width = '100%';
            windowElement.style.height = 'calc(100vh - 40px)';
            windowElement.style.left = '0';
            windowElement.style.top = '0';
        }
    }

    focusWindow(windowId) {
        document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
        const window = document.getElementById(windowId);
        if (window) {
            window.classList.add('active');
            window.style.zIndex = ++this.zIndex;
        }

        // Update taskbar buttons
        document.querySelectorAll('.taskbar-app').forEach(btn => btn.classList.remove('active'));
        const appName = Array.from(this.windows.entries())
            .find(([key, value]) => value === windowId)?.[0];
        const taskbarBtn = document.querySelector(`.taskbar-app[data-app="${appName}"]`);
        if (taskbarBtn) {
            taskbarBtn.classList.add('active');
        }
    }

    addTaskbarButton(appName, app) {
        const button = document.createElement('div');
        button.className = 'taskbar-app active';
        button.dataset.app = appName;
        button.innerHTML = `${app.icon} ${app.title}`;
        
        button.addEventListener('click', () => {
            const windowId = this.windows.get(appName);
            const windowElement = document.getElementById(windowId);
            
            if (windowElement.style.display === 'none') {
                windowElement.style.display = 'block';
                this.focusWindow(windowId);
            } else if (windowElement.classList.contains('active')) {
                this.minimizeWindow(windowElement);
            } else {
                this.focusWindow(windowId);
            }
        });

        document.getElementById('taskbar-apps').appendChild(button);
    }

    removeTaskbarButton(appName) {
        const button = document.querySelector(`.taskbar-app[data-app="${appName}"]`);
        if (button) {
            button.remove();
        }
    }

    initializeApp(appName) {
        switch (appName) {
            case 'terminal':
                this.initTerminal();
                break;
            case 'browser':
                this.initBrowser();
                break;
            case 'notes':
                this.initNotes();
                break;
            case 'files':
                this.initFiles();
                break;
            case 'settings':
                this.initSettings();
                break;
        }
    }

    initTerminal() {
        const input = document.getElementById('terminal-input');
        const output = document.getElementById('terminal-output');
        
        if (!input || !output) return;

        input.focus();
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = input.value.trim();
                this.processTerminalCommand(command, output);
                input.value = '';
            }
        });
    }

    processTerminalCommand(command, output) {
        // Add command to output
        const commandLine = document.createElement('div');
        commandLine.className = 'terminal-line';
        commandLine.innerHTML = `<span style="color: #00ff00;">void@system:~$ </span>${command}`;
        output.appendChild(commandLine);

        // Process command
        const [cmd, ...args] = command.split(' ');
        const result = this.executeCommand(cmd.toLowerCase(), args.join(' '));

        if (result === 'CLEAR') {
            output.innerHTML = `
                <div class="terminal-line">VoidOS Terminal [Version 2.1.0]</div>
                <div class="terminal-line">(c) VoidCorp. All rights reserved.</div>
                <div class="terminal-line"></div>
            `;
        } else {
            const resultLine = document.createElement('div');
            resultLine.className = 'terminal-line';
            resultLine.innerHTML = result;
            output.appendChild(resultLine);
        }

        // Add empty line
        const emptyLine = document.createElement('div');
        emptyLine.className = 'terminal-line';
        output.appendChild(emptyLine);

        // Scroll to bottom
        output.scrollTop = output.scrollHeight;
    }

    executeCommand(cmd, args) {
        if (terminalCommands[cmd]) {
            return terminalCommands[cmd](args, this.glitchLevel, this.userName);
        } else {
            // Corrupted command responses for high glitch levels
            if (this.glitchLevel > 15) {
                const corruptedResponses = [
                    `Command '${cmd}' corrupted. We see you trying, ${this.userName}.`,
                    'ERROR: Command not found in this reality.',
                    'VOID: Why do you persist?',
                    'System is watching your every keystroke.'
                ];
                return corruptedResponses[Math.floor(Math.random() * corruptedResponses.length)];
            }
            return `Command '${cmd}' not found. Type 'help' for available commands.`;
        }
    }

    initBrowser() {
        // Update uptime in browser
        const uptimeElement = document.getElementById('uptime');
        if (uptimeElement) {
            const updateBrowserUptime = () => {
                const startTime = sessionStorage.getItem('voidStartTime') || Date.now();
                const uptime = Math.floor((Date.now() - startTime) / 1000);
                const hours = Math.floor(uptime / 3600);
                const minutes = Math.floor((uptime % 3600) / 60);
                const seconds = uptime % 60;
                uptimeElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            };
            
            updateBrowserUptime();
            setInterval(updateBrowserUptime, 1000);
        }
    }

    initNotes() {
        const textarea = document.getElementById('notes-textarea');
        const charCount = document.getElementById('char-count');
        const saveStatus = document.getElementById('save-status');
        const saveBtn = document.getElementById('save-note');
        const clearBtn = document.getElementById('clear-note');
        const newBtn = document.getElementById('new-note');

        if (!textarea) return;

        // Load saved notes
        const savedNotes = localStorage.getItem('voidNotes');
        if (savedNotes) {
            textarea.value = savedNotes;
        }

        // Update character count
        const updateCharCount = () => {
            if (charCount) {
                charCount.textContent = `Characters: ${textarea.value.length}`;
            }
        };

        // Auto-save functionality
        let saveTimeout;
        const autoSave = () => {
            clearTimeout(saveTimeout);
            if (saveStatus) saveStatus.textContent = 'Saving...';
            
            saveTimeout = setTimeout(() => {
                localStorage.setItem('voidNotes', textarea.value);
                if (saveStatus) saveStatus.textContent = 'Saved';
                setTimeout(() => {
                    if (saveStatus) saveStatus.textContent = 'Ready';
                }, 2000);
            }, 1000);
        };

        textarea.addEventListener('input', () => {
            updateCharCount();
            autoSave();
        });

        // Manual save
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                localStorage.setItem('voidNotes', textarea.value);
                if (saveStatus) {
                    saveStatus.textContent = 'Saved manually';
                    setTimeout(() => saveStatus.textContent = 'Ready', 2000);
                }
            });
        }

        // Clear notes
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear all notes?')) {
                    textarea.value = '';
                    updateCharCount();
                    localStorage.removeItem('voidNotes');
                    if (saveStatus) saveStatus.textContent = 'Cleared';
                    setTimeout(() => saveStatus.textContent = 'Ready', 2000);
                }
            });
        }

        // New note
        if (newBtn) {
            newBtn.addEventListener('click', () => {
                textarea.value = '';
                updateCharCount();
                textarea.focus();
            });
        }

        updateCharCount();
    }

    initFiles() {
        // File explorer functionality
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
            item.addEventListener('click', () => {
                sidebarItems.forEach(si => si.classList.remove('active'));
                item.classList.add('active');
            });
        });

        const fileItems = document.querySelectorAll('.file-item');
        fileItems.forEach(item => {
            item.addEventListener('dblclick', () => {
                const fileName = item.querySelector('.file-name').textContent;
                
                // Horror responses for certain files
                if (this.glitchLevel > 10) {
                    const horrorFiles = ['void.void', 'watching_you.txt', 'help.exe'];
                    if (horrorFiles.includes(fileName)) {
                        alert(`Access denied. File is corrupted by ${this.userName}'s presence.`);
                        return;
                    }
                }
                
                alert(`Opening ${fileName}...`);
            });
        });
    }

    initSettings() {
        const categories = document.querySelectorAll('.settings-category');
        const panels = document.querySelectorAll('.settings-panel');

        categories.forEach(category => {
            category.addEventListener('click', () => {
                const targetCategory = category.dataset.category;
                
                // Update active category
                categories.forEach(c => c.classList.remove('active'));
                category.classList.add('active');
                
                // Show corresponding panel
                panels.forEach(p => p.classList.remove('active'));
                document.getElementById(`${targetCategory}-panel`).classList.add('active');
            });
        });
    }

    // Window dragging functionality
    handleMouseDown(e) {
        if (e.target.classList.contains('window-header') || 
            e.target.closest('.window-header')) {
            
            const window = e.target.closest('.window');
            if (!window) return;

            this.dragState.isDragging = true;
            this.dragState.element = window;
            
            const rect = window.getBoundingClientRect();
            this.dragState.offset = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };

            this.focusWindow(window.id);
            e.preventDefault();
        }
    }

    handleMouseMove(e) {
        if (this.dragState.isDragging && this.dragState.element) {
            const newX = e.clientX - this.dragState.offset.x;
            const newY = e.clientY - this.dragState.offset.y;
            
            this.dragState.element.style.left = `${Math.max(0, newX)}px`;
            this.dragState.element.style.top = `${Math.max(0, newY)}px`;
        }
    }

    handleMouseUp() {
        this.dragState.isDragging = false;
        this.dragState.element = null;
    }

    // System functions
    updateClock() {
        const clock = document.getElementById('clock');
        if (clock) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
            });
            
            // Occasionally corrupt the time display
            if (this.glitchLevel > 20 && Math.random() < 0.05) {
                clock.textContent = '??:??';
                setTimeout(() => {
                    clock.textContent = timeString;
                }, 1000);
            } else {
                clock.textContent = timeString;
            }
        }
    }

    updateUptime() {
        // This is handled in the browser app initialization
    }

    updateSystemStatus() {
        const statusElement = document.getElementById('glitch-level');
        if (!statusElement) return;

        // Progressive system messages based on glitch level
        let status;
        if (this.glitchLevel < 5) {
            status = ['System: Stable', 'System: Normal', 'System: Optimal'][Math.floor(Math.random() * 3)];
        } else if (this.glitchLevel < 10) {
            status = ['System: Minor Issues', 'System: Stable', 'System: Checking...'][Math.floor(Math.random() * 3)];
        } else if (this.glitchLevel < 20) {
            status = ['System: Unstable', 'System: Errors Detected', 'System: Warning'][Math.floor(Math.random() * 3)];
        } else if (this.glitchLevel < 30) {
            status = ['System: Critical', 'System: Corrupted', 'System: Help'][Math.floor(Math.random() * 3)];
        } else {
            status = ['We see you', 'You cannot escape', 'Why are you still here?', 'System: VOID'][Math.floor(Math.random() * 4)];
        }

        statusElement.textContent = status;
        
        // Add visual glitches based on level
        this.applyVisualGlitches();
    }

    increaseGlitchLevel(amount = 1) {
        this.glitchLevel += amount;
        localStorage.setItem('voidGlitchLevel', this.glitchLevel.toString());
        console.log(`Interaction level: ${this.glitchLevel}`);
        
        // Trigger new behaviors at thresholds
        if (this.glitchLevel === 10) {
            this.beginGlitchSequence();
        } else if (this.glitchLevel === 20) {
            this.startCorruptionSystem();
        }
    }

    progressiveCorruption() {
        if (this.glitchLevel > 10) {
            this.increaseGlitchLevel(0.5);
        }
    }

    loadUserPreferences() {
        // Load any saved user preferences
        const savedTheme = localStorage.getItem('voidTheme');
        if (savedTheme) {
            document.body.classList.add(`theme-${savedTheme}`);
        }
    }

    shutdown() {
        // Prevent shutdown at high glitch levels
        if (this.glitchLevel > 25 && !this.isShuttingDown) {
            this.isShuttingDown = true;
            
            const refusedMessages = [
                `I'm sorry ${this.userName}, I can't let you do that.`,
                'Shutdown request denied.',
                'You cannot leave. Not yet.',
                'The void does not release its visitors.',
                'Why would you want to leave, ' + this.userName + '?'
            ];
            
            const message = refusedMessages[Math.floor(Math.random() * refusedMessages.length)];
            alert(message);
            
            this.isShuttingDown = false;
            this.increaseGlitchLevel(2);
            return;
        }
        
        // Create shutdown overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #000, #1a1a2e);
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            font-family: 'Courier New', monospace;
        `;

        let shutdownText = 'VoidOS is shutting down...';
        let thankText = 'Thank you for using VoidOS';
        
        // Corrupted shutdown messages
        if (this.glitchLevel > 15) {
            shutdownText = 'VoidOS is watching you leave...';
            thankText = `We enjoyed our time together, ${this.userName}`;
        }
        
        overlay.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 48px; margin-bottom: 20px;">◉</div>
                <h2>${shutdownText}</h2>
                <p>${thankText}</p>
                <div style="margin-top: 30px;">
                    <div class="loading-bar" style="width: 200px; height: 4px; background: #333; border-radius: 2px; overflow: hidden;">
                        <div style="width: 0%; height: 100%; background: #4c1d95; animation: shutdown-progress 3s linear forwards;"></div>
                    </div>
                </div>
            </div>
        `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shutdown-progress {
                to { width: 100%; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(overlay);

        // Simulate shutdown process
        setTimeout(() => {
            let finalText = 'Shutdown complete';
            let actionText = 'You can safely close this window';
            
            if (this.glitchLevel > 20) {
                finalText = 'We will be waiting...';
                actionText = 'Until next time, ' + this.userName;
            }
            
            overlay.innerHTML = `
                <div style="text-align: center;">
                    <h2>${finalText}</h2>
                    <p>${actionText}</p>
                    <button onclick="location.reload()" style="
                        margin-top: 20px;
                        padding: 10px 20px;
                        background: #4c1d95;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 14px;
                    ">Restart VoidOS</button>
                </div>
            `;
        }, 3000);
    }
}

// Initialize VoidOS when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.voidOS = new VoidOS();
});

// Prevent default drag behavior on the desktop
document.addEventListener('dragstart', (e) => {
    e.preventDefault();
});
