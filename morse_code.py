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
    words = text.upper().split()
    morse_words = []
    for word in words:
        morse_word = ' '.join(MORSE_CODE_DICT.get(char, '') for char in word)
        morse_words.append(morse_word)
    return '  '.join(morse_words)  # Two spaces between words

def morse_to_english(morse):
    words = morse.split('  ')  # Split by two spaces to separate words
    english_words = []
    for word in words:
        english_word = ''.join(REVERSE_MORSE_CODE_DICT.get(code, '') for code in word.split())
        english_words.append(english_word)
    return ' '.join(english_words)
