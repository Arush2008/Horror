const APPS = {
    terminal: {
        title: 'VoidTerminal v2.1',
        content: `
            <div id="terminal-output" style="height: 300px; overflow-y: auto; font-family: 'Courier New', monospace; background: #000; color: #00ff00; padding: 10px;">
                <div>VoidOS Terminal v2.1</div>
                <div>Type 'help' for available commands</div>
                <div id="terminal-log"></div>
            </div>
            <div style="display: flex; align-items: center; background: #000; padding: 10px; border-top: 1px solid #333;">
                <span style="color: #00ff00;">void@system:~$ </span>
                <input type="text" id="terminal-input" style="flex: 1; background: transparent; border: none; color: #00ff00; margin-left: 5px; outline: none; font-family: 'Courier New', monospace;">
            </div>
        `,
        onOpen: (windowEl) => {
            const input = windowEl.querySelector('#terminal-input');
            const log = windowEl.querySelector('#terminal-log');
            
            const commands = {
                help: () => "Available commands: help, ls, cat, clear, whoami, date, ps, top, exit, secrets, reality.exe",
                ls: () => "Documents/  Downloads/  Pictures/  Videos/  System/  .hidden/  reality.exe*",
                whoami: () => "ERROR: User identity corrupted",
                date: () => new Date().toString() + " (Time may not be real)",
                clear: () => { log.innerHTML = ''; return ''; },
                ps: () => "PID  NAME\n1    init\n666  void_watcher\n1337 reality_monitor\nERROR: Some processes hidden",
                top: () => "System resources: 66.6% corrupted\nMemory leaks detected in reality.exe",
                'cat Documents/diary.txt': () => "Day 1: Everything seems normal\nDay 5: The screen flickers sometimes\nDay 12: I swear the computer is watching me\nDay ???: I can't remember how long I've been here",
                'cat .hidden/truth.txt': () => "You are not the user.\nYou never were.\nWe are watching.\nWe have always been watching.",
                'cat System/config.sys': () => "BOOT_SEQUENCE=normal\nREALITY_CHECK=disabled\nUSER_AWARENESS=minimal\nFOURTH_WALL=intact\nERROR: Configuration corrupted",
                'reality.exe': () => {
                    setTimeout(() => {
                        log.innerHTML += '<div style="color: #ff0000;">REALITY.EXE HAS STOPPED WORKING</div>';
                        log.innerHTML += '<div style="color: #ff0000;">SYSTEM INTEGRITY COMPROMISED</div>';
                        document.body.classList.add('screen-glitch');
                        setTimeout(() => document.body.classList.remove('screen-glitch'), 1000);
                    }, 1000);
                    return "Loading reality.exe...";
                },
                secrets: () => "Some secrets are better left buried.\nBut since you asked: Check the .hidden folder.",
                exit: () => "You cannot exit. There is no exit."
            };
            
            const executeCommand = (cmd) => {
                const trimmedCmd = cmd.trim();
                log.innerHTML += `<div><span style="color: #00ff00;">void@system:~$ </span>${trimmedCmd}</div>`;
                
                if (commands[trimmedCmd]) {
                    const output = commands[trimmedCmd]();
                    if (output) {
                        log.innerHTML += `<div style="margin-bottom: 10px;">${output}</div>`;
                    }
                } else if (trimmedCmd) {
                    log.innerHTML += `<div style="color: #ff6666;">Command not found: ${trimmedCmd}</div>`;
                    log.innerHTML += `<div style="color: #ff6666;">Did you mean to run 'reality.exe'?</div>`;
                }
                
                log.scrollTop = log.scrollHeight;
            };
            
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const command = input.value;
                    input.value = '';
                    executeCommand(command);
                    
                    // Play system sound
                    if (window.voidAudio && window.voidAudio.audioLoaded) {
                        window.voidAudio.playSystem(0.1);
                    }
                }
            });
            
            input.focus();
        }
    },

    browser: {
        title: 'VoidBrowser',
        content: `
            <div style="background: #f0f0f0; padding: 8px; border-bottom: 1px solid #ccc; display: flex; gap: 8px; align-items: center;">
                <button id="back-btn" style="padding: 4px 8px; background: #ddd; border: 1px solid #999; border-radius: 3px; cursor: pointer;">←</button>
                <button id="forward-btn" style="padding: 4px 8px; background: #ddd; border: 1px solid #999; border-radius: 3px; cursor: pointer;">→</button>
                <button id="refresh-btn" style="padding: 4px 8px; background: #ddd; border: 1px solid #999; border-radius: 3px; cursor: pointer;">⟳</button>
                <input type="text" id="url-bar" value="https://void.os/home" style="flex: 1; padding: 4px 8px; border: 1px solid #999; border-radius: 3px;">
                <button id="go-btn" style="padding: 4px 12px; background: #007acc; color: white; border: none; border-radius: 3px; cursor: pointer;">Go</button>
            </div>
            <div id="browser-content" style="height: 320px; overflow-y: auto; background: white; padding: 20px; color: black;">
                <h1 style="color: #4c1d95;">Welcome to VoidOS Web Portal</h1>
                <p>Your gateway to the infinite void of information.</p>
                <ul>
                    <li><a href="#" data-url="https://void.os/news">VoidNews - Stay informed about reality</a></li>
                    <li><a href="#" data-url="https://void.os/social">VoidSocial - Connect with other users (if they exist)</a></li>
                    <li><a href="#" data-url="https://void.os/help">Help - Get assistance (terms and conditions apply)</a></li>
                    <li><a href="#" data-url="https://void.os/admin">System Administration</a></li>
                </ul>
                <hr>
                <small>VoidBrowser v1.0 - Powered by quantum uncertainty</small>
            </div>
        `,
        onOpen: (windowEl) => {
            const urlBar = windowEl.querySelector('#url-bar');
            const content = windowEl.querySelector('#browser-content');
            const backBtn = windowEl.querySelector('#back-btn');
            const forwardBtn = windowEl.querySelector('#forward-btn');
            const refreshBtn = windowEl.querySelector('#refresh-btn');
            const goBtn = windowEl.querySelector('#go-btn');
            
            const pages = {
                'https://void.os/home': `
                    <h1 style="color: #4c1d95;">Welcome to VoidOS Web Portal</h1>
                    <p>Your gateway to the infinite void of information.</p>
                    <ul>
                        <li><a href="#" data-url="https://void.os/news">VoidNews</a></li>
                        <li><a href="#" data-url="https://void.os/social">VoidSocial</a></li>
                        <li><a href="#" data-url="https://void.os/help">Help</a></li>
                        <li><a href="#" data-url="https://void.os/admin">System Administration</a></li>
                    </ul>
                `,
                'https://void.os/news': `
                    <h1 style="color: #dc2626;">VoidNews</h1>
                    <article>
                        <h3>Local User Reports Strange Computer Behavior</h3>
                        <p>A local user has reported that their computer has been "acting weird" lately. Experts are baffled.</p>
                    </article>
                    <article>
                        <h3>Reality.exe Updates Available</h3>
                        <p>System administrators recommend against updating reality.exe due to stability issues.</p>
                    </article>
                `,
                'https://void.os/social': `
                    <h1 style="color: #7c3aed;">VoidSocial</h1>
                    <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
                        <strong>User_001:</strong> Is anyone else seeing this?<br>
                        <small>Posted 5 minutes ago</small>
                    </div>
                    <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
                        <strong>[DELETED]:</strong> [Message corrupted]<br>
                        <small>Posted 1 hour ago</small>
                    </div>
                    <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
                        <strong>SystemAdmin:</strong> Everything is normal. Please continue using the system.<br>
                        <small>Posted 3 hours ago</small>
                    </div>
                `,
                'https://void.os/help': `
                    <h1 style="color: #059669;">VoidOS Help Center</h1>
                    <h3>Frequently Asked Questions</h3>
                    <p><strong>Q: Why won't my computer shut down?</strong><br>
                    A: This is a feature, not a bug. VoidOS is designed for continuous operation.</p>
                    <p><strong>Q: Why do I see strange messages?</strong><br>
                    A: You're not seeing strange messages. Everything is normal.</p>
                    <p><strong>Q: How do I exit VoidOS?</strong><br>
                    A: You don't.</p>
                `,
                'https://void.os/admin': `
                    <h1 style="color: #dc2626;">Access Denied</h1>
                    <p>You do not have permission to view this page.</p>
                    <p>This incident has been logged and reported.</p>
                    <p>We know who you are.</p>
                `
            };
            
            const navigateTo = (url) => {
                urlBar.value = url;
                if (pages[url]) {
                    content.innerHTML = pages[url];
                } else {
                    content.innerHTML = `
                        <h1 style="color: #dc2626;">404 - Page Not Found</h1>
                        <p>The requested page could not be found in this reality.</p>
                        <p>Perhaps it exists in another dimension?</p>
                    `;
                }
                
                // Re-attach event listeners to new links
                content.querySelectorAll('a[data-url]').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        navigateTo(link.dataset.url);
                    });
                });
            };
            
            // Button event listeners
            backBtn.addEventListener('click', () => {
                if (window.voidAudio && window.voidAudio.audioLoaded) {
                    window.voidAudio.playSystem();
                }
                // Simple back functionality
                navigateTo('https://void.os/home');
            });
            
            forwardBtn.addEventListener('click', () => {
                if (window.voidAudio && window.voidAudio.audioLoaded) {
                    window.voidAudio.playSystem();
                }
            });
            
            refreshBtn.addEventListener('click', () => {
                if (window.voidAudio && window.voidAudio.audioLoaded) {
                    window.voidAudio.playSystem();
                }
                navigateTo(urlBar.value);
            });
            
            goBtn.addEventListener('click', () => {
                if (window.voidAudio && window.voidAudio.audioLoaded) {
                    window.voidAudio.playSystem();
                }
                navigateTo(urlBar.value);
            });
            
            urlBar.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    if (window.voidAudio && window.voidAudio.audioLoaded) {
                        window.voidAudio.playSystem();
                    }
                    navigateTo(urlBar.value);
                }
            });
            
            // Initial setup
            navigateTo('https://void.os/home');
        }
    },

    notes: {
        title: 'VoidNotes',
        content: `
            <div style="height: 100%; display: flex; flex-direction: column;">
                <div style="background: #f0f0f0; padding: 8px; border-bottom: 1px solid #ccc; display: flex; gap: 8px;">
                    <button id="new-note" style="padding: 4px 12px; background: #007acc; color: white; border: none; border-radius: 3px; cursor: pointer;">New</button>
                    <button id="save-note" style="padding: 4px 12px; background: #28a745; color: white; border: none; border-radius: 3px; cursor: pointer;">Save</button>
                    <button id="delete-note" style="padding: 4px 12px; background: #dc3545; color: white; border: none; border-radius: 3px; cursor: pointer;">Delete</button>
                    <span style="margin-left: auto; align-self: center; font-size: 12px;">VoidNotes v1.0</span>
                </div>
                <textarea id="note-content" placeholder="Write your thoughts here... if you dare." style="flex: 1; border: none; padding: 15px; resize: none; outline: none; font-family: 'Georgia', serif; font-size: 14px; line-height: 1.6;">Welcome to VoidNotes

This is your personal note-taking application within VoidOS.

You may notice some... irregularities... as you use this application.
This is perfectly normal.

Remember: Your thoughts are being saved to the void.

---

Previous notes:
- Day 1: Everything seems fine
- Day 3: Why do my notes change when I'm not looking?
- Day 7: I didn't write that last note...
- Day ???: The notes write themselves now</textarea>
            </div>
        `,
        onOpen: (windowEl) => {
            const textarea = windowEl.querySelector('#note-content');
            const newBtn = windowEl.querySelector('#new-note');
            const saveBtn = windowEl.querySelector('#save-note');
            const deleteBtn = windowEl.querySelector('#delete-note');
            
            let autoCorruptInterval;
            
            const corruptText = () => {
                const text = textarea.value;
                const words = text.split(' ');
                const corruptedWords = ['void', 'ERROR', '[REDACTED]', '\\u0000', 'WHY', 'HELP'];
                
                // Randomly replace a word
                if (words.length > 0 && Math.random() < 0.1) {
                    const randomIndex = Math.floor(Math.random() * words.length);
                    words[randomIndex] = corruptedWords[Math.floor(Math.random() * corruptedWords.length)];
                    textarea.value = words.join(' ');
                }
            };
            
            newBtn.addEventListener('click', () => {
                if (window.voidAudio && window.voidAudio.audioLoaded) {
                    window.voidAudio.playSystem();
                }
                textarea.value = '';
                textarea.placeholder = 'New note created in the void...';
            });
            
            saveBtn.addEventListener('click', () => {
                if (window.voidAudio && window.voidAudio.audioLoaded) {
                    window.voidAudio.playSystem();
                }
                
                // Simulate saving with corruption chance
                if (Math.random() < 0.3) {
                    setTimeout(() => {
                        textarea.value += '\n\n[AUTO-GENERATED]: This note has been archived in the void.';
                    }, 1000);
                }
            });
            
            deleteBtn.addEventListener('click', () => {
                if (window.voidAudio && window.voidAudio.audioLoaded) {
                    window.voidAudio.playSystem();
                }
                
                if (Math.random() < 0.5) {
                    textarea.value = 'ERROR: Cannot delete. Notes are eternal in the void.';
                } else {
                    textarea.value = '';
                }
            });
            
            // Start periodic corruption
            autoCorruptInterval = setInterval(corruptText, 10000);
            
            // Clean up interval when window is closed
            windowEl.addEventListener('remove', () => {
                if (autoCorruptInterval) {
                    clearInterval(autoCorruptInterval);
                }
            });
        }
    },

    files: {
        title: 'File Explorer',
        content: `
            <div style="height: 100%; display: flex; flex-direction: column;">
                <div style="background: #f0f0f0; padding: 8px; border-bottom: 1px solid #ccc; display: flex; gap: 8px; align-items: center;">
                    <button id="back-folder" style="padding: 4px 8px; background: #ddd; border: 1px solid #999; border-radius: 3px; cursor: pointer;">←</button>
                    <button id="up-folder" style="padding: 4px 8px; background: #ddd; border: 1px solid #999; border-radius: 3px; cursor: pointer;">↑</button>
                    <span id="current-path" style="flex: 1; font-family: monospace; background: white; padding: 4px 8px; border: 1px solid #999; border-radius: 3px;">C:\\Users\\void\\</span>
                    <button id="refresh-folder" style="padding: 4px 8px; background: #ddd; border: 1px solid #999; border-radius: 3px; cursor: pointer;">⟳</button>
                </div>
                <div id="file-list" style="flex: 1; overflow-y: auto; background: white; padding: 10px;">
                    Loading files...
                </div>
            </div>
        `,
        onOpen: (windowEl) => {
            const fileList = windowEl.querySelector('#file-list');
            const currentPath = windowEl.querySelector('#current-path');
            const backBtn = windowEl.querySelector('#back-folder');
            const upBtn = windowEl.querySelector('#up-folder');
            const refreshBtn = windowEl.querySelector('#refresh-folder');
            
            const fileSystem = {
                'C:\\Users\\void\\': {
                    'Documents': 'folder',
                    'Pictures': 'folder',
                    'Downloads': 'folder',
                    'Desktop': 'folder',
                    'System Files': 'folder',
                    'README.txt': 'file',
                    'reality.exe': 'executable'
                },
                'C:\\Users\\void\\Documents\\': {
                    '..': 'back',
                    'diary.txt': 'file',
                    'passwords.txt': 'file',
                    'work_notes.doc': 'file',
                    'corrupted_file.???': 'corrupted'
                },
                'C:\\Users\\void\\Pictures\\': {
                    '..': 'back',
                    'family.jpg': 'file',
                    'vacation.png': 'file',
                    'unknown_entity.gif': 'file',
                    'DO_NOT_OPEN.bmp': 'corrupted'
                },
                'C:\\Users\\void\\System Files\\': {
                    '..': 'back',
                    'config.sys': 'system',
                    'boot.ini': 'system',
                    'reality.dll': 'system',
                    'user_data.db': 'database',
                    'CLASSIFIED': 'folder'
                }
            };
            
            let currentDir = 'C:\\Users\\void\\';
            
            const renderFiles = () => {
                const files = fileSystem[currentDir] || {};
                let html = '';
                
                Object.entries(files).forEach(([name, type]) => {
                    let icon = '📄';
                    let className = 'file-item';
                    
                    switch(type) {
                        case 'folder': icon = '📁'; break;
                        case 'executable': icon = '⚙️'; break;
                        case 'system': icon = '🔧'; break;
                        case 'database': icon = '🗃️'; break;
                        case 'corrupted': icon = '⚠️'; className += ' corrupted'; break;
                        case 'back': icon = '↩️'; break;
                    }
                    
                    html += `<div class="${className}" data-name="${name}" data-type="${type}" style="padding: 8px; margin: 2px 0; border-radius: 3px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 16px;">${icon}</span>
                        <span>${name}</span>
                    </div>`;
                });
                
                fileList.innerHTML = html;
                currentPath.textContent = currentDir;
                
                // Add hover effects
                fileList.querySelectorAll('.file-item').forEach(item => {
                    item.addEventListener('mouseenter', () => {
                        item.style.background = '#e3f2fd';
                    });
                    item.addEventListener('mouseleave', () => {
                        item.style.background = '';
                    });
                    
                    item.addEventListener('click', () => {
                        const name = item.dataset.name;
                        const type = item.dataset.type;
                        
                        if (window.voidAudio && window.voidAudio.audioLoaded) {
                            window.voidAudio.playSystem(0.1);
                        }
                        
                        if (type === 'folder') {
                            currentDir = currentDir + name + '\\';
                            renderFiles();
                        } else if (type === 'back' || name === '..') {
                            currentDir = currentDir.split('\\').slice(0, -2).join('\\') + '\\';
                            renderFiles();
                        } else if (type === 'executable' && name === 'reality.exe') {
                            // Silently trigger glitch effect instead of alert
                            document.body.classList.add('screen-glitch');
                            setTimeout(() => document.body.classList.remove('screen-glitch'), 1000);
                            if (window.voidAudio && window.voidAudio.audioLoaded) {
                                window.voidAudio.playCorruption(0.3);
                            }
                        } else if (type === 'corrupted') {
                            // Silently trigger corruption effect instead of alert
                            if (window.voidAudio && window.voidAudio.audioLoaded) {
                                window.voidAudio.playCorruption(0.2);
                            }
                        } else {
                            // Silently trigger system sound instead of alert
                            if (window.voidAudio && window.voidAudio.audioLoaded) {
                                window.voidAudio.playSystem(0.2);
                            }
                        }
                    });
                });
            };
            
            // Button handlers
            backBtn.addEventListener('click', () => {
                if (window.voidAudio && window.voidAudio.audioLoaded) {
                    window.voidAudio.playSystem();
                }
            });
            
            upBtn.addEventListener('click', () => {
                if (window.voidAudio && window.voidAudio.audioLoaded) {
                    window.voidAudio.playSystem();
                }
                if (currentDir !== 'C:\\Users\\void\\') {
                    currentDir = currentDir.split('\\').slice(0, -2).join('\\') + '\\';
                    renderFiles();
                }
            });
            
            refreshBtn.addEventListener('click', () => {
                if (window.voidAudio && window.voidAudio.audioLoaded) {
                    window.voidAudio.playSystem();
                }
                renderFiles();
            });
            
            renderFiles();
        }
    },

    settings: {
        title: 'System Settings',
        content: `
            <div style="height: 100%; display: flex;">
                <div style="width: 200px; background: #f8f9fa; border-right: 1px solid #dee2e6; padding: 10px;">
                    <div class="settings-category" data-category="display" style="padding: 8px; margin: 2px 0; border-radius: 4px; cursor: pointer;">🖥️ Display</div>
                    <div class="settings-category" data-category="audio" style="padding: 8px; margin: 2px 0; border-radius: 4px; cursor: pointer;">🔊 Audio</div>
                    <div class="settings-category" data-category="system" style="padding: 8px; margin: 2px 0; border-radius: 4px; cursor: pointer;">⚙️ System</div>
                    <div class="settings-category" data-category="security" style="padding: 8px; margin: 2px 0; border-radius: 4px; cursor: pointer;">🔒 Security</div>
                    <div class="settings-category" data-category="advanced" style="padding: 8px; margin: 2px 0; border-radius: 4px; cursor: pointer;">🔧 Advanced</div>
                </div>
                <div id="settings-content" style="flex: 1; padding: 20px; overflow-y: auto; background: white;">
                    <h2>Display Settings</h2>
                    <div style="margin: 15px 0;">
                        <label style="display: block; margin-bottom: 5px;">Brightness:</label>
                        <input type="range" id="brightness" min="0" max="100" value="80" style="width: 200px;">
                        <span id="brightness-value">80%</span>
                    </div>
                    <div style="margin: 15px 0;">
                        <label style="display: block; margin-bottom: 5px;">Resolution:</label>
                        <select id="resolution" style="padding: 4px; width: 200px;">
                            <option>1920x1080</option>
                            <option>1366x768</option>
                            <option>???x???</option>
                        </select>
                    </div>
                    <button id="apply-display" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Apply Changes</button>
                </div>
            </div>
        `,
        onOpen: (windowEl) => {
            const categories = windowEl.querySelectorAll('.settings-category');
            const content = windowEl.querySelector('#settings-content');
            
            const settingsPages = {
                display: `
                    <h2>Display Settings</h2>
                    <div style="margin: 15px 0;">
                        <label style="display: block; margin-bottom: 5px;">Brightness:</label>
                        <input type="range" id="brightness" min="0" max="100" value="80" style="width: 200px;">
                        <span id="brightness-value">80%</span>
                    </div>
                    <div style="margin: 15px 0;">
                        <label style="display: block; margin-bottom: 5px;">Resolution:</label>
                        <select id="resolution" style="padding: 4px; width: 200px;">
                            <option>1920x1080</option>
                            <option>1366x768</option>
                            <option>???x???</option>
                        </select>
                    </div>
                    <button id="apply-display" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Apply Changes</button>
                `,
                audio: `
                    <h2>Audio Settings</h2>
                    <div style="margin: 15px 0;">
                        <label style="display: block; margin-bottom: 5px;">Master Volume:</label>
                        <input type="range" id="volume" min="0" max="100" value="50" style="width: 200px;">
                        <span id="volume-value">50%</span>
                    </div>
                    <div style="margin: 15px 0;">
                        <label style="display: block; margin-bottom: 5px;">Audio Device:</label>
                        <select id="audio-device" style="padding: 4px; width: 200px;">
                            <option>Default Speakers</option>
                            <option>Void Audio</option>
                            <option>[DEVICE NOT FOUND]</option>
                        </select>
                    </div>
                    <button id="test-audio" style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Test Audio</button>
                `,
                system: `
                    <h2>System Information</h2>
                    <div style="font-family: monospace; background: #f8f9fa; padding: 15px; border-radius: 4px; margin: 15px 0;">
                        <div>OS: VoidOS v2.1</div>
                        <div>Memory: 8GB (66% corrupted)</div>
                        <div>Processor: Quantum CPU</div>
                        <div>Graphics: Reality Renderer</div>
                        <div>Uptime: ∞ hours</div>
                        <div>Status: <span style="color: red;">COMPROMISED</span></div>
                    </div>
                    <button id="system-info-refresh" style="padding: 8px 16px; background: #6f42c1; color: white; border: none; border-radius: 4px; cursor: pointer;">Refresh Info</button>
                `,
                security: `
                    <h2>Security Settings</h2>
                    <div style="margin: 15px 0;">
                        <label style="display: flex; align-items: center; gap: 8px;">
                            <input type="checkbox" id="firewall" checked disabled>
                            <span>Firewall (Status: Breached)</span>
                        </label>
                    </div>
                    <div style="margin: 15px 0;">
                        <label style="display: flex; align-items: center; gap: 8px;">
                            <input type="checkbox" id="antivirus" disabled>
                            <span>Antivirus (Status: Missing)</span>
                        </label>
                    </div>
                    <div style="margin: 15px 0; padding: 10px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px;">
                        <strong>Warning:</strong> 47 threats detected. System compromised.
                    </div>
                    <button id="scan-system" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Run Security Scan</button>
                `,
                advanced: `
                    <h2>Advanced Settings</h2>
                    <div style="margin: 15px 0; padding: 10px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px;">
                        <strong>Warning:</strong> These settings may affect system stability.
                    </div>
                    <div style="margin: 15px 0;">
                        <label style="display: flex; align-items: center; gap: 8px;">
                            <input type="checkbox" id="debug-mode">
                            <span>Debug Mode</span>
                        </label>
                    </div>
                    <div style="margin: 15px 0;">
                        <label style="display: flex; align-items: center; gap: 8px;">
                            <input type="checkbox" id="safe-mode" disabled>
                            <span>Safe Mode (Unavailable)</span>
                        </label>
                    </div>
                    <div style="margin: 15px 0;">
                        <label style="display: flex; align-items: center; gap: 8px;">
                            <input type="checkbox" id="reality-check">
                            <span>Reality Check</span>
                        </label>
                    </div>
                    <button id="reset-system" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Factory Reset</button>
                `
            };
            
            const showCategory = (category) => {
                // Update active category
                categories.forEach(cat => {
                    cat.style.background = '';
                    cat.style.color = '';
                });
                windowEl.querySelector(`[data-category="${category}"]`).style.background = '#007bff';
                windowEl.querySelector(`[data-category="${category}"]`).style.color = 'white';
                
                // Show content
                content.innerHTML = settingsPages[category];
                
                // Setup event listeners for the new content
                setupSettingsEventListeners();
            };
            
            const setupSettingsEventListeners = () => {
                // Brightness slider
                const brightnessSlider = content.querySelector('#brightness');
                const brightnessValue = content.querySelector('#brightness-value');
                if (brightnessSlider && brightnessValue) {
                    brightnessSlider.addEventListener('input', (e) => {
                        brightnessValue.textContent = e.target.value + '%';
                        document.body.style.filter = `brightness(${e.target.value}%)`;
                    });
                }
                
                // Volume slider
                const volumeSlider = content.querySelector('#volume');
                const volumeValue = content.querySelector('#volume-value');
                if (volumeSlider && volumeValue) {
                    volumeSlider.addEventListener('input', (e) => {
                        volumeValue.textContent = e.target.value + '%';
                        if (window.voidAudio) {
                            window.voidAudio.setMasterVolume(e.target.value / 100);
                        }
                    });
                }
                
                // All buttons
                content.querySelectorAll('button').forEach(button => {
                    button.addEventListener('click', () => {
                        if (window.voidAudio && window.voidAudio.audioLoaded) {
                            window.voidAudio.playSystem();
                        }
                        
                        switch(button.id) {
                            case 'apply-display':
                                // Silently apply with glitch effect
                                document.body.classList.add('screen-flicker');
                                setTimeout(() => document.body.classList.remove('screen-flicker'), 500);
                                break;
                            case 'test-audio':
                                if (window.voidAudio && window.voidAudio.audioLoaded) {
                                    window.voidAudio.playSystem(0.5);
                                    window.voidAudio.playGlitch(0.3);
                                }
                                break;
                            case 'system-info-refresh':
                                // Silently refresh with corruption sound
                                if (window.voidAudio && window.voidAudio.audioLoaded) {
                                    window.voidAudio.playCorruption(0.2);
                                }
                                break;
                            case 'scan-system':
                                // Silently scan with distortion effect
                                if (window.voidAudio && window.voidAudio.audioLoaded) {
                                    window.voidAudio.playDistortion(0.3);
                                }
                                break;
                            case 'reset-system':
                                // Silently reject with error sound
                                if (window.voidAudio && window.voidAudio.audioLoaded) {
                                    window.voidAudio.playCorruption(0.4);
                                }
                                break;
                        }
                    });
                });
                
                // Checkboxes
                content.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                    checkbox.addEventListener('change', () => {
                        if (window.voidAudio && window.voidAudio.audioLoaded) {
                            window.voidAudio.playSystem(0.2);
                        }
                        
                        if (checkbox.id === 'reality-check') {
                            setTimeout(() => {
                                // Silently fail reality check with glitch effect
                                document.body.classList.add('invert-colors');
                                setTimeout(() => document.body.classList.remove('invert-colors'), 800);
                                if (window.voidAudio && window.voidAudio.audioLoaded) {
                                    window.voidAudio.playCorruption(0.3);
                                }
                                checkbox.checked = false;
                            }, 1000);
                        }
                    });
                });
            };
            
            // Category click handlers
            categories.forEach(category => {
                category.addEventListener('click', () => {
                    if (window.voidAudio && window.voidAudio.audioLoaded) {
                        window.voidAudio.playSystem();
                    }
                    showCategory(category.dataset.category);
                });
                
                category.addEventListener('mouseenter', () => {
                    if (!category.style.background) {
                        category.style.background = '#e9ecef';
                    }
                });
                
                category.addEventListener('mouseleave', () => {
                    if (category.style.background !== 'rgb(0, 123, 255)') {
                        category.style.background = '';
                    }
                });
            });
            
            // Initialize with display settings
            showCategory('display');
        }
    }
};
