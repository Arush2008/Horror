// VoidOS Main System Script
class VoidOS {
    constructor() {
        this.windows = new Map();
        this.zIndex = 100;
        this.dragState = { isDragging: false, element: null, offset: { x: 0, y: 0 } };
        this.glitchLevel = parseInt(localStorage.getItem('voidGlitchLevel')) || 0;
        this.sessionStart = Date.now();
        
        // Store start time for uptime calculation
        if (!sessionStorage.getItem('voidStartTime')) {
            sessionStorage.setItem('voidStartTime', this.sessionStart);
        }
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateClock();
        this.updateSystemStatus();
        this.loadUserPreferences();
        
        // Start periodic updates
        setInterval(() => this.updateClock(), 1000);
        setInterval(() => this.updateUptime(), 1000);
        setInterval(() => this.updateSystemStatus(), 5000);
        
        console.log('VoidOS initialized successfully');
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
            return terminalCommands[cmd](args);
        } else {
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
            clock.textContent = timeString;
        }
    }

    updateUptime() {
        // This is handled in the browser app initialization
    }

    updateSystemStatus() {
        const statusElement = document.getElementById('glitch-level');
        if (!statusElement) return;

        const statuses = [
            'System: Stable',
            'System: Normal',
            'System: Optimal',
            'System: Running'
        ];

        statusElement.textContent = statuses[Math.floor(Math.random() * statuses.length)];
    }

    increaseGlitchLevel() {
        this.glitchLevel++;
        localStorage.setItem('voidGlitchLevel', this.glitchLevel.toString());
        console.log(`Interaction level: ${this.glitchLevel}`);
    }

    loadUserPreferences() {
        // Load any saved user preferences
        const savedTheme = localStorage.getItem('voidTheme');
        if (savedTheme) {
            document.body.classList.add(`theme-${savedTheme}`);
        }
    }

    shutdown() {
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

        overlay.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 48px; margin-bottom: 20px;">◉</div>
                <h2>VoidOS is shutting down...</h2>
                <p>Thank you for using VoidOS</p>
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
            overlay.innerHTML = `
                <div style="text-align: center;">
                    <h2>Shutdown complete</h2>
                    <p>You can safely close this window</p>
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
