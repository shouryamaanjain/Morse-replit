// Function to calculate the duration of a Morse code sequence
function calculateMorseDuration(morseCode) {
    let duration = 0;
    for (let i = 0; i < morseCode.length; i++) {
        if (morseCode[i] === '.') {
            duration += 0.1; // Dot duration
        } else if (morseCode[i] === '-') {
            duration += 0.3; // Dash duration
        } else if (morseCode[i] === ' ') {
            duration += 0.1; // Space between characters
        } else if (morseCode[i] === '/') {
            duration += 0.7; // Space between words
        }
        duration += 0.1; // Gap between elements
    }
    return duration;
}

// Function to play a single Morse code character
function playMorseChar(char, startTime, audioContext) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, startTime);

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(1, startTime + 0.01);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(startTime);

    if (char === '.') {
        gainNode.gain.linearRampToValueAtTime(0, startTime + 0.11);
        oscillator.stop(startTime + 0.11);
    } else if (char === '-') {
        gainNode.gain.linearRampToValueAtTime(0, startTime + 0.31);
        oscillator.stop(startTime + 0.31);
    }
}

// Function to play Morse code
function playMorseCode(morseCode) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let currentTime = audioContext.currentTime;

    for (let i = 0; i < morseCode.length; i++) {
        if (morseCode[i] === '.' || morseCode[i] === '-') {
            playMorseChar(morseCode[i], currentTime, audioContext);
            currentTime += (morseCode[i] === '.' ? 0.2 : 0.4);
        } else if (morseCode[i] === ' ') {
            currentTime += 0.2;
        } else if (morseCode[i] === '/') {
            currentTime += 0.6;
        }
    }
}
