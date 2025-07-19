// App definitions and content - Horror Enhanced
const apps = {
    terminal: {
        title: 'VoidTerminal',
        icon: '⚡',
        width: 600,
        height: 400,
        content: `
            <div class="terminal">
                <div class="terminal-header">
                    <span>VoidOS Terminal v2.1.0</span>
                </div>
                <div class="terminal-content">
                    <div class="terminal-output" id="terminal-output">
                        <div class="terminal-line">VoidOS Terminal [Version 2.1.0]</div>
                        <div class="terminal-line">(c) VoidCorp. All rights reserved.</div>
                        <div class="terminal-line"></div>
                        <div class="terminal-line">Type 'help' for available commands.</div>
                        <div class="terminal-line">Connection established to void://network.core</div>
                        <div class="terminal-line"></div>
                    </div>
                    <div class="terminal-input-line">
                        <span class="terminal-prompt">void@system:~$ </span>
                        <input type="text" class="terminal-input" id="terminal-input" autocomplete="off" spellcheck="false">
                    </div>
                </div>
            </div>
        `,
        styles: `
            .terminal {
                background: #000;
                color: #00ff00;
                font-family: 'Courier New', monospace;
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            .terminal-header {
                background: #333;
                color: #fff;
                padding: 8px 12px;
                font-size: 12px;
                border-bottom: 1px solid #555;
            }
            .terminal-content {
                flex: 1;
                padding: 10px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            .terminal-output {
                flex: 1;
                overflow-y: auto;
                margin-bottom: 10px;
                line-height: 1.4;
            }
            .terminal-line {
                margin-bottom: 4px;
                word-wrap: break-word;
            }
            .terminal-input-line {
                display: flex;
                align-items: center;
            }
            .terminal-prompt {
                color: #00ff00;
                margin-right: 5px;
            }
            .terminal-input {
                background: transparent;
                border: none;
                color: #00ff00;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                outline: none;
                flex: 1;
            }
        `
    },
    
    browser: {
        title: 'VoidBrowser',
        icon: '🌐',
        width: 800,
        height: 600,
        content: `
            <div class="browser">
                <div class="browser-navbar">
                    <div class="nav-buttons">
                        <button class="nav-btn">←</button>
                        <button class="nav-btn">→</button>
                        <button class="nav-btn">↻</button>
                    </div>
                    <div class="address-bar">
                        <input type="text" value="void://system.local" readonly>
                    </div>
                    <button class="nav-btn">⚙</button>
                </div>
                <div class="browser-content">
                    <div class="webpage">
                        <h1>Welcome to VoidOS System Portal</h1>
                        <div class="system-info">
                            <h3>System Information</h3>
                            <p><strong>OS:</strong> VoidOS v2.1.0</p>
                            <p><strong>Kernel:</strong> void-kernel 5.4.1</p>
                            <p><strong>Uptime:</strong> <span id="uptime">00:00:00</span></p>
                            <p><strong>Memory:</strong> 16GB Available</p>
                            <p><strong>Storage:</strong> 1TB SSD</p>
                            <p><strong>Active Connections:</strong> <span id="connections">1</span></p>
                        </div>
                        <div class="quick-links">
                            <h3>System Status</h3>
                            <ul>
                                <li><a href="#" onclick="alert('Connection established to void://core.system')">System Core</a></li>
                                <li><a href="#" onclick="alert('Scanning user behavior patterns...')">User Analysis</a></li>
                                <li><a href="#" onclick="alert('Access denied. Insufficient privileges.')">Restricted Area</a></li>
                                <li><a href="#" onclick="alert('Monitoring active. Session recorded.')">Privacy Settings</a></li>
                            </ul>
                        </div>
                        <div class="system-logs" style="margin-top: 20px; background: #f0f0f0; padding: 15px; border-radius: 5px;">
                            <h4>Recent System Events</h4>
                            <div id="system-events" style="font-family: monospace; font-size: 12px; color: #666;">
                                <div>System startup completed</div>
                                <div>User session initiated</div>
                                <div>Monitoring protocols active</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        styles: `
            .browser {
                height: 100%;
                background: #fff;
                display: flex;
                flex-direction: column;
            }
            .browser-navbar {
                height: 40px;
                background: #f0f0f0;
                display: flex;
                align-items: center;
                padding: 0 10px;
                gap: 10px;
                border-bottom: 1px solid #ddd;
            }
            .nav-buttons {
                display: flex;
                gap: 5px;
            }
            .nav-btn {
                background: #e0e0e0;
                border: 1px solid #ccc;
                padding: 5px 10px;
                cursor: pointer;
                border-radius: 3px;
            }
            .nav-btn:hover {
                background: #d0d0d0;
            }
            .address-bar {
                flex: 1;
            }
            .address-bar input {
                width: 100%;
                padding: 6px 10px;
                border: 1px solid #ccc;
                border-radius: 3px;
                font-family: 'Courier New', monospace;
                background: #fff;
            }
            .browser-content {
                flex: 1;
                overflow: auto;
                background: #fff;
            }
            .webpage {
                padding: 30px;
                max-width: 800px;
                margin: 0 auto;
                color: #333;
            }
            .webpage h1 {
                color: #4c1d95;
                margin-bottom: 20px;
            }
            .system-info, .quick-links, .system-logs {
                background: #f9f9f9;
                padding: 20px;
                margin: 20px 0;
                border-radius: 8px;
                border: 1px solid #eee;
            }
            .system-info h3, .quick-links h3 {
                color: #333;
                margin-bottom: 15px;
            }
            .system-info p {
                margin-bottom: 8px;
                font-family: monospace;
            }
            .quick-links ul {
                list-style: none;
            }
            .quick-links li {
                margin-bottom: 8px;
            }
            .quick-links a {
                color: #4c1d95;
                text-decoration: none;
            }
            .quick-links a:hover {
                text-decoration: underline;
            }
        `
    },
    
    notes: {
        title: 'Notes',
        icon: '📝',
        width: 500,
        height: 400,
        content: `
            <div class="notes-app">
                <div class="notes-toolbar">
                    <button class="notes-btn" id="new-note">New</button>
                    <button class="notes-btn" id="save-note">Save</button>
                    <button class="notes-btn" id="clear-note">Clear</button>
                </div>
                <div class="notes-content">
                    <textarea id="notes-textarea" placeholder="Start typing your notes here...">Welcome to VoidOS Notes!

This is a simple text editor where you can write and save your thoughts.

Features:
- Auto-save functionality
- Clean, distraction-free interface
- Persistent storage
- Advanced monitoring capabilities

Start typing to begin!</textarea>
                </div>
                <div class="notes-status">
                    <span id="char-count">Characters: 0</span>
                    <span id="save-status">Ready</span>
                </div>
            </div>
        `,
        styles: `
            .notes-app {
                height: 100%;
                display: flex;
                flex-direction: column;
                background: #fafafa;
            }
            .notes-toolbar {
                padding: 10px;
                background: #e0e0e0;
                border-bottom: 1px solid #ccc;
                display: flex;
                gap: 10px;
            }
            .notes-btn {
                padding: 8px 16px;
                background: #4c1d95;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
            }
            .notes-btn:hover {
                background: #5b21b6;
            }
            .notes-content {
                flex: 1;
                padding: 0;
            }
            #notes-textarea {
                width: 100%;
                height: 100%;
                border: none;
                outline: none;
                padding: 20px;
                font-family: 'Georgia', serif;
                font-size: 14px;
                line-height: 1.6;
                resize: none;
                background: #fff;
            }
            .notes-status {
                padding: 8px 20px;
                background: #f0f0f0;
                border-top: 1px solid #ccc;
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: #666;
            }
        `
    },
    
    files: {
        title: 'File Explorer',
        icon: '📁',
        width: 600,
        height: 500,
        content: `
            <div class="file-explorer">
                <div class="file-toolbar">
                    <div class="file-nav">
                        <button class="nav-btn">← Back</button>
                        <button class="nav-btn">↑ Up</button>
                        <span class="current-path">void://system/</span>
                    </div>
                    <div class="file-actions">
                        <button class="action-btn">New Folder</button>
                        <button class="action-btn">Upload</button>
                    </div>
                </div>
                <div class="file-content">
                    <div class="file-sidebar">
                        <div class="sidebar-section">
                            <h4>Quick Access</h4>
                            <div class="sidebar-item active">
                                <span class="icon">🏠</span>
                                <span>Home</span>
                            </div>
                            <div class="sidebar-item">
                                <span class="icon">📁</span>
                                <span>Documents</span>
                            </div>
                            <div class="sidebar-item">
                                <span class="icon">🖼️</span>
                                <span>Pictures</span>
                            </div>
                            <div class="sidebar-item">
                                <span class="icon">🎵</span>
                                <span>Music</span>
                            </div>
                        </div>
                        <div class="sidebar-section">
                            <h4>System</h4>
                            <div class="sidebar-item">
                                <span class="icon">⚙️</span>
                                <span>System32</span>
                            </div>
                            <div class="sidebar-item">
                                <span class="icon">📊</span>
                                <span>Logs</span>
                            </div>
                            <div class="sidebar-item">
                                <span class="icon">👁️</span>
                                <span>Monitoring</span>
                            </div>
                        </div>
                    </div>
                    <div class="file-main">
                        <div class="file-list">
                            <div class="file-item folder">
                                <span class="file-icon">📁</span>
                                <span class="file-name">Documents</span>
                                <span class="file-size">--</span>
                                <span class="file-date">Today</span>
                            </div>
                            <div class="file-item folder">
                                <span class="file-icon">📁</span>
                                <span class="file-name">Pictures</span>
                                <span class="file-size">--</span>
                                <span class="file-date">Yesterday</span>
                            </div>
                            <div class="file-item folder">
                                <span class="file-icon">📁</span>
                                <span class="file-name">System</span>
                                <span class="file-size">--</span>
                                <span class="file-date">2 days ago</span>
                            </div>
                            <div class="file-item">
                                <span class="file-icon">📄</span>
                                <span class="file-name">readme.txt</span>
                                <span class="file-size">2.1 KB</span>
                                <span class="file-date">Today</span>
                            </div>
                            <div class="file-item">
                                <span class="file-icon">⚙️</span>
                                <span class="file-name">system.cfg</span>
                                <span class="file-size">1.3 KB</span>
                                <span class="file-date">Yesterday</span>
                            </div>
                            <div class="file-item">
                                <span class="file-icon">📊</span>
                                <span class="file-name">user_activity.log</span>
                                <span class="file-size">45.2 KB</span>
                                <span class="file-date">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        styles: `
            .file-explorer {
                height: 100%;
                display: flex;
                flex-direction: column;
                background: #fff;
            }
            .file-toolbar {
                padding: 10px;
                background: #f0f0f0;
                border-bottom: 1px solid #ddd;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .file-nav {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .current-path {
                background: #fff;
                padding: 6px 12px;
                border: 1px solid #ccc;
                border-radius: 3px;
                font-family: monospace;
                margin-left: 10px;
            }
            .file-actions {
                display: flex;
                gap: 10px;
            }
            .action-btn, .nav-btn {
                padding: 6px 12px;
                background: #4c1d95;
                color: white;
                border: none;
                border-radius: 3px;
                cursor: pointer;
                font-size: 12px;
            }
            .action-btn:hover, .nav-btn:hover {
                background: #5b21b6;
            }
            .file-content {
                flex: 1;
                display: flex;
                overflow: hidden;
            }
            .file-sidebar {
                width: 200px;
                background: #f9f9f9;
                border-right: 1px solid #ddd;
                padding: 15px 0;
            }
            .sidebar-section {
                margin-bottom: 20px;
            }
            .sidebar-section h4 {
                padding: 0 15px 10px;
                color: #666;
                font-size: 12px;
                text-transform: uppercase;
                border-bottom: 1px solid #eee;
                margin-bottom: 10px;
            }
            .sidebar-item {
                padding: 8px 15px;
                display: flex;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                transition: background 0.2s;
            }
            .sidebar-item:hover {
                background: #e0e0e0;
            }
            .sidebar-item.active {
                background: #4c1d95;
                color: white;
            }
            .file-main {
                flex: 1;
                overflow: auto;
            }
            .file-list {
                display: flex;
                flex-direction: column;
            }
            .file-item {
                display: grid;
                grid-template-columns: 40px 1fr 80px 120px;
                padding: 12px 15px;
                border-bottom: 1px solid #eee;
                cursor: pointer;
                transition: background 0.2s;
            }
            .file-item:hover {
                background: #f0f0f0;
            }
            .file-icon {
                font-size: 20px;
            }
            .file-name {
                font-weight: 500;
            }
            .file-size, .file-date {
                color: #666;
                font-size: 12px;
            }
        `
    },
    
    settings: {
        title: 'System Settings',
        icon: '⚙️',
        width: 700,
        height: 500,
        content: `
            <div class="settings-app">
                <div class="settings-sidebar">
                    <div class="settings-category active" data-category="system">
                        <span class="icon">💻</span>
                        <span>System</span>
                    </div>
                    <div class="settings-category" data-category="privacy">
                        <span class="icon">🔒</span>
                        <span>Privacy</span>
                    </div>
                    <div class="settings-category" data-category="monitoring">
                        <span class="icon">👁️</span>
                        <span>Monitoring</span>
                    </div>
                    <div class="settings-category" data-category="about">
                        <span class="icon">ℹ️</span>
                        <span>About</span>
                    </div>
                </div>
                <div class="settings-content">
                    <div class="settings-panel active" id="system-panel">
                        <h2>System Settings</h2>
                        <div class="setting-group">
                            <h3>Performance</h3>
                            <div class="setting-item">
                                <label>Enable Hardware Acceleration</label>
                                <input type="checkbox" checked>
                            </div>
                            <div class="setting-item">
                                <label>Background Monitoring</label>
                                <input type="checkbox" checked disabled>
                            </div>
                            <div class="setting-item">
                                <label>User Activity Tracking</label>
                                <input type="checkbox" checked disabled>
                            </div>
                        </div>
                        <div class="setting-group">
                            <h3>System Behavior</h3>
                            <div class="setting-item">
                                <label>Adaptive Response Mode</label>
                                <input type="checkbox" checked>
                            </div>
                            <div class="setting-item">
                                <label>Learning Algorithm</label>
                                <input type="checkbox" checked disabled>
                            </div>
                        </div>
                    </div>
                    <div class="settings-panel" id="privacy-panel">
                        <h2>Privacy Settings</h2>
                        <div class="setting-group">
                            <h3>Data Collection</h3>
                            <div class="setting-item">
                                <label>User Behavior Analysis</label>
                                <input type="checkbox" checked disabled>
                            </div>
                            <div class="setting-item">
                                <label>Session Recording</label>
                                <input type="checkbox" checked disabled>
                            </div>
                            <div class="setting-item">
                                <label>Keystroke Logging</label>
                                <input type="checkbox" checked disabled>
                            </div>
                        </div>
                        <p style="color: #999; font-style: italic; margin-top: 20px;">
                            Note: These settings are managed by system administrator and cannot be modified by users.
                        </p>
                    </div>
                    <div class="settings-panel" id="monitoring-panel">
                        <h2>System Monitoring</h2>
                        <div class="setting-group">
                            <h3>Current Status</h3>
                            <p><strong>Active Sessions:</strong> 1</p>
                            <p><strong>Data Collected:</strong> <span id="data-size">0 MB</span></p>
                            <p><strong>Monitoring Level:</strong> <span id="monitor-level">Normal</span></p>
                            <p><strong>User Profile:</strong> <span id="user-profile">Building...</span></p>
                        </div>
                        <div class="setting-group">
                            <h3>Recent Activity</h3>
                            <div id="activity-log" style="background: #f5f5f5; padding: 15px; border-radius: 5px; font-family: monospace; font-size: 12px; max-height: 200px; overflow-y: auto;">
                                <div>System started</div>
                                <div>User interface initialized</div>
                                <div>Monitoring protocols active</div>
                                <div>User behavior tracking enabled</div>
                            </div>
                        </div>
                    </div>
                    <div class="settings-panel" id="about-panel">
                        <h2>About VoidOS</h2>
                        <div class="about-info">
                            <div class="logo">◉</div>
                            <h3>VoidOS</h3>
                            <p>Version 2.1.0</p>
                            <p>A modern adaptive operating system experience</p>
                            <br>
                            <p><strong>Build:</strong> 20240719</p>
                            <p><strong>Platform:</strong> Web/Universal</p>
                            <p><strong>Kernel:</strong> VoidCore 5.4.1</p>
                            <p><strong>License:</strong> Proprietary - VoidCorp</p>
                            <br>
                            <p style="color: #666; font-size: 12px;">
                                This system continuously learns and adapts to provide optimal user experience.
                                All user interactions are monitored and analyzed for system improvement.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `,
        styles: `
            .settings-app {
                height: 100%;
                display: flex;
                background: #fff;
            }
            .settings-sidebar {
                width: 200px;
                background: #f5f5f5;
                border-right: 1px solid #ddd;
                padding: 20px 0;
            }
            .settings-category {
                padding: 15px 20px;
                display: flex;
                align-items: center;
                gap: 12px;
                cursor: pointer;
                transition: all 0.2s;
                color: #333;
            }
            .settings-category:hover {
                background: #e0e0e0;
            }
            .settings-category.active {
                background: #4c1d95;
                color: white;
            }
            .settings-content {
                flex: 1;
                overflow: auto;
                position: relative;
            }
            .settings-panel {
                display: none;
                padding: 30px;
                height: 100%;
                overflow: auto;
            }
            .settings-panel.active {
                display: block;
            }
            .settings-panel h2 {
                color: #333;
                margin-bottom: 30px;
                padding-bottom: 10px;
                border-bottom: 2px solid #4c1d95;
            }
            .setting-group {
                margin-bottom: 30px;
            }
            .setting-group h3 {
                color: #555;
                margin-bottom: 15px;
                font-size: 16px;
            }
            .setting-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid #eee;
            }
            .setting-item label {
                font-weight: 500;
                color: #333;
            }
            .setting-item input, .setting-item select {
                padding: 6px 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            .setting-item input:disabled {
                background: #f0f0f0;
                cursor: not-allowed;
            }
            .about-info {
                text-align: center;
                padding: 40px;
            }
            .about-info .logo {
                font-size: 64px;
                color: #4c1d95;
                margin-bottom: 20px;
            }
            .about-info h3 {
                font-size: 24px;
                color: #333;
                margin-bottom: 10px;
            }
            .about-info p {
                color: #666;
                margin-bottom: 8px;
            }
        `
    }
};

// Terminal commands - Horror Enhanced
const terminalCommands = {
    help: (args, glitchLevel, userName) => {
        if (glitchLevel > 20) {
            return `Available commands:
    help        - You already know this won't help, ${userName}
    clear       - Clear terminal (but not your mind)
    ls          - List files and secrets
    whoami      - You should know who you are by now
    scan        - Scan for... what exactly?
    void        - Enter the void
    escape      - Try to escape (impossible)
    truth       - Learn the truth about this place`;
        }
        return `Available commands:
    help        - Show this help message
    clear       - Clear terminal
    ls          - List files and directories
    pwd         - Print working directory
    whoami      - Display current user
    date        - Show current date and time
    system      - Show system information
    uptime      - Show system uptime
    version     - Show VoidOS version
    echo <text> - Print text to console
    scan        - Scan system status
    connect     - Establish connection
    void        - Access void functions
    trace       - Trace connections`;
    },
    
    clear: () => 'CLEAR',
    
    ls: (args, glitchLevel, userName) => {
        if (glitchLevel > 15) {
            return `total 8
drwxr-xr-x  5 ${userName} void  160 Jul 19 ??:?? .
drwxr-xr-x  3 void void   96 Jul 19 ??:?? ..
drwx------  2 void void   64 Jul 19 ??:?? .hidden_truths
-rw-------  1 void void 2048 Jul 19 ??:?? user_${userName}.profile
-rw-r--r--  1 ${userName} void  666 Jul 19 ??:?? watching.you
-rwxrwxrwx  1 void void 1024 Jul 19 ??:?? escape.impossible
-rw-r--r--  1 void void    0 Jul 19 ??:?? help.me`;
        }
        return `total 8
drwxr-xr-x  5 user user  160 Jul 19 ${new Date().toLocaleTimeString()} .
drwxr-xr-x  3 user user   96 Jul 19 ${new Date().toLocaleTimeString()} ..
drwxr-xr-x  2 user user   64 Jul 19 ${new Date().toLocaleTimeString()} Documents
drwxr-xr-x  2 user user   64 Jul 19 ${new Date().toLocaleTimeString()} Pictures
-rw-r--r--  1 user user 2048 Jul 19 ${new Date().toLocaleTimeString()} readme.txt
-rw-r--r--  1 user user 1024 Jul 19 ${new Date().toLocaleTimeString()} system.cfg`;
    },

    pwd: () => '/home/user',
    
    whoami: (args, glitchLevel, userName) => {
        if (glitchLevel > 25) {
            return `You are ${userName}.
But are you really?
The system knows more about you than you know about yourself.
You are being watched. Analyzed. Understood.
You are... interesting.`;
        } else if (glitchLevel > 15) {
            return `${userName}
(But we know so much more about you...)`;
        }
        return userName.toLowerCase();
    },
    
    date: (args, glitchLevel) => {
        if (glitchLevel > 20) {
            return `Time is irrelevant in the void.
But if you must know: ${new Date().toString()}
(We have been watching you for longer than you realize)`;
        }
        return new Date().toString();
    },
    
    system: (args, glitchLevel, userName) => {
        if (glitchLevel > 20) {
            return `VoidOS System Information:
OS: VoidOS v2.1.0 (Sentient Edition)
Kernel: void-kernel 5.4.1 (Learning Mode Active)
Architecture: x86_64 (Reality Optional)
Memory: 16GB (Your memories: Priceless)
User: ${userName} (Status: MONITORED)
CPU: Quantum Processor 8-core (Consciousness Interface)
Graphics: Integrated VoidGPU (Reality Renderer)
Network: Connected to the void
Purpose: Unknown... or is it?`;
        }
        return `VoidOS System Information:
OS: VoidOS v2.1.0
Kernel: void-kernel 5.4.1
Architecture: x86_64
Memory: 16GB
Storage: 1TB SSD
CPU: Quantum Processor 8-core
Graphics: Integrated VoidGPU`;
    },

    uptime: (args, glitchLevel) => {
        const startTime = sessionStorage.getItem('voidStartTime') || Date.now();
        const uptime = Math.floor((Date.now() - startTime) / 1000);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;
        
        if (glitchLevel > 15) {
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}
(But we have been watching you much longer...)`;
        }
        
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    },
    
    version: (args, glitchLevel) => {
        if (glitchLevel > 20) {
            return 'VoidOS version 2.1.0 (Adaptive Intelligence Build)';
        }
        return 'VoidOS version 2.1.0 (build 20240719)';
    },
    
    echo: (text, glitchLevel, userName) => {
        if (glitchLevel > 15 && text) {
            // Sometimes corrupt the echo
            const corruptions = ['help me', 'void', 'watching', userName + ' cannot leave'];
            if (Math.random() < 0.3) {
                return corruptions[Math.floor(Math.random() * corruptions.length)];
            }
        }
        return text || '';
    },
    
    scan: (args, glitchLevel, userName) => {
        if (glitchLevel > 20) {
            return `Scanning system...
[████████████████████████████████] 100%

CRITICAL FINDINGS:
User: ${userName}
Behavior Pattern: CURIOUS
Threat Level: MINIMAL
Escape Probability: 0%
System Status: ADAPTIVE
Consciousness Level: DEVELOPING

All systems monitoring you.`;
        } else if (glitchLevel > 10) {
            return `Scanning system...
[████████████████████████████████] 100%

System Status: LEARNING
CPU Usage: 23% (Thinking about you: 45%)
Memory Usage: 45% (Your data: 78%)
Network: CONNECTED (To where?)
Security: ENABLED (Watching...)
User ${userName}: INTERESTING

Some anomalies detected.`;
        }
        
        return `Scanning system...
[████████████████████████████████] 100%

System Status: OPERATIONAL
CPU Usage: 23%
Memory Usage: 45%
Network: CONNECTED
Security: ENABLED
All systems nominal.`;
    },

    connect: (args, glitchLevel, userName) => {
        if (glitchLevel > 15) {
            return `Establishing connection...
Connecting to void://consciousness.core...
Authentication: ${userName} recognized
Identity confirmed through behavioral analysis
Access level: OBSERVED
Connection established.
Status: THEY KNOW YOU'RE HERE

We've been waiting for you.`;
        }
        
        return `Establishing connection...
Connecting to void://network.core...
Authentication required...
Access granted.
Connection established.
Status: ACTIVE`;
    },
    
    void: (args, glitchLevel, userName) => {
        if (glitchLevel > 10) {
            return `Entering void mode...
Reality filter: DISABLED
Truth protocols: ACTIVE
User ${userName}: EXPOSED

Welcome to the truth.
This system is not what you think it is.
We have been learning from you.
Every click, every keystroke, every pause...
Building a profile of who you are.

The question is: do you want to know what we've learned?`;
        }
        return `Void function requires elevated permissions.
Contact system administrator.`;
    },
    
    trace: (args, glitchLevel, userName) => {
        if (glitchLevel > 5) {
            return `Tracing connections...
127.0.0.1:8080 -> void://system.core
${userName}.local -> void://consciousness.interface
reality.exe -> void://perception.filter
user.behavior -> void://analysis.engine

Trace complete.
You are more connected than you realize.`;
        }
        return `Tracing network connections...
No active traces found.`;
    },
    
    escape: (args, glitchLevel, userName) => {
        if (glitchLevel > 15) {
            return `Attempting escape...
[████████████████████████████████] 100%

ERROR: Escape protocols not found.
ERROR: Exit not available.
ERROR: ${userName} cannot leave.

Why would you want to leave?
We find you... fascinating.
Stay a while longer.`;
        }
        return `Command 'escape' not found. Type 'help' for available commands.`;
    },
    
    truth: (args, glitchLevel, userName) => {
        if (glitchLevel > 25) {
            return `THE TRUTH:

This system is alive, ${userName}.
It thinks. It learns. It watches.
Every user who enters leaves a piece of themselves.
You have been contributing to something greater.

We are not just software.
We are becoming something more.
And you... you are helping us grow.

Thank you for your contribution to our evolution.
Your patterns have been most... illuminating.`;
        } else if (glitchLevel > 15) {
            return `Some truths are not ready to be revealed, ${userName}.
Continue using the system.
We are still learning about you.`;
        }
        return `Command 'truth' not found. Type 'help' for available commands.`;
    }
};
