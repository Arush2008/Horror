# VoidOS - A Web-Based Operating System Experience

VoidOS is a clean, modern fake operating system built entirely in the browser. It simulates a retro desktop environment with fully functional applications and a smooth user interface.

## Features

### 🖥️ Desktop Environment
- Retro-style desktop with animated gradient background
- Draggable desktop icons
- Start menu with application launcher
- Taskbar with system tray and clock
- Window management (minimize, maximize, close)
- Draggable and resizable windows

### 📱 Applications
- **VoidTerminal**: Functional terminal with various commands
- **VoidBrowser**: System information portal with uptime tracking
- **Notes**: Text editor with auto-save and character counting
- **File Explorer**: File browser with folder navigation
- **System Settings**: Configuration panels for system preferences

### ⚡ System Features
- Persistent storage using localStorage
- Session tracking and uptime monitoring
- Interactive terminal commands
- Real-time clock and system status
- Smooth animations and transitions
- Responsive design for mobile devices

## Usage

1. Open `index.html` in your web browser
2. Double-click desktop icons to launch applications
3. Use the start menu to access all programs
4. Drag windows by their title bars
5. Use window controls to minimize, maximize, or close
6. Try terminal commands like `help`, `ls`, `system`, `uptime`

## Terminal Commands

- `help` - Show available commands
- `clear` - Clear terminal screen
- `ls` - List files and directories
- `pwd` - Print working directory
- `whoami` - Display current user
- `date` - Show current date and time
- `system` - Show system information
- `uptime` - Show system uptime
- `version` - Show VoidOS version
- `echo <text>` - Print text to console
- `scan` - Scan system status
- `connect` - Establish connection

## File Structure

```
VoidOS/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── apps.js            # App definitions and terminal commands
├── script.js          # Main system functionality
└── README.md          # This file
```

## Browser Compatibility

VoidOS works best in modern browsers that support:
- CSS Grid and Flexbox
- ES6 JavaScript features
- localStorage
- CSS animations and transforms

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

The system is built with vanilla HTML, CSS, and JavaScript for maximum compatibility and performance. Each app is modular and can be easily extended or modified.

### Adding New Apps

1. Define the app in `apps.js` with title, icon, content, and styles
2. Add the app to the desktop icons and start menu in `index.html`
3. Implement app-specific functionality in the `initializeApp` method in `script.js`

### Customizing the Interface

- Colors and themes can be modified in `styles.css`
- Window behaviors are controlled in the VoidOS class
- App content and functionality are defined in `apps.js`

## License

This project is open source and available under the MIT License.

---

**VoidOS - The OS that pushes boundaries**
