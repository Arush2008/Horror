class VoidAudio {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.volume = 0.3;
        this.initialized = false;
        this.backgroundMusic = null;
        this.currentBackgroundSound = null;
    }

    async init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
            console.log('VoidAudio initialized');
        } catch (error) {
            console.error('Failed to initialize audio:', error);
        }
    }

    async createGlitchSound() {
        if (!this.audioContext) return null;
        
        const duration = 0.8;
        const sampleRate = this.audioContext.sampleRate;
        const bufferSize = sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, sampleRate);
        const data = buffer.getChannelData(0);
        
        // Generate more intense glitch noise
        for (let i = 0; i < bufferSize; i++) {
            const t = i / sampleRate;
            // Add multiple layers of disturbing sounds
            if (Math.random() < 0.2) {
                data[i] = (Math.random() - 0.5) * 0.9; // Static
            } else {
                // Harsh digital distortion
                data[i] = Math.sin(440 * 2 * Math.PI * t) * 0.4 * Math.random();
                data[i] += Math.sin(880 * 2 * Math.PI * t) * 0.3 * (Math.random() < 0.3 ? 1 : 0);
                data[i] += Math.sin(220 * 2 * Math.PI * t) * 0.2 * (Math.random() < 0.2 ? 1 : 0);
                // Add digital artifacts
                data[i] *= Math.sin(60 * 2 * Math.PI * t) > 0 ? 1 : 0.3;
            }
        }
        
        return buffer;
    }

    async createWhisperSound() {
        if (!this.audioContext) return null;
        
        const duration = 3;
        const sampleRate = this.audioContext.sampleRate;
        const bufferSize = sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, sampleRate);
        const data = buffer.getChannelData(0);
        
        // Generate more eerie whisper-like sound
        for (let i = 0; i < bufferSize; i++) {
            const t = i / sampleRate;
            // Deep, haunting whispers
            data[i] = Math.sin(60 * 2 * Math.PI * t) * 0.3 * Math.sin(0.3 * 2 * Math.PI * t);
            data[i] += Math.sin(40 * 2 * Math.PI * t) * 0.2 * Math.sin(0.7 * 2 * Math.PI * t);
            // Add breathing-like noise
            data[i] += (Math.random() - 0.5) * 0.15 * Math.sin(1.5 * 2 * Math.PI * t);
            // Occasional sharp spikes
            if (Math.random() < 0.01) {
                data[i] += (Math.random() - 0.5) * 0.8;
            }
        }
        
        return buffer;
    }

    async createScareSound() {
        if (!this.audioContext) return null;
        
        const duration = 1.5;
        const sampleRate = this.audioContext.sampleRate;
        const bufferSize = sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, sampleRate);
        const data = buffer.getChannelData(0);
        
        // Generate EXTREMELY loud and terrifying scare sound
        for (let i = 0; i < bufferSize; i++) {
            const t = i / sampleRate;
            // Sharp, piercing scream-like sound
            data[i] = Math.sin(1200 * 2 * Math.PI * t) * (1 - t * 0.7) * 0.9;
            data[i] += Math.sin(800 * 2 * Math.PI * t) * (1 - t * 0.5) * 0.7;
            data[i] += Math.sin(2000 * 2 * Math.PI * t) * (1 - t * 0.8) * 0.6;
            // Add harsh static
            data[i] += (Math.random() - 0.5) * 0.8 * (1 - t);
            // Make it even more jarring
            if (Math.random() < 0.1) {
                data[i] *= 1.5;
            }
        }
        
        return buffer;
    }

    async createSystemSound() {
        if (!this.audioContext) return null;
        
        const duration = 0.2;
        const sampleRate = this.audioContext.sampleRate;
        const bufferSize = sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, sampleRate);
        const data = buffer.getChannelData(0);
        
        // Generate system beep
        for (let i = 0; i < bufferSize; i++) {
            const t = i / sampleRate;
            data[i] = Math.sin(440 * 2 * Math.PI * t) * (1 - t) * 0.3;
        }
        
        return buffer;
    }

    async createCorruptionSound() {
        if (!this.audioContext) return null;
        
        const duration = 1.2;
        const sampleRate = this.audioContext.sampleRate;
        const bufferSize = sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, sampleRate);
        const data = buffer.getChannelData(0);
        
        // Generate data corruption sound
        for (let i = 0; i < bufferSize; i++) {
            const t = i / sampleRate;
            // Digital corruption artifacts
            data[i] = Math.sin(150 * 2 * Math.PI * t) * 0.4;
            data[i] += Math.sin(300 * 2 * Math.PI * t) * 0.3 * (Math.random() > 0.7 ? 1 : 0);
            // Add bit-crushed noise
            if (i % 100 < 20) {
                data[i] += (Math.random() - 0.5) * 0.6;
            }
        }
        
        return buffer;
    }

    async createDistortionSound() {
        if (!this.audioContext) return null;
        
        const duration = 0.6;
        const sampleRate = this.audioContext.sampleRate;
        const bufferSize = sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, sampleRate);
        const data = buffer.getChannelData(0);
        
        // Generate audio distortion
        for (let i = 0; i < bufferSize; i++) {
            const t = i / sampleRate;
            data[i] = Math.sin(500 * 2 * Math.PI * t) * 0.5;
            // Add harmonic distortion
            data[i] = Math.sign(data[i]) * Math.pow(Math.abs(data[i]), 0.3);
            data[i] *= (1 - t * 0.8);
        }
        
        return buffer;
    }

    async createScaryBackgroundMusic() {
        if (!this.audioContext) return null;
        
        const duration = 10; // 10 seconds loop
        const sampleRate = this.audioContext.sampleRate;
        const bufferSize = sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, sampleRate);
        const data = buffer.getChannelData(0);
        
        // Generate scary ambient background music
        for (let i = 0; i < bufferSize; i++) {
            const t = i / sampleRate;
            // Deep, ominous drone
            data[i] = Math.sin(30 * 2 * Math.PI * t) * 0.3;
            data[i] += Math.sin(45 * 2 * Math.PI * t) * 0.2;
            // Add higher frequency tension
            data[i] += Math.sin(200 * 2 * Math.PI * t) * 0.1 * Math.sin(0.5 * 2 * Math.PI * t);
            // Random scary spikes
            if (Math.random() < 0.001) {
                data[i] += (Math.random() - 0.5) * 0.5;
            }
            // Add wind-like noise
            data[i] += (Math.random() - 0.5) * 0.05;
        }
        
        return buffer;
    }

    async loadSounds() {
        if (!this.initialized) await this.init();
        
        try {
            this.sounds.glitch = await this.createGlitchSound();
            this.sounds.whisper = await this.createWhisperSound();
            this.sounds.scare = await this.createScareSound();
            this.sounds.system = await this.createSystemSound();
            this.sounds.corruption = await this.createCorruptionSound();
            this.sounds.distortion = await this.createDistortionSound();
            this.sounds.scaryBackground = await this.createScaryBackgroundMusic();
            console.log('All VoidAudio sounds loaded');
        } catch (error) {
            console.error('Failed to load sounds:', error);
        }
    }

    playSound(soundName, volume = this.volume, loop = false) {
        if (!this.initialized || !this.sounds[soundName]) {
            console.warn(`Sound ${soundName} not available`);
            return null;
        }

        try {
            const source = this.audioContext.createBufferSource();
            const gainNode = this.audioContext.createGain();
            
            source.buffer = this.sounds[soundName];
            source.loop = loop;
            
            gainNode.gain.value = volume;
            
            source.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            source.start(0);
            
            return { source, gainNode };
        } catch (error) {
            console.error(`Failed to play sound ${soundName}:`, error);
            return null;
        }
    }

    stopSound(soundObject) {
        if (soundObject && soundObject.source) {
            try {
                soundObject.source.stop();
            } catch (error) {
                console.warn('Failed to stop sound:', error);
            }
        }
    }

    playGlitch(volume = 0.4) {
        return this.playSound('glitch', volume);
    }

    playWhisper(volume = 0.2) {
        return this.playSound('whisper', volume);
    }

    playScare(volume = 1.0) {
        return this.playSound('scare', volume);
    }

    playSystem(volume = 0.3) {
        return this.playSound('system', volume);
    }

    playCorruption(volume = 0.5) {
        return this.playSound('corruption', volume);
    }

    playDistortion(volume = 0.4) {
        return this.playSound('distortion', volume);
    }

    playScaryBackgroundMusic(volume = 0.3) {
        if (this.currentBackgroundSound) {
            this.stopSound(this.currentBackgroundSound);
        }
        this.currentBackgroundSound = this.playSound('scaryBackground', volume, true);
        return this.currentBackgroundSound;
    }

    stopBackgroundMusic() {
        if (this.currentBackgroundSound) {
            this.stopSound(this.currentBackgroundSound);
            this.currentBackgroundSound = null;
        }
    }

    playRandomGlitch() {
        const sounds = ['glitch', 'whisper', 'corruption', 'distortion'];
        const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
        const volume = 0.3 + Math.random() * 0.4;
        return this.playSound(randomSound, volume);
    }

    setMasterVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }
}

// Global audio instance
window.voidAudio = new VoidAudio();
