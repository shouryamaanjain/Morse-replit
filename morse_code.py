MORSE_CODE_DICT = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
    "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
    '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
    ' ': ' '
}

REVERSE_MORSE_CODE_DICT = {value: key for key, value in MORSE_CODE_DICT.items()}

def english_to_morse(text):
    morse_words = []
    for word in text.upper().split():
        morse_chars = []
        for char in word:
            if char in MORSE_CODE_DICT:
                morse_chars.append(MORSE_CODE_DICT[char])
        morse_words.append(' '.join(morse_chars))
    return '  '.join(morse_words)  # Two spaces between words

def morse_to_english(morse):
    english_words = []
    for word in morse.split('  '):  # Split by two spaces to separate words
        english_chars = []
        for code in word.split():
            if code in REVERSE_MORSE_CODE_DICT:
                english_chars.append(REVERSE_MORSE_CODE_DICT[code])
        english_words.append(''.join(english_chars))
    return ' '.join(english_words)
