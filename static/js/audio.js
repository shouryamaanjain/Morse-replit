// Audio context and oscillator setup
let audioContext;
let oscillator;

function setupAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
}

// Function to play a dot (short beep)
function playDot() {
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.11);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Function to play a dash (long beep)
function playDash() {
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.31);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Function to play Morse code
function playMorseCode(morseCode) {
    setupAudio();
    let currentTime = audioContext.currentTime;

    for (let i = 0; i < morseCode.length; i++) {
        if (morseCode[i] === '.') {
            setTimeout(() => playDot(), (currentTime - audioContext.currentTime) * 1000);
            currentTime += 0.2;
        } else if (morseCode[i] === '-') {
            setTimeout(() => playDash(), (currentTime - audioContext.currentTime) * 1000);
            currentTime += 0.4;
        } else if (morseCode[i] === ' ') {
            currentTime += 0.2;
        } else if (morseCode[i] === '/') {
            currentTime += 0.6;
        }
    }
}
